<template>
  <div class="content">
    <queryLabel @query="query"/>

    <tableMain ref="tableMain" />
  </div>
</template>

<script>
import queryLabel from './components/queryLabel.vue'
import tableMain from './components/tableMain.vue'

export default {
  components:{
    queryLabel,tableMain
  },
  data(){
    return{

    }
  },
  methods:{

    //获取数据
    query(val){
      this.$refs.tableMain.getCorrelation(val.number)
    }
  }
}
</script>

<style>

</style>