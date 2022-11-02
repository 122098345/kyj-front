<template>
  <div class="content">
    <el-button v-show="isShowBtn.add" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
    <el-button v-show="isShowBtn.del" type="danger" icon="el-icon-delete" size="mini" @click="handleDel">删除</el-button>
    <el-button v-show="isShowBtn.input" type="success" icon="el-icon-back" size="mini" @click="handleInput">导入</el-button>
    <el-button v-show="isShowBtn.output" type="success" icon="el-icon-right" size="mini" @click="handleOutput">导出</el-button>
  </div>
</template>

<script>
export default {
  name:"actionButtons",
  props:{
    isShowBtn:{},       // 按钮是否显示
  },
  data(){
    return{

    }
  },
  methods:{
    // 新增
    handleAdd(){
      this.$emit('handleAdd')
    },

    // 删除
    handleDel(){
      this.$emit('handleDel')
    },

    // 导入
    handleInput(){
      this.$emit('handleInput')
    },

    // 导出
    handleOutput(){
      this.$emit('handleOutput')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>