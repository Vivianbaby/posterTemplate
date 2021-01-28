import request from '@/utils/request'

// 查询公告列表
export function myTempList(data) {
    return request({
        url: '/poster/list',
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

