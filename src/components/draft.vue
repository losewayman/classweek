<template>
<div>
<img src="static/assets/bg.jpg" style="width:70%" v-if="imgb">
<el-card class="box-card card" v-for="(datas,index) in data" :key="datas.id" shadow="always" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span style="font-size:13px;"><strong v-text="time(datas.createTime)"></strong></span>
    <el-button style="float: right; padding: 3px 0; color:#909399" type="text" @click="deletes(datas.id,index)">删除</el-button>
  </div>
  <div class="texts item" @click="readtext(datas.content,datas.id,datas.type)">
    {{datas.txt}}
  </div>
</el-card>

<!--测试数据-->



</div>
</template>
<script>
export default{
    data(){
        return{
            data:[],    //登陆用户的草稿数据
            imgb:false,
        }
    },
    methods:{
        deletes(id,index){
            let _this=this;
            _this.$http({
                method:'post',
                url:'api/classweek/article/deleteActicle.action',
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
        readtext(content,id,type){    //text为文章文本内容，id为文章id,uid为文章作者id
            this.$store.commit("add_headindex",'2');
            this.$store.commit("add_asideindex",'0');
            this.$store.commit("add_editorid",id);
            this.$store.commit("add_editortype",type);
            this.$store.commit("add_editorcontent",content);
            this.$router.push('editor');
        } 
    },
    mounted() {
        let _this=this;
        _this.$http({
            method:'post',
            url:'api/classweek/article/getNoActicleList.action',
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
                
            _this.data=res.data.data.reverse();
        })
        .catch(function(error){

        })
    },
}
</script>
<style scoped>
  .texts {
    font-size: 13px;
  }

  .item {
    height:30px;
    line-height:30px;
    text-align:left;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .card{
      border-width:0px 0px 0px 0px !important;
      margin:0px 0px 10px 100px!important;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
  }
</style>
<style>
.el-card__header{
    padding:10px 30px 0px 30px !important;
    border:0px !important;
}
</style>