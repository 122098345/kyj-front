<template>
  <div class="Screen">
    <img class="main-model" src="@/assets/temperature/main_model.png">


    <div class="lightBox lightBox1" :class="{'risk0':fx_1_risk0,'risk1':fx_1_risk1,'risk2':fx_1_risk2,'risk3':fx_1_risk3,}"></div>
    <div class="lightBoxBottom1" :class="{'lightBoxBottomRisk0':fx_1_risk0,'lightBoxBottomRisk1':fx_1_risk1,'lightBoxBottomRisk2':fx_1_risk2,'lightBoxBottomRisk3':fx_1_risk3}"></div>

    <div class="lightBox lightBox2" :class="{'risk0':fx_2_risk0,'risk1':fx_2_risk1,'risk2':fx_2_risk2,'risk3':fx_2_risk3,}"></div>
    <div class="lightBoxBottom2" :class="{'lightBoxBottomRisk0':fx_2_risk0,'lightBoxBottomRisk1':fx_2_risk1,'lightBoxBottomRisk2':fx_2_risk2,'lightBoxBottomRisk3':fx_2_risk3}"></div>

    <div class="lightBox3" :class="{'lightBox3Risk0':fx_3_risk0,'lightBox3Risk1':fx_3_risk1,'lightBox3Risk2':fx_3_risk2,'lightBox3Risk3':fx_3_risk3,}"></div>
    <div class="lightBoxBottom3 lightBoxBottom33" :class="{'lightBoxBottom3Risk0':fx_3_risk0,'lightBoxBottom3Risk1':fx_3_risk1,'lightBoxBottom3Risk2':fx_3_risk2,'lightBoxBottom3Risk3':fx_3_risk3}"></div>

    <div class="lightBox lightBox4" :class="{'risk0':fx_4_risk0,'risk1':fx_4_risk1,'risk2':fx_4_risk2,'risk3':fx_4_risk3,}"></div>
    <div class="lightBoxBottom4" :class="{'lightBoxBottomRisk0':fx_4_risk0,'lightBoxBottomRisk1':fx_4_risk1,'lightBoxBottomRisk2':fx_4_risk2,'lightBoxBottomRisk3':fx_4_risk3}"></div>

    <div class="lightBox lightBox5" :class="{'risk0':fx_5_risk0,'risk1':fx_5_risk1,'risk2':fx_5_risk2,'risk3':fx_5_risk3,}"></div>
    <div class="lightBoxBottom5" :class="{'lightBoxBottomRisk0':fx_5_risk0,'lightBoxBottomRisk1':fx_5_risk1,'lightBoxBottomRisk2':fx_5_risk2,'lightBoxBottomRisk3':fx_5_risk3}"></div>

    <div class="controller controller1">
      <div class="textStyle1">{{fx_1}}</div>
      <img src="@/assets/temperature/floatPic1.png" alt="">
    </div>
    <div class="controller controller2">
      <div class="textStyle2">{{fx_2}}</div>
      <img src="@/assets/temperature/floatPic2.png" alt="">
    </div>
    <div class="controller controller3">
      <div class="textStyle3">{{fx_3}}</div>
      <img src="@/assets/temperature/floatPic3.png" alt="">
    </div>
    <div class="controller controller4">
      <div class="textStyle4">{{fx_4}}</div>
      <img src="@/assets/temperature/floatPic4.png" alt="">
    </div>
    <div class="controller controller5">
      <div class="textStyle5">{{fx_5}}</div>
      <img src="@/assets/temperature/floatPic5.png" alt="">
    </div>

  </div>

  
</template>

