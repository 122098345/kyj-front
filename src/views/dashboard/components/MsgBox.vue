<template>
  <div class="msgBox">
    <div class="leftLine"></div>
    <div class="mainTable">
      <span class="title">气电比(Nm3/KW.h)</span>
      <table>
        <tr>
          <td><span>{{val_1}}</span></td>
          <td>1#空压机</td>
        </tr>
        <tr>
          <td><span>{{val_2}}</span></td>
          <td>2#空压机</td>
        </tr>
        <tr>
          <td><span>{{val_3}}</span></td>
          <td>3#空压机</td>
        </tr>
        <tr>
          <td><span>{{val_4}}</span></td>
          <td>4#空压机</td>
        </tr>
        <tr>
          <td><span>{{val_5}}</span></td>
          <td>5#空压机</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    val_1:{},
    val_2:{},
    val_3:{},
    val_4:{},
    val_5:{},
  },
  data(){
    return{
      
    }
  }
}
</script>

<style scoped lang="scss">
  .msgBox{
    position: absolute;
    height: 220px;
    width: 170px;
    border-radius:0px 0px 6px 6px;
    background: -webkit-linear-gradient(top,rgba(36,129,188,0),rgba(36,129,188,1));
    .leftLine{
      width: 5px;
      height: 200px;
      border-radius: 5px;
      float: left;
      margin-left: 10px;
      background: -webkit-linear-gradient(top,rgb(37,211,233),rgba(142,254,158,1));
    }
    .mainTable{
      color: white;
      width: 75%;
      float: left;
      .title{
        color: white;
        font-size: 13px;
        padding-left: 10px;

      }
      table{
        margin-left: 5px;
        text-align: left;
        border-collapse:separate; 
        border-spacing:7px 5px;
        span{
          font-size: 20px;
        }
      }
    }
  }
</style>