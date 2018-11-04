<template>
<el-container style="height: 100vh; border: 1px solid #eee;">

    <el-header style="height:80px;text-align: right; font-size: 12px;padding:0px;overflow:hidden;box-shadow:0px 3px 8px #dcdcdc;z-index:1001">
    <el-menu :default-active="headindex" class="el-menu-demo" mode="horizontal" >
    <img src="static/assets/zz.png" class="img">
     <el-menu-item index="1" class="head" @click.native="heads('1','homepage')"><strong>首页</strong></el-menu-item>
     <el-menu-item index="2" class="head" @click.native="heads('2','editor')"><strong>写周报</strong></el-menu-item>
     <el-menu-item index="3" class="head" @click.native="heads('3','draft')"><strong>草稿箱</strong></el-menu-item>
     <el-menu-item index="4" class="head" @click.native="heads('4','collection')"><strong>我的收藏</strong></el-menu-item>
     <el-menu-item index="5" class="head" @click.native="heads('5','update')"><strong>已上传周报</strong></el-menu-item> 
     <el-menu-item index="6" class="head" @click.native="heads('6','message')"><strong>通知</strong></el-menu-item> 
    </el-menu>
    </el-header>
    <el-container style="height:calc(100vh - 80px)">
    <el-aside  width="290px" style="background-color: rgb(255, 255, 255);border-right:1px solid #e6e6e6">
    <el-row class="tac">
    <el-col :span="24">
    <el-menu :default-active="asideindex" class="el-menu-vertical-demo" active-text-color="#000000">  
    <el-submenu index="1">   
        <template slot="title" >     
          <span class="teamname"><strong>{{classmate[0].dvalue}}</strong></span>
        </template>
        <el-menu-item-group class="route">    
          <el-menu-item :index="c.id"  @click.native="asides(c.id)" :key="c.id" v-for="(c,num) in classmate"><span class="teampeople">{{c.username}}</span></el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
    </el-col>
    </el-row>


    </el-aside>

     <el-main style="padding:10px 0px 0px 0px;">
      <router-view></router-view>
     </el-main>
      </el-container>
    </el-container>
</template>
<script>

  export default {
      data(){
          return {
          }
      },
    methods: {
      asides(index){
        this.$store.commit("add_headindex",'0');
        this.$store.commit("add_asideindex",index);
        this.$store.commit("add_matexuehao",index);
        this.$router.push('peoplewrite');
      },
      heads(index,rou){

          this.$store.commit("add_headindex",index);
          this.$store.commit("add_asideindex",'0');
          this.$router.push(rou);
      },
      time(ti){
          return ti.substr(5,6)+ti.substr(11,5);
      },
    },
    computed:{
        classmate:function(){
            return this.$store.getters.get_classmate;
        },
        headindex:function(){
            return this.$store.getters.get_headindex;
        },
        asideindex:function(){
            return this.$store.getters.get_asideindex;
        }
    },
    mounted() {
        let _this=this;
        _this.$store.dispatch('add_selfmes',{
            gologin:function(){
                _this.$router.push('login');
            },
            gohome:function(){
                _this.$router.push('homepage');
            }
        });
    },
  }
</script>
<style>
.el-menu{
    border-right: 0px solid #e6e6e6 !important;
}
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
    float:right;
    margin:15px 60px 0px 20px;
    
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
.text {
    font-size: 14px;
  }
.el-card__header{
    padding:10px 30px 0px 30px;
    border:0px;
}
.item {
    padding: 2px 0;
  }

.box-card {
    width: 100%;
}
.messag{
    height:30px;
    width:150px;
    line-height:30px;
    font-size:13px;
    text-align:left;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
.timebutton{
    height:40px;
    color:black;
    font-size:13px;
    position:absolute;
    top:30px;
    right:18px;

}
</style>
