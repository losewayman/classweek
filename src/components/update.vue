<template>
<div>
<img src="static/assets/bg.jpg" style="width:65%" v-if="imgb">
<el-card class="box-card" v-for="(datas,index) in data" :key="datas.id" shadow="always" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span style="font-size:13px"><strong v-text="time(datas.createTime)"></strong></span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee(datas.id,index)">删除</el-button>
  </div>
  <div class="text-item" @click="readtext(datas.id,datas.uId)">
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
      data:[],
      imgb:false,
    }     
  },
   methods:{
      deletee(id,index){
            let _this=this;
            _this.$http({
                method:'post',
                url:'api/classweek/article/deleteArticle.action',
                params:{
                    'id':id,
                }
            })
            .then(function(res){
                if(res.data.status=='200'){
                    _this.data.splice(index,1);
                    _this.$notify({
                        message: '删除成功！',
                        offset: 50,
                        type:'success',
                        duration:2000,
                    });
                }
            })
            .catch(function(error){
                 _this.$notify({
                    message: '删除失败！',
                    offset: 50,
                    type:'error',
                    duration:2000,
                });
            })
        },
    time(ti){
        return ti.substr(0,10);
    },
    readtext(id,uId){    //id为文章id,uid为文章作者id
        this.$store.commit("add_peoid",id);
        this.$store.commit("add_peoxuehao",uId);
        this.$router.push('weekly');
    } 
   },
    mounted(){
      let _this=this;
      _this.$http({
        method:'post',
        url:'api/classweek/article/getArticleList.action',
        params:{
            'uId':_this.$store.getters.get_xuehao,
        }
      })
    .then(function(res){
      if(res.data.data==''||res.data.data==null){
                    _this.imgb=true;
                }
                else{
                    _this.imgb=false;
                }
      _this.data = res.data.data.reverse();
    })
    .catch(function(error){
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
      border-width:0px 0px 0px 0px;
      margin:0px 0px 10px 100px;
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
    padding:10px 30px 0px 30px !important;
    border:0px !important;
}
</style>

