<template>
<div>
<el-card class="box-card" v-for="(datas,index) in data.data" :key="datas.id" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span style="font-size:13px"><strong>{{datas.createDate}}</strong></span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee(index)">删除</el-button>
  </div>
  <div class="text-item" @click="readtext()">
    {{datas.txt}}
  </div>
</el-card>
</div>
</template>
<script>
export default{
   props:['msg'],
  data(){
    return{
      data:''
    }     
  },
   methods:{
      deletee(index){ 
        let _this=this; 
        _this.$http({           
          method:'post',
          url:'/api/weekly/user/deleteColl.action?uId=04161111',
          // data: {
          //   'aId':id,
          //   'id':uId
          // }
        })  
      .then(function(res){      
         if(res.data.status == '200'){
          _this.data.splice(index,1);
          _this.$message({
          message: res.data.msg,
          center:true
        })
      }
      if(res.data.status == '0'){
         _this.$message({
          message: res.data.msg,
          center:true
        })
      }
    })
      .catch(function(error){
        console.log(error);
      })
    }
   },
    mounted(){
      let _this=this;
      _this.$http({
        method:'post',
        url:'/api/weekly/article/getArticleList.action?uId=04161111',
        // data:{}
      })
    // 请求成功执行
    .then(function(res){
      _this.data = res.data;
        console.log(res);
    })
    // 请求失败时执行
    .catch(function(error){
      console.log(error);
    })
    }
    
}
</script>

<style scoped>
  .text-item {
    height:30px;
    line-height:30px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    text-align: left;
    font-size: 13px;
    
  }
  .box-card{
      width:800px;
      border-width:0px 0px 1px 0px;
      margin:0px 0px 0px 100px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
<style>
.el-card__header{
    padding:10px 30px 0px 30px;
    border:0px;
}
</style>

