const ENV = process.env.NODE_ENV;

let Config = {};

//本地存储对象
let localStorage = {
  // 本地存储对象
  storage: window.localStorage,
  // 设置本地存储
  setStorage: function(key, val) {
    this.storage.setItem(key, JSON.stringify(val));
  },
  // 获取本地存储
  getStorage: function(key) {
    return this.storage.getItem(key);
  },
  // 判断是否有某个本地存储的值
  hasStorage: function(key) {
    if (this.storage[key]) {
      return true;
    } else {
      return false;
    }
  },
  // 删除本地存储
  delStorage: function(key) {
    //如果没有传入一个key则删除全部本地存储
    if (arguments.length === 0) {
      this.storage.clear();
    } else {
      this.storage.removeItem(key);
    }
  }
};

// 通用变量对象
let utilsObj = {
  //基准路径
  baseUrl: process.env.VUE_APP_BASE_API + "/yuan",
  baseImgUrl:process.env.VUE_APP_BASE_API+"/yuan/files/getFileStream/",
  name: "项目名",
  // 超时时间
  timeout: 30000
};


if (ENV == "development") {
  // 开发环境默认配置项
  Config = {
    ...utilsObj,
    // 本地存储的相关方法
    ...localStorage
  };
} else if (ENV == "test") {
  // 测试环境默认配置项
  Config = {
    ...utilsObj,
    // 本地存储的相关方法
    ...localStorage
  };
} else {
  //上线环境默认配置项
  Config = {
    ...utilsObj,
    // 本地存储的相关方法
    ...localStorage
  };
}

export default Config;
