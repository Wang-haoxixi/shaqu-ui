<template>
  <div class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <el-button class="print-btn" type="primary" @click="print">打印</el-button>
    <el-card>
      <h3>{{huoMianDtail?huoMianDtail.typeName:''}}详情</h3>
      <div class="liandan jingxihuaHuoMian" v-if="huoMianDtail && huoMianDtail.typeName==='豁免精细化联单'">
        <div class="info-block">
          <div class="info-title">基本信息</div>
          <div class="info-content">
            <div class="info-item"><span class="required">*</span><span class="name">转移计划编号：</span><span>{{huoMianDtail && huoMianDtail.transcode}}</span></div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">联单编号：</span><span>{{huoMianDtail && huoMianDtail.singlecode}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">当前步骤：</span><span>{{huoMianDtail && huoMianDtail.singleFlowRemark}}</span></div>
            </div>
            <el-steps :active="active" finish-status="finish " class="mySteps">
              <el-step :title="item" v-for="(item,index) in liandanStatus" v-bind:key="index"></el-step>
            </el-steps>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">企业信息</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物产生企业名称：</span><span>{{huoMianDtail && huoMianDtail.wentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.wlinkphone}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">企业地址：</span><span>{{huoMianDtail && huoMianDtail.wentead}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">运输企业名称：</span><span>{{huoMianDtail && huoMianDtail.tentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.tlinkphone}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">企业地址：</span><span>{{huoMianDtail && huoMianDtail.tentead}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物经营单位：</span><span>{{huoMianDtail && huoMianDtail.dentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.dlinkphone}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">企业地址：</span><span>{{huoMianDtail && huoMianDtail.dentead}}</span></div>
            </div>
          </div>
      </div>
        <div class="info-block">
          <div class="info-title">转移信息</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">移出地区域：</span><span>{{huoMianDtail && huoMianDtail.ycd}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">移出地详细地址：</span><span>{{huoMianDtail && huoMianDtail.ycdxxdz}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">移入地区域：</span><span>{{huoMianDtail && huoMianDtail.yrd}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">移入地详细地址：</span><span>{{huoMianDtail && huoMianDtail.yrdxxdz}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 承运人：</span><span>{{huoMianDtail && huoMianDtail.ftname}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 车辆号牌 ：</span><span>{{huoMianDtail && huoMianDtail.ftcarcode}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 单位责任人：</span><span>{{huoMianDtail && huoMianDtail.recsign}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">  经营许可编号 ：</span><span>{{huoMianDtail && huoMianDtail.licenseName}}</span></div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">危废列表</div>
          <el-table :data="huoMianDtail&&huoMianDtail.singleWasteList">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="typename" label="危废种类"> </el-table-column>
            <el-table-column prop="damage" label="俗称"> </el-table-column>
            <el-table-column prop="wastecode" label="危废代码"> </el-table-column>
            <el-table-column prop="typecode" label="危废大类"> </el-table-column>
            <el-table-column prop="wastecount" label="危废数量"> </el-table-column>
            <el-table-column prop="unit" label="计量单位"> </el-table-column>
            <el-table-column prop="packing" label="包装形式"> </el-table-column>
            <el-table-column prop="dangerous" label="废物特性"> </el-table-column>
            <el-table-column prop="wastetypeName" label="处置方式"> </el-table-column>
            <el-table-column prop="state" label="形态"> </el-table-column>
            <el-table-column prop="measures" label="危险成分"> </el-table-column>
          </el-table>
          <div class="info-content">
            <div class="info-items guobang">
              <div class="info-item"><span class="required">*</span><span class="name"> 产废过磅危废重量(kg) ：</span><span>{{huoMianDtail && huoMianDtail.wasteWeightPro}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 处置过磅危废重量(kg)  ：</span><span>{{huoMianDtail && huoMianDtail.wasteWeightDispose}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 危废过磅重量差异(kg)  ：</span><span>{{huoMianDtail && huoMianDtail.weightDistance}}</span></div>
<!--              <el-button type="text" @click="dialogVisible = true">过磅数据</el-button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="liandan dianziHuoMian" v-if="huoMianDtail && huoMianDtail.typeName==='豁免电子联单'">
        <div class="info-block">
          <div class="info-title">基本信息</div>
          <div class="info-content">
            <div class="info-item"><span class="required">*</span><span class="name">联单编号：</span><span>{{huoMianDtail && huoMianDtail.singlecode}}</span></div>
            <div class="info-item"><span class="required">*</span><span class="name">转移计划编号：</span><span>{{huoMianDtail && huoMianDtail.transcode}}</span></div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">联单审批过程</div>
          <div class="info-content">
            <el-table border :data="wFDetailSPList">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="enterpriseName" label="填写企业"> </el-table-column>
              <el-table-column prop="enterpriseType" label="企业类型"> </el-table-column>
              <el-table-column prop="fillin_time" label="填写时间"> </el-table-column>
              <el-table-column prop="fillin_result" label="填写结果"> </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">危险废物产生企业填写</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物产生企业名称：</span><span>{{huoMianDtail && huoMianDtail.wentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址：</span><span>{{huoMianDtail && huoMianDtail.wentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{huoMianDtail && huoMianDtail.wlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.wlinkphone}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">运输企业名称：</span><span>{{huoMianDtail && huoMianDtail.tentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址：</span><span>{{huoMianDtail && huoMianDtail.tentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{huoMianDtail && huoMianDtail.tlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.tlinkphone}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name">危险废物经营单位：</span><span>{{huoMianDtail && huoMianDtail.dentename}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">通讯地址：</span><span>{{huoMianDtail && huoMianDtail.dentead}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系人：</span><span>{{huoMianDtail && huoMianDtail.dlinkman}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name">联系电话：</span><span>{{huoMianDtail && huoMianDtail.dlinkphone}}</span></div>
            </div>
          </div>
          <el-table border :data="huoMianDtail&&huoMianDtail.singleWasteList">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="typename" label="危废种类"> </el-table-column>
            <el-table-column prop="damage" label="俗称"> </el-table-column>
            <el-table-column prop="wastecode" label="危废代码"> </el-table-column>
            <el-table-column prop="typecode" label="危废大类"> </el-table-column>
            <el-table-column prop="wastecount" label="危废数量"> </el-table-column>
            <el-table-column prop="unit" label="计量单位"> </el-table-column>
            <el-table-column prop="packing" label="包装形式"> </el-table-column>
            <el-table-column prop="dangerous" label="废物特性"> </el-table-column>
            <el-table-column prop="state" label="形态"> </el-table-column>
            <el-table-column prop="wastetypeName" label="处置方式"> </el-table-column>
            <el-table-column prop="source" label="危险成分"> </el-table-column>
            <el-table-column prop="measures" label="禁忌与措施"> </el-table-column>
          </el-table>
        </div>
        <div class="info-block">
          <div class="info-title">运输企业填写</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 运输日期：</span><span>{{huoMianDtail && huoMianDtail.ftdate}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 车辆号牌 ：</span><span>{{huoMianDtail && huoMianDtail.ftcarcode}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 运输资质：</span><span>{{huoMianDtail && huoMianDtail.ftrodnum}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 运输资质有效期 ：</span><span>{{huoMianDtail && huoMianDtail.ftrodnumBegintime}} - {{huoMianDtail && huoMianDtail.ftrodnumEndtime}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 运输起点：</span><span>{{huoMianDtail && huoMianDtail.ftorigin}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 运输终点：</span><span>{{huoMianDtail && huoMianDtail.ftdestina}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 承运人：</span><span>{{huoMianDtail && huoMianDtail.ftname}}</span></div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">危险废物经营单位填写</div>
          <div class="info-content">
            <div>
              <div class="info-item"><span class="required">*</span><span class="name"> 经营许可证号：</span><span>{{huoMianDtail && huoMianDtail.licenseName}}</span></div>
            </div>
            <div class="info-items">
              <div class="info-item"><span class="required">*</span><span class="name"> 接收人：</span><span>{{huoMianDtail && huoMianDtail.recpeole}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 单位负责人：</span><span>{{huoMianDtail && huoMianDtail.recsign}}</span></div>
              <div class="info-item"><span class="required">*</span><span class="name"> 接收日期：</span><span>{{huoMianDtail && huoMianDtail.recdate}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="过磅数据信息" :visible.sync="dialogVisible" width="30%">
        <span>过磅数据</span>
      </el-dialog>
    </el-card>
    <!-- 打印的结构 -->
    <div id="ld_print" style="width: 700px;margin: 0 auto;display: none;">
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第一部分：废物产生单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 60%;display: inline-block;"><span>产生单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{huoMianDtail && huoMianDtail.wentename}}</span>单位盖章</span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.wlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.wentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.wpcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>运输单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.tentename}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.tlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.tentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.tpcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>接收单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.dentename}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.dlinkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.dentead}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.dpcode}}</span></span></div>
        </section>
      </div>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>危废种类：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{huoMianDtail && huoMianDtail.singleWasteList[0].typename}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>类别编号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.singleWasteList[0].typecode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>俗称：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{huoMianDtail && huoMianDtail.singleWasteList[0].damage}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>废物特性：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.singleWasteList[0].dangerous}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>形态：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.singleWasteList[0].state}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>数量：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{huoMianDtail && huoMianDtail.singleWasteList[0].wastecount}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>包装方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.singleWasteList[0].packing}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>外运目的：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.wymd}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>主要危险成分：<span style="border-bottom: 1px solid #000;display: inline-block;width: 83%">{{huoMianDtail && huoMianDtail.singleWasteList[0].measures}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>禁忌与应急措施：<span style="border-bottom: 1px solid #000;display: inline-block;width: 81%">{{huoMianDtail && huoMianDtail.singleWasteList[0].measures}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>发运人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{huoMianDtail && huoMianDtail.tlinkman}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>运达地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftdestina}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>转移时间：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftdate}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第二部分：废物运输单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>运输者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>运输公司：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{huoMianDtail && huoMianDtail.tentename}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>运输日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftdate}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 30%;display: inline-block;"><span>车（船）型：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%"></span></span></div>
          <div style="width: 35%;display: inline-block;"><span>牌号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftcarcode}}</span></span></div>
          <div style="width: 35%;display: inline-block;"><span>道路运输证号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 52%">{{huoMianDtail && huoMianDtail.ftrodnum}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输起点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{huoMianDtail && huoMianDtail.ftorigin}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>经由地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{huoMianDtail && huoMianDtail.viaground}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输终点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftdestina}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>运输人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{huoMianDtail && huoMianDtail.ftname}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第三部分：废物接收单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>接收者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 50%;display: inline-block;"><span>经营许可证号：<span style="border-bottom: 1px solid #000;display: inline-block;width:30%">{{huoMianDtail && huoMianDtail.licenseName}}</span>单位盖章</span></div>
          <div style="width: 20%;display: inline-block;"><span>接收人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{huoMianDtail && huoMianDtail.recpeole}}</span></span></div>
          <div style="width: 30%;display: inline-block;"><span>接收日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{huoMianDtail && huoMianDtail.recdate}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>废物处置方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 84%">{{huoMianDtail && huoMianDtail.disporttype}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>单位负责人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{huoMianDtail && huoMianDtail.recsign}}单位盖章</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 85%">{{huoMianDtail && huoMianDtail.recdate}}</span></span></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const { getLodop } = require('@/assets/CLodp/LodopFuncs2.js')
export default {
  name: 'WeiFeiHuoMianDetail',
  data(){
    return{
      objectId:'',
      huoMianDtail:null,
      wFDetailSPList:[],//审批流程
      active:3,
      dialogVisible:false,
      liandanStatus:['联单申领','运输确认','危废上车','联单运输','处置确认','联单办结']
    }
  },
  methods: {
    back() {
      history.go(-1);
    },
    initPage(){
      let self = this;
      self.$api.mbQueryApi.getWeiFeiHuoMianDetail(self.objectId)
      .then((resp => {
        self.huoMianDtail = resp;
        self.active = self.liandanStatus.indexOf(self.huoMianDtail.singleFlowRemark)+1
      }));
      self.$api.mbQueryApi.wFDetailSP(self.objectId,{isExemptSingle : true})
      .then((resp => {
        self.wFDetailSPList = resp;
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
          LODOP.ADD_PRINT_TEXT(34, 25, 600, 40, '重庆市危险废物转移联单（豁免专用）');
          LODOP.SET_PRINT_STYLE('FontSize', 12);
          LODOP.SET_PRINT_STYLE('Bold', 1);
          LODOP.ADD_PRINT_TEXT(74, 261, 70, 40, '编号：');
          // LODOP.ADD_PRINT_TEXT(74, 319, 180, 40, this.kuponoInfo.serialNumber);
          LODOP.ADD_PRINT_TEXT(74, 319, 180, 40, this.huoMianDtail.singlecode);
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
    this.objectId = this.$route.query.id;
    this.initPage();
  },
  mounted () {
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
    .back-btn {
      position: absolute;
      right: 70px;
      top: 110px;
      z-index: 99;
    }
    .print-btn {
      position: absolute;
      right: 140px;
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
