<template>
  <div class="content">
    <!-- 搜索栏 -->
    <queryLabel ref="queryLabel" @query="searhData"/>

    <!-- 按钮栏 -->
    <actionButtons :isShowBtn="isShowBtn" @handleAdd="handleAdd"/>

    <!-- 表单 -->
    <tableMain ref="tableMain" @getTotal="getTotal" @handleEdit="handleEdit" @addItem="addItem" @editItem="editItem" @getData="getData"/>

     <!-- 弹窗 -->
    <totalDrawer ref="totalDrawer" @addConfirm="addConfirm" @emitConfirm="emitConfirm"/>
    <itemDrawer ref="itemDrawer" @addItemConfirm="addItemConfirm" @editItemConfirm="editItemConfirm"/>

    <!-- 页码跳转 -->
    <div class="footer">
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
import tableMain from './components/tableMain.vue'
import actionButtons from '@/components/kyj/actionButtons.vue'
import totalDrawer from './modules/totalDrawer.vue'
import itemDrawer from './modules/itemDrawer.vue'

export default {
  components:{
    queryLabel,tableMain,actionButtons,totalDrawer,itemDrawer
  },
  data(){
    return{
      // 按钮是否显示
      isShowBtn:{
        add:true,       // 新增
        del:false,      // 删除
        input:false,    // 导入
        output:false,   // 导出
      },

      // 查询参数
      queryParams:{
        packageNumber:'',   // 编号
        packageName:'',     // 名称
        pageNo:1,           // 页码
        pageSize:10,        // 条数
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
      this.queryParams.packageNumber=params.packageNumber;
      this.queryParams.packageName=params.packageName;
      this.getData();
    },
    // 获取数据
    getData(){
      this.$refs.tableMain.getDataList(this.queryParams);
    },

    // 新增
    handleAdd(){
      this.$refs.totalDrawer.add();
    },

    // 编辑
    handleEdit(val){
      this.$refs.totalDrawer.edit(val);
    },

    // 新增Item
    addItem(val){
      this.$refs.itemDrawer.add(val);
    },

    // 编辑Item
    editItem(val){
      this.$refs.itemDrawer.edit(val);
    },

    // 获取数据条数
    getTotal(val){
      this.total=val;
    },

    // 新增确认
    addConfirm(){
      this.getData();
    },

    // 编辑确认
    emitConfirm(){
      this.getData();
    },

    // 新增明细确认
    addItemConfirm(val){
      this.$refs.tableMain.refreshOpenData(val);
    },

    editItemConfirm(val){
      this.$refs.tableMain.refreshOpenData(val);
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
  }
}
</script>

<style>

</style>