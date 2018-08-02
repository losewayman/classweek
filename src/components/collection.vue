<template>
<div>
<el-card class="box-card" v-for="(da,index) in data" :key="da.id" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
     <strong><span  style="font-size:14px">{{da.user.category+" - "}}</span>
     <span  style="font-size:14px">{{da.user.name}}</span></strong>
     <span  style="font-size:13px;margin-left:20px;"  v-text="time(da.createDate)"></span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee(da.id,index)">删除</el-button>
  </div>
  <div class="text-item" @click="readtext(da.content,da.id,da.uId,da.user.power)">
    {{da.txt}}
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
      data:'',
    }     
  },
     methods:{
      deletee(aid,index){
            let _this=this;
            _this.$http({
                method:'post',
                url:'api/weekly/user/deleteColl.action',
                params:{
                    'aId':aid,
                    'id':this.msg.xuehao,
                }
            })
            .then(function(res){
                if(res.data.status=='200'){
                    _this.data.splice(index,1);
                    _this.msg.collect.reverse().splice(index,1).reverse();
                    _this.$notify({
                        message: '删除成功！',
                        offset: 50,
                        type:'success',
                        duration:1500,
                    });
                }
            })
            .catch(function(error){
                 _this.$notify({
                    message: '删除失败！',
                    offset: 50,
                    type:'error',
                    duration:1500,
                });
            })
        },
    time(ti){
          return ti.substr(0,10);
      },
    readtext(text,id,uId,power){
      this.$emit('child-say',id,text,uId,power,'1');
      this.$router.push('weekly');
    }
  },
    mounted(){
        let _this=this;
      this.$http({
        method:'post',
        url:'/api/weekly/article/getActicleListByUserId.action',
        params: {
          'uId':_this.msg.xuehao,
        }
      })
    .then(function(res){
        _this.data = res.data.data.reverse();
    })
    .catch(function(error){
    })
    }

}
</script>