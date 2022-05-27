<template>
  <el-card class="main-container">
    <template slot="header">
      <div class="companyListQuery">
        <h3 class="top-titles">企业列表</h3>
        <el-form
          :inline="true"
          :model="formInline"
          label-width="90px"
          style="margin-top: 20px"
        >
          <el-form-item label="企业名称">
            <el-input
              v-model="formInline.user"
              placeholder="企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业类型">
            <el-select
              v-model="formInline.region"
              placeholder="请选择企业类型"
              clearable
            >
              <el-option label="产废企业" value="产废企业"></el-option>
              <el-option label="接收企业" value="接收企业"></el-option>
              <el-option label="运输企业" value="运输企业"></el-option>
              <el-option
                label="一般工业固废产废企业"
                value="一般工业固废产废企业"
              ></el-option>
              <el-option
                label="医疗废物产废企业"
                value="医疗废物产废企业"
              ></el-option>
              <el-option
                label="危废豁免经营企业"
                value="危废豁免经营企业"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="search-item" label="企业性质">
            <!--        <el-cascader :props="hyProps" @change="hyChecked" ref="cascaderHandle" v-model="hy_">-->
            <!--        </el-cascader>-->
            <el-select v-model="smallClassCode" clearable
                       @change="getJlpIndustryExtendList"
            >
              <el-option
                v-for="(item, index) in jlpIndustry"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="search-item" label="性质细分">
            <el-select v-model="jlpIndustryExtend" clearable>
              <el-option
                  v-for="(item, index) in jlpIndustryExtendList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="search-item" label="所属镇街">
            <el-select
              v-model="formInline.townStreetId"
              clearable
              placeholder="请选择镇街"
            >
              <el-option
                v-for="item in zStreetList"
                :key="item.id"
                :label="item.streetName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业状态">
            <el-select
                v-model="formInline.enterpriseDisable"
                placeholder="请选择企业状态"
                clearable
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="已关停" value="1"></el-option>
              <el-option label="未关停" value="0"></el-option>
            </el-select>
          </el-form-item>
          <div style="display: inline-block">
            <el-button
              type="primary"
              @click="onSubmit"
              style="margin-left: 30px"
              >查询</el-button
            >
            <el-button
              type="primary"
              style="margin-left: 15px"
              @click="exportBtn()"
              >导出数据</el-button
            >
          </div>
        </el-form>
      </div>
    </template>
    <el-table :data="enterpriseList" style="width: 100%">
      <el-table-column type="index" width="120" label="序号"></el-table-column>
      <el-table-column prop="name" label="企业名称">
      </el-table-column>
      <el-table-column prop="townStreetName" label="所属镇街">
      </el-table-column>
      <el-table-column label="企业类型" min-width="140">
        <template slot-scope="scope">
          <el-tooltip
              class="text-tooltip"
              effect="dark"
              :content="scope.row.type"
              placement="top-start"
            >
              <span>{{ scope.row.text }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="jlpIndustry" label="企业性质" >
        </el-table-column>
        <el-table-column prop="jlpIndustryExtend" label="性质细分" >
        </el-table-column>
        <el-table-column prop="enterpriseDisable" label="企业状态" >
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.row)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          layout="total,prev,pager,next,jumper"
          :current-page.sync="pageInfo.curPage"
          @current-change="handleCurrentChange"
          :total="pageInfo.total"
          class="pagination"
        ></el-pagination>
      </div>
    </el-card>
</template>

<script>
import {conds, exportBlobFile} from "@/utils/tools";

