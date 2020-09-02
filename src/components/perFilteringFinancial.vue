<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">地块编号 :</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="targetNo" size="small" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="3">
          <span class="filter_title">流转方式 :</span>
        </el-col>
        <el-col :span="4">
          <el-select
            size="small"
            class="filterCirculatemode"
            v-model="filterData.businessType"
            placeholder="请选择流转方式"
            @change="businessTypeSelect(dictionary.purchasr_status,filterData.businessType,$event)"
          >
            <el-option
              v-for="(item,index) in dictionary.purchasr_status"
              :ref="item.dictKey"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.dictKey"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">交易结束时间 :</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="filterData.beginDealEndTime"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
            size="small"
            @change="selectDatarange"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="0">

        <el-col v-if="!closeSelect" :span="2">
          <span class="filter_title">地块状态 :</span>
        </el-col>
        <el-col v-if="!closeSelect" :span="3">
          <el-select
            size="small"
            class="filterCirculatemode"
            v-model="filterData.status"
            placeholder="请选择标的状态"
            @change="goodSelect(dictionary.tsell_status,filterData.status,$event)"
          >
            <el-option
              v-for="(item,index) in dictionary.tsell_status"
              :ref="item.dictKey"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.dictKey"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>

           <el-col v-if="!closeSelect" :span="3">
          <span class="filter_title">交易方式 :</span>
        </el-col>
        <el-col v-if="!closeSelect" :span="4">
          <el-select
            size="small"
            class="filterCirculatemode"
            v-model="filterData.transType"
            placeholder="请选择"
            @change="delegationStatusSelect(this.trans_type,filterData.transType,$event)"
          >
            <el-option
              v-for="(item,index) in this.trans_type"
              :ref="item.id"
              :id="item.id"
              :dictKey="item.id"
              :label="item.name"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="3" >
          <div class="button_bg" style="margin-left:20px;" @click="findInfo">查询</div>
        </el-col>
        <el-col :span="3">
          <div class="button_bg" @click="resetFilter">重置</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeSelectPlace: {
      type: Boolean
    },
    typeClose: {
      type: Boolean
    }
  },
  data() {
    return {
      closeSelect: this.closeSelectPlace,
      filter: [
        {
          inputType: "input",
          title: "信息标题",
          titleSpan: 2,
          inputSpan: 12
        },
        {
          inputType: "select",
          title: "流转方式",
          titleSpan: 3,
          inputSpan: 5,
          option: [
            {
              title: "全部"
            },
            {
              title: "转让"
            },
            {
              title: "出租"
            },
            {
              title: "抵押"
            }
          ]
        },
        {
          inputType: "region"
        },
        {
          inputType: "select",
          title: "状态",
          titleSpan: 3,
          spanSpan: 5
        }
      ],
      targetNo: "",
      filterData: {
        type:'',
        targetNo:"",
        beginDealEndTime:"",
        endDealEndTime:"",
        status:'',
        transType:'',
        circulationName:'',
        cantonArea:'',
        circulation:'',
        channel:'',
        delegationStatus:'',
        businessType:"",
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      useDate: "",
      pickerOptions: {
        //日期范围快速选择配置
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      switchHeight: 49,
      flexibleOpen: false,
      dicRequest: ["flow_mode", "delegation_status","tsell_status"], //字典码请求
      dictionary: {
        //字典码结果
        purchasr_status: "",
        purchasr_auth: "",
        tsell_status:"",
      },
      dicNum: 0,
        trans_type:'',
    };
  },
  created() {
      //trans_type   获取交易方式
      this.$get(
          `/epf-tradeengine/transtransactiontype/getTransTypeList`,
          { parentId: 0 }
      ).then(res => {
          this.trans_type = res
      });

    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
          this.$get(
            `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res);
          });
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {

          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      for (let item in this.dictionary) {

        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dictionary.purchasr_status.pop()
      this.dicFinsh = true;
    });

  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 147 : 49;
    },
    // circulationSelect(dic, businessType, event) {
    //   this.filterData.type= this.$refs[
    //     businessType
    //   ][0].$attrs.dictKey;
    // },
   businessTypeSelect(dic, businessType, event) {
      this.filterData.businessType = this.$refs[
        businessType
      ][0].$attrs.dictKey;
    },
   goodSelect(dic, status, event) {
      this.filterData.status = this.$refs[
       status
      ][0].$attrs.dictKey;
    },

    channelSelect(dic, channelName, event) {
      this.filterData.channel = this.$refs[channelName][0].$attrs.dictKey;
    },
    delegationStatusSelect(dic, transType, event) {
      this.filterData.transType = this.$refs[
        transType
      ][0].$attrs.dictKey;
    },
    publishStatusSelect(dic, circulationName, event) {
      this.filterData.circulation = this.$refs[
        circulationName
      ][0].$attrs.dictKey;
    },
        btnClick(item,oper) {
      var routerPath,title
      if(oper==="admend"){routerPath='landmarkInfoAmend',title='标的修改'}
      if(oper==="detail"){routerPath='landmarkInfoDetail',title='标的详情'}
      if(oper==="dealresult"){routerPath='landmarkInfoDealresult',title='成交结果'}
      if(oper==="publicityRelease"){routerPath='publicityRelease',title='公示发布'}
      if(oper==="publicityDetails"){routerPath='publicityDetails',title='公示详情'}
      if(oper==="bidding"){routerPath='landmarkInfoBidding',title='公示详情'}
      var tabObj = {title,routerPath}
      this.setTabsList(tabObj)
      this.$router.push({path:routerPath,query:{id:item.id}})
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.filterData.beginDate = this.useDate[0];
      this.filterData.endDate = this.useDate[1];
    },
    findInfo() {
      this.filterData.targetNo = encodeURIComponent(this.targetNo);
      this.$emit("filterInfo", this.filterData);
    },
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
      this.targetNo = "";
      this.$emit("filterInfo", this.filterData);
    }
  }
};
</script>

<style scoped>

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.el-date-editor.dataIconStyle > .el-input__prefix {
  width: 25px;
  left: 80%;
}
</style>
