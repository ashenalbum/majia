<template>
    <div class="cont df df-c ai-c">
        <van-list
            v-model="loading"
            :finished="over"
            finished-text="没有更多数据了"
            @load="getList"
            class="cont-list c_33"
        >
            <div v-for="(item,index) in dataList" :key="index" class="item df df-c">
                <div class="df df-r ai-c just-c-bet">
                    <div class="df df-r ai-c">
                        <img src="~@/assets/test.png" class="icon" />
                        <span class="name fs_28 c_ashen">疯了的痘痘</span>
                    </div>
                    <span class="c_status fs_26">等待确认</span>
                </div>
                <div class="ware df df-r">
                    <img src="~@/assets/test.png" class="img" />
                    <div class="detail">
                        <div class="df df-r ai-c just-c-bet">
                            <div class="one-hide fs_32">一叶子面膜 限时抢购</div>
                            <span class="fs_26">￥99.8</span>
                        </div>
                        <div class="mt-20 df df-r ai-c just-c-bet c_ashen fs_24">
                            <div class="one-hide labels">
                                <span>组合套装</span>
                            </div>
                            <span class="fs_26">×1</span>
                        </div>
                        <div class="mt-40 df df-r just-c-end fs_28">合计：￥302.00</div>
                    </div>
                </div>
                <div class="btns mt-10 df df-r ai-c just-c-end">
                    <van-button plain round size="small" color="#9FA9C7" >查看物流</van-button>
                    <van-button plain round size="small" color="#FF9C00" >订单信息</van-button>
                </div>
            </div>
        </van-list>
        
    </div>
</template>
<script>
import axios from "../utils/axios";
export default {
    data(){
        return {
            search: {
                page: 1,
                pageSize: 20,
            },
            loading: false,
            over: false,
            dataList: [],
        }
    },
    
    methods: {
        getList(){
            if(this.over){return;}
            axios({
                url: "/activity/Apiactivity/order_list",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return}
                this.loading = false;
                this.search.page++;
                if(data.count<=this.search.pageSize){
                    this.dataList = data.data;
                }else{
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            });
        }
    }
}
</script>
<style scoped>
.cont-list{width:6.7rem; margin:0 auto; padding-top:0.3rem;}
.cont-list .item{margin-bottom:0.4rem;}
.cont-list .item .icon{width:0.5rem; height:0.5rem; border-radius:50%;}
.cont-list .item .name{padding-left:0.2rem;}
.cont-list .ware{padding:0.2rem 0; border-bottom:1px solid #E2E6F1;}
.cont-list .ware .img{width:1.98rem; height:1.78rem;}
.cont-list .ware .detail{margin-left:0.2rem; flex:1;}
.cont-list .ware .labels>*{margin-right:0.1rem; padding:2px 0.1rem; line-height:1; border-radius:0.1rem; background:#F4F5F9;}
.cont-list .btns>*{margin-left:0.2rem;}
</style>
