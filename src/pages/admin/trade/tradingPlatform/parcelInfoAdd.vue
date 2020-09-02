<template>
<div class="page-body">
  <div class="filter_wrap">
    <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="step">
            <el-steps :active="active" finish-status="success">
              <el-step title="委托人信息111111111111111"></el-step>
              <el-step title="地块基本信息"></el-step>
              <el-step title="附件信息"></el-step>
            </el-steps>
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
            >
            <div class="firststep" v-if="active===0">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">委托人信息</h2>
              </div>
              <div class="publish_main_cont">
                <ul class="publish_mainUl">
                  <li>
                    <el-form-item label="权属人性质：" required>
                      <el-select v-model="ruleForm.ownerShipNature" style="width:360px;">
                        <el-option label="权属人性质1" value="权属人性质1"></el-option>
                        <el-option label="权属人性质2" value="权属人性质2"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="名称：" prop="ownerShip">
                        <el-input v-model="ruleForm.ownerShip" style="width:360px;" placeholder="请输入名称"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="证件种类：" required>
                      <el-select v-model="ruleForm.identificationType" style="width:360px;">
                        <el-option label="身份证" value="身份证"></el-option>
                        <el-option label="工作证" value="工作证"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="证件号：" prop="identificationNum">
                        <el-input v-model="ruleForm.identificationNum" style="width:360px;" placeholder="请输入证件号"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="权属人联系电话：" prop="phone">
                        <el-input v-model="ruleForm.phone" style="width:360px;" placeholder="请输入权属人联系电话"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="地址：" prop="address">
                        <el-input v-model="ruleForm.address" style="width:360px;" placeholder="请输入地址"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系人/代理人：">
                        <el-input v-model="ruleForm.contact" style="width:360px;" placeholder="请输入联系人/代理人"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系人/代理人身份证：" prop="contactsID">
                        <el-input v-model="ruleForm.contactsID" style="width:360px;" placeholder="请输入联系人/代理人身份证"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系人/代理人联系电话：">
                        <el-input v-model="ruleForm.contactPhone" style="width:360px;" placeholder="请输入联系人/代理人联系电话"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item label="联系人/代理人联系地址：">
                        <el-input v-model="ruleForm.contactAddress" style="width:360px;" placeholder="请输入联系人/代理人联系地址"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="operfirst">
                <el-button type="danger" @click="next">下一步</el-button>
              </div>
            </div>
            <div class="Secondstep" v-if="active===1">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">地块基本信息</h2>
              </div>
              <div class="publish_main_cont">
                  <ul class="publish_mainUl">
                    <li>
                      <el-form-item label="流转方式：">
                        <el-select v-model="ruleForm.circulation" style="width:360px;" placeholder="请选择流转方式">
                            <el-option label="土地转让" value="土地转让"></el-option>
                            <el-option label="土地出租" value="土地出租"></el-option>
                            <el-option label="土地抵押" value="土地抵押"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="区域：" required>
                          <v-distpicker v-show="isShowProvince" :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist" @selected="onSelected" width="70px;"></v-distpicker>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地编号：" prop="titleNum">
                          <el-input v-model="ruleForm.titleNum" style="width:360px;" placeholder="请选择土地编号"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="转让土地面积(M2)：" prop="area">
                        <el-input v-model="ruleForm.area" style="width:360px;" placeholder="请输入土地面积"></el-input>
                        <span style="margin-left:20px;">m2</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="转让年限：">
                        <el-input v-model="ruleForm.trayear" style="width:360px;" placeholder="请输入转让年限"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地用途：" required>
                        <el-select v-model="ruleForm.landuse1" placeholder="请选择土地一级用途" style="width:178px;">
                            <el-option label="土地用途11" value="土地用途11"></el-option>
                            <el-option label="土地用途12" value="土地用途12"></el-option>
                            <el-option label="土地用途13" value="土地用途13"></el-option>
                        </el-select>
                        <el-select v-model="ruleForm.landuse2" placeholder="请选择土地二级用途" style="width:178px;">
                            <el-option label="土地用途21" value="土地用途21"></el-option>
                            <el-option label="土地用途22" value="土地用途22"></el-option>
                            <el-option label="土地用途23" value="土地用途23"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地使用权使用权截止日期：" required>
                        <el-col :span="11" style="width:360px;">
                          <el-form-item>
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地性质：" required>
                          <el-radio-group v-model="ruleForm.landChar">
                              <el-radio label="国有建设用地"></el-radio>
                              <el-radio label="集体建设用地"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="使用权类型：" required>
                        <el-select v-model="ruleForm.useType" placeholder="请选择土地一级用途" style="width:360px;">
                            <el-option label="划拨" value="划拨"></el-option>
                            <el-option label="出让" value="出让"></el-option>
                            <el-option label="作价出资" value="作价出资"></el-option>
                            <el-option label="授权经营" value="授权经营"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号类型：" required>
                        <el-radio-group v-model="ruleForm.warrantNumType">
                          <el-radio label="不动产证号"></el-radio>
                          <el-radio label="土地证号"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="登记机构：" required>
                          <el-select v-model="ruleForm.registrationName" placeholder="该行政区域的不动产登记机构"  style="width:360px;">
                            <el-option label="登记机构1" value="登记机构1"></el-option>
                            <el-option label="登记机构2" value="登记机构2"></el-option>
                            <el-option label="登记机构3" value="登记机构3"></el-option>
                            <el-option label="登记机构4" value="登记机构4"></el-option>
                          </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="建设用地使用权出让合同：">
                          <el-input v-model="ruleForm.contactNum" style="width:360px;" placeholder="请选择土地编号"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="不动产单元号：">
                          <el-input v-model="ruleForm.unitNum"  placeholder="请输入不动产单元号 " style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="权证号：" prop="warrantNum">
                          <el-input v-model="ruleForm.warrantNum"  placeholder="例如：浙（2017)德清县不动产第0018185号" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地坐落：" prop="location">
                        <el-input v-model="ruleForm.location"  placeholder="请输入土地详细信息，例如：山西省太原市小店区荣军街112号" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="东至：" prop="east">
                        <el-input v-model="ruleForm.east" placeholder="东至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="南至：" prop="west">
                        <el-input v-model="ruleForm.west" placeholder="南至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="西至：" prop="south">
                          <el-input v-model="ruleForm.south" placeholder="西至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="北至：" prop="north">
                          <el-input v-model="ruleForm.north" placeholder="北至***路" style="width:360px;"></el-input>
                      </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="绿地率%：">
                            <el-input v-model="ruleForm.greenSpaceRate"  placeholder="例如：10" style="width:72px;"></el-input>
                            <el-select v-model="ruleForm.greenSpaceRateSymbol1" placeholder=">" style="width:108px;">
                                <el-option label=">" value=">"></el-option>
                                <el-option label=">=" value=">="></el-option>
                                <el-option label="=" value="="></el-option>
                                <el-option label="<=" value="<="></el-option>
                                <el-option label="<" value="<"></el-option>
                            </el-select>
                            <span style="margin:0 17px;color:#606266;">绿地率</span>
                            <el-input v-model="ruleForm.greenSpaceRate2"  placeholder="例如：10" style="width:72px;"></el-input>
                            <el-select v-model="ruleForm.greenSpaceRateSymbol2" placeholder=">" style="width:108px;">
                                <el-option label=">" value=">"></el-option>
                                <el-option label=">=" value=">="></el-option>
                                <el-option label="=" value="="></el-option>
                                <el-option label="<=" value="<="></el-option>
                                <el-option label="<" value="<"></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="地图标注：">
                        <el-input v-model="ruleForm.coordinate" placeholder="地图标注以后，自动获取坐标" style="width:360px;"></el-input>
                        <div class="findland_input"  @click="dialogVisibleMap = true">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADGUlEQVRIS5WWacjmYxTGf78s2Wps0yBZyjaYMj5MRsYQGTTNt5Hl01CMD0pqRrZCyBIlu2TIUlIKEYoMsmQtsswgQraSyVqWo2u6n7f/+3+f5XXqqadz3+e+znXd55z7LxOsquYDxwML2+8AYAPwLvAO8Lz60bhjHLVYVVsCFwOXAfkf+wP4GDgI2Lb5/gauBK5R/xl23lCQqtofeKRl/jVwI/BKss9BLYHDgCXABcCewJvAqernfaAZIFW1MxD6uwK3ho362xjGOwBXA+cBPwLz1Z+6+4eBPAScDixTn5t0Z4P1qloGPAM8rJ4xEqSqTgKeBu5Uz50tQAfoLuBsYLn61MA/jUlVvQjsAxzSl6iq9gNOARYD3wD3q691E6mqSPcJsFE9ZgZIu8xfgOvUy3vBxwJPAFsBHwIHAlsD56j39vZeAawB5qh/ZW2KSVUtAt4AVqhPdiTYqWUelqepm1rGjwFLgYPVzzr7VwCPA4vUVNw0kJRiSnUP9dtO0CXAVcA89YeOf3fgK+Ba9dKOP+Uc//nqzX2Qm3JpanSdsqq6BVjV92dDVf0L3K2u7sWkae9Qk/g0JquA6LtLt86r6sJkCxytvtzJ+ATgWWCtekPHvxsQJc5U1/VBDgfeBk5UE7zZqmrHRv9n4Dh1Q1WdDDwAbAfspaYJB/sHbbBQfa8PkmoJzYvU63v0lwP3hWXHn65Ow77V25t5l+rcfkZ1tazvAVLfh6p/9oIzbtLJAfodWNdl0OK3AT4A1qtnDeL7zZh5tRF4UM0s+l9WVbe1kbSvGnk327DZlXFye9P/hdmiVFUaNvtXqxkvUzYMJL7onMdpqZqHaaxVVYpmfZsGR6g1FqRpOxd4CUjDLVHfH4VSVQuAlHbKNmU+VWkj5RosVNUAaB5wpJoXcZpVVV7IV4HvRwEMvZNeRQUoh8xpQJ92kshUztqmtjaDwUQmncPSwZEj42ax+kVV5TnImP+1yfnduEsb+SHRYxSg14EtgJXAo0A+GnLJYwEmytUDynTNx8TewJfAUWo+MibarJh0pAtQWKycLUBi/wOldEAphxvUzAAAAABJRU5ErkJggg==" alt="">
                            <span>地图找地</span>
                        </div>
                        <el-dialog
                          id="publishLandMapDialog"
                          :visible.sync="dialogVisibleMap"
                          @close="dialogVisibleMap = false"
                          title="地图找地">
                          <v-Map style="height:500px" :Dlongitude="longitude" :Dlatitude="latitude" v-if="dialogVisibleMap"></v-Map>
                        </el-dialog>
                      </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="建筑密度%：">
                            <el-input v-model="ruleForm.buildingDensity"  placeholder="例如：10" style="width:72px;"></el-input>
                            <el-select v-model="ruleForm.buildingDensitySymbol1" placeholder=">" style="width:108px;">
                                <el-option label=">" value=">"></el-option>
                                <el-option label=">=" value=">="></el-option>
                                <el-option label="=" value="="></el-option>
                                <el-option label="<=" value="<="></el-option>
                                <el-option label="<" value="<"></el-option>
                            </el-select>
                            <span style="margin:0 10px;color:#606266;">建筑密度</span>
                            <el-input v-model="ruleForm.buildingDensity2"  placeholder="例如：10" style="width:72px;"></el-input>
                            <el-select v-model="ruleForm.buildingDensitySymbol2" placeholder=">" style="width:108px;">
                                <el-option label=">" value=">"></el-option>
                                <el-option label=">=" value=">="></el-option>
                                <el-option label="=" value="="></el-option>
                                <el-option label="<=" value="<="></el-option>
                                <el-option label="<" value="<"></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="容积率%：">
                          <el-input v-model="ruleForm.plotRatio"  placeholder="例如：20" style="width:72px;"></el-input>
                          <el-select v-model="ruleForm.region5" placeholder="一级用途" style="width:108px;">
                              <el-option label=">" value=">"></el-option>
                              <el-option label=">=" value=">="></el-option>
                              <el-option label="=" value="="></el-option>
                              <el-option label="<=" value="<="></el-option>
                              <el-option label="<" value="<"></el-option>
                          </el-select>
                          <span style="margin:0 10px;">容积率</span>
                          <el-input v-model="ruleForm.name3"  placeholder="例如：20" style="width:72px;"></el-input>
                          <el-select v-model="ruleForm.region6" placeholder="一级用途" style="width:108px;">
                              <el-option label=">" value=">"></el-option>
                              <el-option label=">=" value=">="></el-option>
                              <el-option label="=" value="="></el-option>
                              <el-option label="<=" value="<="></el-option>
                              <el-option label="<" value="<"></el-option>
                          </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="房屋建设工程是否完成投资总额的25以上：" prop="resource1" label-width="285px!important" style="margin-left:85px;">
                          <el-radio-group v-model="ruleForm.resource1">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="是否连同地上建筑物、其他附着物：">
                          <el-radio-group v-model="ruleForm.adjunct">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="建筑面积：">
                          <el-input v-model="ruleForm.buildArea"  placeholder="例如：3000.11" style="width:360px;"></el-input>
                          <span style="margin-left:20px;">平方米</span>
                      </el-form-item>
                    </li>
                    <!-- <li>
                      <el-form-item label="土地成片开发是否形成工业用地或其他建设用费条件：" prop="resource2" label-width="350px!important" style="margin-left:85px;">
                          <el-radio-group v-model="ruleForm.resource2">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </li> -->
                    <li>
                      <el-form-item label="建筑限高：">
                        <el-input v-model="ruleForm.heightLimit"  placeholder="例如：20" style="width:360px;"></el-input>
                        <span style="margin-left:20px;">米</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="建筑结构：">
                          <el-select v-model="ruleForm.buildingStructure" placeholder="请选择建筑结构" style="width:360px;">
                            <el-option label="钢筋混凝土" value="钢筋混凝土"></el-option>
                            <el-option label="工作证" value="工作证"></el-option>
                          </el-select>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="拟转让总价：">
                        <el-input v-model="ruleForm.price" :placeholder="'拟转让总价,例如：1000.20，不填则显示面议'" style="width:360px;"></el-input>
                        <span style="margin-left:20px;">万元</span>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item label="土地等级：">
                          <el-select v-model="ruleForm.buildingStructure" placeholder="请选择建筑结构" style="width:360px;">
                            <el-option label="土地等级1" value="土地等级1"></el-option>
                            <el-option label="土地等级2" value="土地等级2"></el-option>
                          </el-select>
                      </el-form-item>
                    </li>
                  </ul>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">土地利用现状</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-input type="textarea" maxlength="2000" minlength="0" show-word-limit autosize v-model="ruleForm.landusePresentSituate" placeholder="请输入说明" style="width:95%;height:160px;"></el-input>
                </div>
              </div>
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">其他说明事项</h2>
              </div>
              <div class="publish_main_cont">
                <div class="publish_main_cont_table">
                  <el-input type="textarea" maxlength="2000" minlength="0" show-word-limit autosize v-model="ruleForm.remark" placeholder="请输入说明" style="width:95%;height:160px;"></el-input>
                </div>
              </div>
              <div class="operfirst" style="margin-left:0;">
                <el-button type="danger" @click="next">下一步</el-button>
                <el-button type="danger" @click="prev">上一步</el-button>
              </div>
            </div>
            <div class="thirdstep" v-if="active===2">
              <div class="publish_main_title">
                <div class="publish_title_icon f-left"></div>
                <h2 class="title f-left">附件上传</h2>
              </div>
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
                      <el-tree :data="datafu" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                      <el-table
                        :data="additionalData"
                        style="width: 100%;">
                        <el-table-column
                          prop="fileName"
                          label="文件名称">
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
                            <el-button type="text" size="small">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div style="clear:both;"></div>
                </div>
              </div>
              <div class="operfirst" style="margin-left:0;">
                <el-button type="danger" style="width:84px;">保存</el-button>
                <el-button type="danger" @click="prev">上一步</el-button>
              </div>
            </div>
          </el-form>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import Map from '../../../../components/tianditu/tianditu.vue'
