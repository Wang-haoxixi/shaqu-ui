<template>
  <el-card class="main-container">
    <h3 slot="header" class="top-titles">预警流程设置</h3>
    <el-table :data="tableData">
      <el-table-column prop="orderId" label="序号"></el-table-column>
      <el-table-column prop="name" label="规则类型"></el-table-column>
      <el-table-column prop="status" label="运行状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row, 'edit')"
            >编辑</el-button
          >
          <el-button
            type="text"
            v-if="scope.row.enable"
            @click="disabled(scope.row.id)"
            >禁用</el-button
          >
          <el-button type="text" v-else @click="disabled(scope.row.id)"
            >启用</el-button
          >
          <el-button type="text" @click="edit(scope.row, 'detail')"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="titles" :visible.sync="dialogVisible" width="60%">
      <p class="thead">系统规则信息</p>
      <div class="content">
        <p>
          规则名称：<span>{{ configData.name }}</span>
        </p>
        <p v-if="configData.rule">
          触发周期：<span
            >每年，{{ configData.rule.startMonth }}月{{
              configData.rule.startDay
            }}日至{{ configData.rule.endMonth }}月{{
              configData.rule.endDay
            }}日</span
          >
        </p>
      </div>
      <p class="thead">处理流程设置</p>
      <el-button
        type="primary"
        @click="addhandle"
        v-if="titles === '编辑处理流程'"
        >添加节点</el-button
      >
      <el-table :data="handleData" v-loading="tableLoading">
        <el-table-column prop="orderId" label="序号"></el-table-column>
        <el-table-column label="报送人">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              :content="personList"
            >
              <el-button
                slot="reference"
                type="text"
                @click="getPushPeo(scope.row)"
                >{{ scope.row.people }}</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="delay"
          label="延迟时长（小时）"
        ></el-table-column>
        <el-table-column prop="statusName" label="处理状态"></el-table-column>
        <el-table-column prop="pushType" label="报送方式"></el-table-column>
        <el-table-column label="操作" v-if="titles === '编辑处理流程'">
          <template slot-scope="scope">
            <el-button type="text" @click="addhandle(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deletehandle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="30%"
        title="编辑节点"
        :visible.sync="nodeShow"
        append-to-body
      >
        <el-form
          :model="handleForm"
          ref="handleForm"
          :rules="rule"
          label-width="90px"
        >
          <el-form-item label="报送人" prop="userIds">
            <el-checkbox-group
              v-model="handleForm.userIds"
              style="max-height: 200px; overflow-y: scroll"
              @change="changCheck"
            >
              <el-checkbox
                v-for="item in accountList"
                :key="item.nickname + item.id"
                :value="item.id"
                :label="item.id"
                >{{ item.nickname }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="延迟时长" prop="delay">
            <el-input-number
              :precision="1"
              v-model="handleForm.delay"
            ></el-input-number
            >（单位：小时）
          </el-form-item>
          <el-form-item label="处理状态">
            <el-radio v-model="handleForm.status" label="UNPROCESSED"
              >未处理</el-radio
            >
            <el-radio v-model="handleForm.status" label="PROCESSED"
              >已处理</el-radio
            >
          </el-form-item>

          <el-form-item label="报送方式" required>
            系统消息：
            <el-switch v-model="handleForm.enableSystemMessage"> </el-switch>
            短信：
            <el-switch v-model="handleForm.enableSms"> </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="addNode" :loading="loading"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-dialog>
  </el-card>
</template>

<script>
import { conds } from "@/utils/tools";
export default {
  data() {
    return {
      formInline: {},
      loading: false,
      tableLoading: false,
      exceptionTypeList: [],
      // indexList: [0, 1, 7, 8, 9, 10, 11, 12],
      tableData: [],
      // pushList:[{name:'系统消息',value:'SYSTEM'},{name:'短信',value:'SMS'}],
      titles: "编辑处理流程",
      dialogVisible: false,
      nodeShow: false,
      handleData: [],
      handleCase: null,
      conditoions: "",
      handleForm: {
        delay: 0,
        status: "UNPROCESSED",
        enableSms: false,
        enableSystemMessage: false,
        userIds: [],
      },
      personList: null,
      accountList: [],
      // delayMin:0,
      configData: { name: "", rule: "" },
      rule: {
        userIds: [
          {
            required: true,
            trigger: "bulr",
            message: "请选择报送人",
          },
        ],
        delay: [
          {
            required: true,
            trigger: "bulr",
            message: "请填写延迟时间",
          },
        ],
        pushType: [
          {
            required: true,
            trigger: "bulr",
            message: "请选择报送方式",
          },
        ],
      },
    };
  },
  methods: {
    changCheck(val) {
      console.log(val);
    },
    getPushPeo(data) {
      this.$api.monitor.handleDetail(data.id).then((res) => {
        let peoData = [];
        res.accounts.map((ele) => {
          peoData.push(ele.nickname);
        });
        this.personList = peoData.toString();
      });
    },
    initData() {
      this.$api.monitor.queryConfig().then((res) => {
        // this.indexList.forEach((ele) => {
        //   datas.push(res[ele]);
        // });
        res.map((ele, index) => {
          ele.orderId = index + 1;
          ele.status = ele.enable ? "启用" : "禁用";
          ele.name = ele.name==='电子联单超时异常'?'企业经营状态验证':ele.name;
        });
        this.tableData = res;
      });
    },
    edit(data, type) {
      let { id, orderId } = data;
      this.handleCase = data;
      this.titles = type === "edit" ? "编辑处理流程" : "处理流程详情";
      this.dialogVisible = true;
      this.configData = this.tableData[orderId - 1];
      if (this.configData.rule && !this.configData.rule.startDay) {
        let rule = JSON.parse(this.configData.rule);
        this.configData.rule = { ...rule };
      }
      this.conditoions = conds.asConditionString(
        JSON.stringify(conds.eq("config", { id: id }))
      );
      this.$api.monitor
        .handleList({
          condition: this.conditoions,
        })
        .then((res) => {
          this.handleData = res.content;
          this.handleData.map((ele, index) => {
            ele.statusName = ele.status === "PROCESSED" ? "已处理" : "未处理";
            ele.orderId = index + 1;
            ele.pushType = ele.enableSystemMessage ? "系统消息" : "";
            if (ele.enableSms) ele.pushType += " 短信";
            ele.delay /= 3600000;
            ele.people = JSON.parse(ele.userIds).length + "人";
          });
          // this.delayMin=this.handleData.length?this.handleData[this.handleData.length-1].delay:0;
        });
    },
    deletehandle(data) {
      let self = this;
      let { id, orderId } = data;
      this.tableLoading = true;
      this.$api.monitor
        .deleteHandle(id)
        .then(() => {
          this.handleData.splice(orderId - 1, 1);
          this.tableLoading = false;
        })
        .catch((err) => {
          self.$message.error(err.msg);
          self.tableLoading = false;
        });
    },
    addhandle(data) {
      if (data.id) {
        this.handleForm = { ...data };
        this.handleForm.userIds = JSON.parse(this.handleForm.userIds);
      }
      this.nodeShow = true;
      if (!this.accountList.length) {
        this.$api.systemApi.getOrgUserList().then((res) => {
          this.accountList = res;
        });
      }
    },
    addNode() {
      if (!this.handleForm.enableSms && !this.handleForm.enableSystemMessage) {
        this.$message.error("请选择报送方式");
        return;
      }
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let data = { ...this.handleForm };
          data.config = { id: this.configData.id };
          data.delay *= 3600000;
          data.userIds = JSON.stringify(data.userIds);
          if (data.id) {
            this.$api.monitor
              .editHandle(data)
              .then(() => {
                this.loading = false;
                this.edit(this.handleCase, "edit");
                this.cancle();
              })
              .catch((err) => {
                this.loading = false;
                this.$message.error(err.msg || "网络错误，请稍后再试");
              });
          } else {
            this.$api.monitor
              .addHandle(data)
              .then(() => {
                this.loading = false;
                this.edit(this.handleCase, "edit");
                this.cancle();
              })
              .catch((err) => {
                this.loading = false;
                this.$message.error(err.msg || "网络错误，请稍后再试");
              });
          }
        }
      });
    },
    cancle() {
      this.nodeShow = false;
      this.handleForm = {
        delay: "",
        status: "UNPROCESSED",
        enableSms: false,
        enableSystemMessage: false,
        userIds: [],
      };
    },
    disabled(id) {
      this.$api.monitor.toggleActive(id).then((res) => {
        if (res) {
          this.$message.success("切换成功！");
          this.initData();
        }
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
  .title {
    text-align: left;
    font-family: "yahei";
    font-size: 16px;
    font-weight: 700;
    border-left: 4px solid #2d8cf0;
    padding: 8px;
    width: 100%;
    padding-left: 7px;
    line-height: 15px;
    margin-bottom: 30px;
  }
  .check-container {
    max-height: 200px;
    overflow-y: scroll;
    background-color: #2d8cf0;
    border: 1px solid #ccc;
  }
  .thead {
    border-left: 4px solid #999;
    padding-left: 6px;
    font-size: 16px;
    line-height: 30px;
    background-color: #ccc;
  }
}
</style>