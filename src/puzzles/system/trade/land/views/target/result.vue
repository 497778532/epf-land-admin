<template>
  <epf-container title="成交结果">
    <div class="page-body">
      <div class="filter_wrap">
        <div class="dsDetailInfo_box">
          <div class="publish_main">
            <div class="publish_main_title">
              <div class="publish_title_icon f-left"></div> 
              <h2 class="title f-left">成交结果</h2>
            </div>
            <div class="publish_main_cont">
              <el-tabs style="margin-top:35px;">
                <div class="toolsTitleBox">
                  <span class="toolsTitle">标的编号：{{tableData.targetNo}}</span>
                </div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>竞得人</td>
                    <td>{{tableData.winnerId}}</td>
                    <td>成交价</td>
                    <td>{{tableData.transPrice}} 万元</td>
                  </tr>
                  <tr>
                    <td>成交时间</td>
                    <td>{{tableData.endTransTime}}</td>
                    <td></td>
                    <td></td>
                  </tr>
              </table>
                <!-- <el-table
                  ref="multipleTable"
                  :data="tableData"
                  style="width: 100%"
                  border>
                  <el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="transPrice"
                    label="成交价（万元）">
                  </el-table-column>
                  <el-table-column
                    prop="endTransTime"
                    label="成交时间">
                  </el-table-column>
                </el-table> -->
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </epf-container>
</template>
<script>
export default {
  name: "tradeResult",
  components: {},
  data() {
    return {
      // tableData:[{winner:'济南产置业有限公司',chagePrice:'10000',chageTime:'2018-12-28  19：01：01'}]
      tableData:[]
    };
  },
  created() {
    let targetId = this.$route.query.id;
    this.init(targetId);
  },
  methods:{
    init(targetId){
      let url = this.$API.EPF_TRADE.TARGET.TARGET_TRADE_RESULT; // 成交结果
      this.$get(url, {'targetId': targetId}).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.tableData = res.map;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.filter_wrap{
  box-sizing: border-box;
  padding: 32px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  background: #fff;
  .dsDetailInfo_box{
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      #top_title {
        margin: 0 0 30px 0;
      }
      &_title{
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        .publish_title_icon{
          @include size(6px, 21px);
          background: #ffca73;
          border-radius: 3px;
          margin-top: 18px;
          margin-right: 12px;
        }
        .title{
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          line-height: 56px;
        }
        .fold{
          font-size: 14px;
          color: #999999;
          line-height: 56px;
          cursor: pointer;
          span{
            margin-right: 10px;
          }
        }
      }
      &_cont{
        box-sizing: border-box;
        table{
          border:1px solid #f3f3f3;
          margin-top:25px;
          tr{
            @include size(100%,50px);
            border-bottom:1px solid #f3f3f3;
            td{
              text-align: center;
              color:#333333;
              font-size: 14px;
              &:nth-child(1){
                background: #d0f5fa;
                text-align: right;
                padding-right: 10px;
              }
              &:nth-child(2){
                text-align: left;
                padding-left: 10px;
                line-height: 50px;
              }
              &:nth-child(3){
                text-align: right;
                padding-right: 10px;
                background: #d0f5fa;
              }
              &:nth-child(4){
                text-align: left;
                padding-left: 10px;
                line-height: 50px;
              }
              .text_red{
                color:red;
                margin-right: 5px;
                cursor: auto;
              }
              span{
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>

  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 117px;
    height:40px;
    font-size: 14px;
    line-height: 40px;
    padding: 0 10px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .filter_wrap .el-date-editor.el-input .el-input__icon{
    line-height:30px;
    color:#8dc4f7;
  }
  .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    right:8px;
  }
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
    background: #fff;
  }
  .el-table__header .has-gutter th, .el-table__header .has-gutter tr{
    /* border:1px solid #ebeef5; */
    background: #fff;
  }
</style>
