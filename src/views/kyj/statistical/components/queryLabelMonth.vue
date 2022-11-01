<template>
  <div class="content">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="年份" prop="filterTime">
        <el-date-picker v-model="queryParams.year" type="year" size="small" align="center" placeholder="请选择年份" value-format="yyyy"/>
      </el-form-item>
      <el-form-item label="空压机" prop="number">
        <el-select v-model="queryParams.number" size="small" placeholder="空压机号" @change="kyjSelectChanged">
          <el-option v-for="(item,index) in kyjList" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="查询内容" prop="tagId">
        <el-select v-model="queryParams.tagId" size="small" placeholder="查询内容">
          <el-option v-for="(item,index) in kyjItemList" :key="index" :label="item.label" :value="item.value"/>
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
import {getKyjItems} from '@api/kyj/statistical.js'

export default {
  data(){
    return{
      // 查询条件
      queryParams:{
        year:'',                // 年份
        number:1,               // 空压机编号
        tagId:null,             // 查询内容
        pageNo:1,               // 页码
        pageSize:20,            // 条数
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

      // 空压机属性列表
      kyjItemList:[],
    }
  },
  created(){
    this.getKyjItemList();
  },
  methods:{
    // 空压机号选择改变时
    kyjSelectChanged(){
      this.queryParams.tagId=null;
      this.getKyjItemList();
    },

    // 获取空压机属性列表
    getKyjItemList(){
      getKyjItems(this.queryParams.number).then(response=>{
        if(response.code==200){
          this.kyjItemList=response.result
        }
      })
    },

    // 查询
    handleQuery(){
      this.$emit("query",this.queryParams)
    },

    // 重置
    resetQuery(){
      this.queryParams={
        year:'',                // 年份
        number:1,               // 空压机编号
        tagId:null,             // 查询内容
        pageNo:1,               // 页码
        pageSize:10,            // 条数
      };
      this.getKyjItemList();
    }
  },
}
</script>

<style>

</style>