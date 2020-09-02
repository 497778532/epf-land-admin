<template>
  <div id="app">
    <div class="publish_main_cont">
      <table
        v-loading="fliesUpload"
        element-loading-text="上传中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        cellpadding="0"
        cellspacing="0"
        style="width:100%;">
        <tr>  <!-- 表头 -->
          <td v-for="(item,index) in tableNmae" :key="index">
            {{item}}
          </td>
        </tr>
        <tr class="upLoadHidden" v-for="(item,index) in tableData" :key="index">
          <!-- 序号 -->
          <td width="100px">{{index + 1}}</td>
          <!-- 附件清单名 -->
          <td width="350px">
            <span class="text_red" v-if="item.isAux==1">*</span>
            {{item.tname}}
          </td>
          <!-- 文件回显-文件名 -->
          <td  v-if="state">
            <span v-if="item.files.length!== 0" @click="preview(item.files[0])">{{item.files[0].fname}}</span>
            <el-button type="text" v-else style="color:#999" :disabled="true">无数据</el-button>
          </td>
          <!-- 文件上传-文件名 -->
          <td width="350px" v-if="!state">
            <span @click="preview(item.files[0])">{{item.files.length== 0?'':item.files[0].fname}}</span>
          </td>
          <!-- 文件回显-文件操作 -->
          <td width="200px" v-if="state">
            <span v-if="item.files.length!==0">
              <span @click="preview(item.files[0])">
                查看
              </span>
              <span>
                <a :href="baseUrl + item.files[0].fid">下载</a>
              </span>
            </span>
            <!-- <el-button type="text" v-else style="color:#999" :disabled="true">无操作</el-button> -->
          </td>
          <!-- 文件上传-文件操作 -->
          <td width="200px" v-if="!state" class="filesUpload">
            <span v-if="item.files.length!=0"
              @click="deleteFile(index,item.tid,item.files[0].fid)">
              删除
            </span>
            <el-upload
              v-if="item.files.length==0"
              class="upload-demo"
              ref="additionalRef"
              action="/epf-document/document/upload/"
              :before-upload="fileFormatChecking"
              :http-request="annexUpload"
              :on-success="uploadSuccess"
              :on-error="upLoadError"
              >
              <span v-if="item.files.length==0"
                @click="uploadeFile(index,item.tid)">
                上传
              </span>
            </el-upload>
          </td>
        </tr>
      </table>
      <p>
        说明：支持
        <span v-for="(item,index) in fileTy" :key="index">
          .{{item}}
        </span>
        格式
      </p>
    </div>
    <transition name="el-fade-in">
      <div v-show="dialogVisible" class="frameBox">
        <el-row class="trameTitle">
          <el-col :span="12">
            <h2>附件预览</h2>
          </el-col>
          <el-col :span="12">
            <el-button @click="handleClose" :disabled="false">
              关闭 <i class="el-icon-close"></i>
            </el-button>
          </el-col>
        </el-row>
        <iframe :src="src" :style="{width:'100%',height:'100%',boder:'none'}">
        </iframe>
      </div>
    </transition>
  </div>
