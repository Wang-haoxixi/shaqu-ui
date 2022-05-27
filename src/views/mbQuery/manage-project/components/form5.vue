<template>
  <div class="mj-form5-wrapper">
    <h3 class="component-title">表5 危险废物转移情况</h3>
    <Form ref="form5" :model="form">
      <table class="form-table">
        <thead></thead>
        <!-- 贮存措施 -->
        <tbody>
          <tr class="form-item-inline">
            <th :rowspan="totalRows" class="vertical-align">贮存措施</th>
            <td colspan="9">
              <p>
                <span class="form-label"
                  >1、贮存场所是否符合《危险废物贮存污染控制标准》有关要求：</span
                >
                <span>{{ form.storagePlace }}</span>
              </p>
              <p>
                <span class="form-label"
                  >2、是否按危险废物特性分类收集、贮存：</span
                >
                <span>{{ form.classifyWaste }}</span>
              </p>
              <p>
                <span class="form-label"
                  >3、是否混合贮存未经安全性处置且性质不相容的危险废物：</span
                >
                <span>{{ form.differenceWaste }}</span>
              </p>
              <p>
                <span class="form-label"
                  >4、是否将危险废物混入非危险废物中贮存：</span
                >
                <span>{{ form.storageWaste }}</span>
              </p>
              <p>
                <span class="form-label"
                  >5、是否通过建设项目环境影响评价审批及竣工环境保护验收：</span
                >
                <span>{{ form.environmentCheck }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <th colspan="9">危险废物贮存设施现状</th>
          </tr>
          <tr class="align-center">
            <th colspan="5">设施名称</th>
            <th>数量</th>
            <th>类型</th>
            <th>面积/体积</th>
            <th class="single-textarea">贮存能力</th>
          </tr>
          <tr v-for="(item, index) in form.storageFacilitiesJson" :key="index">
            <td colspan="5">
              <span>{{ item.name }}</span>
            </td>
            <td>
              <span>{{ item.num }}</span>
            </td>
            <td>
              <span>{{ item.type }}</span>
            </td>
            <td>
              <span>{{ item.area }}</span>
            </td>
            <td>
              <span>{{ item.ability }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="9">贮存危险废物情况</th>
          </tr>
          <tr class="align-center">
            <th>危废代码</th>
            <th>名称</th>
            <th>俗称</th>
            <th>类别</th>
            <th>贮存设施设备</th>
            <th>拟贮存量（吨）</th>
            <th>上年度贮存量（吨）</th>
            <th>截至上年度年底累计贮存量（吨）</th>
            <th class="single-textarea">贮存原因</th>
          </tr>
          <tr v-for="(item, index) in form.storageSituationJson" :key="index">
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
              <span>{{ item.wasteType }}</span>
            </td>
            <td>
              <span>{{ item.facilityName }}</span>
            </td>
            <td>
              <span>{{ item.simulateCount }}</span>
            </td>
            <td>
              <span>{{ item.lastYearCount }}</span>
            </td>
            <td>
              <span>{{ item.lastYearAddCount }}</span>
            </td>
            <td>
              <span>{{ item.reason }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="9">
              <div class="title">贮存过程中采取的污染防治和事故预防措施：</div>
              <span>{{ form.storageDealMethod }}</span>
            </td>
          </tr>
        </tbody>
        <!-- 运输措施 -->
        <tbody>
          <tr class="form-item-inline">
            <th rowspan="2" class="vertical-align">运输措施</th>
            <td colspan="9">
              <p>
                <span class="form-label"
                  >1、运输过程中是否遵守危险货物运输管理的规定：</span
                >
                <span>{{ form.complianceTrans }}</span>
              </p>
              <p>
                <span class="form-label">2、是否按危险废物特性分类运输：</span>
                <span>{{ form.transWaste }}</span>
              </p>
              <p>
                <span class="form-label">3、是否委托运输：</span>
                <span>{{ form.otherWaste }}</span>
              </p>
              <p>
                <span class="form-label"
                  >4、{{ isDetail ? "运输企业" : "是否系统内注册企业" }}：</span
                >
                <Row
                  v-for="(ele, i) in form.enterpriseArr"
                  :key="i"
                  class="translist"
                >
                  <Col span="8" class="trans-name">
                    <span>{{ ele.enterprise }}</span>
                  </Col>
                  <Col span="8" class="trans-num">
                    <span>{{ ele.transNumber }}</span>
                  </Col>
                  <Col span="1"> </Col>
                </Row>
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="9">
              <div class="title">
                运输过程中采取的污染防治措施（如自行运输危险废物的，还应包括工具种类、载重量、使用年限等）：
              </div>
              <span class="textarea">{{ form.transDealMethod }}</span>
            </td>
          </tr>
        </tbody>
        <!-- 转移计划 -->
        <tbody>
          <tr>
            <th class="vertical-align">转移计划</th>
            <td colspan="9">
              <div class="title">
                包括拟转移危险废物种类、数量，拟接收危险废物的单位等：
              </div>
              <span>{{ form.transPlan }}</span>
            </td>
          </tr>
        </tbody>
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
    enterpriseId: {
      type: Number,
    },
  },
  data() {
    return {
      id: null,
      returnFlag: true,
      initForm: {
        useSystemEnt: true,
        storageFacilitiesJson: [{ name: "", num: 1 }],
        storageSituationJson: [
          { simulateCount: 0, lastYearCount: 0, lastYearAddCount: 0 },
        ],
        enterList: [],
        transNumList: [],
        enterpriseArr: [{ useSystemEnt: true }],
      },
      form: {
        // 新增时渲染
        useSystemEnt: true,
        storageFacilitiesJson: [{ name: "", num: 1 }],
        storageSituationJson: [
          { simulateCount: 0, lastYearCount: 0, lastYearAddCount: 0 },
        ],
        enterList: [],
        transNumList: [],
        enterpriseArr: [{ useSystemEnt: true }],
      },
      formConditionMap: {
        initWasteCodeList: [],
        wasteCodeLists: [],
        initFacNameList: [],
        initTransNameList: [],
        transNameLists: [[]],
        licenceLists: [[]],
      },
      isEdit: false,
    };
  },
  computed: {
    totalRows() {
      let { storageFacilitiesJson, storageSituationJson } = this.form;
      return storageFacilitiesJson.length + storageSituationJson.length + 8;
    },
  },
  methods: {
    getDetail() {
      this.$api.mbQueryApi.managementTable5(this.declareId).then((res) => {
        if (res) {
          let data, temp;
          data = res;
          this.id = data.id;
          // 把相应数值类string，Number化
          data.storageFacilitiesJson.forEach((ele) => {
            ele.num = Number(ele.num);
          });
          data.storageSituationJson.forEach((ele, index) => {
            ele.simulateCount = Number(ele.simulateCount);
            ele.lastYearCount = Number(ele.lastYearCount);
            ele.lastYearAddCount = Number(ele.lastYearAddCount);
            if (ele.wasteSc) {
              ele.wasteCodeSc = ele.wasteCode + "," + ele.wasteSc;
            } else if (!this.isDetail) {
              // 兼容(编辑状态下)已录入，但没有俗称的管理计划
              const wasteList = this.formConditionMap.initWasteCodeList;
              const waste = wasteList.find((item2) => {
                return item2.wasteCode === ele.wasteCode;
              });
              if (waste) {
                ele.wasteSc = waste.wasteSc;
              } else {
                ele.isInputSc = true;
              }
              ele.wasteCodeSc = ele.wasteCode + "," + ele.wasteSc;
            }
          });

          // enterprise解JSON string化
          temp = data.enterprise.replace(/\\"/g, '"');
          data.enterpriseArr = JSON.parse(temp);

          this.form = data;
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

<style lang="less" scoped>
.mj-form5-wrapper {
  padding: 12px 24px;
  overflow-y: auto;
  .component-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .form-table {
    margin: 0 auto 30px;
    tr.form-item-inline {
      .trans-name {
        padding-left: 11px;
      }
      .trans-num {
        margin-left: 10px;
      }
    }
    tr.align-center {
      td,
      th {
        text-align: center;
      }
    }
    td,
    th {
      border: 1px solid;
      padding: 10px;
      vertical-align: middle;
      text-align: left;
      &.vertical-align {
        width: 1.5em;
      }
      .form-label {
        display: inline-block;
        padding: 10px 0;
        line-height: 1em;
      }
      .translist {
        margin-bottom: 12px;
      }
      .textarea {
        display: block;
        min-height: 3.5em;
        text-align: left;
      }
    }
    .single-textarea {
      min-width: 120px;
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
    .add-trans-btn {
      color: #888;
      cursor: pointer;
      font-size: 16px;
      margin-left: 10px;
      margin-top: 4px;
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

<style lang="less">
.mj-form5-wrapper {
  .ivu-form-item {
    margin-bottom: 0;
  }
  .ivu-select {
    text-align: left;
  }
  .ivu-select-dropdown-list {
    max-width: 300px;
  }

  .form-table {
    .ivu-form-item {
      margin-bottom: 0;
    }
    tr.form-item-inline {
      .ivu-form-item {
        display: inline-block;
        &.block-item {
          display: block;
        }
      }
      .ivu-radio-group {
        font-size: 14px;
        margin-top: -4px;
      }
    }
  }
}
</style>