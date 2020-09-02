<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">年份选择：</span>
          </el-col>
          <el-col :span="2">
            <el-select v-model="yyyy" placeholder="请选择" @change="yyyyChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="2">
            <span class="filter_title">月份选择：</span>
          </el-col>
          <el-col :span="2">
            <el-select v-model="mm" placeholder="请选择" @change="mmChange">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="3">
            <span class="filter_title">统计时间：</span>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="params.selectDate"
              style="width:100%;"
              type="daterange"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :offset="1" :span="4">
            <div class="button_bg" @click="searchList()">查询</div>
            <div class="button_default" @click="clearList()">重置</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row>
      <el-button class="cbutt" type="primary" plain>{{title}}</el-button>
    </el-row>
    <hiChart id="high" class="high" :option="option1"></hiChart>
    <hiChart id="high2" class="high2" :option="option2"></hiChart>
  </div>
</template>
<style scoped>
  
  .oper {
    float: right;
    font-weight: normal;
  }
  .oper span {
    display: inline-block;
    width: 80px;
    height: 32px;
    background-color: #ffa000;
    border-radius: 2px;
    margin-right: 16px;
    text-align: center;
    line-height: 36px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .oper span:nth-child(2) {
    border: solid 1px #d3d4d6;
    color: #606266;
    background: #fff;
  }
  
  .filter_title {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding-right: 10px;
    text-align: right;
    line-height: 34px;
  }
  
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
</style>
<style>
  .cbutt{
    text-align: center;
    margin: 0 auto;
    display: block;
    font-size: 1.5em;
    border: 0 white solid;
    margin: 1.5em auto;
  }
  .high{
    width: 70em;
    height: auto;
    margin: 2em auto;
    float: left;
    display: inline;
  }
  .high2{
    /*width: 30em;*/
    height: auto;
    margin: 2em auto;
    float: left;
    display: inline;
  }
  .filter_wrap .el-input--small .el-input__inner {
    height: 34px;
  }
  .filter_wrap .el-row {
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select {
    width: 148px;
    font-size: 14px;
    padding: 0 10px;
  }

  .filter_wrap .el-date-editor.el-input .el-input__icon {
    line-height: 30px;
    color: #b3b3b3;
  }
  .filter_wrap .el-input__prefix,
  .el-input__suffix {
    width: 25px;
    font-size: 16px;
  }
  .el-table th,
  .el-table tr {
    /* border:1px solid #ebeef5; */
  }
  .el-textarea .el-textarea__inner {
    width: 100%;
    height: 100% !important;
  }
</style>
<script>
  // 导入chart组件
  var myvue = {};
  import hiChart from '@/pages/admin/system/graphics/hiChart';
  export default {
    name:'graphics',
    components: {
      hiChart,
    },
    data() {
      return {
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
    beforeCreate:function(){
      myvue = this;
    },
    mounted:function(){
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
    methods:{
      //点击查询按钮
      searchList:function () {
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
         '/epf-admin/log/logShow'
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
          };
        }else{
          this.$message.error(res.msg)
        }
      });
    }
    }
  }
</script>
