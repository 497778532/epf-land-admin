<template>
  <div id="entrustedTradeDetailsAddStep" class="page-body">
    <div class="filter_wrap"
    v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-background="rgba(255, 255, 255,0.95)">
      <div  class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="step">
            <el-steps :active="active" finish-status="success">
              <el-step title="土地基本信息&委托机构"></el-step>
              <el-step title="申请人信息"></el-step>
              <el-step title="附件信息"></el-step>
            </el-steps>
          </div>
          <el-form
            :model="transGoods"
            :rules="rules"
            ref="transGoods"
            label-width="250px"
            class="demo-transGoods"
          >
            <div class="firststep" v-if="active===0" align-center>

              <EPF-switchTitle titles_h='土地基本信息' :switchData='true'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="土地性质：" prop="landChar">
                        <el-radio-group v-model="transGoods.landChar">
                          <el-radio v-for="item in dictionary.land_nature" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;flex-direction: row;">
                        <el-form-item label="所属行政区：" prop="cantonProvince">
                        <el-select v-model="transGoods.cantonProvinceName" placeholder="请选择土地所在省" @change="provinceSelect(dictionary.administrative_regions,transGoods.cantonProvinceName,$event)" style="width:90px" >
                            <el-option v-for="(item,index) in dictionary.administrative_regions"  :ref="item.regionName"
                            :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="index"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item prop="cantonCity" class="canton_Regions">
                            <el-select v-model="transGoods.cantonCityName" placeholder="请选择土地所在市" @change="citySelect(dictionary.cantonCity,transGoods.cantonCityName,$event)" style="width:90px">
                                <el-option v-for="(item,index) in dictionary.cantonCity" :ref="item.regionName"
                                :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="cantonArea" class="canton_Regions">
                            <el-select v-model="transGoods.cantonAreaName" placeholder="请选择土地所在区/县"  @change="areaSelect(dictionary.cantonAreaName,transGoods.cantonAreaName,$event)" style="width:90px" >
                                <el-option v-for="(item,index) in dictionary.cantonArea" :ref="item.regionName"
                                :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="index" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    </li>
                    <li>
                      <el-form-item label="使用权类型：" prop="useType">
                        <el-radio-group v-model="transGoods.useType" @change="useTypeSelect">
                          <el-radio v-for="(item,index) in dictionary.use_type" :label="item.dictKey" :key="index">{{item.zhCn}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li style="width:80%">
                      <el-form-item label="土地类型：" prop="landType">
                        <el-radio-group v-model="transGoods.landType">
                          <el-radio v-for="(item,index) in dictionary.land_type" :label="item.dictKey" :key="index">{{item.zhCn}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地流转方式：" prop="circulation">
                        <el-select v-model="transGoods.circulationName"  placeholder="请选择土地流转方式" @change="circulationSelect(dictionary.flow_mode,transGoods.circulationName,$event)" >
                            <el-option v-for="item in dictionary.flow_mode.slice(0,2)" :ref="item.zhCn"
                                :id="item.id" :dictKey="item.dictKey" :dictId="item.id" :label="item.zhCn" :value="item.zhCn" :key="item.dictKey">
                            </el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;flex-direction: row;">
                        <el-form-item label="土地用途：" prop="firstClassUse"  style="width:426px;">
                            <el-select v-model="transGoods.firstClassUseName" placeholder="请选择土地一级用途"  @change="firstClassUseSelect(dictionary,transGoods.firstClassUseName,$event)" >
                                <el-option v-for="(item,index) in dictionary.land_use" :ref="item.zhCn" :dictKey="item.dictKey" :id="item.id" :label="item.zhCn" :value="item.zhCn" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                            <el-form-item prop="secondClassUse"  class="canton_Regions">
                            <el-select v-model="transGoods.secondClassUseName" placeholder="请选择土地二级用途"  @change="secondClassUseSelect(dictionary,transGoods.secondClassUseName,$event)">
                                <el-option v-for="(item,index) in dictionary.land_use_second" :ref="item.zhCn" :label="item.zhCn" :dictKey="item.dictKey"  :value="item.zhCn" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        </div>
                    </li>
                    <li>
                      <el-form-item :label="transGoods.circulationName+'面积：'" prop="area">
                        <el-input v-model="transGoods.area" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="使用权截止日期：" prop="endDate">
                        <el-date-picker
                          v-model="transGoods.endDate"
                          :picker-options="expireTimeOption"
                          type="date"
                          placeholder="选择日期"
                          style="width:60%;"
                          @change="selectDatarange"
                        ></el-date-picker>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="publishLandtype+'年限：'" prop="years">
                        <el-input v-model="transGoods.years" placeholder="100" style="width:60%;" :disabled="disabledYear"></el-input>
                        <span style="margin-left:5px;">年</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地坐落：" prop="location">
                        <el-input
                          v-model="transGoods.location"
                          placeholder="请输入"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="坐标：">
                        <el-input
                          :disabled="true"
                          v-model="transGoods.coordinate"
                          placeholder="地图标注以后，自动获取坐标"
                          style="width:60%;"
                        ></el-input>
                        <div class="findland_input" @click="dialogVisibleMap = true">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg=="
                            alt
                          >
                          <span>地图找地</span>
                        </div>
                        <el-dialog
                            id="publishLandMapDialog"
                            center
                            :modal="false"
                            :visible.sync="dialogVisibleMap"
                            @close="dialogVisibleMap = false"
                            style="height: 860px"
                          >
                            <h2 class="MapTitle">地块地理位置标注</h2>
                            <div style="width:95%;height:500px;margin:10px auto;">
                              <TMap @coordinateMap="coordinateMap"></TMap>
                            </div>
                            <el-row style="padding-bottom:20px;margin-top:20px;">
                              <el-col :span="12" style="padding-right:16px;">
                                <div class="MapBtns"
                                  style="width:70px;float:right"
                                  @click="markerDown"
                                >确定</div>
                              </el-col>
                              <el-col :span="12" style="padding-left:16px;">
                                <div class="MapBtns"
                                    style="background-color:#fff;color:#adadad;border:solid 1px #dfdfdf;width:70px;"
                                    @click="dialogVisibleMap = false"
                                >关闭</div>
                              </el-col>
                            </el-row>
                          </el-dialog>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="东至：" prop="east">
                        <el-input v-model="transGoods.east" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="南至：" prop="south">
                        <el-input v-model="transGoods.south" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="西至：" prop="west">
                        <el-input v-model="transGoods.west" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="北至：" prop="north">
                        <el-input v-model="transGoods.north" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="'拟'+transGoods.circulationName+'价格：'" prop="price">
                        <el-input v-model="transGoods.price" placeholder="100" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">万元</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号类型：" prop="warrantNumType">
                        <el-radio-group v-model="transGoods.warrantNumType">
                          <el-radio v-for="item in dictionary.own_no_type" :label="item.dictKey" :key="item.zhCn">{{item.zhCn}}</el-radio>
                        </el-radio-group>
                        <!-- <el-radio v-model="transGoods.warrantNumType" label="1">不动产证号</el-radio>
                        <el-radio v-model="transGoods.warrantNumType" label="2">土地证号</el-radio> -->
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号：" prop="warrantNum">
                        <el-input v-model="transGoods.warrantNum" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="登记机构：" prop="registration">
                        <el-input
                          v-model="transGoods.registration"
                          placeholder="请输入"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="不动产单元号：" prop="unitNum">
                        <el-input
                          v-model="transGoods.unitNum"
                          placeholder="请输入"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="是否有附属物：" prop="isAdjunct">
                        <el-radio v-model="transGoods.isAdjunct" label="0">是</el-radio>
                        <el-radio v-model="transGoods.isAdjunct" label="1">否</el-radio>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item
                        v-if="transGoods.useType == 'transfer2' || transGoods.useType == 'tosell' "
                        ref="decisionNum" :label="transGoods.useType=='transfer2'?'划拨决定书号：':'建设用地使用权出让合同号：'"
                        prop="decisionNum">
                        <el-input
                          v-if="transGoods.useType == 'transfer2'" v-model="transGoods.decisionNum"
                          placeholder="请输入划拨决定书号" style="width:60%;">
                          </el-input>
                        <el-input  v-if="transGoods.useType == 'tosell'"  v-model="transGoods.decisionNum"
                          placeholder="请输入建设用地使用权出让合同号"  style="width:60%;">
                          </el-input>
                      </el-form-item>
                    </li>
                    <div v-if="transGoods.isAdjunct=='0'">
                    <li>
                      <el-form-item label="建筑面积：" prop="buildArea">
                        <el-input v-model="transGoods.buildArea" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="建筑结构：" prop="buildType">
                        <el-select v-model="transGoods.buildingStructureName"  placeholder="请选择" @change="buildingTypeSelect(dictionary.building_structure,transGoods.buildingStructureName,$event)" >
                            <el-option v-for="item in dictionary.building_structure" :ref="item.zhCn"
                                :id="item.id" :dictKey="item.dictKey" :dictId="item.id" :label="item.zhCn" :value="item.zhCn" :key="item.dictKey">
                            </el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="建筑限高：" prop="heightLimit">
                        <el-input v-model="transGoods.heightLimit" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">米</span>
                      </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                          <el-form-item label="绿地率%：" style="width:395px;" prop="greenSpaceRate">
                              <el-input v-model="transGoods.greenSpaceRate"  placeholder="绿地率下限" style="width:140px;"></el-input>
                          </el-form-item>
                          <el-form-item  class="canton_Regions">
                              <el-select v-model="transGoods.greenSpaceRateSymbol1" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.greenSpaceRateSymbol1,'greenSpaceRateSymbol1')">
                                  <el-option v-for="(item,index) in greenSpaceRateSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </el-form-item>
                              <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">绿地率</span>
                          <el-form-item  class="canton_Regions">
                              <el-select v-model="transGoods.greenSpaceRateSymbol2" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.greenSpaceRateSymbol2,'greenSpaceRateSymbol2')">
                                  <el-option v-for="(item,index) in greenSpaceRateSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item  class="canton_Regions" prop="greenSpaceRate2">
                              <el-input v-model="transGoods.greenSpaceRate2"  placeholder="绿地率上限" style="width:140px;"></el-input>
                          </el-form-item>
                      </li>
                      <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                          <el-form-item label="建筑密度%：" style="width:395px;" prop="buildingDensity">
                            <el-input v-model="transGoods.buildingDensity"  placeholder="建筑密度下限" style="width:140px;"></el-input>
                          </el-form-item>
                          <el-form-item  class="canton_Regions">
                          <el-select v-model="transGoods.buildingDensitySymbol1" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.buildingDensitySymbol1,'buildingDensitySymbol1')">
                              <el-option v-for="(item,index) in buildingDensitySymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                          </el-form-item>
                              <span style="margin:0 17px;color:#606266;line-height:38px;">建筑密度</span>
                          <el-form-item  class="canton_Regions">
                          <el-select v-model="transGoods.buildingDensitySymbol2" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.buildingDensitySymbol2,'buildingDensitySymbol2')">
                              <el-option v-for="(item,index) in buildingDensitySymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                          </el-form-item>
                          <el-form-item  class="canton_Regions" prop="buildingDensity2">
                          <el-input v-model="transGoods.buildingDensity2"  placeholder="建筑密度上限" style="width:140px;"></el-input>
                          </el-form-item>
                      </li>
                      <li style="width:100%; display: flex;flex-direction: row;" v-show="transGoods.isAdjunct=='0'">
                        <el-form-item label="容积率：" style="width:395px;" prop="plotRatio">
                        <el-input v-model="transGoods.plotRatio"  placeholder="容积率下限" style="width:140px;"></el-input>
                        </el-form-item>
                        <el-form-item  class="canton_Regions">
                        <el-select v-model="transGoods.plotRatioSymbol1" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.plotRatioSymbol1,'plotRatioSymbol1')">
                            <el-option v-for="(item,index) in plotRatioSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                            <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">容积率</span>
                        <el-form-item  class="canton_Regions">
                        <el-select v-model="transGoods.plotRatioSymbol2" placeholder="请选择符号" style="width:157px;" @change="change($event,transGoods.plotRatioSymbol2,'plotRatioSymbol2')">
                            <el-option v-for="(item,index) in plotRatioSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item  class="canton_Regions" prop="plotRatio2">
                        <el-input v-model="transGoods.plotRatio2"  placeholder="容积率上限" style="width:140px;"></el-input>
                        </el-form-item>
                      </li>
                    </div>

                  </ul>
                  <ul>
                    <li>
                      <el-form-item label="土地照片：" prop="landImg">
                        <el-upload
                          action="http://192.168.1.200:8081/epf-document/document/upload/"
                          ref="photoUploader"
                          list-type="picture-card"
                          multiple
                          :limit="5"
                          :http-request="first_photoUploadFile"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="file_List_Remove"
                          :before-upload="beforeAvatarUploadImg"
                          :on-success="first_UploadSuccess"
                          :on-error="upLoadError"
                          :file-list="transGoods.fileList"
                          >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <p style="font-size:14px;color:#999999;">
                          <img src="" alt="" style="margin-top:10px;">
                          说明：支持JPG.PNG.GIF格式，最多可上传5张照片，图片每张最大6M
                        </p>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <el-form-item label="土地视频：" prop="landVideo">
                        <div style="position:relative;" class="el_videoBox">
                          <div class="videoList">
                            <div v-for="(item,index) in transGoods.fileListVideo" :key="index" class="videoBox">
                              <video
                                loop
                                width="146px"
                                height="146px"
                                :src="item.url"
                                controls="controls"
                                style="outline:none;border-radius: 8px;background-color: #000;padding:1px;"
                              >您的浏览器不支持 video 标签。</video>
                            </div>
                          </div>
                        <el-upload
                          action="http://192.168.1.200:8081/epf-document/document/upload/"
                          list-type="picture-card"
                          ref="videoUploader"
                          multiple
                          :limit="5"
                          :http-request="videoUploadFile"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="file_List_Remove"
                          :before-upload="beforeAvatarUploadVideo"
                          :on-success="videoUploadSuccess"
                          :on-error="upLoadError"
                          :file-list="transGoods.fileListVideo"
                          >
                          <!-- :file-list="transGoods.fileList" -->
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                      <p style="font-size:14px;color:#999999;">
                          <img src="" alt="" style="margin-top:10px;">
                          说明：请保证视频格式正确，且不超过20M</p>
                        </div>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <el-form-item label="其他说明：">
                        <el-input
                          type="textarea"
                          maxlength="1000"
                          minlength="0"
                          show-word-limit
                          autosize
                          v-model="transGoods.remark"
                          placeholder="可针对土地的其他信息进行补充说明"
                          style="width:600px;height:155px;"
                        ></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>


              <EPF-switchTitle titles_h='委托机构' :switchData='true'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="标题：" prop="trustTitle">
                        <el-input v-model="transGoods.trustTitle" placeholder="请输入" ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="选择委托机构：" prop="trustOrgId">
                        <el-select v-model="transGoods.trustOrgId"  placeholder="请选择委托机构" >
                            <el-option
                              v-for="item in orgs"
                              :ref="item.orgName"
                              :id="item.id"
                              :label="item.orgName"
                              :value="item.id"
                              :key="item.id"
                            >
                            </el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>


              <div class="operfirst">
                <button class="button_bg" @click="submitForm('transGoods')">下一步</button>
              </div>
            </div>

            <div class="Secondstep" v-if="active===1" align-center>

              <EPF-switchTitle titles_h='申请人信息' :switchData='true'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="权属人性质：" prop="ownerShipNature">
                        <!-- @change="ownerShipSelect(dictionary.tans_owner_type,transGoods.ownerShipNatureName,$event)" -->
                        <el-select v-model="transGoods.ownerShipNature" placeholder="请选择" @change="ownerShipNatureSelect()">
                            <el-option
                              v-for="item in dictionary.tans_owner_type"
                              :label="item.zhCn"
                              :value="item.dictKey"
                              :key="item.zhCn"
                            ></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="名称：" prop="ownerShip">
                        <el-input v-model="transGoods.ownerShip" placeholder="请输入名称" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件种类：" prop="identificationType">
                        <!-- @change="idCardSelect(dictionary.certifiate_type,transGoods.identificationTypeName,$event)" -->
                        <el-select v-model="transGoods.identificationType" placeholder="请选择"  :disabled="idFlag" >
                            <el-option
                              v-for="item in dictionary.certifiate_type"
                              :label="item.zhCn"
                              :value="item.dictKey"
                              :key="item.zhCn"
                            ></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件号：" prop="identificationNum">
                        <el-input
                          v-model="transGoods.identificationNum"
                          placeholder="请输入证件号码"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地址：" prop="address">
                        <el-input
                          v-model="transGoods.address"
                          placeholder="请输入地址"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权属人联系电话：" prop="phone">
                        <el-input
                          v-model="transGoods.phone"
                          placeholder="请输入权属人联系电话"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人：" prop="contact">
                        <el-input
                          v-model="transGoods.contact"
                          placeholder="请输入联系人/代理人名称"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人身份证号：" prop="idCard">
                        <el-input
                          v-model="transGoods.idCard"
                          placeholder="请输入联系人/代理人身份证号号码"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系电话：" prop="contactPhone">
                        <el-input
                          v-model="transGoods.contactPhone"
                          placeholder="请输入联系人/代理人联系电话"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系地址：" prop="contactAddress">
                        <el-input
                          v-model="transGoods.contactAddress"
                          placeholder="请输入联系人/代理人联系地址"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>



              <div class="operfirst" style="margin-left:0;margin-top:20px;">
                <button class="button_bg" @click="prev">上一步</button>
                <button class="button_bg" @click="next('transGoods')">下一步</button>
              </div>
            </div>

            <div class="thirdstep AttachmentInfoList_warp" style="background:#fff;" v-if="active===2" align-center>
              <!-- 土地附件清单 -->
              <div class="EntrustTra_main" style="margin:0 auto;" v-if="Enclosure">
                <EPF-switchTitle titles_h='土地附件清单' :shutOff='false' background='#fff'>
                  <div class="EntrustTra_main_cont" style="padding-bottom:0px;">
                    <EPF-annexList
                      @switchs="switchs"
                      @isAux='isAuxFun'
                      :tableType='false'
                      :tableNmae='tableNmae'
                      :belong='belong'
                      :areaCode='areaCode'
                      :fileSize='6'
                      :fileType='fileType'
                      :annexType='annexType'
                      >
                    </EPF-annexList>
                    <span style="color: #aaa;">提示：权属人性质为个人时，权属人证件上传身份证；性质为企业时，权属人证件上传营业执照。</span>
                  </div>
                </EPF-switchTitle>


                <!-- 委托附件清单 -->
                <EPF-switchTitle titles_h='委托附件清单' :shutOff='false' background='#fff'>
                  <div class="EntrustTra_main_cont" >
                    <EPF-annexList
                      v-if="entrustLoading"
                      :tableType='false'
                      @isAux='isAuxFun2'
                      :tableNmae='tableNmae'
                      :belong='belong'
                      :areaCode='areaCode'
                      :fileSize='6'
                      :fileType='fileType'
                      :annexType='entrust'
                      >
                    </EPF-annexList>
                    <button :disabled="isLoading" class="button_bg" style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;"  @click="prev" >上一步</button>
                    <button :disabled="isLoading" class="search_input fl" @click="submitLand()">提交</button>
                    <button :disabled="isLoading" class="search_input submit_input fl" @click="submitLand('save')">保存</button>
                    <button style="clear: both;"></button>
                  </div>
                </EPF-switchTitle>

              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TMap from '@/components/tianditu/tianditu'
