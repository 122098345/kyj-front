<template>
  <div ref="doubleLineChart"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'doubleLineChart',
  
  data(){
    return{
      title:'',   // 标题
      label1:'',  // 线1名称
      label2:'',  // 线2名称

    }
  },
  mounted() {
    this.echartsInit()
  },
  methods:{
    echartsInit() {
      // 使用时只需要把setOption里的对象换成echarts中的options或者自己的参数即可
      echarts.init(this.$refs.doubleLineChart).setOption({
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
          trigger: 'axis',
          formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker +params[i].seriesName+ '&nbsp;&nbsp;&nbsp;&nbsp;'+ params[i].value[1] + '℃'
            }
            return relVal
          }
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        legend: {
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '',
            type: 'line',
            data:  []
          },
          {
            name: '',
            type: 'line',
            data:  []
          },
        ],
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // }
      })
    },

    //刷新数据
    refreshData(year1,year2,data1,data2){
      var chart = echarts.getInstanceByDom(this.$refs.doubleLineChart);
      var option = chart.getOption();

      option.legend.data=[year1,year2]
      option.series[1].name=year2
      option.series[1].data=data2;
      option.series[0].name=year1
      option.series[0].data=data1;
      
      chart.setOption(option);
    },
  },

}
</script>

<style>

</style>