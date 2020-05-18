<template>
    <div class="cont">
        <div class="hb-title df df-r ai-c just-c-bet fs_26" @click.stop>
            <div class="df df-r ai-c">
                <van-icon name="bullhorn-o c_red1" />
                <span>关注公众号</span>
                <span class="c_red1">及查看订单详情</span>
            </div>
            <van-button plain size="mini" color="#F32323" @click="showGzhEwm=true;">关注公众号</van-button>
        </div>
        <div class="box mt-30">
            <div v-for="(item,index) in data" :key="index">
                <div v-if="item.type==1" class="txt t-indent c_ashen">{{item.content}}</div>
                <img v-if="item.type==2" class="img" :src="item.content" />
                <video v-else-if="item.type==3" class="video" :src="item.content" controls></video>
            </div>
        </div>
        <div class="btn-box mt-20">
            <van-button type="info" @click="lxsj" block>联系商家</van-button>
        </div>
        
        <van-button class="fixed-submit" type="info" @click="toMyCenter">返回个人中心</van-button>
        <!-- 商家信息 -->
        <van-overlay :show="showSeller" @click="showSeller=false">
            <div class="maskSeller">
                <div class="box" @click.stop>
                    <div class="df df-r ai-c just-c-bet">
                        <ul class="ul fs_26">
                            <li>联系电话：<span ref="copytxt1" :data-clipboard-text="sjInfo.contact_mobile" class="c_o">{{sjInfo.contact_mobile}} <span class="copy c_ff">复制</span></span></li>
                            <li v-if="sjInfo.service_wx" ref="copytxt2" :data-clipboard-text="sjInfo.service_wx">客服微信：<span ref="copywx">{{sjInfo.service_wx}} <span class="copy c_ff">复制</span></span></li>
                            <li v-if="sjInfo.service_tel" ref="copytxt3" :data-clipboard-text="sjInfo.service_tel">客服电话：<span class="c_o">{{sjInfo.service_tel}} <span class="copy c_ff">复制</span></span></li>
                        </ul>
                        <img :src="sjInfo.headpath" class="icon" />
                    </div>
                    <div v-if="sjInfo.code_wx_img" class="mt-40">
                        <img :src="sjInfo.code_wx_img" class="img" />
                    </div>
                    <div v-if="sjInfo.code_wx" class="linebox mt-20 df ai-c just-c-ct">
                        <div class="line"></div>
                        <span class="txt fs_26 c_33">扫一扫，加商家微信</span>
                    </div>
                </div>
            </div>
        </van-overlay>
        <!-- 关注公众号 -->
        <van-overlay :show="showGzhEwm" class="df ai-c just-c-ct"  @click="showGzhEwm=false;">
            <div class="gzhewmbox df df-c ai-c just-c-ct" @click.stop>
                <div class="ewm-bg">
                    <img :src="sjInfo.url" />
                </div>
                <div class="c_o fs_30 mt-30">关注公众号</div>
            </div>
        </van-overlay>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import Clipboard from 'clipboard';
import {Toast} from "vant";
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            id: null,
            data: [],

            showSeller: false,
            sjInfo: {},
            showGzhEwm: false,
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getAfterPay();
        this.getOrganizer();
    },
    methods:{
        getAfterPay(){
            axios({
                url: "/activity/Apiactivity/getAfterPay",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                if(data.data.type == 1){
                    window.location.href = data.data.after_pay_url;
                }else{
                    this.data = data.data.after_pay_custom;
                }
            })
        },
        // 商家信息
        getOrganizer(){
            axios({
                url: "/activity/Apiactivity/getOrganizer",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.sjInfo = data.content;
            })
        },
        toMyCenter(){
            this.$router.push({path:"/my_center"});
        },
        lxsj(){
            this.showSeller = true;
        },
    },
    mounted(){
        let clipboard1 = new Clipboard(this.$refs.copytxt1);
        clipboard1.on('success', ()=>{Toast("复制成功");});
        clipboard1.on('error', ()=>{Toast("复制失败");});
        if(this.$refs.copytxt2){
            let clipboard2 = new Clipboard(this.$refs.copytxt2);
            clipboard2.on('success', ()=>{Toast("复制成功");});
            clipboard2.on('error', ()=>{Toast("复制失败");});
        }
        if(this.$refs.copytxt3){
            let clipboard3 = new Clipboard(this.$refs.copytxt3);
            clipboard3.on('success', ()=>{Toast("复制成功");});
            clipboard3.on('error', ()=>{Toast("复制失败");});
        }
    },
    components:{PageMenu},
}
</script>
<style scoped>
.box .txt{padding:0.36rem 0.2rem; line-height:2;}
.box .img{display:block; width:100%; height:auto;}
.box .video{display:block; width:100%; height:auto; background:#000000;}
.btn-box{width:6rem; margin-left:auto; margin-right:auto; margin-bottom:0.2rem;}

.maskSeller{display:flex; align-items:center; justify-content: center; height:100%;}
.maskSeller .box{box-sizing:border-box; width:6.4rem; padding:0.4rem 0.2rem; background:#ffffff; border-radius:0.1rem;}
.maskSeller .ul li{margin:0.2rem 0; padding:0.05rem 0.1rem; line-height:1; border-left:3px solid #FF8601;}
.maskSeller .ul li:nth-child(2){border-color:#FFA201;}
.maskSeller .ul li:nth-child(3){border-color:#FFC402}
.maskSeller .copy{padding:0 4px; border-radius:2px; background:#FFC402;}
.maskSeller .icon{width:1.2rem; height:1.2rem; border-radius:0.25rem;}
.maskSeller .img{width:100%; height:5.6rem;}
.maskSeller .linebox{position:relative; width:100%; margin:0.4rem auto 0;}
.maskSeller .linebox .line{position:absolute; left:0; right:0; top:50%; border-bottom:1px solid #E3E3E3;}
.maskSeller .linebox .txt{position:relative; padding:0 0.5rem; background:#ffffff;}

.hb-title{box-sizing:border-box; width:100%; padding:0.3rem; background:#fcdcdf;}
.fixed-submit{bottom:2.4rem; width:auto;}

.gzhewmbox{width:5.4rem; height:6.25rem; background:#ffffff; border-radius:0.25rem;}
.gzhewmbox .ewm-bg{box-sizing:border-box; padding:0.4rem; width:4.2rem; height:4.2rem; background:url(~@/assets/other/ewm-border.png) no-repeat; background-size:100% 100%;}
.gzhewmbox .ewm-bg img{width:100%; height:100%;}
</style>