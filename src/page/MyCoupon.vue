<template>
    <div id="app">
        <HeadNav></HeadNav>
        <div class="main df df-c">
            <van-tabs v-model="active" @change="changeTavs" title-active-color="#2E8AF6"  color="#2E8AF6">
                <van-tab title="待领取" />
                <van-tab title="已领取" />
                <van-tab title="已使用" />
            </van-tabs>
            <div class="list-box-height mt-20 f1">
                <van-list
                    v-model="loading"
                    :finished="over"
                    finished-text="没有更多了"
                    @load="getData"
                    class="list-box"
                >
                    <div v-for="(val,index) in dataList" :key="index">
                        <div class="item df df-r ai-c just-c-bet" :class="{odd:index%2, c_y:index%2, c_blue:index%2==0}">
                            <div class="left df df-c ai-c just-c-ct fs_26">
                                <p class="num" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                                <p class="num" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                                <p class="text">全场通用</p>
                            </div>
                            <div class="center c_33 df df-c just-c-ct">
                                <p class="kuanghuan">{{val.title}}</p>
                                <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                                <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                            </div>
                            <div v-if="active==0" class="right df ai-c just-c-ct" @click="getIntegral(val.id)">
                                <p class="c_ff">立即<br/>领取</p>
                            </div>
                            <div v-else-if="active==1" class="right df ai-c just-c-ct">
                                <p class="c_ff">未<br/>使<br/>用</p>
                            </div>
                            <div v-else-if="active==2" class="right df ai-c just-c-ct">
                                <p class="c_ff">已<br/>使<br/>用</p>
                            </div>
                            <!-- <p class="useArea" @click="useDetails(val.descnibe)">
                                <span>?</span>
                            </p> -->
                        </div>
                    </div>
                </van-list>
                <div v-if="!dataList || dataList.length==0" class="nodata df df-c ai-c">
                    <img class="noCoupon_bg" src="~@/assets/mycoupon/noCoupon.png" alt="">
                    <p class="mt-20 fs_30 c_99">暂无优惠券</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeadNav from "../components/HeadNav"; //头部菜单
import axios from "../utils/axios";
import { Toast } from 'vant';

export default {
    components: {HeadNav},
    data() {
        return {
            active: 0,
            page: 1,
            pagesize: 20,
            loading: false,
            over: false,
            dataList: [],
        };
    },
    methods: {
        getData(){
            let url;
            let status;
            switch(this.active){
                case 0:url="/coupon/Apicoupon/member_getList";status=0;break;
                case 1:url="/coupon/Apicoupon/member_user_coupon_list";status=1;break;
                case 2:url="/coupon/Apicoupon/member_user_coupon_list";status=3;break;
            }
            axios({
                url: url,
                params: {
                    status: status,
                    page: this.page,
                    pagesize: this.pagesize,
                }
            }).then((data)=>{
                this.loading = false;
                if(data.err!=0){this.over=true; return;}
                this.page++;
                if(data.count<=this.pagesize){
                    this.dataList = data.data;
                    this.over = true;
                }else{
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            })
        },
        changeTavs(){
            this.page = 1;
            this.over = false;
            this.dataList = [];
            // this.getData();
        },
        getIntegral(id){
            axios({
                url: "/coupon/Apicoupon/member_coupon_submit",
                params: {couponid: id},
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("领取成功");
                this.active = 1;
            })
        }
    },
    created(){
    }
}


</script>
<style scoped>
body{
	background: #F4F6FA;
	padding-bottom:1rem;
    position: relative;
}
#app{
	background: #fff;
}
.main{box-sizing:border-box; height:100%; padding-top:1rem;}
.noCoupon_bg{width:3.6rem; height:auto;}
.nodata{margin-top:60px;}

.list-box-height{position:relative;}
.list-box{position:absolute; top:0; bottom:0; left:0; right:0; overflow-y:auto; padding:0 0.2rem;}
.list-box .item{position:relative; box-sizing:border-box; padding:0.1rem; margin:0 auto 0.14rem; width:7.1rem; height:2.1rem; background: url(~@/assets/mycoupon/lingquan_blue.png) no-repeat center center/100% 100%;}
.list-box .item.odd{background: url(~@/assets/mycoupon/lingquan_orange.png) no-repeat center center/100% 100%;}
.list-box .item .left{width:2rem;}
.list-box .item .center{flex:1; padding-left:0.3rem;}
.list-box .item .right{width:1rem;}
.list-box .item .num{font-size:0.4rem;}

</style>


