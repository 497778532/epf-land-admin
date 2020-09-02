<template>
  <div id="entrustedTradeDetailsAddStep" class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="step">
            <el-steps :active="active" finish-status="success">
              <el-step title="土地基本信息&委托机构"></el-step>
              <el-step title="申请人信息"></el-step>
              <el-step title="附件信息"></el-step>
            </el-steps>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="250px"
            class="demo-ruleForm"
          >
            <div class="firststep" v-if="active===0" align-center>
              <EPF-switchTitle titles_h='土地基本信息'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="土地性质：" prop="landChar">
                        <el-radio-group v-model="ruleForm.landChar">
                          <el-radio
                            v-for="item in dictionary.land_nature"
                            :label="item.dictKey"
                            :key="item.zhCn"
                          >{{item.zhCn}}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;flex-direction: row;">
                        <el-form-item label="所属行政区：" prop="cantonProvince">
                          <el-select
                            v-model="ruleForm.cantonProvinceName"
                            placeholder="请选择土地所在省"
                            @change="province(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)"
                            style="width:90px"
                          >
                            <el-option
                              v-for="item in dictionary.administrative_regions"
                              :ref="item.regionName"
                              :id="item.id"
                              :dictKey="item.regionCode"
                              :label="item.regionName"
                              :value="item.regionName"
                              :key="item.regionCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="cantonCity" class="canton_Regions">
                          <el-select
                            v-model="ruleForm.cantonCityName"
                            placeholder="请选择土地所在市"
                            @change="city(dictionary.cantonCity,ruleForm.cantonCityName,$event)"
                            style="width:90px"
                          >
                            <el-option
                              v-for="item in dictionary.cantonCity"
                              :ref="item.regionName"
                              :id="item.id"
                              :dictKey="item.regionCode"
                              :label="item.regionName"
                              :value="item.regionName"
                              :key="item.regionCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="cantonArea" class="canton_Regions">
                          <el-select
                            v-model="ruleForm.cantonAreaName"
                            placeholder="请选择土地所在区/县"
                            @change="area(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)"
                            style="width:90px"
                          >
                            <el-option
                              v-for="item in dictionary.cantonArea"
                              :ref="item.regionName"
                              :id="item.id"
                              :dictKey="item.regionCode"
                              :label="item.regionName"
                              :value="item.regionName"
                              :key="item.regionCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </li>
                    <li>
                      <el-form-item label="使用权类型：" required>
                        <el-radio-group v-model="ruleForm.useType">
                          <el-radio
                            v-for="item in dictionary.use_type"
                            :label="item.dictKey"
                            :key="item.zhCn"
                          >{{item.zhCn}}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li style="width:80%">
                      <el-form-item label="土地类型：" prop="landType">
                        <el-radio-group v-model="ruleForm.landType">
                          <el-radio-group v-model="ruleForm.landType">
                            <el-radio
                              style="margin-top:3px;"
                              v-for="item in dictionary.land_type"
                              :label="item.dictKey"
                              :key="item.zhCn"
                            >{{item.zhCn}}
                            </el-radio>
                          </el-radio-group>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地流转方式：" prop="circulationName">
                        <el-select
                          v-model="ruleForm.circulationName"
                          placeholder="请选择土地流转方式"
                          @change="circulationSelect(dictionary.flow_mode,ruleForm.circulationName,$event)"
                        >
                          <el-option
                            v-for="item in dictionary.flow_mode"
                            :ref="item.zhCn"
                            :id="item.id"
                            :dictKey="item.dictKey"
                            :dictId="item.id"
                            :label="item.zhCn"
                            :value="item.zhCn"
                            :key="item.dictKey"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <div style="display: flex;flex-direction: row;">
                        <el-form-item label="土地用途：" prop="firstClassUse" style="width:426px;">
                          <el-select
                            v-model="ruleForm.firstClassUseName"
                            placeholder="请选择土地一级用途"
                            @change="firstClassUseSelect(dictionary,ruleForm.firstClassUseName,$event)"
                          >
                            <el-option
                              v-for="(item,index) in dictionary.land_use"
                              :ref="item.zhCn"
                              :dictKey="item.dictKey"
                              :id="item.id"
                              :label="item.zhCn"
                              :value="item.zhCn"
                              :key="index"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="secondClassUse" class="canton_Regions">
                          <el-select
                            v-model="ruleForm.secondClassUseName"
                            placeholder="请选择土地二级用途"
                            @change="secondClassUseSelect(dictionary,ruleForm.secondClassUseName,$event)"
                          >
                            <el-option
                              v-for="(item,index) in dictionary.land_use_second"
                              :ref="item.zhCn"
                              :label="item.zhCn"
                              :dictKey="item.dictKey"
                              :value="item.zhCn"
                              :key="index"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </li>
                    <li>
                      <el-form-item :label="ruleForm.circulationName+'面积：'" prop="area">
                        <el-input v-model="ruleForm.area" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="使用权截止日期：" prop="endDate">
                        <el-date-picker
                          v-model="ruleForm.endDate"
                          type="date"
                          placeholder="选择日期"
                          style="width:60%;"
                          @change="selectDatarange"
                        ></el-date-picker>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="publishLandtype+'年限：'" prop="years">
                        <el-input v-model="ruleForm.years" placeholder="100" style="width:60%;" :disabled="disabledYear"></el-input>
                        <span style="margin-left:5px;">年</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地坐落：" prop="location">
                        <el-input v-model="ruleForm.location" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="坐标：">
                        <el-input
                          :disabled="true"
                          v-model="ruleForm.coordinate"
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
                          :visible.sync="dialogVisibleMap"
                          @close="dialogVisibleMap = false"
                          title="地图找地"
                        >
                          <v-Map style="height:500px" :Dlongitude="longitude" :Dlatitude="latitude" v-if="dialogVisibleMap"></v-Map>
                        </el-dialog>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="东至：" prop="east">
                        <el-input v-model="ruleForm.east" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="南至：" prop="south">
                        <el-input v-model="ruleForm.south" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="西至：" prop="west">
                        <el-input v-model="transGoods.west" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="北至：" prop="north">
                        <el-input v-model="ruleForm.north" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item :label="'拟'+ruleForm.circulationName+'价格：'" prop="price">
                        <el-input v-model="ruleForm.price" placeholder="100" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">万元</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号类型：" prop="warrantNumType">
                        <el-radio-group v-model="ruleForm.warrantNumType">
                          <el-radio
                            v-for="item in dictionary.own_no_type"
                            :label="item.dictKey"
                            :key="item.zhCn"
                          >{{item.zhCn}}
                          </el-radio>
                        </el-radio-group>
                        <!-- <el-radio v-model="transGoods.warrantNumType" label="1">不动产证号</el-radio>
                        <el-radio v-model="transGoods.warrantNumType" label="2">土地证号</el-radio>-->
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号：" prop="warrantNum">
                        <el-input v-model="ruleForm.warrantNum" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="登记机构：" prop="registration">
                        <el-input
                          v-model="ruleForm.registration"
                          placeholder="请输入"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="不动产单元号：" prop="unitNum">
                        <el-input v-model="ruleForm.unitNum" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <!--<el-form-item label="划拨决定书号：" prop="decisionNum">
                        <el-input v-model="ruleForm.decisionNum" placeholder="请输入" style="width:60%;"></el-input>
                      </el-form-item>-->

                      <el-form-item
                        v-if="ruleForm.useType == 'transfer2' || ruleForm.useType == 'tosell' "
                        ref="decisionNum" :label="ruleForm.useType=='transfer2'?'划拨决定书号：':'建设用地使用权出让合同号：'"
                        prop="decisionNum">
                        <el-input
                          v-if="ruleForm.useType == 'transfer2'" v-model="ruleForm.decisionNum"
                          placeholder="请输入划拨决定书号" style="width:60%;">
                        </el-input>
                        <el-input v-if="ruleForm.useType == 'tosell'" v-model="ruleForm.decisionNum"
                                  placeholder="请输入建设用地使用权出让合同号" style="width:60%;">
                        </el-input>
                      </el-form-item>

                    </li>
                    <li>
                      <el-form-item label="是否有附属物：" prop="isAdjunct">
                        <el-radio v-model="ruleForm.isAdjunct" label="0">是</el-radio>
                        <el-radio v-model="ruleForm.isAdjunct" label="1">否</el-radio>
                      </el-form-item>
                    </li>
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑面积：" prop="buildArea">
                        <el-input v-model="ruleForm.buildArea" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">平方米</span>
                      </el-form-item>
                    </li>
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑结构：" prop="buildType">
                        <el-select
                          v-model="ruleForm.buildingStructureName"
                          placeholder="请选择"
                          @change="buildingTypeSelect(dictionary.building_structure,ruleForm.buildingStructureName,$event)"
                        >
                          <el-option
                            v-for="item in dictionary.building_structure"
                            :ref="item.zhCn"
                            :id="item.id"
                            :dictKey="item.dictKey"
                            :dictId="item.id"
                            :label="item.zhCn"
                            :value="item.zhCn"
                            :key="item.dictKey"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑限高：" prop="heightLimit">
                        <el-input v-model="ruleForm.heightLimit" placeholder="请输入" style="width:60%;"></el-input>
                        <span style="margin-left:5px;">米</span>
                      </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="绿地率%：" style="width:395px;" prop="greenSpaceRate">
                        <el-input v-model="ruleForm.greenSpaceRate" placeholder="绿地率下限" style="width:140px;"></el-input>
                      </el-form-item>
                      <el-form-item class="canton_Regions">
                        <el-select v-model="ruleForm.greenSpaceRateSymbol1" placeholder="请选择符号" style="width:157px;"
                                   @change="change($event,ruleForm.greenSpaceRateSymbol1,'greenSpaceRateSymbol1')">
                          <el-option v-for="(item,index) in greenSpaceRateSymbolSelect1" :key="index"
                                     :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span
                        style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">绿地率</span>
                      <el-form-item class="canton_Regions">
                        <el-select v-model="ruleForm.greenSpaceRateSymbol2" placeholder="请选择符号" style="width:157px;"
                                   @change="change($event,ruleForm.greenSpaceRateSymbol2,'greenSpaceRateSymbol2')">
                          <el-option v-for="(item,index) in greenSpaceRateSymbolSelect2" :key="index"
                                     :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="canton_Regions" prop="greenSpaceRate2">
                        <el-input v-model="ruleForm.greenSpaceRate2" placeholder="绿地率上限"
                                  style="width:140px;"></el-input>
                      </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="建筑密度%：" style="width:395px;" prop="buildingDensity">
                        <el-input v-model.number="ruleForm.buildingDensity" placeholder="建筑密度下限"
                                  style="width:140px;"></el-input>
                      </el-form-item>
                      <el-form-item class="canton_Regions">
                        <el-select v-model="ruleForm.buildingDensitySymbol1" placeholder="请选择符号" style="width:157px;"
                                   @change="change($event,ruleForm.buildingDensitySymbol1,'buildingDensitySymbol1')">
                          <el-option v-for="(item,index) in buildingDensitySymbolSelect1" :key="index"
                                     :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span style="margin:0 17px;color:#606266;line-height:38px;">建筑密度</span>
                      <el-form-item class="canton_Regions">
                        <el-select v-model="ruleForm.buildingDensitySymbol2" placeholder="请选择符号" style="width:157px;"
                                   @change="change($event,ruleForm.buildingDensitySymbol2,'buildingDensitySymbol2')">
                          <el-option v-for="(item,index) in buildingDensitySymbolSelect2" :key="index"
                                     :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="canton_Regions" prop="buildingDensity2">
                        <el-input v-model.number="ruleForm.buildingDensity2" placeholder="建筑密度上限"
                                  style="width:140px;"></el-input>
                      </el-form-item>
                    </li>
                    <li style="width:100%; display: flex;flex-direction: row;" v-show="ruleForm.isAdjunct=='0'">
                      <el-form-item label="容积率：" style="width:395px;" prop="plotRatio">
                        <el-input v-model="ruleForm.plotRatio"  placeholder="容积率下限" style="width:140px;"></el-input>
                      </el-form-item>
                      <el-form-item  class="canton_Regions">
                        <el-select v-model="ruleForm.plotRatioSymbol1" placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol1,'plotRatioSymbol1')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span style="margin:0 17px;color:#606266;line-height:38px;display:inline-block;width:56px;">容积率</span>
                      <el-form-item  class="canton_Regions">
                        <el-select v-model="ruleForm.plotRatioSymbol2" placeholder="请选择符号" style="width:157px;" @change="change($event,ruleForm.plotRatioSymbol2,'plotRatioSymbol2')">
                          <el-option v-for="(item,index) in plotRatioSymbolSelect2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item  class="canton_Regions" prop="plotRatio2">
                        <el-input v-model="ruleForm.plotRatio2"  placeholder="容积率上限" style="width:140px;"></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <el-form-item label="土地照片：" prop="landImg">
                        <!-- <ul class="imgaeBox">
                          <li v-for="(item,index) in ruleForm.fileList" :key="index" class="imageLi">
                            <img :src="item.url" alt>
                          </li>
                        </ul>-->
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
                          :file-list="ruleForm.fileList"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt>
                        </el-dialog>
                        <p style="font-size:14px;color:#999999;">
                          <img src alt style="margin-top:10px;">
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
                            <div v-for="(item,index) in ruleForm.fileListVideo" :key="index" class="videoBox">
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
                            :file-list="ruleForm.fileListVideo"
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
                          v-model="ruleForm.remark"
                          placeholder="可针对土地的其他信息进行补充说明"
                          style="width:600px;height:155px;"
                        ></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>

              <EPF-switchTitle titles_h='委托机构'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="标题：" prop="trustTitle">
                        <el-input v-model="ruleForm.trustTitle" placeholder="请输入"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="选择委托机构：" prop="trustOrgId">
                        <el-select v-model="ruleForm.trustOrgId" placeholder="请选择委托机构">
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
                <span class="button_bg" @click="submitForm('ruleForm')">下一步</span>
              </div>
            </div>

            <div class="Secondstep" v-if="active===1" align-center>

              <EPF-switchTitle titles_h='申请人信息'>
                <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="权属人性质：" prop="ownerShipNature">
                        <el-select v-model="ruleForm.ownerShipNature" placeholder="请选择"  @change="ownerShipNatureSelect()">
                          <el-option v-for="item in dictionary.tans_owner_type" :label="item.zhCn" :value="item.dictKey"
                                     :key="item.zhCn"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="名称：" prop="ownerShip">
                        <el-input v-model="ruleForm.ownerShip" placeholder="请输入名称" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件种类：" prop="identificationType">
                        <el-select v-model="ruleForm.identificationType" placeholder="请选择" :disabled="idFlag">
                          <el-option v-for="item in dictionary.certifiate_type" :label="item.zhCn" :value="item.dictKey"
                                     :key="item.zhCn"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="证件号：" prop="identificationNum">
                        <el-input
                          v-model="ruleForm.identificationNum"
                          placeholder="请输入证件号码"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地址：" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请输入地址" style="width:60%;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权属人联系电话：" prop="phone">
                        <el-input
                          v-model="ruleForm.phone"
                          placeholder="请输入权属人联系电话"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人：" prop="contact">
                        <el-input
                          v-model="ruleForm.contact"
                          placeholder="请输入联系人/代理人名称"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人身份证号：" prop="idCard">
                        <el-input
                          v-model="ruleForm.idCard"
                          placeholder="请输入联系人/代理人身份证号号码"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系电话：" prop="contactPhone">
                        <el-input
                          v-model="ruleForm.contactPhone"
                          placeholder="请输入联系人/代理人联系电话"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="联系人/代理人联系地址：" prop="contactAddress">
                        <el-input
                          v-model="ruleForm.contactAddress"
                          placeholder="请输入联系人/代理人联系地址"
                          style="width:60%;"
                        ></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </div>
              </EPF-switchTitle>

              <div class="operfirst" style="margin-left:0;margin-top:20px;">
                <span class="button_bg" @click="prev">上一步</span>
                <span class="button_bg" @click="next">下一步</span>
              </div>
            </div>

            <div
              class="thirdstep AttachmentInfoList_warp"
              style="background:#fff;"
              v-if="active===2"
              align-center
            >
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
                  <div class="EntrustTra_main_cont">
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
                    <div
                      class="button_bg"
                      style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;"
                      @click="prev"
                    >上一步
                    </div>
                    <div class="search_input fl" @click="submitLand()">提交</div>
                    <div class="search_input submit_input fl" @click="submitLand('save')">保存</div>
                    <div style="clear: both;"></div>
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
  import imgBaseUrl from '../../index.js'
  export default {
    name: 'trade',

    components: {},

    data () {
      let identificationNumFunction = (rule, value, callback) => {
      console.log(this.ruleForm.identificationType);
      if (this.ruleForm.identificationType == "card_id") {
        // 15位数验证
        let reg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
          // 18位数验证
          reg2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!(reg.test(value)||reg2.test(value))) {
          callback(new Error("身份证号码不正确！"));
        } else {
          callback();
        }
      } else if (this.ruleForm.identificationType == "business_license") {
        // 15位数或者18位数
        let reg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
        if (!reg.test(value)) {
          callback(new Error("营业执照号不正确！"));
        } else {
          callback();
        }
      }
    };
      const numberDator = (rule, value, callback) => {
        if (value < 0 || value > 100) {
          callback(new Error('数值在 0 至 100 之间'))
        } else {
          callback()
        }
      }
      //绿地率校验
      const greenSpaceRateVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.ruleForm.greenSpaceRate == '' || this.ruleForm.greenSpaceRate == null || this.ruleForm.greenSpaceRate2 == '' || this.ruleForm.greenSpaceRate2 == null) {
              callback();
          }else{
              if(this.ruleForm.greenSpaceRate > this.ruleForm.greenSpaceRate2){
                callback(new Error("最大值不能小于最小值!"));
              }else{
                callback();
              }

          }
      };
      //建筑密度校验
      const buildingDensityVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.ruleForm.buildingDensity == '' || this.ruleForm.buildingDensity == null || this.ruleForm.buildingDensity2 == '' || this.ruleForm.buildingDensity2 == null) {
              callback();
          }else{
              if(this.ruleForm.buildingDensity > this.ruleForm.buildingDensity2){
                callback(new Error("最大值不能小于最小值!"));
              }else{
                callback();
              }

          }
      };
      //容积率校验
      const plotRatioVa = (rule, value, callback) => {
          // console.log("=-=-0-0=-090kkjknj", this.ruleForm.years);
          if (this.ruleForm.plotRatio == '' || this.ruleForm.plotRatio == null || this.ruleForm.plotRatio2 == '' || this.ruleForm.plotRatio2 == null) {
              callback();
          }else{
              if(this.ruleForm.plotRatio > this.ruleForm.plotRatio2){
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
        Enclosure:false,

        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [
            {
              text: '今天',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: '昨天',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: '一周前',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        },
        greenSpaceRateSymbolSelect1: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        greenSpaceRateSymbolSelect2: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        buildingDensitySymbolSelect1: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        buildingDensitySymbolSelect2: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        plotRatioSymbolSelect1: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        imgUrlId: [],
        filterData: {
          flowMode: '',
          issueEndDate: ''
        },
        transGoodsId: '',
        transTrustInfoId: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisibleMap: false, //地图找地对话框

        dicRequest: [
          'flow_mode',
          'land_nature',
          'use_type',
          'land_type',
          'land_use',
          'own_no_type',
          'register_organization',
          'building_structure',
          'tans_owner_type',
          'certifiate_type'
        ], //字典码请求
        dictionary: {
          //字典码结果
          flow_mode: '',
          land_nature: '',
          use_type: '',
          land_type: '',
          land_use: '',
          own_no_type: '',
          register_organization: '',
          building_structure: '',
          tans_owner_type: '',
          certifiate_type: '',
          administrative_regions: '',
          land_use_second: '',
          cantonCity: '',
          cantonArea: ''
        },
        dicNum: 0, //字典循环下标
        tradingCenterOptions: [
          {
            value: '选项1',
            label: '济南市国土资源局'
          },
          {
            value: '选项2',
            label: '商河县国土资源局'
          },
          {
            value: '选项3',
            label: '济阳县国土资源局'
          },
          {
            value: '选项4',
            label: '平阳县国土资源局'
          }
        ],
        ruleForm: {
          //流转方式：
          circulation: '',
          //标题：
          title: '',
          // 土地性质
          landChar: '国有建设用地',
          //省
          cantonProvince: '',
          cantonProvinceName: '',
          //市
          cantonCity: '',
          cantonCityName: '',
          //区
          cantonArea: '',
          cantonAreaName: '',
          // 使用权类型：
          useType: '划拨',
          // 土地类型
          landType: '个人用地',
          // 土地一级用途
          firstClassUse: '',
          firstClassUseName: '',
          // 土地二级用途
          secondClassUse: '',
          secondClassUseName: '',
          trustOrgIdName: '',
          // 转让、出租、抵押面积
          area: '',
          // 使用权截止日期
          endDate: '2018-12-12',
          // 转让、出租、抵押年限
          years: '',
          uselife: '',
          // 土地坐落
          location: '',
          // 坐标
          coordinate: '',
          east: '',
          west: '',
          south: '',
          north: '',
          // 拟转让、出租、抵押价格
          price: '',
          // 权证号类型
          warrantNumType: '不动产证号',
          // 权证号
          warrantNum: '',
          // 登录机构
          registration: '',
          registrationName: '',
          // 不动产单元号
          unitNum: '',
          // 是否有附属物
          adjunct: '是',
          resource1: '是',
          resource2: '是',
          // 建筑面积
          buildArea: '',
          // 建筑结构
          buildingStructure: '',
          //绿地率
          greenSpaceRate: '',
          greenSpaceRate2: '',
          greenSpaceRateSymbol1: '',
          greenSpaceRateSymbol2: '',
          //建筑密度
          buildingDensity: '',
          buildingDensity2: '',
          buildingDensitySymbol1: '',
          buildingDensitySymbol2: '',
          //建筑限高
          heightLimit: '',
          //容积率
          plotRatio: '',
          plotRatio2: '',
          plotRatioSymbol1: '',
          plotRatioSymbol2: '',
          // 其他说明
          remark: '',
          //图片
          img: '',
          fileList: [],
          fileListVideo: [],
          pId: null,
          photoFirstUpload: true,
          area: '',
          ownerShipNature: '', //权属人性质
          ownerShip: '', //权属人名字
          identificationType: '', //证件种类
          identificationNum: '', //证件号
          address: '', //地址
          phone: '', //权属人联系电话
          contact: '', //联系人/代理人姓名
          idCard: '', //联系人/代理人身份证号
          contactPhone: '', //联系人/代理人电话
          contactAddress: '' //联系人/代理人地址
        },
        // 地块基本信息
        transGoods: {
          id: null,
          // id: this.createId(),
          // 土地性质、
          area: '',
          landChar: '',
          // 流转方式
          circulation: '',
          circulationName: '',
          //省
          cantonProvince: '',
          cantonProvinceName: '',
          //市
          cantonCity: '',
          cantonCityName: '',
          //区
          cantonArea: '',
          cantonAreaName: '',
          // 使用权类型：
          useType: '',
          // 土地类型
          landType: '',
          // 土地性质
          landNature: '',
          // 流转方式
          landTrans: '',
          // 土地一级用途
          firstClassUse: '',
          firstClassUseName: '',
          // 土地二级用途
          secondClassUse: '',
          secondClassUseName: '',
          // 面积
          buildArea: '',
          // 使用年限
          years: '',
          // 使用权截止日期
          endDate: '',
          // 土地坐落地址
          location: '',
          // 坐标
          coordinate: '',
          // 东
          east: '',
          // 南
          south: '',
          // 西
          west: '',
          // 北
          north: '',
          // 转让价格
          price: '',
          // 权证号类型
          warrantNumType: '',
          // 权证号
          warrantNum: '',
          // 登记机构
          registration: '',
          // 不动产单元号
          unitNum: '',
          // 是否有附属物
          isAdjunct: '',
          // 绿化率（下）
          greenSpaceRate: '',
          // 绿化率（上）
          greenSpaceRate2: '',
          // 绿化率前置符号
          greenSpaceRateSymbol1: '',
          // 绿化率后置符号
          greenSpaceRateSymbol2: '',
          // 建筑结构
          buildingStructure: '',
          buildingStructureName: '',
          // 建筑限高
          heightLimit: '',
          // 建筑密度（下）
          buildingDensity: '',
          // 建筑密度（上）
          buildingDensity2: '',
          // 建筑密度前置符号
          buildingDensitySymbol1: '',
          // 建筑密度后置符号
          buildingDensitySymbol2: '',
          // 交易物渠道(默认交易)
          channel: 'deal',
          // 附件
          fileList: [],
          fileListVideo: [],
          remark: '',
          // 权属人性质
          ownerShipNature: '',
          ownerShipNatureName: '',
          // 权属人名称
          ownerShip: '',
          // 证件类型
          identificationType: '',
          identificationTypeName: '',
          // 证件号
          identificationNum: '',
          // 地址
          address: '',
          // 权属人联系电话
          phone: '',
          // 联系人/代理人姓名
          contact: '',
          // 联系人/代理人身份证号
          idCard: '',
          // 联系人/代理人联系电话
          contactPhone: '',
          // 联系人/代理人联系地址
          contactAddress: '',
          // 委托信息标题
          trustTitle: '',
          // 委托机构
          trustOrgId: '',
          trustOrgIdName: '',
          // 状态(默认草稿)
          delegationStatus: 'draft3',
          fileListName: '',
          //上传土地图片区域
          pId: null,
          fileId: '',
          photoFirstUpload: true,
          additional: [],
          entrustFirstUpload: true,
          entrustAdditional: [],
          img: '',
          fileTemplateId: ''
        },
        //土地附件上传标识集合
        massifForm: {
          entrustFirstUpload: true,
          pId: null
        },
        transForm: {
          entrustFirstUpload: true,
          pId: null
        },
        //土地附件清单标识
        fileTemplateId: '',
        // 委托基本信息
        transTrustInfo: {
          id: null,
          //委托附件清单标识
          trustFileCode: '',
          // 权属人性质
          ownerShipNature: '',
          ownerShipNatureName: '',
          // 权属人名称
          ownerShip: '',
          // 证件类型
          identificationType: '',
          identificationTypeName: '',
          // 证件号
          identificationNum: '',
          // 地址
          address: '',
          // 权属人联系电话
          phone: '',
          // 联系人/代理人姓名
          contact: '',
          // 联系人/代理人身份证号
          idCard: '',
          // 联系人/代理人联系电话
          contactPhone: '',
          // 联系人/代理人联系地址
          contactAddress: '',
          // 委托信息标题
          trustTitle: '',
          // 委托机构
          trustOrgId: '',
          trustOrgIdName: '',
          // 状态(默认草稿)
          delegationStatus: 'draft3',
          fileListName: ''
        },
        //委托附件清单标识
        trustFileCode: '',
        fileIndex: 0,

        rules: {
          trustOrgId: [{required: true, message: '请选择委托机构'}],
          circulation: [{required: true, message: '请选择流转方式'}],
          trustTitle: [
            {required: true, message: '请输入标题'},
            { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,15,60,'15到60个字符之间')}  },
            {
              pattern: /^[A-Za-z0-9\u4e00-\u9fa5\,，\-\—\、\]\[\【】()（）]+$/,
              message: "可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
            }
          ],
          landChar: [
            {required: true, message: '请选择土地性质', trigger: 'change'}
          ],
          cantonProvince: [
            {required: true, message: '请选择土地所在省', trigger: 'change'}
          ],
          cantonCity: [
            {required: true, message: '请选择土地所在市', trigger: 'change'}
          ],
          cantonArea: [
            {required: true, message: '请选择土地所在区', trigger: 'change'}
          ],
          useType: [
            {required: true, message: '请选择使用权类型', trigger: 'change'}
          ],
          landType: [
            {required: true, message: '请选择土地类型', trigger: 'change'}
          ],
          firstClassUse: [
            {required: true, message: '请选择一级土地用途', trigger: 'change'}
          ],
          secondClassUse: [
            {required: true, message: '请选择二级土地用途', trigger: 'change'}
          ],
          area: [
            {required: true, message: '请输入面积', trigger: 'change'},
            {pattern: /^([0-9]|[1-9][0-9]{0,7})(\.[0-9]|\.[0-9][0-9])?$/, message: '面积必须是大于等于1的数'}
          ],
          endDate: [
            {required: true, message: '请输入使用权截止日期', trigger: 'change'}
          ],
          years: [
            {required: true, message: '请输入使用年限'},
            // {min: 1,max: 15,message: "长度在 1 到 15个字符"},
            {
              pattern: /^[1-9]\d*(\.\d{1})?$/,
              message: '年限最小为1,且最多一位小数'
            },
            {
              validator: numberDator // 自定义验证数值大小 大于等于0,小于等于100;
            }
          ],
          location: [
            {required: true, message: '请输入土地详细地址'},
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
            // { max: 15, message: "长度在 1 到 15个字符" },
            {
              pattern: /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/,
              message: '拟转让价格有误,必须是大于0的数.'
            }
          ],
          warrantNumType: [
            {required: true, message: '请选择权证号类型', trigger: 'change'}
          ],
          warrantNum: [
            {required: true, message: '请输入权证号', trigger: 'blur'},
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
              message: '请输入正确的建筑限高.'
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
            {required: true, message: '请选择权属人性质', trigger: 'change'}
          ],
          ownerShip: [
            {required: true, message: '请输入姓名'},
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
            {required: true, message: '请选择证件种类', trigger: 'change'}
          ],
          address: [
            {required: true, message: '请输入联系地址'},
            { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
              message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
            }
          ],
          phone: [
            {required: true, message: '请输入电话号码'},
            {
              pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              message: '您输入的手机号有误'
            }
          ],
          contact: [
            {required: true, message: '联系人/代理人姓名'},
            { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
            {
              pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
              message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
            }
          ],
          idCard: [
            {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '您输入的证件号有误'
            }
          ],
          contactPhone: [
            {required: true, message: '请输入联系人/代理人联系电话'},
            {
              pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              message: '您输入的手机号有误'
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
        checkList: ['选中且禁用', '复选框 A'],

        //步骤
        active: 0,

        isShowProvince: true,
        temp: {
          address__province: '',
          address__city: '',
          address__dist: ''
        },

        txtVal: 0,
        //时间设置
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        orgs: [],
        baseUrl: imgBaseUrl.imgUrl,

        videoForm: {
          pId: null,
          img: '',
          photoFirstUpload: false,
          videoUrlId: []
        },
        landAnnexParame: {
          //土地附件参数集
        },
        entrustAnnexParame: {
          //委托附件参数集
        },
        TemplateCodes: '', //模板ID
        TidParameters: '', //tid
        plotRatioSymbolSelect2: [
          {lable: '<', value: '<'},
          {lable: '<=', value: '<='},
          {lable: '=', value: '='}
        ],
        goodsNo: "",
        isAuxFlag: false, // ----
        longitude:'',
        latitude:'',
          tgId:'',
      }
    },
    created () {
      this.getProvinceData()
      this.getTransGood()
      let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
          if (item == 'land_use') {
            this.$get(
              this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID
            ,{code:item,parentId:0}).then(res => {
              resolve(res)
            })
          } else {
            this.$get(
              this.$API.EPF_TRADE.ENTRUST.EDIT.GET_GROUP + item,
              {}
            ).then(res => {
              resolve(res)
            })
          }
        })
        return reqFun
      })
      Promise.all(reqArr).then(res => {
        console.log(res)
        let dicArr = res.map(item => {
          console.log(item)
          let dicArr = item.dictionariesList.map(item => {
            return {
              dictKey: item.dictKey,
              zhCn: item.zhCn,
              id: item.id
            }
          })
          return dicArr
        })
        console.log(dicArr)
        for (let item in this.dictionary) {
          console.log(this.dicNum)
          this.dictionary[item] = dicArr[this.dicNum]
          // console.log(dicArr[this.dicNum])
          this.dicNum++
        }

        this.dicFinsh = true
        console.log('字典结果', this.dictionary)
      })
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
      getTransGood () {
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GET_GOODS, {
          id: this.$route.query.tgId
        }).then(res => {
            this.tgId = res.transGoods.id;
          this.goodsNo = res.transGoods.goodsNo;
          this.fatherId = res.transGoods.pId
          this.transGoods.pId = res.transGoods.pId
          console.log('这是图片的爸爸' + this.fatherId)
          this.transGoodsId = res.transGoods.id
          this.transTrustInfoId = res.transTrustInfo.id
          res['tSell'] = Object.assign(res.transGoods, res.transTrustInfo)

          function getChangeDate (date) {
            return (
              date.getFullYear() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate()
            )
          }

          // res.tSell.endDate = getChangeDate(new Date(res.tSell.endDate));
          this.fatherId = res.tSell.pId
          res.tSell['pId'] = res.tSell.img
          res.tSell['fileList'] = []
          res.tSell['fileListVideo'] = []
          res.tSell['title'] = res.tSell['trustTitle']
          res.tSell['photoFirstUpload'] = true
          // this.pulishName(res.tSell.circulation);
          this.ruleForm = res.tSell

          if(res.tSell.coordinate && res.tSell.coordinate.split(',').length == 2){
            this.longitude = parseFloat(res.tSell.coordinate.split(',')[0])
            this.latitude = parseFloat(res.tSell.coordinate.split(',')[1])
          }

          if(res.tSell.coordinate && res.tSell.coordinate.split(' ').length == 2){
            this.longitude = parseFloat(res.tSell.coordinate.split(' ')[0])
            this.latitude = parseFloat(res.tSell.coordinate.split(' ')[1])
          }
          console.log('查看详情返回', res.tSell)
          if (this.$route.query.procInsId) {
            var jsonVars = '{\'test\':\'test\'}'
            this.$post(this.$API.EPF_ACTIVITI.FLOW, {
              procInsId: this.$route.query.procInsId,
              jsonVars: jsonVars
            }).then(res => {
              //查询意见
              if (res.code != '0') {
                //失败
                this.$message.error(res.msg)
                return
              }
              this.acceptanceData = res.histoicFlowList
            })
          }
          //请求附件组
          if (res.tSell.pId) {
            this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GROUP_ID, {
              id: res.tSell.pId
            }).then(files => {
              let filesData = files.fileList
              this.fatherId = filesData[0].pId
              this.ruleForm.pId = filesData[0].pId
              // console.log(this.fatherId)
              for (let index = 0; index < filesData.length; index++) {
                if (
                  filesData[index].extName == 'png' ||
                  filesData[index].extName == 'PNG' ||
                  filesData[index].extName == 'jpg' ||
                  filesData[index].extName == 'JPG' ||
                  filesData[index].extName == 'jifi' ||
                  filesData[index].extName == 'gif'
                ) {
                  this.ruleForm['fileList'].push({
                    url: this.baseUrl + filesData[index].id,
                    status: 'success',
                    name: filesData[index].name
                  })
                  this.imgUrlId.push(filesData[index].id)
                }
                if (filesData[index].extName == 'mp4') {
                  this.ruleForm['fileListVideo'].push({
                    url: this.baseUrl + filesData[index].id,
                    status: 'success',
                    name: filesData[index].name
                  })
                  this.videoUrlId.push(filesData[index].id)
                }
              }
              this.ruleForm['id'] = this.$route.query.id
            })
          }
          console.log(res.tSell.id);
          this.belong = res.tSell.enclosureId;
          this.areaCode = res.tSell.cantonProvince;
          this.orgselect();
        })
      },
      getOrg (id) {
        this.$get(
          this.$API.EPF_ADMIN.ORG.GET_ORG + id,
          {}
        ).then(res => {
          this.ruleForm.trustOrgIdName = res.orgName
        })
      },
      pulishName (name) {
        if (name == 'transfer') {
          this.pulishType(1)
        } else if (name == 'rent') {
          this.pulishType(2)
        } else if (name == 'mortgage') {
          this.pulishType(3)
        }
      },
      pulishType (typeName) {
        if (typeName === 1) {
          this.publishLandtype = '剩余使用'
          this.ruleForm.circulation = 'transfer'
          this.ruleForm.circulationName = '转让'
        } else if (typeName === 2) {
          this.publishLandtype = '出租'
          this.ruleForm.circulation = 'rent'
          this.ruleForm.circulationName = '出租'
        } else if (typeName === 3) {
          this.publishLandtype = '抵押'
          this.ruleForm.circulation = 'mortgage'
          this.ruleForm.circulationName = '抵押'
        }
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      getCode: async function (code) {
        const data = await this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.GROUP_CODE,{code:code})
        console.log(data)
      },

      circulationSelect (dic, entrustAgency, event) {
        this.transGoods.circulation = this.$refs[entrustAgency][0].$attrs.dictKey
      },
      entrustAgencySelect (orgs, entrustAgency, event) {
        console.log(this.$refs[entrustAgency])
        this.transTrustInfo.trustOrgId = this.$refs[entrustAgency][0].$attrs.id
      },
      firstClassUseSelect (dic, firstClassUse, event) {
        this.ruleForm.secondClassUse = ''
        this.ruleForm.secondClassUseName = ''
        this.dictionary.land_use_second = ''
        let pId = this.$refs[firstClassUse][0].$attrs.id
        this.ruleForm.firstClassUse = this.$refs[
          firstClassUse
          ][0].$attrs.dictKey
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:land_use,parentId:pId},{}
        ).then(res => {
          console.log(res)
          if (res.dictionariesList.length != 0) {
            this.dictionary.land_use_second = res.dictionariesList
            return
          }
          this.dictionary.land_use_second = ''
        })
      },
      secondClassUseSelect (dic, firstClassUse, event) {
        this.ruleForm.secondClassUse = this.$refs[
          firstClassUse
          ][0].$attrs.dictKey
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
      province (dic, cantonCode, event) {
        this.ruleForm.cantonAreaName = ''
        this.ruleForm.cantonArea = ''
        // this.cantonArea = ''
        this.ruleForm.cantonCityName = ''
        this.ruleForm.cantonCity = ''
        // this.cantonCity = ''
        let pId = this.$refs[cantonCode][0].$attrs.id
        this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode
        this.dictionary.cantonArea = []
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:administrative_regions,parentId:pId},{}).then(res => {
          console.log(res)
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList
            return
          }
          this.dictionary.cantonCity = ''
        })
        this.orgselect();
      },
      city (dic, cantonCity, event) {
        this.ruleForm.cantonArea = ''
        this.ruleForm.cantonAreaName = ''
        this.cantonArea = ''
        let pId = this.$refs[cantonCity][0].$attrs.id
        this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode
        this.$get(this.$API.EPF_TRADE.ENTRUST.EDIT.PARENT_ID,{code:administrative_regions,parentId:pId},{}).then(res => {
          console.log(res)
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList
            return
          }
          this.dictionary.cantonArea = ''
        })
         this.orgselect();
      },
      area (dic, cantonCity, event) {
        this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode
        this.orgselect();
      },
      // 证件类型选择
      idCardSelect (dic, identificationType, event) {
        this.transTrustInfo.identificationType = this.$refs[identificationType][0].$attrs.value
      },
      // 权属人性质选择
      ownerShipSelect (dic, ownerShipNature, event) {
        this.transTrustInfo.ownerShipNature = this.$refs[ownerShipNature][0].$attrs.value
      },

      orgselect() {
      var cantonProvince = this.ruleForm.cantonProvince;
      var cantonCity = this.ruleForm.cantonCity;
      var cantonArea = this.ruleForm.cantonArea;
      this.ruleForm.trustOrgName = "";
      this.$get(
        this.$API.EPF_ADMIN.ORG.ORG_AREAS,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        }).then(
        res => {
          if (res.code == 0) {
            sessionStorage.setItem("orgsDataList", JSON.stringify(res.orgs));
            if (this.ruleForm.cantonAreaName !== "") {
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
      submitLand: function (type) {
        if(!this.isAuxFlag || !this.isAuxFlag2){
          this.$message.error('请检查您的附件清单信息是否上传完整！');
          return;
        }
        let that = this

        console.log(this.ruleForm)
        for (let item in this.transGoods) {
          if (item != 'id') {
            console.log(item)
            this.transGoods[item] = this.ruleForm[item]
          }
        }

        for (let item2 in this.transTrustInfo) {
          if (item2 != 'id') {
            this.transTrustInfo[item2] = this.ruleForm[item2]
          }
        }

        this.transTrustInfo['id'] = this.transTrustInfoId
        this.transGoods['id'] = this.transGoodsId
        this.transTrustInfo['trustFileCode'] = this.trustFileCode
        this.transGoods['fileTemplateId'] = this.fileTemplateId
        let params = {
          transGoods: this.transGoods,
          transTrustInfo: this.transTrustInfo
        }

        console.log('提交数据', params)

        this.$useAppend(this.$API.EPF_TRADE.ENTRUST.EDIT.EDIT_GOODS, {
          transTargetJson: params
        }).then(res => {
          if (res.code == '0') {
            if (type == 'save') {
              that.$message.success('修改成功')
              /**
               * 提交成功回到列表页中我的委托页面
               */
              that.bindTo()
            } else {
              debugger
              //提交
              // that.submitHadle(that.transTrustInfo.id, 'accepting', this.goodsNo)
                that.submitHadle(that.transTrustInfo.id, 'accepting', this.tgId)
            }
          } else {
            that.$message.error(res.msg) //失败
          }
        })
      },
// 提交受理
      submitHadle (id, status, goodsNo) {
        let that = this
        var procDefKey = 'transaction_filing' //启动流程类型
        //获取启动节点信息
        let orgId = sessionStorage.getItem('orgId')
        let businessType = 'entrust'
        this.$post(this.$API.EPF_ACTIVITI.NODE_ID, {
          nodeId: 'start',
          procDefKey: procDefKey,
          orgId: orgId,
          businessType: businessType
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
            goodsNo +
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
              this.$message.error('提交失败:稍后可在我的委托列表中操作该数据')
              that.bindTo()
              return
            }
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            that.bindTo()
          })
        })
      },
      //提交成功回到列表页中我的委托页面
      bindTo () {
        /**
         * 提交成功回到列表页中我的委托页面
         */
        let routes = '/system/trade/entrust/views/trade/edit'
        this.$bus.$emit('close_tab',routes)
        let routerPath = "/system/trade/entrust/views/trade/index";
        this.$router.push({path:routerPath});
      },
      handleVideoSuccess (res, file) {
        //获取上传图片地址
        // this.videoFlag = false;
        // this.videoUploadPercent = 0;
        // if(res.status == 200){
        //     this.videoForm.videoUploadId = res.data.uploadId;
        //     this.videoForm.Video = res.data.uploadUrl;
        // }else{
        //     this.$message.error('视频上传失败，请重新上传！');
        // }
        console.log(res, file)
      },

      uploadVideoProcess (event, file, fileList) {
        //进度条
        this.videoFlag = true
        this.videoUploadPercent = file.percentage.toFixed(0) * 1
      },
      //上传成功回调
      // handleVideoSuccess (res, file) {
      //     this.isShowUploadVideo = true;
      //     this.videoFlag = false;
      //     this.videoUploadPercent = 0;
      //     if (res.errorCode == "00") {
      //         this.global.company.showVideoPath = res.sprbody.urlAddress;
      //         // this.videoForm.showVideoPath = res.data.uploadUrl;
      //     } else {
      //         this.$message.error('视频上传失败，请重新上传！');
      //     }
      // },
      beforeAvatarUploadImg (file) {
        //上传图片格式验证
        console.log(file)
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isGIF = file.type === 'image/gif'
        const isLt6M = file.size / 1024 / 1024 < 6
        if (!isPNG && !isJPG && !isGIF) {
          this.$message.error('上传土地照片只能是 PNG/jpeg/gif 格式!')
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传土地照片大小不能超过 6MB!')
          return false
        }
      },
      beforeAvatarUploadVideo (file) {
        //上传视频格式验证
        const isLt300M = file.size / 1024 / 1024 < 300
        if (['video/mp4'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式')
          return false
        }
        if (!isLt300M) {
          this.$message.error('上传视频大小不能超过300MB哦!')
          return false
        }
        this.isShowUploadVideo = false
      },
      first_photoUploadFile (files) {
        //土地图片上传

        const file = files.file
        const formData = new FormData()
        formData.append('files', file)
        if (this.ruleForm.pId) {
          formData.append('pId', this.fatherId)
          this.photoUpload(formData, files, file)
          return
        }
        if (!this.ruleForm.pId && this.ruleForm.photoFirstUpload) {
          //第一张图片上传
          console.log('第一张图片上传')
          this.ruleForm.photoFirstUpload = false
          this.photoUpload(formData, files, file, 'first')
          return
        }
        if (this.ruleForm.pId && !this.ruleForm.photoFirstUpload) {
          //之后的图片上传携带id
          console.log('之后的图片上传携带id')
          formData.append('pId', this.fatherId)
          this.photoUpload(formData, files, file)
          return
        }
      },
      photoUpload (formData, files, file, count) {
        //土地图片上传方法
        const that = this
        console.log(formData.get('pId'))
        this.$useAppend(this.$API.DOCUMENT.UPLOAD, formData, function (
          event
        ) {
          //进度条
          file.percent = (event.loaded / event.total) * 100
          files.onProgress(file)
        }).then(res => {
          console.log('这是土地照片上传的返回', res)
          if (res.state != 'SUCCESS') {
            if (count == 'first') {
              // 第一张上传出错
              that.this.ruleForm.photoFirstUpload = true
              return null
            }
            return null
          }
          if (!that.ruleForm.pId) {
            that.ruleForm.pId = res.data[0].pId
            that.ruleForm.img = res.data[0].id
          }
          if (that.ruleForm.pId && !that.ruleForm.photoFirstUpload) {

            that.$refs.photoUploader.submit()
          }
          that.imgUrlId.push(res.data[0].id)
          console.log(that.imgUrlId)

          files.onSuccess(res)
        })
      },
      videoUploadFile (files) {
        //土地视频上传
        const file = files.file
        const formData = new FormData()
        formData.append('files', file)

        if (this.ruleForm.pId) {
          formData.append('pId', this.fatherId)
          this.videoUpload(formData, files, file, 'first')
          return
        }

      },
      videoUpload (formData, files, file, count) {
        //土地视频上传方法
        const than = this
        this.$useAppend(this.$API.DOCUMENT.UPLOAD, formData, function (
          event
        ) {
          //进度条
          file.percent = (event.loaded / event.total) * 100
          files.onProgress(file)
        }).then(res => {
          console.log('土地视频上传的返回', res)
          if (res.state != 'SUCCESS') {
            if (count == 'first') {
              this.$message.error('视频上传失败')
              this.videoForm.photoFirstUpload = true
              return null
            }
            return null
          }
          if (!this.transGoods.pId) {
            this.transGoods.fileId = res.data[0].id;
            this.transGoods.pId = res.data[0].id;
            this.transGoods.img = res.data[0].id;
          }
          this.videoForm.videoUrlId.push(res.data[0].id)
          files.onSuccess(res)
        })
      },
      ParameSwitching (index, tid, state) {
        this.fileIndex = index
        //参数切换
        if (state == 0) {
          this.TemplateCodes = this.fileTemplateId //土地code
          this.TidParameters = tid
        } else if (state == 1) {
          this.TemplateCodes = this.trustFileCode //委托code
          this.TidParameters = tid
        }
        console.log(
          '选中的附件code是：',
          this.TemplateCodes,
          '选中的附件tid是',
          this.TidParameters
        )
      },
      massif_File_Upload (files) {
        //地块附件上传
        const file = files.file
        const formData = new FormData()
        formData.append('files', file)
        formData.append('belong', this.belong) //委托对象ID
        if (this.massifForm.pId) {
          formData.append('pId', this.TidParameters) //tid赋值
          this.massif_Upload_Fun(formData, files, file)
          return
        }
        if (!this.massifForm.pId && this.massifForm.entrustFirstUpload) {
          console.log('第一张图片上传')
          formData.append('pId', this.TidParameters) //tid赋值
          this.massifForm.entrustFirstUpload = false
          this.massif_Upload_Fun(formData, files, file, 'first')
          return
        }
        if (this.massifForm.pId && !this.massifForm.entrustFirstUpload) {
          console.log('之后的图片上传携带id')
          this.massif_Upload_Fun(formData, files, file)
          return
        }
      },
      massif_Upload_Fun (formData, files, file, count) {
        //地块附件上传方法
        this.$useAppend(this.$API.DOCUMENT.UPLOAD, formData).then(res => {
          console.log('地块附件上传返回：', res)
          if (res.state != 'SUCCESS') {
            if (count == 'first') {
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
          // this.entrustAdditionalId.push(res.data[0].id);
          files.onSuccess(res)
        })
      },
      entrust_File_Upload (files) {
        //上委托附件上传
        const file = files.file
        const formData = new FormData()
        formData.append('files', file)
        formData.append('belong', this.belong) //委托对象ID

        if (this.transForm.pId) {
          formData.append('pId', this.TidParameters) //tid赋值
          this.entrust_Upload_Fun(formData, files, file)
          return
        }
        if (!this.transForm.pId && this.transForm.entrustFirstUpload) {
          console.log('第一张图片上传')
          formData.append('pId', this.TidParameters) //tid赋值
          this.transForm.entrustFirstUpload = false
          this.entrust_Upload_Fun(formData, files, file, 'first')
          return
        }
        if (this.transForm.pId && !this.transForm.entrustFirstUpload) {
          console.log('之后的图片上传携带id')
          this.entrust_Upload_Fun(formData, files, file)
          return
        }
      },
      entrust_Upload_Fun (formData, files, file, count) {
        //委托附件上传方法
        this.$useAppend(this.$API.DOCUMENT.UPLOAD, formData).then(res => {
          console.log('委托附件上传返回：', res)
          if (res.state != 'SUCCESS') {
            if (count == 'first') {
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
          // this.entrustAdditionalId.push(res.data[0].id);
          files.onSuccess(res)
        })
      },
      file_List_Remove (file, fileList) {
        const id = file.url.split('?')[1].split('=')[1]
        this.$post(this.$API.DOCUMENT.DELETE, {id: id})
          .then(res => {
            if (res.state === 'SUCCESS') {
              this.$message.warning(res.msg)
              queryFiles(this.parentId)
            } else {
              this.$message.warning(res.msg)
            }
          })
        //
        // console.log(this.imgUrlId);
        // const img = file.url.split("?")[1].split('=')[1]
        // for (let i = 0; i < this.imgUrlId.length; i++) {
        //   if (this.imgUrlId[i] == img) {
        //     this.imgUrlId.splice(i, 1);
        //   }
        // }
        // this.ruleForm.fileList = fileList;
      },
      upLoadError (err, file, fileList) {
        //上传失败回调
        this.$message.error('文件上传失败')
      },

      first_UploadSuccess (res, file, fileList) {
        //
        console.log('进入成功函数')
        if (!this.ruleForm.pId) {
          console.log('进入一')
          this.ruleForm.pId = res.data[0].pId
        }
        this.ruleForm.fileList = fileList
        for (let i = 0; i < this.ruleForm.fileList.length; i++) {
          console.log('进入二', this.ruleForm.fileList[i].url)
          this.ruleForm.fileList[i].url = this.baseUrl + this.imgUrlId[i]
          console.log(this.ruleForm.fileList[i].url)
        }
        console.log(this.ruleForm)
      },
      videoUploadSuccess (res, file, fileList) {
        debugger
        if (!this.transGoods.pId) {
          this.transGoods.pId = res.data.data[0].pId
        }
        this.ruleForm.fileListVideo = fileList
        console.log("fileList[0]",fileList[0])
        for (let i = 0; i < this.ruleForm.fileListVideo.length; i++) {
          this.ruleForm.fileListVideo[i].url = this.baseUrl + this.videoUrlId[i]
        }
        console.log(this.videoUrlId)
      },

      next () {
        //下一步
        this.Enclosure = true
        if (this.active++ > 2) this.active = 0
      },
      prev () {
        //上一步
        this.Enclosure = false
        if (this.active-- < 0) this.active = 2
      },
      handleNodeClick (data) {
        console.log(data)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      handleSizeChange1 (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange1 () {
        this.getPraceData()
      },

      // 附件清单方法
      handleClick (row) {
        console.log(row)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      upload (formData, files, file, count) {
        //文件上传
        this.$useAppend(this.$API.DOCUMENT.UPLOAD, formData, res => {
          if (res.state != 'SUCCESS') {
            console.log(222)
            if (count == 'first') {
              this.ruleForm.photoFirstUpload = true
              // this.$refs.additionalRef.submit();
              return null
            }
            console.log('错误了')
            // this.$refs.additionalRef.submit();
            return null
          }
          if (!this.ruleForm.pId) {
            this.ruleForm.pId = res.data[0].pId
            // this.ruleForm.additional = res.data.data[0].id;
          }
          if (this.ruleForm.pId && !this.ruleForm.photoFirstUpload) {
            // this.$refs.additionalRef.submit();
          }
          this.additionalId.push(res.data[0].id)
          files.onSuccess(res)
        })
      },

      photoUploadSuccess (res, file, fileList) {
        console.log('触发成功', this.tableData[this.fileIndex])
        let fileObject = {
          fname: res.data[0].name,
          fid: res.data[0].id,
          fsize: res.data[0].docSize,
          ftype: res.data[0].extName
        }
        if (this.tableData[this.fileIndex].files.length == 0) {
          this.tableData[this.fileIndex].files.push(fileObject)
        } else {
          this.tableData[this.fileIndex].files[0] = fileObject
        }
        // this.ruleForm[this.fileListName] = fileList;
        // for (let i = 0; i < this.ruleForm[this.fileListName].length; i++) {
        //   this.ruleForm[this.fileListName][i].url =
        //     this.baseUrl + this.additionalId[i];
        // }
        this.$forceUpdate()
      },
      entrustUploadSuccess (res, file, fileList) {
        console.log(this.transTableData, this.entrustFileIndex)
        console.log(this.transTableData, this.fileIndex)
        console.log('触发成功', this.transTableData[this.fileIndex])
        let fileObject = {
          fname: res.data[0].name,
          fid: res.data[0].id,
          fsize: res.data[0].docSize,
          ftype: res.data[0].extName
        }
        if (this.transTableData[this.fileIndex].files.length == 0) {
          this.transTableData[this.fileIndex].files.push(fileObject)
        } else {
          this.transTableData[this.fileIndex].files[0] = fileObject
        }
        // this.ruleForm[this.fileListName] = fileList;
        // for (let i = 0; i < this.ruleForm[this.fileListName].length; i++) {
        //   this.ruleForm[this.fileListName][i].url =
        //     this.baseUrl + this.entrustAdditionalId[i];
        // }
        this.$forceUpdate()

      },
      entrustHandleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      delFile (index, tid, id) {
        let that = this
        let url = this.$API.DOCUMENT.FOLDER
        this.$post(url, {id:id,fdId:tid},{}, res => {
          if (res.state == 'SUCCESS') {
            this.tableData[index].files = []
            this.tableData[index].tsize = 0
          }
        })
        this.tableData[index].files = []
        this.tableData[index].tsize = 0
        this.$forceUpdate()
      },
      entrustDelFile (index, eid, id) {
        let that = this
        let url = this.$API.DOCUMENT.FOLDER
        this.$post(url, {id:id,fdId:eid},{}, res => {
          if (res.state == 'SUCCESS') {
            this.transTableData[index].files = []
            this.transTableData[index].tsize = 0
          }
        })
        this.transTableData[index].files = []
        this.transTableData[index].tsize = 0
        this.$forceUpdate()
      },
      upLoadClick (index, fileListName) {
        this.tid = ''
        this.tid = this.tableData[index].tid
        this.fileIndex = index
        this.fileListName = fileListName
      },
      entrustUpLoadClick (index, fileListName) {
        this.eid = ''
        this.eid = this.transTableData[index].tid
        this.entrustFileIndex = index
        this.fileListName = fileListName
      },
      // 表单验证
      submitForm (val) {
        this.$refs[val].validate(valid => {
          if (valid) {
            if (this.active++ > 2) this.active = 0
          } else {
            document
              .querySelector('#entrustedTradeDetailsAddStep')
              .scrollIntoView(true)
          }
        })
      },
      switchs(){
        this.entrustLoading = true
      },
      ownerShipNatureSelect(){

        if(this.ruleForm.ownerShipNature != '' && this.ruleForm.ownerShipNature != null){
          this.idFlag = true
          if(this.ruleForm.ownerShipNature == 'personage1'){
            this.ruleForm.identificationType = 'card_id'
          }else{
            this.ruleForm.identificationType = 'business_license'
          }
        }else{
          this.idFlag = false
        }

      }
    },
    mounted () {
    }
  }
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
<style scope>
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

  .canton_Regions > .el-form-item__content {
    margin-left: 5px !important;
  }

  .EntrustTra_main_cont .el-upload-list {
    display: none !important;
  }

  .el-upload-list {
    display: none !important;
  }
</style>
