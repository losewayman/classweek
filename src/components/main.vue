<template>
<el-container style="height: 700px; border: 1px solid #eee;">

    <el-header style="height:80px;text-align: right; font-size: 12px;padding:0px">
    <el-menu :default-active="headindex" class="el-menu-demo" mode="horizontal" >
    <img src="../assets/ZYPC.png" class="img">
     <el-menu-item index="1" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='homepage' class="item" @click.native="heads('1')"><strong>首页</strong></router-link></el-menu-item>
     <el-menu-item index="2" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='editor' class="item"  @click.native="heads('2')"><strong>写周报</strong></router-link></el-menu-item>
     <el-menu-item index="3" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='draft' class="item"  @click.native="heads('3')"><strong>草稿箱</strong></router-link></el-menu-item>
     <el-menu-item index="4" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='collection' class="item"  @click.native="heads('4')"><strong>我的收藏</strong></router-link></el-menu-item>
     <el-menu-item index="5" style="margin:20px 50px 0px 50px;padding:0px 10px;height:40px;text-align:center;line-height:40px;"><router-link to='update' class="item"  @click.native="heads('5')"><strong>已上传周报</strong></router-link></el-menu-item> 
     <el-menu-item index="7" style="margin:20px 60px 0px 20px;padding:0px 10px;height:40px;text-align:center;line-height:40px;float:right;"><router-link to='home' class="item"><img src="../assets/logo.png" class="headimg"></router-link></el-menu-item>
     <el-menu-item index="6" style="margin:20px 20px 0px 20px;padding:0px 10px;height:40px;text-align:center;line-height:40px;float:right;"><router-link to='home' ><el-badge :is-dot='redicon' class="redicon"><img src="../assets/message.png" class="messageimg"></img></el-badge></router-link></el-menu-item>
    
    </el-menu>
    </el-header>
     <el-container>
    <el-aside  width="290px" style="background-color: rgb(238, 211, 246)">
    <el-row class="tac">
  <el-col :span="24">
    
    <el-menu :default-active="asideindex" class="el-menu-vertical-demo" active-text-color="#000000">  
    <el-submenu v-for="(da,num) in all" :key="num" :index="da.index">   
        <template slot="title" >     
          <span class="teamname"><strong>{{da.zuname}}</strong></span>
        </template>
        <el-menu-item-group>    
          <router-link :to="{path:'peoplewrite',query:{name:c.name}}" @click.native="asides(c.index)" v-for="(c,num) in da.zu" :key="num" class="route">
          <el-menu-item :index="c.index" ><span class="teampeople">{{c.name}}</span></el-menu-item>
          </router-link>
        </el-menu-item-group>
    </el-submenu>

      

    </el-menu>
  </el-col>
</el-row>
    </el-aside>
     <el-main style="padding:0px;">
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
              redicon:true,
              head:1,
              aside:1,
              all:[
                  {
                      zuname:'开发组',
                      index:'a',
                      zu:[
                          {
                              index:'1',
                          name:'某某某'
                          },
                          {
                              index:'2',
                              name:"谁谁谁"
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
                  },{
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
                  },{
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
                  },

              ]
          }
      },
    methods: {
      asides(num){
          this.asideindex=num;
          this.headindex='0';
      },
      heads(num){
          this.headindex=num;
          this.asideindex='0';
      }
    },
    mounted() {
        this.$router.push('homepage');
    },
  }
</script>
<style>
.el-menu-demo .is-active{
    color:#0945c4 !important;
    border-bottom-color:#0945c4 !important;
    border-bottom-width:3px !important;
}
.route .is-active {
   background-color:#e4e4e4 !important;
}
.item{
    display:block;
    width:100%;
    height:100%;
    font-size:15px;
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
    width:25px;
    height:25px;
    margin-top:-20px;
}
.headimg{
    width:48px;
    height:48px;
    margin-top:-4px;
}
.teamname{
    margin-left:20px;
    font-size:14px;
}
.teampeople{
    margin-left:50px;
    font-size:13px;
}
.redicon{
    width:25px;
    height:25px;
}

</style>
