import request from '@/utils/request'

// 价格模板列表
export function priceList(data) {
    return request({
        url: '/price/publishList',
        method: 'post',
        data: data
    })
}
export function myPriceList(data) {
    return request({
        url: '/price/myList',
        method: 'post',
        data: data
    })
}

// 价格模板列表
export function priceInfo(params) {
    return request({
        url: '/price/info',
        method: 'get',
        params: params
    })
}

// 价格模板更新
export function priceUpdate(data) {
    return request({
        url: '/price/update ',
        method: 'post',
        data: data
    })
}

export function pricePublish(params) {
    return request({
        url: '/price/publish',
        method: 'GET',
        params: params
    })
}

// 查询公告列表
export function priceAdd(data) {
    return request({
        url: '/price/add',
        method: 'post',
        data: data
    })
}
