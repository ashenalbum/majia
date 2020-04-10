<template>
    <div id="app">
        <HeadNav></HeadNav>
        <div class="header_box">
            <div class="header_cont df df-r ai-c">
                <div class="header_left">
                    <img :src="this.inforData.headpath" alt />
                </div>
                <div class="header_right c_ff">
                    <!-- <van-notice-bar class="nickname" :text="inforData.nickname+''" /> -->
                    <div class="nickname one-hide">{{this.inforData.nickname}}</div>
                    <div class="mt-20 df df-r ai-c">
                        <van-icon name="star" />
                        <span> {{this.inforData.group_name}}</span>
                    </div>
                    <div v-if="End_time!==0 || true" class="mt-10 df df-r ai-c">
                        <span>会员到期时间：</span>
                        <span>{{End_time}}</span>
                        <!-- <van-notice-bar class="c_ff" :speed="30" :text="End_time+''"/> -->
                    </div>
                </div>
            </div>
            <div class="tab-bar">
                <a href="javascript:;" @click="tab(index,item)"
                    :key="index"
                    v-for="(item,index) in MemberData"
                    :class="{active : index===curId}"
                >
                    <span class="icon_box"></span>
                    <span>{{item.groupname}}</span>
                </a>
                <div class="line_box"></div>
            </div>
        </div>
        <!-- 选项卡 -->
        <div class="main2">
            <div class="tab_content">
                <div class="box">
                    <ul>
                        <li v-for="(item,index) in this.MoneyData" :key="index" @click="Sel_list(index,item)">
                            <p class="money_box" v-if="curId===0"> <img src="~@/assets/member/member_new1.png" alt /></p>
                            <p class="money_box" v-else> <img src="~@/assets/member/member_new2.png" alt /> </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="member_box">
                <div class="member_box_content">
                    <div v-html="this.describe"></div>
                </div>
            </div>
        </div>
        <van-tabbar v-model="Active" v-show="isShow" class="bottom_main" fixed active-color="#E13E3F">
            <van-tabbar-item>
                <p class="time">{{this.LastName}}</p>
                <p class="btm">
                    <span class="span btm_money">{{this.Lastmoney}}</span>
                    <span class="span"> {{this.Last_danwei}}</span>
                </p>
            </van-tabbar-item>
            <van-tabbar-item @click="Give_friends()" icon>
                <van-button size="small" type="info" color="#FA7D00" round>赠送好友</van-button>
                <!-- <button class="buying_btn">赠送好友</button> -->
            </van-tabbar-item>
            <van-tabbar-item @click="buy()" icon>
                <van-button size="small" color="#FA7D00" round>立即抢购</van-button>
                <!-- <button class="buying_btn">立即抢购</button> -->
            </van-tabbar-item>
        </van-tabbar>
        <van-popup round class="pay_btn" v-model="Payshow">
            <div class="pay_main">
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="微信支付" icon="chat" clickable>
                            <van-radio slot="right-icon" checked-color="#FA7D00" name="WX" />
                        </van-cell>
                        <!-- <van-cell title="账户余额" icon="card" clickable>
                            <van-radio slot="right-icon" checked-color="#FA7D00" name="Balance" />
                        </van-cell>-->
                    </van-cell-group>
                </van-radio-group>
                <div class="pay_Sign_btn df ai-c just-c-ct" @click="confirmPay()">
                    <button>确认支付</button>
                </div>
            </div>
        </van-popup>
        <!-- <GiveFriendPopup ref="selectfood"></GiveFriendPopup> -->
        <!-- 漂浮菜单 -->
        <!-- <BackHome></BackHome> -->
    </div>
</template>

<script>
import { Toast } from "vant";
import HeadNav from "../components/HeadNav"; //头部菜单
import axios from "../utils/axios";
import wx from "weixin-js-sdk";

