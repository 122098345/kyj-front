<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model" label-width="120px" :rules="rules">
        <el-form-item label="名称:" size="small" prop="partsName">
          <el-input class="el_dialog_input" v-model="model.partsName" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item label="mes编码:" size="small" prop="mesNo">
          <el-input class="el_dialog_input" v-model="model.mesNo" placeholder="请输入mes编码" clearable/>
        </el-form-item>
        <el-form-item label="使用位置:" size="small" prop="location">
          <el-input class="el_dialog_input" v-model="model.location" placeholder="" :disabled="false" clearable/>
        </el-form-item>
        <el-form-item label="订货号:" size="small" prop="orderNo">
          <el-input class="el_dialog_input" v-model="model.orderNo" placeholder="请输入订货号" clearable/>
        </el-form-item>
        <el-form-item label="型号:" size="small" prop="partsNo">
          <el-input class="el_dialog_input" v-model="model.partsNo" placeholder="请输入型号" clearable/>
        </el-form-item>
        <el-form-item label="更换数量:" size="small" prop="count">
          <el-input-number v-model="model.count" :min="0" label="请输入更换数量" clearable></el-input-number>
        </el-form-item>
        <el-form-item label="更换时间:" size="small" prop="updateTime">
          <el-date-picker clearable size="small" v-model="model.updateTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择更换时间" :validate-event="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更换人:" size="small" prop="updateBy">
          <el-input class="el_dialog_input" v-model="model.updateBy" placeholder="请输入更换人" clearable/>
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
import {addParts,editParts} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      visible:false,      // 是否显示
      drawerWidth:700,    // 宽度
      loading:false,      // 是否传输中
      title:'',           // 标题
      model:{
        id:null,          // id
        equipmentId:null, // 父id
        partsName:'',     // 名称
        mesNo:'',         // mes编号
        location:'',      // 使用位置
        orderNo:null,     // 订货号
        partsNo:'',       // 型号
        count:null,       // 更换数量
        updateTime:'',    // 更换时间
        updateBy:'',      // 更换人
        remark:'',        // 备注
      },
 
      // 验证规则
      rules:{
        partsName:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    // 新增
    add(val){
      this.title='新增零部件'
      this.model.equipmentId=val.id
      this.model.location=val.equipmentName
      this.visible=true
    },

    // 编辑
    edit(val){
      this.title='编辑零部件'
      this.model={
        id:val.id,                   // id
        equipmentId:val.equipmentId, // 父id
        partsName:val.partsName,     // 名称
        mesNo:val.mesNo,             // mes编号
        location:val.location,       // 使用位置
        orderNo:val.orderNo,         // 订货号
        partsNo:val.partsNo,         // 型号
        count:val.count,             // 更换数量
        updateTime:val.updateTime,   // 更换时间
        updateBy:val.updateBy,       // 更换人
        remark:val.remark,           // 备注
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
      if(this.title=='新增零部件'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            this.addItem();
          } 
        });
      }else if(this.title='编辑零部件'){
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
      addParts(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('addItemConfirm',this.model.equipmentId)
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
      editParts(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('editItemConfirm',this.model.equipmentId)
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
        id:null,          // id
        equipmentId:null, // 父id
        partsName:'',     // 名称
        mesNo:'',         // mes编号
        location:'',      // 使用位置
        orderNo:null,     // 订货号
        partsNo:'',       // 型号
        count:'',         // 更换数量
        updateTime:'',    // 更换时间
        updateBy:'',      // 更换人
        remark:'',        // 备注
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