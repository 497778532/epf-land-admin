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
            :model="mydata.transTarget"
            :rules="rules"
            ref="mydata.transTarget"
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
                    <el-form-item label="允许联合竞买：" prop="isAisJointBidding">
                      <el-radio-group v-model="mydata.transTarget.isAisJointBidding">
                        <el-radio label="0" value="0">是</el-radio>
                        <el-radio label="1" value="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="允许网上直播：" prop="isLiveWebcast">
                      <el-radio-group v-model="mydata.transTarget.isLiveWebcast">
                        <el-radio label="0" value="0">是</el-radio>
                        <el-radio label="1" value="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="交易中心：" prop="tradingCenter">

                      <el-select v-model="mydata.transTarget.tradingCenter" placeholder="请选择">
                        <el-option
                          v-for="item in orgs"
                          :label="item.orgName"
                          :value="item.id"
                          :key="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="资格审核：" prop="isAfterCheck">
                      <el-radio-group v-model="mydata.transTarget.isAfterCheck">
                        <el-radio label="0" value="0">前置资格审核</el-radio>
                        <el-radio label="1" value="1">后置资格审核</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item prop="businessType" label="流转方式：">
                      <el-select
                        style="width:360px;"
                        placeholder="请选择"
                        v-model="mydata.transTarget.businessTypeName"
                        @change="flowModeSelect(dictionary.flow_mode,mydata.transTarget.businessTypeName,$event)"
                      >
                        <el-option
                          v-for="item in dictionary.flow_mode"
                          :ref="item.zhCn"
                          :dictKey="item.dictKey"
                          :label="item.zhCn"
                          :value="item.zhCn"
                          :key="item.dictKey"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item prop="transType" label="交易方式：">
                      <el-select
                        style="width:360px;"
                        placeholder="请选择"
                        v-model="mydata.transTarget.transType"
                        @change="transTypeStatusSelect(transTypeList,mydata.transTarget.transType,$event)"
                      >
                        <el-option
                          v-for="item in transTypeList"
                          :id="item.id"
                          :label="item.name"
                          :value="item.id"
                          :key="item.id"
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
                    <el-form-item label="起始价：" prop="beginPrice">
                      <el-input
                        v-model="mydata.transTarget.beginPrice"
                        placeholder="0.2"
                        style="width:360px;"
                      ></el-input>
                      <span style="margin-left:20px;">万元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞价阶梯：" prop="priceStep">
                      <el-input
                        v-model="mydata.transTarget.priceStep"
                        placeholder="1"
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
                    <el-form-item label="竞买资格条件：" prop="transCondition">
                      <el-input
                        type="textarea"
                        maxlength="200"
                        minlength="0"
                        show-word-limit
                        autosize
                        v-model="mydata.transTarget.transCondition"
                        placeholder="请输入竞买资格条件，200字以内"
                        style="width:90%;height:120px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="条件设置部门：" prop="conditionOrganName">
                      <el-select
                        v-model="mydata.transTarget.conditionOrganName"
                        placeholder="请选择"
                        style="width:360px;"
                      >
                        <el-option label="规划处" value="规划处"></el-option>
                        <el-option label="市场处" value="市场处"></el-option>
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
                    <el-form-item label="公告开始时间：" prop="beginNoticeTime">
                      <el-date-picker
                        :editable="false"
                        @change="beginNoticeTimeClick()"
                        v-model="beginNoticeTime"
                        type="datetime"
                        align="right"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="竞买申请开始时间：" prop="beginApplyTime">
                      <el-date-picker
                        :editable="false"
                        @change="beginApplyTimeClick()"
                        v-model="beginApplyTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li v-if="isShow">
                    <el-form-item label="挂牌开始时间：" prop="beginFocusTime">
                      <el-date-picker
                        :editable="false"
                        @change="beginFocusTimeClick()"
                        v-model="beginFocusTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li v-if="isShow">
                    <el-form-item label="挂牌截止时间：" prop="endFocusTime">
                      <el-date-picker
                        :editable="false"
                        @change="endFocusTimeClick()"
                        v-model="endFocusTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="保证金缴纳截止时间：" prop="endEarnestTime">
                      <el-date-picker
                        :editable="false"
                        @change="endEarnestTimeClick()"
                        v-model="endEarnestTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                      <!-- v-model="mydata.transTarget.endEarnestTime" -->
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="限时竞价开始时间：" prop="beginLimitTime" v-if="isShow">
                      <el-date-picker
                        :editable="false"
                        @change="beginLimitTimeClick()"
                        v-model="beginLimitTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拍卖开始时间：" prop="beginLimitTime" v-else>
                      <el-date-picker
                        :editable="false"
                        @change="beginLimitTimeClick()"
                        v-model="beginLimitTime"
                        type="datetime"
                        placeholder="选择日期"
                        style="width:400px;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="operfirst">
                <el-button type="danger" @click="submitForm('mydata.transTarget')">下一步</el-button>
                <!-- <el-button type="danger" @click="next()">下一步</el-button> -->
              </div>
            </div>
          </el-form>
          <el-form>
            <div class="Secondstep" v-if="active===1">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">绑定地块信息</h2>
                <div class="operfirst" style="float: right;line-height:55px">
                  <el-button type="danger" @click="getPraceData()">选择</el-button>
                  <el-button type="danger" class="del" @click="handleDelAll()">删除</el-button>
                </div>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="bindingBlockInfo.slice((local_currentPage-1)*local_pageSize,local_currentPage*local_pageSize)"
                    style="width: 100%,"
                    border
                    @selection-change="handleSelectionDel"
                    v-model="mydata.transGoods"
                  >
                    <el-table-column type="selection" width="80" align="center"></el-table-column>
                    <el-table-column prop="goodsNo" label="地块编号" width="230" align="center"></el-table-column>
                    <el-table-column prop="circulationName" label="流转方式" width="150" align="center"></el-table-column>
                    <el-table-column prop="isBinding" label="地块状态" width="230" align="center">
                      <template slot-scope="scope">
                        <span :class="scope.row.isBinding==1?'default':''"></span>
                        <span :class="scope.row.isBinding==0?'success':''"></span>
                        <span v-if="scope.row.isBinding==0">已绑定</span>
                        <span v-else>未绑定</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="firstClassUseName" label="用途" width="530" align="center"></el-table-column>
                    <el-table-column prop="recorderName" label="经办人" width="190" align="center"></el-table-column>
                    <el-table-column label="操作" width="210" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                          @click="handleDelRow(scope.$index,scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>

                    <template slot="empty">
                      <!-- <img src="../../../../../../static/css/img/nodata.jpg" alt> -->
                    </template>
                  </el-table>
                  <div style="text-align:right;margin:22px 0px;">
                    <el-pagination
                      layout="total, prev, pager, next, sizes, jumper"
                      :page-sizes="[2,5,10]"
                      :page-size="local_pageSize"
                      :total="bindingBlockInfo.length"
                      @current-change="local_handleCurrentChange"
                      @size-change="local_handleSizeChange"
                      background
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">保证金</h2>
                <div class="operfirst" style="float: right;line-height:55px">
                  <el-button type="danger" @click="addRow()">新增</el-button>
                  <el-button type="danger" class="del" @click="deleteChecked()">删除</el-button>
                </div>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-table
                    ref="multipleTable"
                    :data="marginPrice"
                    border
                    @selection-change="currencyChange"
                    style="width: 100%;"
                  >
                    <el-table-column type="selection" width="80" align="center"></el-table-column>
                    <el-table-column label="币种" width="570" align="center">
                      <template slot-scope="scope">
                        <el-select
                          v-model="scope.row.currency"
                          size="mini"
                          placeholder="请选择币种"
                          style="width:100%;"
                        >
                          <el-option
                            v-for="item in dictionary.trade_currency"
                            :ref="item.zhCn"
                            :id="item.id"
                            :dictKey="item.dictKey"
                            :label="item.zhCn"
                            :value="item.dictKey"
                            :key="item.dictKey"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column label="金额（万元）" width="470" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.amount" size="mini" placeholder="请输入金额，为整数"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="deleteRow(scope.$index)">删除</el-button>

                        <!-- <el-button type="text" size="small" @click="confirmRow(scope.$index, scope.row)">确认</el-button> -->

                        <!-- <el-button type="text" size="small" @click="cancelRow(scope.$index)">取消</el-button> -->
                      </template>
                    </el-table-column>
                    <template slot="empty">
                      <!-- <img src="../../../../../../static/css/img/nodata.jpg" alt> -->
                    </template>
                  </el-table>
                </div>
              </div>
              <div class="operfirst" style="margin-left:0;margin-top:20px">
                <el-button type="danger" @click="prev" class="prevstep">上一步</el-button>
                <el-button type="danger" @click="next">下一步</el-button>
              </div>
            </div>
            <div class="thirdstep" v-if="active===2">
              <EPF-switchTitle titles_h='标的附件清单' padding='0' background='#fff' :shutOff='false'>
                <EPF-annexList
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
              <div class="operfirst" style="margin:30px 0 0 0;">
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
      <el-dialog title="选择地块信息" :visible.sync="centerDialogVisible" width="60%">
        <el-form ref="filterData" :model="filterData">
          <el-row>
            <el-col :span="24">
              <el-col :span="2">
                <span class="filter_title">地块编号 :</span>
              </el-col>
              <el-col :span="7">
                <el-input v-model="goodsNo" autocomplete="off" style="width:100%;"></el-input>
              </el-col>
              <el-col :span="2">
                <span class="filter_title">土地用途 :</span>
              </el-col>
              <el-col :span="7">
                <el-select
                  class="filterCirculatemode"
                  v-model="filterData.firstClassUseName"
                  placeholder="请选择土地用途"
                  @change="publishStatusSelect(dictionary.land_use,filterData.firstClassUseName,$event)"
                >
                  <el-option
                    v-for="item in dictionary.land_use"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="filter_title">行政区域 :</span>
            </el-col>
            <el-col :span="12">
              <div style="width:155px;float:left;margin-right:9px;">
                <el-select
                  v-model="filterData.cantonProvinceName"
                  placeholder="所属省"
                  @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
                >
                  <el-option
                    v-for="(item,index) in dictionary.administrative_regions"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
              <div style="width:155px;float:left;margin-right:9px;">
                <el-select
                  v-model="filterData.cantonCityName"
                  placeholder="所属市"
                  @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
                >
                  <el-option
                    v-for="(item,index) in dictionary.cantonCity"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
              <div style="width:155px;float:left;">
                <el-select
                  v-model="filterData.cantonAreaName"
                  placeholder="所属区/县"
                  @change="areaSelect(dictionary.cantonAreaName,filterData.cantonAreaName,$event)"
                >
                  <el-option
                    v-for="(item,index) in dictionary.cantonArea"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
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
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="goodsNo" label="地块编号" width="150" align="center"></el-table-column>
          <el-table-column prop="cantonProvinceName" label="行政区" width="190" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.cantonProvinceName}}</span>>
              <span>{{scope.row.cantonCityName}}</span>>
              <span>{{scope.row.cantonAreaName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="circulationName" label="流转方式" width="105" align="center"></el-table-column>
          <el-table-column prop="isBinding" label="地块状态" width="120" align="center">
            <template slot-scope="scope">
              <span :class="scope.row.isBinding==1?'default':''"></span>
              <span :class="scope.row.isBinding==0?'success':''"></span>
              <span v-if="scope.row.isBinding==0">已绑定</span>
              <span v-else>未绑定</span>
            </template>
          </el-table-column>
          <el-table-column prop="firstClassUseName" label="用途" width="190" align="center"></el-table-column>
          <el-table-column prop="recorderName" label="经办人" width="150" align="center"></el-table-column>
          <el-table-column prop="insertTime" label="创建时间" width="200" align="center"></el-table-column>
          <template slot="empty">
            <!-- <img src="../../../../../../static/css/img/nodata.jpg" alt> -->
          </template>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[1,5,10, 15, 20]"
            :page-size="prace_pageSize"
            @size-change="handleSizeChangeDia"
            @current-change="handleCurrentChangeDia"
            :total="prace_totalRecord"
            :current-page="prace_currentPage"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="mysure" @click="submitGoodsList()">绑定</el-button>
          <el-button class="reset" @click="centerDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
import baseURL1 from '../../../../../utils/config.js'
import Bus from "../../../../../utils/bus";
export default {
  name: "landmarkInfoAdd",

  components: {},
  data() {
      //公告开始时间
      const beginNoticeTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.mydata.transTarget.beginApplyTime){
                  if(this.isShow){
                      //挂牌
                      if(this.mydata.transTarget.beginNoticeTime>=this.mydata.transTarget.beginApplyTime){
                          //公告开始时间要小于竞买申请开始时间
                          callback(new Error("公告开始时间要小于竞买申请开始时间"));
                      }
                  }else{
                      //拍卖
                      if(this.mydata.transTarget.beginNoticeTime>=this.mydata.transTarget.beginApplyTime){
                          //公告开始时间要小于竞买申请开始时间
                          callback(new Error("公告开始时间要小于竞买申请开始时间"));
                      }
                  }
              }
              callback();
          }, 1000);
      };
      //竞买申请开始时间
      const beginApplyTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.isShow){
                  //挂牌
                  if(this.mydata.transTarget.beginNoticeTime){

                      if(this.mydata.transTarget.beginNoticeTime>=this.mydata.transTarget.beginApplyTime){
                          //竞买申请开始时间不能小于公告开始时间
                          callback(new Error("竞买申请开始时间必须大于公告开始时间"));
                      }

                  }else{
                      //请先填写公告开始时间
                      callback(new Error("请先填写公告开始时间"));
                  }
                  if(this.mydata.transTarget.beginFocusTime){
                      if(this.mydata.transTarget.beginFocusTime < this.mydata.transTarget.beginApplyTime){
                          //竞买申请开始时间 不能大于 挂牌开始时间
                          callback(new Error("竞买申请开始时间不能大于挂牌开始时间"));
                      }
                  }
                  //和保证金截止对比  endEarnestTime
                  if(this.mydata.transTarget.endEarnestTime){
                      if(this.mydata.transTarget.endEarnestTime <= this.mydata.transTarget.beginApplyTime){
                          //竞买申请开始时间 不能大于 保证金截止时间
                          callback(new Error("竞买申请开始时间不能大于保证金截止时间"));
                      }
                  }

              }
              else{
                  //拍卖
                  if(this.mydata.transTarget.endEarnestTime){
                      if(this.mydata.transTarget.beginApplyTime>=this.mydata.transTarget.endEarnestTime){
                          //竞买申请开始时间要小于保证金缴纳截止时间
                          callback(new Error("竞买申请开始时间要小于保证金缴纳截止时间"));
                      }
                  }
                  if(this.mydata.transTarget.beginNoticeTime){
                      if(this.mydata.transTarget.beginApplyTime<=this.mydata.transTarget.beginNoticeTime){
                          //竞买申请开始时间不能小于公告开始时间
                          callback(new Error("竞买申请开始时间必须大于公告开始时间"));
                      }
                  }else{
                      //请先填写公告开始时间
                      callback(new Error("请先填写公告开始时间"));
                  }}
              callback();
          }, 1000);
      };
      //挂牌开始时间
      const beginFocusTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.isShow){
                  //挂牌
                  if(this.mydata.transTarget.beginApplyTime){
                      if(this.mydata.transTarget.beginApplyTime>this.mydata.transTarget.beginFocusTime){
                          //挂牌开始时间不能小于竞买申请开始时间
                          callback(new Error("挂牌开始时间必须大于竞买申请开始时间"));
                      }
                  }else{
                      //请先输入竞买申请开始时间
                      callback(new Error("请先输入竞买申请开始时间"));
                  }
                  if(this.mydata.transTarget.endFocusTime){
                      if(this.mydata.transTarget.endFocusTime<=this.mydata.transTarget.beginFocusTime){
                          //挂牌开始时间必须小于挂牌截止时间
                          callback(new Error("挂牌开始时间必须小于挂牌截止时间"));
                      }
                  }
              }
              callback();
          }, 1000);

      };
      //挂牌截止时间
      const endFocusTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.isShow){
                  if(this.mydata.transTarget.beginFocusTime){
                      if(this.mydata.transTarget.endFocusTime<=this.mydata.transTarget.beginFocusTime){
                          //挂牌截止时间必须大于挂牌开始时间
                          callback(new Error("挂牌截止时间必须大于挂牌开始时间"));
                      }
                  }else{
                      //请先填写挂牌开始时间
                      callback(new Error("请先填写挂牌开始时间"));
                  }
                  if(this.mydata.transTarget.endEarnestTime){
                      if(this.mydata.transTarget.endFocusTime<=this.mydata.transTarget.endEarnestTime){
                          //挂牌截止时间必须大于保证金截止时间
                          callback(new Error("挂牌截止时间必须大于保证金截止时间"));
                      }
                  }else{
                      //请先填写保证金缴纳截止时间
                      callback(new Error("请先填写保证金缴纳截止时间"));
                  }
                  if(this.mydata.transTarget.beginLimitTime){
                      if(this.mydata.transTarget.beginLimitTime<this.mydata.transTarget.endFocusTime){
                          //挂牌截止时间必须小于限时竞价开始时间
                          callback(new Error("挂牌截止时间必须小于限时竞价开始时间"));
                      }
                  }}
              callback();
          }, 1000);

      };
      //保证金缴纳截止时间
      const endEarnestTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.isShow){
                  //挂牌
                  if(this.mydata.transTarget.endFocusTime){
                      if(this.mydata.transTarget.endEarnestTime>=this.mydata.transTarget.endFocusTime){
                          //保证金截止时间必须小于挂牌截止时间
                          callback(new Error("保证金截止时间必须小于挂牌截止时间"));
                      }
                  }
                  //和竞买申请开始时间对比  beginApplyTime
                  if(this.mydata.transTarget.beginApplyTime){
                      if(this.mydata.transTarget.endEarnestTime <= this.mydata.transTarget.beginApplyTime){
                          //保证金截止时间 不能小于 竞买申请开始时间
                          callback(new Error("保证金截止时间不能小于竞买申请开始时间"));
                      }
                  }else{callback(new Error("请先填写竞买申请开始时间"));}
              }
              else{
                  //拍卖
                  if(this.mydata.transTarget.beginLimitTime){
                      if(this.mydata.transTarget.endEarnestTime>=this.mydata.transTarget.beginLimitTime){
                          //保证金缴纳截止时间要小于拍卖开始时间
                          callback(new Error("保证金缴纳截止时间要小于拍卖开始时间"));
                      }
                  }
                  if(this.mydata.transTarget.beginApplyTime){
                      if(this.mydata.transTarget.endEarnestTime<=this.mydata.transTarget.beginApplyTime){
                          //保证金缴纳截止时间不能小于竞买申请开始时间
                          callback(new Error("保证金缴纳截止时间必须大于竞买申请开始时间"));
                      }
                  }else{
                      //请先填写竞买申请开始时间
                      callback(new Error("请先填写竞买申请开始时间"));
                  }}
              callback();
          }, 1000);

      };
      //拍卖开始时间（限时竞价开始时间）
      const beginLimitTimeVa = (rule, value, callback) => {
          setTimeout(() => {
              if(this.isShow){
                  //挂牌
                  if(this.mydata.transTarget.endFocusTime){
                      if(this.mydata.transTarget.endFocusTime>=this.mydata.transTarget.beginLimitTime){
                          //限时竞价开始时间要大于挂牌截止时间
                          callback(new Error("限时竞价开始时间要大于挂牌截止时间"));
                      }
                  }else{
                      //请先输入挂牌截止时间
                      callback(new Error("请先输入挂牌截止时间"));
                  }}
              else{
                  //拍卖
                  if(this.mydata.transTarget.endEarnestTime){
                      if(this.mydata.transTarget.endEarnestTime>=this.mydata.transTarget.beginLimitTime){
                          //拍卖开始时间时间要大于保证金缴纳截止时间
                          callback(new Error("拍卖开始时间时间要大于保证金缴纳截止时间"));
                      }
                  }else{
                      //请先输入保证金缴纳截止时间
                      callback(new Error("请先输入保证金缴纳截止时间"));
                  }}
              callback();
          }, 1000);

      };


    return {
      tableNmae:['序号','文件名称','文件','操作'],//表头名称
      belong:'',//请求参数 - 附件所属标识（必传）
      areaCode:'',//请求参数 - 区域标识（必传）
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      massif:'TARGET',

      //下一步判断值
      baseUrl:'',
      //交易时间信息显示隐藏
      isShow: true,
      beginNoticeTime: "",
      beginApplyTime: "",
      beginFocusTime: "",
      endFocusTime: "",
      endEarnestTime: "",
      beginLimitTime: "",

      dicNum: 0,
      goodsNo: "",
      filterData: {
        flowMode: "",
        circulation: "",
        publishStatus: "",
        firstClassUseName: "",
        firstClassUse: "",
        type: "",
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        goodsNo: "",
        isBinding: "1"
      },
      dicRequest: [
        "flow_mode",
        "land_use",
        "trade_currency"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_use: "",
        trade_currency: "",
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
          isAisJointBidding: "0", //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: "0", //允许网上直播(0:允许；1：不允许)
          isAfterCheck: "0", //资格审核（0：前置； 1：后置)
          transCondition: "", //竞买资格条件
          conditionOrganName: "", //	条件设置部门
          beginPrice: "", //标的起始价
          priceStep: "", //	竞价阶梯
          allowEntrustePrice: "", //是否委托
          fileTemplateCode: "", //附件模板标识ID
          businessType: "",
          businessTypeName: "",
          beginNoticeTime: "",
          beginApplyTime: "",
          beginFocusTime: "",
          endFocusTime: "",
          endEarnestTime: "",
          beginLimitTime: "",
          pId: ""
        },
        // 币种选择结果
        transTargetEarnestMoney: [],
        transGoods: []
      },
      TargetUp: {
        pId: null,
        entrustFirstUpload: true,
        belong: null
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
          { required: true, message: "请输入起始价", trigger: "change" },
          { pattern:/^(((\d{1,7})|([1-9]\d{1,7}))|((\d\.\d{1,4}|[1-9]\d{1,7}\.\d{1,4})))$/, message: "起始价有误,请输入整数或小数（保留小数点后四位）" }
        ],
        priceStep: [
          {
            required: true, 
            message: "请输入竞价阶梯",
            trigger: "blur"
          },
          {
            pattern: /^(((\d{1,7})|([1-9]\d{1,7}))|((\d\.\d{1,4}|[1-9]\d{1,7}\.\d{1,4})))$/,
            message: "竞价阶梯有误,请输入整数或小数（保留小数点后四位）"
          }
        ],
        beginNoticeTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: beginNoticeTimeVa
            }
        ],
        beginApplyTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: beginApplyTimeVa
            }
        ],
        beginFocusTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: beginFocusTimeVa
            }

        ],
        endFocusTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: endFocusTimeVa
            }
        ],
        endEarnestTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: endEarnestTimeVa
            }
        ],
        beginLimitTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          },
            {
                validator: beginLimitTimeVa
            }
        ]
      },
      ruleForm: {
        transTarget: {
          id: "",
          transType: "",
          tradingCenter: "",
          isAisJointBidding: "", //允许联合竞买(0:允许；1：不允许)
          isLiveWebcast: "", //允许网上直播(0:允许；1：不允许)
          isAfterCheck: "", //资格审核（0：前置； 1：后置)
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
        transTargetEarnestMoney: [],
        transGoods: []
      },
      checkList: ["选中且禁用", "复选框 A"],

      GoodsList: [],
      fileIndex:0,
      GoodsListData: [],
      //币种选项数据
      currencyData: [],
      //保证金多选
      currencyChecked: [],
      //获取地块列表
      praceData: [],
      // 绑定地块
      bindingBlockInfo: [],
      //步骤
      active: 0,
      //页码
      prace_currentPage: 1,
      prace_pageNo: 1,
      prace_pageSize: 5,
      prace_totalPage: 1,
      prace_totalRecord: 1,

      //地块页码
      local_totalRecord: 1,
      local_pageSize: 2,
      local_currentPage: 1,

      multipleSelection: [],
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },

      centerDialogVisible: false,

      defaultProps: {
        children: "children",
        label: "label"
      },
      additionalData: [],
      marginPrice: [],
      txtVal: 0,
      enclosureId: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      //附件模板数据
      tableData: [],
      orgs: [],
      TargetCode: "", //标的对象ID
      TidParameters: "",
      transTypeList:[],   //交易方式
      isAuxFlag: false, // ----
    };
  },
  created() {
    this.getRandow();

    //transTypeList
    // 获取交易中心机构
    this.$get(`/epf-trade/admin/transtarget/getTradeType`, {}).then(
      res => {
        if (res.code == 0) {
          this.transTypeList = res.transTypeList;
        }
      }
    );

    //  this.getParcelinfoData({isBinding: "1"});
    this.baseUrl = baseURL1.baseURL1 +'/epf-document/document/downloadById?id='
    // 获取交易中心机构
    let userId = sessionStorage.getItem('userId');
    this.$get(`/epf-trade/admin/transtarget/getCurrentUserOrgs`, {'userId': userId}).then(
      res => {
        if (res.code == 0) {
          this.orgs = res.orgs;
        }
      }
    );

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
      this.dictionary.flow_mode.pop();
      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-3
    this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    })
  },
  async beforeRouteEnter(to, from, next) {
    console.log(33333333333333333333333);
    try {
      const targetId = to.query.targetId;
      if (!targetId) {
        console.log(111111111111111111111111);
        next(vm => {
            console.log("vm",vm)
            vm.getRandow();

        });
      } else {
        console.log(22222222222222222222222);
        const data = await this.$get(
          `/epf-trade/admin/transtarget/getTransTargetById?targetId=${targetId}`
        );
        next(vm => {
          vm.mydata = data.map;
        });
      }
    } catch (e) {}
  },
  methods: {
    ...mapActions(["setTabsList"]),
    // 获取附件清单数据检验结果
    isAuxFun(value){
      this.isAuxFlag = value;
    },
    getRandow() {
        this.$get("/epf-trade/api/createId", {}).then(res => {
            debugger
            this.mydata["transTarget"]["id"] = res.id;
            let belongId = res.id;
            this.belong = belongId
            this.areaCode = ""
        });
    },
    getCode: async function(code) {
      const data = await this.$get(
        `/epf-admin/dictionaries/getDictEbyDictGroup/code?code=${code}`
      );
      console.log(data);
    },
    //保存标的新增
    saveTransTarget: function() {
      if(!this.isAuxFlag){
        this.$message.error('请检查您的附件清单信息是否上传完整！');
        return;
      }

      if(this.isShow){
          //挂牌

      }else{
          //拍卖，方式清空挂牌时间
          this.mydata.transTarget.beginFocusTime = '';
          this.mydata.transTarget.endFocusTime = '';
      }

      this.mydata.transTargetEarnestMoney = this.marginPrice;
      this.$useAppend("/epf-trade/admin/transtarget/addTransTarget", {
        transTargetJson: this.mydata,
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
        console.log(this.mydata);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        console.log(this.mydata);
        this.$message.success("添加成功");
        let routerPath = "landmarkInfo";
        this.$bus.$emit("closeTabsItem", this.$route.name);
        let title = "标的信息";
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        Bus.$emit("landMarkSave", true);
        this.$router.push({ path: routerPath });
      });
    },

    //选择地块
    //获取地块信息列表
    async getPraceData() {
      if(this.goodsNo){
        this.filterData.goodsNo = encodeURIComponent(this.goodsNo);
      }
      this.filterData["page"]=this. prace_pageNo;
      this.filterData["rows"]=this.prace_pageSize;
      let res = await this.$get(
        `/epf-trade/admin/transtarget/getAddOrEditTargetGoodsList`,
        this.filterData
      );
      console.log(res);
      if (res.code == "0") {
        this.centerDialogVisible = true;
        this.praceData = res.pager.results;
        // this.prace_pageNo = res.pager.pageNo;
        // this.prace_pageSize = res.pager.pageSize;
        this.prace_totalPage = res.pager.totalPage;
        this.prace_totalRecord = res.pager.totalRecord;
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    //条件搜索
    searchList: function() {
      this.getPraceData();
    },
    //重置搜索条件
    clearList() {
      for (let item in this.filterData) {
        if(item == 'circulation'){
          this.filterData[item] = this.filterData[item]
        }else{
          this.filterData[item] = "";
        }
      }
      this.filterData['isBinding'] = "1";
      this.goodsNo = "";
      this.useDate = [];
      this.$emit("filterInfo", this.filterData);
      this.getPraceData();
    },
    //选择地块弹框分页
    handleCurrentChangeDia(val) {
      this.prace_pageNo = val;
      this.getPraceData();
    },
    //选择地块弹框页容量
    handleSizeChangeDia(val) {
      this.prace_pageSize = val;
      this.getPraceData();
    },
    //选择地块信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //绑定地块信息
    handleSelectionDel(val) {
      this.multipleSelection = val;
    },
    //提交绑定地块信息
    submitGoodsList() {
      let BondInfo = this.BondInfo;
      //地块编号  goodsNo
      if(BondInfo && BondInfo.length>0){
        for(let i = 0;i<BondInfo.length;i++){
          if(this.multipleSelection && this.multipleSelection.length>0){
            for(let j = 0;j<this.multipleSelection.length;j++){
              if(BondInfo[i].goodsNo == this.multipleSelection[j].goodsNo){
                this.$message.error('选择的数据中有重复的数据，请确定后重试')
                return
              }
            }
          }
        }
      }
      //如果是第一次选择就完全赋值
      if(!BondInfo || BondInfo.length == 0){
        BondInfo = [];
      }
      //如果有数据，且长度大于0，走到了这里，就代表没有重复的数据
      if(this.multipleSelection && this.multipleSelection.length > 0){
        for(let i = 0;i<this.multipleSelection.length;i++){
          let mul = this.multipleSelection[i];
          BondInfo.push(mul)
        }
      }
      this.BondInfo = BondInfo;
      this.bindingBlockInfo = this.BondInfo;
      this.mydata.transGoods = this.bindingBlockInfo;
      console.log(this.bindingBlockInfo);
      console.log(this.mydata.transGoods);
      this.centerDialogVisible = false;
    },
    //单行数删除
    handleDelRow(index) {
      this.bindingBlockInfo.splice(index, 1);
    },
    //多行数批量删除
    handleDelAll() {
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
    //绑定地块信息分页
    local_handleCurrentChange: function(cpage) {
      this.$data.local_currentPage = cpage;
    },
    local_handleSizeChange: function(psize) {
      this.$data.local_pageSize = psize;
      this.local_currentPage = 1;
    },
    transmitNum(tid,index) {
      this.fileIndex = index;
      this.TidParameters = tid;
      console.log("你点击了", this.TidParameters, "这个tid");
    },
    Upload_File(files) {
      //标的附件上传
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("belong", this.belong); //传递对象ID
      console.log("formdata中得到的tid是---", this.TidParameters);
      if (this.TargetUp.pId) {
        console.log("第二张图片上传");
        formData.append("pId", this.TidParameters); //传递tid
        this.flie_Upload_Fun(formData, files, file);
        return;
      }
      if (!this.TargetUp.pId && this.TargetUp.entrustFirstUpload) {
        console.log("第一张图片上传");
        formData.append("pId", this.TidParameters); //传递tid
        this.TargetUp.entrustFirstUpload = false;
        this.flie_Upload_Fun(formData, files, file, "first");
        return;
      }
      if (this.TargetUp.pId && !this.TargetUp.entrustFirstUpload) {
        console.log("之后的图片上传携带id");
        this.flie_Upload_Fun(formData, files, file);
        return;
      }
    },
    flie_Upload_Fun(formData, files, file, count) {
      //标的附件上传方法
      const than = this;
      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log("这是标的附件上传返回", res);
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
          than.mydata.fileTemplateCode = than.TargetCode; //传递code
          than.mydata.transTarget.pId = res.data[0].pId;
        }
        if (than.TargetUp.pId && !than.TargetUp.entrustFirstUpload) {
          // that.$refs.additionalRef.submit()
        }
        than.enclosureId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    handleRemove(file, fileList) {
      //移除列表钩子
      console.log("你移除了文件", file);
    },
    photoUploadSuccess(res, file, fileList) {
      //上传成功回调
      console.log("上传文件：", file, "成功");
      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      };
      if (this.additionalData[this.fileIndex].files.length == 0) {
        this.additionalData[this.fileIndex].files.push(fileObject);
      } else {
        this.additionalData[this.fileIndex].files[0] = fileObject;
      }
      // this.mydata[this.fileListName] = fileList;
      // for (let i = 0; i < this.mydata[this.fileListName].length; i++) {
      //   this.mydata[this.fileListName][i].url =
      //     this.baseUrl + this.additionalId[i];
      // }
    },
    //保证金
    //新增一行
    addRow() {
      let newId =
        this.marginPrice.length == 0
          ? 0
          : this.marginPrice[this.marginPrice.length - 1].id + 1;
      //添加行数
      var newValue = { id: newId, currency: "", Price: "" };
      console.log("添加行数", this.newValue);
      // //添加新的行数
      this.marginPrice.push(newValue);
    },
    //批量删除
    deleteChecked() {
      let BondInfoArr = this.marginPrice;
      let newBondInfo = [];
      for (let i = 0; i < this.currencyChecked.length; i++) {
        BondInfoArr[this.currencyChecked[i]] = "";
      }
      for (let j = 0; j < BondInfoArr.length; j++) {
        if (BondInfoArr[j] != "") {
          newBondInfo.push(BondInfoArr[j]);
        }
      }
      this.marginPrice = newBondInfo;
    },
    //单行删除
    deleteRow(index) {
      this.marginPrice.splice(index, 1);
    },
    //确认
    confirmRow(index, row) {
      // this.addRow();
      this.marginPrice(index, 1).disabled = true;
    },

    // 时间表
    // 公告
    beginNoticeTimeClick() {
      this.mydata.transTarget.beginNoticeTime = this.beginNoticeTime;
      console.log(this.mydata);
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },
    // 竞买
    beginApplyTimeClick() {
      this.mydata.transTarget.beginApplyTime = this.beginApplyTime;
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },
    // 挂牌
    beginFocusTimeClick() {
      this.mydata.transTarget.beginFocusTime = this.beginFocusTime;
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },

    endFocusTimeClick() {
      this.mydata.transTarget.endFocusTime = this.endFocusTime;
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },
    endEarnestTimeClick() {
      this.mydata.transTarget.endEarnestTime = this.endEarnestTime;
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },
    beginLimitTimeClick() {
      this.mydata.transTarget.beginLimitTime = this.beginLimitTime;
        this.$refs['mydata.transTarget'].validate(async valid => { });
    },

    //保证金多选
    currencyChange(val) {
      let checkedArr = [];
      val.forEach((value, index, array) => {
        this.marginPrice.forEach((v, i, a) => {
          if (value.id == v.id) {
            checkedArr.push(i);
          }
        });
      });
      this.currencyChecked = checkedArr;
      console.log(this.currencyChecked);
    },
    transTypeStatusSelect(transTypeList, transType, event) {
      let transTypeMark = "";
      for(let i = 0; i < transTypeList.length; i++){
        if(transTypeList[i].id == transType){
          transTypeMark = transTypeList[i].mark;
        }
      }
      if (transTypeMark == 'auction_mode') {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    flowModeSelect(dic, flowMode, event) {
      this.mydata.transTarget.businessType = this.$refs[
        flowMode
      ][0].$attrs.dictKey;
      console.log(this.mydata.transTarget.businessType);
      this.praceData.circulationName = this.mydata.transTarget.businessType;
      this.filterData.circulation = this.praceData.circulationName;
      sessionStorage.setItem("circulationName", this.praceData.circulationName);
    },
    publishStatusSelect(dic, firstClassUseName, event) {
      console.log(this.$refs);
      this.filterData.firstClassUse = this.$refs[
        firstClassUseName
      ][0].$attrs.dictKey;
    },
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = "";
      this.filterData.cantonArea = "";
      this.cantonArea = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCity = "";
      this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          return;
        }
        this.dictionary.cantonCity = "";
      });
    },
    citySelect(dic, cantonCity, event) {
      this.filterData.cantonArea = "";
      this.filterData.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList;
          return;
        }
        this.dictionary.cantonArea = "";
      });
    },
    areaSelect(dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },

    //下一步验证
    //表单提交
    submitForm(formName) {
        debugger
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.next();
        } else {
          // 失败
          this.$message.error("数据格式错误，请根据提示修改");
          return false;
        }
      });
    },
    //下一步
    next() {
        debugger
      if(this.active==1){
        if(this.bindingBlockInfo.length==0){
          this.$message.error("请选择绑定地块信息");
          return
        }
        //获取保证金数据
          let _this = this;
          //获取地块的信息
          let transGoodsJson = this.bindingBlockInfo[0];
          //赋值地区字符
          let areaCode = '';
          //根据条件拼接
          if(transGoodsJson.cantonArea){
              areaCode = areaCode+transGoodsJson.cantonArea+','
          }
          if(transGoodsJson.cantonCity){
              areaCode = areaCode+transGoodsJson.cantonCity+','
          }
          if(transGoodsJson.cantonProvince){
              areaCode = areaCode+transGoodsJson.cantonProvince+','
          }
          _this.areaCode = areaCode;

        if(this.marginPrice.length==0){
          this.$message.error("请新增保证金");
          return
        }else{
          let marginMoneys = this.marginPrice;
          let flag = true;
          for(var i = 0; i < marginMoneys.length; i++){
            if(marginMoneys[i].currency == '' || marginMoneys[i].currency == null){
              flag = false;
              break;
            }else if(marginMoneys[i].amount == '' || marginMoneys[i].amount == null){
              flag = false;
              break;
            }else{
              continue;
            }
          }
          if(!flag){
            this.$message.error("请输入保证金完整数据！");
            return
          }
        }
      }
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
    // 删除附件
    delFile(index, eid, id) {
      let that = this;
      let url =
        "/epf-document/document/deleteByFolder?id=" + id + "&fdId=" + eid;
      this.$post(url, {}, res => {
        if (res.state == "SUCCESS") {
          this.additionalData[index].files = [];
          this.additionalData[index].tsize = 0;
        }
      });
      this.additionalData[index].files = [];
      this.additionalData[index].tsize = 0;
    },
    // 下载文件
    downFile(id){
      window.open(this.baseUrl+id, '_self');
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
        margin: 0 auto;
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
  margin-left: 0 !important;
}
/* .filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
} */
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
