<template>
  <div class="content">
    
    <div class="top">
      <div class="top_left">
        <Chart :title="1" :acturalData="acturalData" :predictData10min="predictData_10min" :predictData20min="predictData_20min" :predictData30min="predictData_30min"/>
      </div>
      <div class="top_right">
        <Chart :title="2" :acturalData="acturalData2" :predictData10min="predictData2_10min" :predictData20min="predictData2_20min" :predictData30min="predictData2_30min"/>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom_left">
        <Chart :title="3" :acturalData="acturalData3" :predictData10min="predictData3_10min" :predictData20min="predictData3_20min" :predictData30min="predictData3_30min"/>
      </div>
      <div class="bottom_middle">
        <Chart :title="4" :acturalData="acturalData4" :predictData10min="predictData4_10min" :predictData20min="predictData4_20min" :predictData30min="predictData4_30min"/>
      </div>
      <div class="bottom_right">
        <Chart :title="5" :acturalData="acturalData5" :predictData10min="predictData5_10min" :predictData20min="predictData5_20min" :predictData30min="predictData5_30min"/>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import {getHistoryData} from '@/api/kyj/tempeature.js'
import {formatDate} from '@/global/datetimeHelp'


export default {
  components:{
    Chart
  },
  data(){
    return{
      acturalData:[],         // 1#空压机实际数据
      predictData_10min:[],   // 1#空压机预测数据
      predictData_20min:[],   // 1#空压机预测数据
      predictData_30min:[],   // 1#空压机预测数据

      acturalData2:[],        // 2#空压机实际数据
      predictData2_10min:[],  // 2#空压机预测数据
      predictData2_20min:[],  // 2#空压机预测数据
      predictData2_30min:[],  // 2#空压机预测数据

      acturalData3:[],        // 3#空压机实际数据
      predictData3_10min:[],  // 3#空压机预测数据
      predictData3_20min:[],  // 3#空压机预测数据
      predictData3_30min:[],  // 3#空压机预测数据

      acturalData4:[],        // 4#空压机实际数据
      predictData4_10min:[],  // 4#空压机预测数据
      predictData4_20min:[],  // 4#空压机预测数据
      predictData4_30min:[],  // 4#空压机预测数据

      acturalData5:[],        // 5#空压机实际数据
      predictData5_10min:[],  // 5#空压机预测数据
      predictData5_20min:[],  // 5#空压机预测数据
      predictData5_30min:[],  // 5#空压机预测数据

    }
  },
  created(){
    this.initWebSocket()
  },
  mounted(){
    this.getHisData()
  },
  methods:{
    // 初始化websocket
    initWebSocket() {
      this.$socketPublic.dispatch('webSocketInit');//初始化ws
    },
    // 获取数据
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
              this.predictData_10min.push([preKyj[i][0].predictTemperateType[0].dateTime,preKyj[i][0].predictTemperateType[0].temperate])
              this.predictData_20min.push([preKyj[i][0].predictTemperateType[1].dateTime,preKyj[i][0].predictTemperateType[1].temperate])
              this.predictData_30min.push([preKyj[i][0].predictTemperateType[2].dateTime,preKyj[i][0].predictTemperateType[2].temperate])
            }
            if(preKyj[i][1].predictTemperateType[0].temperate){
              this.predictData2_10min.push([preKyj[i][1].predictTemperateType[0].dateTime,preKyj[i][1].predictTemperateType[0].temperate])
              this.predictData2_20min.push([preKyj[i][1].predictTemperateType[1].dateTime,preKyj[i][1].predictTemperateType[1].temperate])
              this.predictData2_30min.push([preKyj[i][1].predictTemperateType[2].dateTime,preKyj[i][1].predictTemperateType[2].temperate])
            }
            if(preKyj[i][2].predictTemperateType[0].temperate){
              this.predictData3_10min.push([preKyj[i][2].predictTemperateType[0].dateTime,preKyj[i][2].predictTemperateType[0].temperate])
              this.predictData3_20min.push([preKyj[i][2].predictTemperateType[1].dateTime,preKyj[i][2].predictTemperateType[1].temperate])
              this.predictData3_30min.push([preKyj[i][2].predictTemperateType[2].dateTime,preKyj[i][2].predictTemperateType[2].temperate])
            }
            if(preKyj[i][3].predictTemperateType[0].temperate){
              this.predictData4_10min.push([preKyj[i][3].predictTemperateType[0].dateTime,preKyj[i][3].predictTemperateType[0].temperate])
              this.predictData4_20min.push([preKyj[i][3].predictTemperateType[1].dateTime,preKyj[i][3].predictTemperateType[1].temperate])
              this.predictData4_30min.push([preKyj[i][3].predictTemperateType[2].dateTime,preKyj[i][3].predictTemperateType[2].temperate])
            }
            //5# 空压机 暂时不用
            // if(preKyj[i][4].predictTemperateType[0].temperate){
            //   this.predictData5.push([preKyj[i][4].predictTemperateType[0].dateTime,preKyj[i][4].predictTemperateType[0].temperate])
            // }
          }
        }
      })
    },
    // 数据刷新
    refreshData(data){
      // 更新折线图数据
        if(data.msgTxt[0].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[0].predict10Min&&data.msgTxt[0].predict20Min&&data.msgTxt[0].predict30Min){
          if(this.acturalData.length>360)
            this.acturalData.shift()
          this.acturalData.push([data.msgTxt[0].dateTime,data.msgTxt[0].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData_10min.length>420)
            this.predictData_10min.shift()
          this.predictData_10min.push([formatDate(new Date(data.msgTxt[0].dateTime).getTime()+600000),data.msgTxt[0].predict10Min])
          if(this.predictData_20min.length>480)
            this.predictData_20min.shift()
          this.predictData_20min.push([formatDate(new Date(data.msgTxt[0].dateTime).getTime()+1200000),data.msgTxt[0].predict20Min])
          if(this.predictData_30min.length>540)
            this.predictData_30min.shift()
          this.predictData_30min.push([formatDate(new Date(data.msgTxt[0].dateTime).getTime()+1800000),data.msgTxt[0].predict30Min])
        }
        if(data.msgTxt[1].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[1].predict10Min&&data.msgTxt[1].predict20Min&&data.msgTxt[1].predict30Min){
          if(this.acturalData2.length>360)
            this.acturalData2.shift()
          this.acturalData2.push([data.msgTxt[1].dateTime,data.msgTxt[1].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData2_10min.length>420)
            this.predictData2_10min.shift()
          this.predictData2_10min.push([formatDate(new Date(data.msgTxt[1].dateTime).getTime()+600000),data.msgTxt[1].predict10Min])
          if(this.predictData2_20min.length>480)
            this.predictData2_20min.shift()
          this.predictData2_20min.push([formatDate(new Date(data.msgTxt[1].dateTime).getTime()+1200000),data.msgTxt[1].predict20Min])
          if(this.predictData2_30min.length>540)
            this.predictData2_30min.shift()
          this.predictData2_30min.push([formatDate(new Date(data.msgTxt[1].dateTime).getTime()+1800000),data.msgTxt[1].predict30Min])
        }
        if(data.msgTxt[2].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[2].predict10Min&&data.msgTxt[2].predict20Min&&data.msgTxt[2].predict30Min){
          if(this.acturalData3.length>360)
            this.acturalData3.shift()
          this.acturalData3.push([data.msgTxt[2].dateTime,data.msgTxt[2].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData3_10min.length>420)
            this.predictData3_10min.shift()
          this.predictData3_10min.push([formatDate(new Date(data.msgTxt[2].dateTime).getTime()+600000),data.msgTxt[2].predict10Min])
          if(this.predictData3_20min.length>480)
            this.predictData3_20min.shift()
          this.predictData3_20min.push([formatDate(new Date(data.msgTxt[2].dateTime).getTime()+1200000),data.msgTxt[2].predict20Min])
          if(this.predictData3_30min.length>540)
            this.predictData3_30min.shift()
          this.predictData3_30min.push([formatDate(new Date(data.msgTxt[2].dateTime).getTime()+1800000),data.msgTxt[2].predict30Min])
        }
        if(data.msgTxt[3].detailParams.highPressureRotorOutletTemperature&&data.msgTxt[3].predict10Min&&data.msgTxt[3].predict20Min&&data.msgTxt[3].predict30Min){
          if(this.acturalData4.length>360)
            this.acturalData4.shift()
          this.acturalData4.push([data.msgTxt[3].dateTime,data.msgTxt[3].detailParams.highPressureRotorOutletTemperature])
          if(this.predictData4_10min.length>420)
            this.predictData4_10min.shift()
          this.predictData4_10min.push([formatDate(new Date(data.msgTxt[3].dateTime).getTime()+600000),data.msgTxt[3].predict10Min])
          if(this.predictData4_20min.length>480)
            this.predictData4_20min.shift()
          this.predictData4_20min.push([formatDate(new Date(data.msgTxt[3].dateTime).getTime()+1200000),data.msgTxt[3].predict20Min])
          if(this.predictData4_30min.length>540)
            this.predictData4_30min.shift()
          this.predictData4_30min.push([formatDate(new Date(data.msgTxt[3].dateTime).getTime()+1800000),data.msgTxt[3].predict30Min])
        }
    }
  },
  watch:{
    '$socketPublic.state.msg': {
      //处理接收到的消息
      handler: function() {
        let that = this
        if(that.$socketPublic.state.msg.msgId=="M00011"){
          that.refreshData(that.$socketPublic.state.msg)
        }
      }
    }
  }

}
</script>

<style scoped lang="scss">
.content{
  height: 810px;
}
.top{
  height: 50%;
  width: 100%;
  .top_left{
    height: 100%;
    width: 50%;
    float: left;
  }
  .top_right{
    height: 100%;
    width: 50%;
    float: left;
  }
}
.bottom{
  height: 50%;
  width: 100%;
  .bottom_left{
    height: 100%;
    width: 33.3%;
    float: left;
  }
  .bottom_middle{
    height: 100%;
    width: 33.3%;
    float: left;
  }
  .bottom_right{
    height: 100%;
    width: 33.3%;
    float: left;
  }
}

</style>