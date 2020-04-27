<template>
    <div class="cont">
        <div class="ttbox">
            <van-radio-group v-model="type" class="radio-group df df-r">
                <van-radio :name="0" class="radio">图文设置</van-radio>
                <van-radio :name="1" class="radio">跳转链接</van-radio>
            </van-radio-group>
        </div>
        <div v-if="type===0" class="formbox">
            <van-sticky>
                <div class="btnbox df df-r ai-c">
                    <van-button :plain="detailType!==0" @click="addDetailType(0)" type="info" size="small">添加文字</van-button>
                    <van-button :plain="detailType!==1" @click="addDetailType(1)" type="info" size="small">添加图片</van-button>
                </div>
            </van-sticky>
            <div class="detail-list mt-30">
                <div v-for="(item,index) in detail" :key="index" class="mt-20">
                    <div v-if="item.type===1" class="txtbox">
                        <div class="txt c_33 fs_28">{{item.content}}</div>
                        <textarea class="txt c_33 fs_28" v-model="item.content"></textarea>
                        <van-icon @click="detailRemove(index)" name="clear" size="0.4rem" color="#D1D6E5" class="close"/>
                    </div>
                    <div v-else class="imgbox">
                        <img :src="item.content" class="img shadow" />
                        <van-icon @click="detailRemove(index)" name="clear" size="0.4rem" color="#D1D6E5" class="close"/>
                    </div>
                    <img v-if="index < detail.length-1" @click="detailReverse(index)" src="~@/assets/event/reverse.png" class="reverse mt-20" />
                </div>
            </div>
            <div ref="detailbtns" class="detail-inputbox mt-30 df df-c ai-c">
                <van-field ref="input" v-model="detailTxt" v-if="detailType===0" type="textarea" class="input" @blur="addDetails" @keyup.enter.native="addDetails" />
                <van-uploader v-else-if="detailType===1" :before-read="beforeRead" >
                    <div class="upfile fs_26 c_ashen df ai-c just-c-ct txt-c">宽度不得大于750px<br/>点击上传</div>
                </van-uploader>
            </div>
        </div>
        <div v-else class="mt-40 linkbox">
            <van-field v-model="after_pay_url" placeholder="请输入跳转链接" class="video-input pl-4" />
        </div>
        <van-button ref="btn" class="submit" block type="info" @click="checkForm">确认发布</van-button>
        
        <!-- 提交完成提示 -->
        <!-- <van-overlay :show="showTj"> -->
        <van-popup v-model="showTj" @close="backList">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTj=false">
                <div class="tj-ok df df-c ai-c" @click.stop>
                    <img src="~@/assets/event/submit_title.png" class="img" />
                    <div class="mt-30 c_33 fs_28">设置完成</div>
                    <van-button type="info" size="small" class="btn" @click="toFenxiao">去设置分销</van-button>
                </div>
                <!-- <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" /> -->
            </div>
        </van-popup>
        <!-- </van-overlay> -->
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upFile} from "../utils/axios";
import { Toast,Dialog } from 'vant';

export default {
    data(){
        return {
            id: 0,
            type: 0, // 内容/链接
            after_pay_url: "", //跳转链接
            detailType: 0, //输入类型
            detailTxt: "", //输入内容
            detail: [],

            showTj: false,
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData();
    },
    methods: {
        checkForm(){
            if(this.type==1 && !this.after_pay_url){Toast("请输入跳转链接");return}
            if(this.type==0 && this.detail.length==0){Toast("请输入图文内容");return}
            this.submit();
        },
        submit(){
            axios({
                url: "/activity/Apiactivity/editActivity",
                params: {
                    activity_id: this.id,
                    after_pay_type: this.type,
                    after_pay_url: this.after_pay_url,
                    after_pay_custom: this.detail,
                    specialOperate: true,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.showTj = true;
            });
        },
        getData(){
            axios({
                url: "/activity/Apiactivity/getAfterPay",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return;}
                this.type = data.data.after_pay_type;
                this.after_pay_url = data.data.after_pay_url;
                this.detail = data.data.after_pay_custom || [];
            })
        },
        // 选择添加类型
        addDetailType(type){
            this.detailType =  type;
            this.$refs.detailbtns.scrollIntoView();
            if(type==0&&this.$refs.input){
                this.$refs.input.focus();
            }
        },
        // 活动详情交换
        detailReverse(index){
            this.detail[index] = this.detail.splice(index+1, 1, this.detail[index])[0];
        },
        // 添加文字内容
        addDetails(){
            if(/^\s*$/.test(this.detailTxt)){return}
            this.detail.push({type:1, content:this.detailTxt});
            this.detailTxt = "";
            this.$refs.btn.scrollIntoView();
        },
        // 上传图片
        beforeRead(file){
            let formData = new FormData();
            formData.append("file", file);
            Toast("正在上传");
            upFile(formData).then((data)=>{
                if(data.data.err!=0){return}
                this.detail.push({type:2, content:data.data.content.url});
                this.$refs.btn.scrollIntoView();
            }).catch((err)=>{Toast(err)})
        },
        // 活动详情删除
        detailRemove(index){
            Dialog.confirm({
                message: '确定删除该内容吗？'
            }).then(() => {
                this.detail.splice(index,1);
            }).catch(() => {});
        },

        toFenxiao(){this.$router.push({path:"/distb_set",query:{id:this.id}});},
        backList(){this.$router.push({path:"/event_list"})},
    }
}
</script>
<style scoped>
/* .cont{width:6rem; margin:auto;} */

.ttbox{width:6rem; margin:auto; padding:0.4rem 0 0.2rem;}
.ttbox .radio-group{padding-right:0.2rem;}
.ttbox .radio-group .radio{padding-right:0.3rem;}

.formbox{padding:0.4rem 0;}
.btnbox{padding:0.1rem 0.75rem; background:#ffffff;}
.btnbox>*{margin-right:0.2rem;}
.van-sticky--fixed .btnbox{box-shadow: 0px 0px 6px 0px rgba(187, 187, 187, 0.8);}

.detail-list{width:6rem; margin-left:auto; margin-right:auto;}
.detail-list .close{position:absolute; top:-0.3rem; right:-0.3rem; padding:0.1rem;}
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

.detail-inputbox{width:6rem; margin-left:auto; margin-right:auto;}
.detail-inputbox .input{border:1px solid #CCD0DD;}
.detail-inputbox .upfile{border:1px solid #CCD0DD; width:4.82rem; height:2.1rem;}

.linkbox{width:6rem; margin-left:auto; margin-right:auto;}
.video-input{border:1px solid #E2E6F1; padding:6px 4px;}

.submit{border-radius:0.1rem; width:6rem; margin:0.6rem auto 0.4rem;}

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.wrapper .tj-ok{width:5.2rem; background:#ffffff; overflow:hidden;}
.wrapper .tj-ok .img{width:100%; height:auto;}
.wrapper .tj-ok .btn{margin:0.3rem 0;width:4.4rem;}
</style>