export default {
  name: "EnterpriseList",
  data() {
    return {
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      enterpriseList: [],
      formInline: {
        user: "",
        region: "",
        townStreetId: "", //选中镇街
        enterpriseDisable: "", //企业状态
      },
      conditoions: "",
      zStreetList: [], //所有镇街
      jlpIndustry: [], //用户定义行业
      entTypeSub: [], //性质细分
      jlpIndustryExtend: '', //性质细分
      jlpIndustryExtendList: [], //性质细分
      smallClassCode: "", //行业
      hyProps: {},
      hy_: [], //选择行业
      re_hy: [], //保存的行业数组，用于比较当前选择的行业值
    };
  },
  methods: {
    onSubmit() {
      this.pageInfo.curPage = 1;
      this.initPage();
    },
    initPage() {
      let self = this;
      // if(this.$refs.cascaderHandle && this.$refs.cascaderHandle._data.checkedNodes.length){
      //   self.smallClassCode = this.$refs.cascaderHandle._data.checkedNodes[0].path.join(',')
      // }else {
      //   self.smallClassCode = ''
      // }
      this.conditoions = conds.asConditionString(
          JSON.stringify(
              conds.and([
                conds.like("name", this.formInline.user),
                conds.like("type", this.formInline.region),
                conds.eq("townStreetId", this.formInline.townStreetId + ""),
                conds.eq("jlpIndustry", this.smallClassCode),
                conds.eq("jlpIndustryExtend", this.jlpIndustryExtend),
                conds.eq("enterpriseDisable", this.formInline.enterpriseDisable),
              ])
          )
      );
      self.$api.enterpriseApi
        .getEnterpriseList({
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          condition: self.conditoions,
        })
        .then((resp) => {
          self.enterpriseList = resp.content.map(function (item) {
            if (item.type.length > 20) {
              item.text = item.type.slice(0, 20) + "......";
            } else {
              item.text = item.type;
            }
            return item;
          });
          self.pageInfo.total = resp.totalElements;
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    detailRow(row) {
      this.$router.push({
        path: "/enterprise/enterpriseDetail",
        query: { id: row.id, townStreetName: row.townStreetName },
      });
    },
    getTrsAreaList() {
      this.$api.dictionariesApi.getTrsAreaList().then((res) => {
        this.zStreetList = res;
      });
    },
    hyChecked(node) {
      var self = this;
      let list = [];
      list = node.filter((item) => {
        return self.re_hy.indexOf(item) === -1;
      });
      self.hy_ = list;
      self.re_hy = list;
      // this.$refs.cascaderHandle.dropDownVisible = false;
    },
    initHy() {
      var self = this;
      self.hyProps = {
        lazy: true,
        checkStrictly: true,
        multiple: true,
        emitPath: false,
        lazyLoad(node, resolve) {
          const { value } = node;
          self.$api.dictionariesApi
            .getHyNode({
              parentId: value,
            })
            .then((res) => {
              var nodes = res.map(function (item) {
                return {
                  value: item.id,
                  label: item.name,
                  leaf: item.level > 3,
                };
              });
              resolve(nodes);
            });
        },
      };
    },
    exportBtn() {
      let self = this;
      this.conditoions = conds.asConditionString(
        JSON.stringify(
          conds.and([
            conds.like("name", this.formInline.user),
            conds.like("type", this.formInline.region),
            conds.eq("townStreetId", this.formInline.townStreetId + ""),
            conds.eq("jlpIndustry", this.smallClassCode),
          ])
        )
      );
      exportBlobFile({
        url: "/enterprise/base/download",
        method: "get",
        filename: `企业信息.xls`,
        type: "postConditionData",
        params: {
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          condition: self.conditoions,
        },
      })
        .then()
        .catch((err) => {
          console.log("最外层导出函数出错", err);
        });
    },
    getJlpIndustryExtendList(value){
      if(!value) return;
      let self = this;
      let item = self.jlpIndustry.find((i)=>i.name === value);
      self.jlpIndustryExtend = '';
      this.$api.enterpriseApi.queryPatyDictionary(item.code).then((resp) => {
            self.jlpIndustryExtendList = resp;
          });
    },
    getJlpIndustry(){
      let self = this;
      let jlpIndustry = self.$route.query.jlpIndustry; //路由带参-企业性质
      let jlpIndustryExtendCode = self.$route.query.jlpIndustryExtendCode; //路由带参-性质细分
      return this.$api.enterpriseApi.queryPatyDictionary('JLP_ENTERPRISE_INDUSTRY').then((resp) => {
        self.jlpIndustry = resp;
        if(!jlpIndustryExtendCode) return;
        self.getJlpIndustryExtendList(jlpIndustry);
      });
    }
  },
  beforeRouteEnter(to, from, next){
    to.meta.keepAlive = false;
    next()
  },
  async created () {
    await this.getJlpIndustry();
    this.smallClassCode = this.$route.query.jlpIndustry; //路由带参-企业性质
    this.jlpIndustryExtend = this.$route.query.jlpIndustryExtend; //路由带参-性质细分

    this.initHy();
    this.getTrsAreaList();
    this.initPage();
  },
};
</script>

<style scoped lang="less">
.main-container {
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
  .text-tooltip {
    cursor: pointer;
  }
  /deep/ .el-table  {
  font-size:14px ;
}
}

</style>
<style lang="less">
.companyListQuery {
  .el-form-item__content {
    width: 182px;
  }
  form >div:last-child{
    display: inline-block;
    vertical-align: top;
  }
}
</style>
