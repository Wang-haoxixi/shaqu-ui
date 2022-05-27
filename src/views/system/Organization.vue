<template>
  <el-card class="main-container">
    <template slot="header">
      <h3 class="top-titles">组织架构</h3>
      <el-button type="primary" @click="showAdd" class="reg_btn"
        >新增一级组织</el-button
      >
    </template>
    <el-table
      :data="organizationData"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="组织名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="townName" label="监管区域"></el-table-column>
      <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
      <!-- <el-table-column prop="cupdateTime" label="修改时间"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <el-button type="primary">
              操作 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ name: 'add', row: scope.row }"
                >添加</el-dropdown-item
              >
              <el-dropdown-item :command="{ name: 'update', row: scope.row }"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item :command="{ name: 'bind', row: scope.row }"
                >设置监管区域</el-dropdown-item
              >
              <el-popconfirm
                title="确认删除该组织吗？"
                @confirm="delOrg(scope.row)"
              >
                <el-dropdown-item slot="reference"> 删除 </el-dropdown-item>
              </el-popconfirm>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible="showDialog"
      :close-on-click-modal="false"
      :title="titles"
      @close="close"
      width="30%"
    >
      <el-form :model="addForm" ref="addForm" :rules="rule" label-width="100px">
        <el-form-item label="组织名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请输入组织名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织描述">
          <el-input
            v-model="addForm.description"
            placeholder="请输入组织描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveOrg" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible="showBind"
      :close-on-click-modal="false"
      title="设置监管区域"
      @close="close2"
      width="30%"
    >
      <el-tree
        show-checkbox
        ref="tree"
        :props="{ label: 'streetName' }"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        :data="townData"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close2">取 消</el-button>
        <el-button type="primary" @click="saveBind" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      organizationData: [],
      showDialog: false,
      addForm: {
        name: "",
        description: "",
      },
      rowData: null,
      showBind: false,
      defaultCheckedKeys: [],
      btnType: 0, //0新增 1编辑
      loading: false,
      titles: "",
      townData: [],
      rule: {
        name: [
          {
            required: true,
            pattern: /^\S+$/,
            trigger: "blur",
            message: "组织名称不能为空！",
          },
        ],
      },
    };
  },
  methods: {
    handleCommand: function (command) {
      let { name, row } = command;
      if (name === "update") {
        this.showDialog = true;
        this.titles = "修改组织";
        this.btnType = 1;
        this.$set(this.addForm, "name", row.name);
        this.$set(this.addForm, "description", row.description);
        this.addForm.id = "" + row.id;
      } else if (name === "add") {
        this.showDialog = true;
        this.titles = "新增组织";
        this.addForm.parentId = row.id;
      } else {
        this.rowData = row;
        let initTown = [];
        if (row.townStreets) {
          row.townStreets.map((item) => {
            initTown.push(item.id);
          });
        }
        this.defaultCheckedKeys = initTown;
        this.showBind = true;
      }
    },
    showAdd() {
      this.showDialog = true;
      this.titles = "新增组织";
      this.btnType = 0;
    },
    delOrg(data) {
      this.$api.systemApi.deleteOrganization(data.id).then(() => {
        this.$message.success("删除成功！");
        this.loadData();
      });
    },
    saveBind() {
      this.loading = true;
      let checkData = this.$refs.tree.getCheckedKeys();
      if (!checkData.length) {
        this.$message.error("请至少选择一个监管区域！");
        this.loading = false;
        return;
      }
      this.$api.systemApi.bidTown(checkData, this.rowData.id).then(() => {
        this.loading = false;
        this.$message.success("绑定成功！");
        this.close2();
        this.loadData();
      });
    },
    saveOrg() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.btnType) {
            this.$api.systemApi
              .uopdateOrganization(this.addForm)
              .then((res) => {
                if (res) {
                  this.$message.success("编辑成功!");
                  this.addForm = { name: "", description: "" };
                  this.btnType = 0;
                  this.showDialog = false;
                  this.loadData();
                }
              })
              .catch((err) => {
                this.$message.error(err.msg);
              });
          } else {
            this.$api.systemApi
              .addOrganization(this.addForm)
              .then((res) => {
                if (res) {
                  this.$message.success("新增成功！");
                  this.addForm = { name: "", description: "" };
                  this.showDialog = false;
                  this.loadData();
                }
              })
              .catch((err) => {
                this.$message.error(err.msg);
              });
          }
        }
      });
    },

    close() {
      this.showDialog = false;
      this.addForm = { name: "", description: "" };
    },
    close2() {
      this.showBind = false;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    getTownName(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].townStreets) {
          data[i].townStreets.forEach((ele) => {
            data[i].townName = data[i].townName
              ? data[i].townName + "," + ele.streetName
              : ele.streetName;
          });
        }
        if (data[i].children.length) {
          this.getTownName(data[i].children);
        }
      }
      return data;
    },
    loadData() {
      this.$api.systemApi
        .organizationList()
        .then((res) => {
          this.organizationData = this.getTownName(res);
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    },
  },
  created() {
    this.loadData();
    this.$api.dictionariesApi.getTrsAreaList().then((res) => {
      this.townData = res;
    });
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: calc(100vh - 105px);
  overflow-y: auto;
  /deep/ .el-table  {
  font-size:14px ;
}
}
.reg_btn {
  float: right;
  margin-right: 20px;
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