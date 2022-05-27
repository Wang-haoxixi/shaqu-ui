<template>
  <el-card class="main-container">
    <template slot="header">
    <h3 class="top-titles">危废经营月报</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="月报年月">
          <el-input
            v-model="searchForm.caculYear"
            placeholder="请输入月报年月(如：2020-01)"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="searchForm.epName" placeholder="请输入企业名称">
          </el-input>
        </el-form-item>
        <el-form-item label="填报状态">
          <el-select v-model="searchForm.proccessStatus" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.declareStateStr"
              :label="item.declareStateName"
              :value="item.declareStateStr"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="上报状态">
          <el-select v-model="searchForm.uploadStatus" clearable>
            <el-option
              v-for="item in uploadStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="所属镇街">
          <el-select
            v-model="searchForm.townStreetId"
            clearable
            placeholder="请选择镇街"
          >
            <el-option
              v-for="item in zStreetList"
              :key="item.id"
              :label="item.streetName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item  label="行业">
        <el-select v-model="searchForm.jlpIndustry" clearable placeholder="请选择行业"  >
          <el-option
                  v-for="item in jlpIndustry"
                  :key="item.id"
                  :label="item.streetName"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->

        <el-button type="primary" @click="initData" style="margin-left: 100px"
          >查询</el-button
        >
      </el-form>
    </template>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="orderId" label="序号"> </el-table-column>
      <el-table-column prop="systemNumber" label="系统编号"> </el-table-column>
      <el-table-column prop="epName" label="企业名称"  min-width="180"> </el-table-column>
      <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
      <el-table-column prop="caculYear" label="月报年份"> </el-table-column>
      <el-table-column prop="proccessStatusName" label="填报状态"></el-table-column>
      <!-- <el-table-column prop="uploadStatus" label="上报状态"> </el-table-column> -->
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="detailRow(scope.row.id)"
            type="text"
            size="small"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="pageInfo.curPage"
      @current-change="handleCurrentChange"
      :total="pageInfo.total"
      class="pagination"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      statusList: [
        { code: "P1", name: "未提交", id: 277 },
        { code: "P2", name: "已提交", id: 278 },
        { code: "P3", name: "退回", id: 278 },
        { code: "P4", name: "办结", id: 278 },
      ],
      zStreetList: [],
      uploadStatusList: [
        { code: "YES", name: "上传成功", id: 274 },
        { code: "NO", name: "上传失败", id: 275 },
      ],
      tableData: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
    };
  },
  methods: {
    getStatusList() {
      this.$api.dictionariesApi.getStatusList().then((res) => {
        this.statusList = res;
      });
    },
    getTrsAreaList() {
      this.$api.dictionariesApi.getTrsAreaList().then((res) => {
        this.zStreetList = res;
      });
    },
    initData() {
      let self = this;
      self.loading = true;
      self.$api.mbQueryApi
        .WeiFeiReportMonthList({
          page: self.pageInfo.curPage,
          size: self.pageInfo.size,
          ...self.searchForm,
        })
        .then((resp) => {
          let { pageNum, total, list, size } = resp;
          list.map((ele, index) => {
            ele.orderId = (pageNum - 1) * size + index + 1;
          });
          this.tableData = list;
          this.pageInfo.curPage = pageNum;
          this.pageInfo.total = total;
          self.loading = false;
        })
        .catch(() => {
          self.loading = false;
        });
    },
    detailRow(id) {
      this.$router.push({
        path: "/mbQuery/report/GongYeReportMonthlyDetail",
        query: { id: id },
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initData();
    },
  },
  created() {
    this.getStatusList();
    this.initData();
    this.getTrsAreaList();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
}
</style>
