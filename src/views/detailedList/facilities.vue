<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">自行利用处置设施</h3>
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
                  <el-tag v-if="scope.row.status" size="medium" type="success">使用中</el-tag>
                  <el-tag v-else size="medium" type="danger">停用</el-tag>
                </template>

              </el-table-column>
              <el-table-column label="设备类型">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.selfType === 1" size="medium" type="success">自行利用设施</el-tag>
                  <el-tag v-else size="medium" type="danger">自行处置设施</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="showModel(scope.row)" type="text" size="small">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="jlpIndustry" label="企业性质"></el-table-column>
        <el-table-column prop="jlpIndustryExtend" label="性质细分"> </el-table-column>
        <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
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
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">设施名称：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">设施类别：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.selfType === 1?'自行利用设施':'自行处置设施'}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">设施地址：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.address}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">总投资：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.totalInvestment}}万元</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">设计能力：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.designAbility}}吨/年</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">设计使用年限：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.designUserYear}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">投入运行时间：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.workTime}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">运行费用：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.workCost}}元</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">主要设备及数量：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.majorFacilityAndQuantity}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="text-align: right;">危险废物利用/处置效果：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{detailInfo.selfDisposalEffect}}</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

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
      detailInfo: {},
      dialogVisible: false,
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
    detailRow(row) {
      this.$router.push({
        path: "/enterprise/enterpriseDetail",
        query: { id: row.id, townStreetName: row.townStreetName },
      });
    },
    openRow(row) {
      // this.tableData = this.enterpriseList.map(element => {
      //     if(element.id === row.id){
      //       element.open = true;
      //     }else{
      //       element.open = false;
      //     }
      //     return element;
      //   });
      if (!row.open) {
        this.$api.detailedListApi.listAll({
          enterpriseId: row.id
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
    expandChange(expandedRows, expanded) {
      if (expanded.length > 0) {
        this.$api.detailedListApi.listAll({
          enterpriseId: expandedRows.id
        }).then((resp) => {
          this.tableData = resp.data;
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
    showModel(row) {
      this.detailInfo = row;
      this.dialogVisible = true;
    },
    expData() {
      exportBlobFile({
        url: "/enterprise/sync/list/findAllByPage/download",
        method: "post",
        filename: `单位列表.xls`,
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
