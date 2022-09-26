import { axios } from '@/utils/request'

export function getDataList(query) {
  return axios({
    url: '/healthManagement/kyjWarn/list',
    method: 'get',
    params:query
  })
}