// import BackHome from "../components/BackHome"; //漂浮菜单
export default {
    name: "",
    components: { HeadNav },
    data() {
        return {
            curId: 0,
            describe: "", //会员组描述
            required_id: "", //会员组
            Payshow: false,
            inforData: [],
            MemberData: [],
            MoneyData: [],
            radio: "WX",
            HeaderBool: false,
            MoneyBool: "A",
            active: "",
            isShow: true,
            Active: 0,
            LastName: "",
            Lastmoney: "",
            Last_danwei: "",
            prdoct_num: "",
            prdoct_danwei: "",
            payType: "",
            num1: "",
            isGive: "",
            showDlg: false,
            page_id: "",
            member_name: "",
            End_time: null,
            isbuy: "",
            group_id: "",
            dis_bool: false,
            // zIndex: 999
        };
    },
    methods: {
        getData() {
            // 获取会员列表
            axios({
                url: "/member/Apimember/member_group_list",
            }).then((data)=>{
                if(data.err!=0){return;}
                if(data.data.length == 0){
                    // 暂无更好级别会员
                    console.log(data); 
                    return;
                }
                var JsonData = data.data;
                this.isbuy = JsonData[0].is_buy;
                this.describe = JsonData[0].describe; //会员描述第一个
                this.MemberData = JsonData;
                let first_JsonData = []; //存放结算订单第一个的数组
                let index_num = "";
                for (let i in JsonData) {
                    if (this.page_id == JsonData[i].id) {
                        index_num = i;
                        this.curId = i;
                        return;
                    }
                }
                if (!this.page_id) {
                    this.MoneyData = JsonData[0].buy_price;
                    this.required_id = JsonData[0].id; //默认第一个id
                    first_JsonData = this.MoneyData[0];
                } else {
                    this.MoneyData = JsonData[index_num].buy_price;
                    this.required_id = this.page_id;
                    first_JsonData = this.MoneyData[0];
                }
                for (let i in this.MoneyData) {
                    if (this.MoneyData[i].type == "year") {this.MoneyData[i]["type2"] = "年";}
                    if (this.MoneyData[i].type == "month") {this.MoneyData[i]["type2"] = "月";}
                    if (this.MoneyData[i].type == "day") {this.MoneyData[i]["type2"] = "日";}
                    this.MoneyData[i]["Last_danwei"] = "/" + this.MoneyData[i]["type2"];
                    this.MoneyData[i]["month"] = this.MoneyData[i].num + this.MoneyData[i]["type2"]; //几年
                    this.MoneyData[i]["money"] = this.MoneyData[i].point; //积分或钱钱
                    this.MoneyData[i]["danwei"] = this.MoneyData[i].point_unit; //单位
                    this.MoneyData[i]["Average"] = (this.MoneyData[i].point / this.MoneyData[i].num).toFixed(2) + "/" + this.MoneyData[i]["type2"]; // 平均数
                }
                // 默认选中第一
                if (!first_JsonData) {
                    this.LastName = "";
                    this.Lastmoney = "";
                    this.Last_danwei = "";
                    this.prdoct_num = "";
                    this.prdoct_danwei = "";
                } else {
                    this.LastName = first_JsonData.month + "会员";
                    this.Lastmoney = "￥" + first_JsonData.money;
                    this.Last_danwei = first_JsonData.Last_danwei;
                    this.prdoct_num = first_JsonData.num; //时长
                    this.prdoct_danwei = first_JsonData.type; //时长
                }
            });

            axios({
                url: "/member/Apimember/member_getInfo"
            }).then((data)=>{
                let JsonData = data.data;
                this.group_id = JsonData.group_id;
                if (JsonData.endtime == 0) {
                    this.End_time = 0;
                } else {
                    let date= new Date(JsonData.endtime);
                    this.End_time = date.toISOString().slice(0,10) + " " + date.toTimeString().slice(0,5);
                }
                if (data.data.group_name == "") { JsonData.group_name = "普通会员"; }
                this.inforData = JsonData;
            })
        },
        Give_friends() {
            if (this.LastName!="" && this.Lastmoney!="" && this.Last_danwei!="") {
                this.Payshow = true;
                this.isGive = 1;
            }
        },
        confirmPay() {
            this.Payshow = false;
            // 确认支付
            axios({
                url: "/member/Apimember/member_group_pay",
                params: {
                    id: this.required_id,
                    interval: this.prdoct_num,
                    interval_unit: this.prdoct_danwei,
                    isGive: this.isGive,
                    pay_type: this.radio,
                    repeat: 1
                }
            }).then((data)=>{
                if (data.data && data.data.pay_type == "Balance") {
                    Toast("支付成功");
                    this.$router.push("./my_center");
                }else if(data.data && data.data.pay_type == "WX"){
                    let obj = data.data.returnData;
                    wx.chooseWXPay({
                        timestamp: obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: obj.nonceStr, // 支付签名随机串，不长于 32 位
                        package: obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: obj.paySign, // 支付签名
                        success: ()=>{
                            Toast("支付成功");
                            this.$router.push("./my_center");
                        },
                        fail: ()=>{
                            this.$router.push("./my_center");
                        }
                    });
                    this.getData();
                }
            })
        },
        buy() {
            console.log(this.required_id); //选项卡选中时的id
            console.log(this.group_id); // 当前会员级别
            if (this.required_id < this.group_id) {
                Toast("无法购买低级别会员");
            } else {
                if (this.LastName != "" && this.Lastmoney != "" && this.Last_danwei != "") {
                    this.radio = "WX";
                    this.Payshow = true;
                    this.isGive = 0;
                }
            }
        },
        tab(index,item) {
            // this.sel_group_id = id;
            this.isbuy = item.is_buy;
            this.active = 0;
            this.required_id = item.id;
            this.describe = item.describe;
            this.curId = index;
            this.MoneyData = this.MemberData[index].buy_price;
            // console.log(this.MemberData);
            for (let i in this.MoneyData) {
                this.MoneyData[i]["isbuy"] = this.MemberData[index].is_buy;
                if (this.MoneyData[i].type == "year") { this.MoneyData[i]["type2"] = "年"; }
                if (this.MoneyData[i].type == "month") { this.MoneyData[i]["type2"] = "月"; }
                if (this.MoneyData[i].type == "day") { this.MoneyData[i]["type2"] = "日"; }
                this.MoneyData[i]["Last_danwei"] = "/" + this.MoneyData[i]["type2"];
                this.MoneyData[i]["month"] = this.MoneyData[i].num + this.MoneyData[i]["type2"]; //几年
                this.MoneyData[i]["money"] = this.MoneyData[i].point; //积分或钱钱
                this.MoneyData[i]["danwei"] = this.MoneyData[i].point_unit; //单位
                this.MoneyData[i]["Average"] = (this.MoneyData[i].point / this.MoneyData[i].num).toFixed(2) + "/" + this.MoneyData[i]["type2"]; // 平均数
            }
            if (this.MoneyData[0] == undefined) {
                this.LastName = "";
                this.Lastmoney = "";
                this.Last_danwei = "";
                Toast("该会员组暂无内容");
            } else {
                this.LastName = this.MoneyData[0].month + "会员";
                this.Lastmoney = "￥" + this.MoneyData[0].money;
                this.Last_danwei = this.MoneyData[0].Last_danwei;
                this.prdoct_num = this.MoneyData[0].num; //时长
                this.prdoct_danwei = this.MoneyData[0].type; //时长
            }
        },
        Sel_list(index,item) {
            this.prdoct_num = item.num; //购买时长
            this.prdoct_danwei = item.type; //购买时长单位
            this.active = index;
            this.LastName = item.month + "会员";
            this.Lastmoney = "￥" + item.money;
            this.Last_danwei = item.Last_danwei;
        }
    },
    created() {
        this.page_id = this.$route.query.page_id;
        this.getData();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background-color: #eee;
  /* letter-spacing: 0.1rem; */
}
.van-nav-bar__title {
  color: #000;
}
.van-nav-bar .van-icon {
  color: #000;
}
#app {
  border: 1px solid transparent;
}

