<template>
<div style="padding:5px 25px">
<el-row  :gutter="50" style="margin-left: 0px; margin-right: 0px;">
  <el-col :span="4" style="margin:10px 0px" v-for="(o, index) in 14" :key="o">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/logo.png" class="image">
      <div style="text-align:center;height:40px;">
        好吃的汉堡
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>
<script>
export default{
    data() {
    return {
      
    };
  }
}
</script>
<style>
  .image {
    width: 100%;
    display: block;
  }

</style>
