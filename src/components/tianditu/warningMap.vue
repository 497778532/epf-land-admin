<template>
  <div id="tianMap">
    <el-row class="searchInput">
      <el-col :span="6">
        <div class="biaoji wei"></div>
        <div class="text">未动工</div>
      </el-col>
      <el-col :span="6">
        <div class="biaoji zai"></div>
        <div class="text">在建</div>
      </el-col>
      <el-col :span="6">
        <div class="biaoji cheng"></div>
        <div class="text">已建成</div>
      </el-col>
      <el-col :span="6">
        <div class="biaoji tou"></div>
        <div class="text">已投产</div>
      </el-col>
    </el-row>
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
<script>
import TMap from "@/components/tianditu/init";
export default {
  props: {
    Dlongitude: Number,
    Dlatitude: Number,
    LabelData: Array
  },
  data() {
    return {
      data: [
        {
          area: 1000,
          longitude: 116.40769,
          latitude: 39.89945,
          constrStatus: 1
        },
        {
          area: 1000,
          longitude: 116.39269609498324,
          latitude: 39.90813521501257,
          constrStatus: 1
        },
        {
          area: 1000,
          longitude: 116.40255216988005,
          latitude: 39.90844780424799,
          constrStatus: 1
        },
        {
          area: 1000,
          longitude: 116.39579783754893,
          latitude: 39.9028980219151,
          constrStatus: 1
        },
        {
          area: 1000,
          longitude: 116.39501982215235,
          latitude: 39.90852857944353,
          constrStatus: 1
        },

        {
          area: 1000,
          longitude: 116.39555570110487,
          latitude: 39.90338847762402,
          constrStatus: 2
        },
        {
          area: 1000,
          longitude: 116.39145588843083,
          latitude: 39.90294456192494,
          constrStatus: 2
        },
        {
          area: 1000,
          longitude: 116.3988138969716,
          latitude: 39.90355441655483,
          constrStatus: 2
        },
        {
          area: 1000,
          longitude: 116.3910736343754,
          latitude: 39.903838021127285,
          constrStatus: 2
        },
        {
          area: 1000,
          longitude: 116.40182898591468,
          latitude: 39.904779980987826,
          constrStatus: 2
        },

        {
          area: 1000,
          longitude: 116.3906672084721,
          latitude: 39.90561215939884,
          constrStatus: 3
        },
        {
          area: 1000,
          longitude: 116.39332768577825,
          latitude: 39.90533884023049,
          constrStatus: 3
        },
        {
          area: 1000,
          longitude: 116.39483840572673,
          latitude: 39.90730036442137,
          constrStatus: 3
        },
        {
          area: 1000,
          longitude: 116.39186178767103,
          latitude: 39.907996005125916,
          constrStatus: 3
        },
        {
          area: 1000,
          longitude: 116.39660763595548,
          latitude: 39.90662070560163,
          constrStatus: 3
        },

        {
          area: 1000,
          longitude: 116.40462083385691,
          latitude: 39.902510209525076,
          constrStatus: 4
        },
        {
          area: 1000,
          longitude: 116.39479956926708,
          latitude: 39.90244812604899,
          constrStatus: 4
        },
        {
          area: 1000,
          longitude: 116.39466707678862,
          latitude: 39.90192546803828,
          constrStatus: 4
        },
        {
          area: 1000,
          longitude: 116.40283325763251,
          latitude: 39.9067204816776,
          constrStatus: 4
        },
        {
          area: 1000,
          longitude: 116.39556273016461,
          latitude: 39.9027795760098,
          constrStatus: 4
        }
      ],
      T: "",
      map: "", //map对象
      zoom: 16, //地图显示级别
      longitude: this.Dlongitude, //经度
      latitude: this.Dlatitude //维度
    };
  },
  mounted() {
    console.log(this.longitude);
    setTimeout(this.getPosition(), 1000); //延迟1s载入
  },
  created() {
    console.log(this.LabelData);
  },
  watch: {
    $route: "getPosition",
    Dlongitude: "getPosition",
    Dlatitude: "getPosition"
    // longitude: function(params) {
    //   console.log(this.longitude)
    //   setTimeout(this.getPosition(), 1000); //延迟1s载入
    // },
    // latitude: function(params) {
    //   setTimeout(this.getPosition(), 1000); //延迟1s载入
    // }
  },
  methods: {
    getPosition() {
      console.log(this.Dlongitude, this.Dlatitude)
      const that = this;
      TMap.init()
        .then(T => {
          this.T = T;
          this.map = new T.Map(this.$refs.mapDiv); //初始化地图
          this.map.centerAndZoom(
            new T.LngLat(that.Dlongitude, that.Dlatitude),
            this.zoom
          ); //设置显示中心点和比例
          let lc = new T.LocalCity();
          let me = this;
          let listener = null;

          //创建标注对象
          // var marker = new T.Marker(
          //   new T.LngLat(this.longitude, this.latitude)
          // );
          //向地图上添加标注
          var definedOverlay = T.Overlay.extend({
            initialize: function(lnglat, x, y, options) {
              this.lnglat = lnglat;
              this.setOptions(options);
              this._x = x;
              this._y = y;
            },

            onAdd: function(map) {
              this.map = map;
              var div = (this._div = document.createElement("div"));
              div.style.position = "absolute";
              div.style.width = "18px";
              div.style.height = "28px";
              div.style.background =
                "url(../../../static/css/img/marker.fa27fc8.png) no-repeat";
              div.style.backgroundPosition = this._x + "px " + "-15px";
              map.getPanes().overlayPane.appendChild(this._div);
              this.update(this.lnglat);
            },
            /**
             * 更新位置
             */
            update: function() {
              var pos = this.map.lngLatToLayerPoint(this.lnglat);
              this._div.style.top = pos.y - 36 + "px";
              this._div.style.left = pos.x - 11 + "px";
            }
          });

          // var bounds = this.map.getBounds();
          // var sw = bounds.getSouthWest();
          // var ne = bounds.getNorthEast();
          // var lngSpan = Math.abs(sw.lng - ne.lng);
          // var latSpan = Math.abs(ne.lat - sw.lat);

          for (var i = 0; i < this.LabelData.length; i++) {
            // console.log(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7))
            if(this.LabelData[i] && this.LabelData[i].coordinate !='' && this.LabelData[i].coordinate != null){
            //对数据进行判断存不存在,并且对其coordinate属性判断存在不存在
            var point = new T.LngLat(
              this.LabelData[i].coordinate.split(",")[0],
              this.LabelData[i].coordinate.split(",")[1]
            );
            let backgroundX = -20;
            switch (this.LabelData[i].constrStatus) {
              case "constr_status-001":
                backgroundX = -20;
                break;
              case "constr_status-002":
                backgroundX = -64;
                break;
              case "constr_status-004":
                backgroundX = -108;
                break;
              case "constr_status-003":
                backgroundX = -196;
                break;
            }
            console.log(backgroundX);
            var pdefinedOverlay = new definedOverlay(point, backgroundX, {});
            this.map.addOverLay(pdefinedOverlay);
            }
          }

          // var point = new T.LngLat(116.40769, 39.89945);
          // var pdefinedOverlay = new definedOverlay(point, -20, {});
          // this.map.addOverLay(pdefinedOverlay);

          this.map.disableInertia(); //禁止鼠标地图惯性拖拽
          this.map.disableDoubleClickZoom(); //禁止双击地图放大
          this.map.disableKeyboard(); //禁止键盘操作地图
        })
        .catch(error => {
          this.$message({
            center: true,
            message: error,
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
#tianMap {
  width: 990px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.searchInput {
  position: absolute;
  right: 20px;
  top: 20px;
  height: 50px;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.65);
  z-index: 9999;
  border-radius: 5px;
}
.mapDiv {
  width: 100%;
  height: 100%;
}
.biaoji {
  width: 18px;
  height: 28px;
  background: url("../../../static/css/img/marker.fa27fc8.png") no-repeat;
  margin: 0 auto;
}
.wei {
  background-position: -20px -15px;
}
.zai {
  background-position: -64px -15px;
}
.cheng {
  background-position: -196px -15px;
}
.tou {
  background-position: -108px -15px;
}
#tianMap .text {
  margin: 0 auto;
  text-align: center;
}
</style>
