<template>
    <el-card  class="main-container">
      <template slot="header">
        <h3 class="top-titles" >电子联单统计</h3>
      <el-form ref="formValidate" :model="formValidate" class="form" label-width="90"  :inline="true">
        <div class="serchList">
          <div class="serchListLeft">
            <div>查询数据项 :</div>
          </div>
          <div class="serchListRight">
            <div>
              <a class="condition" v-if="!allWayShow" @click="allWayShowBtn"
                >展开所有>></a
              >
            </div>
            <div>
              <a class="condition" v-if="allWayShow" @click="allWayShowBtn"
                >&lt;&lt;收起查询条件</a
              >
            </div>
          </div>
        </div>
        <div class="serchList">
          <div class="serchListRightItem">
            <el-form-item label="" prop="duplicateTypeList" v-if="allWayShow">
              <el-checkbox-group v-model="formValidate.duplicateTypeList">
                <el-checkbox
                  v-for="item in showWayList"
                  :label="item.key"
                  :key="item.key"
                  :disabled="isOptional(item)"
                  >{{ item.value }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <div class="serchList">
          <div class="serchListLeft"><div>查询条件 :</div></div>
          <div class="serchListRight">
            <div>
              <a class="condition" v-if="!allShow" @click="allShowBtn"
                >查看更多查询条件>></a
              >
            </div>
            <div>
              <a class="condition" v-if="allShow" @click="allShowBtn"
                >&lt;&lt;收起查询条件</a
              >
            </div>
          </div>
        </div>
        <div class="serchList">
          <div class="serchListRightItem">
            <el-row :gutter="24" class="search-item-wrapper">
              <el-form-item label="创建日期" prop="" class="date-">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <!--              <el-form-item class="search-item" label="行业类别">-->
              <!--                <el-cascader :props="hyProps" @change="hyChecked" clearable></el-cascader>-->
              <!--              </el-form-item>-->

              <el-form-item class="search-item-long" label="产废单位">
                <el-autocomplete
                    v-model="formValidate.proName"
                    :fetch-suggestions="getEPData"
                    placeholder="请输入产废单位"
                    :trigger-on-focus="false"
                    clearable
                ></el-autocomplete>
              </el-form-item>
              <el-form-item class="search-item" label="企业性质">
                <el-select v-model="formValidate.jlpIndustry" clearable>
                  <el-option
                    v-for="(item, index) in jlpIndustry"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="search-item" label="危废大类">
                <el-select
                  v-model="formValidate.typeCode"
                  clearable
                  placeholder="请选择废物大类"
                  @change="changeTypeCode"
                >
                  <el-option
                    v-for="item in wasteList"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row :gutter="24" class="search-item-wrapper" v-if="allShow">
              <el-form-item class="search-item" label="联单编号">
                <el-input
                  class="search-input"
                  v-model="formValidate.duplicateCode"
                  placeholder="联单编号"
                ></el-input>
              </el-form-item>
              <el-form-item class="search-item" label="危废代码">
                <el-select
                  v-model="formValidate.wasteCode"
                  clearable
                  filterable
                  placeholder="请输入废物代码"
                >
                  <el-option
                    v-for="item in wasteCodeListById"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="search-item-long" label="运输单位">
                <el-autocomplete
                    v-model="formValidate.transName"
                    :fetch-suggestions="getEPData"
                    placeholder="请输入运输单位"
                    :trigger-on-focus="false"
                    clearable
                ></el-autocomplete>
              </el-form-item>
              <el-form-item class="search-item-long" label="经营单位">
                <el-autocomplete
                    v-model="formValidate.dealName"
                    :fetch-suggestions="getEPData"
                    placeholder="请输入经营单位"
                    :trigger-on-focus="false"
                    clearable
                ></el-autocomplete>
              </el-form-item>
              <el-form-item class="search-item" label="移出区域">
                <el-select
                  v-model="formValidate.outStreet"
                  clearable
                  placeholder="请选择移出区域"
                >
                  <el-option
                    v-for="item in outAreaList"
                    :key="item.id"
                    :label="item.streetName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="search-item" label="移入区域">
                <el-select
                  v-model="formValidate.inStreet"
                  clearable
                  placeholder="请选择移入区域"
                >
                  <el-option
                    v-for="item in inAreaList"
                    :key="item.id"
                    :label="item.streetName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="searchBtn()">查询</el-button>
          <el-button type="primary" @click="resetSearchBtn()"
            >重置查询</el-button
          >
          <el-button type="primary" @click="exportBtn()">数据导出</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div
      class="table-box"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <div class="sum">
        转移量总计:<span
          ><i>{{ wasteCountTonTotal }}</i
          >吨</span
        ><span
          ><i>{{ wasteCountBucketTotal }}</i
          >桶</span
        >
      </div>
      <el-table :data="jointOrderList">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column
          prop="duplicateCode"
          label="联单编号"
        ></el-table-column>
        <el-table-column
          prop="duplicateTypeValue"
          label="联单种类"
        ></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <!--          <el-table-column prop="duplicateState" label="联单状态"></el-table-column>-->
        <el-table-column prop="proName" label="产废单位"></el-table-column>
        <el-table-column
          prop="proJlpIndustry"
          label="产废企业性质"
        ></el-table-column>
        <el-table-column prop="transName" label="运输单位"></el-table-column>
        <el-table-column prop="dealName" label="经营单位"></el-table-column>
        <el-table-column
          prop="dealJlpIndustry"
          label="经营企业性质"
        ></el-table-column>
        <el-table-column prop="outStreet" label="移出区域"></el-table-column>
        <el-table-column label="移入区域">
          <template slot-scope="scope">
            {{ scope.row.inStreet || scope.row.inArea }}
          </template>
        </el-table-column>
        <el-table-column label="废物大类">
          <template slot-scope="scope">
            {{ scope.row.wasteList[0].typeCode }}
          </template>
        </el-table-column>
        <el-table-column label="废物代码">
          <template slot-scope="scope">
            {{ scope.row.wasteList[0].wasteCode }}
          </template>
        </el-table-column>
        <el-table-column label="转移量（千克）">
          <template slot-scope="scope">
            {{ scope.row.wasteList[0].wasteCountKg }}
          </template>
        </el-table-column>
        <el-table-column label="转移量（桶）">
          <template slot-scope="scope">
            {{ scope.row.wasteList[0].wasteCountBucket || 0 }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total,prev,pager,next,jumper"
        :current-page.sync="pageInfo.curPage"
        @current-change="handleCurrentChange"
        :total="pageInfo.total"
        style="padding-top: 10px; margin-left: 36%"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import {conds, formatDate, exportBlobFile } from "@/utils/tools";
import { entType } from "@/utils/statisticObj";
export default {
  name: "StatisticsJointOrder",
  data() {
    return {
      formValidate: {
        duplicateTypeList: ["A0", "A1", "A4", "A5"],
        jlpIndustry: "", //搜索条件-九龙坡自定义行业类别
      },
      date: "", //搜索条件-创建时间
      proCategory: "", //搜索条件-行业类别
      allShow: false,
      allWayShow: true,
      showWayList: [],
      wasteList: [],
      outAreaList: [],
      inAreaList: [],
      wasteCodeListById: [],
      hyProps: {},
      jointOrderList: [],
      wasteCountTonTotal: 0,
      wasteCountBucketTotal: 0,
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      isGyAndWs: false, //查询条件是否是一般工业固废和污水
      wasteCodeId: "",
      loading: false,
      jlpIndustry: entType, //用户定义行业
      epData:[]
    };
  },
  created() {
    let year = String(new Date().getFullYear());
    this.date = [new Date(year),new Date()]
    this.initSearchItem();
    this.loadData();
  },
  methods: {
    loadData() {
      var self = this;
      self.loading = true;
      self.$api.statisticsApi
        .getJointOrderList({
          query: {
            page: self.pageInfo.curPage - 1,
            size: self.pageInfo.size,
          },
          data: {
            ...this.formValidate,
            proCategory: this.proCategory,
            startDate: this.date ? formatDate(this.date[0]) : "",
            endDate: this.date ? formatDate(this.date[1]) : "",
          },
        })
        .then((resp) => {
          self.jointOrderList = resp.list.content;
          self.pageInfo.total = resp.list.totalElements;
          self.wasteCountBucketTotal = resp.wasteCountBucketTotal;
          self.wasteCountTonTotal = resp.wasteCountTonTotal;
          self.loading = false;
        })
        .catch((err) => {
          self.$message.error(err.msg);
          self.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.loadData();
    },
    searchBtn() {
      this.pageInfo.curPage = 1;
      this.loadData();
    },
    exportBtn() {
      exportBlobFile({
        url: "/statistics/jointOrder/export",
        method: "post",
        filename: `电子联单统计表.xls`,
        params: {
          ...this.formValidate,
          proCategory: this.proCategory,
          startDate: this.date ? formatDate(this.date[0]) : "",
          endDate: this.date ? formatDate(this.date[1]) : "",
        },
      })
        .then()
        .catch((err) => {
          console.log("最外层导出函数出错", err);
        });
    },
    changeTypeCode(e) {
      if (this.formValidate.wasteCode) {
        this.formValidate.wasteCode = null;
      }
      let obj_ = "";
      if (e) {
        for (let item of this.wasteList) {
          if (item.code === e) {
            obj_ = item.id;
            return;
          }
        }
      }
      //改变危废大类
      this.$api.dictionariesApi
        .getWaste2({
          wasteTypeId: obj_,
        })
        .then((res) => {
          this.wasteCodeListById = res;
          // this.formValidate.wasteCode = null;
        })
        .catch(() => {});
    },
    getTrsAreaList() {
      this.$api.dictionariesApi.getTrsAreaList().then((res) => {
        this.inAreaList=res;
        this.outAreaList=res;
        this.outAreaList.unshift({ id: 0, streetName: "全区" });
        this.formValidate.outStreet = 0
        // this.inAreaList.unshift({ id: 0, streetName: "全区" });

      });
    },
    hyChecked(node) {
      this.proCategory = node.join(",");
    },
    //联单类型是否不可选
    isOptional(value) {
      if (this.formValidate.duplicateTypeList.length) {
        return (
          JSON.stringify(this.formValidate.duplicateTypeList).indexOf(
            value.key.slice(0, 1)
          ) === -1
        );
      } else {
        return false;
      }
    },
    //获取查询方式
    getSearchWay() {
      var self = this;
      this.$api.statisticsApi
        .getSearchWay()
        .then((res) => {
          self.showWayList = res;
        })
        .catch((err) => this.$message.error(err.msg));
    },
    //获取危废列表
    getWasteList() {
      var self = this;
      self.$api.dictionariesApi
        .getWasteList()
        .then((res) => {
          self.wasteList = res;
        })
        .catch((err) => this.$message.error(err.msg));
    },
    //展开所有查询条件
    allShowBtn() {
      this.allShow = !this.allShow;
    },
    //展开所有查询方式
    allWayShowBtn() {
      this.allWayShow = !this.allWayShow;
    },
    resetSearchBtn() {
      this.date = "";
      this.formValidate = {
        duplicateTypeList: [],
      };
      this.proCategory = "";
    },
    initSearchItem() {
      this.getSearchWay();
      this.getWasteList();
      this.getTrsAreaList();
      this.changeTypeCode();
      var self = this;
      self.hyProps = {
        lazy: true,
        lazyLoad(node, resolve) {
          const { value } = node;
          self.$api.dictionariesApi
            .getHyNode({
              parentId: value,
            })
            .then((res) => {
              const nodes = res.map(function (item) {
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
    //获取产废单位
    getEPData(value,cb){
      let conditoions = conds.asConditionString(
          JSON.stringify(
              conds.and([
                conds.like("name", value),
              ])
          )
      );
      console.log("conditoions：", conditoions)

      this.$api.dictionariesApi.getEnterprise({
        page: 0,
        size: 10,
        condition: conditoions,
      }).then((res) => {
        this.epData = res.content.map((item)=>{
          item.value = item.name; // 添加value属性
          return item;
        })
        cb(this.epData) // 返回出模糊搜索结果
      });
    }
  },
};
</script>

<style lang='less' scoped>
.main-container {
  /deep/ .el-table {
    font-size: 14px;
  }
  height: calc(100vh - 105px);
  overflow-y: auto;
  .title {
    font-family: "yahei";
    font-weight: 700;
    border-left: 4px solid #2d8cf0;
    padding-left: 7px;
    line-height: 15px;
    margin-bottom: 20px;
    text-align: left;
  }
  .serchList {
    display: flex;
    font-size: 15px;

    .serchListLeft {
      text-align: left;
      padding-right: 10px;
      box-sizing: border-box;
    }

    .submit {
      margin-right: 15px;
    }

    .condition {
      color: #9da0a0;
      font-size: 12px;
      cursor: pointer;
    }

    .condition:hover {
      color: #188af2;
      font-size: 12px;
    }
    .serchListRightItem {
      padding-left: 20px;
      margin-top: 15px;
      .search-item-wrapper {
        display: flex;
        flex-wrap: wrap;
        .search-item {
          margin-right: 20px;
          .search-input {
            width: 220px;
          }
        }
        .search-item-long {
          margin-right: 20px;
          .el-autocomplete {
            width: 280px;
          }
        }
      }
    }
  }
  .table-box {
    .sum {
      padding: 12px 4px;

      span {
        margin-left: 20px;

        i {
          color: #2d8cf0;
          font-style: normal;
          font-weight: 600;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
