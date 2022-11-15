<template>
  <div class="content">
    <el-table :data="tableData" highlight-current-row style="width:100%;">
      <el-table-column label="影响因素展示" align="left">
        <el-table-column align="center" label="影响因素" prop="name"/>
        <el-table-column align="center" label="相关性数值" prop="numerical"/>
        <el-table-column align="center" label="关系" prop="correlation"/>
        <el-table-column align="center" label="关系描述" prop="description"/>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import {getCorrelation} from '@api/kyj/analysis.js'

export default {
  data(){
    return{
      tableData:[],       // 表格数据
    }
  },
  methods:{
    // 获取数据
    getCorrelation(val){
      getCorrelation(val).then(res=>{
        if(res.code==200){
          console.log(res)
          this.tableData=res.result
        }
      })
    },



  }
}
</script>

<style>

</style>