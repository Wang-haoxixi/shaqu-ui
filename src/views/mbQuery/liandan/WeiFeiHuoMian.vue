<template>
    <el-card  class="main-container">
      <template slot="header">
      <h3 class="top-titles">危废豁免联单</h3>
        <el-form :model="searchForm" label-width="100px" :inline="true">
          <el-form-item label="联单编号">
            <el-input
              v-model.trim="searchForm.singlecode"
              placeholder="请输入联单编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input
              v-model.trim="searchForm.wentename"
              placeholder="请输入企业名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申领时间" prop="" class="date-">
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
          <el-form-item label="联单类型">
            <el-select
              v-model="searchForm.type"
              clearable
              placeholder="请选择联单类型"
            >
              <el-option label="豁免精细化联单" value="7"> </el-option>
              <el-option label="豁免联单" value="6"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联单状态">
            <el-select
              v-model="searchForm.status"
              clearable
              placeholder="请先选择联单类型"
            >
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn()">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div v-loading="loading">
        <el-table :data="weiFeiHuoMianList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="singlecode" label="联单编号">
          </el-table-column>
          <el-table-column prop="typeName" label="联单类型"> </el-table-column>
          <el-table-column prop="wentename" label="危险废物产生企业名称" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.wentename }}
            </div>
          </template>
          </el-table-column>
          <el-table-column prop="tentename" label="运输企业名称" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.tentename }}
            </div>
          </template>
          </el-table-column>
          <el-table-column prop="dentename" label="危险废物经营单位名称" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.dentename }}
            </div>
          </template>
          </el-table-column>
          <el-table-column prop="createtime" label="申领时间">
          </el-table-column>
          <el-table-column prop="status" label="联单状态"> </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="detailRow(scope.row.objectid)"
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
  name: "weiFeiHuoMian",
  data() {
    return {
      searchForm: {},
      date: "",
      weiFeiHuoMianList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      statusList: [
        { code: "已提交", name: "已提交", id: 217 },
        { code: "已退回", name: "已退回", id: 218 },
        { code: "已拒收", name: "已拒收", id: 219 },
        { code: "已结束", name: "已结束", id: 220 },
        { code: "", name: "全部", id: 221 },
      ],
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    searchBtn() {
      this.initPage();
    },
    initPage() {
      let self = this;
      self.loading = true;
      self.$api.mbQueryApi
        .getWeiFeiHuoMianList({
          page: self.pageInfo.curPage,
          size: self.pageInfo.size,
          createtimeBegin: self.date ? self.date[0] : "",
          createtimeEnd: self.date ? self.date[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiHuoMianList = resp.list;
          self.pageInfo.total = resp.total || 0;
          self.loading = false;
        })
        .catch(() => {
          self.loading = false;
        });
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    detailRow(rowInfo) {
      this.$router.push({
        path: "/mbQuery/lianDan/weiFeiHuoMianDetail",
        query: { id: rowInfo },
      });
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
  .text-tooltip {
    cursor: pointer;
  }
  /deep/ .el-table  {
  font-size:14px ;
}
}
</style>
