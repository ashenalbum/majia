<template>
    <div id="app">
        <div class="main">
            <div class="my_info_box">
                <div class="top df df-r ai-c">
                    <div class="tou_box">
                        <img :src="memberInfoData.headpath" alt="">
                    </div>
                    <div class="center df df-c just-c-bet" >
                        <div class="fs_32 c_33 b">{{memberInfoData.nickname}}</div>
                        <div class="c_o fs_22 mt-20">
                            <div class="df df-r ai-c">
                                <van-icon size="0.22rem" name="star" />
                                <span>{{memberInfoData.group_name}} ({{group_id}})</span>
                            </div>
                            <div class="mt-10">{{memberInfoData.label}}</div>
                            <div class="mt-10">  {{this.End_time}}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom ai-c">
                    <div class="icon_box df df-r ai-c c_ff fs_30">
                        <img src="~@/assets/mycenter/huiyuan_bai.png" alt="">
                        <span>{{memberInfoData.group_name}}</span>
                    </div>
                    <router-link to="/member">
                        <div class="right c_ff fs_30 df df-r ai-c">
                            <span class="txt">升级会员</span>
                            <van-icon size="0.3rem" name="arrow" />
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 分类导航 -->
            <div class="center_nav">
                <div class="list" v-for="(item,index) in cate1" :key="index" @click="$router.push(item.url)">
                <div class="img_box"> <img :src="item.src" alt=""> </div>
                    <span class="text">{{item.title}}</span>
                </div>
            </div>
            <!-- 我的项目 -->
            <div class="my_xiangmu_box">
                <div class="my_xiangmu" v-for="(value,index) in cate2" :key="index">
                    <h3 class="title">{{value.title}}</h3>
                    <div class="list_box">
                        <div class="list" v-for="(item,index) in value.sub" :key="index" @click="$router.push(item.url)">
                            <div class="img_box">
                                <img :src="item.src" alt="">
                            </div>
                            <span class="text">{{item.title}}</span>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="gruop" v-if="inforBool">
                <div class="fs_36 c_99">还未完善资料...</div>
                <router-link to="/auth">
                    <van-button type="info" size="small">去完善资料</van-button>
                </router-link>
            </div>
        </div>
        
     

    </div>
</template>
<script>
import axios from '@/utils/axios';

export default {
    data() {
        return {
            cate1:[],
            cate2:[],
            HeaderBool:false,
            memberInfoData: {
                nickname: "--",
                group_name: "普通会员",
            },
            memberCateData: [],
            myProjectData: [],
            End_time: "",
            group_id: "",
            inforBool:false
        };
    },
    components: {
            // HeadNav
    },
    methods: {
        getInfor(){
            // 会员个人信息
            axios({
                url: '/member/Apimember/member_getInfo',
            }).then((data)=>{
                if(data.err!==0){return;}
                if(data.data.group_name == ''|| data.data.group_id == 1|| data.data.group_name == '普通会员'){data.data.group_name = "普通会员";}
                
                if(data.data.endtime){
                    let date= new Date(data.data.endtime*1000);
                    this.End_time = '会员到期日:' + date.toISOString().slice(0,10) + " " + date.toTimeString().slice(0,5);
                }else{
                    this.End_time = ""
                }
                this.group_id = data.data.id;
                this.memberInfoData = data.data;
                // this.bus.$emit('loading', false);
            })
        },
        getCate(){
            axios({
                url: '/member/Apimenu/member_navigation',
                params: { sign: "member_mid" }
            }).then((data)=>{
                if(data.err!=0){return}
                if(data.data.type==1){
                    this.inforBool = true;
                }else{
                    this.inforBool = false;
                    this.memberCateData = data.data;
                    console.log(this.memberCateData);
                    this.cate1 = this.memberCateData[0] && this.memberCateData[0].sub;
                    this.cate2 = this.memberCateData;
                }
            })
        }
    },
    created() {
        // this.$emit("footer", true);
        // this.HeaderBool = this.$route.meta.showHeader;
        this.getInfor();
        this.getCate();
    },
    mounted() {
        // this.getInfor();
        // this.getCate();
    }
}
</script>
<style scoped>
body{
	background: #F4F6FA;
}
#app{
    min-height: 100vh;
    background: #F4F6FA;
    box-sizing: border-box;
    padding-bottom: 1rem;
}
/* 我的个人信息 */
.my_info_box{width: 100%; height: 3.42rem; padding: .4rem .24rem .08rem; box-sizing: border-box; background:#fff url('~@/assets/mycenter/huiyuan_bg.png') no-repeat bottom center/102% 100%;overflow: hidden;}
.my_info_box .top{height:1.4rem;}
.my_info_box .top .tou_box{margin-right:0.2rem; width: 1.4rem; height: 1.4rem; background:rgba(254,254,254,1); border:3px solid #ffffff; box-shadow:0 0.08rem 0.1rem 0 rgba(46,115,255,0.3); border-radius:50%; overflow: hidden;}
.my_info_box .top .tou_box img{width: 100%; height: 100%;}

/* 会员 */
.my_info_box .bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.42rem;
    padding: 0.16rem 0.2rem;
    box-sizing: border-box;
}

.my_info_box .bottom .icon_box img{width: 0.4rem; margin-right: 0.1rem;}
.my_info_box .bottom .right .txt{line-height:1; padding-right:4px;}
/* 分类导航 */
.center_nav{
    width: 100%;
    height:2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    text-align: center;
}
.center_nav .list{
     text-align: center;
}
.center_nav .list .img_box{
    height: .5rem;
    margin-bottom: .2rem;
}
.center_nav .list .img_box img{
    height: 100%;
}
.center_nav .list .text{
    font-size: .22rem;
    color: #141418;    
}
/* 我的项目 */
.my_xiangmu_box{
     width: 100%;
    /* background: #fff; */
}
.my_xiangmu{
    width: 100%;
    background: #fff;
    margin-top: .16rem;
}
.my_xiangmu .title{
    width: 100%;
    height: .88rem;
    font-size: .22rem;
    color: #141418;
    padding-left: .38rem;
    line-height: .88rem;
    border-bottom: .02rem solid #E7EAF0;
    box-sizing: border-box;
}
.my_xiangmu .list_box{
    width: 100%;
    display: flex;
    flex-shrink: 1;
    flex-wrap: wrap;
    padding: 0 .5rem;
    box-sizing: border-box;
}
.my_xiangmu .list_box .list{
    width: 25%;
    height:1.6rem;
    padding:.32rem 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
}
.my_xiangmu .list_box .list .img_box{
    height: .45rem;
}
.my_xiangmu .list_box .list .img_box img{
    height: 100%;
}
.my_xiangmu .list_box .list .text{
    font-size: .22rem;
    color: #141418;    
}
.bottom_box{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top: 1.8rem;
}
.bangxun{
    color: #444;
    bottom: 1.4rem;
    font-size: .26rem;
}
#app>>>.van-notice-bar{
    background-color: transparent;
}
.gruop{width: 100%; height: 1rem; line-height: 1rem; font-size: 0.28rem; text-align:center; margin:0.2rem 0;}
</style>

