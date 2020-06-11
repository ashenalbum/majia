<template>
    <div class="cont df df-c ai-c">
        <div id="bill" ref="bill" class="bill shadow">
            <van-uploader :preview-image="false" :before-read="beforeRead">
                <div class="placehold df df-c ai-c just-c-ct c_99">
                    <span class="fs_28">点击设置背景</span>
                    <span class="mt-20 fs_24">600 * 960</span>
                </div>
            </van-uploader>
            <img v-if="bgimg" :src="bgimg" crossOrigin='anonymous' class="bgimg"  />

            <div ref="name" class="name fs_24 c_99" :style="{left:namePst.left+'rem', top:namePst.top+'rem'}">{{info.nickname}}</div>
            <div ref="user" class="user" :style="{left:userIconPst.left+'rem', top:userIconPst.top+'rem'}">
                <div class="iconbox">
                    <div class="icon-border"></div>
                    <img :src="info.headpath" crossOrigin='anonymous' class="icon" />
                </div>
            </div>
            <div ref="ewmbox" class="ewmbox" :style="{left:ewmPst.left+'rem', top:ewmPst.top+'rem'}">
                <canvas id="ewm" ref="ewm" class="ewm"></canvas>
            </div>
        </div>
        <div class="btns mt-40 df df-r ai-c just-c-aro">
            <van-button size="small" class="btn" color="#999999" plain @click="createHb">保存</van-button>
            <van-uploader :preview-image="false" :before-read="beforeRead">
                <van-button size="small" class="btn" color="#FF9C00">上传(600*960)</van-button>
            </van-uploader>
        </div>
        <div class="mt-30 fs_28 c_99 df df-r just-c-ct">拖拽头像或二维码调整位置</div>
        <!-- <div v-else class="btns mt-40">
            <van-button block size="small" type="info" @click="upDate">提交</van-button>
        </div> -->

        <van-overlay :show="showHb">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showHb=false">
                <img class="canvas" :src="imgUrl" @click.stop/>
            </div>
        </van-overlay>
        
        <canvas class="canvas" id="canvas" ref="canvas" style="display:none;"></canvas>

        <!-- 提交完成提示 -->
        <!-- <van-overlay :show="showTj"> -->
        <van-popup v-model="showTj" @close="backList">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTj=false">
                <div class="tj-ok df df-c ai-c" @click.stop>
                    <img src="~@/assets/event/submit_title.png" class="img" />
                    <div class="mt-30 mb-30 c_33 fs_28">设置完成</div>
                    <van-button type="info" size="small" class="btn" @click="toFormSet">表单设置</van-button>
                    <van-button type="info" size="small" class="btn" @click="backList">返回我的活动</van-button>
                </div>
                <!-- <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" /> -->
            </div>
        </van-popup>
        <!-- </van-overlay> -->
        <!-- <van-popup v-model="showPopup" position="bottom">
            <div class="popup-box">
                <div class="top-btn df df-r ai-c just-c-bet fs_26">
                    <span class="c_ashen" @click="showPopup=false">取消</span>
                    <span class="c_blue">确定</span>
                </div>
                <div class="imgbox">
                    <ul class="img-ul">
                        <li v-for="(item,index) in [1,2,3,4,5,6,7]" :key="index" class="ai-c">
                            <img src="~@/assets/test.png" class="img" />
                            <van-icon
                                :name="index==1?'checked':'circle'"
                                :color="index==1?'#FF9C00':'#ffffff'"
                                size="0.4rem"
                                class="check"
                            />
                        </li>
                    </ul>
                </div>
                <div class="upfile txt-c">                    
                    <van-uploader :preview-image="false" :before-read="beforeRead">
                        <a href="javascript:;" class="fs_30 c_blue">本地上传</a>
                    </van-uploader>
                </div>
            </div>
        </van-popup> -->
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upFile} from "../utils/axios";
import QRCode from "qrcode";
// import html2canvas from 'html2canvas';
import { Toast } from 'vant';
import PageMenu from "../components/PageMenu";


