<template>
  <div class="content">
    <el-table :data="tableData" :row-class-name="tableRowClassName" row-key="id" :expand-row-keys="expands" @row-click="clickRowHandle" highlight-current-row style="width:100%;">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column type="expand" width="5">
        <template slot-scope>
          <el-table :data="tableItemData">
            <el-table-column align="center" label="名称" prop="partsName"/>
            <el-table-column align="center" label="mes编号" prop="mesNo"/>
            <el-table-column align="center" label="使用位置" prop="location "/>
            <el-table-column align="center" label="订货号" prop="orderNo"/>
            <el-table-column align="center" label="型号" prop="partsNo"/>
            <el-table-column align="center" label="更换数量" prop="count"/>
            <el-table-column align="center" label="更换时间" prop="updateTime"/>
            <el-table-column align="center" label="更换人" prop="updateBy"/>
            <el-table-column align="center" label="备注" prop="remark"/>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope2">
                <el-button @click.stop="handleEditItem(scope2.row)" type="text" size="small">编辑</el-button>
                <el-button @click.stop="handleDelItem(scope2.row)" type="text" size="small" style="color:red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <!-- 页码跳转 -->
            <el-pagination
              v-show="total>0"
              @size-change="handleSizeChanged"
              @current-change="handelCurrentPageChanged"
              :current-page="queryItemParams.pageNo"
              :page-sizes="[10, 20, 30]"
              :page-size="queryItemParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"/>
          </div>
        
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
      <el-table-column align="center" label="上次维修日期" prop="lastMaintainDate"/>
      <el-table-column align="center" label="维修周期(月)" prop="maintainCycle"/>
      <el-table-column align="center" label="文件">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="700"
            trigger="click">
            <el-table :data="fileList">
              <el-table-column width="500" label="文件列表" property="originName"/>
              <el-table-column width="150">
                <template slot-scope="scope3">
                  <el-button @click.stop="downFile(scope3.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" size="mini" @click.stop="hanleFilesView(scope.row.id)">查看文档</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="maintainStats" :formatter="changeText"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.stop="handleAddItem(scope.row)" type="text" size="small">新增零部件</el-button> -->
          <el-button @click.stop="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click.stop="handleDel(scope.row)" type="text" size="small" style="color:red">删除</el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a @click="handleAddItem(scope.row)">新增零部件</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="handleAddMaintain(scope.row)">新建维修</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="isDialog" style="width:1200px;height:500px" append-to-body :close-on-click-modal="false">
      <iframe :src="fileUrl" frameborder="0"></iframe>
    </el-dialog>


  </div>
</template>

<script>
import Vue from 'vue'
import {getEquipmentList,delEquipment,queryByIdEquipment,getParts,delParts} from '@api/kyj/equipment.js'
import {downFiles} from '@api/files.js'
import {filterDictTextByCache} from '@/components/dict/JDictSelectUtil'
import {formatDate} from '@/global/datetimeHelp'
import dateFormat from '../../../../components/jeecg/JEasyCron/format-date'

