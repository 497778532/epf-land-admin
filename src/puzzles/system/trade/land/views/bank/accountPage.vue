<template>
    <epf-container title='账号管理'>
        <div class="epf_term_box">
            <el-row :gutter="2">
                <el-col :span="2">
                    <span class="filter_title">户名 :</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="filterbank.name" size="small" placeholder="请输入银行名称"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">币种 :</span>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="filterbank.currency" size="small"  placeholder="请选择币种">
                        <el-option v-for="item in dictionary.trade_currency" :ref="item.zhCn"
                            :id="item.id" :dictKey="item.dictKey" :dictId="item.id" :label="item.zhCn" :value="item.dictKey" :key="item.dictKey">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="11" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="queryDate"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetDate"> 重 置</button>
                    <button class="epf_btn epf_btn_bg" @click="handleEdit('add','sizeForm')">创建账号</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table :data="tableData" border style="width: 100%" :height="boxHeight - 270">
                    <el-table-column label="序号" min-width="80">
                        <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="no" label="账号" min-width="230"></el-table-column>
                    <el-table-column prop="name" label="户名" min-width="160">
                        <template slot-scope="scope">
                        <span @click="seeBankInfo(scope.row)" class="bankTitle">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tradeUseName" label="用途" min-width="120"></el-table-column>
                    <el-table-column prop="currencyName" label="币种" min-width="160"></el-table-column>
                    <el-table-column prop="inAccountModeName" label="模式类型" min-width="160"></el-table-column>
                    <el-table-column prop="isOutsideName" label="类型" min-width="100"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="80">
                        <template slot-scope="scope">
                        <el-button
                            @click="handleEdit('editor','sizeForm',scope.$index, scope.row)"
                            type="text"
                            size="small"
                        >修改</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
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
            </div>
        </div>
        <!-- 新增弹窗 -->
        <!-- 编辑弹窗 -->
        <el-dialog
            :title="dialogTitle"
            class="companyInfo"
            width="700px"
            :visible.sync="editorPopup"
            :append-to-body="true"
            top="10%"
            >
            <div class="middleBox">
                <el-form :model="sizeForm" :rules="rules" ref="sizeForm" label-width="80px" size="small">
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="账号户名" prop="name">
                        <el-input v-model="sizeForm.name" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="账号" prop="no">
                        <el-input v-model="sizeForm.no" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="银行名称" prop="bankName">
                        <el-input :disabled="true" v-model="sizeForm.bankName" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="编号" prop="bankNo">
                        <el-input :disabled="true" v-model="sizeForm.bankNo" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="用途" prop="tradeUse">
                        <!-- <selectInput v-model="sizeForm.tradeUse" :groupCode="'trade_use'" :default="''"></selectInput> -->
                        <el-select v-model="sizeForm.tradeUse"   placeholder="请选择用途">
                        <el-option
                            v-for="(item,index) in dictionary.trade_use"
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
                    <el-form-item label="币种" prop="currency">
                        <!-- <selectInput v-model="sizeForm.currency" :groupCode="'trade_currency'" :default="''"></selectInput> -->
                        <el-select v-model="sizeForm.currency"   placeholder="请选择币种">
                        <el-option
                            v-for="(item,index) in dictionary.trade_currency"
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
                    <el-form-item label="模式类型" prop="inAccountMode">
                        <!-- <selectInput v-model="sizeForm.inAccountMode" :groupCode="'mode_type'" :default="''"></selectInput> -->
                        <el-select v-model="sizeForm.inAccountMode"   placeholder="请选择模式类型">
                        <el-option
                            v-for="(item,index) in dictionary.mode_type"
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

                    <el-form-item label="类型" prop="type">
                            <el-radio v-model="sizeForm.isOutside" :label="0">境外</el-radio>
                            <el-radio v-model="sizeForm.isOutside" :label="1">境内</el-radio>
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
            title="查看账号"
            class="companyInfo"
            width="700px"
            :visible.sync="detail"
            :append-to-body="true"
            top="10%"
            >
            <div class="middleBox">
                <el-row>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">账号户名：</div>
                    <div>{{detailForm.name}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">账号：</div>
                    <div>{{detailForm.no}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">银行名称：</div>
                    <div>{{detailForm.bankName}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">银行编号：</div>
                    <div>{{detailForm.bankNo}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">用途：</div>
                    <div>{{detailForm.tradeUseName}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">币种：</div>
                    <div>{{detailForm.currencyName}}</div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">模式类型：</div>
                    <div>
                    {{detailForm.inAccountModeName}}
                    </div>
                </el-col>
                <el-col :span="12" class="detailCol">
                    <div class="detailLabel">类型：</div>
                    <div>{{detailForm.isOutsideName}}</div>
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
            // 输入的筛选条件
            filterbank: {
                accountName: "",
                currency: ""
            },
            tableData: [
            ],
            bankId:"",//管理银行的id
            bankName:"",
            bankNo:"",
            pageNo: 1, // 当前页
            pageSize: 5, // 当前每页条数
            totalPage: 1, // 总页数
            totalRecord: 1, // 总条数，
            //  编辑 表单
            sizeForm: {
                id:"",
                bankId:"",
                name: "",
                no: "",
                bankName:"",
                bankNo:"",
                tradeUse: "",
                tradeUseName:"",
                currency: "",
                currencyName:"",
                inAccountMode:"",
                inAccountModeName:"",
                isOutside: "",
            },
            // 详情数据
            detailForm: {
            },
            //  编辑 表单验证
            rules: {

                name: [
                    { required: true, message: "请输入账号户名.", trigger: "blur" },
                    { min: 3, max: 20, message: "请输入正确的联系人." },
                    { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "只能输入中文" }
                ],
                no: [
                    { required: true, message: "请输入账号.", trigger: "blur" },
                    { min: 8, max: 30, message: "账号应为8-30位数字."}
                ],
                tradeUse: [
                    { required: true, message: "请选择用途."},
                ],
                currency: [
                    { required: true, message: "请选择币种."},
                ],
                inAccountMode: [
                    { required: true, message: "请选择模式类型."},
                ],
                isOutside: [
                    { required: true, message: "请选择类型."},
                ],
            },
            editorPopup: false, //  控制编辑弹窗
            dialogTitle: "创建银行", //  弹窗标题
            dicRequest: ["trade_currency","mode_type","trade_use"], //字典码请求
            dictionary: {
                //字典码结果
                trade_currency:"",
                mode_type:"",
                trade_use:""
            },
            dicNum: 0, //字典循环下标
            dicFinsh: false, //  接口请求完成
            detail: false, //  详情弹窗
            newObj:{},
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        var filters={"bankId":this.$route.query.bankId};
        this.getTransAccountJson({
        page: this.pageNo,
        rows: this.pageSize,
        filters: filters
        });

        this.bankListHeight = window.innerHeight - 280;
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if ( item == "land_use") {
                this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,
                    { parentId: 0 ,code:item}
                ).then(res => {
                    resolve(res);
                });
                }else if(item == 'administrative_regions'){
                this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,{parentId:0}).then(res => {
                        resolve(res);
                    })

            } else {
            this.$get(this.$API.EPF_TRADE.BANK.DICT_GROUP + item, {}).then(res => {
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
    methods:{
        queryDate(){
            var name =this.filterbank.bankName;
            console.log(this.newObj);
            var filters={"bankId":this.bankId,name:this.filterbank.name,currency:this.filterbank.currency};
            this.getTransAccountJson({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        },
        resetDate(){
            this.filterbank.name="";
            this.filterbank.currency="";
            this.pageNo=1;
            this.pageSize=5;
            var page=this.pageNo;
            var rows=this.pageSize;
            var filters={"bankId":this.bankId};
            this.getTransAccountJson({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        },
        getTransAccountJson(params) {
            console.log("这是查询list的参数，"+params);
            this.$get(this.$API.EPF_TRADE.BANK.GET_JSON, params).then(res => {
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
        //  每页条数改变时触发
        handleSizeChange(val) {
            this.pageNo = 1;
            this.pageSize = val;
        },
        //  翻页时触发
        handleCurrentChange(val) {
            this.pageNo = val;
        },
        //  编辑 查看 点击事件
        handleEdit(handle, formName, index, row) {
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
            }
            for (let item in this.sizeForm) {
                if(item!="bankName"||item!="bankNo"){
                this.sizeForm[item] = "";
                }
            }
            if (handle == "editor") {
                this.currentEditorIndex = index;
                for (let item in this.sizeForm) {
                this.sizeForm[item] = this.tableData[index][item] || "";
                }
                this.sizeForm.isOutside = this.tableData[index].isOutside
                console.log(this.sizeForm.isOutside)
                this.currentHandle = "editor";
                this.dialogTitle = "修改账号";
            } else {

                this.sizeForm["bankName"]=this.bankName;
                this.sizeForm["bankNo"]=this.bankNo;
                this.currentHandle = "add";
                this.dialogTitle = "创建账号";
            }
            this.editorPopup = true;
        },
        //  新增  编辑  提交
        editorSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                if (this.currentHandle == "editor") {
                    //  编辑操作
                    console.info(this.sizeForm);
                    this.$post(this.$API.EPF_TRADE.BANK.EDIT_ACCOUNT,this.sizeForm).then(res => {
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
                    this.sizeForm.bankId=this.bankId;
                    if(this.sizeForm.isOutside==""||this.sizeForm.isOutside=="null"){
                    this.sizeForm.isOutside=1
                    }
                    console.log(this.sizeForm.isOutside)
                    console.info(this.sizeForm);
                    this.$post(this.$API.EPF_TRADE.BANK.ADD_ACCOUNT,this.sizeForm).then(res => {
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
                this.$post(this.$API.EPF_TRADE.BANK.DEL_ACCOUNT, {
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
  
    },
    computed: {
        newRender:function(){
            if(this.$route.query.bankId){
                this.bankId = this.$route.query.bankId;
            }
            //this.bankId=this.$route.query.bankId;
            this.bankName=this.$route.query.bankName;
            this.bankNo=this.$route.query.bankNo;
            var filters={"bankId":this.bankId};
            this.getTransAccountJson({
                page: this.pageNo,
                rows: this.pageSize,
                filters: filters
            });
        }
    },
}
</script>
<style scoped>
    .filter_title {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 34px;
        padding-right: 10px;
        text-align: right;
        line-height: 34px;
    }
</style>