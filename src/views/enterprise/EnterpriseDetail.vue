<template>
    <el-card  class="main-container">
    <el-button class="back-btn" type="primary" @click="back">返回</el-button>
      <h3 class="top-titles">企业信息</h3>
      <div>
        <!--        <div class="ent-info-item">-->
        <!--          <div class="ent-info-name">所在区县:</div>-->
        <!--          <div class="ent-info-des">{{ enterpriseInfo.division || "-" }}</div>-->
        <!--        </div>-->
        <div class="ent-info-item">
          <div class="ent-info-name">企业名称:</div>
          <div class="ent-info-des">{{ enterpriseInfo.name || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">镇街:</div>
          <div class="ent-info-des">{{ townStreetName }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">企业地址:</div>
          <div class="ent-info-des">{{ enterpriseInfo.address || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">企业类型:</div>
          <div class="ent-info-des">{{ enterpriseInfo.type || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">行业类别:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.entecategoryname || "-" }}
          </div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">企业性质:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.jlpIndustry || "-" }}
          </div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">性质细分:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.jlpIndustryExtend || "-" }}
          </div>
        </div>

        <div class="ent-info-item">
          <div class="ent-info-name">证件类型:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.identifitypeName || "-" }}
          </div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">证件编号:</div>
          <div class="ent-info-des">{{ enterpriseInfo.code || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">邮编:</div>
          <div class="ent-info-des">{{ enterpriseInfo.postcode || "-" }}</div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">法人:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.legal || "-" }}&nbsp;&nbsp;({{
              enterpriseInfo.legalphone || "-"
            }})
          </div>
        </div>

        <div class="ent-info-item">
          <div class="ent-info-name">联系人:</div>
          <div class="ent-info-des">
            {{ enterpriseInfo.linkman || "-" }}&nbsp;&nbsp;({{
              enterpriseInfo.linkphone || "-"
            }})
          </div>
        </div>
        <div v-if="enterpriseInfo.medPro">
          <div class="ent-info-item">
            <div class="ent-info-name">医疗卫生机构等级 :</div>
            <div class="ent-info-des">{{ enterpriseInfo.grade || "-" }}</div>
          </div>
          <div class="ent-info-item">
            <div class="ent-info-name">医疗卫生机构等次 :</div>
            <div class="ent-info-des">
              {{ enterpriseInfo.hierarchy || "-" }}
            </div>
          </div>
          <div class="ent-info-item">
            <div class="ent-info-name">医院类别 :</div>
            <div class="ent-info-des">
              {{ enterpriseInfo.hospitalCategory || "-" }}
            </div>
          </div>
          <div class="ent-info-item">
            <div class="ent-info-name">执业许可证编号 :</div>
            <div class="ent-info-des">
              {{ enterpriseInfo.licenseNumber || "-" }}
            </div>
          </div>
          <div class="ent-info-item">
            <div class="ent-info-name">床位数 :</div>
            <div class="ent-info-des">{{ enterpriseInfo.bedNum || "-" }}</div>
          </div>
        </div>
        <div class="ent-info-item">
          <div class="ent-info-name">账号使用状态:</div>
          <div class="ent-info-des">
            <el-switch
              v-model="entStatus"
              active-text="启用"
              inactive-text="停用"
              @change="changeEntStatus"
            >
            </el-switch>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <h3 style="margin: 25px 0">其它关联信息</h3>
      <el-tabs v-model="activeName" type="card" @tab-click="changeTab" >
        <el-tab-pane
          label="危废产生种类"
          name="cfzl"
          v-if="enterpriseInfo.jlpIndustry !== '经营单位'"
        >
          <el-table :data="fwzlData" class="cfzl_table">
            <el-table-column
              prop="orderId"
              width="100"
              label="序号"
            ></el-table-column>
            <el-table-column
              prop="wasteCode"
              label="废物代码"
            ></el-table-column>
            <el-table-column prop="wasteSc" label="废物俗称"></el-table-column>
            <el-table-column
              prop="wasteType"
              label="废物类别"
            ></el-table-column>
            <el-table-column
              prop="thisYearNum"
              label="本年度计划生产量(吨)"
            ></el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            v-if="pageInfo.total > 10"
            :current-page.sync="pageInfo.curPage"
            @current-change="handleCurrentChange"
            layout="total,prev,pager,next,jumper"
            :total="pageInfo.total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="经营范围" name="jyfw" v-else>
          <p v-show="!businessScope.length">暂无数据</p>
          <div v-for="(item, index) in businessScope" :key="index" class="jyfw">
            <div>
              <p>
                有效期限：<span
                  >&nbsp;&nbsp;{{ item.beginTime }}至{{ item.endTime }}</span
                >
              </p>
              <p>
                核准经营规模(吨)：<span
                  >&nbsp;&nbsp;{{ item.approvedScaleTon }}</span
                >
              </p>
              <p>
                核准经营规模(桶)：<span
                  >&nbsp;&nbsp;{{ item.approvedScaleBucket }}</span
                >
              </p>
            </div>
            <div class="right">
              <p>
                核准经营危废类别：<span
                  >&nbsp;&nbsp;{{ item.wasteCategory }}</span
                >
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="企业变更信息"
          name="first"
          v-if="alterationHistory.length"
        >
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in alterationHistory"
              v-bind:key="index"
              :timestamp="index === 0 ? '' : item.auditTime"
              placement="top"
            >
              <el-card>
                <div v-if="index !== 0">
                  <h4>信息变更</h4>
                  <p>发起变更于 {{ item.updatetime }}</p>
                </div>
                <div v-else>
                  <h4>初始数据</h4>
                </div>
                <el-table :data="getData(index)" class="my-table">
                  <el-table-column prop="division" label="所在区域">
                  </el-table-column>
                  <el-table-column label="注册类型">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.typeAlert }">{{
                        scope.row.type
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="企业名称">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.nameAlert }">{{
                        scope.row.name
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="lnsize" label="企业规模">
                  </el-table-column>
                  <el-table-column label="证件编号">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.codeAlert }">{{
                        scope.row.code
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮编">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.postcodeAlert }">{{
                        scope.row.postcode
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="法人">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.legalAlert }">{{
                        scope.row.legal
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="法人电话">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.legalphoneAlert }">{{
                        scope.row.legalphone
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="联系人">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.linkmanAlert }">{{
                        scope.row.linkman
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="联系电话">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.linkphoneAlert }">{{
                        scope.row.linkphone
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位地址">
                    <template slot-scope="scope">
                      <span :class="{ biangeng: item.addressAlert }">{{
                        scope.row.address
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="longitude" label="经度">
                  </el-table-column>
                  <el-table-column prop="latitude" label="纬度">
                  </el-table-column>
                </el-table>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane
          label="企业运营证信息"
          v-if="enterpriseInfo.wfTrans"
          name="second"
        >
          <el-table :data="transportationCertificateList">
            <el-table-column prop="code" label="证件编号"> </el-table-column>
            <el-table-column prop="begintime" label="有效起始日">
            </el-table-column>
            <el-table-column prop="endtime" label="有效结束日">
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="运输车辆与人员证件信息"
          v-if="enterpriseInfo.wfTrans"
          name="third"
        >
          <h4>运输车辆信息</h4>
          <el-table :data="vehicleList" border>
            <el-table-column prop="carcode" label="车牌号码"> </el-table-column>
            <el-table-column prop="type" label="车辆类型"> </el-table-column>
            <el-table-column prop="curbweight" label="空车重量(吨)">
            </el-table-column>
            <el-table-column prop="loadweight" label="核载重量(吨)">
            </el-table-column>
            <el-table-column prop="responsible" label="车辆责任人">
            </el-table-column>
          </el-table>
          <el-divider></el-divider>
          <h4>运输人员信息</h4>
          <el-table :data="haulierList" border>
            <el-table-column prop="name" label="承运人"> </el-table-column>
            <el-table-column prop="code" label="证件编号"> </el-table-column>
            <el-table-column prop="telephone" label="联系方式">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="处置合同与转移实施方案"
          v-if="!enterpriseInfo.wfTrans"
          name="fourth"
        >
          <h4>处置合同</h4>
          <el-table :data="contractList">
            <el-table-column
              prop="disposalEnterpriseName"
              label="危险废物经营单位"
            >
            </el-table-column>
            <el-table-column prop="programName" label="处置合同名称">
            </el-table-column>
            <el-table-column prop="effectiveTimeBegin" label="开始时间">
            </el-table-column>
            <el-table-column prop="effectiveTimeEnd" label="结束时间">
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
          <h4>转移实施方案</h4>
          <el-table :data="programList">
            <el-table-column
              prop="disposalEnterpriseName"
              label="危险废物经营单位"
            >
            </el-table-column>
            <el-table-column prop="programName" label="转移实施方案名称">
            </el-table-column>
            <el-table-column prop="effectiveTimeBegin" label="开始时间">
            </el-table-column>
            <el-table-column prop="effectiveTimeEnd" label="结束时间">
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="生产设施设备登记"
          v-if="!enterpriseInfo.wfTrans"
          name="five"
        >
          <h4>生产设施设备登记</h4>
          <el-table :data="productionList" border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="productDevice" label="生产设施设备名称">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
          </el-table>
          <h4>贮存设施登记</h4>
          <el-table :data="temporaryWarehouseList">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="贮存设施名称">
            </el-table-column>
            <el-table-column prop="remark" label="贮存设施描述">
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
          <h4>利用/处置设施设备登记</h4>
          <el-table :data="utilizeDisposalList" border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="利用/处置设施设备名称">
            </el-table-column>
            <el-table-column prop="address" label="利用/处置设施设备地址">
            </el-table-column>
            <el-table-column prop="typeName" label="利用/处置设施设备类别">
            </el-table-column>
            <el-table-column prop="totalInvestment" label="总投资（万元）">
            </el-table-column>
            <el-table-column prop="designAbility" label="设计能力（吨/年）">
            </el-table-column>
            <el-table-column prop="designUserYear" label="使用年限">
            </el-table-column>
            <el-table-column prop="workTime" label="投入运行时间">
            </el-table-column>
            <el-table-column prop="workCost" label="运行费用（元/年）">
            </el-table-column>
            <el-table-column
              prop="majorFacilityAndQuantity"
              label="主要设备及数量"
            >
            </el-table-column>
          </el-table>
          <h4>自行利用/处置设施设备登记</h4>
          <el-table :data="selfUtilizeDisposalList" border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="自行利用/处置设施设备名称">
            </el-table-column>
            <el-table-column prop="address" label="自行利用/处置设施设备地址">
            </el-table-column>
            <el-table-column prop="typeName" label="自行利用/处置设施设备类别">
            </el-table-column>
            <el-table-column prop="totalInvestment" label="总投资（万元）">
            </el-table-column>
            <el-table-column prop="designAbility" label="设计能力（吨/年）">
            </el-table-column>
            <el-table-column prop="designUserYear" label="使用年限">
            </el-table-column>
            <el-table-column prop="workTime" label="投入运行时间">
            </el-table-column>
            <el-table-column prop="workCost" label="运行费用（元/年）">
            </el-table-column>
            <el-table-column
              prop="majorFacilityAndQuantity"
              label="主要设备及数量"
            >
            </el-table-column>
          </el-table>
          <h4>转运桶登记</h4>
          <el-table :data="transferContainerList" border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="containerName" label="类别名称">
            </el-table-column>
            <el-table-column prop="containerCapacity" label="容量（升）">
            </el-table-column>
            <el-table-column prop="containerWeight" label="平均重量（千克）">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="现场监控视频"
          v-if="!enterpriseInfo.wfTrans && enterpriseInfo.video"
          name="six"
        >
          <div class="wrap">
            <video
              v-for="(item, index) in videoList"
              :key="index"
              :id="'video' + index"
              class="video-js vjs-default-skin video-wrap"
              controls
              preload="auto"
              muted
            >
              <source :src="item.preURL" type="application/x-mpegURL" />
            </video>
          </div>
        </el-tab-pane>
        <el-tab-pane
                label="企业申报信息"
                v-if="!enterpriseInfo.orderInfo"
                name="seven"
        >
        <div>
          <el-card style="margin: 15px" class="box-card">
            <div slot="header" class="clearfix">
              <span>转移联单信息</span>
            </div>
            <div>
              <div class="ent-info-item">
                <div class="ent-info-name">联单转移张数 :</div>
                <div class="ent-info-des">{{orderInfo.orderCount}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">联单转移重量（吨） :</div>
                <div class="ent-info-des">{{orderInfo.wasteCount}}</div>
              </div>
            </div>
          </el-card>
          <el-card style="margin: 15px" class="box-card">
            <div slot="header" class="clearfix">
              <span>管理计划填报信息</span>
            </div>
            <div >
              <div class="ent-info-item">
                <div class="ent-info-name">本年度管理计划是否填报 :</div>
                <div class="ent-info-des">{{orderInfo.managementPlan?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">本年度管理计划是否上传国家系统 :</div>
                <div class="ent-info-des">{{orderInfo.managementPlanNation?'是':'否'}}</div>
              </div>
            </div>
          </el-card>
          <el-card style="margin: 15px" class="box-card">
            <div slot="header" class="clearfix">
              <span>年报填报信息</span>
            </div>
            <div >
              <div class="ent-info-item">
                <div class="ent-info-name">上年度经营年报是否填报 :</div>
                <div class="ent-info-des">{{orderInfo.jyAnnualReport?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度经营年报是否上传国家系统 :</div>
                <div class="ent-info-des">{{orderInfo.jyAnnualReportNation?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度危废年报是否填报 :</div>
                <div class="ent-info-des">{{orderInfo.wfAnnualReport?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度危废年报是否上传国家系统 :</div>
                <div class="ent-info-des">{{orderInfo.wfAnnualReportNation?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度医废年报是否填报 :</div>
                <div class="ent-info-des">{{orderInfo.yfAnnualReport?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度医废年报是否上传国家系统 :</div>
                <div class="ent-info-des">{{orderInfo.yfAnnualReportNation?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度豁免年报是否填报 :</div>
                <div class="ent-info-des">{{orderInfo.hmAnnualReport?'是':'否'}}</div>
              </div>
              <div class="ent-info-item">
                <div class="ent-info-name">上年度豁免年报是否上传国家系统 :</div>
                <div class="ent-info-des">{{orderInfo.hmAnnualReportNation?'是':'否'}}</div>
              </div>
            </div>
          </el-card>
        </div>
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
      townStreetName: this.$route.query.townStreetName || "--",
      enterpriseInfo: {},
      orderInfo:{},
      alterationHistory: [],
      businessScope: [], //经营单位经营范围
      wastes: [], //产废范围
      fwzlData: [],
      transportationCertificateList: [],
      vehicleList: [],
      haulierList: [],
      contractList: [],
      programList: [],
      productionList: [],
      utilizeDisposalList: [],
      selfUtilizeDisposalList: [],
      transferContainerList: [],
      temporaryWarehouseList: [],
      videoData: [],
      videoList: [],
      entStatus: null,
      pageInfo: {
        total: 0,
        curPage: 0,
      },
    };
  },
  methods: {
    aHRow() {},
    tcfRow() {},
    getData(index) {
      let data_ = [];
      data_.push(this.alterationHistory[index]);
      return data_;
    },
    changeEntStatus(e) {
      if (e) {
        this.$api.enterpriseApi
          .ableEnt(this.$route.query.id)
          .then(() => {
            this.$Message.success("启用成功！");
          })
          .catch(() => {
            this.$Message.error("网络错误，请稍后再试！");
            this.entStatus = !this.entStatus;
          });
      } else {
        this.$api.enterpriseApi
          .disableEnt(this.$route.query.id)
          .then(() => {
            this.$Message.success("停用成功！");
          })
          .catch(() => {
            this.$Message.error("网络错误，请稍后再试！");
            this.entStatus = !this.entStatus;
          });
      }
    },
    handleCurrentChange(val) {
      let begin = (val - 1) * 10;
      let end = val * 10;
      this.pageInfo.curPage = val;
      let data = this.wastes.slice(begin, end);
      data.map((ele, index) => {
        ele.orderId = (val - 1) * 10 + index + 1;
      });
      this.fwzlData = data;
    },
    back() {
      history.go(-1);
    },
    creatCompare(propertyName) {
      return function (obj1, obj2) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    changeTab(e) {
      if (e.name === "six" && this.videoData.length===0) {
        this.palyVideo();
      }
    },
    palyVideo() {
      if (this.enterpriseInfo.video && this.videoList.length) {
        this.$nextTick(() => {
          this.videoList.map((item, index) => {
            let data = videojs(
              "video" + index,
              {
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: true,
                errorDisplay: false,
                controlBar: true,
              },
              function () {
                this.play();
              }
            );
            this.videoData.push(data);
          });
        });
      }
    },
  },
  created() {
    this.$api.enterpriseApi
      .getEnterpriseDetail({ id: this.$route.query.id })
      .then((resp) => {
        this.enterpriseInfo = resp.enterprise;
        this.orderInfo = resp.orderInfo;
        this.alterationHistory = resp.alterationHistory;
        this.businessScope = resp.businessScope;
        this.transportationCertificateList = resp.transportationCertificateList;
        this.vehicleList = resp.vehicleList;
        this.haulierList = resp.haulierList;
        this.contractList = resp.contractList?resp.contractList
          .sort(this.creatCompare("effectiveTimeEnd"))
          .reverse():'';
        this.programList = resp.programList?resp.programList
          .sort(this.creatCompare("effectiveTimeEnd"))
          .reverse():'';
        this.productionList = resp.productionList;
        this.utilizeDisposalList = resp.utilizeDisposalList;
        this.transferContainerList = resp.transferContainerList;
        this.selfUtilizeDisposalList = resp.selfUtilizeDisposalList;
        this.videoList = resp.videoList;
        this.wastes = resp.wastes;
        this.pageInfo.total = resp.wastes.length;
        this.entStatus = !resp.disable;
        if (this.wastes.length > 10) {
          this.fwzlData = resp.wastes.slice(0, 10);
        } else {
          this.fwzlData = resp.wastes;
        }
        this.fwzlData.map((ele, index) => {
          ele.orderId = index + 1;
        });
        if(resp.videoList.length){
          console.log(resp.videoList);
          resp.videoList.map((ele, index) => {
            console.log(ele);
          let data = {};
          data.cameraIndexCode = ele.playUrl;
          data.protocol = "hls";
          videoApi.getURL(data).then((res) => {
            ele.preURL = res.data.url;
          });
        });
        }

        this.temporaryWarehouseList = resp.temporaryWarehouseList.map(function (
          item
        ) {
          return {
            name: item.name,
            remark: item.remark,
            status: item.isDel ? "禁用" : "启用",
          };
        });

        if (resp.enterprise.jlpIndustry == "经营单位")
          this.activeName = "jyfw";
      });
  },
  mounted() {},
  beforeDestroy() {
    this.videoData.map(function (item) {
      item.dispose();
    });
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
    top: 110px;
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
  /deep/ .el-table  {
  font-size:14px ;
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
/deep/ .el-tabs__content{
    overflow: auto ;
  }
</style>
