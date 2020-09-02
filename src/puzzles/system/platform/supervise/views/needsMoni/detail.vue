<template>
  <!-- <div>需求监测详情</div> -->
  <div class="page-body" :view-id="newRender">
    <div class="filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <p class="table_title">需求人信息</p>
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          bordercolor="#dcdfe6"
          style="table-layout:fixed;"
        >
          <tr height="50px">
            <td width="37%">
              <span class="left_text special_text_four">申请人：</span>
              {{demandData.contact}}
            </td>
            <td width="37%">
              <span class="left_text">联系电话：</span>
              {{demandData.phone}}
            </td>
            <td width="26%">
              <span class="left_text">申请时间：</span>
              {{demandData.insertTime}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text special_text_four">需求类型：</span>
              {{demandData.demandName}}
            </td>
            <td colspan="2">
              <span class="left_text">联系地址：</span>
              {{demandData.address}}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="filter_wrap_bottom">
      <div class="switchHeight_box">
        <p class="table_title">地块基本信息</p>
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          bordercolor="#dcdfe6"
          style="table-layout:fixed;"
        >
          <tr height="50px">
            <td width="34%">
              <span class="left_text special_text_five">所在行政区：</span>
              {{demandData.cantonProvinceName}}-{{demandData.cantonCityName}}-{{demandData.cantonAreaName}}
            </td>
            <td width="34%">
              <span class="left_text">土地用途：</span>
              {{demandData.firstClassUseName}}/{{demandData.secondClassUseName}}
            </td>
            <td width="32%">
              <span class="left_text">使用时间：</span>
              {{demandData.useBeginDate}}～{{demandData.useEndDate}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text special_text_five">使用年限：</span>
              {{demandData.years}}年
            </td>
            <td>
              <span class="left_text">土地面积：</span>
              {{demandData.area}}平方米
            </td>
            <td>
              <span class="left_text">意向价格：</span>
              {{demandData.price?Division(demandData.price)+'万元':null}}
            </td>
          </tr>
          <tr height="50px">
            <td colspan="3">
              <span class="left_text special_text_five">土地位置：</span>
              {{demandData.location}}
            </td>
          </tr>
          <tr height="50px">
            <td colspan="3">
              <span class="left_text special_text_five">需求说明：</span>
              {{demandData.remark}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      demandData: {
        insertUserName: "库里",
        phone: "17635467783",
        insertTime: "2015-09-09",
        demandName: "求租",
        cantonProvinceName: "山西省",
        cantonCityName: "太原市",
        cantonAreaName: "小店区",
        firstClassUseName: "工作用地",
        secondClassUseName: "工厂",
        useBeginDate: "2015-09-09",
        useEndDate: "2015-09-09",
        years: "25",
        area: "20000",
        price: "1000000",
        location: "晋(2017)太原市不动产权第0018158号",
        remark: "晋(2017)太原市不动产权第0018158号",
        address:"山西省太原市"
      },
      purchaseId: ""
    };
  },
  methods: {
    //获取详情数据
    getData() {
      let purchaseId = this.$route.query.id;
      this.$get(`/epf-monitor/purchase/selectById`, {
        purchaseId: purchaseId
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.demandData = res.purchase;
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    }
  },
  created() {
    this.getData();
  },
  computed: {
    newRender: function() {
      this.purchaseId = this.$route.query.id;
      this.getData(this.$route.query.id);
    }
  }
};
</script>

<style>

.filter_wrap_bottom {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 35px 28px 60px 28px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  height: 100%;
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
.special_text_five {
  width: 85px;
  text-align: left;
}
.special_text_four {
  width: 70px;
  text-align: right;
  display: inline-block;
}
</style>
