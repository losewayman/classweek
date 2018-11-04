<template>
<div>
<img src="static/assets/bg.jpg" style="width:65%" v-if="imgb">
<el-card class="box-card" v-for="(da,index) in data" :key="da.id" shadow="always" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
     <strong><span  style="font-size:14px">{{name(da.uId)}}</span></strong>
     <span  style="font-size:13px;margin-left:20px;"  v-text="time(da.createTime)"></span>
    <el-button style="float: right; padding: 3px 0; color:#909399; border:0" type="text" :plain="true" v-on:click="deletee(da.id,index)">删除</el-button>
  </div>
  <div class="text-item" @click="readtext(da.id,da.uId)">
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
      deletee(iid,index){
            let _this=this;
            _this.$http({
                method:'post',
                url:'api/classweek/user/deleteColl.action',
                data:{
                    'id':_this.$store.getters.get_xuehao,
                    'aId':iid,
                }
            })
            .then(function(res){
                if(res.data.status=='200'){
                    _this.data.splice(index,1);
                    var collect = _this.$store.getters.get_collect;
                    collect.reverse().splice(index,1).reverse();
                    _this.$store.commit("add_collect",collect);
                    _this.$notify({
                        message: '删除成功！',
                        offset: 50,
                        type:'success',
                        duration:1500,
                    });
                }
            })
            .catch(function(error){
              console.log(error);
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
    readtext(aid,uId){
      this.$store.commit("add_peoid",aid);
      this.$store.commit("add_peoxuehao",uId);
      this.$router.push('weekly');
    },
    name(uid){
      var mate = this.$store.getters.get_classmate;
      for(var i=0;i<mate.length;i++){
        if(mate[i].id == uid){ 
          return mate[i].username;
        }
      }
    }
  },
    mounted(){
      let _this=this;
      this.$http({
        method:'post',
        url:'api/classweek/article/getActicleListByUserId.action',
        params: {
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