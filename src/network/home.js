import {request,requests} from './request'

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return requests({
        url:'/api/v1/home/data',
        //url:'/api/vip/home/data',
        params:{
            type,
            page
        }
    })
}