.header_box {
  width: 100%;
  margin: 0 auto;
  margin-top: 46px;
  background: #297fff url("~@/assets/member/member_bg.png") no-repeat center center/cover;
}
.header_cont {
  width: 90%;
  height: 3.4rem;
  margin:auto;
}
.header_left{margin-right: 0.4rem;}
.header_left img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.header_right {
  width: 5.5rem;
}
.header_right .nickname {
  font-size: 0.32rem;
  font-family: MicrosoftYaHei;
  font-weight: bold;
}
.header_right p {
  /* height: 0.23rem; */
  height: 0.4rem;
  line-height: 0.35rem;
  font-size: 0.22rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  /* color: #fa7d00; */
  color: #fff;
}

.tab-bar {
  width: 90%;
  margin: 0 auto;
  display: flex;
  border-radius: 0.2rem;
  position: relative;
}
/* 中间横线 */
.line_box {
  width: 1px;
  height: 1rem;
  background-color: #fff;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
}

.tab-bar a:first-child {
  margin-left: 0;
}
.tab-bar a {
  width: 100%;
  /* height: 1rem;
  line-height: 1rem; */
  height: 1.5rem;
  line-height: 2rem;
  text-align: center;
  font-size: 0.26rem;
  text-decoration: none;
  /* border-radius: 0.2rem; */
  /* border: 2px solid rgba(151, 151, 159, 1); */
  position: relative;
  z-index: 5;
  /* color: #000; */
  color: #fff;
  /* background: #edeaea; */
  background-image: url("~@/assets/member/vip_iconA.png");
  background-repeat: no-repeat;
  background-size: 0.7rem 0.7rem;
  background-position: 50% 0;
  background-color: #398af6;
}
.icon_box img {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  left: 50%;
  margin-left: -0.35rem;
  top: 0.1rem;
}
.tab-bar i {
  height: 1rem;
  line-height: 1rem;
}
.tab-bar .active {
  z-index: 50;
  /* background-color: #fff; */
  background-color: #398af6;
  border-bottom: none;
  background-image: url("~@/assets/member/vip_iconB.png");
  background-repeat: no-repeat;
  background-size: 0.7rem 0.7rem;
  background-position: 50% 0;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
/* 选项卡内容 */
.tab_content {
  width: 98%;
  margin: 0 auto;
  /* margin-left: 0.2rem; */
  border-bottom: 0.03rem solid #f4f6fa;
}
.tab_content .time {
  width: 100%;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(20, 20, 24, 1);
  background-color: #fff;
  padding: 0 0.1rem;
  position: relative;
  top: -0.2rem;
  left: -0.2rem;
  z-index: 999;
}

ul {
  white-space: nowrap;
  /* overflow-x: auto; */
  width: 100%;
  margin: 0 auto;
}
ul::-webkit-scrollbar {
  display: none;
}
ul li {
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  /* height: 1.8rem;
    line-height: 1.8rem; */
  /* background-color: #56ccf2; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* border-radius: 20px; */
  /* margin-right: 0.08rem; */
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: center;
  border-radius: 10%;
}
.mouth {
  font-size: 0.3rem;
  color: #141418;
  margin-top: 0.5rem;
}
.money_box span {
  color: #fff;
  font-size: 0.6rem;
  font-weight: bold;
}
.money_box img {
  width: 90%;
  height: 100%;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
}
.money_box .money {
  color: #fa7d00;
  font-size: 0.6rem;
  font-weight: bold;
}
.one_money {
  color: #97979f;
  padding-top: 0.2rem;
  font-size: 0.3rem;
}
/* 当前选中的样式 */
/* .addclass {
  background: rgba(255, 250, 245, 1);
  border: 2px solid #fa7d00;
} */
.member_box {
  width: 7.5rem;
  margin: 0.05rem auto 1.5rem auto;
  box-sizing: border-box;
}
.member_box h1 {
  font-size: 0.3rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #141418;
}
.member_box_content {
  width: 7.5rem;
  margin: 0.2rem auto;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.1rem;
}
.member_box_content >>> p {
  width: 100%;
}
.member_box_content >>> img {
  width: 95%;
  object-fit: cover;
  margin: 0 auto;
  text-align: center;
}
.bottom_main {
  border-top: 2px solid #e8ebf0;
}
.bottom_main .buying_btn {
  width: 2.1rem;
  text-align: center;
  height: 0.7rem;
  color: #fff;
  line-height: 0.7rem;
  background: rgba(250, 125, 0, 1);
  border-radius: 40px;
  font-size: 0.3rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.bottom_main .time {
  font-size: 0.22rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #141418;
}
.bottom_main .btm {
  margin-top: 0.15em;
}
.bottom_main .span {
  color: #97979f;
}
.bottom_main .btm_money {
  font-size: 0.3rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #fa7d00;
}
.pay_main {
  width: 90%;
  margin: 0 auto;
  padding: 0.1rem 0;
}
.pay_btn {
  width: 87%;
  box-sizing: border-box;
  border-radius: 0.5rem;
}
.pay_content {
  width: 6.9rem;
  margin: 0 auto;
  padding: 0.3rem;
  display: flex;
}
.pay_con_left {
  width: 2.06rem;
}
.pay_con_left img {
  width: 2.06rem;
  height: 1.48rem;
}
.pay_con_right {
  width: 5.05rem;
  font-size: 28px;
  padding-top: 0.15rem;
  padding-left: 0.15rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}
.pay_con_right h1 {
  font-size: 0.28rem;
  color: #141418;
}
.pay_con_right h2 {
  font-size: 0.28rem;
  color: #fa7d00;
  margin-top: 0.7rem;
}
.pay_Sign_btn {
  width: 3.5rem;
  margin: 0.2rem auto;
  height: 0.7rem;
  background: rgba(250, 125, 0, 1);
  border-radius: 0.5rem;
  text-align: center;
  line-height: 0.6rem;
}
.pay_Sign_btn button {
  font-size: 0.3rem;
  color: #fff;
  background: rgba(250, 125, 0, 1);
}
.main2 {
  width: 95%;
  padding: 0.1rem 0;
  margin: 0.3rem auto;
  box-sizing: border-box;
  overflow: hidden;
}
.main2 h1 {
  font-size: 0.4rem;
  font-weight: bold;
  text-align: center;
  color: #8d8585;
}
#app >>> .van-notice-bar {
  background-color: transparent;
}
</style>