<template>
    <epf-container title="银行管理">
        <el-container
            @mousemove.native="draping"
            @mouseup.native="endDrap"
            @mouseleave.native="endDrap"
            >
            <el-aside :width="asideWidth + 'px'" style="padding-top:10px;padding-left:20px;">
                <el-container
                style="border:1px solid rgb(224, 224, 224);border-right:none;position: relative;"
                >
                <div class="drapLine" @mousedown="startDrap"></div>
                <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">单位区域/单位名称</el-header>
                <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
                    <el-input
                        placeholder="请输入内容"
                        v-model="searchData"
                        size="mini"
                        class="input-with-select noSelect"
                        clearable
                        highlight-current
                    >
                        <el-button slot="append" @click="searchList">搜索</el-button>
                    </el-input>
                </div>
                <el-main :style="{'height':bankListHeight + 'px'}">
                    <el-tree
                    class="filter-tree noSelect bankList"
                    :data="bankListData"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="bankList"
                    @node-click="handleNodeClick"
                    ></el-tree>
                </el-main>
                </el-container>
            </el-aside>
            <el-main style="padding-top:11px;padding-right:20px;margin-left:15px;">
                <el-container>
                <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title bankTopTab">
                    银行管理
                </el-header>
                <div class="bankfilter noSelect">
                    <div style="min-width:100px;height:28px;">
                    <span class="filter_title">银行名称 :</span>
                    </div>
                    <div style="min-width:160px;height:28px;">
                    <el-input v-model="filterbank.bankName" size="mini" placeholder="请输入银行名称"></el-input>
                    </div>

                    <div style="min-width:100px;height:28px;">
                    <span class="filter_title">银行简称 :</span>
                    </div>
                    <!-- <div style="min-width:160px;height:28px;">
                    <selectInput v-model="filterbank.bankShort" :size="'mini'" :groupCode="'bank_short_name'" :default="''"></selectInput>
                    </div> -->
                    <el-select v-model="filterbank.bankShort" size="mini"  placeholder="请选择银行简称">
                        <el-option v-for="item in dictionary.bank_short_name" :ref="item.zhCn"
                            :id="item.id" :dictKey="item.dictKey" :dictId="item.id" :label="item.zhCn" :value="item.dictKey" :key="item.dictKey">
                        </el-option>
                    </el-select>
                    <div style="min-width:20px"></div>
                    <div style="min-width:270px">
                    <el-button size="mini" @click="queryDate">查询</el-button>
                    <el-button size="mini" @click="resetDate">重置</el-button>
                    <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                        <el-button v-if="button.resourceId=='bank_add'"  size="mini"  @click="handleEdit('add','sizeForm')">创建银行</el-button>
                    </span>
                    </div>
                </div>
                <el-main :style="{'height':bankListHeight + 'px','padding': '0px',}">
                    <el-table :data="tableData" border style="width: 100%" :height="boxHeight - 270">
                    <el-table-column prop="order" label="序号" width="80">
                        <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="no" label="编号" width="100"></el-table-column>
                    <el-table-column prop="name" label="银行名称" width="300">
                        <template slot-scope="scope">
                        <span @click="seeBankInfo(scope.row)" class="bankTitle">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bankShortName" label="银行简称" width="120"></el-table-column>
                    <el-table-column prop="address" label="行政区域" width="300"></el-table-column>
                    <el-table-column prop="contact" label="联系人" width="120"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                        <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                        <el-button v-if="button.resourceId=='bank_edit'" 
                            @click="handleEdit('editor','sizeForm',scope.$index, scope.row)"
                            type="text"
                            size="small"
                        >修改</el-button>
                        <el-button v-if="button.resourceId=='bank_delete'"  type="text" size="small" @click="del(scope.row)">删除</el-button>
                        <el-button v-if="button.resourceId=='bank_manage'"  type="text" size="small" @click="accountManageOpen(scope.row)">账号管理</el-button>
                        </span>
                        </template>
                    </el-table-column>
                    </el-table>
                    <div style="text-align:right;margin:8px 0px;margin-top:10px;">
                    <el-pagination
                        background
                        layout="prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10, 15, 20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                        :page-size="pageSize"
                        :current-page="pageNo"
                    ></el-pagination>
                    </div>
                </el-main>
                </el-container>
            </el-main>
        </el-container>
        <!-- 新增/编辑弹窗 -->
        <el-dialog
            :title="dialogTitle"
            width="700px"
            :visible.sync="editorPopup"
            :append-to-body="true"
            top="10%"
            >
            <div class="middleBox">
                <el-form :model="sizeForm" :rules="rules" ref="sizeForm" label-width="80px" size="small">
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="银行名称" prop="name">
                        <el-input v-model="sizeForm.name" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="编号" prop="no">
                        <el-input v-model="sizeForm.no" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="sizeForm.phone" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="权属人" prop="contact">
                        <el-input v-model="sizeForm.contact" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <el-col :span="10">
                        <el-form-item label="行政区" prop="cantonAreaName">
                        <el-select
                            v-model="sizeForm.cantonProvinceName"
                            placeholder="请选择省"
                            @change="province(dictionary.administrative_regions,sizeForm.cantonProvinceName,$event)"
                        >
                            <el-option
                            v-for="(item,index) in dictionary.administrative_regions"
                            :ref="item.regionName"
                            :id="item.id"
                            :dictKey="item.regionCode"
                            :label="item.regionName"
                            :value="item.regionName"
                            :key="index"
                            ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item prop="cantonCity" class="canton_Regions" style="margin-left:0;">
                        <el-select
                            v-model="sizeForm.cantonCityName"
                            placeholder="请选择市"
                            @change="city(dictionary.cantonCity,sizeForm.cantonCityName,$event)"
                        >
                            <el-option
                            v-for="(item,index) in dictionary.cantonCity"
                            :ref="item.regionName"
                            :id="item.id"
                            :dictKey="item.regionCode"
                            :label="item.regionName"
                            :value="item.regionName"
                            :key="index"
                            ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item prop="cantonArea" class="canton_Regions">
                        <el-select

                            v-model="sizeForm.cantonAreaName"
                            placeholder="请选择区/县"
                            @change="area(dictionary.cantonAreaName,sizeForm.cantonAreaName,$event)"
                        >
                            <el-option
                            v-for="(item,index) in dictionary.cantonArea"
                            :ref="item.regionName"
                            :id="item.id"
                            :dictKey="item.regionCode"
                            :label="item.regionName"
                            :value="item.regionName"
                            :key="index"
                            ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="sizeForm.address" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="银行简称" prop="bankSimple">
                        <!-- <selectInput v-model="sizeForm.bankShort" :groupCode="'bank_short_name'" :default="''"></selectInput> -->
                        <el-select v-model="sizeForm.bankShort"   placeholder="请选择银行简称">
                        <el-option
                            v-for="(item,index) in dictionary.bank_short_name"
                            :ref="item.zhCn"
                            :id="item.id"
                            :dictKey="item.dictKey"
                            :label="item.zhCn"
                            :value="item.dictKey"
                            :key="index">
                        </el-option>
                        </el-select>

                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="logo图标" prop="imageUrl">
                        <el-upload
                        :class="sizeForm.logoSuccess?'avatar-uploader-success':'avatar-uploader'"
                        action="/api/epf-document/document/upload"
                        name="files"
                        :show-file-list="false"
                        :http-request="logoUploadFile"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img
                            v-if="sizeForm.imageUrl"
                            :src="prefix+sizeForm.imageUrl"
                            height="120px"
                            style="width:120px;border:1px solid #67C23A;background:#fff;border-radius:10px;"
                            class="avatar"
                        >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :resize="'none'" :rows="5" v-model="sizeForm.remark"></el-input>
                        <span
                        v-show="sizeForm.remark.length <= 300"
                        style="font-size:12px;float:right;padding-right:15px;"
                        >{{sizeForm.remark.length}}/300</span>
                    </el-form-item>
                    </el-col>
                </el-row>
                </el-form>
            </div>
            <div style="text-align:center;margin-top:10px;">
                <el-button size="mini" type="info" plain @click="editorPopup = false">取消</el-button>
                <el-button size="mini" type="success" @click="editorSubmit('sizeForm')">确定</el-button>
            </div>
        </el-dialog>

        <!-- 详情弹窗 -->
        <el-dialog
            title="查看银行"
            width="700px"
            :visible.sync="detail"
            :append-to-body="true"
            top="10%"
            >
            <div class="middleBox">
                <el-row>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">银行名称：</div>
                        <div>{{detailForm.name}}</div>
                    </el-col>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">编号：</div>
                        <div>{{detailForm.no}}</div>
                    </el-col>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">电话：</div>
                        <div>{{detailForm.phone}}</div>
                    </el-col>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">权属人：</div>
                        <div>{{detailForm.contact}}</div>
                    </el-col>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">行政区：</div>
                        <div>{{detailForm.cantonProvinceName}}-{{detailForm.cantonCityName}}-{{detailForm.cantonAreaName}}</div>
                    </el-col>
                    <el-col :span="12" class="detailCol">
                        <div class="detailLabel">银行简称：</div>
                        <div>{{detailForm.bankShortName}}</div>
                    </el-col>
                    <el-col :span="24" class="detailCol">
                        <div class="detailLabel">地址：</div>
                        <div>{{detailForm.address}}</div>
                    </el-col>
                    <el-col :span="24" class="detailCol">
                        <div class="detailLabel">备注：</div>
                        <div>{{detailForm.remark == ''?'无':detailForm.remark}}</div>
                    </el-col>
                    <el-col :span="24" class="detailCol" style="height:140px;">
                        <div class="detailLabel">logo图标：</div>
                        <img :src="prefix+detailForm.imageUrl" alt="" width="120px" height="120px">
                    </el-col>
                </el-row>
            </div>
            <div style="text-align:center;margin-top:10px;">
                <el-button size="mini" type="info" plain @click="detail = false">关闭</el-button>
            </div>
        </el-dialog>  
    </epf-container>
