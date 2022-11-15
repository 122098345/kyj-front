<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model.equipment" label-width="120px" :rules="rules">
        <el-form-item label="设备编号:" size="small" prop="departmentCode">
          <el-input class="el_dialog_input" v-model="model.equipment.departmentCode" placeholder="请输入设备编号" clearable/>
        </el-form-item>
        <el-form-item label="设备名称:" size="small" prop="equipmentName">
          <el-input class="el_dialog_input" v-model="model.equipment.equipmentName" placeholder="请输入设备名称" clearable/>
        </el-form-item>
        <el-form-item label="设备型号:" size="small" prop="typeCode">
          <el-input class="el_dialog_input" v-model="model.equipment.typeCode" placeholder="请输入设备型号" clearable/>
        </el-form-item>
        <el-form-item label="出厂编码:" size="small" prop="outCode">
          <el-input class="el_dialog_input" v-model="model.equipment.outCode" placeholder="请输入出厂编码" clearable/>
        </el-form-item>
        <el-form-item label="额定功率:" size="small" prop="totalRatedPower">
          <el-input class="el_dialog_input" v-model="model.equipment.totalRatedPower" placeholder="请输入额定功率" clearable/>
        </el-form-item>
        <el-form-item label="总质量:" size="small" prop="grossMass">
          <el-input class="el_dialog_input" v-model="model.equipment.grossMass" placeholder="请输入总质量" clearable/>
        </el-form-item>
        <el-form-item label="最大工作压力:" size="small" prop="maxWorkingPressure">
          <el-input class="el_dialog_input" v-model="model.equipment.maxWorkingPressure" placeholder="请输入最大工作压力" clearable/>
        </el-form-item>
        <el-form-item label="旋转轴转速:" size="small" prop="rotationalShaftSpeed">
          <el-input class="el_dialog_input" v-model="model.equipment.rotationalShaftSpeed" placeholder="请输入旋转轴转速" clearable/>
        </el-form-item>
        <el-form-item label="投运时间:" size="small" prop="purchaseDate">
          <el-date-picker clearable size="small" v-model="model.equipment.purchaseDate" type="date" value-format="yyyy-MM-dd" placeholder="选择计划投运时间" :validate-event="false"/>
        </el-form-item>
        <el-form-item label="制造年份:" size="small" prop="yearManufacture">
          <el-date-picker clearable size="small" v-model="model.equipment.yearManufacture" type="year" value-format="yyyy" placeholder="选择制造年份" :validate-event="false"/>
        </el-form-item>
        <el-form-item label="上次维修时间:" size="small" prop="lastMaintainDate">
          <el-date-picker clearable size="small" v-model="model.equipment.lastMaintainDate" type="date" value-format="yyyy-MM-dd" placeholder="选择上次维修时间" :validate-event="false"/>
        </el-form-item>
        <el-form-item label="维修周期（月）:" size="small" prop="maintainCycle">
          <el-input-number v-model="model.equipment.maintainCycle" :min="0" label="请输入维修周期" clearable></el-input-number>
        </el-form-item>
        <el-form-item label="文档:" size="small" prop="files">
          <el-upload
            class="upload-demo"
            :action="fileAction"
            :headers="headers"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
import Vue from 'vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"
import {addEquipment,queryByIdEquipment,editEquipment} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      title:'',                 // 标题
      visible:false,            // 是否显示
      drawerWidth:700,          // 宽度

      // 文件上传相关数据
      fileAction:window._CONFIG['domianURL']+"/file/upload/v1",
      headers:{},

      // 数据
      model:{
        equipment:{
          departmentCode:'',          // 设备编号
          equipmentName:'',           // 设备名称
          typeCode:'',                // 设备型号
          outCode:'',                 // 出厂编码
          totalRatedPower:'',         // 额定功率
          grossMass:'',               // 总质量
          maxWorkingPressure:'',      // 工作压力
          rotationalShaftSpeed:'',    // 旋转速度
          purchaseDate:'',            // 投运时间
          yearManufacture:'',         // 制造年份
          sysOrgCode:'',              // 所属部门
          lastMaintainDate:'',        // 上次维修时间
          maintainCycle:null,         // 维修周期（月）
          maintainStats:0,            // 维修状态
        },
        fileIdList: []
      },

      fileList:[],            // 文件列表

      loading:false,          // 是否传输中

      // 验证规则
      rules:{
        departmentCode:[
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        equipmentName:[
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        typeCode:[
          { required: true, message: '请输入设备型号', trigger: 'blur' },
        ],
      },
      // 设备类型
      equType:[
        {
          value:0,
          label:"类型1"
        },
        {
          value:1,
          label:"类型2"
        },
        {
          value:2,
          label:"类型3"
        },
        {
          value:3,
          label:"类型4"
        },
      ],
    }
  },
  created(){
    const token = Vue.ls.get(ACCESS_TOKEN);
    this.headers = {"X-Access-Token":token};
  },
  methods:{
    // 新增
    add(){
      this.title="新增";
      this.visible=true;
    },

    // 编辑
    edit(val){
      console.log(val)
      if(val){
        queryByIdEquipment(val.id).then(res=>{
          if(res.code==200){
            console.log(res)
            this.model.equipment=res.result.equipment;
            res.result.equipmentFileList.forEach(element => {
              this.model.fileIdList.push(element.fileId)
              this.fileList.push({id:element.fileId,name:element.originName,url:element.previewPath})
            });

            this.title="编辑"
            this.visible=true;
          }
        })
      }
    },

    // 确定按钮
    confirm(){
      if(this.title=='新增'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            this.addEquipment();
          } 
        });
      }else if(this.title='编辑'){
        this.$refs['elForm'].validate((valid) => {
          if (valid) {
            
            console.log(this.model)
            this.editEquipment();
          } 
        });
      }
    },

    // 取消按钮
    cancle(){
      this.visible=false;
      this.resetModel();
    },
    
    // 新增
    addEquipment(){
      this.loading=true;
      addEquipment(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.resetModel();
          this.$emit('addConfirm')
        }
      }).catch(res=>{
        console.log(res);
        this.loading=false;
      })
    },

    // 编辑
    editEquipment(){
      this.loading=true;
      editEquipment(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.resetModel();
          this.$emit('addConfirm')
        }
      }).catch(_=>{
        console.log(res);
        this.loading=false;
      })
    },

    // 文件上传
    handleSuccess(res){
      console.log(res)
      if(res.code==200){
        this.model.fileIdList.push(res.result.id)
      }
    },

    // 文件移除确认
    beforeRemove(file){
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 文件移除
    handleRemove(file,fileList){
      var itemList=[]
      this.model.fileIdList.forEach(element => {
        if(element!=file.id){
          itemList.push(element)
        }
      });
      this.model.fileIdList=itemList
    },

    // 重置model
    resetModel(){
      this.model={
        equipment:{
          departmentCode:'',          // 设备编号
          equipmentName:'',           // 设备名称
          typeCode:'',                // 设备型号
          outCode:'',                 // 出厂编码
          totalRatedPower:'',         // 额定功率
          grossMass:'',               // 总质量
          maxWorkingPressure:'',      // 工作压力
          rotationalShaftSpeed:'',    // 旋转速度
          purchaseDate:'',            // 投运时间
          yearManufacture:'',         // 制造年份
          sysOrgCode:'',              // 所属部门
        },
        fileIdList: []
      },
      this.title='';
      this.fileList=[];
      this.loading=false;
      this.$refs['elForm'].resetFields();
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
    }
  }
}
</script>

<style>

</style>