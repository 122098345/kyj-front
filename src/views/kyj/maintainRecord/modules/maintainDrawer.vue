<template>
  <el-drawer ref="drawer" :title="title" :visible.sync="visible" :width="drawerWidth" :before-close="handleClose">

    <div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">

      <el-form ref="elForm" :model="model" label-width="120px">
        <div class="maintainRules">
          <h2>维修条例:  {{model.regularInfo.regulaName}}</h2>
          <div v-for="(item,index) in model.regularInfo.detailList" :key="index" >
            <el-checkbox :disabled="title=='维修详情'" v-model="item.isDone">{{item.detailExplain}}</el-checkbox>
          </div>
        </div>

        <div class="maintainBags" style="margin-top:30px">
          <h2>维修包：</h2>
          <el-table :data="maintainBags.detailList" style="width:100%;">
            <el-table-column align="center" :label="maintainBags.packageName">
              <el-table-column align="center" label="名称" prop="detailName"/>
              <el-table-column align="center" label="数量" prop="detailCount"/>
            </el-table-column>
          </el-table>
        </div>

        <div v-show="title=='维修确认'||title=='维修详情'">
          <h2>维修确认：</h2>
          <el-form-item label="维修人:" size="small" prop="serviceman">
            <el-input class="el_dialog_input" v-model="model.serviceman" placeholder="" :disabled="title=='维修详情'" clearable/>
          </el-form-item>
          
          <el-form-item label="反馈:" size="small" prop="feedback">
            <el-input class="el_dialog_input" v-model="model.feedback" placeholder="" :disabled="title=='维修详情'" clearable/>
          </el-form-item>
          
          <el-form-item label="备注:" size="small" prop="remark">
            <el-input class="el_dialog_input" v-model="model.remark" placeholder="" :disabled="title=='维修详情'" clearable/>
          </el-form-item>
        </div>
        
        <el-form-item>
          <el-button icon="el-icon-close" size="mini" @click="cancle">取消</el-button>
          <el-button v-show="title!='维修详情'" type="primary" icon="el-icon-check" size="mini" @click="confirm" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </el-form-item>
      </el-form>

      

      
    </div>
  </el-drawer>
</template>

<script>
import {editMaintain,confirmMaintain} from '@api/kyj/equipment.js'

export default {
  data(){
    return{
      visible:false,      // 是否显示
      drawerWidth:700,    // 宽度
      loading:false,      // 是否传输中
      title:'',           // 标题


      model:{
        id:null,
        feedback:'',      // 反馈
        regularInfo:[],
        remark:'',
        serviceman:''
      },
      maintainBags:[],    // 保养包

      
    }
  },
  methods:{
    // 编辑
    edit(val){
      this.title='编辑维修记录'
      console.log(this.title)

      this.model.id=val.id
      this.model.regularInfo=JSON.parse(val.regularInfo)
      this.maintainBags=JSON.parse(val.packageInfo)
      this.visible=true
    },

    // 维修确认
    maintainConfirm(val){
      this.title='维修确认'
      console.log(this.title)

      this.model.id=val.id
      this.model.regularInfo=JSON.parse(val.regularInfo)
      this.maintainBags=JSON.parse(val.packageInfo)
      this.visible=true
    },

    // 维修详情
    maintainInfo(val){
      this.title='维修详情'
      console.log(this.title)
      this.model.id=val.id
      this.model.feedback=val.feedback
      this.model.remark=val.remark
      this.model.serviceman=val.serviceman
      this.model.regularInfo=JSON.parse(val.regularInfo)
      this.maintainBags=JSON.parse(val.packageInfo)
      this.visible=true
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
      if(this.title=='编辑维修记录'){
        this.addItem();
      }else if(this.title=='维修确认'){
        this.addConfirm();
      }
    },

    // 新增
    addItem(){
      this.loading=true;
      editMaintain(this.model).then(res=>{
        if(res.code==200){
          this.visible=false;
          this.$emit('editConfirm')
          this.resetModel();
        }
      }).catch(res=>{
        console.log(res);
        this.loading=false;
      })
    },

    // 维修完成确认
    addConfirm(){
      this.loading=true;
      editMaintain(this.model).then(res=>{
        if(res.code==200){
          confirmMaintain(this.model.id).then(response=>{
            this.visible=false;
            this.$emit('editConfirm')
            this.resetModel();
          })
        }
      }).catch(res=>{
        console.log(res);
        this.loading=false;
      })
    },

    



    // 重置model
    resetModel(){
      this.model={
        id:null,
        feedback:'',      // 反馈
        regularInfo:[],
        remark:'',
        serviceman:''
      },
      this.maintainBags=[]

      this.title='';
      this.loading=false;
      this.$refs['elForm'].resetFields();
    }
  }
}
</script>

<style>

</style>