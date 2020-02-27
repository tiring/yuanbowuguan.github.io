import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@views/login.vue";
import Index from "@views/index.vue";
import Echar from "@views/echar.vue";

//藏品登记下的路由路径
// 征集登记录入页面
import CollectReg from "@views/collectReg.vue";
// 征集登记展示页面
import CollectRegContent from "@views/collectReg/collectRegContent.vue";
// 入馆登记录入页面
import EnterMuseumeEntering from "@views/collectReg/enterMuseumeEntering.vue";
// 入馆登记展示页面
import EnterMuseumReg from "@views/collectReg/enterMuseumReg.vue";

// 门户首页
import Portal from "@views/portal/index.vue"
Vue.use(VueRouter);

// 静态路由
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/echar",
    name: "echar",
    component: Echar
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    redirect:'/portal',
    children: [
      {
        path: "/collectReg",
        name: "collectReg",
        component: CollectReg
      },
      {
        path: "/collectRegContent",
        name: "collectRegContent",
        component: CollectRegContent
      },
      {
        path: "/enterMuseumReg",
        name: "enterMuseumReg",
        component: EnterMuseumReg
      },
      {
        path: "/enterMuseumeEntering",
        name: "enterMuseumeEntering",
        component: EnterMuseumeEntering
      },{
        path:'/portal',
        name:'portal',
        component:Portal
      }
    ]
  },
  {
    path: "/",
    name: "redirect",
    redirect: "/index"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
