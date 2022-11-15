<template>
  <div class="content">
    <!-- 表单 -->
    <el-table  :data="tableData">
      <el-table-column label="等级" align="center" prop="level" />
      <el-table-column label="通知角色" align="center" prop="roleName" />
      <el-table-column label="通知信息" align="center" prop="message" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click.stop="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-drawer ref="drawer" title="编辑" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="drawerData" label-width="120px" :rules="rules">
        <el-form-item label="通知角色:" size="small">
          <el-select v-model="selectedRoles" multiple placeholder="请选择">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="通知信息:" size="small" prop="message">
          <el-input class="el_dialog_input" type="textarea" :rows="4" v-model="drawerData.message" placeholder="请输入通知信息" clearable/>
        </el-form-item>
        <el-form-item label="备注:" size="small" prop="remark">
          <el-input class="el_dialog_input" type="textarea" :rows="4" v-model="drawerData.remark" placeholder="请输入备注" clearable/>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-close" size="mini" @click="cancle">取消</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="confirm" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </el-form-item>
      </el-form>


    </div>
    
  </el-drawer>

    
  </div>
</template>

<script>
import {getSettingsList,editSettingsList} from '@api/kyj/alarm.js'
import { queryall } from '@/api/api'

export default {
  name:"alarmSettings",
  data(){
    return{
      tableData:[],   // 表格数据

      // 编辑数据
      drawerData:{
        id:null,
        roles:'',
        message:'',
        remark:''
      },

      selectedRoles:[],

      roleList:[],      // 角色列表

      visible:false,    // drawer是否显示

      drawerWidth:700,  // 宽度
      
      loading:false,    // 是否传输中

      // 验证规则
      rules:{
        roleName:[
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        message:[
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ]
      },
    }
  },
  mounted(){
    this.getData();
  },
  methods:{

    // 获取数据
    getData(){
      getSettingsList().then(res=>{
        if(res.code==200){
          this.tableData=res.result
        }
      })
    },

    

    // 编辑
    handleEdit(val){

      this.drawerData.id=val.id
      this.drawerData.message=val.message
      this.drawerData.remark=val.remark

      queryall().then((res)=>{
        if(res.success){
          this.roleList=res.result

          const v1=val.roleName.split(',')
          v1.forEach(element => {
           const v2= this.roleList.find(function (e) {
          	  return e.roleName=== element
            })
            if(v2)
              this.selectedRoles.push(v2.id)
          });

          this.visible=true
        }
      });
    },

    // 确定按钮
    confirm(){
      this.$refs['elForm'].validate((valid) => {
        if (valid) {
          this.editInfo();
        } 
      });
    },

    // 更改数据
    editInfo(){
      this.drawerData.roles= this.selectedRoles.join()
      console.log(this.drawerData)

      editSettingsList(this.drawerData).then(res=>{
        if(res.success){
          this.visible=false;
          this.resetModel()
          this.getData()
        }
      })
    },

    // 取消按钮
    cancle(){
      this.visible=false;
      this.resetModel();
    },

    // 关闭页面前
    handleClose(done){
      if(this.loading){
        return
      }
      this.$confirm('确定要关闭页面吗？已更改的内容将不会保存').then(_ => {
        done()
        this.resetModel();
      }).catch(_ => {});
    },

    // 重置表格数据
    resetData(){
      this.tableData=[]
    },

    // 重置drawer数据
    resetModel(){
      this.drawerData={
        id:null,
        roles:'',
        message:'',
        remark:''
      }
      this.selectedRoles=[],  
      this.roleList=[],      
      this.loading=false;
      this.$refs['elForm'].resetFields();
    }

  },
}
</script>

<style lang="scss" scoped>

</style>