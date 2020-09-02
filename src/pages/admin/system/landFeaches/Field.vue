<template>
	<div class="p24 bg1">
		<div class="content">
			<div class="tit">
				<span>地源表单配置</span>
			</div>
			<el-row>
  				<el-col :span="j_zuo1">
  					<div class="j_left position_relative">
						<div class="j_leftTit">地区选择</div>
						<div style="padding: 24px 10px;">
							<el-tree :data="jCity" :props="props" show-checkbox @node-click="jCityClick" :accordion="true" @check="jCityClick" ref="tree" node-key="id" ></el-tree>
						</div>
						<i class="el-icon-s-fold j_click1" v-show="isWidth1" @click="jShrink(1)"></i>
					</div>
  				</el-col>
  				<i class="el-icon-s-unfold j_click0" v-show="!isWidth1" @click="jOpen(1)"></i>
  				<el-col :span="j_you1">
  					<div class="j_right">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<div class="j_first" v-show="configSome">
								<el-alert title="列表种字段别称，长度，是否必填，单位，所在信息分组可进行编辑，VALUE,字段列表，字段类型，控件类型不可编辑。"></el-alert>
								<div>
									<el-button type="primary" :class="{'activeGrey' : greyFlag1 == true}" @click="jAlert('确定与省级配置同步?','1')">与省级配置同步</el-button>
									<el-button type="primary" :class="{'activeGrey' : greyFlag2 == true}"  @click="jAlert('确定复制省级配置?','2')">复制省级配置</el-button>
								</div>
							</div>
							<!-- ---------------------转让----------------------------------------------------------------------------------- -->
						    <el-tab-pane label="转让字段" name="first">
						    	<div class="j_top" v-if="statusCode == '1111'">
									<el-row :gutter="10">
									  	<el-col :span="20">
									  		<el-alert title="同步或者复制后，字段自动填入并覆盖原有字段" :closable="false"></el-alert>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定与省级配置同步?','1')">与省级配置同步</button>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定复制省级配置?','2')">复制省级配置</button>
									  	</el-col>
									</el-row>
						    	</div>
						    	<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}基础字段配置</span>
									<span class="j_t3">
										<span v-show="isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(1)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(1)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight1"  class="j_table" style="overflow:auto">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%;">
									  			<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,1)" >修改</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice1">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
								  	</el-col>
									<div  v-if="configSome && !tableData && tableData == []" class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}扩展字段配置</span>
									<span class="j_t3">
										<el-button type="primary" size="small" v-show="!isEditBtn || (tableData2 && tableData2 == [])" @click="jAdd" >添加字段</el-button>
										<span v-show="isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(2)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(2)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight2"  class="j_table" style="overflow-x:auto">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData2" border>
									  			<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData2" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column  v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,2)" >修改</el-button>
																<span style="color:#eee">|</span>
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="deleteFun('您确定要移除此字段吗？',scope.row.id)" >移除</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice2">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
								  	</el-col>
									<div  v-if="configSome && !tableData2 && tableData2 ==[]" class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<el-button type="primary" v-show="!(!isEditBtn || (tableData2 && tableData2.length == 0)) "  @click="isEditBtn = false,isEdit = true">编辑</el-button>
								<el-button type="warning" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="getEdit()">确认</el-button>
								<el-button type="info" @click="preview">预览</el-button>
								<el-button v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="noEdit">取消</el-button>
						    </el-tab-pane>
							<!-- ---------------------出租----------------------------------------------------------------------------------- -->
						    <el-tab-pane label="出租字段" name="second">
						    	<div class="j_top" v-if="statusCode == '1111'">
									<el-row :gutter="10">
									  	<el-col :span="20">
									  		<el-alert title="同步或者复制后，字段自动填入并覆盖原有字段" :closable="false"></el-alert>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定与省级配置同步?','1')">与省级配置同步</button>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定复制省级配置?','2')">复制省级配置</button>
									  	</el-col>
									</el-row>
						    	</div>
						    	<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}基础字段配置</span>
									<span class="j_t3">
										<span v-show="isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(1)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(1)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight1" class="j_table">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%">
									  			<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,1)" >修改</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice1">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
								  	</el-col>
									<div  v-if="configSome && !tableData && tableData ==[] " class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}扩展字段配置</span>
									<span class="j_t3">
										<el-button type="warning" size="small" v-show=" !isEditBtn || (tableData2 && tableData2.length == 0) "  @click="jAdd">添加</el-button>
										<span v-show="isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(2)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(2)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight2" class="j_table">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData2" border style="width: 100%" >
												<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData2" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column  v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,1)" >修改</el-button>
																<span style="color:#eee">|</span>
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="deleteFun('您确定要移除此字段吗？')" >移除</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice2">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
								  	</el-col>
									<div  v-if="configSome && !tableData2 && tableData2 == [] " class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<el-button type="primary" v-show="!(!isEditBtn || (tableData2 && tableData2.length == 0)) "  @click="isEditBtn = false">编辑</el-button>
								<el-button type="warning" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="getEdit()">确认</el-button>
								<el-button type="info" @click="preview">预览</el-button>
								<el-button v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="noEdit">取消</el-button>
						    </el-tab-pane>
							<!-- ---------------------抵押----------------------------------------------------------------------------------- -->
						    <el-tab-pane label="抵押字段" name="third">
						    	<div class="j_top" v-if="statusCode == '1111'">
									<el-row :gutter="10">
									  	<el-col :span="20">
									  		<el-alert title="同步或者复制后，字段自动填入并覆盖原有字段" :closable="false"></el-alert>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定与省级配置同步?','1')">与省级配置同步</button>
									  	</el-col>
									  	<el-col :span="2">
									  		<button @click="jAlert('确定复制省级配置?','2')">复制省级配置</button>
									  	</el-col>
									</el-row>
						    	</div>
						    	<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}基础字段配置</span>
									<span class="j_t3">
										<span v-show="isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(1)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(1)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight1" class="j_table">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%">
									  			<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column  v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,1)" >修改</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice1">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
								  	</el-col>
									<div  v-if="configSome && !tableData && tableData==[]" class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{cantonProvinceName}}{{cantonCityName}}{{cantonAreaName}}扩展字段配置</span>
									<span class="j_t3">
										<el-button type="warning" size="small" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) "  @click="jAdd">添加</el-button>
										<span v-show="isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(2)">收起 <i class="el-icon-arrow-down"></i></span>
										<span v-show="!isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(2)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight2" class="j_table">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData2" border style="width: 100%" >
									  			<el-table-column label="不可编辑字段属性">
													<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
														<template slot-scope="scope">
															<span style="color:#606266">{{scope.$index+1}}</span>
														</template>
													</el-table-column>
													<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
													<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
													<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData2" width="100%">
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column show-overflow-tooltip v-if="x=='字段别称'"  prop="alias" width="220" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="length" width="60" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='控件类型'" prop="texttypeName" width="80" label="控件类型"></el-table-column> 
														<el-table-column v-else-if="x=='是否必填'" prop="isNull" width="80" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位" width="60"></el-table-column>
														<el-table-column v-else-if="x=='所在信息分组'" width="180" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column> 
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">
																<span v-if="!isEdit || scope.row.id != j_sortId">
																	<span>{{scope.row.sort}}</span>
																	<i :style="{'color':isEditBtn?'':'#409eff'}" class="el-icon-edit" @click="jSort(scope.row.id,scope.$index)"></i>
																</span>
																<el-input v-if="isEdit && scope.row.id == j_sortId" style="border: 1px solid #e0dfdf;border-radius: 3px;line-height:24px;" v-model="j_edit">
																	<span slot="suffix" @click="getEditSort()" style="color:#4671d5;font-size:12px;margin-right:5px;">确定</span>
																	<span slot="suffix" @click="isEdit = false" style="color:#4671d5;font-size:12px;">取消</span>
																</el-input>
															</template>
														</el-table-column>
														<el-table-column  v-else-if="x=='操作'" label="操作" width="180">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,1)" >修改</el-button>
																<span style="color:#eee">|</span>
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="deleteFun('您确定要移除此字段吗？')" >移除</el-button>
																<el-popover
																	placement="bottom"
																	title="备注："
																	width="200"
																	trigger="click"
																	:content="scope.row.remarks">
																	<el-button slot="reference" type="text" size="mini">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</template>
														</el-table-column>
													</div>
												</el-table-column>
											</el-table>
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
												  	</span>
												  	<el-dropdown-menu slot="dropdown">
													    <el-dropdown-item>
													    	<span style="color: #5ba0e5;">恢复默认</span>
													    </el-dropdown-item>
													    <el-checkbox-group v-model="choice2">
														    <el-dropdown-item>
															    <el-checkbox label="字段别称" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="长度" name="type"></el-checkbox>
														    </el-dropdown-item>
															<el-dropdown-item>
															    <el-checkbox label="控件类型" name="texttypeName"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="是否必填" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="单位" name="type"></el-checkbox>
														    </el-dropdown-item>
												    		<el-dropdown-item>
															    <el-checkbox label="所在信息分组" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="排序" name="type"></el-checkbox>
														    </el-dropdown-item>
														    <el-dropdown-item>
															    <el-checkbox label="操作" name="type"></el-checkbox>
														    </el-dropdown-item>
													    </el-checkbox-group>
												  	</el-dropdown-menu>
												</el-dropdown>
											</div>
								  		</div>
										<div  style="text-align:center;font-size:16px;color:#666;line-height:30px;"> 同步或者复制后，字段自动填入并覆盖原有字</div>
								  	</el-col>
									<div  v-if="configSome && !tableData2 && tableData2 ==[]" class="copySome">同步或者复制后，字段自动填入并覆盖原有字</div>
								</el-row>
								<el-button type="primary" v-show="!(!isEditBtn || (tableData2 && tableData2.length == 0)) "  @click="isEditBtn = false">编辑</el-button>
								<el-button type="warning" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="getEdit()">确认</el-button>
								<el-button type="info" @click="preview">预览</el-button>
								<el-button v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="noEdit">取消</el-button>
						    </el-tab-pane>
						</el-tabs>
					</div>
  				</el-col>
			</el-row>
			<div class="j_alert">
				<el-dialog title="添加字段" :visible.sync="isShow" width="35%">
				  	<el-tabs v-model="tabIndex" type="card" @tab-click="tab">
					    <el-tab-pane label="扩展字段" name="first">
					    	<div style="padding: 20px 0;">
								 <el-transfer
								 	:titles="['扩展字段库', '已选扩展字段']"
									filterable
									:filter-method="filterMethod"
									filter-placeholder="请输入城市拼音"
									v-model="jDataChoice"
									:data="jData">
								</el-transfer>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="基础字段" name="second">
					    	<div style="margin: 20px 0;border-left: 1px solid #e6e6e6;border-top: 1px solid #e6e6e6;">
					    		<el-row>
					    			<el-col :span="24">
								  		<div class="j_tabList" style="font-weight: bold;background-color: #f5f7fa;">基础字段</div>
								  	</el-col>
								  	<template v-for="(x,index) in tableDataA" >
								  		<el-col :span="12" :key="index">
									  		<div class="j_tabList">{{x.name}}</div>
									  	</el-col>
								  	</template>
								</el-row>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
				  	<span slot="footer" class="dialog-footer">
				    	<el-button @click="isShow = false">关闭</el-button>
				    	<el-button @click="jChoice">确定</el-button>
				  	</span>
				</el-dialog>
			</div>
			<div class="j_alert1">
				<el-dialog title="修改" :visible.sync="isShow1" width="40%" @close="jClose">
					<el-alert title="提示：VALUE、字段名称、字段类型一单添加完成不可修改" :closable="false"></el-alert>
				  	<el-form ref="form" :model="form" label-width="110px" :inline="true" :rules="rules">
					  	<el-form-item label="VALUE:" prop="value">
						    <el-input v-model="form.value" placeholder="请输入" :disabled="amend==1?true:false"></el-input>
						</el-form-item>
						<el-form-item label="字段名称:" prop="name">
						    <el-input v-model="form.name" placeholder="请输入" :disabled="amend==1?true:false"></el-input>
						</el-form-item>
						<el-form-item label="字段类型:" prop="type">
							<el-select v-model="form.type" placeholder="请选择" :disabled="amend==1?true:false">
								<el-option v-for="(item,index) in dictionary.field_type" :ref="item.zhCn" 
									:id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.dictKey" :key="index">
							</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="控件类型:" prop="texttype">
							<el-select v-model="form.texttype" placeholder="请选择">
								<el-option v-for="(item,index) in dictionary.text_type" :ref="item.zhCn" 
									:id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.dictKey" :key="index">
								</el-option>
								</el-select>
						</el-form-item>
						<!-- <el-form-item label="分组标识:" prop="dicValue">
						    <el-select v-model="form.dicValue" placeholder="请选择">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item> -->
						<el-form-item label="字段别称:" prop="alias">
						    <el-input v-model="form.alias" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="长度:" prop="length">
						    <el-input v-model="form.length" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="是否必填:" prop="isNull">
						    <el-select v-model="form.isNull" placeholder="请选择">
						    	<el-option label="是" :value="Number(0)" selected="selected"></el-option>
					     		<el-option label="否" :value="Number(1)"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="单位:" prop="unit">
						    <el-input v-model="form.unit" placeholder="万元"></el-input>
						</el-form-item>
						<!-- <el-form-item label="所在信息分组:" prop="grouping">
						    <el-select v-model="form.grouping" placeholder="请选择">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item> -->
						<el-form-item label="备注:" prop="remarks">
						    <el-input type="textarea" placeholder="此处是备注" v-model="form.remarks"></el-input>
						</el-form-item>
						<el-form-item>
						    <el-button type="warning" @click="onSubmit('form')">保存</el-button>
						    <el-button @click="jClose">取消</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
			</div>
			<!-- <div class="j_alert2">
				<el-dialog title="修改排序" :visible.sync="isEdit" width="20%" center>
		        	<div style="padding: 0 20px;">
		        		<input type="number" v-model="j_edit" placeholder="请输入数字" style="border: 1px solid #999999;border-radius: 3px;width: 100%;padding-left: 10px;"/>
		        	</div>
				  	<span slot="footer" class="dialog-footer">
				    	<el-button @click="isEdit = false">取 消</el-button>
				    	<el-button type="primary" @click="getEditSort()">确 定</el-button>
				  	</span>
				</el-dialog>
			</div> -->
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState } from "vuex";
	import qs from 'qs'
	export default {
		data() {
			return {
				address:[],
				cantonProvince:'110000',
				cantonCity:'',
				cantonArea:'',
				cantonProvinceName:'',
				cantonCityName:'',
				cantonAreaName:'',
				props: {
					label: 'regionName',
					children: 'children'
				},
				j_zuo1: 3,
				j_you1: 21,
				j_zuo: 7,
				j_you: 17,
				activeName: 'first',
				tabIndex: 'first',
				tableData: [],
				tableData2: [],
				tableDataA:[],//基础字段
				choice1:["操作","字段别称", "长度", "是否必填", "控件类型", "单位", "所在信息分组", "排序"],
				choice2:["操作","字段别称", "长度", "是否必填", "控件类型", "单位", "所在信息分组", "排序"],
				isShow: false,
				isShow1: false,
				isWidth1: true,
				isWidth: true,
				isEdit: false,
				j_sortId:'',
				jData: [],
				jDataChoice: [],
				filterMethod(query, item) {
					return item.label.indexOf(query) > -1;
				},
				jCity: [],
				jCityName: '北京市',
        		j_edit: '',
      			//1 固定字段 2 扩展字段
				jState: '2',
     			// transfer  rental  rent  mortgage
        		jType: 'transfer',
				jCityCode: '000000',
				amend:0,
        		form:{
					value: '',
					name: '',//	字段名称
					type: '',//字段类型 【字典值】
					length:'',//字段长度
					proportion:2,//比例(小数位)
					isNull:null,//是否可为NULL, 0-TRUE 1-FALSE
					sort:0,//排序
					state:'',//	字段性质（1 固定字段 2 扩展字段）
					remarks: '',//备注
					alias: '',//别名
					texttype:"",//控件类型 
					unit: '',//单位
					circulation:[],
					landType:"",	
					system:[],//适用页面 
					tradeType:""
				},
				statusCode:'',
				rules: {
		          	value: [
		            	{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	name: [
		            	{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	type: [
		            	{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	alias: [
		          		{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	length: [
		          		{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	isNull: [
		          		{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	grouping: [
		          		{ required: true, message: '请选择', trigger: 'change' },
					],
		          	tradeType: [
		          		{ required: true, message: '请选择', trigger: 'change' },
					],
		          	landType: [
		          		{ required: true, message: '请选择', trigger: 'change' },
					],
					texttype: [
		          		{ required: true, message: '请选择', trigger: 'change' },
					],
					unit: [
		          		{  message: '请选择', trigger: 'change' },
					],
					system: [
		          		{  type:"array",required: true, message: '请至少选择一个适用页面', trigger: 'change' },
					],
					circulation: [
		          		{ type:"array",required: true, message: '请至少选择一个适用流转方式', trigger: 'change' },
					],
				  },
				  dictionary:{//字典码结果
						field_type:"",//字段类型      
						text_type:"",//文本框类型  
						supply_type:"",//地源分组标识
						trade_type:"",//交易分组标识
						trans_goods_channel:"",//所属系统
						flow_mode:""//流转方式
					},
				dicNum: 0, //字典循环下标
				dicRequest:['field_type','text_type','supply_type','trade_type','trans_goods_channel','flow_mode'],//字典码请求
				isEditBtn:true,//编辑,
				isHeight1:true,//基础字段列表展开收起
				isHeight2:true,//扩展字段列表展开收起
				RelationSort:[],//排序列表
				changeForm:{},
				isChangeFlag:false,
				configSome:false,
				greyFlag1:false,
				greyFlag2:false,
			}
		},
		created() {
			// 请求字典
			let reqArr = this.dicRequest.map((item,index,arr)=>{
					let reqFun = new Promise((resolve,reject)=>{
						this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,{}).then(res => {
							resolve(res);
						})
					})
					return reqFun
				})
				Promise.all(reqArr).then(res=>{
					console.log(res);
					let dicArr = res.map((item =>{
						console.log(item);
						let dicArr = item.dictionariesList.map((item => {
							return {
								dictKey:item.dictKey,
								zhCn:item.zhCn,
								id:item.id
							}
						}))
						return dicArr
					}));

					for(let item in this.dictionary){
						// console.log(dicArr[this.dicNum]);
						this.dictionary[item] = dicArr[this.dicNum];
						this.dicNum++;
					}
				this.dicFinsh = true;
				// console.log('字典结果',this.dictionary);
			});
			this.getCity();
			//请求默认基础字段 (state参数 1) 和 扩展字段列表 (state参数 2)
			this.getList(this.jState)
		},
		methods: {
    		...mapActions(["setTabsList"]),
			//获取扩展字段库和已选扩展以及基础字段
			getChoiceAll(e){
				this.$get(`/epf-field/transDicRelation/getTransDicRelation`, {
					circulation:this.jType,
					state: e,
					cantonProvince:this.cantonProvince,
					cantonCity:this.cantonCity,
					cantonArea:this.cantonArea,
				}).then(res => {
					// console.log(res)
					//基础字段
					if( e == 2){
						let data = [];
						res.transDicRelation.transDicEntity.forEach((x, index) => {
							data.push({
								label: x.name,
								key: x.id,
							});
						});
						this.jData = data;
						res.transDicRelation.transDicEntity.map((item,index)=>{
							res.transDicRelation.relationEntity.map((i,v)=>{
								if( item.name === i.name){
									this.jDataChoice.push(item.id)
								}
							})
						})
						this.jState = 1
						this.getChoiceAll(this.jState)
					}else{
						this.tableDataA =  res.transDicRelation.transDicEntity
					}
				});
			},
			//获取列表
			getList(e){
				this.$get(`/epf-field/transDicRelation`, {
					pageNo:1,
					pageSize:200,
					state: e,
					cantonProvince:this.cantonProvince,
					cantonCity:this.cantonCity,
					cantonArea:this.cantonArea,
					circulation:this.jType
				}).then(res => {
					// console.log(res)
					if(res.code == '0'){
						if(e == 2){
							this.tableData2 = res.pager.results;
							this.jState = 1
							this.getList(this.jState)
						}else{
							this.tableData = res.pager.results;
						}
					}
				});
			},
			//流转方式选项卡切换
			handleClick(tab) {
		        if (tab.index == 0){
		        	//transfer  rental  rent  mortgage
        			this.jType = 'transfer'
		        } else if(tab.index == 1){
		        	this.jType = 'rent'
		        } else {
		        	this.jType = 'mortgage'
				}
				this.jState = this.jState == 1 ? 2 : 2
				this.getChoiceAll(this.jState)
				this.getList(this.jState);
			},
			//排序弹窗
			jSort(e){
				//清空值
				this.j_edit = '';
				//获取id
				this.j_sortId = e;
				//显示弹窗
				this.isEdit = true;
			},
		   	//点击确认排序
			getEdit(){
				let RelationSort = this.RelationSort
				this.$useAppend(`/epf-field/transDicRelation/updateTransDicRelationSort`, { RelationSort }).then(res => {
					if (res.code == '0'){
						//提示成功
						this.$message({
				         	message: '添加成功',
				          	type: 'success'
				        });
						//重新请求列表
						this.jState = 2
						this.getChoiceAll(this.jState)
						this.getList(this.jState);
					}
				})
			},
			getEditSort(){
				console.log(this.j_sortId)
				console.log(this.j_edit)
				//判断是否为空
				if (!this.j_edit){
					this.$message.error('请输入内容');
					return false;
				}
				this.isEdit = false;
				let editItem = ""
				editItem = this.tableData.find(item=> { return this.j_sortId == item.id })
					if(editItem){
						editItem.sort = Number(this.j_edit)
					}else{
						editItem = this.tableData2.find(item=> { return this.j_sortId == item.id })
						editItem.sort = Number(this.j_edit)
				}
				let obj  = {
					id : this.j_sortId,
					sort : this.j_edit
				}
				let flag = ""
				let indexE = ""
				if( this.RelationSort && this.RelationSort.length <= 0 ){
					flag = true
				}else if(this.RelationSort && this.RelationSort.length > 0 ){
					this.RelationSort.filter((item,index,arr)=>{
						if(item.id == obj.id){
							flag = false
							indexE = index
						}else{
							flag = true
						}
					})
				}
				if(flag){
					this.RelationSort.push(obj)
				}else{
					this.RelationSort[indexE].sort = obj.sort
				}
			},
			//点击添加
			jAdd(){
				if(this.cantonProvince == "" && this.cantonCity == "" && this.cantonArea == ""){
					this.$message.error("请选择您要添加字段的省-市-区/县");
					return;
				}
				this.isShow = true
				this.jState = 2;
				this.getChoiceAll(this.jState)
			},
			//弹窗选项卡切换
			tab(tab) {
				if (tab.index == 0){
					this.jState = 2;
				}else {
					this.jState = 1;
				}
				this.getChoiceAll(this.jState)
				this.getList(this.jState);
			},
			//添加value
			addVal(e,valueStr){
				let ids = valueStr;
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-field/transDicRelation/updateTransDicRelation`, {
					ids,
					token: token,
					cantonProvince:this.cantonProvince,
					cantonCity:this.cantonCity,
					cantonArea:this.cantonArea,
				}).then(res => {
					if(res.code == '0'){
						this.isShow = false;
						this.getList(this.jState)
						if(this.jState == 1){
							this.jState =2 
							this.jDataChoice = [...new Set(this.jDataChoice)]
							let arr = this.jDataChoice
							this.addVal(this.jState,arr.toString())
						}	
					}
				})
			},
			//穿梭框 点击确定执行addVal()
			jChoice(){
				let that = this
				this.jState =  1
				let nweArr = this.tableDataA.map(item=>{return item.id});
				let ids = nweArr.toString()
                that.addVal(this.jState,ids)
			},
			//点击取消
			jClose(){
				//清空表单
				this.$refs['form'].resetFields();
				//关闭//弹窗
				this.isShow1 = false;
			},
			//点击修改
			modify(e,state){
				//显示弹窗
				this.isShow1 = true
				this.jState = state 
				//表单回显请求
				let token = sessionStorage.getItem("token")
				this.$get(`/epf-field/transDicRelation/queryById`,{
					token: token,
					id: e
				}).then(res => {
					console.log(res)
					if(res.code == '0'){
						this.form = res.result;
					}
				});	
				this.amend = 1	
			},
			//保存修改
			onSubmit(formName,e) {
				console.log("fdjkfjdksf")
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            let token = sessionStorage.getItem("token");
			            this.form.token = token;
			         	//因后台问题需暂时清空，正常后请直接删除
			            // this.form.createTime = '';
						this.form.cantonProvince = this.cantonProvince
						this.form.cantonCity = this.cantonCity
						this.form.cantonArea = this.cantonArea
						this.form.circulation = this.jType
						let nweArr = this.tableDataA.map(item=>{return item.id});
						let arr = [...new Set(this.jDataChoice)];
						this.form.transDicId = this.state == '1'? nweArr.toString():arr.toString();
						this.$post('/epf-field/transDicRelation',this.form).then(res => {
							console.log(res)
							if (res.code == '0'){
								//关闭弹窗
								this.isShow1 = false;
								//提示成功
								this.$message({
									message: "修改成功",
									type: 'success'
								});
								//重新请求列表
								this.getList(this.jState);
							}
						});
			        } else {
			            return false;
			        }
				})
		    },
		 	//获取地市列表
			getCity(){
				this.$get('/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000').then(res => {
					this.jCity = res.dictionariesList;
				});	
			},
			//点击地市
			jCityClick(e,state){
				//初始化
				this.jInit();
				//赋值
				this.jCityCode = e.id;
				this.jCityName = e.regionName;
				//添加选中
				this.$refs.tree.setCheckedNodes([
					{
		          		id: e.id,
						label: e.regionName,
		        	}
				]);
				this.address  = this.$refs.tree.getCheckedNodes(false,true)
				console.log(this.address)
				if(state.level == 1){
					this.cantonProvinceName = state.label
				    this.cantonProvince = state.key
				}else if(state.level == 2){
					this.cantonCityName= state.label
				    this.cantonCity = state.key
				}else{
					if(e.parentId != '000000' && e.abbreviation == null){
						this.cantonArea = e.id.length>10?this.cantonCity:e.regionCode
						this.cantonAreaName = e.id.length>10 ? this.cantonCityName:e.regionName
					}
				}
				//获取地市
				this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${e.id}`).then(res => {
					e.children = res.dictionariesList;
				});	
				//更新列表
				this.jState = this.jState == 1 ? 2 : 2
				this.getList(this.jState);
			},
			//初始化
			jInit(){
				//清空之前选中
				this.$refs.tree.setCheckedKeys([]);		
			},
			//收缩
			jShrink(e){
				if(e ==1){
					this.isWidth1 = false;
					this.j_zuo1 = 0;
					this.j_you1 = 24;
				}else{
					this.isWidth = false;
					this.j_zuo = 3;
					this.j_you = 21;
				}
			},
			//展开
			jOpen(e){
				if(e ==1){
					this.isWidth1 = true;
					this.j_zuo1 = 3;
					this.j_you1 = 17;
				}else{
					this.isWidth = true;
					this.j_zuo = 7;
					this.j_you = 17;
				}
			},
			//上下数据列表展开收起
			closeList(e){
				if( e == 1){
					this.isHeight1 = false;
				}else{
					this.isHeight2 = false;
				}
			},
			openList(e){
				if( e == 1){
					this.isHeight1 = true;
				}else{
					this.isHeight2 = true;
				}

			},
			//点击底部取消
			noEdit(){
				this.jState = this.jState == 1 ? 2 : 2
				this.getList(this.jState)
				this.isEditBtn = true;
			},
			// 点击底部确认
			sureAll(){
				this.isEditBtn = false
				this.isChangeFlag =  true
				this.onSubmit("form")
				//重新请求列表
				this.jState = this.jState == 1 ? 2 : 2
				this.getList(this.jState)
			},
			// 添加动态class
		    forClass(e){
		    	return 'j_tableTh'+e;
			},
			//点击同步按钮
			jAlert(e,s){
				this.$confirm(e, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	center: true
		        }).then(() => {
		        	let token = sessionStorage.getItem("token");
		        	this.$get(`/epf-field/transDicRelation/copyProvincialConfiguration`, {
						cantonProvince: this.cantonProvince,
						cantonCity: this.cantonCity,
						token: token,
						type: s
					}).then(res => {
						//重新请求列表
						if(res.code == "0"){
							this.jState = this.jState == 1 ? 2 : 2
							this.getList(this.jState)
							this.greyFlag1 = s == 1 ? true:false
							this.greyFlag2 = s == 2 ? true:false
						}
						//消息提示
						this.$message({
			            	type: 'success',
			            	message: '成功!'
			          	});
					});	
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		           		message: '已取消'
		        	});
	        	});
			},
			//点击移除
			deleteFun(e,id){
				this.$confirm(e, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	center: true
		        }).then(() => {
		        	this.$get(`/epf-field/transDicRelation/deleteById`, {
						ids:id
					}).then(res => {
						if(res.code == '0'){
							//消息提示
							this.$message({
								type: 'success',
								message: res.msg
							});
							this.jState = this.jState == 1 ? 2 : 2
							this.getList(this.jState)
						}
					});	
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		           		message: '已取消'
		        	});
	        	});
			},
			//预览
			preview(){
				console.log("23456786543456789")
				let routerPath = "previewPage";
				let title = "预览页面";
				let tabObj = { title, routerPath };
				this.setTabsList(tabObj);
				this.$router.push({
					path: "/previewPage" ,
					query:{
						cantonProvince:this.cantonProvince,
						cantonCity:this.cantonCity,
						cantonArea:this.cantonArea,
						circulation:this.jType
					}
				});

			}
		},
		watch:{
			j_edit: {
				handler (val, oldVal) {
					if(val){
						this.j_edit = val
						console.log(val) 
					}
				
				},
				deep: true
			},
			cantonProvince: {
				handler (val, oldVal) {
					if(val){
						this.cantonProvince = val
						this.cantonCity = ""
						this.cantonArea = ""
						this.jState = this.jState == 1 ? 2 : 2
						this.getList(this.jState)
					}
				},
				deep: true
			},
			cantonCity: {
				handler (val, oldVal) {
					if(val){
						this.cantonCity = val
						this.cantonArea = ""
						this.configSome = true
						this.jState = this.jState == 1 ? 2 : 2
						this.getList(this.jState)
					}
				},
				deep: true
			},
			cantonArea: {
				handler (val, oldVal) {
					if(val){
						this.cantonArea = val
						this.jState = this.jState == 1 ? 2 : 2
						this.getList(this.jState)
					}
				},
				deep: true
			},
			cantonProvinceName: {
				handler (val, oldVal) {
					if(val){
						this.cantonProvinceName = val
						this.cantonCityName = ""
						this.cantonAreaName = ""
					}
				},
				deep: true
			},
			cantonCityName: {
				handler (val, oldVal) {
					if(val){
						this.cantonCityName = val
						this.cantonAreaName = ""
					}
				},
				deep: true
			},
			cantonAreaName: {
				handler (val, oldVal) {
					if(val){
						this.cantonAreaName = val
					}
				},
				deep: true
			}
		}
	}
</script>
<style lang="scss" scoped>
.position_relative{
	position: relative;
}
.p24 {
	padding: 24px;
}
.bg1 {
	background-color: #f0f4f7;
}
.content {
	background-color: #FFFFFF;
}
.tit {
	margin-bottom: 20px;
	border-bottom: 1px solid #ebeef5;
}
.tit span {
	display: inline-block;
	font-size: 16px;
	color: #303133;
	padding: 17px 32px;
	border-right: 1px solid #ebeef5;
}
.j_first{
	padding:20px 0 0;
	display:flex;
	justify-content:space-between;
	div{
		display:flex;
		justify-content:space-between;
		margin-left:10px;
	}
}
.j_left {
	height: 724px;
	overflow: auto;
	border: 1px solid #e6e6e6;
}
.j_leftTit {
	height: 40px;
	line-height: 40px;
	padding-left: 10px;
	font-size: 16px;
	color: #333333;
	background-color: #f5f7fa;
	border-bottom: 1px solid #e6e6e6;
}
.j_right {
	padding: 0 20px 20px;
}
.j_rightTit{
	position: relative;
	margin-bottom: 18px;
	padding: 20px 0 14px 0;
	border-bottom: 1px solid #e6e6e6;
	overflow: hidden;
}
.j_t1{
	position: absolute;
	top: 22px;
	display: inline-block;
	width: 4px;
	height: 18px;
	background-color: #ffa000;
	border-radius: 2px;
}
.j_t2{
	padding-left: 12px;
	font-size: 16px;
	font-weight: bold;
	color: #606266;
}
.j_t3{
	float: right;
}
.j_click0{
	position: relative;
	top: 362px;
	right: 0;
	font-size: 16px;
	color: #959595;
	cursor: pointer;
}
.j_click1{
	position: absolute;
	top: 362px;
	right: 0;
	font-size: 16px;
	color: #959595;
	cursor: pointer;
}
.j_click2{
	position: absolute;
	top: 17px;
	right: 0;
	font-size: 16px;
	background-color: #c9e0f6;
	cursor: pointer;
}
.j_click3{
	padding:5px 12px;
	position: absolute;
	top: 8px;
	right: 20px;
	border:1px solid #e1e1e1;
	border-radius: 2px;
	// color: #4671d5;
}
.j_tabList{
	padding-left: 10px;
	height: 38px;
	line-height: 38px;
	color: #666666;
	border-right: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
}
.j_tableTit{
	padding: 12px 0;
	background-color: #E6EBF5;
	border-bottom: 1px solid #e6e6e6;
}
.j_tableTit p{
	display: inline-block;
	padding-left: 10px;
	color: #3c464e;
	line-height:23px;
	font-weight: bold;
	border-bottom: 1px solid #EBEEF5;
	margin-bottom:0;
	border-right: 1px solid #EBEEF5;
}
.j_tableList{
	overflow: hidden;
}
.j_tableList>div{
	float: left;
	width: 14.28%;
}
.j_tableList p{
	box-sizing: border-box;
	padding: 13px 10px;
	background-color: #E6EBF5;
	border-right: 1px solid #EBEEF5;
	font-weight: bold;
	color: #3c464e;
	line-height:23px;
	margin-bottom:0;
}
.j_tableContent{
	white-space:nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
	padding: 13px 10px;
	border-right: 1px solid rgb(235, 238, 245);
	border-bottom: 1px solid rgb(235, 238, 245);
}
.last{
	margin: -7px 10px;
}
.j_none{
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #909399;
	line-height: 60px;
	border-right: 1px solid rgb(235, 238, 245);
	border-bottom: 1px solid rgb(235, 238, 245);
}
.j_top button{
	width: 100%;
	height: 32px;
	line-height: 32px;
	font-size: 12px;
	color: #FFFFFF;
	background-color: #ffa000;
	border: 0;
	border-radius: 3px;
	cursor: pointer;
}
.copySome{
	text-align:center;
	font-size:16px;
	color:#666;
	line-height:30px;
	margin-top:30px
}
.j_right .activeGrey{
	background:#dfdfe1;
}
.j_table /deep/ .el-table__body tbody tr .cell .el-input{
    position:absolute !important;
    width:auto;
}
//进来icon的样式
.j_left /deep/ .el-tree .el-tree-node__content .el-checkbox .el-checkbox__input .el-checkbox__inner{
	border-radius:50%;
	border:3px solid #b9b9b9;
	width:16px;
	height:16px;
	position:relative;
}
.j_left /deep/ .el-tree .is-current.is-focusable.is-checked .el-tree-node__content .is-checked .el-checkbox__input.is-checked .el-checkbox__inner:after{
	position:absolute;
	top:1px;
	left:1px;
	width: 8px;
	height: 8px;
	border-radius:50%;
	background:#ffa000;
	border:none;
}
//这是第一级选中
.j_left /deep/ .el-tree .el-tree-node .el-checkbox .is-checked .el-checkbox__inner{
	border-radius:50%;
	border:3px solid #ffa000;
	width:16px;
	height:16px;
	background:#fff;
	position:relative;
}
.j_left /deep/ .el-tree .el-tree-node .el-checkbox .is-checked .el-checkbox__inner:after{
	height:8px;
	width:8px;
	border-radius:50%;
	background:#ffa000;
	position:absolute;
	top:1px;
	left:1px;
	border:none;
}
//这是半选择；
.j_left /deep/ .el-tree .el-tree-node .el-checkbox  .is-indeterminate .el-checkbox__inner{
	border-radius:50%;
	border:3px solid #b9b9b9;
	width:15px;
	height:15px;
	background:#fff;
}
//这是第二级；
.j_left /deep/ .el-tree .el-tree-node>.el-tree-node__children .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner{
	height:16px;
	width:16px;
	border:3px solid #ffa000;
	border-radius:50%;
	background:#fff;
	position: relative;

}
.j_left /deep/ .el-tree .el-tree-node>.el-tree-node__children .el-checkbox__input.is-checked .el-checkbox__inner:after{
	position: absolute;
	top:1px;
	left:1px;
	height:8px;
	width:8px;
	border-radius: 50%;
	background:#ffa000;
	border:none;
}
</style>
<style>
.j_table .position_relative .el-table__body tbody tr .cell{
	color:#9a9a9a;
}
.j_table .j_btns .el-table__body tbody tr .cell{
	color:#606266;
}
.j_first .el-alert{
	margin-bottom:0px;
	color: #ffa000;
	background-color: #fffbe5;
}
.j_first .el-alert .el-icon-close{
	color: #b3b3b3;
	font-size:15px;
}
.j_t3 button,.j_right .el-button--warning,.j_first .el-button--primary{
	background-color: #ffa000;
	border: none;
}
.j_right .el-dropdown-link {
    cursor: pointer;
    color: #666666;
}
.j_right .el-icon-arrow-down {
    font-size: 12px;
}
.j_right .el-tabs__active-bar{
	background-color: #ffa000 !important;
}
.j_right .el-tabs__nav-wrap::after{
	height: 1px;
}
.j_right .el-tabs__nav-scroll{
	border: 1px solid #e6e6e6;
	background-color: #f5f7fa;
	padding-left: 28px;
}
.j_alert .el-button--warning,.j_alert2 .el-button--primary{
	background-color: #ffa000;
	border: 0;
	display:inline-block;
}
.j_right .el-button--primary{
	color: #FFFFFF;
	background-color: #ffa000;
	border: none;
	height:32px;
	line-height: 10px;
}
.j_right .el-button--info,.j_right .el-button--default{
	color: #ffa000;
	height:31px;
	line-height: 1px;
	background-color: #FFFFFF;
	border: 1px solid #ffa000;
}
.j_right .el-button--warning{
	color: #ffffff;
	background-color: #ffa000;
}
.j_right .el-row{
	margin-bottom: 30px;
}
.j_edit i{
	cursor: pointer;
	color: #4671d5;
}
.j_btns .el-button--small{
	padding: 0;
}
.j_btns .el-button--mini{
	padding: 0;
}
.j_btns  .el-input__inner{
	height:24px;
	line-height:24px;
	padding:0 5px;
}
.j_top .el-row{
	margin: 15px 0;
}
.j_top .el-alert{
	color: #ffa000;
	background-color: #fffbe5;
}
.j_top .el-message-box--center .el-button--primary{
	background-color: #ffa000;
	border-color: #ffa000;
}
</style>