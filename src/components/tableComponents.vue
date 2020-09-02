<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="number"
      label="序号"
      width="50"
      align="center">
    </el-table-column>
    <el-table-column
      prop="infoId"
      label="信息发布编号"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="infoTitle"
      label="信息标题"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      prop="flowType"
      label="流转方式"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="申请时间"
      width="190"
      align="center">
    </el-table-column>
    <el-table-column
      prop="type"
      label="状态"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="createUser"
      label="申请人"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="tell"
      label="联系人电话"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="220"
      align="center">
       <template slot-scope="scope">
        <el-button
          size="mini"
          :type="item.type" 
          plain
          @click="handleEdit(scope.$index, scope.row)"
          v-for="(item,index) in handleData"
          :key="index"
          >{{item.title}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick (row) {
        // console.log(row)
      }
    },
    props: {
      tableDatas:Array,
      handle: {
        type: Array
      }
    },
    created () {
      this.handleData = this.handle
      this.tableData =this.tableDatas
      // console.log(this.handleData)
    },
    data () {
      return {
        handleData: '',
        tableData: '',
      }
    }
  }
</script>
<style>
  .el-table .el-table__header thead th{
    background:rgba(241, 241, 241, 0.226);
  }
</style>