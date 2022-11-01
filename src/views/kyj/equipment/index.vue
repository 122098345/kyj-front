<template>
  <div class="content">
    <!-- 搜索栏 -->
    <queryLabel @query="getData"/>

    <!-- 按钮栏 -->
    <actionButtons @handleAdd="handleAdd" @handleDel="handleDel" @handleInput="handleInput" @handleOutput="handleOutput"/>

    <!-- 表单 -->
    <equipmentMain/>


    <div class="footer"></div>
    
  </div>
</template>

<script>
import queryLabel from './components/queryLabel.vue'
import actionButtons from '@/components/kyj/actionButtons.vue'
import equipmentMain from './components/equipmentMain.vue'

export default {
  name:"equipment",
  components:{
    queryLabel,actionButtons,equipmentMain
  },
  data(){
    return{

    }
  },
  methods:{
    // 获取数据
    getData(){
      console.log("获取数据")
    },

    // 新增
    handleAdd(){
      console.log("新增")
    },

    // 删除
    handleDel(){
      console.log("删除")
    },

    // 导入
    handleInput(){
      console.log("导入")
    },

    // 导出
    handleOutput(){
      console.log("导出")
    },
  },
}
</script>

<style lang="scss" scoped>

</style>