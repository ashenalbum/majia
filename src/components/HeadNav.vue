<template>
     <div class="fixed_box">
     <div class="fixed_box-left" @click="onClickLeft()">
        返回
     </div>
     <ul class="fixed_box-right">
         <li @click="onClick_a()">订单</li>
          <span class="line_title">|</span>
         <!-- <li  @click="onClick_b()">推广</li>
          <span class="line_title">|</span> -->
         <li  @click="onClick_c()">钱包</li>
         <span class="line_title">|</span>
         <li  @click="onClick_d()">个人中心</li>
     </ul>
   </div>
</template>
<script>


export default {
  name: "",
  data() {
    return {
        MarginBool: false,
    };
  },

  methods: {
     onClick_a(){
       this.$router.push("./order_list");
    },
    onClick_b(){
      this.$router.push("./promotion");
    },
    onClick_c(){
      this.$router.push("./profit");
    },
    onClick_d(){
      this.$router.push("./my_center");
    },
    onClickLeft() {
      if(window.history.length <= 1){
        this.$router.push("./index");
      }else{
         this.$router.go(-1);//返回上一层
      }
    },
  },
  mounted () {
  },
  created () { 
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 头部菜单 */
.fixed_box{
    width: 100%;
    position: fixed;
    top:0;
    height: 46px;
    line-height: 46px;
    text-align: center;
     color: #000;
    background-color: #eee;
    -webkit-user-select: none;
    user-select: none;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  justify-content: space-between;
}
.fixed_box-left{
  width: 10%;
  padding: 0 0.2rem;
  font-size: 0.26rem;
   height: 46px;
}
.fixed_box-right{
   height: 46px;
  display: flex;
}
.fixed_box-right li{
  padding: 0 0.2rem;
  font-size: 0.24rem;
}
.fixed_box-right .line_title{
  color: #c8c9cc;
}
/* 头部菜单结束 */
</style>