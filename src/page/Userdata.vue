<template>
  <div id="app" class="h-100vh">
      <HeadNav></HeadNav>
     <!-- 订单情况 -->
        <div class="main">
          <div class="search_box">
            <van-cell-group>
            <van-field
              v-model="keyword"
              center
              clearable
              class="search_txt"
              label=""
              placeholder="请输入订单号或商品名查询"
              use-button-slot
            >
              <van-button slot="button" style="background:red;color:#fff;border:none" size="small" type="primary" @click="Search()">搜索</van-button>
            </van-field>
          </van-cell-group>
          </div>
          
            <div class="order_box" v-for="item in OrderData" :key="item.id" @click.stop="Go_details(item.id)" >
              <div class="list_head df df-r ai-c just-c-bet">
                <p class="list_time">{{item.addtime}}</p>
                <!-- <span class="fs_26 c_red1">{{item.status}}</span> -->
              </div>
              <div class="list_main">
                <div class="list_left">
                  <img :src="item.pic" alt="">
                </div>
                <div class="list_right">
                    <div class="title_1">
                      <p class="l_title">
                        {{item.title}}
                      </p>
                    </div>
                    <div class="title_2">
                      <p class="l_title">
                        {{item.specinfo}}
                      </p>
                    </div>
                </div>
              </div>
              <div class="good_bom df df-r ai-c just-c-bet">
                <div class="c_33 fs_26">
                    <img :src="item.headpath" class="head-img" alt="">
                    <span>{{item.user_name}}</span>
                </div>
                <div v-if="item.pay_status==1">
                    <span  class='title_3_pay'>实付金额</span>
                    <span style="color: #151515;font-size:0.28rem">￥{{item.price}}</span>
                </div>
                <div v-else class="c_red1">未付款</div>
              </div>
               <!-- <div class="btn_box">
                  <van-button round type="default" class="btn_style_cc" size="small">普通按钮</van-button>
                  <van-button round type="default" class="btn_style_red" size="small">普通按钮</van-button>
                </div> -->
            </div>
            <div style="height:0.8rem;">
            </div>
            <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
          <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
            <div slot="spinner" class="loading">Loading...</div>
            <div slot="no-more" class="nomore">暂无更多数据...</div>
            <div slot="no-results">暂无数据...</div>
          </infinite-loading>
          <div class="list_bom df df-r ai-c just-c-aro">
             <van-button round type="info" class="btn_style_cc" size="small" @click="getMyExcelData">批量发货</van-button>
              <van-button round type="info" class="btn_style_cc" size="small" @click="pre_btn">导出订单</van-button>
          </div>
        </div>
        <!-- 导入物流弹出层 -->
     <van-popup v-model="LogisticsBool" style="width:90%;" closeable>
       <div class="log_box">
          <div class="log_title">
            导入快递
          </div>
          <div class="log_text">
            <div class="left_box">
                导入内容
            </div>
            <div class="right_box">
              <ul>
                <li>
                  <!-- <el-upload
                    action="#"
                    :http-request="UploadImage1"
                    >
                    <el-button size="mini" class="updata" >选择文件</el-button>
                  </el-upload> -->
                    <van-uploader :preview-image="false" accept=".csv" :before-read="UploadImage1">
                        <span class="fs_28 c_blue">上传文件</span>
                    </van-uploader>
                </li>
                <li>
                  <span class="log_bg">
                  仅支持csv格式
                  </span>
                  <span class="log_msg" @click="Down()">
                    点我下载示例
                  </span>
                </li>
                 <li>
                  <span class="log_bg">
                  点击右侧查看说明
                  </span>
                  <span class="log_msg" @click="Explain()">
                    点我查看导入说明
                  </span>
                </li>
                <li class="geshi">
                  格式为:姓名|手机号|快递公司|快递单号
                </li>
              </ul>
                
            </div>
          </div>
       </div>
     </van-popup>
          
  </div>
