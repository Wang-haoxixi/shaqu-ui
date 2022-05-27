<template>
  <el-card class="main-container">
    <template #header>
      <h3 class="top-titles">危废环比同比查询</h3>
      <el-form label-width="100px" inline>
        <el-form-item label="查询周期">
          <el-select v-model="search.queryCycle" @change="handleSelectChange">
            <el-option value="year" label="年度查询"></el-option>
            <el-option value="month" label="月度查询"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询方式">
          <el-select v-model="search.queryType">
            <el-option value="0" label="同比查询"></el-option>
            <el-option value="1" label="环比查询"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间">
          <el-date-picker
            v-model="search.startTime"
            :type="search.queryCycle"
            :format="picker.format"
            :value-format="picker.format"
            :picker-options="picker.startOptions"
            placeholder="起使时间"
            @change="handleDatePickerStartChange"
          ></el-date-picker>
          <span style="margin: 0 .5rem">至</span>
          <el-date-picker
            v-model="search.endTime"
            :type="search.queryCycle"
            :format="picker.format"
            :value-format="picker.format"
            :picker-options="picker.endOptions"
            placeholder="结束时间"
            @change="handleDatePickerEndChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="产废单位">
          <el-input v-model="search.proId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="dateTime" label="查询周期"></el-table-column>
        <el-table-column prop="transWeight" label="本期转移量（吨）">
          <template slot-scope="scope">
            <span>{{scope.row.transWeight | decimal}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="preTransWeight" :label="search.queryType === '0' ? '上年同期转移量（吨）' : '上期转移量（吨）'" >
          <template slot-scope="scope">
            <span>{{scope.row.preTransWeight | decimal}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="growthRate" :label="search.queryType === '0' ? '同比查询' : '环比查询'">
          <template slot-scope="scope">
            <i :class="scope.row.growthRate > 0 ? 'el-icon-top text-success' : 'el-icon-bottom text-danger'"></i>
            <span>{{scope.row.growthRate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
import moment from 'moment';


export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      search: {
        queryCycle: 'year',
        queryType: '0',
        startTime: moment().format('yyyy'),
        endTime: moment().format('yyyy'),
        proId: '',
      },
      tableData: [],
      picker: {
        format: 'yyyy',
        startOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        endOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
    };
  },
  filters: {
    decimal(val) {
      return Number(val).toFixed(2)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {}
      Object.assign(params, this.search)
      params.queryCycle = this.search.queryCycle === 'year' ? 0 : 1
      params.queryType = parseInt(this.search.queryType)

      this.$api.mbQueryApi.getQueryCompare(params).then(res => {
        this.tableData = res.data
        this.pagination.total = this.tableData.length
      })
    },

    // ------------------------------------------
    // events handle
    // ------------------------------------------

    // 查询周期
    handleSelectChange(value) {
      if (value === 'year') {
        this.search.startTime = moment().format('yyyy');
        this.search.endTime = moment().format('yyyy');
        this.picker.format = 'yyyy';
      } else {
        this.search.startTime = moment().format('yyyy-MM');
        this.search.endTime = moment().format('yyyy-MM');
        this.picker.format = 'yyyy-MM';
      }
      this.search.org = '';
      this.getData();
    },

    // 查询起始时间
    handleDatePickerStartChange(value) {
      const amount = this.search.queryCycle === 'year' ? 4 : 11;
      const unit = this.search.queryCycle;
      const format = this.search.queryCycle === 'year' ? 'yyyy' : 'yyyy-MM'

      this.picker.endOptions = {
        disabledDate(time) {
          const endDate = moment(value)
            .add(amount, unit)
            .valueOf();
          return time.getTime() > (Date.now() > endDate ? endDate : Date.now());
        },
      };

      if (this.search.endTime > moment(moment(value).add(amount, unit)).format(format)) {
        this.search.endTime = moment(value)
          .add(amount, unit)
          .format(format);
      }
    },

    // 查询结束时间
    handleDatePickerEndChange(value) {
      const amount = this.search.queryCycle === 'year' ? 4 : 11;
      const unit = this.search.queryCycle;
      const format = this.search.queryCycle === 'year' ? 'yyyy' : 'yyyy-MM'

      this.picker.startOptions = {
        disabledDate(time) {
          const startDate = moment(value)
            .add(-amount, unit)
            .valueOf();
          return time.getTime() > moment(value).valueOf() || time.getTime() < startDate;
        },
      };

      if (this.search.startTime > moment(moment(value).add(amount, unit)).format(format)) {
        this.search.startTime = moment(value)
          .add(amount, unit)
          .format(format);
      }
    },

    handleSearch() {
      this.getData()
    },
  },
};
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px !important;
}
.text-success {
  color: #67C23A;
}

.text-danger {
  color: #F56C6C
}
</style>
