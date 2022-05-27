<template>
    <el-card class="main-container">
      <h3 class="top-titles" slot="header">管理计划统计</h3>
      <div class="chose-tab">
        <el-radio-group v-model="type" size="small" @change="changeType">
          <el-radio-button label="1">按全区统计</el-radio-button>
          <el-radio-button label="2">按镇街统计</el-radio-button>
        </el-radio-group>
      </div>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="年度">
          <el-date-picker
                  v-model="searchForm.declareYear"
                  value-format="yyyy"
                  type="year"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-item" v-if="type==='2'" label="镇街">
          <el-select v-model="searchForm.townStreetId" clearable placeholder="请选择镇街">
            <el-option
                    v-for="item in zStreetList"
                    :key="item.id"
                    :label="item.streetName"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="lodaData" style="margin-left:30px">查询</el-button >
        </el-form-item>
      </el-form>
      <el-table :data="managePlanList">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="declareYear" label="年度"> </el-table-column>
        <el-table-column prop="streetName" label="所属镇街" v-if="type==='2'"> </el-table-column>
        <el-table-column prop="declareTotal" label="填报总数"> </el-table-column>
        <el-table-column prop="confirmTotal" label="备案通过总数"> </el-table-column>
        <el-table-column prop="successTotal" label="上报成功总数"> </el-table-column>
        <el-table-column prop="failTotal" label="上报失败总数"> </el-table-column>
        <el-table-column
                label="操作"
                fixed="right">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="detailRow(scope.$index)"
                    type="text"
                    size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
       class="pagination"
              layout="total,prev,pager,next,jumper"
              :current-page.sync="pageInfo.curPage"
              @current-change="handleCurrentChange"
              :total="pageInfo.total"
               v-show="type==='1'"
      > </el-pagination>
    </el-card>
</template>

<script>
export default {
  name: 'PlanStatistics',
  data() {
      return {
        searchForm:{
          townStreetId:'',
          declareYear:''
        },
        zStreetList:[],//所有镇街
        type:'1',
        managePlanList:[],
        pageInfo:{
          curPage: 1,
          size: 10,
          total: 0,
        },
      }
  },
  methods:{
    lodaData(){
      var self = this;
      self.$api.statisticsApi.getManagementPlanList({
        page:self.pageInfo.curPage - 1,
        size:self.pageInfo.size,
        type:self.type,
        townStreetId:self.searchForm.townStreetId,
        declareYear:self.searchForm.declareYear,
      }).then(resp => {
        self.managePlanList = resp.content;
        self.pageInfo.total = resp.totalElements;
      })
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.lodaData();
    },
    getTrsAreaList(){
      this.$api.dictionariesApi.getTrsAreaList().then((res) => {
        this.zStreetList = res;
      })
    },
    changeType(e){
      this.searchForm.townStreetId = '';
      if(e==='2'){
        this.pageInfo.size=9000;
        this.searchForm.declareYear = (new Date()).getFullYear()+'';
      }else {
        this.pageInfo.size = 10;
        this.searchForm.declareYear = ''
      }
      this.pageInfo.curPage=1;
      this.lodaData();
    },
    //列表查看详情
    detailRow(index) {
      let obj = {declareYear: this.managePlanList[index].declareYear};
      //如果是镇街,需要传镇街id
      if(this.type==='2'){
          obj.townStreetName = this.managePlanList[index].streetName;
      }
      this.$router.push({
        path: '/statistics/PlanStatisticsDetail',
        query: obj,
      });
    },
  },
  created() {
    this.getTrsAreaList();
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
