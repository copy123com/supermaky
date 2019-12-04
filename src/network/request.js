
import axios from 'axios'

export function request(config){
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    // 2.axios的拦截器
    // 2.1请求拦截的作用
    instance.interceptors.request.use(config => {
        //console.log(config);
        return config
        //1.比如config中的一些信息不符合服务器的要求
        //2.比如每次发送网络请求时，都希望再界面中显示一个请求的图标
        //3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
    },errs => {
        console.log(errs);
    })

    //2.2响应拦截
    instance.interceptors.response.use(res => {
        //console.log(res)
        return res
    },err => {
      console.log(err)
    })
    
    //3.发送网络请求
    return instance(config)
}

export function requests(config){
    //1.创建axios实例
    const instance2 = axios.create({
       baseURL:'http://106.54.54.237:8000',
       // baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    // 2.axios的拦截器
    // 2.1请求拦截的作用
    instance2.interceptors.request.use(config => {
        //console.log(config);
        return config
        //1.比如config中的一些信息不符合服务器的要求
        //2.比如每次发送网络请求时，都希望再界面中显示一个请求的图标
        //3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
    },errs => {
        console.log(errs);
    })

    //2.2响应拦截
    instance2.interceptors.response.use(res => {
        //console.log(res)
        return res
    },err => {
      console.log(err)
    })
    
    //3.发送网络请求
    return instance2(config)
}