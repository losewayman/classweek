<template>
<div>
个人周报列表
{{name}}
<router-link to="draft">Dd</router-link>
</div>

</template>
<script>
export default{
    props:['msg'],
    data(){
        return {
            name:''
        }
    },
    watch:{
        '$route':function(){
            this.name=this.$route.query.name;
        },
        'msg':function(){    //后续多次
            console.log(this.msg);
        }
    },
    mounted() {   //第一次
        console.log(this.msg);
    },
}
</script>