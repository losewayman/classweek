import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        xuehao:'',  //登陆人学号
        name:'',    //登陆人姓名
        logclass:'',//登陆人班级
        collect:'', //收藏列表
        class:[],   //班级列表
        type:[],    //类型列表
        classmate:[{dvalue:'',id:'', username:''}], //班级同学列表

        home_headindex:'1',
        home_asideindex:'0',

        editor_id:'0',   //写文章页面默认id
        editor_content:'',
        editor_type:'',

        peo_id:'',  //周报详情页id
        peo_xuehao:'',

        mate_xuehao:''
    },
    getters:{
        //获得班级分类
        get_class:state =>{
            return state.class;
        },
        //获得分类
        get_type:state =>{
            return state.type;
        },
        get_name:state =>{
            return state.name;
        },
        get_xuehao:state =>{
            return state.xuehao;
        },
        get_logclass:state =>{
            return state.logclass;
        },
        get_collect:state =>{
            return state.collect;
        },
        get_classmate:state =>{
            return state.classmate;
           
        },
        //获取上传页面文章id
        get_editorid:state =>{
            return state.editor_id;
        },
        //获取上传页面内容
        get_editorcontent:state =>{
            return state.editor_content;
        },
        get_editortype:state =>{
            return state.editor_type;
        },
        //获取顶栏选中控制
        get_headindex:state =>{
            return state.home_headindex;
        },
        //获取左侧栏选中控制
        get_asideindex:state =>{
            return state.home_asideindex;
        },
        get_peoid:state =>{
            return state.peo_id;
        },
        get_peoxuehao:state =>{
            return state.peo_xuehao;
        },
        get_matexuehao:state =>{
            return state.mate_xuehao;
            
        },
    },
    mutations:{
        //添加班级列表      
        add_class:(state,data)=>{
            state.class=data;
        },
        //添加分类列表  
        add_type:(state,data)=>{
            state.type=data;
        },
        //添加登陆人信息，班级同学信息
        add_selfmes:(state,data)=>{
            state.xuehao=data.user.id;
            state.name=data.user.username;
            state.classmate=data.data;
            state.logclass=data.user.grade;
        },
        add_collect:(state,data) =>{
            state.collect=data;
        },
        add_headindex:(state,data) =>{
            state.home_headindex=data;
        },
        add_asideindex:(state,data) =>{
            state.home_asideindex=data;
        },
        add_editorid:(state,data) =>{
            state.editor_id=data;
        },
        add_editorcontent:(state,data) =>{
            state.editor_content=data;
        },
        add_editortype:(state,data) =>{
            state.editor_type=data;
        },
        add_peoid:(state,data) =>{
            state.peo_id=data;
        },
        add_peoxuehao:(state,data) =>{
            state.peo_xuehao=data;
        },
        add_matexuehao:(state,data) =>{
            state.mate_xuehao=data;
        },
    },
    actions:{
        //请求班级列表
        add_class:(context)=>{
            axios({
                method:'post',
                url:'api/classweek/dict/getDicttype.action',
                data:{
                    dtype:"001"
                }
            })
            .then((res)=>{
                if(res.data.status===200){
                    context.commit('add_class',res.data.data);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //请求分类列表
        add_type:(context)=>{
            axios({
                method:'post',
                url:'api/classweek/dict/getDicttype.action',
                data:{
                    dtype:"002"
                }
            })
            .then((res)=>{
                if(res.data.status===200){
                    context.commit('add_type',res.data.data);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //请求个人信息，班级成员
        add_selfmes:(context,{gologin,gohome})=>{
            axios({
                method:"post",
                url:'api/classweek/user/isLogin.action',
                data:{
                }
            })
            .then((res)=>{
                if(res.data.status===200){
                    context.commit('add_selfmes',res.data);
                    if(res.data.user.collection==null){
                        context.commit('add_collect',[]);
                    }else{
                        context.commit('add_collect',res.data.user.collection.split(','));
                    }
                    gohome();
                }
                else{
                    gologin();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        
    }
})