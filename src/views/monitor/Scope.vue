<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">预警范围设置</h3>
      <el-form
        :inline="true"
        :model="formInline"
        label-width="130px"
        label-position="right"
      >
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
          <!-- <el-cascader :props="hyProps" @change="hyChecked" ref="cascaderHandle" v-model="hy_">
        </el-cascader> -->
          <el-select v-model="smallClassCode" clearable>
            <el-option
              v-for="(item, index) in jlpIndustry"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.user" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item class="search-item" label="镇街">
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
<!--        <el-form-item label="是否已纳入预警">-->
<!--          <el-select v-model="isMonitoring" clearable>-->
<!--            <el-option label="是" value="1"></el-option>-->
<!--            <el-option label="否" value="0"></el-option>-->
<!--            <el-option label="全部" value=""></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item style="margin-left:82%">
          <el-button type="primary" @click="onSubmit" style="margin-left:30px">查询</el-button>
          <el-button type="primary" @click="scopeShow=true" style="margin-left:30px">重置预警范围</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-tabs v-model="isMonitoring"  type="card" @tab-click="onSubmit">
      <el-tab-pane label="已纳入预警企业" name="1">
      </el-tab-pane>
      <el-tab-pane label="未纳入预警企业" name="0">
      </el-tab-pane>
    </el-tabs>
    <div class="opt-wrapper">
      <el-button v-if="select"  @click="selectPage">选择本页</el-button>
      <el-button v-if="!select" v-bind:plain="currentSelect==='选择本页'" @click="selectPage">取消选择本页</el-button>
      <el-button v-if="selectAll" @click="selectAllPage">全选</el-button>
      <el-button v-if="!selectAll" v-bind:plain="currentSelect==='全选'" @click="selectAllPage">取消全选</el-button>
      <el-button v-if="isMonitoring === '1'"
              type="primary"
              @click="confirmMon"
              style="margin: 15px 0 24px 45px">取消预警
      </el-button>
      <el-button v-if="isMonitoring === '0'"
              type="primary"
              @click="confirmMon"
              style="margin: 15px 0 24px 45px">纳入预警
      </el-button>
    </div>
    <el-table :data="enterpriseList" ref="multipleTable" style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="name" label="企业名称"> </el-table-column>
      <el-table-column prop="townStreetName" label="所属镇街" >
      </el-table-column>
      <el-table-column prop="type" label="企业类型" min-width="160">
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
      <el-table-column prop="jlpIndustry" label="企业性质" > </el-table-column>
      <!-- <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="detailRow(scope.$index)"
              type="text"
              size="small"
            >
              详情
            </el-button>
          </template>
        </el-table-column> -->

      <el-table-column prop="monitoring" label="是否已纳入预警" width="130">
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="pageInfo.curPage"
      :page-size.sync="pageInfo.size"
      @current-change="handleCurrentChange"
      :total="pageInfo.total"
      class="pagination"
    ></el-pagination>
    <el-dialog 
    title="重置预警范围"
      :close-on-click-modal="false"
      :visible.sync="scopeShow"
      width="30%"
      @close="scopeShow = false"
      center>
      产生量初始值:
      <el-input-number v-model="cfCount" :min="0"  ></el-input-number>（吨）
      <p style="padding-top:6px">注：上年度企业产生量大于产生量初始值的企业，加入纳入预警目录。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetScope"
          >确 定</el-button
        >
      </span>
      </el-dialog>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";
