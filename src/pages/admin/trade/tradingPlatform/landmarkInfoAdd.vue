<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="step">
            <el-steps :active="active" finish-status="success">
              <el-step title="交易信息"></el-step>
              <el-step title="地块基本信息"></el-step>
              <el-step title="附件信息"></el-step>
            </el-steps>
          </div>
          <el-form
            :model="filterData"
            :rules="rules"
            ref="filterData"
            label-width="175px"
            class="demo-ruleForm"
          >
            <div class="firststep" v-if="active===0">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">交易基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="允许联合竞买：" required prop="transType">
                      <el-radio v-model="mydata.transTarget.isAisJointBidding" label="1">是</el-radio>
                      <el-radio v-model="mydata.transTarget.isAisJointBidding" label="2">否</el-radio>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="允许网上直播：" required prop="isLiveWebcast">
                      <el-radio v-model="mydata.transTarget.isLiveWebcast" label="1">是</el-radio>
                      <el-radio v-model="mydata.transTarget.isLiveWebcast" label="2">否</el-radio>
                    </el-form-item>
                  </li>
                    <li>
                    <el-form-item label="交易中心：" required prop="tradingCenter">
                      <el-select
                        v-model="mydata.transTarget.tradingCenter"
                        placeholder="请选择"
                        style="width:360px;"
                      >
                        <el-option
                          v-for="item in tradingCenterOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="资格审核：" required prop="isAfterCheck">
                      <el-radio v-model="mydata.transTarget.isAfterCheck" label="1">前置资格审核</el-radio>
                      <el-radio v-model="mydata.transTarget.isAfterCheck" label="2">后置资格审核</el-radio>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item prop="filterData" label="流转方式：">
                      <el-select
                        style="width:360px;"
                        size="small"
                        v-model="filterData.flowMode"
                        @change="flowModeSelect(dictionary.flow_mode,filterData.flowMode,$event)"
                      >
                        <el-option
                          v-for="item in dictionary.flow_mode"
                          :ref="item.zhCn"
                          :dictKey="item.zhCn"
                          :label="item.zhCn"
                          :value="item.zhCn"
                          :key="item.dictKey"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item prop="filterData" label="交易方式：">
                      <el-select
                        style="width:360px;"
                        size="small"
                        v-model="filterData.transType"
                        @change="transTypeStatusSelect(dictionary.trans_type,filterData.transType,$event)"
                      >
                        <el-option
                          v-for="item in dictionary.trans_type"
                          :ref="item.zhCn"
                          :dictKey="item.zhCn"
                          :label="item.zhCn"
                          :value="item.zhCn"
                          :key="item.dictKey"
                        ></el-option>
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
                    <el-form-item label="起始价：" prop="beginPrice" required>
                      <el-input
                        v-model="mydata.transTarget.beginPrice"
                        placeholder="2000"
                        style="width:360px;"
                      ></el-input>
                      <span style="margin-left:20px;">万元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞价阶梯：" prop="priceStep" required>
                      <el-input
                        v-model="mydata.transTarget.priceStep"
                        placeholder="100"
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
                  <li style="width:50%;">
                    <el-form-item label="竞买资格条件：">
                      <el-input
                        type="textarea"
                        maxlength="200"
                        minlength="0"
                        show-word-limit
                        autosize
                        v-model="mydata.transTarget.transCondition"
                        placeholder="竞买人需具有一级建造师资格，注册资金达到2亿。。。"
                        style="width:100%;height:120px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="条件设置部门：">
                      <el-select
                        v-model="mydata.transTarget.conditionOrganName"
                        placeholder="请选择"
                        style="width:360px;"
                      >
                        <el-option label="规划处" value="规划处"></el-option>
                        <el-option label="市场出" value="市场出"></el-option>
                        <el-option label="土地储备中心" value="土地储备中心"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">交易时间信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="公告开始时间：" required prop="beginNoticeTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value1Click()"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞买申请开始时间：" required prop="beginApplyTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value2Click()"
                        v-model="value2"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="挂牌开始时间：" prop="beginFocusTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value3Click()"
                        v-model="value3"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="挂牌截止时间：" required prop="endFocusTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value4Click()"
                        v-model="value4"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="保证金缴纳截止时间：" required prop="endEarnestTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value5Click()"
                        v-model="value5"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="拍卖（限时竞价、现场拍卖）开始时间：" required prop="beginLimitTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        @change="value6Click()"
                        v-model="value6"
                        type="date"
                        placeholder="选择日期"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="operfirst">
                <el-button type="danger" @click="next();submitForm('ruleForm')">下一步</el-button>
              </div>
            </div>
          </el-form>
          <el-form>
            <div class="Secondstep" v-if="active===1">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">绑定地块信息</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <div class="operfirst" style="text-align: right;margin-bottom:30px;">
                    <el-button type="danger" @click="getPraceData()">选择</el-button>
                    <el-button type="danger" class="del" @click="handDelAll()">删除</el-button>
                  </div>
                  <el-table
                    ref="multipleTable"
                    :data="bindingBlockInfo"
                    style="width: 100%,"
                    border
                    @selection-change="handleSelectionDel"
                    v-model="mydata.transGoods"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="goodsNo" label="土地编号"></el-table-column>
                    <el-table-column prop="beginPrice" label="起始价(万元)">
                      <input v-model="mydata.transGoods.beginPrice" class="mytext">
                    </el-table-column>
                    <el-table-column prop="amount" label="保证金">
                      <input v-model="mydata.transGoods.amount" class="mytext">
                    </el-table-column>
                    <el-table-column prop="priceProporte" label="价格比例"></el-table-column>
                    <el-table-column prop="insertUser" label="经办人"></el-table-column>
                  </el-table>
                  <div style="text-align:right;margin:22px 0px;">
                    <el-pagination
                      background
                      layout="prev, pager, next,sizes,jumper"
                      :page-sizes="[5,10, 15, 20]"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :total="totalRecord"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">保证金</h2>
              </div>
              <div class="publish_main_cont">
