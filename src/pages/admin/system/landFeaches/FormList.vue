<template>
	<div class="p24 bg1">
		<div class="content">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="基础字段" name="first">
					<div class="j_first">
						<el-alert title="列表种字段别称，长度，是否必填，单位，所在信息分组可进行编辑，VALUE,字段列表，字段类型，控件类型不可编辑。"></el-alert>
						<div class="j_form">
							<div class="j_form1">
								<input type="text" placeholder="请输入VALUE或字段名称" v-model="j_search" class="el-input__inner"/><button @click="jSerche()">搜索</button>
							</div>
							<div class="j_form2">
								<button @click="jAdd">添加</button>
								<!-- <i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i> -->
								<!-- <el-dropdown trigger="click">
								  	<span class="el-dropdown-link" style="color: #587dd8;cursor: pointer;">
								    	定制列
								    	<i class="el-icon-caret-bottom el-icon--right"></i>
								  	</span>
								  	<el-dropdown-menu slot="dropdown">
									    <el-dropdown-item>
									    	<span style="color: #5ba0e5;">恢复默认</span>
									    </el-dropdown-item>
									    <el-checkbox-group v-model="choice1" @change="getChoice">
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
								</el-dropdown> -->
							</div>
						</div>
						<div class="j_table">
							<el-row>
							  	<el-col :span="8">
							  		<el-table :data="tableData">
							  			<el-table-column label="不可编辑字段属性">
							  				<el-table-column type="index" label="序号" width="60"  header-align="center" align="center">
												<template slot-scope="scope">
													<span style="color:#606266">{{scope.$index+1}}</span>
												</template>
											</el-table-column>
							  				<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
							  				<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
							  				<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
							  				<!-- <el-table-column label="分组标识">
												<template slot-scope="scope">{{scope.row.landType}},{{scope.row.tradeType}}</template>
											 </el-table-column> -->
							  			</el-table-column>
									</el-table>
							  	</el-col>
							  	<el-col :span="16">
									<el-table :data="tableData" width="100%">
							  			<el-table-column label="可编辑字段属性">
											<!-- <div :class="forClass(index)" v-for="(x,index) in choice1" :key="index"> -->
												<el-table-column show-overflow-tooltip prop="alias" label="字段别称" width="180"></el-table-column>
												<el-table-column prop="length" label="长度"></el-table-column>
												<el-table-column prop="texttypeName" label="控件类型"></el-table-column> 
												<el-table-column prop="isNull" label="是否必填" width="90">
													<template slot-scope="scope">
														<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
													</template>
												</el-table-column>
												<el-table-column prop="unit" label="单位">
													<template slot-scope="scope">
														<span v-if="scope.row.unit">{{scope.row.unit }}</span>
														<span v-else>--</span>
													</template>
												</el-table-column>
												<el-table-column label="所在信息分组"  width="240">
													<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
												</el-table-column> 
												<el-table-column label="操作">
													<template slot-scope="scope">
														<el-button type="text"  size="mini" @click="modify(scope.row.id)" >修改</el-button>
														<el-popover
															v-show="scope.row.remarks"
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
											<!-- </div> -->
							  			</el-table-column>
									</el-table>
									<!-- <div>
										<div class="j_tableTit">
											<p>可编辑字段属性</p>
										</div>
										<div class="j_tableList">
											<div :class="forClass(index)" v-for="(x,index) in choice1">
												<p style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{x}}</p>
												<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
													<div v-if="x=='字段别称'">{{s.alias}}</div>
													<div v-else-if="x=='长度'">{{s.length}}</div>
													<div v-else-if="x=='是否必填'">{{s.isNull == 1?'否':'是'}}</div>
													<div v-else-if="x=='单位'">{{s.unit}}</div>
													<div  v-else-if="x=='所在信息分组'" style="height:49px;">{{s.landType}}<br>{{s.tradeType}}</div>
													<div v-else-if="x=='排序'">{{s.sort}}</div>
													<div class="last" v-else-if="x=='操作'">
														<el-button type="text" style="display:block" size="small" @click="modify(s.id)" >修改</el-button>
														<el-popover
														    placement="bottom"
														    title="备注："
														    width="200"
															style="display:block"
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
							  	</el-col>
							</el-row>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="扩展字段" name="second">
					<div class="j_first">
						<el-alert title="列表种字段别称，长度，是否必填，单位，所在信息分组可进行编辑，VALUE,字段列表，字段类型，控件类型不可编辑。"></el-alert>
						<div class="j_form">
							<div class="j_form1">
								<input type="text" placeholder="请输入VALUE或字段名称" class="el-input__inner" v-model="j_search1"/><button @click="jSerche(1)">搜索</button>
							</div>
							<div class="j_form2">
								<button @click="jAdd">添加</button>
								<!-- <i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
								<el-dropdown trigger="click">
								  	<span class="el-dropdown-link" style="color: #587dd8;cursor: pointer;">
								    	定制列
								    	<i class="el-icon-caret-bottom el-icon--right"></i>
								  	</span>
								  	<el-dropdown-menu slot="dropdown">
									    <el-dropdown-item>
									    	<span style="color: #5ba0e5;">恢复默认</span>
									    </el-dropdown-item>
									    <el-checkbox-group v-model="choice2" @change="getChoice">
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
								</el-dropdown> -->
							</div>
						</div>
						<div class="j_table">
							<el-row>
							  	<el-col :span="8">
							  		<el-table :data="tableData">
							  			<el-table-column label="不可编辑字段属性">
							  				<el-table-column type="index" label="序号" width="60"  header-align="center" align="center" >
												<template slot-scope="scope">
													<span style="color:#606266">{{scope.$index+1}}</span>
												</template>
											</el-table-column>
							  				<el-table-column show-overflow-tooltip prop="value" label="VALUE"></el-table-column>
							  				<el-table-column show-overflow-tooltip prop="name" label="字段名称"></el-table-column>
							  				<el-table-column show-overflow-tooltip prop="typeName" label="字段类型"></el-table-column>
							  				<!-- <el-table-column prop="texttypeName" label="控件类型"></el-table-column> -->
											<!-- <el-table-column label="分组标识">
												<template slot-scope="scope">{{scope.row.landType}},{{scope.row.tradeType}}</template>
											 </el-table-column> -->
							  			</el-table-column>
									</el-table>
							  	</el-col>
							  	<el-col :span="16">
									<el-table :data="tableData" width="100%">
											<el-table-column label="可编辑字段属性">
												<!-- <div :class="forClass(index)" v-for="(x,index) in choice2" :key="index"> -->
													<el-table-column show-overflow-tooltip prop="alias" label="字段别称" width="180"></el-table-column>
													<el-table-column prop="length" label="长度"></el-table-column>
													<el-table-column prop="texttypeName" label="控件类型"></el-table-column> 
													<el-table-column prop="isNull" label="是否必填" width="90">
														<template slot-scope="scope">
															<span >{{scope.row.isNull == '1' ? '否' : '是'}}</span>
														</template>
													</el-table-column>
													<el-table-column prop="unit" label="单位">
														<template slot-scope="scope">
															<span v-if="scope.row.unit">{{scope.row.unit }}</span>
															<span v-else>--</span>
														</template>
													</el-table-column>
													<el-table-column label="所在信息分组" width="240">
														<template slot-scope="scope">{{scope.row.landTypeName}},{{scope.row.tradeTypeName}}</template>
													</el-table-column> 
													<el-table-column label="操作">
														<template slot-scope="scope">
															<el-button type="text"  size="mini" @click="modify(scope.row.id)" >修改</el-button>
															<el-popover
																v-show="scope.row.remarks"
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
												<!-- </div> -->
											</el-table-column>
									</el-table>
									<!-- <div>
										<div class="j_tableTit">
											<p>可编辑字段属性</p>
										</div>
										<div class="j_tableList">
											<div :class="forClass(index)" v-for="(x,index) in choice2">
												<p style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">{{x}}</p>
												<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
													<div v-if="x=='字段别称'">{{s.alias}}</div>
													<div v-else-if="x=='长度'">{{s.length}}</div>
													<div v-else-if="x=='是否必填'">{{s.isNull}}</div>
													<div v-else-if="x=='单位'">{{s.unit}}</div>
													<div style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;" v-else-if="x=='所在信息分组'">
														{{s.landTypeName}},{{s.tradeTypeName}}
													</div>
													<div v-else-if="x=='排序'">{{index+1}}</div>
													<div class="last" v-else-if="x=='操作'">
														<el-button style="dispaly:block" type="text" size="small" @click="modify(s.id)">修改</el-button>
														<el-popover
															style="dispaly:block"
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
							  	</el-col>
							</el-row>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- <el-form :model="rule"
            status-icon
            ref="rule"
            label-width="120px"
            class="demo-ruleForm">
            <el-form-item v-for="(item, index) in rule" :key="index"
                :label="item.alias+'：'"
                :style="{'display':( item.name === '省' || item.name === '市' || item.name === '区')?'inline-block' : ''}"
                >
                <el-input v-model="item.value" v-if="item.texttype=='input'" style="width:200px"></el-input>
                <el-input v-model="item.value" v-if="item.texttype=='textarea'" type="textarea" style="width:200px"></el-input>
                <el-select v-model="item.value" v-if="item.texttype=='select'"></el-select>
            </el-form-item>
        </el-form> -->
		<div class="j_alert1 add_value">
			<el-dialog :title="jTit" :visible.sync="isShow" width="54%" @close="jClose">
				<el-alert title="提示：VALUE、字段名称、字段类型一旦添加完成不可修改" :closable="false"></el-alert>
			  	<el-form ref="form" :model="form" label-width="140px" :inline="true" :rules="rules">
				  	<el-form-item label="VALUE:" prop="value" >
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
					<el-form-item label="适用流转方式:" prop="circulation">
						<el-checkbox-group v-model="form.circulation">
							<el-checkbox v-for="(item,index) in dictionary.flow_mode" 
								:ref="item.zhCn" 
								:id="item.id" 
								:dictKey="item.dictKey" 
								:label="item.zhCn" 
								:value="item.zhCn" 
								:key="index" 
								name="circulation"
								border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="适用页面:" prop="system">
						<el-checkbox-group v-model="form.system">
							<el-checkbox v-for="(item,index) in dictionary.trans_goods_channel" 
								:ref="item.zhCn" 
								:id="item.id" 
								:dictKey="item.dictKey" 
								:label="item.zhCn" 
								:value="item.zhCn" 
								:key="index" 
								name="system"
								border></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="地源分组标识:" prop="landType">
					    <el-select v-model="form.landType" placeholder="请选择">
						  <el-option v-for="(item,index) in dictionary.supply_type" :ref="item.zhCn" 
                  			:id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.dictKey" :key="index">
						  </el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="委托交易分组标识:" prop="tradeType">
					    <el-select v-model="form.tradeType" placeholder="请选择">
						   <el-option v-for="(item,index) in dictionary.trade_type" :ref="item.zhCn" 
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
					<el-form-item label="备注:" prop="remarks" style="width:100%">
					    <el-input type="textarea" placeholder="此处是备注" maxlength="2000" minlength="0" v-model="form.remarks" show-word-limit>

						{{form.remarks? form.remarks.length: 0}}/2000
						</el-input>
					</el-form-item>
					<el-form-item style="width: 100%;text-align: center">
					    <el-button type="warning" @click="onSubmit('form')">保存</el-button>
					    <el-button @click="jClose">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import qs from "qs";
	export default {
		data() {
			return {
				ddd:[],
				activeName: 'first',
				isShow: false,
				choice1:["字段别称", "长度", "控件类型", "是否必填", "单位", "所在信息分组",  "操作"],
				choice2:["字段别称", "长度", "控件类型", "是否必填", "单位", "所在信息分组",  "操作"],
				// choice2:["排序", "所在信息分组", "长度", "字段别称", "是否必填", "单位", "操作"],
				tableData: [],
				jTit: '新增',
				jState: '1',
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
					texttype:"",//控件类型 【字典值】
					unit: '',//单位
					circulation:[],
					landType:"",	
					system:[],//适用页面 
					tradeType:""
				},
				pageNo: 1,
				pageSize: 20,
				totalPage: 1,
				totalRecord: 1,
				state:"",
				j_search: '',
				j_search1: '',
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
				checkboxGroup1: [],
				amend:0,
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
			};
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
						console.log(dicArr[this.dicNum]);
						this.dictionary[item] = dicArr[this.dicNum];
						this.dicNum++;
					}
				this.dicFinsh = true;
				console.log('字典结果',this.dictionary);
			});
