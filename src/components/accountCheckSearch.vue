<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row>
        <el-col :span="2">
          <span class="filter_title">{{number}} :</span>
        </el-col>
        <el-col :span="4">
          <el-input size="small" v-model="targetNo" placeholder="请输入标的编号" v-if="this.number=='标的编号'"></el-input>
          <el-input size="small" v-model="goodsNo" placeholder="请输入地块编号" v-if="this.number=='地块编号'"></el-input>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">{{title}} :</span>
        </el-col>
        <el-col :span="4">
          <el-input size="small" v-model="filterData.bidderName" placeholder="请输入竞买申请人名称" v-if="this.title=='竞买申请人'"></el-input>
          <el-input size="small" v-model="filterData.bidderName" placeholder="请输入委托人名称" v-if="this.title=='委托人'"></el-input>
        </el-col>
        <el-col :span="1" style="text-align:left;display:flex;">
          <div class="button_bg" @click="searchlist()">查询</div>
          <div class="button_default" @click="clearList()">重置</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number:"",
    title: "",
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
      targetNo: '',
      goodsNo: '',
      filterData: {
        targetNo: "",
        bidderName: "",
        goodsNo:"",
      }
    };
  },
  methods: {
    searchlist() {
      this.filterData.targetNo = encodeURIComponent(this.targetNo);
      this.filterData.goodsNo = encodeURIComponent(this.goodsNo);
      this.$emit("filterInfo", this.filterData);
    },
    clearList() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.goodsNo = "";
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
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
