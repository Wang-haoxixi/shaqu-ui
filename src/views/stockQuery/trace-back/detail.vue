<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <h3 class="top-titles">市内转移信息</h3>
    <div id="infoId">
      <div class="base-info">
        <div class="ent-info-item">
          <div class="ent-info-name">危废俗称：</div>
          <div class="ent-info-des">{{ detail.wasteName || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">废物类型：</div>
          <div class="ent-info-des">{{ detail.typeName || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">危废代码：</div>
          <div class="ent-info-des">{{ detail.wasteCode || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">危废重量：</div>
          <div class="ent-info-des">{{ detail.wasteWeight || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">危废大类：</div>
          <div class="ent-info-des">HW{{ detail.type }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">流水号：</div>
          <div class="ent-info-des">
            {{
              detail.qrCode.substring(
                detail.qrCode.length - 9,
                detail.qrCode.length
              ) || "-"
            }}
          </div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">相关企业：</div>
          <div class="ent-info-des">
            {{ detail.enterpriseName || "-" }}
          </div>
        </div>
      </div>
      <div class="line-info">
        <el-steps direction="vertical" :active="wasteTravelLineList.length - 1">
          <el-step
            :description="v.mark"
            icon="el-icon-circle-check"
            v-for="v in wasteTravelLineList"
            :key="v.id"
          ></el-step>
        </el-steps>
      </div>
    </div>
    <el-divider></el-divider>
    <h3 style="margin: 25px 0">其它相关信息</h3>
    <el-tabs v-model="activeName" type="card" @tab-click="changeTab">
      <el-tab-pane label="二维码图片" name="cfzl">
        <div style="margin-bottom: 10px;">二维码信息： {{qrCode}}</div>
        <vue-qr
          :text="qrCode"
          :margin="0"
          colorDark="#000000"
          colorLight="#fff"
          :logoScale="0.3"
          :size="200"
        ></vue-qr>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
import vueQr from "vue-qr";

export default {
  name: "EnterpriseDetail",
  components: {
    vueQr,
  },
  data() {
    return {
      id: this.$route.query.id,
      activeName: "cfzl",
      townStreetName: this.$route.query.townStreetName || "--",
      detail: {},
      wasteTravelLineList: [],
      examineData: [],
      qrCode: "",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const self = this;
      self.$api.stockApi
        .wastePackageDetail(self.id)
        .then((resp) => {
          self.detail = resp;
          self.wasteTravelLineList = resp.wasteTravelLineList;
          const code = resp.qrCode.substring(
            resp.qrCode.length - 9,
            resp.qrCode.length
          );
          self.qrCode =
            resp.wasteName +
            " " +
            resp.wasteCode +
            " " +
            resp.wasteWeight +
            " " +
            code;
        })
        .catch(() => {
          self.loading = false;
        });
    },
    back() {
      history.back();
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
    top: 20px;
    z-index: 99;
  }
  #infoId {
    display: flex;
    align-content: flex-start;
    .base-info {
      width: 300px;
      margin-right: 300px;
    }
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
