import request from '@/utils/request'

// 登录接口
export function login(data) {
    return request({
        url: '/login/login',
        method: 'POST',
        data: data
    })
}

// 登出接口
export function logout() {
    return request({
        url: '/login/logout',
        method: 'get'
    })
}

