<template>
    <epf-container title='公告管理'>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <el-tabs
                type="border-card"
                v-model="activeTabs"
                @tab-click="handleClickState"
                >
                <el-tab-pane label="待处理" name="pending">
                    <div class="switchHeight_box">
                        <el-row>
                            <el-col :span="2">
                                <span class="filter_title">公告标题 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="announcementForm.title" size="small" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="1">
                                <span class="filter_title">状态 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="announcementForm.statusName" size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in statusNameoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <span class="filter_title">公告类型 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="announcementForm.noticeTypeName" size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in noticeTypeNameoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5">
                                <button class="epf_btn epf_btn_bg"  @click="serach()"> 查 询</button>
                                <button class="epf_btn epf_btn_def" @click="resetForm()"> 重 置</button>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="margin-top:35px;">
                        <div class="toolsTitleBox">
                            <span class="toolsTitle">公告信息</span>
                        </div>
                        <el-table
                            :data="announcementDatapend"
                            v-loading="loading"
                            :height="boxHeight - 270"
                            element-loading-text="数据加载中"
                            element-loading-background="rgba(255, 255, 255,0.95)"
                            style="width: 100%"
                            border
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column label="公告标题" width="320" align="center">
                                <template slot-scope="scope">
                                <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #409EFF; cursor:pointer;">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
                            <el-table-column prop="noticeTypeName" label="公告类型" align="center"></el-table-column>
                            <el-table-column prop="publishUserId" label="申请人" width="170" align="center"></el-table-column>
                            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
                            <el-table-column prop="statusName" label="状态" width="170" align="center"></el-table-column>
                            <el-table-column
                                label="操作" align="center" width="100" fixed="right">
                                <template slot-scope="scope">
                                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                                <el-button v-if="button.resourceId=='announce_audit'"
                                            type="text"
                                            size="small"
                                            @click="examine(scope.row)"
                                >审核</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    :disable="isDisable"
                                    @click="publicNotice(scope.row.id, 'notice_published')"
                                    v-if="scope.row.status==='notice_approve' && button.resourceId=='announce_public'"
                                >发布</el-button>
                                </span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="epf_paging_fixe" style="text-align: right;">
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
                </el-tab-pane>
                <el-tab-pane label="已处理" name="processed">
                    <div class="switchHeight_box">
                        <el-row>
                            <el-col :span="2">
                                <span class="filter_title">公告标题 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="announcementForm.title" size="small" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col :span="1">
                                <span class="filter_title">状态 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="announcementForm.statusName" size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in statusNameoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <span class="filter_title">公告类型 :</span>
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="announcementForm.noticeTypeName" size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in noticeTypeNameoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5">
                                <button class="epf_btn epf_btn_bg" @click="serach()"> 查 询</button>
                                <button class="epf_btn epf_btn_def"  @click="resetForm()"> 重 置</button>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="margin-top:35px;">
                        <div class="toolsTitleBox">
                            <span class="toolsTitle">公告信息</span>
                        </div>
                        <el-table
                            :data="announcementDataporce"
                            v-loading="loading"
                            :height="boxHeight - 270"
                            element-loading-text="数据加载中"
                            element-loading-background="rgba(255, 255, 255,0.95)"
                            style="width: 100%"
                            border
                            row-key="id"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column label="公告标题" width="320" align="center">
                                <template slot-scope="scope">
                                <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #409EFF; cursor:pointer;">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
                            <el-table-column prop="noticeTypeName" label="公告类型" align="center"></el-table-column>
                            <el-table-column prop="publishUserId" label="申请人" width="170" align="center"></el-table-column>
                            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
                            <el-table-column prop="statusName" label="状态" width="170" align="center"></el-table-column>
                            <el-table-column
                                label="操作" align="center" width="200" fixed="right">
                                <template slot-scope="scope">
                                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                                <el-button type="text" size="small"
                                            v-if="(scope.row.status!=='notice_draft')&&button.resourceId=='announce_viewaudit'"
                                            @click="viewDeal(scope.row.procInsId)">查看审核结果</el-button>
                                <el-button type="text" size="small" @click="publicNotice(scope.row.id, 'notice_revoke')"
                                            v-if="scope.row.status==='notice_published'&&scope.row.isMine==0&&scope.row.isRevoke==1&&button.resourceId=='announce_public'">撤销发布</el-button>
                                <el-button type="text" size="small"
                                            v-if="scope.row.Status==='notice_published'&&scope.row.isMine==0&&button.resourceId=='announce_addedit'&&scope.row.isRevoke==1&& scope.row.isShowBg==0"
                                            @click="chagngeAdd(scope.row.id)">创建变更公告</el-button>
                                <el-button type="text" size="small"
                                            v-if="scope.row.isMine==1 &&button.resourceId=='announce_view'"
                                            @click="chagngeDetail(scope.row.id)">查看详情</el-button>
                                </span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="epf_paging_fixe" style="text-align: right;">
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
                </el-tab-pane>
                <el-tab-pane label="我的公告" name="myAnnounce">
                    <div class="switchHeight_box">
                        <el-row>
                        <el-col :span="2">
                            <span class="filter_title">公告标题 :</span>
                        </el-col>
                        <el-col :span="3">
                            <el-input v-model="announcementForm.title" size="small" placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="1">
                            <span class="filter_title">状态 :</span>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="announcementForm.statusName" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in statusNameoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <span class="filter_title">公告类型 :</span>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="announcementForm.noticeTypeName" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in noticeTypeNameoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <button class="epf_btn epf_btn_bg" @click="serach()"> 查 询</button>
                            <button class="epf_btn epf_btn_def" @click="resetForm()"> 重 置</button>
                        </el-col>
                        </el-row>
                    </div>
                    <div style="margin-top:35px;">
                        <div class="toolsTitleBox">
                            <span class="toolsTitle">公告信息</span>
                        <div class="oper">
                            <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                                <span v-if="button.resourceId=='announce_add'" class="button_bg" @click="handleAdd()">新增</span>
                                <span v-if="button.resourceId=='announce_delete'" class="btn" @click="handleDelete()">删除</span>
                            </span>
                        </div>
                        </div>
                        <el-table
                            :data="announcementDatamyann"
                            v-loading="loading"
                            :height="boxHeight - 270"
                            element-loading-text="数据加载中"
                            element-loading-background="rgba(255, 255, 255,0.95)"
                            style="width: 100%"
                            border
                            row-key="id"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column label="公告标题" width="320" align="center">
                                <template slot-scope="scope">
                                <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #409EFF; cursor:pointer;">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
                            <el-table-column prop="noticeTypeName" label="公告类型" align="center"></el-table-column>
                            <el-table-column prop="publishUserId" label="申请人" width="170" align="center"></el-table-column>
                            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
                            <el-table-column prop="statusName" label="状态" width="170" align="center"></el-table-column>
                            <el-table-column
                                label="操作" align="center" width="300" fixed="right">
                                <template slot-scope="scope">
                                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                                <el-button type="text" size="small"
                                            v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_edit'"
                                            @click="correct(scope.row.id,scope.row.fileTemplateCode)">修改</el-button>
                                <el-button type="text" size="small" @click="startProcess(scope.row, 'notice_audit')"
                                            v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_submit'">提交</el-button>
                                <el-button type="text" size="small"
                                            v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_delete'"
                                            @click="deleteRow(scope.row.id)">删除</el-button>
                                <el-button type="text" size="small"
                                            v-if="(scope.row.status=='notice_approve'||scope.row.status=='notice_rejected')&&button.resourceId=='announce_viewaudit'&&scope.row.procInsId"
                                            @click="viewDeal(scope.row.procInsId)">查看审核结果</el-button>
                                <el-button type="text" size="small" @click="resubmit(scope.row.id)"
                                            v-if="scope.row.status==='notice_rejected'&&button.resourceId=='announce_resubmit' && scope.row.isResubmitNotice != 1">重新提交</el-button>
                                <el-button type="text" size="small" @click="publicNotice(scope.row.id, 'notice_published')"
                                            v-if="scope.row.status==='notice_approve'&&button.resourceId=='announce_public'"
                                            :disable="isDisable">发布</el-button>
                                <el-button type="text" size="small"
                                            v-if="scope.row.status!=='notice_draft'&&button.resourceId=='announce_view'"
                                            @click="chagngeDetail(scope.row.id)">查看详情</el-button>
                                    <el-button type="text" size="small" @click="noticeRevoke(scope.row.id)"
                                            v-if="scope.row.status==='notice_revoke' && scope.row.isResubmit != 1 &&button.resourceId=='announce_revoke'">重新发布</el-button>
                                    <!-- <el-button
                                    type="text"
                                    size="small"
                                    v-if="scope.row.status==='notice_published'"
                                    @click="chagngeDetail(scope.row.id)"
                                >查看详情</el-button> -->
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="publicNotice(scope.row.id, 'notice_revoke')"
                                    v-if="scope.row.status==='notice_published'&&scope.row.isRevoke==1&&button.resourceId=='announce_public'"
                                >撤销发布</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    v-if="scope.row.status==='notice_published'&&button.resourceId=='announce_addedit'&&scope.row.isRevoke==1&& scope.row.isShowBg==0"
                                    @click="chagngeAdd(scope.row.id)"
                                >创建变更公告</el-button>
                                    <el-button
                                    type="text"
                                    size="small"
                                    v-if="scope.row.status==='notice_approve'&&button.resourceId=='announce_cancel'&& scope.row.isShowBg==1"
                                    @click="publicNotice(scope.row.id,'notice_cancel')"
                                    >不再发布</el-button>
                                </span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="epf_paging_fixe" style="text-align: right;">
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
                    <!-- v-if="scope.row.status==='notice_draft'&&currentTabs==='myAnnounce'" -->
                </el-tab-pane>
            </el-tabs>
        </div> 
        <!-- 弹窗 -->
        <el-dialog title="审核" width="40%" class="abow_dialog" :visible.sync="dialogForm" :modal-append-to-body="false">
            <template>
                <div id="dialog">
                <actDialog :actInfo="actInfo" @patch="actResult"/>
                </div>
            </template>
        </el-dialog>
    </epf-container>
