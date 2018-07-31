<template>
<div class="root">
  <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">姓名</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">分组</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">权限</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">操作</div></el-col>
</el-row>
<el-row :gutter="20" >
  <el-col :span="6"><div class="grid-content bg-purple">{{}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
    <el-select v-model="value" placeholder="请选择">
        <el-option label="ss" value="aa"></el-option>
  </el-select></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
</div>
</template>

<script>
  export default {        //v-for="(one,index) in data" :key="index"
    data() {
      return {
          data:'',
          value:''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted() {
        let _this=this;
        _this.$http({
            method:'post',
            url:'',
        })
        .then(function(res){
            _this.data=res.data.data;
        })
        .catch(function(error){
            _this.$notify({
                message:'加载数据失败',
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
        })
    },
  }
</script>
<style>
.root{
    width:800px;
    margin:auto;
    background:#696969;
}
.grid-content{
    text-align:center;
}
</style>