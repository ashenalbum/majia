<template>
    <div class="cont">
        <div class="item df df-c">
            <div class="ware df df-r">
                <img :src="data.pic" class="img shadow" />
                <div class="detail df df-c just-c-bet">
                    <div>
                        <div class="two-hide fs_32">{{data.title}}</div>
                    </div>
                    <div class="mt-10">
                        <div class="one-hide c_ashen fs_24">
                            <span v-if="data.spec_name">{{data.spec_name}}</span>
                        </div>
                        <div class="mt-10 df df-r ai-c just-c-bet fs_24">
                            <div class="df df-r ai-c just-c-end fs_28 c_red1">合计：￥{{data.goods_amount}}</div>
                            <span class="fs_26 c_33">×1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data.scene==0" class="mt-40">
                <div class="df df-r ai-c just-c-bet fs_28 c_33">
                    <span>订单信息</span>
                    <span>￥{{data.order_amount}}</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>订单号</span>
                    <span>{{data.order_sn}}</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>运费</span>
                    <span>￥{{data.freight}}</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>交易时间</span>
                    <span>{{data.addtime}}</span>
                </div>
            </div>
        </div>
        <div class="location" v-if="data.content && data.content.lenth">
            <div class="fs_28 c_33 df df-r ai=-c">
                <span>{{getInfo('name')}}</span>
                <span class="span">{{getInfo('mobile')}}</span>
            </div>
            <div class="mt-20 c_ashen fs_24">{{getInfo('location')}}</div>
        </div>
        <img src="~@/assets/order/line.png" class="line" />
        <!-- <div class="wuliu">
            <div class="df df-r ai-c just-c-bet">
                <span class="fs_28 c_33">物流信息</span>
                <van-icon name="arrow" color="#B3B9CF" size="0.28rem" />
            </div>
            <div class="mt-30 df df-r ai-c just-c-bet">
                <div class="txt-ico df ai-c just-c-ct fs_30 c_ff shadow">收</div>
                <div class="fs_26 c_ashen f1">收件地址：陕西省西安市某某区 某某街道  某某小区  2号楼5单元402</div>
            </div>
            <div class="mt-30 df df-r ai-c just-c-bet">
                <div class="txt-ico df ai-c just-c-ct fs_30 c_ff shadow">发</div>
                <div class="fs_26 c_ashen f1">发货地址：陕西省西安市某某区 某某街道  某某小区  2号楼5单元402</div>
            </div>
        </div> -->
        <!-- 是用户 -->
        <div v-if="!is_pos">
            <div v-if="data.pay_status==0" class="btns df df-r ai-c just-c-end">
                <van-button size="small" round color="#FF9C00" @click="fukuan">付款</van-button>
            </div>
            <div v-else-if="data.scene==0" class="btns df df-r ai-c just-c-end">
                <!-- <van-button size="small" plain round color="#B3B9CF" >查看物流</van-button> -->
                <van-button v-if="data.order_status==0" size="small" round color="#FF9C00" @click="shouhuo">确认收货</van-button>
                <span v-else class="c_red1 fs_26">已收货</span>
            </div>
            <div v-else-if="data.ship_status==0" class="mt-20 df df-c ai-c just-c-ct">
                <div class="wembox">
                    <img :src="imgUrl" />
                </div>
                <div class="txt_c fs_28 c_ashen">我的兑换码</div>
            </div>
            <div v-else class="btns df df-r ai-c just-c-end">
                <span class="c_red1">已兑换</span>
            </div>
        </div>
        <!-- 是商户 -->
        <div v-else class="fs_28">
            <div v-if="data.pay_status==0" class="btns df df-r ai-c just-c-end">
                <van-button size="small" round color="#FF9C00" @click="yifukuan">确认已付款</van-button>
            </div>
            <div v-else-if="data.scene==0">
                <div v-if="data.ship_status==0" class="btns df df-r ai-c just-c-end">
                    <van-button size="small" round color="#FF9C00" @click="showKd=true">确认发货</van-button>
                </div>
                <div v-else-if="data.ship_status==1" class="btns df df-r ai-c just-c-end">
                    <span class="c_red1">已发货</span>
                </div>
                <div v-else-if="data.ship_status==2" class="btns df df-r ai-c just-c-end">
                    <span class="c_red1">已完成</span>
                </div>
            </div>
            <div v-else>
                <div v-if="data.ship_status==0" class="btns df df-r ai-c just-c-end">
                    <van-button size="small" round color="#FF9C00" @click="saoma">扫码兑换</van-button>
                </div>
                <div v-else class="btns df df-r ai-c just-c-end">
                    <span class="c_red1">已兑换</span>
                </div>
            </div>
        </div>
        <van-popup v-model="showKd" position="bottom">
            <div class="popup">
                <div class="popup-btns df df-r ai-c just-c-bet fs_26">
                    <span class="c_99" @click="showKd=false">取消</span>
                    <span class="c_blue" @click="fahuo">确定</span>
                </div>
                <div class="df df-c ai-c">
                    <van-field v-model="kdgs" label="快递公司" placeholder="请输入快递公司" class="mt-30 input" />
                    <van-field v-model="kddh" label="快递单号" placeholder="请输入快递单号" class="mt-30 input" />
                </div>
            </div>
        </van-popup>
        
        <canvas id="ewm" ref="ewm" class="ewm" style="display:none;"></canvas>
    </div>
