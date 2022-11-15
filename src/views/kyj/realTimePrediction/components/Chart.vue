<template>
  <div ref="realTimeChart" style="width:100%;height:100%"/>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name:'realTimeChart',
  props:{
    title:{},           // 标题名称
    acturalData:{
      type: Array,
      required: true
    },
    predictData10min:{
      type: Array,
      required: true
    },
    predictData20min:{
      type: Array,
      required: true
    },
    predictData30min:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data : [],
      data2 : [],
      chart1:{}
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods:{
      echartsInit() {
        // 使用时只需要把setOption里的对象换成echarts中的options或者自己的参数即可
        echarts.init(this.$refs.realTimeChart).setOption({
          backgroundColor: '#fff',
          title: {
            left: 'center',
            y:10,
            text: this.title+'#空压机温度预测',
            textStyle:{
              color:'#000',
              fontSize:16,
              fontWeight:'bolder'
            },
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            y:35,
            data:[
              {
                name:'预测-10min',
                icon:'circle'
              },
              {
                name:'预测-20min',
                icon:'circle'
              },
              {
                name:'预测-30min',
                icon:'circle'
              },
              {
                name:'实际温度',
                icon:'circle',
              }
            ],
            itemGap:50,
            textStyle:{
              color:'#000',
              fontSize:15,
              fontWeight:1,
            },
          },
          xAxis: {
            type: 'time',
            boundaryGap: [0,1],
            axisTick: {
              show: false
            },
            // splitLine: {
            //   show: false
            // },
            axisLabel:{
              // interval:60,
              formatter:'{HH}:{mm}'
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            max:250,
            min:0,
            interval:50
          },
          series: [
            {
              name: '预测-10min',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: 'rgb(61,89,171)'
              },
              lineStyle: {
                width: 2
              },
              data: this.predictData10min
            },
            {
              name: '预测-20min',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: 'rgb(255,97,3)'
              },
              lineStyle: {
                width: 2
              },
              data: this.predictData20min
            },
            {
              name: '预测-30min',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: 'rgb(160,32,240)'
              },
              lineStyle: {
                width: 2
              },
              data: this.predictData30min
            },
            {
              name: '实际温度',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: 'rgb(0,255,127)'
              },
              lineStyle: {
                width: 2
              },
              data: this.acturalData
            }
          ],
          grid: {
            top: 25,
            left: 45,
            right: 0
          }
        })

      },

      //刷新数据
      refreshData(){
        var chart = echarts.getInstanceByDom(this.$refs.realTimeChart);
        var option = chart.getOption();

        option.series[0].data=this.predictData10min;
        option.series[1].data=this.predictData20min;
        option.series[2].data=this.predictData30min;
        option.series[3].data=this.acturalData;
        
        chart.setOption(option);

    

      }
    },
    watch:{
      predictData10min(){
        this.refreshData()
      },
      predictData20min(){
        this.refreshData()
      },
      predictData30min(){
        this.refreshData()
      },
      acturalData(){
        this.refreshData()
      }
    }
}
</script>

<style>

</style>