</template>
<script>
import baseURL1 from '../../utils/config'
import configApi from '../../../config/index'
export default {
  name: 'app',
  props:{
    tableType:Boolean,//table类型，上传||回显 --true:回显 & false:上传
    tableNmae:Array, //表头文字
    belong:String,//请求参数 - 附件所属标识（必传）
    areaCode:String,//请求参数 - 区域标识（必传）
    fileSize:Number,//上传文件大小限制，单位 MB
    fileType:Array,//上传文件格式类型限制
    annexType:String,//模板类型
  },
  data () {
    return {
      baseUrl:'',//地址前缀
      state:this.tableType, //表格类型 - 回显表格||上传表格
      tableData:[],//table数据
      belongId:this.belong, //附件所属标识
      areaCodeId:this.areaCode, //区域标识
      fileSz:this.fileSize,//自定义上传文件大小限制，单位 MB
      fileTy:this.fileType,//自定义上传文件格式类型限制
      annexTy:this.annexType,//模板类型
      transGoods:{
        fileTemplateId:'',
        pId:''
      },
      //* 上传控制数据 */
      transForm: {
        entrustFirstUpload:true,
        pId:null,
      },
      fileIndex:0,//
      href:'',//预览地址
      TidParameters:'',
      src:'',
      dialogVisible:false,
      fliesUpload:false,
    }
  },
  created(){ //请求附件组
    this.baseUrl = baseURL1.baseURL1 +'/epf-document/document/downloadById?id='
      // console.log('公用附件清单参数,',this.belongId,'...',this.areaCodeId)
      this.$get(`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${this.belongId}&areaCode=${this.areaCodeId}`,{}).then(res => {
        // console.log(res)
        // console.log(JSON.parse(res.ztreeJson))
        let resData = JSON.parse(res.ztreeJson)
        // console.log('公用的附件清单',resData)
        for(let i = 0; i < resData.length; i++) {
          if(resData[i].code.indexOf(this.annexTy) != -1){ //附件清单
              this.tableData = resData[i].childData
              this.validiteUpload(this.tableData);
          }
        }
        this.$emit('switchs')
      })
  },
  methods:{
      deleteFile(index,tid,fid){ //删除按钮
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFunction(index,tid,fid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteFunction(index,tid,fid){ //删除附件方法
        let url = `/epf-document/document/deleteByFolder?id=${fid}&fdId=${tid}`
        this.$post(url, {}, res => {
          if (res.state == "SUCCESS") {
            this.tableData[index].files = [];
            this.tableData[index].tsize = 0;
            this.validiteUpload(this.tableData);
          }
        });
        this.tableData[index].files = [];
        this.tableData[index].tsize = 0;
        this.validiteUpload(this.tableData);
      },
      uploadeFile(index,tid){ //上传按钮
        this.fileIndex = index;
        this.TidParameters = tid
        // if(state==0){
        //   this.TemplateCodes = this.fileTemplateId //土地code
        //   this.TidParameters = tid
        // }else if(state==1){
        //   this.TemplateCodes = this.trustFileCode //委托code
        //   this.TidParameters = tid
        // }
      },
      fileFormatChecking(file){ //附件上传格式验证
        this.fliesUpload = true
        let fileType = file.name.split(".").slice(-1)[0]
        let fileSize = file.size / 1024 / 1024 < this.fileSz;
        const fileTyState = this.fileTy.indexOf(fileType.toLowerCase())
        if(fileTyState==-1){
          this.$message.error(`上传附件不能是 ${fileType} 格式!`);
          this.fliesUpload = false
          return false;
        }
        if (file.size==0) {
          this.$message.error(`文件大小不允许${file.size}KB，请重新选择!`)
          this.fliesUpload = false
          return false;
        }
        if (!fileSize) {
          this.$message.error(`上传附件大小不能超过 ${this.fileSz} MB!`);
          this.fliesUpload = false
          return false;
        }
      },
      annexUpload(files){ //附件上传
        const file = files.file
        const formData = new FormData()
        formData.append("files", file)
        formData.append("belong", this.belong)

        if (this.transForm.pId) {
          formData.append("pId", this.TidParameters) //tid赋值
          this.uploadFunction(formData, files, file)
          return;
        }
        if (!this.transForm.pId && this.transForm.entrustFirstUpload) {
          formData.append("pId", this.TidParameters) //tid赋值
          this.transForm.entrustFirstUpload = false
          this.uploadFunction(formData, files, file, "first")
          return
        }
        if (this.transForm.pId && !this.transForm.entrustFirstUpload) {
          this.uploadFunction(formData, files, file)
          return
        }
      },
      uploadFunction(formData, files, file, count) { //上传方法
        this.$useAppend("/epf-document/document/upload", formData).then(res => {
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
          files.onSuccess(res)
        }).catch(error=>{
          this.$message.error('文件上传请求失败')
        })
      },
      uploadSuccess(res,file,fileList){ //上传成功回调
        let fileObject = {
          fname: res.data[0].name,
          fid: res.data[0].id,
          fsize: res.data[0].docSize,
          ftype: res.data[0].extName
        };
        if (this.tableData[this.fileIndex].files.length == 0) {
          this.fliesUpload = false
          this.tableData[this.fileIndex].files.push(fileObject);
        } else {
          this.fliesUpload = false
          this.tableData[this.fileIndex].files[0] = fileObject;
        }
        this.validiteUpload(this.tableData);
      },
      // 校验是否必传
      validiteUpload(datas){
        let isAux = true;
        for(let i = 0; i < datas.length; i ++){
          let fileGroup = datas[i];
          if(fileGroup.isAux == 1){ // 必传标识
            if(fileGroup.files.length == 0){
              isAux = false;
              break;
            }
          }
        }
        this.$emit('isAux',isAux);
      },
      upLoadError(){ //上传失败回调
        this.$message.error('文件上传失败啦')
      },
      preview(data){ //文件预览
        var fileType = data.fname.toString().split(".")[1]
        var api = "http://epf666.com";  //这个api现在已经无意义了，只要保持http：// 这样的一个格式就可以了
        var url = `/api/epf-document/onlinePreview?url=${api},${data.fid}.${fileType}`
        // this.src = url
        // this.dialogVisible = true
        window.open(url)
      },
      handleClose(){ //关闭弹窗回调
        this.src = ''
        this.dialogVisible = false
      },
    backTop () {
      let that = this
      // let timer = setInterval(() => {
      // let ispeed = Math.floor(-that.scrollTop / 5)
      document.documentElement.scrollTop = 0 //document.body.scrollTop = that.scrollTop + ispeed
      // if (that.scrollTop === 0) {
      //   clearInterval(timer)
      // }
      // }, 16)
    },
  }
}
</script>
<style scoped>
*{
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none;  /*webkit浏览器*/
  -ms-user-select: none;   /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
table {
  border: 1px solid #f3f3f3;
}
.publish_main_cont p{
  line-height: 50px;
  margin: 0;
  color: #999999;
  font-size: 14px;
}
.publish_main_cont p span{
  margin: 0 6px 0 0;
  color: #999999;
  font-size: 14px;
  line-height: 50px;
}
table tr{
  width: 100%;
  height: 50px;
}
.upLoadHidden{
  border-bottom: 1px solid #f3f3f3;
}
table tr:nth-child(1) {
  background: #f2f5f7;
}
table tr:nth-child(1) td{
    font-weight: bold;
}
td {
  text-align: center;
  color: #333333;
  font-size: 14px;
}
table tr td:nth-child(3) span{
  color: #4671d5;
}
table tr td:nth-child(4) span,a{
  text-decoration: none;
  color: #4671d5;
  cursor: pointer;
  display: inline-block;
}
table tr td:nth-child(4) span:active{
  transform: translateY(1px);
  color: #55aff8;
}
span {
  cursor: pointer;
}
.text_red{
  color:red;
  margin-right: 5px;
  cursor: auto;
}
.frameBox{
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3000;
}
.trameTitle{
  padding: 10px 125px;
  text-align: right;
}
.trameTitle h2{
  display: inherit;
  font-size: 20px;
  font-weight: 600px;
  line-height: 40px;
  margin-right: -40px;
}
</style>
<style>
.filesUpload .el-upload-list {
  display: none!important;
}
.filesUpload .el-upload-list--text{
  display: none!important;
}
.filesUpload .el-upload-list__item-name{
  display: none!important;
}
</style>
