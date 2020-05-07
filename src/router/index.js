import Vue from 'vue'
import Router from 'vue-router'
import AllPath from '@/page/AllPath'//首页

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/', redirect: '/pay_list'
    },
    
    {

        path: '/sjhy',
        meta: { title: "测试升级会员"},
        component: (resolve) =>require(['@/page/_testMember.vue'],resolve)
    },

    {
        path: '/all_path',
        name: 'AllPath',
        component: AllPath
    }, {
        path: '/my_center',
        name: 'MyCenter',
        meta: { title: "个人中心"},
        component: (resolve) =>require(['@/page/MyCenter.vue'],resolve)
    }, {
        path: '/member',
        name: 'Member',
        meta: { title: "会员中心"},
        component: (resolve) =>require(['@/page/Member.vue'],resolve)
    }, {
        path: '/profit',
        name: 'Profit',
        meta: { title: "我的收益"},
        component: (resolve) =>require(['@/page/Profit.vue'],resolve)
    }, {
        path: '/event_list',
        name: 'EventList',
        meta: { title: "活动列表"},
        component: (resolve) =>require(['@/page/EventList.vue'],resolve)
    }, {
        path: '/event_view',
        name: 'EventView',
        meta: { title: "活动预览"},
        component: (resolve) =>require(['@/page/EventView.vue'],resolve)
    }, {
        path: '/event_mould',
        name: 'EventMould',
        meta: { title: "活动模板"},
        component: (resolve) =>require(['@/page/EventMould.vue'],resolve)
    }, {
        path: '/event_form',
        name: 'EventForm',
        meta: { title: "活动设置"},
        component: (resolve) =>require(['@/page/EventForm.vue'],resolve)
    }, {
        path: '/event_form_set',
        name: 'EventFormSet',
        meta: { title: "表单设置"},
        component: (resolve) =>require(['@/page/EventFormSet.vue'],resolve)
    }, {
        path: '/order_list',
        name: 'OrderList',
        meta: { title: "订单列表"},
        component: (resolve) =>require(['@/page/OrderList.vue'],resolve)
    }, {
        path: '/userdata',
        name: 'Userdata',
        meta: { title: " 用户数据", showHeader: true, },
        component: (resolve) =>require(['@/page/Userdata.vue'],resolve)
    },{
        path: '/order_detail',
        name: 'OrderDetail',
        meta: { title: "订单详情"},
        component: (resolve) =>require(['@/page/OrderDetail.vue'],resolve)
    }, {
        path: '/order_logistics',
        name: 'OrderLogistics',
        meta: { title: "订单物流"},
        component: (resolve) =>require(['@/page/OrderLogistics.vue'],resolve)
    }, {
        path: '/pay_after_set',
        name: 'PayAfterSet',
        meta: { title: "付费后设置"},
        component: (resolve) =>require(['@/page/PayAfterSet.vue'],resolve)
    }, {
        path: '/distb_set',
        name: "DistbSet",
        meta: {title: "分销设置"},
        component: (resolve) =>require(['@/page/DistbSet.vue'],resolve)
    }, {
        path: '/bill',
        name: 'Bill',
        meta: {title: "海报"},
        component: (resolve) =>require(['@/page/Bill.vue'],resolve)
    }, {
        path: '/auth',
        name: 'Auth',
        meta: {title: "认证信息"},
        component: (resolve) =>require(['@/page/Auth.vue'],resolve)
    },{
        path: '/channel',
        name: 'Channel',
        meta: { title: "添加渠道"},
        component: (resolve) =>require(['@/page/Channel.vue'],resolve)
    },{
        path: '/redeem',
        name: 'Redeem',
        meta: { title: "设置兑奖", showHeader: true, },
        component: (resolve) =>require(['@/page/Redeem.vue'],resolve)
    },{
        path: '/redeem_details',
        name: 'RedeemDetails',
        meta: { title: "兑奖详情", showHeader: true, },
        component: (resolve) =>require(['@/page/RedeemDetails.vue'],resolve)
    },{
        path: '/browse',
        name: 'Browse',
        meta: { title: " 浏览记录", showHeader: true, },
        component: (resolve) =>require(['@/page/Browse.vue'],resolve)
    },
    // 支付
    {
        path: '/pay_list',
        name: 'PayList',
        meta: {title: "活动列表"},
        component: (resolve) =>require(['@/page/PayList.vue'],resolve)
    },{
        path: '/pay_detail',
        name: 'PayDetail',
        meta: {title: "详情"},
        component: (resolve) =>require(['@/page/PayDetail.vue'],resolve)
    },{
        path: '/wxCashOut',
        name: 'WxCashOut',
        meta: {title: "提现"},
        component: (resolve) =>require(['@/page/WxCashOut.vue'],resolve)
    },{
        path: '/pay_after',
        name: 'PayAfter',
        meta: {title: "联系主办方"},
        component: (resolve) =>require(['@/page/PayAfter.vue'],resolve)
    },{
        path: '/my_coupon',
        name: 'MyCoupon',
        meta: {title: "我的优惠券"},
        component: (resolve) =>require(['@/page/MyCoupon.vue'],resolve)
    },]
})