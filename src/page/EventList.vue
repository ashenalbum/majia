<template>
    <div class="cont df df-c ai-c">
        <van-list
            v-model="loading"
            :finished="over"
            finished-text="没有更多数据了"
            @load="getList"
            class="cont-list c_33"
        >
            <div v-for="(item,index) in [1,3,2,3]" :key="index" class="item df df-c">
                <div class="ware df df-r">
                    <img src="~@/assets/test.png" class="img" />
                    <div class="detail">
                        <div class="df df-r ai-c just-c-bet">
                            <div class="van-ellipsis fs_32">一叶子面膜 限时抢购</div>
                            <van-button size="mini" color="#FF9C00">下架</van-button>
                        </div>
                        <div class="mt-10 df df-r ai-c fs_24 c_ashen">
                            <van-icon name="underway-o" size="0.3rem"/>
                            <span class="van-ellipsis pl-10">2020/03/24 - 2020/04/01</span>
                        </div>
                        <div class="mt-10 df df-r ai-c fs_24 c_ashen">
                            <van-icon name="friends-o" size="0.3rem"/>
                            <span class="van-ellipsis label">1234</span>
                            <van-icon name="eye-o" size="0.3rem"/>
                            <span class="van-ellipsis label">1234</span>
                        </div>
                        <div class="mt-20 df df-r just-c-bet fs_26">
                            <span class="c_status">报名中</span>
                            <span class="c_ashen" @click="openOperate(index)">操作</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <div class="kefu">
            <div class="txt shadow c_ashen">联系客服</div>
            <img src="~@/assets/event/kefu.png" class="icon" />
        </div>
        <van-popup v-model="showOperate" round position="bottom">
            <div class="operate-box">
                <span v-for="(item,index) in operateLs" :key="index" @click="operateClick(item.key)" class="label c_ashen fs_30">{{item.txt}}</span>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: false,
            over: false,
            operateLs: [
                {txt:"复制活动链接", key:"copy"},
                {txt:"分销设置", key:"fenxiao"},
                {txt:"表单设置", key:"formset"},
                {txt:"上传海报", key:"upbill"},
                {txt:"生成海报", key:"createbill"},
                {txt:"统计数据", key:"datas"},
                {txt:"付费后页面设置", key:"payafter"},
            ],
            showOperate: false,
        }
    },
    methods: {
        getList(){
            this.loading = false;
            this.over = true;
        },
        openOperate(id){
            this.showOperate = true;
            console.log(id)
        },
        operateClick(type){
            console.log(type);
        },
    }
}
</script>
<style scoped>
.cont-list{width:6.7rem; margin:0 auto; padding-top:0.3rem;}
.cont-list .item{margin-bottom:0.4rem;}
.cont-list .ware{padding:0.2rem 0; border-bottom:1px solid #E2E6F1;}
.cont-list .ware .img{width:2.66rem; height:1.84rem;}
.cont-list .ware .detail{margin-left:0.2rem; flex:1;}
.cont-list .ware .detail .label{padding-left:0.1rem; padding-right:0.4rem;}

.kefu{position:fixed; left:0.2rem; bottom:0.6rem;}
.kefu .txt{margin-left:0.4rem; height:0.64rem; line-height:0.64rem; padding:0 0.3rem 0 0.5rem; font-size:0.32rem; background:#ffffff; border-radius:0.1rem;}
.kefu .icon{width:0.8rem; height:0.8rem; position:absolute; left:0; top:-0.08rem; border-radius:50%; box-shadow:0 0 6px 0 #2F8AF8;}

.operate-box{padding:0.5rem 0.5rem 0.2rem;}
.operate-box .label{display:inline-block; padding:0.1rem 0.2rem; border:1px solid; border-radius:0.1rem; margin:0 0.3rem 0.3rem 0;}
</style>
