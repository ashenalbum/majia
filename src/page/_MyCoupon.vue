<template>
    <div id="app">
        <!-- 返回 -->
         <!-- 头部菜单 -->
      <HeadNav></HeadNav>
        <!-- <van-nav-bar
            title="优惠券"
            left-text="返回"
            v-show="this.HeaderBool"
            left-arrow
            fixed
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <van-icon name="cross" slot="left" />
            <van-icon name="ellipsis" slot="right" />
        </van-nav-bar> -->
        <!-- 优惠券使用情况 -->
        <div class="main">

        <van-tabs v-model="active" line-width="40px" title-active-color="#2E8AF6"  color="#2E8AF6">
            <van-tab title="待领取">
                <div class="quan_box">
                    <img class="noCoupon_bg" v-if="couponBool" src="~@/assets/mycoupon/noCoupon.png" alt="">
                    <p class="tishi" v-if="couponBool">暂无优惠券</p>
                    <div v-for="(val,index) in couponData1" :key="index">
                        <div v-if="index%2!==0" class="ou_quan quan">
                            <div class="left">
                                <p class="num hidden1" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                                <p class="num hidden1" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                                <p class="text">全场通用</p>
                            </div>
                            <div class="center">
                                <p class="kuanghuan">{{val.title}}</p>
                                <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                                <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                            </div>
                            <div class="right" @click="getIntegral(val.id)">
                                <p>立即领取</p>
                            </div>
                            <p class="useArea" @click="useDetails(val.descnibe)">
                                <span>?</span>
                            </p>
                        </div>
                        <div v-if="index%2==0" class="quan">
                            <div class="left">
                                <p class="num hidden1" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                                <p class="num hidden1" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                                <p class="text">全场通用</p>
                            </div>
                            <div class="center">
                                <p class="kuanghuan">{{val.title}}</p>
                                <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                                <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                            </div>
                            <div class="right" @click="getIntegral(val.id)">
                                <p>立即领取</p>
                            </div>
                            <p class="useArea" @click="useDetails(val.descnibe)">
                                <span>?</span>
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="未使用">
                <div class="quan_box no_used">
                    <img class="noCoupon_bg" v-if="couponBool2" src="~@/assets/mycoupon/noCoupon.png" alt="">
                    <p class="tishi" v-if="couponBool2">暂无优惠券</p>
                    <div v-for="(val,index) in couponData2" :key="index">
                        <div v-if="index%2!==0" class="ou_quan quan">
                            <div class="left">
                                <p class="num hidden1" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                                <p class="num hidden1" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                                <p class="text">全场通用</p>
                            </div>
                            <div class="center">
                                <p class="kuanghuan">{{val.title}}</p>
                                <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                                <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                                <p class="endTime man" v-if="val.endtime">到期时间：{{val.endtime | date(format = 'yyyy-MM-dd')}}</p>
                            <p class="endTime man" v-if="val.endtime == 0">到期时间：永久有效</p>
                            </div>
                            <div class="right">
                                <p>未使用</p>
                            </div>
                            <p class="useArea" @click="useDetails(val.descnibe)">
                                <span>?</span>
                            </p>
                        </div>
                        <div v-if="index%2==0" class="quan">
                            <div class="left">
                                <p class="num hidden1" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                                <p class="num hidden1" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                                <p class="text">全场通用</p>
                            </div>
                            <div class="center">
                                <p class="kuanghuan">{{val.title}}</p>
                                <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                                <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                                <p class="endTime man" v-if="val.endtime">到期时间：{{val.endtime | date(format = 'yyyy-MM-dd')}}</p>
                                <p class="endTime man" v-if="val.endtime == 0">到期时间：永久有效</p>
                            </div>
                            <div class="right">
                                <p>未使用</p>
                            </div>
                            <p class="useArea" @click="useDetails(val.descnibe)">
                                <span>?</span>
                            </p>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="已使用">
                <div class="quan_box">
                    <img class="noCoupon_bg" v-if="couponBool3" src="~@/assets/mycoupon/noCoupon.png" alt="">
                    <p class="tishi" v-if="couponBool3">暂无优惠券</p>
                    <div v-for="(val,index) in couponData3" class="quan used" :key="index">
                        <div class="left">
                            <p class="num hidden1" v-if="val.type !== 2"><span>￥</span>{{val.discount}}</p>
                            <p class="num hidden1" v-if="val.type == 2">{{(val.discount/100)}}<span>折</span></p>
                            <p class="text">全场通用</p>
                        </div>
                        <div class="center">
                            <p class="kuanghuan" style="color:#9898A0;">{{val.title}}</p>
                            <p class="man" v-if="val.type !== 2">满{{val.full_reduction}}减{{Math.floor(val.discount)}}</p>
                            <p class="man" v-if="val.type == 2">满{{val.full_reduction}}打{{(val.discount/100)}}折</p>
                            <p class="endTime man" v-if="val.endtime">到期时间：{{val.endtime | date(format = 'yyyy-MM-dd')}}</p>
                            <p class="endTime man" v-if="val.endtime == 0">到期时间：永久有效</p>
                        </div>
                        <div class="right">
                            <p>已使用</p>
                        </div>
                        <p class="useArea" @click="useDetails(val.descnibe)">
                            <span>?</span>
                        </p>
                        
                    </div>
                </div>
            </van-tab>
            <van-popup class="fanwei" v-model="showArea"><h1 align="center">适用范围</h1>
                <hr />
                <p style="margin-top:.1rem;color:#666" v-html="content" v-if="content">
                    <!-- {{content}} -->
                </p>
            </van-popup>
        </van-tabs>
        <!-- 领取优惠券弹出层 -->
        <van-popup v-model="showSuccess">
        <img
            src="~@/assets/mycoupon/getIntegral.png"
            alt
            style="width:5.37rem;height:3.55rem; position: relative;"
        />
        <div class="Successfully">
            <p>
            <img src="~@/assets/mycoupon/Check_mark.png" style="width:1.12rem;height:0.74rem;" alt />
            </p>
            <h1>领取成功</h1>
        </div>
        </van-popup>
        </div>

    </div>
