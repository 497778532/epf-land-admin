<template>
  <epf-container title="地块详情">
    <div class="page-body" id="parcelinfoDetail">
      <div class="filter_wrap">
        <div class="dsDetailInfo_box">
          <div class="publish_main" v-if="transGoods">
            <el-form
              :model="transGoods"
              :rules="rules"
              ref="transGoods"
              label-width="170px"
              class="demo-ruleForm">
              <EPF-switchTitle titles_h='土地基本信息'>
                <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="土地性质：" required>
                      <el-radio-group v-model="transGoods.landChar" disabled>
                        <el-radio v-for="item in dictionary.land_nature" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <!-- 所属行政区：未接数据 -->
                  <li>
                    <el-form-item label="所属行政区：" required>
                      <el-select v-model="transGoods.cantonProvinceName" disabled placeholder="请选择" style="width:114px;">
                        <el-option :label="transGoods.cantonProvinceName" :value="transGoods.cantonProvinceName"></el-option>
                      </el-select>
                      <el-select v-model="transGoods.cantonCityName" disabled placeholder="请选择" style="width:114px;">
                        <el-option :label="transGoods.cantonCityName" :value="transGoods.cantonCityName"></el-option>
                      </el-select>
                      <el-select v-model="transGoods.cantonAreaName" disabled placeholder="请选择" style="width:114px;">
                        <el-option :label="transGoods.cantonAreaName" :value="transGoods.cantonAreaName"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="使用权类型：" required>
                      <el-radio-group v-model="transGoods.useType" disabled>
                        <el-radio
                          v-for="item in dictionary.use_type"
                          :label="item.dictKey"
                          :key="item.zhCn"
                        >{{item.zhCn}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地类型：" required>
                      <el-radio-group v-model="transGoods.landType" disabled>
                        <el-radio
                          v-for="item in dictionary.land_type"
                          :label="item.dictKey"
                          :key="item.zhCn"
                        >{{item.zhCn}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地流转方式:" required disabled>
                      <el-input v-model="transGoods.circulationName" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地用途：" required>
                      <el-select v-model="transGoods.firstClassUseName" disabled placeholder="请选择" style="width:176px;">
                        <el-option :label="transGoods.firstClassUseName" :value="transGoods.firstClassUseName"></el-option>
                      </el-select>
                      <el-select v-model="transGoods.secondClassUseName" disabled placeholder="请选择" style="width:176px;">
                        <el-option :label="transGoods.secondClassUseName" :value="transGoods.secondClassUseName"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item  class="unitContain" :label="transGoods.circulationName + '面积：'" required>
                      <el-input v-model="transGoods.area" size="small" disabled style="width:85%;"></el-input>
                      <span style="margin-left:5px;">平方米</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="使用权截止日期：" prop="endDate" required>
                      <el-date-picker
                        type="date"
                        placeholder="年月日"
                        v-model="transGoods.endDate"
                        disabled
                        width="50%"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item class="unitContain" :label="publishLandtype + '年限：'" required>
                      <el-input v-model="transGoods.years" size="small" disabled style="width:85%;"></el-input>
                      <span style="margin-left:5px;">年</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地坐落：" required>
                      <el-input v-model="transGoods.location" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="地图标注：">
                      <el-input
                        v-model="transGoods.coordinate"
                        placeholder="地图标注以后，自动获取坐标"
                        style="width:305px;"
                        disabled
                      ></el-input>
                      <div class="findland_input" @click="showMap">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg=="
                          alt
                        >
                        <span>地图找地</span>
                      </div>

                        <el-dialog
                                title="地图找地"
                                :visible.sync="dialogVisibleMap"
                                width="52%"
                                top="6vh"
                                :modal="false"
                                :close-on-click-modal="false"
                                      @close="dialogVisibleMap = false">

                        <v-Map style="height:500px" :Dlongitude="longitude" :Dlatitude="latitude" v-if="dialogVisibleMap"></v-Map>
                      </el-dialog>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="东至：" prop="east">
                      <el-input v-model="transGoods.east" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="南至：" prop="south">
                      <el-input v-model="transGoods.south" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="西至：" prop="west">
                      <el-input v-model="transGoods.west" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="北至：" prop="north">
                      <el-input v-model="transGoods.north" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <!-- <li>
                    坐标：
                    {{transGoods.coordinate}}
                  </li> -->
                  <li>
                    <el-form-item class="unitContain" :label="'拟'+transGoods.circulationName+'价格：'">
                      <el-input v-model="transGoods.price" size="small" disabled style="width:90%;"></el-input>
                      <span style="margin-left:5px;">万元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="权证号类型：" required>
                      <el-radio-group v-model="transGoods.warrantNumType" disabled>
                        <el-radio v-for="item in dictionary.own_no_type" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="权证号：" required>
                      <el-input v-model="transGoods.warrantNum" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="登记机构：" required>
                      <el-input v-model="transGoods.registration" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item
                      v-if="transGoods.useType == 'transfer2' || transGoods.useType == 'tosell' "
                      ref="decisionNum" :label="transGoods.useType=='transfer2'?'划拨决定书号：':'建设用地使用权出让合同号：'"
                      prop="decisionNum" label-width="220px">
                      <el-input disabled
                        v-if="transGoods.useType == 'transfer2'" v-model="transGoods.decisionNum"
                        placeholder="请输入划拨决定书号" style="width:70%;">
                      </el-input>
                      <el-input disabled v-if="transGoods.useType == 'tosell'" v-model="transGoods.decisionNum"
                                placeholder="请输入建设用地使用权出让合同号" style="width:70%;">
                      </el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="不动产单元号：" prop="unitNum">
                      <el-input v-model="transGoods.unitNum" size="small" disabled></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="是否有附属物：" required>
                      <el-radio-group v-model="transGoods.isAdjunct" disabled>
                        <el-radio label="0" value>是</el-radio>
                        <el-radio label="1" value>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li v-show="transGoods.isAdjunct=='0'" >
                    <el-form-item label="房屋建设工程是否完成投资总额的25%以上：" prop="isPercent" label-width="300px!important" style="margin-left:85px;">
                      <el-radio-group v-model="transGoods.isPercent" disabled>
                          <el-radio :label="0">是</el-radio>
                          <el-radio :label="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <!-- <li v-show="transGoods.isAdjunct=='0'" >
                    <el-form-item label="土地成片开发是否形成工业用地或其他建设用地条件：" prop="isDevelope" label-width="355px!important" style="margin-left:85px;">
                      <el-radio-group v-model="transGoods.isDevelope" disabled>
                          <el-radio :label="0">是</el-radio>
                          <el-radio :label="1">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li> -->
                  <!-- 建筑面积 -->
                  <li v-if="transGoods.isAdjunct == '0'">
                    <el-form-item class="unitContain" label="建筑面积：">
                      <el-input v-model="transGoods.price" size="small" disabled style="width:80%;"></el-input>
                      <span style="mergin-left: 5px">平方米</span>
                    </el-form-item>
                  </li>
                  <!-- 建筑结构 -->
                  <li v-if="transGoods.isAdjunct == '0'">
                    <el-form-item label="建筑结构：">
                      <el-select v-model="transGoods.buildingStructureName" disabled placeholder="请选择" style="width:360px;">
                        <el-option :label="transGoods.buildingStructureName" :value="transGoods.buildingStructureName"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>

                  <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                        <el-form-item label="绿地率%：" style="width:345px;" prop="greenSpaceRate">
                            <el-input v-model="transGoods.greenSpaceRate" disabled  placeholder="绿地率下限" style="width:140px;"></el-input>
                        </el-form-item>
                        <el-form-item  class="canton_Regions">
                            <el-select v-model="transGoods.greenSpaceRateSymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.greenSpaceRateSymbol1,'greenSpaceRateSymbol1')">
                                <el-option v-for="(item,index) in greenSpaceRateSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                            <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">绿地率</span>
                        <el-form-item  class="canton_Regions">
                            <el-select v-model="transGoods.greenSpaceRateSymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.greenSpaceRateSymbol2,'greenSpaceRateSymbol2')">
                                <el-option v-for="(item,index) in greenSpaceRateSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" prop="greenSpaceRate2">
                            <el-input v-model="transGoods.greenSpaceRate2" disabled  placeholder="绿地率上限" style="width:140px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                        <el-form-item label="建筑密度%：" style="width:345px;" prop="buildingDensity">
                        <el-input v-model.number="transGoods.buildingDensity" disabled  placeholder="建筑密度下限" style="width:140px;"></el-input>
                        </el-form-item>
                        <el-form-item  class="canton_Regions">
                        <el-select v-model="transGoods.buildingDensitySymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.buildingDensitySymbol1,'buildingDensitySymbol1')">
                            <el-option v-for="(item,index) in buildingDensitySymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                            <span style="margin:0 17px;color:#606266;line-height:38px;">建筑密度</span>
                        <el-form-item  class="canton_Regions">
                        <el-select v-model="transGoods.buildingDensitySymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.buildingDensitySymbol2,'buildingDensitySymbol2')">
                            <el-option v-for="(item,index) in buildingDensitySymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" prop="buildingDensity2">
                        <el-input v-model.number="transGoods.buildingDensity2" disabled placeholder="建筑密度上限" style="width:140px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                      <el-form-item label="容积率：" style="width:345px;" prop="plotRatio">
                      <el-input v-model.number="transGoods.plotRatio" disabled placeholder="容积率下限" style="width:140px;"></el-input>
                      </el-form-item>
                      <el-form-item  class="canton_Regions">
                      <el-select v-model="transGoods.plotRatioSymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol1,'plotRatioSymbol1')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      </el-form-item>
                          <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">容积率</span>
                      <el-form-item  class="canton_Regions">
                      <el-select v-model="transGoods.plotRatioSymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol2,'plotRatioSymbol2')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      </el-form-item>
                      <el-form-item  class="canton_Regions" prop="plotRatio2">
                      <el-input v-model.number="transGoods.plotRatio2" disabled placeholder="容积率上限" style="width:140px;"></el-input>
                      </el-form-item>
                    </li>
                  <li v-if="transGoods.isAdjunct == '0'">
                    <el-form-item class="unitContain" label="建筑限高：">
                      <el-input v-model="transGoods.heightLimit" size="small" disabled style="width:80%;"></el-input>
                      <span style="margin-left:5px">米</span>
                    </el-form-item>
                  </li>
                  <li style="width:100%" v-if="imgUrl!=null">
                    <el-form-item label="土地照片：">
                      <ul class="imgaeBox">
                        <li v-for="(item,index) in imgUrl" :key="index" class="imageLi">
                          <img :src="item.url" alt/>
                        </li>
                      </ul>
                    </el-form-item>
                  </li>
                  <li style="width:100%" v-if="mp4Url!=null && mp4Url.length > 0">
                    <el-form-item label="土地视频：">
                      <span v-for="(video,index) in mp4Url" :key="index">
                            <video
                              :src="video.url"
                              controls
                              width="178px"
                              height="178px"
                            >您的浏览器不支持 video 标签。
                          </video>
                          </span>
                    </el-form-item>
                  </li>

                  <div class="publish_main_cont_table">
                    <el-form-item label="其他说明：">
                    <el-input
                      type="textarea"
                      maxlength="2000"
                      minlength="0"
                      show-word-limit
                      autosize
                      v-model="transGoods.remark"
                      placeholder="请输入说明"
                      style="width:95%;height:160px;"
                    ></el-input>
                    </el-form-item>
                  </div>
                </ul>
              </div>
              </EPF-switchTitle>

              <EPF-switchTitle titles_h='申请人信息'>
                <div class="publish_main_cont">
                  <div class="publish_main_cont_table">
                    <ul class='publish_mainUl'>
                      <li>
                        <el-form-item label="权属人性质：" required>
                          <el-select v-model="transTrustInfo.ownerShipNature" disabled placeholder="请选择" style="width:360px;">
                            <el-option v-for="item in dictionary.tans_owner_type" :label="item.zhCn" :value="item.dictKey" :key="item.zhCn"></el-option>
                          </el-select>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="名称:" required>
                          <el-input v-model="transTrustInfo.ownerShip" disabled style="width:360px;">
                          </el-input>
                        </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件种类:" required>
                        <el-select v-model="transTrustInfo.identificationType" disabled placeholder="请选择" style="width:360px;">
                          <el-option v-for="item in dictionary.certifiate_type" :label="item.zhCn" :value="item.dictKey" :key="item.zhCn"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件号:" required>
                        <el-input v-model="transTrustInfo.identificationNum" disabled style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地址:" required>
                        <el-input v-model="transTrustInfo.address" disabled style="width:360px;">
                        </el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权属人联系电话:" required>
                        <el-input v-model="transTrustInfo.phone" disabled style="width:360px;">
                        </el-input>
                      </el-form-item>
                    </li>

                    <li>
                      <el-form-item label="联系人/代理人:">
                        <el-input v-model="transTrustInfo.contact" size="small" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人身份证号:">
                        <el-input v-model="transTrustInfo.idCard" size="small" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系电话:">
                        <el-input v-model="transTrustInfo.contactPhone" size="small" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系地址:">
                        <el-input v-model="transTrustInfo.contactAddress" size="small" disabled></el-input>
                      </el-form-item>
                    </li>
                    </ul>
                  </div>
                </div>
              </EPF-switchTitle>
              <EPF-switchTitle titles_h='地块附件清单'>
                <EPF-annexList
                  v-if="belong"
                  :tableType='true'
                  :tableNmae='tableNmae'
                  :belong='belong'
                  :areaCode='areaCode'
                  :fileSize='6'
                  :fileType='fileType'
                  :annexType='annexType'
                  >
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
import Map from "@/components/tianditu/tianditu";
export default {
  name: "landInfoDetail",
  components: {},
  data() {
    return {
      tableNmae:['序号','文件名称','文件','操作'],//表头名称
      belong:'',//请求参数 - 附件所属标识（必传）
      areaCode:'',//请求参数 - 区域标识（必传）
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      annexType:'LAND',

      filterData: {
          title: "",
          circulation: "",
          publishStatus: "",
          publishStatusName: "",
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
          issueEndDate: ""
      },
      disabled: "false",
      transGoods: {},
      transTrustInfo: {},
      id: "",
      foldshow1: true,
      foldshow2: true,
      foldshow3: true,
      foldshow4: true,
      foldshow5: true,
      txtVal: 0,
      txtVal1: 0,
      datafu: [],
      additionalData: [{ fileName: "挂牌文件" }],
      defaultProps: {
        children: "children",
        label: "zhCn",
        id: "dictValue"
      },
      temp: {
        address__province: "山西省",
        address__city: "太原市",
        address__dist: "小店区"
      },
      isShowProvince: true,
      dialogVisible: false,
      ruleForm: {
        ownerShipNature: "权属人性质1", //权属人性质
        ownerShip: "", //权属人名字
        identificationType: "身份证", //证件种类
        identificationNum: "", //证件号
        address: "", //地址
        phone: "", //权属人联系电话
        contact: "", //联系人/代理人姓名
        contactsID: "", //联系人/代理人身份证号
        contactPhone: "", //联系人/代理人电话
        contactAddress: "", //联系人/代理人地址
        //流转方式：
        circulation: "土地转让",
        titleNum: "",
        // 转让、出租、抵押面积
        area: "",
        trayear: "",
        // 土地用途
        landuse: "",
        landuse1: "",
        landuse2: "",
        // 使用权截止日期
        endDate: "",
        // 土地性质
        landChar: "国有建设用地",
        // 使用权类型：
        useType: "划拨",
        // 权证号类型
        warrantNumType: "不动产证号",
        // 登记机构
        registrationName: "登记机构1",
        // 建设用地使用权出让合同
        contactNum: "",
        // 不动产单元号
        unitNum: "",
        east: "",
        west: "",
        south: "",
        north: "",
        //绿地率
        greenSpaceRate: "",
        greenSpaceRate2: "",
        greenSpaceRateSymbol1: "",
        greenSpaceRateSymbol2: "",
        //建筑密度
        buildingDensity: "",
        buildingDensity2: "",
        buildingDensitySymbol1: "",
        buildingDensitySymbol2: "",
        coordinate: "",
        // 拟转让、出租、抵押价格
        //容积率
        plotRatio: "",
        plotRatio2: "",
        plotRatioSymbol1: "",
        plotRatioSymbol2: "",
        //建筑限高
        heightLimit: "",
        // 是否有附属物
        adjunct: "0",
        resource1: "0",
        resource2: "0",
        // 建筑面积
        buildArea: "",
        // 建筑结构
        buildingStructure: "",
        landusePresentSituate: "",
        remark: ""
      },
      greenSpaceRateSymbolSelect1:[
          {lable:'<',value:'<'},
          {lable:'<=',value:'<='},
          {lable:'=',value:'='}
      ],
      greenSpaceRateSymbolSelect2:[],
      buildingDensitySymbolSelect1:[
          {lable:'<',value:'<'},
          {lable:'<=',value:'<='},
          {lable:'=',value:'='}
      ],
      buildingDensitySymbolSelect2:[],
      plotRatioSymbolSelect1:[
          {lable:'<',value:'<'},
          {lable:'<=',value:'<='},
          {lable:'=',value:'='}
      ],
      plotRatioSymbolSelect2:[],
      rules: {
        ownerShip: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        identificationNum: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { min: 18, max: 18, message: "您输入的证件号有误", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入联系地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        contact: [
          {
            required: true,
            message: "请输入联系人/代理人姓名",
            trigger: "blur"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入联系人/代理人电话",
            trigger: "blur"
          }
        ],
        titleNum: [
          { required: true, message: "请输入土地编号", trigger: "blur" }
        ],
        unitNum: [
             { required: true, message: "请输入不动产单元号", trigger: "blur" },
            { min: 28, max: 28, message: "不动产单元号长度有误" },
            {
              pattern: /^[A-Za-z0-9]+$/,
              message: "不动产单元号由英文和数字组成."
            }
        ],
        decisionNum: [
          {
            required: true,
            message: "请填写该信息"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        area: [{ required: true, message: "请输入面积", trigger: "blur" }],
        contactNum: [
          { required: true, message: "请输入合同号", trigger: "blur" }
        ],
        east: [
          { required: true, message: "请输入东至", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        west: [
          { required: true, message: "请输入西至", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        south: [
          { required: true, message: "请输入南至", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        north: [
          { required: true, message: "请输入北至", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:
              "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ]
      },
      dialogVisibleMap: false, //地图找地对话框
      //附件模板数据
      tableData:[],
      imgUrl:[],
      mp4Url:[],
      currentImg: '',
      baseUrl:'',
      dicRequest: [
        "flow_mode",
        "land_nature",
        "use_type",
        "land_type",
        "land_use",
        'tans_owner_type',
        'certifiate_type',
        "own_no_type",
        "register_organization",
        "building_structure"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_nature: "",
        use_type: "",
        land_type: "",
        land_use: "",
        tans_owner_type:"",
        certifiate_type:"",
        own_no_type: "",
        register_organization: "",
        building_structure: "",
        land_use_second: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      longitude:'',
      latitude:'',
      publishLandtype:"剩余使用"
    };
  },
  created() {
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }).then
            (res => {
              resolve(res);
            }
          );
        }else {
          this.$get(
            `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
            {}).then(
            res => {
              resolve(res);
            }
          );
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        // console.log(item);
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
    this.baseUrl = PUZZLE_CONFIG.https + "/epf-document/document/downloadById?id=";
    //  console.log(this.$route.query.id)
    this.getItemData(this.$route.query.id);

  },
  methods: {
    showMap(){

      let coordinate = this.transGoods.coordinate;
      console.log("获取到的coordinate："+coordinate)

      let result=[];
      if(coordinate && coordinate.split(",").length==2){
        result = coordinate.split(",");
        this.longitude = result[0]
        this.latitude = result[1]
      }
      if(coordinate && coordinate.split(" ").length==2){
        result = coordinate.split(" ");
        this.longitude = result[0]
        this.latitude = result[1]
      }

      this.dialogVisibleMap = true;
    },
    getItemData: async function(id) {
      const data = await this.$get(this.$API.EPF_TRADE.LAND.LAND_DETAIL,{id:id});
      if (!data) {
        return;
      }
      if(data.transGoods.circulation === "transfer"){
          this.publishLandtype="剩余使用";
          this.ruleForm.circulation = "transfer";
          this.ruleForm.circulationName = "转让";
      } else if(data.transGoods.circulation === "rent"){
          this.publishLandtype="出租";
          this.ruleForm.circulation = "rent";
          this.ruleForm.circulationName = "出租";
      }else{
        this.publishLandtype="抵押";
        this.ruleForm.circulation = "mortgage";
        this.ruleForm.circulationName = "抵押";

      }
      this.transGoods = data.transGoods;
      this.transTrustInfo = data.transTrustInfo;

      this.belong = data.transGoods.enclosureId
      this.areaCode = data.transGoods.cantonProvince
      this.$get('/epf-document/document/getOneGroupFilsById',{id:data.transGoods.img}).then(files=>{
        for (let item = 0; item < files.fileList.length; item++) {
          if(files.fileList[item].extName == 'png' || files.fileList[item].extName == 'PNG' || files.fileList[item].extName == 'jpg'){
            this.imgUrl.push({index: this.imgUrl.length + 1,url:this.baseUrl + files.fileList[item].id,extName:files.fileList[item].extName})
          }else if(files.fileList[item].extName == 'mp4'){
            this.mp4Url.push({index: this.mp4Url.length + 1,url:this.baseUrl + files.fileList[item].id,extName:files.fileList[item].extName})
          }
        }
        this.currentImg = this.imgUrl[0].url;
        // this.imgScroll = Math.ceil((this.imgUrl.length + this.mp4Url.length) / 2)
      })

      this.$get('/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong='+this.$route.query.id+'&areaCode='+this.transGoods.cantonProvince,{}).then(res => {
        let resData = JSON.parse(res.ztreeJson);
        for(let i = 0; i < resData.length; i++) {
          if(resData[i].code.indexOf("LAND") != -1){ // 土地附件清单
            this.tableData = resData[i].childData;
            this.fileTemplateId = resData[i].code
          }
        }
        let files = this.tableData;
        for (let index = 0; index < files.length; index++) {
          this.ruleForm[files[index].tid] = [];
        }
      })
    },
    swichFlot(item) {
      if (item === 1) {
        this.foldshow1 = !this.foldshow1;
      }
      if (item === 2) {
        this.foldshow2 = !this.foldshow2;
      }
      if (item === 3) {
        this.foldshow3 = !this.foldshow3;
      }
      if (item === 4) {
        this.foldshow4 = !this.foldshow4;
      }
      if (item === 5) {
        this.foldshow5 = !this.foldshow5;
      }
    },
    onSelected(data) {
      this.temp.address__province = data.province.value;
      this.temp.address__city = data.city.value;
      this.temp.address__dist = data.area.value;
    },
    comGreenSpaceRateSymbol(){
        if(this.ruleForm.greenSpaceRateSymbol1==='<'){
            this.greenSpaceRateSymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.greenSpaceRateSymbol1==='=')){
            this.ruleForm.greenSpaceRateSymbol2=null
            this.greenSpaceRateSymbolSelect2=[{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.greenSpaceRateSymbol1==='<=')){
            this.greenSpaceRateSymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }

        if(this.ruleForm.buildingDensitySymbol1==='<'){
            this.buildingDensitySymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.buildingDensitySymbol1==='=')){
            this.ruleForm.buildingDensitySymbol2=null
            this.buildingDensitySymbolSelect2=[{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.buildingDensitySymbol1==='<=')){
            this.buildingDensitySymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }

        if(this.ruleForm.plotRatioSymbol1==='<'){
            this.plotRatioSymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.plotRatioSymbol1==='=')){
            this.ruleForm.plotRatioSymbol2=null
            this.plotRatioSymbolSelect2=[{lable:'请选择符号',value:'请选择符号'},]
        }
        if((this.ruleForm.plotRatioSymbol1==='<=')){
            this.plotRatioSymbolSelect2=[{lable:'<',value:'<'},{lable:'<=',value:'<='},{lable:'请选择符号',value:'请选择符号'},]
        }
    },
  },

  components: {
    "v-Map": Map
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.filter_wrap {
  .dsDetailInfo_box {
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 0 24px;
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
            .unitContain{
              position: relative;
              .unit{
                position: absolute;
                right: 15px;
                top:0;
                color:#999
              }
            }
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
            @include size(34%, 600px);
            margin-right: 1%;
          }
          .additionalList {
            float: left;
            @include size(65%, 600px);
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
          @include size(90px, 40px);
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
</style>
<style>
#parcelinfoDetail .el-radio {
  margin-right: 7px
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
/* .filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
} */
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
.EntrustTra_title_icon {
  width: 6px;
  height: 21px;
  background: #ffca73;
  border-radius: 3px;
  display: inline-block;
  margin-top: 18px;
  margin-right: 12px;
}
.imgaeBox .imageLi{
  width: 178px!important;
  float: left;
  margin-left: 15px;
}
.imgaeBox .imageLi:nth-child(1){
  margin-left:0;
}
.imgaeBox li img{
  width: 178px;
  height: 178px;
}
.canton_Regions>.el-form-item__content{
  margin-left: 5px !important;
}
</style>
