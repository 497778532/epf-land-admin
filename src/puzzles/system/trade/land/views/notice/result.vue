<template>
<div class="page-body">
  <div class="filter_wrap">
    <div class="dsDetailInfo_box">
      <div class="publish_main">
        <div class="publish_main_title">
          <div class="publish_title_icon f-left"></div> 
          <h2 class="title f-left">审核结果</h2>
        </div>
        <div class="publish_main_cont">
          <div class="publish_dialogTitle">
            <!-- <div class="title">济南市国有建设用地二级市场网上挂牌</div>
              <ul class="subtitle">
                <li>申请人：<span>张三</span></li>
                <li>公告日期：<span>2019-10-12</span></li>
              </ul>
            </div> -->
          </div>
          <el-tabs style="margin-top:35px;">
            <div class="toolsTitleBox">
              <span class="toolsTitle">审核结果</span>
            </div>
            <el-table
            :data="AuditrecordData"
            style="width: 100%"
            border
            row-key="id">
            <el-table-column prop="index" label="序号" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assigneeName" label="审核人" align="center"></el-table-column>
            <el-table-column prop="histIns.activityName" label="环节名称" align="center"></el-table-column>
            <el-table-column prop="status" label="审核状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.amount == ''">审核中</span>
                <span v-else>已审核</span>
              </template>
            </el-table-column>
            <el-table-column prop="histIns.startTime" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="comment" label="审核意见" align="center">
              <!-- <template>
                <el-button
                  type="text"
                  size="small"
                  v-popover:popover
                >审核意见</el-button>
                  <el-popover placement="bottom" width="450" trigger="click" ref="popover">
                    <el-container>
                      <el-header style="height:40px;">
                        <div class="headerpop">审核意见</div>
                      </el-header>
                      <el-container style="border-top:1px solid rgb(243,243,243); padding:20px;">
                        <el-main>签了土地转让合同，对方在耕地上建厂房，政府不让建，然后终止合同，问下怎样终止合同？是不是双方口头承认就行了，担心以后会有纠纷，另外我能不能要求对方出一部分违约金，签了土地转让合同，对方在耕地上建厂房，政府不让建，然后终止合同，问下怎样终止合同？是不是双方口头承认就行了，担心以后会有纠纷，另外我能不能要求对方出一部分违约金。</el-main>
                      </el-container>
                    </el-container>
                  </el-popover>
              </template> -->
            </el-table-column>
          </el-table>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// eslint-disable
export default {
  components: {},
  data() {
    return {
      tableData:[{winner:'济南产置业有限公司',chagePrice:'10000',chageTime:'2018-12-28  19：01：01'}],
      
      AuditrecordData:[],
    };
  },
  created(){
    this.init(this.$route.query.id)
  },
  methods:{
    init(id){
      var jsonVars="{'test':'test'}";
      this.$post(this.$API.EPF_ACTIVITI.FLOW,{procInsId:id,jsonVars:jsonVars}).then(res => {
        //查询意见
        if(res.code != '0'){
          //失败
          this.$message.error(res.msg);
          return
        }
        this.AuditrecordData = res.histoicFlowList;
      })
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
        .publish_dialogTitle {
          .title{font-size: 22px;color: #333333;font-weight: bold;line-height: 100px;text-align: center;}
          .subtitle {
            li{display: inline-block;color:#999999;font-size: 14px;margin-right: 40px;
              span{
                color:#666666
              }
            }
          }
        }
        table{
          border:1px solid #f3f3f3;
          margin-top:25px;
          tr{
            @include size(100%,50px);
            border-bottom:1px solid #f3f3f3;
            &:nth-child(1){
              background: #f2f5f7;
              td{
                font-weight: bold;
              }
            }
            td{
              text-align: center;
              color:#333333;
              font-size: 14px;
              &:nth-child(3){
                color:#4671d5;
              }
              &:nth-child(4){
                color:#4671d5;
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
