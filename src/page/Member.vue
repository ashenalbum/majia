<template>
    <div id="content">
        <div class="top">
            <div class="nav df df-r ai-c fs_32 c_ff">
                <van-icon name="arrow-left back-btn" @click="back" />
                <div class="nav-txt f1 df ai-c just-c-ct">会员中心</div>
            </div>
            <div class="card mt-20 df df-r ai-c">
                <img :src="infoData.headpath" alt="" class="img" />
                <div class="r-box f1 df df-c c_ff">
                    <div class="df_34">{{infoData.nickname}}</div>
                    <div v-if="end_time" class="mt-16 fs_26">有效期 {{end_time}}</div>
                    <div class="mt-16 fs_26 df df-r ai-c">
                        <van-icon name="star" class="star" />
                        <span>{{infoData.group_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <van-tabs v-model="vipLv" color="#FFC261" class="tabs" @click="changeTab">
            <van-tab v-for="(item,index) in vipList" :key="index" :title="item.groupname+'会员'">
                <div class="mt-30 fs_30 c_33">选择开通时长</div>
                <div class="sel-year-box mt-30 df df-r df-w-w">
                    <div v-for="(itm,idx) in item.buy_price" :key="idx" @click="selYear=idx" class="sel-year c_ashen df ai-c just-c-ct" :class="{active:selYear==idx}">
                        <div class="df df-r ai-e">
                            <span class="fs_30">￥</span>
                            <span class="fs_50">{{itm.point}}/</span>
                            <span class="fs_30">{{itm.num==1?"":itm.num}}{{itm.type=="year"?"年":""}}</span>
                        </div>
                    </div>
                    <div class="html fs_30 c_33" v-html="item.describe"></div>
                </div>
            </van-tab>
        </van-tabs> 
        <div class="tequan mt-40 c_33">
            <div class="tt fs_36 df ai-c just-c-ct">会员专享特权</div>
            <div class="tq-box mt-30 df df-r df-w-w">
                <div class="tq-item df df-r ai-c just-c-ct">
                    <img src="~@/assets/member/i1.png" class="img" />
                    <div>
                        <div class="fs_28">功能免费</div>
                        <div class="fs_22 c_ashen mt_20">不限制次数和类型</div>
                    </div>
                </div>
                <div class="tq-item df df-r ai-c just-c-ct">
                    <img src="~@/assets/member/i2.png" class="img" />
                    <div>
                        <div class="fs_28">在线指导</div>
                        <div class="fs_22 c_ashen mt_20">一对一的在线指导</div>
                    </div>
                </div>
                <div class="tq-item df df-r ai-c just-c-ct">
                    <img src="~@/assets/member/i3.png" class="img" />
                    <div>
                        <div class="fs_28">策划制作</div>
                        <div class="fs_22 c_ashen mt_20">一次专属策划制作</div>
                    </div>
                </div>
                <div class="tq-item df df-r ai-c just-c-ct">
                    <img src="~@/assets/member/i4.png" class="img" />
                    <div>
                        <div class="fs_28">优先使用</div>
                        <div class="fs_22 c_ashen mt_20">新模板上线后提醒</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bot-height"></div>
        <div class="bot-box df df-r">
            <div class="money f1 fs_40 df ai-c just-c-ct">￥{{moneyData.point}} / {{moneyData.num==1?"":moneyData.num}}{{moneyData.type=="year"?"年":""}}</div>
            <div class="buybtn f1 fs_40 c_ff df ai-c just-c-ct" @click="buy">立即购买</div>
        </div>

        <!-- 使用优惠券 -->
        <van-popup v-model="showQuan" position="bottom">
            <div class="sel-quan-list df df-c ai-c just-c-ct">
                <div class="ht-60 df df-r ai-c just-c-bet fs_28">
                    <span @click="showQuan=false">取消</span>
                    <span class="c_blue" @click="selQuanOk">确定</span>
                </div>
                <ul class="list-box f1 df df-c">
                    <li v-for="(val,index) in quanList" :key="index" @click="selQuan(val,index)">
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
                            <div class="right df ai-c just-c-ct">
                                <p class="c_ff">未<br/>使<br/>用</p>
                            </div>
                            <div v-if="quanId===val.id" class="use-area">
                                <div class="t">√</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </van-popup>
        <PageMenu></PageMenu>
    </div>
</template>

<script>
import { Toast } from "vant";
import axios from "../utils/axios";
import wx from "weixin-js-sdk";
import PageMenu from "../components/PageMenu";

// import BackHome from "../components/BackHome"; //漂浮菜单
export default {
    name: "",
    data() {
        return {
            id: null,
            // vip等级
            vipList: [],
            vipLv: 0, // 选中的选项卡下标
            selYear: 0, // 选择年限的下标
            moneyData: {}, // 选中的buy_price
            required_id: 0, // 选中的会员级别

            infoData: {}, // 用户信息
            group_id: 0, // 用户会员级别
            end_time: "", // 用户会员到期时间
            // 选择优惠券
            quanList: [],
            showQuan: false,
            quanId: null,
            quanIndex: "",
        };
    },
    created() {
        this.id = this.$route.query.page_id;
        this.getData();
    },
    watch: {        
        showQuan(val){
            if(val){ this.quanId = null; this.quanIndex = ""; }
        },
        vipLv(val){
            this.moneyData = this.vipList[val].buy_price[this.selYear];
            this.required_id = this.vipList[val].id;
        },
        selYear(val){
            this.moneyData = this.vipList[this.vipLv].buy_price[val];
        }
    },
    methods: {
        getData() {
            // 获取会员列表
            axios({
                url: "/member/Apimember/member_group_list",
            }).then((data)=>{
                if(data.err!=0){return;}
                // 暂无更好级别会员
                if(data.data.length == 0){return}
                this.vipList = data.data;
                this.required_id = this.vipList[this.vipLv].id;
                if(this.vipList[this.vipLv].buy_price.length){
                    this.moneyData = this.vipList[this.vipLv].buy_price[this.selYear];
                }
            });

            axios({
                url: "/member/Apimember/member_getInfo"
            }).then((data)=>{
                if(data.err!==0){return;}
                this.group_id = data.data.group_id;
                if (data.data.endtime != 0){
                    let date= new Date(data.data.endtime*1000);
                    this.end_time = date.toISOString().slice(0,10) + " " + date.toTimeString().slice(0,5);
                }
                if (data.data.group_name == "") { data.data.group_name = "普通会员"; }
                this.infoData = data.data;
            })
        },
        confirmPay() {
            // alert(JSON.stringify({
            //     id: this.required_id,
            //     interval: this.moneyData.num,
            //     interval_unit: this.moneyData.type,
            //     isGive: 0,
            //     pay_type: "WX",
            //     repeat: 1,
            //     couponid: this.quanId,
            // }))
            // 确认支付
            axios({
                url: "/member/Apimember/member_group_pay",
                params: {
                    id: this.required_id,
                    interval: this.moneyData.num,
                    interval_unit: this.moneyData.type,
                    isGive: 0,
                    pay_type: "WX",
                    repeat: 1,
                    couponid: this.quanId,
                }
            }).then((data)=>{
                this.quanId = null;
                this.quanIndex = "";
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
            }).catch(()=>{
                Toast("error");
            });
        },
        buy() {
            if (this.required_id < this.group_id) {
                Toast("无法购买低级别会员");
            } else {
                // alert(JSON.stringify({
                //     groupid: this.required_id,
                //     price: this.moneyData.point,
                // }))
                axios({
                    url: "/coupon/Apicoupon/member_use_coupon_list_no_page",
                    params: {
                        groupid: this.required_id,
                        price: this.moneyData.point,
                    }
                }).then((data)=>{
                    if(!data.data || data.data.length==0){
                        this.confirmPay();
                    }else{
                        this.showQuan = true;
                        this.quanList = data.data;
                    }
                })
                return;
            }
        },
        // 切换vip
        changeTab(){
            this.selYear = 0;
        },
        // 选择优惠券
        selQuan(val,index){
            if(this.quanId === val.id){
                this.quanIndex = null;
                this.quanId = "";
            }else{
                this.quanIndex = index;
                this.quanId = val.id;
            }
        },
        selQuanOk(){
            this.showQuan = false;
            if (this.LastName != "" && this.Lastmoney != "" && this.Last_danwei != "") {
                this.radio = "WX";
                // this.Payshow = true;
                this.isGive = 0;
                this.confirmPay();
            }
        },
        back(){
            this.$router.go(-1);
        },
    },
    components: {PageMenu},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{background:url(~@/assets/member/topbg.png) no-repeat center top; background-size:100% auto;}
.top .nav{height:1.2rem;}
.top .back-btn{width:0.32rem; margin:0 0.2rem;}
.top .nav-txt{padding-right:0.72rem;}
.top .card{box-sizing:border-box; width:7.1rem; height:3.5rem; padding:0 0.6rem; margin-left:auto; margin-right:auto; border-radius:0.3rem; background:url(~@/assets/member/bg.png) no-repeat; background-size:100% 100%;}
.top .card .img{width:1.6rem; height:1.6rem; border-radius:50%;}
.top .card .r-box{margin-left:0.3rem;}
.top .card .star{margin-right:0.1rem;}

.tabs{width:6.4rem; margin-left:auto; margin-right:auto;}
.tabs .sel-year{box-sizing:border-box; width:3rem; height:1.8rem; border:1px solid #D4D9E7; border-radius:0.1rem; margin:0 0.07rem 0.2rem;}
.tabs .sel-year.active{color:#EAC66B; border-color:#EAC66B; background:#fffbf1;}
.tabs .sel-year .fs_50{line-height:0.5rem;}
.tabs .html{height:100%;}
.tabs .html>>>p{box-sizing:border-box; width:100%; font-size:0.3rem; color:#333333;}
.tabs .html>>>img{width:100%; height:auto;}

.tequan{width:6.8rem; margin-left:auto; margin-right:auto;}
.tequan .tt{width:4rem; height:0.6rem; margin:auto; background:url(~@/assets/member/tt.png) no-repeat center center; background-size:100% 40%;}
.tequan .tq-box .tq-item{width:50%; margin-bottom:0.2rem;}
.tequan .tq-box .tq-item .img{width:0.72rem; height:0.72rem; margin-right:0.2rem;}

.bot-height{height:1.3rem;}

.bot-box{position:fixed; bottom:0; left:0; height:1.2rem; width:100%; background:#424242 linear-gradient(#424242, #585858); border-radius:0.6rem 0 0 0;}
.bot-box .money{height:100%; color:#E3BC65;}
.bot-box .buybtn{border-radius:0.6rem 0 0 0; background:#E3BC65;}

.sel-quan-list{padding:0.2rem 0; height:8rem; overflow-y:auto;}
.ht-60{width:7.1rem; margin:auto; height:0.6rem; padding-bottom:0.2rem;}
.list-box{width:7.1rem; height:7.2rem; overflow-y:auto; margin:auto;}
.list-box .item{position:relative; box-sizing:border-box; padding:0.1rem; margin:0 auto 0.14rem; width:7.1rem; height:2.1rem; background: url(~@/assets/mycoupon/lingquan_blue.png) no-repeat center center/100% 100%;}
.list-box .item.odd{background: url(~@/assets/mycoupon/lingquan_orange.png) no-repeat center center/100% 100%;}
.list-box .item .left{width:2rem;}
.list-box .item .center{flex:1; padding-left:0.3rem;}
.list-box .item .right{width:1rem;}
.list-box .item .num{font-size:0.4rem;}
.list-box .item .use-area{
  position: absolute;
  left:0.1rem;
  bottom:0.1rem;
  width: 0rem;
  height: 0rem;
  border-left:0.3rem solid #F32323;
  border-bottom:0.3rem solid #F32323;
  border-right:0.3rem solid transparent;
  border-top:0.3rem solid transparent;
  color: #fff;
  border-radius:0 0 0 0.1rem;
}
.list-box .item .use-area .t{
    position: absolute;
    display: block;
    left: -0.3rem;
    top: 0;
    width: 0.3rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
}

</style>