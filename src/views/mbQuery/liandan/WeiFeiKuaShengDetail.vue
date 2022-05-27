<template>
  <div class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <el-button class="print-btn" type="primary" @click="print">打印</el-button>
    <el-card>
      <h3>跨省移出详情</h3>
      <div class="liandan">
        <div class="info-block">
          <div class="info-title">联单基本信息</div>
          <div class="info-content">
            <div class="info-item"><span class="name">联单编号：</span><span>{{kuaShengDtail && kuaShengDtail.singlecode}}</span></div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">审核意见</div>
          <el-table border :data="kuaShengDtail&&kuaShengDtail.auditList">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="auditingTime" label="审批时间"> </el-table-column>
            <el-table-column prop="auditing" label="审批意见"> </el-table-column>
            <el-table-column prop="auditingUser" label="处理人"> </el-table-column>
            <el-table-column prop="transStatusName" label="状态"> </el-table-column>
          </el-table>
        </div>
        <div class="info-block">
          <div class="info-title">选择跨省移出计划</div>
          <div class="info-content">
            <div class="info-item" style="margin-bottom: 15px"><span class="required">*</span><span class="name">联单所属计划：</span><span>{{kuaShengDtail && kuaShengDtail.transcode}} 开始时间：{{kuaShengDtail && kuaShengDtail.bbgtime}} /结束时间：{{kuaShengDtail && kuaShengDtail.bendtime}}</span></div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物产生企业：</span><span>{{kuaShengDtail && kuaShengDtail.wentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址 ：</span><span>{{kuaShengDtail && kuaShengDtail.wentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{kuaShengDtail && kuaShengDtail.wlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{kuaShengDtail && kuaShengDtail.wlinkphone}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">运输企业 ：</span><span>{{kuaShengDtail && kuaShengDtail.tentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址 ：</span><span>{{kuaShengDtail && kuaShengDtail.tentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{kuaShengDtail && kuaShengDtail.tlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{kuaShengDtail && kuaShengDtail.tlinkphone}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物经营单位：</span><span>{{kuaShengDtail && kuaShengDtail.dentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址 ：</span><span>{{kuaShengDtail && kuaShengDtail.dentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{kuaShengDtail && kuaShengDtail.dlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{kuaShengDtail && kuaShengDtail.dlinkphone}}</span></div>
            </div>
          </div>
        </div>
        <div class="info-block" style="display: none">
          <div class="info-title">资质附件信息</div>
          <el-table border :data="kuaShengDtail&&kuaShengDtail.attachmentList">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="附件名称"> </el-table-column>
            <el-table-column prop="fileType" label="附件类型"> </el-table-column>
            <el-table-column prop="relationTypeName" label="附件状态"> </el-table-column>
          </el-table>
        </div>
        <div class="info-block">
          <div class="info-title">转移危废信息</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危废移出时间：</span><span>{{kuaShengDtail && kuaShengDtail.preTime}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">危废经营许可证号 ：</span><span>{{kuaShengDtail && kuaShengDtail.licenseName}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">危废接收时间：</span><span>{{kuaShengDtail && kuaShengDtail.recDate}}</span></div>
            </div>
            <div class="info-item warming"><span class="required">*</span>注意：一联单一危废</div>
            <el-table border :data="kuaShengDtail&&kuaShengDtail.singleWasteList">
              <el-table-column prop="typename" label="危废种类（类别）" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="damage" label="危废俗称" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="wastename" label="危险废物"> </el-table-column>
              <el-table-column prop="trade" label="行业来源" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="wastecode" label="危废代码"> </el-table-column>
              <el-table-column prop="typecode" label="危废大类" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="wastecount" label="危废数量"> </el-table-column>
              <el-table-column prop="unit" label="计量单位"> </el-table-column>
              <el-table-column prop="packing" label="包装形式" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="wastetype" label="处置方式"> </el-table-column>
              <el-table-column prop="state" label="形态" v-if="kuaShengDtail.isIn !== '1'"> </el-table-column>
              <el-table-column prop="dangerous" label="废物特性" v-if="kuaShengDtail.isIn !== 'CROSS_SINGLE_OUT_07'"> </el-table-column>
              <el-table-column prop="measures" label="禁忌" v-if="kuaShengDtail.isIn !== 'CROSS_SINGLE_OUT_07'"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-card>
     <!-- 打印的结构 -->
    <div id="ld_print" style="width: 700px;margin: 0 auto;display: none;">
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第一部分：废物产生单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 60%;display: inline-block;"><span>产生单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{kuaShengDtail && kuaShengDtail.wentename}}</span>单位盖章</span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.wlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.wentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.wpcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>运输单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.tentename}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.tlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.tentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.tpcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>接收单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.dentename}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.dlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.dentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.dpcode}}</span></span></div>
        </section>
      </div>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>危废种类：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].typename}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>类别编号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].typecode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>俗称：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].damage}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>废物特性：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].dangerous}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>形态：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].state}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>数量：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].wastecount}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>包装方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].packing}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>外运目的：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.wymd}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>主要危险成分：<span style="border-bottom: 1px solid #000;display: inline-block;width: 83%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].measures}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>禁忌与应急措施：<span style="border-bottom: 1px solid #000;display: inline-block;width: 81%">{{kuaShengDtail && kuaShengDtail.singleWasteList && kuaShengDtail.singleWasteList[0].measures}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>发运人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{kuaShengDtail && kuaShengDtail.tlinkman}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>运达地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftdestina}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>转移时间：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftdate}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第二部分：废物运输单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>运输者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>运输公司：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{kuaShengDtail && kuaShengDtail.tentename}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>运输日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftdate}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 30%;display: inline-block;"><span>车（船）型：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%"></span></span></div>
          <div style="width: 35%;display: inline-block;"><span>牌号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftcarcode}}</span></span></div>
          <div style="width: 35%;display: inline-block;"><span>道路运输证号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 52%">{{kuaShengDtail && kuaShengDtail.ftrodnum}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输起点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{kuaShengDtail && kuaShengDtail.ftorigin}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>经由地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{kuaShengDtail && kuaShengDtail.viaground}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输终点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftdestina}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>运输人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{kuaShengDtail && kuaShengDtail.ftname}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第三部分：废物接收单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>接收者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 50%;display: inline-block;"><span>经营许可证号：<span style="border-bottom: 1px solid #000;display: inline-block;width:30%">{{kuaShengDtail && kuaShengDtail.licenseName}}</span>单位盖章</span></div>
          <div style="width: 20%;display: inline-block;"><span>接收人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{kuaShengDtail && kuaShengDtail.recpeole}}</span></span></div>
          <div style="width: 30%;display: inline-block;"><span>接收日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{kuaShengDtail && kuaShengDtail.recdate}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>废物处置方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 84%">{{kuaShengDtail && kuaShengDtail.disporttype}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>单位负责人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 20%">{{kuaShengDtail && kuaShengDtail.recsign}}</span>单位盖章</span></div>
          <div style="width: 50%;display: inline-block;"><span>日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 85%">{{kuaShengDtail && kuaShengDtail.recdate}}</span></span></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const { getLodop } = require('@/assets/CLodp/LodopFuncs2.js')
