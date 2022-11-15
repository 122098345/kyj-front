<template>
  <div class="content">
    <el-table :data="tableData" row-key="id" :expand-row-keys="expands" highlight-current-row style="width:100%;">
      <el-table-column align="center" label="设备名称" prop="equipmentName"/>
      <el-table-column align="center" label="设备编码" prop="departmentCode"/>
      <el-table-column align="center" label="型号" prop="typeCode"/>
      <el-table-column align="center" label="维修开始时间" prop="startDatetime"/>
      <el-table-column align="center" label="维修结束时间" prop="endDatetime"/>
      <el-table-column align="center" label="状态" prop="stats" :formatter="changeText"/>
      <el-table-column align="center" label="维修人员" prop="serviceman"/>
      <el-table-column align="center" label="反馈" prop="feedback"/>
      <el-table-column align="center" label="备注" prop="remark"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.stats==0" @click.stop="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button v-show="scope.row.stats==0" @click.stop="handleMaintainConfirm(scope.row)" type="text" size="small">完成确认</el-button>
          <el-button v-show="scope.row.stats==1" @click.stop="handleInfo(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import {getMaintain} from '@api/kyj/equipment.js'
import {filterDictTextByCache} from '@/components/dict/JDictSelectUtil'

export default {
  
  data(){
    return{
      tableData:[],       // 表格数据

      tableItemData:[],   // 子表格数据

      expands:[],         // 需要展开的行

    }
  },
  methods:{
    // 获取数据
    getDataList(params){
      getMaintain(params).then(res=>{
        if(res.code==200){
          this.tableData=res.result.records
          this.$emit('getTotal',res.result.total)
        }
      })
    },

    // 获取字典数据
    changeText(row,column){
      return filterDictTextByCache('maintainRecord_states', row.stats);
    },

    // 编辑
    handleEdit(val){
      if(val){
        this.$emit('handleEdit',val)
      }
    },

    // 维修完成确认
    handleMaintainConfirm(val){
      if(val){
         this.$emit('handleMaintainConfirm',val)
      }
    },

    // 详情
    handleInfo(val){
      if(val){
         this.$emit('handleMaintainInfo',val)
      }
    }



    // 行点击
    // clickRowHandle(row){
    //   if(this.expands.includes(row.id)){
    //     this.expands=this.expands.filter(val=> val !== row.id);
    //     this.tableItemData=[];
    //   }else{
    //     this.queryItemParams.equipmentId=row.id
    //     getParts(this.queryItemParams).then(res=>{
    //       if(res.code==200){
    //         this.total=res.result.total
    //         this.tableItemData=res.result.records
    //         this.expands=[];
    //         this.expands.push(row.id)
    //       }
    //     })
    //   }
    // },

    // 如果行展开，刷新展开内容
    // refreshOpenData(val){
    //   if(this.expands.includes(parseInt(val))){
    //     this.queryItemParams.equipmentId=val
    //     getParts(this.queryItemParams).then(res=>{
    //       if(res.code==200){
    //         this.total=res.result.total
    //         this.tableItemData=res.result.records
    //         this.expands=[];
    //         this.expands.push(val)
    //       }
    //     })
    //   }
    // },
  }
}
</script>

<style lang="scss">
  .content{
    margin-top: 10px;
  }
  
</style>