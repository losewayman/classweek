<template> 
<div style="min-width:960px">
  <div id="log" v-show="log">
    <el-input v-model="input" type="password" placeholder="请输入密码"></el-input>
    <button id="butt" @click="is()">登  录</button>
  </div>
  <div v-show="islog">
    <div class="guhead">周报系统后台管理</div>
    <div class="left">
      <div class="list" v-bind:class="send" v-on:click="bianrou('send')">发布通知</div>
      <div class="list" v-bind:class="people" v-on:click="bianrou('people')">管理人员</div>
      <div class="list" v-bind:class="week" v-on:click="bianrou('week')">管理周报</div>
    </div>
    <div class="main"><router-view></router-view></div>
  </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        password:'666666',
        input:'',
        log:true,
        islog:false,
        send:'yes',
        people:'no',
        week:'no'
      }
    },
    methods: {
      bianrou(rou){
        this.send="no";
        this.people="no";
        this.week="no";
        this[rou]='yes';
        this.$router.push(rou);
      },
      is(){
        if(this.input===this.password){
          this.log=false;
          this.islog=true;
        }
        else{
          this.$notify({
                message:"密码错误",
                offset: 50,
                type:'error',
                duration:1500,
              });
        }
      },
      handleDelete(index,id) {
        let _this=this;
        _this.$http({
            url:'./user/updateUserStatus.action',
            method:'post',
            params:{
              "id":id,
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
              _this.$notify({
                message:"删除成功",
                offset: 50,
                type:'success',
                duration:1500,
              });
              _this.tableData.splice(index,1);
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"删除失败",
                offset: 50,
                type:'error',
                duration:1500,
              });
          })
      },
      handleEdit(power, id) {
        let _this=this;
        _this.$http({
            url:'./user/updatePower.action',
            method:'post',
            params:{
              'id':id,
              'power':power,
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
               _this.$notify({
                message:"提交成功",
                offset: 50,
                type:'success',
                duration:1500,
              });
            }
          })
          .catch(function(error){
              _this.$notify({
                message:"提交失败",
                offset: 50,
                type:'error',
                duration:1500,
              });
          })
      }
    },
   mounted() {
      let _this=this;
      _this.$router.push("send");
      }
  }
</script>
<style>
#log{
  width:250px;
  height:110px;
  margin:100px auto;
  padding:20px;
  background-color:	#E0FFFF;
  border:1px solid #7bbfea;
}
#butt{
  width:100%;
  height:35px;
  margin-top:30px;
  background-color:#33a3dc;
  border-width:0px;
  border-radius:3px;
}
.guhead{
  width:100%;
  height:70px;
  background-color:#72777b;
  line-height:70px;
  text-align:center;
  color:#f2eada;
  font-size:23px;
  font-weight:600;
  letter-spacing:8px;

}
.left{
  width:300px;
  height:calc(100vh - 70px);
  background-color:#a1a3a6;
  float:left;
}
.list{
  width:100%;
  height:60px;
  line-height:60px;
  color:white;
  font-size:16px;
  padding-left:60px;
  font-weight:550;
  box-sizing:border-box;
}
.yes{
  background-color:#d3d7d4;
}
.no{
  background-color:#a1a3a6;
}
.main{
  width:calc(100% - 300px);
  height:calc(100vh - 70px);
  overflow:auto;
  float:left;
}
</style>