import imgBaseUrl from '../../index.js'
export default {
  name: "trade",
  components: { TMap },

  data() {
    let identificationNumFunction = (rule, value, callback) => {
      console.log(this.transGoods.identificationType);
      if (this.transGoods.identificationType == "card_id") {
        // 15位数验证
        let reg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
          // 18位数验证
          reg2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!(reg.test(value)||reg2.test(value))) {
          callback(new Error("身份证号码不正确！"));
        } else {
          callback();
        }
      } else if (this.transGoods.identificationType == "business_license") {
        // 15位数或者18位数
        //现在只要18位的校验,15位的不要了
        let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
        if (!reg.test(value)) {
          callback(new Error("营业执照号不正确！"));
        } else {
          callback();
        }
      }
    };
    const numberDator = (rule, value, callback) => {
      if (value < 0 || value > 100) {
        callback(new Error("数值在 0 至 100 之间"));
      } else {
        callback();
      }
    };
    //绿地率校验
      const greenSpaceRateVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.transGoods.greenSpaceRate == '' || this.transGoods.greenSpaceRate == null || this.transGoods.greenSpaceRate2 == '' || this.transGoods.greenSpaceRate2 == null) {
              callback();
          }else{
              if(this.transGoods.greenSpaceRate > this.transGoods.greenSpaceRate2){
                callback(new Error("最大值不能小于最小值!"));
              }else{
                callback();
              }

          }
      };
      //建筑密度校验
      const buildingDensityVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.transGoods.buildingDensity == '' || this.transGoods.buildingDensity == null || this.transGoods.buildingDensity2 == '' || this.transGoods.buildingDensity2 == null) {
              callback();
          }else{
              if(this.transGoods.buildingDensity > this.transGoods.buildingDensity2){
                callback(new Error("最大值不能小于最小值!"));
              }else{
                callback();
              }

          }
      };
      //容积率校验
      const plotRatioVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.transGoods.plotRatio == '' || this.transGoods.plotRatio == null || this.transGoods.plotRatio2 == '' || this.transGoods.plotRatio2 == null) {
              callback();
          }else{
              if(this.transGoods.plotRatio > this.transGoods.plotRatio2){
                callback(new Error("最大值不能小于最小值!"));
              }else{
                callback();
              }

          }
      };
    return {
      idFlag: false,
      tableNmae:['序号','文件名','文件','操作'],
      belong:'',
      areaCode:'',
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      annexType:'LAND',
      entrust:'TRANS',
      entrustLoading:false,

      expireTimeOption: {
        disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() <= Date.now();
        }
      },
      plotRatioSymbolSelect2:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
      ],//符号数据
      foldshow1: false,
      foldshow2: true,
      foldshow3: true,
      foldshow4: true,
      loading:true,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      Enclosure:false,
      greenSpaceRateSymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
        ],
        greenSpaceRateSymbolSelect2:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
        ],
        buildingDensitySymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
        ],
        buildingDensitySymbolSelect2:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
        ],
        plotRatioSymbolSelect1:[
            {lable:'<',value:'<'},
            {lable:'<=',value:'<='},
            {lable:'=',value:'='}
        ],
      imgUrlId: [],
      filterData: {
        flowMode: "",
        issueEndDate: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      dialogVisibleMap: false, //地图找地对话框

      dicRequest: [
        "flow_mode",
        "land_nature",
        "use_type",
        "land_type",
        "land_use",
        "own_no_type",
        "register_organization",
        "building_structure",
        "tans_owner_type",
        "certifiate_type"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_nature: "",
        use_type: "",
        land_type: "",
        land_use: "",
        own_no_type: "",
        register_organization: "",
        building_structure: "",
        tans_owner_type: "",
        certifiate_type: "",
        administrative_regions: "",
        land_use_second: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      tradingCenterOptions: [
        {
          value: "选项1",
          label: "济南市国土资源局"
        },
        {
          value: "选项2",
          label: "商河县国土资源局"
        },
        {
          value: "选项3",
          label: "济阳县国土资源局"
        },
        {
          value: "选项4",
          label: "平阳县国土资源局"
        }
      ],
      // 地块基本信息
      transGoods: {
        id:'',
        // 土地性质
        landChar: "",
        // 流转方式
        circulation: "",
        circulationName: "",
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        // 使用权类型：
        useType: "",
        // 土地类型
        landType: "",
        // 土地性质
        landNature: "",
        // 流转方式
        landTrans: "",
        // 土地一级用途
        firstClassUse: "",
        firstClassUseName: "",
        // 土地二级用途
        secondClassUse: "",
        secondClassUseName: "",
        // 面积
        buildArea: "",
        // 使用年限
        years: "",
        // 使用权截止日期
        endDate: "",
        // 土地坐落地址
        location: "",
        // 坐标
        coordinate: "",
        // 东
        east: "",
        // 南
        south: "",
        // 西
        west: "",
        // 北
        north: "",
        // 转让价格
        price: "",
        // 权证号类型
        warrantNumType: "",
        // 权证号
        warrantNum: "",
        // 登记机构
        registration: "",
        // 不动产单元号
        unitNum: "",
        // 是否有附属物
        isAdjunct: "0",
        // 绿化率（下）
        greenSpaceRate: "",
        // 绿化率（上）
        greenSpaceRate2: "",
        // 绿化率前置符号
        greenSpaceRateSymbol1: "",
        // 绿化率后置符号
        greenSpaceRateSymbol2: "",
        // 建筑结构
        buildingStructure: "",
        buildingStructureName: "",
        // 建筑限高
        heightLimit: "",
        // 建筑密度（下）
        buildingDensity: "",
        // 建筑密度（上）
        buildingDensity2: "",
        // 建筑密度前置符号
        buildingDensitySymbol1: "",
        // 建筑密度后置符号
        buildingDensitySymbol2: "",
        // 交易物渠道(默认交易)
        channel: "deal",
        // 附件
        fileList: [],
        fileListVideo: [],
        remark:'',
        // 权属人性质
        ownerShipNature: "",
        ownerShipNatureName: "",
        // 权属人名称
        ownerShip: "",
        // 证件类型
        identificationType: "",
        identificationTypeName: "",
        // 证件号
        identificationNum: "",
        // 地址
        address: "",
        // 权属人联系电话
        phone: "",
        // 联系人/代理人姓名
        contact: "",
        // 联系人/代理人身份证号
        idCard: "",
        // 联系人/代理人联系电话
        contactPhone: "",
        // 联系人/代理人联系地址
        contactAddress: "",
        // 委托信息标题
        trustTitle: "",
        // 委托机构
        trustOrgId: "",
        trustOrgIdName: "",
        // 状态(默认草稿)
        delegationStatus: "draft3",
        fileListName: "",
        //上传土地图片区域
        pId: null,
        fileId:'',
        photoFirstUpload: true,
        additional: [],
        entrustFirstUpload: true,
        entrustAdditional: [],
        img: "",
        fileTemplateId:''
      },
      //土地附件上传标识集合
      massifForm: {
        entrustFirstUpload:true,
        pId:null,
      },
      transForm: {
        entrustFirstUpload:true,
        pId:null,
      },
      publishLandtype:"剩余使用",
      disabledYear:true,
      //土地附件清单标识
      fileTemplateId: "",
      // 委托基本信息
      transTrustInfo: {
        //委托附件清单标识
        trustFileCode: "",
        id:'',
        // 权属人性质
        ownerShipNature: "",
        ownerShipNatureName: "",
        // 权属人名称
        ownerShip: "",
        // 证件类型
        identificationType: "",
        identificationTypeName: "",
        // 证件号
        identificationNum: "",
        // 地址
        address: "",
        // 权属人联系电话
        phone: "",
        // 联系人/代理人姓名
        contact: "",
        // 联系人/代理人身份证号
        idCard: "",
        // 联系人/代理人联系电话
        contactPhone: "",
        // 联系人/代理人联系地址
        contactAddress: "",
        // 委托信息标题
        trustTitle: "",
        // 委托机构
        trustOrgId: "",
        trustOrgIdName: "",
        // 状态(默认草稿)
        delegationStatus: "draft3",
        fileListName: ""
      },
      //委托附件清单标识
      trustFileCode: "",
      fileIndex:0,
      entrustFileIndex:0,

      rules: {
        trustOrgId: [{ required: true, message: "请选择委托机构" }],
        circulation: [{ required: true, message: "请选择流转方式" }],
        trustTitle: [
          { required: true, message: "请输入标题" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,15,60,'15到60个字符之间')}  },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
            message: "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        landChar: [
          { required: true, message: "请选择土地性质", trigger: "change" }
        ],
        cantonProvince: [
          { required: true, message: "请选择土地所在省", trigger: "change" }
        ],
        cantonCity: [
          { required: true, message: "请选择土地所在市", trigger: "change" }
        ],
        cantonArea: [
          { required: true, message: "请选择土地所在区", trigger: "change" }
        ],
        useType: [
          { required: true, message: "请选择使用权类型", trigger: "change" }
        ],
        landType: [
          { required: true, message: "请选择土地类型", trigger: "change" }
        ],
        firstClassUse: [
          { required: true, message: "请选择一级土地用途", trigger: "change" }
        ],
        secondClassUse: [
          { required: true, message: "请选择二级土地用途", trigger: "change" }
        ],
        area: [
          { required: true, message: "请输入面积" },
          { pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/, message: "面积必须是大于等于1的数" }
        ],
        endDate: [
          { required: true, message: "请输入使用权截止日期", trigger: "change" }
        ],
        years: [
          { required: true, message: "请输入使用年限" },
          // {min: 1,max: 15,message: "长度在 1 到 15个字符"},
          {
            pattern: /^[1-9]\d*(\.\d{1})?$/,
            message: "年限最小为1,且最多一位小数"
          },
          {
            validator: numberDator // 自定义验证数值大小 大于等于0,小于等于100;
          }
        ],
        location: [
          { required: true, message: "请输入土地详细地址" },
            { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
              message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
            }
        ],
        east: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        west: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        south: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        north: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        price: [
          { max: 15, message: "长度在 1 到 15个字符" },
          {
            pattern: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
            message: "拟转让价格有误,必须是大于0的数."
          }
        ],
        warrantNumType: [
          { required: true, message: "请选择权证号类型", trigger: "change" }
        ],
        warrantNum: [
          { required: true, message: "请输入权证号", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        registration: [
          {required: true, message: '请选择登记机构', trigger: 'change'},
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
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
        buildArea: [
          // { min: 1, max: 15, message: "长度在 1 到 15个字符" },
          {
           pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/,
            message: "建筑面积输入数字超出最长限度"
          }
        ],
        heightLimit: [
          // {min: 1,max: 6,message: "长度在 1 到 6个字符"},
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入正确的建筑限高."
          }
        ],
        greenSpaceRate: [
            {
              pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
              message: "0-100的值,最多两位小数"
            },
            {
                validator: greenSpaceRateVa
            }
        ],
        greenSpaceRate2: [
            {
              pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
              message: "0-100的值,最多两位小数"
            },
            {
                validator: greenSpaceRateVa
            }
        ],
        buildingDensity: [
          {
            pattern:  /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
              validator: buildingDensityVa
          }
        ],
        buildingDensity2: [
          {
            pattern:  /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
            message: "0-100的值,最多两位小数"
          },
          {
              validator: buildingDensityVa
          }
        ],
        plotRatio: [
          {
              pattern: /^(\d|[1-9]|10.00)(\.\d{1,2})?$/,
              message: "0-10的值,最多两位小数"
            }
        ],
        plotRatio2: [
          {
              pattern: /^(\d|[1-9]|10.00)(\.\d{1,2})?$/,
              message: "0-10的值,最多两位小数"
            }
        ],
        ownerShipNature: [
          { required: true, message: "请选择权属人性质", trigger: "change" }
        ],
        ownerShip: [
          { required: true, message: "请输入姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        identificationNum: [
            { required: true, message: "请输入证件号", trigger: "blur" },
            { validator: identificationNumFunction }
        ],
        identificationType: [
          { required: true, message: "请选择证件种类", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入联系地址" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            pattern: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
            message: "固话格式为：010-12345678"
          }
        ],
        contact: [
          { required: true, message: "联系人/代理人姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        idCard: [
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
            message: "您输入的证件号有误"
          }
        ],
          /**
           * 规则说明：

           1、可以是1开头的11位数字（手机号）
           2、可以是“区号-电话号-分机号”或者是“(区号)电话号-分机号”格式
           3、区号是0开头的3～4位数字，可以没有区号

           4、电话号是5～8位数字，不能以0开头
           5、分机号是1～8位数字，可以没有分机号



           合法数据示例：

           13812341234

           010-12345678

           (0432)1234567-1234
           */
        contactPhone: [
          { required: true, message: "请输入联系人/代理人联系电话", trigger: "blur"  },
          {
              pattern:/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
              message: "固话格式为：010-12345678"
          }
        ],
        contactAddress: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
      },
      checkList: ["选中且禁用", "复选框 A"],

      //步骤
      active: 0,

      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },

      txtVal: 0,
      //时间设置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      orgs: [],
      baseUrl:imgBaseUrl.imgUrl,

      videoForm:{
        pId:null,
        img:'',
        photoFirstUpload:false,
        videoUrlId:[],
      },
      landAnnexParame:{ //土地附件参数集

      },
      entrustAnnexParame:{ //委托附件参数集

      },
      TemplateCodes:'',//模板ID
      TidParameters:'',//tid
      longitude:'', //经度
      latitude:'', //纬度
      isAuxFlag: false, // ----
      isAuxFlag2: false, // ----
        isLoading:false,
    };
  },
  created() {
    this.createId();


    this.areaCode = this.transGoods.cantonProvince;

    if (this.areaCode == "") {
      this.areaCode = "public_001";
    }
    this.getProvinceData()
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
         if ( item == "land_use") {
              this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:item,parentId:0}).then(res => {
                resolve(res);
              });
            }else {
          this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GET_GROUP + item,{}).then(res => {
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
      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
    });
    this.loading = false;
    this.ownerShipNatureSelect();
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    selectDatarange() {
      //使用权截止
      let nowDate = new Date(this.transGoods.endDate)
      let today_y  = nowDate.getFullYear()
      let today_m  = this.p((nowDate.getMonth() + 1))
      let today_d =  this.p(nowDate.getDate())
      //获取今日日期
      let dateBegin = new Date()
      let dateBegin_y = dateBegin.getFullYear()
      let dateBegin_m = this.p((dateBegin.getMonth() + 1))
      let dateBegin_d = this.p(dateBegin.getDate())
      let years = 0;
      let months = today_m - dateBegin_m + (today_y - dateBegin_y) * 12;
      if (today_m * 100 + today_d < dateBegin_m * 100 + dateBegin_d) {
          months--;//
        }
        years = Math.floor(months / 12);
        months = months % 12;
        let middleDate = new Date(dateBegin);
        middleDate.setFullYear(dateBegin_y + years);
        middleDate.setMonth(dateBegin.getMonth() + months);
        let days =  Math.floor( ( nowDate.getTime()- middleDate.getTime()) / 24 / 60/ 60 / 1000);
        console.log('已经过去了'+years+'年'+months+'月'+days+'天');
 
      if (this.transGoods.circulation == "transfer" ||  this.transGoods.circulationName == "转让") {
        this.transGoods.years = years;
      }
    },
    // 获取附件清单数据检验结果
    isAuxFun(value){
      this.isAuxFlag = value;
    },
    isAuxFun2(value){
      this.isAuxFlag2 = value;
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getCode: async function(code) {
      const data = await this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GROUP_CODE,{code:code});
      console.log(data);
    },
    createId() {
      this.$get(this.$API.EPF_SUPPLYDEMAND.COMM.CREATE_ID, {}).then(res => {
        this.transGoods.id = res.id;
        this.transGoods.enclosureId = res.id;
        this.transTrustInfo.id = res.id;
        this.belong = res.id;
      });
    },
    useTypeSelect() {
        if (this.transGoods.useType === "other2") {
          if (this.transGoods.decisionNum == "") {
            return;
          } else {
            this.transGoods.decisionNum = "";
          }
        }
      },
    circulationSelect(dic, entrustAgency, event) {
      if(this.$refs[entrustAgency][0].$attrs.dictKey === "transfer"){
        this.publishLandtype="剩余使用";
        this.transGoods.circulation = "transfer";
        this.transGoods.circulationName = "转让";
        this.disabledYear = true
      } else if(this.$refs[entrustAgency][0].$attrs.dictKey === "rent"){
        this.publishLandtype="出租";
        this.transGoods.circulation = "rent";
        this.transGoods.circulationName = "出租";
        this.disabledYear = false
      }
    },
    entrustAgencySelect(orgs, entrustAgency, event) {
      console.log(this.$refs[entrustAgency]);
      this.transGoods.trustOrgId = this.$refs[entrustAgency][0].$attrs.id;
    },
    firstClassUseSelect(dic, firstClassUse, event) {
      this.transGoods.secondClassUse = "";
      this.transGoods.secondClassUseName = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.transGoods.firstClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
      this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:land_use,parentId:pId},{}).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.land_use_second = res.dictionariesList;
          return;
        }
        this.dictionary.land_use_second = "";
      });
    },
    secondClassUseSelect(dic, firstClassUse, event) {
      this.transGoods.secondClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
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
    provinceSelect(dic, cantonCode, event) {
      this.transGoods.cantonAreaName = "";
      this.transGoods.cantonArea = "";
      // this.cantonArea = "";
      this.transGoods.cantonCityName = "";
      this.transGoods.cantonCity = "";
      // this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.transGoods.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;
      this.dictionary.cantonArea = [];
      this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,{parentId:pId},{}).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          return;
        }
        this.dictionary.cantonCity = "";
      });
      this.orgselect();
    },
    citySelect(dic, cantonCity, event) {
      this.transGoods.cantonArea = "";
      this.transGoods.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.transGoods.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,{parentId:pId},{}).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList;
          return;
        }
        this.dictionary.cantonArea = "";
      });
      this.orgselect();
    },
    areaSelect(dic, cantonCity, event) {
      this.transGoods.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
      this.orgselect();
    },

    // 证件类型选择
    idCardSelect(dic, identificationType, event) {
      this.transGoods.identificationType = this.$refs[identificationType][0].$attrs.dictKey;
    },
    // 权属人性质选择
    ownerShipSelect(dic, ownerShipNature, event) {
      this.transGoods.ownerShipNature = this.$refs[ownerShipNature][0].$attrs.dictKey;
    },

    orgselect() {
      var cantonProvince = this.transGoods.cantonProvince;
      var cantonCity = this.transGoods.cantonCity;
      var cantonArea = this.transGoods.cantonArea;
      this.transGoods.trustOrgName = "";
      this.$get(this.$API.EPF_ADMIN.ORG.ORG_AREAS,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        }).then(
        res => {
          if (res.code == 0) {
            sessionStorage.setItem("orgsDataList", JSON.stringify(res.orgs));
            if (this.transGoods.cantonAreaName !== "") {
              this.getSessionOrgs();
            } else {
              this.orgs = res.orgs;
              return;
            }
          }
        }
      );
    },
    getSessionOrgs() {
      this.orgs = JSON.parse(sessionStorage.getItem("orgsDataList"));
    },

    //保存标的新增
    submitLand: function(type) {
        //警用按钮
        this.isLoading = true;

      if(!this.isAuxFlag || !this.isAuxFlag2){
        this.$message.error('请检查您的附件清单信息是否上传完整！');
        return;
      }
      let that = this;
      // this.transTrustInfo["trustFileCode"] = this.trustFileCode;

      // this.transGoods["fileTemplateId"] = this.fileTemplateId;
      for (let item in this.transTrustInfo) {
        if (item != "id") {
          this.transTrustInfo[item] = this.transGoods[item];
        }
      }
      console.log(this.transTrustInfo);

      let params = {
        transGoods: this.transGoods,
        transTrustInfo: this.transTrustInfo
      };
      this.$useAppend("/epf-trade/admin/transgoods/addTransGoods", {
        transTargetJson: params
      }).then(res => {
        if (res.code == "0") {
          if(type == 'save'){
            that.$message.success("添加成功");
              //启用按钮
              this.isLoading = false;
            /**
             * 提交成功回到列表页中我的委托页面
             */
            that.bindTo();
          }else{
            debugger;
            //提交
            that.submitHadle(res.map.ttid,'accepting',res.map.ttid);
          }
        } else {
          that.$message.error(res.msg); //失败
            //启用按钮
            this.isLoading = false;
        }
      });
    },
    // 提交受理
    submitHadle (id , status, transInfoId) {
      let that = this;
      var procDefKey = 'transaction_filing' //启动流程类型
      //获取启动节点信息
      let orgId=sessionStorage.getItem('orgId');
      let businessType="entrust";
      this.$post(this.$API.EPF_ACTIVITI.NODE_ID, {
        nodeId: 'start',
        procDefKey: procDefKey,
        orgId:orgId,
        businessType:businessType
      }).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)
        }
        var jsonVars =
          '{NAME_' +
          res.nodes[0].nodeId +
          ':\'' +
          res.nodes[0].excutionUser +
          '\',procDefKey:\'' +
          procDefKey +
          '\',goodsNo:\'' +
          transInfoId +
          '\',businessType:\'' +
          businessType +
          '\'}' 
        this.$post(this.$API.EPF_TRADE.ENTRUST.EDIT_STATE, {
          id: id,
          delegationStatus: status,
          jsonVars: jsonVars
        }).then(res => {
          if (res.code != '0') {
            //失败
            this.$message.error("提交失败:稍后可在我的委托列表中操作该数据")
            that.bindTo();
            return;
          }
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          that.bindTo();
        })
      })
    },
    //提交成功回到列表页中我的委托页面
    bindTo(){
        //启用按钮
        this.isLoading = false;
      /**
       * 提交成功回到列表页中我的委托页面
       */
        let routes = '/system/trade/entrust/views/trade/add'
        this.$bus.$emit('close_tab',routes)
        let routerPath = "/system/trade/entrust/views/trade/index";
        this.$router.push({path:routerPath});
    },

    handleVideoSuccess(res, file) {
      console.log(res, file);
    },

    uploadVideoProcess(event, file, fileList) { //进度条
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    enclosureTestUpload(file){ //土地&委托附件上传验证
      const isJpg = file.name.split(".").slice(-1)[0] === "jpg";
      const isJPG = file.name.split(".").slice(-1)[0] === "JPG";
      const isRar = file.name.split(".").slice(-1)[0] === "rar";
      const isRAR = file.name.split(".").slice(-1)[0] === "RAR";
      const isZIP = file.type === "application/x-zip-compressed";
      const isPDF = file.type === "application/pdf";
      const isDOC = file.name.split(".").slice(-1)[0] === "doc";
      const isDOCD = file.name.split(".").slice(-1)[0] === "DOC";
      const isDOCX = file.name.split(".").slice(-1)[0] === "docx";
      const isDOCXD = file.name.split(".").slice(-1)[0] === "DOCX";
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (file.size === 0) {
        this.$message.error("上传附件大小不能为0");
        this.disabled = false;
        return false;
      }
      if (
        !isJpg &&
        !isJPG &&
        !isRar &&
        !isRAR &&
        !isZIP &&
        !isPDF &&
        !isDOCX &&
        !isDOC &&
        !isDOCD &&
        !isDOCXD
      ) {
        this.$message.error("上传附件只能是 rar zip doc docx pdf jpg 格式!");
        this.disabled = false;
        return false;
      }
      if (!isLt20M) {
        this.$message.error("上传土地照片大小不能超过 20MB!");
        this.disabled = false;
        return false;
      }
    },
    beforeAvatarUploadImg(file) { //上传图片格式验证
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error("上传土地照片只能是 PNG/jpeg/gif 格式!");
        return false;
      }
      if (!isLt6M) {
        this.$message.error("上传土地照片大小不能超过 6MB!");
        return false;
      }
    },
    beforeAvatarUploadVideo(file) { //上传视频格式验证
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过300MB哦!");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    first_photoUploadFile(files) { //土地图片上传
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);

      if (this.transGoods.pId) {
        console.log("第二张图片上传");
        formData.append("pId", this.transGoods.pId);
        this.photoUpload(formData, files, file);
        return;
      }
      if (!this.transGoods.pId && this.transGoods.photoFirstUpload) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.transGoods.photoFirstUpload = false;
        this.photoUpload(formData, files, file, "first");
        return;
      }
      if (this.transGoods.pId && !this.transGoods.photoFirstUpload) {
        //之后的图片上传携带id
        console.log("之后的图片上传携带id");
        this.photoUpload(formData, files, file);
        return;
      }
    },
    photoUpload(formData, files, file, count) { //土地图片上传方法
      const that = this;
      this.$useAppend("/epf-document/document/upload", formData,
        function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        }).then(res => {
        console.log("这是土地照片上传的返回", res);
        if (res.state != "SUCCESS") {
          if (count == "first") {
            // 第一张上传出错
            that.transGoods.photoFirstUpload = true;
            return null;
          }
          return null;
        }
        if (!that.transGoods.pId) {
          that.transGoods.pId = res.data[0].pId;
          that.transGoods.img = res.data[0].id;
        }
        if (that.transGoods.pId && !that.transGoods.photoFirstUpload) {
          that.$refs.photoUploader.submit();
        }
        that.imgUrlId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    videoUploadFile(files) { //土地视频上传
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);

      if (this.transGoods.pId) {
        formData.append("pId", this.transGoods.pId);
        this.videoUpload(formData, files, file, "first");
        return;
      }
    },
    videoUpload(formData, files, file, count) { //土地视频上传方法
      debugger
      const than = this;
      this.$useAppend("/epf-document/document/upload", formData,
      function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        }).then(res => {
        console.log('土地视频上传的返回',res);
        if (res.state != "SUCCESS") {
          if (count == "first") {
            this.$message.error('视频上传失败')
            this.videoForm.photoFirstUpload = true;
            return null;
          }
          return null;
        };

        if (!this.transGoods.pId) {
          this.transGoods.fileId = res.data[0].id;
          this.transGoods.pId = res.data[0].id;
          this.transGoods.img = res.data[0].id;
        }
        this.videoForm.videoUrlId.push(res.data[0].id);
        files.onSuccess(res);
      })
    },
    ParameSwitching(index,tid,state){ //参数切换
     this.fileIndex = index;
      if(state==0){
        this.TemplateCodes = this.fileTemplateId //土地code
        this.TidParameters = tid
      }else if(state==1){
        this.TemplateCodes = this.trustFileCode //委托code
        this.TidParameters = tid
      }
      console.log('选中的附件code是：',this.TemplateCodes,'选中的附件tid是',this.TidParameters);
    },
    massif_File_Upload(files){ //地块附件上传
      const file = files.file
      const formData = new FormData()
      formData.append("files", file)
      formData.append("belong", this.belong) //委托对象ID
      if (this.massifForm.pId) {
        formData.append("pId", this.TidParameters) //tid赋值
        this.massif_Upload_Fun(formData,files,file)
        return
      }
      if (!this.massifForm.pId && this.massifForm.entrustFirstUpload) {
        console.log("第一张图片上传")
        formData.append("pId", this.TidParameters) //tid赋值
        this.massifForm.entrustFirstUpload = false
        this.massif_Upload_Fun(formData,files,file,"first")
        return
      }
      if (this.massifForm.pId && !this.massifForm.entrustFirstUpload) {
        console.log("之后的图片上传携带id")
        this.massif_Upload_Fun(formData, files, file)
        return
      }
    },
    massif_Upload_Fun(formData, files, file, count){ //地块附件上传方法
      this.$useAppend("/epf-document/document/upload",formData).then(res => {
        console.log('地块附件上传返回：',res)
        if (res.state != "SUCCESS") {
          if (count == "first") {
            this.massifForm.entrustFirstUpload = true
            this.$message.error('上传出错')
            return null
          }
          return null
        }
        if (!this.massifForm.pId) {
          this.massifForm.pId = res.data[0].pId
          this.transGoods.fileTemplateId = this.fileTemplateId
          this.transGoods.pId = res.data[0].pId
        }
        if (this.massifForm.pId && !this.massifForm.entrustFirstUpload) {
        }
       // this.entrustAdditionalId.push(res.data[0].id)
        files.onSuccess(res)
      })
    },
    entrust_File_Upload(files) { //上委托附件上传
      const file = files.file
      const formData = new FormData()
      formData.append("files", file)
      formData.append("belong", this.belong) //委托对象ID

      if (this.transForm.pId) {
        formData.append("pId", this.TidParameters) //tid赋值
        this.entrust_Upload_Fun(formData, files, file)
        return;
      }
      if (!this.transForm.pId && this.transForm.entrustFirstUpload) {
        console.log("第一张图片上传")
        formData.append("pId", this.TidParameters) //tid赋值
        this.transForm.entrustFirstUpload = false
        this.entrust_Upload_Fun(formData, files, file, "first")
        return
      }
      if (this.transForm.pId && !this.transForm.entrustFirstUpload) {
        console.log("之后的图片上传携带id")
        this.entrust_Upload_Fun(formData, files, file)
        return
      }
    },
    entrust_Upload_Fun(formData, files, file, count) { //委托附件上传方法
      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log('委托附件上传返回：',res)
        if (res.state != "SUCCESS") {
          if (count == "first") {
            this.transForm.entrustFirstUpload = true
            return null
          }
          return null
        }
        if (!this.transForm.pId) {
          this.transForm.pId = res.data[0].pId
          this.transGoods.fileTemplateId = this.fileTemplateId
          this.transGoods.pId = res.data[0].pId
        }
        if (this.transForm.pId && !this.transForm.entrustFirstUpload) {
        }
        //this.entrustAdditionalId.push(res.data[0].id)
        files.onSuccess(res)
      })
    },
    file_List_Remove(file, fileList) { //移除已上传文件方法
      console.log(file, fileList);
      for (let i = 0; i < this.imgUrlId; i++) {
        if (this.imgUrlId[i] == file.response.data.data[0].id) {
          this.imgUrlId.splice(i, 1);
        }
      }
    },
    upLoadError(err, file, fileList) { //上传失败回调
      this.$message.error('文件上传失败');
    },

    first_UploadSuccess(res, file, fileList) {
      console.log("进入成功函数");
      if (!this.transGoods.pId) {
        console.log("进入一");
        this.transGoods.pId = res.data[0].pId;
      }
      this.transGoods.fileList = fileList;
      for (let i = 0; i < this.transGoods.fileList.length; i++) {
        console.log("进入二",this.transGoods.fileList[i].url);
        this.transGoods.fileList[i].url = this.baseUrl + this.imgUrlId[i];
        console.log(this.transGoods.fileList[i].url);
      }
    },
    videoUploadSuccess(res, file, fileList) {
      debugger
      if (!this.transGoods.pId) {
        this.transGoods.pId = res.data.data[0].pId;
      }
      this.transGoods.fileListVideo = fileList;
      for (let i = 0; i < this.transGoods.fileListVideo.length; i++) {
        this.transGoods.fileListVideo[i].url =
          this.baseUrl + this.videoUrlId[i];
      }
      console.log("fileListVideo:",this.transGoods.fileListVideo);
    },


    next(val) { //下一步
    this.$refs[val].validate(valid => {
        this.Enclosure = true
        if (valid) {
          if (this.active++ > 2) this.active = 0;
        } else {
          document
            .querySelector("#entrustedTradeDetailsAddStep")
            .scrollIntoView(true);
        }
      });
    },
    prev() { //上一步
      this.Enclosure = false
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

    // 附件清单方法
    handleClick(row) {
      console.log(row);
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
    upload(formData, files, file, count) {
      //文件上传
      this.$useAppend("/epf-document/document/upload", formData, res => {
        if (res.state != "SUCCESS") {
          console.log(222);
          if (count == "first") {
            this.transGoods.photoFirstUpload = true;
            // this.$refs.additionalRef.submit();
            return null;
          }
          console.log("错误了");
          // this.$refs.additionalRef.submit();
          return null;
        }
        if (!this.transGoods.pId) {
          this.transGoods.pId = res.data[0].pId;
          // this.transGoods.additional = res.data.data[0].id;
        }
        if (this.transGoods.pId && !this.transGoods.photoFirstUpload) {
          // this.$refs.additionalRef.submit();
        }
        this.additionalId.push(res.data[0].id);
        files.onSuccess(res);
      });
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
      // this.transGoods[this.fileListName] = fileList;
      // for (let i = 0; i < this.transGoods[this.fileListName].length; i++) {
      //   this.transGoods[this.fileListName][i].url =
      //     this.baseUrl + this.additionalId[i];
      // }
      this.$forceUpdate();
    },
    entrustUploadSuccess(res, file, fileList) {
      console.log(this.transTableData, this.entrustFileIndex);
      console.log("触发成功", this.transTableData[this.entrustFileIndex]);
      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      };
      if (this.transTableData[this.fileIndex].files.length == 0) {
        this.transTableData[this.fileIndex].files.push(fileObject);
      } else {
        this.transTableData[this.fileIndex].files[0] = fileObject;
      }
      // this.transGoods[this.fileListName] = fileList;
      // for (let i = 0; i < this.transGoods[this.fileListName].length; i++) {
      //   this.transGoods[this.fileListName][i].url =
      //     this.baseUrl + this.entrustAdditionalId[i];
      // }
      this.$forceUpdate();
    },
    entrustHandleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    delFile(index, tid, id) {
      let that = this;
      let url = this.$API.DOCUMENT.FOLDER
      this.$post(url, {id:id,fdId:tid},{}, res => {
        if (res.state == "SUCCESS") {
          this.tableData[index].files = [];
          this.tableData[index].tsize = 0;
        }
      });
      this.tableData[index].files = [];
      this.tableData[index].tsize = 0;
      this.$forceUpdate();
    },
    entrustDelFile(index, eid, id) {
      let that = this;
      let url = this.$API.DOCUMENT.FOLDER
      this.$post(url, {id:id,fdId:eid},{}, res => {
        if (res.state == "SUCCESS") {
          this.transTableData[index].files = [];
          this.transTableData[index].tsize = 0;
        }
      });
      this.transTableData[index].files = [];
      this.transTableData[index].tsize = 0;
      this.$forceUpdate();
    },
    upLoadClick(index, fileListName) {
      this.tid = "";
      this.tid = this.tableData[index].tid;
      this.fileIndex = index;
      this.fileListName = fileListName;
    },
    entrustUpLoadClick(index, fileListName) {
      this.eid = "";
      this.eid = this.transTableData[index].tid;
      this.entrustFileIndex = index;
      this.fileListName = fileListName;
    },
    // 表单验证
    submitForm(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          if (this.active++ > 2) this.active = 0;
        } else {
          document
            .querySelector("#entrustedTradeDetailsAddStep")
            .scrollIntoView(true);
            this.$message.error("请检查您填写的信息是否完整")
            return
        }
      });
    },
    coordinateMap(val){ //地图调用父组件方法经纬度赋值
      console.log('地图标注的经纬度',val)
      this.longitude = val.lng;
      this.latitude = val.lat;
    },
    // 确定标注
    markerDown(){
      if(this.longitude && this.longitude!='' && this.latitude && this.latitude!=''){
        this.transGoods.coordinate = this.longitude + ',' + this.latitude
      }
      this.dialogVisibleMap = false
    },
    switchs(){
      this.entrustLoading = true
    },
    ownerShipNatureSelect(){

      if(this.transGoods.ownerShipNature != '' && this.transGoods.ownerShipNature != null){
        this.idFlag = true
        if(this.transGoods.ownerShipNature == 'personage1'){
          this.transGoods.identificationType = 'card_id'
        }else{
          this.transGoods.identificationType = 'business_license'
        }
      }else{
        this.idFlag = false
      }

    }
  },
  mounted(){

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
          &:nth-child(1) {
            margin-top: 32px;
          }
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
    .avatar-uploader {
      position: relative;
    }
  }
  .avatar-uploader {
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .operfirst {
    text-align: left;
    padding-left: 240px;
  }
  .operfirst button {
    background: rgb(255, 160, 0);
    border: 1px solid rgb(255, 160, 0);
  }
  span.oneRow {
    margin: 0 20px;
  }
</style>
<style scope>
  .button_bg {
    margin: 0 10px;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 60px;
    height: 34px;
    padding: 0 10px;
    background: #ffa202;
    border: 1px solid #ffa202;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    display: inline-block;
    cursor: pointer;
    -webkit-transition: .3s;
    transition: .3s;
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
  #publishLandMapDialog .el-dialog{
    border-radius: 10px;
    border:solid 4px #ccd3dc;
  }
  #publishLandMapDialog .el-vue-search-box-container{
    margin-bottom: 20px;
    box-shadow: none;
    width: 560px;
  }
  #publishLandMapDialog .search-box-wrapper input{
    height: 40px;
    width:500px;
    color:#979a9a;
    background-color:#f1f6f7;
  }
  #publishLandMapDialog .search-btn{
    cursor: pointer;
    border-radius: 3px;
    width: 120px;
    background-color: #ffa100;
    color:white;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    float: left;
  }
  #publishLandMapDialog .el-dialog .el-dialog__body {
    padding: 0px;
  }
  #publishLandMapDialog .el-dialog .el-dialog__header {
    padding: 0px;
  }
  #publishLandMapDialog .amap-page-container{
    padding: 20px;
  }
  .MapTitle{
    text-align: left;
    font-weight: 700;
    font-size: 20px;
    color: #333;
    padding: 8px 30px;
    border-bottom: solid 2px #f3f3f3;
  }
  .MapBtns{
    cursor: pointer;
    border-radius: 3px;
    width: 120px;
    background-color: #ffa100;
    color:white;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .MapBtns:active{
    transform: translateY(1px);
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
    margin-right: 50px;
  }
  .canton_Regions > .el-form-item__content {
    margin-left: 5px !important;
  }
  .seeImg > .el-dialog > .el-dialog__header {
    border-bottom: none !important;
  }
  .el-step__title.is-process,
  .el-step__title.is-success {
    color: #ffa000;
  }
  .el-step__head.is-process,
  .el-step__head.is-success {
    color: #ffa000;
    border-color: #ffa000;
  }
</style>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .AttachmentInfoList_warp {
    @include size(100%, 100%);
    background: #f2f1f9;
    .EntrustTra_Pro {
      @include size(100%, 127px);
      background: #ebeeec;
      box-sizing: border-box;
      padding-left: 80px;
      clear: both;
      &_title {
        font-size: 20px;
        line-height: 127px;
        color: #666666;
        float: left;
        margin-right: 168px;
      }
      &_cont {
        @include size(800px, 64px);
        float: left;
        padding-top: 60px;
        span {
          display: inline-block;
          text-align: center;
          line-height: 85px;
          color: #ffa000;
          &:nth-child(1) {
            width: 319px;
          }
          &:nth-child(2) {
            width: 133px;
          }
          &:nth-child(3) {
            width: 325px;
          }
        }
      }
    }
    .EntrustTra_main {
      @include size(1200px, auto);
      margin-bottom: 25px;
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
        @include size(1104px, auto);
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
  }
  .canton_Regions>.el-form-item__content{
      margin-left: 5px !important;
    }
  .EntrustTra_main_cont .el-upload-list {
    display: none !important;
  }
  .el-upload-list {
    display: none !important;
  }
  .videoList {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
  }
  .videoBox {
    float: left;
    margin-right: 8px;
  }
</style>
