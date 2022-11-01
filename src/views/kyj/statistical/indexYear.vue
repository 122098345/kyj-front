<template>
  <div class="content">
    <div class="top">
      <QueryLabelYear @query="getList"/>
    </div>
    <div class="main">
      <StatisticalTableYear ref="statisticalTableYear" />
    </div>
  </div>
</template>

<script>
import StatisticalTableYear from './components/statisticalTableYear.vue'
import QueryLabelYear from './components/queryLabelYear.vue'

export default {
  components:{
    QueryLabelYear,StatisticalTableYear
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalTableYear.getData(queryParams)
    },
  }
}
</script>

<style>

</style>