<template>
<div>
<div id="editor_head" style="border-bottom:1px solid rgb(230, 230, 230);padding-bottom:10px;margin-bottom:10px;">
<el-select v-model="type" placeholder="请选择文章分类" >
  <el-option  v-for="(typ,index) in home_type" :label="typ.dvalue" :value="typ.id" :key="index"></el-option>
</el-select>
</div>
<el-card class="box-card card" v-for="(datas,index) in data" :key="datas.id" shadow="always" :body-style="{padding:'5px 30px 10px 30px' , border:'0px'}">
  <div slot="header" class="clearfix">
    <strong><span  style="font-size:14px">{{name(datas.uId)}}</span></strong>
    <span  style="font-size:13px;margin-left:20px;"  v-text="time(datas.createTime)"></span>
  </div>
  <div class="texts item" @click="readtext(datas.id,datas.uId)">
    {{datas.txt}}
  </div>
</el-card>

<!--测试数据-->



</div>
</template>
<script>
export default{
    data(){
        return{
            data:[],    //登陆用户的草稿数据
            type:null
        }
    },
    methods:{
        time(ti){
            return ti.substr(0,10);
        },
        readtext(aid,uId){
            this.$store.commit("add_peoid",aid);
            this.$store.commit("add_peoxuehao",uId);
            this.$router.push('weekly');
        },
        reqs(ty){
            let _this=this;
        _this.$http({
            method:'post',
            url:'api/classweek/article/getArticleListByType.action',
            params:{
                'grade':_this.$store.getters.get_logclass,
                'type':ty
            }
        })
        .then(function(res){
            _this.data=res.data.data.reverse();
        })
        .catch(function(error){
        })
        },
        name(uid){
            var mate = this.$store.getters.get_classmate;
            for(var i=0;i<mate.length;i++){
                if(mate[i].id == uid){ 
                    return mate[i].username;
                }
            }
        }
    },
    computed:{
        home_type:function(){
          return this.$store.getters.get_type;
        }
    },
    watch:{
        
        type(){
            this.data=[];
            this.reqs(this.type);
        }
    },
    mounted() {
        var t=this.$store.getters.get_type;
        if(t.length!=0){
            this.type=t[0].id;
        }
    },
}
</script>
<style scoped>
  .texts {
    font-size: 13px;
  }

  .item {
    height:30px;
    line-height:30px;
    text-align:left;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .card{
      border-width:0px 0px 0px 0px !important;
      margin:0px 0px 10px 100px!important;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
  }
</style>
<style>
.el-card__header{
    padding:10px 30px 0px 30px !important;
    border:0px !important;
}
.toolbar{
  border-bottom:1px solid rgb(230, 230, 230);
  padding-bottom:5px;
}
.w-e-menu{
  z-index:100 !important;
}
#editor_head input{
  height:32px;
  line-height:32px;
}
</style>