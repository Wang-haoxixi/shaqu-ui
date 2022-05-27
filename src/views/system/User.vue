<template>
  <el-card class="main-container">
    <template slot="header">
      <p class="top-titles">用户列表</p>
      <el-button type="primary" @click="regShow = true" class="reg_btn"
        >注册账号</el-button
      >
    </template>
    <el-table :data="users" header-align="center">
      <el-table-column prop="idx" label="序号"></el-table-column>
      <el-table-column prop="username" label="登录名"></el-table-column>
      <el-table-column prop="nickname" label="用户姓名"></el-table-column>
      <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
      <el-table-column prop="rolename" label="角色"></el-table-column>
      <el-table-column prop="enabled" label="是否启用"></el-table-column>
      <el-table-column
        prop="organization.name"
        label="所属组织"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown :hide-on-click="false" @command="actuser">
            <el-button type="primary">
              操作 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ name: 'update', row: scope.row }"
                >编辑</el-dropdown-item
              >
              <el-popconfirm
                title="确认删除该账号？"
                @confirm="delUser(scope.row)"
              >
                <el-dropdown-item slot="reference"> 删除 </el-dropdown-item>
              </el-popconfirm>
              <el-dropdown-item :command="{ name: 'role', row: scope.row }"
                >分配角色</el-dropdown-item
              >
              <el-dropdown-item :command="{ name: 'town', row: scope.row }"
                >绑定组织</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :current-page.sync="pageInfo.curPage"
      @current-change="handleCurrentChange"
      :total="pageInfo.total"
      class="pagination"
    ></el-pagination>

    <el-dialog
      :visible="showDialog"
      :close-on-click-modal="false"
      title="修改用户"
      @close="showDialog = false"
      width="30%"
    >
      <el-form ref="form" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="登录名">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="nickname">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input v-model="user.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="user.enabled" active-text="是" inactive-text="否">
          </el-switch>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="saveUser">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog
      title="账号注册"
      :visible="regShow"
      :close-on-click-modal="false"
      width="30%"
      @close="regShow = false"
    >
      <el-form
        ref="regForm"
        :model="regForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="登录名" prop="username">
          <el-input
            v-model="regForm.username"
            autocomplete="off"
            placeholder="请输入登录名(由4-16位数字、字母组成)"
            label-width="100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="nickname">
          <el-input
            v-model="regForm.nickname"
            autocomplete="off"
            placeholder="请输入用户姓名(不包含特殊字符)"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input
            v-model="regForm.mobilePhone"
            autocomplete="off"
            placeholder="请输入用户手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="regForm.password"
            autocomplete="off"
            placeholder="请输入密码(由4-16位数字、字母组成)"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleReg" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible="roleShow"
      title="角色分配"
      :close-on-click-modal="false"
      width="30%"
      @close="closeRole"
    >
      <p>{{ user.username }}</p>
      <el-checkbox-group v-model="roleCheckList">
        <el-checkbox
          v-for="(item, index) in roleList"
          :key="index"
          :label="item.id"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRole">取 消</el-button>
        <el-button type="primary" @click="saveRole" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible="showBind"
      :close-on-click-modal="false"
      title="为账号绑定组织"
      @close="close"
      width="30%"
    >
      <el-tree
        show-checkbox
        ref="tree"
        :props="{ label: 'name' }"
        node-key="id"
        :data="orgData"
        @check-change="handleClick"
        @node-click="nodeClick"
        :default-checked-keys="defaultCheckedKeys"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveBind" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { formatDateTime } from "@/utils/tools";
