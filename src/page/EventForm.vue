<template>
    <div class="cont">
        <div class="top">
            <div class="username pl-50 df df-r ai-c">
                <img :src="userInfo.headpath" class="icon shadow" />
                <span class="txt fs_36 c_ff">{{userInfo.nickname}}</span>
            </div>
        </div>
        <div class="formbox formbox1 shadow">
            <div class="title fs_32 c_33"><span class="c_red"> *</span>活动标题</div>
            <van-field v-model="formData.title" placeholder="请输入主标题" class="form-input pl-4" />
            <van-field v-model="formData.subhead" placeholder="请输入副标题" class="form-input pl-4" />
            <div class="ttbox df df-r c_ashen">
                <span class="fs_30">上传头图：</span>
                <van-radio-group v-model="fileType" class="radio-group df df-r" checked-color="#FF9C00">
                    <van-radio :name="1" class="radio fs_24" :class="{c_o:fileType==1}">图片(750×460)</van-radio>
                    <van-radio :name="2" class="radio fs_24" :class="{c_o:fileType==2}">视频</van-radio>
                </van-radio-group>
            </div>
            <div v-if="fileType===1" class="upimgbox df df-r">
                <vuedraggable v-model="formData.head_pic_img" class="df df-r df-w-w">
                    <div v-for="(item,index) in formData.head_pic_img" :key="index" class="imgbox shadow df ai-c just-c-ct">
                        <img :src="item.pic_img" class="img" />
                        <van-icon v-if="!item.loading" @click="ttimgRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
                    </div>
                    <div class="addimg df df-c ai-c just-c-ct c_ashen" @click="showTtMould=true">
                        <van-icon name="photograph" size="0.44rem" />
                        <span class="fs_22">添加图片</span>
                    </div>
                </vuedraggable>
            </div>
            <van-field v-else v-model="formData.video_url" placeholder="请输入视频播放地址" class="video-input mb-20 pl-4" />

            <van-field label="原价" v-model="formData.price" required placeholder="请输入原价" type="number" input-align="right" class="form-input" />
            <van-field label="活动价格" v-model="formData.special_offer" required placeholder="请输入活动价格" type="number" input-align="right" class="form-input" />
            <div v-if="formData.type==1" class="guige">
                <div class="guige-label df df-r ai-c just-c-bet">
                    <div class="title fs_32 c_33 fs_14px">产品规格</div>           
                    <van-button icon="plus" size="mini" color="#FF9B00" @click="showGuige=true"></van-button>
                </div>
                <div class="guige-li c_ashen">
                    <div v-for="(item,index) in formData.spec_content" :key="index" class="li df df-r ai-c">
                        <div class=" van-ellipsis f1">规格名/{{item.name}}  原价/{{item.price}}  活动价/{{item.offerPic}}  库存/{{item.stock}}</div>
                        <van-icon name="cross" size="0.2rem" color="#ffffff" class="close" @click="delGuige(index)"/>
                    </div>
                </div>
            </div>
            <van-field label="虚拟浏览量" v-model="formData.browse_num" placeholder="请输入数量" type="number" input-align="right" class="form-input pl-4" />
            <van-field label="虚拟购买量" v-model="formData.people_buy_num" placeholder="请输入数量" type="number" input-align="right" class="form-input pl-4" />
            <van-field label="开始时间" v-model="formData.start_time" placeholder="请选择开始时间" @click="selTime('start_time')" left-icon="question-o" @click-left-icon.stop="leftIcon('starttime')" readonly input-align="right" class="form-input pl-4" />
            <van-field label="结束时间" v-model="formData.abort_time" placeholder="请选择结束时间" @click="selTime('abort_time')" left-icon="question-o" @click-left-icon.stop="leftIcon('endtime')" readonly input-align="right" class="form-input pl-4" />
            <van-field label="购买按钮文案" v-model="formData.pay_btn" placeholder="请输入，如:立即购买" left-icon="question-o" @click-left-icon.stop="leftIcon('paytxt')" input-align="right" class="pl-4" />
        </div>
        <div class="formbox formbox2 shadow">
            <van-field label="活动场景" v-model="formData.cj" required readonly placeholder="请选择活动场景" @click="cjShow=true" input-align="right" class="form-input pr-4" right-icon="arrow" />
            <van-field label="行业类型" v-model="formData.hy" required readonly placeholder="请选择行业类型" @click="hyShow=true" input-align="right" class="form-input pr-4" right-icon="arrow" />
            <van-cell class="cell form-input pl-4 pr-4">
                <template #title>
                    <div class="df df-r ai-c">
                        <van-icon name="question-o" class="cell-icon" size="16px" color="#323233" @click="leftIcon('huzhu')" />
                        <span class="custom-title">开启商家互助</span>
                    </div>
                </template>
                <van-switch v-model="merchant_help_b" @input="changeHuzhu" size="0.4rem" />
            </van-cell>
            <van-cell class="cell form-input pl-4 pr-4">
                <template #title>
                    <div class="df df-r ai-c">
                        <van-icon name="question-o" class="cell-icon" size="16px" color="#323233" @click="leftIcon('danmu')" />
                        <span class="custom-title">开启弹幕</span>
                    </div>
                </template>
                <van-switch v-model="bullet_sw_b" @change="changeDanmu" size="0.4rem" />
            </van-cell>
            <div class="title fs_32 c_33 mt-20"><span class="c_red"> *</span>活动详情</div>
            <van-sticky>
                <div class="add-btn-box">
                    <div class="w7 df df-r ai-c just-c-bet">
                        <van-button :plain="detailType!==0" @click="changeDetailType(0)" type="info" size="small">添加文字</van-button>
                        <van-button :plain="detailType!==1" @click="changeDetailType(1)" type="info" size="small">添加图片</van-button>
                        <van-button :plain="detailType!==2" @click="changeDetailType(2)" type="info" size="small">添加视频</van-button>
                    </div>
                </div>
            </van-sticky>
            <div class="detail-list mt-30">
                <div v-for="(item,index) in formData.details" :key="index">
                    <div v-if="item.type==1" class="txtbox mt-20">
                        <div class="txt c_33 fs_28">{{item.content}}</div>
                        <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
                    </div>
                    <div v-if="item.type==2" class="imgbox mt-20">
                        <img :src="item.content" class="img shadow" />
                        <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
                    </div>
                    <div v-if="item.type==3" class="videobox mt-20">
                        <video :src="item.content" controls="controls" class="video"></video>
                        <van-icon @click="detailRemove(index)" name="cross" size="0.2rem" color="#ffffff" class="close"/>
                    </div>
                    <img v-if="index < formData.details.length-1" @click="detailReverse(index)" src="~@/assets/event/reverse.png" class="reverse mt-20" />
                </div>
            </div>
            <div ref="detailbtns" class="detail-inputbox mt-30 df df-c ai-c">
                <van-field v-if="detailType===0" v-model="detailTxt" type="textarea" class="input" @blur="addDetails" @keyup.enter.native="addDetails" />
                <van-uploader v-model="detailImg" v-else-if="detailType===1" multiple :preview-image="false" :before-read="detailRead">
                    <div class="upfile fs_26 c_ashen df ai-c just-c-ct txt-c">宽度不得大于750px<br/>点击上传</div>
                </van-uploader>
                <van-field v-else v-model="detailVideo" @blur="addVideos" @keyup.enter.native="addVideos" placeholder="请输入视频播放地址" class="video-input pl-4" />
            </div>
            <!-- <van-button class="submit" type="info">确认发布</van-button> -->
        </div>
        <van-button class="fixed-submit" type="info" @click="checkForm">确认发布</van-button>
        <div ref="xuzhi" class="help fs_22 c_88">
            <div class="fs_30">购买须知：</div>
            <div v-html="formData.instructions"></div>
        </div>

        <!-- 头图模板 -->
        <van-popup v-model="showTtMould" round position="bottom">
            <div class="tt-mould">
                <div class="title df df-r ai-c just-c-bet">
                    <van-uploader v-model="imgList" :preview-image="false" multiple :before-read="beforeRead" accept="image/png, image/jpeg">
                        <van-button class="btn" size="mini" type="info"> 本地上传 </van-button>
                    </van-uploader>
                    <span class="fs_26 c_blue" @click="topMouldSelOk">确定</span>
                </div>
                <div class="imgbox mt-40">
                    <ul class="img-ul">
                        <li v-for="(item,index) in (topModel[topModelSel] && topModel[topModelSel].pics)" :key="index" @click="topModelImg=index" class="li shadow">
                            <img :src="item.thumb" class="img" />
                            <van-icon :name="topModelImg==index?'checked':'circle'" color="#FF9C00" size="0.4rem" class="check" />
                        </li>
                    </ul>
                </div>
                <div class="imgbox mt-30">
                    <ul class="img-ul">
                        <li v-for="(item,index) in topModel" :key="index" class="fl" @click="topModelSel=index;topModelImg=0" :class="{active:topModelSel==index}">{{item.title}}</li>
                    </ul>
                </div>
            </div>
        </van-popup>
        <!-- 选择场景 -->
        <van-action-sheet v-model="cjShow" :actions="cjData" @select="selCj" />
        <!-- 选择行业 -->
        <van-action-sheet v-model="hyShow" :actions="hyData" @select="selHy" />
        <!-- 选择时间 -->
        <van-popup v-model="showSelTime" position="bottom">
            <van-datetime-picker v-model="nowDate" @confirm="selTimeOk" @cancel="showSelTime=false" type="datetime"/>
        </van-popup>
        <!-- 添加规格 -->
        <van-popup v-model="showGuige" position="bottom">
            <div class="guige-popup">
                <div class="close df df-r just-c-end"><span class="c_ashen" @click="showGuige=false">关闭</span></div>
                <div class="title txt-c c_33">产品规格</div>
                <table class="table-input">
                    <tr>
                        <td class="txt-r">规格名：</td><td><input v-model="guigeData.name" /></td>
                        <td class="txt-r">原 价：</td><td><input type="number" v-model="guigeData.price" /></td>
                    </tr>
                    <tr>
                        <td class="txt-r">活动价：</td><td><input type="number" v-model="guigeData.offerPic" /></td>
                        <td class="txt-r">库 存：</td><td><input type="number" v-model="guigeData.stock" /></td>
                    </tr>
                </table>
                <div class="txt-c mt-50">
                    <van-button class="btn" color="#FF9C00" size="small" @click="addGuige">保存设置</van-button>
                </div>
            </div>
        </van-popup>
        <!-- 活动协议 -->
        <van-popup v-model="showXieyi">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showXieyi=false">
                <div class="xieyi shadow" @click.stop>
                    <div class="txt-c c_33 fs_32">发布活动协议</div>
                    <div class="mt-10 txt-box fs_26 c_ashen" v-html="xieyi"></div>
                    <div class="mt-30 df df-c ai-c">
                        <van-checkbox v-model="checkXieyi" icon-size="0.26rem" checked-color="#FC9B0A">
                            <span class="fs_26 c_ashen">阅读并同意本协议</span>
                        </van-checkbox>
                    </div>
                    <div class="mt-30 df df-c ai-c">
                        <van-button size="small" type="info" class="btn" @click="formSubmit">确认提交</van-button>
                    </div>
                </div>
                <!-- <van-icon name="close" class="close" size="0.6rem" color="#BFC4CE" /> -->
            </div>
        </van-popup>
        <!-- 提示 -->
        <van-overlay :show="showTishi">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTishi=false">
                <div class="tishi shadow" @click.stop>
                    <div class="title df df-r ai-c">
                        <van-icon name="question-o" size="0.32rem" color="#FF9C00" />
                        <div>
                            <span v-if="tishiType=='starttime'" class="fs_26 c_33 title-txt">开始时间</span>
                            <span v-else-if="tishiType=='endtime'" class="fs_26 c_33 title-txt">结束时间</span>
                            <span v-else-if="tishiType=='paytxt'" class="fs_26 c_33 title-txt">购买按钮文案</span>
                            <span v-else-if="tishiType=='danmu'" class="fs_26 c_33 title-txt">数据弹幕</span>
                            <span v-else-if="tishiType=='huzhu'" class="fs_26 c_33 title-txt">商家互助</span>
                        </div>
                    </div>
                    <div class="tishi-body fs_24 c_ashen">
                        <div v-if="tishiType=='starttime'" class="t-indent">活动上线后，活动价开始时间，未开始之前，产品价格为原价。</div>
                        <div v-else-if="tishiType=='endtime'" class="t-indent" >活动上线后，活动价结束时间，结束之后，产品价格恢复为原价。</div>
                        <div v-else-if="tishiType=='paytxt'" class="df df-r ai-c">
                            <img src="~@/assets/event/btn_txt.png" class="img" />
                            <p class="t-indent f1">按钮提示文字</p>
                        </div>
                        <div v-else-if="tishiType=='danmu'" class="df df-r ai-c">
                            <img src="~@/assets/event/danmu.png" class="img" />
                            <p class="t-indent f1">活动的实时数据以滚动的形式，展示在活动头图的位置</p>
                        </div>
                        <div v-else-if="tishiType=='huzhu'" class="df df-r ai-c">
                            <img src="~@/assets/event/huzhu.png" class="img" />
                            <p class="t-indent f1">以广告的形式，将其他商家的活动投放在活动详情页中。开启互助后，会给予引流，引流所产生的利润，</p>
                        </div>
                    </div>
                </div>
                <van-icon name="cross" class="mt-40 close" size="0.4rem" color="#ffffff" />
            </div>
        </van-overlay>
        <!-- 提交完成提示 -->
        <van-overlay :show="showTj">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTj=false">
                <div class="tj-ok df df-c ai-c" @click.stop>
                    <img src="~@/assets/event/submit_title.png" class="img" />
                    <div class="mt-30 c_33 fs_28">活动发布请求已提交</div>
                    <div class="mt-20 c_o fs_28 b">等待审核</div>
                    <van-button type="info" size="small" class="btn" @click="toDistb">前去开启分销</van-button>
                </div>
                <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" />
            </div>
        </van-overlay>
    </div>