export default {
  name: 'WeiFeiKuaShengDetail',
  data(){
    return {
      singleCode:'',
      kuaShengDtail:{},
    }
  },
  methods:{
    back() {
      history.go(-1);
    },
    initPage() {
      let self = this;
      self.$api.mbQueryApi.wFKuaShengListDtail(self.singleCode)
        .then((resp => {
          self.kuaShengDtail = resp;
        }));
    },
    
    print() {
        const LODOP = getLodop();
        LODOP.PRINT_INIT('转移联单打印');
        // LODOP.SET_PREVIEW_WINDOW(1, 0, 0, '90%', '90%', ''); // 预览窗口
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4'); // 打印设置
        const strBodyStyle = '<style>p{margin: 0;padding: 4px;}' +
          '.ld-block{border: 1px solid #000;width: 100%;}' +
          '.ld-table{margin-bottom:12px,border-collapse:collapse;} .ld-table td{border: 1px solid #000;padding: 4px;} .ld-table tr+tr td{border-top: none} .ld-table td+td{border-left: none;} ' +
          '.ld-title{font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;}' +
          '.ld-content{padding: 5px 5px 8px 5px;}' +
          '.ld-content p{line-height: 22px;} .ld-content .item1{display: flex;justify-content:space-between;padding-right: 8%}' + 
          '.margon_top {margin-top: 10px;}' +
          '</style>';
        // tslint:disable-next-line:max-line-length
        // '.content input{border-color: #000;border-style: solid;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 1px;border-left-width: 0px}</style>';
        const strFormHtml = strBodyStyle + '<body>' + document.getElementById('ld_print').innerHTML + '</body>';
        for (let j = 1; j <= 1; j++) {
          LODOP.NEWPAGEA();  // 强制分页
          LODOP.SET_PRINT_STYLE('FontSize', 22);
          LODOP.SET_PRINT_STYLE('Bold', 1);
          LODOP.ADD_PRINT_TEXT(34, 25, 600, 40, '重庆市危险废物转移联单（跨省专用）');
          LODOP.SET_PRINT_STYLE('FontSize', 12);
          LODOP.SET_PRINT_STYLE('Bold', 1);
          LODOP.ADD_PRINT_TEXT(74, 419, 70, 40, '编号：');
          // LODOP.ADD_PRINT_TEXT(74, 319, 180, 40, this.kuponoInfo.serialNumber);
          LODOP.ADD_PRINT_TEXT(74, 459, 180, 40, this.kuaShengDtail.singlecode);
          LODOP.SET_PRINT_STYLEA(0, 'TextFrame', 8);
          // LODOP.ADD_PRINT_TEXT(78, 682, 70, 40, '第' + j + '联');
          LODOP.ADD_PRINT_BARCODE(27, 679, 55, 55, 'QRCode',  9528);
          LODOP.ADD_PRINT_HTML(95, 25, '94%', 'BottomMargin:0.9cm', strFormHtml);
        }
        // LODOP.PRINT_DESIGN();  // 预览
        LODOP.PREVIEW();  // 预览
      }
  },
  created() {
    this.singleCode = this.$route.query.id;
    this.initPage();
  }
};
</script>

<style scoped lang="less">
  .main-container {
    /deep/ .el-table  {
  font-size:14px ;
}
    height: calc(100vh - 105px);
    overflow-y: auto;
    .print-btn {
      position: absolute;
      right: 140px;
      top: 110px;
      z-index: 99;
    }
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
    .liandan{
      .info-block{
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
            &.warming{
              font-weight: bold;
              margin: 15px 0;
              color: red;
              .required{
                margin-right: 8px;
              }
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
    }
  }
</style>
