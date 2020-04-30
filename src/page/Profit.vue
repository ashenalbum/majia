<template>
    <div id="app">
        <!-- 头部菜单 -->  
        <HeadNav></HeadNav>
        <!-- 收入支出记录 -->
        <div class="main">
            <div class="content">
                <div class="left_box">
                    <div class="title">当前资产(元)</div>
                    <p class="num">{{ZiJinData.point}}</p>
                </div>
                <div class="right_box">
                    <div class="title">冻结资金收益(元)</div>
                    <p class="num2">{{DongJieZiJinData.point}}</p>
                </div>
            </div>
            <router-link to="/wxCashOut">
                <div class="ti_weixin">
                    <p class="text fs_30">提现到微信钱包</p>
                    <van-icon name="arrow" />
                </div>
            </router-link>

             <div class="contanier">
                <van-tabs v-model="active" style="margin-top:0.2rem;padding-bottom:0.2rem;background:#fff" @click="onClick">
                    <van-tab title="冻结资金记录">
                        <ul class="list_box">
                            <li class="list" v-for="item in incomeData" :key="item.id"> 
                                <div class="left">
                                    <h3 class="list_name">{{item.msg}}</h3>
                                    <p class="time">￥{{item.price}}</p>
                                </div>
                                <div class="count">{{item.addtime}}</div>
                            </li>
                        </ul>
                        <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
                        <infinite-loading @infinite="infiniteHandler1" ref="infiniteLoading1">
                            <div slot="spinner" class="loading">Loading...</div>
                            <div slot="no-more" class="nomore">暂无更多数据...</div>
                            <div slot="no-results">暂无数据...</div>
                        </infinite-loading>
                    </van-tab>
                    <van-tab title="资金记录">
                        <ul class="list_box">
                            <li class="list" v-for="item in detailsData" :key="item.id"> 
                                <div class="left">
                                    <h3 class="list_name">{{item.operation_type_name}}</h3>
                                    <p class="time">{{item.addtime}}</p>
                                </div>
                                <div class="count1">{{item.point}} {{item.point_unit}}</div>
                            </li>
                        </ul>
                        <infinite-loading @infinite="infiniteHandler2" ref="infiniteLoading2">
                            <div slot="spinner" class="loading">Loading...</div>
                            <div slot="no-more" class="nomore">暂无更多数据...</div>
                            <div slot="no-results">暂无数据...</div>
                        </infinite-loading>
                    </van-tab>
                    <van-tab title="提现明细">
                        <ul class="list_box">
                            <li class="list" v-for="item in expenditureData" :key="item.id"> 
                                <div class="left">
                                    <h3 class="list_name">{{item.status}}</h3>
                                    <p class="time">{{item.addtime}}</p>
                                </div>
                                <div class="count2">{{item.point}} {{item.point_unit}}</div>
                            </li>
                        </ul>
                        <infinite-loading @infinite="infiniteHandler3" ref="infiniteLoading3">
                            <div slot="spinner" class="loading">Loading...</div>
                            <div slot="no-more" class="nomore">暂无更多数据...</div>
                            <div slot="no-results">暂无数据...</div>
                        </infinite-loading>
                    </van-tab>
                </van-tabs>
             </div>
        </div>
    </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import HeadNav from "../components/HeadNav"; //头部菜单
import {Toast} from "vant";
import axios from "../utils/axios";

