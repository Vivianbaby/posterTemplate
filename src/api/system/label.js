import request from '@/utils/request'
// 获取用户信息
export function getLabelList(datas) {
    return request({
        url: '/condition/list',
        method: 'POST',
        data: datas
    })
}
