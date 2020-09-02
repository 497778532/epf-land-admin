<template>
	<div class="p24 bg1">
		<div class="content">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="基础字段" name="first">
					<div class="j_first">
						<el-alert title="列表种字段别称，长度，是否必填，单位，所在信息分组可进行编辑，VALUE,字段列表，字段类型，控件类型，分组标识不可编辑。"></el-alert>
						<div class="j_form">
							<div class="j_form1">
								<input type="text" placeholder="请输入VALUE或字段名称" v-model="j_search" class="el-input__inner"/>
								<button @click="jSerche()">搜索</button>
							</div>
							<div class="j_form2">
								<button @click="jAdd">添加</button>
								<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
								<el-dropdown trigger="click">
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
								</el-dropdown>
							</div>
						</div>
						<div class="j_table">
							<el-row>
							  	<el-col :span="8">
							  		<el-table :data="tableData">
							  			<el-table-column label="不可编辑字段属性">
							  				<el-table-column type="index" label="序号" width="50"></el-table-column>
							  				<el-table-column prop="value" label="VALUE"></el-table-column>
							  				<el-table-column prop="name" label="字段名称"></el-table-column>
							  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
							  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column> 
							  			</el-table-column>
									</el-table>
							  	</el-col>
							  	<el-col :span="16">
									<el-table :data="tableData" width="100%" class='is_edit' v-if="tableData.length">
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
											<div :class="forClass(index)" v-for="(x,index) in choice1">
												<p>{{x}}</p>
												<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
													<div v-if="x=='字段别称'">{{s.alias}}</div>
													<div v-else-if="x=='长度'">{{s.dataLength}}</div>
													<div v-else-if="x=='是否必填'">{{s.isCheck}}</div>
													<div v-else-if="x=='单位'">{{s.unit}}</div>
													<div v-else-if="x=='所在信息分组'">{{s.grouping}}</div>
													<div v-else-if="x=='排序'">{{index+1}}</div>
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
							  	</el-col>
							</el-row>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="扩展字段" name="second">
					<div class="j_first">
						<el-alert title="列表种字段别称，长度，是否必填，单位，所在信息分组可进行编辑，VALUE,字段列表，字段类型，控件类型，分组标识不可编辑。"></el-alert>
						<div class="j_form">
							<div class="j_form1">
								<input type="text" placeholder="请输入VALUE或字段名称" class="el-input__inner" v-model="j_search1"/>
								<button @click="jSerche(1)">搜索</button>
							</div>
							<div class="j_form2">
								<button @click="jAdd">添加</button>
								<i class="el-icon-setting" style="padding-right: 5px;color: #999999;"></i>
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
								</el-dropdown>
							</div>
						</div>
						<div class="j_table">
							<el-row>
							  	<el-col :span="8">
							  		<el-table :data="tableData">
							  			<el-table-column label="不可编辑字段属性">
							  				<el-table-column type="index" label="序号" width="50"></el-table-column>
							  				<el-table-column prop="value" label="VALUE"></el-table-column>
							  				<el-table-column prop="name" label="字段名称"></el-table-column>
							  				<el-table-column prop="dataType" label="字段类型"></el-table-column>
							  				<el-table-column prop="texttypeName" label="控件类型"></el-table-column> 
							  			</el-table-column>
									</el-table>
							  	</el-col>
							  	<el-col :span="16">
									<el-table :data="tableData" width="100%" class='is_edit'>
											<el-table-column label="可编辑字段属性">
												<div :class="forClass(index)" v-for="(x,index) in choice2" :key="index">
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
											<div :class="forClass(index)" v-for="(x,index) in choice2">
												<p>{{x}}</p>
												<div class="j_tableContent" v-for="(s,index) in tableData" v-if="tableData.length">
													<div v-if="x=='字段别称'">{{s.alias}}</div>
													<div v-else-if="x=='长度'">{{s.dataLength}}</div>
													<div v-else-if="x=='是否必填'">{{s.isCheck}}</div>
													<div v-else-if="x=='单位'">{{s.unit}}</div>
													<div v-else-if="x=='所在信息分组'">{{s.grouping}}</div>
													<div v-else-if="x=='排序'">{{index+1}}</div>
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
							  	</el-col>
							</el-row>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="j_alert1">
			<el-dialog :title="jTit" :visible.sync="isShow" width="40%" @close="jClose">
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
					<!-- <el-form-item label="分组标识:" prop="dicValue">
					    <el-select v-model="form.dicValue" placeholder="请选择">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					</el-form-item> -->
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
					<!-- <el-form-item label="所在信息分组:" prop="grouping">
					    <el-select v-model="form.grouping" placeholder="请选择">
					      <el-option label="区域一" value="shanghai"></el-option>
					      <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					</el-form-item> -->
					<el-form-item label="控件类型:" prop="texttype">
					    <el-select v-model="form.texttype" placeholder="请选择">
						   <el-option v-for="(item,index) in dictionary.text_type" :ref="item.zhCn" 
                  			:id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.dictKey" :key="index">
						  </el-option>
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				isShow: false,
				choice1:["排序", "所在信息分组", "长度", "字段别称", "是否必填", "单位", "操作"],
				choice2:["排序", "所在信息分组", "长度", "字段别称", "是否必填", "单位", "操作"],
				tableData: [],
				jTit: '新增',
				jState: '1',
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
					dicValue: '',
					texttype:""
				},
				j_search: '',
				j_search1: '',
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
					],
					texttype: [
		          		{ required: true, message: '请选择', trigger: 'change' },
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
					this.jState = '1';
				}else {
					this.jState = '2';
				}
				this.getList(this.jState);
			},
