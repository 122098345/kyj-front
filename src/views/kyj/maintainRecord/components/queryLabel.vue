<template>
  <div class="content">
    <el-form :model="queryParams" ref="queryForm" :inline="true"  label-width="100px">
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input v-model="queryParams.equipmentName" placeholder="请输入设备名称" clearable size="small" @keyup.enter.native="handleQuery"/>
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
        equipmentName:'',         // 设备名称
        pageNo:1,                 // 页码
        pageSize:10,              // 条数
      },
    }
  },
  mounted(){
    this.getEquList();
  },
  methods:{
    // 获取设备列表
    getEquList(){
      
    },

    // 重置查询条件
    resetQuery(){
      this.queryParams={
        equipmentName:'',         // 设备名称
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