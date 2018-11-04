<template>
<div>
<div id="editor_head" style="border-bottom:1px solid rgb(230, 230, 230);margin-bottom:10px;">
<el-button size='small' style="margin:10px;background-color:#0945C4;font-size:12px;color:white" @click="upload(1)" :disabled="isDisable">上传</el-button>
<el-button size='small' style="margin:10px;background-color:#f2f2f2;font-size:12px;border:1px solid #a1a1a1;color:black;margin-right:20px;" class="draft" @click="upload(0)"  :disabled="isDisable">保存草稿</el-button>
<el-select v-model="txt_type" placeholder="请选择文章分类" >
  <el-option  v-for="(type,index) in edit_type" :label="type.dvalue" :value="type.id" :key="index"></el-option>
</el-select>
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
      data () {
        return {
          isDisable: false,
          txt:'',    //纯文本
          editor:'',    //编辑器对象
          edid:'0',     //本篇周报id
          leave:'',   //离开页面状态判断
          txt_type:'',
        }
      },
      methods: {
        upload(status){
          let _this=this;
          this.isDisable = true
          setTimeout(() => {
            this.isDisable = false
          }, 1000);
          if(this.editor.txt.text()==''||this.txt_type==''){
            _this.$notify({
              message:"文章内容或分类不能为空！",
              offset: 50,
              type:'error',
              duration:2000,
            });
          }else{
            _this.$http({
                url:'api/classweek/article/addArticle.action',
                method:'post',
                data:{
                  'content':_this.editor.txt.html(),
                  'txt':_this.editor.txt.text(),
                  'uId':_this.$store.getters.get_xuehao,
                  'status':status,
                  'id':_this.edid,
                  'type':_this.txt_type
                }
             })
            .then(function(res){
            if(res.data.status=='200'){
               
               _this.leave=_this.editor.txt.text();
               if(status=='1'){
                 _this.$store.commit("add_editorid",0);
                 _this.$store.commit("add_headindex",'5');
                 _this.$store.commit("add_asideindex",'0');
                 _this.$router.push('update');
               }
               else if(status=='0'){
                 _this.$store.commit("add_editorid",res.data.data); //把接收到的草稿id重新赋值给this.id
                 _this.edid=_this.$store.getters.get_editorid;
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
      computed:{
        edit_type:function(){
          return this.$store.getters.get_type;
        }
    },
      mounted() {
        var editor = new E('#div1', '#div2')
        this.editor=editor;
        editor.create();
        this.edid=this.$store.getters.get_editorid;
        this.txt_type=this.$store.getters.get_editortype;
        this.editor.txt.html(this.$store.getters.get_editorcontent);
        this.$store.commit("add_editorid",0);
        this.$store.commit("add_editortype",'');
        this.$store.commit("add_editorcontent",'');
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
  height:calc(100vh - 190px);
  border:1px 1px 1px 0px solid #a1a1a1;
  z-index:1000 !important;
}
.w-e-menu{
  z-index:100 !important;
}
#editor_head input{
  height:32px;
}
</style>
