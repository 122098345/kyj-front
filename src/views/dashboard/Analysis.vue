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
        <MainModel :fx_1="fx_1" :fx_2="fx_2" :fx_3="fx_3" :fx_4="fx_4" :fx_5="fx_5" class="mainModel"/>
        <MsgBox :val_1="qd_1" :val_2="qd_2" :val_3="qd_3" :val_4="qd_4" :val_5="qd_5" class="msgBox"/>
        <ScrollBox class="scrollBox"/>
      </div>

      <div class="bottom_part">
        <img src="@/assets/temperature/arrow.png">
        <span class="item_title">详细参数</span>
        <DataTable :tableData="tableData"/>
      </div>


    </div>

  </div>
</template>

<script>
import LineChart from '../../components/echarts/lineChart.vue'
import MainModel from './components/Screen.vue'
import MsgBox from './components/MsgBox.vue'
import ScrollBox from '@/components/scrollBox/scrollBox.vue'
import DataTable from './components/DataTable.vue'
import store from '@/store/'
import {formatDate} from '@/global/datetimeHelp'

import {getHistoryData} from '@/api/kyj/tempeature.js'
import dateFormat from '../../components/jeecg/JEasyCron/format-date'

export default {
  components:{
    LineChart,MainModel,DataTable,MsgBox,ScrollBox
  },
  data(){
    return{
      acturalData:[],
      predictData:[],
      acturalData2:[],
      predictData2:[],
      acturalData3:[],
      predictData3:[],
      acturalData4:[],
      predictData4:[],
      acturalData5:[],
      predictData5:[],

      tableData:[
        {
          name:'1#空压机',
          acep:'-',        // 排气压力
          opoac:'-',       // 油压
          dpoafoac:'-',   // 空气过滤器压差
          otolr:'-',     // 
          itohroacm:'-',    // 高压转子入口温度
          otohr:'-',       // 高压转子出口温度
          otoac:'-'         // 油温
        },
        {
          name:'2#空压机',
          acep:'-',        // 排气压力
          opoac:'-',       // 油压
          dpoafoac:'-',   // 空气过滤器压差
          otolr:'-',     // 
          itohroacm:'-',    // 高压转子入口温度
          otohr:'-',       // 高压转子出口温度
          otoac:'-'         // 油温
        },
        {
          name:'3#空压机',
          acep:'-',        // 排气压力
          opoac:'-',       // 油压
          dpoafoac:'-',   // 空气过滤器压差
          otolr:'-',     // 
          itohroacm:'-',    // 高压转子入口温度
          otohr:'-',       // 高压转子出口温度
          otoac:'-'         // 油温
        },
        {
          name:'4#空压机',
          acep:'-',        // 排气压力
          opoac:'-',       // 油压
          dpoafoac:'-',   // 空气过滤器压差
          otolr:'-',     // 
          itohroacm:'-',    // 高压转子入口温度
          otohr:'-',       // 高压转子出口温度
          otoac:'-'         // 油温
        },
        {
          name:'5#空压机',
          acep:'-',        // 排气压力
          opoac:'-',       // 油压
          dpoafoac:'-',   // 空气过滤器压差
          otolr:'-',     // 
          itohroacm:'-',    // 高压转子入口温度
          otohr:'-',       // 高压转子出口温度
          otoac:'-'         // 油温
        }
      ],
      // 风险数据
      fx_1:'无风险',
      fx_2:'无风险',
      fx_3:'无风险',
      fx_4:'无风险',
      fx_5:'无风险',

      // 气电比数据
      qd_1:'0',
      qd_2:'0',
      qd_3:'0',
      qd_4:'0',
      qd_5:'0',
    }
    
  },
  created(){
    this.initWebSocket()
  },
  mounted(){
    this.getHisData();
  },
  
  destroyed(){
    
  },
  methods:{
    initWebSocket() {
      this.$socketPublic.dispatch('webSocketInit');//初始化ws
    },
    getHisData(){
      getHistoryData().then(response=>{
        if(response.code==200){
          var KYJ_His_01=response.result.KYJ_His_01;
          // var KYJ_Predict_01=response.result.KYJ_Predict_01;
          var KYJ_His_02=response.result.KYJ_His_02;
          // var KYJ_Predict_02=response.result.KYJ_Predict_02;
          var KYJ_His_03=response.result.KYJ_His_03;
          // var KYJ_Predict_03=response.result.KYJ_Predict_03;
          var KYJ_His_04=response.result.KYJ_His_04;
          // var KYJ_Predict_04=response.result.KYJ_Predict_04;

          for(let i=0;i<KYJ_His_01.length;i++){
            this.acturalData.push([KYJ_His_01[i].timestamp,KYJ_His_01[i].otohroacm_current])
          }
          // for(let i=0;i<KYJ_Predict_01.length;i++){
          //   this.predictData.push([formatDate(new Date(KYJ_Predict_01[i].timestamp).getTime()+600000).otohroacm_predict_10min])
          // }
          for(let i=0;i<KYJ_His_02.length;i++){
            this.acturalData2.push([KYJ_His_02[i].timestamp,KYJ_His_02[i].otohroacm_current])
          }
          // for(let i=0;i<KYJ_Predict_02.length;i++){
          //   this.predictData2.push([formatDate(new Date(KYJ_Predict_02[i].timestamp).getTime()+600000),KYJ_Predict_02[i].otohroacm_predict_10min])
          // }
          for(let i=0;i<KYJ_His_03.length;i++){
            this.acturalData3.push([KYJ_His_03[i].timestamp,KYJ_His_03[i].otohroacm_current])
          }
          // for(let i=0;i<KYJ_Predict_03.length;i++){
          //   this.predictData3.push([formatDate(new Date(KYJ_Predict_03[i].timestamp).getTime()+600000),KYJ_Predict_03[i].otohroacm_predict_10min])
          // }
          for(let i=0;i<KYJ_His_04.length;i++){
            this.acturalData4.push([KYJ_His_04[i].timestamp,KYJ_His_04[i].otohroacm_current])
          }
          // for(let i=0;i<KYJ_Predict_04.length;i++){
          //   this.predictData4.push([formatDate(new Date(KYJ_Predict_04[i].timestamp).getTime()+600000),KYJ_Predict_04[i].otohroacm_predict_10min])
          // }
        }
      })
    },

    // 更新表格数据
    updateTableData(data){
      this.tableData[0].acep=data.KYJ_01.acep
      this.tableData[0].opoac=data.KYJ_01.opoac
      this.tableData[0].dpoafoac=data.KYJ_01.dpoafoac
      this.tableData[0].otolr=data.KYJ_01.otolr
      this.tableData[0].itohroacm=data.KYJ_01.itohroacm
      this.tableData[0].otohr=data.KYJ_01.otohr
      this.tableData[0].otoac=data.KYJ_01.otoac

      this.tableData[1].acep=data.KYJ_02.acep
      this.tableData[1].opoac=data.KYJ_02.opoac
      this.tableData[1].dpoafoac=data.KYJ_02.dpoafoac
      this.tableData[1].otolr=data.KYJ_02.otolr
      this.tableData[1].itohroacm=data.KYJ_02.itohroacm
      this.tableData[1].otohr=data.KYJ_02.otohr
      this.tableData[1].otoac=data.KYJ_02.otoac

      this.tableData[2].acep=data.KYJ_03.acep
      this.tableData[2].opoac=data.KYJ_03.opoac
      this.tableData[2].dpoafoac=data.KYJ_03.dpoafoac
      this.tableData[2].otolr=data.KYJ_03.otolr
      this.tableData[2].itohroacm=data.KYJ_03.itohroacm
      this.tableData[2].otohr=data.KYJ_03.otohr
      this.tableData[2].otoac=data.KYJ_03.otoac

      this.tableData[3].acep=data.KYJ_04.acep
      this.tableData[3].opoac=data.KYJ_04.opoac
      this.tableData[3].dpoafoac=data.KYJ_04.dpoafoac
      this.tableData[3].otolr=data.KYJ_04.otolr
      this.tableData[3].itohroacm=data.KYJ_04.itohroacm
      this.tableData[3].otohr=data.KYJ_04.otohr
      this.tableData[3].otoac=data.KYJ_04.otoac
    },

    // 更新折线图数据
    updateChartData(data){

    },
    // 更新看图数据
    updatePicData(data){
      // this.fx_1=data.KYJ_Predict_01[0].healthState
      // this.fx_2=data.KYJ_Predict_02[0].healthState
      // this.fx_3=data.KYJ_Predict_03[0].healthState
      // this.fx_4=data.KYJ_Predict_04[0].healthState
      // this.fx_5=data.KYJ_Predict_05[0].healthState
    },
    // 更新气电比数据
    updateQDData(data){
      this.qd_1=data.KYJ_01.ser
      this.qd_2=data.KYJ_02.ser
      this.qd_3=data.KYJ_03.ser
      this.qd_4=data.KYJ_04.ser
    },
    toDoSocket: function (data) {
      if(data.msgId=="M00011"){
        // 更新折线图数据
        if(this.acturalData.length>0)
          this.acturalData.shift()
        this.acturalData.push([formatDate(new Date().getTime()),data.KYJ_01.otohr])
        // if(this.predictData.length>0)
        //   this.predictData.shift()
        // this.predictData.push([formatDate(new Date(data.KYJ_Predict_01[0].timestamp).getTime()+600000)],data.KYJ_Predict_01[0].otohroacm_predict_10min)
        
        if(this.acturalData2.length>0)
          this.acturalData2.shift()
        this.acturalData2.push([formatDate(new Date().getTime()),data.KYJ_02.otohr])
        // if(this.predictData2.length>0)
        //   this.predictData2.shift()
        // this.predictData2.push([formatDate(new Date(data.KYJ_Predict_02[0].timestamp).getTime()+600000)],data.KYJ_Predict_02[0].otohroacm_predict_10min)
        
        if(this.acturalData3.length>0)
          this.acturalData3.shift()
        this.acturalData3.push([formatDate(new Date().getTime()),data.KYJ_03.otohr])
        // if(this.predictData3.length>0)
        //   this.predictData3.shift()
        // this.predictData3.push([formatDate(new Date(data.KYJ_Predict_03[0].timestamp).getTime()+600000)],data.KYJ_Predict_03[0].otohroacm_predict_10min)
          
        if(this.acturalData4.length>0)
          this.acturalData4.shift()
          this.acturalData4.push([formatDate(new Date().getTime()),data.KYJ_04.otohr])
        // if(this.predictData4.length>0)
        //   this.predictData4.shift()
        // this.predictData4.push([formatDate(new Date(data.KYJ_Predict_04[0].timestamp).getTime()+600000)],data.KYJ_Predict_04[0].otohroacm_predict_10min)
      }
      
    },

  },
  watch:{
    '$socketPublic.state.msg': {
      //处理接收到的消息
      handler: function() {
        let that = this
        if(that.$socketPublic.state.msg.msgId=="M00011"){
          that.toDoSocket(that.$socketPublic.state.msg)
          that.updateTableData(that.$socketPublic.state.msg)
          that.updatePicData(that.$socketPublic.state.msg)
          that.updateQDData(that.$socketPublic.state.msg)
        }
      }
    }
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