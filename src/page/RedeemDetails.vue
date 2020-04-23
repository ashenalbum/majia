<template>
  <div id="app">
      <HeadNav></HeadNav>

    <!-- <van-nav-bar
          title="核销密码验证"
          left-text="返回"
          left-arrow
          :fixed=true
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="" slot="right" /> 
      </van-nav-bar> -->
     <!-- 订单情况 -->
     <div class="contanier">
        <div class="goods_box">
          <div class="left_box">
            <img :src="AllData.head_pic_img&&AllData.head_pic_img.length&&AllData.head_pic_img[0].pic_img" alt="">
          </div>
          <div class="right_box">{{AllData.title}}</div>
        </div>
        <div class="erweima_box">
            <van-field
              v-model="random_code"
              center
              clearable
              label="核销码"
              placeholder="请扫描核销码"
            >
              <van-button slot="button" icon="scan"   size="small" @click="SweepCode()"></van-button>
            </van-field>
        </div>
        <div class="main_box">
          <div class="oder_box" v-if="OrderData.length!==0">
              <ul>
                <li class="Coupon_title">订单信息</li>
                <div class="line"></div>
                <li><p >订单编号</p><p class="Coupon_text">{{OrderData.order_sn}}</p></li>
                <li><p>商品名称</p><p class="Coupon_text">{{OrderData.title}}</p></li>
                <li><p>购买人</p><p class="Coupon_text">{{OrderData.nickname}}</p></li>
                <li><p>购买金额</p><p class="Coupon_text">{{OrderData.order_amount}}元</p></li>
                <li><p >购买时间</p><p class="Coupon_text">{{OrderData.addtime}}</p></li>
              </ul>
              <br>
          </div>
                  <div class="content" v-html="AllData.redeem_content">
                    兑奖
                   </div>
                <div class="gruop" >
                    <van-tabbar v-model="active" class="bottom_main" :fixed="false" active-color="#E13E3F">
                        <van-tabbar-item @click="Save_hexiao()" icon>
                          <button class="buying_btn">确认核销</button>
                        </van-tabbar-item>
                      </van-tabbar>
               </div>
        </div>
     </div>
  </div>
</template>
<script>
import axios from "../utils/axios";
import { Toast } from "vant";
import HeadNav from "../components/HeadNav"; //头部菜单
import wx from "weixin-js-sdk";

export default {
    name: "app",
    components: {HeadNav},
    data() {
        return {
            active:0,
            activity_id: null,
            duijiang:false,//兑奖
            redeem_content:"",
            theme:'snow',
            Page_id:"",
            AllData:[],
            code:"",
            sms:"",
            //wechaturl:"",
            random_code:"",
            OrderData:[]
        };
    },
    created() {
        this.activity_id = this.$route.query.activity_id1;
        this.random_code = this.$route.query.random_code;
        this.getData();
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1); //返回上一层
        },
        SweepCode(){
            wx.scanQRCode({
                // 微信扫一扫接口
                desc: "scanQRCode desc",
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success:(res)=>{
                    this.random_code = res.resultStr;
                }
            });
        },
        Save_hexiao(){
            axios({
                url: "/activity/Apiactivity/write_off",
                params: {random_code: this.random_code},
            }).then((data)=>{
                if(data.err!=0){return}
                Toast('核销成功');
                this.OrderData =[];
                this.random_code="";
            })
        },
        // 获取活动信息
        getData(){
            axios({
                url: "/activity/Apiactivity/previewTemplateInfo",
                params: {activity_id: this.activity_id},
            }).then((data)=>{
                if(data.err!=0){return}
                this.AllData = data.data;
            })
        }
    },
};
</script>
<style scoped>
#app{
    height:100vh;
	background: #eee;
  padding-top: 0;
}
/* 头部开始 */
#app .van-nav-bar {
  background-color: #fff;
  z-index: 99999;
}
#app .van-nav-bar__title {
  color: #000;
  font-size:.3rem;
  font-weight:bold;
}
#app .van-nav-bar .van-icon {
  color: #000;
}
.contanier{
  padding-top: 1rem;
}
.main_box{
  width: 94%;
  box-sizing: border-box;
  margin: 0.5rem auto;
}
.gruop{
  margin: 0.5rem 0;
}
.gruop .title{
  line-height: 0.5rem;
  font-size: 0.28rem;
}
.please_text{
  color: #999;
  font-size: 0.28rem;
}
#app>>>.van-cell{
  border: 1px solid #c2cad8;
  padding: 5px 10px;
}
/* 底部返回 */
.list_bom{
  width: 95%;
  box-sizing: border-box;
  margin: 0.4rem auto;
  text-align: center;
}
.goods_box{
   width: 100%;
   background-color: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  padding: 1% 5%;
}
.left_box{
  width: 1.5rem;
}
.left_box img{
  width: 1.5rem;
  height: 1.5rem;
}
.right_box{
  padding: 0.1rem;
  margin-left: 0.2rem;
  font-size: 0.26rem;
   box-sizing: border-box;
}
.oder_box{
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0.2rem auto 0.2rem auto;
  padding:0 0.2rem ;
}
.content{
  width: 95%;
  box-sizing: border-box;
  margin: 0 auto;
}
.content>>>*{
  width: 100%;
}
.erweima_box{
   width: 100%;
   background-color: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  margin: 0.2rem 0 0 0;
  padding: 1% 5%;
}
.oder_box li{
  height: 0.6rem;
  color: #7c7777;
  line-height: 0.6rem;
  display: flex;
  font-size: 0.28rem;
}
li.Coupon_title{
  color: #000;
  font-weight: bold;
}

.Coupon_text{
  margin-left: 0.2rem;
  color: #757070;
  font-size: 0.26rem;
}
.line{
  width: 100%;
  margin: 0 auto;
  border: 0.5px dashed #ccc;
}
.buying_btn {
  width: 6.7rem;
  text-align: center;
  height: 0.7rem;
  color: #fff;
  line-height: 0.7rem;
  background: red;
  border-radius: 40px;
  font-size: 0.3rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.van-tabbar{
      background-color: #eee;
}
</style>
