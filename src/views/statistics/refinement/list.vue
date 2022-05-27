<template>
  <el-card class="main-container">
    <template slot="header">
      <h2 class="top-titles">全区精细化执行情况查询</h2>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="查询周期">
          <el-date-picker type="daterange" placeholder="选择查询周期" v-model="searchForm.cycleData" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
          <el-button type="primary" @click="jump()">单位清单维护</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="产废单位" name="first">

          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="date" label="序号">
            </el-table-column>
            <el-table-column prop="date" label="单位名称">
            </el-table-column>
            <el-table-column label="联单数量（份）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="精细化入库量（吨）">
            </el-table-column>
            <el-table-column prop="date" label="联单转移量（吨）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="启动率">
              <el-table-column prop="name" label="企业启动率">
              </el-table-column>
              <el-table-column prop="name" label="全区启动率">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="执行率">
              <el-table-column prop="name" label="企业使用率">
              </el-table-column>
              <el-table-column prop="name" label="全区使用率">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="经营单位（利用/处置）" name="second">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="date" label="序号">
            </el-table-column>
            <el-table-column prop="date" label="单位名称">
            </el-table-column>
            <el-table-column label="联单数量（份）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="精细化入库量（吨）">
            </el-table-column>
            <el-table-column prop="date" label="联单转移量（吨）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="启动率">
              <el-table-column prop="name" label="企业启动率">
              </el-table-column>
              <el-table-column prop="name" label="全区启动率">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="执行率">
              <el-table-column prop="name" label="企业使用率">
              </el-table-column>
              <el-table-column prop="name" label="全区使用率">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="经营单位（收集）" name="third">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="date" label="序号">
            </el-table-column>
            <el-table-column prop="date" label="单位名称">
            </el-table-column>
            <el-table-column label="联单数量（份）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="精细化入库量（吨）">
            </el-table-column>
            <el-table-column prop="date" label="联单转移量（吨）">
              <el-table-column prop="name" label="普通联单">
              </el-table-column>
              <el-table-column prop="name" label="精细化联单">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="启动率">
              <el-table-column prop="name" label="企业启动率">
              </el-table-column>
              <el-table-column prop="name" label="全区启动率">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="date" label="执行率">
              <el-table-column prop="name" label="企业使用率">
              </el-table-column>
              <el-table-column prop="name" label="全区使用率">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      searchForm: {
        cycleData: []
      },
      tableData1: [],
      tableData2: [],
      tableData3: [],
      activeName: 'first'
    };
  },
  created() {
    // this.initPage();
    this.searchForm.cycleData = [
      this.$moment().month(0).date(1).format("YYYY-MM-DD 00:00:00"),
      this.$moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD HH:mm:ss")
    ]
    console.log(this.searchForm.cycleData);
  },
  methods: {
    handleClick() {

    },
    jump() {
      this.$router.push({
        path: '/statistics/refinement/unitList'
      })
    }
  },
};
</script>

<style scoped lang="less">
.main-container {
  /deep/ .el-table {
    font-size: 14px;
  }
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
  .text-tooltip {
    cursor: pointer;
  }
  h3 {
    padding-top: 20px;
  }
}
</style>
