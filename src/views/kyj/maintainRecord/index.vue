<template>
  <div class="content">
    <!-- 搜索栏 -->
    <queryLabel ref="queryLabel" @query="searhData"/>

    <!-- 按钮栏 -->
    <actionButtons :isShowBtn="isShowBtn" @handleAdd="handleAdd"/>

    <!-- 表单 -->
    <maintainMain ref="maintainMain" @getTotal="getTotal" @getData="getData" @handleEdit="handleEdit" @handleMaintainConfirm="handleMaintainConfirm" @handleMaintainInfo="handleMaintainInfo"/>

    <!-- 弹窗 -->
    <maintainDrawer ref="maintainDrawer" @editConfirm="editConfirm"/>

    <div class="footer">
      <!-- 页码跳转 -->
      <el-pagination
        v-show="total>0"
        @size-change="handleSizeChanged"
        @current-change="handelCurrentPageChanged"
        :current-page="queryParams.pageNo"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"/>
    </div>
    
  </div>
</template>

<script>
import queryLabel from './components/queryLabel.vue'
import actionButtons from '@/components/kyj/actionButtons.vue'
import maintainMain from './components/maintainMain.vue'
import maintainDrawer from './modules/maintainDrawer.vue'

export default {
  name:"maintain",
  components:{
    queryLabel,actionButtons,maintainMain,maintainDrawer
  },
  data(){
    return{
      // 按钮是否显示
      isShowBtn:{
        add:false,       // 新增
        del:false,      // 删除
        input:false,    // 导入
        output:false,   // 导出
      },

      // 查询参数
      queryParams:{
        equipmentName:'', // 设备名称
        pageNo:1,         // 页码
        pageSize:10,      // 条数
      },

      total:0,          // 总条数
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    // 搜索数据
    searhData(params){
      this.queryParams.equipmentName=params.equipmentName
      console.log(this.queryParams)
      this.getData();
    },
    // 获取数据
    getData(){
      this.$refs.maintainMain.getDataList(this.queryParams);
    },

    // 获取数据条数
    getTotal(val){
      this.total=val;
    },

    // 新增
    handleAdd(){
      // this.$refs.equipmentDrawer.add()
    },

    // 编辑
    handleEdit(val){
      this.$refs.maintainDrawer.edit(val)
    },

    // 编辑确认
    editConfirm(){
      this.getData()
    },

    // 维修完成
    handleMaintainConfirm(val){
      this.$refs.maintainDrawer.maintainConfirm(val)
    },

    // 详情
    handleMaintainInfo(val){
      this.$refs.maintainDrawer.maintainInfo(val)
    },

    // 每页条数改变
    handleSizeChanged(val){
      this.queryParams.pageNo=1;
      this.queryParams.pageSize=val;
      this.getData();
    },

    // 页码改变时
    handelCurrentPageChanged(val){
      this.queryParams.pageNo=val;
      this.getData();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>