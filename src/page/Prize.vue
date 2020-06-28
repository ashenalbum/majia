<template>
    <div>
    </div>
</template>
<script>
import axios from "../utils/axios";
import {Dialog, Toast} from "vant";

export default {
    data(){
        return {
            activity_id: null,
            user_id: null,
            rankid: null,
        }
    },
    created(){
        this.activity_id = this.$route.query.activity_id;
        this.user_id = this.$route.query.user_id;
        this.rankid = this.$route.query.rankid;
        this.getInfo(false);
    },
    methods:{
        getInfo(boo){
            axios({
                url: "/marketing/Apiindex/convert_award",
                params: {
                    activity_id: this.activity_id,
                    user_id: this.user_id,
                    rankid: this.rankid,
                    is_right: boo,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                if(boo){
                    Toast("兑换成功！");
                    return;
                }
                Dialog.confirm({
                    message: '确定领取奖品吗？'
                }).then(() => {
                    this.getInfo(true);
                }).catch(() => {});
            })
        }
    }
}
</script>
<style scoped>

</style>