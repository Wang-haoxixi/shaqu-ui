<template>
  <el-card class="main-container">
    <template #header>
      <h3 class="top-titles">危废利用统计</h3>
    </template>

    <el-form inline>
      <el-form-item label="联单数据">
        <el-checkbox-group v-model="search.duplicateTypeList" @change="handleCouponChange">
          <el-checkbox
            name="coupon"
            :key="item.key"
            v-for="item in couponData"
            :label="item.key"
            :disabled="item.disabled"
          >{{ item.value }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="统计周期">
        <el-date-picker
          v-model="daterange"
          type="daterange"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleDatePickerChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单位">
        <el-select v-model="search.unit">
          <el-option value="T" label="吨"></el-option>
          <el-option value="B" label="桶"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处置方式">
        <el-select v-model="search.wasteType" clearable>
          <el-option :key="item.id" v-for="item in dealsData" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findByAll">查询</el-button>
      </el-form-item>
    </el-form>

    <el-radio-group v-model="search.group" @change="findByAll">
      <el-radio label="0">镇街</el-radio>
      <el-radio label="1">废物类别</el-radio>
      <el-radio label="2">处置方式</el-radio>
    </el-radio-group>
    <el-table :data="tableData">
      <el-table-column label="序号" prop="order"></el-table-column>
      <el-table-column :label="search.group === '0' ? '镇街' : (search.group === '1' ? '废物类别' : '处置方式')" prop="name"></el-table-column>
      <el-table-column label="量" prop="count"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="search.pageNum"
      @current-change="findByAll"
      :total.sync="page.total">
    </el-pagination>
  </el-card>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      daterange: '',
      couponData: [],
      dealsData: [],
      tableData: [],
      search: {
        category: '0',
        group: '0',
        duplicateTypeList: [],
        unit: 'T',
        pageNum: 1,
        pageSize: 10,
        wasteType: '',
        dealType: '1',
        startDate: `${moment().format('YYYY')}-01-01`,
        endDate: moment().format('YYYY-MM-DD'),
        year: moment().format('YYYY')
      },
      page: {
        size: 10,
        total: 1
      }
    }
  },
  created() {
    this.findCouponData()
    this.findDealsData()

  },
  methods: {
    // 联单数据
    findCouponData() {
      this.$api.statisticsApi.getOrderList().then(res => {
        this.couponData = res.map(record => {
          const type = record.key.substring(0, 1)
          return {
            key: record.key,
            value: record.value,
            type,
            disabled: type === 'B' ? true : false
          }
        })

        this.couponData.forEach(record => {
          if (record.key.substring(0, 1) === 'A') {
            this.search.duplicateTypeList.push(record.key)
          }
        })

        this.findByAll()
      })
    },

    // 处置方式
    findDealsData() {
      this.$api.enterpriseApi.queryPatyDictionary('CROSS_DEAL_TYPE').then(res => {
        console.log('findDealsData:',res)
        this.dealsData = res
      })
    },

    findByAll() {
      this.$api.statisticsApi.getDisposalList(this.search).then(res => {
        this.page.total = res.data.total
        this.tableData = res.data.list
      })
    },

    handleCouponChange() {
      if (this.search.duplicateTypeList.length > 0) {
        if (this.search.duplicateTypeList.find(item => item.indexOf('A') > -1)) {
          this.couponData.forEach(record => {
            record.disabled = (record.type === 'A' || record.type === 'C') ? false : true
          })
        } else if (this.search.duplicateTypeList.find(item => item.indexOf('B') > -1)) {
          this.couponData.forEach(record => {
            record.disabled = record.type === 'B' ? false : true
          })
        } else if (this.search.duplicateTypeList.find(item => item.indexOf('C') > -1)) {
          this.couponData.forEach(record => {
            record.disabled = (record.type === 'A' || record.type === 'C') ? false : true
          })
        }
      } else {
        this.couponData.forEach(record => {
          record.disabled = false
        })
      }
    },

    // 统计周期
    handleDatePickerChange() {
      this.search.startDate = this.daterange[0]
      this.search.endDate = this.daterange[1]
    }
  }
}
</script>