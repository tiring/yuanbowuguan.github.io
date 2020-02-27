// 引入babel添加ie兼容
import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element组件以及样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 初始化css
import "@style/style.css";
import "@assets/style/index.css";
// 注入element
Vue.use(ElementUI);


// 引入echar
import echarts from "echarts";
// 将echar添加到Vue原型
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
