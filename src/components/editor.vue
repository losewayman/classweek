<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;">
<el-button size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="upload('1')" :disabled="isDisable">上传</el-button>
<el-button size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" class="draft" @click="upload('0')"  :disabled="isDisable">保存草稿</el-button>
</div>
<div id="div1" class="toolbar" >
    </div>
    <div id="div2" class="editortext"></div>
   </div>
</template>
<script>
import E from 'wangeditor'
export default {
      name: 'editor',
      props:['msg'],
      data () {
        return {
          isDisable: false,
          content:'',    //带样式文本
          txt:'',    //纯文本
          editor:'',    //编辑器对象
          draft:'',    //页面初始文本
          id:'0',     //本篇周报id
          uid:'',    //本篇周报作者学号
          leave:''   //离开页面状态判断
        }
      },
      methods: {
        upload(status){
          let _this=this;
          this.isDisable = true
          setTimeout(() => {
            this.isDisable = false
          }, 1000);
          if(this.editor.txt.text()==''){
          _this.$notify({
                  message:"不能为空！",
                  offset: 50,
                  type:'error',
                  duration:2000,
                });
        }else{
          _this.$http({
            url:'api/weekly/article/addArticle.action',
            method:'post',
            params:{
              'content':_this.editor.txt.html(),
              'txt':_this.editor.txt.text(),
              'uId':_this.uid,
              'status':status,
              'id':_this.id,
            }
          })
          .then(function(res){
            if(res.data.status=='200'){
               _this.id=res.data.data;  //把接收到的草稿id重新赋值给this.id
               _this.leave=_this.editor.txt.text();
               if(status=='1'){
                 _this.$emit('child-say','','','','5');
                 _this.$router.push('update');
               }
               else if(status=='0'){
                 _this.$notify({
                  message:"保存成功！",
                  offset: 50,
                  type:'success',
                  duration:2000,
                });
               }
            }
            else{
              if(status=='1'){
                var mm="上传失败！";
              }
              else if(status=='0'){
                var mm="保存失败！";
              }
              _this.$notify({
                message:mm,
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
            }  
          })
          .catch(function(error){
            if(status=='1'){
                var mm="上传失败！";
              }
              else if(status=='0'){
                var mm="保存失败！";
              }
              _this.$notify({
                message:mm,
                offset: 50,
                type:'error',
                duration:1500,
                position: 'bottom-right'
              });
          })
        }
        },
      },
      mounted() {
        var editor = new E('#div1', '#div2')
        this.editor=editor;
        editor.create();
        if(this.msg.childmsg.id==null ||this.msg.childmsg.id=='' ){
          this.id='0';
        }else{
          this.id=this.msg.childmsg.id;
        }
        this.uid=this.msg.xuehao;
        this.draft=this.msg.childmsg.text;
        this.editor.txt.html(this.draft);
      },
      beforeRouteLeave (to, from, next){
        if(this.leave!=this.editor.txt.text()){
            this.$confirm('您可以选择以下操作', '您的周报还未上传！', {
              showClose:false,
              closeOnClickModal:false,
              confirmButtonText: '保存草稿并退出',
              cancelButtonText: '直接离开',
              type: 'warning'
            }).then(() => {
            this.upload('0');
              next();
            }).catch(() => {
              next();  
            });
        }
        else{
          next();
        }
      }
}
</script>
<style>
.toolbar{
  border-bottom:1px solid rgb(230, 230, 230);
  padding-bottom:5px;
}
.editortext{
  height:485px;
  border:1px solid #a1a1a1;
  margin:15px;
  z-index:1000 !important;
}
</style>
