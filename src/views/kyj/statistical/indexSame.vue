<template>
  <div class="content">
    <querySame @query="getList"/>

    <statisticalSameTable ref="statisticalSameTable"/>
  </div>
</template>

<script>
import querySame from './components/querySequential.vue'
import statisticalSameTable from './components/statisticalSameTable.vue'

export default {
  components:{
    querySame,statisticalSameTable
  },
  methods:{
    // 获取数据
    getList(queryParams){
      this.$refs.statisticalSameTable.getData(queryParams)
    },
  }
}
</script>

<style>

</style>