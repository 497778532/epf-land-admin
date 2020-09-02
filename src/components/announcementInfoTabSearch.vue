<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row>
        <el-col :span="2">
          <span class="filter_title">公告标题 :</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="announcementForm.noticeSerialNumber" placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">状态 :</span>
        </el-col>
        <el-col :span="3">
          <el-select v-model="announcementForm.noticeState" placeholder="请选择">
            <el-option
              v-for="(item,index) in noticeStateoptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">公告类型 :</span>
        </el-col>
        <el-col :span="3">
          <el-select v-model="announcementForm.noticeType" placeholder="请选择">
            <el-option
              v-for="(item,index) in noticeTypeoptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <div class="button_bg">查询</div>

        <div class="button_default" @click="resetForm('announcementForm')">重置</div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcementForm: {
        noticeSerialNumber: "",
        noticeState: "",
        noticeType: "",
        transferMode: ""
      },
      noticeStateoptions: [
        {
          value: "选项1",
          label: "新增"
        },
        {
          value: "选项2",
          label: "审核中"
        },
        {
          value: "选项3",
          label: "已审核"
        },
        {
          value: "选项4",
          label: "已公告"
        }
      ],
      noticeTypeoptions: [
        {
          value: "选项1",
          label: "普通公告"
        },
        {
          value: "选项2",
          label: "变更公告"
        }
      ],
      transferModeoptions: [
        {
          value: "选项1",
          label: "土地转让"
        },
        {
          value: "选项2",
          label: "土地出租"
        }
      ],
      value: ""
    };
  }
};
</script>

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
.toolsTitleBox .oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #fff;
  background: #ffa000;
}
.toolsTitleBox .oper span:nth-child(3) {
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
.deltext {
  color: #666;
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

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
  right: 8px;
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