</template>
<script>
// import httpConfig from "@/config/httpConfig.js";
import axios from "../utils/axios";
import { Toast } from "vant";
import HeadNav from "../components/HeadNav"; //头部菜单
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "app",
  components: {
    HeadNav,
    InfiniteLoading
  },
  data() {
    return {
        Page_id:"",
        OrderData: [],
        multipleSelection: [],
        selectData:[],
        // 分页
        currentPage: 1, //初始页
        pagesize: 10, //    每页的数据
        total: 0, //总条数
        keyword:"",
        LogisticsBool:false,
        PageNum:1,
    };
  },
    created: function() {
        this.Page_id = this.$route.query.id;
        this.getData();
    },
    methods: {
        // 状态文字
        getType(s){
            return {0:"未确认", 1:"已确认", 2:"退款中", 3:"交易关闭", 4:"退货订单"}[s];
        },
        getData(){
            return;
            // axios({
            //     url: "/activity/Apiactivity/order_list",
            //     params: {
            //         activity_id:this.Page_id,
            //         page: this.currentPage,
            //         pageSize: this.pagesize,
            //     }
            // }).then((data)=>{
            //     if(data.err!=0){return}
            //     this.OrderData=data.data;
            //     this.total = data.count;
            // })
        },
        UploadImage1(file){
            const formData = new FormData();
            formData.append('file', file);
            this.$axios({
                method: "post",
                url: window.baseUrl + "/public/index.php" + "/activity/Apiactivity/order_up",
                data:formData,
                headers:{'Content-Type':'application/json'},
                params:this.ParamsData,
            }).then(res => {
                if(res.data.err==0){
                    Toast('导入成功');
                    this.LogisticsBool=false;
                }else{
                    Toast(res.data.content);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        infiniteHandler() {
            axios({
                url: "/activity/Apiactivity/order_list",
                params: {              
                    activity_id:this.Page_id,
                    page: this.PageNum,
                    pageSize: this.pagesize,
                    keyword:this.keyword
                }
            }).then((data)=>{
                this.$parent.loading=false;//停止加载
                if(data.err!=0){return;}
                this.PageNum++;
                this.OrderData = this.OrderData.concat(data.data);
                if (this.OrderData.length >= data.count) {
                    this.$refs.infiniteLoading.$emit("$InfiniteLoading:complete");
                } else {
                    this.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
                }
            })
        },
        // 下载示例
        Down(){
            axios({
                url: "/activity/Apiactivity/import_instructions",
            }).then((data)=>{
                if(data.err!=0){return}
                window.location.href=data.data.instructions_url;
            })
        },
        // 查看下载说明
        Explain(){
            axios({
                url: "/activity/Apiactivity/import_instructions",
            }).then((data)=>{
                if(data.err!=0){return}
                window.location.href=data.data.instructions;
            })
        },
        Search(){
            axios({
                url: "/activity/Apiactivity/order_list",
                params: {
                    activity_id:this.Page_id,
                    page: this.currentPage,
                    pageSize: this.pagesize,
                    keyword:this.keyword
                }
            }).then((data)=>{
                if(data.err!=0){return;}
                this.OrderData=data.data;
                this.total = data.count;
            })
        },
        Go_details(id){
            this.$router.push({
                path: "./order_detail",
                query: {id:id, pos:1}
            });
        },
    pre_btn(){
        Toast('导出成功');
        let token = JSON.parse(localStorage.getItem("token"));
        window.location.href = '/activity/Apiactivity/out?activity_id='+this.Page_id+'&appid='+token.appid+'&cowcms_userid='+token.cowcms_userid;
    },
    getMyExcelData() {
        // document.querySelector('.updata').click();
        this.LogisticsBool=true;
    },
   onClickLeft(){
      this.$router.go(-1); //返回上一层
   },
   onClickRight(){

   },
   toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
      this.selectData = val;
      console.log(this.selectData);
    },
    getRowKeys(row) {
      return row.id;
    },
    
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(val)
    },
     handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val)
      this.getData();
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
#app{
      background-color: #f7f7f7;
      height:100vh;
}
/* 头部开始 */
#app .van-nav-bar {
  background-color: #fff;
  z-index: 99999;
}
#app .van-nav-bar__title {
  color: #000;
  font-size:.34rem;
  font-weight:bold;
}
#app .van-nav-bar .van-icon {
  color: #000;
}
.main{
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 1rem;
}
.order_box{
  width: 95%;
  margin: 0.2rem auto;
  box-sizing: border-box;
  padding:0.3rem 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
}
.list_head{
  width: 95%;
  margin: 0 auto;
  line-height: 0.5rem;
  font-size: .28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list_time{
      margin-top: 2px;
    font-size: 12px;
    color: #999;
    line-height: 18px;
}
.list_key{
  color: #f60;
}
.list_main{
  width: 100%;
  margin-top: 0.3rem;
  padding-bottom: 0.2rem;
  /* background-color: #eeeeee91; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 0.1px solid #e6e4e4;
}
 .list_left{
  width: 25%;
  text-align: center;
  height: 1.5rem;
}
.list_left img{
  width: 1.5rem;
  height: 100%;
  border-radius: 0.1rem;
}
 
.list_right{
  width: 74%;

  box-sizing: border-box;
  padding: 0.1rem 0;
 
}
.list_right .title_1{
  display: flex;
  flex-direction: row;
  
  justify-content: space-between;
}
.list_right .title_2{
  width: 95%;
  display: flex;
  font-size: 0.24rem;
  color: #ccc;
  height: .6rem;
  line-height: .6rem;
  flex-direction: row;
  justify-content: space-between;
}
.list_right .title_3{
  width: 95%;
  font-size: 0.24rem;
  text-align: right;
   height: .8rem;
  line-height: .8rem;
}

.list_right .title_1 .l_title{
   font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.3rem;
}
.list_right .title_1 .l_price{
  font-size: 0.24rem;
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
.share_box {
  width: 5rem;
  padding: 0.1rem;
  overflow: hidden;
  margin: 0.5rem auto;
  position: absolute;
  left: 0;
  top: 15%;
  left: 50%;
  margin-left: -2.5rem;
  background-position: center;  
  background-repeat: no-repeat;
   background-size: cover;
  z-index: 999;
  background-color: #fff;
  box-sizing: border-box;
}
.share_box li{
  height: 0.6rem;
  color: #7c7777;
  line-height: 0.6rem;
  display: flex;
  font-size: 0.28rem;
  flex-direction: row;
  justify-content: space-between;
}
.share_box  .Coupon_title{
   font-size: 0.34rem;
   height: 1rem;
   line-height: 1rem;
  font-weight: bold;
  color: #000;
}
.Coupon_text{
  color: #000;
  font-size: 0.26rem;
}
.line{
  width: 100%;
  margin: 0 auto;
  border: 1px dashed #ccc;
}
.qrcode_box{
  width: 100%;
  text-align: center;
  margin: 0.5rem auto 0 auto;
}
.msg{
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.28rem;
  text-align: center;
  color: #757070;
}

/* 底部返回 */
.list_bom{
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
  text-align: center;
      border-top: 1px solid #e5e5e5;
}
#app>>>.el-upload-list{
  display: none;
}
/* 导入物流弹窗 */
.log_box{
  width: 100%;
  box-sizing: border-box;
}
.log_title{
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  height: 0.8rem;
  font-size: 0.24rem;
  line-height: 0.8rem;
  background-color: #eee;
border-bottom: 1px solid #ccc;
}
.log_text{
  width: 95%;
  margin: 0.1rem auto;
  height: 3rem;
   display: flex;
  font-size: 0.26rem;
  flex-direction: row;
  justify-content: space-between;
}
.left_box{
  width: 25%;
}
.right_box{
  width: 70%;
}
.right_box li{
  height: 0.6rem;
  line-height: 0.6rem;
}
.log_bg{
  background-color: #000;
  font-size: 0.22rem;
  padding: 0.01rem;
  box-sizing: border-box;
  color: #fff;
}
.log_msg{
  font-size: 0.22rem;
  color: #c2bbbb;
  margin-left: 0.1rem;
}
.geshi{
  color: red;
}
.title_3_text{
      font-size: 0.26rem;
    color: #999;
    text-align: right;
    line-height: 0.3rem;
}
.title_3_pay{
   font-size: 0.28rem;
    color: #999;
    text-align: right;
    line-height: 0.3rem;
}
.btn_box{
  width: 95%;
  margin: 0 auto;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: right;
}
.btn_style_cc{
    background-color: #fff;
    color: #333;
    padding: 0 0.2rem;
    border: 1px solid #ccc;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.05);
}
.btn_style_red{
       background-color: #fff;
    color: #f2270c;
    padding: 0 0.2rem;
    border: 1px solid #f2270c;
    box-shadow: 0 3px 6px 0 rgba(242,39,12,.1);
}
.search_box{
    box-sizing:border-box;
  width: 100%;
  margin: 0 auto;
  padding: 0.1rem;
  background-color: #fff; 
}
.search_txt{
      box-sizing: border-box;
    width: 95%;
    margin: 0.1rem auto;
    background: #f7f7f7;
    border-radius: 15px;
    border: none;
    padding:0 0 0 10px;
}
.good_bom{
  width: 95%;
  margin: 0 auto;
  height: 0.8rem;
  line-height: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.good_bom_l{
  width: 40%;
  text-align: left;
}
.head-img{
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 6px;
}
.good_bom_r{
  width: 60%;
  text-align: right;

}
</style>
