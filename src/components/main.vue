<template>
<el-container style="height: 95vh; border: 1px solid #eee;">

    <el-header style="height:80px;text-align: right; font-size: 12px;padding:0px;overflow:hidden;">
    <el-menu :default-active="headindex" class="el-menu-demo" mode="horizontal" >
    <img src="static/assets/ZYPC.png" class="img">
     <el-menu-item index="1" class="head" @click.native="heads('1',xuehao,'homepage')"><strong>首页</strong></el-menu-item>
     <el-menu-item index="2" class="head" @click.native="heads('2',xuehao,'editor')"><strong>写周报</strong></el-menu-item>
     <el-menu-item index="3" class="head" @click.native="heads('3',xuehao,'draft')"><strong>草稿箱</strong></el-menu-item>
     <el-menu-item index="4" class="head" @click.native="heads('4',xuehao,'collection')"><strong>我的收藏</strong></el-menu-item>
     <el-menu-item index="5" class="head" @click.native="heads('5',xuehao,'update')"><strong>已上传周报</strong></el-menu-item> 
     <img :src="img" class="headright">
     <el-menu-item index="6" @click.native="message('6',xuehao,'update')" class="head headleft"><el-badge :is-dot='redicon' class="redicon"><img src="static/assets/message.png" class="messageimg"></img></el-badge></el-menu-item>
    
    </el-menu>
    </el-header>
     <el-container>

    <el-aside  width="290px" style="background-color: rgb(238, 211, 246)">

    <el-row class="tac" v-show="asidemenu">
    <el-col :span="24">
    <el-menu :default-active="asideindex" class="el-menu-vertical-demo" active-text-color="#000000">  
    <el-submenu v-for="(da,nums) in all" :key="nums" :index='nums.toString()'>   
        <template slot="title" >     
          <span class="teamname"><strong>{{da.category}}</strong></span>
        </template>
        <el-menu-item-group class="route">    
          <el-menu-item :index="c.id"  @click.native="asides(c.id)" :key="c.id" v-for="(c,num) in da.list"><span class="teampeople">{{c.name}}</span></el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
    </el-col>
    </el-row>

<el-row class="tac" v-show="mess" >
  <el-col :span="24">
    <el-menu default-active="0" class="el-menu-vertical-demo"  active-text-color="#000000">
          <el-menu-item :index="index.toString()" style="height:auto;border-bottom:1px solid #e6e6e6" v-for="(da,index) in replymessage"  @click.native="read(da.article.content,da.article.id,da.article.uId,da.power)" :key="index">  <!--缺权限 -->
          <div  style="height:40px;" >
          <strong><span>{{da.name}}</span></strong>
          <span class="button"  v-text="time(da.createTime)"></span>
          </div>
          <div class="messag" style="height:40px;">{{da.txt}}</div>
          </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>

     <el-main style="padding:0px;">
      <router-view v-bind:msg='{category,name,xuehao,roots,collect,childmsg}' v-on:child-say="ddd"  v-on:homepage="homepage" v-on:coll="col"></router-view>
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
              redicon:false,   //控制红点
              name:'',    //名字
              xuehao:'',    //学号
              category:'',
              img:'',
              childmsg:{'id':'','text':'','uid':'','power':''},
              roots:'',    //权限
              collect:'',
              asidemenu:true,   //控制左侧菜单隐藏显示
              replymessage:'',   //所有回复消息
              mess:true,     //控制左侧消息列表隐藏显示
              all:'',
          }
      },
    methods: {
      asides(index){
          this.asideindex=index;
          this.headindex='0';
          this.childmsg.uid=index;
          this.$router.push('peoplewrite');
      },
      heads(index,xuehao,rou){
          this.asidemenu=true;
          this.mess=false;
          this.headindex=index;
          this.asideindex='0';
          this.childmsg.id='';
          this.childmsg.text='';
          this.childmsg.uid='';
          this.childmsg.power='';
          this.$router.push(rou);
      },
      time(ti){
          return ti.substr(5,6)+ti.substr(11,5);
      },
      read(text,id,uId,power){
          this.childmsg={'id':id,'text':text,'uid':uId,'power':power};
          this.$router.push('weekly');
      },
      ddd(id,text,uidd,headindex,power){
          this.childmsg={'id':id,'text':text,'uid':uidd,'power':power};
          if(headindex=='2')
          this.headindex=headindex;
          if(headindex=='5')
          this.headindex=headindex;
      },
      col(collection){
          this.collect=collection;
      },
      message(index,xuehao,rou){
          let _this=this;
          _this.$http({
              method:'post',   //请求所有回复
              url:'api/weekly/reply/getreplyArticleList.action',
              params:{
                  'uId':_this.xuehao,
              }
          })
          .then(function(res){
              _this.replymessage=res.data.data;
          })
          .catch(function(error){
              _this.$notify({
                message: '信息加载失败！',
                offset: 50,
                type:'error',
                duration:2000,
            });
          })
          this.asidemenu=false;
          this.mess=true;
          this.redicon=false;
      },
      homepage(xuehao){
          this.childmsg.uid=xuehao;
      }
    },
    mounted() {
        let _this=this;
        _this.$http({
                method:'post',
                url:'api/weekly/user/login.action',
                params:{
                }
            })
            .then(function(res){
                _this.all=res.data.data//把所有数据放进data里
                _this.roots=res.data.user.power;
                _this.img=res.data.user.headImage;
                _this.xuehao=res.data.user.id;
                _this.category=res.data.user.category;
                _this.name=res.data.user.name;
                if(res.data.user.collection==null){
                    _this.collect=[];
                }
                else{
                    _this.collect=res.data.user.collection.split(",");
                }
                _this.$http({
                    method:'post',  
                    url:'api/weekly/reply/hasReply.action',
                    params:{
                        'uId':_this.xuehao,
                    }
                })
                .then(function(res){
                    if(res.data.status==0){
                        _this.redicon=false;
                    }else if(res.data.status==200){
                        _this.redicon=true;
                    }
                })
                .catch(function(error){
                    _this.$notify({
                        message: '消息加载失败！',
                        offset: 50,
                        type:'error',
                        duration:2000,
                    });
                })
                setTimeout(function(){_this.$router.push('homepage');},500);  
            })
            .catch(function(error){
                _this.$notify({
                message: '信息加载失败了！',
                offset: 50,
                type:'error',
                duration:2000,
            });
        })
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
.button{
    float: right; 
    height:40px;
    color:black;
    font-size:13px;
    position:relative;
    top:27px;
    right:0px;

}
</style>
