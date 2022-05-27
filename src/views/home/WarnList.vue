<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <h3 class="top-titles">今日预警与异常报送列表</h3>
    <el-table :data="warnList" style="width: 100%">
      <el-table-column prop="orderId" label="序号"> </el-table-column>
      <!-- <el-table-column prop="serviceNumber" label="业务编号"> </el-table-column> -->
      <!-- <el-table-column
        prop="businessTypeName"
        label="业务类型"
      ></el-table-column> -->
      <el-table-column
        prop="enterpriseNames"
        label="相关企业"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.enterpriseNames }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="exceptionTypeName"
        label="规则类型"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.exceptionTypeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="报警内容" show-overflow-tooltip>
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="alarmTypeName" label="报送类型"></el-table-column>
      <el-table-column prop="createTime" label="发生时间"></el-table-column>
      <el-table-column prop="statusName" label="处理状态"> </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="page"
      @current-change="handleChange"
      :page-size.sync="size"
      :total="total"
      class="pagination"
    ></el-pagination>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";

export default {
  data() {
    return {
      page: 1,
      size: 15,
      total: 0,
      warnList: [],
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
      let times = new Date();
      let createTime =
        times.getFullYear() +
        "-" +
        (times.getMonth() + 1) +
        "-" +
        times.getDate() +
        " 00:00:00";
      if (this.status.length) {
        this.conditoions = conds.asConditionString(
          JSON.stringify(
            conds.and([
              // conds.eq("status", this.status),
              conds.in(
                "status",
                this.status === "PROCESSED"
                  ? ["PASS","PROCESSED", "NOT_PASS"]
                  : ["UNPROCESSED"]
              ),

              conds.gte("createTime", createTime),
            ])
          )
        );
      } else {
        this.conditoions = conds.asConditionString(
          JSON.stringify(conds.gte("createTime", createTime))
        );
      }
      this.$api.monitor
        .queryAlarmList({
          page: this.page - 1,
          size: 15,
          condition: this.conditoions,
          sort:'id,desc'
        })
        .then((res) => {
          res.content.map((ele, index) => {
            ele.orderId = res.size * res.number + index + 1;
            ele.statusName = this.statusName[ele.status];
            ele.alarmTypeName = ele.alarmType==='ABNORMAL'?'异常':'预警'
          });
          this.page = res.number + 1;
          this.total = res.totalElements;
          this.totalPages = res.totalPages;
          this.warnList = res.content;
        });
    },
    handleChange(val) {
      this.page = val;
      this.getTableData();
    },
  },
  created() {
    this.status = this.$route.query.listType;
    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table  {
  font-size:14px ;
}
.title {
  text-align: left;
  font-family: "yahei";
  font-size: 16px;
  font-weight: 700;
  border-left: 4px solid #2d8cf0;
  padding: 8px;
  width: 100%;
  padding-left: 7px;
  line-height: 15px;
  margin-bottom: 30px;
}
.back-btn {
  position: absolute;
  right: 70px;
  top: 110px;
  z-index: 99;
}
</style>