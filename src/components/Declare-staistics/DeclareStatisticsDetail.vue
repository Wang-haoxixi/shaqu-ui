<template>
    <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <template slot="header">
      <h3>沙坪坝区{{titles}}上报情况</h3>
      <el-form :inline="true" :model="formInline" label-width="90px" style="margin-top:20px">
        <el-form-item class="search-item" label="所属镇街">
          <el-select v-model="formInline.townStreetId" clearable placeholder="请选择镇街">
            <el-option
                    v-for="item in zStreetList"
                    :key="item.id"
                    :label="item.streetName"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formInline.enterpriseName" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="上报状态" >
          <el-select  v-model="formInline.declareState" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="上报成功" value="YES"></el-option>
            <el-option label="上报失败" value="NO"></el-option>
            <el-option label="未上报" value="NOT"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="margin-left:30px" @click="handleQuery">查询</el-button>
      </el-form>
      </template>
      <div  v-loading="loading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table :data="detailList">
          <el-table-column type="index" min-width="180" label="序号"> </el-table-column>
          <el-table-column min-width="180" label="年度">
            <template slot-scope="scope">
              {{ scope.row.declareYear}}
            </template>
          </el-table-column>
          <el-table-column prop="streetName" min-width="180" label="所属镇街"> </el-table-column>
          <el-table-column prop="enterpriseName" min-width="180" label="企业名称"> </el-table-column>
          <el-table-column prop="declareState" min-width="180" label="上报状态"></el-table-column>
        </el-table>
        <el-pagination
                layout="total,prev,pager,next,jumper"
                :current-page.sync="pageInfo.curPage"
                :page-size.sync="pageInfo.size"
                @current-change="handleCurrentChange"
                :total="pageInfo.total"
                class="pagination"
        ></el-pagination>
      </div>
    </el-card>
</template>

<script>
export default {
  name: 'DeclareStatisticsDetail',
  data(){
    return {
      formInline:{
        // townStreetId:'',//选中镇街
      },
      titles:this.$route.query.title,
      zStreetList:[],//所有镇街
      declareYear:'',
      pageInfo:{
        curPage: 1,
        size: 15,
        total: 0,
      },
       typeList:{
            wfDeclareStaistics:'getDeclareDetail',
            yfDeclareStaistics:'getYFDeclareDetail',
            hmDeclareStaistics:'getHMDeclareDetail',
            czDeclareStaistics:'getJYDeclareDetail',
        },
      detailList:[],//计划详情
      loading:false,
    }
  },
  created({declareYear,townStreetName} = this.$route.query ) {
    this.declareYear = declareYear;
    this.getTrsAreaList(townStreetName);
  },
  methods:{
    back() {
      history.go(-1);
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    initPage(){
      var self = this;
      self.loading = true;
      if(this.formInline.declareState===''){
        delete this.formInline.declareState;
      }
      let fun=this.typeList[this.$route.query.typeName];
      self.$api.statisticsApi[fun]({
        page:self.pageInfo.curPage ,
        size:self.pageInfo.size,
        declareYear:this.declareYear,
        ...this.formInline
      }).then((resp) => {
        self.detailList=resp.list;
        self.pageInfo.total = resp.total || 0;
        self.loading = false;
      });
    },
    handleQuery(){
      this.initPage()
    },
    //获取所属镇街
    getTrsAreaList(townStreetName){
      var self = this;
      self.$api.dictionariesApi.getTrsAreaList().then((res) => {
        self.zStreetList = res.map(function (item) {
            if(item.streetName === townStreetName){
              self.formInline.townStreetId = item.id;
            }
            return item;
        });
        this.initPage();
      })
    },
  }
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
