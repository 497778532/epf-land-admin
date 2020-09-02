<template>
    <epf-container title="预警设置">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">数据列表</span>
                <div class="oper">
                    <a href="javascript:;" @click="addWarnMessage('addForm')" class="addBox">添加</a>
                </div>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 55 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="data"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 120"
                    tooltip-effect="dark"
                    >
                    <el-table-column label="序号" min-width="100" align="center">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column prop="warnTypeName" label="预警类型" min-width="150" align="left"></el-table-column>
                    <el-table-column prop="warnGradeName" label="预警等级" min-width="150" align="left"></el-table-column>
                    <el-table-column prop="remark" label="描述" min-width="735" align="left"></el-table-column>
                    <el-table-column label="是否使用" min-width="195" align="left">
                    <template slot-scope="scope">
                        <span v-if="scope.row.enableFlag==0">是</span>
                        <span v-if="scope.row.enableFlag==1">否</span>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="300" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClickEdit(scope.row)">编辑</el-button>
                        <el-button
                        v-if="scope.row.enableFlag==1"
                        type="text"
                        size="small"
                        @click="handleClickUse(scope.row)"
                        >启用</el-button>
                        <el-button v-else type="text" size="small" @click="handleClickUse(scope.row)">禁用</el-button>
                        <el-button type="text" size="small" @click="handleClickDelete(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                    background
                    layout="total,prev, pager, next,sizes,jumper"
                    :page-sizes="[5,10,15,20]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="totalRecord"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <!-- 新增弹窗 -->
        <el-dialog
            :modal-append-to-body="false"
            title="预警设置"
            :visible.sync="addWarnFormVisible"
            class="addWarnBox"
            width="30%"
            >
            <el-form :rules="rules" :model="addForm" ref="addForm" label-width="120px">
            <el-form-item label="预警编号：" prop="warnCode">
                <el-input v-model="addForm.warnCode" size="small" placeholder="请输入预警编号"></el-input>
            </el-form-item>
            <el-form-item label="预警类型：" prop="warnTypeName">
                <el-select
                v-model="addForm.warnTypeName"
                size="small"
                placeholder="全部"
                @change="warnTyleAddSelect(dictionary.warn_tyle,addForm.warnTypeName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.warn_tyle"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预警等级：" prop="warnGradeName">
                <el-select
                v-model="addForm.warnGradeName"
                size="small"
                placeholder="全部"
                @change="warnGradeAddSelect(dictionary.warn_grade,addForm.warnGradeName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.warn_grade"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业诚信：" prop="companyCreditName">
                <el-select
                v-model="addForm.companyCreditName"
                size="small"
                placeholder="全部"
                @change="companyCreditAddSelect(dictionary.company_credit,addForm.companyCreditName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.company_credit"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用：" prop="enableFlag">
                <el-radio-group v-model="addForm.enableFlag">
                <el-radio
                    :label="item.value"
                    :key="item.value"
                    v-for="item in okList"
                    @change="toggleOk(item)"
                >{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="预警描述：" prop="remark">
                <el-input
                type="textarea"
                maxlength="200"
                minlength="0"
                show-word-limit
                autosize
                v-model="addForm.remark"
                placeholder="请输入相关的预警描述，200字以内"
                style="width:80%;height:120px;"
                ></el-input>
            </el-form-item>
            </el-form>

            <div class="dialogFooter">
            <el-button class="button_bg" @click="submitAdd('addForm')">确定</el-button>

            <el-button class="button_default" type="primary" @click="addWarnFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog
            :modal-append-to-body="false"
            title="预警设置"
            :visible.sync="editWarnFormVisible"
            class="setUp"
            width="30%"
            >
            <el-form :rules="rules" :model="editForm" ref="editForm" label-width="120px">
            <el-form-item label="预警编号：" prop="warnCode">
                <el-input v-model="editForm.warnCode" size="small" placeholder="请输入预警编号"></el-input>
            </el-form-item>
            <el-form-item label="预警类型：" prop="warnTypeName">
                <el-select
                v-model="editForm.warnTypeName"
                size="small"
                placeholder="全部"
                @change="warnTyleEditSelect(dictionary.warn_tyle,editForm.warnTypeName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.warn_tyle"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预警等级：" prop="warnGradeName">
                <el-select
                v-model="editForm.warnGradeName"
                size="small"
                placeholder="全部"
                @change="warnGradeEditSelect(dictionary.warn_grade,editForm.warnGradeName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.warn_grade"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业诚信：" prop="companyCreditName">
                <el-select
                v-model="editForm.companyCreditName"
                size="small"
                placeholder="全部"
                @change="companyCreditEditSelect(dictionary.company_credit,editForm.companyCreditName,$event)"
                >
                <el-option
                    v-for="(item,index) in dictionary.company_credit"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用：" prop="enableFlag">
                <el-radio-group v-model="editForm.enableFlag">
                <el-radio
                    :label="item.value"
                    :key="item.value"
                    v-for="item in okList"
                    @change="toggleOk(item)"
                >{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="预警描述：" prop="remark">
                <el-input
                type="textarea"
                maxlength="200"
                minlength="0"
                show-word-limit
                autosize
                v-model="editForm.remark"
                placeholder="请输入相关的预警描述，200字以内"
                style="width:80%;height:120px;"
                ></el-input>
            </el-form-item>
            </el-form>

            <div class="dialogFooter">
                <el-button class="button_bg" @click="submitEdit('editForm')">确定</el-button>

                <el-button class="button_default" type="primary" @click="editWarnFormVisible = false">取消</el-button>
            </div>
      </el-dialog>
    </epf-container>
</template>

<script>
export default {
    data() {
        return {
            params: {
                warnType: "", //预警类型
                warnGrade: "", //预警等级
                companyCredit: "", //企业诚信
                remark: "", //备注信息
                warnCode: "", //预警编号
                enableFlag: "", //启用状态
                id: "" //编号
            },
            addForm: {
                warn_tyle: "",
                warnTypeName: "",
                warn_grade: "",
                warnGradeName: "",
                company_credit: "",
                companyCreditName: "",
                enableFlag: "",
                remark: "",
                warnCode: ""
            },
            editForm: {
                warn_tyle: "",
                warnTypeName: "",
                warn_grade: "",
                warnGradeName: "",
                company_credit: "",
                companyCreditName: "",
                enableFlag: "",
                remark: "",
                warnCode: "",
                id: ""
            },
            okList: [
                {
                value: 0,
                label: "启用"
                },
                {
                value: 1,
                label: "关闭"
                }
            ],
            txtAddVal: 0,
            txtEditVal: 0,
            rules: {
                warnCode: [
                { required: true, message: "预警编号不能为空", trigger: "blur" }
                ],
                warnTypeName: [
                { required: true, message: "请选择预警类型", trigger: "change" }
                ],
                warnGradeName: [
                { required: true, message: "请选择预警等级", trigger: "change" }
                ],
                companyCreditName: [
                { required: true, message: "请选择企业诚信", trigger: "change" }
                ],
                remark: [
                { required: true, message: "预警描述不能为空", trigger: "blur" }
                ]
            },
            addWarnFormVisible: false,
            editWarnFormVisible: false,
            dicRequest: ["warn_tyle", "warn_grade", "company_credit"],
            //字典码请求
            dictionary: {
                //字典码结果
                warn_tyle: "",
                warn_grade: "",
                company_credit: ""
            },
            dicNum: 0, //字典循环下标

            //预警列表数据
            data: [],
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1
        };
    },
    methods: {
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(`/epf-monitor/earlywranrules/queryAll`, params).then(
                res => {
                console.log(res);
                if (res.code == "0") {
                    this.data = res.pager.results;
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage;
                    this.totalRecord = res.pager.totalRecord;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.$message.error(res.msg); //失败
                    return;
                }
                }
            );
        },
        addWarnMessage(formName) {
            this.addWarnFormVisible = true;
            // for (let item in this.addForm) {
            //   this.addForm[item] = "";
            // }
            this.$refs[formName].resetFields();
        },
        // 新增预警信息
        submitAdd(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                // 验证成功
                let params = this.params;
                params["warnType"] = this.addForm.warn_tyle;
                params["warnGrade"] = this.addForm.warn_grade;
                params["companyCredit"] = this.addForm.company_credit;
                params["remark"] = this.addForm.remark;
                params["enableFlag"] = this.addForm.enableFlag;
                params["warnCode"] = this.addForm.warnCode;
                let res = await this.$post(
                    "/epf-monitor/earlywranrules/save",
                    params
                );
                console.log(res);
                if (res.code == "0") {
                    this.getList();
                }
                this.addWarnFormVisible = false;
                } else {
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        //编辑预警信息
        async handleClickEdit(row) {
            console.log(row);
            let params = this.params;
            params["id"] = row.id;
            params["warnCode"] = row.warnCode;
            let res = await this.$post(
                `/epf-monitor/earlywranrules/update`,
                params
            );
            console.log(res);
            this.editForm.id = row.id;
            this.editForm.warnCode = row.warnCode;
            this.editForm.warnType = row.warnType;
            this.editForm.warnTypeName = row.warnTypeName;
            this.editForm.warnGrade = row.warnGrade;
            this.editForm.warnGradeName = row.warnGradeName;

            this.editForm.companyCreditName = row.companyCreditName;
            this.editForm.companyCredit = row.companyCredit;
            this.editForm.enableFlag = row.enableFlag;
            this.editForm.remark = row.remark;
            // 弹框
            this.editWarnFormVisible = true;
        },
        // 提交编辑
        submitEdit(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                // 验证成功
                let params = this.params;
                params["warnType"] = this.editForm.warnType;
                params["warnGrade"] = this.editForm.warnGrade;
                params["companyCredit"] = this.editForm.companyCredit;
                params["remark"] = this.editForm.remark;
                params["enableFlag"] = this.editForm.enableFlag;
                params["warnCode"] = this.editForm.warnCode;
                params["id"] = this.editForm.id;
                let res = await this.$post(
                    "/epf-monitor/earlywranrules/update",
                    params
                );
                console.log(res);
                if (res.code == "0") {
                    this.getList();
                }
                this.editWarnFormVisible = false;
                } else {
                // 失败
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        // 删除预警信息
        handleClickDelete(row) {
            console.log(row);
            this.$confirm("此操作将永久删除该预警规则, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                let params = this.params;
                params["id"] = row.id;
                let res = await this.$post(
                    `/epf-monitor/earlywranrules/delete`,
                    params
                );
                console.log(res);
                if (res.code == "0") {
                    this.getList();
                }
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        //启用禁用
        async handleClickUse(row) {
            let params = this.params;
            params["id"] = row.id;
            params["enableFlag"] = row.enableFlag;
            let res = await this.$post(
                "/epf-monitor/earlywranrules/updateEnableFlag",
                params
            );
            console.log(res);
            if (res.code == "0") {
                if (row.enableFlag === 0) {
                row.enableFlag = 1;
                } else {
                row.enableFlag = 0;
                }
            } else {
                this.$message.error(res.msg); //失败
                return;
            }
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.pageSize = val; //显示条数改变
            this.getList();
        },
        handleCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getList();
        },
        toggleOk(item) {
            this.addForm.enableFlag = item.value;
            this.editForm.enableFlag = item.value;
            console.log(this.timeCycle);
        },
        //字典选择
        warnTyleAddSelect(dic, warnTypeName, event) {
            this.addForm.warn_tyle = this.$refs[warnTypeName][0].$attrs.dictKey;
        },
        warnGradeAddSelect(dic, warnGradeName, event) {
            this.addForm.warn_grade = this.$refs[warnGradeName][0].$attrs.dictKey;
        },
        companyCreditAddSelect(dic, companyCreditName, event) {
            this.addForm.company_credit = this.$refs[
                companyCreditName
            ][0].$attrs.dictKey;
        },
        warnTyleEditSelect(dic, warnTypeName, event) {
            this.editForm.warn_tyle = this.$refs[warnTypeName][0].$attrs.dictKey;
        },
        warnGradeEditSelect(dic, warnGradeName, event) {
            this.editForm.warn_grade = this.$refs[warnGradeName][0].$attrs.dictKey;
        },
        companyCreditEditSelect(dic, companyCreditName, event) {
            this.editForm.company_credit = this.$refs[
                companyCreditName
            ][0].$attrs.dictKey;
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if (item == "administrative_regions" || item == "land_use") {
            this.$get(
                `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                { parentId: 0 }
            ).then(res => {
                resolve(res);
            });
            } else {
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

        this.getList();
    }
}
</script>

<style scoped>
    .filter_title {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding-right: 10px;
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: normal !important;
    }
    .oper {
        float: right;
        font-weight: normal;
    }
    .oper a {
        display: inline-block;
        width: 80px;
        height: 32px;
        background-color: #ffa000;
        border-radius: 2px;
        margin-right: 40px;
        text-align: center;
        line-height: 36px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
</style>