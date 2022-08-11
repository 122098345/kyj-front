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

        // this.data.push(['2022-08-01 06:00:00', 180]);
        // this.data.push(['2022-08-01 07:00:00', 90]);
        // this.data.push(['2022-08-01 08:00:00', 180]);
        // this.data.push(['2022-08-01 09:00:00', 90]);
        // this.data.push(['2022-08-01 10:00:00', 180]);
        // this.data.push(['2022-08-01 11:00:00', 90]);
        // this.data.push(['2022-08-01 12:00:00', 180]);

        // this.data2.push(['2022-08-01 06:00:00', 90]);
        // this.data2.push(['2022-08-01 07:00:00', 180]);
        // this.data2.push(['2022-08-01 08:00:00', 90]);
        // this.data2.push(['2022-08-01 09:00:00', 180]);
        //使用时只需要把setOption里的对象换成echarts中的options或者自己的参数即可
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
            boundaryGap: false,
            splitLine: {
              show: false
            }
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
      }
    }
  }
</script>