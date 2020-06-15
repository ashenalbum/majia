<template>
    <div class="cont df df-c">
        <!-- <div class="list-box f1">
            <div class="cont-list c_33">
                <div v-for="(item,index) in dataList" :key="index" class="item df df-c" @click="toView(item)">
                    <div class="ware df df-r">
                        <img :src="item.head_pic" class="img" />
                        <div class="detail df df-c just-c-bet">
                            <div class="one-hide fs_32">{{item.title}}</div>
                            <div class="mt-10 df df-r ai-c fs_24 c_ashen">
                                <van-icon name="underway-o" size="0.3rem"/>
                                <span class="one-hide pl-10">{{computedTime(item)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="listul-box f1 mt-30">
            <div class="listul" >
                <div v-for="(item,index) in dataList" :key="index" class="item shadow"  @click="toView(item)">
                    <div class="imgbox">
                        <img class="img" :src="item.head_pic" />
                    </div>
                    <div class="title van-ellipsis fs_28 c_33 txt-c">{{item.title}}</div>
                    <div class="pl-20">
                        <span class="fs_26 c_red1">￥{{item.special_offer}}<span class="c_ashen txt-line-t pl-20">￥{{item.price}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <PageMenu></PageMenu>
    </div>
</template>
<script>
import axios from "../utils/axios";
import PageMenu from "../components/PageMenu";

export default {
    data(){
        return {
            id: 0,
            dataList: [],
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getList();
    },
    methods: {
        getList(){
            axios({
                url: "/activity/Apiactivity/extension_details",
                params: {id: this.id},
            }).then((data)=>{
                if(data.err!=0){return;}
                this.dataList = data.data.activity_list;
                window.document.title = data.data.title + "  详情";
            })
        },
        // 活动时间
        computedTime(item){
            if(item.start_time==item.abort_time && item.abort_time=="活动不结束"){return "活动不结束"}
            return this.getTime(item.start_time) + " - " + this.getTime(item.abort_time);
        },
        getTime(time){
            let date = new Date(time*1000);
            return date.toLocaleDateString();
        },
        // 预览
        toView(item){
            let id = item.id;
            let path = "";
            item.type = Number(item.type);
            switch(item.type){
                case 0:path="/pay_detail";break;
                case 1:path="/pay_detail_n1";break;
                default: path="/pay_detail_n2";break;
            }
            this.$router.push({path:path, query:{id:id, activity_id1:id}});
        },
    },
    components:{PageMenu},
}
</script>
<style scoped>
.cont{height:100%;}
.list-box{overflow-y:auto; margin-top:0.3rem;}
.txt_line{padding-left:5px;}
.top-alert{width:6.7rem; padding-top:0.3rem; margin-left:auto; margin-right:auto;}
.dib{display:inline-block; white-space: nowrap;}
.cont-list{width:6.7rem; margin:0 auto 0; padding-top:0;}
/* .cont-list .item{margin-bottom:0.4rem;} */
.cont-list .ware{padding:0.2rem 0; border-bottom:1px solid #E2E6F1;}
.cont-list .item:last-child .ware{border:none;}
.cont-list .ware .img{width:1.4rem; height:0.97rem;}
.cont-list .ware .detail{margin-left:0.2rem; flex:1;}
.cont-list .ware .detail .label{padding-left:0.1rem; padding-right:0.4rem;}


.listul-box{position:relative; width:6.7rem; margin-left:auto; margin-right:auto; overflow-y:auto;}
.listul{display:flex; flex-direction:row; justify-content:space-between; flex-wrap:wrap; align-content:flex-start; }
.listul .item{box-sizing:border-box; margin-bottom:0.25rem; width:3.24rem; height:3.2rem; border-radius:0.15rem; overflow:hidden;}
.listul .item .imgbox{position:relative; width:100%; height:2.08rem; border-bottom:1px solid #f1f1f1;}
.listul .item .imgbox .img{width:100%; height:100%;}
.listul .item .imgbox .txt{position:absolute; bottom:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:4px 0 0 0;}
.listul .item .imgbox .yj{position:absolute; top:0; right:0; padding:2px 0.16rem; line-height:0.36rem; background:rgba(0,0,0,0.5); border-radius:0 0 0 4px;}
.listul .item .title{height:0.6rem; line-height:0.6rem; padding:0 4px;}
</style>
