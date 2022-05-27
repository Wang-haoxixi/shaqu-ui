<template>
  <el-card class="main-container">
    <template slot="header" style="position: relative;">
      <h2 class="top-titles">全区精细化执行情况查询->单位清单维护</h2>
      <el-form :model="searchForm" label-width="100px" :inline="true">
        <el-form-item label="统计年份">
          <el-date-picker type="year" placeholder="选择统计年份" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model.trim="searchForm.serial" placeholder="请输入单位名称">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
          <el-button type="primary" @click="addUnit()">添加单位</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="back()" class="btn-back" icon="el-icon-arrow-left">返回</el-button>
    </template>
    <div>
      <div>
        <el-table :data="tableData1" style="width: 100%" :border="true">
          <el-table-column prop="date" label="序号">
          </el-table-column>
          <el-table-column prop="date" label="统计年份">
          </el-table-column>
          <el-table-column prop="date" label="单位名称">
          </el-table-column>
          <el-table-column prop="date" label="统计类别">
          </el-table-column>
          <el-table-column prop="date" label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <template>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form :model="unitInfoForm" label-width="100px" size="medium" ref="unitRef" :rules="rules">
          <el-form-item label="单位名称" prop="region">
            <el-select v-model="unitInfoForm.region" placeholder="请选择单位名称">
              <el-option label="区域一" value="shanghai" :key="1"></el-option>
              <el-option label="区域二" value="beijing" :key="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计类别" prop="classess">
            <el-select v-model="unitInfoForm.classess" multiple placeholder="请选择统计类别">
              <el-option label="区域一" value="shanghai" :key="3"></el-option>
              <el-option label="区域二" value="beijing" :key="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计年份" prop="year">
            <el-select v-model="unitInfoForm.year" placeholder="请选择统计年份">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="isOk">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </el-card>
</template>

<script>
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      searchForm: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      dialogVisible: false,
      unitInfoForm: {
        classess: ''
      },
      rules: {
        region: [
          { required: true, message: '请选择单位名称', trigger: 'change' }
        ],
        classess: [
          { required: true, message: '请选择统计类别', trigger: 'change' }
        ],
        year: [
          { required: true, message: '请选择统计年份', trigger: 'change' }
        ],
      }
    };
  },
  created() {
    
  },
  methods: {
    addUnit() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs['unitRef'].resetFields();
    },
    isOk() {
      this.$refs['unitRef'].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back(){
      this.$router.go(-1);
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
  .btn-back{
    position: absolute;
    top: 20px;
    right: 30px;
  }
  .el-select {
    width: 80%;
  }
}
</style>
