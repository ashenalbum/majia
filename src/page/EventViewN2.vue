<template>
    <div class="cont">
        <div class="top">
            <van-swipe class="my-swipe" :autoplay="data.video_url?0:3000" indicator-color="white">
                <van-swipe-item v-if="data.video_url">
                    <video class="img" :src="data.video_url" controls autoplay muted></video>
                </van-swipe-item>
                <van-swipe-item v-for="(item,index) in data.head_pic_img" :key="index">
                    <img :src="item.pic_img" class="img" />
                </van-swipe-item>
            </van-swipe>
            <!-- <div class="see c_ashen fs_28">{{data.browse_num}}人浏览</div> -->

            <!-- <div v-if="dmList.length" class="box"></div> -->
            
            <div v-for="(item,index) in dmList" :key="index" class="dm df df-r ai-c" :class="{dmmove:item.move}" :style="{top:item.top}">
                <div class="txt c_66 fs_20 van-ellipsis">{{item.txt}}</div>
                <img :src="item.src" class="img" />
            </div>
        </div>
        <div class="bg_ff">
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
                    <!-- <span class="fs_28 c_ashen">销量 {{data.people_buy_num}}</span> -->
                </div>
            </div>
            <div class="seller shadow df df-r ai-c just-c-bet" @click="showSeller=true">
                <div class="df df-r ai-c">
                    <img :src="userInfo.headpath" class="icon" />
                    <span class="name c_33 fs_30 one-hide">{{userInfo.nickname}}</span>
                </div>
                <van-button size="mini" color="#FF9C00" @click="showSeller=true">关注</van-button>
            </div>
            <div class="liulan shadow mt-40">
                <div class="tab df df-r fs_28">
                    <div class="f1 df ai-c just-c-ct">已购买<span class="c_o">{{data.people_buy_num}}</span>人</div>
                    <div class="f1 df ai-c just-c-ct"><span class="c_o">{{data.browse_num}}</span>次浏览</div>
                </div>
                <div v-if="dmList && dmList.length" class="icons mt-20 df df-r df-w-w">
                    <img v-for="(item,index) in dmList" :key="index" :src="item.src" class="icon shadow" />
                </div>
            </div>
            <div class="words mt-40">
                <div class="title df ai-c just-c-ct">
                    <div class="line"></div>
                    <span class="txt fs_36">产品详情</span>
                </div>
                <div class="box mt-20">
                    <div v-for="(item,index) in data.details" :key="index">
                        <div v-if="item.type==1" v-html="item.content" class="txt t-indent c_ashen">{{item.content}}</div>
                        <img v-if="item.type==2" class="img" :src="item.content" />
                        <video v-else-if="item.type==3" class="video" :src="item.content" controls></video>
                    </div>
                </div>
            </div>
        </div>
        <div class="help fs_22 c_88">
            <div class="fs_30">购买须知：</div>
            <div v-html="data.instructions"></div>
            <!-- <div class="t-indent">1.购买后关注“吗夹”公众号，可在菜单【会员中心】处找到已购买的活动信息或者发布最新活动。</div>
            <div class="t-indent">2.活动付费后，原则上不予退款，请谨慎决定。如入住商承诺退款，请购买后联系商家客服协商处理。如有其它争议，请联系平台客服！</div> -->
        </div>
        <div class="bottom-btns df df-r fs_34">
            <div class="btn1 f1 df df-c ai-c just-c-ct">制作新活动</div>
            <div class="btn2 f1 df df-c ai-c just-c-ct"><span>{{data.pay_btn}}</span></div>
            <div class="made df df-r ai-c just-c-ct c_ff fs_34" @click="make">
                <van-icon name="edit" size="0.45rem" />
                <span class="pl-20"> 立即制作</span>
            </div>
        </div>

        <!-- <div v-if="showAd" class="ad df df-r shadow">
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
        </div> -->

        <van-button class="fixed-submit" type="info" @click="haibao">{{data.hb_btn_name}}</van-button>

        <!-- <van-overlay :show="showSeller" @click="showSeller=false">
            <div class="maskSeller">
                <div class="box" @click.stop>
                    <div class="df df-r ai-c just-c-bet">
                        <ul class="ul fs_26">
                            <li>联系电话：<a href="tel:13123232323" class="c_o">13123232323</a></li>
                            <li>客服微信：<span ref="copywx" data-clipboard-text="123412341234">123412341234 <span class="copy c_ff">复制</span></span></li>
                            <li>客服电话：<a href="tel:13123232323" class="c_o">13123232323</a></li>
                        </ul>
                        <img src="~@/assets/test.png" class="icon" />
                    </div>
                    <div class="mt-40">
                        <img src="~@/assets/test.png" class="img" />
                    </div>
                    <div class="linebox mt-20 df ai-c just-c-ct">
                        <div class="line"></div>
                        <span class="txt fs_26 c_33">扫一扫，加商家微信</span>
                    </div>
                </div>
            </div>
        </van-overlay> -->
        <!-- 新弹幕 -->
        <div ref="newdanmu" class="new-dm"></div>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
// import Clipboard from 'clipboard';
import {Toast} from 'vant';
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";

