<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;padding:10px 15px;">
<el-button  size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="back()">返回</el-button>
<el-button v-show="delshow" size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="del()">删除</el-button>
<el-button v-show="replyshow" size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="reply()">回复</el-button>
<el-button v-show="collectshow" size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="collect()">收藏</el-button>
</div >
<div style="padding:15px;" v-show="sendshow">
<el-input type="textarea" v-model="replymsg"></el-input>
<el-button size='small' style="margin-top:10px;background-color:#0945C4;font-size:12px;color:white" @click="send()">发送</el-button>
</div>
<div class="content">{{text}}</div>
</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            replymsg:'',     //回复内容  
            uid:'',     //本篇文章作者学号
            loginuid:'',   //登陆人学号 
            root:'',   //登陆人权限
            id:'',   //本篇文章id
            text:'',   //本篇文章内容
            delshow:false,    //控制删除按钮
            replyshow:false,     //控制回复按钮
            collectshow:false,      //控制收藏按钮
            sendshow:true,     //控制发送框
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        del(){},
        reply(){},
        collect(){},
        send(){},
    },
    mounted() {
        console.log(this.msg);
        this.root=this.msg.roots;
        this.loginuid=this.msg.xuehao;
        this.uid=this.msg.childmsg.uid;
        this.id=this.msg.childmsg.id;
        this.text=this.msg.childmsg.text;
        if(this.loginuid==this.uid){
            this.delshow=true;
        }else{
            this.collectshow=true;
        }
        if(this.root==''){
            this.reply=true;
        }
        
    },
}
</script>
<style>
.content{
    width:cale(100% - 30px);
    padding:15px;
    padding-right:12px;
    height:500px;
    border:1px solid #a1a1a1;
    margin:15px;
    overflow-y:auto;
}
textarea{
    min-height:100px !important;
}
</style>