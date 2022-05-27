<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">库存查询</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="危废代码">
          <el-input
            v-model.trim="searchForm.wasteCode"
            placeholder="请输入危废代码"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="危废俗称">
          <el-input
            v-model.trim="searchForm.wasteName"
            placeholder="请输入危废俗称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="查询类型">
          <el-select
            v-model="searchForm.businessType"
            clearable
            placeholder="请选择查询类型"
          >
            <el-option
              v-for="item in searchItems"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="暂存库">
          <el-select
            v-model="searchForm.tsWarehouse"
            clearable
            placeholder="请选择暂存库"
            :remote-method="searWarehouse"
            :loading="warehouseLoading"
            remote
            reserve-keyword
            filterable
          >
            <el-option
              v-for="item in WarehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关企业">
          <el-select
            v-model="searchForm.enterpriseId"
            clearable
            placeholder="请选择相关企业"
            :remote-method="searEnterprise"
            :loading="enterpriseLoading"
            remote
            reserve-keyword
            filterable
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="危废大类">
          <el-select
            v-model="searchForm.typeCode"
            clearable
            placeholder="请选择危废大类"
          >
            <el-option
              v-for="item in wasteOptions"
              :key="item.name"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期" prop="" class="date-">
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
            <span>{{ "HW" + scope.row.wasteCode.substr(scope.row.wasteCode.lastIndexOf("-")+1) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wasteCode" label="危废代码"></el-table-column>
        <el-table-column prop="wasteName" label="危废俗称"> </el-table-column>
        <el-table-column prop="wasteWeight" label="重量"> </el-table-column>
        <el-table-column prop="typeName" label="废物类型"> </el-table-column>
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
        <el-table-column prop="intoDate" label="入库日期"></el-table-column>
        <el-table-column prop="tsWarehouseName" label="暂存库">
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
      searchForm: {
        tsWarehouse: ''
      },
      date: "",
      weiFeiLianDanList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      searchItems: [
        {
          name: "查询危废包明细",
          code: "3",
        },
        {
          name: "按危废大类分组",
          code: "1",
        },
        {
          name: "按相关企业分组",
          code: "2",
        },
      ],
      wasteOptions: [],
      WarehouseList: [],
      warehouseLoading: false,
      enterpriseLoading: false,
      enterpriseList: [],
      search:{
        time1: null,
        time2: null,
      },
    };
  },
  created() {
    const arr = [];
    for (let i = 1; i < 51; i++) {
      const index = i < 10 ? "0" + i : i;
      arr.push({
        code: index,
        name: "HW" + index,
      });
    }
    this.wasteOptions = arr;
    this.initPage();
    this.searWarehouse();
    this.searEnterprise();
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
          wasteStatus: 0,
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
    searWarehouse(query) {
      const self = this;
      if(self.search.time1){
        clearTimeout(self.search.time1)
      }
      self.search.time1 = setTimeout(() => {
        const params = {
          page: 1,
          size: 50,
        };
        if(query){
          params.name = query;
        }
        self.$api.stockApi.queryTsWarehouseSyncList(params).then((resp) => {
          self.WarehouseList = resp.list;
        });
      }, 500);
      
    },
    searEnterprise(query) {
      const self = this;
      if(self.search.time2){
        clearTimeout(self.search.time2)
      }
      self.search.time2 = setTimeout(() => {
        const params = {
          page: 1,
          size: 50,
        };
        if(query){
          params.name = query;
        }
        self.$api.stockApi.wmHwmsSyncList(params).then((resp) => {
          self.enterpriseList = resp.list;
        });
      }, 500);
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    detailRow(rowInfo) {
      this.$router.push({
        path: "/stockQuery/inventory-search/detail",
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
