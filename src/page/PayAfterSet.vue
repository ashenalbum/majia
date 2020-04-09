<template>
    <div class="cont">
        <div class="ttbox">
            <van-radio-group v-model="type" class="radio-group df df-r">
                <van-radio :name="0" class="radio">图文设置</van-radio>
                <van-radio :name="1" class="radio">跳转链接</van-radio>
            </van-radio-group>
        </div>
        <div v-if="type===0" class="formbox">
            <div class="btnbox mt-10 df df-r ai-c">
                <van-button :plain="detailType!==0" @click="detailType=0" type="info" size="small">添加文字</van-button>
                <van-button :plain="detailType!==1" @click="detailType=1" type="info" size="small">添加图片</van-button>
            </div>
            <div class="detail-inputbox mt-30 df df-c ai-c">
                <van-field v-model="detailTxt" v-if="detailType===0" type="textarea" class="input" @blur="addDetails" />
                <van-uploader v-else-if="detailType===1" :before-read="beforeRead" >
                    <div class="upfile fs_26 c_ashen df ai-c just-c-ct txt-c">宽度不得大于750px<br/>点击上传</div>
                </van-uploader>
            </div>
            <div class="detail-list mt-30">
                <div v-for="(item,index) in detail" :key="index" class="mt-20">
                    <div v-if="item.type===1" class="txtbox">
                        <div class="txt c_33 fs_28">{{item.content}}</div>
                        <van-icon name="clear" size="0.4rem" color="#D1D6E5" class="close"/>
                    </div>
                    <div v-else class="imgbox">
                        <img :src="item.content" class="img shadow" />
                        <van-icon name="clear" size="0.4rem" color="#D1D6E5" class="close"/>
                    </div>
                    <img v-if="index < detail.length-1" @click="detailReverse(index)" src="~@/assets/event/reverse.png" class="reverse mt-20" />
                </div>
            </div>
        </div>
        <div v-else class="mt-40 linkbox">
            <van-field v-model="after_pay_url" placeholder="请输入跳转链接" class="video-input pl-4" />
        </div>
        <van-button ref="btn" class="submit" type="info">确认发布</van-button>
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upFile} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data(){
        return {
            id: 0,
            type: 0, // 内容/链接
            after_pay_url: "", //跳转链接
            detailType: 0, //输入类型
            detailTxt: "", //输入内容
            detail: []
        }
    },
    created(){
        this.id = this.$route.query.id;
    },
    methods: {
        submit(){
            axios({
                url: "/activity/Apiactivity/specialOperate",
                params: {
                    activity_id: this.id,
                    after_pay_type: this.type,
                    after_pay_url: this.after_pay_url,
                    after_pay_custom: this.detail,
                }
            }).then((data)=>{
                if(data.err!=0){return}
            });
        },
        // 活动详情交换
        detailReverse(index){
            this.detail[index] = this.detail.splice(index+1, 1, this.detail[index])[0];
        },
        // 添加文字内容
        addDetails(){
            if(/^\s*$/.test(this.detailTxt)){Toast("没有输入内容");return}
            this.detail.push({type:1, content:this.detailTxt});
            this.detailTxt = "";
            this.$refs.btn.scrollIntoView();
        },
        // 上传图片
        beforeRead(file){
            let formData = new FormData();
            formData.append("file", file);
            upFile(formData).then((data)=>{
                if(data.status!=200){return;}
                this.detail.push({type:2, content:data.data.content.url});
                this.$refs.btn.scrollIntoView();
            }).catch((err)=>{Toast(err)})
        }
    }
}
</script>
<style scoped>
.cont{width:6rem; margin:auto;}

.ttbox{padding:0.4rem 0 0.2rem;}
.ttbox .radio-group{padding-right:0.2rem;}
.ttbox .radio-group .radio{padding-right:0.3rem;}

.formbox{padding:0.4rem 0;}
.btnbox>*{margin-right:0.2rem;}
.detail-list .close{position:absolute; top:-0.3rem; right:-0.3rem; padding:0.1rem;}
.detail-list .txtbox{position:relative;border:1px solid #D1D6E5;}
.detail-list .txtbox .txt{padding:4px;}
.detail-list .imgbox{position:relative; width:100%; margin-left:auto; margin-right:auto;}
.detail-list .videobox{position:relative; width:100%; height:3.2rem; margin-left:auto; margin-right:auto;}
.detail-list .imgbox .img{width:100%;}
.detail-list .videobox .video{width:100%; height:100%; background:#000;}
.detail-list .reverse{width:0.44rem; height:auto; }

.detail-inputbox .input{border:1px solid #CCD0DD;}
.detail-inputbox .upfile{border:1px solid #CCD0DD; width:4.82rem; height:2.1rem;}

.video-input{border:1px solid #E2E6F1; padding:6px 4px;}

.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}
</style>