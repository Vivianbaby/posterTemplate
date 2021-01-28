import request from '@/utils/request'
// 获取用户信息
export function getUserInfo(datas) {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        params: datas
    })
}

export function editUserInfo(datas) {
    return request({
        url: '/user/modifyUserInfo',
        method: 'POST',
        data: datas
    })
}