//			请求默认基础字段列表
			this.getList(this.jState);
		},
		methods: {
//			选项卡切换
			handleClick(tab) {
				if (tab.index == 0){
					this.jState = 1;
				}else {
					this.jState = 2;
				}
				this.getList(this.jState);
			},
//			获取列表
			getList(e){
				this.$get(`/epf-field/transDic`, {
					name:this.j_search,
					state: e,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
				}).then(res => {
					this.pageNo = res.pager.pageNo;
					this.pageSize = res.pager.pageSize;
					this.totalPage = res.pager.totalPage;
					this.totalRecord = res.pager.totalRecord
					this.tableData = res.pager.results;
					this.j_search = ""
				});
			},
			// 验证添加VAlue 唯一值
			
//			弹窗点击保存
			onSubmit(formName,e) {
				console.log(this.form.value)
				let flag = ""
				// 验证添加VAlue 唯一值
				if(this.amend == 0){ 
					this.$get(`/epf-field/transDic/checkValue`,{ value:this.form.value }).then(res=>{
						if(res.status){
							flag = false
							this.$message.error("此VALUE已存在");
							return false;
						}else{
							flag = true
							this.Submit(formName);
						}
					})
				} else { 
					flag = true
					this.Submit(formName);
				}
			},
			//调用新增/修改接口
			Submit(formName){	
					let arr1 = []
					let arr2 = []
					this.$refs[formName].validate((valid) => {
						if (valid) {
							let token = sessionStorage.getItem("token");
							this.form.token = token;
	//			           	因后台问题需暂时清空，正常后请直接删除
							// this.form.createTime = '';
							this.form.isNull = this.form.isNull * 1
							this.form.length = this.form.length * 1
							this.form.circulation.map((item,index,arr)=>{
								arr1.push(item)
								if(item == "出租"){ this.form.circulation[index] = "rent" }
								if(item == "转让"){ this.form.circulation[index] = "transfer" }
								if(item == "抵押"){ this.form.circulation[index] = "mortgage"}
							})
							this.form.system.map((item,index,arr)=>{
								arr2.push(item)
								if(item == "供需"  ){ this.form.system[index] = 'supply_and_demand' }
								if(item == "交易"  ){ this.form.system[index] = 'deal' }
							})
							let strCirculation = this.form.circulation.toString()
							let strSystem = this.form.system.toString()
							this.form.circulation = strCirculation
							this.form.system = strSystem
	//			          	判断是基础or扩展
							if (this.jState == 1){
								this.form.state = 1;
							}else {
								this.form.state = 2;
							}
							console.log(this.form)
	//						判断是添加or修改
							let jUrl = '';
							let txt = '';
							if (this.jTit == '新增'){
								this.form.id = ""
								jUrl = '/epf-field/transDic';
								txt = '添加成功';
							}else{
								jUrl = '/epf-field/transDic';
								txt = '修改成功';
							}
							this.$post(jUrl, this.form).then(res => {
								if (res.code == '0000'){
									this.form.circulation = arr1
									this.form.system = arr2
	//								关闭弹窗
									this.isShow = false;
	//								提示成功
									this.$message({
										message: txt,
										type: 'success'
									});
	//							 	重新请求列表
									this.getList(this.jState);
								}
							});	
						} else {
							return false;
						}
					})
				},
//			获取定制列选项
		    getChoice(){
		    	console.log(this.choice)
		    },
//			添加动态class
		    forClass(e){
		    	return 'j_tableTh'+e;
		    },
//		 	点击修改
			modify(e){
				//				修改弹窗标题
				this.jTit = '修改';
//				显示弹窗
				this.isShow = true;
				this.form.circulation ? this.form.circulation:[]
				this.form.system ? this.form.system:[]
//				表单回显请求
				let token = sessionStorage.getItem("token");
				this.$get(`/epf-field/transDic/queryById`, {
					id: e
				}).then(res => {
					console.log("+++++++++++++++++++++++++++++++++++++++++++++",res)
					let arr  = []
					if(res.result.circulation.indexOf('rent') != -1){ arr.push('出租') }
					if(res.result.circulation.indexOf('mortgage') != -1){ arr.push('抵押') }
					if(res.result.circulation.indexOf('transfer') != -1){ arr.push('转让') }
					let arr2 = []
					if(res.result.system.indexOf('deal') != -1){ arr2.push('交易') }
					if(res.result.system.indexOf('supply_and_demand') != -1){ arr2.push('供需') }
					res.result.system = arr2;
					res.result.circulation = arr;
					this.form = res.result;
					for(var key in this.form){
						if((!this.form[key] || this.form[key] == "") && this.form[key] != '0'){
							delete this.form[key]
						}
					}
				});				
				this.amend = 1;
			},
//			点击添加
			jAdd(){
				if(this.form.id){
					this.form.id = ""
				}
				//				修改弹窗标题
				this.jTit = '新增';
//				显示弹窗
				this.isShow = true;		
				this.amend = 0;
			},
//			点击取消
			jClose(){
//				清空表单
				this.$refs['form'].resetFields();
//				关闭弹窗
				this.isShow = false;
			},
//			点击搜索
			jSerche(){
				this.getList(this.jState)
			}
		}
	}
