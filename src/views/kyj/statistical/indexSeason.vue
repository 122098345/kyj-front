<template>
  <div class="content">
    <div class="top">
      <QueryLabelMonth @query="getList"/>
    </div>
    <div class="main">
      <StatisticalTableSeason ref="statisticalTableSeason" />
    </div>
  </div>
</template>

<script>
import StatisticalTableSeason from './components/statisticalTableSeason.vue'
import QueryLabelMonth from './components/queryLabelMonth.vue'

export default {
  components:{
    StatisticalTableSeason,QueryLabelMonth
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalTableSeason.getData(queryParams)
    },
  }
}
</script>

<style>

</style>