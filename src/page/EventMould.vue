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
        <div class="list df df-c f1">
            <van-tabs v-model="search.type" @click="onSearch" type="card" color="#3189F6">
                <van-tab @click.stop name="" title="全部"></van-tab>
                <van-tab @click.stop v-for="(value, key, index) in types" :name="key" :key="index" :title="value"></van-tab>
            </van-tabs>
            <van-tabs v-model="search.template_class" @click="onSearch" type="card" color="#3189F6" class="mt-20">
                <van-tab @click.stop v-for="(value, key, index) in tabs" :name="key" :key="index" :title="value"></van-tab>
            </van-tabs>
            <div class="listul-box f1 mt-30">
                <van-list
                    v-model="loading"
                    :finished="over"
                    finished-text="没有更多数据了"
                    @load="getList"
                    class="listul"
                >
                    <div v-for="(item,index) in dataList" :key="index" class="item shadow" @click="yulan(item.id, item.type)">
                        <div class="imgbox">
                            <img class="img" :src="item.head_pic" />
                            <span class="txt c_ff fs_24">{{item.useNum}}人在使用</span>
                        </div>
                        <div class="title van-ellipsis fs_28 c_33 txt-c">{{item.title}}</div>
                        <div class="df df-r ai-c just-c-bet pl-20">
                            <a class="fs_26 c_ashen" href="javascript:;" >预览</a>
                            <a class="com-btn-y" href="javascript:;" @click.stop="zhizuo(item.id, item.type)">立即制作</a>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
        <van-button class="fixed-submit" type="info" @click="showSelType=true">创建新活动</van-button>
        <van-popup v-model="showSelType" position="bottom">
            <van-picker
                show-toolbar
                :columns="eventTypes"
                @confirm="selTypeOk"
                @cancel="showSelType=false"
            />
        </van-popup>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import { Toast } from 'vant';
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            tabs: {},
            types: {"0":"阶梯奖励","1":"产品活动","2":"拼团活动"},
            search: {
                type: "all",
                keyword: "",
                template_class: 0,
                page: 1,
                pageSize: 20,
            },
            loading: false,
            over: false,

            dataList: [],
            searchShow: false,
            searchVal: "",

            showKefu: false,

            showSelType: false,
            eventTypes: ["阶梯奖励","产品活动","拼团活动"],

        }
    },
    methods: {
        onSearch(){
            this.search.page = 1;
            this.dataList = [];
            this.over = false;
            this.getList();
        },
        getList(){
            if(this.over){return;}
            axios({
                url: "/activity/Apiactivity/getTemplateList",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return}
                this.loading = false;
                this.search.page++;
                if(data.count<=this.search.pageSize){
                    this.dataList = data.data;
                    this.over = true;
                }else{
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            });
        },
        getTabs(){
            axios({
                url: "/activity/Apiactivity/getTemplateClass"
            }).then((data)=>{
                if(data.err!=0){return}
                this.tabs = data.data;
            });
        },
        yulan(id,index){
            let path = "/event_view";
            switch(index){
                case 0:path="/event_view";break;
                case 1:path="/event_view_n1";break;
                case 2: path="/event_view_n2";break;
            }
            this.$router.push({path:path, query:{id: id}});
        },
        zhizuo(id,index){
            axios({
                url: "/activity/Apiactivity/IsRelease"
            }).then((data)=>{
                if(data.err!==0){
                    Toast(data.content);
                    return;
                }
                axios({
                    url: "/activity/Apiactivity/is_perfect_info"
                }).then((data)=>{
                    if(data.err!==0){
                        Toast("请先验证信息");
                        this.$router.push({name:"Auth",query:{id: id}});
                        return;
                    }
                    let path = "/event_form";
                    switch(index){
                        case 0:path="/event_form";break;
                        case 1:path="/event_form_n1";break;
                        case 2: path="/event_form_n2";break;
                    }
                    this.$router.push({path:path, query:{id:id, xieyi:1}});
                });
            })
        },
        selTypeOk(value,index){
            this.zhizuo(1,Number(index));
        },
        toMycenter(){
            this.$router.push("/my_center");
        },
    },
    created(){
        this.getTabs();
    },
    components:{PageMenu},
}
</script>
<style scoped>

.search-title{display:flex;}
.search-title .title-cont{height:100%; padding:0 0.2rem;}
.search-title .van-search{padding:10px 0.2rem;}

.cont{height:100%;}
.listul-box{position:relative; }
.listul{position:absolute; top:0; bottom:0; left:0; right:0; padding:0 0.4rem; overflow-y:auto; display:flex; flex-direction:row; justify-content:space-between; flex-wrap:wrap; align-content: flex-start;}
.listul .item{box-sizing:border-box; margin-bottom:0.25rem; width:3.24rem; height:3.52rem; border-radius:0.15rem; overflow:hidden;}
.listul .item .imgbox{position:relative; width:100%; height:2.08rem; border-bottom:1px solid #f1f1f1;}
.listul .item .imgbox .img{width:100%; height:100%;}
.listul .item .imgbox .txt{position:absolute; bottom:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:4px 0 0 0;}
.listul .item .title{height:0.78rem; line-height:0.78rem; padding:0 4px;}

.fixed-submit{bottom:1rem; width:auto;}

</style>
