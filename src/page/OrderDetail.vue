<template>
    <div class="cont">
        <div class="item df df-c">
            <div class="ware df df-r">
                <img src="~@/assets/test.png" class="img" />
                <div class="detail df df-c just-c-bet">
                    <div>
                        <div class="two-hide fs_32">一叶子面膜 限时抢购</div>
                    </div>
                    <div class="mt-10">
                        <div class="one-hide c_ashen fs_24">
                            <span>组合套装</span>
                        </div>
                        <div class="mt-10 df df-r ai-c just-c-bet fs_24">
                            <div class="df df-r ai-c just-c-end fs_28 c_red1">合计：￥302.00</div>
                            <span class="fs_26 c_33">×1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-40">
                <div class="df df-r ai-c just-c-bet fs_28 c_33">
                    <span>订单信息</span>
                    <span>￥366</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>订单号</span>
                    <span>26546512654</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>运费</span>
                    <span>￥123</span>
                </div>
                <div class="mt-20 df df-r ai-c just-c-bet fs_24 c_ashen">
                    <span>交易时间</span>
                    <span>2018-07-15 15:03:32</span>
                </div>
            </div>
        </div>
        <div class="location">
            <div class="fs_28 c_33 df df-r ai=-c">
                <span>收货地址：</span>
                <span>叶小天</span>
                <span class="span">1232322323</span>
            </div>
            <div class="mt-20 c_ashen fs_24">陕西省西安市某某区  某某街道  某某小区  2号楼5单元402室</div>
        </div>
        <img src="~@/assets/order/line.png" class="line" />
        <div class="wuliu">
            <div class="df df-r ai-c just-c-bet">
                <span class="fs_28 c_33">物流信息</span>
                <van-icon name="arrow" color="#B3B9CF" size="0.28rem" />
            </div>
            <div class="mt-30 df df-r ai-c just-c-bet">
                <div class="txt-ico df ai-c just-c-ct fs_30 c_ff shadow">收</div>
                <div class="fs_26 c_ashen f1">收件地址：陕西省西安市某某区 某某街道  某某小区  2号楼5单元402</div>
            </div>
            <div class="mt-30 df df-r ai-c just-c-bet">
                <div class="txt-ico df ai-c just-c-ct fs_30 c_ff shadow">发</div>
                <div class="fs_26 c_ashen f1">发货地址：陕西省西安市某某区 某某街道  某某小区  2号楼5单元402</div>
            </div>
            <div class="btns mt-40 df df-r ai-c just-c-end">
                <van-button size="small" plain round color="#B3B9CF" >查看物流</van-button>
                <van-button size="small" round color="#FF9C00" >查看物流</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>
<style scoped>
.cont{padding-top:0.3rem;}
.item{width:6.7rem; margin:0 auto; padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.item .icon{width:0.5rem; height:0.5rem; border-radius:50%;}
.item .name{padding-left:0.2rem;}
.item .ware{padding:0.2rem 0;}
.item .ware .img{width:1.98rem; height:1.78rem;}
.item .ware .detail{margin-left:0.2rem; flex:1;}
.item .ware .labels>*{margin-right:0.1rem; padding:2px 0.1rem; line-height:1; border-radius:0.1rem; background:#F4F5F9;}
.location{width:6.7rem; margin:0 auto; padding:0.3rem 0;}
.location .span{padding-left:0.2rem;}
.line{display: block; width:100%; height:auto;}
.wuliu{width:6.7rem; margin:0 auto; padding:0.4rem 0 0.3rem;}
.wuliu .txt-ico{margin-right:0.4rem; width:0.56rem; height:0.56rem; border-radius:50%; background:#B3B9CF;}
.wuliu .btns>*{margin-left:0.2rem;}
</style>
