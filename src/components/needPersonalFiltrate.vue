<template>
  <div class="switchHeight_box">
    <el-form :model="filterData" label-width="115px">
      <el-row type="flex" justify="start" class="ant-row ant-row-start">
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          >
          <el-form-item label="信息标题：">
            <el-input
              v-model="filterData.title"
              placeholder="请输入标题"
              size="small"
              style="max-width:300px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen ? 'hidden-md-and-down' : ''"
          >
          <el-form-item label="信息发布编号：">
            <el-input
              v-model="filterData.publishNo"
              placeholder="请输入信息发布编号"
              size="small"
              style="max-width:300px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen ? 'hidden-md16-and-down' : ''"
          >
          <el-form-item label="发布时间：">
            <el-date-picker
              v-model="useDate"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              size="small"
              @change="selectDatarange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-6 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          >
          <el-form-item label-width="0">
            <div class="button_bg" @click="findInfo">查询</div>
            <div class="button_default" @click="resetFilter">重置</div>
            <span class="flexibleSwitch" @click="flexSwitch">
              {{ flexibleOpen ? "收起" : "展开" }}
              <i
                :class="
                  flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    closeSelectPlace: {
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
      filterData: {
        title: "",
        publishNo: "",
        beginDate: "",
        endDate: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      // flexibleSwitch:'展开',
      // flexibleSwitchIcon:'el-icon-caret-bottom',
      switchHeight: 49,
      flexibleOpen: false,
      dictionary: {
        //字典码结果
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      useDate: [],
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
      }
    };
  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 147 : 49;
    },
    search() {
      console.log(this.filterData);
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.filterData.beginDate = this.useDate[0];
      this.filterData.endDate = this.useDate[1];
    },
    findInfo() {
      this.$emit("filterInfo", this.filterData);
    },
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
      this.$emit("filterInfo", this.filterData);
    }
  }
};
</script>

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
/* .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    right:8px;
  } */
.el-date-editor.dataIconStyle > .el-input__prefix {
  width: 25px;
  left: 80%;
}
</style>
