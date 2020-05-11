<template>
    <div id="app">
      <!-- 返回 -->
       <!-- 头部菜单 -->
      <HeadNav></HeadNav>
        <!-- <van-nav-bar
          title="兑换码"
          left-text="返回"
          left-arrow
          :fixed=true
           v-show='this.HeaderBool'
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
        <van-icon name="cross" slot="left" />
        <van-icon name="ellipsis" slot="right" />
      </van-nav-bar> -->
      <!-- 输入兑换码 -->
      <div class="main">
            <div class="duihuan_box">
                <img src="../assets/other/duihuan_bg.png" alt="">
                <p class="title">请输入兑换码</p>
                <!-- <van-field         
                    :v-model="num"
                    maxlength="19" 
                    placeholder="请输入兑换码"
                    @touchstart.native.stop="show = true"
                    /> -->
                    <van-field class="dhm-ipt" v-model="value" maxlength='19'  placeholder="请输入兑换码">
                        <template #button>
                            <van-button _icon="scan" size="small" type="primary" @click="saoma">扫一扫</van-button>
                        </template>
                    </van-field>

                    <!-- <van-number-keyboard
                    :show="show"
                    maxlength="10"    
                    @input="onInput"
                    @delete="onDelete"
                    @blur="show = false"
                    /> -->

                <!-- <input class="exchange_box" clearable maxlength="5" v-model="num"  @blur="getCode(num)" type="text"  placeholder="请输入兑换码"> -->
            </div>
            <p class="exchange_shuoming">兑换码说明</p>
            <div class="shuoming_text_box">
                <p class="shuoming_text">1、兑换码是由商家通过特定渠道发放给用户的一种优惠形式，作为兑换商家店铺内商品或优惠券的凭证，成功兑换后，将自动保存于用户的个人帐户中。</p>
                <p class="shuoming_text">2、同一个兑换码或者兑换码链接，只能被一个用户兑换，不被其他用户重复兑换。</p>
                <p class="shuoming_text">3、使用兑换码兑换成功的优惠券支付订单时，优惠券金额高于订单金额的差额部分，不找零不兑换；优惠券金额低于订单金额的，差额部分由用户支付。</p>
                <p class="shuoming_text">4、详细内容请咨询商家。</p>
            </div>
            <a class="exchange_btn" @click="toExchange()">立即兑换</a>
      </div>
     
    </div>
</template>
<script>

// import httpConfig from '@/config/httpConfig.js'
import axios from "../utils/axios";
import HeadNav from "../components/HeadNav"; //头部菜单
import { Toast } from 'vant';
import wx from "weixin-js-sdk";

export default {
    name: 'app',
     components: {
    HeadNav
  },
    data() {
        return {
         HeaderBool:false,
         num:"",
         show:false,
         value:""
        };
    },
    methods: {
        saoma(){
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success:(res)=>{
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    this.value = result;
                }
            });
        },
        onClickLeft() {
        history.go(-1);
        },
        onClickRight() {
        console.log("按钮");
        },
        // onInput(key){
        //     if(this.value.length>=19){
        //         key="";
        //     this.value =strInsert(this.value+key,4);
        //     }else{
        //         this.value =strInsert(this.value+key,4);
        //     }
        // },
        // onDelete(){
        //     this.value=this.value.substring(0,this.value.length-1) 
        // },
        
        getCode(n){
            console.log(typeof n)
            this.value = n;
            console.log(this.value)
        },
        toExchange(){
            if(this.value){
                // 兑换码
                axios({
                    url: "/giving/Apigiving/member_submit_code",
                    params: { code:this.value}
                }).then((data)=>{
                    if(data.err!=0){Toast(data.content);return}
                    Toast("兑换成功！")
                    this.$router.push({path:"/my_center"});
                }).catch(()=>{
                    Toast("error");
                    // alert(JSON.stringify(data))
                })
            }else{
                Toast("请输入兑换码！");
            }
        }
    },
    created: function() {
        // this.$emit("footer", false);
        // this.HeaderBool = this.$route.meta.showHeader;
    },
}
</script>
<style scoped>
#app{
	background: #fff;
	/* padding: .88rem 0 0; */
    position: relative;
}
/* 头部开始 */
.van-nav-bar {
  background-color: #F4F6FA;
}
.van-nav-bar__title {
  color: #000;
  font-weight: bold;
  font-size:.34rem;
}
.van-nav-bar .van-icon {
  color: #000;
}
body{
	background: #F4F6FA;
	padding: .88rem 0 1rem;
}
.main{
    box-sizing:border-box;
    padding-top: 1rem;
    height:100vh;
}
/* 头部结束 */
/* 输入兑换码开始 */
.duihuan_box{
    width: 6.64rem;
    height: 3.6rem;
    margin:0 auto;
    background-position: center center;
    background-size:100% auto;
    background-repeat:no-repeat;
    text-align: center;
    overflow: hidden;
    padding: .4rem 0;
    box-sizing: border-box;
    font-weight: 600;
    position: relative;
}
.duihuan_box img{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 0;
}
.duihuan_box .title{
    font-size: .34rem;
    color: #fff;
    text-align: center;
    font-weight: 400;
    letter-spacing:.05rem;
    z-index:9;
    position: relative;
}

.duihuan_box .exchange_box{
    width: 5.2rem;
    background: none;
    outline: none;
    font-size: .34rem;
    font-weight: 400;
    text-align: center;
    color: #fff;
    letter-spacing:.04rem;
    border-bottom: .04rem solid #fff;
    margin-top: 1.7rem;
    text-align: center;
    padding-bottom: .24rem;
    position: relative;
    z-index: 9;

}
.duihuan_box input::-webkit-input-placeholder{ 
    color:#fff;
}
/* 输入兑换码结束 */
/* 兑换码说明开始 */
.exchange_shuoming{
    font-size: .34rem;
    text-align: center;
    font-weight: 400;
    line-height: 1rem;
    height: 1rem;
    color: #0C0C10;
}
.shuoming_text_box{
    width: 6.64rem;
    height: 4.46rem;
    margin: .3rem auto .9rem;
    overflow: auto;
}
.shuoming_text{
    font-size:.22rem;
    font-weight:400;
    color:rgba(151,151,159,1);
    line-height:.48rem;
}
/* 兑换码说明结束 */
/* exchange按钮 */
.exchange_btn{
    width: 7.02rem;
    height: .98rem;
    display: block;
    margin: 0 auto;
    background:linear-gradient(0deg,rgba(116,214,254,1),rgba(19,118,249,1));
    border-radius:.49rem;
    font-size: .36rem;
    color: #fff;
    font-weight: 400;
    text-align: center;
    line-height: .98rem;
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.2rem;
}
/* 隐藏底部tab栏 */
.van-tabbar--fixed{
    display: none;
}
.dhm-ipt{position:relative; margin-top:1rem;}
/* 兑换码输入框 */
/* #app>>>.van-cell{
    position: absolute;
    left: 0;
    bottom: 10%;
    margin: 0 auto;
    border-bottom: .04rem solid #fff;
}
#app>>>.van-field__control{
    font-size: .34rem;
    letter-spacing:.02rem;
} */
</style>

