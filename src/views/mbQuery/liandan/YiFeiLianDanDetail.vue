<template>
  <div class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
    <el-button class="print-btn" type="primary" @click="print">打印</el-button>
    <el-card>
      <h3>医废联单详情</h3>
      <div class="liandan jingxihuaLianDan">
        <div class="info-block">
          <div class="info-title">联单编号：</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item">
                <span class="required">*</span
                ><span class="name">联单编号：</span
                ><span>{{ lianDanDtail && lianDanDtail.serialNumber }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">确认过程：</div>
          <div class="info-content">
            <el-table :data="processTable" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="发起单位"
                width="180"
              ></el-table-column>
              <el-table-column prop="enterpriseType" label="单位性质">
              </el-table-column>
              <el-table-column prop="handleUser" label="经办人">
              </el-table-column>
              <el-table-column prop="handleTime" label="发起时间">
              </el-table-column>
              <el-table-column prop="state" label="填报状态"> </el-table-column>
              <el-table-column prop="opinion" label="确认意见">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="info-block">
          <div class="info-title">单位信息</div>
          <div class="info-content">
            <div
              class="info-items"
              v-for="(item, index) in organInfoList"
              :key="index"
              style="border-bottom: 1px dashed #ccc; padding: 10px 0"
            >
              <div class="info-item">
                <span class="name">{{ item.organTitle }}：</span
                ><span>{{ item.name }}</span>
              </div>
              <div class="info-item">
                <span class="name">联系人：</span
                ><span>{{ item.linkman }}</span>
              </div>
              <div class="info-item">
                <span class="name">联系电话：</span
                ><span>{{ item.linkphone }}</span>
              </div>
              <div class="info-item">
                <span class="name">详细地址：</span><span>{{ item.addr }}</span>
              </div>
              <div class="info-item">
                <span class="name">邮政编码：</span
                ><span>{{ item.postcode }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="info-block">
          <div class="info-title">
            <span style="margin-right: 20px">医疗废物信息</span
            ><el-button
              type="primary"
              v-if="kuponoType == '1'"
              @click="feiwuxiangqing = true"
              >废物详情</el-button
            ><el-button
              type="primary"
              v-if="kuponoType == '1'"
              @click="guobangxiangqing = true"
              >过磅详情</el-button
            >
          </div>
          <div class="info-content">
            <div style="margin: 10px">
              <span>医废交接时间：</span>{{ transferTime }}
            </div>
            <el-table :data="wasteTable" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="wasteName"
                label="医疗废物"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="wasteCode"
                label="医疗废物代码"
                width="150"
              >
              </el-table-column>
              <el-table-column prop="cartonNumber" label="箱数" width="100">
              </el-table-column>
              <el-table-column prop="weight" label="重量" width="100">
              </el-table-column>
              <el-table-column prop="unitName" label="单位" width="100">
              </el-table-column>
              <el-table-column prop="package" label="包装形式" width="100">
              </el-table-column>
              <el-table-column prop="form" label="废物形态" width="180">
              </el-table-column>
              <el-table-column prop="measure" label="禁忌与应急措施">
              </el-table-column>
              <el-table-column
                prop="disposalMethod"
                label="处置方式"
                width="180"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="info-block">
          <div class="info-title">
            <span style="margin-right: 20px">运输信息</span
            ><el-button
              type="primary"
              v-if="kuponoType == '1'"
              @click="yunshuguiji = true"
              >运输轨迹详情</el-button
            >
          </div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item">
                <span class="name">企业运营证：</span>
                <span>{{ transInfo.license }}</span>
              </div>
              <div class="info-item">
                <span class="name">运输车辆：</span>
                <span>{{ transInfo.vehicle }}</span>
              </div>
              <div class="info-item">
                <span class="name">车辆责任人：</span>
                <span>{{ transInfo.owner }}</span>
              </div>
              <div class="info-item">
                <span class="name">运输人电话：</span>
                <span>{{ transInfo.phone }}</span>
              </div>
              <div class="info-item">
                <span class="name">运输人：</span>
                <span>{{ transInfo.user }}</span>
              </div>
              <div class="info-item">
                <span class="name">经由地：</span>
                <span>{{ transInfo.through }}</span>
              </div>
              <div class="info-item">
                <span class="name">押输人：</span>
                <span>{{ transInfo.escort }}</span>
              </div>
              <div class="info-item">
                <span class="name">运输时间：</span>
                <span>{{ transInfo.transferTime }}</span>
              </div>
              <div class="info-item">
                <span class="name">运输起点：</span>
                <span>{{ transInfo.from }}</span>
              </div>
              <div class="info-item">
                <span class="name">运单号：</span>
                <span></span>
              </div>
              <div class="info-item">
                <span class="name">运输终点：</span>
                <span>{{ transInfo.end }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="info-block">
          <div class="info-title">接收信息</div>
          <div class="info-content">
            <div class="info-items">
              <div class="info-item">
                <span class="name">经营许可证：</span>
                <span>{{ receiveInfo.license }}</span>
              </div>
              <div class="info-item">
                <span class="name">接收人：</span>
                <span>{{ receiveInfo.recipients }}</span>
              </div>
              <div class="info-item">
                <span class="name">接收时间：</span>
                <span>{{ receiveInfo.disposalTime }}</span>
              </div>
              <div class="info-item">
                <span class="name">单位负责人：</span>
                <span>{{ receiveInfo.leader }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="废物详情" :visible.sync="feiwuxiangqing" width="30%">
      <div>
        <table border="0" class="wasteDetailTable" style="width: 100%">
          <tr>
            <th>废物名称</th>
            <th>废物代码</th>
            <th>废物重量</th>
            <th></th>
            <th></th>
          </tr>
          <div
            v-for="(item, index) in wasteDetailsList"
            :key="index"
            style="display: contents"
          >
            <tr>
              <td style="max-width: 80px">{{ item.wasteName }}</td>
              <td>{{ item.wasteCode }}</td>
              <td>{{ item.estimateWeight }}&nbsp;{{ item.unitName }}</td>
              <td></td>
              <td></td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd; height: 25px">
              <td></td>
              <td>流水号</td>
              <td>入库重量</td>
              <td>桶重</td>
              <td>运输计重</td>
            </tr>
            <tr v-for="(items, indexs) in item.pkg" :key="indexs">
              <td></td>
              <td>{{ items.uuid }}</td>
              <td>{{ items.weight }}</td>
              <td>{{ items.containerWeight }}</td>
              <td>{{ items.transWeight }}</td>
            </tr>
            <tr
              style="
                height: 50px;
                box-sizing: border-box;
                border-top: 1px solid #ddd;
              "
            >
              <td>小计</td>
              <td>{{ item.packageNum }}箱</td>
              <td>{{ item.weightAll }}&nbsp;{{ item.unitName }}</td>
              <td>{{ item.containerWeightAll }}&nbsp;{{ item.unitName }}</td>
              <td>{{ item.transWeightAll }}&nbsp;{{ item.unitName }}</td>
            </tr>
          </div>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="feiwuxiangqing = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="过磅详情" :visible.sync="guobangxiangqing" width="30%">
      <div>
        <div>载货过磅重量:{{ weignInfo.fullWeight }}&nbsp;KG</div>
        <div>空车过磅重量:{{ weignInfo.emptyWeight }}&nbsp;KG</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="guobangxiangqing = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="运输轨迹详情" :visible.sync="yunshuguiji" width="30%">
      <div>正在建设中……</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="yunshuguiji = false">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 打印的结构 -->
    <div id="ld_print" style="width: 700px;margin: 0 auto;display: none;">
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第一部分：废物产生单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 60%;display: inline-block;"><span>产生单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{lianDanDtail && lianDanDtail.enterprise.proEnterprise.name}}</span>单位盖章</span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.proEnterprise.linkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.enterprise.proEnterprise.addr}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.proEnterprise.postcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>运输单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.enterprise.transEnterprise.name}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.transEnterprise.linkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.enterprise.transEnterprise.addr}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.transEnterprise.postcode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>接收单位：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.enterprise.dealEnterprise.name}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>电话：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.dealEnterprise.linkphone}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 60%;display: inline-block;"><span>通讯地址：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.enterprise.dealEnterprise.addr}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>邮编：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.enterprise.dealEnterprise.postcode}}</span></span></div>
        </section>
      </div>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>危废种类：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].wasteName}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>类别编号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].wasteCode}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>俗称：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%"></span></span></div>
          <div style="width: 40%;display: inline-block;"><span>废物特性：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%"></span></span></div>
          <div style="width: 40%;display: inline-block;"><span>形态：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].form}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>数量：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{lianDanDtail && lianDanDtail.waste.packages.length && lianDanDtail.waste.packages[0].packageNum}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>包装方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].packaged}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>外运目的：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%"></span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>主要危险成分：<span style="border-bottom: 1px solid #000;display: inline-block;width: 83%"></span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>禁忌与应急措施：<span style="border-bottom: 1px solid #000;display: inline-block;width: 81%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].measure}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 20%;display: inline-block;"><span>发运人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.user}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>运达地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.endAddress}}</span></span></div>
          <div style="width: 40%;display: inline-block;"><span>转移时间：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.transferTime}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第二部分：废物运输单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>运输者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 59%;display: inline-block;"><span>运输公司：<span style="border-bottom: 1px solid #000;display: inline-block;width:40%">{{lianDanDtail && lianDanDtail.enterprise.transEnterprise.name}}</span>单位盖章</span></div>
          <div style="width: 41%;display: inline-block;"><span>运输日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.transferTime}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 30%;display: inline-block;"><span>车（船）型：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%"></span></span></div>
          <div style="width: 35%;display: inline-block;"><span>牌号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.vehicle}}</span></span></div>
          <div style="width: 35%;display: inline-block;"><span>道路运输证号：<span style="border-bottom: 1px solid #000;display: inline-block;width: 52%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.license}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输起点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.fromAddress}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>经由地：<span style="border-bottom: 1px solid #000;display: inline-block;width: 80%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.through}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>运输终点：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.endAddress}}</span></span></div>
          <div style="width: 50%;display: inline-block;"><span>运输人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 70%">{{lianDanDtail && lianDanDtail.trans && lianDanDtail.trans.base.user}}</span></span></div>
        </section>
      </div>
      <p style="font-size: 20px;font-weight: bold;padding: 7px;border: 1px;border-bottom: 2px solid #000;">第三部分：废物接收单位填写</p>
      <div style="width: 100%; overflow:hidden;padding: 10px; border: 1px solid #000;box-sizing: border-box;border-top: none;">
        <p>接收者须知：你必须核对以上栏目事项，当与实际情况不符时，有权拒绝接收。</p>
        <section class="item">
          <div style="width: 50%;display: inline-block;"><span>经营许可证号：<span style="border-bottom: 1px solid #000;display: inline-block;width:30%">{{lianDanDtail&& lianDanDtail.dispose.license}}</span>单位盖章</span></div>
          <div style="width: 20%;display: inline-block;"><span>接收人：<span style="border-bottom: 1px solid #000;display: inline-block;width: 50%">{{lianDanDtail&& lianDanDtail.dispose.recipients}}</span></span></div>
          <div style="width: 30%;display: inline-block;"><span>接收日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 60%">{{lianDanDtail&& lianDanDtail.dispose.disposalTime}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 100%;display: inline-block;"><span>废物处置方式：<span style="border-bottom: 1px solid #000;display: inline-block;width: 84%">{{lianDanDtail && lianDanDtail.waste.details && lianDanDtail.waste.details[0].disposalMethod}}</span></span></div>
        </section>
        <section class="item margon_top">
          <div style="width: 50%;display: inline-block;"><span>单位负责人签字：<span style="border-bottom: 1px solid #000;display: inline-block;width: 20%">{{lianDanDtail&& lianDanDtail.dispose.leader}}</span>单位盖章</span></div>
          <div style="width: 50%;display: inline-block;"><span>日期：<span style="border-bottom: 1px solid #000;display: inline-block;width: 85%">{{lianDanDtail&& lianDanDtail.dispose.disposalTime}}</span></span></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const { getLodop } = require('@/assets/CLodp/LodopFuncs2.js')
