import { axios } from '@/utils/request'

// 告警-分页查询
export function getDataList(params) {
  return axios({
    url: 'warning-logs/page/v1?endDateTime='+params.endDateTime+'&level='+params.level+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize+'&startDateTime='+params.startDateTime,
    method: 'get'
  })
}

// 告警配置-获取列表
export function getSettingsList() {
  return axios({
    url: 'warning-setting/list/v1',
    method: 'get'
  })
}

// 告警配置-编辑
export function editSettingsList(data) {
  return axios({
    url: 'warning-setting/edit/v1',
    method: 'post',
    data:data
  })
}