<template>
  <!-- <div>项目交易汇总分析详情</div> -->
    <epf-container title="项目交易汇总分析详情页">
        <div class="epf_term_box">
            <table
                width="100%"
                border="1"
                cellpadding="0"
                cellspacing="0"
                bordercolor="#dcdfe6"
                style="table-layout:fixed;"
                >
                <tr height="50px">
                    <td width="37%">
                    <span class="left_text special_text_four">标的编号：</span>
                    {{collectDetail.targetNo}}
                    </td>
                    <td width="37%">
                    <span class="left_text special_text_four">起始价：</span>
                    {{collectDetail.beginPrice}}
                    </td>
                    <td width="26%">
                    <span class="left_text special_text_four">地块数：</span>
                    {{collectDetail.goodsCount}}
                    </td>
                </tr>
                <tr height="50px">
                    <td width="37%">
                    <span class="left_text special_text_four">行政区域：</span>
                    {{collectDetail.cantonProvinceName}}-{{collectDetail.cantonCityName}}-{{collectDetail.cantonAreaName}}
                    </td>
                    <td width="37%">
                    <span class="left_text special_text_four">交易类型：</span>
                    {{collectDetail.circulationName}}
                    </td>
                    <td width="26%">
                    <span class="left_text special_text_four">交易状态：</span>
                    {{collectDetail.statusName}}
                    </td>
                </tr>
            </table>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">地块详情</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="dealData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 260"
                    tooltip-effect="dark"
                    >
                    <el-table-column label="序号" min-width="90" align="center">
                        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="地块编号" min-width="200"></el-table-column>
                    <el-table-column label="地块信息" min-width="280">
                        <template slot-scope="scope">
                        <p>土地性质：{{scope.row.landCharName}}</p>
                        <p>用途：{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="行政区域" min-width="240">
                        <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="location"
                        label="土地位置"
                        min-width="320"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column prop="years" label="使用年限" min-width="180"></el-table-column>
                    <el-table-column prop="area" label="面积（平方米）" min-width="180" fixed="right"></el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :page-sizes="[1,5,10,15,20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                        :current-page="currentPage"
                        :page-size="pageSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </epf-container>
</template>

<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
        dealData: [],
        //页码
        currentPage: 1,
        pageNo: 1, //页码
        pageSize: 5, //每页条数
        totalPage: 1,
        totalRecord: 1,

        loading: true,
        targetId: ""
        };
    },
    methods: {
        //获取列表
        getList() {
        this.loading = true;
        this.targetId = this.collectDetail.targetId;
        this.$get(
                `/epf-monitor/statistics/trans/findGoodsListByTargetId?page=${this.pageNo}&rows=${this.pageSize}&targetId=${this.targetId}`
            ).then(res => {
                console.log(res);
                if (res.code == "0") {
                this.dealData = res.pager.results;
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
            });
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
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        this.getList();
    },
    computed: {
        ...mapState("deal", ["collectDetail"]),
        newRender: function() {
        this.targetId = this.collectDetail.targetId;
        this.getList(this.collectDetail.targetId);
        }
    }
};
</script>

<style>
.left_text {
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}
.special_text_five {
  width: 85px;
  text-align: right;
  display: inline-block;
}
.special_text_four {
  width: 70px;
  text-align: right;
  display: inline-block;
}
</style>
