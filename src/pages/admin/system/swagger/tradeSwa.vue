<template>
  <div id="body">

    <iframe id="main" name="main" frameborder="0"  :src="srcIf"
            style="min-height:600px;width:100%;height:100%;"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'tradeSwa',
    data(){
      return{
        srcIf:'/api/epf-trade/swagger-ui.html'
      }
    }
  }
</script>

<style scoped>
  html { overflow-x:hidden; }
  #body{
    overflow-x:hidden;
    overflow-y: hidden;
  }
</style>