</template>
<script>
import {Toast,Dialog} from "vant";
import {upFile} from "../utils/axios";
import axios from "../utils/axios";
import vuedraggable from 'vuedraggable';

export default {
    components: {vuedraggable},
    data(){
        return {
            id: null,
            isEdit: false,
            // 选择头图
            showTtMould: false,
            ttType: 0,
            ttImgid: 0,
            topModel: [],
            topModelSel:0,
            topModelImg:0,
            // 选择时间
            nowDate: new Date(),
            focusName: "",
            showSelTime: false,
            // 选择规格
            showGuige: false,
            guigeData: { name: "", price: "", offerPic: "", stock: ""},
            // 协议
            showXieyi: false,
            checkXieyi: false,
            xieyi:"",
            // 提示
            showTishi: false,
            tishiType: "",
            // 提交完成
            showTj: false,
            // 选择场景
            cjShow: false,
            cjData:[],
            // 选择行业
            hyShow: false,
            hyData:[],

            fileType: 1, //头图类型
            imgList: [], //头图列表
            detailType: 0, //活动，文字/图片/视频
            detailImg: [], //详情上传图片
            detailTxt: "",
            detailVideo: "", 

            userInfo: {}, // 用户信息
            merchant_help_b: false,
            bullet_sw_b: false,
            formData: {
                title: "", //标题
                subhead: "", //副标题
                price: "", //原价
                special_offer: "", //活动价
                cj: "", //场景
                hy: "", //行业
                head_pic_img: [],//头图
                head_pic: [], //头图id
                huzhu: false, //商家互助
                danmu: false, //弹幕
                startTime: "", //开始时间
                endTime: "", //结束时间
                details: [], //详情
                spec_content: [], //规格
            },
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.isEdit = this.$route.query.isEdit;
        this.getData();
        this.getHy();
        this.getCj();
        this.getXieyi();
        this.getTopImg();
    },
    methods: {
        // 提交表单
        checkForm(){
            let testUrl = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
            let videoText = /\.mp4$/;
            let data = this.formData;
            let testArr = [
                {b:/^\s*$/.test(data.title), t:"请输入标题"},
                // {b:/^\s*$/.test(data.subhead), t:"请输入副标题"},
                {b:data.head_pic_img.length==0, t:"请上传头图"},
                {b:data.video_url!=""&&(!testUrl.test(data.video_url)), t:"视频路径格式有误"},
                {b:data.video_url!=""&&(!videoText.test(data.video_url)), t:"视频格式只能为mp4"},
                {b:/^\s*$/.test(data.price), t:"请输入原价"},
                {b:/^\s*$/.test(data.special_offer), t:"请输入活动价"},
                {b:data.scene===undefined, t:"请选择活动场景"},
                {b:data.genre_id===undefined, t:"请选择行业类型"},
                {b:data.details.length==0, t:"请填写活动详情"},
            ];
            for(let i in testArr){if(testArr[i]['b']){Toast(testArr[i]['t']);return}}
            this.showXieyi = true;
        },
        // 提交表单
        formSubmit(){
            if(!this.checkXieyi){Toast("请确认已阅读并同意活动协议");return}
            this.showXieyi = false;
            let url = this.isEdit?"/activity/Apiactivity/editActivity":"/activity/Apiactivity/addActivity";
            this.formData.activity_id = this.formData.id;
            delete this.formData.id;
            
            axios({
                url: url,
                method: "post",
                data: {
                    source_template: this.id,
                    ...this.formData,
                }
            }).then((data)=>{
                if(data.err!=0){return}
                this.showTj = true;
            }).catch(()=>{Toast("error")});
        },
        // 获取内容
        getData(){
            axios({
                url: "/activity/Apiactivity/previewTemplateInfo",
                params: {activity_id: this.id}
            }).then((data)=>{
                if(data.err!=0){return}
                this.formData = data.data;
                if(typeof this.formData.start_time=="number"){
                    this.formData.start_time = this.setTime(this.formData.start_time);
                }
                if(typeof this.formData.abort_time=="number"){
                    this.formData.abort_time = this.setTime(this.formData.abort_time);
                }
                this.userInfo = data.userinfo;
                if(this.hyData.length){this.fillSheet(this.formData.genre_id,this.hyData,"hy")}
                if(this.cjData.length){this.fillSheet(this.formData.scene,this.cjData,"cj")}
                this.merchant_help_b = Boolean(this.formData.merchant_help);
                this.bullet_sw_b = Boolean(this.formData.bullet_sw);
                let head_pic = [];
                for(let i in data.data.head_pic_img){
                    head_pic.push(data.data.head_pic_img[i].pic);
                }
                this.formData.head_pic = head_pic;
            });
        },
        // 获取行业
        getHy(){
            axios({
                url: "/activity/Apiactivity/getIndustryType"
            }).then((data)=>{
                if(data.err!=0){return}
                let arr = [];
                for(let i in data.data){ arr.push({id:Number(i), name:data.data[i]}) }
                this.hyData = arr;
                if(this.formData.genre_id !== undefined){
                    this.fillSheet(this.formData.genre_id,this.hyData,"hy");
                }
            });
        },
        // 获取场景
        getCj(){
            axios({
                url: "/activity/Apiactivity/sceneAcquisition"
            }).then((data)=>{
                if(data.err!=0){return}
                this.cjData = data.data;
                if(this.formData.scene !== undefined){
                    this.fillSheet(this.formData.scene,this.cjData,"cj");
                }
            });
        },
        // 填充选择
        fillSheet(id,arr,name){
            for(let i in arr){
                if(arr[i].id != id){continue;}
                this.formData[name] = arr[i].name;
                return;
            }
        },
        // 获取协议
        getXieyi(){
            axios({
                url: "/activity/Apiactivity/getInstructions"
            }).then((data)=>{
                if(data.err!=0){return}
                this.xieyi = data.content;
            });
        },
        // 获取头图分类
        getTopImg(){
            axios({
                url: "/activity/Apiactivity/activityHeadpicClass"
            }).then((data)=>{
                if(data.err!=0){return}
                this.topModel = data.data;
            });
        },
        // 删除头图
        ttimgRemove(id){
            Dialog.confirm({
                message: '确定删除该图片吗？'
            }).then(() => {
                this.formData.head_pic_img.splice(id,1);
                this.formData.head_pic.splice(id,1);
            }).catch(() => {});
        },
        // 添加规格
        addGuige(){
            this.formData.spec_content.push({...this.guigeData});
            this.showGuige = false;
        },
        // 删除规格
        delGuige(id){
            Dialog.confirm({
                message: '确定删除该规格吗？'
            }).then(() => {
                this.formData.spec_content.splice(id,1);
            }).catch(() => {});
        },
        // 选择场景
        selCj(o){
            this.cjShow = false;
            this.formData.cj = o.name;
            this.formData.scene = o.id;
        },
        // 选择行业
        selHy(o){
            this.hyShow = false;
            this.formData.hy = o.name;
            this.formData.genre_id = o.id;
        },
        // 商家互助
        changeHuzhu(b){this.formData.merchant_help = b?1:0},
        // 弹幕
        changeDanmu(b){this.formData.bullet_sw = b?1:0},
        // 活动详情交换
        detailReverse(index){
            this.formData.details[index] = this.formData.details.splice(index+1, 1, this.formData.details[index])[0];
        },
        // 活动详情删除
        detailRemove(index){
            Dialog.confirm({
                message: '确定删除该内容吗？'
            }).then(() => {
                this.formData.details.splice(index,1);
            }).catch(() => {});
        },
        // 选择时间
        selTime(name){
            this.showSelTime = true;
            this.focusName = name;
        },
        // 确定选择时间
        selTimeOk(date){
            this.showSelTime = false;
            this.formData[this.focusName] = date.toISOString().slice(0,10) + " " + date.toTimeString().slice(0,5);
        },
        // 格式化时间
        setTime(time){
            let date = new Date(time*1000);
            let ymd = date.toISOString().slice(0,10);
            let hm = date.toTimeString().slice(0,5);
            return ymd + " " + hm;
        },
        // 切换内容类型
        changeDetailType(id){
            this.detailType = id;
            this.$refs.detailbtns.scrollIntoView();
        },
        // 添加文字内容
        addDetails(){
            if(/^\s*$/.test(this.detailTxt)){return}
            this.formData.details.push({type:1, content:this.detailTxt});
            this.detailTxt = "";
            this.$refs.xuzhi.scrollIntoView();
        },
        // 添加视频内容
        addVideos(){
            if(/^\s*$/.test(this.detailVideo)){return}
            let testUrl = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
            let videoText = /\.mp4$/;
            if(!testUrl.test(this.detailVideo)){Toast("视频路径格式有误");return}
            if(!videoText.test(this.detailVideo)){Toast("视频格式只能为mp4");return}
            this.formData.details.push({type:3, content:this.detailVideo});
            this.detailVideo = "";
            this.$refs.xuzhi.scrollIntoView();
        },
        // 上传图片
        upImg(file){
            let data = new FormData();
            data.append("file",file);
            return upFile(data);
        },
        // 本地上传头图
        beforeRead(file){
            this.showTtMould = false;
            Toast("正在上传");
            if(file instanceof Array){
                for(let i in file){                    
                    this.upImg(file[i]).then((data)=>{
                        if(data.data.err!=0){return}
                        Toast("上传成功")
                        this.formData.head_pic_img.push({pic_img: data.data.content.url});
                        this.formData.head_pic.push(data.data.content.fileid);
                    })
                }
            } else {
                this.upImg(file).then((data)=>{
                    if(data.data.err!=0){return}
                    Toast("上传成功");
                    this.formData.head_pic_img.push({pic_img: data.data.content.url});
                    this.formData.head_pic.push(data.data.content.fileid);
                })
            }
        },
        // 选择头图完成
        topMouldSelOk(){
            this.showTtMould = false;
            this.formData.head_pic_img.push({pic_img: this.topModel[this.topModelSel]['pics'][this.topModelImg]['thumb']});
            this.formData.head_pic.push(this.topModel[this.topModelSel]['pics'][this.topModelImg]['id']);
            this.topModelSel = 0;
            this.topModelImg = 0;
        },
        // 添加内容
        detailRead(file){
            Toast("正在上传");
            if(file instanceof Array){
                for(let i in file){                    
                    this.upImg(file[i]).then((data)=>{
                        if(data.data.err!=0){return}
                        Toast("上传成功")
                        this.formData.details.push({type:2, content: data.data.content.url});
                        this.$refs.xuzhi.scrollIntoView();
                    })
                }
            } else {
                this.upImg(file).then((data)=>{
                    if(data.data.err!=0){return}
                    Toast("上传成功");
                    this.formData.details.push({type:2, content: data.data.content.url});
                    this.$refs.xuzhi.scrollIntoView();
                })
            }
        },
        // 显示帮助
        leftIcon(type){
            this.showTishi = true;
            this.tishiType = type;
        },
        // 前去分销
        toDistb(){
            this.$router.push({path:"/distb_set", query:{id:this.id}});
        }
    }
}
</script>
<style scoped>
.w_62{width:6.2rem; margin-left:auto; margin-right:auto;}
.fs_14px{font-size:14px;}
.cont{background:#F6F5F8;}
.top{height:3rem; background:#2E8AF6; }
.top .username{padding-top:0.74rem;}
.top .username .icon{width:0.98rem; height:0.98rem; border-radius:50%; }
.top .username .txt{padding-left:0.26rem;}

.formbox{box-sizing:border-box; width:7rem; padding:0.4rem 0.4rem 0.2rem; margin-left:auto; margin-right:auto; background:#ffffff; border-radius:0.1rem;}
.formbox1{margin-top:-0.96rem;}
.formbox2{margin-top:0.3rem;}

.formbox .title{line-height:1;}

.form-input{border-bottom:1px solid #E2E6F1;}
.video-input{border:1px solid #E2E6F1; padding:6px 4px;}
.pl-4{padding-left:4px;}
.pr-4{padding-right:4px;}
.mb-20{margin-bottom:0.2rem;}
.cell .van-cell__value{line-height:1;}
.cell .cell-icon{margin-right:5px;}

.tt-mould{padding:0.4rem 0;}
.tt-mould .title{padding:0 0.4rem;}
.tt-mould .title .btn{padding:0 4px;}
.tt-mould .imgbox{width:100%; overflow-x:auto; overflow-y:hidden;}
.tt-mould .imgbox .img-ul{position:relative; white-space: nowrap; padding:0.1rem;}
.tt-mould .imgbox .img-ul .li{position:relative; display:inline-block; margin:0 0.2rem; width:1.64rem; height:2.32rem; }
.tt-mould .imgbox .img-ul .li .img{width:100%; height:100%;}
.tt-mould .imgbox .img-ul .li .check{box-sizing:border-box; position:absolute; right:0.1rem; top:0.1rem;}
.tt-mould .imgbox .img-ul .fl{display:inline-block;padding:0.1rem; margin:0 0.1rem;}
.tt-mould .imgbox .img-ul .fl.active{background:#FF9C00; color:#ffffff;}

.guige{padding-top:10px; border-bottom:1px solid #E2E6F1;}
.guige .guige-label{padding: 0 4px;}
.guige .guige-li{margin-top:10px; font-size:14px;}
.guige .guige-li .li{padding-bottom:0.3rem;}
.guige .guige-li .close{padding:0.1rem; background:#D1D6E5; border-radius:50%;}

.guige-popup{padding:0.2rem 0.5rem 0.5rem;}
.guige-popup .title{padding-bottom:16px; border-bottom:1px solid #C7CDDF;}
.guige-popup .table-input{width:100%; font-size:14px;}
.guige-popup .table-input td{padding:10px 0 0;}
.guige-popup .table-input input{padding:2px; width:1.8rem; border:1px solid #BBC1D4;}
.guige-popup .btn{width:4.6rem;}

.upimgbox{padding:0.2rem 0; flex-wrap:wrap;}
.upimgbox .imgbox{position:relative; width:1.8rem; height:1.1rem; margin:0 0.26rem 0.26rem 0;}
.upimgbox .imgbox .close{position:absolute; z-index:59; top:-0.2rem; right:-0.2rem; padding:0.1rem; background:#D1D6E5; border-radius:50%;}
.upimgbox .addimg,
.upimgbox .img{width:1.8rem; height:1.1rem;}
.upimgbox .addimg{box-sizing:border-box; border:1px dashed;}

.add-btn-box{padding:0.1rem 0; background-color:#ffffff;}
.add-btn-box .w7{max-width:6.2rem;margin:auto;}

.detail-list .close{position:absolute; top:-0.2rem; right:-0.2rem; padding:0.1rem; background:#D1D6E5; border-radius:50%;}
.detail-list .reverse{width:0.44rem; height:auto; }
.detail-list .txtbox{position:relative;border:1px solid #D1D6E5;}
.detail-list .txtbox .txt{padding:4px;}
.detail-list .imgbox{position:relative; width:100%; margin-left:auto; margin-right:auto;}
.detail-list .videobox{position:relative; width:100%; height:3.2rem; margin-left:auto; margin-right:auto;}
.detail-list .imgbox .img{width:100%;}
.detail-list .videobox .video{width:100%; height:100%; background:#000;}
.detail-inputbox .input{border:1px solid #CCD0DD;}
.detail-inputbox .upfile{border:1px solid #CCD0DD; width:4.82rem; height:2.1rem;}

.ttbox{padding:0.4rem 0 0.2rem;}
.ttbox .radio-group{padding-left:0.2rem;}
.ttbox .radio-group .radio{padding-right:0.3rem;}

.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}

.help{width:6.4rem; margin:auto; padding:0.3rem 0 0.6rem; line-height:1.6;}

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.wrapper .tishi{box-sizing:border-box; width:6.9rem; padding:0.5rem 0.5rem 0.3rem; border-radius:0.1rem; background:#ffffff;}
.wrapper .xieyi{box-sizing:border-box; width:6.9rem; padding:0.5rem 0.5rem 0.3rem; border-radius:0.1rem;}
.wrapper .xieyi .txt-box{height:7rem; overflow-x:hidden; overflow-y:scroll; -webkit-overflow-scrolling:touch}
.wrapper .xieyi .btn{width:3.2rem; margin-bottom:0.1rem;}

.wrapper .tishi .title{padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.wrapper .tishi .title .title-txt{padding-left:0.2rem;}
.wrapper .tishi .tishi-body{padding-top:0.2rem;}
.wrapper .tishi .tishi-body .img{width:3rem; height:1.68rem; margin-right:0.2rem;}

.wrapper .tj-ok{width:5.2rem; border-radius:0.1rem; background:#ffffff; overflow:hidden;}
.wrapper .tj-ok .img{width:100%; height:auto;}
.wrapper .tj-ok .btn{margin:0.3rem 0;width:4.4rem;}
.fixed-submit{width:auto;}
</style>
