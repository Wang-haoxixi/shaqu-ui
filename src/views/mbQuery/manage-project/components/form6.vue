<template>
  <div class="mp-form6-wrapper">
    <div class="header">
      <h3 class="component-title">表6 危险废物自行利用/处置措施列表</h3>
    </div>
    <div class="content">
      <Table :data="formList" :columns="columns" stripe class="table">
        <template slot="detail" slot-scope="{ row }">
          <span class="text-btn" @click="showDetail(row.id)">详情</span>
        </template>
      </Table>
    </div>

    <Modal v-model="showModal" class="modal-box-form6">
      <div class="form-table">
        <div class="title">危险废物自行利用/处置措施列表</div>
        <Form ref="form6" :model="tempForm">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <th colspan="2">设施名称</th>
                <td colspan="3">
                  <span>{{ tempForm.facilitiesName }}</span>
                </td>
                <th>设施类别（利用处置方式）</th>
                <td>
                  <span>{{ tempForm.facilitiesType }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">设施地址</th>
                <td colspan="3">
                  <span>{{ tempForm.facilitiesAddress }}</span>
                </td>
                <th>总投资（万元）</th>
                <td>
                  <span>{{ tempForm.facilitiesInvestment }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">设计能力</th>
                <td colspan="3">
                  <span>{{ tempForm.facilitiesAbility }}</span>
                </td>
                <th>设计使用年限</th>
                <td>
                  <span>{{ tempForm.facilitiesTerm }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">投入运行时间</th>
                <td colspan="3">
                  <span>{{ tempForm.facilitiesWorkTime }}</span>
                </td>
                <th>运行费用</th>
                <td>
                  <span>{{ tempForm.facilitiesWorkCost }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">主要设备及数量</th>
                <td colspan="5">
                  <span>{{ tempForm.facilitiesCount }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">危险废物利用处置效果</th>
                <td colspan="5">
                  <span>{{ tempForm.wasteDealEffect }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="2">是否定期监测污染物排放情况</th>
                <td colspan="3">
                  <span>{{ tempForm.wasteDischargeCheck }}</span>
                </td>
                <th>污染物排放达标情况</th>
                <td>
                  <span>{{ tempForm.wasteStandardSituation }}</span>
                </td>
              </tr>
              <tr>
                <th :rowspan="tempForm.wasteDeal.length + 2">
                  危险废物自行利用处置情况
                </th>
                <th>序号</th>
                <th style="min-width: 105px">代码</th>
                <th>自行利用处置废物名称</th>
                <th style="min-width: 70px">俗称</th>
                <th>本年度计划利用处置量（吨）</th>
                <th>上年度实际利用处置量(吨)</th>
              </tr>
              <tr v-for="(item, index) in tempForm.wasteDeal" :key="index">
                <th>{{ index + 1 }}</th>
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
                  <span>{{ item.thisCount }}</span>
                </td>
                <td>
                  <span>{{ item.lastCount }}</span>
                </td>
              </tr>
              <tr>
                <th colspan="4">合计：</th>
                <td>{{ this.thisYearCount }}</td>
                <td>{{ this.lastYearCount }}</td>
              </tr>
              <tr>
                <th>危险废物自行利用处置工艺流程图及工艺说明</th>
                <td colspan="6">
                  <span>{{ tempForm.technologyExplain }}</span>
                </td>
              </tr>
              <tr>
                <th>二次环境污染控制和事故预防措施</th>
                <td colspan="6">
                  <span>{{ tempForm.pollutionMethod }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    </Modal>
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
    enterpriseId: {
      type: Number,
    },
  },
  data() {
    return {
      formList: [],
      baseColumns: [
        { title: "序号", type: "index", width: 90 },
        { title: "设施名称", key: "facilitiesName" },
        { title: "设施类别", key: "facilitiesType" },
        { title: "设计能力", key: "facilitiesAbility" },
        { title: "投入运行时间", key: "facilitiesWorkTime" },
        { title: "修改", slot: "edit", width: 85 },
        { title: "删除", slot: "delete", width: 85 },
        { title: "详情", slot: "detail", width: 90 },
      ],
      isEdit: false,
      modal_loading: false,
      showModal: false,
      tempForm: {
        wasteDeal: [
          {
            thisCount: 0,
            lastCount: 0,
          },
        ],
      },
      initForm: {
        wasteDeal: [
          {
            thisCount: 0,
            lastCount: 0,
          },
        ],
      },
      formConditionMap: {
        facNameList: [],
        wasteCodeList: [],
      },
      baseRules: {
        facilitiesName: [{ required: true, message: "不能为空！" }],
        facilitiesType: [{ required: true, message: "不能为空！" }],
        facilitiesAddress: [{ required: true, message: "不能为空！" }],
        facilitiesInvestment: [{ required: true, message: "不能为空！" }],
        facilitiesAbility: [{ required: true, message: "不能为空！" }],
        facilitiesTerm: [{ required: true, message: "不能为空！" }],
        facilitiesWorkTime: [{ required: true, message: "不能为空！" }],
        facilitiesWorkCost: [{ required: true, message: "不能为空！" }],
        facilitiesCount: [{ required: true, message: "不能为空！" }],
        wasteDealEffect: [{ required: true, message: "不能为空！" }],
        wasteDischargeCheck: [{ required: true, message: "不能为空！" }],
        wasteStandardSituation: [{ required: true, message: "不能为空！" }],
        technologyExplain: [{ required: true, message: "不能为空！" }],
        pollutionMethod: [{ required: true, message: "不能为空！" }],
      },
    };
  },
  computed: {
    columns() {
      const { isDetail, baseColumns } = this;
      let tempArr = JSON.parse(JSON.stringify(baseColumns));
      if (isDetail) {
        tempArr.splice(-3, 2);
      } else {
        tempArr.pop();
      }
      return tempArr;
    },
    thisYearCount() {
      let { wasteDeal } = this.tempForm;
      let total = 0;
      total = wasteDeal.reduce((sum, cur) => {
        sum = sum + Number(cur.thisCount) || 0;
        return sum;
      }, 0);
      return total.toFixed(6);
    },
    lastYearCount() {
      let { wasteDeal } = this.tempForm;
      let total = 0;
      total = wasteDeal.reduce((sum, cur) => {
        sum = sum + Number(cur.lastCount) || 0;
        return sum;
      }, 0);
      return total.toFixed(6);
    },
  },
  methods: {
    // 展示table项详情
    showDetail(id) {
      this.$api.mbQueryApi.managementTable6Detail(id).then((res) => {
        if (res) {
          let data, tempArr, facilitiesTypeCode, facilitiesType;
          data = res;
          data.wasteDeal = data.wasteDealJson;
          data.wasteDeal.forEach((item) => {
            if (item.wasteSc) {
              item.wasteCodeSc = item.wasteCode + "," + item.wasteSc;
            } else if (!this.isDetail) {
              // 兼容(编辑状态下)已录入，但没有俗称的管理计划
              const wasteList = this.formConditionMap.wasteCodeList;
              const waste = wasteList.find((ele) => {
                return item.wasteCode === ele.wasteCode && ele.wasteSc;
              });
              if (waste) {
                item.wasteSc = waste.wasteSc;
              } else {
                item.isInputSc = true;
              }
              item.wasteCodeSc = item.wasteCode + "," + item.wasteSc;
            }
          });
          // 得到的facilitiesType格式：‘C3,C3清洗包装容器’
          tempArr = data.facilitiesType.split(",");
          [facilitiesTypeCode, facilitiesType] = tempArr;
          // 设施类型名, 类型
          data.facilitiesType = facilitiesType;
          data.facilitiesTypeCode = facilitiesTypeCode;

          this.tempForm = data;
          this.showModal = true;
        }
        
      });
    },
  },
  created() {
    this.$api.mbQueryApi.managementTable6(this.declareId).then((res) => {
      if (res) {
        this.formList = res;
      }
    });
  },
};
</script>

<style lang="less">
.mp-form6-wrapper {
  padding: 20px;
  .header {
    position: relative;
    margin-bottom: 30px;
    .component-title {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .add-item {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .content {
    width: 80%;
    margin: 0 auto 30px;
  }
  .component-footer {
    text-align: center;
    .save-btn {
      margin-right: 15px;
    }
  }
  .icon-btn {
    font-size: 16px;
    // color: #2d8cf0;
    cursor: pointer;
  }
  .text-btn {
    cursor: pointer;
    color: #2d8cf0;
  }
  .tip {
    color: #999;
    font-size: 13px;
    margin-top: 5px;
  }
}
// Modal表单部分
.modal-box-form6 {
  width: 80%;
  .ivu-modal {
    min-width: 920px;
  }
  .ivu-modal-body {
    display: flex;
    justify-content: center;
  }
  .form-table {
    .ivu-form-item {
      margin-bottom: 0;
    }
    .title {
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 12px;
      margin-top: 8px;
    }
    td,
    th {
      border: 1px solid;
      padding: 10px;
      vertical-align: middle;
      font-size: 14px;
      &.vertical-align {
        width: 1.5em;
      }
      .form-label {
        display: inline-block;
        padding: 10px 0;
        line-height: 1em;
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
  }
}
</style>