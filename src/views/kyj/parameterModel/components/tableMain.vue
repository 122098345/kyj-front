<template>
  <div class="content">
    <el-table :data="tableData" row-key="id" :expand-row-keys="expands" @row-click="clickRowHandle" highlight-current-row style="width:100%;">
      <el-table-column type="expand" width="5">
        <template slot-scope>
          <el-table :data="tableItemData">
            <el-table-column align="center" label="名称" prop="name"/>
            <el-table-column align="center" label="最优参数" prop="avg"/>
            <el-table-column align="center" label="参数方差" prop="variance"/>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="模型名称" prop="model"/>
      <el-table-column align="center" label="模型描述" prop="desc"/>
      <el-table-column align="center" label="模型气电比(Nm³/KW.h)" prop="qd"/>
      <el-table-column align="center" label="是否是最优参数模型" prop="isBest"/>
      
    </el-table>
  </div>
</template>

<script>
import {getParameterModel} from '@api/kyj/analysis.js'

export default {
  data(){
    return{
      expands:[],         // 需要展开的行
      // 表格数据
      tableData:[],
      curNumber:null,     //当前空压机号

      // 1号
      kyj1:[
        {
          id:1,
          type:'A',
          model:'模型A',
          desc:'V-LSTM',
          qd:'NULL',
          isBest:'是'
        },
        {
          id:2,
          type:'B',
          model:'模型B',
          desc:'SVM',
          qd:'NULL',
          isBest:'否'
        },
        {
          
          id:3,
          type:'C',
          model:'模型C',
          desc:'BP神经网络模型',
          qd:'NULL',
          isBest:'否'
        },
      ],

      // 2号
      kyj2:[
        {
          id:1,
          type:'A',
          model:'模型A',
          desc:'V-LSTM',
          qd:'NULL',
          isBest:'是'
        },
        {
          id:2,
          type:'B',
          model:'模型B',
          desc:'SVM',
          qd:'NULL',
          isBest:'否'
        },
        {
          id:3,
          type:'C',
          model:'模型C',
          desc:'BP神经网络模型',
          qd:'NULL',
          isBest:'否'
        },
      ],
       
      // 3号
      kyj3:[
        {
          id:1,
          type:'A',
          model:'模型A',
          desc:'V-LSTM',
          qd:'NULL',
          isBest:'是'
        },
        {
          id:2,
          type:'B',
          model:'模型B',
          desc:'SVM',
          qd:'NULL',
          isBest:'否'
        },
        {
          id:3,
          type:'C',
          model:'模型C',
          desc:'BP神经网络模型',
          qd:'NULL',
          isBest:'否'
        },
      ],

      // 4号
      kyj4:[
        {
          id:1,
          type:'A',
          model:'模型A',
          desc:'V-LSTM',
          qd:'NULL',
          isBest:'是'
        },
        {
          id:2,
          type:'B',
          model:'模型B',
          desc:'SVM',
          qd:'NULL',
          isBest:'否'
        },
        {
          id:3,
          type:'C',
          model:'模型C',
          desc:'BP神经网络模型',
          qd:'NULL',
          isBest:'否'
        },
      ],

      // 5号
      // kyj5:[
      //   {
      //     type:'A',
      //     model:'模型A',
      //     desc:'V-LSTM',
      //     qd:'NULL',
      //     isBest:'是'
      //   },
      //   {
      //     type:'B',
      //     model:'模型B',
      //     desc:'SVM',
      //     qd:'NULL',
      //     isBest:'否'
      //   },
      //   {
      //     type:'C',
      //     model:'模型C',
      //     desc:'BP神经网络模型',
      //     qd:'NULL',
      //     isBest:'否'
      //   },
      // ],
        
      tableItemData:[],   // 表格子列表数据
      
    }
  },
  methods:{
    // 获取数据
    getDataList(params){
      this.curNumber=params.number;
      this.expands=[];
      switch (this.curNumber){
          case 1:
            this.tableData=this.kyj1;
            break
          case 2:
            this.tableData=this.kyj2;
            break
          case 3:
            this.tableData=this.kyj3;
            break
          case 4:
            this.tableData=this.kyj4;
            break
          // case 5:
          //   this.tableData=this.kyj5;
          //   break
        }
    },

    // 行点击
    clickRowHandle(row){
      if(this.expands.includes(row.id)){
        this.tableItemData=[]
        this.expands=this.expands.filter(val=> val !== row.id);
      }else{
        this.expands=[];
        this.tableItemData=[];
        getParameterModel(this.curNumber,row.type).then(res=>{
          if(res.code==200){
            this.tableItemData=res.result
            this.expands.push(row.id)
          }
        })
      }
    },
  }
}
</script>

<style>

</style>