<template>
    <div id="app" :class="{ 'header_class': isActive }">
        <keep-alive >
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive >
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            active: '',
            isActive:false,
            HeaderBool:false,
            is_open_spec:false
        };
    },
    methods: {
    },
    watch: {
        $route: {
            handler: function(val) {
                // title
                if(val.path=="/event_view"||val.path.indexOf("/pay_detail")>=0){return;}
                if(val.meta.title){ document.title = val.meta.title; }
                this.isActive = val.meta.showHeader;
            }
        }
    }
}
</script>

<style>
::-webkit-scrollbar {width:0; height:0; background:transparent;}
html,body{height:100%;}
#app {height:100%; font-family: Avenir, Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}

.fs_20{font-size:0.20rem;}
.fs_22{font-size:0.22rem;}
.fs_24{font-size:0.24rem;}
.fs_26{font-size:0.26rem;}
.fs_28{font-size:0.28rem;}
.fs_30{font-size:0.30rem;}
.fs_32{font-size:0.32rem;}
.fs_34{font-size:0.34rem;}
.fs_36{font-size:0.36rem;}
.fs_40{font-size:0.40rem;}
.fs_44{font-size:0.44rem;}
.fs_50{font-size:0.50rem;}
.mt-10{margin-top:0.1rem;}
.mt-16{margin-top:0.16rem;}
.mt-20{margin-top:0.2rem;}
.mt-30{margin-top:0.3rem;}
.mt-36{margin-top:0.36rem;}
.mt-40{margin-top:0.4rem;}
.mt-46{margin-top:0.46rem;}
.mt-50{margin-top:0.50rem;}
.ml-10{margin-left:0.1rem;}
.ml-20{margin-left:0.2rem;}
.ml-40{margin-left:0.4rem;}
.pl-10{padding-left:0.1rem;padding-right:0.1rem;}
.pl-20{padding-left:0.2rem;padding-right:0.2rem;}
.pl-40{padding-left:0.4rem;padding-right:0.4rem;}
.pl-50{padding-left:0.5rem;padding-right:0.5rem;}

.c_y1{color:#ffff00;}
.c_o{color:#FF9C00}
.c_y{color:#FA7E00;}
.c_red{color:#FF0000;}
.c_red1{color:#F32323;}
.c_ashen{color:#9FA9C7;}
.c_status{color:#F3644F;}
.c_blue{color:#1989fa;}
.c_33{color:#333333;}
.c_66{color:#666666;}
.c_88{color:#888888;}
.c_99{color:#999999;}
.c_aa{color:#aaaaaa;}
.c_cc{color:#cccccc;}
.c_ff{color:#FFFFFF;}
.b{font-weight:bold;}
.t-indent{text-indent:2em;}
.txt-c{text-align:center;}
.txt-r{text-align:right;}
.txt-line-t{text-decoration:line-through;}
.lh-1{line-height:1;}
.shadow{box-shadow: 0px 0px 6px 0px rgba(187, 187, 187, 0.8);}

.df{display:flex; flex-direction:row;}
.df-r{flex-direction: row;}
.df-c{flex-direction: column;}
.ai-c{align-items: center;}
.ai-e{align-items: flex-end;}
.as-c{align-self: center;}
.df-w-w{flex-wrap: wrap;}
.just-c-bet{justify-content: space-between;}
.just-c-aro{justify-content: space-around;}
.just-c-end{justify-content: flex-end;}
.just-c-sta{justify-content: start;}
.just-c-ct{justify-content: center;}
.f1{flex:1;}
.one-hide{display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; overflow:hidden; text-overflow:ellipsis;}
.two-hide{display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; text-overflow:ellipsis;}
.txt_line{text-decoration:underline;}

.van-radio__label{color:inherit!important;}
.van-list__loading{width:100%;}
.van-list__finished-text{width:100%;}
.van-tabs__nav--card{border:none!important;}
.van-tabs__nav--card .van-tab{border:none!important;}

.index-tabs .van-tabs__line{display:none;}
.index-tabs .van-tab--active{font-weight:bold;}

.fixed-submit{position:fixed!important; z-index:1; right:0; bottom:2rem; border-radius:0.1rem 0 0 0.1rem; width:2rem;}
.com-btn-y{display:inline-block; background:#FF9C00; border-radius:0.06rem; line-height:1; padding:0.08rem 0.12rem; color:#ffffff; font-size:0.24rem;}
.haibao-btn{margin-right:-0.45rem; display:inline-block; background:#1989fa; height:0.6rem; line-height:0.6rem; padding:0 0.1rem 0 0.2rem; border-radius:0.1rem 0 0 0.1rem;}
.van-sticky--fixed .haibao-btn{margin-right:0; position: absolute; right: 0; top: 0;}

button::-moz-focus-inner,
input::-moz-focus-inner {
    padding: 0;
    border: 0
}

.before-hb{position:relative; z-index:90; background:#ffffff; padding:0.3rem;}
.before-hb .bt{height:0.7rem; margin-bottom:0.2rem;}
.before-hb .active-bt{border:1px solid; border-radius:0.1rem; padding:0 0.3rem; background: rgba(255,156,0,0.1);}

.before-tishi{position:absolute; width:3rem; right:0; top:0.1rem;}
.before-tishi .img{width:3rem; height:3rem;}
.before-tishi .txt{margin-left:-0.5rem;}

.paihang{box-sizing:border-box; width:6.9rem; padding:0.3rem; border-radius:0.1rem; margin-left:auto; margin-right:auto; background:#ffffff;}
.paihang .li{padding:0.2rem 0; border-bottom:1px solid #cccccc;}
.paihang .li:last-child{border-bottom:none;}
.paihang .li .num{width:0.5rem;}
.paihang .li:first-child .num{color:#FFa133; font-size:0.42rem;}
.paihang .li:nth-child(2) .num{color:#999999; font-size:0.38rem;}
.paihang .li:nth-child(3) .num{color:#E4A65A; font-size:0.34rem;}
.paihang .li .icon{width:0.6rem; height:0.6rem; border-radius:50%; margin-right:0.2rem;}

.van-sticky--fixed{z-index:1!important;}

</style>
