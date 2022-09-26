<template>
  <div class="content">
    <div class="title">空压机数采监控</div>

    <MsgBox kyjID="1" kyjModel="型号1" kyjStyle="螺杆式" kyjStrDate="2021-10-01" :kyjData="kyj01" class="msgBox box1"/>
    <MsgBox kyjID="2" kyjModel="型号2" kyjStyle="螺杆式" kyjStrDate="2021-10-02" :kyjData="kyj02" class="msgBox box2"/>
    <MsgBox kyjID="3" kyjModel="型号3" kyjStyle="螺杆式" kyjStrDate="2021-10-03" :kyjData="kyj03" class="msgBox box3"/>
    <MsgBox kyjID="4" kyjModel="型号4" kyjStyle="磁悬浮式" kyjStrDate="2021-10-04" :kyjData="kyj04" class="msgBox box4"/>
    <MsgBox kyjID="5" kyjModel="型号5" kyjStyle="螺杆式" kyjStrDate="2021-10-05" :kyjData="kyj05" class="msgBox box5"/>

  </div>
</template>

<script>
import MsgBox from './components/MsgBox.vue'
import store from '@/store/'

export default {
  components:{
    MsgBox
  },
  data(){
    return{
      kyj01:{
        id:'',
        personnelDuty:'',
        runState:'',
        runTime:''
      },
      kyj02:{
        id:'',
        personnelDuty:'',
        runState:'',
        runTime:''
      },
      kyj03:{
        id:'',
        personnelDuty:'',
        runState:'',
        runTime:''
      },
      kyj04:{
        id:'',
        personnelDuty:'',
        runState:'',
        runTime:''
      },
      kyj05:{
        id:'1',
        personnelDuty:'111,222,333',
        runState:'true',
        runTime:'12345'
      },
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  
  methods:{
    
    toDoSocket(data){
      if(data.msgId=="M00012"){
        this.kyj01=data.KYJ_Cur_01
        this.kyj02=data.KYJ_Cur_02
        this.kyj03=data.KYJ_Cur_03
        this.kyj04=data.KYJ_Cur_04
      }
    }
  },
  watch:{
    '$socketPublic.state.msg': {
      //处理接收到的消息
      handler: function() {
        let that = this
        that.toDoSocket(that.$socketPublic.state.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .content{
    padding: 0;
    margin:0;
    width:100%;
    height:810px;
    background-image: url("~@/assets/dataCollectMonitor/background.jpg");
    background-repeat:no-repeat,no-repeat;
    background-size: 100% 100%,100% 100%;
  }
  .title{
    color:#fff;
    font-size: 28px;
    text-align: center;
  }
  .msgBox{
    width:440px;
    height:270px;
    float: left;
  }
  .box1{
    margin-left: 7%;
    margin-top: 80px;
  }
  .box2{
    margin-left: 4%;
    margin-top: 80px;
  }
  .box3{
    margin-left: 4%;
    margin-top: 80px;
  }
  .box4{
    margin-left: 21.5%;
    margin-top: 50px;
  }
  .box5{
    margin-left: 4.5%;
    margin-top: 50px;
  }
</style>