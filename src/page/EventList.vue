<template>
    <div class="cont df df-c ai-c">
        <van-list
            v-model="loading"
            :finished="over"
            finished-text="没有更多数据了"
            @load="getList"
            class="cont-list c_33"
        >
            <div v-for="(item,index) in dataList" :key="index" class="item df df-c">
                <div class="ware df df-r">
                    <img :src="item.head_pic" class="img" />
                    <div class="detail">
                        <div class="df df-r ai-c just-c-bet">
                            <div class="one-hide fs_32">{{item.title}}</div>
                            <div>
                                <van-button v-if="item.audit_type!=1" size="mini" color="#BBC1D4" @click="toEdit(item)">编辑</van-button>
                                <!-- <van-button v-else size="mini" color="#FF9C00" @click="frames(item)">{{item.putaway==0?"上架":"下架"}}</van-button> -->
                                <span v-else class="fs_26 c_99">进行中</span>
                            </div>
                        </div>
                        <div class="mt-10 df df-r ai-c fs_24 c_ashen">
                            <van-icon name="underway-o" size="0.3rem"/>
                            <span class="one-hide pl-10">{{computedTime(item)}}</span>
                        </div>
                        <div class="mt-10 df df-r ai-c fs_24 c_ashen">
                            <van-icon name="friends-o" size="0.3rem"/>
                            <span class="label">{{item.people_buy_num}}</span>
                            <van-icon name="eye-o" size="0.3rem"/>
                            <span class="label">{{item.browse_num}}</span>
                        </div>
                        <div class="mt-20 df df-r just-c-bet fs_26">
                            <span class="c_status">{{getTypeTxt(item)}}</span>
                            <span class="c_ashen" @click="openOperate(item)">操作</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <!-- <div class="kefu">
            <div class="txt shadow c_ashen fs_32">联系客服</div>
            <img src="~@/assets/event/kefu.png" class="icon" />
        </div> -->
        <van-popup v-model="showOperate" round position="bottom">
            <div class="operate-box">
                <span class="label c_ashen fs_30" id="copyurl" :data-clipboard-text="copyUrl">复制活动链接</span>
                <span class="label c_ashen fs_30" @click="operateClick('fenxiao')">分销设置</span>
                <span class="label c_ashen fs_30" @click="operateClick('formset')">表单设置</span>
                <span class="label c_ashen fs_30" @click="operateClick('dingdan')">订单列表</span>
                <span class="label c_ashen fs_30" @click="operateClick('upbill')">上传海报</span>
                <span class="label c_ashen fs_30" id="copybill" :data-clipboard-text="billUrl">复制海报链接</span>
                <span class="label c_ashen fs_30" @click="operateClick('createbill',billUrl)">生成海报</span>
                <!-- <span class="label c_ashen fs_30" @click="operateClick('duijiang')">设置兑奖内容</span> -->
                <span class="label c_ashen fs_30" id="duijiang" :data-clipboard-text="dhUrl">复制兑奖链接</span>
                <span class="label c_ashen fs_30" @click="operateClick('qudao')">添加渠道</span>
                <span class="label c_ashen fs_30" @click="operateClick('liulan')">浏览记录</span>
                <!-- <span class="label c_ashen fs_30" @click="operateClick('datas')">统计数据</span> -->
                <span class="label c_ashen fs_30" @click="operateClick('payafter')">付费后页面设置</span>
            </div>
        </van-popup>
    </div>
</template>
<script>
import axios from "../utils/axios";
import {Toast} from 'vant';
import Clipboard from 'clipboard';

