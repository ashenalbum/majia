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

        <van-uploader :before-read="beforeRead" />
        <PageMenu></PageMenu>
        
        <div ref="newdanmu" class="new-dm"></div>
    </div>
</template>
<script>
import PageMenu from "../components/PageMenu";
import {upFile} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data(){
        return {
            arrs: [],
        }
    },
    mounted(){
        let newdm = this.$refs.newdanmu;
        setInterval(()=>{
            let div = document.createElement("div");
            div.setAttribute("class","dm df df-r ai-c");
            let img = document.createElement("img");
            img.src = "";
            img.setAttribute("class","icon");
            let txt = document.createElement("div");
            txt.setAttribute("class","txt");
            txt.innerHTML="哈哈还得分卡萨丁发送";
            div.appendChild(img);
            div.appendChild(txt); 
            newdm.appendChild(div);
            setTimeout(()=>{
                div.style.height = "0.6rem";              
                if(newdm.children.length>3){
                    newdm.children[0].remove();
                    newdm.children[1].style.bottom = "1rem";
                    newdm.children[0].style.bottom = "2rem";
                }else{
                    newdm.children[0].style.bottom = newdm.children.length-1+"rem";
                    if(newdm.children[1]){
                        newdm.children[1].style.bottom = newdm.children.length-2+"rem";
                    }
                }
            },10)
        },2000)
    },
    methods: {
        beforeRead(file){
            console.log(file);
            let formData = new FormData();
            formData.append("file", file);
            Toast("正在上传");
            upFile(formData).then((data)=>{
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        console.log(this.$store.state);
    },
    components: {PageMenu}
}
</script>
<style scoped>
/* .new-dm{width:100%; height:0px; position:fixed; bottom:1rem; left:0; border-bottom:1px solid #cccccc;}
.new-dm>>>.dm{position:absolute; bottom:0; left:0; height:0; overflow:hidden; transition:all 1s;}
.new-dm>>>.dm .icon{position:relative; width:0.6rem; height:0.6rem; border-radius:50%;}
.new-dm>>>.dm .txt{background:rgba(0,0,0,0.6); color:#ffffff; margin-left:-0.3rem; font-size:0.28rem; line-height:1; padding:0.1rem 0.2rem 0.1rem 0.4rem; margin-left:-0.3rem; border-radius:0.24rem;} */

.new-dm{width:100%; height:0px; position:fixed; bottom:1.3rem; left:0;}
.new-dm>>>.dm{position:absolute; bottom:0; left:0; height:0rem; overflow:hidden; transition:all 0.8s;}
.new-dm>>>.dm .icon{position:relative; width:0.6rem; height:0.6rem; border-radius:50%;}
.new-dm>>>.dm .txt{background:rgba(0,0,0,0.6); color:#ffffff; margin-left:-0.3rem; font-size:0.28rem; line-height:1; padding:0.1rem 0.2rem 0.1rem 0.4rem; margin-left:-0.3rem; border-radius:0.24rem;}

</style>
