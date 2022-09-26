<template>
  <div>
    <div class="selectRow">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="查询值">
          <el-select v-model="queryParams.style" placeholder="查询内容">
            <el-option label="最低值" value="min"></el-option>
            <el-option label="最高值" value="max"></el-option>
            <el-option label="平均值" value="average"></el-option>
            <el-option label="分段值" value="segmented"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="strDate">
          <el-date-picker type="date" placeholder="开始日期" v-model="queryParams.strDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker type="date" placeholder="结束日期" v-model="queryParams.endDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="空压机">
          <el-select v-model="queryParams.kyjNo" placeholder="空压机号">
            <el-option label="1#空压机" value="1"></el-option>
            <el-option label="2#空压机" value="2"></el-option>
            <el-option label="3#空压机" value="3"></el-option>
            <el-option label="4#空压机" value="4"></el-option>
            <el-option label="5#空压机" value="5"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="部门状态" clearable size="small">
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <StatisticalTable style="width:100%"/>
  </div>
</template>

<script>
import StatisticalTable from './components/statisticalTable.vue'
export default {
  components:{
    StatisticalTable,
  },
  data(){
    return{
      queryParams:{
        style:'min',
        kyjNo:'1',
        strDate:'',
        endDate:''
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>