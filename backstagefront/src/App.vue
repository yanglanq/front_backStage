<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  export default {
      data(){
          return{
          }
      },
      created() {
          console.log(document.cookie)
      },
      components:{
    }
  }
</script>

<style lang="less">
</style>
