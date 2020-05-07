<template>
    <div class="cont">
        <div class="top">
            <van-swipe class="my-swipe" :autoplay="data.video_url?0:3000" indicator-color="white">
                <van-swipe-item v-if="data.video_url">
                    <video id="topvideo" class="img" :src="data.video_url" controls autoplay muted></video>
                </van-swipe-item>
                <van-swipe-item v-for="(item,index) in data.head_pic_img" :key="index">
                    <img :src="item.pic_img" class="img" />
                </van-swipe-item>
            </van-swipe>
            <div class="see c_ashen fs_28">{{data.browse_num}}人浏览</div>

            <!-- <div v-if="dmList.length" class="box"></div> -->
            
            <div v-for="(item,index) in dmList" :key="index" class="dm df df-r ai-c" :class="{dmmove:item.move}" :style="{top:item.top}">
                <div class="txt c_66 fs_20 van-ellipsis">{{item.txt}}</div>
                <img :src="item.src" class="img" />
            </div>
        </div>
        <div class="cont-box bg_ff">
            <div class="details">
                <div class="c_33 fs_32 van-ellipsis">{{data.title}}</div>
                <div class="mt-20 c_ashen fs_26 van-ellipsis">{{data.subhead}}</div>
                <div class="mt-30 c_o fs_28">
                    <span v-for="(item,index) in data.spec_content" :key="index" class="label">{{item.name}}</span>
                </div>
                <div class="mt-36 df df-r ai-e just-c-bet">
                    <div class="df df-r ai-e">
                        <span class="c_red1 fs_30">￥{{data.special_offer}}</span>
                        <span class="yuanjia fs_26 c_ashen txt-line-t">￥ {{data.price}}</span>
                    </div>
                    <span class="fs_28 c_ashen">销量 {{data.people_buy_num}}</span>
                </div>
            </div>
            <div class="seller shadow df df-r ai-c just-c-bet" @click="showSeller=true">
                <div class="df df-r ai-c">
                    <img :src="userInfo.headpath" class="icon" />
                    <span class="name c_33 fs_30 one-hide">{{userInfo.nickname}}</span>
                </div>
                <van-button size="mini" color="#FF9C00" @click="showSeller=true">关注</van-button>
            </div>
            <div ref="detail" class="words mt-40">
                <div class="title df ai-c just-c-ct">
                    <div class="line"></div>
                    <span class="txt fs_36">产品详情</span>
                </div>
                <div class="box">
                    <div v-for="(item,index) in data.details" :key="index">
                        <div v-if="item.type==1" v-html="item.content" class="txt t-indent c_ashen"></div>
                        <img v-if="item.type==2" class="img" :src="item.content" />
                        <video v-else-if="item.type==3" class="video" :src="item.content" controls></video>
                    </div>
                </div>
            </div>
        </div>
        <div class="help fs_22 c_88">
            <div class="fs_30">购买须知：</div>
            <div v-html="data.instructions"></div>
        </div>
        <div class="bottom-btns df df-r fs_34">
            <div class="btn1 f1 df df-c ai-c just-c-ct" @click="newEvent">制作新活动</div>
            <div class="btn2 f1 df df-c ai-c just-c-ct" :class="{ashen:data.audit_type!=1}" @click="buyBtnClick">
                <span>{{data.audit_type==1?data.pay_btn:"活动未开始"}}</span>
                <span v-if="data.audit_type==1&&showLastTime" class="fs_26">{{lastTime}}</span>
            </div>
        </div>
        <!-- 制作海报 -->
        <van-button class="fixed-submit" type="info" @click="toHaibao">{{data.hb_btn_name}}</van-button>
        <!-- 客服 -->
        <div class="fixed-btn df df-r ai-c" @mousedown.stop>
            <transition name="van-slide-right">
                <div v-show="showKefu" class="txt shadow c_ashen fs_26">
                    <div class="line df df-r ai-c" @click="toMycenter">
                        <img src="~@/assets/pay/wode.png" class="icon" />
                        <span>个人中心</span>
                    </div>
                    <div class="line df df-r ai-c" @click="showSeller=true">
                        <img src="~@/assets/pay/kefu.png" class="icon" />
                        <span>联系客服</span>
                    </div>
                </div>
            </transition>
            <img src="~@/assets/pay/icon.png" class="img" @click="showKefu=!showKefu" />
        </div>
        <!-- 广告 -->
        <div v-if="showAd" class="ad df df-r shadow" @click="toDetail(ad.id)">
            <img :src="ad.head_pic" class="img" />
            <div class="txt f1 df df-c just-c-bet">
                <div class="title fs_26 c_33 van-multi-ellipsis--l2">{{ad.title}}</div>
                <div class="df df-r ai-e just-c-bet">
                    <div class="df df-r ai-e just-c-bet">
                        <span class="c_red1 fs_32">￥{{ad.special_offer}}</span>
                        <span class="pl-20 fs_24 c_ashen txt-line-t">￥{{ad.price}}</span>
                    </div>
                    <span class="fs_26 c_ashen">{{ad.browse_times}}人参与</span>
                </div>
            </div>
            <van-icon @click.stop="showAd=false" name="clear" size="0.5rem" color="#D1D6E5" class="close"/>
        </div>
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
        <!-- 选择规格 -->
        <van-popup v-model="showGuige" round position="bottom" closeable>
            <div class="guige">
                <div class="df df-r ai-c">
                    <img :src="data.head_pic_img && data.head_pic_img.length && data.head_pic_img[0].pic_img" class="img shadow" />
                    <div class="txt df df-c" >
                        <span class="c_red1 fs_30 b">￥{{buyMoney}}</span>
                        <span v-if="data.spec_content && data.spec_content.length" class="fs_24 c_ashen mt-20">库存{{buyKc}}件</span>
                    </div>
                </div>
                <div v-if="data.spec_content && data.spec_content.length" class="item mt-20">
                    <div class="fs_30 c_33">选择规格</div>
                    <div class="fs_28">
                        <span v-for="(item,index) in data.spec_content" :key="index" @click="changeBuyGg(index)" class="label" :class="{active:guigeId==index}">{{item.name}}</span>
                    </div>
                </div>
                <div v-if="data.spec_content && data.spec_content.length" class="item mt-20 df df-r ai-c just-c-bet">
                    <div class="fs_30 c_33">购买数量</div>
                    <van-stepper v-model="buyNum" @change="chengeBuyNum"/>
                </div>
                <div class="mt-20 df df-c ai-c">
                    <van-button round type="info" size="small" class="next-btn" @click="buyNext">下一步</van-button>
                </div>
            </div>
        </van-popup>
        <!-- 填写个人信息 -->
        <van-popup v-model="showUserInfo" round position="bottom" closeable>
            <div class="user-info">
                <div class="mt-30">
                    <van-field
                        v-for="(item,index) in buyFormLs"
                        v-model="buyFormData[item.name]"
                        :key="index"
                        :label="item.write_name"
                        :placeholder="item.write_explain"
                        :type="item.type"
                        :input-align="item.name=='detailed_addr'?'left':'right'"
                        class="input"
                        :readonly="item.name=='addr'"
                        @click="showSelarea=(item.name=='addr')"
                    />
                </div>
                <div class="mt-30 df df-c ai-c">
                    <van-button type="info" size="small" class="next-btn" @click="buySubmit">{{data.pay_btn}}</van-button>
                </div>
            </div>
        </van-popup>
        <!-- 省市区 -->
        <van-popup v-model="showSelarea" round position="bottom">
            <van-area :area-list="area" @confirm="selAreaOk" @cancel="showSelarea=false"/>
        </van-popup>
        <!-- 生成海报 -->
        <van-overlay :show="showHbDom" class="df ai-c just-c-ct" @click="showHbDom=false">
            <div id="bill" ref="bill" class="bill shadow" @click.stop>        
                <canvas class="canvas" id="canvas" ref="canvas"></canvas>
                <!-- <van-uploader :disabled="disabled" :preview-image="false" :before-read="beforeRead">
                    <div class="placehold df df-c ai-c just-c-ct c_99">
                        <span class="fs_28">点击设置背景</span>
                        <span class="mt-20 fs_24">600 * 960</span>
                    </div>
                </van-uploader> -->
                <img ref="bgimgDom" v-if="bgimg" :src="bgimg" crossOrigin='anonymous' class="bgimg" />
                <div class="user">
                    <div class="name fs_24 c_99">{{info.nickname}}</div>
                    <div class="iconbox">
                        <img :src="info.headpath" crossOrigin='anonymous' class="icon" />
                        <div class="icon-border"></div>
                    </div>
                </div>
                <div class="ewmbox">
                    <canvas id="ewm" ref="ewm" class="ewm"></canvas>
                </div>
            </div>
        </van-overlay>
        <van-overlay :show="showHb" @click="showHb=false" class="df ai-c just-c-ct">
            <img class="hb-img" :src="imgUrl" @click.stop/>
        </van-overlay>
    </div>
