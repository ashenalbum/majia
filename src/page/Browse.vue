<template>
    <div id="app">
        <HeadNav></HeadNav>
        <!-- 收入支出记录 -->
        <div class="main">
            <van-list
                v-model="loading"
                :finished="over"
                finished-text="没有更多数据了"
                @load="getData"
                class="fs_28 c_33"
            >
                <van-row v-for="(item,index) in dataList" :key="index" class="row">
                    <van-col span="8" class="df df-r ai-c">
                        <img :src="item.headpath" class="img" />
                        <span class="lh-1">{{item.user_name}}</span>
                    </van-col>
                    <van-col span="6">{{item.recommendid}}</van-col>
                    <van-col span="10" class="c_99">{{item.addtime}}</van-col>
                </van-row>
            </van-list>
        </div>
    </div>
</template>
<script>
import axios from "../utils/axios";
import HeadNav from "../components/HeadNav"; //头部菜单

export default {
    components: {HeadNav,},
    data() {
        return {
            dataList: [],
            loading: false,
            over:false,
            // 分页
            page: 1, //初始页
            pagesize: 30, //    每页的数据
            total: 0 //总条数
        };
    },
    methods: {
        getData() {
            axios({
                url: "/activity/Apiactivity/browse_list",
                params: {
                    activity_id: this.Page_id,
                    page: this.page,
                    pageSize: this.pagesize
                }
            }).then((data)=>{
                if(data.err!=0){return}
                this.loading = false;
                this.page++;
                if(data.count<=this.pagesize){
                    this.dataList = data.data;
                    this.over = true;
                }else{
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            })
        },
    },
    mounted() {
        this.Page_id = this.$route.query.id;
        this.getData();
    }
};
</script>
<style scoped>
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
body {
  padding-bottom: 1rem;
}
.main {
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  flex-direction: row;
  padding-top: 1rem;
  justify-content: space-between;
}
.row{padding:0.3rem 0; border-bottom:1px solid #dddddd;}
.row>*{padding-right:4px;}
.row .img{width:0.4rem; height:0.4rem; border-radius:0.5rem; margin-right:4px;}
</style>


