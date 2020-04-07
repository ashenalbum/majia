<template>
    <div class="cont">
        <div class="top df df-r ai-c just-c-bet">
            <span class="fs_34 c_ff">购买成功（运输中）</span>
            <img src="~@/assets/order/car.png" class="img" />
        </div>
        <div class="box shadow">
            <div class="title fs_30 c_ashen ">物流跟踪</div>
            <div class="mt-20 ul">
                <div class="li df df-r">
                    <div class="point df df-c">
                        <div class="p"></div>
                        <div class="l"></div>
                    </div>
                    <div class="txt f1">
                        <div class="tt two-hide fs_30 c_33">本人签收</div>
                        <div class="mt-20 fs_24 c_ashen">2018-01-19  12:20:30</div>
                    </div>
                </div>
                <div class="li df df-r">
                    <div class="point df df-c">
                        <div class="p"></div>
                        <div class="l"></div>
                    </div>
                    <div class="txt f1">
                        <div class="tt two-hide fs_30 c_33">本人签收</div>
                        <div class="mt-20 fs_24 c_ashen">2018-01-19  12:20:30</div>
                    </div>
                </div>
                <div class="li df df-r">
                    <div class="point df df-c">
                        <div class="p"></div>
                        <div class="l"></div>
                    </div>
                    <div class="txt f1">
                        <div class="tt two-hide fs_30 c_33">本人签收</div>
                        <div class="mt-20 fs_24 c_ashen">2018-01-19  12:20:30</div>
                    </div>
                </div>
                <div class="li df df-r">
                    <div class="point df df-c">
                        <div class="p"></div>
                        <div class="l"></div>
                    </div>
                    <div class="txt f1">
                        <div class="tt two-hide fs_30 c_33">本人签收</div>
                        <div class="mt-20 fs_24 c_ashen">2018-01-19  12:20:30</div>
                    </div>
                </div>
                <div class="li df df-r">
                    <div class="point df df-c">
                        <div class="p"></div>
                        <div class="l"></div>
                    </div>
                    <div class="txt f1">
                        <div class="tt two-hide fs_30 c_33">本人签收</div>
                        <div class="mt-20 fs_24 c_ashen">2018-01-19  12:20:30</div>
                    </div>
                </div>
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
.cont{box-sizing:border-box; background:#F5F2F5; min-height:100vh; border-bottom:1px solid #F5F2F5;}
.top{box-sizing: border-box; height:1.9rem; padding:0 0.3rem; background:#2D8BF8 linear-gradient(to right, #2D8BF8 , #71ADFB);}
.top .img{width:1.2rem; height:auto;}
.box{box-sizing:border-box; width:7rem; margin:0.2rem auto; padding:0.3rem; border-radius:0.15rem; background:#ffffff;}
.box .title{padding:0.2rem 0; border-bottom:1px solid #F3F3F3;}
.box .ul .li{height:1.5rem;}
.box .ul .li .point{width:0.68rem;}
.box .ul .li .point .p{width:0.32rem; height:0.32rem; border-radius:50%; background:#CFD3E4;}
.box .ul .li .point .l{width:1px; flex:1; position:relative; left:0.16rem; margin-left:0.5px; background:#CFD3E4;}
.box .ul .li:first-child .tt{color:#FF9C00;}
.box .ul .li:first-child .point .p{background:#FF9C00;}
.box .ul .li:last-child .point .l{display:none;}
</style>
