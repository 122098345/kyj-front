<template>
  <div class="boxContent">
    <div class="title">1#空压机</div>

    <div class="main">
      <div class="mainLeft">
        <img src="@/assets/dataCollectMonitor/airCompressor.png" alt="">
      </div>
      <div class="mainRight">
        <div>设备型号：XXXXXXX</div>
        <div>类型：离心式</div>
        <div>值班人员：XXXXXX</div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomLeft">
        <span>正常</span>
      </div>
      <div class="bottomRight">
        <div class="msg msg1">
          <span style="margin-left:10px">投运时间：2021/03</span>
          <span style="margin-left:30px">累计运行时长：253天</span>
        </div>
        <div class="msg msg2">
          <span style="margin-left:10px">上次异常时间：2022-7-25</span>
          <span style="margin-left:30px">运行状态：<span style="color:rgb(0,255,0)">正常</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    
  }

}
</script>

<style scoped lang="scss">
  .boxContent{
    width:100%;
    height:100%;
    background-image: url("~@/assets/dataCollectMonitor/boxBackground.png");
    background-repeat:no-repeat,no-repeat;
    background-size: 100% 100%,100% 100%;
  }
  .title{
    color: rgb(4,254,255);
    text-align: center;
    line-height: 17px;
    font-size: 17px;
    padding-top: 9px;
  }
  .main{
    margin-top: 15px;
    float: left;
    width:100%;
  }
  .mainLeft{
    float: left;
    width: 50%;
  }
  .mainRight{
    width: 50%;
    height: 100%;
    float: left;
    padding-top: 17px;
    padding-left: 20px;
    line-height: 35px;
    color: #fff;
    font-size: 15px;
  }
  .bottom{
    width:100%;
    height: 84px;
    float: left;
  }
  .bottomLeft{
    width: 14%;
    height: width;
    float: left;
    margin-left: 5%;
    border: 1px dashed rgb(0, 255, 0);
    color: rgb(0,255,0);
    font-size: 20px;
    border-radius: 50%;
    line-height: 55px;
    text-align: center;
  }
  .bottomRight{
    float: left;
    width: 80%;
    height: 65px;
    .msg{
      height: 27px;
      border: 1.5px solid rgb(49,183,240);
      margin-left: 15px;
      margin-right: 10px;
      color: #fff;
    }
    .msg1{
      
    }
    .msg2{
      margin-top: 5px;
    }
  }
</style>