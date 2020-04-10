<template>
    <div class="cont">
        <div class="formbox">
            <van-radio-group v-model="formData.contact_type" class="radio-group mb-20 df df-r ai-c just-c-aro">
                <van-radio :name="0" class="radio" >个人认证</van-radio>
                <van-radio :name="1" class="radio" >企业认证</van-radio>
            </van-radio-group>
            <div v-if="formData.contact_type===0" class="form1">
                <van-field v-model="formData.contact_name" label="姓名" required placeholder="请输入姓名" input-align="right" class="form-input"/>
            </div>
            <div v-if="formData.contact_type===1" class="form2">
                <van-field v-model="formData.firm_name" label="企业名称" required placeholder="请输入企业名称" input-align="right" class="form-input"/>
                <van-field v-model="formData.contact_name" label="法人名称" required placeholder="请输入法人名称" input-align="right" class="form-input"/>
            </div>
            <van-field v-model="formData.contact_mobile" label="手机号" required type="number" placeholder="请输入手机号" input-align="right" class="form-input"/>
            <van-field v-model="formData.code" label="验证码" required type="number" placeholder="请输入验证码" input-align="right" class="form-input">
                <template #button>
                    <van-button size="mini" plain :color="codeDisabled?'#333333':'#FF9C00'" class="minibtn" @click="phoneCode" :disabled="codeDisabled">{{codeTxt}}</van-button>
                </template>
            </van-field>
            <van-field v-model="formData.contact_wx" label="微信号" placeholder="请输入微信号" input-align="right" class="form-input"/>
            <div class="upewm">
                <div class="title">微信二维码</div>
                <div class="df ai-c just-c-ct">
                    <van-uploader :preview-image="false" :before-read="beforeRead">
                        <div class="addimg df df-c ai-c just-c-ct c_ashen">
                            <img v-if="ewmImg" :src="ewmImg" class="img" />
                            <span v-else>点击上传</span>
                        </div>
                    </van-uploader>
                </div>
            </div>
            <van-field v-model="formData.service_wx" label="客服微信" placeholder="请输入微信号" input-align="right" class="form-input"/>
            <van-field v-model="formData.service_tel" label="客服电话" placeholder="请输入电话号" input-align="right" class="form-input"/>
        </div>
        <van-button class="submit" type="info" block @click="checkForm">确认提交</van-button>
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upFile} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data (){
        return {
            id: null,
            ewmImg: "",
            codeTxt: "发送验证码",
            codeDisabled: false,
            codeTime: 60,
            codeInterval: null,
            formData:{
                contact_type: 0,
                contact_name: "",
                firm_name: "",
                contact_mobile: "",
                code: "",
                contact_wx: "",
                service_wx: "",
                service_tel: "",
            }
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData();
    },
    methods: {
        getData(){
            axios({
                url: "/activity/Apiactivity/get_user_info",
            }).then((data)=>{
                if(data.err!=0){return;}
                this.formData = data.data;
                if(!this.formData.contact_type){this.formData.contact_type = 0;}
            })
        },
        checkForm(){
            let data = this.formData;
            if(data.contact_type==1 && (!data.firm_name)){Toast("请输入企业名称");return}
            if(!data.contact_name){Toast("请输入"+(data.contact_type==0?"姓名":"企业法人名称"));return}
            if(!/^1\d{10}$/.test(data.contact_mobile)){Toast("请输入正确的手机号");return}
            if(!/^\d{6}$/.test(data.code)){Toast("请输入验证码");return}

            this.formSubmit();
        },
        formSubmit(){
            axios({
                url: "/activity/Apiactivity/edit_organizer",
                method: "post",
                data: {...this.formData}
            }).then((data)=>{
                if(data.err!=0){return;}
                Toast(data.content);
                this.$router.go(-1);
            })
        },
        phoneCode(){
            if(!/^1\d{10}$/.test(this.formData.contact_mobile)){Toast("请输入正确的手机号"); return}
            axios({
                url: "/verify/index/m_verify",
                params: {mobile: this.formData.contact_mobile}
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("短信发送成功");
                this.codeDisabled = true;
                this.codeTxt = this.codeTime + "秒后重试";
                this.codeInterval = setInterval(()=>{
                    if(this.codeTime<=0){
                        this.codeTime = 60;
                        this.codeDisabled = false;
                        this.codeTxt = "发送验证码";
                        clearInterval(this.codeInterval);
                        return;
                    }
                    this.codeTime--;
                    this.codeTxt = this.codeTime + "秒后重试";
                },1000)
            })
        },
        beforeRead(file){
            let formData = new FormData();
            formData.append("file",file);
            upFile(formData).then((data)=>{
                if(data.status!=200){Toast(data.statusText);return}
                Toast("上传成功");
                this.ewmImg = data.data.content.url;
                this.formData.code_wx = data.data.content.fileid;
            });
        },
    }
}
</script>
<style scoped>
.cont{width:6.4rem; margin:0 auto; padding:0.4rem 0;}
.form-input{border-bottom:1px solid #E2E6F1;}
.pl-4{padding-left:4px;}
.pr-4{padding-right:4px;}
.mb-20{margin-bottom:0.2rem;}
.minibtn{padding:0 4px;}

.upewm .title{padding:10px 16px;color: #323233; font-size: 14px; line-height: 24px;}
.addimg{margin:10px; width:3.2rem; height:3.2rem; background:url(~@/assets/event/reverse.png) no-repeat; background-size:100% 100%; outline:1px solid #9FA9C7; outline-offset:6px;}
.addimg .img{width:100%; height:100%;}

.submit{margin:0.4rem 0;}
</style>
