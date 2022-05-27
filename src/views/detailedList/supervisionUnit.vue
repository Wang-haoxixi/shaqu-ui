<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">重点监管单位</h3>
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
    <div>
      <el-button type="primary" @click="showModel">设置</el-button>
    </div>
    <div v-loading="loading">
      <el-table :data="enterpriseList">
        <el-table-column type="index" label="序号" :index="indexMethod"> </el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="jlpIndustry" label="企业性质"></el-table-column>
        <el-table-column prop="jlpIndustryExtend" label="性质细分"> </el-table-column>
        <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
        <el-table-column prop="wasteTotal" label="上年度产生量（吨）"></el-table-column>
        <el-table-column label="操作" fixed="right" width="110">
          <template slot-scope="scope">
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.keyEnterpriseId, 'wrap')">
              <el-button slot="reference" type="text" size="small">
                <a style="color: red;">删除</a>
              </el-button>
            </el-popconfirm>
            &nbsp;
            <el-button @click.native.prevent="detailRow(scope.row)" type="text" size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="pageInfo.curPage" @current-change="handleCurrentChange"
        :total="pageInfo.total" class="pagination"></el-pagination>
    </div>
    <div>
      <el-dialog title="查询设置" :visible.sync="dialogVisible" width="70%">
        <p style="margin-bottom: 20px;font-size: 16px;color: #000;">查询上一年度，年产废量大于等于XX吨的企业。或通过企业名称追加重点企业。</p>
        <el-form :model="editForm" label-width="150px" :inline="true">
          <el-form-item label="年产废量大于等于">
            <el-input v-model.trim="editForm.yearWasteWeight" type="number"></el-input>
          </el-form-item>
          <div style="display: inline-block;">
            <span>（吨）</span>
            <el-button type="primary" size="small" @click="addEnterprise('add')">
              临时添加
            </el-button>
          </div>
          <el-form-item label="企业名称">
            <el-select v-model="editForm.enterpriseId" clearable placeholder="模糊查询企业名称" filterable :filter-method="getEPData">
              <el-option v-for="item in epData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div style="display: inline-block;">
            <el-button type="primary" size="small" @click="addEnterprise('addTo')">
              临时添加
            </el-button>
          </div>
        </el-form>
        <div>
          <el-table :data="enterpriseModelList">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="企业名称"></el-table-column>
            <el-table-column prop="name" label="证件编码"></el-table-column>
            <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
            <el-table-column prop="townStreetName" label="企业地址"></el-table-column>
            <el-table-column prop="jlpIndustry" label="联系人及电话"></el-table-column>
            <el-table-column prop="jlpIndustryExtend" label="法人及电话"> </el-table-column>
            <el-table-column label="操作" fixed="right" width="110">
              <template slot-scope="scope">
                <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.keyEnterpriseId, 'inner')">
                  <el-button slot="reference" type="text" size="small">
                    <a style="color: red;">删除</a>
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="total,prev,pager,next,jumper" :current-page.sync="addPageInfo.curPage" @current-change="handlePageChange"
            :total="addPageInfo.total" class="pagination"></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleModel">取消</el-button>
          <el-button type="primary" @click="modelOk('1')">追加数据</el-button>
          <el-button type="primary" @click="modelOk('2')">覆盖数据</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { conds, exportBlobFile } from "@/utils/tools";
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      searchForm: {},
      date: "",
      enterpriseList: [],
      enterpriseModelList: [],
      editForm: {
        yearWasteWeight: null,
        enterpriseId: null,
      },
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      addPageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      townStreetList: [],
      jlpIndustryList: [],
      jlpIndustryExtendList: [],
      epData: [],
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
    this.getEPData('');
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
    //翻页
    handlePageChange(val) {
      this.addPageInfo.curPage = val;
      this.findSetAllByPage();
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
    getEPData(value) {
      let conditoions = conds.asConditionString(
        JSON.stringify(
          conds.and([
            conds.like("name", value),
            conds.eq("queryType", 'indexThird-wf'),
          ])
        )
      );
      this.$api.homeApi.getEnterprise({
        page: 0,
        size: 10,
        condition: conditoions,
      }).then((res) => {
        this.epData = res.content;
      });
    },
    addEnterprise(type) {
      if (type === 'add') {
        if (!this.editForm.yearWasteWeight) {
          this.$message.error('请输入数量！');
          return
        }
        this.$api.detailedListApi.keyAdd({ yearWasteWeight: this.editForm.yearWasteWeight }).then((resp) => {
          this.$message.success('添加成功！');
          this.findSetAllByPage();
        })
      } else if (type === 'addTo') {
        if (!this.editForm.enterpriseId) {
          this.$message.error('请选择企业！');
          return
        }
        this.$api.detailedListApi.keyAppend(this.editForm.enterpriseId).then((resp) => {
          this.$message.success('追加成功！');
          this.findSetAllByPage();
        })
      }
    },
    findSetAllByPage() {
      this.$api.detailedListApi.findSetAllByPage({
        page: this.addPageInfo.curPage,
        size: this.addPageInfo.size,
      }).then((resp) => {
        this.enterpriseModelList = resp.data.list;
        this.addPageInfo.total = resp.data.total || 0;
      })
    },
    showModel() {
      this.findSetAllByPage();
      this.dialogVisible = true
    },
    modelOk(type) {
      if (type === '2') { //覆盖
        this.$api.detailedListApi.addConfirm().then(res => {
          this.cancleModel();
        })
      }else{ //追加
        this.$api.detailedListApi.appendConfirm().then(res => {
          this.cancleModel();
        })
      }
    },
    cancleModel() {
      this.initPage();
      this.editForm.enterpriseId = null;
      this.editForm.yearWasteWeight = null;
      this.dialogVisible = false;
    },
    del(id, type) {
      this.$api.detailedListApi.delete(id).then(res => {
        if (type === 'wrap') {
          this.initPage();
        } else {
          this.findSetAllByPage();
        }
      })
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
