<template>
    <el-card  class="main-container">
      <template slot="header">
      <h3 class="top-titles">市内转移计划</h3>
        <el-form :model="searchForm" label-width="100px" :inline="true">
          <el-form-item label="转移计划编号">
            <el-input
              v-model.trim="searchForm.transCode"
              placeholder="请输入转移计划编号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input
              v-model.trim="searchForm.enterpriseName"
              placeholder="请输入企业名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="转移状态">
            <el-select
              v-model="searchForm.transStatus"
              clearable
              placeholder="请选择转移状态"
            >
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="" class="date-">
            <el-date-picker
              v-model="planDate"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="searchBtn()">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div v-loading="loading">
        <el-table :data="weiFeiLianDanList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="transcode" label="转移计划编号"></el-table-column>
          <el-table-column prop="wentename" label="危险废物产生企业"> </el-table-column>
          <el-table-column prop="dentename" label="危险废物经营单位"></el-table-column>
          <el-table-column prop="tentename" label="运输企业"></el-table-column>
          <el-table-column prop="bbgtime" label="计划开始时间"></el-table-column>
          <el-table-column prop="bendtime" label="计划结束时间"></el-table-column>
          <el-table-column prop="transstatus" label="办理状态"> </el-table-column>
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
      planDate: "",
      weiFeiLianDanList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      statusList: [
        { code: "A", name: "未提交" },
        { code: "B", name: "审查中" },
        { code: "C", name: "已退回" },
        { code: "D", name: "已拒收" },
        { code: "E", name: "已办结" },
        { code: "F", name: "已过期" },
        { code: "", name: "全部" },
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
      self.$api.transPlan.transList({
          type: '市内转移',
          page: self.pageInfo.curPage ,
          size: self.pageInfo.size,
          bbgTime: self.planDate ? self.planDate[0] : "",
          bendTime: self.planDate ? self.planDate[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiLianDanList = resp.list;
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
    detailRow(objectid) {
      this.$router.push({
        path: "/mbQuery/transfer-project/cityInside/detail",
        query: { id: objectid },
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