</template>
<script>
import Clipboard from 'clipboard';
import {Toast} from 'vant';
import axios from "../utils/axios";
import area from "../json/area";
import wx from "weixin-js-sdk";
import {upFile} from "../utils/axios";
import QRCode from "qrcode";
import html2canvas from 'html2canvas';

export default {
    name: "EventView",
    data(){
        return {
            id: null,
            urlQuery: {},
            data: {},
            userInfo: {},
            showAd: false,
            showSeller: false,
            dmList: [],
            ad: {},
            showLastTime: true, //显示倒计时
            lastTime: "", //结束倒计时
            timeIsover: false, //活动结束

            showKefu: false, // 显示客服
            showGuige: false, // 选择规格
            showUserInfo: false, // 个人信息
            sjInfo: {}, //商家信息
            showSelarea: false, // 省市区选择
            area: {}, // 省市区json

            buyNum: 1,  // 数量
            buyMoney: null, //价格
            buyOneMoney: null, //单价
            buyKc: 0, // 库存
            guigeId: 0, // 规格index
            buyFormLs: [], // 购买表单
            buyFormData: {}, // 表单数据

            autoCreateHb: false,
            showHbDom: false,
            info: {},
            share_url: "",
            showHb: false,
            bgimg: false,
            imgUrl: "",
            disabled: false,
        }
    },
    beforeRouteUpdate(to,from,next){
        next();
        // this.$router.go(0);
        if(to.query.id!=from.query.id){window.location.reload();}
    },
    created(){
        this.urlQuery = this.$route.query;
        if(this.$route.query.showPoter){
            // this.$router.replace({path:"/bill",query:this.$route.query});
            this.autoCreateHb = true;
        }
        if(this.$route.query.id){
            this.id = this.$route.query.id;
        }else if(this.$route.query.activity_id1){
            this.id = this.$route.query.activity_id1;
        }
        this.area = area;
        this.getData();
        this.getOrganizer();
        this.getActivityForm();
    },
    methods: {
        getData(){
            axios({
                url: "/activity/Apiactivity/previewTemplateInfo",
                params: {
                    activity_id: this.id,
                    ...this.$route.query,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                this.data = data.data;
                document.title = this.data.title + "  详情";
                this.userInfo = data.userinfo;
                if(data.data.recommend_advert){
                    this.ad = data.data.recommend_advert;
                }
                // 设置规格
                if(data.data.spec_content.length){
                    this.buyNum = 1;
                    this.buyOneMoney = this.buyMoney = data.data.spec_content[0][this.timeIsover?'price':'offerPic'];
                    this.buyKc = data.data.spec_content[0].stock;
                }else{
                    this.buyNum = 1;
                    this.buyOneMoney = this.buyMoney = data.data[this.timeIsover?'price':'special_offer'];
                }
                this.dmList = [];
                for(let i in data.data.barrage){
                    let dm = data.data.barrage[i];
                    this.dmList.push({
                        txt: dm.nickname,
                        src: dm.headpath,
                        move: false,
                        top:0,
                    })
                }
                this.getLastTime();
                this.bgimg = this.data.sales_posterss;
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
        // 海报信息
        getInfo(){
            axios({
                url: '/member/Apimember/member_getInfo',
            }).then((data)=>{
                if(data.err!=0){return}
                this.info = data.data;
                this.createEwm()
            })
        },
        // 生成二维码
        createEwm(){
            if(!localStorage.getItem("share_url")){
                this.share_url = window.location.href;
            }else{
                this.share_url =localStorage.getItem("share_url");
            }
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, this.share_url);
            msg.style.width = "100%";
            msg.style.height = "100%";
            
            if(this.autoCreateHb){this.toHaibao()}
        },
        // 制作海报
        toHaibao(){
            this.showHbDom = true;
            Toast("生成海报中...");
            window.scrollTo(0,0);
            setTimeout(this.createImg,100);
            // this.$router.push({path:"/bill", query:{img:this.data.sales_posterss||true}});
        },
        // 生成海报
        createImg(){
            let bill = this.$refs.bill;
            let width = bill.offsetWidth;
            let height = bill.offsetHeight;
            let canvas = this.$refs.canvas;
            let scale = 2;
            canvas.width = width * scale;
            canvas.height = height * scale;
            
            html2canvas(bill,{
                allowTaint: true,
                canvas: canvas,
                width: width,
                height: height,
                useCORS: true,
                scale: scale,
            }).then(()=>{
                let context = canvas.getContext('2d');
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
                this.imgUrl = canvas.toDataURL("image/png");
                this.showHb = true;
                this.showHbDom = false;
                Toast("已生成海报，长按图片保存");
            }).catch(()=>{
                Toast("error");
                this.showHb = false;
                this.showHbDom = false;
            });
        },
        beforeRead(file){
            let formdata = new FormData();
            formdata.append("file",file);
            formdata.append("sales_posterss",this.id);
            Toast("正在上传");
            upFile(formdata).then((data)=>{
                if(data.data.err!=0){return}
                this.bgimg = data.data.content.url;
            })
        },
        // 获取购买表单
        getActivityForm(){
            axios({
                url: "/activity/Apiactivity/getActivityForm",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.buyFormLs = data.data;
            })
        },
        // 倒计时
        getLastTime(){
            if(this.data.abort_time==0){this.showLastTime=false;return}
            if((typeof this.data.abort_time) === "number"){this.data.abort_time*=1000;}
            let over = new Date(this.data.abort_time).getTime();
            this.timeToString(over);
            setInterval(()=>{
                this.timeToString(over);
            },1000)
        },
        // 计算时间
        timeToString(over){
            let now = new Date().getTime();
            let time = over - now;
            if(time<=0){
                this.timeIsover = true;
                this.lastTime = "活动结束";
                return;
            }
            let d = parseInt(time/86400000);
            let h = parseInt((time%86400000)/3600000);
            let m = parseInt((time%3600000)/60000);
            let s = parseInt((time%60000)/1000);
            this.lastTime = "剩余："+(d==0?"":(d+"天"))+h+"时"+m+"分"+s+"秒";
        },
        // 选择省市区
        selAreaOk(o){
            this.buyFormData.addr = o[0].name + "," + o[1].name + "," + o[2].name;
            this.showSelarea = false;
        },
        // 改变规格
        changeBuyGg(id){
            if(this.guigeId==id){return}
            this.guigeId = id;
            this.buyNum = 1;
            this.buyOneMoney = this.buyMoney = this.data.spec_content[id].offerPic;
            this.buyKc = this.data.spec_content[id].stock;
        },
        // 改变购买数量
        chengeBuyNum(){
            this.buyMoney = this.buyNum * this.buyOneMoney;
        },
        // 下一步
        buyNext(){
            if(this.data.spec_content.length && this.data.spec_content[this.guigeId].stock<this.buyNum){Toast("当前规格库存不足");return}
            this.showGuige = false;
            if(this.buyFormLs.length){
                this.showUserInfo = true;
            }else{
                this.buySubmit();
            }
        },
        // 点击购买
        buyBtnClick(){
            if(this.data.audit_type!=1){return}
            // 没有规格
            if((!this.data.spec_content) || this.data.spec_content.length==0){
                // 没有表单
                if((!this.buyFormLs)|| this.buyFormLs.length==0){
                    this.buySubmit();
                }else{
                    this.showUserInfo = true;
                }
            }else{
                this.showGuige = true;
            }
        },
        // 购买
        buySubmit(){
            for(let i in this.buyFormLs){
                let name = this.buyFormLs[i].name;
                if(this.buyFormLs[i].is_required!=0){continue;}
                if(!this.buyFormData[name]){Toast(this.buyFormLs[i].write_explain);return}
                if(name=="mobile" && !/^1\d{10}$/.test(this.buyFormData[name])){Toast("请输入正确的手机号");return}
            }
            this.showUserInfo = false;
            let ty_form = [];
            for(let i in this.buyFormLs){ty_form.push({id:this.buyFormLs[i].id, value:this.buyFormData[this.buyFormLs[i].name]});}

            axios({
                method: "post",
                url: "/activity/Apiactivity/activityFormSubmission",
                data: {
                    id: this.id,
                    spec_id: this.data.spec_content.length?this.data.spec_content[this.guigeId].id:0,
                    price: this.buyMoney,
                    num: this.buyNum,
                    ty_form: ty_form,
                    recommendid: this.urlQuery.recommendid || 0,
                    recommendid1: this.urlQuery.recommendid1 || 0,
                    recommendid2: this.urlQuery.recommendid2 || 0,
                    recommendid3: this.urlQuery.recommendid3 || 0,
                    channelid: this.urlQuery.channelid || 0,
                    activity_id1: this.urlQuery.activity_id1 || 0,
                }
            }).then((data)=>{
                if(data.err!=0){return;}
                if(data.data!==2){return;}
                this.wxpay(data.content);                    
            })
        },
        // 支付
        wxpay(obj) {
            console.log("微信支付");
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
        // 滚动显示弹幕
        toMould(){
            this.$router.push("/event_mould");
        },
        // 滚动条
        handleScroll(){
            let detail = this.$refs.detail;
            // if(!detail){return}
            let long = detail.offsetTop - document.documentElement.scrollTop;
            if(long<=0){
                this.showAd = true;
                setTimeout(()=>{ this.showAd = false;},10000);    
                window.removeEventListener('scroll',this.handleScroll);
            }
        },
        toMycenter(){
            this.$router.push("/my_center");
        },
        toDetail(id){
            this.$router.push({name:"PayDetail", query:{id: id}});
        },
        newEvent(){
            window.location.href = this.data.tencent_url;
        },
        stopVideo(){
            let video = document.getElementById("topvideo");
            if(!video){return}
            video.pause();
        },
    },
    watch:{
        showHb(v){if(v){this.stopVideo()}},
        showHbDom(v){if(v){this.stopVideo()}},
        showSeller(v){if(v){this.stopVideo()}},
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
        // 弹幕
        let propTop = 0;
        setInterval(()=>{
            for(let dm of this.dmList){
                if(dm.move){continue}
                dm.move = true;
                let top = Math.random()*4+0.1;
                while(Math.abs(propTop-top)<0.5){ top = Math.random()*4+0.1; }
                propTop = top;
                dm.top = top+'rem';
                setTimeout(()=> dm.move=false, 10000);
                return;
            }
        },2000);
        // 滚动
        window.addEventListener('scroll',this.handleScroll);
        // 制作海报
        this.getInfo();
    },
}
</script>
<style scoped>
.cont{background:#F1EFF2; padding-bottom:1.6rem;}
.top{position:relative; width:100%; height:4.6rem; overflow: hidden;}
.cont-box{position:relative;}
.my-swipe .van-swipe-item{width:100%; height:4.6rem;}
.my-swipe .van-swipe-item .img{width:100%; height:100%;}
.top .see{position:absolute; bottom:0; right:0; padding:0.1rem 0.22rem; background:rgba(0,0,0,0.55);}
.top .box{position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden;}
.top .dm{position:absolute; max-width:7rem; left:100%; height:0.44rem;}
.top .dm .txt{padding:0.09rem 0.16rem 0.09rem 0.52rem; line-height:1; background:rgba(255,255,255,0.5); border-radius:0.2rem; white-space:nowrap;}
.top .dm .img{position: absolute; width:0.44rem; height:0.44rem; border-radius:50%; left:0; top:0;}
.top .dm.dmmove{transition:left 14s linear; left:-7rem;}

.bg_ff{background: #ffffff;}
.details{padding:0.4rem 0.45rem; background:#ffffff;}
.details .label{display:inline-block; line-height:0.4rem; margin-right:0.1rem; margin-bottom:0.1rem; padding:2px 0.18rem; border-radius:2px; background:#FFF8EC;}
.details .yuanjia{padding-left:0.2rem;}

.seller{width:7rem; box-sizing:border-box; margin:0 auto; padding:0 0.32rem; height:1.28rem; border-radius:0.1rem;}
.seller .icon{width:0.8rem; height:0.8rem; border-radius:50%;}
.seller .name{padding-left:0.2rem;}

.words .title{position:relative; width:3.8rem; margin:0 auto;}
.words .title .line{position:absolute; left:0; right:0; top:50%; border-bottom:1px solid #E3E3E3;}
.words .title .txt{position:relative; padding:0 0.5rem; color:#BBC1D4; background:#ffffff;}
.words .box .txt{padding:0.3rem 0.2rem; line-height:1.4; font-size:0.28rem; white-space: pre-line;}
.words .box .img{display:block; width:100%; height:auto;}
.words .box .video{display:block; width:100%; height:auto; background:#000000;}

.help{width:6.4rem; margin:auto; padding:0.3rem 0 0.6rem; line-height:1.6;}
.help p{margin:0.5em 0; text-indent:2em;}

.bottom-btns{position:fixed; width:100%; height:1.28rem; left:0; bottom:0; border-radius:0.4rem 0.4rem 0 0; overflow:hidden;}
.bottom-btns .btn1{height:100%; background: #ffffff; color:#FF9C00;}
.bottom-btns .btn2{height:100%; background:#FF9C00; color:#ffffff;}
.bottom-btns .btn2.ashen{background:#aaaaaa;}
.bottom-btns .made{position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.7)}

.ad{position:fixed; left:0.5rem; bottom:1.45rem; box-sizing:border-box; width:6.5rem; height:1.6rem; padding:0.22rem 0.25rem; background:#ffffff; border-radius:3px;}
.ad .img{width:1.9rem; height:1.16rem;}
.ad .txt{padding-left:0.2rem;}
.ad .txt .title{line-height:1.2;}
.ad .close{position:absolute; padding:0.1rem; right:-0.35rem; top:-0.35rem;}

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

.fixed-submit{top:5.45rem; width:auto;}

.fixed-btn{position:fixed; right:0.5rem; top:8.4rem; min-height:1.22rem;}
.fixed-btn .txt{padding:0.1rem 0.7rem 0.1rem 0.26rem; background:#ffffff; border-radius:0.1rem;}
.fixed-btn .txt .line{padding:0.1rem 0; line-height:1; border-bottom:1px solid #D7DBE9;}
.fixed-btn .txt .line:last-child{border:none;}
.fixed-btn .txt .icon{width:0.3rem; height:0.3rem; margin-right:0.1rem;}
.fixed-btn .img{position:absolute; right:-0.45rem; width:0.9rem; height:0.9rem; border-radius:50%; box-shadow:0 0 6px #308AF6;}

.guige{padding:0.5rem;}
.guige .img{width:1.45rem; height:1.45rem;}
.guige .txt{padding-left:0.3rem;}
.guige .item{padding-bottom:0.2rem; border-bottom:1px solid #C7CDDF;}
.guige .label{display:inline-block; margin:0.2rem 0.2rem 0 0; line-height:0.46rem; padding:0 0.26rem; border-radius:0.06rem; background:#EFF1F7; color:#828EB0;}
.guige .label.active{background:#F32323; color:#ffffff;}
.guige .next-btn{width:2.7rem;}

.user-info{padding:0.5rem;}
.user-info .input{border-bottom:1px solid #C7CDDF;}
.user-info .next-btn{width:2.7rem;}

.bill{position:relative;width:6.32rem; height:10.1rem; background:#EEF0F5;}
.bill .placehold{width:6.32rem; height:10.1rem;}
.bill .bgimg{position:absolute; width:100%; height:100%; top:0; left:0;}
.bill .user{position:absolute; left:0.64rem; top:0.64rem;}
.bill .iconbox{width:1.15rem; height:1.15rem;}
.bill .iconbox .icon-border{box-sizing:content-box; position:absolute; left:-3px; top:-3px; width:1.15rem; height:1.15rem; padding:3px; background-image:url(~@/assets/bill/iconborder.png); background-size:100% 100%;}
.bill .iconbox .icon{position:absolute; left:0; top:0; width:1.15rem; height:1.15rem; border-radius:50%;}
.bill .user .name{position:absolute; left:1rem; top:0; bottom:0; margin:auto; padding:0 0.2rem 0 0.3rem; height:0.44rem; line-height:0.44rem; background:url(~@/assets/bill/name.png); background-size:100% 100%; white-space:nowrap;}
.bill .ewmbox{position:absolute; right:0.64rem; bottom:0.45rem; box-sizing:border-box; width:1.76rem; height:1.76rem; padding:0.08rem; background:url(~@/assets/bill/ewmbg.png); background-size:100% 100%;}
.bill .ewmbox .ewm{width:100%; height:100%;}
#qrcode{width:100%; height:100%;}
#qrcode img{width:100%;height:100%;}
.btns{width:6.4rem; margin-left:auto; margin-right:auto;}
.btns .btn{width:2.5rem;}

.popup-box .top-btn{padding:0.3rem 0.4rem;}
.popup-box .imgbox{width:100%; overflow-x:auto; overflow-y:hidden;}
.popup-box .imgbox .img-ul{position:relative; white-space: nowrap; padding:0 0.1rem;}
.popup-box .imgbox .img-ul li{position:relative; display:inline-block; margin:0 0.2rem; width:1.64rem; height:2.32rem; }
.popup-box .imgbox .img-ul li .img{width:100%; height:100%;}
.popup-box .imgbox .img-ul li .check{box-sizing:border-box; position:absolute; right:0.1rem; top:0.1rem;}
.popup-box .upfile{padding:0.4rem;}

.canvas{position:absolute; top:0; left:0; z-index:-1; width:6.32rem; height:10.01rem; background:#ffffff;}
.hb-img{width:6.32rem; height:10.01rem;}
</style>
