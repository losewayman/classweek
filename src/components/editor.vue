<template>
<div>
<div style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;">
<el-button size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="upload('1')">上传</el-button>
<el-button size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;" class="draft" @click="upload('0')">保存草稿</el-button>
</div>

<div id="div1" class="toolbar" >
    </div>
    <div id="div2" class="text"></div>
   </div>
</template>
<script>
import E from 'wangeditor'
export default {
      name: 'editor',
      props:['msg'],
      data () {
        return {
          content:'',
          txt:'',
          editor:'',
          draft:'',
          id:''
        }
      },
      methods: {
        upload(status){
          console.log('jj',this.editor.txt.html());
          let _this=this;
          _this.$http({
            url:'',
            method:'post',
            data:{
              'content':_this.editor.txt.html(),
              'txt':_this.editor.txt.text(),
              'uid':_this.msg,
              'status':status,
              'id':_this.id,
            }
          })
          .then(function(res){
            console.log(res);
          })
          .catch(function(error){
            console.log(error);
          })
        },
      },
      mounted() {
        let _this=this;
       
        var editor = new E('#div1', '#div2')
        this.editor=editor;
        editor.create();
        this.id=localStorage.getItem('id');
        this.draft=localStorage.getItem('wen');
        localStorage.removeItem('id');
        localStorage.removeItem('wen');
        this.editor.txt.html(this.draft);

      },
       beforeRouteLeave (to, from, next) {
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
    }
</script>
<style>
.toolbar{
  border-bottom:1px solid rgb(230, 230, 230);
  padding-bottom:5px;
}
.text{
  height:490px;
  border:1px solid #a1a1a1;
  margin:15px;
  z-index:1000 !important;
}
</style>
