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
      <td>{{tableData[0].column1}}</td>
      <td>{{tableData[0].column2}}</td>
      <td>{{tableData[0].column3}}</td>
      <td>{{tableData[0].column4}}</td>
      <td>{{tableData[0].column5}}</td>
      <td>{{tableData[0].column6}}</td>
      <td>{{tableData[0].column7}}</td>
      <td>{{tableData[0].column8}}</td>
      <td>{{tableData[0].column9}}</td>
    </tr>
    <tr class="tr2">
      <td>{{tableData[1].column1}}</td>
      <td>{{tableData[1].column2}}</td>
      <td>{{tableData[1].column3}}</td>
      <td>{{tableData[1].column4}}</td>
      <td>{{tableData[1].column5}}</td>
      <td>{{tableData[1].column6}}</td>
      <td>{{tableData[1].column7}}</td>
      <td>{{tableData[1].column8}}</td>
      <td>{{tableData[1].column9}}</td>
    </tr>
    <tr class="tr3">
      <td>{{tableData[2].column1}}</td>
      <td>{{tableData[2].column2}}</td>
      <td>{{tableData[2].column3}}</td>
      <td>{{tableData[2].column4}}</td>
      <td>{{tableData[2].column5}}</td>
      <td>{{tableData[2].column6}}</td>
      <td>{{tableData[2].column7}}</td>
      <td>{{tableData[2].column8}}</td>
      <td>{{tableData[2].column9}}</td>
    </tr>
    <tr class="tr4">
      <td>{{tableData[3].column1}}</td>
      <td>{{tableData[3].column2}}</td>
      <td>{{tableData[3].column3}}</td>
      <td>{{tableData[3].column4}}</td>
      <td>{{tableData[3].column5}}</td>
      <td>{{tableData[3].column6}}</td>
      <td>{{tableData[3].column7}}</td>
      <td>{{tableData[3].column8}}</td>
      <td>{{tableData[3].column9}}</td>
    </tr>
    <tr class="tr5">
      <td>{{tableData[4].column1}}</td>
      <td>{{tableData[4].column2}}</td>
      <td>{{tableData[4].column3}}</td>
      <td>{{tableData[4].column4}}</td>
      <td>{{tableData[4].column5}}</td>
      <td>{{tableData[4].column6}}</td>
      <td>{{tableData[4].column7}}</td>
      <td>{{tableData[4].column8}}</td>
      <td>{{tableData[4].column9}}</td>
    </tr>
  </table>

  
  
</template>

<script>
export default {
  data(){
    return{
      tableData:[
        {
          column1:'1#空压机',
          column2:'6.862bar',
          column3:'2.732bar',
          column4:'-0.005bar',
          column5:'166.60℃',
          column6:'33.10℃',
          column7:'185.70℃',
          column8:'29.30℃'
        },
        {
          column1:'2#空压机',
          column2:'6.862bar',
          column3:'2.732bar',
          column4:'-0.005bar',
          column5:'166.60℃',
          column6:'33.10℃',
          column7:'185.70℃',
          column8:'29.30℃'
        },
        {
          column1:'3#空压机',
          column2:'6.862bar',
          column3:'2.732bar',
          column4:'-0.005bar',
          column5:'166.60℃',
          column6:'33.10℃',
          column7:'185.70℃',
          column8:'29.30℃'
        },
        {
          column1:'4#空压机',
          column2:'6.862bar',
          column3:'2.732bar',
          column4:'-0.005bar',
          column5:'166.60℃',
          column6:'33.10℃',
          column7:'185.70℃',
          column8:'29.30℃'
        },
        {
          column1:'5#空压机',
          column2:'6.862bar',
          column3:'2.732bar',
          column4:'-0.005bar',
          column5:'166.60℃',
          column6:'33.10℃',
          column7:'185.70℃',
          column8:'29.30℃'
        }
      ]
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