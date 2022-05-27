<template>
  <el-card class="main-container" >
      <el-button class="back-btn" type="primary" @click="back">返回</el-button>
        <h3>危废经营月报详情</h3>
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
              <div class="info-item"><span class="name">填报年度:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.caculYear}}</span></div>
              <div class="info-item"><span class="name">单位名称:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.operateEpName || ''}}</span></div>
              <div class="info-item"><span class="name">联系人:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.linkman || ''}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">联系人电话:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.telephone || ''}}</span></div>
              <div class="info-item"><span class="name">组织机构代码:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.orgCode || ''}}</span></div>
              <div class="info-item"><span class="name">行政区划代码:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.divisionCode || ''}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">法定代表人:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.legalPerson || ''}}</span></div>
              <div class="info-item"><span class="name">国民经济行业分类:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.entecategoryname || ''}}</span></div>
              <div class="info-item"><span class="name">该年度危险废物经营量是否为零:</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.zeroWaste || ''}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">实际年经营利用量(吨):</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.factOperateUseScale || ''}}</span></div>
              <div class="info-item"><span class="name">实际危险废物处置量(吨):</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.factOperateWasteDealScale || ''}}</span></div>
              <div class="info-item"><span class="name">实际医疗废物处置量(吨):</span><span>{{datas.htwlWasteOperateYearReport && datas.htwlWasteOperateYearReport.factOperateMedicalDealScale || ''}}</span></div>
            </div>
          </div>
        <div class="info-title">废物信息</div>
        <div class="info-content">
            <el-table border :data="datas.htwlWasteOperateReportWasteInfoList">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="wasteCode" label="危险代码"> </el-table-column>
              <el-table-column prop="wasteName" label="废物名称"> </el-table-column>
              <el-table-column prop="formName" label="形态"> </el-table-column>
              <el-table-column prop="mainWasteSource" label="主要废物来源"> </el-table-column>
              <el-table-column prop="receiveCount" label="接收量"> </el-table-column>
              <el-table-column prop="caculUnit" label="单位"> </el-table-column>
              <el-table-column prop="described" label="描述"> </el-table-column>
              <el-table-column prop="preOwnCount" label="截止上年底贮存量"> </el-table-column>
              <el-table-column prop="thisOwnCount" label="截止本年底贮存量"> </el-table-column>
            </el-table>
          </div>
          <div v-if="datas.htwlWasteOperateReportInnerList && datas.htwlWasteOperateReportInnerList.length">
            <div class="info-title">单位内部利用处置情况</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteOperateReportInnerList">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="facilityCode" label="设施编号"> </el-table-column>
                <el-table-column prop="facilityName" label="设施名称"> </el-table-column>
                <el-table-column prop="facilityScale" label="核准规模(吨/桶)"> </el-table-column>
                <el-table-column prop="wasteCode" label="危废代码"> </el-table-column>
                <el-table-column prop="count" label="利用/处置量"> </el-table-column>
                <el-table-column prop="caculUnit" label="单位"> </el-table-column>
                <el-table-column prop="dealWayName" label="处置方式"> </el-table-column>
                </el-table>
            </div>
          </div>
          <div v-if="datas.htwlWasteOperateReportOuterList && datas.htwlWasteOperateReportOuterList.length">
            <div class="info-title">外单位利用处置信息</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteOperateReportOuterList">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="isInner" label="是否系统注册单位"> </el-table-column>
                <el-table-column prop="entrustEpName" label="委托单位名称"> </el-table-column>
                <el-table-column prop="entrustEpProvinceCode" label="省份代码"> </el-table-column>
                <el-table-column prop="entrustEpLicenceCode" label="经营许可"> </el-table-column>
                <el-table-column prop="entrustLinkman" label="联系人"> </el-table-column>
                <el-table-column prop="entrustLinkmanPhone" label="联系人手机"> </el-table-column>
                <el-table-column prop="wasteCode" label="危物代码"> </el-table-column>
                <el-table-column prop="dealWayName" label="处置方式"> </el-table-column>
                <el-table-column prop="transOutCount" label="利用/处置量"> </el-table-column>
                <el-table-column prop="caculUnit" label="单位"> </el-table-column>
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
      self.$api.mbQueryApi.WeiFeiReportMonthDetail(self.objectId)
      .then((resp => {
          if (!resp.htwlWasteOperateReportOuterList) return false
          resp.htwlWasteOperateReportOuterList.map(ele=>{
            ele.isInner=ele.isInner==='0'?'是':'否'
          })
          if(resp.htwlWasteOperateYearReport && resp.htwlWasteOperateYearReport.zeroWaste===0){
            resp.htwlWasteOperateYearReport.zeroWaste='否'
          }else if (resp.htwlWasteOperateYearReport && resp.htwlWasteOperateYearReport.zeroWaste===1){
            resp.htwlWasteOperateYearReport.zeroWaste='是'}
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
      top: 10px;
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
