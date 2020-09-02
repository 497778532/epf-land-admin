<template>
	<div class="p24 bg1">
		<div class="content">
			<div class="tit">
				<span>合同表单配置</span>
			</div>
			<el-row>
  				<el-col :span="j_zuo1">
  					<div class="j_left position_relative">
						<div class="j_leftTit">地区选择</div>
						<div style="padding: 24px 10px;">
							<el-tree :data="jCity" :props="props" show-checkbox @node-click="jCityClick" @check="jCityClick" ref="tree" node-key="id"></el-tree>
						</div>
						<i class="el-icon-s-fold j_click1" v-show="isWidth1" @click="jShrink(1)"></i>
					</div>
  				</el-col>
  				<i class="el-icon-s-unfold j_click0" v-show="!isWidth1" @click="jOpen(1)"></i>
  				<el-col :span="j_you1">
  					<div class="j_right">
						<el-tabs v-model="activeName" @tab-click="handleClick">
						    <el-tab-pane label="转让合同" name="first">
						    	<!-- <div class="j_top" v-if="statusCode == '1111'">
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
						    	</div> -->
						    	<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{jCityName}}基础字段配置</span>
									<span class="j_t3">
										<!-- <el-button type="warning" size="small" @click="isShow = true">添加</el-button> -->
										<span v-show="isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(1)">收起 <i class="el-icon-arrow-dpwn"></i></span>
										<span v-show="!isHeight1" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(1)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight1">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%">
									  			<el-table-column label="不可编辑字段属性">
									  				<el-table-column type="index" label="序号" width="50"></el-table-column>
									  				<el-table-column prop="value" label="VALUE"></el-table-column>
									  				<el-table-column prop="name" label="字段名称"></el-table-column>
									  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
									  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%" class='is_edit'>
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column v-if="x=='字段别称'" prop="alias" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="dataLength" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='是否必填'" prop="isCheck" label="是否必填"></el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位"></el-table-column>
														<!-- <el-table-column v-else-if="x=='所在信息分组'" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.grouping}}</template>
														</el-table-column>  -->
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">{{scope.row.sort}}
																<i v-show="!isEditBtn" style="color:#409eff" class="el-icon-edit" @click="jSort(scope.row.id)"></i>
																<i v-show="isEditBtn" class="el-icon-edit"></i>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作">
															<template slot-scope="scope">
																<el-button type="text" :disabled="isEditBtn" size="mini" @click="modify(scope.row.id)" >修改</el-button>
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
								  			<!-- <div>
												<div class="j_tableTit">
													<p>可编辑字段属性</p>
												</div>
												<div class="j_tableList">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<p>{{x}}</p>
														<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
															<div v-if="x=='字段别称'">{{s.alias}}</div>
															<div v-else-if="x=='长度'">{{s.dataLength}}</div>
															<div v-else-if="x=='是否必填'">{{s.isCheck}}</div>
															<div v-else-if="x=='单位'">{{s.unit}}</div>
															<div v-else-if="x=='所在信息分组'">{{s.grouping}}</div>
															<div v-else-if="x=='排序'">
																<div class="j_edit">
														        	<span>{{s.sort}}</span>
														        	<i class="el-icon-edit" @click="jSort(s.id)"></i>
														        </div>
															</div>
															<div v-else-if="x=='操作'">
																<el-button type="text" size="small" @click="modify(s.id)">修改</el-button>
																<el-popover
																    placement="bottom"
																    title="备注："
																    width="200"
																    trigger="click"
																    :content="s.remarks">
																    <el-button slot="reference" type="text" size="small">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</div>
														</div>
													</div>
												</div>
												<div class="j_none" v-if="!tableData.length">暂无数据</div>
											</div> -->
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<i class="el-icon-caret-bottom el-icon--right"></i>
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
								</el-row>
								<div class="j_rightTit">
									<span class="j_t1"></span>
									<span class="j_t2">{{jCityName}}扩展字段配置</span>
									<span class="j_t3">
										<el-button type="warning" size="small" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="jAdd" >添加</el-button>
										<span v-show="isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="closeList(2)">收起 <i class="el-icon-arrow-dpwn"></i></span>
										<span v-show="!isHeight2" style="margin-left: 10px;color: #999999;cursor: pointer;" @click="openList(2)">展开 <i class="el-icon-arrow-up"></i></span>
									</span>
								</div>
								<el-row v-show="isHeight2">
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData2" border style="width: 100%" >
									  			<el-table-column label="不可编辑字段属性">
									  				<el-table-column type="index" label="序号" width="50"></el-table-column>
									  				<el-table-column prop="value" label="VALUE"></el-table-column>
									  				<el-table-column prop="name" label="字段名称"></el-table-column>
									  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
									  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column>
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
													<div :class="forClass(index)" v-for="(x,index) in choice2" :key="index">
														<el-table-column v-if="x=='字段别称'" prop="alias" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="dataLength" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='是否必填'" prop="isCheck" label="是否必填">
															<template slot-scope="scope">
																<span >{{scope.row.isCheck == '1' ? '否' : '是'}}</span>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位"></el-table-column>
														<!-- <el-table-column v-else-if="x=='所在信息分组'" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
														</el-table-column>  -->
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">{{scope.row.sort}}
																<i v-show="!isEditBtn" style="color:#409eff" class="el-icon-edit" @click="jSort(scope.row.id)"></i>
																<i v-show="isEditBtn" class="el-icon-edit"></i>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作">
															<template slot-scope="scope">
																<el-button :disabled="isEditBtn" type="text"  size="mini" @click="modify(scope.row.id,2)" >修改</el-button>
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
												    	<i class="el-icon-caret-bottom el-icon--right"></i>
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
								</el-row>
								<el-button type="primary" v-show="!(!isEditBtn || (tableData2 && tableData2.length == 0)) "  @click="isEditBtn = false">编辑</el-button>
								<el-button type="warning" v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="getEdit()">确认</el-button>
								<el-button type="info">预览</el-button>
								<el-button v-show="!isEditBtn || (tableData2 && tableData2.length == 0) " @click="noEdit">取消</el-button>
						    </el-tab-pane>
						    <el-tab-pane label="出租合同" name="second">
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
									<span class="j_t2">{{jCityName}}基础字段配置</span>
									<span class="j_t3">
										<el-button type="warning" size="small" @click="isShow = true">添加</el-button>
										<span style="margin-left: 10px;color: #999999;cursor: pointer;">收起</span>
										<i class="el-icon-arrow-down"></i>
									</span>
								</div>
								<el-row>
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%">
									  			<el-table-column label="不可编辑字段属性">
									  				<el-table-column type="index" label="序号" width="50"></el-table-column>
									  				<el-table-column prop="value" label="VALUE"></el-table-column>
									  				<el-table-column prop="name" label="字段名称"></el-table-column>
									  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
									  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%" class='is_edit'>
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<el-table-column v-if="x=='字段别称'" prop="alias" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="dataLength" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='是否必填'" prop="isCheck" label="是否必填"></el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位"></el-table-column>
														<!-- <el-table-column v-else-if="x=='所在信息分组'" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.grouping}}</template>
														</el-table-column>  -->
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">{{scope.row.sort}}
																<i  style="color:#409eff" class="el-icon-edit" @click="jSort(scope.row.id)"></i>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作">
															<template slot-scope="scope">
																<el-button type="text"  size="mini" @click="modify(scope.row.id)" >修改</el-button>
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
								  			<!-- <div>
												<div class="j_tableTit">
													<p>可编辑字段属性</p>
												</div>
												<div class="j_tableList">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<p>{{x}}</p>
														<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
															<div v-if="x=='字段别称'">{{s.alias}}</div>
															<div v-else-if="x=='长度'">{{s.dataLength}}</div>
															<div v-else-if="x=='是否必填'">{{s.isCheck}}</div>
															<div v-else-if="x=='单位'">{{s.unit}}</div>
															<div v-else-if="x=='所在信息分组'">{{s.grouping}}</div>
															<div v-else-if="x=='排序'">
																<div class="j_edit">
														        	<span>{{s.sort}}</span>
														        	<i class="el-icon-edit" @click="jSort(s.id)"></i>
														        </div>
															</div>
															<div v-else-if="x=='操作'">
																<el-button type="text" size="small" @click="modify(s.id)">修改</el-button>
																<el-popover
																    placement="bottom"
																    title="备注："
																    width="200"
																    trigger="click"
																    :content="s.remarks">
																    <el-button slot="reference" type="text" size="small">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</div>
														</div>
													</div>
												</div>
												<div class="j_none" v-if="!tableData.length">暂无数据</div>
											</div> -->
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<i class="el-icon-caret-bottom el-icon--right"></i>
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
								</el-row>
								<el-button type="warning">确认</el-button>
								<el-button type="info">预览</el-button>
								<el-button>取消</el-button>
						    </el-tab-pane>
						    <el-tab-pane label="抵押合同" name="third">
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
									<span class="j_t2">{{jCityName}}基础字段配置</span>
									<span class="j_t3">
										<el-button type="warning" size="small" @click="isShow = true">添加</el-button>
										<span style="margin-left: 10px;color: #999999;cursor: pointer;">收起</span>
										<i class="el-icon-arrow-down"></i>
									</span>
								</div>
								<el-row>
								  	<el-col :span="j_zuo">
								  		<div class="position_relative">
								  			<el-table :data="tableData" border style="width: 100%">
									  			<el-table-column label="不可编辑字段属性">
									  				<el-table-column type="index" label="序号" width="50"></el-table-column>
									  				<el-table-column prop="value" label="VALUE"></el-table-column>
									  				<el-table-column prop="name" label="字段名称"></el-table-column>
									  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
									  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column>
									  			</el-table-column>
											</el-table>
											<i class="el-icon-s-fold j_click2" @click="jShrink" v-show="isWidth"></i>
											<i class="el-icon-s-unfold j_click2" v-show="!isWidth" @click="jOpen"></i>
								  		</div>
								  	</el-col>
								  	<el-col :span="j_you">
								  		<div class="position_relative j_btns">
											<el-table :data="tableData" width="100%" class='is_edit'>
												<el-table-column label="可编辑字段属性">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														{{index}}
														<el-table-column v-if="x=='字段别称'" prop="alias" label="字段别称"></el-table-column>
														<el-table-column v-else-if="x=='长度'" prop="dataLength" label="长度"></el-table-column>
														<el-table-column v-else-if="x=='是否必填'" prop="isCheck" label="是否必填"></el-table-column>
														<el-table-column v-else-if="x=='单位'" prop="unit" label="单位"></el-table-column>
														<!-- <el-table-column v-else-if="x=='所在信息分组'" label="所在信息分组">
															<template slot-scope="scope">{{scope.row.grouping}}</template>
														</el-table-column>  -->
														<el-table-column v-else-if="x=='排序'" prop="sort" label="排序">
															<template slot-scope="scope">{{scope.row.sort}}
																<i  style="color:#409eff" class="el-icon-edit" @click="jSort(scope.row.id)"></i>
															</template>
														</el-table-column>
														<el-table-column v-else-if="x=='操作'" label="操作">
															<template slot-scope="scope">
																<el-button type="text"  size="mini" @click="modify(scope.row.id)" >修改</el-button>
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
								  			<!-- <div>
												<div class="j_tableTit">
													<p>可编辑字段属性</p>
												</div>
												<div class="j_tableList">
													<div :class="forClass(index)" v-for="(x,index) in choice1" :key="index">
														<p>{{x}}</p>
														<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
															<div v-if="x=='字段别称'">{{s.alias}}</div>
															<div v-else-if="x=='长度'">{{s.dataLength}}</div>
															<div v-else-if="x=='是否必填'">{{s.isCheck}}</div>
															<div v-else-if="x=='单位'">{{s.unit}}</div>
															<div v-else-if="x=='所在信息分组'">{{s.grouping}}</div>
															<div v-else-if="x=='排序'">
																<div class="j_edit">
														        	<span>{{s.sort}}</span>
														        	<i class="el-icon-edit" @click="jSort(s.id)"></i>
														        </div>
															</div>
															<div v-else-if="x=='操作'">
																<el-button type="text" size="small" @click="modify(s.id)">修改</el-button>
																<el-popover
																    placement="bottom"
																    title="备注："
																    width="200"
																    trigger="click"
																    :content="s.remarks">
																    <el-button slot="reference" type="text" size="small">
																		查看备注
																		<i class="el-icon-caret-bottom el-icon--right"></i>
																	</el-button>
																</el-popover>
															</div>
														</div>
													</div>
												</div>
												<div class="j_none" v-if="!tableData.length">暂无数据</div>
											</div> -->
											<div class="j_click3">
												<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
												<el-dropdown trigger="click">
												  	<span class="el-dropdown-link">
												    	定制列
												    	<i class="el-icon-caret-bottom el-icon--right"></i>
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
								</el-row>
								<el-button type="warning">确认</el-button>
								<el-button type="info">预览</el-button>
								<el-button>取消</el-button>
						    </el-tab-pane>
						</el-tabs>
					</div>
  				</el-col>
			</el-row>
			<!-- <div class="j_alert">
				<el-dialog title="添加字段" :visible.sync="isShow" width="30%">
				  	<el-tabs v-model="tabIndex" type="card" @tab-click="tab">
					    <el-tab-pane label="扩展字段" name="first">
					    	<div style="padding: 20px 0;">
					    		<el-transfer :titles="['扩展字段库', '已选扩展字段']" v-model="jDataChoice" :data="jData" @change="jChoice">
								</el-transfer>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="基础字段" name="second">
					    	<div style="margin: 20px 0;border-left: 1px solid #e6e6e6;border-top: 1px solid #e6e6e6;">
					    		<el-row>
					    			<el-col :span="24">
								  		<div class="j_tabList" style="font-weight: bold;background-color: #f5f7fa;">基础字段</div>
								  	</el-col>
								  	<template v-for="(x,index) in tableData">
								  		<el-col :span="12">
									  		<div class="j_tabList">{{x.name}}</div>
									  	</el-col>
								  	</template>
								</el-row>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
				  	<span slot="footer" class="dialog-footer">
				    	<el-button @click="isShow = false">关闭</el-button>
				    	<el-button>确定</el-button>
				  	</span>
				</el-dialog>
			</div> -->
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
								  	<template v-for="(x,index) in tableData" >
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
						    <el-input v-model="form.value" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="字段名称:" prop="name">
						    <el-input v-model="form.name" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="字段类型:" prop="dataType">
						    <el-select v-model="form.dataType" placeholder="请选择">
						      	<el-option label="number" value="number"></el-option>
						      	<el-option label="string" value="string"></el-option>
						      	<el-option label="boolean" value="boolean"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="分组标识:" prop="dicValue">
						    <el-select v-model="form.dicValue" placeholder="请选择">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="字段别称:" prop="alias">
						    <el-input v-model="form.alias" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="长度:" prop="dataLength">
						    <el-input v-model="form.dataLength" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="是否必填:" prop="isCheck">
						    <el-select v-model="form.isCheck" placeholder="请选择">
						      <el-option label="是" value="是"></el-option>
						      <el-option label="否" value="否"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="单位:" prop="unit">
						    <el-input v-model="form.unit" placeholder="万元"></el-input>
						</el-form-item>
						<el-form-item label="所在信息分组:" prop="grouping">
						    <el-select v-model="form.grouping" placeholder="请选择">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item>
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
			<div class="j_alert2">
				<el-dialog title="修改排序" :visible.sync="isEdit" width="20%" center>
		        	<div style="padding: 0 20px;">
		        		<input type="number" v-model="j_edit" placeholder="请输入数字" style="border: 1px solid #999999;border-radius: 3px;width: 100%;padding-left: 10px;"/>
		        	</div>
				  	<span slot="footer" class="dialog-footer">
				    	<el-button @click="isEdit = false">取 消</el-button>
				    	<el-button type="primary" @click="getEdit()">确 定</el-button>
				  	</span>
				</el-dialog>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
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
				props: {
					label: 'regionName',
					children: 'children'
				},
				j_zuo1: 4,
				j_you1: 20,
				j_zuo: 8,
				j_you: 16,
				activeName: 'first',
				tabIndex: 'first',
				tableData: [],
				tableData2: [],
				choice1:["排序", "所在信息分组", "长度", "字段别称", "是否必填", "单位", "操作"],
				choice2:["排序", "所在信息分组", "长度", "字段别称", "是否必填", "单位", "操作"],
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
//      		1 固定字段 2 扩展字段
        		jState: '2',
