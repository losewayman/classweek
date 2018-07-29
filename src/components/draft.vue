<template>
<div>
<el-card class="box-card" v-for="(datas,index) in data" :key="datas.id" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span>{{datas.createDate}}</span>
    <el-button style="float: right; padding: 3px 0; color:#909399" type="text" @click="deletes(datas.id,index)">删除</el-button>
  </div>
  <div class="texts item" @click="readtext(datas.content,datas.id,datas.uid)">
    {{datas.txt}}
  </div>
</el-card>

<!--测试数据-->
<el-card class="box-card card" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0px; color:#909399" type="text" @click="deletes(1,2)">删除</el-button>
  </div>
  <div class="texts item" style="" @click="readtext('鬼魂四处开花的大家富士康与巍峨呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃无阿覅的时间急急急急急急急急急就回家回家回家胡日日日日日日日日日日日日日日日日日日俄日好卡好卡好卡好卡好卡好卡好卡好卡和',0)">
    {{'鬼魂四处开花的大家富士康与巍峨呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃无阿覅的时间急急急急急急急急急就回家回家回家胡日日日日日日日日日日日日日日日日日日俄日好卡好卡好卡好卡好卡好卡好卡好卡和'}}
  </div>
</el-card>
<el-card class="box-card card" shadow="never" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0; color:#909399" type="text">删除</el-button>
  </div>
  <div class="texts item" style="">
    {{'鬼魂四处开花的大家日日日日日日俄日好卡好卡好卡好卡好卡好卡好卡好卡和'}}
  </div>
</el-card>



</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            data:'',    //登陆用户的草稿数据
        }
    },
    methods:{
        deletes(id,index){
            console.log('a');
            let _this=this;
            _this.$http({
                method:'post',
                //url:'article/getNoActicleList.action',
                data:{
                    'id':id,
                }
            })
            .then(function(res){
                _this.data=res.data.data;
                if(res.data.status=='200'){
                    this.data.splice(index,1);
                    this.$notify({
                        message: '删除成功！',
                        offset: 50,
                        type:'success',
                        duration:1500,
                        position: 'bottom-right'
                        });
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },
        readtext(text,id,uid){    //text为文章文本内容，id为文章id,uid为文章作者id
            this.$emit('child-say',id,text,uid,'2');
            this.$router.push('editor');
        } 
    },
    mounted() {
        let _this=this;
        _this.$http({
            method:'post',
            //url:'article/getNoActicleList.action',
            data:{
                'uid':this.childmsg,
            }
        })
        .then(function(res){
            this.data=res.data;
            console.log(res.data);
        })
        .catch(function(error){
            console.log(error);
        })
        // _this.$http({
        //     url:'/api/get/message?api=house',
        //     method:'get',
        // }).then(function (response) {
        //     console.log('d',response);
        // }).catch(function (error) {
        //         console.log(error);
        // })
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
      border-width:0px 0px 1px 0px !important;
      margin:0px 0px 0px 100px!important;
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
    padding:10px 30px 0px 30px;
    border:0px;
}
</style>