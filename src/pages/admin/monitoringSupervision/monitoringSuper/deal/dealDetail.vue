<template>
  <!-- <div>交易监测详情</div> -->
  <div class="page-body" id="dealDetail">
    <div class="notice_filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <div class="notice_box">
          <p class="notice_text">当前交易状态：
            <span v-if="target.targetStatus=='trans_status-004'">交易中</span>
            <span v-else-if="target.targetStatus=='trans_status-007'">已完成</span>
            <span v-else>发布公告中</span>
          </p>
        </div>
        <el-steps :active="active">
          <el-step title="发布公告" description="2019-12-12 08:00:00"></el-step>
          <el-step title="交易中" description="未支付"></el-step>
          <el-step title="已完成" description></el-step>
        </el-steps>
      </div>
    </div>
    <div class="filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <p class="table_title">公告信息</p>
        <el-table
          v-loading="noticeloading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          :data="noticeData"
          border
          style="width: 100%"
          :header-cell-style="{background:'#fff',color:'#999'}"
        >
          <el-table-column prop="title" label="公告标题"></el-table-column>
          <el-table-column prop="noticeNo" label="公告编号"></el-table-column>
          <el-table-column prop="noticeTypeName" label="公告类型" width="180"></el-table-column>
          <el-table-column prop="publishUserId" label="申请人"></el-table-column>
          <el-table-column label="公告日期">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom_filter_wrap">
      <el-tabs
        v-model="activeTabs"
        type="border-card"
        @tab-click="axiosClick"
        style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;"
      >
        <el-tab-pane label="土地详情" name="targetDetail">
          <div class="main_content">
            <div class="table_th">
              <i class="icon_th"></i>土地基本信息
            </div>
            <el-dialog
              :show-close="false"
              top="5vh"
              :visible.sync="dialogVisible"
              width="30%"
              :modal="false"
            >
              <tianditu :Dlongitude="longitude" :Dlatitude="latitude"></tianditu>
            </el-dialog>
                        <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;border-collapse=collapse"
             >
              <!-- <tr height="50px">
                <th colspan="3" style="text-align:left;background-color:#f5f7fa;"><i class="icon_th"></i>土地基本信息</th>
              </tr>-->
              <tr height="50px">
                <td width="35%">
                  <span class="left_text special_text">土地性质：</span>{{target.landCharName}}
                </td>
                <td width="45%">
                  <span class="left_text special_text">所属行政区域：</span>{{target.cantonProvinceName}}-{{target.cantonCityName}}-{{target.cantonAreaName}}
                </td>
                <td width="20%">
                  <span class="left_text special_text">使用权类型：</span>{{target.useTypeName}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">土地类型：</span>{{target.landTypeName}}
                </td>
                <td>
                  <span class="left_text special_text">土地用途：</span>{{target.firstClassUseName}}-{{target.secondClassUseName}}
                </td>
                <td>
                  <span class="left_text special_text">转让面积：</span>{{target.area}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">使用权截止日期：</span>{{target.endDate}}
                </td>
                <td>
                  <span class="left_text special_text">剩余使用年限：</span>{{target.years}}
                </td>
                <td>
                  <span class="left_text special_text">拟转让总价：</span>{{Division(target.price)}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">权证号类型：</span>{{target.warrantNumTypeName}}
                </td>
                <td>
                  <span class="left_text special_text">权证号：</span>{{target.warrantNum}}
                </td>
                <td>
                  <span class="left_text special_text">是否有附着物：</span>{{target.isAdjunct=='0'?"是":"否"}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">登记机构：</span>{{target.registration}}
                </td>
                <td>
                  <span class="left_text special_text">不动产单元号：</span>{{target.unitNum}}
                </td>
                <td>
                  <span class="left_text special_text">建筑面积：</span>{{target.buildArea}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">划拨决定书号：</span>{{target.decisionNum}}
                </td>
                <td>
                  <span class="left_text special_text">建筑结构：</span>{{target.buildingStructureName}}
                </td>
                <td>
                  <span class="left_text special_text">建筑绿化率：</span>
                  {{target.greenSpaceRateSymbol1}}{{target.greenSpaceRate}}{{target.greenSpaceRateSymbol2}}{{target.greenSpaceRate2}}
                </td>
              </tr>
              <tr height="50px">
                <td style="border-bottom:1px solid #fff;">
                  <span class="left_text special_text">建筑限高：</span>{{target.heightLimit}}
                </td>
                <td style="border-bottom:1px solid #fff;">
                  <span class="left_text special_text">建筑密度：</span>{{target.greenSpaceRateSymbol1}}{{target.buildingDensity}}{{target.buildingDensitySymbol2}}{{target.buildingDensity2}}
                </td>
                <td style="border-bottom:1px solid #fff;"></td>
              </tr>
            </table>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;"
             >
              <tr height="50px">
                <td width="55%">
                  <span class="left_text special_text">土地坐落：</span>{{target.location}}
                </td>
                <td width="45%">
                  <span class="left_text special_text_place">地图标注：</span>{{target.coordinate}}
                  <i style="font-size:16px;cursor:pointer " class="el-icon-location" @click="mapClick()"></i>
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">东至：</span>{{target.east}}
                </td>
                <td>
                  <span class="left_text special_text_place">西至：</span>{{target.west}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">南至：</span>{{target.south}}
                </td>
                <td>
                  <span class="left_text special_text_place">北至：</span>{{target.north}}
                </td>
              </tr>
              <tr height="130px">
                <td colspan="2">
                  <div class="resource_box">
                    <span class="left_text special_text">土地照片：</span>
                    <ul class="resources">
                                       <li v-for="(item,index) in provideImgList" :key="index">
                        <img :src="item.url" alt class="resource_content" />
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr height="130px">
                <td colspan="2">
                  <div class="resource_box">
                    <span class="left_text special_text">土地视频：</span>
                    <ul class="resources">
                 <li v-for="(item,index) in provideViedoList" :key="index">
                      <video :src="item.url" class="resource_content" controls="controls"></video>
                    </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </table>
            <div class="table_th" style="margin-top:35px;">
              <i class="icon_th"></i>申请人信息
            </div>

            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;"
             >
              <tr height="50px">
                <td width="35%">
                  <span class="left_text special_text_people">权属人性质：</span>个人用地
                </td>
                <td width="45%">
                  <span class="left_text special_text_people">名称：</span>
                  {{trustInfo.ownerShip}}
                </td>
                <td width="20%">
                  <span class="left_text special_text_people">证件种类：</span>
                  {{trustInfo.identificationTypeName}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_people">证件号：</span>
                  {{trustInfo.identificationNum}}
                </td>
                <td>
                  <span class="left_text special_text_people">地址：</span>
                  {{trustInfo.address}}
                </td>
                <td>
                  <span class="left_text special_text_people">权属人联系电话：</span>
                  {{trustInfo.phone}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_people">联系人/代理人：</span>
                  {{trustInfo.contact}}
                </td>
                <td>
                  <span class="left_text special_text_people">联系人/代理人身份证号：</span>
                  {{trustInfo.idCard}}
                </td>
                <td>
                  <span class="left_text special_text_people">联系人/代理人联系电话：</span>
                  {{trustInfo.contactPhone}}
                </td>
              </tr>
              <tr height="50px">
                <td colspan="3">
                  <span class="left_text special_text_people">联系人/代理人联系地址：</span>
                  {{trustInfo.trustInfocontactAddress}}
                </td>
              </tr>
            </table>
            <div class="table_th" style="margin-top:35px;">
              <i class="icon_th"></i>附件清单
            </div>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
            >
              <el-table-column prop="num" label="序号" width="115" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="tname" label="文件名称" width="480"></el-table-column>
              <el-table-column label="文件">
                <template slot-scope="scope">
                  <span v-if="scope.row.files.length>0">{{scope.row.files[0].fname}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.files.length>0"
                    @click="handleClick(scope.row.files[0].fid)"
                    type="text"
                    size="small"
                  >下载</el-button>
                  <el-button v-if="scope.row.files.length>0" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="竞价记录" name="buyRecord">
          <div class="main_content">
            <!-- 竞买人资格 -->
            <div class="table_th">
              <i class="icon_th"></i>竞买人资格
            </div>
            <el-table
              :data="paymentData"
              border
              style="width: 100%"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
             >
              <el-table-column prop="num" label="序号" width="140" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="bidder" label="竞买人"></el-table-column>
              <el-table-column prop="payTime" label="缴纳时间" width="280"></el-table-column>
              <el-table-column prop="payAmount" label="缴纳金额" width="405"></el-table-column>
              <el-table-column prop="payStatus" label="缴纳结果" width="405"></el-table-column>
            </el-table>
            <!-- 竞买记录 -->
            <div class="table_th" style="margin-top:35px;">
              <i class="icon_th"></i>竞买记录
            </div>
            <div class="search_box">
              <el-row>
                <el-col :xs="3" :sm="3" :md="3" :lg="2.5">
                  <span class="filter_title">竞买人：</span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="filterData.createUserName" size="small" placeholder="请输入竞买人"></el-input>
                </el-col>
                <el-col :xs="3" :sm="3" :md="3" :lg="2.5">
                  <span class="filter_title">公告日期：</span>
                </el-col> 
                <el-col :span="6">
                  <el-col>
                    <el-date-picker
                      v-model="buyTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </el-col>
                </el-col>
                <el-col :span="2">
                  <div class="button_bg" @click="searchList()">查询</div>
                </el-col>
                <el-col :span="2">
                  <div class="button_default" @click="resetFilter()">重置</div>
                </el-col>
              </el-row>
            </div>
            <el-table
              :data="bidderData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
             >
              <el-table-column prop="num" label="序号" width="140" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="licenseNo" label="竞买号" width="120"></el-table-column>
              <el-table-column prop="createUserName" label="竞买人"></el-table-column>
              <el-table-column prop="price" label="竞买出价(元)" width="310"></el-table-column>
              <el-table-column prop="createDate" label="竞买时间" width="285"></el-table-column>
              <el-table-column prop="statusName" label="状态" width="275"></el-table-column>
            </el-table>
            <div
              style="text-align:right;border: 1px solid #ebeef5;padding:25px;box-sizing: border-box;"
             >
              <el-pagination
                background
                layout="total,prev, pager, next,sizes,jumper"
                :page-sizes="[5,10,15,20]"
                @size-change="recordHandleSizeChange"
                @current-change="recordHandleCurrentChange"
                :total="recordtotalRecord"
                :current-page="recordcurrentPage"
                :page-size="recordpageSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!-- 成交结果 -->
        <el-tab-pane label="竞买结果" name="buyResult">
          <div class="main_content">
            <div class="table_th">
              <i class="icon_th"></i>成交结果
            </div>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;"
            >
              <tr height="50px">
                <td width="45%">
                  <span class="left_text special_text_place">竞得人：</span>
                  {{transactionResults.winnerName}}
                </td>
                <td width="55%">
                  <span class="left_text">成交价：</span>
                  {{transactionResults.transPrice}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text_place">成交时间：</span>
                  {{transactionResults.endTransTime}}
                </td>
                <td></td>
              </tr>
            </table>
            <!-- 成交结果公告 -->
            <div class="table_th" style="margin-top:35px;">
              <i class="icon_th"></i>成交结果公告
            </div>
            <el-table
              :data="resultspublicList"
              border
              style="width: 100%"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
             >
              <el-table-column prop="publictTitle" label="公告标题" width="530"></el-table-column>
              <el-table-column prop="id" label="公告编号" width="280"></el-table-column>
              <el-table-column prop="insertUserName" label="申请人"></el-table-column>
              <el-table-column label="公告日期" width="170">
                <template slot-scope="scope">
                  {{scope.row.insertTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.insertTime)[0]:''}}
                </template>
              </el-table-column>
            </el-table>
            <div class="table_th" style="margin-top:35px;">
              <i class="icon_th"></i>合同文件
            </div>
            <el-table
              :data="contractData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
             >
              <el-table-column prop="CONTRACTNO" label="合同编号" width="530"></el-table-column>
              <el-table-column prop="CONTRACTNAME" label="合同名称" width="280"></el-table-column>
              <el-table-column prop="landTypeName" label="合同类型"></el-table-column>
              <el-table-column prop="UPDATETIME" label="归档时间" width="220"></el-table-column>
              <el-table-column label="操作" width="260">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">下载纸质文档</el-button>
                  <el-button type="text" size="small">查看电子档</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tianditu from "@/components/tianditu/tianditu";
export default {
  name: "dealDetail",
  data() {
    return {
      longitude: 116.391861787671, //经度
      latitude: 39.907996005125916,
      provideImgList: [],
      provideViedoList: [],
      noticeloading: false,
      recordLoading: false,
      limitLoading: false,
      params: {},
      safeParams: {},
      trustInfo: {},
      activeTabs: "targetDetail",
      currentTabs: "targetDetail",
      id: "",
      active: 0,
      isShow: true,
      type: "作家出资",
      noticeData: [],
      target: {},
      tableData: [],
      paymentData: [],
      bidderData: [],
      contractData: [
        // {
        //   contractNo: "ZR20180723001",
        //   contractName: "济南市国有建设用地二级市场网上挂牌",
        //   contractType: "转让",
        //   contractTime: "2018-06-12 12:00:00"
        // }
      ],
      filterData: {
        createUserName: "",
        bidTimeBegin: "",
        bidTimeEnd: ""
      },
      buyTime: [],
      //日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //页码
      dialogVisible: false,
      recordcurrentPage: 1,
      recordPageNo: 1, //页码
      recordpageSize: 5, //每页条数
      recordtotalPage: 1,
      recordtotalRecord: 1,
      //页码
      limitcurrentPage: 1,
      limitPageNo: 1, //页码
      limitpageSize: 5, //每页条数
      limittotalPage: 1,
      limittotalRecord: 1,
      transactionResults: {},
      resultspublicList: [],
      buyParams: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getTarget();
    this.getNoticeData();
  },
  components: {
    tianditu
  },
  methods: {
    getFuJian() {
      this.$get(
        "/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=" +
          this.target.id +
          "&areaCode=" +
          this.target.cantonProvince,
        {}
      ).then(res => {
        let resData = JSON.parse(res.ztreeJson);
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].code.indexOf("LAND") != -1) {
            this.tableData = resData[i].childData;
          }
        }
        console.log(this.tableData);
      });
    },
    getTarget() {
      // this.$get(`/epf-monitor/goods/selectById`, {
      this.$get(`/epf-monitor/goods/selectById`, {
        goodsId: this.id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.target = res.goods;
          this.trustInfo = this.target.trustInfo;
          this.longitude=this.target.coordinate.split(",")[0]
           this.latitude=this.target.coordinate.split(",")[1]
          if (this.target.targetStatus == "trans_status-004") {
            this.active = 1;
          } else if (this.target.targetStatus == "trans_status-007") {
            this.active = 2;
          } else {
            this.active = 0;
          }
          if (this.target.img) {
            this.imgAxios(
              this.target.img,
              this.provideImgList,
              this.provideViedoList
            );
          }
          this.getFuJian();
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    getNoticeData() {
      // this.$post(`/epf-monitor/notice/queryByTargetId`, {
      this.$post(`/epf-monitor/goods/queryByTargetId`, {
        targetId: this.id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.noticeData = res.list;
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
      if (this.activeTabs == "buyRecord") {
        this.getRecordData();
        this.getSafeData();
      } else if (this.activeTabs == "buyResult") {
        this.getresultspublicList();
        this.getTransactionResults();
      }
    },
    // 竞买记录
    getRecordData(val) {
      this.recordLoading = true;
      let params = this.params;
      params["page"] = this.recordPageNo;
      params["rows"] = this.recordpageSize;
      params["targetId"] = this.id;
      this.$get(
        // `/epf-monitor/offerlog/queryBidderQualificationList`,
        `/epf-monitor/goods/queryPayAmountByTargetId`,
        params
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.bidderData = res.pager.results;
          this.recordPageNo = res.pager.pageNo;
          this.recordpageSize = res.pager.pageSize;
          this.recordtotalPage = res.pager.totalPage;
          this.recordtotalRecord = res.pager.totalRecord;
          this.recordLoading = false;
        } else {
          this.recordLoading = false;
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    // 竞买人资格
    getSafeData(val) {
      this.limitLoading = true;
      let safeParams = this.safeParams;
      safeParams["page"] = this.recordPageNo;
      safeParams["rows"] = this.recordpageSize;
      safeParams["targetId"] = this.id;
      // this.$get(`/epf-monitor/notice/queryByTargetId`, safeParams).then(
      this.$get(`/epf-monitor/goods/queryPayAmountByTargetId`, safeParams).then(
        res => {
          console.log(res);
          if (res.code == "0") {
            this.paymentData = res.list;
            this.limitLoading = false;
          } else {
            this.limitLoading = false;
            this.$message.error(res.msg); //失败
            return;
          }
        }
      );
    },
    // 成交结果
    getTransactionResults() {
      // this.$get(`/epf-monitor/transactionresul/queryResultByTargetId`, {
      this.$get(`/epf-monitor/goods/queryResultByTargetId`, {
        targetId: this.id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.transactionResults = res.pager.results[0];
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    async imgAxios(id, array, array2) {
      const { fileList } = await axios.get(
        "/api/epf-document/document/getOneGroupFilsById",
        {
          params: {
            id: id
          }
        }
      );
      let filesData = fileList;
      for (let index = 0; index < filesData.length; index++) {
        if (
          filesData[index].extName == "png" ||
          filesData[index].extName == "jpeg" ||
          filesData[index].extName == "PNG" ||
          filesData[index].extName == "jpg" ||
          filesData[index].extName == "JPG" ||
          filesData[index].extName == "jifi" ||
          filesData[index].extName == "gif"
        ) {
          array.push({
            url: this.baseUrl + filesData[index].id,
            status: "success",
            name: filesData[index].name
          });
        }
        if (filesData[index].extName == "mp4") {
          array2.push({
            url: this.baseUrl + filesData[index].id,
            status: "success",
            name: filesData[index].name
          });
        }
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 成交结果公告
    getresultspublicList() {
      // this.$get(`/epf-monitor/resultspublic/queryResultByTargetId`, {
      this.$get(`/epf-monitor/goods/queryResultNoticeByTargetId`, {
        targetId: this.id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.resultspublicList = res.pager.results;
          this.getResultFuJian();
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    getResultFuJian() {
      this.$get(
        "/epf-monitor/monitor/moniContract/queryContractByGoodsId?id=" +
        // "/epf-monitor/monitor/moniContract/queryContractByGoodsId?id=" +
          this.id,
        {}
      ).then(res => {
        // let resData = JSON.parse(res.ztreeJson);
        // console.log(tres);
        if(res.code == 0){
          this.contractData = res.contract
        }else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    recordHandleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val; //显示条数改变
    },
    recordHandleCurrentChange(val) {
      //当前页发生改变时触发
      this.pageNo = val; //页码改变
    },
    limitHandleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val; //显示条数改变
    },
    limitHandleCurrentChange(val) {
      //当前页发生改变时触发ww
      this.pageNo = val; //页码改变
      this.pageSize = val; //显示条数改变
    },
    resetFilter() {
      this.buyTime = "";
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.filterData["targetId"] = this.id;
      this.getRecordData();
    },
    searchList() {
      if (this.buyTime) {
        this.params["bidTimeBegin"] = this.buyTime[0];
        this.params["bidTimeEnd"] = this.buyTime[1];
      }
      this.getRecordData();
    },
    mapClick() {
      this.dialogVisible = true;
    },
    //合同下载和预览.暂未启用
    // handleClick(id){
    //    window.open(baseURL1.baseURL1 +'/epf-document/document/downloadById?id='+id, '_self');
    // },
    // preview(data){ //文件预览
    //   var api=configApi.dev.proxyTable["/api"].target;//仅限于开发环境，生产环境需要调整下
    //   const url = `/api/epf-document/onlinePreview?url=${api},${data.fid}.${data.ftype}`
    //   // this.src = url
    //   // this.dialogVisible = true
    //   window.open(url)
    // },
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
  width: 160px;
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

