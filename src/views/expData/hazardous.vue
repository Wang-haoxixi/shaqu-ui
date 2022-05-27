<template>
    <el-card  class="main-container">
      <template slot="header">
      <h3 class="top-titles">危废转移量</h3>
        <el-form :model="searchForm" label-width="140px" :inline="true">
          <el-form-item label="转移时间" prop="" class="date-">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="产废单位名称">
            <el-input v-model="searchForm.enterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="产废单位镇街名称">
            <el-select v-model="searchForm.townStreetName" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in townStreetList"
                :key="index"
                :label="item.streetName"
                :value="item.streetName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产废单位企业性质">
            <el-select v-model="searchForm.jlpIndustry" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in entTypeList"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="废物大类">
            <el-select v-model="searchForm.wasteCategory" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in wasteList"
                :key="index"
                :label="item.code"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="废物代码">
            <el-input v-model.trim="searchForm.wasteCode"></el-input>
          </el-form-item>
          <el-form-item label="计量单位(吨 或 桶)">
            <el-select v-model="searchForm.unit" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="item">
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
        <el-table :data="weiFeiLianDanList">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="enterpriseName" label="产废单位名称"></el-table-column>
          <el-table-column prop="townStreetName" label="产废单位镇街名称"> </el-table-column>
          <el-table-column prop="jlpIndustry" label="产废单位企业性质"> </el-table-column>
          <el-table-column prop="wasteCategory" label="废物大类"> </el-table-column>
          <el-table-column prop="wasteCode" label="废物代码"> </el-table-column>
          <el-table-column prop="unit" label="计量单位(吨 或 桶)"> </el-table-column>
          <el-table-column prop="count" label="转移量"> </el-table-column>
          <!-- <el-table-column v-show="searchForm.typeName != '精细化联单'" prop="status" label="联单状态" width="100"> </el-table-column> -->
          <!-- <el-table-column label="操作" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="detailRow(scope.row.objectid)"
                type="text"
                size="small"
              >
                详情
              </el-button>
            </template>
          </el-table-column> -->
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
import { entType } from "@/utils/statisticObj";
import { conds, exportBlobFile } from "@/utils/tools";
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      typeList: ['吨', '桶'],
      townStreetList: [],
      searchForm: {},
      date: "",
      weiFeiLianDanList: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      entTypeList: entType,
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
      wasteList: []
    };
  },
  created() {
    this.initPage();
    this.getTrsAreaList();
    this.getWasteList();
  },
  methods: {
    //获取危废列表
    getWasteList() {
      var self = this;
      self.$api.dictionariesApi
        .getWasteList()
        .then((res) => {
          self.wasteList = res;
        })
        .catch((err) => this.$message.error(err.msg));
    },
    expData() {
      let self = this;
      const formData = JSON.parse(JSON.stringify(this.searchForm))
      if (formData.date && formData.date.length) {
        // console.log(this.searchForm.date[0].split('+')[0], this.searchForm.date[0]);
          formData.startTime = formData.date[0]
          formData.endTime = formData.date[1]
          delete formData['date']
      }
      exportBlobFile({
        url: "/export/excel1Download",
        method: "get",
        filename: `危废转移量.xls`,
        type: "postConditionData",
        params: formData
      })
    },
    searchBtn() {
        console.log(this.searchForm.date);
      this.initPage();
    },
    initPage() {
      let self = this;
      const formData = JSON.parse(JSON.stringify(this.searchForm))
      if (formData.date && formData.date.length) {
        // console.log(this.searchForm.date[0].split('+')[0], this.searchForm.date[0]);
          formData.startTime = formData.date[0]
          formData.endTime = formData.date[1]
          delete formData['date']
      }
      self.loading = true;
      self.$api.expDataApi
        .getExcel1List({
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          ...formData
        })
        .then((resp) => {
            console.log(resp, '--------');
          self.weiFeiLianDanList = resp.content;
        //   self.weiFeiLianDanList = self.weiFeiLianDanList.map((info) => {
        //     if (info.confirmStatusName) {
        //       info.status = info.confirmStatusName
        //     }
        //     return info
        //   })
          self.pageInfo.total = resp.totalElements || 1;
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
    getTrsAreaList () {
      const self = this
      self.$api.dictionariesApi.getTrsAreaList().then((res) => {
        console.log(res, '------------');
        this.townStreetList = res
      })
    }
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
