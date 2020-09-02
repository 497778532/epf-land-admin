<template>
  <div class="warningListDetail">
    <!-- 标的编号 -->
    <div id="numIdBox">
      <span class="numIdTitle">预警信息</span>
    </div>
    <table class="titleData">
      <tr>
        <td>
          <span>预警类型：</span>
          {{auditData.warnType}}
        </td>
        <td>
          <span>预警等级：</span>
          {{auditData.warnGrade}}
        </td>
        <td>
          <span>预警内容：</span>
          {{auditData.warningContent}}
        </td>
      </tr>
      <tr>
        <td>
          <span>行政区域：</span>
          {{cantonProvince}}-{{cantonCity}}-{{cantonArea}}
        </td>

        <td>
          <span>标的编号：</span>
          {{auditData.targetNo}}
        </td>

        <td>
          <span>预警时间：</span>
          {{auditData.warnTime}}
        </td>
      </tr>
      <tr>
        <td>
          <span>竞得人：</span>
          {{auditData.userName}}
        </td>
        <td>
          <span>成交价格：</span>
          {{auditData.transPrice}}
        </td>
        <td>
          <span>起始价格：</span>
          {{auditData.beginPrice}}
        </td>
      </tr>
      <tr>
        <td>
          <span>成交时间：</span>
          {{auditData.insertTime}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auditData: {},
      cantonProvince:'',
      cantonCity:'',
      cantonArea:''
    };
  },
  methods: {
    getOneDetail() {
      let id = this.$route.query.id;
      this.cantonProvince = this.$route.query.cantonProvince;
      this.cantonCity = this.$route.query.cantonCity;
      this.cantonArea = this.$route.query.cantonArea;
      // this.$post(`/epf-monitor/monitor/warnLog/querywarnDetail`, {
      this.$post(`/epf-monitor/monitor/warnLog/querywarnDetail`, {
        id: id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.auditData = res.result;
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    }
  },
  components: {},
  created() {
    this.getOneDetail();
  }
};
</script>

<style scoped>
.warningListDetail {
  padding: 30px;
}
#numIdBox {
  width: 100%;
  height: 52px;
}
.numIdTitle {
  display: inline-block;
  height: 100%;
  line-height: 50px;
  font-size: 16px;
  font-weight: 800;
  color: #000;
}
.titleData {
  width: 100%;
  margin-top: 15px;
  border-top: 1px solid rgb(241, 241, 241);
}
.titleData tr td {
  width: 33.33%;
  padding: 12px;
  border: 1px solid rgb(241, 241, 241);
  color: rgb(36, 36, 36);
  border-top: none;
  height: 40px;
}
.titleData tr td span {
  width: 20%;
  display: inline-block;
  text-align: right;
}
</style>
