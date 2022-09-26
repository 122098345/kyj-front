<template>
  <div ref="realTimeChart" style="width:100%;height:100%"/>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name:'realTimeChart',
  props:{
    title:{},           // 标题名称
    predictColor:{},    // 预测温度颜色
    realColor:{},       // 实际温度颜色
    predictColor_:{},    // 预测温度颜色
    realColor_:{},       // 实际温度颜色
    acturalData:{
      type: Array,
      required: true
    },
    predictData:{
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
                name:'预测温度',
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
            type: 'category',
            boundaryGap: false,
            splitNumber: 60,
            axisTick: {
              show: false
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            max:200,
            min:0,
            interval:50
          },
          series: [
            {
              name: '实际温度',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: this.realColor
              },
              lineStyle: {
                width: 1
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.realColor
                  },
                  {
                    offset: 1,
                    color: this.realColor_
                  }
                ])
              },
              data: this.acturalData
            },
            {
              name: '预测温度',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: this.predictColor
              },
              lineStyle: {
                width: 1
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.predictColor
                  },
                  {
                    offset:1,
                    color: this.predictColor_
                  }
                ])
              },
              data: this.predictData
            }
          ],
          grid: {
            top: 100,
            left: 45,
            right: 10,
            bottom:35
          }
        })
      },
      refreshData(){



        //刷新数据
        var chart = echarts.getInstanceByDom(this.$refs.lineChart);
        var option = chart.getOption();

        option.series[0].data=this.predictData;
        option.series[1].data=this.acturalData;
        
        chart.setOption(option);

    

      }
    },
    watch:{
      predictData(){
        this.refreshData()
      }
    }
}
</script>

<style>

</style>