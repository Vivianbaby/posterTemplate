import request from '@/utils/request'

// 查询公告列表
export function pictureList(data) {
    return request({
        url: '/gallery/list',
        method: 'POST',
        data: data
    })
}

export function pictureAdd(data) {
    return request({
        url: '/gallery/add ',
        method: 'POST',
        data: data
    })
}

export function pictureUpdate(data) {
    return request({
        url: '/gallery/update  ',
        method: 'POST',
        data: data
    })
}

export function pictureInfo(query) {
    return request({
        url: '/gallery/info',
        method: 'GET',
        params: query
    })
}
