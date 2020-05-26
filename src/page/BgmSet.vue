<template>
    <div class="cont df df-c">
        <div class="top-box df df-r ai-c just-c-bet">
            <div class="now c_blue fs_28" @click="selBgm?changeAudio(selBgm):''">当前选择：{{selBgm?selBgm.title:"无"}}</div>
            <van-button type="info" icon="plus" size="small" @click="add">添加</van-button>
        </div>
        <div class="f1 df df-c list-box">
            <ul class="list f1">
                <li v-for="(item,index) in dataList" :key="index" class="df df-r ai-c just-c-bet" @click="changeAudio(item)">
                    <div class="f1">
                        <div class="fs_30 c_66 one-hide">{{item.title}}</div>
                        <div class="mt-10 fs_22 c_99">{{item.addtime}}</div>
                    </div>
                    <div class="btns df df-r ai-c">
                        <span v-if="item.is_true" class="edit-btn fs_28 c_blue" @click.stop="edit(item)">修改</span>
                        <span v-if="selBgm && selBgm.id===item.id" class="c_red1 fs_28">已选择</span>
                        <span v-else class="c_blue fs_28" @click.stop="selOk(item)">确认选择</span>
                        <!-- <van-button v-else color="#1989fa" size="small" @click.stop="selBgm=item">确认选择</van-button> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="player-box shadow">
            <div class="slider-box">
                <van-slider v-model="slider_val" @change="onChange" active-color="#1989fa" inactive-color="#a3d0fd" bar-height="0.12rem">
                    <template #button><div class="hk"></div></template>
                </van-slider>
            </div>
            <div class="mt-20 df df-r ai-c">
                <van-icon class="play-btn c_blue" :name="play?'pause-circle-o':'play-circle-o'"  @click="playAudio"/>
                <div class="time c_99">{{s2m(currentTime)}} / {{s2m(duration)}}</div>
                <van-notice-bar class="f1 c_66" background="#ffffff" color="#666666" :text="duration?audioTitle:''"/>
            </div>
        </div>
        <van-overlay :show="showForm" class="df df-c ai-c just-c-ct">
            <div class="form-box shadow">
                <div class="field mt-10 df df-r ai-c">
                    <div class="label">音乐名称</div>
                    <input class="f1" type="text" v-model="formData.title" placeholder="请输入名称"  />
                </div>
                <div class="field mt-10 df df-r ai-c">
                    <div class="label">文件上传</div>
                    <div class="f1 template one-hide">
                        <van-uploader accept="audio/mp3" :before-read="beforeRead" :preview-image="false" class="f1">
                            <span v-if="formData.filename||formData.url" class="fs_28 one-hied c_66">{{formData.filename||formData.url.match(/[^/\/]+$/)[0]}}</span>
                            <span v-else class="fs_28 c_blue">
                                <span class="txt-line">上传文件</span>
                                <span class="fs_24 c_aa">（文件格式.mp3）</span>
                            </span>
                        </van-uploader>
                    </div>
                </div>
                

                <!-- <van-field v-model="formData.title" class="field mt-10" label="音乐名称" placeholder="请输入名称" label-width="64px" />
                <van-cell title="文件上传" class="field mt-10 one-hide" label-width="64px" title-style="width:64px;flex:none;">
                        <div class="template one-hide">
                            <van-uploader accept="audio/mp3" :before-read="beforeRead" :preview-image="false" class="f1">
                                <span v-if="formData.filename||formData.url" class="fs_28 one-hied c_66">{{formData.filename||formData.url.match(/[^/\/]+$/)[0]}}</span>
                                <span v-else class="fs_28 c_blue">
                                    <span class="txt-line">上传文件</span>
                                    <span class="fs_24 c_aa">（文件格式.mp3）</span>
                                </span>
                            </van-uploader>
                        </div>
                </van-cell> -->
                <button class="mt-30 form-btn c_ff" @click="submitForm">确定</button>
            </div>
            <van-icon name="close" class="mt-50 fs_60 c_ff" @click="showForm=false" />
        </van-overlay>
        <audio ref="audio" :src="audioSrc" loop />
    </div>
</template>
<script>
import axios from "../utils/axios";
import {upMp3} from "../utils/axios";
import { Toast } from 'vant';

