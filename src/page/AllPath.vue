<template>
    <div class="cont">
        <router-link to="/index"><div>/index</div></router-link>
        <router-link to="/group"><div>/group</div></router-link>
        <router-link to="/group_sel"><div>/group_sel</div></router-link>
        <router-link to="/bgm_set"><div>/bgm_set</div></router-link>
        <router-link to="/extension"><div>/extension</div></router-link>
        <router-link to="/my_center"><div>/my_center</div></router-link>
        <router-link to="/event_list"><div>/event_list</div></router-link>
        <router-link to="/event_view"><div>/event_view</div></router-link>
        <router-link to="/event_mould"><div>/event_mould</div></router-link>
        <router-link to="/event_form"><div>/event_form</div></router-link>
        <router-link to="/event_form_set"><div>/event_form_set</div></router-link>
        <router-link to="/order_list"><div>/order_list</div></router-link>
        <router-link to="/order_detail"><div>/order_detail</div></router-link>
        <router-link to="/order_logistics"><div>/order_logistics</div></router-link>
        <router-link to="/pay_after_set"><div>/pay_after_set</div></router-link>
        <router-link to="/distb_set"><div>/distb_set</div></router-link>
        <router-link to="/bill"><div>/bill</div></router-link>
        <router-link to="/auth"><div>/auth</div></router-link>
        <router-link to="/pay_list"><div>/pay_list</div></router-link>
        <router-link to="/pay_detail"><div>/pay_detail</div></router-link>
        <router-link to="/pay_after"><div>/pay_after</div></router-link>
        <router-link to="/redeem"><div>/redeem</div></router-link>
        <router-link to="/redeem_details"><div>/redeem_details</div></router-link>
        <router-link to="/channel"><div>/channel</div></router-link>
        <router-link to="/browse"><div>/browse</div></router-link>
        <router-link to="/exchange"><div>/exchange</div></router-link>
        <router-link to="/giveRecords"><div>/giveRecords</div></router-link>

        <!-- <van-uploader :before-read="beforeRead" /> -->
        <PageMenu></PageMenu>
        
        <div ref="newdanmu" class="new-dm"></div>

        <!-- <div class="jiangpin shadow mt-40">
            <div class="df df-r just-c-ct fs_30 c_33 b">邀好友   拿奖品</div>
            <div v-for="i in 5" :key="i" class="item mt-30 df df-r ai-c">
                <div class="img-box">
                    <img src="~@/assets/test.png" />
                    <div class="tag c_ff fs_24">奖品</div>
                </div>
                <div class="txt f1 df df-c">
                    <div class="fs_32 c_33">标题标题</div>
                    <div class="c_ashen fs_28 mt-10">需邀请<span class="c_o">5</span>位好友购买</div>
                    <div class="c_ashen fs_28">已邀请<span class="c_o">0</span>位好友</div>
                </div>
                <div class="jg c_o fs_32 b">￥299</div>
            </div>
        </div> -->

        <van-popup v-model="show" position="bottom">
            <div class="jiangli-popup">
                <van-cell class="input" title="图片">
                    <van-uploader multiple :preview-image="false" :before-read="newJiangpinUpImg">
                        <img v-if="newJiangpin.thumbImg" :src="newJiangpin.thumbImg" class="img" />
                        <van-button v-else type="info" size="small">上传</van-button>
                    </van-uploader>
                </van-cell>
                <van-field label="名称" placeholder="请输入名称" class="input" input-align="right" />
                <van-field label="价格" placeholder="请输入价格" class="input" type="number" input-align="right" />
                <van-field label="目标人数" placeholder="请输入目标人数" class="input" type="number" input-align="right" />
                <van-field label="库存" placeholder="请输入库存 " class="input" type="number" input-align="right" />
                <div class="mt-40 df df-r just-c-ct">
                    <van-button type="info" block>确定</van-button>
                </div>
            </div>
        </van-popup>
        
        <div class="last-time mt-40">
            <div class="fs_30 df ai-c just-c-ct">活动结束倒计时</div>
            <div class="df df-r mt-30">
                <div class="item f1">
                    <div class="num b">0</div>
                    <div class="fs_28">天</div>
                </div>
                <div class="item f1">
                    <div class="num b">00</div>
                    <div class="fs_28">时</div>
                </div>
                <div class="item f1">
                    <div class="num b">00</div>
                    <div class="fs_28">分</div>
                </div>
                <div class="item f1">
                    <div class="num b">00</div>
                    <div class="fs_28">秒</div>
                </div>
            </div>
        </div>
        <div class="paihang shadow mt-40">
            <div class="fs_36 c_33 df ai-c just-c-ct">数据排行榜</div>
            <div class="mt-10 c_33 fs_30">
                <div v-for="i in 10" :key="i" class="li df df-r ai-c">
                    <div class="f1 df df-r ai-c">
                        <div class="num fs_32 b">{{i}}</div>
                        <img src="~@/assets/test.png" class="icon" />
                        <div class="f1 one-hide">昵称昵称昵称昵称昵称昵称昵称</div>
                    </div>
                    <span>14234</span>
                </div>
            </div>
        </div>
        <div style="height:50vh"></div>
        <!-- <van-overlay show="showBeforeHb" class="df df-c just-c-end">
            <div class="before-tishi">
                <img src="~@/assets/pay/jt.png" class="img" />
                <div class="txt c_ff fs_28">请点击右上角“...”进行分享</div>
            </div>
            <div class="before-hb">
                <div class="bt active-bt df df-r ai-c c_o fs_32">
                    <van-icon name="photo-o" class="c_o fs_40 " />
                    <span class="ml-10">产品宣传海报</span>
                </div>
                <div class="bt c_33 fs_32 df ai-c just-c-ct">取消</div>
            </div>
        </van-overlay> -->
    </div>
