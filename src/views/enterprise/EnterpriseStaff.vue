<template>
  <el-card class="main-container">
    <template slot="header">
      <p class="top-titles">企业人员</p>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="所属公司">
          <el-input
            v-model="searchForm.enterpriseName"
          ></el-input> </el-form-item
        ><el-form-item label="姓名">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lodaData" style="margin-left: 200px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="data" header-align="center">
      <el-table-column prop="idx" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="username" label="登录名"></el-table-column>
      <el-table-column prop="enterpriseName" label="所属公司"></el-table-column>
      <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
      <el-table-column prop="telephone" label="联系电话"></el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="pageInfo.curPage"
      :page-size.sync="pageInfo.size"
      @current-change="handleCurrentChange"
      :total="pageInfo.total"
      class="pagination"
    ></el-pagination>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";
// import{DH_PHONE}from"@/utils/regExps";
export default {
  data() {
    return {
      data: [],
      pageInfo: {
        curPage: 1,
        size: 15,
        total: 0,
      },
      searchForm: { name: "", enterpriseName: "" },
      conditions: "",
    };
  },
  methods: {
    lodaData() {
      let self = this;
      this.conditions = conds.asConditionString(
        JSON.stringify(
          conds.and([
            conds.like("name", this.searchForm.name),
            conds.like("enterpriseName", this.searchForm.enterpriseName),
          ])
        )
      );
      self.$api.enterpriseApi
        .getEnterpriseStaffList({
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          condition: self.conditions,
        })
        .then((resp) => {
          resp.content.map((ele, index) => {
            ele.idx = resp.number * resp.size + index + 1;
          });
          self.data = resp.content;
          self.pageInfo.total = resp.totalElements;
          self.pageInfo.totalPages = resp.totalPages;
        });
    },

    // entChange(val){
    //   this.addForm.id=this.entList.map(item=>{
    //      if(item.name===val){
    //        return this.addForm.id = item.id
    //      }
    //   })
    // },
    // searchEnt(val){
    //   if(val){
    //     this.loading=true;
    //      this.conditoions = conds.asConditionString(JSON.stringify(conds.like('name',val)));
    //     this.$api.enterpriseApi.getEnterpriseList({conditoion:this.conditoions}).then(res=>{
    //       this.entList=res;
    //       this.loading=false;
    //     })
    //   }
    // },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.lodaData();
    },
  },
  created() {
    this.lodaData();
    // this.$api.codeApi.getDivisionList().then(res=>{
    //   this.divList=res;
    // });
    // this.$api.enterpriseApi.getEnterpriseList().then(res=>{
    //   this.entList=res;
    // })
  },
};
</script>

<style lang="less" scoped>
.main-container{
  overflow-y: auto;
  /deep/ .el-table  {
  font-size:14px ;
}
}
</style>
