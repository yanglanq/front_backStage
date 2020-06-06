import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path: "/login",
    component:()=>import("../views/login")
  },
  {
    path: "/Home",
    component:()=>import("../views/Home"),
    meta:{
      needLogin:true,
    },
    children:[
      {
        path: "/",
        redirect:"/Home/swiper"
      },
      {
        path:"/Home/swiper",
        component:()=>import("../components/swiper/swiper"),
        meta:{
          icon:"el-icon-picture-outline",
          text:"轮播图管理",
          needLogin:true,
        }
      },
      {
        path:"/Home/infoOperation",
        component:()=>import("../components/infoOperation/infoOperation"),
        meta:{
          icon:"el-icon-ice-tea",
          text:"多肉管理",
          needLogin:true,
        }
      },
      {
        path:"/Home/userInfo",
        component:()=>import("../components/userInfo/userInfo"),
        meta:{
          icon:"el-icon-user",
          text:"用户管理",
          needLogin:true,
        }
      },
      {
        path:"/Home/recommendMsg",
        component:()=>import("../components/recommendMsg/recommendMsg"),
        meta:{
          icon:"el-icon-magic-stick",
          text:"每日推荐",
          needLogin:true,
        }
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from "../store/index"
router.beforeEach((to, from, next) =>{
  if(to.meta.needLogin){// 需要登录
    if(store.getters.getLoginInfo=="false"){
      // 没有登陆
      console.log("请登录");
      next({
        path:"/login"
      })
    }else {
      next();
    }
  }else {
    next();
  }
})

export default router
