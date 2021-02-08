import request from '@/utils/request'
// 获取用户信息
export function getLabelList(datas) {
    return request({
        url: '/condition/list',
        method: 'POST',
        data: datas
    })
}
// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return request({
        url: '/system/dict/data/type/' + dictType,
        method: 'get'
    })
}

