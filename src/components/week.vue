<template>
<div>
<div id="editor_head" style="border-bottom:1px solid rgb(230, 230, 230);padding:10px;margin-bottom:10px;">
<el-select v-model="seclass" placeholder="请选择班级" >
  <el-option  v-for="(typ,index) in home_class" :label="typ.dvalue" :value="typ.id" :key="index"></el-option>
</el-select>
</div>
    <el-table :data="peolist" style="width: 100%">
    <el-table-column label=" 学号"  width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.uId }}</span>
      </template>
    </el-table-column>
    <el-table-column label="分类" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.type }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间"  width="250">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="周报内容" >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.txt}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
    data() {
      return {
        peolist:[],
        seclass:''
      }
    },
    methods:{
      class(uid){
        var mate = this.$store.getters.get_type;
        for(var i=0;i<mate.length;i++){
          if(mate[i].id == uid){ 
            return mate[i].dvalue;
          }
        }
      },
      Delete(index,id){
        this.$http({
          method:'post',
          url:'api/classweek/article/deleteArticle.action',
          params:{
            'id':id
          }
        })
        .then((res)=>{
          if(res.data.status===200){
            this.$notify({
              message: '删除成功！',
              offset: 50,
              type:'success',
              duration:1500,
            });
            this.peolist.splice(index,1);
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      reqs(ty){
            let _this=this;
        _this.$http({
            method:'post',
            url:'api/classweek/article/getArticleListByType.action',
            params:{
                'grade':ty,
            }
        })
        .then(function(res){
            _this.peolist=res.data.data.reverse();
            for(let i=0;i<_this.peolist.length;i++){
          _this.peolist[i].type = _this.class(_this.peolist[i].type);
        }
        })
        .catch(function(error){
        })
        },
    },
    computed:{
        home_class:function(){
          return this.$store.getters.get_class;
        }
    },
    watch:{
      
        seclass(){
            this.peolist=[];
            this.reqs(this.seclass);
        }
    },
    mounted() {
       var t=this.$store.getters.get_class;
        if(t.length!=0){
            this.seclass=t[0].id;
        }
    },
}
</script>