<template>
  <div class="content">
    <el-table :data="tableData" row-key="id" :expand-row-keys="expands" @row-click="clickRowHandle" highlight-current-row style="width:100%;">
      <el-table-column type="expand" width="5">
        <template slot-scope>
          <el-table :data="tableItemData">
            <el-table-column align="center" label="名称" prop="detailName"/>
            <el-table-column align="center" label="编号" prop="detailNumber"/>
            <el-table-column align="center" label="类型" prop="detailType"/>
            <el-table-column align="center" label="数量" prop="detailCount"/>
            <el-table-column align="center" label="备注" prop="detailRemark"/>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope2">
                <el-button @click.stop="handleEditItem(scope2.row)" type="text" size="small">编辑</el-button>
                <el-button @click.stop="handleDelItem(scope2.row)" type="text" size="small" style="color:red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号" prop="packageNumber"/>
      <el-table-column align="center" label="名称" prop="packageName"/>
      <el-table-column align="center" label="类型" prop="packageType"/>
      <el-table-column align="center" label="创建时间" prop="createDatetime"/>
      <el-table-column align="center" label="更新时间" prop="updateDatetime"/>
      <el-table-column align="center" label="备注" prop="packageRemark"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click.stop="handleAddItem(scope.row)" type="text" size="small">新增</el-button>
          <el-button @click.stop="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click.stop="handleDel(scope.row)" type="text" size="small" style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getMaintainBags,getListMaintainBagItems,delMaintainBags,delMaintainBagItems} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      expands:[],         // 需要展开的行
      
      tableData:[],       // 表格数据
        
      tableItemData:[],   // 表格子列表数据
      
    }
  },
  methods:{
    // 获取数据
    getDataList(params){
      getMaintainBags(params).then(res=>{
        if(res.code==200){
          this.tableData=res.result.records
          this.$emit('getTotal',res.result.total)
        }
      })
    },

    // 编辑总
    handleEdit(val){
      this.$emit('handleEdit',val)
    },

    // 删除总
    handleDel(val){
      this.$confirm('确定要删除 “'+val.packageName+'” 吗？').then(_ => {
        delMaintainBags(val.id).then(res=>{
          if(res.code==200){
            this.$emit('getData')
          }
        })
      })
      .catch(_ => {});
    },

    // 新增条目
    handleAddItem(val){
      this.$emit('addItem',val)
    },

    // 编辑条目
    handleEditItem(val){
      this.$emit('editItem',val)
    },

    // 删除条目
    handleDelItem(val){
      this.$confirm('确定要删除 “'+val.detailName+'” 吗？').then(_ => {
        delMaintainBagItems(val.id).then(res=>{
          if(res.code==200){
            this.refreshOpenData(val.packageId)
          }
        })
      })
      .catch(_ => {});

    },

    // 行点击
    clickRowHandle(row){
      if(this.expands.includes(row.id)){
        this.tableItemData=[]
        this.expands=this.expands.filter(val=> val !== row.id);
      }else{
        this.expands=[];
        this.tableItemData=[];
        getListMaintainBagItems(row.id).then(res=>{
          if(res.code==200){
            this.tableItemData=res.result
            this.expands.push(row.id)
          }
        })
      }
    },

    // 如果行展开，刷新展开内容
    refreshOpenData(val){
      if(this.expands.includes(parseInt(val))){
        getListMaintainBagItems(val).then(res=>{
          if(res.code==200){
            this.tableItemData=res.result
            this.expands=[];
            this.expands.push(val)
          }
        })
      }
    }


  }
}
</script>

<style>

</style>