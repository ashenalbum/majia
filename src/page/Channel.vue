<template>
  <div id="app">
     <!-- 头部菜单 -->
      <HeadNav></HeadNav>
     <!-- 订单情况 -->
        <div class="main">
              <div class="gruop">
                <div class="title">
                  <span>
                   输入会员id
                  </span>
                  <span style="font-size:0.24rem;color:#aba4a4">
                    (会员id可多个,用英文逗号隔开)
                  </span>
                </div>
                <div class="content">
                   <van-cell-group>                                    
                  <van-field v-model="ditch_salse"  placeholder="请输入输入会员id" />
                </van-cell-group>
                </div>
              </div>
              <div class="gruop">
                <div class="title">
                  <span>
                   输入渠道商比例(%)
                  </span>
                </div>
                <div class="content">
                   <van-cell-group>
                  <van-field v-model="ditch_divide" type='number' placeholder="请输入渠道商比例" />
                </van-cell-group>
                </div>
              </div>
               <div class="list_bom">
              <van-button type="info" size="small" @click="Save">保存</van-button>
            </div>
            <div v-if="ChannelData && ChannelData.length" class="content_box">
              <div class="content_title">
                已添加渠道商
              </div>
              <ul>
                <li v-for='(item,index) in ChannelData' :key='index'>
                  <span>
                     <img :src="item.headpath" alt="">
                  </span>
                    <span style="margin-left0.1rem">
                    {{item.nickname}}
                  </span>
                </li>
              </ul>
            </div>
        </div>
  </div>
</template>
<script>
import HeadNav from "../components/HeadNav"; //头部菜单
import { Toast } from "vant";
import axios from "../utils/axios";

export default {
    name: "app",
    components: {HeadNav},
    data() {
        return {
            ditch_salse:"",
            ditch_divide:null,
            Page_id:"",
            ChannelData:[]
        };
    },
    created() {
        this.Page_id = this.$route.query.id;
    },
    methods: {
        //返回上一层
        onClickLeft(){this.$router.go(-1)},
        onClickRight(){},
        Save(){
            if((!this.ditch_salse) || (!this.ditch_divide)){Toast('请添加渠道商');return}
            axios({
                url: "/activity/Apiactivity/editActivityDitch",
                params: {
                    is_examine: 2,
                    'activity_id':this.Page_id,
                    'ditch_salse':this.ditch_salse,
                    'ditch_divide':{type:0, number: this.ditch_divide},
                }
            }).then((data)=>{
                if(data.err!=0){return;}
                Toast('添加渠道成功');
            });
        }
    },
    mounted() {
        axios({
            url: "/activity/Apiactivity/distributors_list",
            params: {'activity_id':this.Page_id}
        }).then((data)=>{
            if(data.err!=0){return}
            this.ChannelData = data.content;
            this.ditch_salse = data.ditch_salse;
            this.ditch_divide = data.ditch_divide;
        })
    }
};
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
#app{
	background: #fff;
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
  width: 97%;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 1rem;
}
.gruop{
  margin: 0.5rem 0;
}
.gruop .title{
  line-height: 0.5rem;
  font-size: 0.28rem;
}
.please_text{
  color: #999;
  font-size: 0.28rem;
}
#app>>>.van-cell{
  border: 1px solid #c2cad8;
  padding: 5px 10px;
}
/* 底部返回 */
.list_bom{
  width: 95%;
  box-sizing: border-box;
  margin: 0.4rem auto;
  text-align: center;
}
.content_title{
  font-size: 0.3rem;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-weight: bold;
}
.content_box{
 width: 95%;
  box-sizing: border-box;
  margin: 0.4rem auto;
  text-align: center;
}
.content_box li{
  margin: 0.2rem 0;
  text-align: left;
  font-size: 0.24rem;
}
.content_box li img{
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}
</style>
