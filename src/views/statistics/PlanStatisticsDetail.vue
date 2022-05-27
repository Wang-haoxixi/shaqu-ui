<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <template slot="header">
      <h3>沙坪坝区管理计划上报情况</h3>
      <el-form :inline="true" :model="formInline" label-width="90px">
        <el-form-item class="search-item" label="所属镇街">
          <el-select
            v-model="formInline.townStreetId"
            clearable
            placeholder="请选择镇街"
          >
            <el-option
              v-for="item in zStreetList"
              :key="item.id"
              :label="item.streetName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input
            v-model.trim="formInline.enterpriseName"
            placeholder="企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="上报状态">
          <el-select v-model="formInline.declareState" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="上报成功" value="9"></el-option>
            <el-option label="上报失败" value="10"></el-option>
            <el-option label="未上报" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="search-btn" @click="handleQuery"
          >查询</el-button
        >
      </el-form>
    </template>
    <el-table :data="planDetailList">
      <el-table-column type="index" min-width="180" label="序号">
      </el-table-column>
      <el-table-column min-width="180" label="年度">
        <template slot-scope="scope">
          {{ scope.row.declareYear }}
        </template>
      </el-table-column>
      <el-table-column prop="streetName" min-width="180" label="所属镇街">
      </el-table-column>
      <el-table-column prop="enterpriseName" min-width="180" label="企业名称">
      </el-table-column>
      <el-table-column min-width="180" label="上报状态" prop="declareStateName">
        <!-- <template slot-scope="scope">
          {{ scope.row.declareState === 9 ? "上报成功" : "上报失败" }}
        </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="pageInfo.curPage"
      @current-change="handleCurrentChange"
      :total="pageInfo.total"
      class="pagination"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "StatisticsJointOrderDetail",
  data() {
    return {
      formInline: {
        townStreetId: "", //选中镇街
      },
      zStreetList: [], //所有镇街
      declareYear: "",
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      planDetailList: [], //计划详情
    };
  },
  created({ declareYear, townStreetName } = this.$route.query) {
    this.declareYear = declareYear;
    this.getTrsAreaList(townStreetName);
  },
  methods: {
    back() {
      history.go(-1);
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    initPage() {
      var self = this;
      self.$api.statisticsApi
        .getPlanDetailList({
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          declareYear: this.declareYear,
          ...this.formInline,
        })
        .then((resp) => {
          resp.content.map(ele=>{
            if(ele.declareState===9){
                ele.declareStateName='上报成功';
            }else if(ele.declareState===10){
               ele.declareStateName='上报失败';
            }else{
               ele.declareStateName='未上报';
            }
          })
          self.planDetailList = resp.content;
          self.pageInfo.total = resp.totalElements || 0;
        });
    },
    handleQuery() {
      this.initPage();
    },
    //获取所属镇街
    getTrsAreaList(townStreetName) {
      var self = this;
      self.$api.dictionariesApi.getTrsAreaList().then((res) => {
        self.zStreetList = res.map(function (item) {
          if (item.streetName === townStreetName) {
            self.formInline.townStreetId = item.id;
          }
          return item;
        });
        this.initPage();
      });
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  height: calc(100vh - 105px);
  overflow-y: auto;
  .back-btn {
    position: absolute;
    right: 70px;
    top: 110px;
    z-index: 99;
  }
  /deep/ .el-table  {
  font-size:14px ;
}
  h3 {
    border-left: 8px solid #108ee9;
    color: #108ee9;
    padding-left: 15px;
    letter-spacing: 1px;
  }
}
</style>
