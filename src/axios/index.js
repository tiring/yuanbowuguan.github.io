import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
// 引入默认配置文件
import { Config } from "@utils/utils.js";
//获取token,按实际情况获取
const token = "123456";

//设置基准路径
axios.defaults.baseURL = Config.baseUrl;

//设置请求发送的参数为formData
axios.defaults.transformRequest = [
  data => {
    return qs.stringify(data);
  }
];
//设置超时时间
axios.defaults.timeout = Config.timeout;
//设置post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8";

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么

    //对post请求做些什么
    if (config.method == "post") {
      //给每个post请求都添加上token
      config.data = {
        ...config.data,
        token
      };
      //对get请求做些什么
    } else if (config.method == "get") {
      config.params = {
        //给每个get请求添加token
        ...config.params,
        token
      };
    }

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么

    //服务器错误处理
    if (error.message.includes("Network Error")) {
      Message.error("服务器错误");
    }

    // 设置请求超时处理
    if (error.message.includes("timeout")) {
      Message.error("请求超时");
    }
    return Promise.reject(error);
  }
);

export default axios;
