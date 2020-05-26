<template>
    <div class="cont df df-c">
        <div class="top df df-r just-c-end">
            <van-button type="info" size="small" @click="showForm=true" >添加组</van-button>
        </div>
        <div class="list-box f1">
            <van-list
                v-model="loading"
                :finished="over"
                finished-text="没有更多数据了"
                @load="getList"
                class="cont-list c_33"
            >
                <!-- <van-collapse v-model="list_open" :accordion="true">
                    <van-collapse-item v-for="(item,index) in dataList" :key="index" :title="item.title" :value="getTime(item.addtime)" :name="item.id">
                        <div class="options df df-r ai-c df-w-w just-c-end">
                            <span class="c_blue" @click.stop="creatHb(item)">生成海报</span>
                            <span class="c_blue copy_bill" @click.stop="copyHb(item)" :data-clipboard-text="item.url">复制海报链接</span>
                            <span class="c_blue" @click.stop="setDetail(item)">详情</span>
                            <span class="c_blue" @click.stop="setGroup(item)">设置</span>
                        </div>
                    </van-collapse-item>
                </van-collapse> -->
                <div v-for="(item,index) in dataList" :key="index" class="item df df-r ai-c just-c-bet">
                    <div class="df df-c f1">
                        <div class="fs_28 c_33 one-hide">{{item.title}}</div>
                        <div class="fs_22 c_99">{{getTime(item.addtime)}}</div>
                    </div>
                    <div class="options df df-r ai-c">
                        <span class="fs_28 c_blue" @click.stop="setDetail(item)">详情</span>
                        <span class="fs_28 c_blue" @click.stop="option(item)">操作</span>
                    </div>
                </div>
            </van-list>
        </div>
        <!-- 表单 -->
        <van-overlay :show="showForm" @click="showForm=false" class="df ai-c just-c-ct">
            <div class="form" @click.stop>
                <van-field v-model="formTitle" label="组名称" placeholder="请输入组名称" />
                <button class="mt-30 form-btn c_ff" @click="submit">确定</button>
            </div>
        </van-overlay>
        <!-- 操作 -->
        <van-popup v-model="showOption" round position="bottom">
            <div class="operate-box">
                <span class="label c_ashen fs_30" @click="setGroup()">设置活动</span>
                <span class="label c_ashen fs_30" @click="setBill()">设置海报</span>
                <span class="label c_ashen fs_30" @click="creatHb()">生成海报</span>
                <span id="copy_bill" class="label c_ashen fs_30" :data-clipboard-text="nowItem.url">复制推广链接</span>
            </div>
        </van-popup>
        <!-- 生成海报 -->
        <van-overlay :show="showHbDom" class="df df-c ai-c just-c-ct" @click="showHbDom=false">
            <div id="bill" ref="bill" class="bill shadow" @click.stop>
                <canvas class="canvas" id="canvas" ref="canvas"></canvas>
                <!-- <van-uploader :disabled="disabled" :preview-image="false" :before-read="beforeRead">
                    <div class="placehold df df-c ai-c just-c-ct c_99">
                        <span class="fs_28">点击设置背景</span>
                        <span class="mt-20 fs_24">600 * 960</span>
                    </div>
                </van-uploader> -->
                <img ref="bgimgDom" :src="nowItem.back_pic" crossOrigin='anonymous' class="bgimg" />
                
                <div ref="name" class="name fs_24 c_99" :style="{left:testIsTrue('namex'), top:testIsTrue('namey')}">{{nowItem.info && nowItem.info.nickname}}</div>
                <div class="user" :style="{left:testIsTrue('headx'), top:testIsTrue('heady')}">
                    <!-- <div class="name fs_24 c_99">{{info.nickname}}</div> -->
                    <div class="iconbox">
                        <div class="icon-border"></div>
                        <img :src="nowItem.info && nowItem.info.headpath" crossOrigin='anonymous' class="icon" />
                    </div>
                </div>
                <div class="ewmbox" :style="{left:testIsTrue('erweix'), top:testIsTrue('erweiy')}">
                    <canvas id="ewm" ref="ewm" class="ewm"></canvas>
                </div>
            </div>
        </van-overlay>
        <van-overlay :show="showHb" @click="showHb=false" class="df df-c ai-c just-c-ct">
            <img class="hb-img" :src="imgUrl" @click.stop/>
        </van-overlay>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";
import { Toast } from 'vant';
import Clipboard from 'clipboard';
import QRCode from "qrcode";
import html2canvas from 'html2canvas';

