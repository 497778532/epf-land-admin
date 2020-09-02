<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="175px"
            class="demo-ruleForm"
          >
            <div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">交易基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="允许联合竞买：">
                      <el-radio-group v-model="ruleForm.isAisJointBidding" :disabled="true">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="允许网上直播：">
                      <el-radio-group v-model="ruleForm.isLiveWebcast" :disabled="true">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="允许委托报价：">
                      <el-radio-group v-model="ruleForm.allowEntrustePrice" :disabled="true">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="资格审核：">
                      <el-radio-group v-model="ruleForm.isAfterCheck" :disabled="true">
                        <el-radio label="前置资格审核"></el-radio>
                        <el-radio label="后置资格审核"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="交易中心：">
                      <el-select
                        v-model="ruleForm.tradingCenter"
                        style="width:178px;"
                        :disabled="true"
                      >
                        <el-option label="济南国土资源局1" value="济南国土资源局1"></el-option>
                        <el-option label="济南国土资源局2" value="济南国土资源局2"></el-option>
                        <el-option label="济南国土资源局3" value="济南国土资源局3"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">价款信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="起始价：" prop="beginPrice">
                      <el-input v-model="ruleForm.beginPrice" :disabled="true" style="width:360px;"></el-input>
                      <span style="margin-left:20px;">万元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞价阶梯：" prop="biddingladder">
                      <el-input
                        v-model="ruleForm.biddingladder"
                        :disabled="true"
                        style="width:360px;"
                      ></el-input>
                      <span style="margin-left:20px;">万元</span>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">资格条件</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li style="width:100%;">
                    <el-form-item label="竞买资格条件：">
                      <el-input
                        type="textarea"
                        maxlength="200"
                        minlength="0"
                        show-word-limit
                        autosize
                        v-model="ruleForm.biddingterm"
                        :disabled="true"
                        style="width:600px;height:120px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="条件设置部门：">
                      <el-select
                        v-model="ruleForm.conditSetDepart"
                        :disabled="true"
                        style="width:360px;"
                      >
                        <!-- <el-option label="规划处1" value="规划处1"></el-option>
                          <el-option label="规划处2" value="规划处2"></el-option>
                        <el-option label="规划处3" value="规划处3"></el-option>-->
                      </el-select>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">绑定地块信息</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="bindingBlockInfo"
                    style="width: 100%,"
                    border
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="landNo" label="土地编号"></el-table-column>
                    <el-table-column prop="beginPrice" label="起始价(万元)"></el-table-column>
                    <el-table-column prop="bondPrice" label="保证金(万元)"></el-table-column>
                    <el-table-column prop="priceProporte" label="价格比例"></el-table-column>
                    <el-table-column prop="chargePer" label="经办人"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">保证金</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="BondInfo"
                    style="width: 100%,"
                    border
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="currency" label="币种"></el-table-column>
                    <el-table-column prop="Price" label="金额（万元）"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">附件上传</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <div class="additional additionalInfo">
                    <div class="additional_title">
                      <span>附加信息</span>
                      <ul>
                        <li>新增</li>
                        <li>修改</li>
                        <li>删除</li>
                      </ul>
                    </div>
                    <div class="additional_cont">
                      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                  </div>
                  <div class="additional additionalList">
                    <!-- <div class="additional_title">
                      <span>附加列表</span>
                      <ul>
                        <li>上传</li>
                      </ul>
                    </div> -->
                    <div class="additional_cont">
                      <el-table :data="additionalData" style="width: 100%;margin-top:10px;">
                        <el-table-column prop="fileName" label="文件名称"></el-table-column>
                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
                            <el-button type="text" size="small">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div style="clear:both;"></div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      dataList: [],
      data: [
        {
          label: "DAZ2018001",
          children: [{ label: "1：挂牌文件" }, { label: "2：规划文件" }]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      additionalData: [{ fileName: "挂牌文件" }],
      bindingBlockInfo: [
        {
          landNo: "DAZ2018001",
          beginPrice: "500",
          bondPrice: "100",
          priceProporte: "25%",
          chargePer: "张三"
        },
        {
          landNo: "DAZ2018001",
          beginPrice: "1000",
          bondPrice: "500",
          priceProporte: "75%",
          chargePer: "张三"
        }
      ],
      BondInfo: [{ currency: "人民币", Price: "400" }],
      active: 0,
      txtVal: 0,
      ruleForm: {
        isAisJointBidding: "是",
        isLiveWebcast: "是",
        allowEntrustePrice: "是",
        isAfterCheck: "前置资格审核",
        tradingCenter: "济南国土资源局1",
        beginPrice: "",
        biddingladder: "",
        biddingterm: "",
        conditSetDepart: "规划处"
      },
      rules: {
        beginPrice: [
          { required: true, message: "请选择起始价", trigger: "blur" }
        ],
        biddingladder: [
          { required: true, message: "请选择竞价阶梯", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getItemData(this.$route.query.id);
  },
  methods: {
    handleSelectionChange: function(params) {},
    getItemData: async function(id) {
      const data = await this.$get(
        `/epf-trade/admin/transtarget/getTransTargetById?targetId=${id}`
      );
      if (!data) {
        return;
      }
      this.dataList = data.map;
      console.log(this.dataList);
    },
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
      padding: 0 24px;
      &_title {
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
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
                color: #4671d5;
              }
              &:nth-child(4) {
                color: #4671d5;
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
/* .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    left:150px;
  } */
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
