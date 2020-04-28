<template>
    <div>
        <div v-for="(item,index) in details" :key="index">
            <div v-if="item.type==1" class="txtbox mt-20">
                <div class="txt c_33 fs_28">{{item.content}}</div>
                <textarea class="txt c_33 fs_28" v-model="item.content"></textarea>
                <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
            </div>
            <div v-if="item.type==2" class="imgbox mt-20">
                <img :src="item.content" class="img shadow" />
                <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
            </div>
            <div v-if="item.type==3" class="videobox mt-20">
                <video :src="item.content" controls="controls" class="video"></video>
                <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
            </div>
            <img v-if="index < details.length-1" @click="detailReverse(index)" src="~@/assets/event/reverse.png" class="reverse mt-20" />
        </div>
    </div>
</template>
<script>
import {Dialog} from "vant";

export default {
    data(){
        return {
            details: this.value,
        }
    },
    props:{value:[]},
    methods: {
        // 活动详情交换
        detailReverse(index){
            this.details[index] = this.details.splice(index+1, 1, this.details[index])[0];
        },
        // 活动详情删除
        detailRemove(index){
            Dialog.confirm({
                message: '确定删除该内容吗？'
            }).then(() => {
                this.details.splice(index,1);
            }).catch(() => {});
        },
    },
    watch:{
        value(newVal) {
            this.details = newVal
        },
        details(newVal) {
            this.$emit('input', newVal);
        }
    }
}
</script>
<style scoped>
.detail-list .close{position:absolute; top:-0.2rem; right:-0.2rem; padding:0.1rem; background:#D1D6E5; border-radius:50%;}
.detail-list .reverse{width:0.44rem; height:auto; }
.detail-list .txtbox{position:relative; border:1px solid #D1D6E5;}
.detail-list .txtbox .txt{visibility:hidden; box-sizing:border-box; width:100%; padding:4px; white-space: pre-line;}
.detail-list .txtbox textarea.txt{visibility:visible; position: absolute; left: 0;top: 0; right:0; height: 100%; resize:none;}
.detail-list .imgbox{position:relative; width:100%; margin-left:auto; margin-right:auto;}
.detail-list .videobox{position:relative; width:100%; height:3.2rem; margin-left:auto; margin-right:auto;}
.detail-list .imgbox .img{width:100%;}
.detail-list .videobox .video{width:100%; height:100%; background:#000;}
.detail-inputbox .input{border:1px solid #CCD0DD;}
.detail-inputbox .upfile{border:1px solid #CCD0DD; width:4.82rem; height:2.1rem;}
</style>