export default {
  name: "WeiFeiLianDanDetail",
  data() {
    return {
      feiwuxiangqing: false,
      guobangxiangqing: false,
      yunshuguiji: false,
      objectId: this.$route.query.id,
      lianDanDtail: null,
      wFDetailSPList: [],
      kuponoType: this.$route.query.kuponoType,
      active: 3,
      dialogVisible: false,
      liandanStatus: [
        "联单申领",
        "运输确认",
        "危废上车",
        "联单运输",
        "处置确认",
        "联单办结",
      ],
      organInfoList: [
        // 单位信息
        {
          organTitle: "医疗卫生机构",
          name: "",
          address: "",
          postcode: "",
          linkman: "",
          linkphone: "",
        },
        {
          organTitle: "医废运输企业",
          name: "",
          address: "",
          postcode: "",
          linkman: "",
          linkphone: "",
        },
        {
          organTitle: "医废处置企业",
          name: "",
          address: "",
          postcode: "",
          linkman: "",
          linkphone: "",
        },
      ],
      processTable: [],
      transInfo: {}, // 运输信息
      receiveInfo: {}, // 接收信息
      exceptionList: [], // 异常详情
      wasteTable: [],
      wasteDetailsList: [],
      weignInfo: {},
      fullImgLists: [],
      emptyImgList: [],
      transferTime: "",
      transferUser: "",
    };
  },
  methods: {
    back() {
      history.go(-1);
    },
    initPage() {
      this.$api.mbQueryApi
        .duplicateManagementInfo(this.objectId)
        .then((res) => {
          console.log(res);
          this.lianDanDtail = res;
          console.log('返回的联单信息：', res);
          let { record } = res;
          record.forEach((ele, index) => {
            ele.orderId = index + 1;
          });
          this.processTable = record;
          // 单位信息
          let { enterprise } = res;
          let { proEnterprise, dealEnterprise, transEnterprise } = enterprise;
          proEnterprise.organTitle = "医疗卫生机构";
          transEnterprise.organTitle = "医废运输企业";
          dealEnterprise.organTitle = "医废处置企业";
          this.organInfoList = [dealEnterprise, transEnterprise, proEnterprise];
          // 医疗废物信息
          let { waste } = res;
          let { details } = waste;
          this.wasteTable = details;
          // 运输信息
          let { trans } = res;
          this.transInfo = trans.base || {};
          // 接收信息
          let { dispose } = res;
          this.receiveInfo = dispose || {};
          // 废物详情
          this.wasteDetailsList = waste.packages;
          //过磅详情
          this.weignInfo = waste.weighing;
          // let fullImgLists = JSON.parse(waste.weighing.fullImg);
          // this.fullImgList = JSON.parse(JSON.stringify(fullImgLists));
          // if (Array.isArray(this.fullImgList) && this.fullImgList.length > 0) {
          //   this.fullImgList = this.fullImgList.map((item) => {
          //     return (item = downloadUrl + "?fileName=" + item);
          //   });
          // }

          // let emptyImgLists = JSON.parse(waste.weighing.emptyImg);
          // this.emptyImgList = JSON.parse(JSON.stringify(emptyImgLists));
          // if (
          //   Array.isArray(this.emptyImgList) &&
          //   this.emptyImgList.length > 0
          // ) {
          //   this.emptyImgList = this.emptyImgList.map((item) => {
          //     return (item = downloadUrl + "?fileName=" + item);
          //   });
          // }
          //运输轨迹详情
          // 医废转移时间
          this.transferTime = waste.medCarriageTime;
          this.transferUser = waste.medCarriageUser;
        });
    },
     print() {
      console.log(this.lianDanDtail, '----');
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
          LODOP.ADD_PRINT_TEXT(34, 25, 600, 40, '重庆市危险废物转移联单（医废专用）');
          LODOP.SET_PRINT_STYLE('FontSize', 12);
          LODOP.SET_PRINT_STYLE('Bold', 1);
          LODOP.ADD_PRINT_TEXT(74, 419, 70, 40, '编号：');
          // LODOP.ADD_PRINT_TEXT(74, 319, 180, 40, this.kuponoInfo.serialNumber);
          LODOP.ADD_PRINT_TEXT(74, 459, 180, 40, this.lianDanDtail.serialNumber);
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
    this.initPage();
  },
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
  
  .liandan {
    .info-block {
      .info-title {
        background: #d2eafb;
        padding: 8px;
        margin: 16px 0;
        border-left: 8px solid #108ee9;
      }
      .info-content {
        .info-items {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
          &.guobang {
            justify-content: space-between;
            margin: 24px 0;
          }
        }
        .info-item {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          height: 32px;
          line-height: 32px;
          min-width: 28%;
          margin-right: 32px;
          .required {
            color: red;
          }
          .name {
            margin: 0 8px;
          }
        }
        .mySteps {
          width: 90%;
          padding-right: 70px;
          margin: 15px 0 24px;
          /deep/ .el-step__title.is-process {
            color: #ccc;
          }
          /deep/ .el-step__head.is-process {
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
