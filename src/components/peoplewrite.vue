<template>
<div>
个人周报列表
{{name}}
<router-link to="draft">Dd</router-link>
</div>

</template>
<script>
export default{
    data(){
        return {
            name:''
        }
    },
    watch:{
        '$route':function(){
            this.name=this.$route.query.name;
        }
    },
    mounted() {
        this.name=this.$route.query.name;
    },
}
</script>