import request from '@/utils/request'

// 查询公告列表
export function pictureList(data) {
    return request({
        url: '/myGallery/list',
        method: 'POST',
        data: data
    })
}

export function commonList(data) {
    return request({
        url: '/publicGallery/list',
        method: 'POST',
        data: data
    })
}

export function pictureAdd(data) {
    return request({
        url: '/myGallery/add ',
        method: 'POST',
        data: data
    })
}

export function pictureUpdate(data) {
    return request({
        url: '/myGallery/update  ',
        method: 'POST',
        data: data
    })
}

export function pictureInfo(query) {
    return request({
        url: '/myGallery/info',
        method: 'GET',
        params: query
    })
}