export default {
    data(){
        return {
            id: null,
            info: {},
            share_url: "",
            showHb: false,
            bgimg: false,
            bgimgId: null,
            imgUrl: "",

            showTj: false,
            // 拖拽
            namePst: {left:1.64, top:0.995},
            userIconPst: {left:0.64, top:0.64 },
            ewmPst: {left:3.92, top:7.9},
            touchRef: "",
            touchRefPst: {left:0, top:0},
            billPst: {left:0, top:0},
            startPst: {left:0, top:0},
            movePst: {left:0, top:0},

            haibaoToast: null,
        }
    },
    created(){
        this.id = this.$route.query.id;
        // if(this.$route.query.share_url){localStorage.setItem("share_url",this.$route.query.share_url);}
        if(!localStorage.getItem("share_url")){
            this.share_url = window.baseUrl + "/dist/";
        }else{
            this.share_url =localStorage.getItem("share_url");
        }
        this.getInfo();
    },
    mounted(){
        this.createEwm();
        
        this.billPst = {left:this.$refs.bill.offsetLeft, top:this.$refs.bill.offsetTop};
        this.$refs.name.addEventListener("touchstart",(event)=>{this.touchStart(event,"name")});
        this.$refs.user.addEventListener("touchstart",(event)=>{this.touchStart(event,"user")});
        this.$refs.ewmbox.addEventListener("touchstart",(event)=>{this.touchStart(event,"ewmbox")});
    },
    destroyed(){
        if(this.haibaoToast){this.haibaoToast.clear();}
    },
    methods: {
        getInfo(){
            axios({
                url: '/member/Apimember/member_getInfo',
            }).then((data)=>{
                if(data.err!=0){return}
                this.info = data.data;
            })
            
            axios({
                url: "/activity/Apiactivity/previewTemplateInfo",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.bgimg = data.data.sales_posterss;
                let pst = data.data.sales_posterss_coords;
                if(pst.namex && pst.namey){
                    this.namePst = {left:pst.namex, top:pst.namey};
                }
                if(pst.erweix && pst.erweiy){
                    this.wemPst = {left:pst.erweix, top:pst.erweiy};
                }
                if(pst.headx && pst.heady){
                    this.userIconPst = {left:pst.headx, top:pst.heady};
                }
            });
        },
        createEwm(){
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, this.share_url);
            msg.style.width = "100%";
            msg.style.height = "100%";
        },
        createHb(){
            // if(!this.bgimg){Toast("请先上传图片");return}
            // if(!this.bgimgId){Toast("未修改或设置图片");return}
            this.upDate();
        },
        upDate(){
            // if(!this.bgimgId){return}
            // Toast("正在上传");
            // 提交海报背景图片
            axios({
                url: "/activity/Apiactivity/editActivity",
                params: {
                    is_examine: 2,
                    specialOperate: true,
                    activity_id: this.id,
                    sales_posterss: this.bgimgId,
                    headx: this.userIconPst.left,
                    heady: this.userIconPst.top,
                    erweix: this.ewmPst.left,
                    erweiy: this.ewmPst.top,
                    namex: this.namePst.left,
                    namey: this.namePst.top,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.showTj = true;
            })
        },
        beforeRead(file){
            let formdata = new FormData();
            formdata.append("file",file);
            formdata.append("sales_posterss",this.id);
            this.haibaoToast = Toast.loading({
                message: "正在上传，请稍候...",
                forbidClick: true,
                duration: 0,
            });
            upFile(formdata).then((data)=>{
                this.haibaoToast.clear();
                if(data.data.err!=0){Toast(data.content);return}
                Toast("上传成功");
                this.bgimg = data.data.content.url;
                this.bgimgId = data.data.content.fileid;
            }).catch(()=>{
                this.haibaoToast.clear();
                Toast("上传失败");
            })
        },
        // 拖拽
        touchStart(event,ref){
            this.touchRef = ref;
            let thisLeft = event.target.offsetWidth/2;
            let thisTop = event.target.offsetHeight/2;
            this.touchRefPst = {left:thisLeft, top:thisTop};
            this.$refs.bill.addEventListener("touchmove",this.touchMove);
            this.$refs.bill.addEventListener("touchend",this.touchEnd);
        },
        touchMove(event){
            let p = event.targetTouches[0];
            let left = p.pageX - this.billPst.left - this.touchRefPst.left;
            let top = p.pageY - this.billPst.top - this.touchRefPst.top;
            let bill = this.$refs.bill;
            let billW = bill.offsetWidth;
            let billH = bill.offsetHeight;
            let leftRem = 6.32*left/billW;
            let topRem = 10.1*top/billH;
            leftRem = leftRem<0?0:leftRem;
            topRem = topRem<0?0:topRem;
            if(this.touchRef=="user"){
                let cz = 1.15;
                leftRem = leftRem>(6.32-cz)?(6.32-cz):leftRem;
                topRem = topRem>(10.1-cz)?(10.1-cz):topRem;
                this.userIconPst = {left:leftRem, top:topRem};
            }else if(this.touchRef=="ewmbox"){
                let cz = 1.76;
                leftRem = leftRem>(6.32-cz)?(6.32-cz):leftRem;
                topRem = topRem>(10.1-cz)?(10.1-cz):topRem;
                this.ewmPst = {left:leftRem, top:topRem};
            }else if(this.touchRef=="name"){
                let w = this.$refs.name.offsetWidth;
                let nw = 6.32*w/billW;
                let cz = 0.44;
                leftRem = leftRem>(6.32-nw)?(6.32-nw):leftRem;
                topRem = topRem>(10.1-cz)?(10.1-cz):topRem;
                this.namePst = {left:leftRem, top:topRem};
            }
            event.preventDefault();
        },
        touchEnd(){
            this.$refs.bill.removeEventListener("touchmove",this.touchMove);
            this.$refs.bill.removeEventListener("touchend",this.touchEnd);
        },

        toFormSet(){this.$router.push({path:"/event_form_set", query:{id:this.id}})},
        backList(){this.$router.push({path:"/event_list"})},
    },
    components: {PageMenu},
}
</script>
<style scoped>
.mb-30{margin-bottom:0.3rem;}
.cont{padding:0.4rem 0 0.1rem; user-select:none;}
.bill{position:relative; width:6.32rem; height:10.1rem; background:#EEF0F5; overflow:hidden;}
.bill .placehold{width:6.32rem; height:10.1rem;}
.bill .bgimg{position:absolute; width:100%; height:100%; top:0; left:0; background:#ffffff;}
.bill .user{position:absolute; left:0.64rem; top:0.64rem;}
.bill .user .iconbox{width:1.15rem; height:1.15rem;}
.bill .user .iconbox .icon-border{box-sizing:content-box; position:absolute; left:-3px; top:-3px; width:1.15rem; height:1.15rem; padding:3px; background-image:url(~@/assets/bill/iconborder.png); background-size:100% 100%;}
.bill .user .iconbox .icon{position:absolute; left:0; top:0; width:1.15rem; height:1.15rem; border-radius:50%;}
.bill .name{position:absolute; left:1.64rem; top:0.995rem; bottom:0; padding:0 0.2rem 0 0.3rem; height:0.44rem; line-height:0.44rem; background:url(~@/assets/bill/name.png); background-size:100% 100%; white-space:nowrap;}
.bill .ewmbox{position:absolute; left:3.92rem; bottom:7.9rem; box-sizing:border-box; width:1.76rem; height:1.76rem; padding:0.08rem; background:url(~@/assets/bill/ewmbg.png); background-size:100% 100%;}
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

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.canvas{display:block; width:6.32rem; height:10.01rem; background: #ffffff;}

.wrapper .tj-ok{width:5.2rem; padding-bottom:0.3rem; background:#ffffff; overflow:hidden;}
.wrapper .tj-ok .img{width:100%; height:auto;}
.wrapper .tj-ok .btn{margin:0.1rem 0;width:4.4rem;}
</style>