import { entType } from "@/utils/statisticObj";
export default {
  name: "EnterpriseList",
  data() {
    return {
      pageInfo: {
        curPage: 1,
        size: 10,
        total: 0,
      },
      scopeShow:false,
      cfCount:'',
      zStreetList: [],
      enterpriseList: [],
      defaultVal: {
        value: "tradetypename",
        label: "tradetypename",
        children: "children",
      },
      formInline: {
        user: "",
        region: "",
        indut: "",
        townStreetId: "",
      },

      jlpIndustry:entType, //用户定义行业
      smallClassCode: "", //行业
      hyProps: {},
      hy_: [], //选择行业
      re_hy: [], //保存的行业数组，用于比较当前选择的行业值
      conditoions: "",
      isMonitoring: "1", //是否纳入预警
      tableSelect:[],//选中的项
      currentSelect:'',
      select:true,
      selectAll:true,
    };
  },
  methods: {
    onSubmit() {
      this.currentSelect = '';
      this.select = true;
      this.selectAll = true;
      this.pageInfo.curPage = 1;
      this.initPage();
    },
    resetScope(){
      this.$api.monitor.resetScope(this.cfCount).then(()=>{
        this.$message.success('重置成功！');
        window.history.go(0)
      })
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
    initPage() {
      let self = this;
      //  if(this.$refs.cascaderHandle && this.$refs.cascaderHandle._data.checkedNodes.length){
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
          ])
        )
      );
      self.$api.monitor
        .list({
          page: self.pageInfo.curPage - 1,
          size: self.pageInfo.size,
          isMonitoring: this.isMonitoring,
          condition: self.conditoions,
        })
        .then((resp) => {
          self.enterpriseList = resp.content.map(function (item) {
            if (item.type.length > 20) {
              item.text = item.type.slice(0, 20) + "......";
            } else {
              item.text = item.type;
            }
            item.monitoring = item.monitoring ? "是" : "否";
            return item;
          });

          self.pageInfo.total = resp.totalElements;
        });
    },
    joinMonSelected(){
      var self = this;
      if(self.tableSelect.length){
        let ids=self.tableSelect.map(function (item) {
          return item.id
        });
        self.$api.monitor.joinMonSelected(ids).then((resp)=>{
          self.$message.success("纳入成功！");
          //判断是否是最后一页全部纳入预警
          let totalPage = Math.ceil(self.pageInfo.total/self.pageInfo.size);
          if(self.enterpriseList.length === ids.length && self.pageInfo.curPage === totalPage && totalPage>1){
            self.pageInfo.curPage--;
          }
          self.initPage();
        })
      }else {
        self.$message.warning("请选择需要纳入预警的企业！");
      }
    },
    leaveMonSelected(){
      var self = this;
      if(self.tableSelect.length){
        let ids=self.tableSelect.map(function (item) {
          return item.id
        });
        self.$api.monitor.leaveMonSelected(ids).then((resp)=>{
          self.$message.success("取消成功！");
          //判断是否是最后一页全部取消预警
          let totalPage = Math.ceil(self.pageInfo.total/self.pageInfo.size);
          if(self.enterpriseList.length === ids.length && self.pageInfo.curPage === totalPage && totalPage>1){
            self.pageInfo.curPage--;
          }
          self.initPage();
        })
      }else {
        self.$message.warning("请选择需要取消预警的企业！");
      }
    },
    joinMon() {
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
      self.$api.monitor
        .join({
          condition: self.conditoions,
        })
        .then((res) => {
          console.log(res);
          this.$message.success("添加成功！");
          this.initPage();
        });
    },
    leaveMon() {
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
      self.$api.monitor
        .leave({
          condition: self.conditoions,
        })
        .then(() => {
          this.$message.success("移除成功！");
          this.initPage();
        });
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      this.initPage();
    },
    detailRow(index) {
      this.$router.push({
        path: "/enterprise/enterpriseDetail",
        query: { id: this.enterpriseList[index].id },
      });
    },
    handleSelectionChange(val){
      this.tableSelect = val;
      this.currentSelect = '';
      // this.select = this.tableSelect.length !== this.enterpriseList.length;
    },
    selectPage(){
      let self = this;
      if(self.select){
        self.enterpriseList.map(function (item) {
          self.$refs.multipleTable.toggleRowSelection(item,true);
        });
      }else {
        this.$refs.multipleTable.clearSelection();
      }
      self.select = !self.select;
      self.selectAll = true;
      if (!self.select){
        self.currentSelect = '选择本页';
      }
    },
    selectAllPage(){
      let self = this;
      if(self.selectAll){
        self.enterpriseList.map(function (item) {
          self.$refs.multipleTable.toggleRowSelection(item,true);
        });
      }else {
        self.$refs.multipleTable.clearSelection();
      }
      self.select = true;
      self.selectAll = !self.selectAll;
      if (!self.selectAll){
        self.currentSelect = '全选';
      }
    },
    confirmMon(){
      if(this.currentSelect === '全选'){
        if(this.isMonitoring==='1'){
          this.$confirm('将当前条件下所有企业取消预警, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.leaveMon();
          });
        }else {
          this.$confirm('将当前条件下所有企业纳入预警, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.joinMon();
          });
        }
      }else {
        if(this.isMonitoring==='1'){
          this.leaveMonSelected();
        }else {
          this.joinMonSelected();
        }
      }
    }
  },
  created() {
    this.initPage();
    this.initHy();
    this.$api.dictionariesApi.getTrsAreaList().then((res) => {
      this.zStreetList = res;
    });
  },
};
</script>

<style scoped lang="less">
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
  .opt-wrapper{
    .el-button.is-plain {
      color: #3a8ee6;
      border-color: #3a8ee6;
    }
    .el-button:active {
      color: #606266;
      border-color: #DCDFE6;
    }
  }
}
</style>
