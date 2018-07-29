<template>
<el-container style="height: 700px; border: 1px solid #eee;">

    <el-header style="height:80px;text-align: right; font-size: 12px;padding:0px;overflow:hidden;">
    <el-menu :default-active="headindex" class="el-menu-demo" mode="horizontal" >
    <img src="../assets/ZYPC.png" class="img">
     <el-menu-item index="1" class="head" @click.native="heads('1',xuehao,'homepage')"><strong>首页</strong></el-menu-item>
     <el-menu-item index="2" class="head" @click.native="heads('2',xuehao,'editor')"><strong>写周报</strong></el-menu-item>
     <el-menu-item index="3" class="head" @click.native="heads('3',xuehao,'draft')"><strong>草稿箱</strong></el-menu-item>
     <el-menu-item index="4" class="head" @click.native="heads('4',xuehao,'collection')"><strong>我的收藏</strong></el-menu-item>
     <el-menu-item index="5" class="head" @click.native="heads('5',xuehao,'update')"><strong>已上传周报</strong></el-menu-item> 
     <img src="../assets/logo.png" class="headright">
     <el-menu-item index="6" class="head headleft"><el-badge :is-dot='redicon' class="redicon"><img src="../assets/message.png" class="messageimg"></img></el-badge></el-menu-item>
    
    </el-menu>
    </el-header>
     <el-container>
    <el-aside  width="290px" style="background-color: rgb(238, 211, 246)">


    <el-row class="tac" v-show="asidemenu">
    <el-col :span="24">
    <el-menu :default-active="asideindex" class="el-menu-vertical-demo" active-text-color="#000000">  
    <el-submenu v-for="(da,nums) in all" :key="nums" :index='nums.toString()'>   
        <template slot="title" >     
          <span class="teamname"><strong>{{da.zuname}}</strong></span>
        </template>
        <el-menu-item-group class="route">    
          <el-menu-item :index="c.index"  @click.native="asides(c.index)" :key="c.index" v-for="(c,num) in da.zu"><span class="teampeople">{{c.name}}</span></el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
    </el-col>
    </el-row>


    </el-aside>
     <el-main style="padding:0px;">
      <router-view v-bind:msg='{xuehao,roots,childmsg}' v-on:child-say="ddd"></router-view>
     </el-main>
      </el-container>
    </el-container>
</template>
<script>
  export default {
      data(){
          return {
              headindex:'1',    //head的选中控制
              asideindex:'0',       //aside的选中控制
              redicon:true,   //控制红点
              name:'',    //名字
              xuehao:'123',    //学号
              childmsg:'',
              roots:'',    //权限
              asidemenu:true,   //控制左侧菜单隐藏显示
              all:[         //所有分组数据
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

              ]
          }
      },
    methods: {
      asides(index){
          this.asideindex=index;
          this.headindex='0';
          this.childmsg=index;
          this.$router.push('peoplewrite');
      },
      heads(index,msg,rou){
          this.headindex=index;
          this.asideindex='0';
          this.childmsg=msg;
          this.$router.push(rou);
      },
      ddd(id,text,uid,headindex){
          this.childmsg={'id':id,'text':text,'uid':uid};
          if(headindex=='2')
          this.headindex=headindex;
      }
    },
    mounted() {
        let _this=this;
        // _this.$http({
        //     method:'post',
        //     url:'',
        // })
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
.img{
    width:290px;
    height:79px;
    float:left;
}
.head{
    font-size:15px !important;
    margin:20px 30px 0px 30px !important;
    padding:0px 10px !important;
    height:40px !important;
    text-align:center !important;
    line-height:40px !important;
}
.headright{
    width:48px;
    height:48px; 
    float:right !important;
    margin-top:-4px;margin:20px 60px 0px 20px !important;
    
}
.headleft{
    float:right !important;
    margin:20px 20px 0px 10px !important;
}
.messageimg{
    width:25px;
    height:25px;
    margin-top:-20px;
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
