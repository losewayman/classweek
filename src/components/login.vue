<template>
<div id="background">
    <div v-show="logshow" id="log" class="ba_body">
    <div class="log_head">登&nbsp&nbsp&nbsp&nbsp录</div>
    <div class="log_input"><input id="log_name" type="text" name="username"  placeholder="请输入学号" autocomplete="off" v-model="logxuehao"/></div>
    <div class="log_input"><input id="log_pass" type="password" name="password"  placeholder="请输入由字母和数字组成的6~12位密码" autocomplete="off" v-model="logpass"/></div>
    <div class="log_button"><button @click="login()">登 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp录</button></div>
    <div id="log_go"  @click="jiaohuan()">去 注 册</div>
    </div>

    <div v-show="signshow" id="sign" class="ba_body">
    <div class="log_head">注&nbsp&nbsp&nbsp&nbsp册</div>
    <div class="log_input"><input id="sign_xuehao" type="text" name="xuehao"  placeholder="请输入学号" autocomplete="off"  v-model="signxuehao"/></div>
    <div class="log_input"><input id="sign_name" type="text" name="username"  placeholder="请输入姓名" autocomplete="off"  v-model="signname"/></div>
    <div class="log_input">
    
    <el-select v-model="signclass" placeholder="请选择班级">
      
      <el-option v-for="(cl,index) in login_class" :label="cl.dvalue + '班'" :value="cl.id" :key="index"></el-option>
    </el-select>
  </div>
    <div class="log_input"><input id="sign_pass" type="password" name="password"  placeholder="请输入由字母和数字组成的6~12位密码" autocomplete="off"  v-model="signpass"/></div>
    <div class="log_button"><button @click="sign()">注 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp册</button></div>
    <div id="sign_go" @click="jiaohuan()">去 登 录</div>
    </div>
</div>

</template>
<script>
import md5 from 'js-md5';
export default{
    data(){
        return{
            logshow:true,
            signshow:false,
            logxuehao:'',
            logpass:'',
            signxuehao:'',
            signname:'',
            signclass:'',
            signpass:'',
        }
    },
    methods:{
        jiaohuan(){
            if(this.logshow===false){
                this.logshow=true;
                this.signshow=false;
            }else{
                this.logshow=false;
                this.signshow=true;
            }
        },
        login(){
            var _this=this;
            var xuehao = this.logxuehao;
            var pass = this.logpass;
            if(_this.yan(xuehao,pass)){
                _this.$http({
                    method:'post',
                    url:"api/classweek/user/login.action",
                    data:{
                        "id":xuehao,
                        "password":md5(pass),
                    }
                })
                .then((res)=>{
                    if(res.data.status===200){
                        _this.$router.push('main'); 
                    }else{
                        _this.$notify({
                            message: '登录失败',
                            offset: 50,
                            type:'error',
                            duration:1500,
                        });
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
                
            }
        },
        sign(){
            var _this=this;
            var xuehao = this.signxuehao;
            var pass = this.signpass;
            if(_this.yan(xuehao,pass)){
                let _this = this;
                _this.$http({
                    method:'post',
                    url:"api/classweek/user/register.action",
                    data:{
                        "id":xuehao,
                        "password":md5(pass),
                        "username":_this.signname,
                        "grade":1
                    }
                })
                .then((res)=>{
                    if(res.data.status===200){
                        this.signxuehao='';
                        this.signpass='';
                        _this.$notify({
                            message: '注册成功',
                            offset: 50,
                            type:'success',
                            duration:1500,
                        });
                    }else{
                        _this.$notify({
                            message: '注册失败',
                            offset: 50,
                            type:'error',
                            duration:1500,
                        });
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
                
            }
        },
        yan(xue,pass){
            var _this=this;
            var regxuehao=/^[0-9]{8}$/;
            var regpass=/^[a-zA-Z0-9]{6,12}$/;
            if(regxuehao.test(xue)===false){
                 _this.$notify({
                    message: '请输入8位学号',
                    offset: 50,
                    type:'error',
                    duration:1500,
                });
                return false;
            }else{
                if(regpass.test(pass)===false){
                    _this.$notify({
                    message: '请输入由英文字母和数字组成的6~12位字符',
                    offset: 50,
                    type:'error',
                    duration:1500,
                });
                return false;
                }else{
                    return true;
                }

            }
        },
    },
    computed:{
        login_class:function(){
            return this.$store.getters.get_class
        }
    },
    mounted() { 
    },
}
</script>
<style>
#background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    right: 0px;
    background: url(../assets/background.png) center no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
.ba_body{
    width:300px;
    overflow:auto;
    background-color: white;
    position: absolute;
    right:350px;
    top:150px;
    border-radius: 5px;
}
.log_head{
    width:100%;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size:16px;
    font-weight: bold;
    color:#01aaed;
}
.log_input{
    width:100%;
    height:30px;
    margin:15px 0px;
    line-height:30px;
    text-align:center;
}
.log_input input{
    width:240px;
    height:30px;
    box-sizing: border-box;
    border:1px solid #87CEFA;
    outline:none;
    font-size:12px;
    padding:0px 10px;
}
.log_button{
    width:100%;
    height:30px;
    margin:20px 0px;
    line-height:30px;
    text-align:center;
}
.log_button button{
    width:240px;
    height:30px;
    background-color:#87CEFA;
    border-width:0px;
    outline:none;
    border-radius:3px;
}
#log_go,#sign_go{
    width:240px;
    height:30px;
    line-height:30px;
    text-align:right;
    box-sizing:border-box;
    font-size:14px;
    color:#01aaed;
    margin:auto;
}
</style>