export default {
    components: { HeadNav, InfiniteLoading },
    data() {
        return {
            DongJieZiJinData:{},

            active: 0,
             HeaderBool:false,
            detailsData: [],//资金记录
            incomeData: [],
            expenditureData: [],
            // 触底加载
            loading: false,
            loadingMore: false,//loading 加载更多
            isScroll: true,//是否可以滚动
            page: 1,
            pagesize:100,
            payText:"立即支付",
            bidden:"disabled",
            disBOOL:false,
            ZiJinData:[],
            PageNum:1,
        };
    },
    methods: {
        onClick(title,index){
            console.log(title,index);
            this.incomeData = [];
            this.detailsData = [];
            this.expenditureData = [];
            this.PageNum = 1; //初始化页数
            this.$refs.infiniteLoading1.$emit("$InfiniteLoading:reset"); //继续加载
            this.$refs.infiniteLoading2.$emit("$InfiniteLoading:reset"); //继续加载
            this.$refs.infiniteLoading3.$emit("$InfiniteLoading:reset"); //继续加载
        },
        infiniteHandler1() {
            axios({
                url: "/activity/Apiactivity/get_frozen",
                params: {
                    pagesize: 10,
                    page: this.PageNum,
                    point_type: "point",
                    select_type:0,
                    sort:"addtime",
                    sort_type:"desc"
                }
            }).then((data)=>{
                if (data.err != 0) {return;}
                this.$parent.loading = false;//停止加载
                this.incomeData = this.incomeData.concat(data.data);
                if (this.incomeData.length >= data.count) {
                    this.$refs.infiniteLoading1.$emit("$InfiniteLoading:complete");
                } else {
                    this.PageNum++;
                    this.$refs.infiniteLoading1.$emit("$InfiniteLoading:loaded");
                }
            })
        },
        infiniteHandler2() {
            axios({
                url: "/accounts/Apiaccounts/member_income_expenditure_list",
                params: {
                    pagesize: 10,
                    page: this.PageNum,
                    point_type: "money",
                    select_type:0,
                    sort:"addtime",
                    sort_type:"desc"
                }
            }).then((data)=>{
                for(var i=0;i<data.data.length;i++){
                    let date= new Date(data.data[i].addtime*1000);
                    data.data[i].addtime = date.toISOString().slice(0,10) + " " + date.toTimeString().slice(0,5);
                }
                this.$parent.loading = false;//停止加载
                this.detailsData = this.detailsData.concat(data.data);

                if (this.detailsData.length >= data.count) {
                    this.$refs.infiniteLoading2.$emit("$InfiniteLoading:complete");
                } else {
                    this.PageNum++;
                    this.$refs.infiniteLoading2.$emit("$InfiniteLoading:loaded");
                }
            })
        },
        infiniteHandler3() {
            axios({
                url: "/accounts/Apipoint/member_get_withdrawal_list",
                params: {
                    pagesize: 10,
                    page: this.PageNum,
                    type:0,
                    sort:"addtime",
                    sort_type:"desc"
                }
            }).then((data)=>{
                this.$parent.loading=false;//停止加载
                this.expenditureData = this.expenditureData.concat(data.data);
                if (this.expenditureData.length >= data.count_num) {
                    this.$refs.infiniteLoading3.$emit("$InfiniteLoading:complete");
                } else {
                    this.PageNum++;
                    this.$refs.infiniteLoading3.$emit("$InfiniteLoading:loaded");
                }
            })
        },
        Check_infor(){
            axios({
                url: "/activity/Apiactivity/is_perfect_info",
            }).then((data)=>{
                if(data.data.type!=0){
                    Toast('您没有完善过信息,请先完善信息');
                    setTimeout(()=>{
                        this.$router.push('./auth');
                    },800);
                }
            })
        }
    },
    created(){
        // this.Check_infor();
        // this.HeaderBool = this.$route.meta.showHeader;
    },
    mounted(){
        // 资金记录统计
        axios({
            url: "/accounts/Apipoint/member_point",
            params: {
                point_type: "point",
                select_type: 0,
                sort: "addtime",
                sort_type: "desc"
            }
        }).then((data)=>{
            this.DongJieZiJinData = data.data.frozen;
            this.ZiJinData = data.data.money;
        });
    }
}
</script>
<style scoped>
/* 头部 */
.van-nav-bar {
    background-color: #F4F6FA;
}
.van-nav-bar__title {
    color: #000;
    font-weight: bold;
    font-size:.34rem;
}  
.van-nav-bar .van-icon {
    color: #000;
}
body{
	padding-bottom:1rem;
}
#app{
    background-color: #f4f6fa;
}
.main{
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 1rem;

}
.content{
    width: 100%;
    margin: 0  auto;
    box-sizing:border-box;
    color: #333;
     display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:0.4rem;
    background: url('~@/assets/profit/yu_e_bg.png') no-repeat center center/cover;
}
.left_box{
    width: 70%;
    border-right: 1px solid #ddd;
}
.num{
    font-weight: bold;
        font-size: .6rem;
    color: #fff;
}
.num2{
    font-size: 0.6rem;
    color: #fff;
    box-sizing: border-box;
    font-weight: bold;
}
.right_box{
    width: 50%;
    box-sizing: border-box;
    font-size: 0.26rem;
    text-align: center;
}

/* 标签栏 */
.title{
    margin: 0  auto;
    box-sizing:border-box;
    color:#fff;
    font-size: 0.26rem;
    height: 0.6rem;
    line-height: 0.6rem;
}
.van-tab span{
    font-size: .3rem;
    color: #141418;
    font-weight: 400;
}
.van-tabs__line{
    width: .8rem;
    height: .06rem;
    color: #529DF7;
    z-index: 9999;
}
/* 列表 */
.list_box{
    width: 100%;
    padding: .3rem .24rem;
    box-sizing:border-box;
}
.list_box .list{
    width: 100%;
    display: flex;
     flex-direction: row;
  justify-content: space-between;
    margin-bottom: .5rem;
}
.van-nav-bar[data-v-135cd7af] {
    z-index: 1111 !important;
}
.list_box .list .left{
    width: 60%;
}
 .list_name{
    font-size: .24rem;
    color: #141418;
    line-height: 0.4rem;
    font-weight:400;
}
.list_box .list .left .time{
    font-size: .28rem;
    color: red;
    margin: 0.2rem 0;
} 
.list_box .list .count{
    width: 35%;
    font-size: .22rem;
    color: #141418;
} 
.list_box .list .count1{
    width: 15%;
    font-size: .22rem;
    color: #141418;
} 
.list_box .list .count2{
    width: 15%;
    font-size: .22rem;
    color: #141418;
} 
/* 下面列表 */
.ti_weixin,.ti_card{
    width: 100%;
    height: .9rem;
    background: #fff;
    padding: 0 .24rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .22rem;
    color: #141418;
    margin-top: .16rem;
}
.list_bottom{
    width: 100%;
    margin-top: .32rem;
}
.list_bottom .list{
    width: 100%;
    height: .9rem;
    background: #fff;
    padding: 0 .24rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .22rem;
    color: #141418;
    border-bottom: .01rem solid #F4F6FA;
    box-sizing: border-box;
}
.list_bottom .list:last-child{
    border: none;
}
/* loading加载 */
.nomore {
  font-size: 0.22rem;
  color: #b6bac0;
}
.loading {
  width: 100px;
  margin: 0 auto;
  height: 100px;
  text-align: center;
  position: relative;
}
.loading::before,
.loading::after {
  content: "";
  /*这里要加一个content,不然什么都没有*/
  position: absolute;
  width: 0;
  height: 0;
  background: #000;
  border-radius: 50%;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation: toBig 1s linear infinite;
}
.loading::after {
  animation-delay: 0.5s;
  /*background-color: red;*/
}
@keyframes toBig {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 50px;
    height: 50px;
    opacity: 0;
  }
}
</style>


