<template>
    <div class="cont">
        <div class="formbox">
            <van-radio-group v-model="formData.type" class="radio-group mb-20 df df-r ai-c just-c-aro">
                <van-radio :name="1" class="radio" >个人认证</van-radio>
                <van-radio :name="2" class="radio" >企业认证</van-radio>
            </van-radio-group>
            <div v-if="formData.type===1" class="form1">
                <van-field label="姓名" required placeholder="请输入姓名" input-align="right" class="form-input"/>
            </div>
            <div v-if="formData.type===2" class="form2">
                <van-field label="企业名称" required placeholder="请输入企业名称" input-align="right" class="form-input"/>
                <van-field label="法人名称" required placeholder="请输入法人名称" input-align="right" class="form-input"/>
            </div>
            <van-field label="手机号" required type="number" placeholder="请输入手机号" input-align="right" class="form-input"/>
            <van-field label="验证码" required type="number" placeholder="请输入验证码" input-align="right" class="form-input">
                <template #button>
                    <van-button size="mini" plain color="#FF9C00" class="minibtn"> 发送验证码 </van-button>
                </template>
            </van-field>
            <van-field label="微信号" placeholder="请输入微信号" input-align="right" class="form-input"/>
            <div class="upewm">
                <div class="title">微信二维码</div>
                <div class="df ai-c just-c-ct">
                    <van-uploader :preview-image="false" :before-read="beforeRead">
                        <div class="addimg df df-c ai-c just-c-ct c_ashen">
                            <span>点击上传</span>
                            <!-- <img src="~@/assets/test.png" class="img" /> -->
                        </div>
                    </van-uploader>
                </div>
            </div>
            <van-field label="客服微信" placeholder="请输入微信号" input-align="right" class="form-input"/>
            <van-field label="客服电话" placeholder="请输入电话号" input-align="right" class="form-input"/>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            formData: {
                type: 1,
            }
        }
    },
    methods: {
        beforeRead(){

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
</style>
