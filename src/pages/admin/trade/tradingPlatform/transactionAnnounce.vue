<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">标的编号 :</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="filterData.bidnumber" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">竞得人 :</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="filterData.winner" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">成交时间:</span>
          </el-col>
          <el-col :span="3">
            <el-date-picker
                v-model="filterData.dealtime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <div class="button_bg">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" >重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">成交公示</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange">
        <el-table-column
            prop="number"
            label="序号"
            width="100"
            align="center">
            <template slot-scope="scope">
            <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
            </template>
        </el-table-column>
          <el-table-column
            prop="landNo"
            label="标的编号"
            width="170">
          </el-table-column>
          <el-table-column
            prop="startPrice"
            label="起始价(万元)">
          </el-table-column>
          <el-table-column
            prop="endPrice"
            label="成交价(万元)">
          </el-table-column>
          <el-table-column
            prop="dealtime"
            label="成交时间"
            width="240">
          </el-table-column>
          <el-table-column
            prop="winner"
            label="竞得人"
            width="300">
          </el-table-column>
          <el-table-column
            prop="landState"
            label="状态"
            width="180">
            <template slot-scope="scope">
              <span :class="(scope.row.Status!=='7'||scope.row.Status!=='8')?'success':''"></span>
              <!-- <span :class="(scope.row.Status=='7'||scope.row.Status=='8')?'default':''"></span> -->
              <span>{{scope.row.landState}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDetail(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord">
            </el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import transferTable from "../../../../components/transferTable";
import Axios from "axios";

export default {
  components: {
    transferTable
  },
  data() {
    return {
      tableDataTitle:[
        {prop:'landNo',title:'标的编号'},
        {prop:'startPrice',title:'起始价(万元)'},
        {prop:'bondPrice',title:'保证金(万元)'},
        {prop:'landState',title:'地块状态'},
        {prop:'tradingCenter ',title:'交易中心'},
        {prop:'chargePer',title:'经办人'},
        {prop:'createTime',title:'创建时间'},
      ],
      tableData: [
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:1,landState:"受理中（录件）",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:2,landState:"审核中",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:3,landState:"已审核",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:4,landState:"已公告",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:5,landState:"交易中",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:6,landState:"成交待审核",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:7,landState:"未成交（已流拍）",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
      ],
      multipleSelection: [],
      handleDataError: [
        {
          type: 'primary',
          title: '查看审核结果'
        }
      ],
      filterData: {
        title: "",
        infoId: "",
        flowType: "",
        type: "",
        start: "",
        end: "",
        max: "",
        min: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      handleDataWait: [
        {
          type: "success",
          title: "审核"
        },
        {
          type: "primary",
          title: "自动核验"
        }
      ],
      handleDataSuccess: [
        {
          type: "primary",
          title: "查看审核结果"
        },
        {
          type: "danger",
          title: "下架"
        }
      ],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      handleData: "",
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "",
        opinion: ""
      },
      formTest: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleDetail(item){
      this.$router.push({path:'/transactionAnnounceDetail',query:{landNo:item.landNo}})
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
    }
  }
};
</script>
<style scoped>
.oper{
  float: right;
  font-weight: normal;
}
.oper span{
  display: inline-block;
  width: 80px;
	height: 32px;
	background-color: #ffa000;
	border-radius: 2px;
  margin-right: 16px;
  text-align: center;
  line-height: 36px;
  color:#fff;
  font-size: 14px;
  cursor: pointer;
}
.oper span:nth-child(2){
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}


.filter_wrap{
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 38px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);

}

.filter_title{
  display: inline-block;
  box-sizing:border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
</style>
<style>
  .filter_wrap .el-input--small .el-input__inner{
    height:34px;
  }
  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 148px;
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
  .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
  }
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
  }
  .el-table__row td:nth-child(1) div{
      color:#666666;
  }
</style>
