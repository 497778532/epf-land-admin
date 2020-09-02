<template>
<!-- 不动产自动检验 -->
<div class="page-body">
  <div class="filter_wrap">
    <div class="dsDetailInfo_box">
        <div class="publish_main">
            <EPF-switchTitle titles_h='01 信息核验表'>
              <div class="publish_main_cont">
                <div class="toolsTitleBox">
                  <span class="toolsTitle">信息核验表</span>
                </div>
                <el-table
                  :data="tableData"
                  :span-method="objectSpanMethod"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="idName"
                    label=""
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="150">
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="字段名称">
                  </el-table-column>
                  <el-table-column
                    prop="applyInfo"
                    label="合同信息">
                  </el-table-column>
                  <el-table-column
                    prop="warrantNum"
                    label="不动产登记信息">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="比对结果"
                    width="150">
                    <template slot-scope="scope">
                      <i :class="scope.row.Status==1?'el-icon-check':''" style="color: #67c23a;width:20px;"></i>
                      <i :class="scope.row.Status==2?'el-icon-close':''" style="color: red;width:20px;"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </EPF-switchTitle>

            <EPF-switchTitle titles_h='02 抵押权登记情况'>
              <div class="publish_main_cont">
                <div class="toolsTitleBox">
                  <span class="toolsTitle">抵押权登记情况</span>
                  <span class="toolsTitlestate" style="margin-left:26px;">当前抵押状态：</span>
                  <span class="toolsTitlestate" style="color:#fe3f44">抵押中/已注销</span>
                </div>
                <el-table
                  :data="tableData2"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="sealup"
                    label="不动产登记证明号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="mortgageArea"
                    label="抵押面积/平方米"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="mortgagePerson"
                    label="抵押人">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="债务履行起始--截止时间时间"
                    width="220">
                  </el-table-column>
                  <el-table-column
                    prop="mechanism"
                    label="登记机构">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="状态">
                    <template slot-scope="scope">
                      <span :class="scope.row.Status=='1'?'success':''"></span>
                      <span :class="scope.row.Status=='2'?'default':''"></span>
                      <span>{{scope.row.state}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="registime"
                    label="登记时间">
                  </el-table-column>
                </el-table>
              </div>
            </EPF-switchTitle>

            <EPF-switchTitle titles_h='03 查封登记情况'>
              <div class="publish_main_cont">
                <div class="toolsTitleBox">
                  <span class="toolsTitle">查封登记情况</span>
                  <span class="toolsTitlestate" style="margin-left:26px;">当前抵押状态：</span>
                  <span class="toolsTitlestate" style="color:#fe3f44">抵押中/已解封</span>
                </div>
                <el-table
                  :data="tableData3"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="num"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="sealup"
                    label="不动产登记证明号"
                    width="300">
                  </el-table-column>
                  <el-table-column
                    prop="sealupArea"
                    label="查封范围"
                    width="180">
                    <template>
                      <span style="color:#4671d5;">查看详情</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="查封起始--截止时间"
                    width="220">
                  </el-table-column>
                  <el-table-column
                    prop="mechanism"
                    label="登记机构">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="状态">
                    <template slot-scope="scope">
                      <span :class="scope.row.Status=='1'?'default':''"></span>
                      <span :class="scope.row.Status=='2'?'success':''"></span>
                      <span>{{scope.row.state}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="registime"
                    label="登记时间">
                  </el-table-column>
                </el-table>
              </div>
            </EPF-switchTitle>

            <EPF-switchTitle titles_h='04 核验结果'>
              <div class="publish_main_cont">
                <el-input type="textarea" maxlength="1000" minlength="0" show-word-limit autosize v-model="remark" placeholder="需和客户确认，哪些情况不符合就审核不通过？" style="width:95%;height:200px;"></el-input>
              </div>
            </EPF-switchTitle>
            
            <div style="margin-top:10px">
                <el-button type="warning" plain>取消</el-button>
                <el-button type="warning" @click="findAudit">我要审核</el-button>
            </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      foldshow1:false,
      foldshow2:true,
      foldshow3:true,
      foldshow4:true,
      remark:'',
      txtVal:0,
      tableData: [
        {id:1,idName: '地块基本信息',num:'01',name: '坐落',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'02',name: '所属行政区',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'2',amount: 10},
        {id:1,idName: '地块基本信息',num:'03',name: '使用权类型',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '土地用途',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '土地性质',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '不动产登记证明号/土地证号',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '房产证号',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '转让土地面积（㎡）',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '转让建筑面积（㎡）',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '建设用地使用权出让合同号/划拨决定书号',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '转让期限/剩余使用年限（年）',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '使用权开始日期/转让起始日期',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:1,idName: '地块基本信息',num:'04',name: '使用权截止日期/转让截止日期',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        
        {id:2,idName: '权属人信息',num:'07',name: '权利人名称',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:2,idName: '权属人信息',num:'07',name: '证件种类',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
        {id:2,idName: '权属人信息',num:'07',name: '证件号',applyInfo: '浙（2017）德清县不动产权第0018158号',warrantNum: '浙（2017）德清县不动产权第0018158号',Status:'1',amount: 10},
      ],
      tableData2: [
        {num:'01',sealup: '浙（2017）德清县不动产权第0018158号',mortgageArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'1',state:"抵押中",registime:"2017.01.01 18:30:23"},
        {num:'02',sealup: '浙（2017）德清县不动产权第0018158号',mortgageArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'2',state:"已注销",registime:"2017.01.01 14:23:13"},
        {num:'03',sealup: '浙（2017）德清县不动产权第0018158号',mortgageArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'2',state:"已注销",registime:"2017.01.01 16:50:20"},
      ],
      tableData3: [
        {num:'01',sealup: '浙（2017）德清县不动产权第0018158号',sealupArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'1',state:"查封中",registime:"2017.01.01 18:30:23"},
        {num:'02',sealup: '浙（2017）德清县不动产权第0018158号',sealupArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'2',state:"已解封",registime:"2017.01.01 14:23:13"},
        {num:'03',sealup: '浙（2017）德清县不动产权第0018158号',sealupArea: '5000',mortgagePerson: '张三',time:'2017.01.01-2019.04.04',mechanism:"太原市不动产登记中心",Status:'2',state:"已解封",registime:"2017.01.01 16:50:20"},
      ],
    };
  },
  created(){
    window.scrollTo(0,120);
  },
  methods: {
    swichFlot(index){
      if(index===1){this.foldshow1=!this.foldshow1}
      if(index===2){this.foldshow2=!this.foldshow2}
      if(index===3){this.foldshow3=!this.foldshow3}
      if(index===4){this.foldshow4=!this.foldshow4}
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 13 === 0) {
          return {
            rowspan: 13,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    findAudit(){
          this.$confirm('', '审核', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.$message({
                type: 'success',
                message: ''
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
        }
  },
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
      padding:0 24px;
      &_title{
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        margin-top:25px;
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
        margin-top:25px;
        &_title{
          @include size(100%,53px);
          box-sizing: border-box;
          padding: 0 23px;
          font-size: 15px;
          color: #606266;
          line-height: 53px;
          background-color: #f5f7fa;
        }
        .toolsTitlestate{
          color:#606266;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
}  
</style>
<style>
#publishLandMapDialog .el-dialog .el-dialog__body{
    padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header{
    padding-top:10px;
    padding-bottom: 0px;
    text-align:center;
}
  .filter_wrap .el-input--small .el-input__inner{
    height:34px;
  }
  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 117px;
    height:34px;
    font-size: 14px;
    line-height: 34px;
    padding: 0 10px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .filter_wrap .el-date-editor.el-input .el-input__icon{
    line-height:30px;
    color:#8dc4f7;
  }
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
  }
  .el-textarea .el-textarea__inner{
    width:100%;height:100%!important;
  }
</style>
