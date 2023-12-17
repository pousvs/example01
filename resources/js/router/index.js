import { createWebHistory, createRouter } from "vue-router";

import login from "../pages/login.vue";
import register from '../pages/register.vue';
import report from '../pages/report.vue';
import trandsection from '../pages/trandsection.vue';
import pos from '../pages/pos.vue';
import store from '../pages/store.vue';
import nopage from '../pages/nopage.vue';


export const routes = [
    {
        path:'/',
        redirect:'/store'
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name:'register',
        path: '/register',
        component: register
    },
    {
        name:'report',
        path: '/report',
        component: report
    },
    {
        name: 'trandsection',
        path: '/trandsection',
        component: trandsection
    },
    {
        name: 'pos',
        path: '/pos',
        component: pos
    },
    {
        name:'store',
        path: '/store',
        component: store
    }
    ,
    {
        name: 'nopage',
        path: '/:pathMatch(.*)*',
        component: nopage
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(){
        window.scrollTo(0,0)
    }
});
export default router;