<div class="publish_main_cont_table">
<div class="operfirst" style="text-align: right;margin-bottom:30px;">
<el-button type="danger" @click.prevent="addRow()">新增</el-button>
<el-button type="danger" class="del" @click.prevent="deleteRow()">删除</el-button>
</div>
<el-table ref="multipleTable" :data="BondInfo" style="width: 100%," border>
<el-table-column type="selection" width="55"></el-table-column>
<el-table-column
prop="currency"
label="币种"
v-model="mydata.transTargetEarnestMoney.currency "
>
<input v-model="mydata.transTarget.currency" class="mytext">
</el-table-column>
<el-table-column
prop="Price"
label="金额（万元）"
v-model="mydata.transTargetEarnestMoney.amount "
>
<input v-model="mydata.transTarget.amount" class="mytext">
</el-table-column>
<el-table-column label="操作" width="400">
<template slot-scope="scope">
<el-button
type="text"
size="danger"
@click="handleDelete(scope.$index, scope.row)"
v-if="scope.row.statusName===1"
style="color: #999999;"
>删除</el-button>
<el-button
type="text"
size="danger"
@click="handleDelete(scope.$index, scope.row)"
v-if="scope.row.statusName===2"
style="color: #999999;"
>确认</el-button>
<el-button
type="text"
size="danger"
@click="handleDelete(scope.$index, scope.row)"
v-if="scope.row.statusName===3"
style="color: #999999;"
>取消</el-button>
</template>
</el-table-column>
<div slot="empty">
<p>
</p >
</div>
</el-table>
</div>
</div>
              <div class="operfirst" style="margin-left:0;">
                <el-button type="danger" @click="prev" class="prevstep">上一步</el-button>
                <el-button type="danger" @click="next">下一步</el-button>
              </div>
            </div>
            <div class="thirdstep" v-if="active===2">
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
                    <div class="additional_title">
                      <span>附加列表</span>
                      <ul>
                        <li>上传</li>
                      </ul>
                    </div>
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
              <div class="operfirst" style="margin-left:0;">
                <el-button type="danger" @click="prev" class="prevstep">上一步</el-button>
                <el-button type="danger" @click="saveTransTarget()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog title="绑定地块信息" :visible.sync="centerDialogVisible" width="50%">
        <el-form :model="formTest" ref="formTest" :rules="rules" label-width="90px">
          <el-row>
            <el-col :span="24">
              <el-col :span="9">
                <el-form-item label="地块编号：" prop="landNo">
                  <el-input v-model="formTest.landNo" autocomplete="off" style="width:100%;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="土地用途：" prop="landUse">
                  <el-select v-model="formTest.landUse" placeholder="请选择" style="width:100%;">
                    <el-option label="济南市国土局" value="济南市国土局"></el-option>
                    <el-option label="济阳县国土局" value="济阳县国土局"></el-option>
                    <el-option label="商河县国土局" value="商河县国土局"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="行政区域：">
                <v-distpicker
                  v-show="isShowProvince"
                  :province="temp.address__province"
                  :city="temp.address__city"
                  :area="temp.address__dist"
                  style="display: inline-block;"
                  v-model="formTest.addressValue"
                ></v-distpicker>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <div class="button_bg" style="width:60%;" @click="searchList()">查询</div>
            </el-col>
            <el-col :span="3">
              <div class="button_default" style="width:60%;" @click="clearList()">重置</div>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="praceData"
          style="width: 100%,"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="goodsNo" label="地块编号" width="150"></el-table-column>
          <el-table-column prop="cantonProvinceName" label="行政区" width="200"></el-table-column>
          <el-table-column prop="circulation" label="流转方式" width="100"></el-table-column>
          <el-table-column prop="isBinding" label="地块状态" width="150"></el-table-column>
          <el-table-column prop="firstClassUseName" label="用途" width="200"></el-table-column>
          <el-table-column prop="insertUser" label="经办人" width="100"></el-table-column>
          <el-table-column prop="insertTime" label="创建时间"></el-table-column>
        </el-table>
        <div class="block" style="text-align:right;margin-top:30px;">
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page="currentPage2"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20"
            @size-change="handleSizeChange1"
            background
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="mysure" @click="submitGoodsList()">绑定</el-button>
          <el-button class="reset" @click="centerDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "landmarkInfoAdd",

  components: {},
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      dicNum: 0,
      filterData: {
        flowMode: "",
        issueEndDate: ""
      },
      dicRequest: ["flow_mode", "trans_type"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_type: ""
      },
      mydata: {
        transTarget: {
          id: this.getRandow(),
          transType: "listing_mode",
          tradingCenter: "",
          isAisJointBidding: "1", //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: "1", //允许网上直播(0:允许；1：不允许)
          isAfterCheck: "1", //资格审核（0：前置； 1：后置)
          transCondition: "竞买资格条件", //竞买资格条件
          conditionOrganName: "条件设置部门", //	条件设置部门
          beginPrice: "100", //标的起始价
          priceStep: "10", //	竞价阶梯
          allowEntrustePrice: "2", //是否委托
          fileTemplateCode: "附件模板标识ID",
          businessType: "transfer",
          beginNoticeTime: "2019-05-08 11:00:00",
          beginApplyTime: "2019-05-08 11:00:00",
          beginFocusTime: "2019-05-08 11:00:00",
          endFocusTime: "2019-05-08 11:00:00",
          endEarnestTime: "2019-05-08 11:00:00",
          beginLimitTime: "2019-05-08 11:00:00"
        },
        transTargetEarnestMoney: [
          {
            currency: "CNY",
            amount: "300"
          },
          {
            currency: "USD",
            amount: "200"
          },
          {
            currency: "EUR",
            amount: "100"
          }
        ],
        transGoods: []
      },

      tradingCenterOptions: [
        {
          value: "选项1",
          label: "济南市国土资源局"
        },
        {
          value: "选项2",
          label: "商河县国土资源局"
        },
        {
          value: "选项3",
          label: "济阳县国土资源局"
        },
        {
          value: "选项4",
          label: "平阳县国土资源局"
        }
      ],
      ruleForm: {
        transTarget: {
          id: this.createId(),
          transType: "",
          tradingCenter: "",
          isAisJointBidding: "1", //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: "1", //允许网上直播(0:允许；1：不允许)
          isAfterCheck: "1", //资格审核（0：前置； 1：后置)
          transCondition: "竞买资格条件", //竞买资格条件
          conditionOrganName: "条件设置部门", //	条件设置部门
          beginPrice: "100", //标的起始价
          priceStep: "10", //	竞价阶梯
          allowEntrustePrice: "2", //是否委托
          fileTemplateCode: "附件模板标识ID",
          businessType: "",
          beginNoticeTime: "2019-05-08 11:00:00",
          beginApplyTime: "2019-05-08 11:00:00",
          beginFocusTime: "2019-05-08 11:00:00",
          endFocusTime: "2019-05-08 11:00:00",
          endEarnestTime: "2019-05-08 11:00:00",
          beginLimitTime: "2019-05-08 11:00:00"
        },
        transTargetEarnestMoney: [
          {
            currency: "CNY",
            amount: "300"
          },
          {
            currency: "USD",
            amount: "200"
          },
          {
            currency: "EUR",
            amount: "100"
          }
        ],
        transGoods: []
      },
      rules: {
        isAisJointBidding: [
          {
            required: true,
            message: "请选择是否允许联合竞买",
            trigger: "change"
          }
        ],
        isLiveWebcast: [
          {
            required: true,
            message: "请选择是否允许网上直播",
            trigger: "change"
          }
        ],
        allowEntrustePrice: [
          {
            required: true,
            message: "请选择是否允许委托报价",
            trigger: "change"
          }
        ],
        isAfterCheck: [
          {
            required: true,
            message: "请选择是否允许资格审核",
            trigger: "change"
          }
        ],
        tradingCenter: [
          {
            required: true,
            message: "请选择交易中心",
            trigger: "change",
            type: "number"
          }
        ],
        beginPrice: [
          { required: true, message: "请填写标的起始价", trigger: "blur" }
        ],
        priceStep: [
          { required: true, message: "请填写标的竞价阶梯", trigger: "blur" }
        ]
      },
      GoodsList: [],
      GoodsListData: [],
      //保证金列表
      BondInfo: [
        {
          currency: "",
          Price: ""
        }
      ],
      //获取地块列表
      praceData: [],
      // 绑定地块
      bindingBlockInfo: [],
      //步骤
      active: 0,
      //页码
      currentPage: 1,
      pageNo: 1,
      pageSize: 15,
      totalPage: 1,
      totalRecord: 1,

      //地块页码
      currentPage2: 1,
      totalPage2: "",

      multipleSelection: [],
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      formTest: {
        landNo: "",
        landUse: "",
        addressValue: []
      },

      centerDialogVisible: false,

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

      BondInfo: [{ currency: "人民币", Price: "400" }],
      txtVal: 0,
      //时间设置
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
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  },
  created() {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        }else {
          this.$get(
            `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res);
          });
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      console.log(res);
      let dicArr = res.map(item => {
        console.log(item);
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      console.log(dicArr);
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }

      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
  },
  mounted() {
    this.createId();
  },
  methods: {
    addRow() {
      //添加行数
      var newValue = {
        currency: "",
        Price: ""
      };
      //添加新的行数
      this.BondInfo.push(newValue);
    },
    deleteRow(index) {
      //删除行数
      this.BondInfo.splice(index, 1);
    },
    getRandow() {
      return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random()
          .toString()
          .substr(2, 5)
      );
    },
    getCode: async function(code) {
      const data = await this.$get(
        `/epf-supply/dictionaries/getDictEbyDictGroup/code?code=${code}`
      );
      console.log(data);
    },
    createId() {
      let that = this;
      this.$get("/epf-trade/api/createId", {}).then(res => {
        that.mydata["transTarget"]["id"] = res.id;
      });
    },
    //保存标的新增
    saveTransTarget: function(ruleForm) {
      console.log(this.mydata);
      
      this.$post("api/epf-trade/admin/transtarget/addTransTarget", {
          transTargetJson: this.mydata,
          headers: { token: sessionStorage.getItem("token") }
        })
        .then(res => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            return;
          }
          console.log(this.mydata);
          this.$message.success("添加成功");
          // this.$router.push({ path: "/landmarkInfo" });
        });
    },

    //获取地块信息列表
    async getPraceData() {
      let res = await this.$get(
        `/epf-trade/admin/transtarget/getAddOrEditTargetGoodsList?page=${
          this.pageNo
        }&rows=${this.pageSize}&goodsNo=${this.formTest.landNo}&firstClassUse=${
          this.formTest.landUse
        }&address__province=${this.formTest.addressValue[0] ||
          ""}&address__city=${this.formTest.addressValue[1] ||
          ""}&address__dist=${this.formTest.addressValue[2] || ""}`
      );
      console.log(res);
      if (res.code == "0") {
        this.centerDialogVisible = true;
        // if(res.pager.results.isBinding===0){
        this.praceData = res.pager.results;
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        // }
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    //清除筛选条件
    clearList() {
      (this.formTest.landNo = ""),
        (this.formTest.landUse = ""),
        (this.formTest.addressValue = []);
      this.getPraceData();
    },
    //搜索
    searchList() {
      this.getPraceData();
    },
    //提交绑定地块信息
    submitGoodsList() {
      this.BondInfo = this.multipleSelection;
      this.bindingBlockInfo = this.multipleSelection;
      this.mydata.transGoods = this.bindingBlockInfo;
      console.log(this.bindingBlockInfo);
      console.log(this.mydata.transGoods);
      this.centerDialogVisible = false;
    },
    // 时间表
    // 公告
    value1Click() {
      this.mydata.transTarget.beginNoticeTime = this.value1;
      console.log(this.mydata);
    },
    // 竞买
    value2Click() {
      this.mydata.transTarget.beginApplyTime = this.value2;
    },
    // 挂牌
    value3Click() {
      this.mydata.transTarget.beginFocusTime = this.value3;
    },

    value4Click() {
      this.mydata.transTarget.endFocusTime = this.value4;
    },
    value5Click() {
      this.mydata.transTarget.endEarnestTime = this.value5;
    },
    value6Click() {
      this.mydata.transTarget.beginLimitTime = this.value6;
    },

    //新增地块信息弹框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //地块信息表格
    handleSelectionDel(val) {
      this.multipleSelection = val;
    },
    // 删除
    handDelAll() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let val = this.multipleSelection;
        val.forEach((val, index) => {
          this.bindingBlockInfo.forEach((v, i) => {
            if (val.goodsNo === v.goodsNo) {
              this.bindingBlockInfo.splice(i, 1);
            }
          });
        });
      }
    },
    //下一步验证
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    transTypeStatusSelect(dic, publishStatusName, event) {
      console.log(1111111111111111111111111111111111111);
      console.log(this.$refs);
      this.filterData.transType = this.$refs[
        publishStatusName
      ][0].$attrs.dictKey;
    },
    flowModeSelect(dic, flowMode, event) {
      console.log("流转方式流转方式流转方式流转方式");
      console.log(this.$refs);
      // this.$refs[cantonCode][0].$attrs.dictKey;
      this.filterData.flowMode = this.$refs[flowMode][0].$attrs.dictKey;
      console.log(this.$refs[flowMode]);
    },
    //下一步
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    //上一步
    prev() {
      if (this.active-- < 0) this.active = 2;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1() {
      this.getPraceData();
    },
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.filter_box {
  box-sizing: border-box;
  padding: 32px 22px;
  padding-top: 0;
  li {
    width: 48%;
    display: inline-block;
    line-height: 50px;
    .del {
      background: #fff;
      color: #666666;
      border: solid 1px #e0dfdf;
    }
  }
}
.filter_wrap {
  .dsDetailInfo_box {
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 0 24px;
      .step {
        box-sizing: border-box;
        padding: 24px 0;
      }
      .operfirst {
        margin-left: 175px;
        button {
          background: rgb(255, 160, 0);
          border: 1px solid rgb(255, 160, 0);
        }
        .del {
          background: #fff;
          color: #666666;
          border: solid 1px #e0dfdf;
        }
      }
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
          // display: flex;
          // flex-wrap: wrap;
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
            @include size(34%, auto);
            margin-right: 1%;
          }
          .additionalList {
            float: left;
            @include size(65%, auto);
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
.mytext {
  width: 100%;
  height: 100%;
  outline-style: none;
  border: none;
  outline-color: transparent;
  font-size: 15px;
  -webkit-tap-highlight-color: #f5f7fa;
}
.page-body .dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-body .dialog-footer .mysure {
  border-color: #ffa000;
  background-color: #ffa000;
  color: #fff;
}
.page-body .dialog-footer .reset {
  border: solid 1px #d3d4d6;
  background-color: #fff;
  color: #606266;
}

.filter_wrap .dsDetailInfo_box .publish_main .operfirst .prevstep {
  border-color: #ffa000;
  background-color: #fff;
  color: #ffa000;
}
.page-body li.el-form-item .el-select .el-input .el-select__caret .el-input__icon{
  margin-left: 180px;
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_box li .distpicker-address-wrapper select {
  width: 120px;
  /* height:34px; */
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
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
   margin-left: 180px;
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
.el-step__icon {
  width: 34px;
  height: 34px;
}
.el-step.is-horizontal .el-step__line {
  top: 17px;
}
.el-step__head.is-process,
.el-step__head.is-success {
  color: #ffa000;
  border-color: #ffa000;
}
.el-step__title.is-process,
.el-step__title.is-success {
  color: #ffa000;
}
.el-table__row td:nth-child(1) div {
  color: #4671d5;
}
</style>