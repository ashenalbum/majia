<template>
    <div class="cont">
        <div class="title df df-r ai-c just-c-bet">
            <div class="df df-r ai-c">
                <span class="txt fs_32 c_33">分销功能</span>
                <van-icon name="question-o" color="#BBC1D4" size="0.3rem" class="i" @click="showTishi=true"/>
            </div>
            <van-button icon="plus" size="small" color="#FF9B00" @click="showForm2=true"></van-button>
        </div>
        <div class="formbox">
            <div class="form mt-20">
                <van-field label="分销层级" readonly :value="sales_info[0].level" type="number" input-align="right" class="pl-4" />
                <van-field label="分成方式" readonly :value="sales_info[0].typeTxt" placeholder="请选择分成方式" right-icon="arrow"  input-align="right" class="pl-4" @click="showSeltype=true;focusIndex=0" />
                <van-field label="分销奖励" v-model="sales_info[0].number" type="number" placeholder="请输入奖励" input-align="right" class="pl-4" />
            </div>
        </div>
        <div v-if="showForm2" class="formbox">
            <div class="mt-20 txt-r">
                <van-icon @click="showForm2=false" name="delete" size="0.5rem" color="#999999" />
            </div>
            <div class="form mt-10">
                <van-field label="分销层级" readonly :value="sales_info[1]&&sales_info[1].level" type="number" input-align="right" class="pl-4" />
                <van-field label="分成方式" readonly :value="sales_info[1]&&sales_info[1].typeTxt" placeholder="请选择分成方式" right-icon="arrow"  input-align="right" class="pl-4" @click="showSeltype=true;focusIndex=1" />
                <van-field label="分销奖励" v-model="sales_info[1].number" type="number" placeholder="请输入奖励" input-align="right" class="pl-4" />
            </div>
        </div>
        
        <van-field v-model="btnTxt" label="分销按钮文案" placeholder="请输入，如:生成海报" input-align="right" class="mt-20 pl-4" />
        <van-cell title="开启分销" class="cell pl-4 pr-4">
            <van-switch v-model="onswitch" size="0.4rem" />
        </van-cell>

        <van-button class="submit" type="info" @click="checkForm">确定</van-button>

        <van-overlay :show="showTishi">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTishi=false">
                <div class="tishi shadow" @click.stop>
                    <div class="title df df-r ai-c">
                        <van-icon name="question-o" size="0.32rem" color="#FF9C00" />
                        <div>
                            <span class="fs_26 c_33 title-txt">功能说明</span>
                        </div>
                    </div>
                    <div class="tishi-body fs_24 c_ashen">
                        <div class="t-indent"></div>
                    </div>
                </div>
                <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" />
            </div>
        </van-overlay>

        <van-action-sheet v-model="showSeltype" :actions="types" @select="selType" />

        <!-- 提交完成提示 -->
        <!-- <van-overlay :show="showTj"> -->
        <van-popup v-model="showTj" @close="backList">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTj=false">
                <div class="tj-ok df df-c ai-c" @click.stop>
                    <img src="~@/assets/event/submit_title.png" class="img" />
                    <div class="mt-30 c_33 fs_28">设置完成</div>
                    <van-button type="info" size="small" class="btn" @click="toBill">设置海报</van-button>
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
            id: null,
            showForm2: false, // 显示级别2
            showTishi: false, // 显示提示
            showSeltype: false, //选择方式
            types: [
                {id:0, name:"百分比"},
                {id:1, name:"直接金额"},
            ],
            focusIndex: 0,
            
            btnTxt: "",
            onswitch: true,
            sales_info: [
                {level:1, typeTxt:""},
                {level:2, typeTxt:""},
            ],

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
                url: "/activity/Apiactivity/getApplySalesInfo",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.sales_info = data.data;
                this.btnTxt = data.poster_btn;
                this.onswitch = Boolean(data.is_sales);
                if(!(this.sales_info instanceof Array) || this.sales_info.length==0){
                    this.sales_info = [{
                        type: 0,
                        level: 1,
                        typeTxt: this.types[0].name,
                        number: 0,
                    }];
                }else if(this.sales_info.length==2){
                    this.showForm2 = true;
                }
                if(!this.sales_info[0]){this.sales_info.push({level:1, typeTxt:""})}
                if(!this.sales_info[1]){this.sales_info.push({level:2, typeTxt:""})}
            });
            // 判断能不能设置直接金额
            // axios({
            //     url: "/activity/Apiactivity/previewTemplateInfo",
            //     params: {activity_id: this.id}
            // }).then((data)=>{
            //     if(data.err!=0){return}
            //     if(data.data.type==0){
            //         this.types.push({id:1, name:"直接金额"})
            //     }
            // })
        },
        checkForm(){
            if(this.sales_info[0].type===undefined){Toast("请选择分成方式");return}
            if(this.sales_info[0].number===undefined){Toast("请输入分销奖励");return}
            if(this.showForm2 && this.sales_info[1].type===undefined){Toast("请选择分成方式");return}
            if(this.showForm2 && this.sales_info[1].number===undefined){Toast("请输入分销奖励");return}
            this.submit();
        },
        submit(){
            axios({
                url: "/activity/Apiactivity/editActivity",
                params: {
                    is_examine: 2,
                    specialOperate: true,
                    activity_id: this.id,
                    is_sales: this.onswitch?1:0,
                    poster_btn: this.btnTxt,
                    sales_info: this.showForm2?[...this.sales_info]:[this.sales_info[0]],
                }
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.showTj = true;
            });
        },
        selType(o){
            this.showSeltype = false;
            this.sales_info[this.focusIndex].type = o.id;
            this.sales_info[this.focusIndex].typeTxt = o.name;
        },
        
        toBill(){this.$router.push({path:"/bill", query:{id: this.id}})},
        backList(){this.$router.push({path:"/event_list"})},
    },
    components: {PageMenu},
}
</script>
<style scoped>
.cont{width:6.4rem; margin:0 auto;}

.title{padding-top:0.4rem;}
.title .txt{line-height:1;}
.title .i{padding-left:0.2rem;}
.form,
.form-input{border-bottom:1px solid #999999;}
.pl-4{padding-left:4px;}
.cell .van-cell__value{line-height:1;}
.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.wrapper .tishi{box-sizing:border-box; width:6.9rem; padding:0.5rem 0.5rem 0.3rem; background:#ffffff; border-radius:0.1rem;}

.wrapper .tishi .title{padding:0; padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.wrapper .tishi .title .title-txt{padding-left:0.2rem;}
.wrapper .tishi .tishi-body{padding-top:0.2rem;}
.wrapper .tishi .tishi-body .img{width:3rem; height:1.68rem; margin-right:0.2rem;}

.wrapper .tj-ok{width:5.2rem; background:#ffffff; overflow:hidden;}
.wrapper .tj-ok .img{width:100%; height:auto;}
.wrapper .tj-ok .btn{margin:0.3rem 0;width:4.4rem;}
</style>