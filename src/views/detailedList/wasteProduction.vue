<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">产废单位</h3>
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
      <el-table :data="enterpriseList">
        <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="jlpIndustry" label="企业性质"></el-table-column>
        <el-table-column prop="jlpIndustryExtend" label="性质细分"> </el-table-column>
        <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
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
      searchForm: {
        type: '1',
      },
      date: "",
      enterpriseList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
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
      self.$api.detailedListApi.findAllByPage({
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
    getJlpIndustryExtendList(name) {
      if (!name) return;
      let item = this.jlpIndustryList.find((i) => i.name === name);
      this.$api.enterpriseApi.queryPatyDictionary(item.code).then((resp) => {
        this.jlpIndustryExtendList = resp;
      });
    },
    detailRow(row) {
      this.$router.push({
        path: "/enterprise/enterpriseDetail",
        query: { id: row.id, townStreetName: row.townStreetName },
      });
    },
    expData() {
      exportBlobFile({
        url: "/enterprise/sync/list/findAllByPage/download",
        method: "post",
        filename: `产废单位.xls`,
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
