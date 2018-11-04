<template>
<div class="all">
<el-collapse v-model="activeNames" >
  <el-collapse-item v-for="(mes,index) in mesall" :name="mes.id" :key="mes.id">
  <template slot="title">
      <span class="title">{{mes.title}}</span><span class="time">{{mes.createTime.substr(0,16)}}</span>
    </template>
    <div class="content">{{mes.txt}}</div>
  </el-collapse-item>
</el-collapse>
</div>
</template>
<script>
  export default {
    props:['msg'],
    data() {
      return {
        activeNames: ['1'],
        mesall:''
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    },
    mounted() {
        let _this = this;
        _this.$http({
            url:'api/classweek/message/getMessageList.action',
            method:'post',
            data:{
                'grade':_this.$store.getters.get_logclass,
            }
        })
        .then((res)=>{
          _this.mesall = res.data.data.reverse();
        })
        .catch((err)=>{
            
        })
    },
  }
</script>
<style>
.all{
    box-sizing:border-box;
    width:60%;
    margin:auto;
}
.title{
  display:inline-block;
  font-size:16px;
  font-weight:600;
}
.time{
  display:inline-block;
  margin-left:30px;
  font-weight:600;
}
.content{
  box-sizing:border-box;
  margin:0px 20px;
  border-top:1px solid #7bbfea;
}
</style>