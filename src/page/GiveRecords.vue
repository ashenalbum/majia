<template>
  <div id="app">
    <!-- 返回 -->
    <!-- 头部菜单 -->
    <HeadNav></HeadNav>
    <!-- 赠送记录 -->
    <div class="tab_box">
      <ul class="tab-tilte">
        <li @click="cur=0" :class="{active:cur==0}">可赠送</li>
        <li @click="cur=1" :class="{active:cur==1}">已收到</li>
        <li @click="cur=2" :class="{active:cur==2}">兑换码</li>
      </ul>
      <div class="tab-content">
        <div class="content content1" v-show="cur==0">
          <img class="noCoupon_bg" v-if="presence" src="../assets/other/nocoupon.png" alt />
          <p class="tishi" v-if="presence">暂无记录</p>
          <div class="list" @click="showPopup(item1.give_key)" v-for="(item1,id) in giveList" :key="id">
            <div class="img_box">
              <img :src="item1.give_info.thumb" alt />
            </div>
            <div class="right">
              <h3 class="title hidden1">{{item1.give_info.title}}</h3>
              <p class="price">
                <span>￥</span>
                {{item1.give_info.price}}
              </p>
              <p class="duihuanma">到期时间:{{item1.overtime}}</p>
              <div class="people">
                <div class="touxiang_box" v-for="(item,index) in item1.use_userInfo" :key="index">
                 <img :src="item.headpath" alt />
                </div>
              </div>
            </div>
          </div>
          <van-popup v-model="showPop">
            <div class="list_box">
              <h3 class="title">兑换码：</h3>
              <p class="code_box" v-for="(item,index) in exCodeData" :key="index">
                <span class="NetbarNumber">{{item.destructionkey}}</span>
                <button
                  ref="copy"
                  class="lr back-confirm btn give_btn"
                  :data-clipboard-text="item.destructionkey"
                  @click="copy"
                  v-if="item.issue == 0"
                  id="copy_text"
                >复制</button>
                <button
                  ref="copy"
                  class="lr back-confirm btn give_btn"
                  :data-clipboard-text="item.destructionkey"
                  id="copy_text"
                  v-else
                >已使用</button>
              </p>
            </div>
          </van-popup>
        </div>
        <div class="content content2" v-show="cur==1">
          <img class="noCoupon_bg" v-if="presence_" src="../assets/other/nocoupon.png" alt />
          <p class="tishi" v-if="presence_">暂无记录</p>
          <div
            class="list"
            v-for="(item,index) in getList"
            @click="Go_Page(item.give_info.id,item.give_info.model,item.give_info.type)"
            :key="index"
          >
            <div class="img_box">
              <img :src="item.give_info.thumb" alt="">
              <!-- <img src="../assets/ColumnDetails_class1.png" alt /> -->
            </div>
            <div class="right">
              <h3 class="title hidden1">{{item.give_info.title}}</h3>
              <p class="price">
                <span>￥</span>
                {{item.give_info.price}}
              </p>
              <div class="people give_people">
                <p class="zengsongren hidden1">赠送人:{{item.give_userInfo.name}}</p>
              </div>
              <p class="duihuanma">兑换码：{{item.code}}</p>
              <p class="duihuanma">兑换时间：{{item.usetime}}</p>

            </div>
          </div>
        </div>
        <div class="content content3 c_33" v-show="cur==2">
          <img class="noCoupon_bg" v-if="nodata" src="../assets/other/nocoupon.png" alt />
          <p class="tishi" v-if="nodata">暂无记录</p>
          <div class="item df df-r shadow" v-for="(item,index) in dhmList" :key="index">
                <div class="itm-cont f1 df df-c just-c-bet fs_30">
                  <div>{{item.destructionkey}}</div>
                  <div class="mt-10 fs_28">兑换码有效期：{{getLongTime(item.param)}}</div>
                  <div class="mt-10 fs_28" :class="{c_red1:item.issue==0,c_99:item.issue!=0}">{{item.issue==0?"未使用":"已使用"}}</div>
                </div>
                <div v-if="item.issue==0" class="btn-box df ai-c">
                    <button
                        ref="copy"
                        class="lr back-confirm btn give_btn"
                        :data-clipboard-text="item.destructionkey"
                        @click="copy"
                        id="copy_text"
                    >复制</button>
                </div>
                <div v-else-if="item.issue==1" class="namebox df df-c ai-c just-c-ct">
                    <img :src="item.headpath" class="icon" />
                    <div class="mt-10 one-hide fs_26">{{item.nickname}}</div>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
function add0(m) {
  return m < 10 ? "0" + m : m;
}
//时间戳转化成时间格式
function timeData(timestamp) {
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  var time = new Date(timestamp * 1000);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return (
    year +
    "-" +
    add0(month) +
    "-" +
    add0(date) +
    " " +
    add0(hours) +
    ":" +
    add0(minutes) +
    ":" +
    add0(seconds)
  );
}
import HeadNav from "../components/HeadNav"; //头部菜单
import axios from "../utils/axios";
import Clipboard from "clipboard";
import { Toast } from "vant";

