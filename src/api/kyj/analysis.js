import { axios } from '@/utils/request'

// 相关性分析-数据获取
export function getCorrelation(id) {
  return axios({
    url: 'correlation/list/v1?number='+id,
    method: 'get'
  })
}

// 最优参数模型-数据获取
export function getParameterModel(id,type) {
  return axios({
    url: 'optimal-model/list/v1?number='+id+'&type='+type,
    method: 'get'
  })
}