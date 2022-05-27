<template>
  <el-row :gutter="24" class="wrap">
    <div>
      <template v-if="showIndex === 0">
        <el-card :class="['main-container',showEpTypeSub?'overflowAuto':'']">
          <!-- <span slot="header" class="top-titles">预警与异常</span> -->
          <span class="top-titles">企业信息</span>
          <div class="ep-type">
            <div>
              <div style="background-color:#fac22a;cursor: default;" class="infoBox"
              >
                <img src="../../assets/images/zongji.png" alt="" />
                <p>
              <span>{{ totalEpNum }}</span
              >合计
                </p>
              </div>
              <ul v-if="showEpTypeSub">
                <li :style="{ 'background-color': '#fac22a' }"
                    @click="(showEpTypeSub=false)"
                ><span>展开收起</span></li>
              </ul>
            </div>

            <div
                v-for="(item, index) in epType"
                :key="index"
            >
              <div :style="{ 'background-color': item.color }"
                   :class="['infoBox',item.name==='工业企业'?'new':'']"
                   @click="toEp(item)"
              >
                <img :src="require(`../../assets/images/${item.img}.png`)" alt="" />
                <p>
              <span>{{ item.number }}</span
              >{{ item.name }}
                </p>
                <ul v-if="item.name==='工业企业'" class="subBox">
                  <template v-for="(subItem,index) in item.subclass">
                    <li :key="index" v-if="index<3"
                        @click.stop="toEp(item,subItem)"
                    >
                      <span>{{subItem.name}} {{subItem.count}}</span>
                    </li>
                  </template>
                </ul>
              </div>
