<template>
<div style="padding:5px 25px;">

<el-row  :gutter="80" style="margin-left: 0px; margin-right: 0px;">
  <el-col :span="4" style="margin:10px 0px" v-for="(o, index) in 7" :key="o">
  
    <el-card :body-style="{ padding: '0px'}" style="border:0px;" shadow="never" @click.native="homename(o.uid)">
    <div style="background-color:black">
      <img :src="kk" class="image" :class="1==2?'homecard':'cc'"/>
      </div>
      <div class="foot">
        好吃的汉堡
      </div>
    </el-card>
    
  </el-col>
</el-row>

<el-row  :gutter="80" style="margin-left: 0px; margin-right: 0px;">
  <el-col :span="4" style="margin:10px 0px" v-for="(o, index) in 7" :key="o">
  
    <el-card :body-style="{ padding: '0px'}" style="border:0px;" shadow="never" @click.native="homename(o.uid)">
    <div style="background-color:black">
      <img :src="kk" class="image" :class="1==1?'homecard':'cc'"/>
      </div>
      <div class="foot">
        好吃的汉堡
      </div>
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
      uid:''
    }
  },
  methods:{
    homename(xuehao){//此人学号
      this.$emit('homepage',xuehao);
      this.$router.push('peoplewrite');
    }
  },
  mounted(){
    console.log("kk");
  }
}
</script>
<style>
  .image {
    width: 100%;
    display: block;
  }
.homecard{
opacity: 0.6;
}
.foot{
  text-align:center;
  line-height:40px;
  height:40px;
}
</style>
