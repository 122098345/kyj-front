<template>
  <div class="content">
    <el-form :model="queryParams" ref="elForm" :inline="true" :rules="rules">
      <el-form-item label="空压机" prop="number">
        <el-select v-model="queryParams.number" size="small" placeholder="空压机号">
          <el-option v-for="(item,index) in kyjList" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left:20px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data(){
    return{
      // 查询条件
      queryParams:{
        number:null,      // 空压机id
      },

      // 空压机编号列表
      kyjList:[
        {
          label:'1#空压机',
          value:1
        },
        {
          label:'2#空压机',
          value:2
        },
        {
          label:'3#空压机',
          value:3
        },
        {
          label:'4#空压机',
          value:4
        },
        {
          label:'5#空压机',
          value:5
        },
      ],
      // 验证规则
      rules:{
        number:[
          { required: true, message: '请选择空压机', trigger: 'blur' },
        ],
      },

    }
  },
  methods:{
    // 查询
    handleQuery(){
      this.$refs['elForm'].validate((valid) => {
        if (valid) {
          this.$emit("query",this.queryParams)
        } 
      });
    },

    // 重置
    resetQuery(){
      this.queryParams={
        number:null
      };
    }
  },
}
</script>

<style lang="scss" scoped>

</style>