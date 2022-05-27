<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <h3 class="top-titles">豁免转移信息</h3>
    <div>
      <div class="ent-info-item">
        <div class="ent-info-name">转移期限:</div>
        <div class="ent-info-des">
          {{ planInfo.bbgtime }}至{{ planInfo.bendtime }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">转移批次:</div>
        <div class="ent-info-des">{{ planInfo.num || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">运输方式:</div>
        <div class="ent-info-des">{{ planInfo.transport || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移出地:</div>
        <div class="ent-info-des">{{ planInfo.ycd || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移出地详情:</div>
        <div class="ent-info-des">
          {{ planInfo.ycdxxdz || "-" }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移入地:</div>
        <div class="ent-info-des">{{ planInfo.yrd || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移入地详情:</div>
        <div class="ent-info-des">
          {{ planInfo.yrdxxdz || "-" }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">线路:</div>
        <div class="ent-info-des">
          {{ planInfo.viaground || "-" }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">外运目的:</div>
        <div class="ent-info-des">
          {{ planInfo.wymd || "-" }}
        </div>
      </div>

      <!-- <div class="ent-info-item">
        <div class="ent-info-name">处置合同:</div>
        <div class="ent-info-des">
          <a
            :href="
              'http://113.204.228.66:9073/fileupload/get?fileName=' +
              planInfo.ageFile
            "
            v-if="planInfo.ageFile"
          >
            附件
          </a>
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">转移实施方案:</div>
        <div class="ent-info-des">
          <a
            :href="
              'http://113.204.228.66:9073/fileupload/get?fileName=' +
              planInfo.profile
            "
            v-if="planInfo.profile"
          >
            附件
          </a>
        </div>
      </div> -->
    </div>
    <el-divider></el-divider>
    <h3 style="margin: 25px 0">其它相关信息</h3>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="审核意见" name="cfzl">
        <el-table :data="auditList" class="cfzl_table">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="audittime" label="审批时间"></el-table-column>
          <el-table-column prop="message" label="审批意见"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column
            prop="auditperson"
            label="处理企业"
          ></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="危险废物产生企业" name="jyfw">
        <el-table :data="tabData" class="cfzl_table" border>
          <el-table-column prop="wentename" label="名称"></el-table-column>
          <el-table-column prop="wentead" label="地址"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="危险废物经营单位" name="first">
        <el-table :data="tabData" class="cfzl_table" border>
          <el-table-column prop="dentename" label="名称"></el-table-column>
          <el-table-column prop="dentead" label="地址"></el-table-column>
          <el-table-column prop="lincode" label="经营许可证"></el-table-column>
          <el-table-column label="经营许可证附件">
            <template slot-scope="scope">
              <a
                :href="
                  'http://113.204.228.66:9073/fileupload/get?fileName=' +
                  scope.dwLicense
                "
                v-if="scope.dwLicense"
              >
                附件
              </a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="运输企业" name="second">
        <el-table :data="tabData" class="cfzl_table" border>
          <el-table-column prop="tentename" label="名称"></el-table-column>
          <el-table-column prop="tentead" label="地址"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转移危废信息" name="third">
        <el-table :data="wasteData" class="cfzl_table">
          <el-table-column
            prop="typename"
            label="危废种类(类别)"
          ></el-table-column>
          <el-table-column prop="damage" label="危废俗称"></el-table-column>
          <el-table-column prop="wastename" label="危险废物"></el-table-column>
          <el-table-column prop="trade" label="行业来源"></el-table-column>
          <el-table-column prop="wastecode" label="危废代码"></el-table-column>
          <el-table-column prop="typecode" label="危废大类"></el-table-column>
          <el-table-column prop="wastecount" label="危废数量"></el-table-column>
          <el-table-column prop="unit" label="计量单位"></el-table-column>
          <el-table-column prop="packing" label="包装形式"></el-table-column>
          <el-table-column
            prop="wastetypeName"
            label="处置方式"
          ></el-table-column>
          <el-table-column prop="state" label="形态"></el-table-column>
          <!-- <el-table-column prop="sc" label="危险成分"></el-table-column> -->
          <el-table-column prop="dangerous" label="废物特性"></el-table-column>
          <!-- <el-table-column prop="measures" label="禁忌"></el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
import videoApi from "@/api/videoApi";

export default {
  name: "EnterpriseDetail",
  data() {
    return {
      activeName: "cfzl",
      id: this.$route.query.id,
      planInfo: {},
      tabData: [],
      wasteData: [],
      auditList: [],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    back() {
      history.back();
    },
    getInfo() {
      const self = this;
      self.$api.transPlan
        .transDetail(self.id)
        .then((resp) => {
          self.planInfo = resp;
          self.tabData = [resp];
          self.wasteData = resp.transwasteList;
          self.auditList = resp.auditList;
        })
        .catch(() => {
          self.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  height: calc(100vh - 105px);
  overflow-y: auto;
  .back-btn {
    position: absolute;
    right: 70px;
    top: 30px;
    z-index: 99;
  }
  hr {
    color: #cccccc;
  }
  h3 {
    border-left: 8px solid #108ee9;
    color: #108ee9;
    padding-left: 15px;
    letter-spacing: 1px;
  }
  h4 {
    color: #409eff;
    margin: 25px 0 15px 0;
  }
  .ent-info-item {
    display: flex;
    margin-bottom: 15px;
    letter-spacing: 1px;
    .ent-info-name {
      color: #424242;
      font-size: 14px;
      font-weight: 600;
      min-width: 120px;
    }
    .ent-info-des {
      font-size: 14px;
      color: #303133;
      margin-left: 20px;
    }
  }
  /deep/ .el-table {
    font-size: 14px;
  }
  .wrap {
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .video-wrap {
      width: 30%;
      height: 100%;
      margin-bottom: 10px;
    }
  }
  .my-table span.biangeng {
    color: red;
  }

  .jyfw {
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    .right {
      width: 60%;
    }

    span {
      font-family: "Courier New", Courier, monospace;
    }
  }
}
/deep/ .el-tabs__content {
  overflow: auto;
}
</style>
