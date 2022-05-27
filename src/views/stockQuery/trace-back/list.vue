<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">危废包追溯</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="流水号">
          <el-input v-model.trim="searchForm.serial" placeholder="请输入流水号">
          </el-input>
        </el-form-item>
        <el-form-item label="危废代码">
          <el-input
            v-model.trim="searchForm.wasteCode"
            placeholder="请输入危废代码"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="二维码ID">
          <el-input
            v-model.trim="searchForm.qrcodeId"
            placeholder="请输入二维码ID"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item label="联单编号">
          <el-input
            v-model.trim="searchForm.duplicateCode"
            placeholder="请输入联单编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="废铅蓄电池">
          <el-select
            v-model="searchForm.leadBattery"
            clearable
            placeholder="请选择废铅蓄电池"
          >
            <el-option
              v-for="item in batteryOptions"
              :key="item.code"
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
      <el-table :data="weiFeiLianDanList">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column
          prop="enterpriseName"
          label="相关企业"
        ></el-table-column>
        <el-table-column label="危废大类">
          <template slot-scope="scope">
            <span>{{ "HW" + scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wasteCode" label="危废代码"></el-table-column>
        <el-table-column prop="wasteName" label="危废俗称"></el-table-column>
        <el-table-column prop="wasteWeight" label="重量"></el-table-column>
        <el-table-column prop="typeName" label="废物类型"></el-table-column>
        <el-table-column label="流水号">
          <template slot-scope="scope">
            <span>{{
              scope.row.qrCode.substring(
                scope.row.qrCode.length - 9,
                scope.row.qrCode.length
              )
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="qrcodeId" label="二维码ID"> </el-table-column> -->
        <el-table-column prop="duplicateCode" label="联单编号">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.row.wasteId)"
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
      batteryOptions: [
        {
          name: "非废铅蓄电池",
          code: "0",
        },
        {
          name: "废铅蓄电池",
          code: "1",
        },
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
      self.$api.stockApi
        .wastePackage({
          page: self.pageInfo.curPage,
          size: self.pageInfo.size,
          startDate: self.date ? self.date[0] : "",
          endDate: self.date ? self.date[1] : "",
          ...self.searchForm,
        })
        .then((resp) => {
          self.weiFeiLianDanList = resp.list;
          self.weiFeiLianDanList = self.weiFeiLianDanList.map((info) => {
            if (info.confirmStatusName) {
              info.status = info.confirmStatusName;
            }
            return info;
          });
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
        path: "/stockQuery/trace-back/detail",
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
