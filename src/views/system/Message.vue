<template>
  <el-card class="main-container">
    <p slot="header" class="top-titles">短信发送记录</p>
    <el-table :data="msgList" header-align="center">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="receiverName" label="接收人"></el-table-column>
      <el-table-column prop="receiverMobile" label="联系电话"></el-table-column>
      <el-table-column prop="content" min-width="300" label="短信内容"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.content }}
            </div>
          </template>

      </el-table-column>
      <el-table-column prop="createTime" label="发送时间"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
    </el-table>
    <div class="page-wrapper">
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
  data() {
    return {
      msgList: [],
      pageInfo: {
        curPage: 1,
        size: 15,
        total: 0,
      },
    };
  },
  methods: {
    loadData() {
      this.$api.systemApi.getMsgList({
        page: this.pageInfo.curPage - 1,
        size: this.pageInfo.size,
        sort:'id,desc'
      }).then(res=>{
          res.content.map(ele=>{
              ele.statusName=ele.status==='SEND_SUCCESS'?'发送成功':'发送失败';
          })
          this.msgList=res.content;
          this.pageInfo.total=res.totalElements;
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table  {
  font-size:14px ;
}
</style>
