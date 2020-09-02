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
                    <el-form-item label="公告标题：" prop="title" required>
                      <el-input
                        v-model="ruleForm.title"
                        maxlength="50"
                        placeholder="请输入公告标题, 例如济国市国有建设用地二级市场"
                        style="width:100%;"
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告日期：" prop="noticeDate" required>
                      <el-date-picker
                        v-model="ruleForm.noticeDate"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期时间"
                        style="width:100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告类型：" prop="noticeType" required>
                      <el-select :disabled="true"
                                 v-model="ruleForm.noticeType"
                                 placeholder="请选择"
                                 style="width:100%;"
                      >
                        <el-option label="变更公告" value="change_notice"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="公告内容：" style="width:170%;" required>
                      <div style="margin:0; width: 100%;">
                        <editor class="editor" v-model="info" :info="info" @onKeyUp="onKeyUp"></editor>
                        
                      </div>
                    </el-form-item>
                    <el-form-item>
                       <div style="margin:0px;width:max-content">提示：您已输入{{infoLength?infoLength:0}}个字，还可输入{{2000-infoLength}}个字。</div>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">标的信息</h2>
                <div class="oper" style="line-height:56px;">
                  <!-- <span type="danger" @click="landMarkDialogVisible = true">新增</span>
                  <span type="danger" class="del">删除</span> -->
                </div>
              </div>
              <!-- 标的信息 -->
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="landmarkInfoData"
                    style="width: 100%,"
                    border
                  >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="targetNo" label="标的编号" align="center"></el-table-column>
                    <el-table-column prop="beginPrice" label="起始价(万元)" align="center"></el-table-column>
                    <el-table-column prop="amount" label="保证金" align="center"></el-table-column>
                    <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                    <el-table-column prop="insertUser" label="经办人" align="center"></el-table-column>
                    <el-table-column label="操作" width="240" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="updateRow(scope.$index)"
                          type="text"
                          size="small"
                          :disabled="isLoading"
                        >修改
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="text-align:right;margin:22px 0px;">
                    <el-pagination
                      layout="total, prev, pager, next, sizes, jumper"
                      :page-sizes="[2,5,10]"
                      :page-size="mark_pageSize"
                      :total="landmarkInfo.length"
                      @current-change="mark_handleCurrentChange"
                      @size-change="mark_handleSizeChange"
                      background
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">银行信息</h2>
                <div class="oper" style="line-height:56px;">
                </div>
              </div>
              <!-- 银行信息 -->
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="bankData"
                    style="width: 100%,"
                    border
                  >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="orgName" label="单位名称" width="210" align="center"></el-table-column>
                    <el-table-column prop="bankArea" label="银行区域" width="120" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}-{{scope.row.cantonCityName}}-{{scope.row.cantonAreaName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="银行名称" width="240" align="center"></el-table-column>
                    <el-table-column prop="currencyName" label="币种" width="120" align="center"></el-table-column>
                    <el-table-column prop="account" label="账号" align="center"></el-table-column>
                    <el-table-column prop="bankState" label="类型" width="120" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.bankState==1">境外银行</span>
                        <span v-else>境内银行</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="240" align="center"></el-table-column>
                  </el-table>
                  <div style="text-align:right;margin:22px 0px;">
                    <el-pagination
                      layout="total, prev, pager, next, sizes, jumper"
                      :page-sizes="[2,5,10]"
                      :page-size="bank_pageSize"
                      :total="bankLists.length"
                      @current-change="bank_handleCurrentChange"
                      @size-change="bank_handleSizeChange"
                      background
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="operfirst" style="margin-left:0;margin-top:20px;">
                <el-button type="danger" @click="submitForm('ruleForm')">下一步</el-button>
              </div>
            </div>

            <div class="fifthstep" v-if="active===1">
              <EPF-switchTitle titles_h='公告附件清单' padding='0' background='#fff' :shutOff='false'>
                <EPF-annexList
                  v-if="belong"
                  @isAux='isAuxFun'
                  :tableType='false'
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
                <el-button type="danger" @click="saveNotice('save_bg')">保存</el-button>
                <el-button type="danger" @click="saveNotice('submit_bg')">提交</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!--标的时间弹窗修改-->
    <el-dialog title="交易时间信息修改" :visible.sync="targetTimeDia" width="70%">
      <el-form
        :model="targetTime"
        :rules="rules2"
        ref="targetTime"
        label-width="175px"
        class="demo-ruleForm"
      >
          <el-row>
            <el-col :span="12">
              <el-form-item label="公告开始时间：" prop="beginNoticeTime">
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.beginNoticeTime"
                  type="datetime"
                  align="right"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="竞买申请开始时间：" prop="beginApplyTime">
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.beginApplyTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="isShow">
            <el-col :span="12">
              <el-form-item label="挂牌开始时间：" prop="beginFocusTime" >
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.beginFocusTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="挂牌截止时间：" prop="endFocusTime">
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.endFocusTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="保证金缴纳截止时间：" prop="endEarnestTime">
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.endEarnestTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="限时竞价开始时间：" prop="beginLimitTime" v-if="isShow">
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.beginLimitTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="拍卖开始时间：" prop="beginLimitTime" v-else>
                <el-date-picker
                  :editable="false"
                  v-model="targetTime.beginLimitTime"
                  type="datetime"
                  placeholder="选择日期"
                  style="width:400px;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                <div style="text-align: center">
                  <el-button @click="targetTimeTrue()" type="primary" plain>确 定</el-button>
                  <el-button @click="targetTimeTrue('hide')" style="margin-left: 2em" type="success" plain>取 消</el-button>
                </div>
              </el-col>
          </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
    import editor from "@/components/editor/editor";
    export default {
        name: "notice",
        data() {
            return {
                tableNmae: ['序号', '文件名称', '文件', '操作'],//表头名称
                belong: '',//请求参数 - 附件所属标识（必传）
                areaCode: '',//请求参数 - 区域标识（必传）
                fileType: ['rar', 'zip', 'doc', 'docx', 'pdf', 'jpg'],
                massif: 'NOTICE',

                bankIds: "",
                targetIds: "",
                options: [
                    {
                        value: "选项1",
                        label: "普通公告"
                    },
                    {
                        value: "选项2",
                        label: "变更公告"
                    }
                ],
                value: "选项1",

                infoLength:"",// 富文本编辑器长度
                info: "", // 富文本编辑器双向绑定的内容
                isViewHtml: true, //默认编辑

                landMarkDialogVisible: false,
                bankDialogVisible: false,

                fileList: [],
                defaultProps: {
                    children: "childMenu",
                    label: "menuname"
                },

                // isShowProvince: true,
                ruleFormSubmit: {},
                active: 0,
                currentPage2: 1,
                currentPage: 1,
                // pageSize: 1,
                // pageNo:1,
                landmarkInfototalPage: 1,
                newlyAddedRows: 5, //新增标的显示条数
                newlyAddedPages: 1, //新增标的页码
                formTest: {
                    //新增标的筛选条件
                    targetNo: "", //
                    tradingCenter: "",
                    insertUser: ""
                },
                landbankInfototalPage: 1,
                newBankRows: 5, //新增银行显示条数
                newBankPages: 1, //新增银行的页码
                newAddBankTest: {}, //新增银行参数容器

                targetsNum: 1, //条数
                newlyPages: 1, //标的信息页码
                newlyedRows: 5, //标的信息显示条数
                landmarkInfo: [], //标的table容器
                subjectTemporaryList: [], //标的临时存放容器
                bankTemporaryList: [], //银行临时存放容器
                bankLists: [], //银行信息容器
                totalRecord: 0,

                //标的信息页码
                mark_totalRecord: 1,
                mark_pageSize: 2,
                mark_currentPage: 1,

                //银行信息页码
                bank_totalRecord: 1,
                bank_pageSize: 2,
                bank_currentPage: 1,

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

                landmarkInfoData: [],
                bankInfo: [],
                bankData: [],

                txtVal: 0,
                ruleForm: {
                    noticeId: "", //父公告ID
                    noticeNo: "", //公告编号
                    title: "", //公告名称、标题
                    noticeDate: "", //公告日期
                    noticeType: "change_notice", //公告类型
                    fileTemplateCode: "", //附件模板标识
                    content: "", //公告内容
                    publishUserId: "", //发布人id
                    publishDate: "", // 发布日期
                    actProiId: "", //工作流ID
                    pId: "",
                    noticeNo1: "",
                    noticeNo2: "",
                    noticeNo3: "",
                },
                TargetUp: {
                    pId: null,
                    entrustFirstUpload: true,
                    belong: null
                },
                noticeCode: "", //附件标识
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
                        { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,50,'长度在50字符以内（注意若是汉字，1个汉字是2个字符）')}  },
                        {
                          pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
                          message: "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
                        }
                    ],
                    noticeDate: [
                        {
                            // type: "date",
                            required: true,
                            message: "请选择公告日期",
                            trigger: "change"
                        }
                    ],
                    noticeType: [{required: true, message: "公告类型不能为空", trigger: "blur"}]
                },
                rules2: {
                    beginNoticeTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ],
                    beginApplyTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ],
                    beginFocusTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ],
                    endFocusTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ],
                    endEarnestTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ],
                    beginLimitTime: [
                        {
                            required: true,
                            message: "请选择日期",
                            trigger: "blur"
                        }
                    ]
                },
                labelPosition: "right",
                //附件模板数据
                tableData: [],
                tid: "",
                isAuxFlag: false, // ----
                targetTimeDia: false, //交易时间信息修改弹窗
                isLoading: false,  //修改按钮的禁用与启用
                targetTime: {
                    beginNoticeTime: '',
                    beginApplyTime: '',
                    beginFocusTime: '',
                    endFocusTime: '',
                    endEarnestTime: '',
                    beginLimitTime: '',
                },  //标的时间对象
                targetTimeList: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                isShow: false,
                index: -1,
            };
        },
        components: {
            editor
        },
        created() {
            this.$get(this.$API.EPF_TRANSFER.GRATER_ID, {}).then(res => {
                this.ruleForm["id"] = res.id; //创建对象ID
                //设置附件ID
                this.belong = res.id;
                //设置附件ID的存储字段
                this.ruleForm.enclosureId = res.id

                this.ruleForm.noticeId = this.$route.query.id;
                this.areaCode = "";
            });
            // this.setnoticeNo2();
            this.getAddTransTargetList(this.$route.query.id); //新增标的信息列表请求
            this.getAddTransBankList(this.$route.query.id); //新增银行信息列表请求
            debugger
            this.$get(this.$API.EPF_TRADE.NOTICE.GET_NOTICE, {id: this.$route.query.id}).then(res => {
                if (res.code == "0") {
                    console.log(res);
                    let ruleForm = res.map.map.transNotice;
                    // --公告编号：
                    let NO = ruleForm.noticeNo
                    // 贵自然资告字[2019]0002号
                    //截取出贵
                    this.ruleForm['noticeNo1'] = NO.substring(0, 1)
                    //截取出2019
                    this.ruleForm['noticeNo2'] = NO.substring(NO.indexOf('[') + 1, NO.indexOf(']'))
                    //截取出0002
                    this.ruleForm['noticeNo3'] = NO.substring(NO.indexOf(']') + 1, NO.indexOf('号'))

                    // --公告标题：
                    this.ruleForm.title = ruleForm.title
                    // --公告日期
                    this.ruleForm.noticeDate = ruleForm.noticeDate

                }
            });

        },
        methods: {
          onKeyUp(e, editor){
            let text = editor.activeEditor.getContent() 
            let str  =  text.replace(/<[^>]+>/g, "") 
            this.infoLength = str.length
          },
            //修改标的时间选择确认方法
            targetTimeTrue(type) {
                debugger
                if(type == 'hide'){
                    //弹窗消失
                    this.targetTimeDia = false;
                }else{
                    this.$refs['targetTime'].validate((valid) => {
                        if (valid) {
                            //更新所修改的内容
                            this.targetTimeList[this.index] = this.targetTime;
                            //弹窗消失
                            this.targetTimeDia = false;
                        } else {
                            // 失败
                            this.$message.error("请先检查数据的完整性！");
                            return false;
                        }
                    });
                }
            },
            //变更公告点击修改标的时间的方法
            updateRow(index) {
                debugger
                if (this.isLoading) {
                    this.$message.error('请等待上一次操作完成，再点击修改！');
                    return;
                }
                //禁用按钮
                this.isLoading = true;
                //显示弹窗
                this.targetTimeDia = true;
                //加载数据
                this.targetTime = this.targetTimeList[index];
                //把点击的index保存起来
                this.index = index;
                //判断是否显示挂牌时间
                if (this.targetTime.beginFocusTime) {
                    this.isShow = true;
                }
                //启用按钮
                this.isLoading = false;
            },
            //生成随机数据
            setnoticeNo2() {
                //获取戳
                let nowDate = new Date();
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                let timestamp = (new Date()).valueOf()
                this.ruleForm['noticeNo2'] = nowDate.getFullYear();
                // 济自然资告字[2019]11号
            },
            // 获取附件清单数据检验结果
            isAuxFun(value) {
                this.isAuxFlag = value;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
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
                    bankId.push(this.bankTemporaryList[i].id);
                }
                console.log(this.bankLists);

                this.bankIds = bankId.join(","); //银行ids
                this.bankDialogVisible = false; //关闭
                this.bankTemporaryList = []; //初始化为空
            },
            surelandmarkInfo(val) {
                //新增标的确认按钮
                let targetId = [];
                for (let i = 0; i < this.subjectTemporaryList.length; i++) {
                    targetId.push(this.subjectTemporaryList[i].id);
                }
                this.targetIds = targetId.join(","); //标的id
                console.log(this.targetIds);
                this.landmarkInfo = this.subjectTemporaryList; //赋值给列表

                this.landMarkDialogVisible = false; //关闭
                this.subjectTemporaryList = []; //初始化为空
            },
            init(params) {
                this.$get(this.$API.EPF_TRADE.NOTICE.NOTICE_LIST, params).then(
                    res => {
                        this.announcementData = res.pager.results;
                        this.pageNo = res.pager.pageNo;
                        this.pageSize = res.pager.pageSize;
                        this.totalPage = res.pager.totalPage;
                        this.totalRecord = res.pager.totalRecord;
                    }
                );
            },

            //获取新增标的列表请求
            getAddTransTargetList(id) {
                this.$get(
                    this.$API.EPF_TRADE.NOTICE.NOTICE_ID,
                    {id: id}
                ).then(res => {
                    if (res.code == "0") {
                        debugger
                        this.landmarkInfoData = res.pager.results; //table容器赋值

                        //新增标的确认按钮
                        let targetId = [];
                        for (let i = 0; i < this.landmarkInfoData.length; i++) {
                            targetId.push(this.landmarkInfoData[i].id);
                        }
                        this.targetIds = targetId.join(","); //标的id
                        console.log(this.targetIds);
                        //设置需要修改的标的时间数据
                        //通过ID去查询表的标的信息
                        for (let i = 0; i < this.landmarkInfoData.length; i++) {
                            let id = this.landmarkInfoData[i].id;
                            this.$get(
                                this.$API.EPF_TRADE.NOTICE.TARGET_TIME,
                                {targetId: id, type: 1}
                            ).then(res => {
                                res.map.transTargetEntity.noticeId = this.ruleForm.id;
                                res.map.transTargetEntity.targetId = id;
                                this.targetTimeList.push(res.map.transTargetEntity);
                            });
                        }
                    } else {
                        this.$message.error(res.msg); //失败
                        return;
                    }
                });
            },
            //获取银行的列表请求
            getAddTransBankList(id) {
                this.$get(this.$API.EPF_TRADE.NOTICE.LIST_ID, {id: id}).then(
                    res => {
                        if (res.code == "0") {
                            debugger
                            this.bankData = res.pager.results;

                            //新增银行确认按钮
                            let bankId = [];

                            for (let i = 0; i < this.bankData.length; i++) {
                                bankId.push(this.bankData[i].accountId);
                            }

                            this.bankIds = bankId.join(","); //银行ids

                        } else {
                            this.$message.error(res.msg); //失败
                            return;
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
                        let _this = this;
                        if (this.landmarkInfoData.length == 0) {
                            this.$message.error("请选择标的！"); //失败
                            return false;
                        }
                        if (this.bankData.length == 0) {
                            this.$message.error("请选择银行！"); //失败
                            return false;
                        }

                        if (!this.ruleForm.noticeNo2) {
                            this.$message.error("请输入年份！"); //失败
                            return false;
                        }

                        if (!this.ruleForm.noticeNo3) {
                            this.$message.error("请输入编号！"); //失败
                            return false;
                        }
                        //拼接公告编号
                        this.ruleForm.noticeNo = this.ruleForm.noticeNo1 + '自然资告字[' + this.ruleForm.noticeNo2 + ']' + this.ruleForm.noticeNo3 + '号';

                        //调用验证唯一接口
                        this.$post(this.$API.EPF_TRADE.NOTICE.CKECK_NOTICE, {
                            no: _this.ruleForm.noticeNo,
                            id: "",
                        }).then(res => {
                            if (res.code == '0') {
                                if (res.status || res.status == 'true') {
                                    _this.$message.error("公告编号重复，请重新输入！！")
                                    return false;
                                } else {
                                    //公告编号没有重复
                                    _this.$refs[formName].validate(valid => {
                                        if (valid) {
                                            // alert("submit!");
                                            _this.next();
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

            //********************************分页区*****/
            handleSizeChange(val) {
                //标的信息显示条数
                this.newlyedRows = val;
            },
            handleCurrentChange(val) {
                //标的信息页码
                this.newlyPages = val;
            },
            handleSizeChange1(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
            },
            handleSizeChange3(val) {
                //新增标的信息显示条数
                this.newlyAddedRows = val;
                this.getAddTransTargetList();
            },
            handleCurrentChange3(val) {
                //新增标的信息页码
                this.newlyAddedPages = val;
                this.getAddTransTargetList();
            },
            handleSizeChange4(val) {
                //新增银行信息显示条数
                this.newBankRows = val;
                this.getAddTransBankList();
            },
            handleCurrentChange4(val) {
                //新增银行信息页码
                this.newBankPages = val;
                this.getAddTransBankList();
            },
            //标的信息分页
            mark_handleCurrentChange: function (cpage) {
                this.$data.mark_currentPage = cpage;
            },
            mark_handleSizeChange: function (psize) {
                this.$data.mark_pageSize = psize;
                this.mark_currentPage = 1;
            },
            //银行信息分页
            bank_handleCurrentChange: function (cpage) {
                this.$data.bank_currentPage = cpage;
            },
            bank_handleSizeChange: function (psize) {
                this.$data.bank_pageSize = psize;
                this.bank_currentPage = 1;
            },
            //********************************分页区*****/

            getIDs: function (array) {
                var ids = "";
                for (var i = 0; i < array.length; i++) {
                    ids += array[i].id;
                    if (i != array.length - 1) {
                        ids += ",";
                    }
                }
                return ids;
            },
            //保存、提交公告
            saveNotice(type) {
                if (!this.isAuxFlag) {
                    this.$message.error('请检查您的附件清单信息是否上传完整！');
                    return;
                }
                this.ruleForm.content = this.info.content;
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
                    this.ruleFormSubmit = {
                        transNotice: this.ruleForm,
                        bankIds: this.bankIds,
                        targetIds: this.targetIds,
                        jsonVars: jsonVars
                    };

                    //  let url = "api/epf-trade/admin/transnotice/editTransNotice?function="+type;  // 修改接口地址
                    let url = "/epf-trade/admin/transnotice/addTransNotice?function=" + type; // 新增接口地址
                    let url2 = "/epf-trade/admin/transtarget/saveTransTargetRel";   //标的扩展表新增接口

                    this.$useAppend(url, {
                        noticeJson: this.ruleFormSubmit
                    }).then(res => {
                        console.log('请求返回：', res)
                        if (res.code == 0) {
                            this.$useAppend(url2, {
                                transTargetRel: this.targetTimeList
                            }).then(res => {
                                console.log('请求返回：', res)
                                if (res.code == 0) {
                                    //保存/提交成功跳转列表页
                                    this.$message.success("添加成功");
                                    let routes = '/system/trade/land/views/notice/add'
                                    this.$bus.$emit('close_tab',routes)
                                    let routerPath = "/system/trade/land/views/notice/index";
                                    this.$router.push({path:routerPath});
                                } else {
                                    this.$message.error(res.msg);
                                }
                            });
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                });
            },
            //数组去重方法
            unique(arr) {
                const res = new Map();
                return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
            },
            delBank(row) {
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
            delLandMark(row) {
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
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            upLoadClick(index, tid) {
                this.tid = tid;
                console.log("tid:", tid);
            },
            //表单附件上传方法
            Upload_File(files) {
                //公告附件上传
                const file = files.file;
                const formData = new FormData();
                formData.append("files", file);
                formData.append("belong", this.belong); //传递对象ID
                console.log("对象ID--", this.belong, "tid--", this.tableData.tid);
                if (this.TargetUp.pId) {
                    formData.append("pId", this.tableData[0].tid); //传递tid
                    this.flie_Upload_Fun(formData, files, file);
                    return;
                }
                if (!this.TargetUp.pId && this.TargetUp.entrustFirstUpload) {
                    console.log("第一张图片上传");
                    formData.append("pId", this.tableData[0].tid); //传递tid
                    this.TargetUp.entrustFirstUpload = false;
                    this.flie_Upload_Fun(formData, files, file, "first");
                    return;
                }
                if (this.TargetUp.pId && !this.TargetUp.entrustFirstUpload) {
                    this.flie_Upload_Fun(formData, files, file);
                    return;
                }
            },
            flie_Upload_Fun(formData, files, file, count) {
                //公告附件上传方法
                const than = this;
                this.$useAppend("/epf-document/document/upload", formData).then(res => {
                    console.log("这是公告附件上传返回", res)
                    if (res.state != "SUCCESS") {
                        if (count == "first") {
                            //第一张上传失败
                            than.TargetUp.entrustFirstUpload = true
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
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            entrustHandleRemove(file, fileList) {
                console.log(file, fileList);
            },
            photoUploadSuccess(res, file, fileList) {
                console.log(this.tableData, this.fileIndex);
                console.log("触发成功", this.tableData[this.fileIndex]);
                let fileObject = {
                    fname: res.data[0].name,
                    fid: res.data[0].id,
                    fsize: res.data[0].docSize,
                    ftype: res.data[0].extName
                };
                if (this.tableData[this.fileIndex].files.length == 0) {
                    this.tableData[this.fileIndex].files.push(fileObject);
                } else {
                    this.tableData[this.fileIndex].files[0] = fileObject;
                }
                this.ruleForm[this.fileListName] = fileList;
                for (let i = 0; i < this.ruleForm[this.fileListName].length; i++) {
                    this.ruleForm[this.fileListName][i].url =
                        this.baseUrl + this.additionalId[i];
                }
            },
            //修改
            handleClick(val) {
            },
            handleSubmit() {
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            }
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
        margin-top: 30px;
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

  .EntrustTra_main_cont .el-upload-list {
    display: none !important;
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