</template>
<script>
import HeadNav from "../components/HeadNav"; //头部菜单
import axios from "../utils/axios";

export default {
    components: {
    HeadNav
  },
    data() {
        return {
            active: 0,
            showSuccess:false,
            couId:'',
            HeaderBool:false,
            "couponData1": [],
            "couponData2": [],
            "couponData3": [],
            showArea:false,
            // 触底加载
            loading: false,
            loadingMore: false,//loading 加载更多
            isScroll: true,//是否可以滚动
            page: 1,
            pagesize:10,
            content:"",
            couponBool:false,
            couponBool2:false,
            couponBool3:false,
        };
    },
    methods: {
        onClickLeft() {
            history.go(-1);
        },
        onClickRight() {
            console.log("按钮");
        },
        useDetails(c){
            this.showArea = true;
            if(c){
                this.content = c;
            }else{
                this.content = "暂无";
            }
        },
        getIntegral(i) {
            // 立即领取
            var that  = this;
            var params4 = {};
            params4['url'] = 'coupon/Apicoupon/member_coupon_submit';
            params4['param'] = { couponid:i};
            params4['success'] = function(d){
                console.log(d.data)
                // that.couponData1 = d.data;
                that.showSuccess = true;
                // 待领取
                var params = {};
                params['url'] = 'coupon/Apicoupon/member_getList';
                params['success'] = function(d){
                    // console.log(d)
                    that.couponData1 = d.data;
                    if(that.couponData1.length == 0){
                        that.couponBool = true;
                    }else{
                        that.couponBool = false;
                    }
                };
                // --
                // httpConfig.getJson(params);
                
                //  未使用
                var params5 = {};
                params5['url'] = 'coupon/Apicoupon/member_user_coupon_list';
                params5['param'] = { status: 1};
                params5['success'] = function(d){
                    console.log(d.data)
                    that.couponData2 = d.data;
                    if(that.couponData2.length == 0){
                        that.couponBool2 = true;
                    }else{
                        that.couponBool2 = false;
                    }
                };
                // --
                // httpConfig.getJson(params5);
            };
            //--
            // httpConfig.getJson(params4);
            
        },
        // 翻页，触底加载更多
        scrollMoreData() {
            const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
            const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
            const offsetHeight =  document.body.offsetHeight || document.documentElement.offsetHeight //网页可见区域高(包括边线的宽)
            
            //  console.log(scrollTopHeight, clientHeight, scrollTopHeight + clientHeight + 50, offsetHeight)
            if ((scrollTopHeight + clientHeight) + 50 >= offsetHeight && this.isScroll) {
            // 显示加载符
            this.bus.$emit('bLoading', true);
               this.isScroll = false;
                this.loadingMore = true;
                // alert(1)
                let pageNo = this.page += 1;
                // 请求第二页
                var that  = this;
                // 待领取触底加载
                var params3 = {};
                params3['url'] = 'coupon/Apicoupon/member_getList';
                params3['param'] = {
                    status: 0,
                    page: pageNo,
                    pagesize: this.pagesize,
                    sort:"addtime",
                    sort_type:"desc"
                };
                params3['success'] = function(d){
                    console.log(d.data)
                    that.bus.$emit('bLoading', false);
                    that.loadingMore = false
                    if (d.data.length > 0) {
                        that.isScroll = true
                        that.couponData1 = [...that.couponData1, ...d.data]
                    } else {
                        // that.show = true
                    }
                };
                axios({
                    url: params3.url,
                    params: params3.param,
                }).then(params3.success);
                // --
                // httpConfig.getJson(params3);
                // 未使用触底加载
                var params4 = {};
                params4['url'] = 'coupon/Apicoupon/member_user_coupon_list';
                params4['param'] = {
                    status: 1,
                    page: pageNo,
                    pagesize: this.pagesize,
                    sort:"addtime",
                    sort_type:"desc"
                };
                params4['success'] = function(d){
                    console.log(d.data)
                    that.loadingMore = false
                    if (d.data.length > 0) {
                        that.isScroll = true
                        that.couponData2 = [...that.couponData2, ...d.data]
                    } else {
                        // that.show = true
                        // console.log(111111111111111111)
                    }
                };
                // --
                // httpConfig.getJson(params4);
                // 已使用触底加载
                var params5 = {};
                params5['url'] = 'coupon/Apicoupon/member_user_coupon_list';
                params5['param'] = {
                    status: 3,
                     page: pageNo,
                    pagesize: this.pagesize,
                    sort:"addtime",
                    sort_type:"desc"
                };
                // this.pagesize
                params5['success'] = function(d){
                    console.log(d.data)
                    that.bus.$emit('bLoading', false);
                    that.loadingMore = false
                    if (d.data.length > 0) {
                        that.isScroll = true
                        that.couponData3 = [...that.couponData3, ...d.data]
                    } else {
                        // that.show = true
                        // console.log(22222222222222222222222)/
                        // Toast("已到底！")
                    }
                };
                // --
                // httpConfig.getJson(params5);
            }
        },
    },
    created: function() {
        this.$emit("footer", false);
        // 接受路由中带过来的showHeader
        // this.HeaderBool = this.$route.meta.showHeader;
    },
    mounted:function(){
        document.addEventListener('scroll', this.scrollMoreData, false)
        // 待领取
        var that  = this;
        var params = {
            sort:"addtime",
            sort_type:"desc"
        };
        params['url'] = 'coupon/Apicoupon/member_getList';
        params['success'] = function(d){
            console.log(d.data)
            that.couponData1 = d.data;
            if(that.couponData1.length == 0){
                that.couponBool = true;
            }else{
                that.couponBool = false;
            }
        };
        
        axios({
            url: params.url,
            params: params.param,
        }).then(params.success);
        // --
        // httpConfig.getJson(params);
        // 未使用
        var params1 = {};
        params1['url'] = 'coupon/Apicoupon/member_user_coupon_list';
        params1['param'] = { 
            status: 1,
            sort:"addtime",
            sort_type:"desc"
            };
        params1['success'] = function(d){
            console.log(d.data)
            that.couponData2 = d.data;
            if(that.couponData2.length == 0){
                that.couponBool2 = true;
            }else{
                that.couponBool2 = false;
            }
        };
        // --
        // httpConfig.getJson(params1);
        // 已使用
        var params2 = {};
        params2['url'] = 'coupon/Apicoupon/member_user_coupon_list';
        params2['param'] = { 
            status: 3,
            sort:"addtime",
            sort_type:"desc"
            };
        params2['success'] = function(d){
            console.log(d.data)
            that.couponData3 = d.data;
            if(that.couponData3.length == 0){
                that.couponBool3 = true;
            }else{
                that.couponBool3 = false;
            }
        };
        // --
        // httpConfig.getJson(params2);
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
.main{
    padding-top: 1rem;
}
/* 头部 */
.van-nav-bar {
    background-color: #F4F6FA;
    z-index: 99999 !important;
}
.van-nav-bar__title {
    color: #000;
    font-weight: bold;
    font-size:.34rem;
}
.van-nav-bar .van-icon {
    color: #000;
}
/* 标签栏 */
.van-tab span{
    font-size: .3rem;
    color: #141418;
    font-weight: 400;
}
.van-tabs__line{
    width: .8rem;
    height: .06rem;
    color: #529DF7;
    z-index: 9999;
}
/* 券列表 */
.quan_box{
    width: 7.1rem;
    min-height: 100vh;
    margin: .24rem auto;
    position: relative;
}
.quan_box .quan{
    width: 100%;
    height: 2.1rem;
    background: url(~@/assets/mycoupon/lingquan_blue.png) no-repeat center center/100% 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .14rem;
    position: relative;
}
.quan_box .ou_quan{
    background: url(~@/assets/mycoupon/lingquan_orange.png) no-repeat center center/100% 100%;
}
.quan_box .quan .useArea{
  position: absolute;
  left:.06rem;
  bottom: .09rem;
  width: 0rem;
  height: 0rem;
  border-left:.3rem solid   #FA7D00;
  border-bottom:.3rem solid   #FA7D00;
  border-right:.3rem solid   transparent;
  border-top:.3rem solid   transparent;
  color: #fff;
  border-radius: .1rem;
}
.quan_box .quan.used .useArea{
    border-left-color: #9898A0;
    border-bottom-color: #9898A0;
}
.quan_box .quan .useArea span{
    display: block;
  margin-left:-.18rem;
  margin-top:-.05rem; 
}
.fanwei.van-popup{
   width: 60%;
    background: #fff;
    border-radius: .2rem;
    padding: .2rem;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(231, 234, 240, 1);
    /* box-shadow: 0px 5px 8px 0px rgba(218,218,218,0.34); */
  }
.fanwei.van-popup p{
    height: 85%;
    font-size:0.2rem;
    /* word-wrap:break-word;  */
    word-break: break-all;
    line-height: .4rem;
  }
hr {
    margin:.12rem 0 .08rem;
    height:.01rem;
    background: #E5E5E5;
    border:none;
    border-top:.01rem dotted #E5E5E5;
}
.quan_box .quan .left{
    width: 2.1rem;
    height: 2.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #2E8AF6;
}
.quan_box .quan .left .num{
    width: 1.8rem;
    overflow: hidden;
    font-size: .6rem;
    text-align: center;
}
.quan_box .quan .left .num span{
    font-size: .24rem;
}
.quan_box .quan .left .text{
    margin-top: .07rem;
    font-size: .26rem;
    color: #2E8AF6;
}
.quan_box .ou_quan .left .text,.quan_box .ou_quan .left .num{
    color: #FA7E00;
}
.quan_box .quan .center{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 3rem;
}
.quan_box .quan .center .kuanghuan{
    font-size: .32rem;
    font-weight: 400;
    color: #000;
}
.quan_box .quan .center .man{
    font-size: .24rem;
    color: #999;
    margin-top: .2rem;
}
.quan_box .quan .right{
    height: 100%;
    width: .95rem;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-right: .1rem;
}
.quan_box .quan .right p{
    width: .54rem;
    color: #fff;
    font-size: .26rem;
    line-height: .32rem;
}
/* 未使用 */
.quan_box.no_used .quan .right p{
    line-height: .32rem;
    width: .26rem;
}
/* 已使用 */
.quan_box .quan.used{
    color: #9898A0 !important;
    background: url(~@/assets/mycoupon/used_quan.png) no-repeat center center/100% 100%;
    align-items: center;
}
.quan_box .quan.used .num,.text,.kuanghuan,.quan_box .quan.used .text{
    color: #9898A0;
}
.quan_box .quan.used .num span{
    color: #9898A0;
}
.quan_box .quan.used .right{
    height: 100%;
    padding-bottom: .1rem;
    box-sizing: border-box;
}
.quan_box .quan.used .right p{
    line-height: .32rem;
    width: .26rem;
}
/* 领取积分弹窗 */
.van-popup{
    background: none;
}
.Successfully {
  text-align: center;
  width: 1.2rem;
  height: 1.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.6rem;
  margin-left: -0.5rem;
}
.Successfully h1 {
  font-size: 0.3rem;
  font-weight: 400;
  margin-top: 0.3rem;
  color: #fff;
}
.b_loading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    width: 100%;
    height: 10%;
    color: #333;
    background-color: yellow;
    position: fixed;
    bottom: 0;
    left: 0;
}
.b_loading p {
    /* padding: .15rem .15rem .2rem; */
    color: #fff;
    font-size: .16rem;
}
.b_loading img {
    width: .2rem !important;
    height: .2rem !important;
}
.noCoupon_bg{
    position: absolute;
    width: 100%;
    left: 0;
    top:50%;
    transform: translateY(-50%)
}
.tishi{
    position: absolute;
    text-align: center;
    width: 100%;
    top:25%;
}
</style>


