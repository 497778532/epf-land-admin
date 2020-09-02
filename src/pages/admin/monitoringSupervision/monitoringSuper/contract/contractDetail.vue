<template>
  <!-- <div>合同监测详情</div> -->
  <div class="page-body" id="contractDetail">
    <div class="filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <p class="table_title">合同详情页</p>
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          bordercolor="#dcdfe6"
          style="table-layout:fixed;"
        >
          <tr height="50px">
            <td width="37%">
              <span class="left_text">合同编号：{{myDetail.contractNo}}</span>
            </td>
            <td width="37%">
              <span class="left_text">合同名称：</span>
              {{myDetail.contractName}}
            </td>
            <td width="26%">
              <span class="left_text special_text">所属行政区域：</span>
              {{myDetail.cantonProvinceName}}- {{myDetail.cantonCityName}}- {{myDetail.cantonAreaName}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text">合同类型：</span>
              {{myDetail.landTypeName}}
            </td>
            <td>
              <span class="left_text">交易方式：</span>
              {{myDetail.transactionType}}
            </td>
            <td>
              <span class="left_text">用途：</span>
              <!-- special_text -->
              {{myDetail.firstClassUseName}}-{{myDetail.secondClassUseName}}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom_filter_wrap">
      <el-tabs
        v-model="activeName"
        type="border-card"
        style="width:100%;overflow-y:auto;overflow-x:hidden;"
      >
        <el-tab-pane label="合同详情" name="pending">
          <div class="signatureDetails_warp" v-if="myDetail.landTypeName=='转让'">
            <div class="signatureDetails_left isFixed">
              <ul>
                <li
                  v-for="(item,index) in detailsleftData"
                  :key="index"
                  @click="selectli(index)"
                  :class="{liActive:statekey===index}"
                >{{item}}</li>
              </ul>
            </div>
            <div class="signatureDetails_list">
              <div class="signatureDetails_cont">
                <div class="signNum">
                  <div class="signNumCon signlist0">
                    <p>合同编号：{{myDetail.contractNo}}</p>
                    <p>合同统一编码：{{rules1.recordNo}}</p>
                  </div>
                </div>
                <div class="signtitle" ref="signlist0">
                  {{myDetail.contractName}}
                  <div
                    v-if="myDetail.contractStatus==='contract_status-003'"
                    class="contractCancel"
                  >
                    <span></span>合同撤销审核中
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-004'"
                    class="contractCancel"
                  >
                    <span></span>审核中
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-005'"
                    class="contractsuccess"
                  >
                    <span></span>审核通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-006'"
                    class="contractnosuccess"
                  >
                    <span></span>审核未通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-007'"
                    class="contractnosuccess"
                  >
                    <span></span>审核已撤销
                  </div>
                  <!-- bug2832 -->
                  <div
                    v-if="myDetail.contractStatus==='contract_status-008'"
                    class="contractsuccess"
                  >
                    <span></span>鉴证成功
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-011'"
                    class="contractnosuccess"
                  >
                    <span></span>鉴证失效
                  </div>

                </div>
                <div class="signaturelist signlist1">
                  <div id="signlistTi" style="clear:both;" class="signlistTi">
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方(转让方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号码:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstaddress}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方(受让方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentpersonidnum }}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondaddress}}</div>
                    </div>
                    <div style="clear:both;"></div>
                  </div>

                  <div style="clear:both;"></div>
                </div>
                <div class="signlist signlist2" >
                  <p class="signlistTi">第一条 转让宗地的基本情况</p>
                  <p>1.土地坐落:{{rules1.coordinate}}</p>
                  <p>2.土地性质:{{rules1.nature}}</p>
                  <p>3.使用权类型:{{rules1.useType}}</p>
                  <p>4.土地用途:{{rules1.firstClassUse}}{{rules1.secondClassUse}}</p>
                  <p>5.不动产权证号（或土地证号）:{{rules1.warrantno}}</p>
                  <p>6.房产证号:{{rules1.houseno}}</p>
                  <p>7.建设用地使用权出让合同号（或划拨决定书号）:{{rules1.contractno}}</p>
                  <p>8.转让土地面积:{{rules1.acreage}}平方米</p>
                  <p>9.转让建筑物面积:{{rules1.coveredArea}}平方米</p>
                  <p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
                </div>
                <div class="signlist signlist3" ref="signlist2">
                  <p class="signlistTi">第二条 转让期限</p>
                  <p>建设用地使用权转让期限为 {{rules1.term}} 年,即{{rules1.begindate}}至{{rules1.enddate}}(转让期限不得超过原出让(或出租)合同约定的使用年限减去甲方已使用年限后的剩余年限)。</p>
                </div>
                <div class="signlist signlist4" ref="signlist3">
                  <p class="signlistTi">第三条 转让价款及支付方式</p>
                  <p>付款方式:{{rules1.payment}}</p>
                  <p>转让价款:{{rules1.transferTotalUP}}(大写)</p>
                </div>
                <div class="signlist signlist5" ref="signlist4">
                  <p class="signlistTi">第四条 转让双方权利义务</p>
                  <p>(一)甲方的权利义务</p>
                  <p>1.有权获得土地使用权及地上建筑物、其他附着物所有权转让价款;</p>
                  <p>2.甲方于合同签订30日之内前将土地及地上建(构)筑物、其他附着物交付乙方;</p>
                  <p>3.甲方保证本合同第一条所述内容真实,保证不动产权属清晰,符合法律、法规、规章和有关政策规定的以及原出让(或出租、划拨决定书)合同约定的土地使用权转让应具备的条件;</p>
                  <p>4.法律、法规、规章和政策规定的其他权利和义务;</p>
                  <p>5.双方约定的甲方其它权利或义务请写在附件中。</p>
                  <p>(二)乙方的权利义务</p>
                  <p>1.乙方有义务无条件全面继受原《建设用地使用权出让(或出租)合同》(或划拨决定书)及《补充协议》确定的权利义务;</p>
                  <p>2.乙方应按约及时足额支付转让价款;</p>
                  <p>3.乙方在本合同项下宗地内进行建设时,有关用水、用气、污水及其他设施与宗地外主管线、用电变电站接口和引入工程,乙方按有关规定办理;</p>
                  <p>4.乙方同意政府为公用事业需要而敷设的各种管道与管线进出、通过、穿越受让宗地,但由此影响受让宗地使用功能的,政府或公用事业营建主体应当给予合理补偿。法律、法规、规章和政策所规定的其他权利和义务;</p>
                  <p>5.乙方应当按照《建设用地使用权出让(或出租)合同》(或划拨决定书)约定的土地用途、容积率利用土地,不得擅自改变。</p>
                  <p>6.乙方按照本合同约定支付全部建设用地使用权转让价款,领取不动产权证书后,有权将本合同项下的全部或部分建设用地使用权转让。</p>
                  <p>7.双方约定的乙方其它权利或义务请写在附件中详细说明</p>
                </div>
                <div class="signlist signlist6" ref="signlist5">
                  <p class="signlistTi">第五条 违约责任</p>
                  <p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
                  <p>2.乙方应当按照本合同约定,按时支付建设用地使用权转让价款。乙方不能按时支付建设用地使用权转让价款的,自违约之日起,每日按迟延支付款项的 15‰向转让人缴纳违约金,延期付款超过60日,经甲方催交后仍不能支付建设用地使用权转让价款的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
                  <p>3.因一方违约导致合同解除的,违约方应按转让成交价总额的 10 %承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任</p>
                  <p>4.乙方按本合同约定支付建设用地使用权转让价款的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权转让价款的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算。甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,要求甲方退还已经支付建设用地使用权转让价款,并可请求甲方赔偿损失。</p>
                  <p>5.甲乙双方应在本合同签署之日起30日内,共同到建设用地二级市场交易服务中心申请办理转让手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按转让价款总额的 15 ‰支付违约金。</p>
                </div>
                <div class="signlist signlist7" ref="signlist6">
                  <p class="signlistTi">第六条 合同解除</p>
                  <p>1.甲乙双方协商一致后,可解除本合同。</p>
                  <p>2.乙方迟延履行支付款项义务,经甲方催告后在合理期限内仍未履行的,甲方有权解除本合同。</p>
                  <p>3.甲方拒不履行配合乙方办理转让相关手续或因甲方原因造成迟延交付建设用地使用权的,经乙方催告后在合理期限内仍未履行的,乙方有权解除本合同。</p>
                  <p>4.甲乙双方约定的其他情形请在附件中约束。</p>
                </div>
                <div class="signlist signlist8" ref="signlist7">
                  <p class="signlistTi">第七条 其他约定事项</p>
                  <p>甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
                </div>
                <div class="signlist signlist9" ref="signlist8">
                  <p class="signlistTi">第八条 争议解决</p>
                  <p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第_种方式解决纠纷。</p>
                  <p>1.向成都仲裁委员会申请仲裁。</p>
                  <p>2.向不动产所在地人民法院提起诉讼。</p>
                </div>
                <div class="signlist signlist10" ref="signlist9">
                  <p class="signlistTi">第九条 附则</p>
                  <p>1.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。2.本合同自甲乙双方签字、盖章之日起生效。</p>
                  <p>3.本合同一式份,甲方执一份,乙方执一份,建设用地二级市场交易服务中心存档壹份,每份具有同等法律效力。</p>
                  <div class="signlistwarp">
                    <div class="signlistwarpTi">
                      <span>甲方盖章(或签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>乙方盖章(或签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>甲方代表(签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>乙方代表(签字):</span>
                    </div>
                    <div class="signlistwarptime">
                      <span>年</span>
                      <span>月</span>
                      <span>日</span>
                    </div>
                  </div>
                </div>

                <!-- <div class="signlist" ref="signlist11">
                  <p class="signlistTi">附件</p>
                  <ul class="signlistenclosure">
                    <template>
                      <li  v-for="(item,index) in tableData" :key="index">
                        <span v-if="item.files.length != 0">{{item.files[0].fname}}</span>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="signlist" ref="signlist11" style="margin-top:0">
                  <p class="signlistTi">签字版合同</p>
                  <ul class="signlistenclosure">
                    <li>
                      <span>查看</span>
                    </li>
                  </ul>
                </div> -->

                <div style="clear:both;"></div>
              </div>
            </div>
          </div>
          <div class="signatureDetails_warp" v-if="myDetail.landTypeName=='抵押'">
            <div class="signatureDetails_left" :class="searchBarFixed == false ? 'isFixed' :''">
              <ul>
                <li
                  v-for="(item,index) in detailsleftData1"
                  :key="index"
                  @click="selectli(index)"
                  :class="{liActive:statekey===index}"
                >{{item}}</li>
              </ul>
            </div>
            <div class="signatureDetails_list">
              <div class="signatureDetails_cont">
                <div class="signNum">
                  <div class="signNumCon signlist0">
                    <p>合同编号：{{myDetail.contractNo}}</p>
                    <p>合同统一编码：{{rules1.recordNo}}</p>
                  </div>
                </div>
                <div class="signtitle">
                  {{myDetail.contractName}}
                  <div
                    v-if="myDetail.contractStatus==='contract_status-003'"
                    class="contractCancel"
                  >
                    <span></span>合同撤销审核中
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-004'"
                    class="contractCancel"
                  >
                    <span></span>审核中
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-005'"
                    class="contractsuccess"
                  >
                    <span></span>审核通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-006'"
                    class="contractnosuccess"
                  >
                    <span></span>审核未通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-007'"
                    class="contractnosuccess"
                  >
                    <span></span>审核已撤销
                  </div>
                  <!-- bug2832 -->
                  <div
                    v-if="myDetail.contractStatus==='contract_status-008'"
                    class="contractsuccess"
                  >
                    <span></span>鉴证成功
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-011'"
                    class="contractnosuccess"
                  >
                    <span></span>鉴证失效
                  </div>
                </div>
                <div class="signaturelist" ref="signlist1">
                  <div id="signlistTi" style="clear:both;" class="signlistTi">
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方(抵押方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号码:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstaddress}}</div>
                    </div>
                    <div class="signaturelistcon signlist1">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方(受让方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentpersonidnum }}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondaddress}}</div>
                    </div>
                    <div style="clear:both;"></div>
                  </div>

                  <div style="clear:both;"></div>
                </div>

                <div class="signlist signlist2" ref="signlist1">
                  <p class="signlistTi">第一条 抵押宗地的基本情况</p>
                  <p>1.土地坐落:{{rules1.coordinate}}</p>
                  <p>2.土地性质:{{rules1.nature}}</p>
                  <p>3.使用权类型:{{rules1.useType}}</p>
                  <p>4.土地用途:{{rules1.firstClassUse}}{{rules1.secondClassUse}}</p>
                  <p>5.不动产权证号（或土地证号）:{{rules1.warrantno}}</p>
                  <p>6.房产证号:{{rules1.houseno}}</p>
                  <p>7.建设用地使用权出让合同号（或划拨决定书号）:{{rules1.contractno}}</p>
                  <p>8.宗地总面积:{{rules1.allArea}}平方米</p>
                  <p>9.抵押土地面积:{{rules1.acreage}}平方米</p>
                  <p>10.抵押建筑物面积:{{rules1.coveredArea}}平方米</p>
                  <p>11.抵押物价值认定方式：口双方协商口委托具有资质的评估机构评估。</p>
                  <p>12.地块的具体位置详见附图，附图已经双方签字盖章确认。</p>
                </div>
                <div class="signlist signlist3" ref="signlist2">
                  <p class="signlistTi">第二条 本合同担保的主债权</p>
                  <p>1.债权人:{{rules1.creditor}}</p>
                  <p>2.债务人:{{rules1.debtor}}</p>
                  <p>3.其他当事人:{{rules1.otherParties}}</p>
                  <!-- <p>4.主债权数额:{{rules1.mortgageTotalUP}}（大写）</p> -->
                  <!-- <p>4.主债权数额:（小写）{{rules.amountOfPrincipal}}万元 （大写）{{rules.total}}</p> -->
                  <p>4.主债权数额:（小写）{{Division(rules1.amountOfPrincipal)}}万元 （大写） {{NumToChinese(rules1.amountOfPrincipal)}}</p>
                  <p>5.债务履行期限:{{rules1.term}}年</p>
                </div>
                <div class="signlist signlist4" ref="signlist3">
                  <p class="signlistTi">第三条 本合同抵押担保范围</p>
                  <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
                  <p>2.“总体规划”指经中国政府批准的开发区域的开发建设总体规划。</p>
                  <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
                  <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
                </div>
                <div class="signlist signlist5" ref="signlist4">
                  <p class="signlistTi">第四条 抵押期限</p>
                  <p>
                    建设用地使用权抵押期限为 {{rules1.term}} 年,即{{rules1.beginDate}}
                    至{{rules1.endDate}}(抵押期限不得超过原出让(或出租)合同约定的使用年限减去甲方已使用年限后的剩余年限)。
                  </p>
                </div>
                <div class="signlist signlist6" ref="signlist5">
                  <p class="signlistTi">第五条 抵押登记</p>
                  <p>1.本合同自生效之日起 30 日内,由甲乙双方共同到不动产登记部门办理抵押登记; 未经抵押登记的,抵押权不得对抗第三人。</p>
                  <p>2.抵押登记的事项发生变化,依法需要进行变更登记的,甲乙双方应当自登记事项变更之日起 30 日内共同到不动产登记部门办理抵押权变更登记手续。</p>
                  <p>3.抵押权消灭时,甲乙双方应于抵押权消灭之日起日内共同到不动产登记部门办理抵押权注销登记。</p>
                  <p>4.本合同甲乙双方应本着诚实信用的原则相互配合,并按照本条1-3款的规定办理相关手续。如果因其中任何一方的原因未能在前述期限内办妥相关手续的,该方应对另一方因此遭受的损失承担赔偿责任。</p>
                  <p>5.双方约定的其它事项。</p>
                </div>
                <div class="signlist signlist7" ref="signlist6">
                  <p class="signlistTi">第六条 甲方的义务</p>
                  <p>1.甲方合法拥有本次抵押的建设用地使用权(地上建构筑物的所有权),如抵押物属于依法须经有关部门批准或同意方可抵押的,甲方保证其已取得合法有效的批准或同意。</p>
                  <p>2.抵押期间,抵押的不动产由甲方占有和管理,甲方应妥善管理、合理使用抵押的不动产,以维护抵押物的价值,并接受乙方的监督和检查,未经乙方书面同意,甲方不得将抵押的不动产全部或部分进行转让、抵偿第三方债务、赠与或以其他方式进行物权处分。但受让人代为清偿债务消灭抵押权的除外。</p>
                  <p>3.抵押的不动产在抵押期间被采取查封、扣押等财产保全或执行措施的,抵押的不动产的权属发生争议或受到第三人的侵害,或者抵押的不动产发生其他不利于乙方抵押权实现的情形的,甲方应当在情形发生后30日内及时通知乙方,并配合乙方落实好本合同项下主债权及其他一切相关费用安全偿还的保障措施。</p>
                  <p>4.甲方在抵押期间经济情况和信用情况发生重大变化等影响本公同项下主债权清偿的情形时,应在情形发生后30日内及时通知乙卞,并配合乙方落实好本合同项下主债权及其他一切相关费用安全偿还的保障措施。</p>
                  <p>5.甲方应承担的其它义务请在附件中写明。</p>
                </div>
                <div class="signlist signlist8" ref="signlist7">
                  <p class="signlistTi">第七条 乙方的义务</p>
                  <p>1.乙方应在签订合同之前对抵押的不动产进行现场勘验和认真调查,对其权属、坐落、部位、现状及权属证书记载等有关情况了解清楚。</p>
                  <p>2.在本合同抵押担保范围内的全部债权得到清偿后,乙方应协助甲方办理注销抵押登记。</p>
                  <p>3.妥善保管抵押登记证明文件以及与本合同相关的其他资料,若遗失或毁损的应当负责补办并承担由此造成的损失。</p>
                  <p>4.乙方应承担的其它义务请在附件中写明。</p>
                </div>
                <div class="signlist signlist9" ref="signlist8">
                  <p class="signlistTi">第八条 抵押不动产的再抵押</p>
                  <p>甲方将抵押不动产余额部分再次抵押时,应通知乙方并告知新抵押权人抵押不动产已经抵押的情况,但所担保债权不得超出余额部分的 10 %。</p>
                </div>
                <div class="signlist signlist10" ref="signlist9">
                  <p class="signlistTi">第九条 抵押权的实现条件</p>
                  <p>城押期间,出现下列情形之一的,乙方有权实现抵押权,并就抵押不动产所得价款优先受偿:</p>
                  <p>1.合同项下主债权履行期届满后,债务人未能按时履行债务或者延长的期限届满后仍不能履行。</p>
                  <p>2.本合同项下主债权的债务人死亡或者被宣告死亡而无人代为羼行到期债务的;或者债务的合法继承人、受遗赠人拒绝履行到期债务的。</p>
                  <p>3.甲方被依法宣告解散或破产的。</p>
                  <p>4.甲方的行为足以使抵押不动产价值减少,乙方请求甲方恢复原炔或提供担保遭到拒绝,或抵押不动产被司法机关等有权机关采取查封等强制措施而甲方未根据乙方的要求落实债务偿还保障措施的。</p>
                </div>
                <div class="signlist signlist11" ref="signlist10">
                  <p class="signlistTi">第十条 抵押权的实现方式</p>
                  <p>1.当出现本合同第九条约定的情形之一时,乙方可经下列方式实现抵押权:</p>
                  <p>(1)甲方和乙方达成协议直接以抵押不动产折价或者拍卖、变卖抵押物；</p>
                  <p>(2)依照法律规定程序处理抵押物。</p>
                  <p>2.乙方实现抵押权时,应通过专门的评估机构对抵押不动产的价值进行评估。乙方实现抵押权时不得损害社会公共利益和他人合法权益。</p>
                  <p>3.实现抵押权所得价款,按下列顺序分配：</p>
                  <p>(1)支付处分抵押物的费用;</p>
                  <p>(2)扣缴抵押物应当缴纳的税费;</p>
                  <p>(3)支付划拨土地使用权应缴纳的土地出让金;</p>
                  <p>(4)偿还抵押权担保范围内的债权;</p>
                  <p>(5)剩余价款交还抵押人。</p>
                </div>
                <div class="signlist signlist12" ref="signlist11">
                  <p class="signlistTi">第十一条 抵押权的消灭</p>
                  <p>抵押期间,出现下列情形之一时,抵押权消灭</p>
                  <p>1.抵押权因所担保的主债权清偿、提存、抵消、免除,混同等原因全部消灭时,抵押权随之消灭;</p>
                  <p>2.抵押不动产因不可抗力发生毁损、灭失等情况且无代位物存在的,抵押权消灭;</p>
                  <p>3.抵押权实现;</p>
                  <p>4.抵押权存续期间届满,抵押权人没有行使抵押权</p>
                </div>
                <div class="signlist signlist13" ref="signlist12">
                  <p class="signlistTi">第十二条 违约责任</p>
                  <p>1.甲、乙任何一方违反本合同约定的义务,不履行或不完全履行合同,给对方造成经济损失的,应承担相应的违约责任,并应当赔偿对方由此遭受的全部损失。</p>
                  <p>2.甲方因隐瞒抵押物存在共有、争议、被查封、被扣押、已经设定过抵押权等情况或提供的资料不实,采取欺诈手段取得登记而给乙方造成经济损失的,甲方应当承担赔偿责任。</p>
                  <p>3.当甲方未按建设用地出让合同约定进行开发或违反其他有关规定,从而影响抵押权的实现时,由此产生的责任由甲方承担。</p>
                  <p>4.甲方逾期不配合办理抵押权登记的,每逾期一日,按抵押物价值总额的 10 ‰支付违约金。</p>
                  <p>5.乙方逾期不配合办理抵押权注销登记的,每逾期一日,按抵押物价值总额的 10 ‰支付违约金。</p>
                </div>
                <div class="signlist signlist14" ref="signlist13">
                  <p class="signlistTi">第十三条 争议解决</p>
                  <p>在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也时向行政主管部门申请行政调解。</p>
                  <p>协商或调解不成的,可选择以下几种方式解决纠纷。</p>
                  <p>1.向仲裁委员会申请仲裁。</p>
                  <p>2.向抵押不动产所在地人民法院提起诉讼。</p>
                </div>
                <div class="signlist signlist15" ref="signlist14">
                  <p class="signlistTi">第十四条 合同生效</p>
                  <p>本合同自甲乙双方签字、盖章之日起生效。</p>
                </div>
                <div class="signlist signlist16" ref="signlist15">
                  <p class="signlistTi">第十五条 双方其他约定</p>
                  <p>甲乙双方确定,若以下约定内容与本合同其他款项约定存在不一致的,以本条约定内容为准:</p>
                </div>
                <div class="signlist signlist17" ref="signlist10">
                  <p class="signlistTi">第十六条 附则</p>
                  <p>本合同一式份,甲方执一份、乙方执一份,建设用地二级市场交易服务中心存档壹份,每份具有同等法律效力。</p>
                  <div class="signlistwarp">
                    <div class="signlistwarpTi">
                      <span>甲方签字：</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>乙方签字：</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>身份证号：</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>身份证号：</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>证明人：</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>证明人：</span>
                    </div>
                    <div class="signlistwarptime">
                      <span>年</span>
                      <span>月</span>
                      <span>日</span>
                    </div>
                  </div>
                </div>

                <div style="clear:both;"></div>
              </div>
            </div>
          </div>
          <div class="signatureDetails_warp" v-if="myDetail.landTypeName=='出租'">
            <div class="signatureDetails_left" :class="searchBarFixed == false ? 'isFixed' :''">
              <ul>
                <li
                  v-for="(item,index) in detailsleftData"
                  :key="index"
                  @click="selectli(index)"
                  :class="{liActive:statekey===index}"
                >{{item}}</li>
              </ul>
            </div>
            <div class="signatureDetails_list">
              <div class="signatureDetails_cont">
                <div class="signNum">
                  <div class="signNumCon">
                    <p>合同编号：{{myDetail.contractNo}}</p>
                    <p>合同统一编码：{{rules1.recordNo}}</p>
                  </div>
                </div>
                <div class="signtitle" ref="signlist0">
                  {{myDetail.contractName}}
                  <div v-if="myDetail.contractStatus==='contract_status-003'" class="contractCancel">
                    <span></span>合同撤销审核中
                  </div>
                  <div v-if="myDetail.contractStatus==='contract_status-004'" class="contractCancel">
                    <span></span>审核中
                  </div>
                  <div v-if="myDetail.contractStatus==='contract_status-005'" class="contractsuccess">
                    <span></span>审核通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-006'"
                    class="contractnosuccess"
                  >
                    <span></span>审核未通过
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-007'"
                    class="contractnosuccess"
                  >
                    <span></span>审核已撤销
                  </div>
                  <!-- bug2832 -->
                  <div
                    v-if="myDetail.contractStatus==='contract_status-008'"
                    class="contractsuccess"
                  >
                    <span></span>鉴证成功
                  </div>
                  <div
                    v-if="myDetail.contractStatus==='contract_status-011'"
                    class="contractnosuccess"
                  >
                    <span></span>鉴证失效
                  </div>
                </div>
                <div class="signaturelist" ref="signlist1">
                  <div id="signlistTi" style="clear:both;" class="signlistTi">
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方(出租方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.firstidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号码:</div>
                      <div class="signaturelistdetail">{{rules1.firstagentpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>甲方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.firstaddress}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方(受让方):
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondparty}}</div>
                    </div>
                    <div class="signaturelistcon"></div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件类型:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationtype}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方证件号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondidentificationnum}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法定代表人:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalperson}}</div>
                    </div>
                    <div class="signaturelistcon" v-show="rules1.secondidentificationtype !='身份证'">
                      <div class="signaturelistconTitle">
                        <span>*</span>法人身份证号:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondlegalpersonidnum}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">委托代理人:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentperson}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">代理人身份证号:</div>
                      <div class="signaturelistdetail">{{rules1.secondagentpersonidnum }}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系电话:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondphone}}</div>
                    </div>
                    <div class="signaturelistcon">
                      <div class="signaturelistconTitle">
                        <span>*</span>乙方联系地址:
                      </div>
                      <div class="signaturelistdetail">{{rules1.secondaddress}}</div>
                    </div>
                    <div style="clear:both;"></div>
                  </div>

                  <div style="clear:both;"></div>
                </div>

                <div class="signlist" ref="signlist1">
                  <p class="signlistTi">第一条 出租宗地的基本情况</p>
                  <p>1.土地坐落:{{rules1.coordinate}}</p>
                  <p>2.土地性质:{{rules1.nature}}</p>
                  <p>3.使用权类型:{{rules1.useType}}</p>
                  <p>4.土地用途:{{rules1.firstClassUse}}{{rules1.secondClassUse}}</p>
                  <p>5.不动产权证号:{{rules1.warrantno}}</p>
                  <p>6.房产证号:{{rules1.houseno}}</p>
                  <p>7.土地证号:{{rules1.contractno}}</p>
                  <p>8.出租土地面积:{{rules1.acreage}}平方米</p>
                  <p>9.出租建筑物面积:{{rules1.coveredArea}}平方米</p>
                  <p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
                </div>
                <div class="signlist" ref="signlist2">
                  <p class="signlistTi">第二条 租赁期限</p>
                  <p>本合同项下的建设用地使用权及地上建筑物、其他附着物所有权租赁年限为 {{rules1.term}}个月,即{{rules1.begindate}}至{{rules1.enddate}}止。</p>
                </div>
                <div class="signlist" ref="signlist3">
                  <p class="signlistTi">第三条 租金缴纳</p>
                  <p>1.乙方同意按本合同规定向甲方支付租金。</p>
                  <!-- <p>2.本合同出租不动产租金为人民币 {{rules1.rentUP}} /月(大写）,总租金为人民币 {{rules1.rentTotalUP}} (大写）。</p> -->
                  <p>2.本合同出租不动产租金为人民币（大写） {{NumToChinese(rules1.rent)}} /月（小写）{{Division(rules1.rent)}}万元/月,
                         总租金为人民币（大写） {{NumToChinese(rules1.rent*rules1.term)}} （小写）{{Division((rules1.rent*rules1.term))}}万元。</p>
                  <p>3.付款方式{{rules1.payment}}</p>
                </div>
                <div class="signlist" ref="signlist4">
                  <p class="signlistTi">第四条 双方的权利与义务</p>
                  <p>(一)甲方的权利义务</p>
                  <p>1.甲方有权按本合同约定向乙方收取租金;</p>
                  <p>2.甲方有义务30日前将本合同项下的建设用地及地上建筑物、其他附着物交付乙方使用;</p>
                  <p>3.甲方有义务协助乙方办理相关租赁鉴证手续;</p>
                  <p>4.租赁期间,除法律、行政法规及本合同另有约定外,甲方不得擅自收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
                  <p>5.甲方有权监督乙方按法定用途使用土地,乙方擅自改变土地用途的,甲方有权提前收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
                  <p>6.甲方保证租赁期间未经乙方同意,不设立供役地义务等影响乙方正常使用土地及地上建筑物、其他附着物的权利负担;</p>
                  <p>7.以划拨方式取得的建设用地使用权经依法批准出租的,甲方有义务按照有关规定上缴应缴的土地出让收益金;</p>
                  <p>8.以出租方式取得的土地使用权,甲方将土地转租给乙方使用的,甲方应事先征得出让方的同意。</p>
                  <p>9.双方约定的甲方其它权利或义务请写在附件中。</p>
                  <p>(二)乙方的权利义务</p>
                  <p>1.乙方有义务按时向甲方支付租金;</p>
                  <p>2.乙方有义务按法定用途使用土地;</p>
                  <p>3.乙方租赁土地上修建建(构)筑物的,需要按临时建筑办理相关规划、建设、环保等手续,接受国土、规建、环保等部门监管,不办理不动产登记;</p>
                  <p>4.乙方不得将租赁建设用地及地上建筑物、其他附着物进行转让、抵押,未经甲方同意,不得转租给第三方;</p>
                  <p>5.租赁期限届满或本合同提前终止的,乙方需及时、完好地向甲方交还本合同项下建设用地及地上建筑物、其他附着物;</p>
                  <p>6.双方约定的其它权利或义务请写在附件中。</p>
                </div>
                <div class="signlist" ref="signlist5">
                  <p class="signlistTi">第五条 违约责任</p>
                  <p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
                  <p>2.乙方应当按照本合同约定,按时支付建设用地使用权租金。乙方不能按时支付建设用地使用权租金的,自违约之日起,每日按迟延支付款项的_15‰向出租人缴纳违约金,延期付款超过日,经甲方催交后仍不能支付建设用地使用权租金的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
                  <p>3.因一方违约导致合同解除的,违约方应按转让租赁价总额的_10___%承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任。</p>
                  <p>4.乙方按本合同约定支付建设用地使用权租金的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权租货总价的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算.甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,退还已经支付建设用地使用权租金,并可请求甲方赔偿损失。</p>
                  <p>5.甲乙双方应在本合同签署之日起___30_日内,共同到建设用地二级市场交易服务中心申请办理租赁鉴证手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按租金总额的_15‰支付违约金。</p>
                </div>
                <div class="signlist" ref="signlist6">
                  <p class="signlistTi">第六条约定事项</p>
                  <p>1.对本合同的任何变更,需经双方同意并以书面形式作出方可生效,双方需持变更后的书面协议到建设用地二级市场交易服务中心办理租赁鉴证变更。</p>
                  <div>
                    2.有下列情形之一,本合同终止:
                    <p>(1)本合同约定的租赁期限届满;</p>
                    <p>(2)租赁期内,双方就合同终止达成一致;</p>
                    <p>(3)任何一方因地震、水灾、战争等不可抗力丧失继续履行本合同的能力;</p>
                    <p>(4)根据法律、法规的规定,或有管辖权的法院或仲裁机构所作出的终止本合同的判决、裁定或决定而终止本合同;</p>
                    <p>(5)其它</p>
                  </div>

                  <p>3.建设用地使用权及地上建筑物、其他附着物所有权租赁期限届清后,乙方需要继续租赁的,应当在期限届满前___3_月前申请续期,在同等条件下,乙方口是口否享有优先承租权,甲方同意续期的,乙方应当与甲方重新签订租赁合同,并到建设用地二级市场交易服务中心办理租赁鉴证。</p>
                  <p>4.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。以划拨方式取得的建设用地使用权出租的,应经依法批准,并按照有关规定上缴应缴的土地出让收益金。</p>
                  <p>5.本合同经双方签字、盖章生效。</p>
                  <p>6.本合同一式份,甲方执份,乙方执份,建设用地二级市场交易服务中心鉴证壹份,每份具有同等法律效力。</p>
                  <p>7.甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
                </div>
                <div class="signlist" ref="signlist7">
                  <p class="signlistTi">第七条 争议解决</p>
                  <p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第种方式解决纠纷。</p>
                  <p>1.向成都仲裁委员会申请仲裁。</p>
                  <p>2.向不动产所在地人民法院提起诉讼。</p>
                  <div class="signlistwarp">
                    <div class="signlistwarpTi">
                      <span>甲方盖章(或签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>乙方盖章(或签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>甲方代表(签字):</span>
                    </div>
                    <div class="signlistwarpTi">
                      <span>乙方代表(签字):</span>
                    </div>
                    <div class="signlistwarptime">
                      <span>年</span>
                      <span>月</span>
                      <span>日</span>
                    </div>
                  </div>
                </div>

                <!-- <div class="signlist" ref="signlist11">
                  <p class="signlistTi">附件</p>
                  <ul class="signlistenclosure">
                    <template >
                      <li v-for="(item,index) in tableData" :key="index">
                        <span v-if="item.files.length != 0">{{item.files[0].fname}}</span>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="signlist" ref="signlist11" style="margin-top：0">
                  <p class="signlistTi">签字版合同</p>
                  <ul class="signlistenclosure">
                    <li>
                      <span>查看</span>
                    </li>
                  </ul>
                </div> -->

                <div style="clear:both;"></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合同审核记录">
          <div class="main_content">
            <div class="search_box">
              <el-row style="margin-bottom:20px;">
                <el-col :span="2">
                  <span class="filter_title">审核人：</span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="filterData.auditPeople" size="small" placeholder="请输入审核人"></el-input>
                </el-col>
                <el-col :span="2">
                  <span class="filter_title">审核批次：</span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="filterData.auditNo" size="small" placeholder="请输入审核批次"></el-input>
                </el-col>
                <el-col :span="2">
                  <span class="filter_title">审核时间：</span>
                </el-col>
                <el-col :span="6">
                  <el-date-picker
                    v-model="filterData.time"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="截止时间"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <span class="filter_title">审核状态：</span>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="filterData.auditState" placeholder="全部">
                    <el-option label="未开始" value="1"></el-option>
                    <el-option label="进行中" value="2"></el-option>
                    <el-option label="已结束" value="3"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <span class="filter_title">审核类型：</span>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="filterData.auditType" placeholder="全部">
                    <el-option label="合同审核" value="1"></el-option>
                    <el-option label="合同撤销审核" value="2"></el-option>
                    <el-option label="鉴证审核" value="3"></el-option>
                    <el-option label="鉴证变更审核" value="4"></el-option>
                    <el-option label="鉴证终止审核" value="5"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <div class="button_bg" @click="searchList()">查询</div>
                </el-col>
                <el-col :span="2">
                  <div class="button_default" @click="clearList()">重置</div>
                </el-col>
              </el-row>
            </div>

            <div class="table_th" style="margin-top:25px;">合同审核记录列表</div>
            <el-table
              :data="form.histoicFlowList"
              border
              style="width: 100%"
              :header-cell-style="{background:'#f5f7fa',color:'#666',height:'48px'}"
            >
              <el-table-column prop="num" label="序号" width="130" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="approvalNo" label="审核批次" width="265"></el-table-column>
              <el-table-column prop="contractType" label="审核类型" width="250"></el-table-column>
              <el-table-column prop="person" label="提审人" width="150"></el-table-column>
              <el-table-column prop="zhuangtai" label="审核状态" width="195"></el-table-column>
              <el-table-column prop="assigneeName" label="审核人" width="180"></el-table-column>
              <el-table-column prop="time" label="审核时间"></el-table-column>
              <el-table-column label="审核意见" width="190">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">
                    查看
                    <i class="el-icon-caret-bottom" style="margin-left:5px;font-size:16px;"></i>
                  </el-button>
                  <span>{{scope.row.comment}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div
              style="text-align:right;border: 1px solid #ebeef5;padding:25px;box-sizing: border-box;"
            >
              <el-pagination
                background
                layout="total,prev, pager, next,sizes,jumper"
                :page-sizes="[5,10,15,20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :current-page="currentPage"
                :page-size="pageSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合同撤销记录">
          <div class="main_content">
            <div class="table_th">合同撤销记录列表</div>
            <el-table
              :data="repealData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#f5f7fa',color:'#666',height:'48px'}"
            >
              <el-table-column prop="num" label="序号" width="130" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="people" label="撤销申请人" width="385"></el-table-column>
              <el-table-column prop="result" label="审核结果" width="330"></el-table-column>
              <el-table-column prop="time" label="审请时间"></el-table-column>
              <el-table-column label="撤销详情" width="350">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">
                    查看
                    <i class="el-icon-caret-bottom" style="margin-left:5px;font-size:16px;"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div
              style="text-align:right;border: 1px solid #ebeef5;padding:25px;box-sizing: border-box;"
            >
              <el-pagination
                background
                layout="total,prev, pager, next,sizes,jumper"
                :page-sizes="[5,10,15,20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :current-page="currentPage"
                :page-size="pageSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="鉴证记录">
          <div class="main_content">
            <div class="table_th">合同鉴证记录列表</div>
            <el-table
              :data="recordData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#f5f7fa',color:'#666',height:'48px'}"
            >
              <el-table-column prop="num" label="序号" width="130" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="userName" label="申请人" width="155"></el-table-column>
              <el-table-column prop="recordMess" label="鉴证说明"></el-table-column>
              <el-table-column prop="orgName" label="经办人" width="180"></el-table-column>
              <el-table-column prop="organization" label="鉴证机构" width="250"></el-table-column>
              <el-table-column prop="createtime" label="审请时间" width="250"></el-table-column>
              <!-- <el-table-column label="签字版合同" width="230">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">
                    查看
                    <i class="el-icon-caret-bottom" style="margin-left:5px;font-size:16px;"></i>
                  </el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <div
              style="text-align:right;border: 1px solid #ebeef5;padding:25px;box-sizing: border-box;"
            >
              <el-pagination
                background
                layout="total,prev, pager, next,sizes,jumper"
                :page-sizes="[5,10,15,20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :current-page="currentPage"
                :page-size="pageSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import qs from "qs";
import Bus from "../../../../../utils/bus";
import { mapState } from "vuex";
export default {
  name: "contractDetail",
  data() {
    return {
      activeName: "pending",
      // myDetail:{
      //   // landTypeName:"抵押"
      // },
      detail: {},
      trans: "出租",
      rules1: [],
      detailsleftData: [
        "甲方",
        "乙方",
        "第一条",
        "第二条",
        "第三条",
        "第四条",
        "第五条",
        "第六条",
        "第七条",
        "第八条",
        "第九条",
      ],
            detailsleftData1: [
        "甲方",
        "乙方",
        "第一条",
        "第二条",
        "第三条",
        "第四条",
        "第五条",
        "第六条",
        "第七条",
        "第八条",
        "第九条",
         "第九条",
          "第十一条",
           "第十二条",
            "第十三条",
"第十四条",
              "第十五条",
"第十六条",
      ],
            detailsleftData2: [
        "甲方",
        "乙方",
        "第一条",
        "第二条",
        "第三条",
        "第四条",
        "第五条",
        "第六条",
        "第七条",
        "第八条",
        "第九条",
        "签字部分",
        "附件"
      ],
      auditData: [
        {
          auditNo: "ZR20180723001-004",
          auditType: "合同撤销审核",
          bringPeople: "张三",
          auditState: "通过",
          auditPeople: "王晓",
          time: "2018-06-12 16:00:00"
        },
        {
          auditNo: "ZR20180723001-004",
          auditType: "合同审核",
          bringPeople: "李四",
          auditState: "审核不通过",
          auditPeople: "王晓",
          time: "2018-06-12 16:00:00"
        }
      ],
      repealData: [
        {
          people: "张三",
          result: "审核通过",
          time: "2018-06-12 16:00:00"
        },
        {
          people: "李四",
          result: "审核不通过",
          time: "2018-06-12 16:00:00"
        }
      ],
      recordData: [],
      rules: {},
      filterData: {
        auditPeople: "",
        auditNo: "",
        time: "",
        auditState: "",
        auditType: ""
      },
      searchBarFixed: false,
      //日期选择器
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
      tableData: [],
      statekey: 1,
      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,
      form: {
        assessor: "audit_success",
        opinion: "",
        nodes: [],
        histoicFlowList: []
      }
    };
  },
  created() {
    this.getData();
    this.getRecordData(); 
   this.getAuditData();
   this.getRepealData()
  },
  methods: {
    getData() {
      let id = this.myDetail.contractId;
      // this.$get(`/epf-monitor/monitor/moniContract/detail`, {
      this.$post(`/epf-monitor/monicontract/detail`, {
        id: id
      }).then(res => {
        if (res.code == "0") {
          this.rules1 = res.moniContract;
          this.getFuJian();
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    getRepealData() {
      let id = this.myDetail.contractId;
      this.$post(`/epf-monitor/monitor/moniContract/cancelRecord`, {
        id: id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.repealData = res.moniContract;
          console.log(this.repealData);
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },

    // init() {
    //   let token = sessionStorage.getItem("token");
    //   var that = this;
    //   Axios.post(
    //     "/api/epf-contract/transContract/selectApproval",
    //     qs.stringify({
    //       token: token,
    //       contranctId: this.myDetail.contractId,
    //       // status: this.rules1.contractStatus
    //     })
    //   ).then(res => {
    //     if (res.code == "0000") {
    //       this.tabData5 = res.data;
    //       this.$store.state.tabData5 = res.data;

    //       this.tabData2 = [];
    //       res.data.map(e => {
    //         Axios.post(
    //           "/api/epf-activiti/act/task/histoicFlow",
    //           qs.stringify({ token: token, procInsId: e.procInsId })
    //         ).then(res1 => {
    //           res1.histoicFlowList.map(e2 => {
    //             this.tabData2.push(Object.assign(e, e2));
    //           });
    //         });
    //       });
    //       console.log(this.tabData2, "=========");
    //     }
    //   });
    // },
    getFuJian() {
      this.$get(
        "/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=" +
          this.myDetail.contractId +
          "&areaCode=" +
          this.myDetail.cantonProvince,
        {}
      ).then(res => {
        let resData = JSON.parse(res.ztreeJson);
        this.tableData= [];

        for (let i = 0; i < resData.length; i++) {
          if (resData[i].code.indexOf("CONTRACT") != -1) {
            this.tableData = resData[i].childData;
          }
        }
        // debugger;
        console.log(resData)
      });
    },
    getAuditData() {
      let id = this.myDetail.contractId;
      this.$post(`/epf-monitor/monitor/moniContract/examineRecord`, {
        id: id,
        status: this.myDetail.contractStatus
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.auditData = res.moniContract;
          // this.actInfo.businessId=res.moniContract[0].businessId;
          // this.actInfo.procInsId=res.moniContract[0].procInsId;
          // this.actInfo.procDefId=res.moniContract[0].procDefId;
          // this.actInfo.taskId=res.moniContract[0].taskId;
          // var actInfo= this.actInfo;

        }
      });
    },
    //       console.log(this.auditData);
    //     } else {
    //       this.$message.error(res.msg); //失败
    //       return;
    //     }
    //   });
    // },
    getRecordData() {
      let id = this.myDetail.contractId;
      this.$get(`/epf-monitor/monitor/moniContract/putOnRecord`, {
        id: id
      }).then(res => {
        if (res.code == "0") {
          if (res.moniContract) {
            this.recordData.push(res.moniContract);
          }
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    selectli(item) {
      this.statekey = item;
      console.log(item)
      var el = document.getElementsByClassName(`signlist${item}`)[0];
      console.log(el.scrollTop)
      console.log(el)
      this.$nextTick(function() {
        el.scrollIntoView() - 10;
      });
    },

    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val; //显示条数改变
    },
    handleCurrentChange(val) {
      //当前页发生改变时触发
      this.pageNo = val; //页码改变
    }
  },
  mounted() {
    console.log();
  },
  computed: {
    ...mapState("monitoringSupervision", ["myDetail"])
  }
};
</script>

<style>
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-right: 10px;
  text-align: right;
  line-height: 40px;
}
.notice_filter_wrap {
  box-sizing: border-box;
  padding: 25px 28px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  /* -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0); */
}
.notice_box {
  width: 100%;
  height: 35px;
  margin-bottom: 25px;
  padding: 0 15px;
  background-color: #fef6e6;
  border-radius: 10px;
}
.notice_box .notice_text {
  font-size: 14px;
  color: #ffa000;
  line-height: 35px;
}
.bottom_filter_wrap {
  box-sizing: border-box;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  /* -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0); */
  height: 100%;
}
.table_th {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  /* border-bottom: 1px solid transparent; */
  background-color: #f5f7fa;
  text-align: left;
  line-height: 60px;
  font-weight: bolder;
  font-size: 14px;
  padding-left: 25px;
}
.icon_th {
  width: 3px;
  height: 12px;
  background-color: #ffa000;
  display: inline-block;
  margin: 0 12px 0 22px;
  border-radius: 3px;
}
.search_box {
  padding-top: 32px;
  padding-bottom: 32px;
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
}
.table_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
}
.left_text {
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}
.special_text {
  width: 100px;
  text-align: right;
  display: inline-block;
}
.special_text_place {
  width: 70px;
  text-align: right;
  display: inline-block;
}
.special_text_people {
  width: 160px;
  text-align: right;
  display: inline-block;
}
.main_content {
  padding: 28px 28px 60px 28px;
}
.resource_box {
  display: flex;
}
.resources {
  display: flex;
}
.resources li {
  margin-right: 20px;
  width: 130px;
  height: 90px;
  box-sizing: border-box;
  border: 1px dashed #dcdfe6;
  display: inline-block;
  border-radius: 3px;
}
.resource_content {
  width: 130px;
  height: 90px;
  display: inline-block;
  border-radius: 3px;
}
.el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}

.signatureDetails_warp {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.signatureDetails_left {
  width: 110px;
  height: auto;
  background: #fff;
  /* display: none; */
  display: inline-block;
  /* position: absolute;
  right: 10px; */
}
.signatureDetails_left ul {
  width: 100%;
  height: auto;
}
.signatureDetails_left ul li {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border-bottom: solid 1px #f3f3f3;
  text-align: center;
  line-height: 48px;
  color: #646463;
  font-size: 14px;
  cursor: pointer;
}
.signatureDetails_left ul li:hover {
  box-sizing: border-box;
  border-left: 2px solid #ffa000;
  color: #ffa000;
}
.signatureDetails_left ul .liActive {
  box-sizing: border-box;
  border-left: 2px solid #ffa000;
  color: #ffa000;
}
.isFixed {
  position: fixed;
  width: 100px;
  background-color: #fff;
  top: 378px;
  z-index: 999;
  right: 100px;
  display: block !important;
  border: 1px solid #e6e6e6;
}
.signatureDetails_list {
  width: 1200px;
  height: auto;
  background: #f9fafc;
  margin: 0 auto;
}
.signatureDetails_cont {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px 62px 10px 117px;
}
.signNum {
  width: 100%;
  height: 60px;
}
.signNumCon {
  float: right;
}
.signNumCon p {
  color: #666666;
  font-size: 14px;
  line-height: 30px;
}
.signtitle {
  width: 100%;
  height: auto;
  text-align: center;
  line-height: 50px;
  color: #666666;
  font-size: 26px;
  margin: 30px 0;
}
.signtitle div {
  float: right;
  width: 110px;
  height: 34px;
  border-radius: 0px 17px 17px 0px;
  font-size: 14px;
  line-height: 35px;
  margin-top: 7px;
}
.signtitle div span {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.signtitle .contractCancel {
  background: #ebebeb;
  color: #999999;
}
.signtitle .contractsuccess {
  background: #e7f4bd;
  color: #93b52d;
}
.signtitle .contractnosuccess {
  background: #ffd6d7;
  color: #fe3f45;
}
.signaturelist {
  width: 100%;
  height: auto;
}
.signaturelist .signaturelistcon:nth-of-type(2n) {
}
.signaturelist .signaturelistcon {
  width: 50%;
  height: 50px;
  line-height: 44px;
  float: left;
}
.signaturelist .signaturelistcon span {
  color: #fe3f45;
}
.signaturelist .signaturelistcon .signaturelistconTitle {
  display: inline-block;
  width: 30%;
  height: auto;
  border-bottom: none;
  color: #999999;
  text-align: right;
}
.signaturelist .signaturelistcon .signaturelistdetail {
  width: 55%;
  margin-left: 5%;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  border-bottom: solid 2px #f3f3f3;
}
.signlist {
  width: 100%;
  height: auto;
  color: #333;
  font-size: 16px;
  line-height: 35px;
  margin-top: 70px;
}
.signlist .signlistTi {
  color: #666666;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
}
.signlist .signlistwarp {
  width: 870px;
  height: 235px;
  border: solid 1px #979797;
  box-sizing: border-box;
  padding: 40px 68px 10px 119px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
}
.signlist .signlistwarp .signlistwarpTi {
  width: 340px;
  height: auto;
}
.signlist .signlistwarp .signlistwarpTi span {
  display: inline-block;
  font-size: 12px;
  color: #666666;
  text-align: right;
}
.signlist .signlistwarp .signlistwarptime {
  width: 100%;
  height: auto;
  text-align: right;
}
.signlist .signlistwarp .signlistwarptime span {
  margin-left: 40px;
}
.signlist .signlistenclosure {
  width: 100%;
  height: auto;
}
.signlist .signlistenclosure li {
  line-height: 30px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
}
.signlist .signlistenclosure li span {
  color: #4671d5;
}
.signlist .contractbook {
  display: inline-block;
  margin-right: 10px;
}
.signlist .contractbookbutton {
  display: inline-block;
  height: 36px;
  background-color: #ffa000;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  line-height: 36px;
  padding: 0 15px;
}
.signatureDetails_warp .button {
  width: 80px;
  background-color: #ffa000;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  line-height: 36px;
  display: inline-block;
}

#contractDetailel-tabs  .el-tabs--top  {
   
}
</style>