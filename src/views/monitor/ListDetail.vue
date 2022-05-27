<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <h3 class="top-titles">预警与异常{{ titles }}</h3>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="异常列表" name="ABNORMAL">
        <!-- <el-table-column prop="statusName" label="处理状态"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
            <el-button v-if="scope.row.statusName==='企业已处理'"-->
        <!--                      @click="dealRow(scope.row)"-->
        <!--                      type="text"-->
        <!--                      size="small"-->
        <!--              >-->
        <!--                核实-->
        <!--              </el-button>-->
        <!-- <el-button
                         @click="dealRow(scope.row,'detail')"
                         v-if="scope.row.statusName!=='企业待处理'"
                         type="text"
                         size="small"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </el-tab-pane>
      <el-tab-pane label="预警列表" name="EARLY_WARNING"> </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderId" label="序号" width="100"></el-table-column>
      <!-- <el-table-column prop="serviceNumber" label="业务编号"></el-table-column>
      <el-table-column
        prop="businessTypeName"
        label="业务类型"
      ></el-table-column> -->
      <el-table-column
        prop="enterpriseNames"
        label="相关企业"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.enterpriseNames }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="exceptionTypeName"
        label="规则类型"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.exceptionTypeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="报警内容" show-overflow-tooltip>
        <template slot-scope="scope">
          <div style="cursor: pointer">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发生时间"></el-table-column>
      <el-table-column
        prop="statusName"
        label="处理状态"
        v-if="activeName === 'ABNORMAL'"
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        v-if="activeName === 'ABNORMAL'"
      >
        <template slot-scope="scope">
          <el-button
            @click="dealRow(scope.row)"
            v-if="scope.row.statusName === '企业已处理'"
            type="text"
            size="small"
          >
            核实
          </el-button>
          <!-- v-if="scope.row.statusName!=='企业待处理' || scope.row.exceptionType === 'J'" -->
          <el-button
            @click="dealRow(scope.row, 'detail')"
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
      :current-page.sync="page"
      :page-size.sync="size"
      @current-change="handleChange"
      :total="total"
      class="pagination"
    ></el-pagination>
    <el-dialog
      :title="isSpDetail ? '详情' : '核实'"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible"
      width="60%"
      @close="closeDialog"
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
            <div class="info-item">
              <span class="name"> 相关企业：</span
              ><span>{{ centerDialogContent.enterpriseNames }}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="name"> 异常内容：</span
            ><span>{{ centerDialogContent.content }}</span>
          </div>
          <div
             class="alarm-img"
            v-if="centerDialogContent.exceptionType === 'J'"
          >
            <span class="name"> 异常图片：</span>
            <img v-for="(item,index) in imgSrc" :key='index' :src="item" alt="" />
          </div>
        </div>
        <div class="info-title">核实信息</div>
        <!-- <div  v-if="spDetailList.length"> -->
        <el-table height="120" :data="spDetailList" border style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="userName" label="核实人"></el-table-column>
          <el-table-column prop="createTime" label="核实时间"></el-table-column>
          <el-table-column label="核实状态">
            <template slot-scope="scope">
              <div>
                {{ statusName[scope.row.targetStatus] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="核实意见"></el-table-column>
        </el-table>
        <el-pagination
          v-if="spDetailList.length"
          layout="total,prev,pager,next,jumper"
          :current-page.sync="pageInfo.curPage"
          @current-change="handleCurrentChange"
          :total="pageInfo.total"
          class="pagination"
        ></el-pagination>
        <!-- </div> -->
        <div class="info-content" v-if="!isSpDetail">
          <div class="info-other">
            <el-radio-group v-model="radio" @change="radioChange">
              <el-radio label="1" size="medium">通过</el-radio>
              <el-radio label="2" size="medium">不通过</el-radio>
            </el-radio-group>
          </div>
          <div class="info-other">
            <span class="name"> 核实意见：</span>
            <el-input
              type="textarea"
              placeholder="请输入核实意见"
              v-model="handleContent"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer" v-if="!isSpDetail">
        <el-button
          type="primary"
          @click="shenPi"
          :disabled="radio === '2' && !handleContent.trim().length"
        >
          提 交
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";

export default {
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      activeName: "ABNORMAL",
      warnList: [],
      abnList: [],
      conditoions: "",
      status: this.$route.query.type,
      titles: this.$route.query.type === "UNPROCESSED" ? "" : "数据归档",
      centerDialogVisible: false,
      handleContent: "",
      centerDialogContent: {},
      radio: "1",
      statusName: {
        UNPROCESSED: "企业待处理",
        PROCESSED: "企业已处理",
        PASS: "核实通过",
        NOT_PASS: "核实未通过",
      },
      isSpDetail: false,
      spDetailList: [],
      imgSrc: [],
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
    };
  },
  methods: {
    back() {
      history.go(-1);
    },
    changeTab() {
      this.page = 1;
      this.getTableData();
    },
    getTableData() {
      this.conditoions = conds.asConditionString(
        JSON.stringify(
          conds.and([
            conds.like("enterpriseNames", this.$route.query.name),
            // conds.eq('status', this.status),
            conds.in(
              "status",
              this.status === "PROCESSED"
                ? ["PASS"]
                : ["UNPROCESSED", "PROCESSED", "NOT_PASS"]
            ),
            conds.eq("alarmType", this.activeName),
          ])
        )
      );
      let self = this;
      this.$api.monitor
        .queryAlarmList({
          page: this.page - 1,
          size: 10,
          sort: "id,desc",
          condition: this.conditoions,
        })
        .then((res) => {
          res.content.map((ele, index) => {
            ele.orderId = res.size * res.number + index + 1;
            ele.statusName = self.statusName[ele.status];
          });
          this.total = res.totalElements;
          this.totalPages = res.totalPages;
          this.tableData = res.content;
        });
    },
    handleChange(val) {
      this.page = val;
      this.getTableData();
    },
    dealRow(row, isDetail) {
      if (isDetail) {
        this.isSpDetail = true;
      }
      if (row.exceptionType === "J") {
        this.getVideoImg(row.id);  //监控报警图片显示
      }
      this.centerDialogContent = row;
      this.getSpDetailList();
    },
    getVideoImg(id) {
      let self = this;
      self.imgSrc = [];
      self.$api.monitor.videoAlarmData(id).then((res) => {
        res.map((ele) => {
          // self.$api.monitor.getVideoImg(ele.fileObject.id).then((resp) => {
          //   self.imgSrc.push(resp);
          // });
          self.imgSrc.push(`${process.env.VUE_APP_BASE_URL}fileObject/${ele.fileObject.id}`)
        });
      });
    },
    getSpDetailList() {
      let self = this;
      self.$api.monitor
        .alarmHandle(self.centerDialogContent.id, {
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
        })
        .then((resp) => {
          self.spDetailList = resp.content;
          self.pageInfo.total = resp.totalElements;
          self.centerDialogVisible = true;
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.getSpDetailList();
    },
    shenPi() {
      let self = this;
      if (self.radio === "1") {
        //通过
        self.$api.monitor
          .alarmHandlePass(self.centerDialogContent.id, {
            content: self.handleContent,
          })
          .then(() => {
            self.$message.success("处理成功");
            self.centerDialogVisible = false;
            self.closeDialog();
            self.getTableData();
          });
      } else {
        //不通过
        self.$api.monitor
          .alarmHandleNotPass(self.centerDialogContent.id, {
            content: self.handleContent,
          })
          .then(() => {
            self.$message.success("处理成功");
            self.centerDialogVisible = false;
            self.closeDialog();
            self.getTableData();
          });
      }
    },
    radioChange() {
      this.handleContent = "";
    },
    closeDialog() {
      //初始化弹窗数据
      this.radio = "1";
      this.handleContent = "";
      this.isSpDetail = false;
      this.pageInfo = {
        curPage: 1,
        size: 10,
        total: 0,
      };
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table  {
  font-size:14px ;
}
.title {
  text-align: left;
  font-family: "yahei";
  font-size: 16px;
  font-weight: 700;
  border-left: 4px solid #2d8cf0;
  padding: 8px;
  width: 100%;
  padding-left: 7px;
  line-height: 15px;
  margin-bottom: 30px;
}
.info-block {
  .info-title {
    background: #d2eafb;
    padding: 8px;
    margin: 16px 0;
    border-left: 8px solid #108ee9;
  }
  .info-content {
    .info-items {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      &.guobang {
        justify-content: space-between;
        margin: 24px 0;
      }
    }
    .info-item {
      font-size: 14px;
      color: #999999;
      height: 32px;
      line-height: 32px;
      min-width: 28%;
      margin-right: 32px;
      .name {
        margin: 0 8px;
        color: #333;
        font-weight: 600;
      }
     
    }
    .alarm-img{
      font-size: 14px;
      color: #999999;
      margin-right: 32px;
      position:relative;
      min-height:100px;
      .name {
        margin: 0 8px;
        color: #333;
        font-weight: 600;
        position:absolute;
        top:10px;
        left:0;
      }
      img{
        display:inline-block;
        width:140px;
        height:120px;
        margin-left:100px;
      }
    }
    .info-other {
      display: flex;
      justify-content: left;
      margin-top: 24px;
      .name {
        margin: 0 8px;
        color: #333;
        font-weight: 600;
        min-width: 80px;
      }
    }
  }
}
.back-btn {
  position: absolute;
  right: 70px;
  top: 110px;
  z-index: 99;
}
/deep/ .el-table  {
  font-size:14px ;
}
</style>
