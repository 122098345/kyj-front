<template>
  <div ref="lineBarChart"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'lineBarChart',
  
  data(){
    return{
      title:'',        // 标题
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods:{
    echartsInit() {
      // 使用时只需要把setOption里的对象换成echarts中的options或者自己的参数即可
      echarts.init(this.$refs.lineBarChart).setOption({
        title: {
        },
        tooltip: {
          trigger: 'axis',
          
          formatter: function (params) {
            var relVal = params[0].name
            relVal += '<br/>' + params[0].marker +params[0].seriesName+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ params[0].value + '℃'
            relVal += '<br/>' + params[1].marker +params[1].seriesName+ '&nbsp;&nbsp;&nbsp;&nbsp;'+ params[1].value + '%'
            return relVal
          }
        },
        legend: {},
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: ['2021-01','2021-02','2021-03','2021-04','2021-05','2021-06','2021-07','2021-08','2021-09','2021-10','2021-11','2021-12']
          },
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '平均值',
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            name: '同比增涨率',
            max:100,
            min: -100,
            boundaryGap: [0.2, 0.2]
          },
          // {
          //   type: 'value',
          //   name: '销量（支）',
          //   splitLine: {
          //     show: false
          //   },
          //   nameLocation: 'middle',
          //   nameGap: 70
          // },
          // {
          //   type: 'value',
          //   name: '营业额（万元）',
          //   splitLine: {
          //     show: false
          //   },
          //   nameLocation: 'middle',
          //   nameGap: 50
          // }
        ],
        series: [
          {
            name: '平均值',
            type: 'bar',
            data: []
          },
          {
            name: '同比增长率',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: []
          }
        ]
      })
    },

    //刷新数据
    refreshData(xLineData,avg,rate){
      var chart = echarts.getInstanceByDom(this.$refs.lineBarChart);
      var option = chart.getOption();

      option.xAxis[0].data=xLineData;
      option.series[0].data=avg;
      option.series[1].data=rate;
      
      chart.setOption(option);
    },
  },

}
</script>

<style>

</style>