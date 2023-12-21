import { createWebHistory, createRouter } from "vue-router";

import login from "../pages/login.vue";
import register from '../pages/register.vue';
import report from '../pages/report.vue';
import transection from '../pages/transection.vue';
import pos from '../pages/pos.vue';
import store from '../pages/store.vue';
import nopage from '../pages/nopage.vue';
// middleware ກວດຊອບຂໍ້ມູນ ການເຂົ້າລະບົບ

import { useStore } from "../store/auth";

const authMiddleware = (to, from, next) => {
    const token = localStorage.getItem('web_token');
    const user = localStorage.getItem('web_user');
    const store = useStore();

    if(!token){
        next({
            path: '/login',
            replace: true
        })
    } else {
        // ຂຽນຂໍ້ມູນ token ແລະ user ເຂົ້າ Pinia
        store.set_token(token);
        store.set_user(user);
        next();
    }
}

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
        component: report,
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        name: 'transection',
        path: '/transection',
        component: transection,
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        name: 'pos',
        path: '/pos',
        component: pos,
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        name:'store',
        path: '/store',
        component: store,
        meta: {
            middleware: [authMiddleware]
        }
    }
    ,
    {
        name: 'nopage',
        path: '/:pathMatch(.*)*',
        component: nopage,
        meta: {
            middleware: [authMiddleware]
        }
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(){
        window.scrollTo(0,0)
    }
});

router.beforeEach((to, from, next)=>{

    const token = localStorage.getItem('web_token');
    if(to.meta.middleware){
        to.meta.middleware.forEach(middleware => middleware(to, from, next))
    } else {
        if(to.path == '/login' || to.path == '/'){
            if(token){
                next({
                    path:'/store',
                    replace:true
                })
            } else {
                next();
            }
        } else {
            next();
        }
    }

});

export default router;