
import request from '@/utils/request'

// 查询公告列表
export function collectList(data) {
    return request({
        url: '/favorite/list ',
        method: 'POST',
        data: data
    })
}
export function collectOrCancel(data) {
    return request({
        url: '/favorite/favoriteOrcancel',
        method: 'POST',
        data: data
    })
}
