<template>
    <el-table :data="peolist" style="width: 100%">
    <el-table-column label=" 学号"  width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="班级" width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.grade }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名"  >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="Delete(scope.$index,scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    data() {
      return {
        peolist:[],
      }
    },
    methods:{
      class(uid){
        var mate = this.$store.getters.get_class;
        for(var i=0;i<mate.length;i++){
          if(mate[i].id == uid){ 
            return mate[i].dvalue;
          }
        }
      },
      Delete(index,id){
        this.$http({
          method:'post',
          url:'api/classweek/user/updateUserStatus.action',
          params:{
            "id":id
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
      }
    },
    mounted() {
      let _this = this;
      _this.$http({
        method:'post',
        url:'api/classweek/user/getUserList.action',
        data:{

        }
      })
      .then((res)=>{
        _this.peolist = res.data.data;
        for(let i=0;i<_this.peolist.length;i++){
          _this.peolist[i].grade = _this.class(_this.peolist[i].grade);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    },
}
</script>