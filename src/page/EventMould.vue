<template>
    <div class="cont">
        <div class="search-title df df-c just-c-ct">
            <!-- <div class="title-cont df df-r ai-c">
                <van-icon name="search" size="0.32rem" />
                <div class="f1 txt-c fs-18 c_33 lh-1">模板列表</div>
            </div> -->
            <van-search
                :value="searchVal"
                :focus="searchFocus"
                placeholder="请输入搜索关键词"
                bind:search="onSearch"
            />
        </div>
        <div class="list">
            <van-tabs type="card" color="#3189F6">
                <van-tab title="标签 1"></van-tab>
                <van-tab title="标签 2"></van-tab>
                <van-tab title="标签 2"></van-tab>
                <van-tab title="标签 2"></van-tab>
                <van-tab title="标签 2"></van-tab>
                <van-tab title="标签 2"></van-tab>
                <van-tab title="标签 2"></van-tab>
            </van-tabs>
            <van-list
                v-model="loading"
                :finished="over"
                finished-text="没有更多数据了"
                @load="getList"
                class="listul pl-40 mt-30"
            >
                <div v-for="(item,index) in [1,2,3]" :key="index" class="item shadow">
                    <div class="imgbox">
                        <img class="img" src="~@/assets/test.png" />
                        <span class="txt c_ff fs_24">1234人在使用</span>
                    </div>
                    <div class="title van-ellipsis fs_28 c_33 txt-c">链接未来2 在线报名</div>
                    <div class="df df-r ai-c just-c-bet pl-20">
                        <a class="fs_26 c_ashen" href="javascript:;">预览</a>
                        <a class="com-btn-y" href="javascript:;">立即制作</a>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: false,
            over: false,

            searchShow: false,
            searchVal: "",
            searchFocus: false,
        }
    },
    methods: {
        onSearch(){console.log("search")},
        getList(){
            this.loading = false;
            this.over = true;
        }
    }
}
</script>
<style scoped>

.search-title{display:flex;}
.search-title .title-cont{height:100%; padding:0 0.2rem;}
.search-title .van-search{padding:10px 0.2rem;}

.listul{display:flex; flex-direction:row; justify-content:space-between; flex-wrap:wrap; }
.listul .item{box-sizing:border-box; margin-bottom:0.25rem; width:3.24rem; height:3.52rem; border-radius:0.15rem; overflow:hidden;}
.listul .item .imgbox{position:relative; width:100%; height:2.08rem;}
.listul .item .imgbox .img{width:100%; height:100%;}
.listul .item .imgbox .txt{position:absolute; bottom:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:4px 0 0 0;}
.listul .item .title{height:0.78rem; line-height:0.78rem;}
</style>
