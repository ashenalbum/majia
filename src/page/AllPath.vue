<template>
    <div class="cont">
        <router-link to="/my_center"><div>/my_center</div></router-link>
        <router-link to="/event_list"><div>/event_list</div></router-link>
        <router-link to="/event_view"><div>/event_view</div></router-link>
        <router-link to="/event_mould"><div>/event_mould</div></router-link>
        <router-link to="/event_form"><div>/event_form</div></router-link>
        <router-link to="/event_form_set"><div>/event_form_set</div></router-link>
        <router-link to="/order_list"><div>/order_list</div></router-link>
        <router-link to="/order_detail"><div>/order_detail</div></router-link>
        <router-link to="/order_logistics"><div>/order_logistics</div></router-link>
        <router-link to="/pay_after_set"><div>/pay_after_set</div></router-link>
        <router-link to="/distb_set"><div>/distb_set</div></router-link>
        <router-link to="/bill"><div>/bill</div></router-link>
        <router-link to="/auth"><div>/auth</div></router-link>
        <router-link to="/pay_list"><div>/pay_list</div></router-link>
        <router-link to="/pay_detail"><div>/pay_detail</div></router-link>
        <router-link to="/pay_after"><div>/pay_after</div></router-link>
        <router-link to="/redeem"><div>/redeem</div></router-link>
        <router-link to="/redeem_details"><div>/redeem_details</div></router-link>
        <router-link to="/channel"><div>/channel</div></router-link>
        <router-link to="/browse"><div>/browse</div></router-link>
        <router-link to="/exchange"><div>/exchange</div></router-link>
        <router-link to="/giveRecords"><div>/giveRecords</div></router-link>

        <van-uploader :before-read="beforeRead" />

    </div>
</template>
<script>
import {upFile} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data(){
        return {

        }
    },
    methods: {
        beforeRead(file){
            console.log(file);
            let formData = new FormData();
            formData.append("file", file);
            Toast("正在上传");
            upFile(formData).then((data)=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        console.log(this.$store.state);
    }
}
</script>
<style scoped>

</style>