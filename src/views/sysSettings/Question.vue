<template>
  <div class="main-container">
    <div class="qs">
      <el-card class="box-card">
        <div class="qs-seach">
          <div class="qs-step"></div>
          <el-autocomplete  placeholder="请输入公司名称或业务名称"
                 class="input-with-select myinput-serch"
                 v-model="name"
                 :fetch-suggestions="querySearch"
                 :trigger-on-focus="false"
                 :select-when-unmatched="true"
                 @select="handleSelect"
                 size="large"
                 value-key="name">
            <el-button  slot="append" icon="el-icon-search" @click="handleSelect"></el-button>
          </el-autocomplete >
        </div>
      </el-card>
    </div>
    <!--  <img class='img1' src="@/assets/images/1180351.gif" >-->
<!--    <div>-->
<!--      <h4>请输入您要咨询的模块</h4>-->
<!--      <el-autocomplete style="width: 50%;margin:12px 0"-->
<!--              class="input-with-select myinput-serch"-->
<!--              v-model="name"-->
<!--              :fetch-suggestions="querySearch"-->
<!--              placeholder="请输入关键词"-->
<!--              :trigger-on-focus="false"-->
<!--              @select="handleSelect"-->
<!--              size="large"-->
<!--              value-key="name"-->
<!--      >-->
<!--        <el-button slot="append" icon="el-icon-search" @click="handleSelect">查询</el-button>-->
<!--      </el-autocomplete>-->
<!--    </div>-->
    <el-table :data="list" @row-click = "redirect" v-if="list.length" class="my-table">
      <el-table-column prop="name"
                       min-width="180"
                       label="">
      </el-table-column>
    </el-table>
    <el-pagination v-if="pageInfo.total>10"
                   layout="total,prev,pager,next,jumper"
                   :current-page.sync="pageInfo.curPage"
                   @current-change="handleCurrentChange"
                   :total="pageInfo.total"
                    class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {
      list: [],
      name: '',
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
    };
  },
  created() {},
  methods: {
    redirect(row) {
      window.open(`http://113.204.228.66:17777/page/display?document_id=${row.documentId}`, '_blank');
    },
    handleSelect(){
      this.initPage();
    },
    querySearch(queryString, cb) {
      var self = this;
      this.$api.sysSettingsApi.login({
        page: self.pageInfo.curPage - 1,
        size: self.pageInfo.size,
        name:queryString,
      }).then((resp) => {
        cb( resp.content.slice(0,10) );
      });
      // 调用 callback 返回建议列表的数据
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    initPage() {
      var self = this;
      this.$api.sysSettingsApi.login({
        page: self.pageInfo.curPage - 1,
        size: self.pageInfo.size,
        name:self.name,
      }).then((resp) => {
        self.list = resp.content;
        self.pageInfo.total = resp.totalElements;
      });
    },
  },
};
</script>

<style scoped lang="less">
  .el-main{
    padding: 0;
  }
  /deep/ .el-table  {
  font-size:14px ;
}
  .main-container {
    height: calc(100vh - 105px);
    overflow-y: auto;
    .my-table{
      margin-top: 50px;
      /deep/ tr{
        cursor: pointer;
      }
    }
    .qs{
      height: 300px;
      background-image: url("../../assets/images/qs.png");
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .box-card{
        width: 60%;
        min-width: 792px;
        margin-top: 220px;
        .qs-seach{
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .qs-step{
            height: 40px;
            width: 702px;
            background-image: url("../../assets/images/qsstep.png");
            background-size: contain;
            background-repeat: no-repeat;
          }
          .myinput-serch{
            min-width: 702px;
            margin-top: 24px;
            width: 90%;
            /deep/ .el-input-group__append {
              background: #28f;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .img1 {
    width: 100%;
    margin-top: 10%;
  }
</style>
