<template>
  <el-card class="main-container">
    <h3 slot="header" class="top-titles">
      预警规则设置
      <span class="remind">注意：每条规则修改之后务必单独保存！</span>
    </h3>

    <el-card style="width: 95%; margin-bottom: 40px">
      <h4 slot="header">
        1、管理计划填报
        <span class="notice">
          <span>注：</span>管理计划未在设定日期内完成填报，则报预警或异常
        </span>
      </h4>

      <span class="set-type"><i class="el-icon-caret-right"></i>预警设置:</span>
      <el-row :gutter="24">
        <el-col :span="6" :offset="1">
          <span>是否启用：</span>
          <el-switch
            :value="configList[3].enable === 1"
            @change="switchChange(3)"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-col>
        <el-col :span="14">
          <span>预警提示周期：</span>
          每年
          <el-select
            v-model="configList[3].rule.startMonth"
            :disabled="!configList[3].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('warn', 8, 'startMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'WM'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[3].rule.startDay"
            :disabled="!configList[3].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in warnDMax"
              :key="item + 'WD'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 至
          <el-select
            v-model="configList[3].rule.endMonth"
            :disabled="!configList[3].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('warn2', 8, 'endMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'WM1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[3].rule.endDay"
            :disabled="!configList[3].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in warn2DMax"
              :key="item + 'WD1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 校验 <el-select
            v-model="configList[3].rule.year"
            style="width: 80px"
            :disabled="!configList[3].enable"
          >
            <el-option value="-1" label="上"></el-option>
            <el-option value="0" label="当"></el-option>
            <el-option value="1" label="次"></el-option> </el-select
          >年数据
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="subDateRange(configList[3].id, configList[3].rule)"
            >保存设置</el-button
          >
        </el-col>
      </el-row>
      <span class="set-type"><i class="el-icon-caret-right"></i>异常设置:</span>
      <el-row :gutter="24">
        <el-col :span="6" :offset="1">
          <span>是否启用：</span>
          <el-switch
            :value="configList[4].enable === 1"
            @change="switchChange(4)"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-col>
        <el-col :span="14">
          <span>异常报警周期：</span>
          每年
          <el-select
            v-model="configList[4].rule.startMonth"
            :disabled="!configList[4].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('abn', 9, 'startMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'M'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[4].rule.startDay"
            :disabled="!configList[4].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in abnDMax"
              :key="item + 'D'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 至
          <el-select
            v-model="configList[4].rule.endMonth"
            :disabled="!configList[4].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('abn2', 9, 'endMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'M1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[4].rule.endDay"
            :disabled="!configList[4].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in abn2DMax"
              :key="item + 'D1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 校验 <el-select
            v-model="configList[4].rule.year"
            style="width: 80px"
            :disabled="!configList[4].enable"
          >
            <el-option value="-1" label="上"></el-option>
            <el-option value="0" label="当"></el-option>
            <el-option value="1" label="次"></el-option> </el-select
          >年数据
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="subDateRange(configList[4].id, configList[4].rule)"
            >保存设置</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card style="width: 95%; margin-bottom: 40px">
      <h4 slot="header">
        2、年报填报<span class="notice">
          <span>注：</span>年报未在设定日期内完成填报，则报预警或异常
        </span>
      </h4>
      <span class="set-type"><i class="el-icon-caret-right"></i>预警设置:</span>
      <el-row :gutter="24">
        <el-col :span="6" :offset="1">
          <span>是否启用：</span>
          <el-switch
            :value="configList[5].enable === 1"
            @change="switchChange(5)"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-col>
        <el-col :span="14">
          <span>预警提示周期：</span>
          每年
          <el-select
            v-model="configList[5].rule.startMonth"
            :disabled="!configList[5].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('warn3', 10, 'startMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'WM'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[5].rule.startDay"
            :disabled="!configList[5].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in warn3DMax"
              :key="item + 'WD'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 至
          <el-select
            v-model="configList[5].rule.endMonth"
            :disabled="!configList[5].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('warn4', 10, 'endMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'WM1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[5].rule.endDay"
            :disabled="!configList[5].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in warn4DMax"
              :key="item + 'WD1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 校验 
          <el-select
            v-model="configList[5].rule.year"
            style="width: 80px"
            :disabled="!configList[5].enable"
          >
            <el-option value="-1" label="上"></el-option>
            <el-option value="0" label="当"></el-option>
            <el-option value="1" label="次"></el-option> </el-select
          >年数据
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="subDateRange(configList[5].id, configList[5].rule)"
            >保存设置</el-button
          >
        </el-col>
      </el-row>
      <span class="set-type"><i class="el-icon-caret-right"></i>异常设置:</span>
      <el-row :gutter="24">
        <el-col :span="6" :offset="1">
          <span>是否启用：</span>
          <el-switch
            :value="configList[6].enable === 1"
            @change="switchChange(6)"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-col>
        <el-col :span="14">
          <span>异常报警周期：</span>
          每年
          <el-select
            v-model="configList[6].rule.startMonth"
            :disabled="!configList[6].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('abn3', 11, 'startMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'M'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[6].rule.startDay"
            :disabled="!configList[6].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in abn3DMax"
              :key="item + 'D'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 至
          <el-select
            v-model="configList[6].rule.endMonth"
            :disabled="!configList[6].enable"
            size="mini"
            style="width: 80px"
            @change="mChange('abn4', 11, 'endMonth')"
          >
            <el-option
              v-for="item in 12"
              :key="item + 'M1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          月
          <el-select
            v-model="configList[6].rule.endDay"
            :disabled="!configList[6].enable"
            size="mini"
            style="width: 80px"
          >
            <el-option
              v-for="item in abn4DMax"
              :key="item + 'D1'"
              :value="item"
              :option="item"
            ></el-option>
          </el-select>
          日 校验 
          <el-select
            v-model="configList[6].rule.year"
            style="width: 80px"
            :disabled="!configList[6].enable"
          >
            <el-option value="-1" label="上"></el-option>
            <el-option value="0" label="当"></el-option>
            <el-option value="1" label="次"></el-option> </el-select
          >年数据
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            @click="subDateRange(configList[6].id, configList[6].rule)"
            >保存设置</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-row class="set-el-card" :gutter="22">
      <el-col :span="11">
        <el-card>
          <h4 slot="header">
            3、年度申报与电子联单数据验证
            <span class="notice">
              <span>注：</span>年度申报数量与当年实际操作数量不符，则报异常。
            </span>
          </h4>

          <el-row>
            <el-col :span="19">
              <span>是否启用：</span>
              <el-switch
                :value="configList[2].enable === 1"
                @change="switchChange(2)"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="subSet(configList[2].id)"
                :disabled="configList[2].enable == initConfigList[2].enable"
                >保存设置</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h4 slot="header">
            4、视频报警
            <span class="notice">
              <span>注：</span>摄像头检测到违规行为，则报异常。
            </span>
          </h4>

          <el-row>
            <el-col :span="19">
              <span>是否启用：</span>
              <el-switch
                :value="configList[7].enable === 1"
                @change="switchChange(7)"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="subSet(configList[7].id)"
                :disabled="configList[7].enable == initConfigList[7].enable"
                >保存设置</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="set-el-card" :gutter="22">
      <el-col :span="11">
        <el-card>
          <h4 slot="header">
            5、危废管理计划与转移计划数据验证
            <span class="notice">
              <span>注：</span>
              当年填报的转移计划中该废物的总量>=当年管理计划中每种废物计划产生量+每种废物贮存量,则报异常
            </span>
          </h4>

          <span class="set-type"
            ><i class="el-icon-caret-right"></i>预警设置:</span
          >
          <el-row :gutter="22">
            <el-col :span="7">
              <span>是否启用：</span>
              <el-switch
                :value="configList[1].enable === 1"
                @change="switchChange(1)"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
            <el-col :span="12">
              <span>预警阈值设置：</span>
              <el-input-number
                v-model="configList[1].threshold"
                :disabled="!configList[1].enable"
                :min="0"
                :max="100"
              ></el-input-number>
              <span>（单位：%）</span>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="subSet(configList[1].id, configList[1].threshold)"
                :disabled="
                  configList[1].enable == initConfigList[1].enable &&
                  configList[1].threshold == initConfigList[1].threshold
                "
                >保存设置</el-button
              >
            </el-col>
          </el-row>
          <span class="set-type"
            ><i class="el-icon-caret-right"></i>异常设置:</span
          >
          <el-row>
            <el-col :span="19">
              <span>是否启用：</span>
              <el-switch
                :value="configList[0].enable === 1"
                @change="switchChange(0)"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="subSet(configList[0].id)"
                :disabled="configList[0].enable == initConfigList[0].enable"
                >保存设置</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h4 slot="header">
            6、企业关停预警
            <span class="notice">
              <span>注：</span>若企业365天内未执行新联单，区级管理人员可以暂停该企业账号使用。</span>
          </h4>
          <el-row>
            <el-col :span="19">
              <span>是否启用：</span>
              <el-switch
                :value="configList[8].enable === 1"
                @change="switchChange(8)"
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                @click="subSet(configList[8].id)"
                :disabled="configList[8].enable == initConfigList[8].enable"
                >保存设置</el-button
              >
            </el-col>
          </el-row>
          </el-card>
      </el-col>
    </el-row>
    <el-row class="set-el-card" :gutter="22">
      <!-- <el-col :span="11">
        <el-card>
          <h4 slot="header">
            7、电子联单超时验证
            <span class="notice"
              ><span>注：</span>电子联单超时未处理，则报异常。</span
            >
          </h4>

          <el-row>
            <el-col :span="14">
              <span>是否启用：</span>
              <el-switch
                :value="true"
                disabled
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-card>
      </el-col> -->
      <el-col :span="11">
        <el-card>
          <h4 slot="header">
            7、危废转移计划与电子联单数据验证
            <span class="notice">
              <span>注：</span>电子联单数量大于危废转移计划数量，则报异常
            </span>
          </h4>

          <el-row>
            <el-col :span="14">
              <span>是否启用：</span>
              <el-switch
                :value="true"
                disabled
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
       <el-col :span="12">
        <el-card>
          <h4 slot="header">
            8、电子联单与经营许可证数据验证
            <span class="notice">
              <span>注：</span>电子联单数量大于经营许可证数量，则报异常。
            </span>
          </h4>

          <el-row>
            <el-col :span="14">
              <span>是否启用：</span>
              <el-switch
                :value="true"
                disabled
                active-text="是"
                inactive-text="否"
              >
              </el-switch>
            </el-col> </el-row
        ></el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      configList: [], //与页面数据绑定
      initConfigList: [{ enable: 0, threshold: null }], //初始配置值  用于对比判断保存按钮是否显示
      catList: [],
      warnDMax: null,
      abnDMax: null,
      warn2DMax: null,
      abn2DMax: null,
      warn3DMax: null,
      abn3DMax: null,
      warn4DMax: null,
      abn4DMax: null,
      intData: [], //添加规则时  push到catList
      catData: [
        {
          industryCodes: [],
          value: null,
        },
      ], //提交到后端的tree数据
    };
  },
  methods: {
    //   开关
    switchChange(index) {
      this.configList[index].enable =
        this.configList[index].enable === 1 ? 0 : 1;
    },

    // 提交修改
    subSet(id, val) {
      let i = id - 1;
      if (
        arguments.length === 1 ||
        this.configList[i].enable != this.initConfigList[i].enable
      ) {
        this.subSwitch(id);
      } else if (!val && this.configList[i].enable) {
        this.$message.error("预警/异常为开启状态时，阈值必填");
        return;
      }
      val != this.initConfigList[i].threshold && this.subThreshold(id, val);
    },

    //  保存行业设置

    subCat(id) {
      this.getCheck(this.catList.length);
      let data = this.catData;
      this.$api.monitor
        .configIndustryThreshold(id, data)
        .then((res) => {
          if (res) {
            this.$message.success("设置成功！");
          }
        })
        .catch((err) => this.$message.error(err.msg));
    },

    //保存日期范围
    subDateRange(id, val) {
      if (!val.startDay || !val.endDay || !val.startMonth || !val.endMonth) {
        this.$message.error("请完善日期信息！");
        return false;
      }
      this.$api.monitor.configTimeRange(id, val).then(() => {
        this.$message.success("配置成功！");
      });
    },

    // 保存开关
    subSwitch(id) {
      this.$api.monitor
        .toggleActive(id)
        .then((res) => {
          if (res) {
            this.$message.success("设置成功！");
            this.initConfigList[id - 1].enable = this.configList[id - 1].enable;
          }
        })
        .catch((err) => this.$message.error(err.msg));
    },
    mChange(type, idx, month) {
      let m = this.configList[idx].rule[month];
      if ("46911".includes(m)) {
        this[`${type}DMax`] = 30;
      } else if (m === 2) {
        this[`${type}DMax`] = 28;
      } else {
        this[`${type}DMax`] = 31;
      }
      if (month.includes("end")) {
        this.configList[idx].rule.endDay = null;
      } else {
        this.configList[idx].rule.startDay = null;
      }
    },

    // 保存修改阈值
    subThreshold(id, val) {
      this.$api.monitor
        .changeThreshold(id, { value: val })
        .then((res) => {
          if (res) {
            this.$message.success("设置成功！");
            this.initConfigList[id - 1].threshold = val; //同步阈值   再次禁用按钮
          }
        })
        .catch((err) => this.$message.error(err.msg));
    },

    //   初始化配置内容
    getConfig() {
      this.$api.monitor.queryConfig().then((res) => {
        this.configList = res;
        this.configList.map((ele) => {
          if (ele.rule) {
            ele.rule = JSON.parse(ele.rule);
            ele.rule.year = ele.rule.year + "" || "";
          }
        });
        // this.catData = JSON.parse(res[5].rule);
        this.initConfigList = JSON.parse(JSON.stringify(this.configList));
      });
      // .catch((err) => this.$message.error(err.msg));
    },
  },
  mounted() {
    this.getConfig();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  .remind {
    margin-left: 80px;
    color: red;
    font-size: 16px;
    font-weight: 300;
  }
  h4 {
    font-size: 16px;
  }
  font-size: 14px;

  .set-el-card {
    padding: 16px 0;
    margin-bottom: 10px;
  }
  .notice {
    color: dimgrey;
    margin-left: 30px;
    margin-bottom: 10px;
    font-size: 14px;
    span {
      color: red;
    }
  }
  .return-btn {
    width: 80px;
    margin-bottom: 14px;
  }
  .set-type {
    font-weight: 700;
    margin-left: 10px;
    padding-left: 4px;
    // border-left: 4px solid #2d8cf0;
    font-size: 14px;
  }
  .tree-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    width: 1100px;
    .tree-content {
      padding: 10px;
      position: relative;
      margin-right: 30px;
      .tree {
        height: 400px;
        overflow-y: scroll;
      }
      .el-icon-delete {
        float: right;
        cursor: pointer;
      }
      .close-btn {
        position: absolute;
        border: 1px solid #999;
        border-radius: 2px;
        padding: 2px;
        cursor: pointer;
        bottom: 10px;
        right: 20px;
      }
      span {
        el-color: #2d8cf0;
      }
    }
  }
  .cat-btn {
    margin-left: 300px;
    .ivu-btn {
      margin-bottom: 24px;
      margin-left: 10px;
    }
  }
}
</style>