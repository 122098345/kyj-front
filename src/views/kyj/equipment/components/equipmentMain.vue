<template>
  <div class="content">
    <el-table :data="tableData" row-key="id" :expand-row-keys="expands" @row-click="clickRowHandle" @expand-change="expandChange" highlight-current-row style="width:100%;">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column type="expand" width="5">
        <template slot-scope="scope">
          <el-card class="box-card" style="width:50%">
            <div slot="header" class="clearfix">
              <span>{{scope.row.equipmentName}}文件列表:</span>
            </div>
            <div v-for="(item,index) in fileList" :key="index" style="width:100%;margin-top:2px">
              <el-button @click="fileClick(item.previewPath)" type="text">{{item.originName}}</el-button>
              <el-button style="float: right; padding: 0" type="text">下载</el-button>
            </div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号" prop="departmentCode"/>
      <el-table-column align="center" label="名称" prop="equipmentName"/>
      <el-table-column align="center" label="型号" prop="typeCode"/>
      <el-table-column align="center" label="出厂编码" prop="outCode"/>
      <el-table-column align="center" label="总额定功率" prop="totalRatedPower"/>
      <el-table-column align="center" label="总质量" prop="grossMass"/>
      <el-table-column align="center" label="最大工作压力" prop="maxWorkingPressure"/>
      <el-table-column align="center" label="旋转轴转速" prop="rotationalShaftSpeed"/>
      <el-table-column align="center" label="投运时间" prop="purchaseDate"/>
      <el-table-column align="center" label="制造年份" prop="yearManufacture"/>
      <el-table-column align="center" label="档案" prop="v10"/>
      <el-table-column align="center" label="状态" prop="v11"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small" style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog :visible.sync="isDialog" style="width:1200px;height:500px" append-to-body :close-on-click-modal="false" :before-close="cancel">
      <iframe :src="fileUrl" frameborder="0"></iframe>
    </el-dialog> -->


  </div>
</template>

<script>
import {getEquipmentList,delEquipment,queryByIdEquipment} from '@api/kyj/equipment.js'

export default {
  
  data(){
    return{
      tableData:[],       // 表格数据

      expands:[],         // 需要展开的行

      fileList:[],        // 文件列表

      isDialog:false,     // 弹窗是否显示

      fileUrl:'',             // 文件预览地址
    }
  },
  methods:{
    // 获取数据
    getDataList(params){
      getEquipmentList(params).then(response=>{
        if(response.code==200){
          this.tableData=response.result.records
          this.$emit('getTotal',response.result.total)
        }
      })
    },

    // 编辑
    handleEdit(val){
      if(val){
        this.$emit('handleEdit',val)
      }
    },

    // 删除
    handleDel(val){
      if(val){
        this.$confirm('确定要删除设备 “'+val.equipmentName+'” 吗？').then(_ => {
          delEquipment(val.id).then(res=>{
            if(res.code==200){
              this.$emit('getData')
            }
          })
        })
        .catch(_ => {});
      }
    },

    // 行点击
    clickRowHandle(row){

      if(this.expands.includes(row.id)){
        this.expands=this.expands.filter(val=> val !== row.id);
        this.fileList=[];
      }else{
        queryByIdEquipment(row.id).then(res=>{
          if(res.code==200){
            this.fileList=res.result.equipmentFileList
            this.expands=[];
            this.expands.push(row.id)
          }
        })
      }
    },

    // 行展开或关闭时
    expandChange(row,ex){
      if(ex.length>0){
        this.expands=[]
        this.clickRowHandle(row);
      }
      
    },

    // 获取行详细信息\
    getItemInfo(id){
      this.fileList={};
      queryByIdEquipment(id).then(res=>{
        console.log(res)
        if(res.code==200){
          this.fileList=res.result.equipmentFileList
          console.log(this.fileList)
        }
      })
    },

    // 文件点击
    fileClick(url){
      this.fileUrl="http://192.168.0.222:8080/jeecg-boot/file-preview/2022/10/2c918085842cf30a01842cf3ddf20001.xls"
      this.isDialog=true;
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    margin-top: 10px;
  }
</style>