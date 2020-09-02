<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main" v-if="transGoods">
          <el-form
            :model="transGoods"
            :rules="rules"
            ref="transGoods"
            label-width="140px"
            class="demo-ruleForm"
          >
            <EPF-switchTitle titles_h="委托机构">
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="行政区域：" required>
                      <el-select
                        v-model="transGoods.cantonProvinceName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonProvinceName"
                          :value="transGoods.cantonProvinceName"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="transGoods.cantonCityName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonCityName"
                          :value="transGoods.cantonCityName"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="transGoods.cantonAreaName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonAreaName"
                          :value="transGoods.cantonAreaName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="交易中心:" required>
                      <el-input
                        v-model="transTrustInfo.trustOrgId"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地流转方式:" required>
                      <el-input
                        v-model="transGoods.circulationName"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="标题:" required>
                      <el-input
                        v-model="transGoods.circulationName"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </EPF-switchTitle>

            <EPF-switchTitle titles_h="土地基本信息">
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="土地性质：" required>
                      <el-radio-group v-model="transGoods.landCharName">
                        <el-radio label="国有建设用地"></el-radio>
                        <el-radio label="集体建设用地"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <!-- 所属行政区：未接数据 -->
                  <li>
                    <el-form-item label="所属行政区：" required>
                      <el-select
                        v-model="transGoods.cantonProvinceName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonProvinceName"
                          :value="transGoods.cantonProvinceName"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="transGoods.cantonCityName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonCityName"
                          :value="transGoods.cantonCityName"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="transGoods.cantonAreaName"
                        disabled
                        placeholder="请选择"
                        style="width:114px;"
                      >
                        <el-option
                          :label="transGoods.cantonAreaName"
                          :value="transGoods.cantonAreaName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="使用权类型：" required>
                      <el-radio-group v-model="transGoods.useTypeName">
                        <el-radio label="划拨"></el-radio>
                        <el-radio label="出让"></el-radio>
                        <el-radio label="作价出资"></el-radio>
                        <el-radio label="授权经营"></el-radio>
                        <el-radio label="其他"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地类型：" required>
                      <el-radio-group v-model="transGoods.landTypeName">
                        <el-radio label="个人用地"></el-radio>
                        <el-radio label="企业用地"></el-radio>
                        <el-radio label="国处置用地"></el-radio>
                        <el-radio label="司法处置土地"></el-radio>
                        <el-radio label="中介拍卖土地"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地用途：" required>
                      <el-select
                        v-model="transGoods.firstClassUseName"
                        disabled
                        placeholder="请选择"
                        style="width:176px;"
                      >
                        <el-option
                          :label="transGoods.firstClassUseName"
                          :value="transGoods.firstClassUseName"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="transGoods.secondClassUseName"
                        disabled
                        placeholder="请选择"
                        style="width:176px;"
                      >
                        <el-option
                          :label="transGoods.secondClassUseName"
                          :value="transGoods.secondClassUseName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="转让面积：" required>
                      <el-input
                        v-model="transGoods.area"
                        size="small"
                        disabled
                      ></el-input>
                      <span>m2</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="使用权截止日期：" prop="noticeTime" required>
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
                    <el-form-item label="转让年限：" required>
                      <el-input
                        v-model="transGoods.years"
                        size="small"
                        disabled
                      ></el-input>
                      <span>年</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="土地坐落：" required>
                      <el-input
                        v-model="transGoods.location"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="地图标注：">
                      <el-input
                        v-model="transGoods.mapIdentification"
                        placeholder="地图标注以后，自动获取坐标"
                        style="width:360px;"
                      ></el-input>
                      <div
                        class="findland_input"
                        @click="dialogVisibleMap = true"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg=="
                          alt
                        />
                        <span>地图找地</span>
                      </div>
                      <el-dialog
                        id="publishLandMapDialog"
                        :visible.sync="dialogVisibleMap"
                        @close="dialogVisibleMap = false"
                        title="地图找地"
                      >
                        <v-Map
                          style="height:500px"
                          :Dlongitude="longitude"
                          :Dlatitude="latitude"
                          v-if="dialogVisibleMap"
                        ></v-Map>
                      </el-dialog>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="东至：">
                      <el-input
                        v-model="transGoods.east"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="南至：">
                      <el-input
                        v-model="transGoods.south"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="西至：">
                      <el-input
                        v-model="transGoods.west"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="东至：">
                      <el-input
                        v-model="transGoods.north"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <!-- <li>
                    坐标：
                    {{transGoods.coordinate}}
                  </li> -->
                  <li>
                    <el-form-item label="拟转让总价：">
                      <el-input
                        v-model="transGoods.price"
                        size="small"
                        disabled
                      ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="权证号类型：" required>
                      <el-radio-group v-model="transGoods.warrantNumTypeName">
                        <el-radio label="不动产证号"></el-radio>
                        <el-radio label="土地证号"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="权证号：" required>
                      <el-input
                        v-model="transGoods.warrantNum"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="登记机构：" required>
                      <el-input
                        v-model="transGoods.registrationeName"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="不动产单元号：">
                      <el-input
                        v-model="transGoods.unitNum"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="是否连同地上建筑物、其他附着物：">
                      <el-radio-group v-model="transGoods.isAdjunct">
                        <el-radio label="1" value>是</el-radio>
                        <el-radio label="0" value>否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </li>
                  <!-- 建筑面积 -->
                  <li>
                    <el-form-item label="建筑面积：">
                      <el-input
                        v-model="transGoods.price"
                        size="small"
                        disabled
                      ></el-input>
                      <span>m2</span>
                    </el-form-item>
                  </li>
                  <!-- 建筑结构 -->
                  <li>
                    <el-form-item label="建筑结构：" required>
                      <el-select
                        v-model="transGoods.cantonProvinceName"
                        disabled
                        placeholder="请选择"
                      >
                        <el-option
                          :label="transGoods.cantonProvinceName"
                          :value="transGoods.cantonProvinceName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>

                  <li>
                    <el-form-item label="绿地率%：">
                      <el-input
                        v-model="transGoods.greenSpaceRate"
                        placeholder="例如：10"
                        style="width:72px;"
                        disabled
                      ></el-input>
                      <el-select
                        v-model="transGoods.greenSpaceRateSymbol1"
                        placeholder=">"
                        style="width:108px;"
                        disabled
                      >
                        <el-option label=">" value=">"></el-option>
                        <el-option label=">=" value=">="></el-option>
                        <el-option label="=" value="="></el-option>
                        <el-option label="<=" value="<="></el-option>
                        <el-option label="<" value="<"></el-option>
                      </el-select>
                      <span style="margin:0 5px;color:#606266;">绿地率</span>
                      <!-- <el-input v-model="null"  placeholder="例如：10" style="width:72px;"></el-input>
                          <el-select v-model="null" placeholder=">" style="width:108px;">
                              <el-option label=">" value=">"></el-option>
                              <el-option label=">=" value=">="></el-option>
                              <el-option label="=" value="="></el-option>
                              <el-option label="<=" value="<="></el-option>
                              <el-option label="<" value="<"></el-option>
                          </el-select> -->
                    </el-form-item>
                  </li>
                  <!-- 建筑密度% -->
                  <li>
                    <el-form-item label="建筑密度%：" style="width:625px;">
                      <el-input
                        v-model="ruleForm.buildingDensity"
                        placeholder="例如：10"
                        style="width:72px;"
                        disabled
                      ></el-input>
                      <el-select
                        v-model="ruleForm.buildingDensitySymbol1"
                        placeholder=">"
                        style="width:108px;"
                        disabled
                      >
                        <el-option label=">" value=">"></el-option>
                        <el-option label=">=" value=">="></el-option>
                        <el-option label="=" value="="></el-option>
                        <el-option label="<=" value="<="></el-option>
                        <el-option label="<" value="<"></el-option>
                      </el-select>
                      <span style="margin:0 5px;color:#606266;">建筑密度</span>
                      <!-- <el-input v-model="ruleForm.buildingDensity2"  placeholder="例如：10" style="width:72px;"></el-input>
                        <el-select v-model="ruleForm.buildingDensitySymbol2" placeholder=">" style="width:108px;">
                            <el-option label=">" value=">"></el-option>
                            <el-option label=">=" value=">="></el-option>
                            <el-option label="=" value="="></el-option>
                            <el-option label="<=" value="<="></el-option>
                            <el-option label="<" value="<"></el-option>
                        </el-select> -->
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="建筑限高：">
                      <el-input
                        v-model="transGoods.heightLimit"
                        size="small"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </li>
                  <!-- 
                  <li>
                    <el-form-item label="划拨决定书号：">
                      <el-input v-model="transGoods.unitNum" size="small" disabled></el-input>
                      <span>元</span>
                    </el-form-item>
                  </li>
                  <li>
                    划拨决定书号:
                    {{transGoods.buildArea}}
                  </li>
                  <li>
                    绿地率%:
                    {{transGoods.greenSpaceRateSymbol1}} {{transGoods.greenSpaceRate}}
                  </li>

                  <li>
                    建筑结构:
                    {{transGoods.buildingStructureName}}
                  </li>
                  <li>
                    建筑限高:
                    {{transGoods.heightLimit}}
                  </li> -->

                  <div class="publish_main_cont_table">
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
                  </div>
                </ul>
              </div>
            </EPF-switchTitle>
            <!-- 11111111111111111111111111111111111111 -->
            <EPF-switchTitle titles_h="申请人信息">
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <ul class="publish_mainUl">
                    <li>
                      权属人性质:
                      {{ transTrustInfo.ownerShipNature }}
                    </li>
                    <li>
                      名称:
                      {{ transTrustInfo.ownerShip }}
                    </li>
                    <li>
                      证件种类:
                      {{ transTrustInfo.identificationType }}
                    </li>
                    <li>
                      证件号:
                      {{ transTrustInfo.identificationNum }}
                    </li>
                    <li>
                      地址:
                      {{ transTrustInfo.address }}
                    </li>
                    <li>
                      权属人联系电话:
                      {{ transTrustInfo.phone }}
                    </li>

                    <li>
                      联系人/代理人:
                      {{ transTrustInfo.contact }}
                    </li>
                    <li>
                      联系人/代理人身份证号:
                      {{ transTrustInfo.idCard }}
                    </li>
                    <li>
                      联系人/代理人联系电话:
                      {{ transTrustInfo.contactPhone }}
                    </li>
                    <li>
                      联系人/代理人联系地址:
                      {{ transTrustInfo.contactAddress }}
                    </li>
                  </ul>
                </div>
              </div>
            </EPF-switchTitle>
            <!-- 222222222222222222222222    -->
            <EPF-switchTitle titles_h="附件上传">
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <div class="additional additionalInfo">
                    <div class="additional_title">
                      <span>附加信息</span>
                      <ul>
                        <li>新增</li>
                        <li>修改</li>
                        <li>删除</li>
                      </ul>
                    </div>
                    <div class="additional_cont">
                      <el-tree
                        :data="datafu"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                      ></el-tree>
                    </div>
                  </div>
                  <div class="additional additionalList">
                    <div class="additional_title">
                      <span>附加列表</span>
                      <ul>
                        <li>上传</li>
                      </ul>
                    </div>
                    <div class="additional_cont">
                      <el-table :data="additionalData" style="width: 100%;">
                        <el-table-column
                          prop="fileName"
                          label="文件名称"
                        ></el-table-column>
                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button
                              @click="handleClick(scope.row)"
                              type="text"
                              size="small"
                              >下载</el-button
                            >
                            <el-button type="text" size="small">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div style="clear:both;"></div>
                </div>
              </div>
            </EPF-switchTitle>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Map from "../../../../components/tianditu/tianditu.vue";
