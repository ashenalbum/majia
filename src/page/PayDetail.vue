<template>
    <div class="cont" @mousedown="showKefu=false">
        <div class="top">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in [1,1,1]" :key="index">
                    <img src="~@/assets/test.png" class="img" />
                </van-swipe-item>
            </van-swipe>
            <div class="see c_ashen fs_28">267人浏览</div>
            <div v-if="dmList.length" class="box">
                <div v-for="(item,index) in dmList" :key="index" class="dm df df-r ai-c" :class="{dmmove:item.move}" :style="{top:item.top}">
                    <div class="txt c_66 fs_20 van-ellipsis">{{item.txt}}</div>
                    <img :src="item.src" class="img" />
                </div>
            </div>
        </div>
        <div class="bg_ff">
            <div class="details">
                <div class="c_33 fs_32 van-ellipsis">一叶子面膜组合套装  限时抢购一叶子面膜组合套装  限时抢购</div>
                <div class="mt-20 c_ashen fs_26 van-ellipsis">美白补水 有效护肤 唤醒肌肤活力，让你永葆青春让你永葆青春让你永葆青春</div>
                <div class="mt-30 c_o fs_28">
                    <span class="label">组合套装</span>
                </div>
                <div class="mt-36 df df-r ai-e just-c-bet">
                    <div class="df df-r ai-e">
                        <span class="c_red1 fs_30">￥99.8</span>
                        <span class="yuanjia fs_26 c_ashen txt-line-t">￥159</span>
                    </div>
                    <span class="fs_28 c_ashen">销量 123</span>
                </div>
            </div>
            <div class="seller shadow df df-r ai-c just-c-bet" @click="showSeller=true">
                <div class="df df-r ai-c">
                    <img src="~@/assets/test.png" class="icon" />
                    <span class="name c_33 fs_30 van-ellipsis">阿斯顿发送到发送到发送到发的</span>
                </div>
                <van-button size="mini" color="#FF9C00">关注</van-button>
            </div>
            <div class="words mt-40">
                <div class="title df ai-c just-c-ct">
                    <div class="line"></div>
                    <span class="txt fs_26">产品详情</span>
                </div>
                <div class="box">
                    <div class="txt t-indent c_ashen">一叶子面膜组合套装，口碑品牌，致力于打造天然美肌产品一叶子面膜组合套装，口碑品牌，致力于打造天然美肌产品一叶子面膜组合套装，口碑品牌，致力于打造天然美肌产品一叶子面膜组合套装，口碑品牌，致力于打造天然美肌产品一叶子面膜组合套装，口碑品牌，致力于打造天然美肌产品</div>
                    <img class="img" src="~@/assets/test.png" />
                    <img class="img" src="~@/assets/test.png" />
                </div>
            </div>
        </div>
        <div class="help fs_22 c_88">
            <div class="fs_30">购买须知：</div>
            <div class="t-indent">1.购买后关注“吗夹”公众号，可在菜单【会员中心】处找到已购买的活动信息或者发布最新活动。</div>
            <div class="t-indent">2.活动付费后，原则上不予退款，请谨慎决定。如入住商承诺退款，请购买后联系商家客服协商处理。如有其它争议，请联系平台客服！</div>
        </div>
        <div class="bottom-btns df df-r fs_34 shadow">
            <div class="btn1 f1 df df-c ai-c just-c-ct">制作新活动</div>
            <div class="btn2 f1 df df-c ai-c just-c-ct" @click="showGuige=true">
                <span>立即购买</span>
                <span class="fs_26">剩余 60：24：12</span>
            </div>
            <!-- <div class="made df df-r ai-c just-c-ct c_ff fs_34" @click="make">
                <van-icon name="edit" size="0.45rem" />
                <span class="pl-20"> 立即制作</span>
            </div> -->
        </div>
        <!-- 广告 -->
        <div v-if="showAd" class="ad df df-r shadow">
            <img src="~@/assets/test.png" class="img" />
            <div class="txt f1 df df-c just-c-bet">
                <div class="title fs_26 c_33 van-multi-ellipsis--l2">张爱玲的书集十册  限时抢购</div>
                <div class="df df-r ai-e just-c-bet">
                    <div class="df df-r ai-e just-c-bet">
                        <span class="c_red1 fs_32">￥39</span>
                        <span class="pl-20 fs_24 c_ashen txt-line-t">￥98</span>
                    </div>
                    <span class="fs_26 c_ashen">1234人参与</span>
                </div>
            </div>
            <van-icon @click.stop="showAd=false" name="clear" size="0.5rem" color="#D1D6E5" class="close"/>
        </div>
        <!-- 客服 -->
        <div class="fixed-btn df df-r ai-c" @mousedown.stop>
            <transition name="van-slide-right">
                <div v-show="showKefu" class="txt shadow c_ashen fs_26">
                    <div class="line df df-r ai-c">
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
        <!-- 商家详情 -->
        <van-overlay :show="showSeller" @click="showSeller=false">
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
        </van-overlay>
        <!-- 选择规格 -->
        <van-popup v-model="showGuige" round position="bottom" closeable>
            <div class="guige">
                <div class="df df-r ai-c">
                    <img src="~@/assets/test.png" class="img" />
                    <div class="txt df df-c" >
                        <span class="c_red1 fs_30 b">￥98</span>
                        <span class="fs_24 c_ashen mt-20">库存45件</span>
                    </div>
                </div>
                <div class="item mt-20">
                    <div class="fs_30 c_33">选择规格</div>
                    <div>
                        <span class="label fs_28 active">组合套装</span>
                        <span class="label fs_28">组合套装</span>
                        <span class="label fs_28">组合套装</span>
                        <span class="label fs_28">组合套装</span>
                        <span class="label fs_28">组合套装</span>
                        <span class="label fs_28">组合套装</span>
                    </div>
                </div>
                <div class="item mt-20 df df-r ai-c just-c-bet">
                    <div class="fs_30 c_33">购买数量</div>
                    <van-stepper />
                </div>
                <div class="mt-20 df df-c ai-c">
                    <van-button round type="info" size="small" class="next-btn" @click="showGuige=false;showUserInfo=true">下一步</van-button>
                </div>
            </div>
        </van-popup>
        <!-- 填写个人信息 -->
        <van-popup v-model="showUserInfo" round position="bottom" closeable>
            <div class="user-info">
                <div class="fs_30 c_33">选择规格</div>
                <div class="mt-30">
                    <van-field label="用户名" input-align="right" placeholder="请输入用户名" class="input" />
                    <van-field label="手机号" type="number" input-align="right" placeholder="请输入手机好" class="input" />
                    <van-field label="详细地址" input-align="right" placeholder="请输入详细地址" class="input" />
                </div>
                <div class="mt-30 df df-c ai-c">
                    <van-button type="info" size="small" class="next-btn" @click="showUserInfo=false">立即购买</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Clipboard from 'clipboard';
