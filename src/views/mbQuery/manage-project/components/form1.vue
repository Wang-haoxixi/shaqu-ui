<template>
  <div class="mp-form1-wrapper">
    <h3 class="component-title">表1 企业基本信息</h3>
    <p class="tip" v-if="showTip">
      提示：“行业类别与代码”格式不对或缺失，请到“信息变更”处重新选择！
    </p>
    <Form ref="form1" :model="form">
      <table class="form-table">
        <tbody>
          <tr>
            <th colspan="2">单位名称</th>
            <td colspan="5">
              <span>{{ form.enterpriseName }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">单位注册地址</th>
            <td colspan="3">
              <span>{{ form.address }}</span>
            </td>
            <th>邮编</th>
            <td>
              <span>{{ form.postCode }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">生产设施地址</th>
            <td colspan="5">
              <span>{{ form.proAddress }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">法定代表人</th>
            <td colspan="2">
              <span>{{ form.legal }}</span>
            </td>
            <th>行业类别与代码</th>
            <td colspan="2" class="category-name">
              <span>{{ form.categoryName }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">总投资（万元）</th>
            <td colspan="2">
              <span>{{ form.investment }}</span>
            </td>
            <th>总产值（万元）</th>
            <td colspan="2">
              <span>{{ form.outputValue }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">占地面积(m<sup>2</sup>)</th>
            <td colspan="2">
              <span>{{ form.floorSpace }}</span>
            </td>
            <th>职工人数</th>
            <td colspan="2">
              <span>{{ form.workersNumber }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">环保部门负责人</th>
            <td colspan="2">
              <span>{{ form.departmentHeads }}</span>
            </td>
            <th>联系人</th>
            <td colspan="2">
              <span>{{ form.linkMan }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">联系电话</th>
            <td colspan="2">
              <span>{{ form.linkPhone }}</span>
            </td>
            <th>传真电话</th>
            <td colspan="2">
              <span>{{ form.faxNum }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">电子信箱</th>
            <td colspan="5">
              <span>{{ form.email }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">单位网址</th>
            <td colspan="5">
              <span>{{ form.website }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">该年度危险废物产量是否为零</th>
            <td colspan="5" style="text-align: left">
              <span>{{ form.zeroWaste ? "是" : "否" }}</span>
            </td>
          </tr>
          <tr>
            <th
              :rowspan="form.technologyManager.length + 2"
              class="vertical-align"
            >
              管理部门及人员
            </th>
            <th>管理部门</th>
            <th>部门负责人</th>
            <th>废物管理负责人</th>
            <th colspan="3">废物污染防治设施技术负责人及文化程度</th>
          </tr>
          <tr>
            <td :rowspan="form.technologyManager.length + 1">
              <span>{{ form.administrationSection }}</span>
            </td>
            <td :rowspan="form.technologyManager.length + 1">
              <span>{{ form.departmentManager }}</span>
            </td>
            <td :rowspan="form.technologyManager.length + 1">
              <span>{{ form.wasteManager }}</span>
            </td>
            <th>负责人</th>
            <th colspan="2">文化程度</th>
          </tr>
          <tr
            v-for="(item, index) in form.technologyManager"
            :key="index"
            class="addable-item"
          >
            <td>
              <span>{{ item.name }}</span>
            </td>
            <td colspan="2">
              <span>{{ item.doe }}</span>
            </td>
          </tr>
          <tr>
            <th rowspan="2" class="vertical-align">规章制度</th>
            <th class="tb15">管理制度</th>
            <th class="tb16">岗位责任制度</th>
            <th class="tb16">安全操作规范</th>
            <th class="tb20">管理台账</th>
            <th class="tb15">培训制度</th>
            <th class="tb15">意外事故防范措施和应急预案</th>
          </tr>
          <tr style="height: 60px">
            <td>
              <span>{{ form.regulatoryRegime }}</span>
            </td>
            <td>
              <span>{{ form.resbonsibilityRegime }}</span>
            </td>
            <td>
              <span>{{ form.operationProcedures }}</span>
            </td>
            <td>
              <span>{{ form.standingBook }}</span>
            </td>
            <td>
              <span>{{ form.trainingSystem }}</span>
            </td>
            <td>
              <span>{{ form.preventiveMeasures }}</span>
            </td>
          </tr>
          <tr>
            <th colspan="2">管理组织附件</th>
            <td colspan="5">
              <div class="attachment-link">
                <a :href="imgUrl">{{ fileName }}</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  </div>
</template>

<script>
// import { queryCurrentEnterprise,
//          manageEnterpriseDetail,
//          manageEnterpriseAdd,
//          manageEnterpriseUpdate,
//          manageEnterpriseDelete } from '@/libs/api';
// const uploadUrl = process.env.UPLOAD_FILE_URL;
// const downloadUrl = process.env.DOWNLOAD_FILE_URL;

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
        enterpriseName: "",
        address: "",
        postCode: "",
        legal: "",
        categoryName: "",
        linkMan: "",
        linkPhone: "",
        technologyManager: [{}],
      },
      form: {
        address: "",
        postCode: "",
        legal: "",
        categoryName: "",
        linkMan: "",
        linkPhone: "",
        technologyManager: [{}],
      },
      // 上传附件
      // uploadUrl: uploadUrl,
      defaultList: [],
      fileList: [], // 当前文件列表
      // 附件地址（详情）
      imgUrl: "",
      fileName: "",
      isEdit: false,
      showTip: false,
    };
  },
  computed: {

  },
  methods: {
    // 表单详情
    getDetail() {
      let declareId = this.declareId;
      this.$api.mbQueryApi
        .managementTable1(declareId)
        .then((res) => {
          this.form = res;
          // 初始化form.technologyManager字段
          let technologyManager = res.technologyManager;
          if (typeof technologyManager === "string" && technologyManager) {
            // 处理JSON字符串格式的technologyManager
            let temp = technologyManager.replace(/\\"/g, '"');
            this.form.technologyManager = JSON.parse(temp);
          } else {
            this.form.technologyManager = [{}];
          }
        })
        .catch((err) => {
          console.log("form1", err);
        });
    },
  },
  created() {
    // 表单详情
    this.getDetail();
  },
};
</script>

<style lang="less">
.mp-form1-wrapper {
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
  .tip {
    color: #f04c1a;
    padding-bottom: 10px;
    margin-top: -10px;
  }
  .form-table {
    margin: 0 auto 30px;
    .ivu-form-item {
      margin-bottom: 0;
    }
    td,
    th {
      border: 1px solid;
      padding: 10px;
      vertical-align: middle;
      text-align: center;
      &.vertical-align {
        width: 1.5em;
      }
      &.category-name {
        width: 315px;
      }
    }
    td {
      color: #515a6e;
    }
    .attachment-link {
      a {
        color: #2d8cf0;
        text-decoration: underline;
      }
    }
    .addable-item {
      .add-btn {
        margin-left: 10px;
        margin-top: 10px;
        font-size: 18px;
        color: #888;
        cursor: pointer;
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