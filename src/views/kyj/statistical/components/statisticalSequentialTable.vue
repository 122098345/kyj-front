<template>
  <div class="content">

    <lineBarChart ref="lineChart" class="lineChart"/>

    <el-table v-if="isShow" :data="tableData" style="width:100%;" highlight-current-row>
      <el-table-column align="center" label="日期" prop="date"/>
      <el-table-column align="center" label="平均值" prop="avg"/>
      <el-table-column align="center" label="同比增长率" prop="ratio"/>
    </el-table>
  </div>
</template>

<script>
import {getSequentialAnalysisData} from '@api/kyj/statistical.js'
import lineBarChart from '@/components/echarts/lineBarChart.vue'

export default {
  components:{
    lineBarChart
  },
  data(){
    return{
      isShow:false,         // 是否显示表格

      // 查询条件
      queryParams:{
        year:'',                // 年份
        startDate:'',           // 开始日期
        endDate:'',             // 结束日期
        number:1,               // 空压机编号
        tagId:null,             // 查询内容
        pageNo:1,               // 页码
        pageSize:20,            // 条数
      },

      title:'',         // 标题
      tableData:[],     // 表格数据

    }
  },
  methods:{
    // 获取每日数据
    getData(params){
      this.queryParams=params;
      this.queryParams.startDate=params.year+'-01'
      this.queryParams.endDate=params.year+'-12'
      this.getTableData();
    },

    getTableData(){
      getSequentialAnalysisData(this.queryParams).then(response=>{
        if(response.code==200){
          this.isShow=true;
          this.tableData=response.result.records
          this.getLineChartData(this.tableData)
        }else{
          this.isShow=false
        }
      })
    },

    getLineChartData(tableData){
      const xLineData=[];
      const lineData=[];
      const barData=[];
      tableData.forEach(element => {
        xLineData.push(element.date)
        lineData.push(element.ratio)
        barData.push(element.avg)
      });

      this.$refs.lineChart.refreshData(xLineData,barData,lineData)
    }
  }
}
</script>

<style lang="scss" scoped>
 .lineChart{
  width: 90%;
  height: 400px;
}
</style>>