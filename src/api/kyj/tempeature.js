import { axios } from '@/utils/request'

export function getHistoryData() {
  return axios({
    url: '/homepage/homepage/getHomePageHistoryData',
    method: 'get'
  })
}