export default {
    name: "EventView",
    data(){
        return {
            id: null,
            data: {},
            userInfo: {},
            showAd: true,
            showSeller: false,
            dmList: [],
            ad: {},
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData();
    },
    methods: {
        make(){
            axios({
                url: "/activity/Apiactivity/is_perfect_info"
            }).then((data)=>{
                if(data.err!==0){
                    Toast("请先验证信息");
                    this.$router.push({path:"/auth",query:{id: this.id}});
                    return;
                }
                this.$router.push({path:"/event_form_n2", query:{id: this.id}});
            });
        },
        getData(){
            axios({
                url: "/activity/Apiactivity/previewTemplateInfo",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                document.title = data.data.title + "  预览";
                this.data = data.data;
                this.userInfo = data.userinfo;
                this.ad = data.data.recommend_advert;
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
            })
        },
        haibao(){
            Toast("预览活动暂不支持生成海报");
        }
    },
    mounted(){
        // let clipboard = new Clipboard(this.$refs.copywx);
        // clipboard.on('success', ()=>{Toast("复制成功");});
        // clipboard.on('error', ()=>{Toast("复制失败");});
        // 弹幕
        // let propTop = 0;
        // setInterval(()=>{
        //     for(let dm of this.dmList){
        //         if(dm.move){continue}
        //         dm.move = true;
        //         let top = Math.random()*4+0.1;
        //         while(Math.abs(propTop-top)<0.5){ top = Math.random()*4+0.1; }
        //         propTop = top;
        //         dm.top = top+'rem';
        //         setTimeout(()=> dm.move=false, 10000);
        //         return;
        //     }
        // },2000);
        // 新弹幕
        let newdm = this.$refs.newdanmu;
        let dmid = 0;
        setInterval(()=>{
            if(!newdm || this.dmList.length<5){return}
            let dm = this.dmList[dmid];
            if(this.dmList.length<=dmid+1){dmid=0}else{dmid++}

            let div = document.createElement("div");
            div.setAttribute("class","dm df df-r ai-c");
            let img = document.createElement("img");
            img.src = dm.src;
            img.setAttribute("class","icon");
            let txt = document.createElement("div");
            txt.setAttribute("class","txt");
            txt.innerHTML = dm.txt;
            div.appendChild(img);
            div.appendChild(txt); 
            newdm.appendChild(div);
            setTimeout(()=>{
                div.style.height = "0.6rem";
                if(newdm.children.length>3){
                    newdm.children[0].remove();
                    newdm.children[1].style.bottom = "0.8rem";
                    newdm.children[0].style.bottom = "1.6rem";
                }else{
                    newdm.children[0].style.bottom = (newdm.children.length-1)*0.8+"rem";
                    if(newdm.children[1]){
                        newdm.children[1].style.bottom = (newdm.children.length-2)*0.8+"rem";
                    }
                }
            },100)
        },2000)
    },
    components:{PageMenu},
}
</script>
<style scoped>
.cont{background:#F1EFF2; padding-bottom:1.6rem;}
.top{position:relative; width:100%; height:4.6rem; overflow: hidden;}
.my-swipe .van-swipe-item{width:100%; height:4.6rem; display:flex; align-items:center; justify-content:center; background:#000000;}
.my-swipe .van-swipe-item .img{max-width:100%; max-height:100%;}
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
.words .title .txt{position:relative; padding:0 0.5rem; color:#BBC1D4; background:#ffffff; }
.words .box .txt{padding:0.3rem 0.2rem; line-height:1.4; font-size:0.28rem; white-space:pre-line;}
.words .box .img{display:block; width:100%; height:auto;}
.words .box .video{display:block; width:100%; height:auto; background:#000000;}

.help{width:6.4rem; margin:auto; padding:0.3rem 0 0.6rem; line-height:1.6;}
.help p{margin:0.5em 0; text-indent:2em;}

.bottom-btns{position:fixed; width:100%; height:1.28rem; left:0; bottom:0; border-radius:0.4rem 0.4rem 0 0; overflow:hidden;}
.bottom-btns .btn1{height:100%; background: #ffffff; color:#FF9C00;}
.bottom-btns .btn2{height:100%; background:#FF9C00; color:#ffffff;}
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
.maskSeller .img{width:100%; height:auto;}
.maskSeller .linebox{position:relative; width:100%; margin:0.4rem auto 0;}
.maskSeller .linebox .line{position:absolute; left:0; right:0; top:50%; border-bottom:1px solid #E3E3E3;}
.maskSeller .linebox .txt{position:relative; padding:0 0.5rem; background:#ffffff;}

.fixed-submit{top:5.45rem; width:auto;}

.liulan{box-sizing:border-box; width:7rem; margin-left:auto; margin-right:auto; border-radius:0.1rem; padding:0.2rem;}
.liulan .tab .f1{border-right:1px solid #3B3A40;}
.liulan .tab .f1:last-child{border:none;}
.liulan .icons{padding-top:0.2rem; height:2.2rem; overflow-y:auto; border-top:1px solid #DDDDDD;}
.liulan .icons .icon{width:0.9rem; height:0.9rem; margin:0.2rem 0.1rem 0; border-radius:50%;}

.new-dm{width:100%; height:0px; position:fixed; bottom:1.3rem; left:0;}
.new-dm>>>.dm{position:absolute; bottom:0; left:0; height:0rem; overflow:hidden; transition:all 0.8s;}
.new-dm>>>.dm .icon{position:relative; width:0.6rem; height:0.6rem; border-radius:50%;}
.new-dm>>>.dm .txt{background:rgba(0,0,0,0.6); color:#ffffff; margin-left:-0.3rem; font-size:0.28rem; line-height:1; padding:0.1rem 0.2rem 0.1rem 0.4rem; margin-left:-0.3rem; border-radius:0.24rem;}

</style>
