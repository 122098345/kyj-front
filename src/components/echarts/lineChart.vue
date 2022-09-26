<template>
  <div ref="lineChart"/>
</template>

<script>
import * as echarts from 'echarts';
import { putAction } from '../../api/manage';
  export default {
    name: "echarts",
    props:{
      title:{},       // 标题名称
      predictColor:{},// 预测温度颜色
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
        echarts.init(this.$refs.lineChart).setOption({
          title: {
            left: 'right',
            text: this.title+'#空压机温度预测',
            textStyle:{
              color:'#fff',
              fontWeight: "normal",
              fontSize:12,
              fontWeight:1
            },
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            left: 'left',
            data:[
              {
                name:'实际温度',
                icon:'rect',
              },
              {
                name:'预测温度',
                icon:'rect'
              }
            ],
            textStyle:{
              color:'white',
              fontSize:11,
              fontWeight:1,
            },
            itemWidth:7,
            itemHeight:7,
            left:13
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
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            },
            max:200,
            min:0,
            interval:50
          },
          series: [
            {
              name: '预测温度',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: this.predictColor
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.predictColor
                  },
                  {
                    offset:1,
                    color: 'rgba(0,0,0,0)'
                  }
                ])
              },
              data: this.predictData
            },
            {
              name: '实际温度',
              type: 'line',
              smooth: true,
              showSymbol: false,
              itemStyle: {
                color: '#fff'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0,0,0,0)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)'
                  }
                ])
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
      },
      acturalData(){
        this.refreshData()
      }
    }
  }
</script>