export default {
  components: {},
  data() {
    return {
      active:0,
      foldshow1:true,
      foldshow2:true,
      foldshow3:true,
      foldshow4:true,
      foldshow5:true,
      txtVal:0,
      txtVal1:0,
      datafu: [],
      additionalData:[{fileName:'挂牌文件'}],
      defaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictValue'
      },
      temp: {
          address__province: '山西省',
          address__city: '太原市',
          address__dist: '小店区',
      },
      isShowProvince:true,
      dialogVisible: false,
      ruleForm: {
        ownerShipNature:"权属人性质1",//权属人性质
        ownerShip:"",//权属人名字
        identificationType:"身份证",//证件种类
        identificationNum:"",//证件号
        address:"",//地址
        phone:"",//权属人联系电话
        contact:"",//联系人/代理人姓名
        contactsID:"",//联系人/代理人身份证号
        contactPhone:"",//联系人/代理人电话
        contactAddress:"",//联系人/代理人地址
        //流转方式：
        circulation : "土地转让",
        titleNum:'',
        // 转让、出租、抵押面积
        area:"",
        trayear:'',
        // 土地用途
        landuse:'',
        landuse1:'',
        landuse2:'',
        // 使用权截止日期
        endDate:"2018-12-12",
        // 土地性质
        landChar: "国有建设用地",
        // 使用权类型：
        useType:"划拨",
        // 权证号类型
        warrantNumType:"不动产证号",
        // 登记机构
        registrationName:"登记机构1",
        // 建设用地使用权出让合同
        contactNum:'',
        // 不动产单元号
        unitNum:"",
        east:"",
        west:"",
        south:"",
        north:"",
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
        coordinate:"",
        // 拟转让、出租、抵押价格
        //容积率
        plotRatio:"",
        plotRatio2:"",
        plotRatioSymbol1:"",
        plotRatioSymbol2:"",
        //建筑限高
        heightLimit:"",
        // 是否连同地上建筑物、其他附着物
        adjunct:"是",
        resource1:"是",
        resource2:"是",
        // 建筑面积
        buildArea:"",
        // 建筑结构
        buildingStructure:"",
        landusePresentSituate:'',
        remark:'',
      },
      rules: {
        ownerShip: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        identificationNum:[
            { required: true, message: "请输入证件号", trigger: "blur" },
            { min: 18,max: 18,message: "您输入的证件号有误",trigger: "blur"}
        ],
        address: [{ required: true, message: "请输入联系地址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        contact: [{ required: true, message: "请输入联系人/代理人姓名", trigger: "blur" }],
        contactPhone: [{ required: true, message: "请输入联系人/代理人电话", trigger: "blur" }],
        titleNum: [{ required: true, message: "请输入土地编号", trigger: "blur" }],
        area: [{ required: true, message: "请输入面积", trigger: "blur" }],
        contactNum: [{ required: true, message: "请输入合同号", trigger: "blur" }],
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
      dialogVisibleMap:false,//地图找地对话框
      longitude:'',
      latitude:''
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev(){
      if (this.active-- < 0) this.active = 2;
    },
    handleNodeClick(){

    },
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    }
  },
  components: {
      "v-Map":Map
  },
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
      .step{
        box-sizing: border-box;
        padding:24px 0;
      }
      .operfirst{
        margin-left: 175px;
        button{
          background: rgb(255, 160, 0);
          border: 1px solid rgb(255, 160, 0);
        }
        .del{
          background:#fff;
          color:#666666;
          border: solid 1px #e0dfdf;
        }
      }
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
        &_table{
          width:100%;
          margin:30px 0;
          .additional{
            width:100%;
            &_title{
              @include size(100%, 50px);
              background-color: #f9fafc;
              box-sizing: border-box;
              padding: 0 15px;
              span{
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                line-height: 50px;
              }
              ul{
                float: right;
                margin-top:9px;
                li{
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
                  &:nth-child(1){
                    color:#ffa000;
                    border: solid 1px #ffa000;
                  }
                }
              }
            }
            &_cont{
              @include size(100%, 500px);
              border:1px solid #f3f3f3;
              border-top:none;
            }
          }
          .additionalInfo{
            float: left;
            @include size(34%, 600px);
            margin-right: 1%;
          }
          .additionalList{
            float: left;
            @include size(65%, 600px);
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
          @include size(94px,40px);
          background-color: #ffa000;
          border-radius: 3px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          display: inline-block;
          margin-left: 24px;
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
}
</style>
<style>
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
    padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header{
    padding-top:10px;
    padding-bottom: 0px;
    text-align:center;
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
  .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
  }
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
  }
  .el-textarea .el-textarea__inner{
    width:100%;height:100%!important;
  }
  .el-step__icon{
    width:34px;
    height:34px;
  }
  .el-step.is-horizontal .el-step__line{
    top:17px;
  }
  .el-step__head.is-process,.el-step__head.is-success{
    color: #ffa000;
    border-color: #ffa000;
  }
  .el-step__title.is-process,.el-step__title.is-success{
    color: #ffa000;
  }
  .el-table__row td:nth-child(1) div{
    color: #4671d5;
  }
</style>
