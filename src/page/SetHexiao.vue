<template>
    <div class="cont df df-c">
        <div class="w-69 mt-30 c_33">核销人员：</div>
        <div class="w-69 mt-30 fs_28 df df-r ai-c">
            <input v-model="input" type="number" class="f1 input c_33" placeholder="请输入手机号"/>            
            <button class="addbtn c_ff" @click="add">添加</button>
        </div>
        <div class="f1 form fs_30">
            <div v-for="(item,index) in list" :key="index" class="item mt-30 df df-r ai-c">
                <div class="c_33 fs_32 f1 phone">{{item}}</div>
                <van-icon name="delete" class="c_blue del" @click="del(index)" />
            </div>
            <div v-if="!list || !list.length" class="df ai-c just-c-ct mt-30 c_ashen">暂无数据</div>
        </div>
        <button class="button mt-50 c_ff" @click="save">保 存</button>
    </div>
</template>
<script>
import {Dialog, Toast} from "vant";
import axios from "../utils/axios";

export default {
    data(){
        return {
            id: null,
            input: "",
            list: [],
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData();
    },
    methods:{
        getData(){
            axios({
                url: "/activity/Apiactivity/set_writes",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                if(data.content){
                    this.list = data.content.split(",");
                }
            })
        },
        add(){
            if(!/^1\d{10}$/.test(this.input)){Toast("手机号格式有误"); return}
            this.list.push(this.input);
            this.input = "";
        },
        save(){
            let str = this.list.join(",");
            axios({
                url: "/activity/Apiactivity/set_write",
                params: {activity_id:this.id, written_off:str}
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("保存成功");
            });
        },
        del(index){
            Dialog.confirm({
                message: '确定删除该条内容吗？'
            }).then(() => {
                this.list.splice(index,1);
            }).catch(() => {});
        }
    }
}
</script>
<style scoped>
.cont{height:100%;}
.w-69{width:6.9rem; margin-left:auto; margin-right:auto;}
.form{width:6.9rem; margin:0.2rem auto 0; overflow-y:auto;}
.form .item .del{margin:0 0.3rem; font-size:0.50rem;}
.input{box-sizing:border-box; height:0.72rem; padding:0 0.1rem; border:1px solid #999999; border-radius:0.1rem;}
.addbtn{width:auto; height:0.72rem; margin-left:0.2rem; padding:0 0.3rem; border-radius:0.1rem; background:#308AF6;}
.button{margin:0.4rem auto; width:6.5rem; height:0.8rem; border-radius:0.1rem; background:#308AF6;}
</style>