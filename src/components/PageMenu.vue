<template>
    <div class="fixed-btn df df-r ai-c" @click.stop>
        <ul class="ul c_ff fs_50">
            <li class="df df-c ai-c just-c-ct" :class="{p1:show}" @click="toLink('/index')">
                <van-icon name="wap-home-o"/>
            </li>
            <li class="df df-c ai-c just-c-ct" :class="{p2:show}" @click="toLink('/pay_list')">
                <van-icon name="orders-o"/>
            </li>
            <li class="df df-c ai-c just-c-ct" :class="{p3:show}" @click="toLink('/member')">
                <van-icon name="vip-card-o"/>
            </li>
            <li class="df df-c ai-c just-c-ct" :class="{p4:show}" @click="toLink('/my_center')">
                <van-icon name="contact" />
            </li>
        </ul>
        <img src="~@/assets/pay/icon.png" class="img" @click="show=!show" />
    </div>
</template>
<script>
export default {
    data(){
        return { show: false, }
    },
    methods: {
        toLink(link){
            this.show = false;
            if(this.$route.path==link){return;}
            this.$router.push(link);
        },
    },
}
</script>
<style scoped>
.fixed-btn{position:fixed; right:2px; top:8.4rem; width:0.9rem; height:0.9rem;}
.fixed-btn .img{position:relative; width:0.9rem; height:0.9rem; border-radius:50%; box-shadow:0 0 6px #308AF6;}
.fixed-btn .ul li{position:absolute; top:0.05rem; left:0.05rem; width:0.8rem; height:0.8rem; border-radius:50%; background:#308AF6; transition:left 0.2s,top 0.2s;}
.fixed-btn .ul li.p1{left:0; top:-1.1rem;}
.fixed-btn .ul li.p2{left:-1rem; top:-0.5rem;}
.fixed-btn .ul li.p3{left:-1rem; top:0.5rem;}
.fixed-btn .ul li.p4{left:0; top:1.1rem;}
</style>
