<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;padding:10px 15px;">
<el-button  size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="back()">返回</el-button>
<el-button v-show="delshow" size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="del()">删除</el-button>
<el-button v-show="replyshow" size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="reply()">回复</el-button>
<el-button v-show="collectshow" size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="collect()">{{collecttext}}</el-button>
</div >


<div style="padding:15px;" v-show="sendshow">
<el-input type="textarea" class="area" v-model="replymsg"></el-input>
<el-button size='small' style="margin-top:10px;background-color:#0945C4;font-size:12px;color:white" @click="send()">发送</el-button>
</div>

<el-card class="box-card" shadow="never" v-for="o in replyall" :key="o" :body-style="{padding:'0px'}">
  <div class="replytext replyitem">
    <strong>{{ o.name + ':'}}</strong>
  </div>
  <div class="replytext replyitem">
    {{ o.creatTime }}
  </div>
  <div class="replytext replyitem">
    {{ o.txt }}
  </div>
</el-card>


<!--测试数据-->
<el-card class="box-card" shadow="never" :body-style="{padding:'0px'}">
  <div v-for="o in 4" :key="o" class="replytext replyitem">
    {{'列表内容 ' + o }}
  </div>
</el-card>
<el-card class="box-card" shadow="never" :body-style="{padding:'0px'}">
  <div v-for="o in 4" :key="o" class="replytext replyitem">
    {{'列表内容 ' + o }}
  </div>
</el-card>


<div class="contents">{{text}}</div>
</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            replymsg:'',     //回复内容  
            replyall:'',     //本篇文章上所有回复内容
            uid:'',     //本篇文章作者学号
            loginuid:'',   //登陆人学号 
            root:'',   //登陆人权限
            id:'',   //本篇文章id
            text:'',   //本篇文章内容
            delshow:false,    //控制删除按钮
            replyshow:false,     //控制回复按钮
            collectshow:false,      //控制收藏按钮
            collecttext:'收藏',    //收藏按钮显示
            sendshow:true,     //控制发送框
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        del(){
            let _this =this;
            _this.$http({
                method:'post',
                url:'',
                data:{
                    'id':this.id
                }
            })
            .then(function(res){
                this.$router.go(-1);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        reply(){
            let _this =this;
            _this.$http({
                method:'post',
                url:'',
                data:{
                    'id':this.id,
                    'uid':this.uid,
                }
            })
            .then(function(res){
                //根据返回结果设置收藏按钮初始状态
            })
            .catch(function(error){
                console.log(error);
            })
        },
        collect(){
            let _this =this;
            if(_this.collecttext == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                var url = '';
            }else if(_this.collecttext == '已收藏'){
                var url = '';
            }

            _this.$http({    //请求收藏接口
                method:'post',
                url:url,
                data:{
                    'id':this.id,
                    'uid':this.uid,
                }
            })
            .then(function(res){
                if(_this.collecttext == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                    _this.collecttext == '已收藏';
                }else if(_this.collecttext == '已收藏'){
                    _this.collecttext == '收藏';
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },  
        send(){
            let _this =this;
            _this.$http({
                method:'post',
                url:'',
                data:{
                    'id':this.id,
                    'txt':this.replymsg,
                    'uid':this.loginuid
                }
            })
            .then(function(res){
                //把这条回复信息放到页面上，并清空回复框
            })
            .catch(function(error){
                console.log(error);
            })
        },
    },
    mounted() {
        console.log(this.msg);
        this.root = this.msg.roots;
        this.loginuid = this.msg.xuehao;
        this.uid = this.msg.childmsg.uid;
        this.id = this.msg.childmsg.id;
        this.text = this.msg.childmsg.text;
        if(this.loginuid == this.uid){
            this.delshow = true;
        }else{
            this.collectshow = true;
        }
        if(this.root == ''){
            this.replysow = true;
        }
        let _this =this;

        if(_this.loginuid==_this.uid || _this.root==""){     //为本人或负责人时请求本文章上所有回复
            let _this =this;
            _this.$http({
                method:'post',
                url:'',
                data:{
                    'id':_this.id
                }
            })
            .then(function(res){
                _this.replyall=res.data;
            })
            .catch(function(error){
                console.log(error);
            })
        }
        //查询收藏初始状态
        _this.$http({
                method:'post',
                url:'',
                data:{
                    'id':_this.id,
                    'uid':_this.uid
                }
            })
            .then(function(res){
                //根据查询结果来设置collecttext的初始状态
            })
            .catch(function(error){
                console.log(error);
            })

            
        
    },
}
</script>

<style scoped>
.contents{
    width:cale(100% - 30px);
    padding:15px;
    padding-right:12px;
    height:500px;
    border:1px solid #a1a1a1;
    margin:15px;
    overflow-y:auto;
}
.replytext {
    font-size: 14px;
}
.replyitem {
    padding:5px;
}

.box-card {
    width: 580px;
    border:0px;
    margin:15px 10px;
}
</style>
<style>
.area textarea{
    height:100px;
}

</style>