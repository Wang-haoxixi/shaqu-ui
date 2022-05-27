<template>
    <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
      <h3 class="top-titles" slot="header">系统消息</h3>
      <el-tabs v-model="status" type="card" @tab-click="loadData">
        <el-tab-pane label="未读" name="UNREAD"> </el-tab-pane>
        <el-tab-pane label="已读" name="READ"> </el-tab-pane>
      </el-tabs>
      <el-table :data="msgList">
        <el-table-column
          type="index"
          width="100"
          label="序号"
        ></el-table-column>
        <el-table-column prop="content" label="消息内容"></el-table-column>
        <el-table-column prop="typeName" label="消息类型"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="detailRow(scope.row)"
              type="text"
              size="small"
            >
              详情
            </el-button>
            <el-button
              @click="setRead(scope.row)"
              type="text"
              size="small"
              v-show="status === 'UNREAD'"
            >
              设为已读
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          layout="total,prev,pager,next,jumper"
          :current-page.sync="pageInfo.curPage"
          @current-change="handleCurrentChange"
          :total="pageInfo.total"
          class="pagination"
        ></el-pagination>
      </div>
      <el-dialog
      title="消息详情"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      width="60%"
      @close="showDialog = false"
      center
    >
      <div class="info-block">
        <div class="info-title">基本信息</div>
        <div class="info-content">
          <div class="info-items">
            <div class="info-item">
              <span class="name"> 业务编号：</span
              ><span>{{ centerDialogContent.serviceNumber }}</span>
            </div>
            <div class="info-item">
              <span class="name"> 业务类型：</span
              ><span>{{ centerDialogContent.businessTypeName }}</span>
            </div>
            <div class="info-item">
              <span class="name"> 异常类型：</span
              ><span>{{ centerDialogContent.exceptionTypeName }}</span>
            </div>
          </div>
          <div class="info-items">
            <div class="info-item">
              <span class="name"> 发生时间：</span
              ><span>{{ centerDialogContent.createTime }}</span>
            </div>
            <div class="info-item">
              <span class="name"> 状态：</span
              ><span>{{ centerDialogContent.statusName }}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="name"> 相关企业：</span
            ><span>{{ centerDialogContent.enterpriseNames }}</span>
          </div>
          <div class="info-item">
            <span class="name"> 异常内容：</span
            ><span>{{ centerDialogContent.content }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    </el-card>
    
</template>

<script>
import { conds } from "@/utils/tools";
export default {
  data() {
    return {
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      conditoions: "",
      status: "UNREAD",
      msgList: [],
      showDialog: false,
      centerDialogContent: {},
      statusName:{
        'UNPROCESSED':'企业待处理',
        'PROCESSED':'企业已处理',
        'PASS':'核实通过',
        'NOT_PASS':'核实未通过',
      },
    };
  },
  methods: {
    loadData() {
      this.conditoions = conds.asConditionString(
        JSON.stringify(conds.eq("status", this.status))
      );
      this.$api.homeApi
        .getMsgList({
          page: this.pageInfo.curPage - 1,
          size: this.pageInfo.size,
          sort: "id,desc",
          condition: this.conditoions,
        })
        .then((res) => {
          res.content.map((ele) => {
            if (ele.type === "MONITOR") {
              ele.typeName = "预警异常消息";
            }
          });
          this.msgList = res.content;
          this.pageInfo.total = res.totalElements;
        });
    },
    back() {
      history.go(-1);
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.loadData();
    },
    detailRow(data) {
      // let conditions = conds.asConditionString(
      //   JSON.stringify(conds.eq("id", data.serviceId))
      // );
      this.$api.homeApi.getMsgDetail( data.serviceId).then(res=>{
        this.centerDialogContent=res;
        this.centerDialogContent.statusName= this.statusName[this.centerDialogContent.status];
        this.showDialog=true;
      });
    },
    setRead(data) {
      this.$api.homeApi.setMsgRead(data.id).then(() => {
        this.$message.success("已读成功！");
        this.$api.homeApi.getUnReadNum().then((res) => {
          this.loadData();
          this.$store.commit("saveUnReadNum", res);
        });
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.back-btn {
  position: absolute;
  right: 70px;
  top: 20px;
  z-index: 99;
}
/deep/ .el-table  {
  font-size:14px ;
}
.info-block {
  .info-title {
    background: #d2eafb;
    padding: 8px;
    margin: 16px 0;
    border-left: 8px solid #108ee9;
  }
  .info-content {
    .info-items{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      &.guobang{
        justify-content: space-between;
        margin: 24px 0;
      }
    }
    .info-item{
      font-size: 14px;
      color: #999999;
      height: 32px;
      line-height: 32px;
      min-width: 28%;
      margin-right: 32px;
      .name{
        margin: 0 8px;
        color: #333;
        font-weight: 600;
      }

    }
    .info-other{
      display: flex;
      justify-content: left;
      margin-top: 24px;
      .name{
        margin: 0 8px;
        color: #333;
        font-weight: 600;
        min-width: 80px;
      }
    }
  }
}
</style>