<template>
  <div class="content">
    <el-form :model="queryParams" ref="queryForm" :inline="true"  label-width="100px">
      <el-form-item label="设备编号" prop="departmentCode">
        <el-input v-model="queryParams.departmentCode" placeholder="请输入设备编码" clearable size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input v-model="queryParams.equipmentName" placeholder="请输入设备名称" clearable size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="出厂编码" prop="equipmentType">
        <el-select v-model="queryParams.equipmentType" placeholder="请选择设备类型" clearable size="small" style="width:200px">
          <el-option v-for="item in equipmentType" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left:20px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:"queryLabel",
  data(){
    return{
      // 查询参数
      queryParams:{
        departmentCode:'',        // 设备编码  
        outCode:'',               // 出厂编码
        equipmentName:'',         // 设备名称
        pageNo:1,                 // 页码
        pageSize:10,              // 条数
      },
      equipmentType:[
        {
          value:0,
          label:"类型1"
        },
        {
          value:1,
          label:"类型2"
        },
        {
          value:2,
          label:"类型3"
        },
        {
          value:3,
          label:"类型4"
        }
      ],
    }
  },
  methods:{
    // 重置查询条件
    resetQuery(){
      this.queryParams={
        departmentCode:'',
        outCode:'',
        equipmentName:'',
        pageNo:1,                 // 页码
        pageSize:10,              // 条数
      }
      this.$emit("query",this.queryParams)
    },

    // 查询
    handleQuery(){
      this.$emit("query",this.queryParams)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    margin: 0;
  }

</style>