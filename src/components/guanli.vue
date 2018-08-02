<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
       <el-table-column
      label="分组"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.category }}</span>
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
          @click.native="handleEdit(rooter[scope.$index], scope.row.id)">提交</el-button>
        <el-button
          size="mini"
          type="danger"
          @click.native="handleDelete(scope.$index,scope.row.id)">删除</el-button>
        
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    data() {
      return {
        rooter:[],
        tableData:[],
      }
    },
    methods: {
      handleDelete(index,id) {
        let _this=this;
        _this.$http({
            url:'api/weekly/user/updateUserStatus.action',
            method:'post',
            params:{
              "id":id,
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              _this.$notify({
                message:"提交成功",
                offset: 50,
                type:'success',
                duration:1500,
              });
              _this.tableData.splice(index,1);
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"提交失败",
                offset: 50,
                type:'error',
                duration:1500,
              });
          })
      },
      handleEdit(power, id) {
        let _this=this;
        _this.$http({
            url:'api/weekly/user/updatePower.action',
            method:'post',
            params:{
              'id':id,
              'power':power,
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
               _this.$notify({
                message:"删除成功",
                offset: 50,
                type:'success',
                duration:1500,
              });
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"删除失败",
                offset: 50,
                type:'error',
                duration:1500,
              });
          })
      }
    },
   mounted() {
      let _this=this;
        _this.$http({
            url:'api/weekly/getUserList.action',
            method:'post',
            params:{
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              _this.tableData=res.data.data;
              for(let a=0;a<_this.tableData.length;a++){
                _this.rooter.push(_this.tableData[a].power);
              }
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"信息加载失败",
                offset: 50,
                type:'error',
                duration:1500,
              });
          })
      }
  }
</script>