<script>
  export default {
    props:{
      fx_1:{},    // 风险等级
      fx_2:{},    // 风险等级
      fx_3:{},    // 风险等级
      fx_4:{},    // 风险等级
      fx_5:{},    // 风险等级
    },
    data(){
      return{
        //
        // class选择
        //
        fx_1_risk0:true,
        fx_1_risk1:false,
        fx_1_risk2:false,
        fx_1_risk3:false,

        fx_2_risk0:true,
        fx_2_risk1:false,
        fx_2_risk2:false,
        fx_2_risk3:false,

        fx_3_risk0:true,
        fx_3_risk1:false,
        fx_3_risk2:false,
        fx_3_risk3:false,

        fx_4_risk0:true,
        fx_4_risk1:false,
        fx_4_risk2:false,
        fx_4_risk3:false,

        fx_5_risk0:true,
        fx_5_risk1:false,
        fx_5_risk2:false,
        fx_5_risk3:false,
      }
    },
    methods:{
      //
      // 控制class选择（1~5号空压机）
      //
      fx1Changed(newVal,oldVal){
        if(newVal=='正常'){
          this.fx_1_risk0=true;
          this.fx_1_risk1=false;
          this.fx_1_risk2=false;
          this.fx_1_risk3=false;
        }else if(newVal=='一级'){
          this.fx_1_risk0=false;
          this.fx_1_risk1=true;
          this.fx_1_risk2=false;
          this.fx_1_risk3=false;
        }else if(newVal=='二级'){
          this.fx_1_risk0=false;
          this.fx_1_risk1=false;
          this.fx_1_risk2=true;
          this.fx_1_risk3=false;
        }else if(newVal=='三级'){
          this.fx_1_risk0=false;
          this.fx_1_risk1=false;
          this.fx_1_risk2=false;
          this.fx_1_risk3=true;
        }
      },
      fx2Changed(newVal,oldVal){
        if(newVal=='正常'){
          this.fx_2_risk0=true;
          this.fx_2_risk1=false;
          this.fx_2_risk2=false;
          this.fx_2_risk3=false;
        }else if(newVal=='一级'){
          this.fx_2_risk0=false;
          this.fx_2_risk1=true;
          this.fx_2_risk2=false;
          this.fx_2_risk3=false;
        }else if(newVal=='二级'){
          this.fx_2_risk0=false;
          this.fx_2_risk1=false;
          this.fx_2_risk2=true;
          this.fx_2_risk3=false;
        }else if(newVal=='三级'){
          this.fx_2_risk0=false;
          this.fx_2_risk1=false;
          this.fx_2_risk2=false;
          this.fx_2_risk3=true;
        }
      },
      fx3Changed(newVal,oldVal){
        if(newVal=='正常'){
          this.fx_3_risk0=true;
          this.fx_3_risk1=false;
          this.fx_3_risk2=false;
          this.fx_3_risk3=false;
        }else if(newVal=='一级'){
          this.fx_3_risk0=false;
          this.fx_3_risk1=true;
          this.fx_3_risk2=false;
          this.fx_3_risk3=false;
        }else if(newVal=='二级'){
          this.fx_3_risk0=false;
          this.fx_3_risk1=false;
          this.fx_3_risk2=true;
          this.fx_3_risk3=false;
        }else if(newVal=='三级'){
          this.fx_3_risk0=false;
          this.fx_3_risk1=false;
          this.fx_3_risk2=false;
          this.fx_3_risk3=true;
        }
      },
      fx4Changed(newVal,oldVal){
        if(newVal=='正常'){
          this.fx_4_risk0=true;
          this.fx_4_risk1=false;
          this.fx_4_risk2=false;
          this.fx_4_risk3=false;
        }else if(newVal=='一级'){
          this.fx_4_risk0=false;
          this.fx_4_risk1=true;
          this.fx_4_risk2=false;
          this.fx_4_risk3=false;
        }else if(newVal=='二级'){
          this.fx_4_risk0=false;
          this.fx_4_risk1=false;
          this.fx_4_risk2=true;
          this.fx_4_risk3=false;
        }else if(newVal=='三级'){
          this.fx_4_risk0=false;
          this.fx_4_risk1=false;
          this.fx_4_risk2=false;
          this.fx_4_risk3=true;
        }
      },
      fx5Changed(newVal,oldVal){
        if(newVal=='正常'){
          this.fx_5_risk0=true;
          this.fx_5_risk1=false;
          this.fx_5_risk2=false;
          this.fx_5_risk3=false;
        }else if(newVal=='一级'){
          this.fx_5_risk0=false;
          this.fx_5_risk1=true;
          this.fx_5_risk2=false;
          this.fx_5_risk3=false;
        }else if(newVal=='二级'){
          this.fx_5_risk0=false;
          this.fx_5_risk1=false;
          this.fx_5_risk2=true;
          this.fx_5_risk3=false;
        }else if(newVal=='三级'){
          this.fx_5_risk0=false;
          this.fx_5_risk1=false;
          this.fx_5_risk2=false;
          this.fx_5_risk3=true;
        }
      },
    },
    watch:{
      fx_1(val,val2){
        this.fx1Changed(val,val2)
      },
      fx_2(val,val2){
        this.fx2Changed(val,val2)
      },
      fx_3(val,val2){
        this.fx3Changed(val,val2)
      },
      fx_4(val,val2){
        this.fx4Changed(val,val2)
      },
      fx_5(val,val2){
        this.fx5Changed(val,val2)
      },
      
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
  margin-top: -449px;
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
  // background:-webkit-linear-gradient(top,rgba(30,227,255,0),rgba(30,227,255,0.5));//-webkit-linear-gradient(top,rgba(30,227,255,0),rgba(30,227,255,0.5))
  animation-name: light1;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  // background-repeat:no-repeat,no-repeat;
}
.risk0{
  background:-webkit-linear-gradient(top,rgba(30,227,255,0),rgba(30,227,255,0.5));
  background-repeat:no-repeat,no-repeat;
}
.risk1{
  background:-webkit-linear-gradient(top,rgba(238, 59, 4,0),rgba(238, 59, 4, 0.6));
  background-repeat:no-repeat,no-repeat;
}
.risk2{
  background:-webkit-linear-gradient(top,rgba(235, 135, 5,0),rgba(235, 135, 5, 0.6));
  background-repeat:no-repeat,no-repeat;
}
.risk3{
  background:-webkit-linear-gradient(top,rgba(228, 231, 5,0),rgba(228, 231, 5, 0.6));
  background-repeat:no-repeat,no-repeat;
}

.lightBoxBottomRisk0{
  position: absolute;
  width:71px;
  border-top:23px solid rgba(30,227,255,0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottomRisk1{
  position: absolute;
  width:71px;
  border-top:23px solid rgba(238, 59, 4,0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottomRisk2{
  position: absolute;
  width:71px;
  border-top:23px solid rgba(235, 135, 5,0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottomRisk3{
  position: absolute;
  width:71px;
  border-top:23px solid rgba(228, 231, 5,0.6);
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
	// background-image: linear-gradient(rgba(30,227,255, 0), rgba(30,227,255, 0.5));
	position: absolute;
  animation-name: light1;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  // background-repeat:no-repeat,no-repeat;
}
.lightBox3Risk0{
  background-image: linear-gradient(rgba(30,227,255, 0), rgba(30,227,255, 0.5));
  background-repeat:no-repeat,no-repeat;
}
.lightBox3Risk1{
  background-image: linear-gradient(rgba(238, 59, 4, 0), rgba(238, 59, 4, 0.6));
  background-repeat:no-repeat,no-repeat;
}
.lightBox3Risk2{
  background-image: linear-gradient(rgba(235, 135, 5, 0), rgba(235, 135, 5, 0.6));
  background-repeat:no-repeat,no-repeat;
}
.lightBox3Risk3{
  background-image: linear-gradient(rgba(228, 231, 5, 0), rgba(228, 231, 5, 0.6));
  background-repeat:no-repeat,no-repeat;
}


.lightBoxBottom3{
  margin-top: -210px;
  margin-left: 433px;
}
.lightBoxBottom33{
  position: absolute;
  width:66px;
}
.lightBoxBottom3Risk0{
  border-top:19px solid rgba(30,227,255, 0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottom3Risk1{
  border-top:19px solid rgba(238, 59, 4, 0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottom3Risk2{
  border-top:19px solid rgba(235, 135, 5, 0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}
.lightBoxBottom3Risk3{
  border-top:19px solid rgba(228, 231, 5, 0.6);
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
}

// 上下浮动动画
.controller1 {
  margin-top: -290px;
  margin-left: 90px;
}
.controller2 {
  margin-top: -390px;
  margin-left: 220px;
}
.controller3{
  margin-top: -290px;
  margin-left: 435px;
}
.controller4 {
  margin-top: -390px;
  margin-left: 685px;
}
.controller5 {
  margin-top: -290px;
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
  span{
    color: white;
    text-align: center;
    font-size: 5;
  }
}
.textStyle1{
  width: 40px;
  height: 30px;
  color: white;
  text-align: center;
  font-size: 13px;
}
.textStyle2{
  width: 39px;
  height: 30px;
  margin-left: -7px;
  color: white;
  text-align: center;
  font-size: 13px;
}
.textStyle3{
  width: 40px;
  height: 30px;
  margin-left: 10px;
  color: white;
  text-align: center;
  font-size: 13px;
}
.textStyle4{
  width: 40px;
  height: 30px;
  color: white;
  text-align: center;
  font-size: 13px;
}
.textStyle5{
  width: 40px;
  height: 30px;
  margin-left: -7px;
  color: white;
  text-align: center;
  font-size: 13px;
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