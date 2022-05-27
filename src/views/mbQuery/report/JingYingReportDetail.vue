<template>
  <el-card class="main-container" >
      <el-button class="back-btn" type="primary" @click="back">返回</el-button>
        <h3>危废经营年报详情</h3>
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
              <div class="info-item"><span class="name">填报年度:</span><span>{{datas.htwlWasteOperateYearReport.caculYear}}</span></div>
              <div class="info-item"><span class="name">单位名称:</span><span>{{datas.htwlWasteOperateYearReport.operateEpName}}</span></div>
              <div class="info-item"><span class="name">该年度危险废物经营量是否为零:</span><span>{{datas.htwlWasteOperateYearReport.zeroWaste}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">设施地址:</span><span>{{datas.htwlWasteOperateYearReport.facilityAddr}}</span></div>
              <div class="info-item"><span class="name">国民经济分类:</span><span>{{datas.htwlWasteOperateYearReport.entecategoryname}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">组织机构代码:</span><span>{{datas.htwlWasteOperateYearReport.orgCode}}</span></div>
              <div class="info-item"><span class="name">行政区划代码:</span><span>{{datas.htwlWasteOperateYearReport.divisionCode}}</span></div>
              <div class="info-item"><span class="name">企业类别:</span><span>{{datas.htwlWasteOperateYearReport.operateEpTypeName}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">法人:</span><span>{{datas.htwlWasteOperateYearReport.legalPerson}}</span></div>
              <div class="info-item"><span class="name">法人住所:</span><span>{{datas.htwlWasteOperateYearReport.legalPersonHome}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">联系人:</span><span>{{datas.htwlWasteOperateYearReport.linkman}}</span></div>
              <div class="info-item"><span class="name">联系人手机:</span><span>{{datas.htwlWasteOperateYearReport.phone}}</span></div>
              <div class="info-item"><span class="name">联系人座机:</span><span>{{datas.htwlWasteOperateYearReport.telephone}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">总产值(万元):</span><span>{{datas.htwlWasteOperateYearReport.total}}</span></div>
              <div class="info-item"><span class="name">职工人数:</span><span>{{datas.htwlWasteOperateYearReport.peopleNum}}</span></div>
              <div class="info-item"><span class="name">经度:</span><span>{{datas.htwlWasteOperateYearReport.lot}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">纬度:</span><span>{{datas.htwlWasteOperateYearReport.lat}}</span></div>
              <div class="info-item"><span class="name">经营许可证号:</span><span>{{datas.htwlWasteOperateYearReport.operateCardNo}}</span></div>
              <div class="info-item"><span class="name">发证机构:</span><span>{{datas.htwlWasteOperateYearReport.pubOrg}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">发证日期:</span><span>{{datas.htwlWasteOperateYearReport.pubDate}}</span></div>
              <div class="info-item"><span class="name">核准年经营收集规模(吨):</span><span>{{datas.htwlWasteOperateYearReport.operateWasteGatherScale}}</span></div>
              <div class="info-item"><span class="name">实际年经营收集规模(吨):</span><span>{{datas.htwlWasteOperateYearReport.factOperateWasteGatherScale}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">核准年经营利用规模(吨):</span><span>{{datas.htwlWasteOperateYearReport.operateUseScale}}</span></div>
              <div class="info-item"><span class="name">核准年经营处置规模-危废(吨):</span><span>{{datas.htwlWasteOperateYearReport.operateWasteDealScale}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">核准年经营规模-医废(吨):</span><span>{{datas.htwlWasteOperateYearReport.operateMedicalDealScale}}</span></div>
              <div class="info-item"><span class="name">以桶(个)计量核准量:</span><span>{{datas.htwlWasteOperateYearReport.caculBucket}}</span></div>
              <div class="info-item"><span class="name">实际年经营利用量(吨):</span><span>{{datas.htwlWasteOperateYearReport.factOperateUseScale}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="name">实际危险废物处置量(吨):</span><span>{{datas.htwlWasteOperateYearReport.factOperateWasteDealScale}}</span></div>
              <div class="info-item"><span class="name">实际医疗废物处置量(吨):</span><span>{{datas.htwlWasteOperateYearReport.factOperateMedicalDealScale}}</span></div>
              <div class="info-item"><span class="name">实际以桶(个)计量处置量:</span><span>{{datas.htwlWasteOperateYearReport.factCaculBucket}}</span></div>
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
              <el-table-column prop="described" label="描述"> </el-table-column>
              <el-table-column prop="caculUnitName" label="计量单位"> </el-table-column>
              <el-table-column prop="receiveCount" label="接收量"> </el-table-column>
              <el-table-column prop="preOwnCount" label="截止上年底贮存量"> </el-table-column>
              <el-table-column prop="thisOwnCount" label="截止本年底贮存量"> </el-table-column>
            </el-table>
          </div>
          <div v-if="datas.htwlWasteOperateReportInnerList.length">
            <div class="info-title">单位内部利用处置情况</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteOperateReportInnerList">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="wasteCode" label="危废代码"> </el-table-column>
                <el-table-column prop="wasteCode" label="危废名称"> </el-table-column>
                <el-table-column prop="facilityCode" label="利用/处置设施编号"> </el-table-column>
                <el-table-column prop="facilityName" label="利用/处置设施名称"> </el-table-column>
                <el-table-column prop="facilityScale" label="核准规模(吨/桶)"> </el-table-column>
                <el-table-column prop="count" label="利用/处置量"> </el-table-column>
                <el-table-column prop="landfillSite" label="填埋场容量(m³)"> </el-table-column>
                <el-table-column prop="landfilled" label="已填埋场容量(m³)"> </el-table-column>
                <el-table-column prop="caculUnitName" label="计量单位"> </el-table-column>
                <el-table-column prop="dealWayName" label="处置方式"> </el-table-column>
                </el-table>
            </div>
          </div>
          <div v-if="datas.htwlWasteOperateReportOuterList.length">
            <div class="info-title">外单位利用处置信息</div>
            <div class="info-content">
                <el-table border :data="datas.htwlWasteOperateReportOuterList">
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="isInner" label="是否系统注册单位"> </el-table-column>
                <el-table-column prop="entrustEpName" label="单位名称"> </el-table-column>
                <el-table-column prop="entrustEpLicenceCode" label="经营许可证编号"> </el-table-column>
                <el-table-column prop="entrustEpProvinceCode" label="行政区划代码"> </el-table-column>
                <el-table-column prop="entrustLinkman" label="联系人"> </el-table-column>
                <el-table-column prop="entrustLinkmanPhone" label="联系人手机"> </el-table-column>
                <el-table-column prop="wasteCode" label="危物代码"> </el-table-column>
                <el-table-column prop="wasteName" label="危物名称" width="300"> </el-table-column>
                <el-table-column prop="dealWayName" label="处置方式"> </el-table-column>
                <el-table-column prop="transOutCount" label="利用/处置量"> </el-table-column>
                <el-table-column prop="caculUnitName" label="单位" width="80"> </el-table-column>
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
      self.$api.mbQueryApi.jingYingReportDetail(self.objectId)
      .then((resp => {
          resp.htwlWasteOperateReportOuterList.map(ele=>{
              ele.isInner=ele.isInner==='0'?'是':'否'
          })
          if(resp.htwlWasteOperateYearReport.zeroWaste===0){
            resp.htwlWasteOperateYearReport.zeroWaste='否'
          }else if (resp.htwlWasteOperateYearReport.zeroWaste===1){
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