export default {
  components: {},
  data() {
    return {
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
        endDate: "2018-12-12",
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
        // 是否连同地上建筑物、其他附着物
        adjunct: "是",
        resource1: "是",
        resource2: "是",
        // 建筑面积
        buildArea: "",
        // 建筑结构
        buildingStructure: "",
        landusePresentSituate: "",
        remark: ""
      },
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
      dialogVisibleMap: false, //地图找地对话框，
      longitude: "",
      latitude: ""
    };
  },
  created() {
    //  console.log(this.$route.query.id)
    this.getItemData(this.$route.query.id);
  },
  //   async beforeRouteEnter(to, from, next) {
  //     const data=await axios.get(
  //         "/epf-trade/admin/transgoods/getTransGoods",
  //         { params: { id:to.query.id } }
  //       );
  //       console.log(data)
  //         next(vm=>{
  //          vm.transGoods=data.transGoods;
  //      })
  //  },
  methods: {
    getItemData: async function(id) {
      const data = await this.$get(
        "/epf-trade/admin/transgoods/getTransGoods",
        { id: id }
      );
      if (!data) {
        return;
      }
      this.transGoods = data.transGoods;

      if (
        data.transGoods.mapIdentification &&
        data.transGoods.mapIdentification.split(",").length == 2
      ) {
        this.longitude = parseFloat(
          data.transGoods.mapIdentification.split(",")[0]
        );
        this.latitude = parseFloat(
          data.transGoods.mapIdentification.split(",")[1]
        );
      }
      if (
        data.transGoods.mapIdentification &&
        data.transGoods.mapIdentification.split(" ").length == 2
      ) {
        this.longitude = parseFloat(
          data.transGoods.mapIdentification.split(" ")[0]
        );
        this.latitude = parseFloat(
          data.transGoods.mapIdentification.split(" ")[1]
        );
      }

      this.transGoods.isDevelope == 1
        ? (this.transGoods.isDevelope = "否")
        : (this.transGoods.isDevelope = "是");
      this.transGoods.isPercent == 1
        ? (this.transGoods.isPercent = "是")
        : (this.transGoods.isPercent = "否");
      this.transTrustInfo = data.transTrustInfo;
      console.log(this.transGoods);
      console.log(this.transTrustInfo);
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
    handleNodeClick() {},
    onSelected(data) {
      this.temp.address__province = data.province.value;
      this.temp.address__city = data.city.value;
      this.temp.address__dist = data.area.value;
    }
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
</style>
<style>
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
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  /* width: 100%; */
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
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
