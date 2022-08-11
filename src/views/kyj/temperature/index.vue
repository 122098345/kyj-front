<template>
  <div id="content">
    <div class="title">空压机健康状态监控</div>

    <div class="second-title">基础数据</div>

    <div class="charts">
      <div class="chart_title">
        <img src="@/assets/temperature/arrow.png">
        <span class="item_title">空压机温度预测</span>
      </div>
      
      <LineChart ref="child" :title="1" predictColor="rgba(1,126,135,1)"  :acturalData="acturalData" :predictData="predictData" style="width:300px;height:167px"/>
      <LineChart :title="2" predictColor="rgba(81,130,51,1)"  :acturalData="acturalData2" :predictData="predictData2" style="width:300px;height:167px;margin-top:-47px"/>
      <LineChart :title="3" predictColor="rgba(224,197,76,1)" :acturalData="acturalData3" :predictData="predictData3" style="width:300px;height:167px;margin-top:-47px"/>
      <LineChart :title="4" predictColor="rgba(90,72,180,1)"  :acturalData="acturalData4" :predictData="predictData4" style="width:300px;height:167px;margin-top:-47px"/>
      <LineChart :title="5" predictColor="rgba(60,95,179,1)"  :acturalData="acturalData5" :predictData="predictData5" style="width:300px;height:167px;margin-top:-47px"/>
    </div>
    
    <div class="main">
      <div class="top_part">
        <img src="@/assets/temperature/arrow.png">
        <span class="item_title">空压机温度预测</span>
        <MainModel class="mainModel"/>
        <MsgBox class="msgBox"/>
        <ScrollBox class="scrollBox"/>
      </div>

      <div class="bottom_part">
        <img src="@/assets/temperature/arrow.png">
        <span class="item_title">详细参数</span>
        <DataTable/>
      </div>


    </div>



    
  </div>
</template>

<script>
import LineChart from '../../../components/echarts/lineChart.vue'
import MainModel from './components/Screen.vue'
import MsgBox from './components/MsgBox.vue'
import ScrollBox from '@/components/scrollBox/scrollBox.vue'
import DataTable from './components/DataTable.vue'

export default {
  components:{
    LineChart,MainModel,DataTable,MsgBox,ScrollBox
  },
  data(){
    return{
      acturalData:[
        ['2022-08-01 06:00:00', 180],
        ['2022-08-01 07:00:00', 90],
        ['2022-08-01 08:00:00', 180],
        ['2022-08-01 09:00:00', 90]
      ],
      predictData:[
        ['2022-08-01 06:00:00', 90],
        ['2022-08-01 07:00:00', 180],
        ['2022-08-01 08:00:00', 90],
        ['2022-08-01 09:00:00', 180]
      ],
      acturalData2:[
        ['2022-08-01 06:00:00', 180],
        ['2022-08-01 07:00:00', 90],
        ['2022-08-01 08:00:00', 180],
        ['2022-08-01 09:00:00', 90]
      ],
      predictData2:[
        ['2022-08-01 06:00:00', 90],
        ['2022-08-01 07:00:00', 180],
        ['2022-08-01 08:00:00', 90],
        ['2022-08-01 09:00:00', 180]
      ],
      acturalData3:[
        ['2022-08-01 06:00:00', 180],
        ['2022-08-01 07:00:00', 90],
        ['2022-08-01 08:00:00', 180],
        ['2022-08-01 09:00:00', 90]
      ],
      predictData3:[
        ['2022-08-01 06:00:00', 90],
        ['2022-08-01 07:00:00', 180],
        ['2022-08-01 08:00:00', 90],
        ['2022-08-01 09:00:00', 180]
      ],
      acturalData4:[
        ['2022-08-01 06:00:00', 180],
        ['2022-08-01 07:00:00', 90],
        ['2022-08-01 08:00:00', 180],
        ['2022-08-01 09:00:00', 90]
      ],
      predictData4:[
        ['2022-08-01 06:00:00', 90],
        ['2022-08-01 07:00:00', 180],
        ['2022-08-01 08:00:00', 90],
        ['2022-08-01 09:00:00', 180]
      ],
      acturalData5:[
        ['2022-08-01 06:00:00', 180],
        ['2022-08-01 07:00:00', 90],
        ['2022-08-01 08:00:00', 180],
        ['2022-08-01 09:00:00', 90]
      ],
      predictData5:[
        ['2022-08-01 06:00:00', 90],
        ['2022-08-01 07:00:00', 180],
        ['2022-08-01 08:00:00', 90],
        ['2022-08-01 09:00:00', 180]
      ],

    }
    
  },
  methods:{
    
  }
}
</script>

<style scoped lang="scss">
  #content{
      padding: 0;
      margin:0;
      width:100%;
      height:810px;
      background-image: url("~@/assets/temperature/box.png"),url("~@/assets/temperature/background.jpg");
      background-repeat:no-repeat,no-repeat;
      background-size: 100% 100%,100% 100%;
  }
  .title{
    color:rgb(26,202,255);
    padding-top: 10px;
    margin-left: -50px;
    font-size: 43px;
    text-align: center;
  }
  .second-title{
    color:rgb(1,151,253);
    margin-top: 20px;
    margin-left: -46px;
    font-size: 17px;
    text-align: center;
  }
  .charts{
    margin-top: 15px;
    width:20%;
    height:600px;
    margin-left:145px;
    float: left;
  }
  .chart_title{
    margin-bottom: 10px;
    img{
      height: 22px;
      text-align: center;
    }
  }
  .bottom_part{
    width:100%;
    margin-top:-40px;
    float:left;
    z-index: 100;
  }
  .item_title{
    color: #19C8FD;
    padding: 0px 10px;
    text-align: center;
    font-size: 20px;
    
  }
  .main{
    width: 64%;
    height: 625px;
    float: left;
    margin-top: 20px;
  }
  .mainModel{
    margin-left: -30px;
    margin-top: 30px;
  }
  .msgBox{
    margin-left: 910px;
    margin-top: -370px;
  }
  .scrollBox{
    width:250px;
    float: left;
    margin-left:750px;
    margin-top:-50px
  }
</style>