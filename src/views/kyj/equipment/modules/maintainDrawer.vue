<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model" label-width="120px" :rules="rules">
        <el-form-item label="设备名称:" size="small" prop="equipmentName">
          <el-input class="el_dialog_input" v-model="model.equipmentName" disabled/>
        </el-form-item>
        
        <el-form-item label="保养包:" size="small" prop="packageId">
          <el-select v-model="model.packageId" size="small" placeholder="请选择保养包">
            <el-option v-for="(item,index) in maintainBags" :key="index" :label="item.packageName" :value="item.id"/>
          </el-select>
        </el-form-item>
        
        <el-form-item label="维修条例:" size="small" prop="regulaId">
          <el-select v-model="model.regulaId" size="small" placeholder="请选择维修条例">
            <el-option v-for="(item,index) in maintainRules" :key="index" :label="item.maintenanceDesc" :value="item.id"/>
          </el-select>
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
import {addMaintain,getMaintainBagsList,getMaintainRulesList} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      visible:false,      // 是否显示
      drawerWidth:700,    // 宽度
      loading:false,      // 是否传输中
      title:'',           // 标题
      model:{
        equipmentId:null, // 设备id
        equipmentName:'', // 设备名称
        packageId:null,   // 保养包id
        regulaId:null     // 维修条例id
      },

      maintainBags:[],    // 保养包      
      maintainRules:[],   // 维修条例
 
      // 验证规则
      rules:{
        equipmentId:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        packageId:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        regulaId:[
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    // 新增
    add(val){
      this.title='新建维修'
      this.model.equipmentId=val.id
      this.model.equipmentName=val.equipmentName
      this.getBagAndRules()
      this.visible=true
    },

    // 获取保养包和维修条例
    getBagAndRules(){
      getMaintainBagsList().then(res=>{
        if(res.code==200){
          this.maintainBags=res.result
        }
      })
      getMaintainRulesList().then(res=>{
        if(res.code==200){
          this.maintainRules=res.result
        }
      })
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
      if(this.title=='新建维修'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            this.addItem();
          } 
        });
      }
    },

    // 新增
    addItem(){
      this.loading=true;
      addMaintain(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('addMaintainConfirm')
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
        equipmentId:null, // 设备id
        equipmentName:'', // 设备名称
        packageId:null,   // 保养包id
        regulaId:null     // 维修条例id
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