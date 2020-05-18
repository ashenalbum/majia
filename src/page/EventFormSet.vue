<template>
    <div class="cont">
        <div v-for="(item,index) in formList" :key="index" class="item">
            <div v-if="item.name!='detailed_addr'">
                <van-cell :title="item.write_name" class="cell pl-4 pr-4" :border="false">
                    <van-switch v-model="formData[index][item.name]" size="0.4rem"/>
                </van-cell>
                <van-radio-group v-if="formData[index][item.name]" v-model="formData[index][item.name+'_required']" class="radio-group df df-r just-c-aro">
                    <van-radio :name="1" class="radio" :class="{c_blue:formData[index][item.name+'_required']==1}">必填</van-radio>
                    <van-radio :name="0" class="radio" :class="{c_blue:formData[index][item.name+'_required']==0}">选填</van-radio>
                </van-radio-group>
            </div>
        </div>
        
        <van-button class="submit" type="info" @click="submit">保存设置</van-button>

        <!-- 提交完成提示 -->
        <!-- <van-overlay :show="showTj"> -->
        <van-popup v-model="showTj" @close="backList">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTj=false">
                <div class="tj-ok df df-c ai-c" @click.stop>
                    <img src="~@/assets/event/submit_title.png" class="img" />
                    <div class="mt-30 c_33 fs_28">设置完成</div>
                    <van-button type="info" size="small" class="btn" @click="backList">我的活动</van-button>
                </div>
                <!-- <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" /> -->
            </div>
        </van-popup>
        <!-- </van-overlay> -->
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import { Toast } from 'vant';
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            id: 0,
            formList: [],
            formData: [],

            showTj: false,
        }
    },
	created(){
		this.id = this.$route.query.id;
        this.getData();
	},
    methods: {
        getData(){
            axios({
                url:"/activity/Apiactivity/getPresetForm",
            }).then((data)=>{
                if(data.err!=0){return false}
                for(let i in data.data){
                    let li = data.data[i];
                    this.formList.push({write_name: li.write_name, name: li.name});
                    let o = {};
                    o[li.name] = false;
                    o[li.name+'_required'] = 0;
                    this.formData.push(o);
                }
                this.getSaveData();
            })
        },
        getSaveData(){
            axios({
                url: "/activity/Apiactivity/getActivityForm",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                let s = data.data;
                for(let j in s){
                    for(let i in this.formList){
                        if(s[j].name===this.formList[i].name){
                            this.formData[i][s[j].name] = true;
                            this.formData[i][s[j].name+"_required"] = s[j].is_required;
                            break;
                        }
                    }
                }
            })
        },
        submit(){
            let data = [];
            for(let i in this.formList){
                let key = this.formList[i].name;
                let o = this.formData[i];
                if(!o[key]){continue;}
                data.push({name:key, is_required:o[key+'_required']});
            }
            axios({
                url:"/activity/Apiactivity/addApplyForm",
                params: {
                    activity_id: this.id,
                    data: data,
                }
            }).then((data)=>{
                if(data.err!=0){return false}
                Toast("操作成功");
                this.showTj = true;
            })
        },
        
        backList(){this.$router.push({path:"/event_list"})},
    },
    components: {PageMenu},
}
</script>
<style scoped>
.cont{padding:0.2rem 0.6rem;}
.item{border-bottom:1px solid #E2E6F1;}
.item .radio-group{padding-bottom:0.2rem;}
.cell .van-cell__value{line-height:1;}
.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.wrapper .tj-ok{width:5.2rem; background:#ffffff; overflow:hidden;}
.wrapper .tj-ok .img{width:100%; height:auto;}
.wrapper .tj-ok .btn{margin:0.3rem 0;width:4.4rem;}
</style>