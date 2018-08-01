<template>
<div>
<el-card class="box-card" v-for="(datas,index) in data.data" :key="datas.id" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span>{{datas.creatDate}}</span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee(datas.id,datas.uId,index)">删除</el-button>
  </div>
  <div class="texts-item" @click="readtext(datas.content,datas.id,datas.uId)">
    {{datas.text}}
  </div>
</el-card>

<!-- 页面展示 -->
    <el-card class="box-card" shadow="never" :body-style="{padding:'5px 30px 10px 30px', border:'0px'}">
  <div slot="header" class="clearfix">
    <span>前端-xxx</span> <span style="font-size:13px">2018-7-29</span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee()">删除</el-button>
  </div>
  <div class="text-item">
    {{'列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala'}}
  </div>
</el-card>

<el-card class="box-card" shadow="never" :body-style="{padding:'5px 30px 10px 30px', border:'0px'}">
  <div slot="header" class="clearfix">
    <span>前端-xxx</span> <span style="font-size:13px">2018-7-29</span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee()">删除</el-button>
  </div>
  <div  class="text-item">
    {{'列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala列表内容lalalalalalallalalalalalalalalalalalalala'}}
  </div>
</el-card>
</div>
</template>

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

<script>
export default{
  props:['msg'],
  data(){
    return{
      data:[]
    }     
  },
     methods:{
      deletee(aId,id,index){  
        this.$http({
          method:'post',
          url:'/api/weekly/user/deleteColl.action',
          data: {
            'aId':id,
            'id':uId
          }
        })  
      .then(function(res){
        if(res.status == '200'){
          this.data.splice(index,1);
          this.$message({
          message: '删除成功!',
          center:true,       
        })
      }
    })
      .catch(function(error){
        console.log(error);
      })
    },
    // readtext(text,id,uId){
    //   this.$emit('child-say',id,text,uId,'4');
    //   this.$router.push('');
    // }
  },

    mounted(){
      this.$http({
        method:'post',
        url:'/api/weekly/article/getActicleListByUserId.action',
        data: {
          'uId':this.xuehao
        }
      })
    // 请求成功执行
    .then(function(response){
      this.data = response.data;
      console.log(response);
    })
    // 请求失败时执行
    .catch(function(error){
      console.log(error);
    })
    }

}
</script>