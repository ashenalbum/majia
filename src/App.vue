<template>
    <div id="app" :class="{ 'header_class': isActive }">
        <keep-alive >
            <router-view  v-on:footer="footer"  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive >
        <router-view  v-on:footer="footer"  v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            active: '',
            isActive:false,
            footer_show: true,
            HeaderBool:false,
            is_open_spec:false
        };
    },
    methods: {
        //是否显示底部
        footer: function(bool) {
            this.footer_show = bool;
        },
    },
    created () {},
    watch: {
        $route: {
            handler: function(val) {
                this.isActive = val.meta.showHeader;
            }
        }
    }
}
</script>

<style>
#app {font-family: Avenir, Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}

.fs_20{font-size:0.20rem;}
.fs_22{font-size:0.22rem;}
.fs_24{font-size:0.24rem;}
.fs_26{font-size:0.26rem;}
.fs_28{font-size:0.28rem;}
.fs_30{font-size:0.30rem;}
.fs_32{font-size:0.32rem;}
.fs_34{font-size:0.34rem;}
.fs_36{font-size:0.36rem;}
.fs_44{font-size:0.44rem;}
.fs_50{font-size:0.50rem;}
.mt-10{margin-top:0.1rem;}
.mt-20{margin-top:0.2rem;}
.mt-30{margin-top:0.3rem;}
.mt-36{margin-top:0.36rem;}
.mt-40{margin-top:0.4rem;}
.mt-46{margin-top:0.46rem;}
.mt-50{margin-top:0.50rem;}
.ml-20{margin-left:0.2rem;}
.pl-10{padding-left:0.1rem;padding-right:0.1rem;}
.pl-20{padding-left:0.2rem;padding-right:0.2rem;}
.pl-40{padding-left:0.4rem;padding-right:0.4rem;}
.pl-50{padding-left:0.5rem;padding-right:0.5rem;}

.c_o{color:#FF9C00}
.c_red{color:#FF0000;}
.c_red1{color:#F32323;}
.c_ashen{color:#9FA9C7;}
.c_status{color:#F3644F;}
.c_blue{color:#1989fa;}
.c_33{color:#333333;}
.c_66{color:#666666;}
.c_88{color:#888888;}
.c_99{color:#999999;}
.c_ff{color:#FFFFFF;}
.b{font-weight:bold;}
.t-indent{text-indent:2em;}
.txt-c{text-align:center;}
.txt-r{text-align:right;}
.txt-line-t{text-decoration:line-through;}
.lh-1{line-height:1;}
.shadow{box-shadow: 0px 0px 6px 0px rgba(187, 187, 187, 0.8);}

.df{display:flex;}
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

.van-radio__label{color:inherit!important;}
.van-list__loading{width:100%;}
.van-list__finished-text{width:100%;}
.van-tabs__nav--card{border:none!important;}
.van-tabs__nav--card .van-tab{border:none!important;}

.fixed-submit{position:fixed!important; z-index:1; right:0; bottom:2rem; border-radius:0.1rem 0 0 0.1rem; width:2rem;}
.com-btn-y{display:inline-block; background:#FF9C00; border-radius:0.06rem; line-height:1; padding:0.08rem 0.12rem; color:#ffffff; font-size:0.24rem;}


button::-moz-focus-inner,
input::-moz-focus-inner {
    padding: 0;
    border: 0
}
</style>
