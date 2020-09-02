<template>
<div class="page-body">
<el-tabs type="border-card" v-model="activeName">
  <el-tab-pane label="查看详情" name="first">
    <div class="filter_wrap">
      <!-- <div class="corverBox"></div> -->
      <div class="dsDetailInfo_box">
          <div class="publish_main">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="125px"
              class="demo-ruleForm"
              >
              <EPF-switchTitle titles_h='土地基本信息'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="流转方式：">
                        <el-select v-model="ruleForm.circulationName" disabled  @change="circulatemodeSelect(dictionary.flow_mode,ruleForm.circulationName,$event)" >
                              <el-option v-for="item in dictionary.flow_mode" :ref="item.zhCn"
                                  :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="item.dictKey">
                              </el-option>
                          </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="标题：" prop="title">
                          <el-input v-model="ruleForm.title" disabled style="width:360px;" ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地性质：" prop="landChar">
                          <el-radio-group v-model="ruleForm.landChar" disabled>
                              <el-radio v-for="item in dictionary.land_nature" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;">
                          <el-form-item label="区域：" prop="cantonProvince">
                          <!-- <v-distpicker v-show="isShowProvince" :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist" @selected="onSelected"></v-distpicker> -->
                          <el-select v-model="ruleForm.cantonProvinceName" disabled  @change="province(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)" >
                              <el-option v-for="item in dictionary.administrative_regions" :ref="item.regionName"
                              :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="item.regionCode"></el-option>
                          </el-select>
                          </el-form-item>
                          <el-form-item prop="cantonCity" class="canton_Regions" label-width="5px">
                              <el-select v-model="ruleForm.cantonCityName" disabled  @change="city(dictionary.cantonCity,ruleForm.cantonCityName,$event)">
                                  <el-option v-for="item in dictionary.cantonCity" :ref="item.regionName"
                                  :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="item.regionCode"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item prop="cantonArea" class="canton_Regions" label-width="5px">
                              <el-select v-model="ruleForm.cantonAreaName" disabled  @change="area(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)">
                                  <el-option v-for="item in dictionary.cantonArea" :ref="item.regionName"
                                  :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="item.regionCode" ></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                    </li>
                    <li>
                      <el-form-item label="使用权类型：" required>
                          <el-radio-group v-model="ruleForm.useType" disabled>
                              <el-radio v-for="item in dictionary.use_type" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地类型：" prop="landType">
                        <el-radio-group v-model="ruleForm.landType">
                          <el-radio-group v-model="ruleForm.landType" disabled>
                              <el-radio style="margin-top:3px;" v-for="item in dictionary.land_type" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                          </el-radio-group>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;flex-direction: row;">
                      <el-form-item label="土地用途：" prop="firstClassUse"  style="width:500px;">
                          <el-select v-model="ruleForm.firstClassUseName" disabled placeholder="请选择一级用途"  @change="firstClassUseSelect(dictionary,ruleForm.firstClassUseName,$event)" >
                              <el-option v-for="item in dictionary.land_use" :ref="item.zhCn" :dictKey="item.dictKey" :id="item.id" :label="item.zhCn" :value="item.zhCn" :key="item.id"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item prop="secondClassUse"  class="canton_Regions" style="width:280px;" label-width="5px">
                          <el-select v-model="ruleForm.secondClassUseName" disabled placeholder="请选择二级用途"  @change="secondClassUseSelect(dictionary,ruleForm.secondClassUseName,$event)">
                              <el-option v-for="item in dictionary.land_use_second" :ref="item.zhCn" :label="item.zhCn" :dictKey="item.dictKey"  :value="item.zhCn" :key="item.zhCn"></el-option>
                          </el-select>
                      </el-form-item>
                      </div>
                    </li>
                    <li>
                      <el-form-item :label="ruleForm.circulationName+'面积：'" prop="area">
                        <el-input v-model="ruleForm.area" disabled  placeholder="例如22365.12" style="width:340px;"></el-input>
                        <span style="margin-left:10px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="使用权截止日期：" prop="years">
                        <el-col :span="11" style="width:360px;">
                          <el-form-item prop="endDate">
                            <el-date-picker type="date" disabled value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="publishLandtype+'年限：'" prop="years"  style="width:100%;">
                          <el-input v-model="ruleForm.years" disabled  :placeholder="'请输入'+ruleForm.circulationName+'年限'"  style="width:360px;"></el-input>
                          <span style="margin-left:10px;">年</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地坐落：" prop="location">
                        <el-input v-model="ruleForm.location" disabled  placeholder="请输入土地详细信息，例如：山西省太原市小店区荣军街112号" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地图标注：">
                        <el-input v-model="ruleForm.coordinate" disabled placeholder="地图标注以后，自动获取坐标" style="width:237px;"></el-input>
                        <div class="findland_input"  @click="dialogVisibleMap = true">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg==" alt="">
                          地图找地
                        </div>
                        <el-dialog
                        id="publishLandMapDialog"
                        :visible.sync="dialogVisibleMap"
                        @close="dialogVisibleMap = false"
                        :modal-append-to-body='false'
                        title="地图找地">
                        <div style="height:500px;">
                          <TMap
                            v-if="dialogVisibleMap"
                            :Dlongitude='longitude'
                            :Dlatitude='latitude'>
                          </TMap>
                        </div>
                        </el-dialog>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="东至：">
                        <el-input v-model="ruleForm.east" disabled placeholder="东至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="南至：">
                        <el-input v-model="ruleForm.west" disabled placeholder="南至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="西至：">
                          <el-input v-model="ruleForm.south" disabled placeholder="西至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="北至：">
                          <el-input v-model="ruleForm.north" disabled placeholder="北至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="'拟'+ruleForm.circulationName+'让价格：'">
                        <el-input v-model="ruleForm.price" disabled :placeholder="'拟'+ruleForm.circulationName+'价格,例如：1000.20，不填则显示面议'" style="width:360px;"></el-input>
                        <span style="margin-left:10px;">万元</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号类型：" prop="warrantNumType">
                        <el-radio-group v-model="ruleForm.warrantNumType">
                            <el-radio v-for="item in dictionary.own_no_type" disabled :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号：" prop="warrantNum">
                          <el-input v-model="ruleForm.warrantNum" disabled  placeholder="例如：浙（2017)德清县不动产第0018185号" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="登记机构：" prop="registration">
                          <el-input v-model="ruleForm.registration" disabled  placeholder="登记机构" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item
                        v-if="ruleForm.useType == 'transfer2' || ruleForm.useType == 'tosell' "
                        ref="decisionNum" :label="ruleForm.useType=='transfer2'?'划拨决定书号：':'建设用地使用权出让合同号：'"
                        prop="decisionNum" label-width="220px">
                        <el-input disabled
                          v-if="ruleForm.useType == 'transfer2'" v-model="ruleForm.decisionNum"
                          placeholder="请输入划拨决定书号" style="width:50%;">
                        </el-input>
                        <el-input disabled v-if="ruleForm.useType == 'tosell'" v-model="ruleForm.decisionNum"
                                  placeholder="请输入建设用地使用权出让合同号" style="width:50%;">
                        </el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="不动产单元号：">
                          <el-input v-model="ruleForm.unitNum" disabled  placeholder="请输入不动产单元号 " style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="是否有附属物：" required>
                          <el-radio-group v-model="ruleForm.isAdjunct" disabled>
                              <el-radio label="0">是</el-radio>
                              <el-radio label="1">否</el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="房屋建设工程是否完成投资总额的25%以上：" prop="isPercent" label-width="300px">
                        <el-radio-group v-model="ruleForm.isPercent" disabled>
                            <el-radio :label="0">是</el-radio>
                            <el-radio :label="1">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <!-- <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="土地成片开发是否形成工业用地或其他建设用地条件：" prop="isDevelope" label-width="355px">
                        <el-radio-group v-model="ruleForm.isDevelope" disabled>
                            <el-radio :label="0">是</el-radio>
                            <el-radio :label="1">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li> -->
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑面积：">
                          <el-input v-model="ruleForm.buildArea" disabled  placeholder="例如：3000.11" style="width:340px;"></el-input>
                          <span style="margin-left:10px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item v-show="ruleForm.useType == 'transfer2'" label="划拨决定书号：" prop="decisionNum">
                          <el-input v-model="ruleForm.decisionNum"  disabled placeholder="请输入划拨决定书号" style="width:360px;"></el-input>
                      </el-form-item>
                      <el-form-item v-show="ruleForm.useType == 'tosell'" label="合同鉴证号：" prop="decisionNum">
                          <el-input v-model="ruleForm.decisionNum" disabled  placeholder="请输入合同鉴证号" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                        <el-form-item label="绿地率%：" style="width:280px;" prop="greenSpaceRate">
                            <el-input v-model="ruleForm.greenSpaceRate" disabled  placeholder="绿地率下限" style="width:140px;"></el-input>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" label-width="5px">
                            <el-select v-model="ruleForm.greenSpaceRateSymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.greenSpaceRateSymbol1,'greenSpaceRateSymbol1')">
                                <el-option v-for="(item,index) in greenSpaceRateSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                            <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">绿地率</span>
                        <el-form-item  class="canton_Regions" label-width="5px">
                            <el-select v-model="ruleForm.greenSpaceRateSymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.greenSpaceRateSymbol2,'greenSpaceRateSymbol2')">
                                <el-option v-for="(item,index) in greenSpaceRateSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" prop="greenSpaceRate2" label-width="5px">
                            <el-input v-model="ruleForm.greenSpaceRate2" disabled  placeholder="绿地率上限" style="width:140px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                        <el-form-item label="建筑密度%：" style="width:280px;" prop="buildingDensity">
                        <el-input v-model.number="ruleForm.buildingDensity" disabled  placeholder="建筑密度下限" style="width:140px;"></el-input>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" label-width="5px">
                        <el-select v-model="ruleForm.buildingDensitySymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.buildingDensitySymbol1,'buildingDensitySymbol1')">
                            <el-option v-for="(item,index) in buildingDensitySymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                            <span style="margin:0 17px;color:#606266;line-height:38px;">建筑密度</span>
                        <el-form-item  class="canton_Regions" label-width="5px">
                        <el-select v-model="ruleForm.buildingDensitySymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.buildingDensitySymbol2,'buildingDensitySymbol2')">
                            <el-option v-for="(item,index) in buildingDensitySymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" prop="buildingDensity2" label-width="5px">
                        <el-input v-model.number="ruleForm.buildingDensity2" disabled placeholder="建筑密度上限" style="width:140px;"></el-input>
                        </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="容积率%：" style="width:280px;" prop="plotRatio">
                      <el-input v-model.number="ruleForm.plotRatio" disabled  placeholder="容积率下限" style="width:140px;"></el-input>
                      </el-form-item>
                      <el-form-item  class="canton_Regions" label-width="5px">
                      <el-select v-model="ruleForm.plotRatioSymbol1" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol1,'plotRatioSymbol1')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      </el-form-item>
                          <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">容积率</span>
                      <el-form-item  class="canton_Regions" label-width="5px">
                      <el-select v-model="ruleForm.plotRatioSymbol2" disabled placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol2,'plotRatioSymbol2')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      </el-form-item>
                      <el-form-item  class="canton_Regions" prop="plotRatio2" label-width="5px">
                      <el-input v-model.number="ruleForm.plotRatio2" disabled placeholder="容积率上限" style="width:140px;"></el-input>
                      </el-form-item>
                    </li>
                    <li style="width:100%;" v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑限高：">
                        <el-input v-model="ruleForm.heightLimit" disabled  placeholder="例如：20" style="width:360px;"></el-input>
                        <span style="margin-left:20px;">米</span>
                      </el-form-item>
                    </li>
                    <li style="width:100%;" v-if="ruleForm.fileList!=null">
                      <el-form-item label="土地照片：">
                        <ul class="imgaeBox">
                          <li v-for="(item,index) in ruleForm.fileList" :key="index" class="imageLi">
                            <img :src="item.url" alt/>
                          </li>
                        </ul>
                      </el-form-item>
                    </li>
                    <li style="width:100%;" v-if="ruleForm.fileListVideo.length > 0 ">
                      <el-form-item label="土地视频：" class="videoBpx">
                        <span v-for="(video,index) in ruleForm.fileListVideo" :key="index">
                          <video
                            :src="video.url"
                            controls
                            width="178px"
                            height="178px"
                          >
                        </video>
                        </span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="其他说明：">
                        <el-input
                          type="textarea"
                           maxlength="1000"
                           minlength="0"
                           show-word-limit
                           v-model="ruleForm.remark"
                           placeholder="可针对土地的其他信息进行补充说明"
                           style="width:720px;height:108px!important;">
                        </el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>

              <EPF-switchTitle titles_h='申请人信息' :switchData='false'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="权属人性质：" prop="ownerShipNature" label-width="175px">
                        <el-select v-model="ruleForm.ownerShipNature" placeholder="请选择" disabled >
                            <el-option v-for="item in dictionary.tans_owner_type" :label="item.zhCn" :value="item.dictKey" :key="item.zhCn"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="名称：" prop="ownerShip" label-width="175px">
                        <el-input v-model="ruleForm.ownerShip" disabled style="width:360px;" placeholder="请输入名称"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件种类：" prop="identificationType" label-width="175px">
                        <el-select v-model="ruleForm.identificationType" placeholder="请选择" disabled>
                          <el-option v-for="item in dictionary.certifiate_type" :label="item.zhCn" :value="item.dictKey" :key="item.zhCn"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件号：" prop="identificationNum" label-width="175px">
                          <el-input v-model="ruleForm.identificationNum" disabled style="width:360px;" placeholder="请输入证件号"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地址：" prop="address" label-width="175px">
                          <el-input v-model="ruleForm.address" disabled style="width:360px;" placeholder="请输入地址"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权属人联系电话：" prop="phone" label-width="175px">
                          <el-input v-model="ruleForm.phone" disabled style="width:360px;" placeholder="请输入权属人联系电话"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人：" prop="contact" label-width="175px">
                          <el-input v-model="ruleForm.contact" disabled style="width:360px;" placeholder="请输入联系人/代理人"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人身份证：" prop="idCard" label-width="175px">
                          <el-input v-model="ruleForm.idCard" disabled style="width:360px;" placeholder="请输入联系人/代理人身份证"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系电话：" prop="contactPhone" label-width="175px">
                          <el-input v-model="ruleForm.contactPhone" disabled style="width:360px;" placeholder="请输入联系人/代理人联系电话"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系地址：" prop="contactAddress" label-width="175px">
                          <el-input v-model="ruleForm.contactAddress" disabled style="width:360px;" placeholder="请输入联系人/代理人联系地址"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>

              <EPF-switchTitle titles_h='附件清单' :switchData='false'>
                <div class="publish_main_cont">
                  <EPF-switchTitle titles_h='地块附件清单' padding='0' background='#fff' :shutOff='false'>
                    <EPF-annexList
                      v-if="belong"
                      @switchs="switchs"
                      :tableType='true'
                      :tableNmae='tableNmae'
                      :belong='belong'
                      :areaCode='areaCode'
                      :fileSize='6'
                      :fileType='fileType'
                      :annexType='massif'>
                    </EPF-annexList>
                  </EPF-switchTitle>

                  <EPF-switchTitle titles_h='委托附件清单' padding='0' background='#fff' :shutOff='false'>
                    <div v-if="entrustLoading">
                      <EPF-annexList
                        v-if="belong"
                        :tableType='true'
                        :tableNmae='tableNmae'
                        :belong='belong'
                        :areaCode='areaCode'
                        :fileSize='6'
                        :fileType='fileType'
                        :annexType='entrust'>
                      </EPF-annexList>
                    </div>
                  </EPF-switchTitle>
                </div>
              </EPF-switchTitle>

            </el-form>
          </div>
          <div style="text-align: center;margin-top:25px;">
            <!-- <div class="button_default" @click="backPage">关闭</div> -->
            <el-button type="success" @click="examine" size="small" v-if="actType == 'trade'">审核</el-button>
          </div>
      </div>
    </div>
  </el-tab-pane>
  <el-tab-pane label="查看履约保证金" name="second">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
      <div class="publish_main">
        <div class="publish_main_title">
          <div class="publish_title_icon f-left"></div>
          <h2 class="title f-left">履约保证金交款账户信息</h2>
        </div>
          <!-- contnent -->
        <div class="bondBox" v-if="paymentData != null">
              <el-row>
                <el-col :span="10" style="text-align: right;">
                  <span class="bond_title">交款银行名称：</span>
                  <el-input style="width:300px;" v-model="paymentData.childAccountBank"></el-input>
                </el-col>
                <el-col :span="10" style="text-align: right;">
                  <span class="bond_title">交款账户名称：</span>
                  <el-input style="width:300px;" v-model="paymentData.childAccountName"></el-input>
                </el-col>
                <el-col :span="3">
                  <div class="stateLabels"
                       v-if="alreadyPay==''||alreadyPay==0"
                  >未缴纳</div>
                  <div class="stateLabels"
                       v-if="alreadyPay>tPrice"
                  >未缴足</div>
                  <div class="stateLabels"
                       style="color:#92b62d;background-color:#e7f5bd"
                       v-if="alreadyPay<=tPrice"
                  >已缴纳</div>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="10" style="text-align: right;">
                  <span class="bond_title">交款子账户：</span>
                  <el-input style="width:300px;" v-model="paymentData.childAccountNo"></el-input>
                </el-col>
                <el-col :span="10" style="text-align: right;">
                  <span class="bond_title">履约保证金(万元)：</span>
                  <!-- <el-input style="width:300px;" v-model="paymentData.amount"></el-input> -->
                  <el-input style="width:300px;" :value="paymentData.amount?Division(paymentData.amount):''"></el-input>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="10" style="text-align: right;">
                  <span class="bond_title">履约保证经缴纳截止时间：</span>
                  <el-input style="width:300px;" v-model="paymentData.endDate"></el-input>
                </el-col>
              </el-row> -->
        </div>
        <div v-else>
          <p style="text-align:center;color:#ccc;">未生成子账号信息</p>
          <el-button @click="createChildAccount" style="float:right;">生成子账号</el-button>
        </div>
        <el-table
          :data="contartData"
          :summary-method="getSummaries"
          show-summary
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)"
          :header-cell-style="{border:'solid 1px #ebeff5',backgroundColor:'#f5f8fa',fontWeight:'normal',color:'#909498'}"
          style="width: 100%;margin-top:25px;">
          <el-table-column prop="title" label="交款记录" style="font-weight:800;">
            <el-table-column
              prop="index"
              label="序号"
              min-width="10%"
              align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="childAccountBank"
              label="中心子账户开户行"
              min-width="18%"
              align="left">
            </el-table-column>
            <el-table-column
              prop="childAccountName"
              label="中心子账户名称"
              min-width="18%"
              align="left">
            </el-table-column>
            <el-table-column
              prop="childAccountNo"
              label="中心子账户号"
              min-width="18%"
              align="left">
            </el-table-column>
            <el-table-column
              prop ="amount"
              label="交款金额（万元）"
              min-width="18%">
            </el-table-column>
            <el-table-column
              prop="bankBusinessDate"
              label="银行到账时间"
              min-width="18%"
              align="left">
            </el-table-column>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:25px 0px;">
          <el-pagination
            background
            layout="prev,pager,next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo">
          </el-pagination>
        </div>
        <div style="text-align: center;margin-top:25px;">
          <!-- <div class="button_default" @click="backPage">关闭</div> -->
          <el-button type="success" @click="examine" size="small" v-if="actType == 'trade'">审核</el-button>
        </div>
      </div>
      </div>
    </div>
  </el-tab-pane>
  <el-tab-pane label="查看受理意见" name="third">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
      <div class="publish_main" v-if="acceptanceData != null">
        <el-table
          :data="acceptanceData"
          border
          v-loading="loadOn"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)"
          :header-cell-style="{border:'solid 1px #ebeff5',backgroundColor:'#f5f8fa',fontWeight:'normal',color:'#909498'}"
          style="width: 100%;">
          <el-table-column prop="title" label="受理结果" style="font-weight:800;">
            <el-table-column
              prop="index"
              label="序号"
              min-width="10%"
              align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="assigneeName"
              label="审核人"
              min-width="18%"
              align="left">
            </el-table-column>
            <el-table-column
              prop="histIns.activityName"
              label="环节"
              min-width="18%"
              align="left">
            </el-table-column>
            <el-table-column
              label="审核状态"
              min-width="18%"
              align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.amount == ''">审核中</span>
                <span v-else>已审核</span>
              </template>
            </el-table-column>
            <el-table-column
              prop ="histIns.startTime"
              label="审核时间"
              min-width="18%">
            </el-table-column>
            <el-table-column
              prop="comment"
              label="审核意见"
              min-width="18%"
              align="left">
            </el-table-column>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top:25px;">
          <!-- <div class="button_default" @click="backPage">关闭</div> -->
          <el-button type="success" @click="examine" size="small" v-if="actType == 'trade'">审核</el-button>
        </div>
      </div>
      </div>
    </div>
  </el-tab-pane>
