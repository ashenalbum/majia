<template>
    <div v-if="show" class="jiangpin shadow mt-40">
        <div class="df df-r just-c-ct fs_30 c_33 b">邀好友   拿奖品</div>
        <div v-for="(item,key,index) in list" :key="index" class="item mt-30 df df-r ai-c" @click="draw_award(item,key)">
            <div class="img-box">
                <img class="img" :src="item.data[0].headpic" />
                <div v-if="item.is_can_draw==0" class="msk df ai-c just-c-ct">
                    <img class="suo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAARtJREFUeNrl1D0ohWEUB/A3yUeiXqTIJsmgRCaTYtEtIZvFIsWoTGxsTFJ2EzbZlEyk0L0lC6UMBuUjlxT1M+vey+PF5Py3M/zq6ZzzRNFPS+FUSpkyoVfp94Fqy17cOZGRdW9O2XeAFheO9SsWiZQbdelAbSgQO7eh9EOvxr49xWHAkrSynG6dG+MhQLmsgbwPm3EaAvTKKskLNKHxa2DMWYHJFHnV/TUw6ajgZjzq+2MgFpuWFhdI1qBYVX6g3ZXQyqjPBdZs6wxKl7TZXGDL/CeH9THrFv8N0OPModbkQAZsJAd2wWpyYAi0JQdSoCU50OTZtYqfjLFO1T/axE0rwcCOhVxg2JvboDx40pHvS2s2bCQggxqi36t3CZGcgsdzhIIAAAAASUVORK5CYII=" />
                </div>
                <div v-else class="msk df ai-e just-c-ct">
                    <span class="fs_28 c_ff">可领取</span>
                </div>
                <div class="tag c_ff fs_24">奖品</div>
            </div>
            <div class="txt f1 df df-c">
                <div class="fs_32 c_33">{{item.data[0].title}}</div>
                <div class="c_ashen fs_28 mt-10">需邀请<span class="c_o"> {{item.can_draw_num||"--"}} </span>位好友购买</div>
                <div class="c_ashen fs_28">已邀请<span class="c_o"> {{criteriaNum||"0"}} </span>位好友</div>
            </div>
            <div class="jg c_o fs_32 b"><span class="fs_26">价值<span><br/>￥{{item.data[0].price}}</div>
        </div>
        <van-overlay :show="showLayer" class="df df-c ai-c just-c-ct z-99" @click="showLayer=false">
            <div class="layer df df-c ai-c just-c-ct">
                <canvas id="ewm" ref="ewm" class="ewm"></canvas>
                <div class="mt-30 c_33">商家扫描二维码</div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import axios from "../utils/axios";
import QRCode from "qrcode";

export default {
    data(){
        return {
            show: true,
            criteriaNum: null,
            list: {},

            showLayer: false,
        }
    },
    created(){
        this.getList();
    },
    props:['id'],
    methods: {
        // 获取奖品
        getList(){
            axios({
                url: "/marketing/Apiindex/get_award_info_recommend",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!==0){this.show=false; return}
                this.criteriaNum = data.criteriaNum;
                this.list = data.data;
            })
        },
        // 领取奖励
        draw_award(item,key){
            if(!item.is_can_draw){return}
            axios({
                url: "/marketing/Apiindex/draw_award",
                params: { activity_id: this.id, rankid: key }
            }).then((data)=>{
                if(data.err!==0){return}
                this.createEwm(data.url);
            });
        },
        // 生成二维码
        createEwm(url){
            let msg = document.getElementById('ewm');
            QRCode.toCanvas(msg, url);
            this.showLayer = true;
        },
    }
}
</script>
<style scoped>
.jiangpin{box-sizing:border-box; width:7rem; margin-left:auto; margin-right:auto; border-radius:0.1rem; padding:0.2rem;}
.jiangpin .item{border-radius:0.1rem; overflow:hidden; border:1px solid #DDDDDD;}
.jiangpin .item .img-box{position:relative; width:1.9rem; height:1.54rem;}
.jiangpin .item .img-box .img{position:absolute; top:0; left:0; width:1.9rem; height:1.54rem;}
.jiangpin .item .img-box .tag{position:absolute; top:0.16rem; left:0; background:#FF9C00; line-height:1; padding:4px 0.1rem; border-radius:0 0.2rem 0.2rem 0;}
.jiangpin .item .img-box .msk{position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7);}
.jiangpin .item .img-box .suo{width:0.5rem; height:0.5rem;}
.jiangpin .item .txt{margin:0 0.16rem;}
.jiangpin .item .jg{margin-right:0.16rem;}

.layer{width:6rem; height:7rem; background:#ffffff; border-radius:0.1rem;}
.layer .ewm{width:4rem; height:4rem; border:1px solid #000000;}

.z-99{z-index:99;}
</style>