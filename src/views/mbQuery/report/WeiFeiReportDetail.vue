<template>
  <el-card class="main-container" >
      <el-button class="back-btn" type="primary" @click="back">返回</el-button>
        <h3>危废产生年报详情</h3>
        <div class="info-title">审核过程</div>
        <div class="info-content">
            <el-table border :data="datas.htwlWasteReportHistoryList">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="epName" label="发起单位"> </el-table-column>
              <el-table-column prop="dealer" label="经办人"> </el-table-column>
              <el-table-column prop="dealtime" label="发起时间"> </el-table-column>
              <el-table-column prop="remark" label="审核意见"> </el-table-column>
              <el-table-column prop="status" label="填报状态"> </el-table-column>
            </el-table>
          </div>
        <div class="info-title">基本信息</div>
         <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="name">填报年度:</span><span>{{datas.htwlWasteDangerReport.caculYear}}</span></div>
              <div class="info-item"><span class="name">单位名称:</span><span>{{datas.htwlWasteDangerReport.epName}}</span></div>
              <div class="info-item"><span class="name">该年度医疗废物产量是否为零:</span><span>{{datas.htwlWasteDangerReport.zeroWaste}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">组织机构代码:</span><span>{{datas.htwlWasteDangerReport.orgCode}}</span></div>
              <div class="info-item"><span class="name">行政区划代码:</span><span>{{datas.htwlWasteDangerReport.divisionCode}}</span></div>
              <div class="info-item"><span class="name">国民经济行业分类:</span><span>{{datas.htwlWasteDangerReport.industryTypeName}}</span></div>
            </div>
          </div>
        <div class="info-title">废物信息</div>
        <div class="info-content">
            <el-table border :data="datas.htwlWasteDangerReportWasteInfoList">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="wasteCode" label="危险废物代码"> </el-table-column>
              <el-table-column prop="wasteName" label="危险废物名称"> </el-table-column>
              <el-table-column prop="formName" label="形态"> </el-table-column>
              <el-table-column prop="mainWasteSource" label="主要废物来源"> </el-table-column>
              <el-table-column prop="proCount" label="产生量(吨)"> </el-table-column>
              <el-table-column prop="preYearCount" label="截止上年年底遗留贮存量(吨)"> </el-table-column>
              <el-table-column prop="thisYearCount" label="截止本年年底遗留贮存量(吨)"> </el-table-column>
            </el-table>
          </div>
          <div v-if="datas.htwlWasteDangerInner.length">
            <div class="info-title">单位内部利用处置情况</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteDangerInner">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="wasteCode" label="危险废物代码"> </el-table-column>
                <el-table-column prop="facilityName" label="利用/处置设施名称"> </el-table-column>
                <el-table-column prop="count" label="利用/处置量(吨)"> </el-table-column>
                <el-table-column prop="dealTypeName" label="处置方式"> </el-table-column>
                </el-table>
            </div>
          </div>
          <div v-if="datas.htwlWasteDangerOuter.length">
            <div class="info-title">外单位利用处置信息</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteDangerOuter">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="isInner" label="是否系统注册单位"> </el-table-column>
                <el-table-column prop="entrustEpName" label="单位名称"> </el-table-column>
                <el-table-column prop="entrustEpLicenceCode" label="经营许可证编号"> </el-table-column>
                <el-table-column prop="entrustEpProvinceCode" label="省级行政区域代码"> </el-table-column>
                <el-table-column prop="entrustEpCityCode" label="市级行政区域代码"> </el-table-column>
                <el-table-column prop="linkman" label="联系人"> </el-table-column>
                <el-table-column prop="linkPhone" label="联系人手机"> </el-table-column>
                <el-table-column prop="wasteCode" label="危险废物代码"> </el-table-column>
                <el-table-column prop="count" label="利用/处置量(吨)"> </el-table-column>
                <el-table-column prop="dealWayName" label="处置方式"> </el-table-column>
                </el-table>
            </div>
          </div>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
           objectId:"",
           datas:'',
        }
    },
    methods: {
        back() {
      history.go(-1);
    },
    initPage(){
         let self = this;
      self.$api.mbQueryApi.weiFeiReportDetail(self.objectId)
      .then((resp => {
          resp.htwlWasteDangerOuter.map(ele=>{
              ele.isInner=ele.isInner==='0'?'是':'否'
          })
          if(resp.htwlWasteDangerReport.zeroWaste===0){
            resp.htwlWasteDangerReport.zeroWaste='否'
          }else if (resp.htwlWasteDangerReport.zeroWaste===1){
            resp.htwlWasteDangerReport.zeroWaste='是'}
          this.datas=resp;
      }))
    }
    },
    created() {
    this.objectId = this.$route.query.id;
    this.initPage();
  }
};
</script>

<style lang="less" scoped>
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
  .back-btn {
      position: absolute;
      right: 70px;
      top: 110px;
      z-index: 99;
    }
    h3 {
      text-align: center;
      padding-left: 15px;
      letter-spacing: 1px;
    }
    .info-title{
          background: #d2eafb;
          padding: 8px;
          margin: 16px 0;
          border-left: 8px solid #108ee9;
        }
        .info-content{
          .info-items{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            &.guobang{
              justify-content: space-between;
              margin: 24px 0;
            }
          }
          .info-item{
            font-size: 14px;
            color: #999999;
            height: 32px;
            line-height: 32px;
            min-width: 28%;
            margin-right: 32px;
            .required{
              color: red;
            }
            .name{
              margin: 0 8px;
              color: #333;
            }
          }
          .mySteps{
            width: 90%;
            padding-right: 70px;
            margin: 15px 0 24px;
            /deep/ .el-step__title.is-process{
              color: #ccc;
            }
            /deep/ .el-step__head.is-process{
              color: #ccc;
              border-color: #ccc;
            }
            /deep/ .el-step__main {
              position: absolute;
              top: -7px;
              left: 24px;
              padding: 0 15px;
              background: #fff;
            }
            /deep/ .el-step__title {
              min-width: 70px;
            }
          }
        }
}
</style>
