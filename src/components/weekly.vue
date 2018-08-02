<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;padding:10px 15px;">
<el-button  size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="back()">返回</el-button>
<el-button v-show="replyshow" size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="reply()">回复</el-button>
<el-button v-show="collectshow" size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="bucollect()">{{collecttext}}</el-button>
</div >


<div style="padding:15px;" v-show="sendshow">
<el-input type="textarea" class="area" v-model="replymsg"></el-input>
<el-button size='small' style="margin-top:10px;background-color:#0945C4;font-size:12px;color:white" @click="send()">发送</el-button>
</div>

<el-card class="box-card" shadow="never" v-for="(o,index) in replyall" :key="index" :body-style="{padding:'0px'}">
  <div class="replytext replyitem">
    <strong>{{ o.name + ':'}}</strong>
  </div>
  <div class="replytext replyitem" v-text="time(o.createTime)"></div>
  <div class="replytext replyitem">
    {{ o.txt }}
  </div>
</el-card>


<!--测试数据-->


<div class="contents" v-html="text"></div>
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
            collect:'',
            power:'',  //被查看人的权限
            id:'',   //本篇文章id
            text:'',   //本篇文章内容
            delshow:false,    //控制删除按钮
            replyshow:false,     //控制回复按钮
            collectshow:false,      //控制收藏按钮
            collecttext:'收藏',    //收藏按钮显示
            sendshow:false,     //控制发送框
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        reply(){
            let _this =this;
            _this.sendshow=true;
        },
        time(ti){
            return ti.substr(0,10);
        },
        bucollect(){
            let _this =this;
            if(_this.collecttext == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                var url = 'api/weekly/user/addColl.action';
            }else if(_this.collecttext == '已收藏'){
                var url = 'api/weekly/user/deleteColl.action';
            }
            _this.$http({    //请求收藏接口
                method:'post',
                url:url,
                params:{
                    'id':_this.loginuid,
                    'aId':_this.id,
                }
            })
            .then(function(res){
                if(_this.collecttext == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                    _this.collecttext ='已收藏';
                    _this.$notify({
                        message: '收藏成功！',
                        offset: 50,
                        type:'success',
                        duration:2000,
                    });
                    _this.$emit('coll',res.data.data.collection.split(','));        //
                }else if(_this.collecttext == '已收藏'){
                    _this.collecttext = '收藏';
                    _this.$notify({
                        message: '取消收藏成功！',
                        offset: 50,
                        type:'success',
                        duration:2000,
                    });
                    _this.$emit('coll',res.data.data.collection.split(','));   //
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
                url:'api/weekly/replyArticle/addReplyArticle.action',
                params:{
                    'aId':_this.id,
                    'txt':_this.replymsg,
                    'uId':_this.loginuid,
                }
            })
            .then(function(res){
                var datetime = new Date();
                var year=datetime.getFullYear();
                var month=datetime.getMonth()+1;
                if(month<=9){
                    month="0"+month;
                }
                var date=datetime.getDate();
                if(date<=9){
                    date="0"+date;
                }
                var dateformat=year+"-"+month+"-"+date;
                _this.replyall.unshift({'createTime':dateformat,'name':_this.msg.name,'txt':_this.replymsg});
                _this.replymsg="";
            })
            .catch(function(error){
                console.log(error);
            })
        },
    },
    mounted() {
        this.root = this.msg.roots;
        this.loginuid = this.msg.xuehao;
        this.collect=this.msg.collect;
        this.power = this.msg.childmsg.power;
        this.uid = this.msg.childmsg.uid;
        this.id = this.msg.childmsg.id;
        this.text = this.msg.childmsg.text;
        let _this =this;
        if(_this.loginuid == _this.uid){
            _this.collectshow = false;
        }else{
            _this.collectshow = true;
            for(var index=0;index<_this.collect.length;index++){
                if(_this.collect[index]==_this.id){
                    console.log(_this.collect[index],_this.id);
                    _this.collecttext="已收藏";
                    break;
                }
            }
        }
        if(_this.root>0){
            if(_this.power<0 && -_this.power==this.root){
                _this.replyshow=true;
            }
            if(_this.power==_this.root){
                _this.replyshow=true;
            }  
        }
        if(_this.root<0){
            if(_this.loginuid == _this.uid)
            _this.replyshow=true;
        }
 
        if(_this.replyshow == true){
           _this.$http({     //请求本篇文章上的所有回复
                method:'post',
                url:'api/weekly/reply/getreplyArticleListByaId.action',
                params:{
                    'aId':_this.id,
                }
            })
            .then(function(res){
                _this.replyall=res.data.data.reverse();
            })
            .catch(function(error){
            })
        }
              
    },
}
</script>

<style scoped>
.contents{
    width:cale(100% - 30px);
    padding:10px;
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

.contents table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.contents table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.contents table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
.contents blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
.contents code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
.contents pre code {
  display: block;
}
.contents h1,h2,h3,h4,h5,h6,p{
    margin:10px 0px;
}
.contents ul, ol {
    padding:0px;
  margin: 10px 0 10px 20px;
}
</style>