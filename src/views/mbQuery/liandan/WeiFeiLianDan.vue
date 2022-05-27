<template>
    <el-card  class="main-container">
      <template slot="header">
      <h3 class="top-titles">危废市内联单</h3>
        <el-form :model="searchForm" label-width="100px" :inline="true">
          <el-form-item label="创建时间" prop="" class="date-">
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
              <el-option label="精细化联单" value="1"> </el-option>
              <el-option label="电子联单" value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联单状态">
            <el-select
              :disabled="!searchForm.type"
              v-model="searchForm.status"
              clearable
              placeholder="请先选择联单类型"
            >
              <el-option
                v-for="item in statusList[searchForm.type]"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item>
            <el-button type="primary" @click="searchBtn()">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div v-loading="loading">
        <el-table :data="weiFeiLianDanList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="singlecode" label="联单编号">
          </el-table-column>
          <el-table-column prop="typeName" label="联单类型" width="100"> </el-table-column>
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
          <el-table-column prop="status" label="联单状态" width="100"> </el-table-column>
          <!-- <el-table-column v-show="searchForm.typeName != '精细化联单'" prop="status" label="联单状态" width="100"> </el-table-column> -->
          <el-table-column label="操作" fixed="right" width="80">
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
      statusList: {
        1: [
          { code: "chart_flow_00", name: "联单申领", id: 9 },
          { code: "chart_flow_01", name: "运输确认", id: 10 },
          { code: "chart_flow_02", name: "危废上车", id: 11 },
          { code: "chart_flow_03", name: "危废拒收", id: 12 },
          { code: "chart_flow_04", name: "联单运输", id: 13 },
          { code: "chart_flow_05", name: "处置确认", id: 14 },
          { code: "chart_flow_06", name: "联单办结", id: 15 },
          { code: "chart_flow_07", name: "联单拒收", id: 16 },
          { code: "", name: "全部", id: 118 },
        ],
        2: [
          { code: "未提交", name: "未提交", id: 43 },
          { code: "已提交", name: "已提交", id: 44 },
          { code: "已退回", name: "已退回", id: 45 },
          { code: "已拒收", name: "已拒收", id: 46 },
          { code: "已结束", name: "已结束", id: 47 },
          { code: "", name: "全部", id: 119 },
          { code: "作废", name: "作废", id: 240 },
        ],
      },
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
        .getWeiFeiLianDanList({
          page: self.pageInfo.curPage ,
          size: self.pageInfo.size,
          createtimeBegin: self.date ? self.date[0] : "",
          createtimeEnd: self.date ? self.date[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiLianDanList = resp.list;
          self.weiFeiLianDanList = self.weiFeiLianDanList.map((info) => {
            if (info.confirmStatusName) {
              info.status = info.confirmStatusName
            }
            return info
          })
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
        path: "/mbQuery/lianDan/weiFeiLianDanDetail",
        query: { id: rowInfo },
      });
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
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
