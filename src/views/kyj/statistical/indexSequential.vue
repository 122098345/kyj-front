<template>
  <div class="content">
    <querySequential @query="getList"/>

    <statisticalSequentialTable ref="statisticalSequentialTable"/>
  </div>
</template>

<script>
import querySequential from './components/querySequential.vue'
import statisticalSequentialTable from './components/statisticalSequentialTable.vue'

export default {
  components:{
    querySequential,statisticalSequentialTable
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalSequentialTable.getData(queryParams)
    },
  }
}
</script>

<style>

</style>