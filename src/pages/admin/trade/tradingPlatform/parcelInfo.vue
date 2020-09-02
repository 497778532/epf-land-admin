<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-form
        label-position="right"
        ref="filterData"
        :model="filterData"
      >
          <el-col :span="2">
            <span class="filter_title">土地编号 :</span>
          </el-col>
          <el-col :span="3">
             <el-form-item>
             <el-input v-model="filterData.title" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">土地用途 :</span>
          </el-col>
          <el-col :span="3">
            <el-form-item>
            <el-select v-model="filterData.infoId" placeholder="请选择土地用途">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           </el-form-item>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">行政区域 :</span>
          </el-col>
          <el-col :span="8">
            <el-form-item>
            <v-distpicker
              v-show="isShowProvince"
              :province="temp.address__province"
              :city="temp.address__city"
              :area="temp.address__dist"
            ></v-distpicker>
           </el-form-item>
          </el-col>
          <el-col :span="2">
            <div class="button_bg">查询</div>
          </el-col>
          <el-col :span="2">
           <div class="button_bg" @click="resetForm('filterData')">重置</div>
          </el-col>
          </el-form>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">地块信息</span>
          <div class="oper">
            <span class="button_bg" @click="handleAdd()">新增</span>
            <span class="button_default" @click="handleDelete()">删除</span>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="landNo"
            label="地块编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="area"
            label="行政区域"
            width="200">
          </el-table-column>
          <el-table-column
            prop="transferMode"
            label="流转方式"
            width="150">
          </el-table-column>
          <el-table-column
            prop="landState"
            label="地块状态"
            width="180">
            <template slot-scope="scope">
              <span :class="scope.row.landState=='已公告'?'success':''"></span>
              <span :class="scope.row.landState=='公告待审核'?'default':''"></span>
              <span>{{scope.row.landState}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="channel"
            label="渠道"
            width="150">
          </el-table-column>
          <el-table-column
            prop="landuse"
            label="用途"
            width="300">
          </el-table-column>
          <el-table-column
            prop="chargePer"
            label="经办人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="200">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
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
      tableData3Title:[
        {prop:'landNo',title:'地块编号'},
        {prop:'area',title:'行政区域'},
        {prop:'transferMode',title:'流转方式'},
        {prop:'landState',title:'地块状态'},
        {prop:'channel',title:'渠道'},
        {prop:'landuse',title:'用途'},
        {prop:'chargePer',title:'经办人'},
        {prop:'createTime',title:'创建时间'},
      ],
      pracelinfoForm: {
        number: "",
        noticeState: "",
        noticeType: "",
        transferMode: ""
      },
      tableData3: [
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",area:"山东省-济南市-历城区",transferMode:"土地转让",landState:"已公告",channel:"供需平台",landuse:"公共服务与公共建设用地 - 人工牧草地",chargePer:"张晓红",createTime:"2019-01-05  12:12:21",},
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
      tableData: [
        {
          number: "1",
          infoId: "ZR20180723001",
          infoTitle: "南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中",
          flowType: "转让",
          createDate: "2018.06.12 12:00:00",
          type: "审核未通过",
          createUser: "张浩",
          tell: "18769693636"
        },
        {
          number: "1",
          infoId: "ZR20180723001",
          infoTitle: "南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中",
          flowType: "转让",
          createDate: "2018.06.12 12:00:00",
          type: "审核未通过",
          createUser: "张浩",
          tell: "18769693636"
        },
        {
          number: "1",
          infoId: "ZR20180723001",
          infoTitle: "南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中",
          flowType: "转让",
          createDate: "2018.06.12 12:00:00",
          type: "审核未通过",
          createUser: "张浩",
          tell: "18769693636"
        },
        {
          number: "1",
          infoId: "ZR20180723001",
          infoTitle: "南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中",
          flowType: "转让",
          createDate: "2018.06.12 12:00:00",
          type: "审核未通过",
          createUser: "张浩",
          tell: "18769693636"
        }
      ],
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
  created() {
    console.log(111);
    this.handleData = this.handle;
    // console.log(this.handleData);
    this.getTransferPlace({});
  },
  methods: {
    viewDeatil(item){
      this.$router.push({path:'/parcelInfoDetail',query:{landNo:item.landNo}})
    },
    handleClick(item){
      this.$router.push({path:'/parcelInfoDetail',query:{landNo:item.landNo}})
    },
    handleAdd(){
      this.$router.push('/parcelInfoAdd')
    },
    handleDelete(index, row) {
      this.$confirm('确认要删除该条信息吗?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
    getTransferPlace(params) {
      console.log(params);
      this.$get("/epf-supply/tlandSearch/getListTLandSearch", params).then(res => {
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        console.log(res);
        this.tableData1 = res.pager.results;
      });
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getTransferPlace(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    resetForm(formName) {
      console.log(1)
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.oper{
  float: right;
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
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
  }
  .el-table__row td:nth-child(2) div{
    color: #4671d5;
  }
</style>
