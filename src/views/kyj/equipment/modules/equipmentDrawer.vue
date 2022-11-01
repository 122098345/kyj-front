<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :width="drawerWidth"
    @close="handleCancel">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="addForm" :model="model" label-width="120px" :rules="rules">

        <el-form-item label="设备编号:" size="small" prop="equNo">
          <el-input class="el_dialog_input" v-model="model.equNo" placeholder="请输入设备编号" clearable/>
        </el-form-item>
        <el-form-item label="设备名称:" size="small" prop="equName">
          <el-input class="el_dialog_input" v-model="model.equName" placeholder="请输入设备名称" clearable/>
        </el-form-item>
        <el-form-item label="设备型号:" size="small" prop="equType">
          <el-select v-model="model.equType" placeholder="请选择设备类型" size="small" clearable>
            <el-option v-for="(item,index) in equType" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="出厂编码:" size="small" prop="factoryCode">
          <el-input class="el_dialog_input" v-model="model.factoryCode" placeholder="请输入出厂编码" clearable/>
        </el-form-item>
        <el-form-item label="额定功率:" size="small" prop="ratedPower">
          <el-input class="el_dialog_input" v-model="model.ratedPower" placeholder="请输入额定功率" clearable/>
        </el-form-item>
        <el-form-item label="总质量:" size="small" prop="weight">
          <el-input class="el_dialog_input" v-model="model.weight" placeholder="请输入总质量" clearable/>
        </el-form-item>
        <el-form-item label="最大工作压力:" size="small" prop="pressure">
          <el-input class="el_dialog_input" v-model="model.pressure" placeholder="请输入最大工作压力" clearable/>
        </el-form-item>
        <el-form-item label="旋转轴转速:" size="small" prop="rotationSpeed">
          <el-input class="el_dialog_input" v-model="model.rotationSpeed" placeholder="请输入旋转轴转速" clearable/>
        </el-form-item>
        <el-form-item label="投运时间:" size="small" prop="startTime">
          <el-date-picker clearable size="small" v-model="model.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择计划投运时间" :validate-event="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="制造年份:" size="small" prop="productionTime">
          <el-date-picker clearable size="small" v-model="model.productionTime" type="year" value-format="yyyy" placeholder="选择制造年份" :validate-event="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文档:" size="small" prop="files">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        
      
    </el-form>







    </div>
    
  </el-drawer>
</template>

<script>
export default {
  data(){
    return{
      title:'',                 // 标题
      visible:false,            // 是否显示
      drawerWidth:700,          // 宽度
      // 数据
      model:{
        equNo:'',               // 设备编号
        equName:'',             // 设备名称
        equType:null,           // 设备型号
        factoryCode:'',         // 出厂编码
        ratedPower:'',          // 额定功率
        weight:'',              // 总质量
        pressure:'',            // 工作压力
        rotationSpeed:'',       // 旋转速度
        startTime:'',           // 投运时间
        productionTime:'',      // 制造年份
        files:{},               // 档案
        state:0,                // 状态
      },
      // 验证规则
      rules:{

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
  methods:{
    edit(record){
      this.title="编辑"
      this.visible=true;
      console.log(record)
    },
    handleCancel(){

    }
  }
}
</script>

<style>

</style>