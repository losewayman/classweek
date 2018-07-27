<template>
<div>
<el-button disabled size='small' style="background-color:#0945C4;font-size:12px;">上传</el-button>
<el-button disabled size='small' style="background-color:#a1a1a1;font-size:12px;">保存草稿</el-button>
<div id="editorElem" style="text-align:left"></div>
   <button v-on:click="getContent">查看内容</button>
   </div>
</template>
<script>
import E from 'wangeditor'
export default {
      name: 'editor',
      data () {
        return {
          editor:''
        }
      },
      methods: {
        getContent: function () {
            console.log(this,this.editor);
            alert(this.editor.txt.html());
            
            this.editor.txt.html('<h2>二哥</h2><p style="text-align: center;">哈哈哈哈哈</p>');
            
        }
      },
      mounted() {
        var editor = new E('#editorElem')
        this.editor=editor;
        editor.create()
      }
    }
</script>
