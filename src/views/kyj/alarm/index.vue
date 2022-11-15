<template>
  <div class="content">
    <div class="queryLabel">
      <el-form ref="alarmListQuery" :model="queryParams" :rules="rules" :inline="true">
        <el-form-item label="查询时间" prop="filterTime">
          <el-date-picker v-model="queryParams.filterTime" type="daterange" align="center" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item label="告警级别">
          <el-select v-model="queryParams.level" placeholder="告警等级"  clearable>
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
      
    </div>
    <div class="dataTable">
      <el-table  :data="dataList">
        <el-table-column label="时间" align="center" prop="createDatetime" />
        <el-table-column label="告警等级" align="center" prop="level" />
        <el-table-column label="空压机" align="center" prop="number" />
        <el-table-column label="温度(℃)" align="center" prop="temperate" />
        <el-table-column label="告警内容" align="center" prop="remark" />
      </el-table>
      <!-- 页码跳转 -->
      <el-pagination
        v-show="total>0"
        @size-change="handleSizeChanged"
        @current-change="handelCurrentPageChanged"
        :current-page="queryParams.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"/>
    </div>
  </div>
</template>

<script>
import {getDataList} from '@api/kyj/alarm.js'
import moment from "moment";
export default {
  data(){
    return{
      queryParams:{
        startDateTime:'',
        endDateTime:'',
        level:'',
        pageNo:1,
        pageSize:10,
        filterTime:''
      },
      dataList:[],              // 数据列表
      total:0,                  // 总条数
      
    }
  },
  mounted(){
    this.getDataList();
  },
  methods:{
    getDataList(){
      getDataList(this.queryParams).then(response=>{
        if(response.code==200){
          console.log(response)
          this.dataList=response.result.records
          this.total=response.result.total
        }
      })
    },
    // 每页条数改变
    handleSizeChanged(val){
      this.queryParams.pageSize=val;
      this.getDataList();
    },
    // 页码改变时
    handelCurrentPageChanged(val){
      this.queryParams.pageNo=val;
      this.getDataList();
    },
    handleQuery(){
      this.$refs["alarmListQuery"].validate(valid => {
        if (valid) {
          this.queryParams.pageNo=1
          if(this.queryParams.filterTime && this.queryParams.filterTime.length === 2){
            this.queryParams.startDateTime= moment(this.queryParams.filterTime[0]).format('YYYY-MM-DD HH:mm:ss');
            this.queryParams.endDateTime= moment(this.queryParams.filterTime[1]).add(1,'days').format('YYYY-MM-DD HH:mm:ss');
          }
          this.getDataList();
        }
      });
    },
    exportExcel(){

    },
  },
}
</script>

<style scoped lang="scss">

</style>