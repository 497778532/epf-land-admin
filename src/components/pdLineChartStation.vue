<template>
  <div id="pdLine">
    <div class="chart_big_tilte">供需及交易对比分析（面积）</div>
    <div class="chart-container" style="margin-top:20px;">
      <lineChart height="250px" width="100%" :lineData="lineData" style="margin:15px 0;" id="pdlineChart"/>   
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lineChart from '@/components/charts/line'
export default {
  props: ["analyzeMessage", "timeStartMessage", "timeEndMessage"],
  components:{ lineChart },
  data() {
    return {
      cantonProvinceName:sessionStorage.getItem("userName"),
      cityCode: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",
      params: {
        cantonProvince: "",
        startDate: "",
        endDate: ""
      },
      lineData:[
        {
          name: '供给',
          color:'#7fbdf8',
          data:[211, 112, 321, 543, 121, 532, 321],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
        {
          name: '交易',
          color:'#1ac6b7',
          data:[220, 182, 191, 234, 290, 330, 310],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
        {
          name: '需求',
          color:'#ffa060',
          data:[150, 232, 201, 154, 190, 330, 410],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
      ]
    };
  },
  mounted(){
     setTimeout(() => {
      this.timeContDrawLine();
    }, 1000);
  },
  methods: {
    haveCity(code) {
      this.cityCode = code;
      this.timeContDrawLine();
    },
    timeContDrawLine() {
        //请求数据
        let params = this.params;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("pdProvince");
        // params["cantonProvince"] = sessionStorage.getItem("regional");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/sellPurc/queryPurchaseSellTransAnalysis`,
          params
        ).then(res => {
          console.log('供给面积图表数据',res);
          let chartData = res.result;
          var sellAreaSumSeriesData = []; //供给面积图表数据
          var transAreaSumSeriesData = []; //交易面积图表数据
          var purchaseAreaSumSeriesData = []; //需求面积图表数据
          var yearMonthData = []; //x轴时间名称图表数据
          var allAreaSumData = []; //所有面积
          var stAreaSumData = []; //交易面积+供给面积
          var ptAreaSumData = []; //交易面积+需求面积
          for (var key in chartData) {
            sellAreaSumSeriesData.push((chartData[key].sellAreaSum).toFixed(2)); //供给面积
            transAreaSumSeriesData.push((chartData[key].transAreaSum).toFixed(2)); //交易面积
            purchaseAreaSumSeriesData.push((chartData[key].purchaseAreaSum).toFixed(2)); //需求面积
            yearMonthData.push(chartData[key].dateMouth); //x轴时间名称
            allAreaSumData.push(
              chartData[key].sellAreaSum,
              chartData[key].transAreaSum,
              chartData[key].purchaseAreaSum
            ); //所有面积
            stAreaSumData.push(
              chartData[key].sellAreaSum,
              chartData[key].transAreaSum
            ); //交易面积+供给面积
            ptAreaSumData.push(
              chartData[key].transAreaSum,
              chartData[key].purchaseAreaSum
            ); //交易面积+需求面积
          }

          var maxAllAreaSumData = Math.max.apply(Math, allAreaSumData); //全部面积最大值
          var maxStAreaSumData = Math.max.apply(Math, stAreaSumData); //交易面积+供给面积最大值
          var maxPtAreaSumData = Math.max.apply(Math, ptAreaSumData); //交易面积+需求面积最大值
          if (this.analyzeData == "ALL") {
            console.log(yearMonthData);
            this.lineData = [
              {name: '供给',color:'#7fbdf8',data:sellAreaSumSeriesData?sellAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
              {name: '交易',color:'#1ac6b7',data:transAreaSumSeriesData?transAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
              {name: '需求',color:'#ffa060',data:purchaseAreaSumSeriesData?purchaseAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
            ]
          } else if (this.analyzeData == "SELL") {
            this.lineData = [
              {name: '供给',color:'#7fbdf8',data:sellAreaSumSeriesData?sellAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
              {name: '交易',color:'#1ac6b7',data:transAreaSumSeriesData?transAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
            ]
          } else if (this.analyzeData == "PURCHASE") {
            this.lineData=[
              {name: '交易',color:'#1ac6b7',data:transAreaSumSeriesData?transAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
              {name: '需求',color:'#ffa060',data:purchaseAreaSumSeriesData?purchaseAreaSumSeriesData:[],XAxis:yearMonthData?yearMonthData:[],yAxisName:"单位：万平方米"},
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
  watch: {
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      this.timeContDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.timeContDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.timeContDrawLine();
    }
  },
};
</script>

<style>
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
