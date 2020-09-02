<template>
  <epf-container title="标的详情">
    <div class="page-body">
      <div class="filter_wrap" :view-id="newRender">
        <div class="dsDetailInfo_box">
          <div class="publish_main">
            <el-form :model="mydata" ref="mydata" label-width="175px" class="demo-ruleForm">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">交易基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="允许联合竞买：">
                      <el-radio-group v-model="mydata.transTarget.isAisJointBidding" :disabled="disabled">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="允许网上直播：">
                      <el-radio-group v-model="mydata.transTarget.isLiveWebcast" :disabled="disabled">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="交易中心：">
                      <el-select
                        v-model="mydata.transTarget.tradingCenter"
                        style="width:360px;"
                        :disabled="disabled"
                      >
                        <el-option :value="mydata.transTarget.tradingCenter">
                          {{mydata.transTarget.tradingCenter}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="资格审核：">
                      <el-radio-group v-model="mydata.transTarget.isAfterCheck" :disabled="disabled">
                        <el-radio :label="0">前置资格审核</el-radio>
                        <el-radio :label="1">后置资格审核</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="流转方式：">
                      <el-select
                        style="width:360px;"
                        v-model="mydata.transTarget.businessTypeName"
                        :disabled="disabled"
                      >
                        <el-option :value="mydata.transTarget.businessTypeName">
                          {{mydata.transTarget.businessTypeName}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="交易方式：">
                      <el-select
                        style="width:360px;"
                        v-model="mydata.transTarget.transTypeName"
                        :disabled="disabled"
                      >
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
                    <el-form-item label="起始价：">
                      <el-input
                        v-model="mydata.transTarget.beginPrice"
                        style="width:360px;"
                        :disabled="disabled"
                      ></el-input>
                      <span style="margin-left:20px;">万元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞价阶梯：">
                      <el-input
                        v-model="mydata.transTarget.priceStep"
                        style="width:360px;"
                        :disabled="disabled"
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
                        style="width:90%;height:120px;"
                        :disabled="disabled"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="条件设置部门：">
                      <el-select
                        v-model="mydata.transTarget.conditionOrganName"
                        :disabled="disabled"
                        style="width:360px;"
                      >
                        <el-option :value="mydata.transTarget.conditionOrganName">
                          {{mydata.transTarget.conditionOrganName}}
                        </el-option>
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
                    <el-form-item label="公告开始时间：">
                      <el-date-picker
                        v-model="mydata.transTarget.beginNoticeTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞买申请开始时间：">
                      <el-date-picker
                        v-model="mydata.transTarget.beginApplyTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li v-if="isShow">
                    <el-form-item label="挂牌开始时间：">
                      <el-date-picker
                        v-model="mydata.transTarget.beginFocusTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li v-if="isShow">
                    <el-form-item label="挂牌截止时间：">
                      <el-date-picker
                        v-model="mydata.transTarget.endFocusTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="保证金缴纳截止时间：">
                      <el-date-picker
                        v-model="mydata.transTarget.endEarnestTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="限时竞价开始时间：" v-if="isShow">
                    <el-date-picker
                        v-model="mydata.transTarget.beginLimitTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拍卖开始时间：" v-else>
                      <el-date-picker
                        v-model="mydata.transTarget.beginLimitTime"
                        type="datetime"
                        align="right"
                        :disabled="disabled"
                        style="width:360px;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                </ul>
              </div>

              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">绑定地块信息22</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="mydata.transGoods"
                    style="width: 100%,"
                    border
                  >
                    <el-table-column type="selection" width="80" align="center"></el-table-column>
                    <el-table-column prop="goodsNo" label="地块编号" width="180" align="center"></el-table-column>
                    <el-table-column prop="circulationName" label="流转方式" width="148" align="center"></el-table-column>
                    <el-table-column prop="isBinding" label="地块状态" width="230" align="center">
                      <template slot-scope="scope">
                        <span :class="scope.row.isBinding==1?'default':''"></span>
                        <span :class="scope.row.isBinding==0?'success':''"></span>
                        <span v-if="scope.row.isBinding==0">已绑定</span>
                        <span v-else>未绑定</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="firstClassUseName" label="用途" width="430" align="center"></el-table-column>
                    <el-table-column prop="insertUser" label="经办人" width="190" align="center"></el-table-column>
                    <el-table-column label="操作" width="210" align="center">
                      <!-- <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                          @click="handleDelRow(scope.$index,scope.row)"
                        >删除</el-button>
                      </template> -->
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">保证金</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="mydata.transTargetEarnestMoney"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column type="selection" min-width="5%" align="center"></el-table-column>
                    <el-table-column label="币种" min-width="35%" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.currencyName" :disabled="disabled" placeholder="请选择币种">
                        </el-input>
                        <!-- <el-select v-model="scope.row.currencyName" :disabled="disabled" placeholder="请选择币种">
                          <el-option
                            v-for="(item,index) in currencyData"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select> -->
                      </template>
                    </el-table-column>

                    <el-table-column label="金额" min-width="35%" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.amount" :disabled="disabled" placeholder="请输入金额">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="15%">
                      <!-- <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteRow(scope.$index)">删除</el-button>
                        <el-button type="text" size="small" @click="confirmRow(scope.$index)">确认</el-button>
                        <el-button type="text" size="small" @click="cancelRow(scope.$index)">取消</el-button>
                      </template> -->
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <EPF-switchTitle titles_h='标的附件清单' padding='0' background='#fff' :shutOff='false'>
                <EPF-annexList 
                  :tableType='true'
                  :tableNmae='tableNmae'
                  :belong='belong'
                  :areaCode='areaCode'
                  :fileSize='6'
                  :fileType='fileType'
                  :annexType='massif'>
                </EPF-annexList>
              </EPF-switchTitle>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </epf-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "detail",
  components: {},
  data() {
    return {
      tableNmae:['序号','文件名称','文件','操作'],//表头名称
      belong:'',//请求参数 - 附件所属标识（必传）
      areaCode:'',//请求参数 - 区域标识（必传）
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      massif:'TARGET',

      disabled:true,
      //交易时间信息显示隐藏
      isShow: true,
      beginNoticeTime: "",
      beginApplyTime: "",
      beginFocusTime: "",
      endFocusTime: "",
      endEarnestTime: "",
      beginLimitTime: "",

      dicNum: 0,
      filterData: {
        flowMode: "",
        issueEndDate: "",
        circulation: "",
        publishStatus: "",
        landUse: "",
        publishNo: "",
        doSomeThing: "",
        type: "",
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        issueBeginDate: "",
        issueEndDate: "",
        landNo: ""
      },
      dicRequest: [
        "flow_mode",
        "trans_type",
        "land_use",
        "administrative_regions"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_type: "",
        land_use: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      mydata: {
        transTarget: {
          id: "",
          transType: "",
          transTypeName: "",
          tradingCenter: "",
          isAisJointBidding: 1, //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: 1, //允许网上直播(0:允许；1：不允许)
          isAfterCheck: 0, //资格审核（0：前置； 1：后置)
          transCondition: "", //竞买资格条件
          conditionOrganName: "", //	条件设置部门
          beginPrice: "", //标的起始价
          priceStep: "", //	竞价阶梯
          allowEntrustePrice: "", //是否委托
          fileTemplateCode: "",
          businessType: "",
          businessTypeName: "",

          beginNoticeTime: "",
          beginApplyTime: "",
          beginFocusTime: "",
          endFocusTime: "",
          endEarnestTime: "",
          beginLimitTime: ""
        },
        // 币种选择结果
        transTargetEarnestMoney: "",
        transGoods: []
      },
      rules: {
        isAisJointBidding: [
          { required: true, message: "是否允许联合竞买", trigger: "change" }
        ],
        isLiveWebcast: [
          { required: true, message: "是否允许网上直播", trigger: "change" }
        ],
        tradingCenter: [
          { required: true, message: "请选择交易中心", trigger: "change" }
        ],
        isAfterCheck: [
          { required: true, message: "请选择资格审核类别", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "请选择流转方式", trigger: "change" }
        ],
        transType: [
          { required: true, message: "请选择交易方式", trigger: "change" }
        ],
        beginPrice: [
          { required: true, message: "请输入起始价，为整数", trigger: "blur" },
          { pattern: /^\+?[1-9]\d*$/, message: "起始价有误,必须是大于0的整数" }
        ],
        priceStep: [
          {
            required: true,
            message: "请输入竞价阶梯，为整数",
            trigger: "blur"
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "竞价阶梯有误,必须是大于0的整数"
          }
        ],
        beginNoticeTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        beginApplyTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        beginFocusTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endFocusTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endEarnestTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        beginLimitTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      // tradingCenterOptions: [
      //   {
      //     value: "选项1",
      //     label: "济南市国土资源局"
      //   },
      //   {
      //     value: "选项2",
      //     label: "商河县国土资源局"
      //   },
      //   {
      //     value: "选项3",
      //     label: "济阳县国土资源局"
      //   },
      //   {
      //     value: "选项4",
      //     label: "平阳县国土资源局"
      //   }
      // ],
      ruleForm: {
        transTarget: {
          id: "",
          transType: "",
          tradingCenter: "",
          isAisJointBidding: 1, //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: 0, //允许网上直播(0:允许；1：不允许)
          isAfterCheck: 1, //资格审核（0：前置； 1：后置)
          transCondition: "", //竞买资格条件
          conditionOrganName: "", //	条件设置部门
          beginPrice: "", //标的起始价
          priceStep: "", //	竞价阶梯
          allowEntrustePrice: "", //是否委托
          fileTemplateCode: "",
          businessType: "",
          beginNoticeTime: "",
          beginApplyTime: "",
          beginFocusTime: "",
          endFocusTime: "",
          endEarnestTime: "",
          beginLimitTime: ""
        },
        transTargetEarnestMoney: [
          // {
          //   currency: "CNY",
          //   amount: "300"
          // },
          // {
          //   currency: "USD",
          //   amount: "200"
          // },
          // {
          //   currency: "EUR",
          //   amount: "100"
          // }
        ],
        transGoods: []
      },
      checkList: ["选中且禁用", "复选框 A"],

      GoodsList: [],
      GoodsListData: [],
      //币种选项数据
      currencyData: [
        // {
        //   value: "RMB",
        //   label: "人民币"
        // },
        // {
        //   value: "USD",
        //   label: "美元"
        // },
        // {
        //   value: "JPY",
        //   label: "日元"
        // },
        // {
        //   value: "DEM",
        //   label: "欧元"
        // },
        // {
        //   value: "NLG",
        //   label: "荷兰盾"
        // }
      ],
      //保证金多选
      currencyChecked: [],
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
      Numders:'',
      centerDialogVisible: false,

      defaultProps: {
        children: "children",
        label: "label"
      },

      marginPrice: [
        {
          id: 0,
          currency: "",
          amount: ""
        }
      ],

      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      //附件模板数据
      tableData: [],

      id:"",
      baseUrl:'',
      annexId:'',
      returnNoticeId:''
    };
  },
  created() {
    this.baseUrl = PUZZLE_CONFIG.https + "/epf-document/document/downloadById?id=";
    this.belong = this.$route.query.id
    this.getItemData(this.$route.query.id);
  },
  methods: {
    getItemData() {
      let id = this.$route.query.id;
      this.$get(this.$API.EPF_TRADE.TARGET.TARGET_INFO+`?targetId=${id}`).then(res => {
        this.mydata.transTarget = res.map.transTargetObj;
        if (res.map.transTargetObj.transTypeMark == 'auction_mode') {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        this.mydata.transTargetEarnestMoney = res.map.transTargetEarnestMoneyList;
        this.mydata.transGoods = res.map.transGoodsList;
        console.log("标的详情数据返回",res);
        this.annexId = res.map.transTargetObj.fileTemplateCode;
        this.returnNoticeId = res.map.transGoodsList[0].id;
        console.log('请求参数附件模板code：',this.annexId,'对象ID：',this.returnNoticeId);
        this.belong = id
        this.areaCode = this.mydata.transGoods[0].cantonProvince

        this.$get('/epf-document/document/getOneGroupFilsById?id='+this.annexId,{}).then(res=>{
          console.log('这是附件所以文件返回-----------',res)
        })

      });
    },
    deleteRow(val){ //删除

    },
    confirmRow(val){ //确认

    },
    cancelRow(val){ //取消

    },
    // 下载文件
    downFile(id){
      window.open(this.baseUrl+id, '_self');
    }
  },
  computed: {
    newRender:function(){
    this.id = this.$route.query.id
    this.getItemData(this.$route.query.id);
    }
  },
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
    width: 80%;
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
      .publish_main_cont_table{
        margin: 0 0 20px 0;
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
          display: flex;
          flex-wrap: wrap;
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
.EntrustTra_main {
  @include size(100%, auto);
  background: #fff;
  &_title {
    @include size(100%, 80px);
    .EntrustTra_title_icon {
      width: 6px;
      height: 21px;
      background: #ffca73;
      border-radius: 3px;
      display: inline-block;
      margin-top: 17px;
      margin-right: 12px;
    }
    .title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      line-height: 80px;
    }
  }
  &_cont {
    padding-bottom: 50px;
    box-sizing: border-box;
    @include size(100%, auto);
    margin: 0 auto;
    table {
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
    p {
      margin: 18px 0 18px 24px;
      color: #999999;
    }
    .search_input {
      @include size(82px, 36px);
      background-color: #ffa000;
      border-radius: 3px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      margin-right: 24px;
      display: inline-block;
    }
    .submit_input {
      background: #fff;
      border: solid 1px #ffa000;
      color: #ffa000;
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
.el-select .el-input .el-select__caret .el-input__icon {
  float: right;
}
div.el-col.el-col-2 {
  line-height: 40px;
  margin-left: 20px;
}
div.el-row {
  margin-bottom: 30px;
}
div.el-col.el-col-12 {
  margin-right: 120px;
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
