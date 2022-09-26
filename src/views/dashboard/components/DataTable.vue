<template>
  <table>
    <tr class="tr0">
      <td>空压机名称</td>
      <td>排气压力</td>
      <td>油压</td>
      <td>空气过滤器压差</td>
      <td>低压转子出口温度</td>
      <td>高压转子入口温度</td>
      <td>高压转子出口温度</td>
      <td>油温</td>
    </tr>
    <tr class="tr1">
      <td>{{tableData[0].name}}</td>
      <td>{{tableData[0].acep}}bar</td>
      <td>{{tableData[0].opoac}}bar</td>
      <td>{{tableData[0].dpoafoac}}bar</td>
      <td>{{tableData[0].otolr}}℃</td>
      <td>{{tableData[0].itohroacm}}℃</td>
      <td>{{tableData[0].otohr}}℃</td>
      <td>{{tableData[0].otoac}}℃</td>
    </tr>
    <tr class="tr2">
      <td>{{tableData[1].name}}</td>
      <td>{{tableData[1].acep}}bar</td>
      <td>{{tableData[1].opoac}}bar</td>
      <td>{{tableData[1].dpoafoac}}bar</td>
      <td>{{tableData[1].otolr}}℃</td>
      <td>{{tableData[1].itohroacm}}℃</td>
      <td>{{tableData[1].otohr}}℃</td>
      <td>{{tableData[1].otoac}}℃</td>
    </tr>
    <tr class="tr3">
      <td>{{tableData[2].name}}</td>
      <td>{{tableData[2].acep}}bar</td>
      <td>{{tableData[2].opoac}}bar</td>
      <td>{{tableData[2].dpoafoac}}bar</td>
      <td>{{tableData[2].otolr}}℃</td>
      <td>{{tableData[2].itohroacm}}℃</td>
      <td>{{tableData[2].otohr}}℃</td>
      <td>{{tableData[2].otoac}}℃</td>
    </tr>
    <tr class="tr4">
      <td>{{tableData[3].name}}</td>
      <td>{{tableData[3].acep}}bar</td>
      <td>{{tableData[3].opoac}}bar</td>
      <td>{{tableData[3].dpoafoac}}bar</td>
      <td>{{tableData[3].otolr}}℃</td>
      <td>{{tableData[3].itohroacm}}℃</td>
      <td>{{tableData[3].otohr}}℃</td>
      <td>{{tableData[3].otoac}}℃</td>
    </tr>
    <tr class="tr5">
      <td>{{tableData[4].name}}</td>
      <td>{{tableData[4].acep}}bar</td>
      <td>{{tableData[4].opoac}}bar</td>
      <td>{{tableData[4].dpoafoac}}bar</td>
      <td>{{tableData[4].otolr}}℃</td>
      <td>{{tableData[4].itohroacm}}℃</td>
      <td>{{tableData[4].otohr}}℃</td>
      <td>{{tableData[4].otoac}}℃</td>
    </tr>
    
  </table>

  
  
</template>

<script>
export default {
  props:{
    tableData:{}
  },
  data(){
    return{
      
    }
  },
  methods:{
    

  }
}
</script>

<style scoped lang="scss">
  
  table{
    color: white;
    text-align: center;
    border-collapse:separate; 
    border-spacing:0px 5px;
    width: 100%;
    tr{
      height: 30px;
    }
    .tr0{
      background: -webkit-linear-gradient(left,rgba(50,205,250,0.7),rgba(50,205,250,0));
    }
    .tr1{
      background: -webkit-linear-gradient(left,rgba(0,174,168,0.7),rgba(0,174,168,0));
    }
    .tr2{
      background: -webkit-linear-gradient(left,rgba(113,179,48,0.7),rgba(113,179,48,0));
    }
    .tr3{
      background: -webkit-linear-gradient(left,rgba(221,195,77,0.7),rgba(221,195,77,0));
    }
    .tr4{
      background: -webkit-linear-gradient(left,rgba(121,81,213,0.7),rgba(121,81,213,0));
    }
    .tr5{
      background: -webkit-linear-gradient(left,rgba(81,115,213,0.7),rgba(81,115,213,0));
    }
  }
  


</style>