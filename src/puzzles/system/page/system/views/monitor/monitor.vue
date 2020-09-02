<template>
  <epf-container title='日志监控'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar">
        <el-row>
          <el-col :span="6" class="term">
            <el-select 
              v-model="yyyy" 
              placeholder="年份选择" 
              style="width:100%"
              @change="yyyyChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="term">
            <el-select 
              v-model="mm" 
              placeholder="月份选择" 
              style="width:100%"
              @change="mmChange">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="term">
            <el-date-picker
              v-model="params.selectDate"
              style="width:100%;"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :span="6" class="term epf_align_left">
            <button class="epf_btn epf_btn_bg" @click="searchList">查询</button>
            <button class="epf_btn epf_btn_def" @click="clearList">重置</button>
          </el-col>
        </el-row>
      </div>
      <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
        <hiChart id="high" class="high" :option="option1"></hiChart>
        <hiChart id="high2" class="high2" :option="option2"></hiChart>
      </div>
    </div>
  </epf-container>
</template>

<script>
var myvue = {};
import hiChart from '../../components/hiChart';
export default {
  name: "monitor",
  components: {
    hiChart,
  },
  data() {
    return {
      boxHeight: 700,

      option1:{},
        option2:{},
        //搜索表单
        params: {
          selectDate:"",
          startTime:"",
          endTime:"",
        },
        title:"",
        pickerOptions:{
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 30 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            // return time.getTime() > Date.now() || time.getTime() < threeMonths;
            return time.getTime() > Date.now();
          }
        },
        type:0,  //类型  0-（x轴是年月日，时间控件传时间查询，或者默认没有传值） 1-只传了年  2-传了年月
        options: [ ],
        options2: [
          {
          value: 1,
          label: '一月'
          }, {
            value: 2,
            label: '二月'
          },
          {
            value: 3,
            label: '三月'
          }, {
            value: 4,
            label: '四月'
          },
          {
            value: 5,
            label: '五月'
          }, {
            value: 6,
            label: '六月'
          },
          {
            value: 7,
            label: '七月'
          }, {
            value: 8,
            label: '八月'
          },
          {
            value: 9,
            label: '九月'
          }, {
            value: 10,
            label: '十月'
          },
          {
            value: 11,
            label: '十一月'
          }, {
            value: 12,
            label: '十二月'
          },
        ],
        yyyy: '',
        mm:''
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
    
  },
  mounted(){
    var date=new Date;
    var year=date.getFullYear();

    this.options = [{
      value: year,
      label: year
    }, {
      value: year-1,
      label: year-1
    }];

    this.getCountData();
  },
  methods: {
    //点击查询按钮
      searchList() {
        this.getCountData();
      },
      //点击重置按钮
      clearList(){
        this.params.startTime = "";
        this.params.endTime = "";
        this.params.selectDate = [];
        this.yyyy = "";
        this.mm = "";
        this.type = 0;
        this.getCountData();
      },
    //时间控件值改变事件
    dateChange(val){
      if(val){
        this.params.startTime = val[0];
        this.params.endTime = val[1];

        this.yyyy = "";
        this.mm = "";
        this.type = 0;
      }
    },
    //年份，值改变
    yyyyChange(val){
      this.params.startTime = "";
      this.params.endTime = "";
      this.params.selectDate = [];
      if(!this.mm){
        this.type = 1;
      }else{
        this.type = 2;
      }
    },
    //月份，值改变
    mmChange(val){
      this.params.startTime = "";
      this.params.endTime = "";
      this.params.selectDate = [];
      if(!this.yyyy){
        this.yyyy = 2019;
      }
      this.type = 2;
    },
    //获取统计数据
    getCountData(){
      //查询机构集合
      let that=this;
      that.$post(
          //'/epf-monitor/log/logShow'
         $API.EPF_ADMIN.LOG_SHOW
          ,{startTime:this.params.startTime,endTime:this.params.endTime,type:that.type,yyyy:that.yyyy,month:that.mm}).then(res => {
        if(res.code != '0'){
          that.$message.error(res.msg);//失败
          return
        }
        if(res.code == 0){
          //获取数据
          var map = res.map;
          var sector = map.sector;
          //设置标题
          this.title = map.title;
          //设置图表数据
          this.option1 = {
            chart: {
              type: 'spline'
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ' '
            },
            xAxis: {
              categories: map.categories
            },
            yAxis: {
              title: {
                text: '单位/次'
              },
              labels: {
                formatter: function () {
                  return this.value + '次';
                }
              }
            },
            tooltip: {
              shared: true
            },
            plotOptions: {
            },
            series: [{
              name: '异常日志',
              marker: {
                symbol: 'abnormal'
              },
              color: 'red',
              data: map.abnormal
              }, {
                name: '操作日志',
                marker: {
                  symbol: 'operation'
                },
                color:'green',
                data: map.operation
              }, {
                name: '登录日志',
                marker: {
                  symbol: 'login'
                },
                color:'blue',
                data: map.login
            }]
          };
          this.option2 = {
            title: {
              text: '日志所占比',
              align: 'center',
              verticalAlign: 'middle',
              y: 50
            },
            tooltip: {
              headerFormat: '{series.name}<br>',
              pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0px 1px 2px black'
                  }
                },
                startAngle: -90, // 圆环的开始角度
                endAngle: 90,    // 圆环的结束角度
                center: ['50%', '75%']
              }
            },
            series: [{
              type: 'pie',
              name: '日志占比',
              innerSize: '50%',
              data: [
                {
                  name: '异常('+sector.abnormal+'次)',
                  y: sector.abnormal,
                  color:'red'
                },
                {
                  name: '操作('+sector.operation+'次)',
                  y: sector.operation,
                  color:'green'
                },
                {
                  name: '登录('+sector.login+'次)',
                  y: sector.login,
                  color:'blue'
                }
              ]
            }]
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.term{
 padding: 0 20px;
}
.high{
  width: 70em;
  height: auto;
  margin: 2em auto;
  float: left;
}
.high2{
  width: 30em;
  height: auto;
  margin: 2em auto;
  float: left;
}
</style>
