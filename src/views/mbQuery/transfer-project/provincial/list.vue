<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">跨省转移计划</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="企业名称">
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="办理状态">
          <el-select
            v-model="searchForm.transStatus"
            clearable
            placeholder="请选择办理状态"
          >
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="计划日期" prop="" class="date-">
          <el-date-picker
            v-model="date"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="转移类型">
          <el-select
            v-model="searchForm.isIn"
            clearable
            placeholder="请先选择转移类型"
          >
            <el-option label="全部" value=""> </el-option>
            <el-option label="移入" value="1"> </el-option>
            <el-option label="移出" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转移计划编号">
          <el-input
            v-model.trim="searchForm.transCode"
            placeholder="请输入转移计划编号"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div v-loading="loading">
      <el-table :data="weiFeiLianDanList">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="isInName" label="转移类型" width="100">
        </el-table-column>
        <el-table-column prop="transCode" label="计划编号"></el-table-column>

        <el-table-column
          prop="wenteName"
          label="危险废物产生企业"
          min-width="110"
        ></el-table-column>
        <el-table-column
          prop="denteName"
          label="危险废物经营单位"
          min-width="110"
        ></el-table-column>
        <el-table-column
          prop="tenteName"
          label="运输企业"
          min-width="110"
        ></el-table-column>
        <el-table-column prop="bbgTime" label="开始时间"></el-table-column>
        <el-table-column prop="bendTime" label="结束时间"></el-table-column>
        <el-table-column prop="transStatusName" label="办理单状态" width="100">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.row.objectId)"
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
    </div>
  </el-card>
</template>

<script>
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      searchForm: {},
      date: "",
      weiFeiLianDanList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      statusList: [],
    };
  },
  created() {
    this.initPage();
    this.$api.enterpriseApi
      .queryPatyDictionary("CROSS_TRANS_STATUS")
      .then((resp) => {
        this.statusList = resp;
      });
  },
  methods: {
    searchBtn() {
      this.initPage();
    },
    initPage() {
      this.loading = true;
      this.$api.transPlan
        .transCrossProvince({
          page: this.pageInfo.curPage,
          size: this.pageInfo.size,
          bbgTime: this.date ? this.date[0] : "",
          bendTime: this.date ? this.date[1] : "",
          ...this.searchForm,
        })
        .then((resp) => {
          this.weiFeiLianDanList = resp.list;
          this.weiFeiLianDanList = this.weiFeiLianDanList.map((info) => {
            if (info.confirmStatusName) {
              info.status = info.confirmStatusName;
            }
            return info;
          });
          this.pageInfo.total = resp.total || 0;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    detailRow(rowInfo) {
      this.$router.push({
        path: "/mbQuery/transfer-project/provincial/detail",
        query: { id: rowInfo },
      });
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  /deep/ .el-table {
    font-size: 14px;
  }
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
  .text-tooltip {
    cursor: pointer;
  }
}
</style>
