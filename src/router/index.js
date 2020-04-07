import Vue from 'vue'
import Router from 'vue-router'
import AllPath from '@/page/AllPath'//首页

Vue.use(Router);

export default new Router({
    // mode: 'history',
    mode: 'hash',
    routes: [{
        path: '/', redirect: '/all_path'
    },{
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
    },{
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
    }]
})