<template>
  <div class="content">
    <div class="title">空压机数采监控</div>

    <MsgBox class="msgBox box1"/>
    <MsgBox class="msgBox box2"/>
    <MsgBox class="msgBox box3"/>
    <MsgBox class="msgBox box4"/>
    <MsgBox class="msgBox box5"/>


    
  </div>
</template>

<script>
import MsgBox from './components/MsgBox.vue'

export default {
  components:{
    MsgBox
  },
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