export default {
    data(){
        return {
            search: {
                page: 1,
                pageSize: 20,
            },
            loading: false,
            over: false,
            copyUrl: "",
            billUrl: "",
            dhUrl: "",
            showOperate: false,
            nowItem: {},

            dataList: [],
        }
    },
    mounted(){
        let clipboard = new Clipboard("#copyurl");
        clipboard.on('success', ()=>{Toast("复制成功"); this.showOperate=false});
        clipboard.on('error', ()=>{Toast("复制失败"); this.showOperate=false});

        let urlbill = new Clipboard("#copybill");
        urlbill.on('success', ()=>{Toast("复制成功"); this.showOperate=false});
        urlbill.on('error', ()=>{Toast("复制失败"); this.showOperate=false});

        let copyDj = new Clipboard("#duijiang");
        copyDj.on('success', ()=>{Toast("复制成功"); this.showOperate=false});
        copyDj.on('error', ()=>{Toast("复制失败"); this.showOperate=false});
    },
    methods: {
        getList(){
            axios({
                url: "/activity/Apiactivity/getActivityList",
                params: {...this.search}
            }).then((data)=>{
                if(data.err!=0){return;}
                this.loading = false;
                this.search.page++;
                if(data.count<=this.search.pageSize){
                    this.dataList = data.data;
                    this.over = true;
                }else{
                    this.dataList = this.dataList.concat(data.data);
                }
                if(data.count<=this.dataList.length){ this.over = true;}
            })
        },
        // 操作
        openOperate(item){
            this.showOperate = true;
            this.copyUrl = item.activity_url;
            this.billUrl = item.activity_poster_url;
            this.dhUrl = item.activity_convert_url
            this.nowItem = item;
        },
        // 操作详情
        operateClick(type,data){
            let id = this.nowItem.id;
            if(type=="dingdan"){this.$router.push({path:"/userdata", query:{id:id}});}
            if(type=="fenxiao"){this.$router.push({path:"/distb_set", query:{id:id}}); return}
            if(type=="formset"){this.$router.push({path:"/event_form_set", query:{id:id}}); return}
            if(type=="upbill"){this.$router.push({path:"/bill", query:{id:id}}); return}
            if(type=="createbill"){window.location.href = data; return}
            if(type=="duijiang"){this.$router.push({path:"/redeem", query:{id:id}}); return}
            if(type=="payafter"){this.$router.push({path:"/pay_after_set", query:{id:id}}); return}
            if(type=="liulan"){this.$router.push({path:"/browse", query:{id:id}}); return}
            if(type=="qudao"){this.$router.push({path:"/channel", query:{id:id}}); return}
        },
        // 活动时间
        computedTime(item){
            if(item.start_time==item.abort_time && item.abort_time=="活动不结束"){return "活动不结束"}
            return item.start_time + " - " + item.abort_time;
        },
        // 活动状态
        getTypeTxt(item){
            if(item.audit_type==0){return "审核中"}
            if(item.audit_type==1){return item.type==0?"报名中":"进行中"}
            if(item.audit_type==2){return "审核未通过"}
        },
        // 编辑
        toEdit(item){ this.$router.push({path:"/event_form", query:{id:item.id, isEdit:true}})},
        // 上下架
        frames(item){
            axios({
                url: "/activity/Apiactivity/editActivity",
                params: {activity_id: item.id, specialOperate:true, putaway:true}
            }).then((data)=>{
                if(data.err!=0){return}
                Toast("操作成功");
                this.search.page = 1;
                this.dataList = [];
                this.getList();
            })
        }
    }
}
</script>
<style scoped>
.cont-list{width:6.7rem; margin:0 auto; padding-top:0.3rem;}
.cont-list .item{margin-bottom:0.4rem;}
.cont-list .ware{padding:0.2rem 0; border-bottom:1px solid #E2E6F1;}
.cont-list .ware .img{width:2.66rem; height:1.84rem;}
.cont-list .ware .detail{margin-left:0.2rem; flex:1;}
.cont-list .ware .detail .label{padding-left:0.1rem; padding-right:0.4rem;}

.kefu{position:fixed; left:0.2rem; bottom:0.6rem;}
.kefu .txt{margin-left:0.4rem; line-height:1; padding:0.16rem 0.3rem 0.16rem 0.5rem; font-size:0.32rem; background:#ffffff; border-radius:0.1rem;}
.kefu .icon{width:0.8rem; height:0.8rem; position:absolute; left:0; top:-0.08rem; border-radius:50%; box-shadow:0 0 6px 0 #2F8AF8;}

.operate-box{padding:0.5rem 0.5rem 0.2rem;}
.operate-box .label{display:inline-block; padding:0.1rem 0.2rem; border:1px solid; border-radius:0.1rem; margin:0 0.3rem 0.3rem 0;}
</style>
