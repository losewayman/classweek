<template>
<div style="padding:5px 25px;">
<el-row  :gutter="80" style="margin-left: 0px; margin-right: 0px;">
  <el-col :span="4" style="margin:10px 0px" v-for="(o, index) in yes" :key="o.id">
    <el-card :body-style="{ padding: '0px'}" style="border:0px;" shadow="never" @click.native="homename(o.id)">
    <div style="background-color:black">
      <img :src="o.headImage" class="image"/>
      </div>
      <div class="foot" v-text="o.name"></div>
    </el-card>
  </el-col>
 <el-col :span="4" style="margin:10px 0px" v-for="(o, index) in no" :key="o.id">
    <el-card :body-style="{ padding: '0px'}" style="border:0px;" shadow="never" @click.native="homename(o.id)">
    <div style="background-color:black">
      <img :src="o.headImage" class="image homecard"/>
      </div>
      <div class="foot" v-text="o.name"></div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>
<script>
export default{
  props:['msg'],
    data() {
    return {
      kk:"static/assets/w.jpg",
      uid:'',
      yes:'',
      no:'',
    }
  },
  methods:{
    homename(xuehao){//此人学号
      this.$emit('homepage',xuehao);
      this.$router.push('peoplewrite');
    }
  },
  watch:{
    msg:function(){
       let _this=this;
        _this.$http({
            method:'post',
            url:'/api/weekly/user/getUserList.action',
            params:{
                'id':_this.msg.xuehao,
                'category':_this.msg.category,
            }
        })
        .then(function(res){
          if(_this.msg.roots>=0){
            _this.yes=res.data.data[0].yes;
            _this.no=res.data.data[1].no;
          }
          else if(_this.msg.roots<0){
            _this.yes=res.data.data[0].yes;
          }
            
        })
        .catch(function(error){
            _this.$notify({
                message: '信息加载失败！',
                offset: 50,
                type:'error',
                duration:2000,
            });
        })
    }
  },
  mounted(){
    let _this=this;
        _this.$http({
            method:'post',
            url:'/api/weekly/user/getUserList.action',
            params:{
                'id':_this.msg.xuehao,
                'category':_this.msg.category,
            }
        })
        .then(function(res){
          if(_this.msg.roots>=0){
            _this.yes=res.data.data[0].yes;
            _this.no=res.data.data[1].no;
          }
          else if(_this.msg.roots<0){
            _this.yes=res.data.data[0].yes;
          }
        })
        .catch(function(error){
        })
  }
}
</script>
<style>
  .image {
    width: 100%;
    display: block;
  }
.homecard{
  opacity: 0.3;
}
.foot{
  text-align:center;
  line-height:40px;
  height:40px;
}
</style>
