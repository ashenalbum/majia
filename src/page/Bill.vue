<template>
    <div class="cont df df-c ai-c">
        <div class="bill">
            <div class="placehold df df-c ai-c just-c-ct c_99">
                <span class="fs_28">点击设置背景</span>
                <span class="mt-20 fs_24">600 * 960</span>
            </div>
            <img v-if="bgimg" :src="bgimg" class="bgimg" />
            <div class="user">
                <div class="name fs_24 c_99">悲歌断肠</div>
                <div class="iconbox">
                    <img src="~@/assets/test.png" class="icon" />
                    <div class="icon-border"></div>
                </div>
            </div>
            <div class="ewmbox">
                <img src="~@/assets/test.png" class="ewm" />
            </div>
        </div>
        <div class="btns mt-40 df df-r ai-c just-c-aro">
            <van-button size="small" class="btn" color="#999999" plain>生成</van-button>
            <van-button size="small" class="btn" color="#FF9C00" @click="showPopup=true">上传</van-button>
        </div>

        <van-popup v-model="showPopup" position="bottom">
            <div class="popup-box">
                <div class="top-btn df df-r ai-c just-c-bet fs_26">
                    <span class="c_ashen" @click="showPopup=false">取消</span>
                    <span class="c_blue">确定</span>
                </div>
                <div class="imgbox">
                    <ul class="img-ul">
                        <li v-for="(item,index) in [1,2,3,4,5,6,7]" :key="index" class="ai-c">
                            <img src="~@/assets/test.png" class="img" />
                            <van-icon
                                :name="index==1?'checked':'circle'"
                                :color="index==1?'#FF9C00':'#ffffff'"
                                size="0.4rem"
                                class="check"
                            />
                        </li>
                    </ul>
                </div>
                <div class="upfile txt-c">                    
                    <van-uploader :preview-image="false" :before-read="beforeRead">
                        <a href="javascript:;" class="fs_30 c_blue">本地上传</a>
                    </van-uploader>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    data(){
        return {
            bgimg: false,//"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585648531883&di=0d8adf1c3da0137ae7f19c21e8b36587&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F16%2F03%2F5b875d8215a36.jpg%2521%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
            showPopup: false,
        }
    },
    methods: {
        beforeRead(){},
    }
}
</script>
<style scoped>
.cont{padding:0.4rem 0 0.1rem;}
.bill{position:relative; width:6.32rem; height:10.1rem; background:#EEF0F5;}
.bill .placehold{height:100%;}
.bill .bgimg{position:absolute; width:100%; height:100%;}
.bill .user{position:absolute; left:0.64rem; top:0.64rem;}
.bill .iconbox{width:1.15rem; height:1.15rem;}
.bill .iconbox .icon-border{box-sizing:content-box; position:absolute; left:-3px; top:-3px; width:1.15rem; height:1.15rem; padding:3px; background-image:url(~@/assets/bill/iconborder.png); background-size:100% 100%;}
.bill .iconbox .icon{position:absolute; left:0; top:0; width:1.15rem; height:1.15rem; border-radius:50%;}
.bill .user .name{position:absolute; left:1rem; top:0; bottom:0; margin:auto; padding:0 0.2rem 0 0.3rem; height:0.44rem; line-height:0.44rem; background:url(~@/assets/bill/name.png); background-size:100% 100%; white-space:nowrap;}
.bill .ewmbox{position:absolute; right:0.64rem; bottom:0.45rem; box-sizing:border-box; width:1.76rem; height:1.76rem; padding:0.08rem; background:url(~@/assets/bill/ewmbg.png); background-size:100% 100%;}
.bill .ewmbox .ewm{width:100%; height:100%;}
.btns{width:6.4rem; margin-left:auto; margin-right:auto;}
.btns .btn{width:2.5rem;}

.popup-box .top-btn{padding:0.3rem 0.4rem;}
.popup-box .imgbox{width:100%; overflow-x:auto; overflow-y:hidden;}
.popup-box .imgbox .img-ul{position:relative; white-space: nowrap; padding:0 0.1rem;}
.popup-box .imgbox .img-ul li{position:relative; display:inline-block; margin:0 0.2rem; width:1.64rem; height:2.32rem; }
.popup-box .imgbox .img-ul li .img{width:100%; height:100%;}
.popup-box .imgbox .img-ul li .check{box-sizing:border-box; position:absolute; right:0.1rem; top:0.1rem;}
.popup-box .upfile{padding:0.4rem;}
</style>