export default {
    data(){
        return {
            id: null,
            selBgm: null,
            dataList: [],
            myAudio: null, 
            audioSrc: "",
            audioTitle: "",
            playid: null,
			play: false, // 播放
			currentTime: 0, // 播放时长
			duration: 0, // 音频时长
            slider_val: 0,

            formEdit: false,
            formData: {},
            showForm: false,
            upFileToast: null,
        }
    },
    destroyed(){
        if(this.upFileToast){this.upFileToast.clear();}
    },
    mounted(){
        this.id = this.$route.query.id;
        this.myAudio = this.$refs.audio;
        this.myAudio.addEventListener("canplay",this.audioInit);
        this.myAudio.addEventListener("error",()=>{this.audioSrc && Toast("音乐加载出错了")});
        this.playInterval();
        this.getData();
    },
    methods: {
        getData(){
            axios({
                url: "/activity/Apiactivity/music_list",
            }).then((data)=>{
                if(data.err!==0){return}
                this.dataList = data.data;
            });
            axios({
                url: "/activity/Apiactivity/activity_music_info",
                params: {activity_id: this.id},
            }).then((data)=>{
                if(data.err!==0 || !data.data || !data.data.url){return;}
                this.selBgm = data.data;
            })
        },
        // 确定选择
        selOk(item){
            axios({
                url: "/activity/Apiactivity/editActivity",
                params: {activity_id:this.id, back_id:item.id},
            }).then((data)=>{
                if(data.err!==0){return}
                Toast("设置成功");
                this.selBgm = item;
            });
        },
        // 上传音乐
        beforeRead(file){
            this.upFileToast = Toast.loading({
                message: "正在上传，请稍候...",
                forbidClick: true,
                duration: 0,
            });
            let fd = new FormData();
            fd.append("file",file);
            // data.append("savename",file.file.name);
            
            upMp3(fd).then((res)=>{
                let data = res.data;
                this.upFileToast && this.upFileToast.clear();
                if(data.err!=0){return}
                Toast("上传成功");
                this.$set(this.formData, 'update_id', data.content.fileid);
                this.$set(this.formData, 'filename', data.content.filename);
            }).catch(()=>{
                this.upFileToast && this.upFileToast.clear();
            })
        },
        // 提交表单
        submitForm(){
            if(!this.formData.title){Toast("请输入音乐名称");return}
            if(!this.formData.update_id){Toast("请上传音乐文件");return}
            let url = this.formEdit?"/activity/Apiactivity/music_edit":"/activity/Apiactivity/music_add";
            axios({
                url: url,
                params: this.formData,
            }).then((data)=>{
                if(data.err!==0){return}
                Toast("操作成功");
                this.getData();
                this.showForm = false;
            }).catch(()=>{
                Toast("error");
            });
        },
        // 添加
        add(){
            this.formEdit = false;
            this.formData = {};
            this.showForm = true;
        },
        // 修改
        edit(item){
            this.formEdit = true;
            this.formData = item;
            this.showForm = true;
        },
        // 播放定时器
        playInterval(){
            setInterval(()=>{
                if(!this.play || !this.duration){return;}
                this.currentTime = this.myAudio.currentTime;
                this.slider_val = this.currentTime / this.duration * 100;
            },100);
        },
        // 切换音乐
        changeAudio(item){
            if(item.id===this.playid){return}
            this.playid = item.id;
            this.duration = 0;
            this.currentTime = 0;
            this.slider_val = 0;
            
            this.audioSrc = item.url;
            this.audioTitle = item.title;
            this.myAudio.load();
            setTimeout(()=>{
                this.play = true;
                this.myAudio.play();
            },10)
        },
        // 音乐加载完成
        audioInit(){
            this.currentTime = this.myAudio.currentTime;
            this.duration = parseInt(this.myAudio.duration);
        },
        // 点击播放暂停
        playAudio(){
            if(!this.duration){return}
            this.play = !this.play;
            if(this.play){
                this.myAudio.play();
            }else{
                this.myAudio.pause();
            }
        },
        // 设置播放进度
        onChange(val){
            if(!this.duration){return;}
            this.currentTime = this.duration*val/100;
			this.myAudio.currentTime = this.currentTime;
        },
        // 秒 to 分
		s2m(time){
			let m = Math.floor(time/60);
			let s = Math.floor(time%60);
			m = m<10? "0"+m: m;
			s = s<10? "0"+s: s;
			return m + ":" + s;
		},
    }
}
</script>
<style scoped>
.txt-line{text-decoration:underline;}
.cont{box-sizing:border-box; height:100%;}
.top-box{padding:0.2rem 0.3rem;}
.list-box{border-top:1px solid #dddddd; overflow-y:auto;}
.list{padding:0 0.4rem;}
.list li{padding:0.1rem 0; border-bottom:1px solid #dddddd; cursor:pointer;}
.list li:last-child{border:none;}
.list li .btns{margin-left:0.2rem;}
.list li .edit-btn{margin-right:0.2rem;}

.player-box{padding:0.3rem 0.3rem 0.4rem;}
.slider-box{padding:0.2rem 0.1rem;}
.slider-box .hk{width:0.4rem; height:0.4rem; border:1px solid #a3d0fd; border-radius:50%; background:#ffffff; box-shadow:0 0 10px 0 #a3d0fd;}
.play-btn{font-size:0.8rem; width:0.8rem; height:0.8rem; border-radius:50%; margin-right:0.2rem;}

.fs_60{font-size:0.6rem;}
.form-box{width:6.2rem; padding:0.3rem; background:#ffffff; border-radius:0.2rem;}
.form-box .form-btn{box-sizing:border-box; width:100%; height:36px; background:#1989fa; border:none; outline:none; border-radius:6px;}
.form-box .label{padding-right:10px;}
.form-box .field{padding:0.2rem 0; font-size:14px;}
.form-box .field input{height:24px; padding:0; outline:0; border:0;}
</style>