</template>
<script>
import axios from "../utils/axios";
import { Toast } from 'vant';
import QRCode from "qrcode";
import wx from "weixin-js-sdk";

export default {
    data(){
        return {
            id: null,
            is_pos: false,
            data: {},
            imgUrl: "",
            pay_info: [],

            showKd: false,
            kdgs: "",
            kddh: "",
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.is_pos = Boolean(this.$route.query.pos);
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            axios({
                url: "/activity/Apiactivity/order_details",
                params: {id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.data = data.data;
                this.pay_info = data.pay_info;
                this.createEwm();
            })
        },
        getInfo(type){
            let location = "";
            for(let i in this.data.content){
                let o = this.data.content[i];
                if(type==o.name && o.name=="name"){return o.value;}
                if(type==o.name && o.name=="mobile"){return o.value;}
                if(type=="location" && o.name=="addr"){location = o.value;}
                if(type=="location" && o.name=="detailed_addr"){return location + o.value;}
            }
        },
        // 付款
        fukuan(){
            this.wxpay(this.pay_info);
        },// 支付
        wxpay(obj) {
            let obj1 = obj[0];
            wx.chooseWXPay({
                timestamp: obj1.timeStamp,
                nonceStr: obj1.nonceStr,
                package: obj1.package,
                signType: obj1.signType,
                paySign: obj1.paySign,
                success: () => {
                    Toast("支付成功");
                    this.$router.push({name:"PayAfter", query:{id:this.id}});
                },
                cancel: () => {},
                fail: () => {}
            });
        },
        // 确认收货
        shouhuo(){
            axios({
                url: "/activity/Apiactivity/edit_order",
                params: {
                    order_id: this.data.id
                }
            }).then((data)=>{
                if(data.err!=0){return;}
                Toast("操作成功");
                this.getData();
            });
        },
        // 生成二维码
        createEwm(){
            if(this.is_pos || this.data.scene!=1 || this.data.pay_status==0){return;}
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, this.data.convert_url);
            msg.style.width = "100%";
            msg.style.height = "100%";

            let context = msg.getContext('2d');
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            this.imgUrl = msg.toDataURL("image/png");
        },
        // 确认发货
        fahuo(){
            if(!this.kdgs){Toast("请输入快递公司");return}
            if(!this.kddh){Toast("请输入快递单号");return}
            this.showKd = false;
            axios({
                url: "/activity/Apiactivity/order_status",
                params: {
                    order_id: this.id,
                    ship_status: 1,
                    excom: this.kdgs,
                    excode: this.kddh,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.getData();
            })
        },
        // 确认已付款
        yifukuan(){
            axios({
                url: "/activity/Apiactivity/order_status",
                params: {
                    order_id:this.id,
                    pay_status:1
                }
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.getData();
            })
        },
        // 扫码
        saoma(){
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success:(res)=>{
                    let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    axios({
                        url: "/activity/Apiactivity/write_off",
                        params: {
                            order_id: this.id,
                            random_code: result,
                        }
                    }).then((data)=>{
                        if(data.err!=0){return}
                        Toast("操作成功");
                        this.getData();
                    })
                }
            });
        },
    }
}
</script>
<style scoped>
.cont{padding-top:0.3rem;}
.item{width:6.7rem; margin:0 auto; padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.item .icon{width:0.5rem; height:0.5rem; border-radius:50%;}
.item .name{padding-left:0.2rem;}
.item .ware{padding:0.2rem 0;}
.item .ware .img{width:1.98rem; height:1.78rem;}
.item .ware .detail{margin-left:0.2rem; flex:1;}
.item .ware .labels>*{margin-right:0.1rem; padding:2px 0.1rem; line-height:1; border-radius:0.1rem; background:#F4F5F9;}
.location{width:6.7rem; margin:0 auto; padding:0.3rem 0;}
.location .span{padding-left:0.2rem;}
.line{display: block; width:100%; height:auto;}
.wuliu{width:6.7rem; margin:0 auto; padding:0.4rem 0 0.3rem;}
.wuliu .txt-ico{margin-right:0.4rem; width:0.56rem; height:0.56rem; border-radius:50%; background:#B3B9CF;}
.wuliu .btns>*{margin-left:0.2rem;}
.btns{width:6.7rem; margin:0 auto; padding:0.4rem 0 0.3rem;}
.wembox{width:4rem; height:4rem; margin-left:auto; margin-right:auto;}
.wembox>*{display:block;width:100%;height:100%;}

.popup{padding:0.2rem 0.2rem 0.3rem;}
.popup .input{padding:10px 2px; border-bottom:1px solid #dddddd;}
</style>
