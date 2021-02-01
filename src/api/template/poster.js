import request from '@/utils/request'

// 查询公告列表
export function templateList(data) {
    return request({
        url: 'makeTemplate/myList ',
        method: 'POST',
        data: data
    })
}
export function publishTemList(data) {
    return request({
        url: 'makeTemplate/publishList',
        method: 'POST',
        data: data
    })
}

export function templateAdd(data) {
    return request({
        url: '/makeTemplate/add ',
        method: 'POST',
        data: data
    })
}

export function templateUpdate(data) {
    return request({
        url: '/makeTemplate/update  ',
        method: 'POST',
        data: data
    })
}
export function templatePublish(query) {
    return request({
        url: '/makeTemplate/publish',
        method: 'get',
        params: query
    })
}

export function templateInfo(query) {
    return request({
        url: '/makeTemplate/info',
        method: 'get',
        params: query
    })
}
export function templateUploadInfo(query) {
    return request({
        url: '/template/info',
        method: 'get',
        params: query
    })
}



// 我的模板详情
export function myTempInfo(query) {
    return request({
        url: '/poster/info',
        method: 'get',
        params: query
    })
}
export function myTempUser(query) {
    return request({
        url: '/poster/usage',
        method: 'get',
        params: query
    })
}
export function myTempUpdate(data) {
    return request({
        url: '/poster/update',
        method: 'post',
        data: data
    })
}
export function myTempFinalize(query) {
    return request({
        url: '/poster/finalize',
        method: 'get',
        params: query
    })
}


export function uploadInfo(query) {
    return request({
        url: '/makeTemplate/makeProductList',
        method: 'get',
        params: query
    })
}

export function downloadAdd(datas) {
    return request({
        url: '/download/add',
        method: 'POST',
        data: datas
    })
}
export function downloadFile(params) {
    return request({
        url: '/downloadImageById',
        method: 'GET',
        params: params
    })
}
