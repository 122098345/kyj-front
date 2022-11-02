import { axios } from '@/utils/request'

// 获取空压机设备列表
export function getEquipmentList(params) {
  return axios({
    url: 'equipment/page/v1?departmentCode='+params.departmentCode+'&outCode='+params.outCode+'&equipmentName='+params.equipmentName+'&pageSize='+params.pageSize+'&pageNo='+params.pageNo,
    method: 'get'
  })
}

// 新增设备
export function addEquipment(data) {
  return axios({
    url: 'equipment/add/v1',
    method: 'post',
    data:data
  })
}

// 删除设备
export function delEquipment(id) {
  return axios({
    url: 'equipment/delete/v1?id='+id,
    method: 'delete',
  })
}

// 根据id查询设备
export function queryByIdEquipment(id) {
  return axios({
    url: 'equipment/queryById/v1?id='+id,
    method: 'get',
  })
}

// 编辑设备
export function editEquipment(data) {
  return axios({
    url: 'equipment/edit/v1',
    method: 'post',
    data:data
  })
}