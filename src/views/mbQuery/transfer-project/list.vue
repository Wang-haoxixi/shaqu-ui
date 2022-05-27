<template>
  <!-- 转移计划 -->
  <el-card class="main-container">
    <template slot="header">
    <h3 class="top-titles">管理计划列表</h3>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="年度" prop="" class="date-">
          <el-date-picker
            v-model="searchForm.declareYear"
            type="year"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input
            v-model.trim="searchForm.enterpriseName"
            placeholder="请输入企业名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="填报状态">
          <el-select
            v-model="searchForm.declareStateStr"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              v-for="(state, key) in stateList"
              :label="state.declareStateName"
              :value="state.declareStateStr"
              :key="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报状态">
          <el-select
              v-model="searchForm.uploadStatus"
              placeholder="请选择上报状态"
              clearable
          >
            <el-option
                v-for="item in uploadStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              pageInfo.curPage = 1;
              getList();
            "
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </template>
    <div v-loading="loading">
      <el-table :data="manageList"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="declareYear" label="年度" > </el-table-column>
        <el-table-column prop="manageNo" label="管理计划编号"></el-table-column>
        <el-table-column
          prop="enterpriseName"
          label="企业名称"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="manageTypeName" label="类别"></el-table-column>
        <el-table-column prop="declareStateName" label="填报状态"
        ></el-table-column>
        <el-table-column prop="uploadStatus" label="上报状态"></el-table-column>
        <!-- <el-table-column prop="status" label="变更状态"></el-table-column> -->
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.row)"
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
  data() {
    return {
      searchForm: {
        declareStateStr: "",
        uploadStatus: "",
        declareYear: "",
        enterpriseName: "",
      },
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      manageList: [],
      stateList: [],
      uploadStatusList: [
        { code: "", name: "全部", id: 274 },
        { code: "9", name: "上报成功", id: 274 },
        { code: "10", name: "上报失败", id: 275 },
      ],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.$api.mbQueryApi
        .managementList({
          page: this.pageInfo.curPage ,
          size: this.pageInfo.size,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.manageList = res.list;
          this.pageInfo.total = res.total || 0;
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.getList();
    },
    detailRow(row) {
      this.$router.push({
        path: "/mbQuery/manage-project/detail",
        query: {
          id: row.id,
          declareYear: row.declareYear,
          enterpriseName: row.enterpriseName,
          manageTypeName: row.manageTypeName,
        },
      });
    },
    sortState(ob1,ob2){
      if(ob1.declareState == '2' && ob2.declareState != '2'){
        return -1;
      }
      if('4,6'.includes(ob1.declareState) &&( ob2.declareState != '2' || !'4,6'.includes(ob1.declareState))){
        return -1;
      }
      if(ob1.declareState == '3' &&( ob2.declareState == '9' || ob2.declareState == '10')){
        return -1;
      }
      return 1;
    }
  },
  created() {
    this.$api.mbQueryApi.managementState().then((res) => {
      console.log(res);
      if (res) {
        this.stateList = res;
      }
    });
    this.getList();
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table  {
  font-size:14px ;
}
</style>

