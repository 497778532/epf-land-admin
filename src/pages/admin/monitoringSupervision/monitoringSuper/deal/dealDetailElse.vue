<template>
  <!-- <div>交易监测详情</div> -->
  <div class="page-body" id="dealDetail">
    <div class="filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <p class="table_title">土地信息</p>

        <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6"
          style="table-layout:fixed;">
          <tr height="50px">
            <td min-width="30%">
              <span class="left_text special_text_people">合同编号：</span>
              {{trustInfo.contractNo}}
            </td>
            <td min-width="30%">
              <span class="left_text special_text_people">所属行政区域：</span>
              {{trustInfo.cantonName}}
            </td>
            <td min-width="40%">
              <span class="left_text special_text_people">交易类型：</span>
              {{trustInfo.landTypeName}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text special_text_people">土地性质：</span>
              {{trustInfo.natureName}}
            </td>
            <td>
              <span class="left_text special_text_people">土地用途：</span>
              {{trustInfo.landUse1Name}},{{trustInfo.landUse2Name}}
            </td>
            <td>
              <span class="left_text special_text_people">不动产证号：</span>
              {{trustInfo.warrantno}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text special_text_people">土地面积：</span>
              {{trustInfo.acreage}}平方米
            </td>
            <td>
              <span class="left_text special_text_people">使用权类型：</span>
              {{trustInfo.landUsertypeName}}
            </td>
            <td>
              <span class="left_text special_text_people">建设用地使用权出让合同号（或划拨决定书号）:</span>
              {{trustInfo.landContractNo}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text special_text_people">建筑物面积：</span>
              {{trustInfo.coveredArea}}平方米
            </td>
            <td>
              <span class="left_text special_text_people">{{trustInfo.landTypeName}}期限：</span>
              <span v-if="trustInfo.begindate">{{trustInfo.begindate}}至{{trustInfo.enddate}}</span>
              <span v-else></span>
            </td>
            <td><span class="left_text special_text_people"></span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom_filter_wrap">

      <el-tabs v-model="activeTabs" type="border-card" @tab-click="axiosClick"
        style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;">
        <el-tab-pane :label="name1 + '/' + name2 + '信息'" name="targetDetail">
          <div class="main_content">
            <div class="table_th">{{name1}}信息</div>

            <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6"
              style="table-layout:fixed;">
              <tr height="50px">
                <td min-width="30%">
                  <span class="left_text special_text_people">名称：</span>
                  {{trustInfo.firstparty}}
                </td>
                <td min-width="30%">
                  <span class="left_text special_text_people">证件类型：</span>
                  {{trustInfo.firstidentificationtypeName}}
                </td>
                <td min-width="40%">
                  <span class="left_text special_text_people">证件号码：</span>
                  {{trustInfo.firstidentificationnum}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_people">联系地址：</span>
                  {{trustInfo.firstaddress}}
                </td>
                <td>
                  <span class="left_text special_text_people">联系电话：</span>
                  {{trustInfo.firstphone}}
                </td>
                <td><span class="left_text special_text_people"></span></td>
              </tr>
            </table>

            <div class="table_th" style="margin-top:35px;">{{name2}}信息</div>

            <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6"
              style="table-layout:fixed;">
              <tr height="50px">
                <td min-width="30%">
                  <span class="left_text special_text_people">名称：</span>
                  {{trustInfo.secondparty}}
                </td>
                <td min-width="30%">
                  <span class="left_text special_text_people">证件类型：</span>
                  {{trustInfo.secondidentificationtypeName}}
                </td>
                <td min-width="40%">
                  <span class="left_text special_text_people">证件号码：</span>
                  {{trustInfo.secondidentificationnum}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_people">联系地址：</span>
                  {{trustInfo.secondaddress}}
                </td>
                <td>
                  <span class="left_text special_text_people">联系电话：</span>
                  {{trustInfo.secondphone}}
                </td>
                <td><span class="left_text special_text_people"></span></td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成交信息" name="buyRecord">
          <div class="main_content">
            <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6"
              style="table-layout:fixed;">
              <tr height="50px">
                <td min-width="30%">
                  <span class="left_text special_text_people">成交价格(万元)：</span>
                  {{trustInfo.transactionPrice}}
                </td>
                <td min-width="30%">
                  <span class="left_text special_text_people">土地费用(万元)：</span>
                  {{trustInfo.landtransfer}}
                </td>
                <td min-width="40%">
                  <span class="left_text special_text_people">附属物费用(万元) ：</span>
                  {{trustInfo.attachtransfer}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_people">鉴证申请时间：</span>
                  {{trustInfo.createtime}}
                </td>
                <td><span class="left_text special_text_people"></span></td>
                <td><span class="left_text special_text_people"></span></td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dealDetailElse",
    data() {
      return {
        contractId: "",
        trustInfo: {},
        activeTabs: "targetDetail",
        currentTabs: "targetDetail",
        name1: '',
        name2: '',
      };
    },
    created() {
      this.contractId = this.$route.query.contractId;
      this.getTarget();
    },
    methods: {
      getTarget() {
        this.$get(`/epf-monitor/goods/getSelfDealingOne`, {
          contractId: this.contractId
        }).then(res => {
          console.log(res);
          if (res.code == "0") {

            if (res.data.landTypeName == '转让') {
              this.name1 = '转让方'
              this.name2 = '受让方'
            }
            if (res.data.landTypeName == '出租') {
              this.name1 = '出租人'
              this.name2 = '承租人'
            }
            if (res.data.landTypeName == '抵押') {
              this.name1 = '抵押人'
              this.name2 = '抵押权人'
            }
            this.trustInfo = res.data;
          } else {
            this.$message.error(res.msg); //失败
            return;
          }
        });
      },
      axiosClick(val) {
        if (val.name == this.currentTabs) {
          return;
        }
        this.currentTabs = val.name;
      },
    }
  };

</script>

<style>


  .filter_title {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding-right: 10px;
    text-align: right;
    line-height: 40px;
  }

  .notice_filter_wrap {
    box-sizing: border-box;
    padding: 25px 28px;
    -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }

  .notice_box {
    width: 100%;
    height: 35px;
    margin-bottom: 25px;
    padding: 0 15px;
    background-color: #fef6e6;
    border-radius: 10px;
  }

  .notice_box .notice_text {
    font-size: 14px;
    color: #ffa000;
    line-height: 35px;
  }

  .bottom_filter_wrap {
    box-sizing: border-box;
    -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
    height: 100%;
  }

  .table_th {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    /* border-bottom: 1px solid transparent; */
    background-color: #f5f7fa;
    text-align: left;
    line-height: 50px;
    font-weight: bolder;
    padding-left: 30px;
  }

  .icon_th {
    width: 3px;
    height: 12px;
    background-color: #ffa000;
    display: inline-block;
    margin: 0 12px 0 22px;
    border-radius: 3px;
  }

  .search_box {
    padding-top: 32px;
    padding-bottom: 32px;
    transition: 0.5s;
    background: #fff;
    border: 1px solid #ebeef5;
  }

  .table_title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .left_text {
    font-size: 14px;
    color: #999;
    margin-left: 10px;
  }

  .special_text {
    width: 100px;
    text-align: right;
    display: inline-block;
  }

  .special_text_place {
    width: 70px;
    text-align: right;
    display: inline-block;
  }

  .special_text_people {
    width: auto;
    text-align: right;
    display: inline-block;
  }

  .main_content {
    padding: 28px 28px 60px 28px;
  }

  .resource_box {
    display: flex;
  }

  .resources {
    display: flex;
  }

  .resources li {
    margin-right: 20px;
    width: 130px;
    height: 90px;
    box-sizing: border-box;
    border: 1px dashed #dcdfe6;
    display: inline-block;
    border-radius: 3px;
  }

  .resource_content {
    width: 130px;
    height: 90px;
    display: inline-block;
    border-radius: 3px;
  }

  .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
  }

  #dealDetail .el-dialog__body {
    padding: 0;
  }

  #dealDetail .el-dialog__header {
    padding: 0;
  }

</style>
