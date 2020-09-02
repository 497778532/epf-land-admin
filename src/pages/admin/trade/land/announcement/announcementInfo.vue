<template>
  <div class="page-body">
    <div class="filter_wrap">
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
                <div class="button_bg" @click="serach()">查询</div>
                <div class="button_default" @click="resetForm()">重置</div>
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
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="公告标题" width="320" align="center">
                <template slot-scope="scope">
                  <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #4671d5; cursor:pointer;">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
              <el-table-column prop="noticeTypeName" label="公告类型" align="center">
                <template slot-scope="scope">
                  <div>
                    <span style="display:block;padding:6px 5px;background:#ecf2ff;color:#4671d5" v-if="scope.row.noticeType == 'common_notice'">普通公告</span>
                    <span style="display:block;padding:6px 5px;background:#fff4e0;color:#ffa300" v-if="scope.row.noticeType == 'change_notice'">变更公告</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="recorderName" label="申请人" width="170" align="center"></el-table-column>
              <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
              <el-table-column prop="statusName" label="状态" width="170" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.statusName ==  '草稿' || scope.row.statusName ==  '审核中'" style="display:inline-block;width:10px;height:10px;background:#b4b4b4;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  <span v-else style="display:inline-block;width:10px;height:10px;background:#93b42c;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  {{scope.row.statusName}}
                </template>
              </el-table-column>
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
                    @click="publicNotice(scope.row.id, 'notice_published',scope.row.isShowBg)"
                    v-if="scope.row.status==='notice_approve' && button.resourceId=='announce_public'"
                  >发布</el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
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
                <div class="button_bg" @click="serach()">查询</div>
                <div class="button_default" @click="resetForm()">重置</div>
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
                  <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #4671d5; cursor:pointer;">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
              <el-table-column prop="noticeTypeName" label="公告类型" align="center">
                <template slot-scope="scope">
                  <div>
                    <span style="display:block;padding:6px 5px;background:#ecf2ff;color:#4671d5" v-if="scope.row.noticeType == 'common_notice'">普通公告</span>
                    <span style="display:block;padding:6px 5px;background:#fff4e0;color:#ffa300" v-if="scope.row.noticeType == 'change_notice'">变更公告</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="recorderName" label="申请人" width="170" align="center"></el-table-column>
              <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
              <el-table-column prop="statusName" label="状态" width="170" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.statusName ==  '草稿' || scope.row.statusName ==  '审核中'" style="display:inline-block;width:10px;height:10px;background:#b4b4b4;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  <span v-else style="display:inline-block;width:10px;height:10px;background:#93b42c;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  {{scope.row.statusName}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作" align="center" width="200" fixed="right">
                <template slot-scope="scope">
                   <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                  <el-button type="text" size="small"
                             v-if="(scope.row.status!=='notice_draft')&&button.resourceId=='announce_viewaudit'"
                             @click="viewDeal(scope.row.procInsId)">查看审核结果</el-button>
                  <el-button type="text" size="small" @click="publicNotice(scope.row.id, 'notice_revoke')"
                             v-if="scope.row.status==='notice_published'&&scope.row.isMine==0&&button.resourceId=='announce_public' && scope.row.isShowBg==0" >撤销发布
                  </el-button>
                  <el-button type="text" size="small"
                             v-if="scope.row.Status==='notice_published'&&scope.row.isMine==0&&button.resourceId=='announce_addedit'&& scope.row.isShowBg==0"
                             @click="chagngeAdd(scope.row.id)">创建变更公告</el-button>
                  <el-button type="text" size="small"
                             v-if="scope.row.isMine==1 &&button.resourceId=='announce_view'"
                             @click="chagngeDetail(scope.row.id)">查看详情</el-button>
                   </span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
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
                <div class="button_bg" @click="serach()">查询</div>
                <div class="button_default" @click="resetForm()">重置</div>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top:35px;">
            <div class="toolsTitleBox">
              <span class="toolsTitle">公告信息</span>
              <div class="oper">
                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                <span v-if="button.resourceId=='announce_add'" class="btn" @click="handleAdd()">新增</span>
                <span v-if="button.resourceId=='announce_delete'" class="btn" @click="handleDelete()">删除</span>
                </span>
              </div>
            </div>
            <el-table
              :data="announcementDatamyann"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              style="width: 100%"
              border
              row-key="id"
              @selection-change="handleSelectionChange"
              :default-expand-al="true"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="公告标题" width="320" align="center">
                <template slot-scope="scope">
                  <span @click="chagngeDetail(scope.row.id)" style="display:block; color: #4671d5; cursor:pointer;">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="noticeNo" label="公告编号" width="320" align="center"></el-table-column>
              <el-table-column prop="noticeTypeName" label="公告类型" align="center">
                <template slot-scope="scope">
                  <div>
                    <span style="display:block;padding:6px 5px;background:#ecf2ff;color:#4671d5" v-if="scope.row.noticeType == 'common_notice'">普通公告</span>
                    <span style="display:block;padding:6px 5px;background:#fff4e0;color:#ffa300" v-if="scope.row.noticeType == 'change_notice'">变更公告</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="recorderName" label="申请人" width="170" align="center"></el-table-column>
              <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeDate)[0]:''}}
            </template></el-table-column>
              <el-table-column prop="statusName" label="状态" width="170" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.statusName ==  '草稿' || scope.row.statusName ==  '审核中'" style="display:inline-block;width:10px;height:10px;background:#b4b4b4;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  <span v-else style="display:inline-block;width:10px;height:10px;background:#93b42c;border-radius: 50%;line-height:23px;margin-right:15px"></span>
                  {{scope.row.statusName}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作" align="center" width="300" fixed="right">
                <template slot-scope="scope">
                  <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                  <el-button type="text" size="small"
                             v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_edit'"
                             @click="correct(scope.row.id,scope.row.fileTemplateCode, scope.row.isShowBg)">修改</el-button>
                  <el-button type="text" size="small" @click="startProcess(scope.row, 'notice_audit')"
                             v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_submit'">提交</el-button>
                  <el-button type="text" size="small"
                             v-if="scope.row.status==='notice_draft'&&button.resourceId=='announce_delete'"
                             @click="deleteRow(scope.row.id)">删除</el-button>
                  <el-button type="text" size="small"
                             v-if="(scope.row.status=='notice_rejected')&&button.resourceId=='announce_viewaudit'&&scope.row.procInsId"
                             @click="viewDeal(scope.row.procInsId)">查看审核结果</el-button>
                  <el-button type="text" size="small" @click="resubmit(scope.row.id, scope.row.isShowBg)"
                             v-if="scope.row.status==='notice_rejected'&&button.resourceId=='announce_resubmit' && scope.row.isResubmitNotice != 1">重新提交</el-button>
                  <el-button type="text" size="small" @click="publicNotice(scope.row.id, 'notice_published', scope.row.isShowBg)"
                             v-if="scope.row.status==='notice_approve'&&button.resourceId=='announce_public'"
                             :disable="isDisable">发布</el-button>
                  <el-button type="text" size="small"
                             v-if="scope.row.status!=='notice_draft'&&button.resourceId=='announce_view'"
                             @click="chagngeDetail(scope.row.id)">查看详情</el-button>
                    <el-button type="text" size="small" @click="noticeRevoke(scope.row.id)"
                               v-if="scope.row.status==='notice_revoke' && scope.row.isResubmit != 1 &&button.resourceId=='announce_revoke' && scope.row.isShowBg==0">重新发布</el-button>
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
                    v-if="scope.row.status==='notice_published'&&button.resourceId=='announce_public'&& scope.row.isShowBg==0"
                  >撤销发布</el-button>
                  <el-button
                    type="text"
                    size="small"
                    v-if="scope.row.status==='notice_published'&&button.resourceId=='announce_addedit'&& scope.row.isShowBg==0"
                    @click="chagngeAdd(scope.row.id)"
                  >创建变更公告</el-button>
                    <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.status==='notice_approve'&&button.resourceId=='announce_cancel'&& scope.row.isShowBg==1"
                      @click="publicNotice(scope.row.id,'notice_cancel')"
                    >作废</el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
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

    <el-dialog title="审核" width="40%" class="abow_dialog" :visible.sync="dialogForm" v-if="dialogForm">
      <template>
        <div id="dialog">
          <actDialog :actInfo="actInfo" @patch="actResult"/>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
    import transferTable from "@/components/transferTable";
    import Axios from "axios";
    import Bus from "../../../../../utils/bus";
    import {mapActions, mapState} from "vuex";
    import qs from 'qs'

    export default {
        name: 'announcementInfo',
        components: {
            transferTable
        },
        data() {
            return {
                actInfo: {},
                ids: "",
                active: 1,
                tab: 1,
                form: {
                    assessor: "审核通过",
                    opinion: ""
                },
                dialogForm: true,
                activeTabs: 'pending',
                currentTabs: 'pending',
                announcementDataTitle: [
                    {prop: "title", title: "公告标题"},
                    {prop: "noticeNo", title: "公告编号"},
                    {prop: "noticeTypeName", title: "公告类型"},
                    {prop: "recorderName", title: "申请人"},
                    {prop: "noticeDate ", title: "公告日期"},
                    {prop: "statusName", title: "状态"}
                ],
                AuditrecordData: [
                    {
                        no: "01",
                        auditor: "审核人",
                        identity: "县长",
                        status: "通过",
                        statusKey: 1,
                        time: "2018-5-3 10:34:24",
                        opinion: "查看详情"
                    },
                    {
                        no: "01",
                        auditor: "审核人",
                        identity: "县长",
                        status: "通过",
                        statusKey: 1,
                        time: "2018-5-3 10:34:24",
                        opinion: "查看详情"
                    },
                    {
                        no: "01",
                        auditor: "审核人",
                        identity: "县长",
                        status: "通过",
                        statusKey: 1,
                        time: "2018-5-3 10:34:24",
                        opinion: "查看详情"
                    },
                    {
                        no: "01",
                        auditor: "审核人",
                        identity: "县长",
                        status: "通过",
                        statusKey: 1,
                        time: "2018-5-3 10:34:24",
                        opinion: "查看详情"
                    }
                ],
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
                announcementDatapend: [
                    {
                        id: 1,
                        title: "济南市国有建设用地二级市场网上挂牌",
                        noticeNo: "济国土资告字（2019）2号",
                        noticeTypeName: "普通公告",
                        publishUserId: "张三",
                        noticeDate: "2019-01-05",
                        children: [
                            {
                                id: 11,
                                title: "济南市国有建设用地二级市场网上挂牌",
                                noticeNo: "济国土资告字（2019）2号",
                                noticeTypeName: "普通公告",
                                publishUserId: "张三",
                                noticeDate: "2019-01-05",
                                Status: 1,
                                statusName: "审核中"
                            },
                            {
                                id: 12,
                                title: "济南市国有建设用地二级市场网上挂牌",
                                noticeNo: "济国土资告字（2019）2号",
                                noticeTypeName: "普通公告",
                                publishUserId: "张三",
                                noticeDate: "2019-01-05",
                                Status: 1,
                                statusName: "审核中"
                            }
                        ]
                    },
                    {
                        title: "济南市国有建设用地二级市场网上挂牌",
                        noticeNo: "济国土资告字（2019）2号",
                        noticeTypeName: "普通公告",
                        publishUserId: "张三",
                        noticeDate: "2019-01-05",
                        Status: 2,
                        statusName: "审核通过"
                    },
                    {
                        title: "济南市国有建设用地二级市场网上挂牌",
                        noticeNo: "济国土资告字（2019）2号",
                        noticeTypeName: "普通公告",
                        publishUserId: "张三",
                        noticeDate: "2019-01-05",
                        Status: 2,
                        statusName: "审核通过"
                    },
                    {
                        title: "济南市国有建设用地二级市场网上挂牌",
                        noticeNo: "济国土资告字（2019）2号",
                        noticeTypeName: "普通公告",
                        publishUserId: "张三",
                        noticeDate: "2019-01-05",
                        Status: 2,
                        statusName: "审核通过"
                    }
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 1,
                    //   statusName: "审核中"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 1,
                    //   statusName: "审核中"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 1,
                    //   statusName: "审核中"
                    // },
                    // {
                    //   title: "济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // }
                ],
                announcementDataporce: [
                    // {
                    //   title: "11111111济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 1,
                    //   statusName: "审核拒绝"
                    // },
                    // {
                    //   title: "11111111济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   title: "11111111济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 3,
                    //   statusName: "审核中"
                    // },
                    // {
                    //   title: "11111111济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 4,
                    //   statusName: "已发布",
                    //   statusNameMe: 1
                    // },
                    // {
                    //   title: "11111111济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 4,
                    //   statusName: "已发布",
                    //   statusNameMe: 2
                    // }
                ],
                announcementDatamyann: [
                    // {
                    //   id: 1,
                    //   title: "33333333333济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 1,
                    //   statusName: "草稿"
                    // },
                    // {
                    //   id: 2,
                    //   title: "33333333333济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 2,
                    //   statusName: "审核中"
                    // },
                    // {
                    //   id: 3,
                    //   title: "33333333333济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 3,
                    //   statusName: "审核通过"
                    // },
                    // {
                    //   id: 4,
                    //   title: "33333333333济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 4,
                    //   statusName: "审核不通过"
                    // },
                    // {
                    //   id: 5,
                    //   title: "33333333333济南市国有建设用地二级市场网上挂牌",
                    //   noticeNo: "济国土资告字（2019）2号",
                    //   noticeTypeName: "普通公告",
                    //   publishUserId: "张三",
                    //   noticeDate: "2019-01-05",
                    //   Status: 5,
                    //   statusName: "已发布"
                    // }
                ],
                announcementDatapend: [],
                announcementDataporce: [],
                announcementDatamyann: [],
                multipleSelection: [],
                isShowProvince: true,
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
                transferModeoptions: [
                    {
                        value: "选项1",
                        label: "土地转让"
                    },
                    {
                        value: "选项2",
                        label: "土地出租"
                    }
                ],
                value: "",
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
                handleData: "",
                dialogForm: false,
                dialogTable: false,
                dialogTest: false,
                currentPage: 1,
                pageNo: 1, //页码
                pageSize: 5, //每页显示条数
                totalPage: 1,
                totalRecord: 1,
                searchInfo: {},
                tableData1: [],
                labelPosition: "right",
                formTest: {
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                loading: true,
                currentId: '',
                //按钮组、主题
                buttons: [],
                CancelToken: '', //axios请求暂停函数
                isDisable:'',
            };
        },
        created() {
            this.CancelToken = this.$http.CancelToken //请求停止对象
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


            if(this.tab == 3){
                param['noticeType'] = 'common_notice'
            }

            this.init(param);
        },
        mounted() {
            //提交成功跳转进入时触发
            Bus.$on('announSuccess', (val) => {
                this.activeTabs = "myAnnounce"
                let param = {
                    page: this.pageNo,
                    rows: this.pageSize,
                    tab: 3,
                    noticeType: 'common_notice'
                };
                this.init(param);
            })
        },
        methods: {
            //重新提交按钮
            resubmit(id, isShowBg) {
              debugger
                //重新复制该条数据，将数据返回到前端，跳转编辑页面
                this.$get("/epf-trade/admin/transnotice/resubmitNotice", {id: id}).then(res => {
                    if (res.code != 0) {
                        this.$message.error(res.msg);
                        return
                    }
                    let routerPath = "";
                    let title = "";
                    console.log("获取的数据：", res.resubmitNotice)
                    if(isShowBg == 0){ // 普通公告的重新提交
                      routerPath = "announcementInfoAmend?id=" + id + "&&resubmitNotice=" + res.resubmitNotice;
                      title = "重新提交公告信息";
                    }else{ // 变更公告的重新提交
                      routerPath = "announcementInfoChangeAdd?id=" + id + "&&resubmitNotice=" + res.resubmitNotice;
                      title = "重新提交变更公告信息";
                    }
                    let tabObj = {title, routerPath};
                    this.setTabsList(tabObj);
                    this.$router.push({path: routerPath, query: {id: id, resubmitNotice: res.resubmitNotice}});
                }).catch(error => {
                    console.log(error)
                })

            },
            //重新发布按钮
            noticeRevoke(id) {
                this.$get("/epf-trade/admin/transnotice/getNoticeRevoke", {id: id}).then(res => {
                    if (res.code != 0) {
                        this.$message.error(res.msg);
                        return
                    }
                    console.log("获取的数据：", res.noticeRevoke)
                    let routerPath = "announcementInfoAmend?id=" + id + "&&noticeRevoke=" + res.noticeRevoke;
                    let title = "重新发布公告信息";
                    let tabObj = {title, routerPath};
                    this.setTabsList(tabObj);
                    this.$router.push({path: routerPath, query: {id: id, noticeRevoke: res.noticeRevoke}});
                }).catch(error => {
                    console.log(error)
                })
            },
            ...mapActions(["setTabsList"]),
            init(params) {
                this.loading = true;
                let that = this
                var url = "/epf-trade/admin/transnotice/getTransNoticeList"
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
                    Bus.$emit('transferaudit', 'examine')//需要审核
                })
            },
            view(obj) {
                this.actInfo = obj;
                this.$nextTick(() => {
                    Bus.$emit('transferaudit', 'view')//只是预览
                })
                this.dialogForm = true;
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
                this.$post("/epf-trade/admin/transnotice/revocationIssue", {
                    "id": id,
                    "status": publishStatus,
                    "type":this.actInfo.isShowBg
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
            publicNotice(id, status,type) {
              // 如果是撤销发布
              let that = this;
              if(status == 'notice_revoke') {
                this.$get(
                  "/epf-trade/admin/transtarget/getTransTargetListByNoticeId",
                  {id: id}
                ).then(res => {
                  if (res.code == "0") {
                    let flag = false;
                    let sysTime = new Date().getTime();
                    let targetList = res.pager.results; // 当前公告所绑定的标的集合
                    for(let i = 0; i < targetList.length; i++){
                      let beginApplyTime = new Date(targetList[i].beginApplyTime).getTime();
                      if(beginApplyTime <= sysTime){
                        flag = true; // 不能撤销
                        break;
                      }else{
                        continue;
                      }
                    }
                    if(flag){
                      this.$message.error("标的已开始竞买，不能撤销发布公告!"); //失败
                    }else{
                      this.$confirm('撤销发布以后，公告将不能再发布，确认撤销吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      })
                        .then(() => {
                          that.setRequestMethod(id, status,type);
                        })
                        .catch(() => {
                          this.$message({
                            type: 'info',
                            message: '取消撤销发布成功！'
                          })
                        })
                    }
                  }
                });
              }else if(status == 'notice_cancel'){ // 作废
                this.$confirm('公告作废以后，将不能发布，是否确认作废 ？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                    .then(() => {
                      that.setRequestMethod(id, status,type);
                    })
                    .catch(() => {
                      this.$message({
                        type: 'info',
                        message: '取消作废成功！'
                      })
                    })
              }else{
                that.setRequestMethod(id, status,type);
              }
            },
            setRequestMethod(id, status,type){
              console.log("type="+type)
                this.isDisable = true;
                if(this.isDisable){
                  //notice_published
                  this.$post(
                    "/epf-trade/admin/transnotice/revocationIssue",
                    {"id": id, "status": status,"type":type}
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
                      if(index == 3){
                        param.noticeType = 'common_notice'
                      }
                      this.init(param);
                    } else {
                      this.$message.error(res.msg);
                      this.isDisable = false;
                    }
                  });
                }
            },
            viewDeal(procInsId) {
                let routerPath = "announctInfoDealresultsuccess";
                let title = "审核结果";
                let tabObj = {title, routerPath};
                this.setTabsList(tabObj);
                this.$router.push({path: routerPath, query: {'id': procInsId}});
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
                  let noticeList = res.list; // 当前公告子集合
                  console.log('子公告集合', noticeList)
                  for(let i = 0; i < noticeList.length; i++){
                    let status = noticeList[i].status;
                    if(status == 'notice_audit'){
                      console.log('status', 'notice_audit')
                      flag = true; // 不能创建变更功能
                      message = "该公告下有一条变更公告正在审核中，暂时不能创建新的变更公告!";
                      break;
                    }else if(status == 'notice_approve'){
                      console.log('status', 'notice_approve')
                      flag = true; // 不能创建变更功能
                      message = "该公告下有一条审核通过的变更公告，请先发布或作废该变更公告，才能创建新的变更公告!";
                      break;
                    }else{
                      continue;
                    }
                  }
                  if(flag){
                    this.$message.error(message); //失败
                  }else{
                    let routerPath = "announcementInfoChangeAdd";
                    let title = "新增变更公告";
                    let tabObj = {title, routerPath};
                    this.setTabsList(tabObj);
                    this.$router.push({path: routerPath, query: {id: id}});
                  }
                }
              });
            },
            chagngeDetail(id) {
                let routerPath = "/announcementInfoChangedetail?id=" + id;
                let title = "公告详情";
                let tabObj = {title, routerPath};
                this.setTabsList(tabObj);
                this.$router.push({path: routerPath, query: {id: id}});
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
                this.tab = index;
                let param = {
                    // status: this.announcementForm.statusName,
                    page: this.pageNo,
                    rows: this.pageSize,
                    tab: index,
                    title: '',
                    status: ''
                };
                if(index == 3){
                    param.noticeType = 'common_notice'
                }
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

                if(index == 3 && !param.noticeType){
                    param.noticeType = 'common_notice'
                }

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
                let routerPath = "announcementInfoAdd";
                let title = "新增公告信息";
                let tabObj = {title, routerPath};
                this.setTabsList(tabObj);
                this.$router.push({path: routerPath});
            },
            correct(id, fileId, isShowBg) {
                if(isShowBg == 0){
                  let routerPath = "announcementInfoAmend?id=" + id;
                  let title = "修改公告信息";
                  let tabObj = {title, routerPath};
                  this.setTabsList(tabObj);
                  this.$router.push({path: routerPath, query: {id: id}});
                }else{
                  let routerPath = "announcementInfoChangeAmend?id=" + id;
                  let title = "修改变更公告信息";
                  let tabObj = {title, routerPath};
                  this.setTabsList(tabObj);
                  this.$router.push({path: routerPath, query: {id: id, edit: "edit"}});
                }
            },
            deleteRow(id) {
                let that = this;
                let url = "/epf-trade/admin/transnotice/deleteTransNotice";
                if (confirm("确定要删除吗")) {
                    this.$post(url, {id: id}).then(res => {
                        if (res.code === 0) {
                            that.$message.warning(res.msg);
                            let param = {
                                page: this.pageNo,
                                rows: this.pageSize,
                                tab: 3,
                                noticeType: 'common_notice'
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
                        this.$post('/epf-trade/admin/transnotice/deleteTransNotice', {id: this.ids}).then(res => {
                            if (res.code == "0") {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                let param = {
                                    page: this.pageNo,
                                    rows: this.pageSize,
                                    tab: 3,
                                    noticeType : 'common_notice'
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
            viewDeatil(item) {
                this.$router.push({
                    path: "/announcementInfoDetail",
                    query: {noticeNo: item.noticeNo}
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
            handleSelectionChange(val) { //勾选公告信息提交
                this.ids = this.getIDs(val);
                this.multipleSelection = val;
            },
            handleSubmit() {
                let multirow = this.multipleSelection;
                if (this.ids == "") {
                    this.$message({
                        type: "info",
                        message: "请选择公告信息！"
                    });
                    return;
                }
                let multirowid = this.ids.split(',');
                console.log("提交的值", multirowid);
                console.log("状态", multirow);
                this.$confirm("确认提交，是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$post(`/epf-trade/admin/transnotice/updateTransNoticeStatus?noticeIds=${[multirowid]}`).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                type: "success",
                                message: "提交成功!"
                            });
                            let params = {
                                status: this.statusName,
                                page: this.pageNo,
                                rows: this.pageSize
                            };

                            if(this.params.tab == 3){
                                params['noticeType'] = 'common_notice'
                            }


                            this.init(params);
                        } else {
                            this.$message.error(res.msg); //失败
                        }
                    })
                });
            },
            handleClick(item) {
                this.$router.push({
                    path: "/announcementInfoAmend",
                    query: {noticeNo: item.noticeNo}
                });
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


                if(index == 3 && !this.searchInfo.noticeType){
                    this.searchInfo.noticeType = 'common_notice'
                }

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


                if(index == 3 && !this.searchInfo.noticeType){
                    this.searchInfo.noticeType = 'common_notice'
                }

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
                    tab: index,
                    noticeType: ''
                };


                if(index == 3){
                    param.noticeType = 'common_notice'
                }

                this.init(param);
            },
            // 提交启动流程
            startProcess(obj, status) {
              let multirowid = []
              multirowid.push(obj.id)
                  //执行自己的方法，后台判断启动与否
                  this.$post("/epf-trade/admin/transnotice/revocationIssue", {
                      id: obj.id,
                      status: status,
                      type: obj.isShowBg
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


                          if(index == 3){
                              param['noticeType'] = 'common_notice'
                          }


                          this.init(param);
                      }
                  });
            }
        }
    };
</script>
<style scoped lang="scss">

  


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

 

  

  .filter_wrap {
    .el-tree /deep/ .el-tree-node__expand-icon.expanded{
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    /deep/ .el-table__body  tbody .el-table__expand-icon--expanded{
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
   
    /deep/ .el-table  .el-table__body tbody tr td:nth-child(2) .cell{
      padding-left:30px;
      padding-right: 0px; 
      text-align: left;
     }
    /deep/ .el-table  .el-table__body tbody tr td:nth-child(3) .cell{
      padding-left:30px;
      padding-right: 0px; 
      text-align: left;

     }
    /deep/ .el-table  .el-table__header thead tr th:nth-child(2)>.cell{
      padding-left:30px;
      padding-right: 0px; 
      text-align: left;
     }
    /deep/ .el-table  .el-table__header thead tr th:nth-child(3)>.cell{
      padding-left:30px;
      padding-right: 0px; 
      text-align: left;
     }
    //有子节点 且未展开
    .el-table /deep/ .el-icon-arrow-right:before {
      position: absolute;
      left: -25px;
      top: 0;
      background: url('../../../../../assets/images/open.png') center;
      content: '';
      display: block;
      width: 17px;
      height: 17px;
      font-size: 16px;
      background-size: 16px;
    }
    .el-table /deep/ .el-table__expand-icon{
      display: block;
      height:0px;
      .el-icon-arrow-right:before {
        background: url('../../../../../assets/images/open.png') no-repeat center;
        content: '';
        display: block;
        width: 17px;
        height: 17px;
        font-size: 18px;
      }

    }
    //有子节点 且已展开
    .el-table /deep/ .el-table__expand-icon--expanded {
       display: block;
       height:0px;
      .el-icon-arrow-right:before {
        background: url('../../../../../assets/images/close.png') no-repeat center;
        content: '';
        display: block;
        width: 17px;
        height: 17px;
        font-size: 18px;
      }
    }
    
    //没有子节点
    .el-tree /deep/.el-tree-node__expand-icon.is-leaf::before
    .el-table /deep/.el-table__placeholder::before {
      content: '';
      display: block;
      width: 17px;
      height: 17px;
      font-size: 16px;
    }
  }

  .filter_title {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding-right: 10px;
    text-align: right;
    line-height: 34px;
  }

  .dialogTitle {
    text-align: center;
  }

  .dialogTitle .title {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    line-height: 40px;
  }

  .dialogTitle .subtitle li {
    display: inline-block;
    line-height: 50px;
    color: #999999;
    font-size: 14px;
    margin-right: 40px;
  }

  .dialogTitle .subtitle li span {
    color: #666666;
  }


  .filter_wrap .el-input--small .el-input__inner {
    height: 34px;
  }

  .filter_wrap .el-row {
    margin-bottom: 10px;
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

  /* .el-table th,
  .el-table tr {
    border:1px solid #ebeef5;
  } */
  .el-textarea .el-textarea__inner {
    width: 100%;
    height: 100% !important;
  }

  .el-tabs--border-card {
    border-bottom: none;
    box-shadow: none;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #ffa000;
  }

  .el-tabs--top .el-tabs__item.is-top:hover {
    color: #ffa000;
  }
</style>
