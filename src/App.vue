<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted() {
    let _this=this;
    _this.$store.dispatch('add_class');
    _this.$store.dispatch('add_type');                 
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width:1200px;
}
</style>