</template>
<script>
import PageMenu from "../components/PageMenu";
import {upFile} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data(){
        return {
            showBeforeHb: false,
            arrs: [],
            show: false,
            newJiangpin:{},
        //     'price'=>价格,
        // 'title'=>奖品名称,
        // 'thumb'=>奖品图片,
        // 'stock'=>库存,
        // 'num'=>数量,
        // 'criteria_num'=>条件人数,
        }
    },
    mounted(){
        // let newdm = this.$refs.newdanmu;
        // setInterval(()=>{
        //     let div = document.createElement("div");
        //     div.setAttribute("class","dm df df-r ai-c");
        //     let img = document.createElement("img");
        //     img.src = "";
        //     img.setAttribute("class","icon");
        //     let txt = document.createElement("div");
        //     txt.setAttribute("class","txt");
        //     txt.innerHTML="哈哈还得分卡萨丁发送";
        //     div.appendChild(img);
        //     div.appendChild(txt); 
        //     newdm.appendChild(div);
        //     setTimeout(()=>{
        //         div.style.height = "0.6rem";              
        //         if(newdm.children.length>3){
        //             newdm.children[0].remove();
        //             newdm.children[1].style.bottom = "1rem";
        //             newdm.children[0].style.bottom = "2rem";
        //         }else{
        //             newdm.children[0].style.bottom = newdm.children.length-1+"rem";
        //             if(newdm.children[1]){
        //                 newdm.children[1].style.bottom = newdm.children.length-2+"rem";
        //             }
        //         }
        //     },10)
        // },2000)
    },                                          
    methods: {
        newJiangpinUpImg(file){
            console.log(file);
            let formData = new FormData();
            formData.append("file", file);
            Toast("正在上传");
            upFile(formData).then((data)=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        },
    },
    created(){
        console.log(this.$store.state);
    },
    components: {PageMenu}
}
</script>
<style scoped>
.last-time{width:6.9rem; margin-left:auto; margin-right:auto; }
.last-time .item{text-align:center;}
.last-time .item .num{font-size:0.6rem;}

/* .new-dm{width:100%; height:0px; position:fixed; bottom:1rem; left:0; border-bottom:1px solid #cccccc;}
.new-dm>>>.dm{position:absolute; bottom:0; left:0; height:0; overflow:hidden; transition:all 1s;}
.new-dm>>>.dm .icon{position:relative; width:0.6rem; height:0.6rem; border-radius:50%;}
.new-dm>>>.dm .txt{background:rgba(0,0,0,0.6); color:#ffffff; margin-left:-0.3rem; font-size:0.28rem; line-height:1; padding:0.1rem 0.2rem 0.1rem 0.4rem; margin-left:-0.3rem; border-radius:0.24rem;} */

.new-dm{width:100%; height:0px; position:fixed; bottom:1.3rem; left:0;}
.new-dm>>>.dm{position:absolute; bottom:0; left:0; height:0rem; overflow:hidden; transition:all 0.8s;}
.new-dm>>>.dm .icon{position:relative; width:0.6rem; height:0.6rem; border-radius:50%;}
.new-dm>>>.dm .txt{background:rgba(0,0,0,0.6); color:#ffffff; margin-left:-0.3rem; font-size:0.28rem; line-height:1; padding:0.1rem 0.2rem 0.1rem 0.4rem; margin-left:-0.3rem; border-radius:0.24rem;}

.jiangpin{box-sizing:border-box; width:7rem; margin-left:auto; margin-right:auto; border-radius:0.1rem; padding:0.2rem;}
.jiangpin .item{border-radius:0.1rem; overflow:hidden; border:1px solid #DDDDDD;}
.jiangpin .item .img-box{position:relative; width:1.9rem; height:1.54rem;}
.jiangpin .item .img-box img{position:absolute; top:0; left:0; width:1.9rem; height:1.54rem;}
.jiangpin .item .img-box .tag{position:absolute; top:0.16rem; left:0; background:#FF9C00; line-height:1; padding:4px 0.1rem; border-radius:0 0.2rem 0.2rem 0;}
.jiangpin .item .txt{margin:0 0.16rem;}
.jiangpin .item .jg{margin-right:0.16rem;}

.jiangli-popup{padding:0.2rem 0.4rem 0.4rem;}
.jiangli-popup .input{border-bottom:1px solid #dddddd;}
.jiangli-popup .input .img{width:0.8rem; height:0.8rem;}

.before-hb{position:relative; z-index:90; background:#ffffff; padding:0.3rem;}
.before-hb .bt{height:0.7rem; margin-bottom:0.2rem;}
.before-hb .active-bt{border:1px solid; border-radius:0.1rem; padding:0 0.3rem;}
.before-hb .tishi{position:absolute; width:3rem; right:0; top:0.1rem;}
.before-hb .tishi .img{width:3rem; height:3rem;}
.before-hb .tishi .txt{margin-left:-0.5rem;}

.paihang{box-sizing:border-box; width:6.9rem; padding:0.3rem; border-radius:0.1rem; margin-left:auto; margin-right:auto;}
.paihang .li{padding:0.2rem 0; border-bottom:1px solid #cccccc;}
.paihang .li:last-child{border-bottom:none;}
.paihang .li .num{width:0.5rem;}
.paihang .li:first-child .num{color:#FFa133; font-size:0.42rem;}
.paihang .li:nth-child(2) .num{color:#999999; font-size:0.38rem;}
.paihang .li:nth-child(3) .num{color:#E4A65A; font-size:0.34rem;}
.paihang .li .icon{width:0.6rem; height:0.6rem; border-radius:50%; margin-right:0.2rem;}

</style>
