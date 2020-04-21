<template>
    <div class="cont">
        <div class="box">
            <div v-for="(item,index) in data" :key="index">
                <div v-if="item.type==1" class="txt t-indent c_ashen">{{item.content}}</div>
                <img v-if="item.type==2" class="img" :src="item.content" />
                <video v-else-if="item.type==3" class="video" :src="item.content" controls></video>
            </div>
        </div>
        <div class="btn-box mt-20">
            <van-button type="info" @click="toMyCenter" block>返回个人中心</van-button>
        </div>
    </div>
</template>
<script>
import axios from "../utils/axios";

export default {
    data(){
        return {
            id: null,
            data: [],
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getAfterPay();
    },
    methods:{
        getAfterPay(){
            axios({
                url: "/activity/Apiactivity/getAfterPay",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                if(data.data.type == 1){
                    window.location.href = data.data.after_pay_url;
                }else{
                    this.data = data.data.after_pay_custom;
                }
            })
        },
        toMyCenter(){
            this.$router.push({path:"/my_center"});
        },
    }
}
</script>
<style scoped>
.box .txt{padding:0.36rem 0.2rem; line-height:2;}
.box .img{display:block; width:100%; height:auto;}
.box .video{display:block; width:100%; height:auto; background:#000000;}
.btn-box{width:6rem; margin-left:auto; margin-right:auto; margin-bottom:0.2rem;}
</style>