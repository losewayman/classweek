<template>
  <el-table :data="tableData" style="width: 100%">

    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

       <el-table-column
      label="分组"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>


    <el-table-column
      label="分组"
      width="180">
      <template slot-scope="scope">
        <el-select v-model="rooter[scope.$index]" placeholder="请选择分组">
    <el-option label="开发组员" :value="-1"></el-option>
    <el-option label="运维组员" :value="-2"></el-option>
    <el-option label="产品组员" :value="-3"></el-option>
    <el-option label="开发负责人" :value="1"></el-option>
    <el-option label="运维负责人" :value="2"></el-option>
    <el-option label="产品负责人" :value="3"></el-option>
  </el-select>
      </template>
    </el-table-column>




    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row.id)">提交</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleBack(scope.row.id)">恢复</el-button>  
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        rooter:[-1,1,-1,1],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleDelete(index) {
        _this.$http({
            url:'api/weekly/article/addArticle.action',
            method:'post',
            params:{

            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"提交失败",
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
          })
        console.log(this.group,this.rooter);
      },
      handleBack(){
        _this.$http({
            url:'api/weekly/article/addArticle.action',
            method:'post',
            params:{

            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"提交失败",
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
          })
      },

      handleEdit(index, id) {
        let _this=this;
        _this.$http({
            url:'api/weekly/article/addArticle.action',
            method:'post',
            params:{
              'id':_this.id,
              'power':_this.rooter[index],
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              
            }

          })
          .catch(function(error){
            
              _this.$notify({
                message:"删除失败",
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
          })
        console.log(index, row);
      }
    },
   mounted() {
      let _this=this;
        _this.$http({
            url:'api/weekly/article/addArticle.action',
            method:'post',
            params:{
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              _this.tableData=res.data;
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"删除失败",
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
          })
      }
  }
</script>