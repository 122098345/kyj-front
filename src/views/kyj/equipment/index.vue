<template>
  <div class="content">
    <!-- 搜索栏 -->
    <queryLabel ref="queryLabel" @query="searhData"/>

    <!-- 按钮栏 -->
    <actionButtons :isShowBtn="isShowBtn" @handleAdd="handleAdd" @handleInput="handleInput" @handleOutput="handleOutput"/>

    <!-- 表单 -->
    <equipmentMain ref="equipmentMain" @getTotal="getTotal" @getData="getData" @handleEdit="handleEdit" @addItem="addItem" @editItem="editItem" @addMaintain="addMaintain"/>

    <!-- 弹窗 -->
    <equipmentDrawer ref="equipmentDrawer" @addConfirm="handleAddConfirm"/>
    <partsDrawer ref="partsDrawer" @addItemConfirm="addItemConfirm" @editItemConfirm="editItemConfirm"/>
    <maintainDrawer ref="maintainDrawer" @addMaintainConfirm="addMaintainConfirm"/>

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
import equipmentMain from './components/equipmentMain.vue'
import equipmentDrawer from './modules/equipmentDrawer.vue'
import partsDrawer from './modules/partsDrawer.vue'
import maintainDrawer from './modules/maintainDrawer.vue'

export default {
  name:"equipment",
  components:{
    queryLabel,actionButtons,equipmentMain,equipmentDrawer,partsDrawer,maintainDrawer
  },
  data(){
    return{
      // 按钮是否显示
      isShowBtn:{
        add:true,       // 新增
        del:false,      // 删除
        input:true,     // 导入
        output:true,    // 导出
      },

      // 查询参数
      queryParams:{
        departmentCode:'',        // 设备编码  
        outCode:'',               // 出厂编码
        equipmentName:'',         // 设备名称
        pageNo:1,                 // 页码
        pageSize:10,              // 条数
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
      params.pageSize=this.queryParams.pageSize;
      this.queryParams=params;
      this.getData();
    },
    // 获取数据
    getData(){
      this.$refs.equipmentMain.getDataList(this.queryParams);
    },

    // 获取数据条数
    getTotal(val){
      this.total=val;
    },

    // 新增
    handleAdd(){
      this.$refs.equipmentDrawer.add()
    },

    // 新增确认
    handleAddConfirm(){
      this.getData();
    },

    // 编辑
    handleEdit(val){
      this.$refs.equipmentDrawer.edit(val)
    },

    // 新增零部件
    addItem(val){
      this.$refs.partsDrawer.add(val);
    },

    // 编辑零部件
    editItem(val){
      this.$refs.partsDrawer.edit(val);
    },

    // 新增零部件确认
    addItemConfirm(val){
      this.$refs.equipmentMain.refreshOpenData(val);
    },

    // 编辑零部件确认
    editItemConfirm(val){
      this.$refs.equipmentMain.refreshOpenData(val);
    },

    // 新建维修
    addMaintain(val){
      this.$refs.maintainDrawer.add(val)
    },

    // 新建维修确认
    addMaintainConfirm(){
      this.getData()
    },

    // 导入
    handleInput(){
      console.log("导入")
    },

    // 导出
    handleOutput(){
      console.log("导出")
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