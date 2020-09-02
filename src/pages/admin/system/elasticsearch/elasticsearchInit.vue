<template>
  <div class="page-body" id="elasticsearchInit">
    <div class="filter_wrap" :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span=2>
            <span class="filter_title">删除搜索:</span>
          </el-col>
          <el-col :span="8">
            <el-input size="small" v-model="esDel.path"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="delEs">发送</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <br/>
    <div class="filter_wrap" :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span=2>
            <span class="filter_title">初始化搜索:</span>
          </el-col>
          <el-col :span="8">
            <el-input size="small" v-model="esInit.path"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="initEs">发送</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <br/>
    <div class="filter_wrap" :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span=2>
            <span class="filter_title">构建搜索:</span>
          </el-col>
          <el-col :span="8">
            <el-input size="small" v-model="esSend.path"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="sendEs">发送</div>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="2">
            <span class="filter_title">参数设置:</span>
          </el-col>
          <el-col :span="10">
            <el-input
              type="textarea"
              :rows="20"
             v-model="esParam">
            </el-input>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from 'zlib';

export default {
  name:'elasticsearchInit',
  components: {
    transferTable
  },

  data() {
    return {
      esInit: {path:'http://localhost/epf-search/es/esLand/searchInit/trade'},
      esSend: {path:'http://localhost:9200/supply'},
      esDel:  {path:'http://localhost:9200/supply'},
      esParam:'{\n' +
        ' "settings":{\n' +
        '  "number_of_shards":3,\n' +
        '  "number_of_replicas":1\n' +
        ' },\n' +
        ' "mappings":{\n' +
        '  "land":{\n' +
        '   "properties":{\n' +
        '    "id":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "title":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "circulation":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "circulationName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "landType":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "landTypeName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "landChar":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "landCharName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "firstClassUse":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "firstClassUseName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "secondClassUse":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "secondClassUseName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "cantonProvince":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "cantonProvinceName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "cantonCity":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "cantonCityName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "cantonArea":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "cantonAreaName":{\n' +
        '     "type":"keyword"\n' +
        '    },    \n' +
        '    "price":{\n' +
        '     "type":"double"\n' +
        '    },\n' +
        '    "area":{\n' +
        '     "type":"double"\n' +
        '    },\n' +
        '    "years":{\n' +
        '     "type":"double"\n' +
        '    },\n' +
        '    "coordinate":{\n' +
        '     "type":"keyword"\n' +
        '    },\n' +
        '    "insertTime":{\n' +
        '     "type":"date",\n' +
        '     "format":"yyyy-MM-dd HH:mm:ss || yyyy-MM-dd || epoch_millis"\n' +
        '    },\n' +
        '    "viewsNum":{\n' +
        '     "type":"integer"\n' +
        '    },\n' +
        '    "collectionNum":{\n' +
        '     "type":"integer"\n' +
        '    },\n' +
        '    "remark":{\n' +
        '     "type":"text"\n' +
        '    }\n' +
        '   }\n' +
        '  }\n' +
        ' }\n' +
        '}'
    };
  },
  methods: {
    async delEs(){
      var that = this;
      let indexOf = this.esDel.path.lastIndexOf("/");
      let param = this.esDel.path.substring(indexOf+1,this.esDel.path.length);
      debugger
      Axios.delete('/supplyapi/'+param).then(res => {
        if(res.acknowledged){
          that.$message.success("操作成功！");
          return;
        }
        this.$message.error("执行失败");//失败
          this.$notify({
              title: '删除索引返回的信息',
              message: res,
              duration: 0
          });
      })
    },
    async initEs() {
      var that = this;
      debugger
      //http://47.104.237.128:8081/epf-search/es/esLand/searchInit
      let indexOf = this.esInit.path.lastIndexOf("/");
      let param = this.esInit.path.substring(indexOf+1,this.esInit.path.length);
     this.$get('/epf-search/es/esLand/searchInit?index='+param).then(res => {
        if(res.code != '0'){
          this.$message.error(res.msg);//失败
            this.$notify({
                title: '初始化索引返回的信息',
                message: res,
                duration: 0
            });
          this.loading = false
          return;
        }
       that.$message.success("操作成功！");

        })
    },
    async sendEs() {
      var that = this;
      let indexOf = this.esSend.path.lastIndexOf("/");
      let index = this.esSend.path.substring(indexOf+1,this.esSend.path.length);
      debugger
      ///supplyapi/supply/supply
      Axios.put('/supplyapi/'+index+'/',this.esParam,{headers: {'Content-Type': 'application/json'}}).then(res => {
        if(res.created){
          that.$message.success("操作成功！");
        }
        if(res.code != '200'){
          that.$message.error(res.error.type);//失败
            this.$notify({
                title: '构建索引返回的信息',
                message: res,
                duration: 0
            });
          this.loading = false
          return;
        }
      })
    },
  }
};
</script>
<style scoped>
.el-container{
  height: 300px;
  overflow: auto;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
}




.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
  right: 8px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable{  width: 100%;}
.usemngtable td{

  border:1px solid #b6b6b6;
  line-height:28px;

}
</style>
