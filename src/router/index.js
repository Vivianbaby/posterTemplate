import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const router = new Router({
    routes:[
        {
            path: '/redirect',
            component: Layout,
            hidden: true,
            children: [
                {
                    path: '/redirect/:path(.*)',
                    component: (resolve) => require(['@/views/redirect'], resolve)
                }
            ]
        },
        {
            path: '',
            component: Layout,
            redirect: 'index',
            children: [
                {
                    path: 'index',
                    component: (resolve) => require(['@/views/home/index'], resolve),
                    name: '首页',
                    meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
                }
            ]
        },
        {
            path: '',
            component: Layout,
            redirect: 'myTemplate',
            children: [
                {
                    path: 'myTemplate',
                    component: (resolve) => require(['@/views/my-template/index'], resolve),
                    name: '我的海报',
                    meta: { title: '我的海报', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'myTemplate/edit',
                    component: (resolve) => require(['@/views/my-template/edit'], resolve),
                    name: '我的海报编辑',
                    meta: { title: '我的海报编辑', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'template',
                    component: (resolve) => require(['@/views/template/index'], resolve),
                    name: '模板中心',
                    meta: { title: '模板中心', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'template/user/:params?',
                    component: (resolve) => require(['@/views/template/user'], resolve),
                    name: '使用模板',
                    meta: { title: '使用模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'template/list',
                    component: (resolve) => require(['@/views/template/list'], resolve),
                    name: '我的海报模板',
                    meta: { title: '我的海报模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'template/edit',
                    component: (resolve) => require(['@/views/template/poster'], resolve),
                    name: '我的海报模板',
                    meta: { title: '我的海报模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'price',
                    component: (resolve) => require(['@/views/price-template/index'], resolve),
                    name: '价格模板中心',
                    meta: { title: '价格模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'price/list',
                    component: (resolve) => require(['@/views/price-template/list'], resolve),
                    name: '我的价格模板',
                    meta: { title: '我的价格模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'price/template/:params?',
                    component: (resolve) => require(['@/views/price-template/add'], resolve),
                    name: '设置价格模板',
                    meta: { title: '设置价格模板', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'picture',
                    component: (resolve) => require(['@/views/picture/index'], resolve),
                    name: '图库中心',
                    meta: { title: '图库中心', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'picture/list',
                    component: (resolve) => require(['@/views/picture/list'], resolve),
                    name: '我的图库',
                    meta: { title: '我的图库', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'collect',
                    component: (resolve) => require(['@/views/collect/index'], resolve),
                    name: '我的收藏',
                    meta: { title: '我的收藏', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'disign',
                    component: (resolve) => require(['@/views/price-template/index'], resolve),
                    name: '我的设计',
                    meta: { title: '我的设计', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'info',
                    component: (resolve) => require(['@/views/system/info'], resolve),
                    name: '我的信息',
                    meta: { title: '我的信息', icon: 'dashboard', noCache: true, affix: true }
                },
                {
                    path: 'account',
                    component: (resolve) => require(['@/views/system/account'], resolve),
                    name: '我的账户',
                    meta: { title: '我的账户', icon: 'dashboard', noCache: true, affix: true }
                },
            ]
        },
        {
            path:'/login',                // 调查取证
            name: 'pdfDown',
            component: (resolve) => require(['@/views/system/login'], resolve),
            meta: { requiresAuth: true, keepAlive: false},
        },
        {
            path:'/preview',                // 调查取证
            name: 'preview',
            component: (resolve) => require(['@/views/system/preview'], resolve),
            meta: { requiresAuth: true, keepAlive: false},
        },
        {
            path:'/download',                // 调查取证
            name: 'download',
            component: (resolve) => require(['@/views/system/download'], resolve),
            meta: { requiresAuth: true, keepAlive: false},
        },

    ]
})


export default router;