export default {
  
  data(){
    return{
      tableData:[],       // 表格数据

      tableItemData:[],   // 子表格数据

      expands:[],         // 需要展开的行

      fileList:[],        // 文件列表

      isDialog:false,     // 弹窗是否显示

      fileUrl:'',         // 文件预览地址

      queryItemParams:{
        equipmentId:null,   // 设备id
        pageNo:1,           // 页码
        pageSize:10,        // 条数
      },
      
      total:0,          // 总条数

      maintainStates:null,

      hundredDays:8640000,    // 一百天毫秒数
      sixtyDays:5184000,      // 六十天毫秒数
      thirtyDays:2592000,     // 三十天毫秒数
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

    // 获取字典数据
    changeText(row,column){
      return filterDictTextByCache('maintain_stats', row.maintainStats);
    },

    // 判断行颜色(根据维修时间是否临近)
    tableRowClassName({row,rowIndex}){
      if(row.lastMaintainDate&&row.maintainCycle){
        var nowDate=Date.parse(new Date())/1000;
        var lastDate=Date.parse(new Date(row.lastMaintainDate))/1000;
        var cycle=row.maintainCycle*2592000;
        var lastDays=lastDate+cycle-nowDate

        if(lastDays<this.thirtyDays){
          return 'red-row'
        }else if(lastDate<this.sixtyDays){
          return 'orange-row'
        }else if(lastDate<this.hundredDays){
          return 'yellow-row'
        }else{
          return ''
        }
      }else{
        return ''
      }




      
    },

    // 每页条数改变
    handleSizeChanged(val){
      this.queryItemParams.pageNo=1;
      this.queryItemParams.pageSize=val;
      this.refreshOpenData();
    },

    // 页码改变时
    handelCurrentPageChanged(val){
      this.queryItemParams.pageNo=val;
      this.refreshOpenData();
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

    // 新增零部件
    handleAddItem(val){
      this.$emit('addItem',val)
    },

    // 编辑零部件
    handleEditItem(val){
      this.$emit('editItem',val)
    },

    // 删除零部件
    handleDelItem(val){
      this.$confirm('确定要删除 “'+val.detailName+'” 吗？').then(_ => {
        delParts(val.id).then(res=>{
          if(res.code==200){
            this.refreshOpenData(val.equipmentId)
          }
        })
      })
      .catch(_ => {});

    },

    // 行点击
    clickRowHandle(row){
      if(this.expands.includes(row.id)){
        this.expands=this.expands.filter(val=> val !== row.id);
        this.tableItemData=[];
      }else{
        this.queryItemParams.equipmentId=row.id
        getParts(this.queryItemParams).then(res=>{
          if(res.code==200){
            this.total=res.result.total
            this.tableItemData=res.result.records
            this.expands=[];
            this.expands.push(row.id)
          }
        })
      }
    },

    // 如果行展开，刷新展开内容
    refreshOpenData(val){
      if(this.expands.includes(parseInt(val))){
        this.queryItemParams.equipmentId=val
        getParts(this.queryItemParams).then(res=>{
          if(res.code==200){
            this.total=res.result.total
            this.tableItemData=res.result.records
            this.expands=[];
            this.expands.push(val)
          }
        })
      }
    },

    // 查看文档
    hanleFilesView(id){
      queryByIdEquipment(id).then(res=>{
        if(res.code==200){
          this.fileList=res.result.equipmentFileList
        }
      })
    },

    // 文件下载
    downFile(val){
      if(val.fileId){
        // window.open(url)
        // downFiles(val.fileId).then(res=>{
        //   // console.log(res)
        //   if (res!=null) {
        //     let blob = new Blob([res], { type: 'application/force-download' });
        //     let url =window._CONFIG['domianURL']+ val.previewPath
        //     // let url = window.URL.createObjectURL(blob);
        //     const link = document.createElement('a'); // 创建a标签
        //     link.href = url;
        //     link.download = val.originName; // 重命名文件
        //     console.log(val.originName)
        //     link.click();
        //     URL.revokeObjectURL(url); // 释放内存
        //   }
        // })
        let url =window._CONFIG['domianURL']+ val.previewPath
        // let url = window.URL.createObjectURL(blob);
        const link = document.createElement('a'); // 创建a标签
        link.href = url;
        link.download = val.originName; // 重命名文件
        link.click();
        URL.revokeObjectURL(url); // 释放内存
      }
    },

    // 新建维修
    handleAddMaintain(val){
      this.$emit("addMaintain",val)
    },
  

  }
}
</script>

<style lang="scss">
  .content{
    margin-top: 10px;

    .el-table .red-row {
      background: rgba($color: #f13434, $alpha: 0.8);
    }
    .el-table .orange-row {
      background: rgba($color: #ee931b, $alpha: 0.8);;
    }
    .el-table .yellow-row {
      background: rgba($color: #e7e416, $alpha: 0.8);;
    }
  }
  
</style>