import { NAME_PASS, NICK, PHONE_REGEXP_NULL } from "@/utils/regExps";
export default {
  name: "User",
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (this.regForm.confirmPassword !== "") {
    //     this.$refs.regForm.validateField("confirmPassword");
    //   }
    //   callback();
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value !== this.regForm.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   }
    //   callback();
    // };
    return {
      users: [],
      showDialog: false,
      roleShow: false,
      roleList: {},
      roleCheckList: [],
      user: {},
      pageInfo: {
        curPage: 1,
        total: 0,
      },
      loading: false,
      regShow: false,
      regForm: {
        password: "",
        username: "",
        mobilePhone: "",
        nickname: "",
        confirmPassword: "",
      },
      orgData: null,
      showBind: false,
      orgList: [],
      checkedId: null,
      defaultCheckedKeys: [],
      rules: {
        username: [
          {
            pattern: NAME_PASS,
            message: "登录名格式不正确！",
            trigger: "blur",
            required: true,
          },
        ],
        nickname: [
          {
            pattern: NICK,
            message: "用户姓名格式不正确！",
            trigger: "blur",
            required: true,
          },
        ],
        mobilePhone: [
          {
            pattern: PHONE_REGEXP_NULL,
            message: "手机号格式不正确！",
            trigger: "blur",
            required: true,
          },
        ],
        password: [
          {
            pattern: NAME_PASS,
            message: "登录名格式不正确！",
            trigger: "blur",
            required: true,
          },
        ],
      },
      formRules: {
        password: [
          {
            pattern: NAME_PASS,
            message: "登录名格式不正确！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.loadData();
    this.$api.systemApi.organizationList().then((res) => {
      this.orgData = res;
    });
  },
  methods: {
    handleCurrentChange(val) {
      // 修改当前页
      this.pageInfo.curPage = val;
      this.loadData();
    },
    saveUser() {
      let self = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = { ...self.user };
          delete data.updateTime;
          self.$api.systemApi
            .updateUser(self.user)
            .then(() => {
              self.$message.success("编辑成功");
              self.showDialog = false;
              self.loadData();
            })
            .catch((err) => self.$message.error(err.msg));
        }
      });
    },
    actuser(command) {
      let { name, row } = command;
      this.user = row;
      if (name === "update") {
        this.$api.systemApi.getUserDetail(row.id).then((res) => {
          this.user = JSON.parse(JSON.stringify(res));
        });
        this.showDialog = true;
      } else if (name === "role") {
        this.$api.systemApi.listRole({size:9999}).then((res) => {
          this.roleList = res.content;
        });
        row.roles.map((ele) => {
          this.roleCheckList.push(ele.id);
        });
        this.roleShow = true;
      } else {
        this.defaultCheckedKeys = this.user.organization
          ? [this.user.organization.id]
          : [];
        this.showBind = true;
      }
    },
    delUser(data) {
      this.$api.systemApi
        .deleteUser(data.id)
        .then(() => {
          this.$message.success("删除成功！");
          this.loadData();
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.msg);
        });
    },
    handleClick(data, checked) {
      if (checked == true) {
        this.checkedId = data.id;
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    nodeClick(data) {
      this.checkedId = data.id;
      this.$refs.tree.setCheckedNodes([data]);
    },
    closeRole() {
      this.roleCheckList = [];
      this.roleShow = false;
    },
    close() {
      this.showBind = false;
      this.orgList = [];
      this.checkedId = null;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    saveBind() {
      this.loading = true;
      if (!this.checkedId) {
        this.$message.error("请至少选择一个组织！");
        this.loading = false;
        return;
      }
      this.$api.systemApi
        .bindOgranization([this.checkedId], this.user.id)
        .then(() => {
          this.loading = false;
          this.$message.success("绑定成功！");
          this.close();
          this.loadData();
        });
    },
    saveRole() {
      if (!this.roleCheckList.length) {
        this.$message.error("至少选择一个角色！");
        return false;
      }
      this.$api.systemApi
        .assignRole(this.user.id, this.roleCheckList)
        .then((res) => {
          if (res) {
            this.roleCheckList = [];
            this.roleShow = false;
            this.$message.success("分配成功！");
            this.loadData();
          }
        })
        .catch((err) => this.$message.error(err.msg));
    },
    loadData() {
      let self = this;
      self.$api.systemApi
        .getUserList({ page: self.pageInfo.curPage - 1 })
        .then((resp) => {
          resp.content.map((item, index) => {
            item.createTime = formatDateTime(item.createTime);
            item.updateTime = formatDateTime(item.updateTime);
            item.enabled = item.enabled ? "是" : "否";
            item.accountNonExpired = !item.accountNonExpired ? "是" : "否";
            item.accountNonLocked = !item.accountNonLocked ? "是" : "否";
            item.roles.map((ele) => {
              item.rolename = item.rolename + "," + ele.name;
            });
            item.rolename = item.rolename && item.rolename.slice(10);
            item.idx = resp.number * resp.size + index + 1;
          });
          self.users = resp.content;
          self.pageInfo.total = resp.totalElements;
        })
        .catch((err) => self.$message.error(err.msg));
    },
    handleReg() {
      //注册
      let form = {};
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          form.username = this.regForm.username;
          form.password = this.regForm.password;
          form.nickname = this.regForm.nickname;
          this.$api.systemApi
            .register(form)
            .then((res) => {
              if (res) {
                this.$message.success("注册成功！");
                this.loadData();
                this.loading = false;
                this.cancel();
              } else {
                this.$message.error("网络错误，请稍后再试！");
                this.loading = false;
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error(err.msg);
            });
        }
      });
    },
    cancel() {
      this.regShow = false;
      this.$refs["regForm"].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
}
.reg_btn {
  margin-left:90%;
}
.title {
  font-family: "yahei";
  font-weight: 700;
  border-left: 4px solid #2d8cf0;
  padding-left: 7px;
  line-height: 15px;
  margin-bottom: 20px;
  text-align: left;
}
</style>
