<template>
  <div class="content">
    <LineChartVals ref="lineChart" class="lineChart" v-show="isShow"/>

    <HistogramChart ref="histograChart" class="histograChart" v-show="isShow"/>
   
    <el-table v-if="isShow" :data="tableData" style="width:100%;" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column align="center" label="暂时不需要">
        <el-table-column align="center" label="日期" prop="historyDate"/>
        <el-table-column align="center" label="最大值" prop="max"/>
        <el-table-column align="center" label="最小值" prop="min"/>
        <el-table-column align="center" label="平均值" prop="avg"/>
        
        <el-table-column align="center" label="分段值">
          <el-table-column align="center" v-for="(item,index) in tableData[0].statisticsJson" :key="index" :label="item.interval">
            <el-table-column align="center" label="百分比">
              <template slot-scope="scope">
                {{scope.row.statisticsJson[index].frequency}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="次数">
              <template slot-scope="scope">
                {{scope.row.statisticsJson[index].segmentsCount}}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 页码跳转 -->
    <el-pagination
      v-show="total>0"
      @size-change="handleSizeChanged"
      @current-change="handelCurrentPageChanged"
      :current-page="queryParams.pageNo"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"/>

  </div>
</template>

<script>
import {getMonthData} from '@api/kyj/statistical.js'
import LineChartVals from '@/components/echarts/lineChartVals.vue'
import HistogramChart from '@/components/echarts/histogramChart.vue'

export default {
  components:{
    LineChartVals,HistogramChart
  },
  data(){
    return{
      isShow:false,         // 是否显示表格
      total:0,              // 总条数

      // 表格数据
      tableData:[],

      // 查询条件
      queryParams:{
        year:'',                // 年份
        number:1,               // 空压机编号
        tagId:null,             // 查询内容
        pageNo:1,               // 页码
        pageSize:20,            // 条数
      },

      // 折线图数据
      title:'',             // 标题
      xLineData:[],         // x轴坐标
      maxData:[],           // 最大值
      minData:[],           // 最小值
      avgData:[],           // 平均值

      // 柱状图数据
      h_xLineData:[],       // x轴坐标
      h_data:[],            // 数据
    }
  },



  methods:{
    // 获取每日数据
    getData(params){
      this.queryParams=params;
      this.getTableData();
    },

    getTableData(){
      getMonthData(this.queryParams).then(response=>{
        if(response.code==200){
          this.isShow=true;
          this.total=response.result.total;
          this.tableData=response.result.records
          this.tableData.forEach(element => {
            element.statisticsJson=JSON.parse(element.statisticsJson)
          });
          this.getLineChartData(this.tableData)
        }else{
          this.isShow=false
        }
      })
    },

    // 获取折线图数据
    getLineChartData(val){
      if(val){
        this.title=val[0].number+'# 空压机月数据统计';
        this.xLineData=[]
        this.maxData=[]
        this.minData=[]
        this.avgData=[];
        val.forEach(element => {
          this.xLineData.push(element.historyDate)
          this.maxData.push(element.max)
          this.minData.push(element.min)
          this.avgData.push(element.avg)
        });

        this.$refs.lineChart.refreshData(this.title,this.xLineData,this.maxData,this.minData,this.avgData)
      }
    },

    // 获取柱状图数据
    getHistogramChartData(val){
      if(val){
        this.h_xLineData=[];
        this.h_data=[];
        val.forEach(element => {
          this.h_xLineData.push(element.interval)
          this.h_data.push(element.frequency)
        });

        this.$refs.histograChart.refreshData(this.h_xLineData,this.h_data);
      }
    },

    // 表格选择改变时
    handleCurrentChange(val){
      if(val){
        console.log(val.statisticsJson)
        this.getHistogramChartData(val.statisticsJson)
      }
      
    },

    // 每页条数改变
    handleSizeChanged(val){
      this.queryParams.pageSize=val;
      this.getTableData();
    },

    // 页码改变时
    handelCurrentPageChanged(val){
      this.queryParams.pageNo=val;
      this.getTableData();
    },


  }
}
</script>

<style scoped>
  .lineChart{
    width: 600px;
    height: 300px;
    float: left;
  }
  .histograChart{
    width: 600px;
    height: 300px;
    float: left;
  }

</style>