<!--              <ul v-show="showEpTypeSub">
                <template v-for="(subItem,index) in item.subclass">
                  <li :style="{ 'background-color': item.color }"
                      :key="index" v-if="index<3"
                      @click="toEp(item,subItem)"
                  >
                    <span>{{subItem.name}} {{subItem.number}}</span>
                  </li>
                </template>
              </ul>-->
            </div>
          </div>
          <el-row>
            <el-col :span="7">
              <span class="top-titles">预警与异常企业</span>
              <div class="left-top" style="cursor: pointer">
                <Gauge :chartData="alarmData" ref="chart1"></Gauge>
                <Gauge :chartData="alarmDeal" ref="chart2"></Gauge>
                <Gauge :chartData="alarmUndeal" ref="chart3"></Gauge>
              </div>
              <span class="top-titles">预警与异常企业排名</span>
              <div style="height: 40vh; overflow-y: auto">
                <el-table
                    :data="tableData"
                    :header-cell-style="{
                  'font-size': '14px',
                  height: '18px',
                  color: '#666',
                  'padding-top': '10px',
                }"
                    style="margin-left: 14px; width: 94%"
                >
                  <el-table-column prop="orderId" label="排名" width="50">
                  </el-table-column>
                  <el-table-column
                      prop="enterpriseName"
                      label="企业名称"
                      min-width="160"
                      show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div>
                        {{ scope.row.enterpriseName }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="streetName" label="所属镇街">
                  </el-table-column>
                  <el-table-column prop="count" label="报警数量">
                  </el-table-column>
                </el-table>
                <el-pagination
                    layout="total,prev,pager,next"
                    :current-page.sync="page"
                    @current-change="getTableData"
                    :total="total"
                    class="pagination_page1"
                ></el-pagination>
              </div>
            </el-col>
            <el-col :span="16" :offset="1">
              <span class="top-titles">危险废物总体转移情况</span>
              <div class="trans-content over_all">
                <el-card>
                  <strong style="color: #1890ff">{{
                      overAllData.allWeight
                    }}</strong>
                  <p>全区危废转移量(吨)</p>
                  <!-- <span>(涉及{{ overAllData.allCount }}家转移单位)</span> -->
                </el-card>
                <el-card>
                  <strong style="color: #1890ff">{{
                      overAllData.ksWeight
                    }}</strong>
                  <p>跨省危废转移量(吨)·{{ overAllData.kszb }}%</p>
                  <!-- <span>(涉及{{ overAllData.allCount }}家转移单位)</span> -->
                </el-card>
                <el-card>
                  <strong style="color: #ff585e">{{
                      overAllData.wfWeight
                    }}</strong>
                  <p>市内工业危废转移量(吨)·{{ overAllData.wfzb }}%</p>
                  <!-- <span>(涉及{{ overAllData.wfCount }}家转移单位)</span> -->
                </el-card>
                <el-card>
                  <strong style="color: #fe7e02">{{
                      overAllData.yfWeight
                    }}</strong>
                  <p>市内医废转移量(吨)·{{ overAllData.yfzb }}%</p>
                  <!-- <span>(涉及{{ overAllData.yfCount }}家转移单位)</span> -->
                </el-card>
              </div>
              <span class="top-titles">不同行业危险废物转移情况</span>
              <div class="trans-content">
                <div ref="pie" class="pie"></div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </template>
      <div v-if="showIndex === 1" class="secend">
        <el-card class="card">
          <div slot="header" class="top-titles">全区危险废物转移情况</div>
          <div ref="wfzy" class="secend_pie"></div>
          <el-table :data="wfzyTableData">
            <el-table-column
                type="index"
                label="排名"
                width="120"
            ></el-table-column>
            <el-table-column prop="code" label="大类"></el-table-column>
            <el-table-column prop="name" label="大类名称" min-width="180"></el-table-column>
            <el-table-column prop="count" label="转移量(吨)"></el-table-column>
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
        </el-card>
        <el-card class="card">
          <div slot="header" class="top-titles">全区医疗废物转移情况</div>
          <div ref="yfzy" class="secend_pie"></div>
          <el-table :data="yfzyData">
            <el-table-column
                type="index"
                label="排名"
                width="120"
            ></el-table-column>
            <el-table-column prop="code" label="代码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="count" label="转移量(吨)"></el-table-column>
          </el-table>
        </el-card>
      </div>
      <el-card class="last-container" v-if="showIndex === 2">
        <div slot="header">
        <span
            :class="form.type === 'wf' ? 'actived' : ''"
            @click="changeType('wf')"
        >危险废物</span
        >
          <span
              :class="form.type === 'wf' ? '' : 'actived'"
              @click="changeType('yf')"
          >医疗废物</span
          >
          <div class="tableTitle">{{currentEp.name}}</div>
        </div>
        <div ref="detailchart" class="detail-chart" v-if="showIndex === 2"></div>
        <el-button type="primary" @click="openEpData">加入企业</el-button>
        <el-button type="primary" @click="changeEPEchartDefault">全区数据</el-button>
        <div class="tableBox">
          <el-table :data="detailTable"
                    height="420"
                    @row-click="changeEPEchart"
                    @current-change="handleEPCurrent"
                    highlight-current-row
                    ref="epTable"
          >
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column
                prop="enterpriseName"
                label="企业名称"
            ></el-table-column>
            <el-table-column
                prop="enterpriseAddress"
                label="企业地址"
            ></el-table-column>
            <el-table-column
                prop="townStreetName"
                label="所属镇街"
            ></el-table-column>
            <el-table-column
                prop="operate"
                label="操作"
                width="100"
            >
              <template slot-scope="scope">
                <el-popconfirm
                    title="确认删除该企业吗？"
                    @confirm="deleteEP(scope)"
                >
                  <el-button type="text" slot="reference" @click.stop>删除</el-button>
                </el-popconfirm>
              </template>

            </el-table-column>

            <!--        <el-table-column
                      prop="currentWeight"
                      label="转移量(吨)"
                    ></el-table-column>-->
          </el-table>
        </div>

        <p class="alert">
          *注：列表默认展示当年1月数据，切换月份可查看其它月份数据
        </p>
      </el-card>
    </div>
    <div class="point">
      <div :class="showIndex == 0 ? 'current' : ''" @click="toHome"></div>
      <div :class="showIndex == 1 ? 'current' : ''" @click="toSec"></div>
      <div :class="showIndex == 2 ? 'current' : ''" @click="toDetail"></div>
    </div>
    <el-dialog
        title="添加企业"
        :visible.sync="showAddEP"
        width="30%"
        >
      <el-form :model="form">
        <el-form-item label="企业名称">
          <el-select v-model="selectEP" clearable placeholder="请选择企业" filterable
          :filter-method="getEPData"
          >
            <el-option
                v-for="item in epData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddEP = false">取 消</el-button>
        <el-button type="primary" @click="addEP">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import echarts from "echarts";
import {conds, exportBlobFile} from "@/utils/tools";
import Gauge from "@/components/Charts/gauge.vue";
export default {
  components: { Gauge },
  data() {
    return {
      pageInfo: {
        curPage: 0,
        total: 0,
      },
      alarmData: {
        max: "",
        data: "",
        title: "今日触发",
        color: "#fea20c",
        type: "",
      },
      alarmDeal: {
        max: "",
        data: "",
        title: "今日已处理",
        color: "#2191fe",
        type: "PROCESSED",
      },
      alarmUndeal: {
        max: "",
        data: "",
        title: "今日未处理",
        color: "#0353fe",
        type: "UNPROCESSED",
      },
      showGF: 1,
      epType: [
        { name: "工业企业", number: "", color: "#5addcd", img: "gongye",
          code:'JLP_ENTERPRISE_INDUSTRY_INDUSTRIAL',allname:'',
          subclass:[
              // {name:'铝灰',code:'',number:''},
              // {name:'废酸',code:'',number:''},
          ]},
        { name: "治理公司", number: "", color: "#52de7e", img: "huanbao",
          code:'JLP_ENTERPRISE_INDUSTRY_ENVIRONMENTAL',allname:'',
          subclass:[
          ]},
        { name: "加油气站", number: "", color: "#5e8fff", img: "jiayou",
          code:'JLP_ENTERPRISE_INDUSTRY_OILGAS',allname:'',
          subclass:[
          ]},
        { name: "汽修单位", number: "", color: "#a485ff", img: "qixiu",
          code:'JLP_ENTERPRISE_INDUSTRY_AUTOREPAIR',allname:'',
          subclass:[
          ]},
        { name: "医疗机构", number: "", color: "#5ed1f5", img: "yiliao",
          code:'JLP_ENTERPRISE_INDUSTRY_MEDICAL',allname:'',
          subclass:[
          ]},
        { name: "经营单位", number: "", color: "#40d1c5", img: "jingying",
          code:'JLP_ENTERPRISE_INDUSTRY_MANAGE',allname:'',
          subclass:[
          ]},
        { name: "其他单位", number: "", color: "#38a5ff", img: "qita",
          code:'JLP_ENTERPRISE_INDUSTRY_OTHER',allname:'',
          subclass:[
          ]},
      ],
      lineBarData: [],
      fwSummarize: [],
      pieName: [
        "工业企业",
        "治理公司",
        "加油加气站",
        "汽修单位",
        "医疗机构",
        "经营单位",
        "其他",
      ],
      pieData: [],
      totalCount: 0,
      indSummarize: "",
      page: 1,
      size: 10,
      total: null,
      tableData: [],
      lineBar: null,
      pie: null,
      showIndex: 0,
      detailData: {
        currentWeight: [],
        previousWeight: [],
        title: [],
      },
      form: {
        type: "wf",
        kind: "m",
        num: 1
      },
      currentEp:{
        objectId:'',
        name:'全区数据',
        row: {}
      },
      overAllData: {},
      activedName: "1月",
      detailchart: null,
      detailTable: "",
      wfzyCount: 0,
      wfzyData: [],
      wfzyPieData: [],
      wfzyTableData: [], //列表数据，前端分页
      yfzyCount: 0,
      yfzyData: [],
      yfzyPieData: [],
      totalEpNum: 0, //注册企业总数
      myDetailChart: undefined,
      showEpTypeSub: false,
      showAddEP: false,
      selectEP: '',
      epData:[],
    };
  },
  watch: {
    detailData: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.detailchart.setOption(newVal);
          } else {
            this.detailchart.setOption(oldVal);
          }
        } else {
          this.renderDetail();
        }
      },
      deep: true,
    },
  },
  methods: {
    toDetail() {
      this.showIndex = 2;
      this.$nextTick(() => {
        this.renderDetail();
      });
    },
    toSec() {
      this.showIndex = 1;
      this.$nextTick(() => {
        this.renderSecendPie("wfzy", this.wfzyPieData);
        this.renderSecendPie("yfzy", this.yfzyPieData);
      });
    },
    toHome() {
      this.showIndex = 0;
      if (this.myDetailChart) this.myDetailChart.dispose();
      this.$nextTick(() => {
        this.mountedPage1();
      });
    },
    //声明APP方法，勿删
    shengming() {
      this.$api.systemApi.changePsw
      this.$api.homeApi.getWasteDetail();
      this.$api.homeApi.getMonthData();
      this.$api.homeApi.getYearData();
    },
    handleCurrentChange(val) {
      let begin = (val - 1) * 10;
      let end = val * 10;
      this.pageInfo.curPage = val;
      let data = this.wfzyData.slice(begin, end);
      this.wfzyTableData = data;
    },
    //切换固废、医废显示
    changeShow(code) {
      this.showGF = code;
      this.lineBarData = code ? [...this.wfData] : [...this.yfData];
    },
    //第二屏数据
    getSecData() {
      this.$api.homeApi.getWasteTrans().then((res) => {
        this.wfzyData = res;
        this.pageInfo.total = res.length;
        if (res.length > 10) {
          this.wfzyTableData = res.slice(0, 10);
        } else {
          this.wfzyTableData = res;
        }
        let fiveData = res.slice(0, 5);
        fiveData.map((ele) => {
          this.wfzyPieData.push({
            name: ele.code,
            code: ele.name,
            value: ele.count,
            bfb: ele.ratio,
          });
        });

        let five = 0,
          fiveZb = 0,
          totalCount = 0;
        fiveData.map((ele) => {
          five = five + ele.count;
          fiveZb = fiveZb + ele.ratio;
        });
        res.map((ele) => {
          totalCount = totalCount + ele.count;
        });
        this.wfzyPieData.push({
          name: "其他",
          code: "其他",
          value: (totalCount - five).toFixed(2),
          bfb: (100 - fiveZb).toFixed(2),
        });
      });
      this.$api.homeApi.getMedTrans().then((res) => {
        this.yfzyData = res;
        res.map((ele) => {
          this.yfzyPieData.push({
            name: ele.code,
            code: ele.name,
            value: ele.count,
            bfb: ele.ratio,
          });
        });
      });
    },
    loadData() {
      this.$api.homeApi.getAlarmNum().then((res) => {
        this.alarmData.max =
          this.alarmData.data =
          this.alarmDeal.max =
          this.alarmUndeal.max =
            res.todayTrigger;
        this.alarmDeal.data = res.todayProcessed;
        this.alarmUndeal.data = res.todayUnprocessed;
      });
      this.$api.homeApi.getRegisterData().then((res) => {
        console.log('count===',res);
        let total = 0;
        this.epType.map((val) => {
          if(res[val.code]){
            val.number = res[val.code].count;
            val.allname = res[val.code].name;
            val.subclass = res[val.code].extendIndustry;
            total += val.number;
          }
        });
        this.totalEpNum = total;
      });
      this.$api.homeApi.getWasteOverall().then((res) => {
        let data = res;
        data.allCount = res.wfCount * 1 + res.yfCount * 1;
        data.allWeight = Math.round(res.wfWeight * 1 + res.yfWeight * 1 + res.ksWeight * 1);
        data.ksWeight = Math.round(res.ksWeight);
        data.wfWeight = Math.round(res.wfWeight);
        data.yfWeight = Math.round(res.yfWeight);
        data.wfzb = ((res.wfWeight / data.allWeight) * 100).toFixed(0);
        data.yfzb = ((res.yfWeight / data.allWeight) * 100).toFixed(0);
        data.kszb = 100 - data.wfzb - data.yfzb;
        this.overAllData = data;
      });
      this.$api.homeApi.getWasteIndustry().then((res) => {
        let count = 0;
        for (let j in res) {
          if (res[j].weight) {
            count += Number(res[j].weight);
          }
        }
        this.epType.map((ele, index) => {
          this.pieData.push({
            name: this.pieName[index],
            value: res[ele.img].weight,
            bfb: ((res[ele.img].weight / count) * 100).toFixed(2),
            count: res[ele.img].count,
          });
        });
        this.totalCount = count;
        this.indSummarize = res.summarize.split("。");
        this.indSummarize.length -= 1;
        this.renderPie();
      });
      this.getTableData();
      this.getDetailData();
      this.getDetailTable();
    },
    changeType(type) {
      this.form.type = type;
      this.form.num = 1;
      this.changeEPEchartDefault();
      this.getDetailTable();
    },

    changeKind() {
      this.form.num = 1;
      this.getDetailData();
      this.getDetailTable();
    },
    getDetailData() {
      if (this.form.kind === "m") {
        this.$api.homeApi
          .getMonthDetail({ type: this.form.type,objectId: this.currentEp.objectId})
          .then((res) => {
            this.detailData = {
              currentWeight: [],
              previousWeight: [],
              title: [],
            };
            res.forEach((ele) => {
              this.detailData.currentWeight.push(ele.currentWeight);
              this.detailData.previousWeight.push(ele.previousWeight);
              this.detailData.title.push(ele.title);
            });
          });
      } else {
        this.$api.homeApi.getDayDetail({ type: this.form.type }).then((res) => {
          this.detailData = {
            currentWeight: [],
            previousWeight: [],
            title: [],
          };
          res.forEach((ele) => {
            this.detailData.currentWeight.push(ele.currentWeight);
            this.detailData.previousWeight.push(ele.previousWeight);
            this.detailData.title.push(ele.title);
          });
        });
      }
    },
    getEPData(value) {
      let conditoions = conds.asConditionString(
          JSON.stringify(
              conds.and([
                conds.like("name", value),
                conds.eq("queryType", 'indexThird-'+this.form.type),
              ])
          )
      );
      this.$api.homeApi.getEnterprise({
        page: 0,
        size: 10,
        condition: conditoions,
      }).then((res) => {
        this.epData = res.content;
      });
    },
    getDetailTable() {
      this.$api.homeApi.getMonthOrDayDetail(this.form).then((res) => {
        this.detailTable = res;
      });
    },
    getTableData() {
      this.$api.homeApi
        .getAlarmList({
          page: this.page - 1,
          size: this.size,
        })
        .then((res) => {
          let { number, size } = res;
          this.page = number + 1;
          this.total = res.totalElements;
          res.content.map((ele, index) => {
            ele.orderId = number * size + index + 1;
          });
          this.tableData = res.content;
        });
    },
    renderSecendPie(refName, data) {
      let ref = this.$refs[refName];
      if (ref && ref !== undefined) {
        let myChart = this.$echarts.init(ref);
        let option = {
          // tooltip: {
          //   trigger: "item",
          //   formatter: "{b}: {c} ({d}%)",
          // },
          top: "2%",
          // bottom: 30,
          legend: {
            orient: "vertical",
            left: "40%",
            itemGap: 8,
            top: "4%",
            formatter: (name) => {
              let arr = "";
              option.series[0].data.map((val) => {
                if (val.name == name) {
                  // if(name.length>8){
                  //   name=`${name.slice(0,8)}\n${name.slice(8)}`
                  // }
                  arr = `{a|${val.name}}  ${val.code}  \n{a|转移：${val.value}吨}  占比：${val.bfb}%  `;
                }
              });
              return arr;
            },
            textStyle: {
              fontSize: 14,
              rich: {
                a: {
                  fontSize: 14,
                  width: 140,
                },
              },
            },
          },
          series: [
            {
              type: "pie",
              radius: ["60%", "80%"],
              center: ["22%", "48%"],
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
                textStyle: {
                  textBorderColor: "#fff",
                  textBorderWidth: 2,
                },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{a|{c}} \n {b|{b}(吨)}",
                  rich: {
                    a: {
                      fontSize: "36",
                  fontWeight: "bold",
                    },
                    b: {
                      fontSize: "18",
                  fontWeight: "bold",
                      color: "#444",
                    },
                  },
                },
              },
              labelLine: {
                show: false,
              },
              data: data,
              color: [
                // "#0018ff",
                "#0150f6",
                "#004eff",
                "#1889f5",
                "#19beff",
                "#0ccfe2",
                "#ffa20a",
              ],
            },
          ],
        };
        myChart.setOption(option);
        let index = 0; // 高亮索引
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: index,
          dataIndex: index,
        });
        myChart.on("mouseover", function (e) {
          if (e.dataIndex != index) {
            myChart.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: index,
            });
          }
        });
        myChart.on("mouseout", function (e) {
          index = e.dataIndex;
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          });
        });
      }
    },

    renderDetail() {
      let self = this;
      let ref = this.$refs.detailchart;
      if (ref && ref !== undefined) {
        self.myDetailChart = this.$echarts.init(ref);
        self.myDetailChart.off("click");
     /*   self.myDetailChart.on("click", function (params) {
          self.form.num = params.dataIndex + 1;
          self.activedName = params.name;
          self.getDetailTable();
          self.renderDetail();
        });*/
        self.myDetailChart.setOption({
          // barWidth: 60,
          color: ["#4fc7ff", "#5ddfd4"],
          tooltip: {
            trigger: "axis",
          },
          legend: {
            show: true,
            data: ["同比去年(吨)", "当月(吨)"],
          },
          xAxis: [
            {
              type: "category",
              data: this.detailData.title,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              name: "转移量(吨)",
              type: "value",
              min: 0,
            },
          ],
          series: [
            {
              name: "同比去年(吨)",
              type: "bar",
              data: this.detailData.previousWeight,
              itemStyle: {
                normal: {
                  color: function (params) {
                    var key = params.name;
                    if (key == self.activedName) {
                      return "#2d67ed";
                    }
                  },
                },
              },
            },
            {
              name: "当月(吨)",
              type: "bar",
              data: this.detailData.currentWeight,
              itemStyle: {
                normal: {
                  color: function (params) {
                    var key = params.name;
                    if (key == self.activedName) {
                      return "#39d4b9";
                    }
                  },
                },
              },
            },
          ],
        });
      }
    },
    renderPie() {
      let ref = this.$refs.pie;
      if (ref && ref !== undefined) {
        let myChart = this.$echarts.init(ref);
        let option = {
          // tooltip: {
          //   trigger: "item",
          //   formatter: "{b}: {c} ({d}%)",
          // },
          top: "14%",
          bottom: 30,
          legend: {
            orient: "vertical",
            left: "48%",
            itemGap: 16,
            top: "23%",
            formatter: (name) => {
              let arr = "";
              option.series[0].data.map((val) => {
                if (val.name == name) {
                  arr =
                    "{a|" +
                    val.name +
                    "}" +
                    "{b|转移：" +
                    val.value +
                    "吨}" +
                    "{c|占比：" +
                    val.bfb +
                    "%}" +
                    "    涉及" +
                    val.count +
                    "家单位";
                }
              });
              return arr;
            },
            textStyle: {
              fontSize: 16,
              rich: {
                a: {
                  fontSize: 16,
                  width: 90,
                },
                b: {
                  fontSize: 16,
                  width: 150,
                },
                c: {
                  fontSize: 14,
                  width: 90,
                },
              },
            },
          },
          series: [
            {
              type: "pie",
              radius: ["60%", "90%"],
              center: ["25%", "50%"],
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
                formatter: "{a|{c}}\n {b|{b}(吨)}",
                textStyle: {
                  // textBorderColor: "#fff",
                  // textBorderWidth:2
                  rich: {
                    a: {
                      fontSize: 36,
                      fontWeight: "bold",
                    },
                    b: {
                      fontSize: 18,
                      color: "#444",
                      fontWeight: "bold",
                    },
                  },
                },
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "36",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: this.pieData,
              color: [
                "#5addcd",
                "#52de7e",
                "#004eff",
                "#a485ff",
                "#5ed1f5",
                "#40d1c5",
                "#38a5ff",
              ],
            },
          ],
        };
        myChart.setOption(option);
        let index = 0; // 高亮索引
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: index,
          dataIndex: index,
        });
        myChart.on("mouseover", function (e) {
          if (e.dataIndex != index) {
            myChart.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: index,
            });
          }
        });
        myChart.on("mouseout", function (e) {
          index = e.dataIndex;
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          });
        });
      }
    },

    renderLineBar() {
      let option = {
        barWidth: 60,
        tooltip: {
          trigger: "axis",
        },
        grid: {
          bottom: 20,
          top: 30,
        },

        xAxis: [
          {
            type: "category",
            data: ["危废/医废转移量", "涉及转移企业数"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：吨",
            nameTextStyle: {
              color: "#222",
              fontSize: 14,
            },
            min: 0,
          },
          {
            type: "value",
            name: "单位：家",
            nameTextStyle: {
              color: "#222",
              fontSize: 14,
            },
            axisLine: {
              show: false,
            },
            min: 0,
          },
        ],
        series: [
          {
            name: "危废/医废转移量",
            type: "bar",
            // data: [this.lineBarData.wfWeight, this.lineBarData.yfWeight],
            data: [this.lineBarData[0], 0],
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "#0aba81",
                    "#fff",
                    // ["#f9d132", "#fff"],
                  ];
                  // var index = params.dataIndex;
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: colorList[0],
                    },
                    {
                      offset: 1,
                      color: colorList[1],
                    },
                  ]);
                },
              },
            },
          },
          {
            name: "涉及转移企业数",
            type: "bar",
            // data: [this.lineBarData.wfWeight, this.lineBarData.yfWeight],
            data: [0, this.lineBarData[1]],
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    // ["#0aba81", "#fff"],
                    "#f9d132",
                    "#fff",
                  ];
                  // var index = params.dataIndex;
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: colorList[0],
                    },
                    {
                      offset: 1,
                      color: colorList[1],
                    },
                  ]);
                },
              },
            },
          },
        ],
      };
      this.lineBar.setOption(option);
    },
    mountedPage1() {
      // this.lineBar = this.$echarts.init(this.$refs.lineBar);

      setTimeout(() => {
        this.$refs.chart1.initChart();
        this.$refs.chart2.initChart();
        this.$refs.chart3.initChart();
        // this.renderLineBar();
        this.renderPie();
      }, 500);
    },
    toEp(item,subItem){
      let query = {
        jlpIndustry: item.allname,
        jlpIndustryCode: item.code,
      };
      if (subItem) {
        query.jlpIndustryExtend = subItem.name
        query.jlpIndustryExtendCode = subItem.code
      }
      this.$router.push({
        path:'/enterprise/enterpriseList',
        query: query
      })
    },
    openEpData(){
      this.showAddEP = true;
      this.selectEP = '';
    },
    addEP(){
      this.showAddEP = false;
      this.$api.homeApi.addEP({
        type: this.form.type,
        id: this.selectEP,
      }).then((res) => {
        this.getDetailData();
        this.getDetailTable();
      });
    },
    deleteEP(data){
      this.$api.homeApi.deleteEP({
        type: this.form.type,
        id: data.row.objectId
      }).then((res) => {
        this.getDetailData();
        this.getDetailTable();
      });

    },
    changeEPEchartDefault(){
      this.currentEp.objectId = '';
      this.currentEp.name = '全区数据';
      this.$refs.epTable.setCurrentRow(null);
      this.getDetailData();
    },
    changeEPEchart(row, column, event){
      this.currentEp.objectId = row.objectId;
      this.currentEp.name = row.enterpriseName;
      this.$refs.epTable.setCurrentRow(row);
      this.getDetailData();
    },
    handleEPCurrent (val) {
      this.currentEp.row = val;
    }
  },
  created() {
    this.loadData();
    this.getSecData();
    this.getEPData('');
  },
  mounted() {
    this.mountedPage1();
  },
};
</script>
<style lang="less">
.last-container{
  .tableBox{
    .el-table__row{
      cursor: pointer;
    }
  }
}
</style>
<style lang="less" scoped>
.main-container.overflowAuto{
  overflow: auto;
}
/deep/ .el-table {
  font-size: 14px;
}
.wrap {
  margin-top: 10px;
}
.left-top {
  //height: 16vh;
  height: 24vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.pagination_page1,.pagination{
  text-align: center;
  margin:10px auto;
}
.left-bottom {
  height: calc(70vh - 123px);
  overflow-y: scroll;
  margin-top: 8px;
}
.right_card {
  height: calc(100vh - 115px);
}
.type_btn {
  float: right;
  span {
    display: inline-block;
    padding: 2px 18px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    background-color: #eee;
    color: #28f;
    margin: 2px 10px;
    cursor: pointer;
  }
  .active {
    background-color: #28f;
    color: #fff;
  }
}
.ep-type {
  display: flex;
  margin: 14px 0;
  justify-content: space-between;
  >div{
    min-width: 10%;
  }
  ul{
    li{
      padding: 6px 1%;
      font-weight: bold;
      color: #fff;
      border-radius: 6px;
      text-align: center;
      margin-top: 6px;
      cursor: pointer;
      user-select: none;
    }
  }
  .infoBox {
    height: 98px;
    text-align: center;
    padding: 6px 1%;
    font-weight: bold;
    color: #fff;
    display: flex;
    border-radius: 6px;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    &.new{
      width: 300px;
      height: 98px;
      padding: 6px 3% 6px 8%;
      justify-content: space-between;
      overflow: hidden;
    }
    .subBox{
      width: 118px;
      li{
        width: 117px;
        height: 26px;
        margin:4px 0;
        padding:0;
        list-style-type: none;
        border: 1px solid rgba(255, 255, 255,.6);
        box-sizing: border-box;
        border-radius: 2px;
        &:hover{
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
        span{
          line-height: 26px;
          font-size: 14px;
        }
      }
    }
    span {
      font-size: 32px;
      line-height: 40px;
      display: block;
      color: #fff;
    }
    p {
      float: right;
      font-size: 18px;
    }
    img {
      padding-right: 10px;
    }
  }
}
.trans-content {
  display: flex;
  // border: 1px solid #eee;
  margin: 8px 0;
  padding: 8px 6px;
  justify-content: space-evenly;
  align-items: center;
  .pie {
    height: 34vh;
    width: 100%;
  }
  .summarize {
    width: 40%;
    font-size: 16px;
    color: #222;
    height: fit-content;
    padding: 10px;
    background-color: #eee;
    span {
      display: block;
      text-indent: 2rem;
    }
  }

  .legend {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
      width: 30%;
      padding: 10px;
    }
    span {
      display: inline-block;
      background-color: #f9d132;
      width: 20px;
      height: 10px;
      border-radius: 4px;
      margin-right: 12px;
    }
    P:nth-child(2) {
      span {
        background-color: #28f;
      }
    }
    // P:nth-child(3) {
    //   span {
    //     background-color: #f9d132;
    //   }
    // }
  }
}
.last-container {
  position: relative;
  .el-card__header{
    span {
      font-size: 16px;
      font-weight: bold;
      color: #222;
      margin: 0 20px;
      cursor: pointer;
    }
  }

  .actived {
    color: #28f;
    border-bottom: 4px solid #28f;
  }
  .detail-chart {
    height: 26vh;
    width: 80vw;
  }
  .tableTitle{
    float: right;
    margin-right: 54%;
    transform: translateX(50%);
    font-size: 24px;
    font-weight: bolder;
  }
}
.over_all {
  height: 23vh;
  // padding: 40px 0;
  text-align: center;
  strong {
    font-size: 48px;
    font-weight: 600;
  }
  span {
    display: block;
    color: #444;
    font-size: 22px;
  }
  p {
    font-size: 18px;
    font-weight: 500;
  }
}
.alert {
  font-size: 12px;
  color: red;
  padding-left: 20px;
  padding-top: 10px;
}
.point {
  position: absolute;
  left: 48%;
  top: -22px;
  > div {
    display: inline-block;
    width: 60px;
    height: 14px;
    border: 1px solid #28f;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 6px;
  }
  .current {
    background-color: #28f;
  }
}
.secend {
  display: flex;
  justify-content: space-between;
  .card {
    width: 44vw;
    height: 86vh;
    overflow-y: auto;
    .secend_pie {
      width: 100%;
      height: 26vh;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  height: 0
}
</style>