export default {
  data() {
    return {
      active: 0,
      activeName: "a",
      presence: false,
      presence_: false,
      nodata: false,
      cur: 0, //默认选中第一个tab
      show: false,
      showPop: false,
      HeaderBool: false,
      giveList: [],
      getList: [],

      dhmList: [],

      // 触底加载
      loading: false,
      loadingMore: false, //loading 加载更多
      isScroll: true, //是否可以滚动
      page: 1,
      pagesize: 10,
      exCodeData: [],
      copyBtn: ""
    };
  },
  components: {
    HeadNav
  },
  methods: {
      getLongTime(item){
          if(!item){return "";}
          let dw = "";
          switch(item.interval_unit){
              case "year":dw="年";break;
              case "month":dw="月";break;
              case "day":dw="日";break;
          }
          return item.interval + dw;
      },
    onClickLeft() {
      history.go(-1);
    },
    onClickRight() {
      console.log("按钮");
    },
    showPopup(code) {
      this.showPop = true;
      this.exCodeData = code;
    },
    //已收到跳页面
    Go_Page() {
        this.$router.push({ path: "./member" });
    },
    copy() {
    //   var _this = this;
      var clipboard = new Clipboard("#copy_text");
      clipboard.on("success", () => {
        Toast("已复制");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        Toast("不支持复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    // 翻页，触底加载更多
    scrollMoreData() {
      const scrollTopHeight =
        document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
      const clientHeight =
        document.documentElement.clientHeight || window.screen.availHeight; //屏幕可用工作区高度
      const offsetHeight =
        document.body.offsetHeight || document.documentElement.offsetHeight; //网页可见区域高(包括边线的宽)
      // console.log(scrollTopHeight, clientHeight, scrollTopHeight + clientHeight + 50, offsetHeight)
      if (
        scrollTopHeight + clientHeight + 50 >= offsetHeight &&
        this.isScroll
      ) {
        // 显示加载符
        this.bus.$emit("bLoading", true);
        this.isScroll = false;
        this.loadingMore = true;
        let pageNo = (this.page += 1);
        // 请求第二页
        var that = this;
        // 已赠送触底加载
        axios({
            url: "/giving/Apigiving/member_get_give",
            params: {
                page: pageNo,
                pagesize: this.pagesize
            }
        }).then((d)=>{
            // console.log(d)
            that.bus.$emit("bLoading", false);
                for(var i=0;i<d.data.length;i++){
                d.data[i].overtime= timeData(d.data[i].overtime)
            }
            that.loadingMore = false;
            if (d.data.length > 0) {
                that.isScroll = true;
                that.giveList = [...that.giveList, ...d.data];
            } else {
                that.show = true;
            }
        })
        // 已收到触底加载
        axios({
            url: "/giving/Apigiving/member_get_receive",
            params: {
                page: pageNo,
                pagesize: this.pagesize
            }
        }).then((d)=>{
            that.bus.$emit("bLoading", false);
            that.loadingMore = false;
            if (d.data.length > 0) {
                that.isScroll = true;
                that.getList = [...that.getList, ...d.data];
            } else {
                that.show = true;
            }
        })
        // 兑换码
        axios({
            url: "/giving/Apigiving/get_exchange_code",
            params: {
                page: pageNo,
                pagesize: this.pagesize
            }
        }).then((d)=>{
            that.bus.$emit("bLoading", false);
            that.loadingMore = false;
            if (d.data.length > 0) {
                that.isScroll = true;
                that.dhmList = [...that.dhmList, ...d.data];
            } else {
                that.show = true;
            }
        })
      }
    }
  },
  created: function() {
    // this.$emit("footer", false);
    // this.HeaderBool = this.$route.meta.showHeader;
    // 已赠送
    var that = this;
    axios({
        url: "/giving/Apigiving/member_get_give",
    }).then((d)=>{
        for(var i=0;i<d.data.length;i++){
            d.data[i].overtime= timeData(d.data[i].overtime)
        }
        that.giveList = d.data;
        that.presence = that.giveList.length == 0;
    })
    // 已收到
    axios({
        url: "/giving/Apigiving/member_get_receive",
    }).then((d)=>{
        for (var i = 0; i < d.data.length; i++) {
            d.data[i].usetime = timeData(d.data[i].usetime);
        }
        that.getList = d.data;
        that.presence_ = that.getList.length == 0;
    })
    // 兑换码
    axios({
        url: "/giving/Apigiving/get_exchange_code",
        params: { page:1, pagesize: this.pagesize }
    }).then((d)=>{        
        for(var i=0;i<d.data.length;i++){
            d.data[i].addtime= timeData(d.data[i].addtime)
        }
        that.dhmList = d.data;
        that.nodata = that.dhmList.length == 0;
    })
  },
  mounted: function() {
    document.addEventListener("scroll", this.scrollMoreData, false);
  }
};
</script>
<style scoped>
.item{border-radius:0.1rem; margin-bottom:0.2rem;}
.item .itm-cont{padding:0.2rem;}
.item .btn-box{padding:0 8px;}
.item .namebox{max-width:2.6rem;padding-right:0.2rem;}
.item .namebox .icon{width:0.5rem; height:0.5rem; border-radius:50%;}
body {
  background: #f4f6fa;
  /* padding: .88rem 0 1rem; */
}
#app {
  background: #fff;
  /* padding: .88rem 0 0; */
}
/* 头部 */
.van-nav-bar {
  background-color: #f4f6fa;
}
.van-nav-bar__title {
  color: #000;
  font-weight: bold;
  font-size: 0.34rem;
}
.van-nav-bar .van-icon {
  color: #000;
}
/* 标签栏 */
.tab_box {
  width: 100%;
  padding-top: 1rem;
}
.tab-tilte {
    display:flex;
    flex-direction: row;
  width: 100%;
  height: 1rem;
  border-bottom: 0.02rem solid #e7eaf0;
}
.tab-tilte li {
    flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  font-weight: 400;
}
.tab-tilte .active {
  border-bottom: 0.06rem solid #3189f6;
  color: #3189f6;
  box-sizing: border-box;
}
/* 已赠送 */
.tab-content {
  width: 100%;
  padding: 0.32rem 0.24rem;
  box-sizing: border-box;
}
.tab-content .content {
  width: 100%;
}
.tab-content .content .list {
  width: 100%;
  /* height: 1.9rem; */
  display: flex;
  margin-bottom: 0.3rem;
}
.tab-content .content .list .img_box {
  width: 2.5rem;
  /* height: 1.8rem; */
  border-radius: 0.1rem;
  overflow: hidden;
}
.tab-content .content .list .img_box img {
  width: 100%;
  height: 2rem;
}
.tab-content .content .right {
  margin-left: 0.16rem;
  width: 4.2rem;
  padding: 0.08rem 0;
  /* position: relative; */
  box-sizing: border-box;
}
.tab-content .content .right .title {
  color: #141418;
  font-size: 0.28rem;
  font-weight: 400;
  line-height: 0.32rem;
  /* position: absolute;
  top: 5%; */
}
.tab-content .content .right .price {
  color: #fa7d00;
  font-size: 0.28rem;
  font-weight: 400;
  /* position: absolute;
  top: 40%; */
      margin: .2rem 0;
}
.tab-content .content .right .price span {
  margin-right: 0.1rem;
}
.tab-content .content .right .people {
  height: 0.4rem;
  overflow: hidden;
  margin-top: 0.1rem;
}
.tab-content .content .right .people .touxiang_box {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.tab-content .content .right .people .touxiang_box ~ .touxiang_box {
  margin-left: -0.14rem;
}
.tab-content .content .right .people .touxiang_box img {
  width: 100%;
  height: 100%;
}
/* 已收到 */
.tab-content .content .right .give_people {
  display: flex;
  /* margin-top:.4rem;  */
  font-weight: 400;
}
.tab-content .content .right .give_people .zengsongren,
.duihuanma {
  font-size: 0.22rem;
  line-height: 0.24rem;
  color: #141418;
  /* width: 50%; */
  padding: 0 0.1rem;
  box-sizing: border-box;
}
.duihuanma {
  color: #97979f;
 
  /* text-align: right; */
}
/* 点击赠送列表 */
.van-popup--center {
  width: 6.6rem;
  /* height:5.73rem; */
  border-radius: 0.1rem;
  background: #fff;
}
.list_box {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0.32rem 0.1rem;
  box-sizing: border-box;
  overflow: auto;
}
.list_box .title {
  font-size: 0.4rem;
  color: #141418;
  width: 100%;
  text-align: center;
}
.list_box .center_list {
  overflow: hidden;
}
.list_box .give_list {
  width: 1.1rem;
  height: 1.55rem;
  margin: 0.48rem 0.51rem;
  float: left;
}
.list_box .give_list .img_box {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  overflow: hidden;
}
.list_box .give_list .img_box img {
  width: 100%;
}
.list_box .give_list .name {
  width: 100%;
  text-align: center;
  font-size: 0.22rem;
  color: #141418;
  margin-top: 0.22rem;
}
.list_box .add {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 0.024rem dashed #97979f;
  box-sizing: border-box;
  color: #97979f;
  font-size: 0.66rem;
  float: left;
  margin: 0 0.51rem 0.48rem;
  text-align: center;
  line-height: 1.2rem;
}
.code_box {
  display: flex;
  margin: 0.3rem auto;
  justify-content: space-around;
  align-items: center;
}
.give_btn {
  width: 1.6rem;
  height: 0.5rem;
  display: block;
  background: linear-gradient(
    0deg,
    rgba(254, 157, 31, 1),
    rgba(254, 134, 23, 1)
  );
  border-radius: 0.35rem;
  font-size: 0.3rem;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
  display: block;
}
.code_box .code {
  display: block;
}
.noCoupon_bg {
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.tishi {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 25%;
}
</style>


