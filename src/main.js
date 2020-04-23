import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { Tabbar, Sidebar, ImagePreview, Overlay, Slider, Stepper, DatetimePicker, NoticeBar, Dialog, Notify, Grid, Loading, Image, GridItem, Uploader, SidebarItem, TabbarItem, Cell, AddressEdit, Area, List, CellGroup, Swipe, SwipeItem, PullRefresh, AddressList, Tab, Tabs, Button, Icon, Popup, Checkbox, CheckboxGroup, Field, RadioGroup, Tag, Radio, Search, Switch, SwipeCell, Toast, NavBar, Picker, ActionSheet, Sticky, Col, Row} from 'vant';
import 'vant/lib/index.css';
import axios from './utils/axios';
import wx from 'weixin-js-sdk';
import './static/reset.css';
import { Base64 } from 'js-base64';

Vue.use(Tabbar).use(TabbarItem).use(Overlay).use(ImagePreview).use(Stepper).use(DatetimePicker).use(Slider).use(NoticeBar).use(Notify).use(Loading).use(Dialog).use(Image).use(Grid).use(GridItem).use(Uploader).use(Sidebar).use(SidebarItem).use(Cell).use(Area).use(AddressEdit).use(List).use(CellGroup).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Button).use(Icon).use(Popup).use(Checkbox).use(CheckboxGroup).use(Field).use(RadioGroup).use(Radio).use(Search).use(Switch).use(PullRefresh).use(SwipeCell).use(Toast).use(NavBar).use(Tag).use(AddressList).use(Picker).use(ActionSheet).use(Sticky).use(Col).use(Row);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

// 测试 token 删除 1049
// axios({
//     url: "/activity/index1111/get_param",
// }).then((data)=>{
//     window.localStorage.setItem("token",JSON.stringify(data));
//     store.commit("setToken",JSON.parse(window.localStorage.getItem("token")));
// })

function GetUrl(Data) {
    if (!Data) {return params;}
    var param = Data.split("&");
    var paramArray = [];
    var params = {};
    for (var i = 0; i < param.length; i++) {
        if (param[i]) {
            paramArray = param[i].split('=');
            if (paramArray[0] != 'url') {
                params[paramArray[0]] = paramArray[1]
            }else {
                params[paramArray[0]] = decodeURIComponent(decodeURIComponent(paramArray[1]))
            }
        }
    }
    return params;
}
function hideSearch(){
    let hash = window.location.href.split("#")[1];
    // 1049
    // let url = "appid=0eeb7ac1db55d365f37175667e6dc80603b0d838&cowcms_userid=966661bd874db1cacac4bf36919d9646&sign=71f7b828a84fb995cc8ec4e54e6025e4dcb52be9&timestamp=1586570044&nonceStr=3dhOye";
    if((!hash) || hash.indexOf("?")==-1){return}
    let url = hash.split("?")[1];

    var data = GetUrl(url);            
    if(data.appid){
        let o = {
            appid: data.appid,
            cowcms_userid: data.cowcms_userid,
            sign: data.sign,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
        }
        localStorage.setItem("token",JSON.stringify(o));
    }
    
    if (data.share) {
        let share_url = window.baseUrl + Base64.decode(data.share.replace('%3D', '='));
        localStorage.setItem("share_url", share_url);
    }
}
// url
hideSearch();

// localStorage 储存 vuex
store.commit("setToken",JSON.parse(window.localStorage.getItem("token")));


// 跳转路由
router.beforeEach(function (to, from, next) {
    let share = to.query.share || from.query.share;
    if (share) {
        let share_url = window.baseUrl + Base64.decode(share.replace('%3D', '='));
        localStorage.setItem("share_url", share_url);
    }
    // 判断微信
    let is_weixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
    if(is_weixin){ wxConfig(to.query.id || "") }

    let titlePage = [];
    if(is_weixin==false && titlePage.indexOf(to.name)>-1){to.meta.showHeader = true;}
    else{to.meta.showHeader = false;}

    window.scrollTo(0,0);
    next();
})

// 微信config
function wxConfig(){
    let location = window.location.href;
    axios({
        url: "/wechat/Apiwechat/get_wx_config",
        params: {request_url: location.split('#')[0]}
    }).then((data)=>{
        if(data.err!=0){return}
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名
            jsApiList: [// 必填，需要使用的JS接口列表
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'chooseWXPay',
                'scanQRCode',
            ]
        });
        wx.ready(() => {
            axios({
                url: "/activity/Apiactivity/sharing_getInfo",
                // params: {id: Page_id}
            }).then((data)=>{
                if(data.err!=0){return;}
                //分享朋友圈
                wx.onMenuShareTimeline({
                    title: data.data.title, // 分享标题
                    link: data.data.url,
                    desc: data.data.content, // 分享描述
                    imgUrl: data.data.thumb, // 分享图标
                    success: ()=>{ console.log("已分享") },
                    cancel: ()=> { console.log('已取消') },
                    trigger: ()=>{ console.log('用户点击分享朋友圈') },
                    fail: ()=>{ console.log("分享失败") }
                });
                // 分享给朋友
                wx.onMenuShareAppMessage({
                    title: data.data.title, // 分享标题
                    link: data.data.url,
                    desc: data.data.content, // 分享描述
                    imgUrl: data.data.thumb, // 分享图标
                    success: ()=>{ console.log('已分享') },
                    trigger: ()=>{ console.log('用户点击发送给朋友') },
                    cancel: ()=>{ console.log('已取消') },
                    fail: ()=>{ console.log('分享失败') }
                });
            });
        });
        wx.error((res)=>{ console.log('err', res) });
    })
}
wxConfig();