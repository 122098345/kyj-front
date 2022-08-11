<template>
  <div class="Screen">
    <img class="main-model" src="@/assets/temperature/main_model.png">


    <div class="lightBox lightBox1"></div>
    <div class="lightBoxBottom lightBoxBottom1"></div>

    <div class="lightBox lightBox2"></div>
    <div class="lightBoxBottom lightBoxBottom2"></div>

    <div class="lightBox3"></div>
    <div class="test lightBoxBottom3"></div>

    <div class="lightBox lightBox4"></div>
    <div class="lightBoxBottom lightBoxBottom4"></div>

    <div class="lightBox lightBox5"></div>
    <div class="lightBoxBottom lightBoxBottom5"></div>

    <div class="controller controller1">
      <img src="@/assets/temperature/floatPic1.png" alt="">
    </div>
    <div class="controller controller2">
      <img src="@/assets/temperature/floatPic2.png" alt="">
    </div>
    <div class="controller controller3">
      <img src="@/assets/temperature/floatPic3.png" alt="">
    </div>
    <div class="controller controller4">
      <img src="@/assets/temperature/floatPic4.png" alt="">
    </div>
    <div class="controller controller5">
      <img src="@/assets/temperature/floatPic5.png" alt="">
    </div>

    
    <!-- <ScrollBox style="width:250px;margin-left:750px;margin-top:-50px"/> -->

    

    

    

  </div>

  
</template>

<script>
  import ScrollBox from '@/components/scrollBox/scrollBox.vue'
  export default {
    components:{
      ScrollBox
    }
  }
</script>

<style lang="scss">
.Screen{
  margin: 0;
  padding: 0;
}
.main-model{
}

.lightBox1{
  margin-top: -348px;
  margin-left: 59px;
}
.lightBoxBottom1{
  margin-top: -218px;
  margin-left: 74px;
}
.lightBox2{
  margin-top: -450px;
  margin-left: 184px;
}
.lightBoxBottom2{
  margin-top: -319px;
  margin-left: 199px;
}
.lightBox4{
  margin-top: -448px;
  margin-left: 657px;
}
.lightBoxBottom4{
  margin-top: -318px;
  margin-left: 672px;
}
.lightBox5{
  margin-top: -348px;
  margin-left: 782px;
}
.lightBoxBottom5{
  margin-top: -218px;
  margin-left: 798px;
}
.lightBox{
  position: absolute;
  width:101px;
  height: 130px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  background:-webkit-linear-gradient(top,rgba(30,227,255,0),rgba(30,227,255,0.5));//rgba(30,227,255,1)
  animation-name: light1;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  background-repeat:no-repeat,no-repeat;
}
.lightBoxBottom{
  position: absolute;
  width:71px;
  border-top:23px solid rgba(30,227,255,0.5);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}

.lightBox3{
  margin-left: 435px;
  margin-top: -410px;
	width: 65px;
	height: 200px;
	transform-origin: 50% 100% 0;
	transform: perspective(300px)  rotateX(-73deg);
	background-image: linear-gradient(rgba(30,227,255, 0), rgba(30,227,255, 0.5));
	position: absolute;
  animation-name: light1;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  background-repeat:no-repeat,no-repeat;
}
.lightBoxBottom3{
  margin-top: -210px;
  margin-left: 433px;
  position: absolute;
  width:66px;
  border-top:19px solid rgba(30,227,255, 0.5);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}

// 上下浮动动画
.controller1 {
  margin-top: -270px;
  margin-left: 90px;
}
.controller2 {
  margin-top: -370px;
  margin-left: 220px;
}
.controller3{
  margin-top: -270px;
  margin-left: 435px;
}
.controller4 {
  margin-top: -370px;
  margin-left: 685px;
}
.controller5 {
  margin-top: -270px;
  margin-left: 820px;
}

.controller {
position: absolute;
width: 24px;
height: 12px;
// z-index: 100;
-webkit-animation: bounce-down 1.6s linear infinite;
animation: bounce-down 1.6s linear infinite;
img {
  position: absolute;
}
}

@keyframes light1 {
  from {
    border-top: 0px solid transparent;
  }
  to {
    border-top: 80px solid transparent;
  }
}
 
@-webkit-keyframes bounce-down {
  25% {
      -webkit-transform: translateY(-4px);
  }
  50%, 100% {
      -webkit-transform: translateY(0);
  }
  75% {
      -webkit-transform: translateY(4px);
  }
}
 
@keyframes bounce-down {
  25% {
        transform: translateY(-4px);
  }
  50%, 100% {
        transform: translateY(0);
  }
  75% {
        transform: translateY(4px);
  }
}




</style>