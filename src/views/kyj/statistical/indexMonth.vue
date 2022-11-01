<template>
  <div class="content">
    <div class="top">
      <QueryLabelMonth @query="getList"/>
    </div>
    <div class="main">
      <StatisticalTableMonth ref="statisticalTableMonth" />
    </div>
  </div>
</template>

<script>
import StatisticalTableMonth from './components/statisticalTableMonth.vue'
import QueryLabelMonth from './components/queryLabelMonth.vue'

export default {
  components:{
    StatisticalTableMonth,QueryLabelMonth
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalTableMonth.getData(queryParams)
    },
  }
}
</script>

<style>

</style>