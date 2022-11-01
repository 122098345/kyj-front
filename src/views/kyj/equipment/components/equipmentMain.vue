<template>
  <div class="content">
    <el-table :data="tableData" style="width:100%;">
      <el-table-column type="selection" width="55" align="center"/>
      
      <el-table-column align="center" label="编号" prop="v0"/>
      <el-table-column align="center" label="名称" prop="v1"/>
      <el-table-column align="center" label="型号" prop="v2"/>
      <el-table-column align="center" label="出厂编码" prop="v3"/>
      <el-table-column align="center" label="总额定功率" prop="v4"/>
      <el-table-column align="center" label="总质量" prop="v5"/>
      <el-table-column align="center" label="最大工作压力" prop="v6"/>
      <el-table-column align="center" label="旋转轴转速" prop="v7"/>
      <el-table-column align="center" label="投运时间" prop="v8"/>
      <el-table-column align="center" label="制造年份" prop="v9"/>
      <el-table-column align="center" label="档案" prop="v10"/>
      <el-table-column align="center" label="状态" prop="v11"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <equipmentDrawer ref="equipmentDrawer"/>
  </div>
</template>

<script>
import equipmentDrawer from '../modules/equipmentDrawer.vue'

export default {
  components:{
    equipmentDrawer
  },
  data(){
    return{
      tableData:[
        {
          v0:"0",
          v1:"0",
          v2:"0",
          v3:"0",
          v4:"0",
          v5:"0",
          v6:"0",
          v7:"0",
          v8:"0",
          v9:"0",
          v10:"0",
          v11:["1111111111111","222222222222","333333333333333"],
        },
        {
          v0:"1",
          v1:"1",
          v2:"1",
          v3:"1",
          v4:"1",
          v5:"1",
          v6:"1",
          v7:"1",
          v8:"1",
          v9:"1",
          v10:"1",
          v11:"1",
        },
        {
          v0:"2",
          v1:"2",
          v2:"2",
          v3:"2",
          v4:"2",
          v5:"2",
          v6:"2",
          v7:"2",
          v8:"2",
          v9:"2",
          v10:"2",
          v11:"2",
        }
      ],
    }
  },
  methods:{
    handleClick(row,data){
      console.log(row)
      console.log(data)
    },
    handleEdit(record){
      this.$refs.equipmentDrawer.edit(record)
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    margin-top: 10px;
  }
</style>