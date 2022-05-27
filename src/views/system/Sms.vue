<template>
    <el-card class="main-container">
      <template slot="header">
        <h3 class="top-titles">短信通知公告企业列表</h3>
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
          <el-form-item>
            <el-button
                    type="primary"
                    @click="onSubmit"
                    style="margin-left: 30px"
            >查询</el-button
            >
          </el-form-item>
        </el-form>
      </template>
      <div class="opt-wrapper">
        <div class="item">
          <el-button v-if="!select" @click="selectPage">选择本页</el-button>
          <el-button v-if="select" v-bind:plain="select" @click="delSelectPage">取消选择本页</el-button>
          <el-button v-if="!selectAll" @click="selectAllPage">全选</el-button>
          <el-button v-if="selectAll" v-bind:plain="selectAll" @click="delSelectAllPage">取消全选</el-button>
          <p>当前余额&nbsp;&nbsp;<span style="color: orangered">{{smsBalance}}</span>&nbsp;&nbsp;条;</p>
          <p>当前选择&nbsp;&nbsp;<span style="color: orangered">{{checkSum}}</span>&nbsp;&nbsp;条</p>
        </div>
        <div class="item">
          <el-select v-model="notifice" clearable placeholder="请选择" style="margin-left: 25px">
            <el-option
                    v-for="(item, index) in notificationList"
                    :key="index"
                    :label="item"
                    :value="item"
            >
            </el-option>
          </el-select>
          <el-button
                  :disabled="checkSum>smsBalance||checkSum<1"
                  @click="showSendDialog"
                  type="primary"
                  style="margin-left: 30px"
          >发送短信</el-button>
        </div>
      </div>
      <el-table
              @select="selectionRow"
              @select-all="selectionRow"
              :data="enterpriseList" style="width: 100%"  ref="multipleTable" >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" min-width="180" label="企业名称">
        </el-table-column>
        <el-table-column prop="townStreetName" label="所属镇街">
        </el-table-column>
        <el-table-column label="企业类型" min-width="300">
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
        <el-table-column prop="jlpIndustry" label="企业性质" min-width="180">
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
      <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
      <span>您当前余额为{{smsBalance}}，你当前选择{{checkSum}}条，是否确认发送？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendMsm">确 定</el-button>
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
      enterpriseList: [],
      formInline: {
        user: "",
        region: "",
        townStreetId: "", //选中镇街
      },
      conditoions: "",
      zStreetList: [], //所有镇街
      jlpIndustry: entType, //用户定义行业
      smallClassCode: "", //行业
      hyProps: {},
      hy_: [], //选择行业
      re_hy: [], //保存的行业数组，用于比较当前选择的行业值
      select: false,
      selectAll: false,
      checkValue: {},
      checkSum: 0,
      smsBalance: 0,
      notificationList: [],
      notifice: '',
      dialogVisible:false,
    };
  },
  methods: {
    onSubmit() {
      this.pageInfo.curPage = 1;
      //查询 初始化选择状态
      this.select = false;
      this.selectAll = false;
      this.checkValue = {};
      this.checkSum = 0;
      this.initPage();
    },
    initPage() {
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
          self.$nextTick(()=>{
            //如果当前状态是全选，那么当前页状态为勾选;如果不是则判断回显选择状态
            if(self.selectAll){
              self.enterpriseList.map(function (item) {
                self.$refs.multipleTable.toggleRowSelection(item,true);
              });
            }else {
              if(Object.prototype.hasOwnProperty.call(self.checkValue, self.pageInfo.curPage-1)){
                self.checkValue[self.pageInfo.curPage-1].forEach(function (item,index) {
                  for(let j=0;j<self.enterpriseList.length;j++){
                    if(item.id === self.enterpriseList[j].id){
                      self.$refs.multipleTable.toggleRowSelection(self.enterpriseList[j]);
                      return
                    }
                  }
                })
              }
            }
          })
        });
      self.$api.systemApi
        .getMsgBalance()
        .then((resp)=>{
          self.smsBalance = resp
        })
    },
    handleCurrentChange(val) {
      this.pageInfo.curPage = val;
      //分页如果是选择当前页，初始化选择按钮
      if(this.select){
        this.select = false;
      }
      this.initPage();
    },
    getTrsAreaList() {
      this.$api.dictionariesApi.getTrsAreaList().then((res) => {
        this.zStreetList = res;
      });
    },
    getMsmNotification() {
      this.$api.systemApi.getMsmNotification().then((res) => {
        this.notificationList = res
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
    selectPage(){
      let self = this;
      self.enterpriseList.map(function (item) {
        self.$refs.multipleTable.toggleRowSelection(item,true);
      });
      self.select = true;
      self.selectAll = false;
      self.checkValue[self.pageInfo.curPage-1] =  self.enterpriseList;
      self.getCheckSum()
    },
    //选择与全选只能一个有效
    delSelectPage(){
      let self = this;
      self.select = false;
      self.selectAll = false;
      self.$refs.multipleTable.clearSelection();
      delete(self.checkValue[self.pageInfo.curPage-1]);
      self.getCheckSum()
    },
    selectAllPage(){
      let self = this;
      self.select = false;
      self.selectAll = true;
      self.enterpriseList.map(function (item) {
        self.$refs.multipleTable.toggleRowSelection(item,true);
      });
      self.checkValue = {};
      self.checkSum = self.pageInfo.total;
    },
    delSelectAllPage(){
      let self = this;
      self.select = false;
      self.selectAll = false;
      self.$refs.multipleTable.clearSelection();
      self.checkValue = {};
      self.checkSum = 0;
    },
    //分页会引起变化。所以需要用select 和select-all处理
    selectionRow(selection){
      this.checkValue[this.pageInfo.curPage-1] =  selection;
      this.getCheckSum()
    },
    getCheckSum(){
      let sum = 0;
      for(var i in this.checkValue) {
        sum+=this.checkValue[i].length;
      }
      this.checkSum = sum;
    },
    showSendDialog(){
      if(this.notifice){
        this.dialogVisible = true;
      }else {
        this.$message.error('请选择发送内容')
      }
    },
    sendMsm(){
      let self = this;
      //全部与勾选
      if(self.selectAll){
        self.conditoions = conds.asConditionString(
          JSON.stringify(
            conds.and([
              conds.like("name", this.formInline.user),
              conds.like("type", this.formInline.region),
              conds.eq("townStreetId", this.formInline.townStreetId + ""),
              conds.eq("jlpIndustry", this.smallClassCode),
            ])
          )
        );
        self.$api.systemApi.getMsmSendAll({
          condition: self.conditoions,
          notification:self.notifice,
        }).then((resp)=>{
          self.dialogVisible = false;
          self.$message.info('此次发送失败条数'+resp.failedCount);
          self.checkValue = {};
          self.checkSum = 0;
          self.initPage();
        })
      }
      else {
        let ids = [];
        for(var j in this.checkValue) {
          this.checkValue[j].forEach(function (item) {
            ids.push(item.id)
          });
        }
        self.$api.systemApi.getMsmSend({
          notification:self.notifice,
          enterpriseIds:ids,
        }).then((resp)=>{
          self.dialogVisible = false;
          self.$message.info('此次发送失败条数'+resp.failedCount);
          self.checkValue = {};
          self.checkSum = 0;
          self.initPage();
        })
      }
    }
  },
  created() {
    this.initHy();
    this.getTrsAreaList();
    this.getMsmNotification();
    this.initPage();
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
    .page-wrapper {
      margin-top: 15px;
    }
    .text-tooltip {
      cursor: pointer;
    }
    .opt-wrapper{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item{
        display: flex;
        justify-items: center;
        align-items: center;
        margin-right: 80px;
        margin-bottom: 15px;
      }
      .el-button.is-plain {
        color: #3a8ee6;
        border-color: #3a8ee6;
      }
      .el-button:active {
        color: #606266;
        border-color: #DCDFE6;
      }
      p{
        margin-left: 15px;
      }
    }
  }
</style>