//			获取列表
			getList(e){
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-contract/transDicController/page`, {
					token: token,
					// type: 'transfer',
					cityCode: '000000',
					state: e,
					isRemove: '',
					idList: '',
					selection: '',
					choice:''
				}).then(res => {
					this.tableData = res.data;
				});
			},
//			弹窗点击保存
			onSubmit(formName,e) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            let token = sessionStorage.getItem("token");
			            this.form.token = token;
//			           	因后台问题需暂时清空，正常后请直接删除
			            this.form.createTime = '';
//			          	判断是基础or扩展
						if (this.jState == '1'){
							this.form.state = '1';
						}else {
							this.form.state = '2';
						}
						console.log(this.form)
//						判断是添加or修改
			            let jUrl = '';
			            let txt = '';
			            if (this.jTit == '添加'){
							jUrl = '/epf-contract/transDicController/save';
							txt = '添加成功';
			            }else{
			            	jUrl = '/epf-contract/transDicController/updateOne';
			            	txt = '修改成功';
			            }
			           	this.$post(jUrl, this.form).then(res => {
							if (res.code == '0000'){
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
//				表单回显请求
				let token = sessionStorage.getItem("token");
				this.$post(`/epf-contract/transDicController/selectOne`, {
					token: token,
					id: e
				}).then(res => {
					this.form = res.data;
				});				
			},
//			点击添加
			jAdd(){
//				修改弹窗标题
				this.jTit = '添加';
//				显示弹窗
				this.isShow = true;		
			},
//			点击取消
			jClose(){
//				清空表单
				this.$refs['form'].resetFields();
//				关闭弹窗
				this.isShow = false;
			},
//			点击搜索
			jSerche(e){
				if(e ==1){
					if(!this.j_search1){
						this.$message.error('请输入搜索内容');
						return false;
					}
					this.$post('/epf-contract/transDicController/page', {
						token: sessionStorage.getItem("token"),
						cityCode: '000000',
						// type: 'transfer',
						cityCode: '000000',
						state: this.jState,
						search: this.j_search1
					}).then(res => {
						this.tableData = res.data;
					});
				}else{
					if(!this.j_search){
						this.$message.error('请输入搜索内容');
						return false;
					}
					this.$post('/epf-contract/transDicController/page', {
						token: sessionStorage.getItem("token"),
						cityCode: '000000',
						// type: 'transfer',
						cityCode: '000000',
						state: this.jState,
						search: this.j_search
					}).then(res => {
						this.tableData = res.data;
					});
				}
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
.j_form1 button{
	cursor: pointer;
	margin-left: 10px;
	width: 88px;
	height: 32px;
	border: 0;
	border-radius: 2px;
	font-size: 14px;
	background-color: #ffca73;
	color: #FFFFFF;
}
.j_form2{
	float: right;
}
.j_form2 button{
	cursor: pointer;
	margin-right: 20px;
	width: 88px;
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
	padding: 14px 0;
	background-color: #E6EBF5;
	border-bottom: 1px solid #EBEEF5;
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
.is_edit {
	/deep/ .el-table__header thead th   {
		background: #E6EBF5;
		border-bottom: 1px solid #EBEEF5;
	} 
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
.j_form1 input{
	width: 200px;
}
.j_form1 input{
	height: 32px;
	line-height: 32px;
}
</style>
<style>
.j_first .el-alert{
	margin-bottom: 20px;
	color: #ffa000;
	background-color: #fffbe5;
}	
.j_alert1 .el-alert{
	margin-bottom: 24px;
	color: #ffa000;
	background-color: #fffbe5;
}
.j_table .el-button--small{
	padding: 0;
}
.j_alert1 .el-form-item{
	width: 340px;
}
.j_alert1 .el-form-item:nth-child(10){
	display: block;
	width: 100%;
}
.j_alert1 .el-form-item:nth-child(11){
	display: block;
	width: 100%;
	text-align: center;
}
.j_alert1 textarea{
	width: 500px !important;
	height: 100px !important;
}
.j_alert1 .el-button--warning{
	background-color: #ffa000;
	border: none;
}
.j_alert1 .el-input__inner{
	width: 217px !important;
}
.j_table .el-table .cell{
	height:23px;
}
</style>