<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;">
<el-button  size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="back()">返回</el-button>
<el-button v-show="delshow" size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="del()">删除</el-button>
<el-button v-show="replyshow" size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="reply()">回复</el-button>
<el-button v-show="collectshow" size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="collect()">收藏</el-button>
</div >
<div class="content">{{weeklywen}}</div>
</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            content:'',       
            weeklyid:'',   //本篇文章id
            weeklywen:'',   //本篇文章内容
            delshow:false,    //控制删除按钮
            replyshow:false,     //控制回复按钮
            collectshow:false,      //控制收藏按钮
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        del(){},
        reply(){},
        collect(){},
    },
    mounted() {
        console.log(this.msg);
        if(this.msg.xuehao==this.msg.childmsg){
            this.delshow=true;
        }else{
            this.collectshow=true;
        }
        if(this.msg.root==''){
            this.reply=true;
        }
        this.weeklyid=localStorage.getItem('weeklyid');
        this.weeklywen=localStorage.getItem('weeklywen');
        localStorage.removeItem('weeklyid');
        localStorage.removeItem('weeklywen');
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
</style>