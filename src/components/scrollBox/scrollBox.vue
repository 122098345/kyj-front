<template>
  <div class="box1">
    <div class="box2">
      <img src="@/assets/temperature/warning.png">
      <div class="box3">
        <div class="marquee">3#空压机 风险等级：3级，已通知班组长和值班人员。&nbsp;&nbsp;&nbsp;</div>
        <div class="marqueeT">3#空压机 风险等级：3级，已通知班组长和值班人员。&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .box1{
    height: 30px;
    width: 100%;
    margin: 0;
    padding: 0;
    
    border-top: 2px solid; 
    border-bottom: 2px solid; 
    border-image: -webkit-linear-gradient(left,rgba(172,28,17,0.3),rgba(172,28,17,1),rgba(172,28,17,0.3))10 10 10; /* 控制边框颜色渐变 */
  }
  .box2{
    color: #fff;
    

    width: 100%;
    height: 22px;
    margin-top: 2px;
    margin-bottom: 2px;
    background: -webkit-linear-gradient(left,rgba(172,28,17,0.3),rgba(172,28,17,1),rgba(172,28,17,0.3));
  }
  img{
    width: 13%;
    float: left;
  }
  .box3{
    width: 87%;
    height: 100%;
    float: left;

    position: relative;
    overflow: hidden;
  }

  .marquee{
    animation: marquee 10s linear infinite;
    white-space: nowrap;
    position: absolute;
    margin-left: 30px;
  }
  .marqueeT{
    animation: marqueeT 10s linear infinite;
    white-space: nowrap;
    position: absolute;
    margin-left: 30px;
  }
  @keyframes marquee {
    0%{
      left: 0;
    }
    100%{
      left: -170%;
    }
  }
  @keyframes marqueeT {
    0%{
      left:170%
    }
    100%{
      left: 0;
    }
  }
 


</style>