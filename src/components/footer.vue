<template>
  <div class="wrap" id="app-footer">
    <!-- <van-tabbar
      v-model="minShopActiveBar"
      v-show="isShow"
      route
      class="bottom_main"
      :fixed="true"
      @change="handleChangeMinShopTab"
      active-color="#1376F9"
    >
      <van-tabbar-item replace to="/index" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/activity_list" replace icon="coupon-o">活动</van-tabbar-item>
      <van-tabbar-item to="/art" icon="description">文章</van-tabbar-item>
      <van-tabbar-item to="/news" replace icon="browsing-history-o">消息</van-tabbar-item>
      <van-tabbar-item to="/my_center" replace icon="manager-o">我的</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>
 
<script>
export default {
  name: "app-footer",
  data() {
    return {
      minShopActiveBar: "",
      isShow: true,
      url_Data: ""
    };
  },

  mounted() {
    const CURRENTHREF = window.location.hash;
    //  console.log(CURRENTHREF)
    if (CURRENTHREF.includes("index")) {
      this.minShopActiveBar = 0;
    } else if (CURRENTHREF.includes("activity_list")) {
      this.minShopActiveBar = 1;
    } else if (CURRENTHREF.includes("news")) {
      this.minShopActiveBar = 2;
    } else if (CURRENTHREF.includes("my_center")) {
      this.minShopActiveBar = 3;
    } else {
      this.minShopActiveBar = 4;
    }
  },
  methods: {
    handleChangeMinShopTab(e) {
      if (this.minShopActiveBar === 0) {
        this.$router.push({
          path: "/index"
          // replace: true
        });
      } else if (this.minShopActiveBar === 1) {
        this.$router.push({
          path: "/activity_list"
          // replace: true
        });
      } else if (this.minShopActiveBar === 2) {
        this.$router.push({
          path: "/news"
        });
      } else if (this.minShopActiveBar === 3) {
        this.$router.push({
          path: "/my_center"
        });
      } else {
        this.$router.push({
          path: "/article"
        });
      }
    }
  },
  created() {}
};
</script>
<style scoped>
.top-bar {
  display: flex;
  color: #7d7e80;
  background-color: #fff;
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 110;
}
.bar-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.05rem 0;
}
.icon {
  font-size: 0.2rem;
  margin-bottom: 0.05rem;
}
.name {
  font-size: 0.14rem;
}
</style>