//      		transfer  rental  rent  mortgage
        		jType: 'transfer',
        		jCityCode: '000000',
        		form:{
					value: '',
					name: '',
					type: 'transfer',
					alias: '',
					dataLength: '',
					isCheck: '',
					unit: '',
					grouping: '',
					remarks: '',
					dataType: '',
					dicValue: ''
				},
				statusCode:'',
				rules: {
		          	value: [
		            	{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	name: [
		            	{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	dataType: [
		            	{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	alias: [
		          		{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	dataLength: [
		          		{ required: true, message: '请输入', trigger: 'blur' },
		          	],
		          	isCheck: [
		          		{ required: true, message: '请选择', trigger: 'change' },
		          	],
		          	grouping: [
		          		{ required: true, message: '请选择', trigger: 'change' },
		          	]
		      	}
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
//			选项卡切换
			handleClick(tab) {
		        if (tab.index == 0){
//		        	transfer  rental  rent  mortgage
        			this.jType = 'transfer'
		        } else if(tab.index == 1){
		        	this.jType = 'rent'
		        } else {
		        	this.jType = 'mortgage'
		        }
		        this.jState = this.jState == 1 ? 2 : 2
				this.getList(this.jState);this.getList();
		   	},
//		   	点击排序
			getEdit(){
//				判断是否为空
				if (!this.j_edit){
					this.$message.error('请输入内容');
					return false;
				}
				let token = sessionStorage.getItem("token");
				this.$post('/epf-contract/transDicController/updateOne', {
					token: token,
					id: this.j_sortId,
					sort: this.j_edit
				}).then(res => {
					if (res.code == '0000'){
//						关闭弹窗
						this.isEdit = false;
//						提示成功
						this.$message({
				         	message: '添加成功',
				          	type: 'success'
				        });
//						重新请求列表
						this.getList();
					}
				})
			},
//			添加动态class
		    forClass(e){
		    	return 'j_tableTh'+e;
		    },
//		 	获取列表
			getList(e){
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-contract/transDicController/page`, {
					state: e,
					token: token,
					type: this.jType,
					cityCode: this.jCityCode,
					isRemove: '',
					idList: '',
					selection: '',
					choice:''
				}).then(res => {
					this.statusCode = res.statusCode;
					if(e == 2){
						this.tableData2 = res.data;
						this.jState = 1
						this.getList(this.jState)
						let data = [];
						res.data.forEach((x, index) => {
						data.push({
							label: x.name,
							key: x.id
						});
						});
						this.jDataChoice = data;
					}else{
						this.tableData = res.data;
					}
//					处理添加字段库数据，根据isRemove 1or2判断扩展or已选扩展
					
					let isChoiceArr = res.data.filter((x, index) => {
						return x.isRemove ==  2
					});
					console.log(isChoiceArr)
					let allArr = res.data.filter((x, index) => {
						return x.isRemove ==  1
					});
					console.log(allArr)
			       
				});
			},
			//弹窗选项卡切换
			tab(tab) {
				if (tab.index == 0){
					this.jState = 2;
				}else {
					this.jState = 1;
				}
				// this.getChoiceAll(this.jState)
				this.getList(this.jState);
			},
//			点击修改
			modify(e){
//				显示弹窗
				this.isShow1 = true;
//				表单回显请求
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-contract/transDicController/selectOne`, {
					token: token,
					id: e
				}).then(res => {
					this.form = res.data;
				});				
			},
//			穿梭框获取选中内容
			jChoice(){
				console.log(this.jDataChoice)
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-contract/transDicController/updateByIdList`, {
					token: token,
					type: this.jType,
					cityCode: '000000',
					state: '2',
					isRemove: '',
					idList: this.jDataChoice
				}).then(res => {
					console.log(res)
				});	
			},
//			点击取消
			jClose(){
//				清空表单
				this.$refs['form'].resetFields();
//				关闭弹窗
				this.isShow1 = false;
			},
//			点击修改
			onSubmit(formName,e) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            let token = sessionStorage.getItem("token");
			            this.form.token = token;
//			           	因后台问题需暂时清空，正常后请直接删除
			            // this.form.createTime = '';
			           	this.$post('/epf-contract/transDicController/updateOne', this.form).then(res => {
							if (res.code == '0000'){
//								关闭弹窗
								this.isShow1 = false;
//								提示成功
								this.$message({
						         	message: '修改成功',
						          	type: 'success'
						        });
//							 	重新请求列表
								this.getList();
							}
						});		
			        } else {
			            return false;
			        }
		        })
		    },
//		 	获取地市列表
			getCity(){
				this.$get('/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000').then(res => {
					this.jCity = res.dictionariesList;
				});	
			},
//			点击地市
			jCityClick(e){
//				初始化
				this.jInit();
//				赋值
				this.jCityCode = e.id;
				this.jCityName = e.regionName;
//				添加选中
				this.$refs.tree.setCheckedNodes([
					{
		          		id: e.id,
		          		label: e.regionName
		        	}
				]);
//				获取地市
				this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${e.id}`).then(res => {
					e.children = res.dictionariesList;
				});	
//				更新列表
				this.getList(this.jState);
			},
//			初始化
			jInit(){
//				清空之前选中
				this.$refs.tree.setCheckedKeys([]);		
			},
//			点击同步按钮
			jAlert(e,s){
				this.$confirm(e, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	center: true
		        }).then(() => {
		        	let token = sessionStorage.getItem("token");
		        	this.$post(`/epf-contract/transDicController/page`, {
						token: token,
						type: this.jType,
						cityCode: this.jCityCode,
						configure: s
					}).then(res => {
//						重新请求列表
						this.tableData = res.data;
//						消息提示
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
//			收缩
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
//			展开
			jOpen(e){
				if(e ==1){
					this.isWidth1 = true;
					this.j_zuo1 = 4;
					this.j_you1 = 20;
				}else{
					this.isWidth = true;
					this.j_zuo = 8;
					this.j_you = 16;
				}
			},
//			排序弹窗
			jSort(e){
//				清空值
				this.j_edit = '';
//				获取id
				this.j_sortId = e;
//				显示弹窗
				this.isEdit = true;
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
			//点击添加
			jAdd(){
				// if(this.cantonProvince == "" && this.cantonCity == "" && this.cantonArea == ""){
				// 	this.$message.error("请选择您要添加字段的省-市-区/县");
				// 	return;
				// }
				this.isShow = true
				this.jState = 2;
				this.getList(this.jState)
			},
			//点击底部取消
			noEdit(){
				this.jState = this.jState == 1 ? 2 : 2
				this.getList(this.jState)
				this.isEditBtn = true;
			},
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
	padding: 0 20px;
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
	position: absolute;
	top: 17px;
	right: 20px;
	color: #4671d5;
}
.is_edit {
	/deep/ .el-table__header thead th   {
		background: #E6EBF5;
		border-bottom: 1px solid #EBEEF5;
	} 
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
	padding: 14px 0;
	background-color: #E6EBF5;
	border-bottom: 1px solid #e6e6e6;
}
.j_tableTit p{
	display: inline-block;
	padding-left: 10px;
	color: #3c464e;
	font-weight: bold;
}
.j_tableList{
	overflow: hidden;
}
.j_tableList>div{
	float: left;
	width: 14.28%;
}
.j_tableList p{
	padding: 14px 10px;
	background-color: #E6EBF5;
	border-bottom: 1px solid #EBEEF5;
	font-size: 14px;
	font-weight: bold;
	color: #3c464e;
}
.j_tableContent{
	padding: 14px 10px;
	border-right: 1px solid rgb(235, 238, 245);
	border-bottom: 1px solid rgb(235, 238, 245);
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
</style>
<style>
.j_t3 button,.j_right .el-button--warning{
	background-color: #ffa000;
	border: none;
}
.j_right .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
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
}
.j_right .el-button--info{
	color: #ffa000;
	background-color: #FFFFFF;
	border: 1px solid #ffa000;
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
.j_top .el-row{
	margin: 15px 0;
}
.j_top .el-alert{
	color: #ffa000;
	background-color: #fffbe5;
}
.el-message-box--center .el-button--primary{
	background-color: #ffa000;
	border-color: #ffa000;
}
.j_right .el-row .el-table .cell{
	height:23px;
}
</style>