<template>
<div>
<el-button type="primary" size="small">上传<i class="el-icon-upload el-icon--right"></i></el-button>
<el-button type="primary"  icon="el-icon-edit"></el-button>
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
