<template>
  <epf-container title="发布公示">
    <div class="page-body">
      <div class="filter_wrap">
        <div class="dsDetailInfo_box">
          <div class="publish_main">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
              <div class="publish_main_title" id="top_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">公示基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <el-form-item label="公示编号：">
                  <el-input type="text" v-model="this.targetNo" style="width:800px;" disabled></el-input>
                </el-form-item>
                <el-form-item label="公示标题：" prop="publictTitle">
                  <el-input
                    maxlength="50"
                    minlength="0"
                    show-word-limit
                    autosize
                    v-model="ruleForm.publictTitle"
                    placeholder="请输入公示标题，不超过50字"
                    style="width:800px;height:30px;"
                  ></el-input>
                </el-form-item>
                <el-form-item label="公示内容：" prop="publictContext">
                  <el-input
                    type="textarea"
                    maxlength="200"
                    minlength="0"
                    show-word-limit
                    autosize
                    v-model="ruleForm.publictContext"
                    placeholder="请输入公示内容，不超过200字"
                    style="width:800px;height:120px;"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="warning"
                  style="background:#ffa000;margin-left:100px;"
                  @click="publish"
                >发布</el-button>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">地块基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <el-tabs>
                  <div class="toolsTitleBox">
                    <span class="toolsTitle">标的编号：{{this.targetNo}}</span>
                  </div>
                  <el-table :data="landInfo" style="width: 100%," border>
                    <el-table-column prop="goodsNo" label="地块编号" width="220"></el-table-column>
                    <el-table-column prop="location" label="地块位置"></el-table-column>
                    <el-table-column prop="area" label="土地面积（m²）" width="190"></el-table-column>
                    <el-table-column prop="years" width="160" :label="landInfo[0].circulation=='transfer'?'剩余使用年限':'出租年限'"> </el-table-column>
                    <el-table-column prop="firstClassUseName" label="土地用途" width="350"></el-table-column>
                  </el-table>
                  <el-table :data="landInfo1" style="width: 100%," border>
                    <el-table-column prop="beginPrice" label="起始价（万元）" width="220"></el-table-column>
                    <el-table-column prop="transPrice" label="成交价（万元）"></el-table-column>
                    <el-table-column prop="endTransTime" label="成交时间" width="350"></el-table-column>
                    <el-table-column prop="ownerShipName" :label="landInfo[0].circulation=='transfer'?'转让方':(landInfo[0].circulation=='rent'?'出租方':'')" width="200"></el-table-column>
                    <el-table-column prop="winnerId" :label="landInfo[0].circulation=='transfer'?'受让方':(landInfo[0].circulation=='rent'?'承租方':'')" width="200"></el-table-column>
                  </el-table>
                </el-tabs>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">联系方式</h2>
              </div>
              <div class="publish_main_cont">
                <el-tabs>
                  <el-table ref="multipleTable" :data="contactInfo" style="width: 100%," border>
                    <el-table-column prop="orgName" label="联系单位" width="380"></el-table-column>
                    <el-table-column prop="address" label="单位地址"></el-table-column>
                    <el-table-column prop="postalCode" label="邮政编码" width="120"></el-table-column>
                    <el-table-column prop="telPhone" label="联系电话" width="160"></el-table-column>
                    <el-table-column prop="liaison" label="联系人" width="170"></el-table-column>
                    <el-table-column prop="email" label="电子邮箱" width="270"></el-table-column>
                  </el-table>
                </el-tabs>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </epf-container>
