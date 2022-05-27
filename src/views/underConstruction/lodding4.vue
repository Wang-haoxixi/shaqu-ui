<template>
  <div class="main-container">
    <div id="under-construction">功能建设中...</div>
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
  #under-construction{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 150px;
  }
</style>
