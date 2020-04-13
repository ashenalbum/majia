<template>
    <div class="cont df df-c ai-c">
        <div id="bill" ref="bill" class="bill shadow">
            <van-uploader :disabled="disabled" :preview-image="false" :before-read="beforeRead">
                <div class="placehold df df-c ai-c just-c-ct c_99">
                    <span class="fs_28">点击设置背景</span>
                    <span class="mt-20 fs_24">600 * 960</span>
                </div>
            </van-uploader>
            <img v-if="bgimg" :src="bgimg" crossOrigin='anonymous' class="bgimg" />
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
        <div v-if="!disabled" class="btns mt-40 df df-r ai-c just-c-aro">
            <van-button size="small" class="btn" color="#999999" plain @click="createHb">预览并保存</van-button>
            <van-uploader :preview-image="false" :before-read="beforeRead">
                <van-button size="small" class="btn" color="#FF9C00">上传(600*960)</van-button>
            </van-uploader>
        </div>
        <div v-else class="btns mt-40">
            <van-button block size="small" type="info" @click="createImg">预览并保存</van-button>
        </div>

        <van-overlay :show="showHb">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showHb=false">
                <img class="canvas" :src="imgUrl" @click.stop/>
            </div>
        </van-overlay>
        
        <canvas class="canvas" id="canvas" ref="canvas" style="display:none;"></canvas>

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
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upFile} from "../utils/axios";
import QRCode from "qrcode";
import html2canvas from 'html2canvas';
import { Toast } from 'vant';


export default {
    data(){
        return {
            id: null,
            info: {},
            share_url: "",
            showHb: false,
            bgimg: false,
            imgUrl: "",
            disabled: false,
        }
    },
    created(){
        this.id = this.$route.query.id;
        if(this.$route.query.img){
            this.bgimg = this.$route.query.img;
            this.disabled = true;
        }
        // if(this.$route.query.share_url){localStorage.setItem("share_url",this.$route.query.share_url);}
        if(!localStorage.getItem("share_url")){
            this.share_url = "http://sqyx.78wa.com/dist/#/";
        }else{
            this.share_url =localStorage.getItem("share_url");
        }
        this.getInfo();
    },
    mounted(){
        this.createEwm();
    },
    methods: {
        getInfo(){
            axios({
                url: '/member/Apimember/member_getInfo',
            }).then((data)=>{
                if(data.err!=0){return}
                this.info = data.data;
            })
        },
        createEwm(){
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, this.share_url);
            msg.style.width = "100%";
            msg.style.height = "100%";
        },
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
                Toast("长按保存海报");
            });
        },
        createHb(){
            // if(!this.bgimg){Toast("请先上传图片");return}
            this.createImg();
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
    }
}
</script>
<style scoped>
.cont{padding:0.4rem 0 0.1rem; user-select:none;}
.bill{position:relative; width:6.32rem; height:10.1rem; background:#EEF0F5;}
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

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.canvas{display:block; width:6.32rem; height:10.01rem; background: #ffffff;}
</style>
