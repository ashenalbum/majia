import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { Tabbar, Sidebar, ImagePreview, Overlay, Slider, Stepper, DatetimePicker, NoticeBar, Dialog, Notify, Grid, Loading, Image, GridItem, Uploader, SidebarItem, TabbarItem, Cell, AddressEdit, Area, List, CellGroup, Swipe, SwipeItem, PullRefresh, AddressList, Tab, Tabs, Button, Icon, Popup, Checkbox, CheckboxGroup, Field, RadioGroup, Tag, Radio, Search, Switch, SwipeCell, Toast, NavBar, Picker, ActionSheet } from 'vant';
import 'vant/lib/index.css';

Vue.use(Tabbar).use(TabbarItem).use(Overlay).use(ImagePreview).use(Stepper).use(DatetimePicker).use(Slider).use(NoticeBar).use(Notify).use(Loading).use(Dialog).use(Image).use(Grid).use(GridItem).use(Uploader).use(Sidebar).use(SidebarItem).use(Cell).use(Area).use(AddressEdit).use(List).use(CellGroup).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Button).use(Icon).use(Popup).use(Checkbox).use(CheckboxGroup).use(Field).use(RadioGroup).use(Radio).use(Search).use(Switch).use(PullRefresh).use(SwipeCell).use(Toast).use(NavBar).use(Tag).use(AddressList).use(Picker).use(ActionSheet);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

store.commit("setToken",JSON.parse(window.localStorage.getItem("token")));

router.beforeEach(function (to, from, next) {
    window.scrollTo(0,0);
    // title
    if(to.meta.title){
        document.title = to.meta.title;}
    // 判断微信
    let is_weixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;

    let titlePage = [];
    if(is_weixin==false && titlePage.indexOf(to.name)>-1){to.meta.showHeader = true;}
    else{to.meta.showHeader = false;}

    next();
})