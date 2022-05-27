<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">重点单位贮存设施</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="企业名称">
          <el-input v-model.trim="searchForm.name" placeholder="请输入企业名称">
          </el-input>
        </el-form-item>
        <el-form-item label="企业性质">
          <el-select v-model="searchForm.jlpIndustry" clearable placeholder="请选择企业性质" @change="getJlpIndustryExtendList">
            <el-option v-for="item in jlpIndustryList" :key="item.code" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性质细分">
          <el-select v-model="searchForm.jlpIndustryExtend" clearable placeholder="请先选择性质细分">
            <el-option v-for="item in jlpIndustryExtendList" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属镇街">
          <el-select v-model="searchForm.townStreetId" clearable placeholder="请先选择所属镇街">
            <el-option v-for="item in townStreetList" :key="item.id" :label="item.streetName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
          <el-button type="primary" @click="expData()">导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div v-loading="loading">
      <el-table :data="enterpriseList" :expand-row-keys="expandRowKeys" @expand-change="expandChange" :row-key="(row) => row.id">
        <el-table-column type="expand">
          <template>
            <el-table :data="tableData" style="width: 100%;" :header-cell-style="{background: '#eee'}">
              <el-table-column prop="name" label="设施名称">
              </el-table-column>
              <el-table-column label="使用状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.isDel === '1'" size="medium" type="danger">禁用</el-tag>
                  <el-tag v-else size="medium" type="success">启用</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="scale" label="贮存能力"></el-table-column>
              <el-table-column label="防渗漏"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column label="面积m²">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.sizeUnit === 1" size="medium" type="danger">{{scope.row.size}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="体积m³">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.sizeUnit === 2" size="medium" type="danger">{{scope.row.size}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="描述"></el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column type="index" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="jlpIndustry" label="企业性质"></el-table-column>
        <el-table-column prop="jlpIndustryExtend" label="性质细分"> </el-table-column>
        <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
        <el-table-column prop="wasteTotal" label="上年度产生量（吨）"></el-table-column>
        <el-table-column label="操作" fixed="right" width="130">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.open" @click.native.prevent="openRow(scope.row)" type="text" size="small">
              查看设施
            </el-button>
            <el-button v-if="scope.row.open" @click.native.prevent="openRow(scope.row)" type="text" size="small">
              关闭
            </el-button>
            <el-button @click.native.prevent="detailRow(scope.row)" type="text" size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="pageInfo.curPage" @current-change="handleCurrentChange"
        :total="pageInfo.total" class="pagination"></el-pagination>
    </div>
  </el-card>
</template>

<script>
import { exportBlobFile } from "@/utils/tools";
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      searchForm: {},
      date: "",
      enterpriseList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      tableData: [],
      expandRowKeys: [],
      townStreetList: [],
      jlpIndustryList: [],
      jlpIndustryExtendList: [],
    };
  },
  created() {
    this.initPage();
    this.$api.dictionariesApi.getTrsAreaList().then(res => {
      this.townStreetList = res;
    })
    this.$api.enterpriseApi.queryPatyDictionary('JLP_ENTERPRISE_INDUSTRY').then((resp) => {
      this.jlpIndustryList = resp;
    });
  },
  methods: {
    indexMethod(index) {
      return index + this.pageInfo.size * (this.pageInfo.curPage - 1) + 1;
    },
    searchBtn() {
      this.initPage();
    },
    initPage() {
      let self = this;
      self.loading = true;
      self.$api.detailedListApi.keyFindAllByPage({
        page: self.pageInfo.curPage,
        size: self.pageInfo.size,
        ...self.searchForm,
      }).then((resp) => {
        self.enterpriseList = resp.data.list;
        self.pageInfo.total = resp.data.total || 0;
        self.loading = false;
      }).catch(() => {
        self.loading = false;
      });
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    openRow(row) {
      if (!row.open) {
        this.$api.stockApi.queryTsWarehouseSyncList({
          enterpriseId: row.id,
          page: 1,
          size: 100,
        }).then((resp) => {
          this.tableData = resp.data;
        })
        this.expandRowKeys = [row.id];
        this.enterpriseList.forEach(element => {
          element.open = false;
        });
        row.open = true;
      } else {
        this.expandRowKeys = [];
        row.open = false;
      }
    },
    detailRow(row) {
      this.$router.push({
        path: "/enterprise/enterpriseDetail",
        query: { id: row.id, townStreetName: row.townStreetName },
      });
    },
    expandChange(expandedRows, expanded) {
      if (expanded.length > 0) {
        this.$api.stockApi.queryTsWarehouseSyncList({
          enterpriseId: expandedRows.id,
          page: 1,
          size: 100,
        }).then((resp) => {
          this.tableData = resp.list;
        })
        this.expandRowKeys = [expandedRows.id];
        this.enterpriseList.forEach(element => {
          element.open = false;
        });
        expandedRows.open = true;
      } else {
        this.expandRowKeys = [];
        expandedRows.open = false;
      }
    },
    getJlpIndustryExtendList(name) {
      if (!name) return;
      let item = this.jlpIndustryList.find((i) => i.name === name);
      this.$api.enterpriseApi.queryPatyDictionary(item.code).then((resp) => {
        this.jlpIndustryExtendList = resp;
      });
    },
    expData() {
      exportBlobFile({
        url: "/enterprise/sync/list/key/findAllByPage/download",
        method: "post",
        filename: `重点监管单位.xls`,
        params: {
          ...this.searchForm,
        },
      })
        .then()
        .catch((err) => {
          console.log("最外层导出函数出错", err);
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
