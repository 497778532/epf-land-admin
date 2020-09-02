<template>
  <div class="mould">
    <div class="pages">
      <div class="title" :style="{fontSize:fontSize}">
        {{text}}
      </div>
      <div class="content" :style="{height:menuHeight+'px'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'mould',
  props:{
    title:{
      type:String,
      default:'标题'
    }
  },
  data(){
    return{
      text:this.title,
      fontSize:'16px',
      menuHeight:100,
    }
  },
  created(){
    this.menuHeight = window.innerHeight - 230;
  },
  mounted(){
    this.$bus.$on('setFontSize',(res)=>{ //设置字体尺寸
      if(res==='12px'){
        this.fontSize = '14px'
      }else if(res==='14px'){
        this.fontSize = '16px'
      }else{
        this.fontSize = '18px'
      }
    })
  }
}
</script>
<style lang="less" scoped>
.mould{
  background: #f2f2f2;
  padding: 12px;
  height: 100%;
  .pages{
    background: #fff;
    border-radius: 4px;
    height: 100%;
    border: 1px #e6e6e6 solid;
  }
  .title{
    border-bottom: 1px #e6e6e6 solid;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }
  .content{
    padding: 10px;
    overflow: auto;
  }
}
</style>