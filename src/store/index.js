import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import userInfo from "./modules/userInfo";
import collectReg from "./modules/collectReg"
export default new Vuex.Store({
  modules: {
    //将全部状态放这里
    userInfo,
    collectReg
  }
});
