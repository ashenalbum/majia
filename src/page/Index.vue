<template>
    <div class="cont">
        <div class="banner">
            <van-swipe indicator-color="white">
                <van-swipe-item v-for="(item,index) in top" :key="index" class="itm" @click="toDetail(item)">
                    <img :src="item.head_pic" alt="" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="hot mt-30">
            <div v-if="hotList && hotList.length" class="title fs_32 c_33 b">热门活动</div>
            <div class="ul-box mt-20 c_33 fs_28">
                <ul class="ul df">
                    <li v-for="(item,index) in hotList" :key="index" @click="toDetail(item)">
                        <div class="img-box shadow">
                            <img class="img" :src="item.head_pic" />
                            <div class="imgbox-detail df df-r just-c-bet c_ff fs_22">
                                <div class="df df-r ai-c">
                                    <van-icon class="ic" name="eye-o" />
                                    <span>{{item.display_quantity}}</span>
                                </div>
                                <div class="df df-r ai-c">
                                    <van-icon class="ic" name="fire-o" />
                                    <span>{{item.heating_power}}</span>
                                </div>
                            </div>
                            <div class="biaoshi fs_24 c_ff">{{getTypeName(item.type)}}</div>
                        </div>
                        <div class="mt-10 lh-1 title">{{item.title}}</div>
                        <div class="fs_26 c_red1">￥{{item.special_offer}} <span class="txt-del txt-line-t c_ashen">￥{{item.price}}</span></div>
                    </li>
                </ul>
            </div>
        </div>
        <van-tabs class="index-tabs mt-16" v-model="search.template_class" @click="onSearch">
            <van-tab @click.stop v-for="(value, key, index) in tabs" :name="key" :key="index" :title="value"></van-tab>
        </van-tabs>
        <div class="listul-box mt-20">
            <van-list
                v-model="loading"
                :finished="over"
                finished-text="没有更多数据了"
                @load="getList"
                class="listul df df-r just-c-bet df-w-w"
            >
                <div v-for="(item,index) in dataList" :key="index" class="item"  @click="toDetail(item)">
                    <div class="imgbox shadow">
                        <img class="img" :src="item.head_pic" />
                        <div class="imgbox-detail df df-r just-c-bet c_ff fs_22">
                            <div class="df df-r ai-c">
                                <van-icon class="ic" name="eye-o" />
                                <span>{{item.display_quantity}}</span>
                            </div>
                            <div class="df df-r ai-c">
                                <van-icon class="ic" name="fire-o" />
                                <span>{{item.heating_power}}</span>
                            </div>
                        </div>
                        <div class="biaoshi fs_24 c_ff">{{getTypeName(item.type)}}</div>
                    </div>
                    <div class="title van-ellipsis fs_28 c_33 txt-c">{{item.title}}</div>
                    <div class="fs_26 c_red1">￥{{item.special_offer}} <span class="txt-del txt-line-t c_ashen">￥{{item.price}}</span></div>
                </div>
            </van-list>
        </div>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            tabs: {},
            search: { template_class: 0},
            loading: false,
            over: false,

            top: [],
            hotList: [],
            dataList: [],
            searchShow: false,
            searchVal: "",
        }
    },
    created(){
        this.getTabs();
        this.getList();
    },
    methods: {
        onSearch(){
            this.dataList = [];
            this.getList();
        },
        getList(){
            axios({
                url: "/activity/Apiactivity/GetHomePageData",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return}
                this.loading = false;
                this.over = true;
                this.top = data.data.top && data.data.top.length?data.data.top:this.top;
                this.hotList = data.data.hotspot && data.data.hotspot.length?data.data.hotspot:this.hotList;
                this.dataList = data.data.list;
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
            let id = item.id;
            let path = "/pay_detail";
            item.type = Number(item.type);
            switch(item.type){
                case 0:path="/pay_detail";break;
                case 1:path="/pay_detail_n1";break;
                case 2:path="/pay_detail_n2";break;
            }
            this.$router.push({path:path, query:{id:id, activity_id1:id}});
        },
        getTypeName(type){
            switch(type){
                case 0: return "阶梯";
                case 1: return "产品";
                case 2: return "拼团";
            }
        },
    },
    components: {PageMenu},
}
</script>
<style scoped>
.ic{margin-right:4px;}
.cont{box-sizing:border-box; height:100%; padding-top:0.1rem;}
.banner{width:6.7rem; margin:0 auto 0.1rem; border-radius:0.1rem; overflow:hidden;}
.banner .itm{width:100%; height:3.2rem;}
.banner .itm img{display:block; width:100%; height:100%;}

.hot{margin-left:0.4rem; margin-right:0.4rem;}
.hot .ul-box{width:100%; max-height:4rem; overflow-x:auto; overflow-y:hidden;}
.hot .ul-box .ul{position:relative; white-space:nowrap;}
.hot .ul-box .ul li{width:2.66rem; min-width:2.66rem; margin-bottom:0.2rem; margin-right:0.2rem;}
.hot .ul-box .img-box{position:relative; width:100%; height:1.44rem;}
.hot .ul-box .img-box img{width:100%; height:100%;}
.hot .ul-box .title{white-space: nowrap; overflow: hidden; text-overflow:ellipsis;}

.search-title{display:flex;}
.search-title .title-cont{height:100%; padding:0 0.2rem;}
.search-title .van-search{padding:10px 0.2rem;}
.listul-box{position:relative; margin-left:0.4rem; margin-right:0.4rem;}
.listul .item{box-sizing:border-box; margin-bottom:0.2rem; width:3.24rem; overflow:hidden;}
.listul .item .imgbox{position:relative; width:100%; height:1.75rem; border-bottom:1px solid #f1f1f1;}
.listul .item .imgbox .img{width:100%; height:100%;}
.listul .item .title{padding:2px;}

.imgbox-detail{position:absolute; box-sizing:border-box; padding:4px; width:100%; left:0; bottom:0; background:rgba(0,0,0,0.5);}
.biaoshi{position:absolute; top:0; left:0; background:#1989fa; padding: 0.06rem 0.1rem; border-radius: 0 0 .2rem 0; line-height: 1;}
.txt-del{padding-left:0.2rem; }
</style>
