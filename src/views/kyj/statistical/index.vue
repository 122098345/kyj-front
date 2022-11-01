<template>
  <div class="content">
    <div class="top">
      <QueryLabel @query="getList"/>
    </div>
    <div class="main">
      <StatisticalTable ref="statisticalTable"/>
    </div>
    
    
  </div>
</template>

<script>
import StatisticalTable from './components/statisticalTable.vue'
import QueryLabel from './components/queryLabel.vue'

export default {
  components:{
    StatisticalTable,QueryLabel
  },
  data(){
    return{
      
    }
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalTable.getData(queryParams)
    },

    
  }
}
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  height: 100%;
}
</style>