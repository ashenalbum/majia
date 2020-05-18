<template>
    <div class="cont">
        <div class="topimg"></div>
        <div class="item">
            <div class="ware df df-r" @click="toEventDetail">
                <img :src="data.head_pic" class="img shadow" />
                <div class="detail df df-c just-c-bet">
                    <div>
                        <div class="two-hide fs_32">{{data.title}}</div>
                    </div>
                    <div class="mt-10">
                        <div v-if="data.start_time&&data.abort_time" class="one-hide c_ashen fs_24">{{getTime()}}</div>
                        <div class="mt-10 fs_28 c_red1">￥{{data.price}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-30 box">
            <van-button v-if="yq" round block color="linear-gradient(to bottom, #2E8AF7, #6DB0FF)" >帮他助推一下</van-button>
            <van-button v-else round block color="linear-gradient(to bottom, #2E8AF7, #6DB0FF)" >邀请好友帮忙助推</van-button>
        </div>
        <div v-if="!yq" class="mt-50 box df df-r ai-c c_o">
            <div>助力值：</div>
            <div class="slider-box f1 fs_26">
                <!-- <van-slider v-model="value" :max="999" active-color="#FF9C00" inactive-color="#FFDDA7" bar-height="6px" button-size="18" >                    
                    <template #button>
                        <div class="custom-button shadow">
                            <div class="num">{{value}}</div>
                        </div>
                    </template>
                </van-slider> -->
                <div class="slider">
                    <div class="active-color" :style="{width:sldLeft(data.heating_power||0)}"></div>
                    <div class="custom-button custom-button-1 c1 shadow" :style="{left:sldLeft(min_num1)}">
                        <div class="alert fs_22">{{min_num1}}</div>
                    </div>
                    <div class="custom-button custom-button-1 c2 shadow" :style="{left:sldLeft(min_num2)}">
                        <div class="alert fs_22">{{min_num2}}</div>
                    </div>
                    <div class="custom-button custom-button-1 c3 shadow" :style="{left:sldLeft(min_num3)}">
                        <div class="alert fs_22">{{min_num3}}</div>
                    </div>
                    <div class="custom-button custom-button-2 shadow" :style="{left:sldLeft(data.heating_power||0)}">
                        <div class="num fs_22">{{data.heating_power}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tuli df df-r just-c-aro mt-50 fs_28">
            <div class="df df-r ai-c"><div class="fk c1 shadow"></div><span>推荐</span></div>
            <div class="df df-r ai-c"><div class="fk c2 shadow"></div><span>热点</span></div>
            <div class="df df-r ai-c"><div class="fk c3 shadow"></div><span>头条</span></div>
        </div>
        <div class="box list c_33">
            <div class="title fs_30 df just-c-ct">好友助推榜</div>
            <ul class="ul mt-40">
                <li v-for="(item,index) in [1]" :key="index" class="df df-r ai-c">
                    <img src="~@/assets/test.png" alt="" class="icon" />
                    <div class="f1 df df-c">
                        <span class="fs_28 lh-1">昵称昵称昵称</span>
                        <span class="fs_28 c_ashen mt-10 lh-1">05/10 23:23:00</span>
                    </div>
                    <div class="c_o fs_30">+90</div>
                </li>
            </ul>
        </div>
        <div class="box mt-30 more c_33">
            <div class="title fs_30 df just-c-ct">更多推荐</div>
            <ul class="ul mt-30 fs_28 c_33 df df-r just-c-bet df-w-w">
                <li class="df df-c">
                    <img src="~@/assets/test.png" class="img" />
                    <div class="mt-10 one-hide">限时秒杀 前100名限时秒杀 前100名限时秒杀 前100名</div>
                    <div class="jg c_red1">￥99</div>
                </li>
            </ul>
        </div>
        <van-overlay :show="showMask" @click="showMask=false" class="df ai-c just-c-ct">
            <div class="mask" @click.stop>            
                <div class="title fs_30 df just-c-ct">更多推荐</div>
                <div class="tj-box fs_26">
                    <div class="tj df df-r mt-30">
                        <img src="~@/assets/test.png" class="img" />
                        <div class="f1 df df-c">
                            <div class="one-hide">限时秒杀 前100名限时秒杀 前100名限时秒杀 前100名</div>
                            <div class="mt-10 f1 c_ashen fs_20">2020/05/15-2020/05/21</div>
                            <div class="df df-r ai-c just-c-bet">
                                <span class="c_red1 c_22">￥99</span>
                                <van-button size="mini" type="info" class="btn">立即购买</van-button>
                            </div>
                        </div>
                    </div>
                    <div class="tj df df-r mt-30">
                        <img src="~@/assets/test.png" class="img" />
                        <div class="f1 df df-c">
                            <div class="one-hide">限时秒杀 前100名限时秒杀 前100名限时秒杀 前100名</div>
                            <div class="mt-10 f1 c_ashen fs_20">2020/05/15-2020/05/21</div>
                            <div class="df df-r ai-c just-c-bet">
                                <span class="c_red1 c_22">￥99</span>
                                <van-button size="mini" type="info" class="btn">立即购买</van-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="df df-r just-c-ct c_99 fs_24 mt-30" @click="toIndex">查看更多</div>
            </div>
        </van-overlay>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            id: null,
            yq: true,

            min_num1: 0,
            min_num2: 0,
            min_num3: 0,

            data: {},
            value: 0,
            showMask: false,
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.yq = Boolean(this.$route.query.yq);
        this.getData();
    },
    methods: {
        getData(){
            axios({
                url: "/activity/Apiactivity/Help_information",
                params: {actiyity_id:this.id},
            }).then((data)=>{
                if(data.err!=0){return}
                alert(JSON.stringify(data))
                this.min_num1 = data.data.min_display_power;
                this.min_num2 = data.data.min_hotspot_power;
                this.min_num3 = data.data.min_top_power;
                this.data = data.data && data.data.info;
            });
        },
        toEventDetail(){
            this.$router.push({path:"/pay_detail", query:{id:this.id}});
        },
        toIndex(){
            this.$router.push({path:"/index"});
        },
        getTime(){
            let st = new Date(this.data.start_time*1000);
            let et = new Date(this.data.abort_time*1000);
            return st.toLocaleDateString()+" - "+et.toLocaleDateString();
        },
        sldLeft(n){
            if(!n){return 0;}
            n = Number(n);
            return 100*n/(n+400) + "%";
        }
    },
    components: {PageMenu},
}
</script>
<style scoped>
.c1{background:#2bdd23;}
.c2{background:#ff9600;}
.c3{background:#F32323;}

.topimg{width:100%; height:2.8rem; background:url(~@/assets/other/tg.png) no-repeat; background-size:100% 100%;}
.item{width:6.7rem; margin:0 auto; padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.item .icon{width:0.5rem; height:0.5rem; border-radius:50%;}
.item .name{padding-left:0.2rem;}
.item .ware{padding:0.2rem 0;}
.item .ware .img{width:1.98rem; height:1.78rem;}
.item .ware .detail{margin-left:0.2rem; flex:1;}
.item .ware .labels>*{margin-right:0.1rem; padding:2px 0.1rem; line-height:1; border-radius:0.1rem; background:#F4F5F9;}

.box{width:6.7rem; margin-left:auto; margin-right:auto;}
.slider-box{padding:0 14px; }
.slider-box .slider{position:relative; width:100%; height:6px; border-radius:3px; background:#FFDDA7;}
.slider-box .slider .active-color{position:absolute; width:10%; left:0; top:0; bottom:0; background:#FF9C00; border-radius:3px;}
.slider-box .custom-button{position:absolute; top:-6px; width:10px; height:10px; border-radius:50%; }
.slider-box .custom-button-1{ border:4px solid #ffffff; margin-left:-9px;}
.slider-box .custom-button-2{width:18px; height:18px; background:#ffffff; margin-left:-9px;}
.slider-box .custom-button .num{position:absolute; top:100%; left:50%; margin-top:5px; transform: translateX(-50%); white-space:nowrap;}
.slider-box .custom-button .alert{position:absolute; bottom:100%; left:50%; margin-bottom:5px; transform: translateX(-50%); white-space:nowrap;}

.tuli{width:5rem; margin-left:auto; margin-right:auto;}
.tuli .fk{width:10px; height:10px; border:2px solid #ffffff; border-radius:50%; margin-right:6px;}

.list,
.more{margin:0.8rem auto 0.4rem; box-sizing:border-box; border:1px dashed #CFD4E5; padding:0.3rem 0.2rem;}
.list .title,
.more .title{background:url(~@/assets/other/zhutui-title.png) no-repeat center center; background-size:100% auto;}
.list .icon{width:0.72rem; height:0.72rem; margin-right:0.1rem; border-radius:50%;}
.list .ul li{margin-bottom:0.3rem;}
.list .ul li:last-child{margin-bottom:0;}

.more{margin-top:0;}
.more .ul{padding:0 0.1rem;}
.more .ul li{width:2.8rem; margin-bottom:0.2rem;}
.more .ul li .img{height:1.5rem;}
.more .ul li .jg{padding-top:2px;}

.mask{box-sizing:border-box; width:6.7rem; padding:0.3rem 0.2rem; border-radius:0.1rem; background:#ffffff;}
.mask .title{background:url(~@/assets/other/zhutui-title.png) no-repeat center center; background-size:100% auto;}
.tj img{width:2.3rem; height:1.24rem; margin-right:0.2rem;}
.tj .btn{background:#FF9C00; padding:0 5px; outline:none; border:none; }
</style>
