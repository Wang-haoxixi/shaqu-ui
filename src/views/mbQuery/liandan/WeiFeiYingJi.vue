<template>
    <el-card  class="main-container">
      <template slot="header">
      <h3 class="top-titles">危废应急联单</h3>
        <el-form :model="searchForm" label-width="100px" :inline="true">
          <el-form-item label="联单编号">
            <el-input
              v-model.trim="searchForm.singlecode"
              placeholder="请输入联单编号"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="	相关企业名">
            <el-input
              v-model.trim="searchForm.enterpriseName"
              placeholder="请输入相关企业名"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="searchForm.status"
              clearable
              placeholder="请选择企业状态"
            >
              <el-option
                v-for="item in entStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应急类型">
            <el-select
              v-model="searchForm.emergencyType"
              clearable
              placeholder="请选择应急类型"
            >
              <el-option
                v-for="item in yingJiTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运输时间" prop="" class="date-">
            <el-date-picker
              v-model="date"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="请选择运输开始日期"
              end-placeholder="请选择运输结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="创建时间" prop="" class="date-">
            <el-date-picker
              v-model="date1"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="请选择创建开始日期"
              end-placeholder="请选择创建结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn()">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div v-loading="loading">
        <el-table :data="weiFeiYingJiList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="singlecode" label="联单编号">
          </el-table-column>
          <el-table-column prop="emergencyType" label="应急类型">
          </el-table-column>
          <el-table-column prop="dentename" label="危险废物经营单位">
          </el-table-column>
          <el-table-column prop="ftdate" label="运输日期"> </el-table-column>
          <el-table-column prop="createtime" label="创建时间">
          </el-table-column>
          <el-table-column prop="status" label="办理状态"> </el-table-column>
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
  name: "WeiFeiYingJi",
  data() {
    return {
      searchForm: {},
      date: "",
      date1: "",
      weiFeiYingJiList: [],
      yingJiTypeList: [
        { code: "1", name: "应急处置", id: 197 },
        { code: "2", name: "应急贮存", id: 198 },
        { code: "", name: "全部", id: 199 },
      ],
      entStatusList: [
        { code: "已提交", name: "已提交", id: 194 },
        { code: "已结束", name: "已结束", id: 195 },
        { code: "", name: "全部", id: 200 },
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
        .wFYingJiList({
          page: self.pageInfo.curPage ,
          size: self.pageInfo.size,
          ftdateBegin: self.date ? self.date[0] : "",
          ftdateEnd: self.date ? self.date[1] : "",
          createtimeBegin: self.date ? self.date1[0] : "",
          createtimeEnd: self.date ? self.date1[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiYingJiList = resp.list;
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
        path: "/mbQuery/lianDan/wFYingJiDetail",
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
