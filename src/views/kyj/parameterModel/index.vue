<template>
  <div class="content">
    <!-- 搜索栏 -->
    <queryLabel ref="queryLabel" @query="query"/>

    <!-- 表单 -->
    <tableMain ref="tableMain"/>

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

      // 查询参数
      queryParams:{
        number:null,    // 编号
      },

    }
  },
  mounted(){
  },
  methods:{
    // 搜索数据
    query(params){
      this.queryParams=params;
      this.getData();
    },
    // 获取数据
    getData(){
      this.$refs.tableMain.getDataList(this.queryParams);
    },

  }
}
</script>

<style>

</style>