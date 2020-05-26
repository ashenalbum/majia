<template>
    <div class="cont df df-c">
        <div class="search-title df df-c just-c-ct">
            <!-- <div class="title-cont df df-r ai-c">
                <van-icon name="search" size="0.32rem" />
                <div class="f1 txt-c fs-18 c_33 lh-1">模板列表</div>
            </div> -->
            <van-search
                v-model="search.keyword"
                placeholder="请输入搜索关键词"
                @input="onSearch"
            />
        </div>
        <div class="list-box f1">
            <van-list
                v-model="loading"
                :finished="over"
                finished-text="没有更多数据了"
                @load="getList"
                class="cont-list c_33"
            >
                <div v-for="(item,index) in dataList" :key="index" class="item df df-r">
                    <van-checkbox v-model="item.sel" shape="square" class="checkbox" @change="(e)=>{checkbox(e,item)}" />
                    <div class="ware f1 df df-r" @click="item.sel=!item.sel">
                        <img :src="item.head_pic" class="img" />
                        <div class="detail df df-c just-c-bet">  
                            <div class="one-hide fs_32">{{item.title}}</div>
                            <div class="df df-r ai-c fs_24 c_ashen">
                                <van-icon name="underway-o" size="0.3rem"/>
                                <span class="one-hide pl-10">{{computedTime(item)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <div class="bottom df df-r ai-c just-c-bet shadow" @click="showSel=true">
            <span class="fs_28 c_66">已选择：({{selList.length}}/{{max}})</span>
            <van-button type="info" size="small" @click.stop="submit">确定</van-button>
        </div>
        <!-- 已选择列表 -->
        <van-popup v-model="showSel" round position="bottom">
            <div class="sel-box">
                <div class="subbox">
                    <ul class="cont-list">
                        <li v-for="(item,index) in selList" :key="index" class="item">
                            <div class="ware f1 df df-r">
                                <img :src="item.head_pic" class="img" />
                                <div class="detail df df-c just-c-ct">  
                                    <div class="one-hide fs_32">{{item.title}}</div>
                                </div>
                                <van-icon name="delete" class="del fs_40 c_99" @click="delSel(item)" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bottom df df-r ai-c just-c-bet" @click="showSel=false">
                    <span class="fs_28 c_66">已选择：({{selList.length}}/10)</span>
                    <van-button type="info" size="small" @click="submit">确定</van-button>
                </div>
            </div>
        </van-popup>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";
import { Toast } from 'vant';

export default {
    data(){
        return {
            id: null,
            loading: false,
            over: false,

            search: {
                keyword: "",
                page: 1,
                pageSize: 20,
            },
            dataList: [],

            showSel: false,
            selList: [],
            initSel: [],
            max: 10,
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getDetail();
    },
    methods: {
        onSearch(){
            this.search.page = 1;
            this.dataList = [];
            this.over = false;
            this.getList();
        },
        getList(){
            axios({
                url: "/activity/Apiactivity/ChoiceActivityList",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return;}
                this.loading = false;
                this.search.page++;
                data.data && data.data.forEach((i)=>{i.sel=false});
                if(data.count<=this.search.pageSize){
                    this.dataList = data.data;
                    this.over = true;
                } else {
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            })
        },
        getDetail(){
            axios({
                url: "/activity/Apiactivity/extension_details",
                params: {id: this.id},
            }).then((data)=>{
                this.selList = data.data.activity_list;
                this.max = data.data.max || 10;
                this.initSel = data.data.activity_ids.split(",");
                this.checkSel();
            })
        },
        checkSel(){
            this.initSel.forEach((i)=>{
                let s = this.dataList.find((item)=>{return item.id==i});
                if(s){s.sel = true;}
            })
        },
        delSel(item){
            let delid = item.id;
            let init = this.initSel.findIndex((i)=>{return i==delid});
            if(init>=0){this.initSel.splice(init,1);}

            let sel = this.selList.findIndex((i)=>{return i.id==delid});
            if(sel>=0){this.selList.splice(sel,1);}

            let ls = this.dataList.findIndex((i)=>{return i.id==delid});
            if(ls>=0){this.dataList[ls].sel = false;}
        },
        checkbox(boo,item){
            console.log("checkbox");
            if(boo){
                if(this.selList.length>=this.max){
                    item.sel = false;
                    Toast("最多只能选择"+this.max+"个活动");
                    return;
                }
                let index = this.selList.findIndex((i)=> {return i.id===item.id});
                if(index<0){this.selList.push(item)}
            }else{
                let init = this.initSel.findIndex((i)=>{return i==item.id});
                if(init>=0){this.initSel.splice(init,1);}
                
                let sel = this.selList.findIndex((i)=>{return i.id==item.id});
                if(sel>=0){this.selList.splice(sel,1);}
            }
        },
        submit(){
            let arr = [];
            this.selList.forEach((item)=>{arr.push(item.id)});

            axios({
                url: "/activity/Apiactivity/extension_edit",
                params: {
                    id: this.id,
                    activity_id: arr.join(),
                }
            }).then((data)=>{
                if(data.err!==0){return;}
                Toast("操作成功");
                this.$router.replace("/group");
            });
        },
        // 活动时间
        computedTime(item){
            if(item.start_time==item.abort_time && item.abort_time=="活动不结束"){return "活动不结束"}
            return item.start_time + " - " + item.abort_time;
        },
    },
    watch:{
        dataList(){
            this.checkSel();
        },
    },
    components:{PageMenu},
}
</script>
<style scoped>
.cont{box-sizing:border-box; height:100%; padding-bottom:1.1rem;}
.list-box{overflow-y:auto;}
.txt_line{padding-left:5px;}
.top-alert{width:6.7rem; padding-top:0.3rem; margin-left:auto; margin-right:auto;}
.dib{display:inline-block; white-space: nowrap;}
.cont-list{width:6.7rem; margin:0 auto 0; padding-top:0;}
.cont-list .item{margin-bottom:0;}
.cont-list .item .checkbox{margin-right:0.2rem;}
.cont-list .item .del{margin-left:0.2rem;}
.cont-list .ware{padding:0.2rem 0; border-bottom:1px solid #E2E6F1;}
.cont-list .ware .img{width:1.4rem; height:0.97rem;}
.cont-list .ware .detail{margin-left:0.2rem; flex:1;}
.cont-list .ware .detail .label{padding-left:0.1rem; padding-right:0.4rem;}

.bottom{position:fixed; box-sizing:border-box; bottom:0; width:100%; height:1rem; padding:0 0.3rem; }
.sel-box .bottom{position:relative;}

.sel-box{padding-top:10px;}
.sel-box .subbox{max-height:5rem; overflow-y:auto;}

.form{box-sizing:border-box; width:7rem; padding:0.4rem 0.3rem; border-radius:0.2rem; background:#ffffff;}
.form .form-btn{box-sizing:border-box; width:100%; height:36px; background:#1989fa; border:none; outline:none; border-radius:6px;}
</style>
