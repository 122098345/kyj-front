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
import store from '@/store/'

export default {
  components:{
    LineChart,MainModel,DataTable,MsgBox,ScrollBox
  },
  data(){
    return{
      acturalData:[
        ['06:00', 180],
        ['06:10', 180],
        ['06:20', 180],
        ['06:30', 180]
      ],
      predictData:[
        ['06:00', 80],
        ['06:10', 170],
        ['06:20', 170],
        ['06:30', 170],
        ['06:40', 170],
        ['06:50', 170],
        ['07:00', 170],
      ],
      acturalData2:[
        ['06:00', 180],
        ['06:10', 180],
        ['06:20', 180],
        ['06:30', 180]
      ],
      predictData2:[
       ['06:00', 80],
        ['06:10', 170],
        ['06:20', 170],
        ['06:30', 170],
        ['06:40', 170],
        ['06:50', 170],
        ['07:00', 170],
      ],
      acturalData3:[
        ['06:00', 180],
        ['06:10', 180],
        ['06:20', 180],
        ['06:30', 180]
      ],
      predictData3:[
        ['06:00', 80],
        ['06:10', 170],
        ['06:20', 170],
        ['06:30', 170],
        ['06:40', 170],
        ['06:50', 170],
        ['07:00', 170],
      ],
      acturalData4:[
        ['06:00', 180],
        ['06:10', 180],
        ['06:20', 180],
        ['06:30', 180]
      ],
      predictData4:[
        ['06:00', 80],
        ['06:10', 170],
        ['06:20', 170],
        ['06:30', 170],
        ['06:40', 170],
        ['06:50', 170],
        ['07:00', 170],
      ],
      acturalData5:[
        ['06:00', 180],
        ['06:10', 180],
        ['06:20', 180],
        ['06:30', 180]
      ],
      predictData5:[
        ['06:00', 80],
        ['06:10', 170],
        ['06:20', 170],
        ['06:30', 170],
        ['06:40', 170],
        ['06:50', 170],
        ['07:00', 170],
      ],

    }
    
  },
  created(){
    this.localSocket();
  },
  mounted(){
    this.initWebSocket();
  },
  destroyed: function () { // 离开页面生命周期函数
    this.websocketOnclose();
  },

  methods:{
    // 全局websocket连接
    // localSocket(){
    //   let that=this;
    //   if ("WebSocket" in window) {
    //     var userId = store.getters.userInfo.id;
    //     var url = window._CONFIG['domianURL'].replace("https://","wss://").replace("http://","ws://")+"/websocket/"+userId;
    //     that.ws = new WebSocket(url);
    //     that.global.setWs(that.ws);
    //     that.ws.onopen = function () {
    //       console.log('websocket连接成功');
    //     };
    //     that.ws.onclose = function () {
    //       // 关闭 websocket
    //       console.log("连接已关闭...");
    //       //断线重新连接
    //       setTimeout(() => {
    //           that.localSocket();
    //       }, 2000);
    //     };
    //   } else {
    //     // 浏览器不支持 WebSocket
    //     console.log("您的浏览器不支持 WebSocket!");
    //     this.openNotificationWithIcon('error', '浏览器', '您的浏览器不支持显示消息请更换', 1,1)
    // }
    // },



















    initWebSocket() {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var userId = store.getters.userInfo.id;
      var url = window._CONFIG['domianURL'].replace("https://","wss://").replace("http://","ws://")+"/websocket/"+userId;
      //console.log(url);
      this.websock = new WebSocket(url);
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },
    websocketOnopen: function () {
      console.log("WebSocket连接成功");
      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    websocketOnerror: function (e) {
      console.log("WebSocket连接发生错误");
      this.reconnect();
    },
    websocketOnmessage: function (e) {
      console.log("-----接收消息-------",e.data);
      var data = eval("(" + e.data + ")"); //解析对象
      if(data.cmd == "topic"){
          //系统通知
        // this.loadData();
      }else if(data.cmd == "user"){
          //用户消息
        // this.loadData();
      }
      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    websocketOnclose: function (e) {
      console.log("connection closed (" + e + ")");
      if(e){
        console.log("connection closed (" + e.code + ")");
      }
      this.reconnect();
    },
    websocketSend(text) { // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        console.log("send failed (" + err.code + ")");
      }
    },
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