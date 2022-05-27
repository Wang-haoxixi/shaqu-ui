<template>
  <el-card class="main-container">
    <h3 class="top-titles" slot="header">异常预警统计</h3>
    <el-table :data="tableData" style="width: 100%" 
    >
    <!-- :header-row-style="{'font-size':'14px'}"
    :cell-style="{'font-size':'14px'}" -->
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="name" label="业务类型"> </el-table-column>

      <el-table-column label="预警/异常总数">
        <template slot-scope="scope">
          <el-button class="buttons" type="text" @click="alarmList(scope.row,'')">{{ scope.row.total }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="企业待处理">
        <template slot-scope="scope">
          <el-button  class="buttons"  type="text" @click="alarmList(scope.row,'UNPROCESSED')">{{ scope.row.unprocessed }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="企业已处理">
        <template slot-scope="scope">
          <el-button  class="buttons" type="text" @click="alarmList(scope.row,'PROCESSED')">{{ scope.row.processed }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="核实已通过">
        <template slot-scope="scope">
          <el-button  class="buttons" type="text" @click="alarmList(scope.row,'PASS')">{{ scope.row.pass }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="核实未通过">
        <template slot-scope="scope">
          <el-button  class="buttons" type="text" @click="alarmList(scope.row,'NOT_PASS')">{{ scope.row.notPass }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
    };
  },
  methods: {
    loadData() {
      this.$api.statisticsApi.getMonitorList().then((res) => {
        this.tableData = res;
      });
    },
    alarmList(data,type){
      this.$router.push({
        path:'/statistics/monitorStatisticsDetail',
        query:{
          businessCode:data.code,
          type,
        }
      })
    },
  },
  created() {
    this.loadData()
  },
};
</script>

<style lang="less" scoped>
.buttons{
  font-size:14px;
}
/deep/ .el-table  {
  font-size:14px ;
}
</style>