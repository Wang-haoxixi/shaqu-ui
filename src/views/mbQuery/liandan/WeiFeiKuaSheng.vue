<template>
    <el-card class="main-container">
      <template slot="header">
      <h3 class="top-titles">危废跨省联单</h3>
        <el-form :model="searchForm" label-width="100px" :inline="true">
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
          <el-form-item label="转移类型">
            <el-select
              v-model="searchForm.scope"
              clearable
              placeholder="请选择转移类型"
            >
              <el-option label="跨省移入" value="1"> </el-option>
              <el-option label="跨省移出" value="2"> </el-option>
              <el-option label="全部" value=""> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联单状态">
            <el-select
              v-model="searchForm.singleStatus"
              clearable
              placeholder="请选择联单状态"
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
          <el-form-item label="联单编号">
            <el-input
              v-model.trim="searchForm.singleCode"
              placeholder="请输入联单编号"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="	相关企业名">
            <el-input
              v-model.trim="searchForm.enterprise"
              placeholder="请输入相关企业名"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn()">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div v-loading="loading">
        <el-table :data="weiFeiKuaShengList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="countrySingleCode" label="联单编号">
          </el-table-column>
          <el-table-column prop="singlecode" label="系统编号">
          </el-table-column>
          <el-table-column prop="isInName" label="转移类型" width="100"> </el-table-column>
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
          <el-table-column prop="singleStatusName" label="联单状态">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="detailRow(scope.row.singlecode)"
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
      weiFeiKuaShengList: [],
      statusList: [
        { code: "CROSS_SINGLE_OUT_00", name: "运输企业确认", id: 142 },
        { code: "CROSS_SINGLE_OUT_01", name: "产废企业上传转移附件", id: 143 },
        { code: "CROSS_SINGLE_OUT_02", name: "资料调整", id: 144 },
        { code: "CROSS_SINGLE_OUT_03", name: "区局审核", id: 145 },
        { code: "CROSS_SINGLE_OUT_05", name: "产废发起跨省移出", id: 146 },
        { code: "CROSS_SINGLE_OUT_06", name: "联单办结", id: 148 },
        { code: "CROSS_SINGLE_OUT_07", name: "处置企业确认", id: 149 },
        { code: "CROSS_SINGLE_OUT_08", name: "处置拒收", id: 401 },
      ],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
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
        .wFKuaShengList({
          page: self.pageInfo.curPage ,
          size: self.pageInfo.size,
          startDate: self.date ? self.date[0] : "",
          endDate: self.date ? self.date[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiKuaShengList = resp.list;
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
        path: "/mbQuery/lianDan/weiFeiKuaShengDetail",
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
