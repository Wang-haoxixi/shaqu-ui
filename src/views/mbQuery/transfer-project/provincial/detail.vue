<template>
  <el-card class="main-container">
    <el-button class="back-btn" type="primary" @click="goBack()">返回</el-button>
    <h3 class="top-titles">跨省转移信息</h3>
    <div>
      <div class="ent-info-item">
        <div class="ent-info-name">转移期限:</div>
        <div class="ent-info-des">
          {{ detailInfo.bbgtime }} 至 {{ detailInfo.bendtime }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">转移批次:</div>
        <div class="ent-info-des">{{ detailInfo.num || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">运输方式:</div>
        <div class="ent-info-des">{{ detailInfo.transport || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移出地:</div>
        <div class="ent-info-des">{{ detailInfo.ycd || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移出地详情:</div>
        <div class="ent-info-des">
          {{ detailInfo.ycdxxdz || "-" }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移入地:</div>
        <div class="ent-info-des">{{ detailInfo.yrd || "-" }}</div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">移入地详情:</div>
        <div class="ent-info-des">
          {{ detailInfo.yrdxxdz || "-" }}
        </div>
      </div>
      <div class="ent-info-item">
        <div class="ent-info-name">线路:</div>
        <div class="ent-info-des">
          {{ detailInfo.viaground || "-" }}
        </div>
      </div>
      <!-- <div class="ent-info-item">
        <div class="ent-info-name">外运目的:</div>
        <div class="ent-info-des">
          {{ detailInfo.wymd || "-" }}
        </div>
      </div> -->
<!-- 
      <div class="ent-info-item">
        <div class="ent-info-name">处置合同:</div>
        <div class="ent-info-des">
          <a
            :href="
              'http://113.204.228.66:9073/fileupload/get?fileName=' +
              detailInfo.ageFile
            "
            v-if="detailInfo.ageFile"
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
              detailInfo.profile
            "
            v-if="detailInfo.profile"
          >
            附件
          </a>
        </div>
      </div> -->
    </div>
    <el-divider></el-divider>
    <h3 style="margin: 25px 0">其它相关信息</h3>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="审核意见" name="0">
        <el-table :data="detailInfo.auditList" border  style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="危险废物产生企业" name="1">
           <el-table :data="[detailInfo]" border  style="width: 100%">
            <el-table-column prop="wentename" label="名称"></el-table-column>
            <el-table-column prop="wentead" label="地址"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="危险废物经营单位" name="2">
          <el-table :data="[detailInfo]" border  style="width: 100%">
            <el-table-column prop="dentename" label="名称"></el-table-column>
            <el-table-column prop="dentead" label="地址"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="运输企业" name="3">
          <el-table :data="[detailInfo]" border style="width: 100%">
            <el-table-column prop="tentename" label="名称"></el-table-column>
            <el-table-column prop="tentead" label="地址"></el-table-column>
            <el-table-column prop="tlinkman" label="联系人"></el-table-column>
            <el-table-column prop="tlinkphone" label="联系人电话"></el-table-column>
            <el-table-column prop="dentead" label="运输资质有效期">{{ detailInfo.tbdate + ' 至  ' + detailInfo.tedate }}</el-table-column>
            <el-table-column prop="transcode" label="道路运输证号"></el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="转移危废信息" name="4">
          <el-table :data="detailInfo.transwasteList" border style="width: 100%">
            <el-table-column
              prop="typename"
              label="危废种类(类别)"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="damage"
              label="危废俗称"
              width="180"
            ></el-table-column>
            <el-table-column prop="wastename" label="危险废物"></el-table-column>
            <el-table-column prop="trade" label="行业来源"></el-table-column>
            <el-table-column prop="wastecode" label="危废代码"></el-table-column>
            <el-table-column prop="typecode" label="危废大类"></el-table-column>
            <el-table-column prop="wastecount" label="危废数量"></el-table-column>
            <el-table-column prop="unit" label="计量单位"></el-table-column>
            <el-table-column prop="packing" label="包装形式"></el-table-column>
            <el-table-column prop="state" label="形态"></el-table-column>
            <el-table-column prop="dangerous" label="废物特性"></el-table-column>
            <el-table-column prop="measures" label="禁忌"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "WeiFeiLianDan",
  data() {
    return {
      activeName: "0",
      detailInfo: {},
    };
  },
  created() {
    this.$api.transPlan
      .transCrossProvinceInfo(this.$route.query.id)
      .then((res) => {
        if (res) {
          this.detailInfo = res;
        }
      });
  },
  methods: {
    goBack() {
      history.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
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
  height: calc(100vh - 105px);
  overflow-y: auto;
  .page-wrapper {
    margin-top: 15px;
  }
  .text-tooltip {
    cursor: pointer;
  }
}
</style>
