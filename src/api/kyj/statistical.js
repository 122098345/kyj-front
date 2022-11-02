import { axios } from '@/utils/request'

// 获取空压机属性列表
export function getKyjItems(number) {
  return axios({
    url: 'sys/common/opc-enums/v1?number='+number,
    method: 'get'
  })
}

// 获取每日统计数据
export function getDayData(params) {
  return axios({
    url: 'statistics-day/page/v1?startDate='+params.startDate+'&endDate='+params.endDate+'&number='+params.number+'&tagId='+params.tagId+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize,
    method: 'get'
  })
}

// 获取每月统计数据
export function getMonthData(params) {
  return axios({
    url: 'statistics-month/page/v1?number='+params.number+'&tagId='+params.tagId+'&year='+params.year+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize,
    method: 'get'
  })
}

// 获取季度统计数据
export function getSeasonData(params) {
  return axios({
    url: 'statistics-quarterly/page/v1?number='+params.number+'&tagId='+params.tagId+'&year='+params.year+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize,
    method: 'get'
  })
}

// 获取年统计数据
export function getYearData(params) {
  return axios({
    url: 'statistics-year/page/v1?number='+params.number+'&tagId='+params.tagId+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize,
    method: 'get'
  })
}