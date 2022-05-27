<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <h3 slot="header" class="top-titles">预警与异常统计</h3>
    <el-table :data="warnList" style="width: 100%">
      <el-table-column prop="orderId" label="序号"> </el-table-column>
      <el-table-column prop="serviceNumber" label="业务编号"> </el-table-column>
      <el-table-column
        prop="businessTypeName"
        label="业务类型"
      ></el-table-column>
      <el-table-column prop="enterpriseNames" label="相关企业">
      </el-table-column>
      <el-table-column
        prop="exceptionTypeName"
        label="规则类型"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="报警内容"
        width="360"
      ></el-table-column>
      <el-table-column prop="createTime" label="发生时间"></el-table-column>
      <el-table-column prop="alarmTypeName" label="报送类型"></el-table-column>
      <el-table-column prop="statusName" label="处理状态"> </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="page1"
      @current-change="handleWarnChange"
      :page-size.sync="size"
      class="pagination"
      :total="total1"
    ></el-pagination>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";

export default {
  data() {
    return {
      page1: 1,
      size: 10,
      total1: 0,
      activeName: "first",
      warnList: [],
      abnList: [],
      conditoions: "",
      status: "",
      statusName: {
        UNPROCESSED: "企业待处理",
        PROCESSED: "企业已处理",
        PASS: "核实通过",
        NOT_PASS: "核实未通过",
      },
    };
  },
  methods: {
    back() {
      history.go(-1);
    },
    getTableData() {
      this.conditoions = conds.asConditionString(
        JSON.stringify(
          conds.and([
            conds.eq("configCode", this.$route.query.businessCode),
            conds.eq("status", this.$route.query.type),
            // conds.eq("alarmType", this.$route.query.alarmType),
          ])
        )
      );
      this.$api.monitor
        .queryAlarmList({
          page: this.page1 - 1,
          size: 10,
          sort: "createTime,desc",
          condition: this.conditoions,
        })
        .then((res) => {
          res.content.map((ele, index) => {
            ele.orderId = res.size * res.number + index + 1;
            ele.statusName =  this.statusName[ele.status];
            ele.alarmTypeName = ele.alarmType === "ABNORMAL" ? "异常" : "预警";
          });
          this.total1 = res.totalElements;
          this.totalPages1 = res.totalPages;
          this.warnList = res.content;
        });
    },

    handleWarnChange(val) {
      this.page1 = val;
      this.getTableData();
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
.back-btn {
  position: absolute;
  right: 70px;
  top: 110px;
  z-index: 99;
}
/deep/ .el-table  {
  font-size:14px ;
}
</style>
