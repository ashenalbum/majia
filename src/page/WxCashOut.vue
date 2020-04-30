<template>
  <div id="app">
    <!-- 返回 -->
       <!-- 头部菜单 -->
      <HeadNav></HeadNav>
    <!-- 返回 -->
    <!-- main开始 -->
    <div class="box">
      
    <main v-for="(item,index) in btnData" :key="index" v-show="pointType == item.point_type">
      <div class="balance_box">
        <p class="balance_text">账户余额（{{item.point_unit}}）</p>
        <p class="balance">{{item.point.toFixed(item.point_decimal)}}</p>
      </div>
      <div class="btn_box">
        <van-radio-group v-if="btnData.length!== 1" v-model="radio">
          <van-radio clickable v-for="(item,index) in btnData" :key="item.id" @click="getType(item.point_type)" :name="index" checked-color="#07c160" >{{item.point_name}}</van-radio>
        </van-radio-group>
      </div>
      <p class="tixian_text">提现金额</p> 
      <van-cell-group>
          <!-- @input.native="Check_number($event)" -->
        <van-field
          v-model="cashoutNum"
          clearable
          placeholder="请输入提现金额"
          @click-right-icon="$toast('question')"
        />
        <van-button type="default" v-for="item in btnData" v-show="pointType == item.point_type" @click="cashedAll(item.point)" :key="item.id">全部提现</van-button>
      </van-cell-group>
       <!-- 判断手续费 -->
      <p class="shouxufei" v-if="item.proceduresType == 0 && item.point_type == pointType">收取 ( <span>{{(item.proceduresNum*cashoutNum).toFixed(item.point_decimal)}}{{item.point_unit}}</span> )手续费 实际到账金额为 <span v-if="cashoutNum">{{((cashoutNum-item.proceduresNum*cashoutNum)*item.ratio).toFixed(item.point_decimal)}}{{item.point_unit}}</span><span v-else>0{{item.point_unit}}</span></p>
            
      <p class="shouxufei" v-if="item.proceduresType == 1 && item.point_type == pointType">收取{{item.proceduresNum}}%（<span>{{(cashoutNum*(item.proceduresNum)/100).toFixed(item.point_decimal)}}{{item.point_unit}}</span> )手续费 实际到账金额为 <span>{{((cashoutNum-cashoutNum*(item.proceduresNum)/100)*item.ratio).toFixed(item.point_decimal)}}{{item.point_unit}}</span></p>
      <p class="mt-10 c_99 fs_24">提现金额最低0.3元最高5000元，每日限提现一次</p>
      <van-button class="querenBtn" round type="danger" @click="toCash()">确认提现</van-button>
    </main>
    </div>

  </div>
</template>
<script>
// import httpConfig from '@/config/httpConfig.js'
import axios from '../utils/axios';
import HeadNav from "../components/HeadNav"; //头部菜单

import { Toast } from 'vant';

export default {
    name: "HelloWorld",
    components: {
        HeadNav
    },
    data() {
        return {
            HeaderBool:false,
            cashoutNum:'',
            btnData:[],
            radio:0,
            pointType:"",

            btnTaching: false,
        };
    },
    methods: {
        Check_number(e) {
            let flag = /^\d+(\.\d{1,2})?$/.test(e.target.value);
            if (!flag) {
                Toast("请输入正数");
                e.target.value = "";
            }
        },
        onClickLeft() {
            this.$router.go(-1);//返回上一层
        },
        onClickRight() {
            console.log("按钮");
        },
        getType(t){
            this.pointType = t;
            this.cashoutNum = "";
        },
        cashedAll(n){
            this.cashoutNum = n;
        },
        toCash(){
            if(this.btnTaching){return}
            let flag = /^\d+(\.\d{1,2})?$/.test(this.cashoutNum);
            if (!flag) {Toast("请输入正确的金额");return}
            this.btnTaching = true;
            // 微信提现
            axios({
                url: "/accounts/Apipoint/member_submit_withdrawal",
                params: {
                    point: this.cashoutNum,
                    point_type:this.pointType,
                    type:1,
                }
            }).then((data)=>{
                this.btnTaching = false;
                if(data.err!=0){
                    Toast(data.content);
                    return
                }
                Toast("已申请提现");
                this.$router.push("./profit");
            }).catch(()=>{
                this.btnTaching = false;
            })
        }
    },
    created () {
        this.getType("money");
        // this.$emit("footer", false);
        // 微信提现页面内容接口
        axios({
            url: "/accounts/Apipoint/member_withdrawal_list",
        }).then((data)=>{
            this.btnData = data.data;
            this.pointType = data.data[0].point_type;
        })
    }
}
</script>

<style scoped>
body{
	background: #F4F6FA;
}
#app{
	background: #fff;
  box-sizing: border-box;
}
.box{
  box-sizing: border-box;
  padding: 1rem 0.24rem 0 0.24rem;
}
/* 头部 */
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
/* main */
.van-radio{
  overflow: visible;
}
.btn_box{
  width: 100%;
  /* height: 1rem; */
  background: #fff;
  margin-top: .3rem;
}
.van-radio-group{
  width: 100%;
  /* height:; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.van-radio{
  height:1rem;
}
.balance_box{
  width:7.02rem;
  height:1.6rem;
  background:url(../assets/other/yu_e_bg.png) no-repeat center center/100% 100%;
  padding: .16rem .3rem;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.balance_text{
  height:.32rem;
  font-size:.3rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.balance{
  font-size:.72rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.tixian_text{
  margin-top: .3rem;
  font-size:.3rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(20,20,24,1);
  line-height:.4rem;
  margin-left: .05rem;
}
.van-cell-group{
  width: 6.9rem;
  height: 1.14rem;
  margin: 0 auto;
}
.van-field{
  width: 5.3rem;
  height: 100%;
  float: left;
}
.van-cell{
  padding: .4rem .15rem .3rem 0;
  box-sizing: border-box;
}
.van-button{
  width: 1.4rem;
  height:100%;
  float: left;
}
.van-button[data-v-59c6271a] {
    width: 1.6rem;
    height: 80%;
    float: left;
    border: none;
    border-left: .01rem solid rgba(242,242,244,1);
    margin-top: 2%;
    text-align: center;
}
.van-button--normal{
  padding: 0;
}
.van-field__control{
  height: 100%;
  background: red;
}
[class*=van-hairline]::after{
  border: none;
  border-bottom: .1rem solid  rgba(242,242,244,1);
}
.shouxufei{
  font-size:.24rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(20,20,24,1);
  line-height:.4rem;
  margin-top: .32rem;
  /* margin-left: .1rem; */
}
.shouxufei span{
  color: #FA7D00;
}
.querenBtn{
  width:6.70rem !important;
  height:.70rem;
  background:rgba(250,125,0,1);
  border-radius:.5rem;
  font-size:.3rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  margin: .4rem auto 0 !important;
  line-height:.70rem;
}
.beizhu_box{
  width: 100%;
  font-size:0.24rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(151,151,159,1);
  line-height:0.4rem;
  margin-top: 2rem;
}
</style>
