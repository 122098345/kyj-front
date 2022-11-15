import { axios } from '@/utils/request'

export function getHistoryData() {
  return axios({
    url: 'homepage/history-data/v1',
    method: 'get'
  })
}

