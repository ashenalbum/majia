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
            <van-tabs v-model="search.template_class" @click="onSearch" type="card" color="#3189F6">
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
                    <div v-for="(item,index) in dataList" :key="index" class="item shadow" @click="toDetail(item)">
                        <div class="imgbox">
                            <img class="img" :src="item.head_pic" />
                            <span class="yj c_y1 fs_22">佣金：{{item.commission}}元</span>
                            <span class="txt c_ff fs_24">{{(item.type==0?"报名":"销量")+(item.people_buy_num||0)}}</span>
                            <!-- {{item.useNum||0}}人在使用 -->
                        </div>
                        <div class="title van-ellipsis fs_28 c_33 txt-c">{{item.title}}</div>
                        <div class="df df-r ai-c just-c-bet pl-20">
                            <span class="fs_26 c_ashen">￥{{item.price}}</span>
                            <van-button type="mini" :disabled="item.state==1" :color="item.state==0?'#FF9C00':'#9FA9C7'">{{item.type=="0"?"立即分享":"立即分享"}}</van-button>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
// import { Toast } from 'vant';
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            tabs: {},
            search: {
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
                url: "/activity/Apiactivity/activityList",
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
        toDetail(item){
            window.location.href = item.activity_url;
        }
    },
    created(){
        this.getTabs();
    },
    components: {PageMenu},
}
</script>
<style scoped>
.cont{height:100%;}
.search-title{display:flex;}
.search-title .title-cont{height:100%; padding:0 0.2rem;}
.search-title .van-search{padding:10px 0.2rem;}

.listul-box{position:relative; width:6.7rem; margin-left:auto; margin-right:auto;}
.listul{position:absolute; top:0; bottom:0; left:0; right:0; overflow:auto; display:flex; flex-direction:row; justify-content:space-between; flex-wrap:wrap; align-content:flex-start; }
.listul .item{box-sizing:border-box; margin-bottom:0.25rem; width:3.24rem; height:3.52rem; border-radius:0.15rem; overflow:hidden;}
.listul .item .imgbox{position:relative; width:100%; height:2.08rem; border-bottom:1px solid #f1f1f1;}
.listul .item .imgbox .img{width:100%; height:100%;}
.listul .item .imgbox .txt{position:absolute; bottom:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:4px 0 0 0;}
.listul .item .imgbox .yj{position:absolute; top:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:0 0 0 4px;}
.listul .item .title{height:0.78rem; line-height:0.78rem; padding:0 4px;}
</style>
