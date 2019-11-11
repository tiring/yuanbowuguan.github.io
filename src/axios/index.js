import axios from 'axios'
import qs from 'qs'

//设置基准路径
axios.defaults.baseURL = process.env.VUE_APP_BASE_API



axios.defaults.transformRequest = [data => {
    return qs.stringify(data)
}];

//设置超时时间
axios.defaults.timeout = 30000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });