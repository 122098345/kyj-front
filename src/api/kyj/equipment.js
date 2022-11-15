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

// 维修条例查询
export function queryEquMaintainRules(params) {
  return axios({
    url: 'maintain-regula/page/v1?createDatetime=&id=&maintenanceDesc='+params.maintenanceDesc+'&maintenanceRemark=&pageNo='+params.pageNo+'&pageSize='+params.pageSize+'&updateTime=',
    method: 'get'
  })
}

// 获取维修条例列表
export function getMaintainRulesList() {
  return axios({
    url: 'maintain-regula/list/v1',
    method: 'get'
  })
}

// 删除维修条例
export function delEquMaintainRules(id) {
  return axios({
    url: 'maintain-regula/delete/v1?id='+id,
    method: 'delete'
  })
}

// 编辑维修条例
export function editEquMaintainRules(data) {
  return axios({
    url: 'maintain-regula/edit/v1',
    method: 'post',
    data:data
  })
}

// 新增维修条例
export function addEquMaintainRules(data) {
  return axios({
    url: 'maintain-regula/add/v1',
    method: 'post',
    data:data
  })
}

// 新增维修条例明细
export function addMaintainRulesItems(data) {
  return axios({
    url: 'maintain-regula-detail/add/v1',
    method: 'post',
    data:data
  })
}

// 获取维修条例明细列表
export function getMaintainRulesItems(id) {
  return axios({
    url: 'maintain-regula-detail/list/v1?id='+id,
    method: 'get',
  })
}

// 删除维修条例明细
export function delMaintainRulesItems(id) {
  return axios({
    url: 'maintain-regula-detail/delete/v1?id='+id,
    method: 'delete',
  })
}

// 修改维修条例明细
export function editMaintainRulesItems(data) {
  return axios({
    url: 'maintain-regula-detail/edit/v1',
    method: 'post',
    data:data
  })
}

// 保养包-分页查询
export function getMaintainBags(params) {
  return axios({
    url: 'maintain-package/page/v1?createDatetime=&id=&packageName='+params.packageName+'&packageRemark=&packageType=&pageNo='+params.pageNo+'&pageSize='+params.pageSize+'&updateDatetime=',
    method: 'get'
  })
}

// 保养包-列表查询
export function getMaintainBagsList() {
  return axios({
    url: 'maintain-package/list/v1',
    method: 'get'
  })
}

// 保养包-添加
export function addMaintainBags(data) {
  return axios({
    url: 'maintain-package/add/v1',
    method: 'post',
    data:data
  })
}

// 保养包-编辑
export function editMaintainBags(data) {
  return axios({
    url: 'maintain-package/edit/v1',
    method: 'post',
    data:data
  })
}

// 保养包-删除
export function delMaintainBags(id) {
  return axios({
    url: 'maintain-package/delete/v1?id='+id,
    method: 'delete'
  })
}

// 保养包明细-添加
export function addMaintainBagItems(data) {
  return axios({
    url: 'maintain-package-detail/add/v1',
    method: 'post',
    data:data
  })
}

// 保养包明细-删除
export function delMaintainBagItems(id) {
  return axios({
    url: 'maintain-package-detail/delete/v1?id='+id,
    method: 'delete'
  })
}

// 保养包明细-编辑
export function editMaintainBagItems(data) {
  return axios({
    url: 'maintain-package-detail/edit/v1',
    method: 'post',
    data:data
  })
}

// 保养包明细-获取列表
export function getListMaintainBagItems(id) {
  return axios({
    url: 'maintain-package-detail/list/v1?id='+id,
    method: 'get'
  })
}

// 保养包明细-分页查询
export function getMaintainBagItems(params) {
  return axios({
    url: 'maintain-package-detail/page/v1?createDatetime=&detailCount=&detailName='+params.detailName+'&detailNumber='+params.detailNumber+'&detailRemark=&detailType=&id=&packageId=&pageNo='+params.pageNo+'&pageSize='+params.pageSize+'&updateDatetime=',
    method: 'get'
  })
}

// 零部件-添加
export function addParts(data) {
  return axios({
    url: 'equipment-parts/add/v1',
    method: 'post',
    data:data
  })
}

// 零部件-删除
export function delParts(id) {
  return axios({
    url: 'equipment-parts/delete/v1?id='+id,
    method: 'delete'
  })
}

// 零部件-编辑
export function editParts(data) {
  return axios({
    url: 'equipment-parts/edit/v1',
    method: 'post',
    data:data
  })
}

// 零部件-分页查询
export function getParts(params) {
  return axios({
    // url: 'equipment-parts/page/v1?count='+params.count+'&createBy='+params.createBy+'&createTime='+params.createTime+'&equipmentId='+params.equipmentId+
    // '&id='+params.id+'&location='+params.location+'&mesNo='+params.mesNo+'&orderNo='+params.orderNo+'&pageNo='+params.pageNo+'&pageSize='+params.pageSize+'&partsName='+params.partsName+
    // '&partsNo='+params.partsNo+'&remark='+params.remark+'&updateBy='+params.updateBy+'&updateTime='+params.updateTime,
    url: 'equipment-parts/page/v1?equipmentId='+params.equipmentId,
    method: 'get'
  })
}

// 维修-新建维修
export function addMaintain(data) {
  return axios({
    url: 'repair-record/add/v1',
    method: 'post',
    data:data
  })
}

// 维修-分页查询
export function getMaintain(params) {
  return axios({
    url: 'repair-record/page/v1?equipmentName='+params.equipmentName,
    method: 'get'
  })
}

// 维修-编辑
export function editMaintain(data) {
  return axios({
    url: 'repair-record/edit/v1',
    method: 'post',
    data:data
  })
}

// 维修-完成
export function confirmMaintain(id) {
  return axios({
    url: 'repair-record/finish/v1?id='+id,
    method: 'get'
  })
}








