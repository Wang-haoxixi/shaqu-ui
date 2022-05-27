<template>
    <el-card class="main-container">
      <h3 class="top-titles" slot="header">登录统计</h3>
      <el-table :data="loginCountList.content">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="nickname" label="名称"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最后一次登录时间"></el-table-column>
        <el-table-column prop="id" label="账号ID"> </el-table-column>
        <el-table-column prop="count" label="登录次数"></el-table-column>
      </el-table>
      <el-pagination 
        class="pagination"
        layout="total,prev,pager,next,jumper"
        :current-page.sync="pageInfo.curPage"
        @current-change="handleCurrentChange"
        :total="pageInfo.total"
      ></el-pagination>
    </el-card>
</template>

<script>
export default {
  name: 'PlanStatistics',
  data() {
      return {
        loginCountList:[],
        pageInfo:{
          curPage: 1,
          size: 10,
          total: 0,
        }
      }
  },
  methods:{
    lodaData(){
      var self = this;
      self.$api.statisticsApi.getLoginCount({
        page:self.pageInfo.curPage - 1,
        size:self.pageInfo.size,
      }).then(resp => {
        console.log('返回值：', resp);
        this.loginCountList = resp
      })
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.lodaData();
    }
  },
  created() {
    this.lodaData();
  }
};
</script>

<style scoped lang="less">
  .main-container {
    height: calc(100vh - 105px);
    overflow-y: auto;
    .chose-tab{
      padding-left: 50px;
      margin-bottom: 24px;
    }
    /deep/ .el-table  {
  font-size:14px ;
}
  }
</style>
