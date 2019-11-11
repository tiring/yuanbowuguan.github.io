import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import userInfo from "./modules/userInfo"


export default new Vuex.Store({
 modules:{
   //将全部状态放这里
   userInfo
 }
});