</el-tabs>

  <el-dialog title="审核" width="40%" :visible.sync="RedialogForm" :append-to-body='true'>
    <template>
      <div id="dialog">
        <actDialog :actInfo="actInfo" @patch="actResult" />
      </div>
    </template>
  </el-dialog>

</div>
</template>
<script>
import TMap from '@/components/tianditu/tianditu'
import imgBaseUrl from '../../index.js'
export default {
  name:"trade",
  components: { 'TMap':TMap },
  data() {
    return {
      tableNmae:['序号','文件名称','文件','操作'],//表头名称
      belong:'',//请求参数 - 附件所属标识（必传）
      areaCode:'',//请求参数 - 区域标识（必传）
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      massif:'LAND',
      entrust:'TRANS',
      entrustLoading:false,

      RedialogForm:false,
      actInfo:{},  //工作流需要的参数
      actType:"",  //首页传过来的类型
      activeName:'second',
      loading:false,
      contartData:[
        // {childAccountBank:'江西银行',childAccountName:'南昌市房地产交易中心',childAccountNo:'123564313',amount:'250000',bankBusinessDate:'2018-12-19 14:30:23'},
        // {childAccountBank:'江西银行',childAccountName:'南昌市房地产交易中心',childAccountNo:'123564313',amount:'250000',bankBusinessDate:'2018-12-19 14:30:23'},
        // {childAccountBank:'江西银行',childAccountName:'南昌市房地产交易中心',childAccountNo:'123564313',amount:'250000',bankBusinessDate:'2018-12-19 14:30:23'},
        ],
      totalRecord:1,
      pageSize:5,
      pageNo:1,
      loadOn:false,
      acceptanceData:[
        // {assigneeName:'李白',childAccountName:'县长',childAccountNo:'通过',amount:'2018.06.12 12:56:02',createTime:'查看详情'},
        // {assigneeName:'李白',childAccountName:'县长',childAccountNo:'通过',amount:'2018.06.12 12:56:02',createTime:'查看详情'},
        // {assigneeName:'李白',childAccountName:'县长',childAccountNo:'通过',amount:'2018.06.12 12:56:02',createTime:'查看详情'},
      ],

      alreadyPay:'',
      tPrice:'',
      // foldKey:1,
      tgId:'',
      isdecisionNumFile:true,
        // // videoFlag: false,
        // videoFlag: true,
        // uploadUrl:"https://jsonplaceholder.typicode.com/posts/",
        // videoUploadPercent:"",
        isShowUploadVideo:true,
        // videoForm:{
        //     videoUploadId:"",
        //     Video:"../../../../assets/a.mp4",
        // },
        // // videoFlag:true,
        txtVal:0,
        publishLandtype:"",
        // active:0,
        temp: {
            address__province: '',
            address__city: '',
            address__dist: '',
        },
        isShowProvince:true,
        dialogImageUrl: "",
        dialogVisible: false,
        ruleForm: {
            //流转方式：
            circulation : "",
            //标题：
            title: "",
            // 土地性质
            landChar: "国有建设用地",
            //省
            cantonProvince:"",
            cantonProvinceName:"",
            //市
            cantonCity:"",
            cantonCityName:"",
            //区
            cantonArea:"",
            cantonAreaName:"",
            // 使用权类型：
            useType:"划拨",
            // 土地类型
            landType:"个人用地",
            // 土地一级用途
            firstClassUse:"",
            firstClassUseName:"",
            // 土地二级用途
            secondClassUse:"",
            secondClassUseName:"",
            // 转让、出租、抵押面积
            area:"",
            // 使用权截止日期
            endDate:"2018-12-12",
            // 转让、出租、抵押年限
            years:"",
            uselife:"",
            // 土地坐落
            location:"",
            // 坐标
            coordinate:"",
            east:"",
            west:"",
            south:"",
            north:"",
            // 拟转让、出租、抵押价格
            price:"",
            // 权证号类型
            warrantNumType:"不动产证号",
            // 权证号
            warrantNum:"",
            // 登录机构
            registration:"",
            registrationName:"",
            // 不动产单元号
            unitNum:"",
            // 是否有附属物
            adjunct:"是",
            resource1:"是",
            resource2:"是",
            // 建筑面积
            buildArea:"",
            // 建筑结构
            buildingStructure:"",
            //绿地率
            greenSpaceRate:"",
            greenSpaceRate2:"",
            greenSpaceRateSymbol1:"",
            greenSpaceRateSymbol2:"",
            //建筑密度
            buildingDensity:"",
            buildingDensity2:"",
            buildingDensitySymbol1:"",
            buildingDensitySymbol2:"",
            //建筑限高
            heightLimit:"",
            //容积率
            plotRatio:"",
            plotRatio2:"",
            plotRatioSymbol1:"",
            plotRatioSymbol2:"",
            // 其他说明
            remark:"",
            //图片
            img:"",
            fileList:[],
            fileListVideo:[],
            pId:null,
            photoFirstUpload:true,area:'',
            ownerShipNature:"",//权属人性质
            ownerShip:"",//权属人名字
            identificationType:"",//证件种类
            identificationNum:"",//证件号
            address:"",//地址
            phone:"",//权属人联系电话
            contact:"",//联系人/代理人姓名
            idCard:"",//联系人/代理人身份证号
            contactPhone:"",//联系人/代理人电话
            contactAddress:"",//联系人/代理人地址
        },
       rules: {
           title: [
               { required: true, message: "请输入标题", trigger: "blur" },
               { min: 0,max: 30,message: "请输入标题，30字以内...",trigger: "blur"}
           ],
           landChar: [{ required: true, message: "请选择土地性质", trigger: "blur" }],
           uselife: [{ required: true, message: "请输入剩余年限", trigger: "blur" }],
           area: [{ required: true, message: "请输入面积", trigger: "blur" }],
           cantonProvince: [{ required: true, message: "请选择土地所在省", trigger: "blur" }],
           cantonCity: [{ required: true, message: "请选择土地所在市", trigger: "blur" }],
           cantonArea: [{ required: true, message: "请选择土地所在区", trigger: "blur" }],
           useType: [{ required: true, message: "请选择使用权类型", trigger: "blur" }],
           landType: [{ required: true, message: "请选择土地类型", trigger: "blur" }],
           secondClassUse: [{ required: true, message: "请选择土地用途", trigger: "blur" }],
           area: [{ required: true, message: "请输入面积", trigger: "blur" }],
           years: [{ required: true, message: "请输入使用权截止日期", trigger: "blur" }],
           location: [{ required: true, message: "请输入土地详细地址", trigger: "blur" }],
           warrantNumType: [{ required: true, message: "请选择权证号类型", trigger: "blur" }],
           warrantNum: [{ required: true, message: "请输入权证号", trigger: "blur" }],
           registration: [{ required: true, message: "请选择登记机构", trigger: "blur" }],
           decisionNum: [{ required: true, message: "请输入划拨决定书号", trigger: "blur" }],
            ownerShipNature: [{ required: true, message: "权属人性质：", trigger: "blur" }],
            ownerShip: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            identificationNum:[
                  { required: true, message: "请输入证件号", trigger: "blur" },
                  { min: 18,max: 18,message: "您输入的证件号有误",trigger: "blur"}
              ],
            identificationType: [{ required: true, message: "请选择证件种类", trigger: "blur" }],
            address: [{ required: true, message: "请输入联系地址", trigger: "blur" }],
            phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }, { min: 11,max: 11,message: "您输入的电话号码有误",trigger: "blur"}],
            // idCard: [{  validator: validateIdCrad ,message: "您输入的证件号有误",trigger: "blur"}],
            // contactPhone: [{ validator: validatePhone, trigger: 'blur' }],
       },
        // 土地附件清单
        tableData: [],
        // 交易附件清单
        transTableData: [],
        photoPId:'',
        photoUploadError:false,
        dialogVisibleMap:false,//地图找地对话框
        dicRequest:[
          'flow_mode',
          'land_nature',
          'use_type',
          'land_type',
          'land_use',
          'own_no_type',
          'register_organization',
          // 'administrative_regions',
          'building_structure',
          'tans_owner_type',
          'certifiate_type'
          ],//字典码请求
        dictionary:{//字典码结果
            flow_mode:"",
            land_nature:"",
            use_type:"",
            land_type:"",
            land_use:"",
            own_no_type:"",
            register_organization:"",
            building_structure:"",
            tans_owner_type: "",
            certifiate_type: "",
            administrative_regions:"",
            land_use_second:"",
            cantonCity:"",
            cantonArea:"",
        },
        dicNum:0,//字典循环下标
        dicFinsh:false,//接口请求完成
        baseUrl:'',
        imgUrlId:[],//图片上传成功返回的图片Id
        videoUrlId:[],//视频上传成功返回的视频Id

        greenSpaceRateSymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='},
            {lable:'null',value:'null'},
        ],
        greenSpaceRateSymbolSelect2:[],
        buildingDensitySymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='},
            {lable:'null',value:'null'},
        ],
        buildingDensitySymbolSelect2:[],
        plotRatioSymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='},
            {lable:'null',value:'null'},
        ],
        plotRatioSymbolSelect2:[],

        paymentData:{
          // tgemId: "201905100002",
          // amount: "50",
          // unit: "万元",
          // endDate: "2019-05-20",
          // tabaId: "111",
          // childAccountName: "工行子账户",
          // childAccountNo: "622202160",
          // childAccountBank: "ICBC分行",
          // currency: null,
          // accountNo: "62202"
        },
        pay:{
          applyId:''
        },
        parameter:{ //地块ID
          goodsId:''
        },
        routeList:'',
        longitude:'',//经度
        latitude:''//纬度
    };
  },
  created(){
    this.getProvinceData()
    this.routeList = this.$route.query;
    //组件加载时初始化必要信息
    this.actInfo = {
      businessId: this.$route.query.businessId,
      taskId: this.$route.query.taskId,
      procInsId: this.$route.query.procInsId,
      procDefId: this.$route.query.procDefId
    }

    this.actType = this.$route.query.actType;

    this.parameter.goodsId = this.$route.query.id;
    this.init();
    console.log('这是委托列表传递的参数：',this.routeList);
  },
  mounted(){
    let signNum = this.$route.query.num;
    console.log('这是标记Num',signNum);
    if(signNum===1){
      this.activeName = 'first';
    }else if(signNum===2){
      this.activeName = 'second';
    }else if(signNum===3){
      this.activeName = 'third';
    }
  },
  methods: {
    // backPage() {
    //   this.$router.push({ path: "/entrustDetailList" });
    // },
    //审核按钮
    examine(obj,index){
      // this.actInfo=obj;
      this.RedialogForm = true;
      this.$nextTick(()=>{
        this.$bus.$emit('transferaudit', 'examine')//需要审核
      })
    },actResult(re) {
      //取消：cancel，流转：success,流转结束：end,审核未通过：failed
      if (re === "cancel") {
        //取消关闭弹框，不做任何事件
      } else if (re === "success") {
        //刷新页面
        this.$bus.$emit('refreshPage',['home']);
        //关闭当前tab
        //关闭当前页面
        this.$bus.$emit('closeTabsItem',this.$route.name);
      } else if (re === "failed") {
        //修改状态
        this.setState("failed");
        //刷新页面
        this.$bus.$emit('refreshPage',['home']);
        //关闭当前tab
        //关闭当前页面
        this.$bus.$emit('closeTabsItem',this.$route.name);
      } else if (re === "end") {
        //修改状态
        this.setState("success");
        //刷新页面
        this.$bus.$emit('refreshPage',['home']);
        //关闭当前tab
        //关闭当前页面
        this.$bus.$emit('closeTabsItem',this.$route.name);
      }
      this.RedialogForm = false;
    },setState(state) {
      var that = this;
      var delegationStatus = "";
      if (state === "success") {
        delegationStatus = "accept";
      } else if (state === "failed") {
        delegationStatus = "accept_failure";
      }
      //改变状态
      this.$post(this.$API.EPF_TRADE.ENTRUST.EDIT_STATE, {
        id: that.parameter.goodsId,
        delegationStatus: delegationStatus,
        jsonVars: ""
      }).then(res => {
        console.log("审核接口结果", res);

        if (res.msg != "success") {
          //失败
          this.$message.error(res.msg);
          return;
        }
        this.dialogForm = false;
        this.form.assessor = "";
        this.form.opinion = "";
        this.tableData1.splice(this.currentLandIndex, 1);
        this.$message({
          message: "审核完成",
          type: "success"
        });
        //刷新页面
        this.getTransferPlace(this.searchInfo);
      });
    },
    init(){
      window.scrollTo(0,120);
      this.baseUrl = baseURL1.baseURL1 +'/epf-document/document/downloadById?id='
      if(this.$route.query.id){//委托交易列表携带Id进入
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GET_GOODS,{id:this.$route.query.tgId}).then(res=>{
          res['tSell'] = Object.assign(res.transGoods,res.transTrustInfo);
          function getChangeDate(date) {
          return (
            date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()
          );
          }
          this.comGreenSpaceRateSymbol();
          // res.tSell.endDate = getChangeDate(new Date(res.tSell.endDate));
          res.tSell['pId'] = res.tSell.img;
          res.tSell['fileList'] = [];
          res.tSell['fileListVideo'] = [];
          res.tSell['title'] = res.tSell['trustTitle']
          this.pulishName(res.tSell.circulation)
          this.ruleForm = res.tSell;

          if(res.tSell.coordinate && res.tSell.coordinate.split(',').length == 2){
            this.longitude = parseFloat(res.tSell.coordinate.split(',')[0])
            this.latitude = parseFloat(res.tSell.coordinate.split(',')[1])
          }
          if(res.tSell.coordinate && res.tSell.coordinate.split(' ').length == 2){
            this.longitude = parseFloat(res.tSell.coordinate.split(' ')[0])
            this.latitude = parseFloat(res.tSell.coordinate.split(' ')[1])
          }

          this.belong = res.tSell.enclosureId
          this.areaCode = res.tSell.cantonProvince

          if(this.$route.query.procInsId){
            var jsonVars="{'test':'test'}";
            this.$post(this.$API.EPF_ACTIVITI.FLOW,{procInsId:this.$route.query.procInsId,jsonVars:jsonVars}).then(res => {
              //查询意见
              if(res.code != '0'){
                //失败
                this.$message.error(res.msg);
                return
              }
              this.acceptanceData = res.histoicFlowList;
            })
          }
          //请求附件组
          if(res.tSell.pId){
            this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GROUP_ID,{id:res.tSell.pId}).then(files =>{
              let filesData = files.fileList;
              console.log('附件组',files)
              for (let index = 0; index < filesData.length; index++) {
                if(filesData[index].extName == 'png' || filesData[index].extName == 'PNG' || filesData[index].extName == 'jpg' || filesData[index].extName == 'JPG' ||  filesData[index].extName == 'jifi' ||  filesData[index].extName == 'gif'){
                  this.ruleForm['fileList'].push({url:this.baseUrl + filesData[index].id,status: 'success',name: filesData[index].name,})
                  this.imgUrlId.push(filesData[index].id)
                }
                if(filesData[index].extName == 'mp4'){
                  this.ruleForm['fileListVideo'].push({url:this.baseUrl + filesData[index].id,status: 'success',name: filesData[index].name,})
                  this.videoUrlId.push(filesData[index].id)
                }
              }
              this.ruleForm['id'] = this.$route.query.id;
            })
          }
        })
        this.parameter.goodsId = this.$route.query.id;
        this.getSeeBond(this.parameter);
      }else if(this.$store.state.publishLand){
        this.ruleForm = this.$store.state.publishLand

        if(this.ruleForm.coordinate && this.ruleForm.coordinate.split(',').length == 2){
          this.longitude = parseFloat(this.ruleForm.coordinate.split(',')[0])
          this.latitude = parseFloat(this.ruleForm.coordinate.split(',')[1])
        }
        if(this.ruleForm.coordinate && this.ruleForm.coordinate.split(' ').length == 2){
          this.longitude = parseFloat(this.ruleForm.coordinate.split(' ')[0])
          this.latitude = parseFloat(this.ruleForm.coordinate.split(' ')[1])
        }
      }
      // if(this.$route.query.landtype){
      //   this.pulishType(Number(this.$route.query.landtype));
      // }else{
      //     this.pulishName(this.ruleForm.circulation)
      // }
      // 调用字典码相关接口
      let reqArr = this.dicRequest.map((item,index,arr)=>{
        let reqFun = new Promise((resolve,reject)=>{
          if ( item == "land_use") {
              this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:item, parentId: 0 }
              ).then(res => {
                resolve(res);
              });
            }else{
            this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GET_GROUP + item,{}).then(res => {
              resolve(res);
            })
          }
        })
        return reqFun
      })
      Promise.all(reqArr).then(res=>{
        let dicArr = res.map((item =>{
          let dicArr = item.dictionariesList.map((item => {
            return {
              dictKey:item.dictKey,
              zhCn:item.zhCn,
              id:item.id
            }
          }))
          return dicArr
        }));
        console.log(dicArr);
        for(let item in this.dictionary){
          this.dictionary[item] = dicArr[this.dicNum];
          this.dicNum++;
        }
        this.dicFinsh = true;
      });
    },
    // 重新生成子账号
    createChildAccount(){
      //改变状态
      this.$post(this.$API.EPF_TRADE.ENTRUST.CREATED_NO,{id:this.$route.query.id}).then(res => {
        if(res.msg != '0'){
          //失败
          this.$message.error(res.msg);
          return
        }
        //刷新页面
        this.init();
        this.$message({
          message: '创建子账号成功',
          type: 'success'
        });
      })
    },
    getSeeBond(parameter){ //查看履约保证金
      console.log('这是履约保证金参数',parameter);
      this.$get(this.$API.EPF_TRADE.ENTRUST.DETAIL.MONEY_INFO,parameter).then(res=>{
        if (res.code == "0") {
          this.paymentData = res.transEarnestMoneyVo;
          this.alreadyPay = this.paymentData.amount;
          this.paymentRecord();
          console.log("这是履约保证金返回",res.transEarnestMoneyVo);
        } else {
          // this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    paymentRecord(){ //查看缴纳记录
      this.pay.applyId = this.paymentData.tabaId;
      this.$get(this.$API.EPF_TRADE.ENTRUST.DETAIL.APPLY_ID,this.pay).then(res=>{
        console.log("这是缴纳记录返回",res);
        if (res.code == "0") {
          this.contartData=res.pager.results;
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    pulishName(name){
      if(name == "transfer"){
          this.pulishType(1)
      } else if(name == "rent"){
          this.pulishType(2)
      }  else if(name == "mortgage"){
          this.pulishType(3)
      }
    },
    pulishType(typeName){
        if(typeName===1){
             this.publishLandtype="剩余使用";
             this.ruleForm.circulation = "transfer";
             this.ruleForm.circulationName = "转让";
        } else if(typeName===2){
             this.publishLandtype="出租";
             this.ruleForm.circulation = "rent";
             this.ruleForm.circulationName = "出租";
        }  else if(typeName===3){
             this.publishLandtype="抵押";
             this.ruleForm.circulation = "mortgage";
             this.ruleForm.circulationName = "抵押";
        }
    },
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    },
    // handleClose(done){
    //     //关闭地图对话框
    //     done();
    // },
    circulatemodeSelect(dic,circulationName,event){
        this.ruleForm.circulation = this.$refs[circulationName][0].$attrs.dictKey;
        if( this.ruleForm.circulation == "transfer"){
            this.pulishType(1)
        } else if(this.ruleForm.circulation == "rent"){
            this.pulishType(2)
        }  else if(this.ruleForm.circulation == "mortgage"){
            this.pulishType(3)
        }
    },
    firstClassUseSelect(dic,firstClassUse,event){
        this.ruleForm.secondClassUse = '';
        this.ruleForm.secondClassUseName = '';
        this.dictionary.land_use_second = '';
        let pId= this.$refs[firstClassUse][0].$attrs.id;
        this.ruleForm.firstClassUse =  this.$refs[firstClassUse][0].$attrs.dictKey;
        this.$get(this.$API.EPF_TRADE.ENTRUST.DETAIL.CODE_ID,{code:land_use,parentId:pId},{}).then(res => {
           if(res.dictionariesList.length != 0){
            this.dictionary.land_use_second = res.dictionariesList
            return
           }
           this.dictionary.land_use_second = ''
        })
    },
    secondClassUseSelect(dic,firstClassUse,event){
        this.ruleForm.secondClassUse =  this.$refs[firstClassUse][0].$attrs.dictKey;
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

    province(dic,cantonCode,event){
        this.ruleForm.cantonAreaName='';
        this.ruleForm.cantonArea='';
        // this.cantonArea = ''
        this.ruleForm.cantonCityName='';
        this.ruleForm.cantonCity='';
        // this.cantonCity = '';
        let pId= this.$refs[cantonCode][0].$attrs.id;
        this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,{parentId:pId},{}).then(res => {
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonCity = res.dictionariesList
            return
            }
            this.dictionary.cantonCity = ''
        })
    },
    city(dic,cantonCity,event){
        this.ruleForm.cantonArea='';
        this.ruleForm.cantonAreaName='';
        this.cantonArea = ''
        let pId= this.$refs[cantonCity][0].$attrs.id;
        this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,{parentId:pId},{}).then(res => {
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonArea = res.dictionariesList
            return
            }
            this.dictionary.cantonArea = ''
        })
    },
    area(dic,cantonCity,event){
        this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    registrationeSelect(dic,registrationName,event){
        this.ruleForm.registration = this.$refs[registrationName][0].$attrs.dictKey;
    },
    addMoreFile(){
      let tid = this.tableData[this.tableData.length - 1].tid;
      this.tableData.push({isAux:"0",tid:tid + this.tableData.length,tname: "其他",file: [],tsize:0});
    },
    seeFile(index,id){
      this.tableData[index].files = [];
      this.tableData[index].tsize = 0;
    },
    getSummaries(param){ //表尾合计
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
       const values = data.map(item => Number(item[column.property]));
        if (column.property == 'amount') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              this.tPrice = prev + curr;
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        }
      });

      return sums;
    },
    handleSizeChange(val){
      console.log(val);
    },
    handleCurrentChange(val){
      console.log(val);
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
    switchs(){
      setTimeout((()=>{
        this.entrustLoading = true
      }),0)
    }
  },
  watch: {
      $route(){
        if(this.$route.query.tgId){
          this.tgId = this.$route.query.tgId
        }
      },
      tgId() {
        this.dicNum=0;
        this.init();
      },
    }
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.filter_wrap{
  box-sizing: border-box;
  padding: 32px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  box-shadow: 0 0px 30px rgba(0,0,0,0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  background: #fff;
  .dsDetailInfo_box{
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      padding:0 24px;
      &_title{
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        .publish_title_icon{
          @include size(6px, 21px);
          background: #ffca73;
          border-radius: 3px;
          margin-top: 18px;
          margin-right: 12px;
        }
        .title{
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          line-height: 56px;
        }
        .fold{
          font-size: 14px;
          color: #999999;
          line-height: 56px;
          cursor: pointer;
          span{
            margin-right: 10px;
          }
        }
      }
      &_cont{
        box-sizing: border-box;
        .publish_mainUl{
          @include size(100%,auto);
          display: flex;
          flex-wrap: wrap;
          margin-top:25px;
          li{
            @include size(50%,auto);
            line-height: 50px;
            min-height: 50px;
          }
        }
        table{
          border:1px solid #f3f3f3;
          margin-top:25px;
          tr{
            @include size(100%,50px);
            border-bottom:1px solid #f3f3f3;
            &:nth-child(1){
              background: #f2f5f7;
              td{
                font-weight: bold;
              }
            }
            td{
              text-align: center;
              color:#333333;
              font-size: 14px;
              &:nth-child(3){
                color:#4671d5;
              }
              &:nth-child(4){
                color:#4671d5;
              }
              .text_red{
                color:red;
                margin-right: 5px;
                cursor: auto;
              }
              span{
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .findland_input{
          @include size(104px,40px);
          background-color: #ffa000;
          border-radius: 3px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          display: inline-block;
          margin-left: 14px;
          cursor: pointer;
          img{
            display: inline-block;
            @include size(14px,16px);
            margin-top:13px;
            margin-right:5px;
          }
        }
        p{
          line-height: 50px;
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }
  .corverBox{
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 999;
  }
  .avatar-uploader{
    position: relative;
    z-index: 9999;
  }
  .setZindexMax{
    position: relative;
    z-index: 9999;
  }
}
</style>
<style scoped>
.el-radio__input.is-checked+.el-radio__label{
  color: #ffa000;
}
.el-radio__input.is-checked .el-radio__inner{
  border:1px solid #ffa000;
  background:#ffa000;
}
.el-input--suffix{
  position: relative;
}
.el-radio__inner:hover{
  border:1px solid #ffa000;
}
#publishLandMapDialog .el-dialog .el-dialog__body{
  height: 650px;
  padding-top: 20px;
}
#publishLandMapDialog .el-dialog .el-dialog__header{
  padding:10px;
}
#publishLandMapDialog .el-dialog .el-dialog__header .el-dialog__headerbtn{
  top: 10px;
}
  .filter_wrap .el-input--small .el-input__inner{
    height:40px;
  }
  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 117px;
    height:40px;
    font-size: 14px;
    line-height: 40px;
    padding: 0 10px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .filter_wrap .el-date-editor.el-input .el-input__icon{
    line-height:30px;
    color:#8dc4f7;
  }
  .bondBox{
    border: solid 1px #ebeff5;
    width: 100%;
    height: 200px;
    margin-top:25px;
    padding:34px 0;
  }
  .canton_Regions>.el-form-item__content{
      margin-left: 5px !important;
  }
  .seeImg>.el-dialog>.el-dialog__header{
    border-bottom: none !important;
  }
  .bond_title{
    color: #616164;
    font-size: 14px;
  }
  .stateLabels{
    width: 95px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    border-radius: 0 25px 25px 0;
    background-color: #ebebeb;
    color: #9a9a9a;
    position: relative;
    float: right;
    margin-right: 10px;
  }
  .stateLabels::after{
    content: '';
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 100%;
    position: absolute;
    left: 8px;
    top: 15px;
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
.videoBpx span:first-child{
  margin-left: 0px;
}
.videoBpx span{
  margin: 0 0 0 20px;
}
.videoBpx video{
  padding: 1px;
  background-color: #000;
}
.publish_main_cont .title_content::after{
  display: none;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
