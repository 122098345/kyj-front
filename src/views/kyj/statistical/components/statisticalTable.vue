<template>
    <el-table :data="tableData" style="width:100%;">
      <el-table-column align="center" label="1#空压机2022-01-01~2022-01-02日最低温度统计">
        <el-table-column align="center" label="日期" prop="v0">

        </el-table-column>
        <el-table-column align="center" label="低压转子冷却水出口温度最低值" prop="v1">

        </el-table-column>
        <el-table-column align="center" label="高压转子出口温度" prop="v2">

        </el-table-column>
        <el-table-column align="center" label="冷却水入口温度" prop="v3">

        </el-table-column>
        <el-table-column align="center" label="排气温度" prop="v4">

        </el-table-column>
        <el-table-column align="center" label="油温" prop="v5">

        </el-table-column>
        <el-table-column align="center" label="油压" prop="v6">

        </el-table-column>
        <el-table-column align="center" label="中间冷却器压力" prop="v7">

        </el-table-column>
        <el-table-column align="center" label="冷却水出口温度" prop="v8">

        </el-table-column>
        <el-table-column align="center" label="加载压力带" prop="v9">

        </el-table-column>
        <el-table-column align="center" label="空压机电机线圈1u1温度" prop="v10">

        </el-table-column>
        <el-table-column align="center" label="能耗" prop="v11">

        </el-table-column>
        <el-table-column align="center" label="效率" prop="v12">

        </el-table-column>

      </el-table-column>
    </el-table>
</template>

<script>
export default {
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
          v11:"0",
          v12:"0",
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
          v12:"1",
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
          v12:"2",
        }
      ],
    }
  }
}
</script>

<style>

</style>