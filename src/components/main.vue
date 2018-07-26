<template>
<el-container style="height: 700px; border: 1px solid #eee;">

    <el-header style="height:80px;text-align: right; font-size: 12px;padding:0px">
    <el-menu :default-active="headindex" class="el-menu-demo" mode="horizontal" >
    <img src="../assets/ZYPC.png" class="img">
     <el-menu-item index="1" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='homepage' class="item" @click.native="head()">首页</router-link></el-menu-item>
     <el-menu-item index="2" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='editor' class="item"  @click.native="head()">写周报</router-link></el-menu-item>
     <el-menu-item index="3" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='draft' class="item"  @click.native="head()">草稿箱</router-link></el-menu-item>
     <el-menu-item index="4" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='collection' class="item"  @click.native="head()">我的收藏</router-link></el-menu-item>
     <el-menu-item index="5" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='update' class="item"  @click.native="head()">已上传周报</router-link></el-menu-item> 
     <el-menu-item index="7" style="margin:20px 60px 0px 20px;padding:0px 10px;height:40px;text-align:center;line-height:40px;float:right;"><router-link to='home' class="item"><img src="../assets/logo.png" class="headimg"></router-link></el-menu-item>
     <el-menu-item index="6" style="margin:20px 20px 0px 20px;padding:0px 10px;height:40px;text-align:center;line-height:40px;float:right;"><router-link to='home' class="item"><img src="../assets/message.png" class="messageimg"></img></router-link></el-menu-item>
    
    </el-menu>
    </el-header>
     <el-container>
    <el-aside  width="290px" style="background-color: rgb(238, 211, 246)">
    <el-row class="tac">
  <el-col :span="24">
    
    <el-menu
      :default-active="asideindex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
     >

    <el-submenu v-for="(da,num) in all" :key="num" :index="da.index">

        <template slot="title" >
          <i class="el-icon-location"></i>
          <span>{{da.zuname}}</span>
        </template>

        <el-menu-item-group>
          <router-link :to="{path:'peoplewrite',query:{name:c.name}}" @click.native="aside()" v-for="(c,num) in da.zu" :key="num" class="route">
          <el-menu-item :index="c.index" >{{c.name}}</el-menu-item>
          </router-link>
        </el-menu-item-group>

    </el-submenu>

      

    </el-menu>
  </el-col>
</el-row>
    </el-aside>
     <el-main style="padding:0px; background-color: rgb(238, 241, 246)">
      <router-view ></router-view>
     </el-main>
      </el-container>
    </el-container>
</template>
<script>
  export default {
      data(){
          return {
              headindex:'1',
              asideindex:'0',
              all:[
                  {
                      zuname:'aa',
                      index:'a',
                      zu:[
                          {
                              index:'1',
                          name:'jweewsdssssssj'
                          },
                          {
                              index:'2',
                              name:"wewwel"
                          }
                      ]
                  },
                  {
                      zuname:'bb',
                      index:'b',
                      zu:[
                          {
                              index:'3',
                          name:'jffj'
                          },
                          {
                              index:'4',
                              name:"ll"
                          }
                      ]
                  }
              ]
          }
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      aside(){
          this.headindex='0';
      },
      head(){
          this.asideindex='3';
      }
    }
  }
</script>
<style>
.item{
    display:block;
    width:100%;
    height:100%;
    text-decoration:none;
}
.route{
    text-decoration:none;
}
.img{
    width:290px;
    height:79px;
    float:left;
}
.messageimg{
    width:30px;
    height:30px;
}
.headimg{
    width:60px;
    height:60px;
    margin-top:-10px;
}

</style>
