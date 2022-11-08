<template>
  <div class="content">
    <el-form :model="queryParams" ref="queryForm" :inline="true"  label-width="100px">
      <el-form-item label="名称" prop="maintenanceDesc">
        <el-input v-model="queryParams.maintenanceDesc" placeholder="请输入设备名称" clearable size="small" @keyup.enter.native="handleQuery"/>
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
  data(){
    return{
      queryParams:{
        maintenanceDesc:'',
      }
    }
  },
  methods:{
    // 查询
    handleQuery(){
      this.$emit("query",this.queryParams)
    },

    // 重置查询条件
    resetQuery(){
      this.queryParams={
        maintenanceDesc:'',
      }
      this.$emit("query",this.queryParams)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>>