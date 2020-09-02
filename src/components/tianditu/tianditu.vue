<template>
  <div id="tianMap">
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
<script>
import TMap from "@/components/tianditu/init";
export default {
  props:{
    Dlongitude:Number,
    Dlatitude:Number
  },
  data() {
    return {
      T: "",
      map: "", //map对象
      zoom:13, //地图显示级别
      longitude:this.Dlongitude, //经度
      latitude:this.Dlatitude, //维度
    }
  },
  mounted() {
    
    setTimeout(this.getPosition(),1000) //延迟1s载入
  },
  watch: {
    $route: "getPosition"
  },
  methods: {
    getPosition() {
      TMap.init().then(T => {
        this.T = T;
        this.map = new T.Map(this.$refs.mapDiv); //初始化地图
        this.map.centerAndZoom(new T.LngLat(this.longitude,this.latitude),this.zoom); //设置显示中心点和比例
        let lc = new T.LocalCity();
        let me = this;
        let listener = null;

        //创建标注对象
        var marker = new T.Marker(new T.LngLat(this.longitude,this.latitude));
        //向地图上添加标注
        this.map.addOverLay(marker);

        this.map.disableInertia() //禁止鼠标地图惯性拖拽
        this.map.disableDoubleClickZoom() //禁止双击地图放大
        this.map.disableKeyboard() //禁止键盘操作地图
      }).catch(error => {
        this.$message({
          center:true,
          message: error,
          type: 'error'
        })
      });
    },
  }
};
</script>
<style scoped>
#tianMap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.mapDiv {
  width: 100%;
  height: 100%;
}
</style>
