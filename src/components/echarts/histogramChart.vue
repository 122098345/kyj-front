<template>
  <div ref="histogramChart"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'histogramChart',
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
      echarts.init(this.$refs.histogramChart).setOption({
        title: {
          left: 'right',
          text: '分段值统计图',
          textStyle:{
            color:'#000',
            fontWeight: "normal",
            fontSize:15,
            fontWeight:1
          },
        },
        xAxis: {
          type: 'category',
          data: ['0 ~ 40', '40 ~ 80', '80 ~ 120', '120 ~ 160', '160 ~ 200', '200 ~ 240']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      })
    },

    //刷新数据
    refreshData(xLineData,data){
      var chart = echarts.getInstanceByDom(this.$refs.histogramChart);
      var option = chart.getOption();
      option.xAxis[0].data=xLineData;
      option.series[0].data=data;
      
      chart.setOption(option);
    },
  },
}
</script>

<style>

</style>