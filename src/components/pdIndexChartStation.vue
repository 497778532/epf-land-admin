<template>
  <div id="pdIndex">
    <div class="switchHeight_box_top_gx">
      <div class="switchHeight_box_top_left">
        <div class="chart_big_tilte">供需对比（面积）</div>
        <div class="chart-container" style="margin-top:20px;">
          <pieChart ref="charthtml" height="200px" width="95%" :piechartData="piechartData" id="typeContChartpie"/>
        </div>
      </div>
      <div class="switchHeight_box_top_right">
        <div class="chart_big_tilte">新增供需指数</div>
        <div
          class="sum_box_big_right"
          :class="{sum_box_big_right2:this.analyzeData=='SELL'||this.analyzeData=='PURCHASE'}"
        >
          <div class="sum_box_right" v-if="this.analyzeData=='SELL'||this.analyzeData=='ALL'">
            <span class="span_big">
              <span class="span_small_first">
                <img src="../../static/css/img/monitor/地块2.png" alt class="pd_icon" />
              </span>
              <span class="span_small">
                <i style="color:#b5b5b4;font-size:12px;">供给总面积</i>
                <i style="color:#666;font-size:14px;">{{sellAreaSum}}万平方米</i>
              </span>
            </span>
          </div>
          <div class="sum_box_right" v-if="this.analyzeData=='PURCHASE'||this.analyzeData=='ALL'">
            <span class="span_big">
              <span class="span_small_first">
                <img src="../../static/css/img/monitor/图层825.png" alt class="pd_icon" />
              </span>
              <span class="span_small">
                <i style="color:#b5b5b4;font-size:12px;">需求总面积</i>
                <i style="color:#666;font-size:14px;">{{purchaseAreaSum}}万平方米</i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from '@/components/charts/pie'
export default {
  props: ["analyzeMessage", "timeStartMessage", "timeEndMessage"],
  components:{ pieChart },
  data() {
    return {
      cityCode: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",

      params: {
        cantonProvince: "",
        startDate: "",
        endDate: ""
      },
      sellAreaSum: "",
      purchaseAreaSum: "",
      piechartData:[
        {
          name: '供给',
          color:'#5984e7',
          value:20,
        },
        {
          name: '需求',
          color:'#ffad66',
          value:20,
        },
      ],
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.typeContDrawLine();
    },
    typeContDrawLine() {
        //请求数据
        let params = this.params;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("pdProvince");
        // params["cantonProvince"] = sessionStorage.getItem("regional");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/sellPurc/queryPurchaseSellComparison`,
          params
        ).then(res => {
          console.log(res);
          var sellAreaSumData = res.result[0].sellAreaSum; //供应面积数据
          var purchaseAreaSumData = res.result[0].purchaseAreaSum; //需求面积数据
          var areaSumData = res.result[0].areaSum; //总面积数据
          this.sellAreaSum = sellAreaSumData;
          this.purchaseAreaSum = purchaseAreaSumData;
          if (this.analyzeData == "ALL") {
            this.piechartData = [
              {name: '供给',color:'#5984e7',value:res.result[0].sellAreaSum,},
              {name: '需求',color:'#ffad66',value:res.result[0].purchaseAreaSum,},
            ]
          } else if (this.analyzeData == "SELL") {
            this.piechartData=[
              {name: '供给',color:'#5984e7',value:res.result[0].sellAreaSum,},
            ]
          } else if (this.analyzeData = "PURCHASE") {
            this.piechartData=[
              {name: '需求',color:'#ffad66',value:res.result[0].purchaseAreaSum,},
            ]
          }
        });
    },
  },
  created() {
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
  },
   mounted(){
     setTimeout(() => {
      this.typeContDrawLine();
    }, 1000);
  },
  watch: {
    analyzeMessage(val) {
      this.analyzeData = val;
      // console.log(this.analyzeData);
      this.typeContDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      // console.log(this.timeStartData);
      this.typeContDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      // console.log(this.timeEndData);
      this.typeContDrawLine();
    }
  }
};
</script>

<style>
.switchHeight_box_top_gx {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.switchHeight_box_top_left {
  transition: 0.5s;
  background: #fff;
  width: 50%;
  height: 270px;
  margin-bottom: 25px;
  padding: 25px 22px 14px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.switchHeight_box_top_right {
  transition: 0.5s;
  background: #fff;
  width: 47%;
  height: 270px;
  margin-bottom: 25px;
  padding: 25px 22px 0;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.sum_box_big_right {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 40px 0 25px 0;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
.sum_box_big_right2 {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 40px 0 25px 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.sum_box_right {
  padding: 10px 8px;
  width: 80%;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #f6f6f5;
  background-color: #fff;
}
.sum_box_right .span_big {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f5;
  font-size: 14px;
}
.span_small {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  flex: 2;
}
.span_small_first {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.pd_icon {
  width: 30px;
  height: 32px;
}
.chart_big_tilte {
  font-size: 16px;
  font-weight: bolder;
  position: absolute;
  top: 25px;
  left: 22px;
}
.chart_big_tilte_left {
  font-size: 16px;
  font-weight: bolder;
  top: 25px;
  left: 22px;
}
ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.chart_tab_tilte {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #808080;
}
.chart_tab_tilte li {
  /* padding: 0 25px; */
  text-align: center;
  cursor: pointer;
}
.chart_tab_tilte .active {
  color: #ffa000;
  border-bottom: 2px solid #ffa000;
}
.chart_tab_content {
  width: 100%;
}
.chart_tab_content .cur {
  width: 100%;
}
.sum_box_big {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  bottom: 14px;
}
.sum_box {
  padding: 8px;
  width: 30%;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #f6f6f5;
  background-color: #fff;
}
.sum_box span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f5;
  font-size: 14px;
}
</style>