</template>
<script>
import qs from "qs";
export default {
  name: "release",
  components: {},
  data() {
    return {
      landInfo: [],
      landInfo1: [],
      contactInfo: [],

      targetNo: "",
      ruleForm: {
        publictTitle: "",
        publictContext: ""
      },
      rules:{
        publictTitle: [
          // { required: true, message: "公示标题不能为空", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,50,'长度在50字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
            message: "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        publictContext:[
          // { required: true, message: "请输入公示内容", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,200,'长度在200字符以内（注意若是汉字，1个汉字是2个字符）')}  },
        ]
      },
      id: ""
    };
  },
  created() {
    let targetId = this.$route.query.id;
    this.init(targetId);
  },
  methods: {
    init(targetId) {
      let url = this.$API.EPF_TRADE.PUBLICITY.PUBLICITY_INFO; // 成交结果
      this.$get(url, { targetId: targetId }).then(res => {
        console.log(res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.landInfo = res.map.transGoodsEntityList;
        // this.landInfo1 =res.map.transTargetEntityMap;
        this.landInfo1.push(res.map.transTargetEntityMap);
        this.id = res.map.transTargetEntityMap.tradingCenter;
        this.targetNo = res.map.transTargetEntityMap.targetNo;
        console.log(this.id);
        this.$get(`/epf-admin/admin/org/getOrg?id=${this.id}`).then(res => {
          console.log(res);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            return;
          }
          // this.contactInfo=res.org;
          this.contactInfo.push(res.org);
        });
      });
    },
    // 公示发布
    publish() {
      let params = this.ruleForm;
      params.targetId = this.landInfo1[0].id;
      this.$post(this.$API.EPF_TRADE.PUBLICITY.PUBLICITY_RELEASE,
        params
      ).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.$message.success("发布成功");
        this.$bus.$emit("refreshPage", ["landmarkinfo"]);
        let routerPath = "/system/trade/land/views/target/listInfo";
        this.$bus.$emit("closeTabsItem", this.$route.name);
        let title = "标的信息";
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        Bus.$emit("landMarkSave", true);
        this.$router.push({ path: routerPath });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.filter_wrap {
  .dsDetailInfo_box {
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      #top_title {
        margin: 0 0 30px 0;
      }
      &_title {
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        margin: 30px 0;
        .publish_title_icon {
          @include size(6px, 21px);
          background: #ffca73;
          border-radius: 3px;
          margin-top: 18px;
          margin-right: 12px;
        }
        .title {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          line-height: 56px;
        }
        .fold {
          font-size: 14px;
          color: #999999;
          line-height: 56px;
          cursor: pointer;
          span {
            margin-right: 10px;
          }
        }
      }
      &_cont {
        .publish_table {
          border-top: 1px solid #f2f2f2;
          border-left: 1px solid #f2f2f2;
          clear: both;
          td {
            line-height: 25px;
            color: #333333;
            font-size: 14px;
            padding: 10px 15px;
            border-right: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            text-align: center;
          }
          .td1 {
            width: 120px;
            background: #f2f5f7;
            color: #666666;
            text-align: right;
          }
          .td2 {
            width: 460px;
            background: #fff;
            text-align: left;
          }
        }
        .publish_tableTitle {
          line-height: 62px;
          border: 1px solid #f2f2f2;
          border-bottom: 0px solid #f2f2f2;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #666666;
        }
        .publish_table1 {
          border: 1px solid #f2f2f2;
          td {
            border-right: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            text-align: center;
            color: #555555;
            line-height: 50px;
            font-size: 14px;
            border-bottom: 1px solid #eee;
          }
        }
        box-sizing: border-box;
        .publish_mainUl {
          @include size(100%, auto);
          display: flex;
          flex-wrap: wrap;
          margin-top: 25px;
          li {
            @include size(50%, auto);
            line-height: 50px;
            min-height: 50px;
          }
        }
        &_table {
          width: 100%;
          margin: 30px 0;
          .additional {
            width: 100%;
            &_title {
              @include size(100%, 50px);
              background-color: #f9fafc;
              box-sizing: border-box;
              padding: 0 15px;
              span {
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                line-height: 50px;
              }
              ul {
                float: right;
                margin-top: 9px;
                li {
                  @include size(80px, 32px);
                  border-radius: 4px;
                  background: #f4f4f5;
                  text-align: center;
                  line-height: 32px;
                  display: inline-block;
                  margin-left: 5px;
                  border: solid 1px #d3d4d6;
                  color: #606266;
                  cursor: pointer;
                  &:nth-child(1) {
                    color: #ffa000;
                    border: solid 1px #ffa000;
                  }
                }
              }
            }
            &_cont {
              @include size(100%, 500px);
              border: 1px solid #f3f3f3;
              border-top: none;
            }
          }
          .additionalInfo {
            float: left;
            @include size(34%, 600px);
            margin-right: 1%;
          }
          .additionalList {
            float: left;
            @include size(65%, 600px);
          }
        }
        table {
          border: 1px solid #f3f3f3;
          margin-top: 25px;
          tr {
            @include size(100%, 50px);
            border-bottom: 1px solid #f3f3f3;
            &:nth-child(1) {
              background: #f2f5f7;
              td {
                font-weight: bold;
              }
            }
            td {
              text-align: center;
              color: #333333;
              font-size: 14px;
              &:nth-child(3) {
                color: #606266;
              }
              &:nth-child(4) {
                color: #606266;
              }
              .text_red {
                color: red;
                margin-right: 5px;
                cursor: auto;
              }
              span {
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .findland_input {
          @include size(94px, 40px);
          background-color: #ffa000;
          border-radius: 3px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          display: inline-block;
          margin-left: 24px;
          cursor: pointer;
          img {
            display: inline-block;
            @include size(14px, 16px);
            margin-top: 13px;
            margin-right: 5px;
          }
        }
        p {
          line-height: 50px;
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style>
.el-radio__input.is-checked + .el-radio__label {
  color: #ffa000;
}
.el-radio__input.is-checked .el-radio__inner {
  border: 1px solid #ffa000;
  background: #ffa000;
}
.el-input--suffix {
  position: relative;
}
.el-radio__inner:hover {
  border: 1px solid #ffa000;
}
#publishLandMapDialog .el-dialog .el-dialog__body {
  padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header {
  padding-top: 10px;
  padding-bottom: 0px;
  text-align: center;
}
.filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 117px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
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
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
  background: #fff;
}
.el-table__header .has-gutter th,
.el-table__header .has-gutter tr {
  /* border:1px solid #ebeef5; */
  background: #fff;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
