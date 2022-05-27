<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">预警数据归档</h3>
      <div class="search">
        <span>企业名称：</span>
        <el-input
          v-model="entName"
          style="width: 300px"
          placeholder="请输入查询企业"
        ></el-input>
        <el-button
          @click="getTableData"
          type="primary"
          style="margin-left: 200px"
          >查询</el-button
        >
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderId" label="序号"> </el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称">
      </el-table-column>
      <el-table-column prop="townStreetName" label="所属镇街"></el-table-column>
      <!-- <el-table-column prop="todayCount" label="今日已处理预警异常条数" ></el-table-column> -->
      <el-table-column prop="totalCount" label="预警异常总条数">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click="detailRow(scope.row.enterpriseName)"
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
      @current-change="getTableData"
      :page-size.sync="size"
      :total="total"
      class="pagination"
    ></el-pagination>
  </el-card>
</template>

<script>
// import {formatDate} from '@/utils/tools';
// import {conds} from "@/utils/tools";
export default {
  data() {
    return {
      form: {},
      conditoions: "",
      entName: "",
      tableData: [],
      page: 1,
      size: 10,
      total: null,
      specialSort: "totalCount",
      funName: "",
    };
  },
  methods: {
    getTableData() {
      this.$api.monitor
        .disposedEntList({
          page: this.page - 1,
          size: this.size,
          specialSort: this.specialSort,
          enterpriseName: this.entName,
          //   condition:this.conditions,
        })
        .then((res) => {
          res.content.map((ele, index) => {
            ele.orderId = res.size * res.number + index + 1;
            ele.todayCount = ele.todayCount || 0;
          });
          this.total = res.totalElements;
          this.page = res.number + 1;
          this.tableData = res.content;
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    detailRow(data) {
      this.$router.push({
        path: "/monitor/listDetail",
        query: {
          name: data,
          type: "PROCESSED",
        },
      });
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  
  height: calc(100vh - 105px);
  overflow-y: auto;
}
/deep/ .el-table  {
  font-size:14px ;
}
.search-list {
  margin-bottom: 20px;
  .select,
  .val-input {
    width: 220px;
  }
  .ivu-form-item-content {
    margin-left: 0;
  }
  .add-box {
    margin-top: -15px;
    .add-dup {
      float: right;
    }
  }
}
.search {
  margin-bottom: 20px;
  font-size: 14px;
}
table {
  overflow-y: scroll;
  button {
    color: rgb(24, 138, 242);
  }
}
.pager {
  text-align: center;
  margin-top: 10px;
}
.set-btn {
  margin-top: -20px;
  text-align: center;
  button {
    margin-left: 10px;
  }
}

.single-code {
  color: blue;
  cursor: pointer;
}
.duplicateCode {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.rows {
  margin: 16px 0;
}
.deal {
  width: 100%;
  border-bottom: 1px dashed #ccc;
}
.ivu-modal-body {
  height: 450px;
}
</style>
