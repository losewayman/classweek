<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;padding:10px 15px;">
<el-button  size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="back()">返回</el-button>
<el-button v-show="collectshow" size='small' style="background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" @click="bucollect()" :disabled="isDisable">{{collecttext}}</el-button>
</div >




<div class="contents" v-html="text"></div>


<el-card class="box-card" shadow="never" v-for="(o,index) in replyall" :key="index" :body-style="{padding:'0px'}">
  <div class="replytext replyitem">
    <strong>{{ o.username }}</strong><span> {{time(o.createTime)}}</span>
  </div>
  <div class="replytext replyitem">
    {{ o.txt }}
  </div>
</el-card>


<div style="padding:15px;">
<el-input type="textarea" class="area" v-model="replymsg"></el-input>
<el-button size='small' style="margin-top:10px;background-color:#0945C4;font-size:12px;color:white" @click="send()" >发送</el-button>
</div>
</div>
</template>
<script>
export default{
    props:['msg'],
    data(){
        return{
            isDisable:false,

            replymsg:'',     //回复内容  
            replyall:'',     //本篇文章上所有回复内容
            text:'',   //本篇文章内容
            collect:'',
            collectshow:true,      //控制收藏按钮
            collecttext:'收藏',    //收藏按钮显示
            id:'',   //本篇文章id
            uid:'',     //本篇文章作者学号

        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        reply(){
            let _this =this;
        },
        time(ti){
            return ti.substr(0,16);
        },
        bucollect(){
            this.isDisable = true
        setTimeout(() => {
          this.isDisable = false
        }, 1000);
            let _this =this;
            if(_this.collecttext == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                var url = 'api/classweek/user/addColl.action';
            }
            if(_this.collecttext == '已收藏'){
                var url = 'api/classweek/user/deleteColl.action';
            }
            _this.$http({    //请求相关信息
                method:'post',
                url:url,
                data:{
                    'id':_this.$store.getters.get_xuehao,
                    'aId':_this.id,
                }
            })
            .then(function(res){
                var sc=_this.collecttext;
                if(sc == '收藏'){                     //根据收藏按钮状态来判断请求取消收藏或添加收藏
                    _this.$notify({
                        message: '收藏成功！',
                        offset: 50,
                        type:'success',
                        duration:2000,
                    });
                    _this.collecttext ='已收藏';
                    console.log(_this.collect);
                    _this.collect.push(_this.id);
                    console.log(_this.collect);
                    _this.$store.commit("add_collect",_this.collect);
                }
                if(sc == '已收藏'){
                    _this.$notify({
                        message: '取消收藏成功！',
                        offset: 50,
                        type:'success',
                        duration:2000,
                    });
                    _this.collecttext ='收藏';
                     _this.collect.splice(_this.collect.indexOf(_this.id),1);
                    _this.$store.commit("add_collect",_this.collect);
                }
            })
            .catch(function(error){
                _this.$notify({
                        message: '发生未知错误！',
                        offset: 50,
                        type:'error',
                        duration:2000,
                });
            })
        },  
        send(){
            let _this =this;
            _this.$http({
                method:'post',
                url:'api/classweek/replyArticle/addReplyArticle.action',
                data:{
                    'aId':_this.id,
                    'txt':_this.replymsg,
                    'uId':_this.$store.getters.get_xuehao,
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
                var dateformat=year+"-"+month+"-"+date + " " + datetime.getHours() + ":" + datetime.getMinutes();
                _this.replyall.push({'createTime':dateformat,'username':_this.$store.getters.get_name,'txt':_this.replymsg});
                _this.replymsg="";
            })
            .catch(function(error){
                 _this.$notify({
                        message: '发送失败！',
                        offset: 50,
                        type:'error',
                        duration:2000,
                });
            })
        },
    },

    mounted() {
        let _this = this;
        _this.collect = _this.$store.getters.get_collect;
        _this.id = _this.$store.getters.get_peoid;
        _this.uid = _this.$store.getters.get_peoxuehao;
        _this.$http({     //请求本篇文章上的所有回复
            method:'post',
            url:'api/classweek/article/getArticleById.action',
            params:{
                'id':_this.$store.getters.get_peoid,
            }
        })
        .then(function(res){
            if(res.data.status=="200"){
                _this.text=res.data.data.content;
                _this.replyall=res.data.data.replyArticle;
            }
        })
        .catch(function(error){
        })
        if(_this.uid==_this.$store.getters.get_xuehao){
            this.collectshow=false;
        }else{
            for(let index=0;index<_this.collect.length;index++){
                if(_this.collect[index]==_this.id){
                    _this.collecttext="已收藏";
                }
            }
        }
    },
}
</script>

<style scoped>
.contents{
    width:cale(100% - 30px);
    padding:10px;
    padding-right:12px;
    min-height:calc(100vh - 225px);
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