<template>
  <div class="content">

    <doubleLineChart ref="doubleLineChart" class="lineChart"/>

    <el-table class="elTable" :data="tableData" style="width:100%;font-size:10px" highlight-current-row border :row-style="{height:'10px'}">
      <el-table-column align="center" label="月份" prop="month"/>
      <el-table-column align="center" :label="title1" prop="avg1"/>
      <el-table-column align="center" :label="title2" prop="avg2"/>
    </el-table>
  </div>
</template>

<script>
import {getSameAnalysisData} from '@api/kyj/statistical.js'
import doubleLineChart from '@/components/echarts/doubleLineChart.vue'

export default {
  components:{
    doubleLineChart
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
      // 查询条件
      queryParams2:{
        year:'',                // 年份
        startDate:'',           // 开始日期
        endDate:'',             // 结束日期
        number:1,               // 空压机编号
        tagId:null,             // 查询内容
        pageNo:1,               // 页码
        pageSize:20,            // 条数
      },

      // 表格数据
      tableData:[
        {
          month:'一月',
          avg1:null,
          avg2:null,
        },
        {
          month:'二月',
          avg1:null,
          avg2:null,
        },
        {
          month:'三月',
          avg1:null,
          avg2:null,
        },
        {
          month:'四月',
          avg1:null,
          avg2:null,
        },
        {
          month:'五月',
          avg1:null,
          avg2:null,
        },
        {
          month:'六月',
          avg1:null,
          avg2:null,
        },
        {
          month:'七月',
          avg1:null,
          avg2:null,
        },
        {
          month:'八月',
          avg1:null,
          avg2:null,
        },
        {
          month:'九月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十一月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十二月',
          avg1:null,
          avg2:null,
        }
      ],      

      title1:'年份',         // 标题
      title2:'年份',         // 标题
    }
  },
  methods:{
    // 获取每日数据
    getData(params){
      
      this.queryParams.year=parseInt(params.year)-1+''
      this.queryParams.startDate=parseInt(params.year)-1+'-01'
      this.queryParams.endDate=parseInt(params.year)-1+'-12'
      this.queryParams.number=params.number
      this.queryParams.tagId=params.tagId

      this.queryParams2.year=params.year
      this.queryParams2.startDate=params.year+'-01'
      this.queryParams2.endDate=params.year+'-12'
      this.queryParams2.number=params.number
      this.queryParams2.tagId=params.tagId

      this.getTableData();
    },

    getTableData(){
      getSameAnalysisData(this.queryParams).then(response=>{
        if(response.code==200){
          getSameAnalysisData(this.queryParams2).then(res=>{
            if(response.code==200){
              this.dealTableData(this.queryParams.year,response.result.records,this.queryParams2.year,res.result.records);
            }else{
              this.isShow=false
            }
          })
        }else{
          this.isShow=false
        }
      })
    },

    // 处理表格数据
    dealTableData(year1,data1,year2,data2){

      this.resetTableData()
      this.title1=year1
      this.title2=year2

      data1.forEach(element => {
        switch (element.date.slice(5,7)){
          case '01':
            this.tableData[0].avg1=element.avg
            break
          case '02':
            this.tableData[1].avg1=element.avg
            break
          case '03':
            this.tableData[2].avg1=element.avg
            break
          case '04':
            this.tableData[3].avg1=element.avg
            break
          case '05':
            this.tableData[4].avg1=element.avg
            break
          case '06':
            this.tableData[5].avg1=element.avg
            break
          case '07':
            this.tableData[6].avg1=element.avg
            break
          case '08':
            this.tableData[7].avg1=element.avg
            break
          case '09':
            this.tableData[8].avg1=element.avg
            break
          case '10':
            this.tableData[9].avg1=element.avg
            break
          case '11':
            this.tableData[10].avg1=element.avg
            break
          case '12':
            this.tableData[11].avg1=element.avg
            break
        }
      });

      data2.forEach(element => {
        switch (element.date.slice(5,7)){
          case '01':
            this.tableData[0].avg2=element.avg
            break
          case '02':
            this.tableData[1].avg2=element.avg
            break
          case '03':
            this.tableData[2].avg2=element.avg
            break
          case '04':
            this.tableData[3].avg2=element.avg
            break
          case '05':
            this.tableData[4].avg2=element.avg
            break
          case '06':
            this.tableData[5].avg2=element.avg
            break
          case '07':
            this.tableData[6].avg2=element.avg
            break
          case '08':
            this.tableData[7].avg2=element.avg
            break
          case '09':
            this.tableData[8].avg2=element.avg
            break
          case '10':
            this.tableData[9].avg2=element.avg
            break
          case '11':
            this.tableData[10].avg2=element.avg
            break
          case '12':
            this.tableData[11].avg2=element.avg
            break
        }
      });

      this.getLineChartData()
      
    },

    // 重置表格数据
    resetTableData(){
      this.title1='年份'
      this.title2='年份'
      this.tableData=[
        {
          month:'一月',
          avg1:null,
          avg2:null,
        },
        {
          month:'二月',
          avg1:null,
          avg2:null,
        },
        {
          month:'三月',
          avg1:null,
          avg2:null,
        },
        {
          month:'四月',
          avg1:null,
          avg2:null,
        },
        {
          month:'五月',
          avg1:null,
          avg2:null,
        },
        {
          month:'六月',
          avg1:null,
          avg2:null,
        },
        {
          month:'七月',
          avg1:null,
          avg2:null,
        },
        {
          month:'八月',
          avg1:null,
          avg2:null,
        },
        {
          month:'九月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十一月',
          avg1:null,
          avg2:null,
        },
        {
          month:'十二月',
          avg1:null,
          avg2:null,
        }
      ]
    },

    getLineChartData(){
      const data1=[];   // 上一年数据
      const data2=[];   // 本年数据
      this.tableData.forEach(element => {
        data1.push([element.month,element.avg1])
        data2.push([element.month,element.avg2])
      });
      this.$refs.doubleLineChart.refreshData(this.title1,this.title2,data1,data2)
    }
  }
}
</script>

<style lang="less" scoped>
 .lineChart{
  width: 90%;
  height: 400px;
}
.elTable{
  /deep/ th {
    padding: 0 ;
  }
  /deep/ td {
    padding: 0 ;
  }
}
</style>>