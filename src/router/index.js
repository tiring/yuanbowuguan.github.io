import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@views/login.vue";
import Index from "@views/index.vue"
Vue.use(VueRouter);


// 静态路由
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "index",
    component:Index
  }
];



const router = new VueRouter({
  routes
});

export default router;
