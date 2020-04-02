<template>
    <div class="cont">
        <div v-for="(item,index) in formList" :key="index" class="item">
            <van-cell :title="item.name" class="cell pl-4 pr-4" :border="false">
                <van-switch v-model="formData[item.key]" size="0.4rem" />
            </van-cell>
            <van-radio-group v-if="formData[item.key]" v-model="formData[item.key+'Required']" class="radio-group df df-r just-c-aro">
                <van-radio :name="1" class="radio" :class="{c_blue:formData[item.key+'Required']==1}">必填</van-radio>
                <van-radio :name="0" class="radio" :class="{c_blue:formData[item.key+'Required']==0}">选填</van-radio>
            </van-radio-group>
        </div>
        
        <van-button class="submit" type="info">保存设置</van-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formList:[
                {key:"name",name:"真实姓名"},
                {key:"tel",name:"联系电话"},
                {key:"id",name:"身份证号"},
                {key:"weixin",name:"微信号"},
                {key:"email",name:"邮箱"},
                {key:"location",name:"家庭住址"},
                {key:"gongsi",name:"公司名称"},
                {key:"date",name:"日期"},
                {key:"note",name:"备注"},
            ],
            formData: {
                name: false,
                nameRequired: 1,
                tel: false,
                telRequired: 1,
                id: false,
                idRequired: 1,
                weixin: false,
                weixinRequired: 1,
                email: false,
                emailRequired: 1,
                location: false,
                locationRequired: 1,
                gongsi: false,
                gongsiRequired: 1,
                date: false,
                dateRequired: 1,
                note: false,
                noteRequired: 1,
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.cont{padding:0.2rem 0.6rem;}
.item{border-bottom:1px solid #E2E6F1;}
.item .radio-group{padding-bottom:0.2rem;}
.cell .van-cell__value{line-height:1;}
.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}
</style>