export default {
    data(){
        return {
            list_open: "",

            search: {
                page: 1,
                limit: 20,
            },
            loading: false,
            over: false,
            dataList: [],

            showForm: false,
            formTitle: "",

            nowItem: {},
            showOption: false,

            showHbDom: false,
            info: {},
            share_url: "",
            showHb: false,
            bgimg: false,
            imgUrl: "",
            haibaoToast: null,
        }
    },
    mounted(){
        let urlbill = new Clipboard("#copy_bill");
        urlbill.on('success', ()=>{Toast("复制成功");this.showOption=false;});
        urlbill.on('error', ()=>{Toast("复制失败")});
    },
    destroyed(){
        if(this.haibaoToast){this.haibaoToast.clear();}
    },
    methods: {
        getList(){
            axios({
                url: "/activity/Apiactivity/extension_list",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return;}
                this.loading = false;
                this.search.page++;
                if(data.data.count<=this.search.pageSize){
                    this.dataList = data.data.list;
                    this.over = true;
                } else {
                    this.dataList = this.dataList.concat(data.data.list);
                }
                if(data.data.count<=this.dataList.length){ this.over = true;}
            })
        },
        submit(){
            if(!this.formTitle){Toast("请输入组名称");return}
            axios({
                url: "/activity/Apiactivity/extension_add",
                params: {title: this.formTitle}
            }).then((data)=>{
                if(data.err!==0){return}
                Toast("添加成功");
                this.showForm = false;
                this.search.page = 1;
                this.dataList = [];
                this.loading = true;
                this.getList();
            });
        },
        option(item){this.nowItem=item; this.showOption=true;},
        // 设置
        setGroup(){this.$router.push({path:"/group_sel",query:{id:this.nowItem.id}});},
        // 详情
        setDetail(item){this.$router.push({path:"/group_detail",query:{id:item.id}});},
        // 创建海报
        creatHb(){
            this.showOption = false;
            this.createEwm();
        },
        // 生成二维码
        createEwm(){
            this.share_url = this.nowItem.url;
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, this.share_url);
            msg.style.width = "100%";
            msg.style.height = "100%";
            this.toHaibao();
        },
        // 制作海报
        toHaibao(){
            this.showHbDom = true;
            this.haibaoToast = Toast.loading({
                message: "正在生成海报，请稍候...",
                forbidClick: true,
                duration: 0,
            });
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
                this.haibaoToast && this.haibaoToast.clear();
                Toast("已生成海报，长按图片保存或转发");
            }).catch(()=>{
                Toast("生成海报失败");
                this.haibaoToast && this.haibaoToast.clear();
                this.showHb = false;
                this.showHbDom = false;
            });
        },
        // 设置海报
        setBill(){
            this.$router.push({path:"/group_bill",query:{id:this.nowItem.id}});
        },
        testIsTrue(name){
            if(!this.nowItem){return false;}
            if(!this.nowItem.sales_posterss_coords){return false;}
            if(!this.nowItem.sales_posterss_coords[name] && this.nowItem.sales_posterss_coords[name]!==0){return false;}
            return this.nowItem.sales_posterss_coords[name] + 'rem';
        },
        getTime(time){
            let date = new Date(time*1000);
            return date.toLocaleDateString() + " " + date.toTimeString().slice(0,8);
        },
    },
    components:{PageMenu},
}
</script>
<style scoped>
.cont{height:100%;}
.top{padding:0.18rem 0.3rem; border-bottom:1px solid #eeeeee;}
.list-box{overflow-y:auto;}
.cont-list{width:7.1rem; margin:0 auto;}
.cont-list .item{padding:0.16rem 0; border-bottom:1px solid #eeeeee;}
.cont-list .item:last-child{border:none;}

.form{box-sizing:border-box; width:7rem; padding:0.4rem 0.3rem; border-radius:0.2rem; background:#ffffff;}
.form .form-btn{box-sizing:border-box; width:100%; height:36px; background:#1989fa; border:none; outline:none; border-radius:6px;}

.options span{margin-right:0.2rem; font-size:14px;}
.options span:last-child{margin-right:0;}

.operate-box{padding:0.5rem 0.5rem 0.2rem;}
.operate-box .line{margin-bottom:0.26rem; width:100%; height:0; border-top:1px solid #dddddd;}
.operate-box .label{display:inline-block; padding:0.1rem 0.2rem; border:1px solid; border-radius:0.1rem; margin:0 0.2rem 0.26rem 0;}

.bill{position:relative;width:6.32rem; height:10.1rem; overflow:hidden; background:#EEF0F5;}
.bill .placehold{width:6.32rem; height:10.1rem;}
.bill .bgimg{position:absolute; width:100%; height:100%; top:0; left:0;}
.bill .user{position:absolute; left:0.64rem; top:0.64rem;}
.bill .iconbox{width:1.15rem; height:1.15rem;}
.bill .iconbox .icon-border{box-sizing:content-box; position:absolute; left:-3px; top:-3px; width:1.15rem; height:1.15rem; padding:3px; background-image:url(~@/assets/bill/iconborder.png); background-size:100% 100%;}
.bill .iconbox .icon{position:absolute; left:0; top:0; width:1.15rem; height:1.15rem; border-radius:50%;}
/* .bill .user .name{position:absolute; left:1rem; top:0; bottom:0; margin:auto; padding:0 0.2rem 0 0.3rem; height:0.44rem; line-height:0.44rem; background:url(~@/assets/bill/name.png); background-size:100% 100%; white-space:nowrap;} */
.bill .name{position:absolute; left:1.64rem; top:0.995rem; bottom:0; padding:0 0.2rem 0 0.3rem; height:0.44rem; line-height:0.44rem; background:url(~@/assets/bill/name.png); background-size:100% 100%; white-space:nowrap;}
.bill .ewmbox{position:absolute; right:0.64rem; bottom:0.45rem; box-sizing:border-box; width:1.76rem; height:1.76rem; padding:0.08rem; background:url(~@/assets/bill/ewmbg.png); background-size:100% 100%;}
.bill .ewmbox .ewm{width:100%; height:100%;}
#qrcode{width:100%; height:100%;}
#qrcode img{width:100%;height:100%;}
.btns{width:6.4rem; margin-left:auto; margin-right:auto;}
.btns .btn{width:2.5rem;}

.canvas{position:absolute; top:0; left:0; z-index:-1; width:6.32rem; height:10.01rem; background:#ffffff;}
.hb-img{width:6.32rem; height:10.01rem;}
.hb-title{box-sizing:border-box; width:100%; padding:0.3rem; background:#fcdcdf;}
.hb-footer{box-sizing:border-box; width:100%; padding:0.3rem; background:#ffffff;}
</style>
