<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="step">
            <el-steps :active="active" finish-status="success">
              <el-step title="公告信息"></el-step>
              <el-step title="附件信息"></el-step>
            </el-steps>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="175px"
            class="demo-ruleForm"
          >
            <div class="firststep" v-if="active===0">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">公告基本信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="公告编号：" prop="noticeNo1">
                      <el-input
                        v-model="ruleForm.noticeNo1"
                        placeholder="地域简称"
                        style="width:120px">
                      </el-input>
                      -自然资告字 [
                      <el-input
                        v-model="ruleForm.noticeNo2"
                        placeholder="年份"
                        type="number"
                        style="width:92px"
                      ></el-input>
                      ]
                      <el-input
                        v-model="ruleForm.noticeNo3"
                        placeholder="编号"
                        style="width:45%;"
                      ></el-input>
                      号
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告标题：" prop="title">
                      <el-input
                        v-model="ruleForm.title"
                        maxlength="50"
                        placeholder="请输入公告标题, 例如济国市国有建设用地二级市场"
                        style="width:100%;"
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告日期：" prop="noticeDate">
                      <el-date-picker
                        placeholder="年月日"
                        v-model="ruleForm.noticeDate"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        type="date"
                        style="width:100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告类型：" prop="noticeType">
                      <el-select :disabled="true"
                                 v-model="ruleForm.noticeType"
                                 placeholder="请选择"
                                 style="width:100%;"
                      >
                        <el-option
                          v-for="item in noticeTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告类型：" prop="noticeType">
                      <el-select :disabled="true"
                        v-model="ruleForm.noticeType"
                        placeholder="请选择"
                        style="width:100%;"
                      >
                        <el-option label="普通公告" value="common_notice"></el-option>
                        <!-- <el-option label="变更公告" value="change_notice"></el-option> -->
                      </el-select>
                    </el-form-item>
                  </li>
                </ul>
              </div>

              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">标的信息</h2>
                <div class="oper" style="line-height:56px">
                  <span type="danger" @click="landmarkInfoAdd()">新增</span>
                  <span type="danger" class="del" @click="landmarkDelMore()">批量删除</span>
                </div>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table ref="multipleTable" :data="landmarkInfo" @selection-change="handleSelectionChangelandmark"
                            style="width: 100%," border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="targetNo" label="标的编号" align="center"></el-table-column>
                    <el-table-column prop="beginPrice" label="起始价(万元)" align="center"></el-table-column>
                    <el-table-column prop="amount" label="保证金(万元)" align="center"></el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                    <el-table-column prop="insertUser" label="经办人" align="center"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, landmarkInfo,'landmarkInfo')"
                          type="text"
                          size="small"
                        >删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">银行信息</h2>
                <div class="oper" style="line-height:56px">
                  <span type="danger" @click="bankAdd()">新增</span>
                  <span type="danger" class="del" @click="bankDelMore()">批量删除</span>
                </div>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table ref="multipleTable" :data="bankLists" @selection-change="handleSelectionChangeBankList"
                            style="width: 100%," border>
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="orgName" label="单位名称" width="210" align="center"></el-table-column>
                    <el-table-column
                      prop="cantonProvinceName,cantonCityName,cantonAreaName"
                      label="银行区域"
                      width="120"
                      align="center"
                    >
                      <template
                        slot-scope="scope"
                      >{{scope.row.cantonProvinceName}}{{scope.row.cantonCityName}}{{scope.row.cantonAreaName}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="银行名称" width="240" align="center"></el-table-column>
                    <el-table-column prop="currencyName" label="币种" width="120" align="center"></el-table-column>
                    <el-table-column prop="account" label="账号" align="center"></el-table-column>
                    <el-table-column prop label="类型" width="120" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.bankState==1">境外银行</span>
                        <span v-else>境内银行</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                    <el-table-column label="操作" width="118" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, bankLists,'bankLists')"
                          type="text"
                          size="small"
                        >删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="operfirst" style="margin-left:0;margin-top:20px;">
                <el-button type="danger" @click="submitForm('ruleForm')">下一步</el-button>
                <!-- <el-button type="danger" @click="next()">下一步</el-button> -->
              </div>
            </div>

            <div class="fifthstep" v-if="active===1">
              <EPF-switchTitle titles_h='公告附件清单' padding='0' background='#fff' :shutOff='false'>
                <EPF-annexList
                  v-if="belong"
                  :tableType='false'
                  @isAux='isAuxFun'
                  :tableNmae='tableNmae'
                  :belong='belong'
                  :areaCode='areaCode'
                  :fileSize='6'
                  :fileType='fileType'
                  :annexType='massif'>
                </EPF-annexList>
              </EPF-switchTitle>
              <div class="operfirst" style="margin-left:0;">
                <el-button type="danger" @click="prev" class="prevstep">上一步</el-button>
                <el-button type="danger" @click="saveNotice('save')">保存</el-button>
                <el-button type="danger" @click="saveNotice('submit')">提交</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 标的弹框 -->
    <el-dialog title="标的信息" :visible.sync="landMarkDialogVisible" width="60%">
      <el-form
        :model="landmarkForm"
        ref="landmarkForm"
        :rules="rules"
        :label-position="labelPosition"
        label-width="90px"
      >
        <el-row>
          <el-col :span="24">
            <el-col :span="9">
              <el-form-item label="标的编号：" prop="targetNo">
                <el-input v-model="targetNo" autocomplete="off" style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="交易单位：" prop="tradingCenter">
                <el-select v-model="landmarkForm.tradingCenter" placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in orgs" :label="item.orgName" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="经办人：" prop="insertUser">
              <el-select v-model="landmarkForm.insertUser" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in users" :label="item.realname" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9"></el-col>

          <el-col :span="2" class="oper">
            <div class="button_default" style="width:80%;" @click="resetlandmarkInfo()">重置</div>
          </el-col>
          <el-col :span="2" class="oper">
            <div class="button_bg" style="width:80%;" @click="conditionQuerylandmarkInfo()">查询</div>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="landmarkInfoData"
        style="width: 100%,"
        border
        @selection-change="landmarkSelection"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="targetNo" label="标的编号" align="center"></el-table-column>
        <el-table-column prop="beginPrice" label="起始价（万元）" width="150" align="center"></el-table-column>
        <el-table-column prop="amount" label="保证金" width="100" align="center"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="180" align="center"></el-table-column>
        <el-table-column prop="tradingCenter" label="交易中心" width="200" align="center"></el-table-column>
        <el-table-column prop="businessTypeName" label="流转方式" width="200" align="center"></el-table-column>
        <el-table-column prop="transTypeName" label="交易方式" width="200" align="center"></el-table-column>
        <el-table-column prop="beginNoticeTime" label="公告开始时间" width="200" align="center"></el-table-column>
        <el-table-column prop="endFocusTime" label="挂牌截至时间" width="200" align="center"></el-table-column>
        <el-table-column prop="insertUser" label="经办人" width="120" align="center"></el-table-column>
        <el-table-column prop="insertTime" label="创建时间" width="200" align="center"></el-table-column>
      </el-table>
      <div class="block" style="text-align:right;margin-top:30px;">
        <el-pagination
          background
          @size-change="handleSizeChangelandmarkInfo"
          @current-change="handleCurrentChangelandmarkInfo"
          :current-page="landmarkInfoPages"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="landmarkInfoRows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="landmarkInfototalPage"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="mysure" @click="surelandmarkInfo()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 银行弹框 -->
    <el-dialog title="银行信息" :visible.sync="bankDialogVisible" width="60%">
      <el-table
        ref="multipleTable"
        :data="bankData"
        style="width: 100%,"
        border
        @selection-change="bankSelectionChange2"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="orgName" label="单位名称" width="180" align="center"></el-table-column>
        <el-table-column prop="bankArea" label="银行区域" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.cantonProvinceName}}-{{scope.row.cantonCityName}}-{{scope.row.cantonAreaName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="银行名称" width="180" align="center"></el-table-column>
        <el-table-column prop="currencyName" label="币种" width="100" align="center"></el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
        <el-table-column prop label="类型" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.bankState==1">境外银行</span>
            <span v-else>境内银行</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180" align="center"></el-table-column>
      </el-table>
      <div class="block" style="text-align:right;margin-top:30px;">
        <el-pagination
          background
          @size-change="handleSizeChangeNewBank"
          @current-change="handleCurrentChangeNewBank"
          :current-page="newBankPages"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="newBankRows"
          layout="total,  prev, pager, next,sizes, jumper"
          :total="newBanktotalPage"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="mysure" @click="surelandmarkInfnbank()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import editor from "@/components/editor/editor";
    import baseURL1 from '../../index.js'
    export default {
        name: "notice",
        data() {
            return {
                tableNmae: ['序号', '文件名称', '文件', '操作'],//表头名称
                belong: '',//请求参数 - 附件所属标识（必传）
                areaCode: '',//请求参数 - 区域标识（必传）
                fileType: ['rar', 'zip', 'doc', 'docx', 'pdf', 'jpg'],
                massif: 'NOTICE',

                baseUrl: '',
                noticeTypeOptions: [
                    {value: "common_notice", label: "普通公告"},
                    {value: "change_notice", label: "变更公告"}
                ],
                value: "选项1",
                bankIds: "",
                targetIds: "",
                infoLength:"",// 富文本编辑器长度
                info: "", // 富文本编辑器双向绑定的内容
                isViewHtml: true, //默认编辑
                landbankInfototalPage: 1,

                targetsNum: 1, //条数
                newlyPages: 1, //标的信息页码
                newlyedRows: 5, //标的信息显示条数
                landmarkInfo: [], //标的table容器
                subjectTemporaryList: [], //标的临时存放容器
                bankTemporaryList: [], //银行临时存放容器
                bankLists: [], //银行信息容器
                totalRecord: 0,
                newlyAddedPages: 1,
                //标的信息页码
                mark_totalRecord: "",
                mark_pageSize: 1,
                mark_currentPage: 1,

                //银行信息页码
                bank_totalRecord: "",
                bank_pageSize: 1,
                bank_currentPage: 1,

                //这里结束
                landMarkDialogVisible: false,
                bankDialogVisible: false,

                fileList: [],
                defaultProps: {
                    children: "childMenu",
                    label: "menuname"
                },

                // isShowProvince: true,

                active: 0,
                currentPage2: 1,
                currentPage: 1,
                pageSize: 10,
                totalRecord: 100,

                data: [
                    {
                        label: "DAZ2018001",
                        children: [{label: "1：挂牌文件"}, {label: "2：规划文件"}]
                    }
                ],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                additionalData: [{fileName: "挂牌文件"}],

                landmarkInfo: [],
                bankInfo: [],
                bankData: [],

                txtVal: 0,
                ruleForm: {
                    noticeNumber: "",
                    noticeTitle: "",
                    noticeTime: "",
                    noticeDate: "",
                    noticeType: "普通公告",
                    dealTransfer: "",
                    dealMode: "",
                    noticeBeginDate: "",
                    noticeBeginTime: "",
                    biddingBeginDate: "",
                    biddingBeginTime: "",
                    hangBeginDate: "",
                    hangBeginTime: "",
                    hangOverDate: "",
                    hangOverTime: "",
                    payOverDate: "",
                    payOverTime: "",
                    auctionBeginDate: "",
                    auctionBeginTime: "",
                    noticeNo1: "",
                    noticeNo2: "",
                    noticeNo3: "",
                },
                rules: {
                    noticeNo1: [
                        {required: true, message: "地域简称不能为空", trigger: "blur"},
                        {min: 1, max: 1, message: "地域简称长度为1位"},
                        // {
                        //   pattern: /^[\u4E00-\u9FA5][\u4E00-\u9FA5A-Za-z0-9_()-（）———【】]+$/,
                        //   message: "只能输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
                        // }
                    ],
                    title: [
                        {required: true, message: "公告标题不能为空", trigger: "blur"},
                        // { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,15,60,'15到60个字符之间')}  },
                        {
                          pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
                          message: "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
                        }
                    ],
                    noticeDate: [
                        {
                            required: true,
                            message: "请选择公告日期",
                            trigger: "blur"
                        }
                    ],
                    noticeType: [{required: true, message: "公告类型不能为空", trigger: "blur"}]
                },
                labelPosition: "right",

                formTest: {
                    //标的弹框
                    targetNo: "",
                    tradingCenter: "",
                    insertUser: "",
                },
                //复制的
                formTest: {
                    //新增标的筛选条件
                    landNo: "", //
                    tradingCenter: "",
                    chargePer: "",
                    page: 1,
                    rows: 3,
                },
                // 交易单位数据
                orgs: [],
                // 标的弹框
                landmarkInfoData: [],
                landmarkForm: {
                    //标的弹框
                    targetNo: "",
                    tradingCenter: "",
                    insertUser: "",
                    page: 1,
                    rows: 3,
                },
                targetNo: "",
                landmarkInfoRows: 3,
                landmarkInfoPages: 1,
                landmarkInfototalPage: 1,
                bankData: [],
                newAddBankTest: {}, //新增银行参数容器
                // 银行弹框
                newBankRows: 3, //新增银行显示条数
                newBankPages: 1, //新增银行的页码
                newBanktotalPage: 1,
                queryId: null,
                multipleSelectionBankList: [],
                multipleSelectionLandmark: [],
                users: [],
                userId: '',
                tid: '',
                modelTye: 0, //业务模式 0-正常草稿编辑 1-重新发布 2-重新提交
                tableData: [],
                id: '',
                isAuxFlag: false, // ----
            };
        },
        components: {
            editor
        },
        created() {
            this.baseUrl = baseURL1.baseURL1 + '/epf-document/document/downloadById?id='
            //获取上一页传过来的数据
            let noticeRevoke = this.$route.query.noticeRevoke;
            let resubmitNotice = this.$route.query.resubmitNotice;
            if (noticeRevoke) { // 重新发布
                this.$get(this.$API.EPF_SUPPLYDEMAND.COMM.CREATE_ID, {}).then(res => {
                    this.id = res.id; //创建对象ID
                    // let belongId = res.id;
                    // this.belong = belongId
                    // this.areaCode = ""
                });
                this.modelTye = 1; //业务模式 0-正常草稿编辑 1-重新发布 2-重新提交
                this.ruleForm = noticeRevoke;
                //设置附件编号
                this.belong = this.ruleForm.enclosureId

                //重新设置
                this.setnoticeNo(1);
                this.info.content = this.ruleForm.content;

            } else if (resubmitNotice) { // 重新提交
                this.getItemData(this.$route.query.id);
                this.$get(this.$API.EPF_SUPPLYDEMAND.COMM.CREATE_ID, {}).then(res => {
                    this.id = res.id; //创建对象ID
                });
                this.modelTye = 2; //业务模式 0-正常草稿编辑 1-重新发布 2-重新提交
                // this.ruleForm = resubmitNotice;
                // this.info.content = this.ruleForm.content;
            } else {
                this.modelTye = 0; //业务模式 0-正常草稿编辑 1-重新发布 2-重新提交
                this.getItemData(this.$route.query.id);
            }

            this.getOrgs(); //机构下拉选择
            this.getUsers(); //审批用户下拉选择
        },
        // watch:{
        //   bankLists(newVal,oldVal){
        //     this.bankLists = newVal
        //   }
        // },
        methods: {
          
          onKeyUp(e, editor){
            let text = editor.activeEditor.getContent() 
            let str  =  text.replace(/<[^>]+>/g, "") 
            this.infoLength = str.length
          },
            //传参  0- 代表回显  1- 代码不需要回显，重置
            setnoticeNo(status) {

                if (status == 0) {
                    let NO = this.ruleForm.noticeNo;

                    // 贵自然资告字[2019]0002号
                    // let NO = '贵自然资告字[2019]0002号';
                    //截取出贵
                    this.ruleForm['noticeNo1'] = NO.substring(0, 1)
                    //截取出2019
                    this.ruleForm['noticeNo2'] = NO.substring(NO.indexOf('[') + 1, NO.indexOf(']'))
                    //截取出0002
                    this.ruleForm['noticeNo3'] = NO.substring(NO.indexOf(']') + 1, NO.indexOf('号'))
                } else {
                    let nowDate = new Date();
                    let date = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                    }
                    let timestamp = (new Date()).valueOf()
                    this.ruleForm['noticeNo2'] = nowDate.getFullYear();
                }

            },
            // 获取附件清单数据检验结果
            isAuxFun(value) {
                this.isAuxFlag = value;
            },
            getOrgs() {
                // 获取交易中心机构
                this.$get(this.$API.EPF_TRADE.NOTICE.USER_ORG, {}).then(
                    res => {
                        if (res.code == 0) {
                            this.orgs = res.orgs;
                        }
                    }
                );
            },
            getUsers() {
                // 获取交易中心的审批人员
                this.$get(this.$API.EPF_TRADE.NOTICE.OR_ROLE, {}).then(
                    res => {
                        if (res.code == 0) {
                            this.users = res.list;
                            console.log('返回当前审批用户', this.users)
                            // this.authViewDatas(res.list);
                        }
                    }
                );
            },
            // 批量删除银行
            handleSelectionChangeBankList(val) {
                this.multipleSelectionBankList = val
            },
            handleSelectionChangelandmark(val) {
                this.multipleSelectionLandmark = val
            },
            landmarkDelMore(row) {
                if (this.landmarkInfo.length == 0) {
                    this.$message.error("没有数据可以删除");
                    return
                }
                this.landmarkInfo = this.landmarkInfo.concat(this.multipleSelectionLandmark).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },
            bankDelMore(row) {
                if (this.bankLists.length == 0) {
                    this.$message.error("没有数据可以删除");
                    return
                }
                this.bankLists = this.bankLists.concat(this.multipleSelectionBankList).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },
            bankSelectionChange2(val) {
                //银行点击复选框获取整行value
                this.bankTemporaryList = val; //放入临时容器
                console.log("银行点击复选框", this.bankTemporaryList);
            },
            surelandmarkInfnbank(val) {
                //新增银行确认按钮
                let bankId = [];

                this.bankLists = this.bankTemporaryList; //赋值给列表

                for (let i = 0; i < this.bankTemporaryList.length; i++) {
                    bankId.push(this.bankTemporaryList[i].accountId);
                }
                console.log(this.bankLists);
                //
                this.bankIds = bankId.join(","); //银行ids
                this.bankDialogVisible = false; //关闭
                this.bankTemporaryList = []; //初始化为空
            },
            deleteRow(index, rows, type) {
                if (type == 'bankLists') {
                    this.bankLists.splice(index, 1);
                }
                if (type == "landmarkInfo") {
                    this.landmarkInfo.splice(index, 1);
                }
            },
            getItemData() {
                let parmas = {id: this.$route.query.id};
                this.$get(this.$API.EPF_TRADE.NOTICE.GET_NOTICE, parmas).then(
                    res => {
                        console.log("公告详情返回", res);
                        this.annexId = res.map.map.transNotice.fileTemplateCode;
                        if (res.map.map.banks.length > 0) {
                            this.returnNoticeId = res.map.map.banks[0].id;
                        }
                        // console.log("公告详情附件模板code--************",this.annexId,"公告ID",this.returnNoticeId);
                        if (res.code == "0") {
                            this.ruleForm = res.map.map.transNotice;
                            //清空父公告的ID（如果是重新提交状态）
                            if(this.modelTye == 2){
                                this.ruleForm.noticeId = ''
                            }
                            //设置附件的ID
                            this.belong = this.ruleForm.enclosureId

                            this.ruleForm.noticeDate = res.map.map.transNotice.noticeDate;
                            this.info.content = this.ruleForm.content;
                            if (this.$route.query.resubmitNotice) {
                                //重新设置公告编号
                                this.setnoticeNo(1);
                            } else {
                                //回显公告编号
                                this.setnoticeNo(0);
                            }
                            if (res.map.map.transNotice.noticeId && this.modelTye != 2) {
                                this.getAddTransBankListByID(res.map.map.transNotice.noticeId);
                                this.getAddTransTargetListByID(res.map.map.transNotice.noticeId);
                            } else {
                                this.landmarkInfo = res.map.map.targetVos;
                                this.bankLists = res.map.map.banks;
                                let bankId = [];
                                for (let i = 0; i < this.bankLists.length; i++) {
                                    bankId.push(this.bankLists[i].accountId);
                                }
                                console.log(this.bankLists);
                                this.bankIds = bankId.join(","); //银行ids

                                let targetId = [];
                                for (let i = 0; i < this.landmarkInfo.length; i++) {
                                    targetId.push(this.landmarkInfo[i].id);
                                }
                                this.targetIds = targetId.join(","); //银行ids
                            }
                            // console.log()
                            this.contentHtml = this.ruleForm.content;
                            this.belong = this.ruleForm.enclosureId
                            this.areaCode = this.ruleForm.fileTemplateCode
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                );
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${
                        files.length
                    } 个文件，共选择了 ${files.length + fileList.length} 个文件`
                );
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            upload() {
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            next() {
                // console.log(this.ruleForm);
                if (this.active++ > 4) this.active = 0;
            },
            submitForm(formName) {
              let _this = this
              let text = tinymce.activeEditor.getContent() 
              let str  =   text.replace(/<[^>]+>/g, "") 
              console.log(str.length)
              if(str.length == 0){
                _this.$message.error("公告内容不能为空");
              }else if(str.length>2000){
                _this.$message.error("公告内容长度在2000字以内")
              }else{
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.landmarkInfo.length == 0) {
                            this.$message.error("请选择标的！"); //失败
                            return false;
                        }
                        if (this.bankLists.length == 0) {
                            this.$message.error("请选择银行！"); //失败
                            return false;
                        }


                        let _this = this;
                        if (!this.ruleForm.noticeNo2) {
                            this.$message.error("请输入年份！"); //失败
                            return false;
                        }

                        if (!this.ruleForm.noticeNo3) {
                            this.$message.error("请输入编号！"); //失败
                            return false;
                        }

                        //拼接公告编号
                        let noticeNo = this.ruleForm.noticeNo1 + '自然资告字[' + this.ruleForm.noticeNo2 + ']' + this.ruleForm.noticeNo3 + '号';
                        let id = "";
                        if (this.ruleForm.id) {
                            id = this.ruleForm.id;
                        }

                        this.ruleForm.noticeNo = noticeNo;

                        //调用验证唯一接口
                        this.$post(this.$API.EPF_TRADE.NOTICE.CKECK_NOTICE, {
                            no: _this.ruleForm.noticeNo,
                            id: id,
                        }).then(res => {
                            if (res.code == '0') {
                                if (res.status || res.status == 'true') {
                                    _this.$message.error("公告编号重复，请重新输入！！")
                                    return false;
                                } else {
                                    //公告编号没有重复
                                    _this.$refs[formName].validate(valid => {
                                        // 判断标的中包含的保证币种与所选择的银行是否匹配-----start-----------
                                        // 朱绍炳 2019-07-02 15:03:21
                                        let tc = []; // 标的所包含的币种数组
                                        let bc = []; // 银行所包含的币种数组
                                        let banks = _this.bankLists;
                                        let targets = _this.landmarkInfo;
                                        for (var i = 0; i < targets.length; i++) { //遍历所选标的
                                            let amountStr = targets[i].amount;
                                            let amounts = amountStr.split(",");
                                            for (var a = 0; a < amounts.length; a++) {
                                                let targetCurrencys = amounts[a].split(":");
                                                let targetCurrency = targetCurrencys[0];
                                                tc.push(targetCurrency);
                                            }
                                        }

                                        for (var b = 0; b < banks.length; b++) { //遍历所选银行
                                            let bankCurrency = banks[b].currencyName;
                                            bc.push(bankCurrency);
                                        }

                                        console.log("tc", tc);
                                        console.log("bc", bc);
                                        let flag = false;
                                        for (let i = tc.length - 1; i >= 0; i--) { 
                                          for(let j = bc.length - 1; j >= 0; j--) {
                                            if(bc[j] == tc[i]){
                                              console.log("tc", tc[i]);
                                              console.log("bc", bc[j]);
                                              flag = true;
                                              break;
                                            }else{
                                              continue;
                                            }
                                          } 
                                        }
                                        console.log("flag", flag);
                                        if (!flag) {
                                            _this.$message.error("所选择银行不满足标的保证金币种要求！请重新选择银行，标的保证金币种包括：" + tc.join(';') + "几种"); //失败
                                            return false;
                                        } else {
                                            this.next();
                                        }
                                        // 判断标的中包含的保证币种与所选择的银行是否匹配-----end-----------
                                        if (valid) {
                                        } else {
                                            console.log("error submit!!");
                                            return false;
                                        }
                                    });
                                }
                            } else {
                                _this.$message.error("交易服务异常，请稍后重试！！")
                                return false;
                            }
                        })
                    } else {
                        // 失败
                        this.$message.error("请检查是否填写完整");
                        return false;
                    }
                });
              }
            },
            prev() {
                if (this.active-- < 0) this.active = 2;
            },
            handleNodeClick(data) {
                console.log(data);
            },
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
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
            },
            delBank(row) {
                // console.log(row);
                this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            },
            saveNotice(type) {
                if (!this.isAuxFlag) {
                    this.$message.error('请检查您的附件清单信息是否上传完整！');
                    return;
                }
                let that = this;
                // this.surelandmarkInfnbank()
                var procDefKey = "transaction_filing"; //启动流程类型
                //获取启动节点信息
                //查询下一个环节
                let businessType = "notice";
                let orgId = sessionStorage.getItem('orgId');
                this.$post(this.$API.EPF_ACTIVITI.NODE_ID, {
                    nodeId: "start",
                    procDefKey: procDefKey,
                    orgId: orgId,
                    businessType: businessType
                }).then(res => {
                    if (res.code != "0") {
                        this.$message.error(res.msg);
                    }
                    var jsonVars =
                        "{NAME_" +
                        res.nodes[0].nodeId +
                        ":'" +
                        res.nodes[0].excutionUser +
                        "',procDefKey:'" +
                        procDefKey +
                        "',businessType:'" +
                        businessType +
                        "'}";
                    let noticeRevoke = this.$route.query.noticeRevoke;
                    let resubmitNotice = this.$route.query.resubmitNotice;
                    if (resubmitNotice || noticeRevoke) {
                        this.ruleForm.id = this.id;
                    }

                    let bankIds = '';
                    if (this.bankLists && this.bankLists.length > 0) {
                        for (let i = 0; i < this.bankLists.length; i++) {
                            bankIds = this.bankLists[i].accountId + ","
                        }
                    }
                    let targetIds = '';
                    for (let i = 0; i < this.landmarkInfo.length; i++) {
                        targetIds = this.landmarkInfo[i].id + ","
                    }
                    this.bankIds = bankIds;
                    this.targetIds = targetIds;
                    debugger
                    this.ruleFormSubmit = {
                        transNotice: this.ruleForm,
                        bankIds: this.bankIds,
                        targetIds: this.targetIds,
                        jsonVars: jsonVars
                    };
                    let url =this.$API.EPF_TRADE.NOTICE.EDIT_NOTICE;
                    this.$useAppend(url, {
                        noticeJson: this.ruleFormSubmit,function:type
                    }).then(res => {
                        if (res.code == 0) {
                            //调用接口修改原来的那条数据的是否重新发布为1
                            let id = this.$route.query.id;
                            if (that.modelTye == 1) {
                                //重新发布进来的
                                that.$get(this.$API.EPF_TRADE.NOTICE.SET_REVOKE, {id: id}).then(res2 => {
                                    if (res2.code != 0) {
                                        that.$message.error(res2.msg);
                                        return
                                    }
                                }).catch(error => {
                                    console.log(error)
                                })
                            } else if (that.modelTye == 2) {
                                //重新发布进来的
                                that.$get(this.$API.EPF_TRADE.NOTICE.SET_NOTICE, {id: id}).then(res2 => {
                                    if (res2.code != 0) {
                                        that.$message.error(res2.msg);
                                        return
                                    }
                                }).catch(error => {
                                    console.log(error)
                                })
                            }

                            this.$message.success("操作成功");
                            let routes = '/system/trade/land/views/notice/edit'
                            this.$bus.$emit('close_tab',routes)
                            let routerPath = "/system/trade/land/views/notice/index";
                            this.$router.push({path:routerPath});
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                });
            },
            //数组去重方法
            unique(str) {

                let Data = ''
                let arr = str.split(',');
                console.log("获取到的arr是：", arr)
                let newA = new Set(arr);
                if (newA && newA.size > 0) {
                    for (let i = 0; i < newA.size; i++) {
                        Data = newA[i] + ',';
                    }
                }
                return Data;
                console.log("去重之后的是：" + Data)
            },
            landmarkSelection(val) {
                //标的点击复选框获取整行value
                // for(var i = 0; i < array.length; i++){
                //     if(this.subjectTemporaryList.indexOf(array[i]) == -1){
                //         this.subjectTemporaryList.push(array[i]);
                //     }
                // }
                this.subjectTemporaryList = val;
                console.log("已选标的", this.subjectTemporaryList);
            },
            delLandMark(row) {
                // console.log(row);
                this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            },
            // let prams = this.landmarkForm
            // let formTest = this.formTest;
            // landmarkForm["page"] = this.landmarkInfoPages; //当前页码
            // landmarkForm["rows"] = this.landmarkInfoRows; //最大条数
            // formTest["status"] = "trans_status-001"; // 录件

            //新增标的信息列表请求
            landmarkInfoAdd() {
                this.landMarkDialogVisible = true
                this.getAddTransTargetList(this.landmarkForm);
            },
            //获取新增标的的列表请求---弹框
            getAddTransTargetList(params) {
                let formTest = {};
                if(this.targetNo){
                  params.targetNo = encodeURIComponent(this.targetNo);
                }
                if (params == null) {
                    formTest = this.formTest;
                    formTest["page"] = this.newlyAddedPages; //当前页码
                    formTest["rows"] = this.newlyAddedRows; //最大条数
                    formTest["status"] = "trans_status-001"; // 录件
                    console.log(formTest);
                } else {
                    formTest = params;
                    formTest["page"] = this.newlyAddedPages; //当前页码
                    formTest["rows"] = this.newlyAddedRows; //最大条数
                    formTest["status"] = "trans_status-001"; // 录件
                }
                this.$get(
                    this.$API.EPF_TRADE.TARGET.TARGET_LIST,
                    formTest
                ).then(res => {
                    if (res.code == "0") {
                        this.landmarkInfoData = res.pager.results; //table容器赋值
                        this.landmarkInfoRows = res.pager.pageSize; //最大条数赋值
                        this.landmarkInfoPages = res.pager.pageNo; //当前页码赋值
                        this.landmarkInfototalPage = res.pager.totalRecord; //总条数赋值
                    } else {
                        this.$message.error(res.msg); //失败
                        return;
                    }
                });
            },
            // 弹框标的信息--分页
            handleSizeChangelandmarkInfo(val) {
                this.landmarkForm.rows = val
                this.getAddTransTargetList(this.landmarkForm)
            },
            // 弹框标的信息--分页
            handleCurrentChangelandmarkInfo(val) {
                this.landmarkForm.page = val
                this.getAddTransTargetList(this.landmarkForm)
            },
            // 弹框标的信息--查询
            conditionQuerylandmarkInfo() {
                this.getAddTransTargetList(this.landmarkForm)
            },
            // 弹框标的信息--重置
            resetlandmarkInfo() {
                this.landmarkForm.targetNo = '';
                this.landmarkForm.tradingCenter = '';
                this.landmarkForm.insertUser = '';
                this.targetNo = "";
                this.getAddTransTargetList(this.landmarkForm);
            },
            //新增银行的列表确定
            surelandmarkInfo(val) {
                //新增标的确认按钮
                let targetId = [];
                for (let i = 0; i < this.subjectTemporaryList.length; i++) {
                    targetId.push(this.subjectTemporaryList[i].id);
                }
                this.targetIds = targetId.join(","); //标的id
                this.landmarkInfo = this.subjectTemporaryList; //赋值给列表
                this.landMarkDialogVisible = false; //关闭
                this.subjectTemporaryList = []; //初始化为空
            },
            //获取新增银行的列表请求
            bankAdd() {
                this.bankDialogVisible = true
                let prams = {page: this.newBankPages, rows: this.newBankRows}
                this.getAddTransBankList(prams);
            },
            //获取新增银行的列表请求---弹框
            getAddTransBankList() {
                let bankTest = this.newAddBankTest;
                bankTest["page"] = this.newBankPages; //当前页码
                bankTest["rows"] = this.newBankRows; //最大条数
                this.$get(this.$API.EPF_TRADE.NOTICE.BANK_LIST, bankTest).then(
                    res => {
                        if (res.code == "0") {
                            this.bankData = res.pager.results;
                            this.newBankRows = res.pager.pageSize; //最大条数赋值
                            this.newBankPages = res.pager.totalPage; //当前页码赋值
                            this.newBanktotalPage = res.pager.totalRecord; //总条数赋值
                        } else {
                            this.$message.error(res.msg); //失败
                            return;
                        }
                    }
                );
            },
            // 弹框银行信息--分页
            handleSizeChangeNewBank(val) {
                let prams = {page: this.newBankPages, rows: val}
                this.getAddTransBankList(prams); //新增银行信息列表请求
            },
            // 弹框银行信息--分页
            handleCurrentChangeNewBank(val) {
                let prams = {page: val, rows: this.newBankRows}
                this.getAddTransBankList(prams); //新增银行信息列表请求
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            upLoadClick(index, tid) {
                this.tid = tid;
                cupLoadClickonsole.log("tid:", tid);
            },
            //表单附件上传方法
            Upload_File(files) {
                //公告附件上传
                const file = files.file;
                const formData = new FormData();
                formData.append("files", file);
                formData.append("belong", this.$route.query.id); //传递对象ID
                formData.append("pId", this.tid); //传递tid
                this.flie_Upload_Fun(formData, files, file);

            },
            flie_Upload_Fun(formData, files, file, count) {
                //公告附件上传方法
                const than = this;
                this.$useAppend(this.$API.EPF_ADMIN.DOCUMENT.UPLOAD, formData).then(res => {
                    console.log("这是公告附件上传返回", res);
                    if (res.state != "SUCCESS") {
                        if (count == "first") {
                            //第一张上传失败
                            than.TargetUp.entrustFirstUpload = true;
                            return null;
                        }
                        than.$message.error("上传出错咯");
                        return null;
                    }
                    if (!than.TargetUp.pId) {
                        than.TargetUp.pId = res.data[0].pId;
                        than.ruleForm.fileTemplateCode = than.noticeCode; //传递code
                        than.ruleForm.pId = than.tableData[0].tid;
                    }
                    if (than.TargetUp.pId && !than.TargetUp.entrustFirstUpload) {
                        // than.$refs.additionalRef.submit()
                    }
                    than.enclosureId.push(res.data[0].id);
                    files.onSuccess(res);
                });
            },
            // 删除附件
            delFile(index, eid, id) {
                let that = this;
                let url = that.$API.DOCUMENT.FOLDER
                this.$post(url, {id:id,fdId:eid}, res => {
                    if (res.state == "SUCCESS") {
                        this.tableData[index].files = [];
                        this.tableData[index].tsize = 0;
                    }
                });
                this.tableData[index].files = [];
                this.tableData[index].tsize = 0;
            },
            // 下载文件
            downFile(id) {
                window.open(this.baseUrl + id, '_self');
            },

            //获取新增标的列表请求
            getAddTransTargetListByID(id) {
                this.$get(
                    this.$API.EPF_TRADE.NOTICE.NOTICE_ID,
                    {id: id}
                ).then(res => {
                    if (res.code == "0") {
                        this.landmarkInfo = res.pager.results; //table容器赋值
                        let targetId = [];
                        for (let i = 0; i < this.landmarkInfo.length; i++) {
                            targetId.push(this.landmarkInfo[i].id);
                        }
                        this.targetIds = targetId.join(","); //银行ids
                    } else {
                        this.$message.error(res.msg); //失败
                        return;
                    }
                });
            },
            //获取银行的列表请求
            getAddTransBankListByID(id) {
                this.$get(this.$API.EPF_TRADE.NOTICE.LIST_ID, {id: id}).then(
                    res => {
                        if (res.code == "0") {
                            this.bankLists = res.pager.results;
                            let bankId = [];
                            for (let i = 0; i < this.bankLists.length; i++) {
                                bankId.push(this.bankLists[i].accountId);
                            }
                            console.log(this.bankLists);
                            this.bankIds = bankId.join(","); //银行ids
                        } else {
                            this.$message.error(res.msg); //失败
                            return;
                        }
                    }
                );
            },
        },
        computed: {
            newRender: function () {
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

        .publish_main_cont_table {
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

  .operone {
    margin-right: 200px;
  }

  .line {
    text-align: center;
  }

  .oper {
    float: right;
    font-weight: normal;
  }

  .oper span {
    display: inline-block;
    width: 80px;
    height: 32px;
    background-color: #ffa000;
    border-radius: 2px;
    margin-right: 16px;
    text-align: center;
    line-height: 36px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .oper span:nth-child(2) {
    border: solid 1px #d3d4d6;
    color: #606266;
    background-color: #fff;
  }

 

  .deltext {
    color: #666;
  }

  .reset {
    display: inline-block;
    width: 80px;
    height: 32px;
    background-color: #fff;
    border: solid 1px #d3d4d6;
    border-radius: 2px;
    margin-right: 16px;
    text-align: center;
    line-height: 36px;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
  }

  .filter_wrap .fifthstep .operfirst .prevstep[data-v-51d7018a] {
    border-color: #ffa000;
    background-color: #fff;
    color: #ffa000;
  }

  .filter_wrap .dsDetailInfo_box .publish_main_cont_table .height10 {
    height: 510px;
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
</style>
<style scoped>

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
  }

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
