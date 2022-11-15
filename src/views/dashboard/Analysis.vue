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
        <ScrollBox ref="scrollBox" class="scrollBox"/>
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
      fx_1:'正常',
      fx_2:'正常',
      fx_3:'正常',
      fx_4:'正常',
      fx_5:'正常',

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
          console.log(response)
          const hisKyj1=response.result.historyTemperate[0].list
          const hisKyj2=response.result.historyTemperate[1].list
          const hisKyj3=response.result.historyTemperate[2].list
          const hisKyj4=response.result.historyTemperate[3].list
          const hisKyj5=response.result.historyTemperate[4].list

          const preKyj=response.result.predictTemperate

          const qdData=response.result.gasElectricityRatio;

          // 1# 空压机
          for(let i=0;i<hisKyj1.length;i++){
            if(hisKyj1[i].temperate&&hisKyj1[i].dateTime){
              this.acturalData.push([hisKyj1[i].dateTime,hisKyj1[i].temperate])
            }
          }
          // 2# 空压机
          for(let i=0;i<hisKyj2.length;i++){
            if(hisKyj2[i].temperate&&hisKyj2[i].dateTime){
              this.acturalData2.push([hisKyj2[i].dateTime,hisKyj2[i].temperate])
            }
          }
          // 3# 空压机
          for(let i=0;i<hisKyj3.length;i++){
            if(hisKyj3[i].temperate&&hisKyj3[i].dateTime){
              this.acturalData3.push([hisKyj3[i].dateTime,hisKyj3[i].temperate])
            }
          }
          // 4# 空压机
          for(let i=0;i<hisKyj4.length;i++){
            if(hisKyj4[i].temperate&&hisKyj4[i].dateTime){
              this.acturalData4.push([hisKyj4[i].dateTime,hisKyj4[i].temperate])
            }
          }
          //5# 空压机 暂时不用
          // for(let i=0;i<hisKyj5.length;i++){
          //   if(hisKyj5[i].temperate&&hisKyj5[i].dateTime){
          //     this.acturalData5.push([hisKyj5[i].dateTime,hisKyj5[i].temperate])
          //   }
          // }

          for(let i=0;i<preKyj.length;i++){
            if(preKyj[i][0].predictTemperateType[0].temperate){
              this.predictData.push([preKyj[i][0].predictTemperateType[0].dateTime,preKyj[i][0].predictTemperateType[0].temperate])
            }
            if(preKyj[i][1].predictTemperateType[0].temperate){
              this.predictData2.push([preKyj[i][1].predictTemperateType[0].dateTime,preKyj[i][1].predictTemperateType[0].temperate])
            }
            if(preKyj[i][2].predictTemperateType[0].temperate){
              this.predictData3.push([preKyj[i][2].predictTemperateType[0].dateTime,preKyj[i][2].predictTemperateType[0].temperate])
            }
            if(preKyj[i][3].predictTemperateType[0].temperate){
              this.predictData4.push([preKyj[i][3].predictTemperateType[0].dateTime,preKyj[i][3].predictTemperateType[0].temperate])
            }
            //5# 空压机 暂时不用
            // if(preKyj[i][4].predictTemperateType[0].temperate){
            //   this.predictData5.push([preKyj[i][4].predictTemperateType[0].dateTime,preKyj[i][4].predictTemperateType[0].temperate])
            // }
          }

          if(qdData){
            this.qd_1=qdData.one
            this.qd_2=qdData.two
            this.qd_3=qdData.three
            this.qd_4=qdData.four
            // this.qd_5=qdData.one

          }
        }
      })
    },

    // 更新表格数据
    updateTableData(data){
      this.tableData[0].acep=data.msgTxt[0].detailParams.exhaustPressure
      this.tableData[0].opoac=data.msgTxt[0].detailParams.oilPressure
      this.tableData[0].dpoafoac=data.msgTxt[0].detailParams.airFilterPressureDifference
      this.tableData[0].otolr=data.msgTxt[0].detailParams.lowPressureRotorOutletTemperature
      this.tableData[0].itohroacm=data.msgTxt[0].detailParams.highPressureRotorInletTemperature
      this.tableData[0].otohr=data.msgTxt[0].detailParams.highPressureRotorOutletTemperature
      this.tableData[0].otoac=data.msgTxt[0].detailParams.oilTemperature

      this.tableData[1].acep=data.msgTxt[1].detailParams.exhaustPressure
      this.tableData[1].opoac=data.msgTxt[1].detailParams.oilPressure
      this.tableData[1].dpoafoac=data.msgTxt[1].detailParams.airFilterPressureDifference
      this.tableData[1].otolr=data.msgTxt[1].detailParams.lowPressureRotorOutletTemperature
      this.tableData[1].itohroacm=data.msgTxt[1].detailParams.highPressureRotorInletTemperature
      this.tableData[1].otohr=data.msgTxt[1].detailParams.highPressureRotorOutletTemperature
      this.tableData[1].otoac=data.msgTxt[1].detailParams.oilTemperature

      this.tableData[2].acep=data.msgTxt[2].detailParams.exhaustPressure
      this.tableData[2].opoac=data.msgTxt[2].detailParams.oilPressure
      this.tableData[2].dpoafoac=data.msgTxt[2].detailParams.airFilterPressureDifference
      this.tableData[2].otolr=data.msgTxt[2].detailParams.lowPressureRotorOutletTemperature
      this.tableData[2].itohroacm=data.msgTxt[2].detailParams.highPressureRotorInletTemperature
      this.tableData[2].otohr=data.msgTxt[2].detailParams.highPressureRotorOutletTemperature
      this.tableData[2].otoac=data.msgTxt[2].detailParams.oilTemperature

      this.tableData[3].acep=data.msgTxt[3].detailParams.exhaustPressure
      this.tableData[3].opoac=data.msgTxt[3].detailParams.oilPressure
      this.tableData[3].dpoafoac=data.msgTxt[3].detailParams.airFilterPressureDifference
      this.tableData[3].otolr=data.msgTxt[3].detailParams.lowPressureRotorOutletTemperature
      this.tableData[3].itohroacm=data.msgTxt[3].detailParams.highPressureRotorInletTemperature
      this.tableData[3].otohr=data.msgTxt[3].detailParams.highPressureRotorOutletTemperature
      this.tableData[3].otoac=data.msgTxt[3].detailParams.oilTemperature
    },

    // 更新折线图数据
    updateChartData(data){

    },
    // 更新看图数据
    updatePicData(data){
      this.fx_1=data.msgTxt[0].risk
      this.fx_2=data.msgTxt[1].risk
      this.fx_3=data.msgTxt[2].risk
      this.fx_4=data.msgTxt[3].risk
      this.fx_5=data.msgTxt[4].risk
    },
    // 更新气电比数据
    updateQDData(data){
      this.qd_1=data.msgTxt.one
      this.qd_2=data.msgTxt.two
      this.qd_3=data.msgTxt.three
      this.qd_4=data.msgTxt.four
    },

    // 滚动信息设置
    scrollMsg(data){
      var msg='';
      var isShow=false;
      data.msgTxt.forEach(element => {
        if(element.risk!=='正常'){
          msg+=element.number+'#空压机 风险等级：'+element.risk+'。'
        }
      });
      if(msg!==''){
        isShow=true
      }

      this.$refs.scrollBox.refreshMsg(msg,isShow);
    },

    toDoSocket: function (data) {
        // 更新折线图数据
        if(data.msgTxt[0].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[0].predict10Min){
          if(this.acturalData.length>360)
            this.acturalData.shift()
          this.acturalData.push([data.msgTxt[0].dateTime,data.msgTxt[0].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData.length>420)
            this.predictData.shift()
          this.predictData.push([formatDate(new Date(data.msgTxt[0].dateTime).getTime()+600000),data.msgTxt[0].predict10Min])
        }
        if(data.msgTxt[1].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[1].predict10Min){
          if(this.acturalData2.length>360)
            this.acturalData2.shift()
          this.acturalData2.push([data.msgTxt[1].dateTime,data.msgTxt[1].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData2.length>420)
            this.predictData2.shift()
          this.predictData2.push([formatDate(new Date(data.msgTxt[1].dateTime).getTime()+600000),data.msgTxt[1].predict10Min])
        }
        if(data.msgTxt[2].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[2].predict10Min){
          if(this.acturalData3.length>360)
            this.acturalData3.shift()
          this.acturalData3.push([data.msgTxt[2].dateTime,data.msgTxt[2].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData3.length>420)
            this.predictData3.shift()
          this.predictData3.push([formatDate(new Date(data.msgTxt[2].dateTime).getTime()+600000),data.msgTxt[2].predict10Min])
        }
        if(data.msgTxt[3].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[3].predict10Min){
          if(this.acturalData4.length>360)
            this.acturalData4.shift()
          this.acturalData4.push([data.msgTxt[3].dateTime,data.msgTxt[3].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData4.length>420)
            this.predictData4.shift()
          this.predictData4.push([formatDate(new Date(data.msgTxt[3].dateTime).getTime()+600000),data.msgTxt[3].predict10Min])
        }
        //5# 空压机 暂时不用
        // if(data.msgTxt[4].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[4].predict10Min){
        //   if(this.acturalData5.length>360)
        //     this.acturalData5.shift()
        //   this.acturalData5.push([data.msgTxt[4].dateTime,data.msgTxt[4].detailParams.highPressureRotorOutletTemperature])
        //   if(this.predictData5.length>420)
        //     this.predictData5.shift()
        //   this.predictData5.push([formatDate(new Date(data.msgTxt[4].dateTime).getTime()+600000),data.msgTxt[4].predict10Min])
        // }
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
          that.scrollMsg(that.$socketPublic.state.msg)
        }
        if(that.$socketPublic.state.msg.msgId=="M00012"){
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