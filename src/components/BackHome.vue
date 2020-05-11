<template>
      <div class="menu" >
        <ul class="mainMenu">
          <li ref="menu" @click="Onclick" class="BackMargin">
            <span v-if="this.MarginBool===false">
              <van-icon name="arrow-left" color='#fff' />
            </span>
            <span v-else>
              <van-icon name="arrow" color='#fff' />
            </span>
          </li>
          <li @click="BackIndex">首页</li>
          <!-- <li @click="BackMTui()">推广</li> -->
          <li @click="BackMember">升级会员</li>
          <li @click="BackCenter">个人中心</li>
          <li class="every">
            <van-icon name="bars" />
          </li>
        </ul>
      </div>
</template>
<script>


export default {
  name: "",
  data() {
    return {
        MarginBool: false,
        pathData:""
    };
  },

  methods: {
      BackIndex() {
      this.$router.push("/");
    },
    BackMember() {
      this.$router.push("/member");
    },
    // BackMTui(){
    //   this.$router.push({ path: "/promotion", query: { 'Page_name': this.pathData } });
    // },
    BackCenter(){
      this.$router.push("/my_center");
    },
    Onclick() {
        if (this.MarginBool == false) {
            document.querySelector(".mainMenu").setAttribute("style", " margin-right: 0");
            this.MarginBool = true;
        } else {
            document
            .querySelector(".mainMenu")
            .setAttribute("style", "margin-right: -3.9rem");
            this.MarginBool = false;
        }
    },
  },
  mounted () {
    this.pathData= this.$parent.$route.name
  },
  created () { 
  
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  height: 0.7rem;
  position: fixed;
  right: 3%;
  z-index: 999;
  bottom: 20%;
}
.menu ul {
  display: flex;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.24rem;
  margin-right: -3.9rem;
  transition: all .5s;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(20, 20, 24, 1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0.1rem 0.2rem 0.9rem 0.1rem rgba(218, 218, 218, 0.51);
  border-radius: 0.35rem;
}
.BackMargin {
  width: 0.5rem;
  text-align: center;
  background: #fa7d00;
  opacity: 0.8;
  border-radius: 50% 0 0 50%;
}
.every {
  width: 0.5rem;
  text-align: center;
  background: rgba(243, 244, 249, 1);
  box-shadow: 0px 2px 9px 1px rgba(218, 218, 218, 0.51);
  border-radius: 50%;
}

.menu ul li {
  padding: 0 0.1rem;
  /* border: 1px solid #000; */
}
</style>