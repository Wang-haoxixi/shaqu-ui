<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">医废市内联单</h3>
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
        <el-form-item label="联单编号">
          <el-input
            v-model.trim="searchForm.serialNumber"
            placeholder="请输入联单编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="相关企业">
          <el-input
            v-model.trim="searchForm.companyValue"
            placeholder="请输入企业名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="联单类型">
          <el-select
            v-model="searchForm.kuponoType"
            clearable
            placeholder="请选择联单类型"
            @change="selectKuponoType"
          >
            <el-option
              v-for="(state, key) in kuponoTypeMap"
              :label="state"
              :value="key"
              :key="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联单状态" v-if="kuponoStateMap">
          <el-select
            v-model="searchForm.state"
            clearable
            placeholder="请选择联单类型"
          >
            <el-option
              v-for="(state, key) in kuponoStateMap"
              :label="state"
              :value="key"
              :key="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运输车辆">
          <el-input
            v-model.trim="searchForm.transVehicle"
            placeholder="请输入车牌号"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div v-loading="loading">
      <el-table :data="yiFeiLianDanList">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="serialNumber" label="联单编号">
        </el-table-column>
        <el-table-column
          prop="proName"
          label="医疗机构"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.proName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="transName" label="运输企业" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.transName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dealName" label="处置企业" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.dealName }}
            </div>
          </template> </el-table-column>
        <el-table-column prop="transVehicle" label="运输车辆">
        </el-table-column>
        <el-table-column prop="claimTime" label="创建日期"> </el-table-column>
        <el-table-column prop="kuponoTypeText" label="联单类型">
        </el-table-column>
        <el-table-column prop="stateName" label="联单状态" min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.stateName }}
            </div>
          </template></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.row.kuponoId)"
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
      searchForm: {
        startDate: null,
        endDate: null,
        serialNumber: null,
        companyValue: null,
        state: null,
        kuponoType: null,
        transVehicle: null,
      },
      kuponoTypeMap: [],
      kuponoStateMap: [],
      date: "",
      yiFeiLianDanList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
    };
  },
  created() {
    this.$api.mbQueryApi.getKuponoTypeList().then((res) => {
      if (res) {
        this.kuponoTypeMap = res;
      }
    });

    this.initPage();
  },
  methods: {
    searchBtn() {
      this.initPage();
    },
    initPage() {
      let self = this;
      self.loading = true;
      if (self.date) {
        self.searchForm.startDate = self.date[0];
        self.searchForm.endDate = self.date[1];
      } else {
        self.searchForm.startDate = "";
        self.searchForm.endDate = "";
      }

      self.$api.mbQueryApi
        .duplicateManagement({
          page: self.pageInfo.curPage,
          size: self.pageInfo.size,
          ...self.searchForm,
        })
        .then((resp) => {
          console.log(resp);
          self.yiFeiLianDanList = resp.list;
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
        path: "/mbQuery/lianDan/yiFeiLianDanDetail",
        query: { id: rowInfo, kuponoType: this.searchForm.kuponoType },
      });
    },
    selectKuponoType(val) {
      this.searchForm.kuponoType = val;
      this.$api.mbQueryApi
        .getNewKuponoStateList({
          kuponoType: this.searchForm.kuponoType,
        })
        .then((res) => {
          if (res) {
            this.kuponoStateMap = res;
          }
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
