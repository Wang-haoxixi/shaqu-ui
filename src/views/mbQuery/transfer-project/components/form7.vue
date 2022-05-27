<template>
  <div class="mp-form7-wrapper">
    <h3 class="component-title">表7 危险废物委托利用/处置措施</h3>
    <Form ref="form7" :model="itemList[0]">
      <table class="form-table">
        <thead>
          <tr>
            <th class="vertical-align">序号</th>
            <th>危险废物委托利用处置单位名称</th>
            <th>许可证编号</th>
            <th>危废代码</th>
            <th>危险废物的名称</th>
            <th>俗称</th>
            <th>利用处置方式</th>
            <th>本年度计划委托利用处置量（吨）</th>
            <th>上年度实际委托利用处置量(吨)</th>
          </tr>
        </thead>
        <tbody v-for="(ele, i) in itemList" :key="i">
          <tr>
            <th :rowspan="ele.waste.length" class="vertical-align">
              {{ i + 1 }}
            </th>
            <td :rowspan="ele.waste.length">
              <span>{{ ele.epName }}</span>
            </td>
            <td :rowspan="ele.waste.length">
              <span>{{ ele.licenceCode }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].wasteCode }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].wasteName }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].wasteSc }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].type }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].thisCount }}</span>
            </td>
            <td>
              <span>{{ ele.waste[0].lastCount }}</span>
            </td>
          </tr>
          <tr v-for="(item, index) in ele.waste.slice(1)" :key="index">
            <td>
              <span>{{ item.wasteCode }}</span>
            </td>
            <td>
              <span>{{ item.wasteName }}</span>
            </td>
            <td>
              <span>{{ item.wasteSc }}</span>
            </td>
            <td>
              <span>{{ item.type }}</span>
            </td>
            <td>
              <span>{{ item.thisCount }}</span>
            </td>
            <td>
              <span>{{ item.lastCount }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th :colspan="7" class="total-count">合计：</th>
            <td>{{ thisYearCount }}</td>
            <td>{{ lastYearCount }}</td>
          </tr>
        </tfoot>
      </table>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    declareId: {
      type: Number,
    },
  },
  data() {
    return {
      returnFlag: true,
      id: null,
      initItemList: [
        {
          useSystemEnt: true,
          waste: [
            {
              thisCount: 0,
              lastCount: 0,
            },
          ],
        },
      ],
      itemList: [
        {
          useSystemEnt: true,
          waste: [
            {
              thisCount: 0,
              lastCount: 0,
            },
          ],
        },
      ],
      formConditionMap: {
        wasteCodeList: [],
        typeList: [],
        epNameInitList: [],
        epNameLists: [[]], // 1企业1组数据
        licenceLists: [[]], // 1企业1组数据
      },
      isEdit: false,
    };
  },
  computed: {
    thisYearCount() {
      let total;
      total = this.itemList.reduce((sum, cur) => {
        let itemSum;
        itemSum = cur.waste.reduce((s, c) => {
          return s + Number(c.thisCount) || 0;
        }, 0);
        return sum + itemSum;
      }, 0);
      total = total || 0;
      return total.toFixed(6);
    },
    lastYearCount() {
      let total;
      total = this.itemList.reduce((sum, cur) => {
        let itemSum;
        itemSum = cur.waste.reduce((s, c) => {
          return s + Number(c.lastCount) || 0;
        }, 0);
        return sum + itemSum;
      }, 0);
      total = total || 0;
      return total.toFixed(6);
    },
  },
  methods: {
    getDetail() {
      this.$api.mbQueryApi.managementTable7(this.declareId).then((res) => {
        if (res) {
          let data = res;
          // 处理useSystemEnt：把得到的字符串类型转为bool类型
          data.jsonStr.forEach((item) => {
            item.useSystemEnt = item.useSystemEnt === "true";
          });
          this.itemList = data.jsonStr;
          this.id = data.id;
          this.itemList.forEach((item) => {
            if (item.waste && item.waste.length) {
              item.waste.forEach((item) => {
                if (item.wasteSc) {
                  item.wasteCodeSc = item.wasteCode + "," + item.wasteSc;
                } else if (!this.isDetail) {
                  // 兼容(编辑状态下)已录入，但没有俗称的管理计划
                  const wasteList = this.formConditionMap.wasteCodeList;
                  const waste = wasteList.find((ele) => {
                    return ele.wasteCode === item.wasteCode && ele.wasteSc;
                  });
                  if (waste) {
                    item.wasteSc = waste.wasteSc;
                  } else {
                    item.isInputSc = true;
                  }
                  item.wasteCodeSc = item.wasteCode + "," + item.wasteSc;
                }
              });
            } else {
              item.waste = [
                {
                  thisCount: 0,
                  lastCount: 0,
                },
              ];
            }
          });
        }
      });
    },
  },
  created() {
    // 获取表单详情
    this.getDetail();
  },
};
</script>

<style lang="less">
.mp-form7-wrapper {
  .ivu-select {
    text-align: left;
  }
  .ivu-select-dropdown-list {
    max-width: 300px;
  }
  .ivu-form-item {
    margin-bottom: 0;
  }

  padding: 12px 24px;
  overflow-y: auto;
  .component-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .form-table {
    margin: 0 auto 30px;
    .ivu-form-item {
      margin-bottom: 0;
    }
    td,
    th {
      width: 13em;
      border: 1px solid;
      padding: 10px;
      vertical-align: middle;
      text-align: center;
      &.vertical-align {
        width: 1.5em;
      }
      &.total-count {
        text-align: right;
      }
      &.switch {
        width: 3em;
        padding: 10px 5px;
      }
    }
    td {
      color: #515a6e;
    }
    .input-number {
      width: 140px;
    }
    .add-btn {
      margin-left: 10px;
      margin-top: 15px;
      font-size: 18px;
      color: #888;
      float: left;
      cursor: pointer;
    }
    .btn-group {
      .add-btn {
        float: left;
        &.right {
          margin-left: 9px;
          margin-top: 12px;
          font-size: 20px;
        }
      }
    }
  }
  .component-footer {
    text-align: center;
    .save-btn {
      margin-right: 15px;
    }
    .tip {
      color: #999;
      font-size: 13px;
      margin-top: 5px;
    }
  }
}
</style>