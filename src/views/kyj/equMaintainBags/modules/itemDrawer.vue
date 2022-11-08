<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model" label-width="120px" :rules="rules">
        <el-form-item label="名称:" size="small" prop="detailName">
          <el-input class="el_dialog_input" v-model="model.detailName" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item label="编号:" size="small" prop="detailNumber">
          <el-input class="el_dialog_input" v-model="model.detailNumber" placeholder="请输入编号" clearable/>
        </el-form-item>
        <el-form-item label="类型:" size="small" prop="detailType">
          <el-input class="el_dialog_input" v-model="model.detailType" placeholder="请输入类型" clearable/>
        </el-form-item>
        <el-form-item label="数量:" size="small" prop="detailCount">
          <!-- <el-input class="el_dialog_input" v-model="model.detailCount" placeholder="请输入数量" clearable/> -->
          <el-input-number v-model="model.detailCount" :min="0" label="请输入数量" clearable></el-input-number>
        </el-form-item>
        <el-form-item label="备注:" size="small" prop="detailRemark">
          <el-input class="el_dialog_input" v-model="model.detailRemark" placeholder="请输入备注" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-close" size="mini" @click="cancle">取消</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="confirm" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import {addMaintainBagItems,editMaintainBagItems} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      visible:false,      // 是否显示
      drawerWidth:700,    // 宽度
      loading:false,      // 是否传输中
      title:'',           // 标题
      model:{
        id:null,            // id
        packageId:null,     // 父id
        detailName:'',      // 名称
        detailNumber:'',    // 编号
        detailType:'',      // 类型
        detailCount:null,   // 数量
        detailRemark:'',    // 备注
      },
      // 验证规则
      rules:{
        detailName:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    // 新增
    add(val){
      this.title='新增明细'
      this.model.packageId=val.id
      this.visible=true
    },

    // 编辑
    edit(val){
      this.title='编辑明细'
      this.model={
        id:val.id,
        packageId:val.packageId,        // 父id
        detailName:val.detailName,      // 名称
        detailNumber:val.detailNumber,  // 编号
        detailType:val.detailType,      // 类型
        detailCount:val.detailCount,    // 数量
        detailRemark:val.detailRemark,  // 备注
      }
      this.visible=true;
    },

    // 关闭页面
    handleClose(done){
      if(this.loading){
        return
      }
      this.$confirm('确定要关闭页面吗？已更改的内容将不会保存').then(_ => {
        done()
        this.resetModel();
      }).catch(_ => {});
    },

    // 取消按钮
    cancle(){
      this.visible=false;
      this.resetModel();
    },

    // 确认
    confirm(){
      if(this.title=='新增明细'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            this.addItem();
          } 
        });
      }else if(this.title='编辑明细'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            this.editItem();
          } 
        });
      }
    },

    // 新增
    addItem(){
      this.loading=true;
      addMaintainBagItems(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('addItemConfirm',this.model.packageId)
          this.resetModel();
        }
      }).catch(res=>{
        console.log(res);
        this.loading=false;
      })
    },

    // 编辑
    editItem(){
      this.loading=true;
      editMaintainBagItems(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('editItemConfirm',this.model.packageId)
          this.resetModel();
        }
      }).catch(res=>{
        console.log(res);
        this.loading=false;
      })
    },



    // 重置model
    resetModel(){
      this.model={
        id:null,            // id
        packageId:null,     // 父id
        detailName:'',      // 名称
        detailNumber:'',    // 编号
        detailType:'',      // 类型
        detailCount:null,   // 数量
        detailRemark:'',    // 备注
      },
      this.title='';
      this.loading=false;
      this.$refs['elForm'].resetFields();
    }
  }
}
</script>

<style>

</style>