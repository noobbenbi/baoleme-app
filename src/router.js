import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'index',
      component: Index,
      children:[
        {
        path:'',
        redirect:'/home'
        },
        {
          path:"/home",
          name:"home",
          component: () =>import("./views/Home.vue")
        },
        {
          path:"/me",
          name:"me",
          component: () =>import("./views/Me.vue")
        },
        {
          path:"order",
          name:"order",
          component: () =>import("./views/Order.vue")
        },
        {
          path:"/address",
          name:"address",
          component: () =>import("./views/Address.vue")
        },
        {
          path:"/city",
          name:"city",
          component: () =>import("./views/City.vue")
        }
     ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.ele_login ?true :false;
  if (to.path == '/login') {
    next();
  }else {
    //是否在登录状态下
    isLogin ? next() : next('/login')
  }
});//路由守卫
export default router;
