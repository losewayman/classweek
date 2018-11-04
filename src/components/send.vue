<template>
  <div class="sesend">
    <div  class="ind"><el-input placeholder="请输入标题" v-model="title"></el-input></div>
    <div  class="ind"><el-input :rows="16" type="textarea" placeholder="请输入内容" v-model="cont"></el-input></div>
    <div  class="ind">
    <el-select v-model="sendclass" placeholder="请选择班级">
      <el-option v-for="(cl,index) in send_class" :label="cl.dvalue + '班'" :value="cl.id" :key="index"></el-option>
    </el-select>
    <el-button type="primary" v-on:click="send">发 布</el-button>
    </div>
  </div> 
</template>

<script>
export default {
    data(){
        return{
            title:'',
            cont:'',
            sendclass:'',
        }
    },
    methods:{
        send(){
            let _this = this;
            if(_this.title!='' && _this.cont!='' && _this.sendclass!=''){
                _this.$http({
                    url:'api/classweek/message/addMessage.action',
                    method:'post',
                    data:{
                        title:_this.title,
                        txt:_this.cont,
                        grade:_this.sendclass
                    }
                })
                .then((res)=>{
                    _this.sendclass='';
                    _this.$notify({
                        message:"发布成功",
                        offset: 50,
                        type:'success',
                        duration:1500,
                    });
                })
                .catch((err)=>{
                    console.log(err);
                })
            }else{
                _this.$notify({
                message:"请将信息填写完整",
                offset: 50,
                type:'warning',
                duration:1500,
              });
            }
        }
    },
    computed:{
        send_class:function(){
            return this.$store.getters.get_class
        }
    },
}
</script>
<style>
.sesend{
    width:60%;
    min-width:600px;
    margin:40px auto;
}
.ind{
    margin:20px;
}

</style>