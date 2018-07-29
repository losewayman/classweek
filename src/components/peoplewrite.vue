<template>
<div>
<el-card class="box-card" v-for="(datas,index) in data" :key="datas.id">
  <div slot="header" class="clearfix">
    <span>{{datas.createDate}}</span>
  </div>
  <div class="texts item" @click="readtext(datas.content,datas.id,datas.uid)">
    {{datas.txt}}
  </div>
</el-card>



<!--测试数据-->
<el-card class="box-card card" >
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
  </div>
  <div class="texts item" style="" @click="readtext('鬼魂俄日好卡好卡好卡好卡好卡好卡好卡好卡和',0)">
    {{'鬼魂俄日好卡好卡好卡好卡好卡好卡好卡好卡和'}}
  </div>
</el-card>
<el-card class="box-card card" >
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
  </div>
  <div class="texts item" style="">
    {{'鬼魂四好卡好卡好卡好卡好卡好卡好卡和'}}
  </div>
</el-card>




</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            data:'',    //接收到的此用户周报列表数据
        }
    },
    methods:{
        readtext(text,id,uid){
            this.$emit('child-say',id,text,uid,'1');
            // localStorage.setItem('weeklyid',id);
            // localStorage.setItem('weeklywen',text);
            this.$router.push('weekly');
        }
    },
    watch:{
        msg:function(){
            console.log('个人列表',this.msg);
            let _this=this;
            _this.$http({    //获取被点击人的周报列表
                method:'post',
                //url:'article/getNoActicleList.action',
                data:{
                'uid':this.msg.childmsg,
                }
            })
            .then(function(res){
                this.data=res.data;
                console.log(res.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    },
    mounted() {
        console.log('个人列表',this.msg);
        let _this=this;
        _this.$http({     //第一次获取被点击人的周报列表
            method:'post',
            //url:'article/getNoActicleList.action',
            data:{
                'uid':this.msg,
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
<style>
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
      margin-left:100px !important;
  }
.card .el-card__body{
    padding:5px 30px 10px 30px !important;
    border:0px !important;
}
.card .el-card__header{
    padding:10px 30px 0px 30px !important;
    border:0px !important;
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