</script>

<style lang="scss" scoped>
.p24 {
	padding: 24px;
}

.bg1 {
	background-color: #f0f4f7;
}

.content {
	background-color: #FFFFFF;
}
.j_first{
	padding: 24px;
}
.j_form{
	overflow: hidden;
}
.j_form1{
	float: left;
	width: 310px;
}
.j_form1 input{
	height: 32px;
	line-height: 32px;
	width: 229px;
	border:1px solid #ccc;
	border-radius:2px 0 0 2px;
	display:inline-block;
}
.j_form1 button{
	cursor: pointer;
	display:inline-block;
	width:68px;
	height: 32px;
	border-width:1px 1px 1px 0;
	border-style:solid;
	border-color:#ccc;
	border-radius: 0 2px 2px 0;
	font-size: 14px;
	background-color: #f5f7fa;
	color: #666666;
}
.j_form2{
	float: right;
}
.j_form2 button{
	cursor: pointer;
	margin-right: 20px;
	width: 72px;
	height: 32px;
	border: 0;
	border-radius: 2px;
	font-size: 14px;
	background-color: #ffa000;
	color: #FFFFFF;
}
.j_table{
	margin-top: 10px;
}
.j_tableTit{
	padding: 12px 0;
	background-color: #E6EBF5;
	border-bottom: 1px solid #EBEEF5;
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
	width: 16.1%;
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

</style>
<style>
.j_first .el-alert{
	margin-bottom: 20px;
	color: #ffa000;
	background-color: #fffadd;
}	
.j_alert1 .el-alert{
	margin-bottom: 24px;
	color: #ffa000;
	background-color: #fffadd;
}
.j_table .el-button--small{
	padding: 0;
}
.j_table .el-button--mini, .el-button--mini.is-round {
	padding:0;
}
.j_table .el-col-8 .el-table__body tbody tr .cell{
	color:#9a9a9a;
}
.j_alert1 .el-form-item{
	width:478px;
	display:inline-block;
	/* width: 340px; */
}
.add_value .el-dialog{
	border:4px solid #cdd3dc;
	border-radius:5px;
}
.add_value .el-dialog__title{
	font-size:16px;
	line-height:37px;
	font-weight: bold;
	padding-top:0;
	padding-bottom:0;
}
.add_value .el-dialog__headerbtn{
	top:7px;
}
.add_value .el-dialog__header{
	padding-top:0;
	padding-bottom:0;

}
.j_alert1 .el-form-item:nth-child(10){
	/* display: block;
	width: 100%; */
}
.j_alert1 .el-form-item:nth-child(11){
	/* display: block;
	width: 100%; */
	/* text-align: center; */
}
.j_alert1 textarea{
	width: 710px !important;
	height: 120px !important;
}
.j_alert1 .el-button--warning{
	background-color: #ffa000;
	border: none;
}
.j_alert1 .el-input__inner{
	width: 217px !important;
}
.j_alert1 .el-checkbox.is-bordered.is-checked{
  border-color:#ffa200;
}
.j_alert1 .el-checkbox__input.is-checked+.el-checkbox__label{
	color:#ffa200;
}
</style>