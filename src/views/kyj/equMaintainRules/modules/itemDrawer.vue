<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model" label-width="120px" :rules="rules">
        <el-form-item label="名称:" size="small" prop="detailExplain">
          <el-input class="el_dialog_input" v-model="model.detailExplain" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item label="备注:" size="small" prop="remark">
          <el-input class="el_dialog_input" v-model="model.remark" placeholder="请输入备注" clearable/>
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
import {addMaintainRulesItems,editMaintainRulesItems} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      visible:false,      // 是否显示
      drawerWidth:700,    // 宽度
      loading:false,      // 是否传输中
      title:'',           // 标题
      model:{
        id:null,                  // id
        maintainRegulaId:null,    // 父id
        detailExplain:'',         // 名称
        remark:'',                // 备注
      },
      // 验证规则
      rules:{
        detailExplain:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    // 新增
    add(val){
      this.title='新增明细'
      this.model.maintainRegulaId=val.id
      this.visible=true
    },

    // 编辑
    edit(val){
      this.title='编辑明细'
      this.model={
        id:val.id,
        maintainRegulaId:val.maintainRegulaId,    // 父id
        detailExplain:val.detailExplain,          // 名称
        remark:val.remark,                        // 备注
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
      addMaintainRulesItems(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('addItemConfirm',this.model.maintainRegulaId)
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
      editMaintainRulesItems(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('editItemConfirm',this.model.maintainRegulaId)
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
        id:null,                  // id
        maintainRegulaId:null,    // 父id
        detailExplain:'',         // 名称
        remark:'',                // 备注
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