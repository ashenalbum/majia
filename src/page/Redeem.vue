<template>
  <div id="app">
      <HeadNav></HeadNav>

    <!-- <van-nav-bar
          title="兑奖页面"
          left-text="返回"
          left-arrow
          :fixed=true
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="" slot="right" /> 
      </van-nav-bar> -->
     <!-- 订单情况 -->
        <div class="main">

          <div class="gruop">

                <div class="title">
                  <span>
                   开启兑奖页面
                  </span>
                  <span class="please_text">
                    兑奖页面是一个只有购买的用户才能打开查看的单独页面，如果用户将该页面转发给未付费活动的用户，他们点击该页面会自动跳转至活动购买页面，从而保障付费用户的专属权益！
                  </span>
                </div>

                <div class="content">
                  <!-- <van-cell title="单元格" style="border:none" is-link value="内容" @click="GoonSelect()"/>

                <van-action-sheet v-model="show" :actions="actions" @select="onSelect" /> -->
                  <van-switch :value="duijiang"  active-color="#07c160"  size="24px" @input="on_duijiang" />
                </div>
              </div>
            <div class="gruop" v-if="duijiang">
                  <div class="title">
                    <span>
                    兑奖页面内容  
                    </span>
                  </div>
                  <div class="content">
                      <!-- <el-upload
                        action="#"
                        :on-success='Onsuccess'
                        :before-upload='onBeforeUploadImage'
                        :http-request="UploadImage"
                        >
                        <el-button size="small" class="updata" type="primary" style="display:none">点击上传</el-button>
                      </el-upload>
                        <quill-editor
                          style="position:relative;top:-0.7rem;"
                          v-model="redeem_content"
                          :options="editorOption"
                          ref="QuillEditor">
                      </quill-editor> -->
                  </div>
                </div>
                <!-- <div class="gruop_bom" style="text-align:center;">
                   <van-button size="small" style="background:#e6e6e6;color:#444"  @click="No_SaveActivity()">取消</van-button>
                    <van-button  type='info'  size="small" @click="SaveActivity">保存</van-button>
               </div> -->
        </div>
  </div>
</template>
<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import HeadNav from "../components/HeadNav"; //头部菜单