import {Toast} from 'vant';

export default {
    data(){
        return {
            dmList: [
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"阿萨德弗兰克建安费", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"娓娓而谈沃尔特", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"第三方的发给你的规范", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"给比特日本而儿童你的规范", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"1111", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"22222", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"333333", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"44444", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"555555", move:false, top:0},
                {src:"https://www.baidu.com/img/bd_logo1.png", txt:"666666", move:false, top:0},
            ],

            showKefu: false, // 显示客服
            showAd: true, // 显示广告
            showSeller: false, // 商家联系方式
            showGuige: false, // 选择规格
            showUserInfo: false, // 个人信息
        }
    },
    methods: {
        make(){
            this.$router.push("/event_form");
        }
    },
    mounted(){
        let clipboard = new Clipboard(this.$refs.copywx);
        clipboard.on('success', ()=>{Toast("复制成功");});
        clipboard.on('error', ()=>{Toast("复制失败");});
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
        },1600);
    },
    computed: {
        dmTop(){ return Math.random()*4 + 0.1 + "rem"; }
    }
}
</script>
<style scoped>
.cont{background:#F1EFF2; padding-bottom:1.6rem;}
.top{position:relative; width:100%; height:4.6rem;}
.my-swipe .van-swipe-item{width:100%; height:4.6rem;}
.my-swipe .van-swipe-item .img{width:100%; height:100%;}
.top .see{position:absolute; bottom:0; right:0; padding:0.1rem 0.22rem; background:rgba(0,0,0,0.55);}
.top .box{position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden;}
.top .box .dm{position:absolute; max-width:7rem; left:100%; height:0.44rem;}
.top .box .dm .txt{padding:0.09rem 0.16rem 0.09rem 0.52rem; line-height:1; background:rgba(255,255,255,0.5); border-radius:0.2rem; white-space:nowrap;}
.top .box .dm .img{position: absolute; width:0.44rem; height:0.44rem; border-radius:50%; left:0; top:0;}
.top .box .dm.dmmove{transition:left 10s linear; left:-7rem;}

.bg_ff{background: #ffffff;}
.details{padding:0.4rem 0.45rem; background:#ffffff;}
.details .label{display:inline-block; line-height:0.4rem; padding:0 0.18rem; }
.details .yuanjia{padding-left:0.2rem;}

.seller{width:7rem; box-sizing:border-box; margin:0 auto; padding:0 0.32rem; height:1.28rem; border-radius:0.1rem;}
.seller .icon{width:0.8rem; height:0.8rem; border-radius:50%;}
.seller .name{padding-left:0.2rem;}

.words .title{position:relative; width:3.8rem; margin:0 auto;}
.words .title .line{position:absolute; left:0; right:0; top:50%; border-bottom:1px solid #E3E3E3;}
.words .title .txt{position:relative; padding:0 0.5rem; color:#BBC1D4; background:#ffffff;}
.words .box .txt{padding:0.36rem 0.4rem; line-height:2;}
.words .box .img{display:block; width:100%; height:auto;}

.help{width:6.4rem; margin:auto; padding:0.3rem 0 0.6rem; line-height:1.6;}

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

.fixed-submit{bottom: 3.6rem;}

.fixed-btn{position:fixed; right:0.5rem; top:50%; min-height:1.22rem;}
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
</style>
