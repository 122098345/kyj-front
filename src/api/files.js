import { axios } from '@/utils/request'

// 新增设备
export function downFiles(id) {
  return axios({
    url: 'file/download/v1?id='+id,
    method: 'post',
    responseType: 'blob',
  })
}