// import httpConfig from "@/config/httpConfig.js";
import { Toast } from "vant";
// const toolbarOptions = [
//       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//       // ['blockquote', 'code-block'],
//       // [{'header': 1}, {'header': 2}],               // custom button values
//       // [{'list': 'ordered'}, {'list': 'bullet'}],
//       // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
//       // [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
//       // [{'direction': 'rtl'}],                         // text direction
//       // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
//       [{'header': [1, 2, 3, 4, 5, 6, false]}],
//       // [{'color': []}, {'background': []}],          // dropdown with defaults from theme
//       [{'color': []}],          // dropdown with defaults from theme
//       // [{'font': []}],
//       [{'align': []}],
//       [ 'image', ],
//       // ['clean']                                         // remove formatting button
//     ]
export default {
  name: "app",
  components: {
    // quillEditor,
    HeadNav
  },
  data() {
    return {
       show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
      ],
      active:0,
      duijiang:true,//兑奖
      redeem_content:"",
      content:"",
      Page_id:"",
       isClear: false,
        detail:"",
                // editorOption: {                
                //     modules: {
                //         toolbar: {
                //             container: toolbarOptions,  // 工具栏
                //             handlers: {
                //                 'image': function (value) {
                //                     if (value) {
                //                          document.querySelector('.updata').click()
                //                     } else {
                //                         this.quill.format('image', false);
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
    };
  },
  methods: {
    GoonSelect(){
      this.show = true;
    },
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
onBeforeUploadImage(file){
   const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        Toast('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        Toast('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M

//    var formData = new FormData();
//    formData.append("file", file);
},
UploadImage(param){
      const formData = new FormData()
      formData.append('file', param.file)
    //    this.$axios({
    //     method: "post",
    //     url: 'http://sqyx.78wa.com/public/index.php/upload/uploads/upload',
    //     data:formData,
    //     })
    //   .then(res => {
    //     var url =res.data.content.url;
    //     console.log(url)
    //     // 获取富文本组件实例
    //     // let quill = this.$refs.QuillEditor.quill
    //     // // 如果上传成功
    //     // if (res) {
    //     //     // 获取光标所在位置
    //     //     let length = quill.getSelection().index;
    //     //     // 插入图片，res为服务器返回的图片链接地址
    //     //     quill.insertEmbed(length, 'image', url)
    //     //     // 调整光标到最后
    //     //     quill.setSelection(length + 1)
    //     // } else {
    //     //     // 提示信息，需引入Message
    //     //     // Message.error('图片插入失败');
    //     // }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
},
Onsuccess(response, file, fileList){
  console.log(response)
  console.log(file)
  console.log(fileList)
},
handleSuccess () {
        // // 获取富文本组件实例
        // let quill = this.$refs.QuillEditor.quill
        // // 如果上传成功
        // if (res) {
        //     // 获取光标所在位置
        //     let length = quill.getSelection().index;
        //     // 插入图片，res为服务器返回的图片链接地址
        //     quill.insertEmbed(length, 'image', res)
        //     // 调整光标到最后
        //     quill.setSelection(length + 1)
        // } else {
        //     // 提示信息，需引入Message
        //     Message.error('图片插入失败')
        // }
    },
to_upload_img(){

  // //  var formData = new FormData();
  //     // formData.append("file", data.file);
  //     // console.log(formData);
  // //  this.$axios({
  // //     method: "post",
  // //     url: 'http://sqyx.78wa.com/public/index.php/upload/uploads/upload',
  // //     data:formData,
  // //   })
  // //     .then(res => {
  // //       console.log(res)
  // //       let value = res.data.content.url;
  // //        // 将图片添加到富文本内容区域
  // //       this.addRange = this.$refs.myQuillEditor.quill.getSelection();
  // //       // 调用编辑器的 insertEmbed 方法，插入URL
  // //       this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', value, Quill.sources.USER)  
  // //     })
  // //     .catch(err => {
  // //       console.log(err);
  // //     });
  // return new Promise((resolve,reject)=>{
  //     // 图片的远程路径
  //     let value = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583308789370&di=fe6bdc63a60b8b7f970481e9741f01bc&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg';
  //     // 将图片添加到富文本内容区域
  //     this.addRange = this.$refs.myQuillEditor.quill.getSelection();
  //     console.log(addRange)
  //     // 调用编辑器的 insertEmbed 方法，插入URL
  //     this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', value, Quill.sources.USER)   
     
  // })
},
    change(val) {
      console.log(val)
    },
   onClickLeft(){
      this.$router.go(-1); //返回上一层
   },
   onClickRight(){},
   on_duijiang(duijiang){
      this.duijiang=duijiang;
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
      console.log(editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
   SaveActivity(){
     if(this.duijiang){
        var setData={
          'is_open_redeem':1,
          'redeem_content':this.redeem_content,
           'activity_id':this.Page_id,
        }
     }else{
        /*
       var setData={
          'is_open_redeem':0,
          'redeem_content':'',
           'activity_id':this.Page_id,
        }
        */
     }
    console.log(setData)
     var that=this;
        var params = {};
        params['url'] = 'activity/Apiactivity/editActivityRedeem';
        params['param'] = setData;
        params['success'] = function(d){
            if(d.err==0){
              var that_=that;
              Toast('设置兑奖成功');
              setTimeout(function(){
                that_.$router.push({
                  path: "./activity_list"
                });
              },1000)
              
            }
        };
        // httpConfig.getJson(params);
   },
   No_SaveActivity(){
     this.redeem_content="";
   }
  },
  created: function() {
     this.Page_id = this.$route.query.Page_id;
     if(this.$route.query.is_open_redeem=='1'){
       this.duijiang=true;
     }else{
       this.duijiang=false;
       this.duijiang=true;
     }
     this.redeem_content = this.$route.query.redeem_content;
  },
  beforeRouteLeave: function(to, from, next) {
    next();
  },
  beforeRouteEnter: function(to, from, next) {
    next();
  },
  mounted() {
  },
  beforeDestroy () {
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
#app{
	background: #fff;
	/* padding:1rem 0; */
}
/* 头部开始 */
#app .van-nav-bar {
  background-color: #fff;
  z-index: 99999;
}
#app .van-nav-bar__title {
  color: #000;
  font-size:.34rem;
  font-weight:bold;
}
#app .van-nav-bar .van-icon {
  color: #000;
}
.main{
  width: 97%;
  box-sizing: border-box;
  margin: 0 auto;
  padding:1rem 0 1rem 0;
}
.gruop{
  margin: 0 auto;
}
.gruop .title{
  line-height: 0.5rem;
  font-size: 0.28rem;
}
.please_text{
  color: #999;
  font-size: 0.28rem;
}
#app>>>.van-cell{
  border: 1px solid #c2cad8;
  padding: 5px 10px;
}
/* 底部返回 */
.list_bom{
  width: 95%;
  box-sizing: border-box;
  margin: 0.4rem auto;
  text-align: center;
}
#app>>>.ql-editor{
  min-height: 7.5rem;
  box-sizing: border-box;
  padding-bottom: 0.8rem;
}
#app>>>.el-upload-list{
  display: none;
}
#app>>>.ql-toolbar.ql-snow{
  position: fixed;
  width: 100%;
  margin: 0 auto;
  bottom: 0;
  padding: 0.2rem 0;
  left: 0;
  opacity: 0.7;
  background-color: #fff;
  z-index: 999;
  box-sizing: border-box;
  /* position: fixed;
  z-index: 999;
  width: 97%;
  box-sizing: border-box;
  background-color: #fff; */
}
#app>>>.ql-container.ql-snow {
  position: relative;
  top: 1.3rem;
}
#app>>>.ql-toolbar.ql-snow + .ql-container.ql-snow{
  border: 1px solid #ccc;
}
.gruop_bom{
  width: 5rem;
  position: fixed;
  left: 50%;
  margin-left: -2.5rem;
  bottom: 0;
}
</style>