</template> 
<script>
export default {
    name:'bank',
    data(){
        return{
            searchData: "",
            drapOpen: false,
            asideWidth: "300", // 侧栏宽度
            startX: 0, //  开始拖拽时的位置
            startWidth: 300,
            bankListData: [],
            defaultProps: {
                children: "children",
                label: 'name'
            },
            // 输入的筛选条件
            filterbank: {
                bankName: "",
                bankShort: ""
            },
            tableData: [],
            orgId:"",//单位id 
            pageNo: 1, // 当前页
            pageSize: 5, // 当前每页条数
            totalPage: 1, // 总页数
            totalRecord: 1, // 总条数，
            //  编辑 表单
            sizeForm: {
                id:"",
                orgId:"",
                name: "",
                no: "",
                phone: "",
                contact: "",
                //省
                cantonProvince: "",
                cantonProvinceName: "",
                //市
                cantonCity: "",
                cantonCityName: "",
                //区
                cantonArea: "",
                cantonAreaName: "",
                address: "",
                imageUrl: "", //  图片上传成功图片地址
                logoSuccess: false, //  图片是否上传成功
                bankSimple: "",
                remark: "",
                bankShort:"",
                bankShortName:"",
            },
            // 详情数据
            detailForm: {},
            //  编辑 表单验证
            rules: {
                name: [
                { required: true, message: "请输入银行名称.", trigger: "blur" }
                ],
                no: [{ required: true, message: "请输入编号.", trigger: "blur" }],
                phone: [
                {
                    pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                    message: "您输入的手机号有误"
                }
                ],
                contact: [
                { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
                {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
                    message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
                }
                ],
                cantonAreaName: [{ min: 1, max: 40, message: "长度在 5 到 40个字符" }],
                cantonCity: [{ min: 1, max: 40, message: "长度在 5 到 40个字符" }],
                cantonArea: [{ min: 1, max: 40, message: "长度在 5 到 40个字符" }],
                address: [
                { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
                {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
                    message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
                }
                ],
                bankSimple: [
                { min: 1, max: 10, message: "长度在 1 到 10个字符" },
                {
                    pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
                    message: "只能输入中文、英文、数字."
                }
                ],
                remark: [{ max: 300, message: "内容不能超过300字." }]
            },
            editorPopup: false, //  控制编辑弹窗
            dialogTitle: "创建银行", //  弹窗标题
            dicRequest: ["bank_short_name"], //字典码请求
            dictionary: {
                //字典码结果
                bank_short_name:"",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: ""
            },
            dicNum: 0, //字典循环下标
            dicFinsh: false, //  接口请求完成
            detail: false, //  详情弹窗
            theme_BackgroundColor:'',
            theme_TextColor:'',
            prefix:'/api/epf-document/document/downloadById?id=',
            //按钮组、主题
            buttons:[],

        }
    },
    created() {
        this.getProvinceData()
        this.boxHeight = window.innerHeight - 250;
        this.buttons=JSON.parse(localStorage.getItem("bankManage"));
        this.loadTree();
        //初始化加载列表所有数据
        this.getTransBankList({
        page: this.pageNo,
        rows: this.pageSize
        });

        this.bankListHeight = window.innerHeight - 280;
        this.theme_BackgroundColor=localStorage.getItem("theme_BackgroundColor");
        this.theme_TextColor=localStorage.getItem("theme_TextColor");
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if ( item == "land_use") {
                this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,
                    { parentId: 0 ,code:item}
                ).then(res => {
                    resolve(res);
                });
                }else {
            this.$get(this.$API.EPF_TRADE.BANK.DICT_GROUP + item,
                {}
            ).then(res => {
                resolve(res);
            });
            }
        });
        return reqFun;
        });
        Promise.all(reqArr).then(res => {
        let dicArr = res.map(item => {
            let dicArr = item.dictionariesList.map(item => {
            return {
                dictKey: item.dictKey,
                zhCn: item.zhCn,
                id: item.id
            };
            });
            return dicArr;
        });

        for (let item in this.dictionary) {
            this.dictionary[item] = dicArr[this.dicNum];
            this.dicNum++;
        }

        this.dicFinsh = true;
        });
    },
    mounted(){
        this.$bus.$on('themChange',val => {
            this.theme_BackgroundColor = val.menuBackgroundColor
            this.theme_TextColor = val.textColor
        })
    },
    methods:{
        loadTree() {
            this.$get(this.$API.EPF_ADMIN.ORG.GET_ORG_TREE).then(res => {

                var dataList = JSON.parse(res.ztreeJson.replace(/'/g, '"'));
                console.log(dataList);
                this.bankListData=dataList;
            });
        },
        handleNodeClick(data){
            this.orgId=data.id
            var page=this.pageNo;
            var rows=this.pageSize;
            var filters={"orgId":this.orgId};
            this.getTransBankList({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        },
        queryDate(){
            var name =this.filterbank.bankName;
            var bankShort=this.filterbank.bankShort;
            console.log(bankShort);
            console.log(name);
            var filters={"orgId":this.orgId,"name":name,"bankShort":bankShort};
            this.getTransBankList({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        },
        resetDate(){
            // this.defaultValue = '123213'
            this.filterbank.bankShort = "";
            this.filterbank.bankName="";
            this.pageNo=1;
            this.pageSize=5;
            var page=this.pageNo;
            var rows=this.pageSize;
            var filters={"orgId":this.orgId};
            this.getTransBankList({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        },
        getTransBankList(params) {
            this.$get(this.$API.EPF_TRADE.NOTICE.GET_LIST, params).then(res => {
                if (res.code == "0") {
                this.pageNo = res.pager.pageNo;
                this.pageSize = res.pager.pageSize;
                this.totalPage = res.pager.totalPage;
                this.totalRecord = res.pager.totalRecord;
                this.tableData = res.pager.results;
                console.log(this.tableData);
                } else {
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        startDrap(event) {
            console.log(event.x);

            this.startX = event.x;
            this.drapOpen = true;
        },
        draping(event) {
            if (this.drapOpen) {
                let moveWidth = this.startWidth + event.x - this.startX;
                if (moveWidth < 300) {
                this.asideWidth = "300";
                return;
                }
                if (moveWidth > 1000) {
                this.asideWidth = "1000";
                return;
                }
                this.asideWidth = moveWidth.toString();
            }
        },
        endDrap() {
            this.drapOpen = false;
            this.startWidth = parseInt(this.asideWidth);
            },
            // 列表筛选 方法
            filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
            },
            // 搜索点击事件
            searchList() {
            console.log(this.$refs.bankList)
            this.$refs.bankList.filter(this.searchData);
        },
        //  每页条数改变时触发
        handleSizeChange(val) {
            this.pageNo = 1;
            this.pageSize = val;
            let param = {
            'page': this.pageNo,
            'rows': this.pageSize
            }
            this.getTransBankList(param);
        },
        //  翻页时触发
        handleCurrentChange(val) {

            this.pageNo = val;
            let param = {
            'page': this.pageNo,
            'rows': this.pageSize
            }
            this.getTransBankList(param);

        },
        //  编辑 查看 点击事件
        handleEdit(handle, formName, index, row) {
            console.info(row);
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
            for (let item in this.sizeForm) {
                if(item!="orgId"){
                this.sizeForm[item] = "";
                }
            }
            if (handle == "editor") {
                this.currentEditorIndex = index;
                for (let item in this.sizeForm) {
                this.sizeForm[item] = this.tableData[index][item] || "";
                }
                console.log(this.sizeForm);
                this.currentHandle = "editor";
                this.dialogTitle = "修改银行";
            } else {
                if(this.orgId){
                this.currentHandle = "add";
                this.dialogTitle = "创建银行";
                }else{
                this.$message.error("请确定所属机构");
                return
                }
            }
            this.editorPopup = true;
        },
        //  新增  编辑  提交
        editorSubmit(formName) {
            console.info(formName);
            console.info(this.sizeForm);
            this.$refs[formName].validate(valid => {
                if (valid) {
                if (this.currentHandle == "editor") {
                    //  编辑操作
                    this.$post(this.$API.EPF_TRADE.BANK.EDIT_BANK,this.sizeForm).then(res => {
                    if (res.code ==0) {
                        this.$message({
                        message: "修改成功",
                        type: "success"
                        });
                        this.queryDate();
                    }else{
                        //失败
                        this.$message.error(res.msg);
                        return;
                    }
                    });
                } else {
                    //  新增操作
                    this.sizeForm.orgId=this.orgId;
                    this.$post(this.$API.EPF_TRADE.BANK.ADD_BANK,this.sizeForm).then(res => {
                    if (res.code ==0) {
                        this.$message({
                        message: "成功新增一条数据!",
                        type: "success"
                        });
                        this.queryDate();
                    }else{
                        //失败
                        this.$message.error(res.msg);
                        return;
                    }
                    });
                }
                this.editorPopup = false;
                } else {
                return false;
                }
            });
        },
        //  查看银行
        seeBankInfo(row) {
            console.log(row.id);
            this.detailForm=row;
            this.detail = true;
        },
        //删除
        del(row){
            console.log(row.id);
            this.$confirm("确认删除该条的信息，是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
                this.$post(this.$API.EPF_TRADE.BANK.DEL_BANK, {
                    id: row.id
                    }).then(res => {
                    if (res.code ==0) {
                        this.$message({
                        message: "删除成功",
                        type: "success"
                        });
                        this.queryDate();
                    }else{
                        //失败
                        this.$message.error(res.msg);
                        return;
                    }
                    });

                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });

        },

        //  打开账号管理页面
        accountManageOpen(row){
            let title = "账号管理";
            let routerPath = `/system/trade/land/views/bank/accountPage?bankId=${row.id}&bankName=${row.name}&bankNo=${row.no}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path: routerPath, query:{bankId:row.id,bankName:row.name,bankNo:row.no}});
            this.$store.commit("ADD_TAB", item)
        },

        //  开始上传
        logoUploadFile(files) {
            const file = files.file;

            const formData = new FormData();

            formData.append("files", file);

            this.$useAppend(this.$API.EPF_ADMIN.DOCUMENT.UPLOAD, formData).then(res => {
                files.onProgress(file);
                if (res.state != "SUCCESS") {
                this.$message.error("图片上传失败，请重新上传");
                return null;
                }
                this.sizeForm.imageUrl =res.data[0].id;
                files.onSuccess(res);
            });
        },
        //  上传成功
        handleAvatarSuccess(res, file) {
            this.sizeForm.logoSuccess = true;
        },
        //  上传限制
        beforeAvatarUpload(file) {
            console.log(file);
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt6M = file.size / 1024 / 1024 < 6;
            if (file.size === 0) {
                this.$message.error("上传土地照片大小不能为0");
                return false;
            }
            if (!isPNG && !isJPG && !isGIF) {
                this.$message.error("上传土地照片只能是 jpg , png , gif 格式!");
                return false;
            }
            if (!isLt6M) {
                this.$message.error("上传土地照片大小不能超过 6MB!");
                return false;
            }
        },
        // @name: 行政区域
        // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        // @author: swx0916
        // @chageTime:2020-3-2
        getProvinceData() {
            let that = this;
            that.$axios.get(
                `/epf-admin/admin/regionals/getAreaByCodeOrParentId`,
                { parentId: "000000" },
                res => {
                that.dictionary.administrative_regions = res.dictionariesList;
                }
            );
        },
        province(dic, cantonCode, event) {
            this.sizeForm.cantonAreaName = "";
            this.sizeForm.cantonArea = "";
            // this.cantonArea = "";
            this.sizeForm.cantonCityName = "";
            this.sizeForm.cantonCity = "";
            // this.cantonCity = "";
            let pId = this.$refs[cantonCode][0].$attrs.id;
            console.info(pId);
            this.sizeForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

            this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,
                {parentId:pId}
            ).then(res => {
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonCity = res.dictionariesList;
                return;
                }
                this.dictionary.cantonCity = "";
            });
        },
        city(dic, cantonCity, event) {
            this.sizeForm.cantonArea = "";
            this.sizeForm.cantonAreaName = "";
            this.cantonArea = "";
            let pId = this.$refs[cantonCity][0].$attrs.id;
            this.sizeForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
            this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,
                {parentId:pId}
            ).then(res => {
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonArea = res.dictionariesList;
                return;
                }
                this.dictionary.cantonArea = "";
            });
        },
        area(dic, cantonCity, event) {
            this.sizeForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
        }
    }
}
</script>   
<style scoped>
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.bankTopTab {
  height: 40px !important;
  padding-top: 0px;
}
.bankTopTab .bankTabs {
  width: 100px;
  height: 40px;
  background: rgb(50, 58, 64);
  color: white;
  font-size: 16px;
  margin-left: 10px;
  line-height: 40px;
  text-align: center;
}
.el-tree > div {
  margin: 5px 0;
}
.bankTitle:hover {
  color: #409eff;
  cursor: pointer;
}
.iconList {
  height: 300px;
  background: #fff;
  overflow-y: auto;
}
.iconitem {
  width: 100px;
  height: 80px;
  text-align: center;
  float: left;
  border: 1px solid rgb(230, 227, 227);
  overflow: hidden;
}
.iconitem i {
  font-size: 30px;
}
.drapLine {
  position: absolute;
  top: 0;
  right: 0px;
  height: 100%;
  width: 8px;
  border-right: 1px solid rgb(224, 224, 224);
  cursor: e-resize;
  z-index: 100;
}
.detailCol{
    display: flex;
    flex-direction: row;
    height: 42px;
}
.detailLabel{
    width: 90px;
    padding-right: 12px;
    text-align: right;
    font-weight: 800;
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.input-with-select {
  max-width: 350px;
}
.bankfilter {
  padding: 6px 12px;
  border: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: row;
  background: rgb(224, 224, 224);
  overflow-x: hidden;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 28px;
  padding-right: 10px;
  text-align: right;
  line-height: 28px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

<style>
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
.el-aside .el-main .bankList .el-tree-node:focus > .el-tree-node__content {
  color: rgb(0, 158, 221);
}
.bankfilter .el-input--small .el-input__inner {
  height: 34px;
}
.middleBox .canton_Regions .el-form-item__content {
  margin-left: 5px !important;
}
</style> 