</template>    
<script>
export default {
    name:'notice',
    components:{actDialog},
    data(){
        return{
            actInfo: {},
            ids: "",
            active: 1,
            tab: 1,
            dialogForm: true,
            activeTabs: 'pending',
            currentTabs: 'pending',
            announcementData: [
                {
                    title: '',
                    noticeNo: '',
                    noticeTypeName: '',
                    publishUserId: '',
                    noticeDate: '',
                    statusName: '',
                }
            ],
            announcementDatapend: [],
            announcementDataporce: [],
            announcementDatamyann: [],
            multipleSelection: [],
            noticeNo: "",
            announcementForm: {
                title: "",
                statusName: "",
                noticeTypeName: "",
                transferMode: ""
            },
            statusNameoptions: [
                {value: "notice_draft", label: "草稿"},
                {value: "notice_approve", label: "审核通过"},
                {value: "notice_rejected", label: "审核不通过"},
                {value: "notice_published", label: "已发布"},
                {value: "notice_audit", label: "审核中"},
            ],
            noticeTypeNameoptions: [
                {value: "common_notice", label: "普通公告"},
                {value: "change_notice", label: "变更公告"}
            ],
            value: "",
            dialogForm: false,
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页显示条数
            totalPage: 1,
            totalRecord: 1,
            searchInfo: {},
            loading: true,
            currentId: '',
            //按钮组、主题
            buttons: [],
            //CancelToken: '', //axios请求暂停函数
            isDisable:'',
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        //this.CancelToken = this.$http.CancelToken //请求停止对象
        this.buttons = JSON.parse(localStorage.getItem("announcementInfo"));
        console.log("按钮的数据：", this.buttons)

        for (var i = 0; i < this.buttons.length; i++) {
            console.log("按钮的权限：" + this.buttons[i].resourceId)
        }
        let param = {
            page: this.pageNo,
            rows: this.pageSize,
            tab: this.tab,
            title: '',
            status: '',
            noticeType: ''
        };
        this.init(param);
    },
    mounted() {
        //提交成功跳转进入时触发
        this.$bus.$on('announSuccess', (val) => {
            this.activeTabs = "myAnnounce"
            let param = {
                page: this.pageNo,
                rows: this.pageSize,
                tab: 3
            };
            this.init(param);
        })
    },
    methods:{
        //重新提交按钮
        resubmit(id) {
            //重新复制该条数据，将数据返回到前端，跳转编辑页面
            this.$get(this.$API.EPF_TRADE.NOTICE.RES_NOTICE, {id: id}).then(res => {
                if (res.code != 0) {
                    this.$message.error(res.msg);
                    return
                }
                console.log("获取的数据：", res.resubmitNotice)

                let title = "重新提交公告信息";
                let routerPath = '/system/trade/land/views/notice/edit?id=' + id + "&&resubmitNotice=" + res.resubmitNotice;
                let item = {url:routerPath,menuname:title}
                //将当前点击的选项添加到vuex中
                this.$router.push({path: routerPath, query: {id: id, resubmitNotice: res.resubmitNotice}});
                this.$store.commit("ADD_TAB", item)
            }).catch(error => {
                console.log(error)
            })

        },
        //重新发布按钮
        noticeRevoke(id) {
            this.$get(this.$API.EPF_TRADE.NOTICE.NOTICE_REVOKE, {id: id}).then(res => {
                if (res.code != 0) {
                    this.$message.error(res.msg);
                    return
                }
                console.log("获取的数据：", res.noticeRevoke)
                let title = "重新发布公告信息";
                let routerPath = '/system/trade/land/views/notice/edit?id=' + id + "&&noticeRevoke=" + res.noticeRevoke;
                let item = {url:routerPath,menuname:title}
                //将当前点击的选项添加到vuex中
                this.$router.push({path: routerPath, query: {id: id, noticeRevoke: res.noticeRevoke}});
                this.$store.commit("ADD_TAB", item)
            }).catch(error => {
                console.log(error)
            })
        },
        init(params) {
            this.loading = true;
            let that = this  
            var url = that.$API.EPF_TRADE.NOTICE.NOTICE_LIST
            if(params.tab == "1"){
                url = url+"TabOne"
            }else if(params.tab == "2"){
                url = url+"TabTwo"
            }else {
                url = url+"TabThree"
            }
            this.$get(
                url,
                params).then(
                res => {
                    if (res.code != 0) {
                        this.loading = false;
                        this.$message.error(res.msg);
                        return
                    }
                    if (params.tab == "1") {
                        this.announcementDatapend = res.pager.results;
                    } else if (params.tab == "2") {
                        this.announcementDataporce = res.pager.results;
                        console.log("========", this.announcementDataporce)
                    } else if (params.tab == "3") {
                        console.log("=======", this.activeTabs)
                        this.announcementDatamyann = res.pager.results;
                        console.log("========     ", this.announcementDatamyann)
                    }
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage;
                    this.totalRecord = res.pager.totalRecord;
                    console.log('返回的公告信息', this.announcementData);
                    console.log('返回的公告信息', res.pager.totalRecord);
                    this.loading = false;
                }
            ).catch(error => {
                this.loading = false;
                console.log(error)
            });
        },
        examine(obj) {
            this.actInfo = obj;
            this.currentId = obj.id;
            this.dialogForm = true;

            this.$nextTick(() => {
                this.$bus.$emit('transferaudit', 'examine')//需要审核
            })
        },
        actResult(re) {
            //取消：cancel，流转：success,流转结束：end,审核未通过：failed
            if (re === "cancel") {
                //取消关闭弹框，不做任何事件
            } else if (re === "success") {
                //刷新页面
                this.serach();
            } else if (re === "failed") {
                //修改状态
                this.setState('failed')
                //刷新页面
                this.serach();
            } else if (re === "end") {
                //修改状态
                this.setState('success')
                //刷新页面
                this.serach();
            }
            this.dialogForm = false;
        },
        setState(state) {
            var publishStatus = '';
            if (state === 'success') {
                publishStatus = 'notice_approve'
            } else if (state === 'failed') {
                publishStatus = 'notice_rejected'
            }
            let id = this.currentId;
            //改变状态
            this.$post(this.$API.EPF_TRADE.NOTICE.ISSUE, {
                "id": id,
                "status": publishStatus
            }).then(res => {
                if (res.code != '0') {
                    //失败
                    this.$message.error(res.msg);
                    return
                }
                //刷新页面
                this.serach();
            })
        },
        // 发布与撤销发布
        publicNotice(id, status) {
            debugger
            this.isDisable = true;
            this.$post( this.$API.EPF_TRADE.NOTICE.ISSUE,
                {"id": id, "status": status}
            ).then(res => {
                debugger
                if (res.code == "0") {
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                    this.isDisable = false;
                    let index = "";
                    if (this.activeTabs == "pending") {
                        index = "1";
                    } else if (this.activeTabs == "processed") {
                        index = "2";
                    } else if (this.activeTabs == "myAnnounce") {
                        index = "3";
                    }
                    let param = {
                        page: this.pageNo,
                        rows: this.pageSize,
                        tab: index
                    };
                    this.init(param);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        viewDeal(procInsId) {
            let title = "审核结果";
            let routerPath = '/system/trade/land/views/notice/result';
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path: routerPath, query: {'id': procInsId}});
            this.$store.commit("ADD_TAB", item)
        },
        chagngeAdd(id) {
            // 获取当前变更公告的子公告集合
            this.$get(
            "/epf-trade/admin/transnotice/listChangeNotice",
            {id: id}
            ).then(res => {
                if (res.code == "0") {
                    let flag = false;
                    let message = "";
                    let noticeList = res.list; // 当前公告所绑定的标的集合
                    for(let i = 0; i < noticeList.length; i++){
                        let status = noticeList[i].status;
                        if(status == 'notice_audit'){
                            flag = true; // 不能创建变更功能
                            message = "该公告下有一条变更公告正在审核中，暂时不能创建新的变更公告!";
                            break;
                        }else if(status == 'notice_approve'){
                            flag = true; // 不能创建变更功能
                            message = "该公告下有一条审核通过的变更公告，请先发布或作废该变更公告，才能创建新的变更公告!";
                            break;
                        }else{
                            continue;
                        }
                    }
                    if(false){
                        this.$message.error(message); //失败
                    }else{
                        let title = "新增变更公告";
                        let routerPath = '/system/trade/land/views/notice/change';
                        let item = {url:routerPath,menuname:title}
                        //将当前点击的选项添加到vuex中
                        this.$router.push({path: routerPath, query: {id: id}});
                        this.$store.commit("ADD_TAB", item)   
                    }
                }
            });
        }, 

        // chagngeAdd(id) {
        //     let title = "新增变更公告";
        //     let routerPath = '/system/trade/land/views/notice/change';
        //     let item = {url:routerPath,menuname:title}
        //     //将当前点击的选项添加到vuex中
        //     this.$router.push({path: routerPath, query: {id: id}});
        //     this.$store.commit("ADD_TAB", item)
        // },
        chagngeDetail(id) {
            let title = "公告详情";
            let routerPath = '/system/trade/land/views/notice/detail?id=' + id;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path: routerPath, query: {id: id}});
            this.$store.commit("ADD_TAB", item)
        },
        handleClickState(tab, event) {//标签页切换
            this.announcementForm.title = "";
            this.announcementForm.noticeNo = "";
            this.announcementForm.noticeTypeName = "";
            this.announcementForm.publishUserId = "";
            this.announcementForm.statusName = "";
            this.currentTabs = tab.name;
            let index = "";
            if (this.activeTabs == "pending") {
                index = "1";
            } else if (this.activeTabs == "processed") {
                index = "2";
            } else if (this.activeTabs == "myAnnounce") {
                index = "3";
            }
            let param = {
                // status: this.announcementForm.statusName,
                page: this.pageNo,
                rows: this.pageSize,
                tab: index,
                title: '',
                status: '',
                noticeType: ''
            };
            this.init(param);
        },
        serach() {  //查询按钮
            let index = "";
            if (this.activeTabs == "pending") {
                index = "1";
            } else if (this.activeTabs == "processed") {
                index = "2";
            } else if (this.activeTabs == "myAnnounce") {
                index = "3";
            }
            let param = {
                page: this.pageNo,
                rows: this.pageSize,
                tab: index,
                title: this.announcementForm.title,
                status: this.announcementForm.statusName,
                noticeType: this.announcementForm.noticeTypeName
            };
            this.init(param);
        },
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
        handleAdd() {
            // this.$router.push('/announcementInfoAdd')
            let title = "新增公告信息";
            let routerPath = '/system/trade/land/views/notice/add';
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path: routerPath});
            this.$store.commit("ADD_TAB", item)
        },
        correct(id) {
            let title = "修改公告信息";
            let routerPath = '/system/trade/land/views/notice/edit?id=' + id ;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path: routerPath, query: {id: id}});
            this.$store.commit("ADD_TAB", item)
        },
        deleteRow(id) {
            let that = this; 
            let url = that.$API.EPF_TRADE.NOTICE.DEL_NOTICE;
            if (confirm("确定要删除吗")) {
                this.$post(url, {id: id}).then(res => {
                    if (res.code === 0) {
                        that.$message.warning(res.msg);
                        let param = {
                            page: this.pageNo,
                            rows: this.pageSize,
                            tab: 3
                        };
                        this.init(param);
                    } else {
                        that.$message.warning(res.msg);
                    }
                })
                    .catch(res => {
                        that.$message.warning(res.msg);
                    });
            }
        },
        handleDelete() {
            if (this.ids == "") {
                this.$message({
                    type: "info",
                    message: "请选择公告信息！"
                });
                return;
            }
            this.$confirm("确认删除该公告的信息，是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => { 
                this.$post(this.$API.EPF_TRADE.NOTICE.DEL_NOTICE, {id: this.ids}).then(res => {
                    if (res.code == "0") {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        let param = {
                            page: this.pageNo,
                            rows: this.pageSize,
                            tab: 3
                        };
                        this.init(param);
                    } else {
                        this.$message.error(res.msg); //失败
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            });
        },
        handleSelectionChange(val) { //勾选公告信息提交
            this.ids = this.getIDs(val);
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.pageNo = 1;
            this.pageSize = val; //显示条数改变
            this.searchInfo["page"] = this.pageNo;
            this.searchInfo["rows"] = val;
            let index = "";
            if (this.activeTabs == "pending") {
                index = "1";
            } else if (this.activeTabs == "processed") {
                index = "2";
            } else if (this.activeTabs == "myAnnounce") {
                index = "3";
            }
            this.searchInfo["tab"] = index;
            this.searchInfo["title"] = this.announcementForm.title;
            this.searchInfo["status"] = this.announcementForm.statusName;
            this.searchInfo["noticeType"] = this.announcementForm.noticeTypeName;
            this.init(this.searchInfo);
        },
        handleCurrentChange(val) {
            //获取当前页
            this.pageNo = val;
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            let index = "";
            if (this.activeTabs == "pending") {
                index = "1";
            } else if (this.activeTabs == "processed") {
                index = "2";
            } else if (this.activeTabs == "myAnnounce") {
                index = "3";
            }
            this.searchInfo["tab"] = index;
            this.searchInfo["title"] = this.announcementForm.title;
            this.searchInfo["status"] = this.announcementForm.statusName;
            this.searchInfo["noticeType"] = this.announcementForm.noticeTypeName;
            this.init(this.searchInfo);
        },
        // 重置表单
        resetForm() {
            let index = "";
            if (this.activeTabs == "pending") {
                index = "1";
            } else if (this.activeTabs == "processed") {
                index = "2";
            } else if (this.activeTabs == "myAnnounce") {
                index = "3";
            }
            this.announcementForm.title = "";
            this.announcementForm.noticeNo = "";
            this.announcementForm.noticeTypeName = "";
            this.announcementForm.publishUserId = "";
            this.announcementForm.statusName = "";
            let param = {
                page: this.pageNo,
                rows: this.pageSize,
                tab: index
            };
            this.init(param);
        },
        // 提交启动流程
        startProcess(obj, status) {
            let multirowid = []
            multirowid.push(obj.id)
            var procDefKey = 'transaction_filing';//启动流程类型
            // 朱绍炳 2019-07-14 15:09:32
            // 获取启动节点信息
            let businessType = "notice";
            let orgId = sessionStorage.getItem('orgId');
            this.$post(this.$API.EPF_ACTIVITI.NODE_ID, {
                nodeId: 'start',
                procDefKey: procDefKey,
                orgId: orgId,
                businessType: businessType
            }).then(res => {
                if (res.code != "0") {
                    this.$message.error(res.msg);
                }
                var jsonVars = "{NAME_" + res.nodes[0].nodeId + ":'" + res.nodes[0].excutionUser
                    + "',procDefKey:'" + procDefKey
                    + "',title:'" + obj.title
                    + "',businessType:'" + businessType + "',orgId:'" + orgId + "'}";
                //执行自己的方法，后台判断启动与否 
                this.$post(this.$API.EPF_TRADE.NOTICE.ISSUE, {
                    id: obj.id,
                    status: status,
                    jsonVars: jsonVars
                }).then(res => {
                    if (res.code == "0") {
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                        let index = "";
                        if (this.activeTabs == "pending") {
                            index = "1";
                        } else if (this.activeTabs == "processed") {
                            index = "2";
                        } else if (this.activeTabs == "myAnnounce") {
                            index = "3";
                        }
                        let param = {
                            page: this.pageNo,
                            rows: this.pageSize,
                            tab: index
                        };
                        this.init(param);
                    }
                });
            });
        }

    }
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
    .oper {
        float: right;
        font-weight: normal;
    }

    .oper .btn {
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

    .oper btn:nth-child(2) {
        border: solid 1px #d3d4d6;
        color: #606266;
        background: #fff;
    }
   .epf_fr_box >>> .el-table__empty-block .el-table__empty-text {
        text-align: center !important;
        margin-left: 0%;
    }
</style>      