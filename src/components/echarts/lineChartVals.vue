<template>
  <div ref="lineChartVals"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'lineChartVals',
  
  data(){
    return{
      title:'',           // 标题
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods:{
    echartsInit() {
      // 使用时只需要把setOption里的对象换成echarts中的options或者自己的参数即可
      echarts.init(this.$refs.lineChartVals).setOption({
        title: {
          left: 'right',
          text: '',
          textStyle:{
            color:'#123',
            fontWeight: "normal",
            fontSize:12,
            fontWeight:1
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        legend: {
          data: ['最大值', '最小值', '平均值']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-01-01','2022-01-02','2022-01-03','2022-01-04','2022-01-05','2022-01-06','2022-01-07','2022-01-08','2022-01-09','2022-01-10',]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '最大值',
            type: 'line',
            stack: 'Total',
            data: []
          },
          {
            name: '最小值',
            type: 'line',
            stack: 'Total',
            data:  []
          },
          {
            name: '平均值',
            type: 'line',
            stack: 'Total',
            data:  []
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      })
    },

    //刷新数据
    refreshData(title,xLineData,max,min,avg){
      var chart = echarts.getInstanceByDom(this.$refs.lineChartVals);
      var option = chart.getOption();
      this.title=title
      console.log(this.title)

      option.xAxis[0].data=xLineData;
      option.series[0].data=max;
      option.series[1].data=min;
      option.series[2].data=avg;
      
      chart.setOption(option);
    },
  },

}
</script>

<style>

</style>