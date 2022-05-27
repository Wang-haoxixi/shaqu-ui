<template>
  <el-container style="height: 100%">
    <el-header>
      <!-- <div class="logo"><img  style="width: 30px; height: 30px;vertical-align: middle" src="@/assets/images/jlp.png" alt=""> 固体废物综合管理平台</div> -->
      <div class="logo">{{ types }}固体废物综合管理平台</div>
      <!-- <Breadcrumb></Breadcrumb> -->
      <div class="right-menu">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>
            {{ nickname }} 欢迎！<i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePsw">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div @click="toMessage">
          <el-badge :value="$store.state.unReadNum" :max="99" class="item">
            <i class="el-icon-message"></i>
          </el-badge>
        </div>
        
    
    <a href="http://113.204.228.66:9074/spb-screen/#/home" target="_blank"
      ><img
        style="width: 20px; height: 20px; vertical-align: middle"
        src="@/assets/images/btn2.png"
    />
    <!-- <span>大屏</span> -->
    </a>
    <!-- <a href="http://23.213.136.240:8088/#/pcNavigation" target="_blank" style="right: 150px" -->
    <a href="http://113.204.228.66:9074/spb-screen/#/index" target="_blank" style="right: 150px"
      ><img
        style="width: 20px; height: 20px;vertical-align: middle"
        src="@/assets/images/btn1.png"
    />
    
    <!-- <span>首页</span> -->

    </a>
      </div>
    </el-header>

    <el-container>
      <el-aside width="210px">
        <el-menu
          class="mainMenu"
          text-color="#95A0A8"
          v-bind:router="true"
          :unique-opened="true"
          :default-active="$route.path"
          active-text-color="#1890ff"
          style="border-right: 0"
          background-color="#181922"
        >
          <el-menu-item index="/home" v-has-permission="'home:index'">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/enterprise" v-has-any-permissions="'enterprise'">
            <template slot="title"
              ><i class="el-icon-menu"></i>企业信息</template
            >
            <el-menu-item
              index="/enterprise/enterpriseList"
              v-has-permission="'enterprise:enterpriseList'"
              ><i class="el-icon-s-order"></i>企业列表
            </el-menu-item>
            <el-menu-item
              index="/enterprise/enterpriseStaff"
              v-has-permission="'enterprise:enterpriseStaff'"
              ><i class="el-icon-s-custom"></i>企业人员
            </el-menu-item>
          </el-submenu>
          <el-submenu
            index="/statistics"
            v-has-any-permissions="['statistics', 'statistics:declare']"
          >
            <template slot="title"
              ><i class="el-icon-s-order"></i>综合统计</template
            >
            <el-menu-item
              index="/statistics/planStatistics"
              v-has-permission="'statistics:planStatistics'"
              ><i class="el-icon-document"></i>管理计划统计
            </el-menu-item>
            <el-menu-item
              index="/statistics/statisticsJointOrder"
              v-has-permission="'statistics:statisticsJointOrder'"
              ><i class="el-icon-magic-stick"></i>电子联单统计
            </el-menu-item>
            
            
            <el-submenu
              index="/statistics/declareStatistics"
              v-has-any-permissions="'statistics:declare'"
            >
              <template slot="title"
                ><i class="el-icon-edit-outline"></i>年度申报统计</template
              >
              <el-menu-item
                index="/statistics/declare/wfdeclareStatistics"
                v-has-permission="'statistics:declare/wfdeclareStatistics'"
                >危废产生年报</el-menu-item
              >
              <el-menu-item
                index="/statistics/declare/czdeclareStatistics"
                v-has-permission="'statistics:declare/czdeclareStatistics'"
                >危废经营年报</el-menu-item
              >
              <el-menu-item
                index="/statistics/declare/yfdeclareStatistics"
                v-has-permission="'statistics:declare/yfdeclareStatistics'"
                >医废产生年报</el-menu-item
              >
              <el-menu-item
                index="/statistics/declare/hmdeclareStatistics"
                v-has-permission="'statistics:declare/hmdeclareStatistics'"
                >豁免危废年报</el-menu-item
              >
            </el-submenu>
            <el-menu-item
              index="/statistics/inputStatistics"
              v-has-permission="'statistics:inputStatistics'"
              ><i class="el-icon-sold-out"></i>危废产生统计
            </el-menu-item>
            <el-menu-item
              index="/statistics/outputStatistics"
              v-has-permission="'statistics:outputStatistics'"
              ><i class="el-icon-cpu"></i>危废处置统计
            </el-menu-item>
            <!-- 建设中 -->
            <el-menu-item 
              index="/statistics/utilizationStatistics"
              v-has-permission="'statistics:utilizationStatistics'"
              ><i class="el-icon-cpu"></i>危废利用统计
            </el-menu-item>
            <el-menu-item 
              index="/mbQuery/ratio"
              v-has-permission="'mbQuery:ratio'"
              ><i class="el-icon-cpu"></i>危废月度/年度统计
            </el-menu-item>
            <el-menu-item 
              index="/statistics/refinement/list"
              v-has-permission="'statistics:refinement/list'"
              ><i class="el-icon-cpu"></i>全区精细化执行情况查询
            </el-menu-item>
            <el-menu-item
              index="/system/message"
              v-has-permission="'system:message'"
              ><i class="el-icon-receiving"></i>短信发送记录
            </el-menu-item>
            <!-- ----- -->
            <!-- <el-menu-item
              index="/statistics/monitorStatistics"
              v-has-permission="'statistics:monitorStatistics'"
              ><i class="el-icon-warning-outline"></i>异常预警统计
            </el-menu-item>
            <el-menu-item
              index="/statistics/loginCount"
              v-has-permission="'statistics:loginCount'"
              ><i class="el-icon-edit-outline"></i>登录统计
            </el-menu-item> -->
          </el-submenu>
          <el-submenu
            index="/mbQuery"
            v-has-any-permissions="[
              'mbQuery:lianDan',
              'mbQuery:report',
              'mbQuery:manage-project',
              'mbQuery:transfer-project',
            ]"
          >
            <template slot="title"
              ><i class="el-icon-sort"></i>申报查询</template
            >
            <el-menu-item
              index="/mbQuery/manage-project"
              v-has-permission="'mbQuery:manage-project'"
              ><i class="el-icon-s-management"></i>管理计划查询
            </el-menu-item>
            <!-- 建设中 -->
            <!-- <el-menu-item
              index="/underConstruction/lodding6"
              v-has-permission="'underConstruction:lodding6'"
              ><i class="el-icon-s-management"></i>转移计划查询
            </el-menu-item> -->
            <el-submenu
              index="/mbQuery/transfer-project"
              v-has-any-permissions="''"
            >
              <template slot="title"
                ><i class="el-icon-search"></i>转移计划查询</template
              >
              <el-menu-item
                index="/mbQuery/transfer-project/provincial/list"
                v-has-permission="'mbQuery:transfer-project/provincial'"
                >跨省转移计划</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/transfer-project/cityInside/list"
                v-has-permission="'mbQuery:transfer-project/cityInside'"
                >市内转移计划</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/transfer-project/exemption/list"
                v-has-permission="'mbQuery:transfer-project/exemption'"
                >豁免转移计划</el-menu-item
              >
            </el-submenu>
            <el-submenu
              index="/mbQuery/liandan"
              v-has-any-permissions="'mbQuery:lianDan'"
            >
              <template slot="title"
                ><i class="el-icon-search"></i>电子联单查询</template
              >
              <el-menu-item
                index="/mbQuery/lianDan/weiFeiLianDan"
                v-has-permission="'mbQuery:lianDan/weiFeiLianDan'"
                >危废市内联单</el-menu-item
              >

              <el-menu-item
                index="/mbQuery/lianDan/YiFeiLianDan"
                v-has-permission="'mbQuery:lianDan/YiFeiLianDan'"
                >医废市内联单</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/lianDan/weiFeiKuaSheng"
                v-has-permission="'mbQuery:lianDan/weiFeiKuaSheng'"
                >危废跨省联单</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/lianDan/weiFeiYingJi"
                v-has-permission="'mbQuery:lianDan/weiFeiYingJi'"
                >危废应急联单</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/lianDan/weiFeiHuoMian"
                v-has-permission="'mbQuery:lianDan/weiFeiHuoMian'"
                >危废豁免联单</el-menu-item
              >
            </el-submenu>
            <el-submenu
              index="/mbQuery/report"
              v-has-any-permissions="'mbQuery:report'"
            >
              <template slot="title"
                ><i class="el-icon-s-order"></i>年度申报查询</template
              >
              <el-menu-item
                index="/mbQuery/report/GongYeReport"
                v-has-permission="'mbQuery:report/GongYeReport'"
                >一般工业固废年报</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/report/weiFeiReport"
                v-has-permission="'mbQuery:report/weiFeiReport'"
                >危废产生年报</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/report/huoMianReport"
                v-has-permission="'mbQuery:report/huoMianReport'"
                >豁免危废年报</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/report/yiLiaoReport"
                v-has-permission="'mbQuery:report/yiLiaoReport'"
                >医废产生年报</el-menu-item
              >
              <el-menu-item
                index="/mbQuery/report/jingYingReport"
                v-has-permission="'mbQuery:report/jingYingReport'"
                >危废经营年报</el-menu-item
              >
            </el-submenu>
            <el-submenu
              index="/mbQuery/reportMonthly"
              v-has-any-permissions="'mbQuery:report'"
            >
              <template slot="title"
                ><i class="el-icon-s-order"></i>月报查询</template
              >
              <el-menu-item
                index="/mbQuery/report/GongYeReportMonthly"
                v-has-permission="'mbQuery:report/GongYeReportMonthly'"
                >危废经营月报</el-menu-item
              >
              <!-- <el-menu-item
                index="/mbQuery/report/GongYeReportMonthlyDetail"
                v-has-permission="'mbQuery:report/GongYeReportMonthlyDetail'"
                >一般工业固废月报详情</el-menu-item
              > -->
            </el-submenu>
            <!-- <el-menu-item
              index="/mbQuery/manage-project"
              v-has-permission="'mbQuery:manage-project'"
              ><i class="el-icon-s-management"></i>管理计划查询
            </el-menu-item> -->
          </el-submenu>
          <el-submenu index="/monitor" v-has-any-permissions="'monitor'">
            <template slot="title"
              ><i class="el-icon-warning"></i>异常预警</template
            >
            <el-menu-item
              index="/monitor/list"
              v-has-permission="'monitor:list'"
              ><i class="el-icon-sunrise"></i>预警报送列表
            </el-menu-item>
            <!-- <el-menu-item
              index="/monitor/pigeonhole"
              v-has-permission="'monitor:pigeonhole'"
              ><i class="el-icon-folder-opened"></i>预警数据归档
            </el-menu-item> -->
            <el-menu-item
              index="/monitor/config"
              v-has-permission="'monitor:config'"
              ><i class="el-icon-setting"></i>预警阈值设置
            </el-menu-item>
            <el-menu-item
              index="/monitor/scope"
              v-has-permission="'monitor:scope'"
              ><i class="el-icon-help"></i>预警范围设置
            </el-menu-item>
            <el-menu-item
              index="/monitor/process"
              v-has-permission="'monitor:process'"
              ><i class="el-icon-odometer"></i>预警处理设置
            </el-menu-item>
            <!-- <el-menu-item
              index="/monitor/video"
              v-has-permission="'monitor:video'"
              ><i class="el-icon-video-camera"></i>现场实时监控
            </el-menu-item> -->
            <el-menu-item
              index="/underConstruction/lodding"
              v-has-permission="'underConstruction:lodding'"
              ><i class="el-icon-video-camera"></i>现场监控查看
            </el-menu-item>
            
          </el-submenu>
          <el-submenu index="/stockQuery" v-has-any-permissions="'stockQuery'">
            <template slot="title"
              ><i class="el-icon-warning"></i>库存查询</template
            >
            <el-menu-item
              index="/stockQuery/inventory-search/list"
              v-has-permission="'stockQuery:inventory-search'"
              ><i class="el-icon-sunrise"></i>库存查询
            </el-menu-item>
            <el-menu-item
              index="/stockQuery/trace-back/list"
              v-has-permission="'stockQuery:trace-back'"
              ><i class="el-icon-folder-opened"></i>危废包追溯
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            index="/sysSettings/question"
            v-has-any-permissions="'sysSettings'"
            ><i class="el-icon-question"></i>平台问答
          </el-menu-item>
          <el-submenu index="/expData" v-has-any-permissions="'expData'">
            <template slot="title"
              ><i class="el-icon-menu"></i>数据导出</template
            >
            <el-menu-item
              index="/expData/hazardous"
              v-has-permission="'expData:hazardous'"
              ><i class="el-icon-s-order"></i>危废转移量
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/system" v-has-any-permissions="'system'">
            <template slot="title"
              ><i class="el-icon-setting"></i>系统管理</template
            >
            <el-menu-item index="/system/user" v-has-permission="'system:user'"
              ><i class="el-icon-user"></i>用户管理
            </el-menu-item>
            <el-menu-item index="/system/role" v-has-permission="'system:role'"
              ><i class="el-icon-postcard"></i>角色管理
            </el-menu-item>
            <el-menu-item
              index="/system/organization"
              v-has-permission="'system:organization'"
              ><i class="el-icon-connection"></i>组织架构
            </el-menu-item>
            <!-- <el-menu-item
              index="/system/message"
              v-has-permission="'system:message'"
              ><i class="el-icon-receiving"></i>短信发送记录
            </el-menu-item>
            <el-menu-item
                    index="/system/sms"
                    v-has-permission="'system:sms'"
            ><i class="el-icon-position"></i>短信发送通知公告
            </el-menu-item> -->
          </el-submenu>
          <el-submenu index="/detailedList" v-has-any-permissions="'detailedList'">
            <template slot="title"
              ><i class="el-icon-setting"></i>五个清单</template
            >
            <el-menu-item index="/detailedList/wasteProduction"
            v-has-permission="'detailedList:wasteProduction'"
              ><i class="el-icon-user"></i>产废单位
            </el-menu-item>
            <el-menu-item index="/detailedList/facilities"
            v-has-permission="'detailedList:facilities'"
              ><i class="el-icon-postcard"></i>自行利用处置设施
            </el-menu-item>
            <el-menu-item
              index="/detailedList/businessUnit"
              v-has-permission="'detailedList:businessUnit'"
              ><i class="el-icon-connection"></i>经营单位
            </el-menu-item>
            <el-menu-item
              index="/detailedList/supervisionUnit"
              v-has-permission="'detailedList:supervisionUnit'"
              ><i class="el-icon-receiving"></i>重点监管单位
            </el-menu-item>
            <el-menu-item
                    index="/detailedList/storageFacilities"
                    v-has-permission="'detailedList:storageFacilities'"
            ><i class="el-icon-position"></i>重点单位贮存设施
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main v-if="$route.path !== '/sysSettings/question'">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"> </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
      <div v-else class="main-defult">
        <router-view></router-view>
      </div>
    </el-container>
  </el-container>
</template>

<script>
// import Breadcrumb from "@/components/Breadcrumb";

import { removeToken } from "@/utils/auth";

export default {
  name: "Layout",
  // components: {Breadcrumb},
  data() {
    return {
      nickname: "游客",
      types: ''
    };
  },
  created() {
    this.types = this.$store.state.types;
    this.getUserInfo();
  },
  methods: {
    toMessage() {
      this.$router.push("/message");
    },
    getUserInfo() {
      // 在路由守卫那里已经获取了相关的全新信息，这里只需要读取设置一下
      this.nickname = this.$store.state.nickname;
      this.$api.homeApi.getUnReadNum().then((res) => {
        this.$store.commit("saveUnReadNum", res);
      });
    },
    handleCommand(command) {
      if (command === "logout") {
        removeToken();
        this.$store.commit("removePermissionList");
        //  this.$store.commit('saveBreadCrumbList',[]);
        this.$router.push("/user/login");
      } else {
        this.$router.push("/changepassword");
      }
    },
  },
};
</script>

<style  lang="less">
.el-header {
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #2288ff;
}

.el-header .logo {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 24px;
  padding: 0px 27px;
  box-sizing: border-box;
  text-align: center;
  a{
    color:#fff;
    font-size:16px;
    margin-left:20px;
  }
}
.el-header .el-breadcrumb {
  padding-left: 20px;
}
.el-aside{
  background-color:#181922 !important;
}
.right-menu {
  flex: 1;
  text-align: right;
  margin-right: 20px;
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  line-height: 30px;
  // div{
  //   position:absolute;
  //   right:200px;top:20px;
  // }
  .el-icon-message {
    font-size: 16px;
  }
  span {
    margin-left: 26px;
    color: #fff;
  }
  a{
    color:#fff;
    margin-right:12px;
    
  }
  
}
.main-container {
  height: calc(100vh - 110px);
  overflow-y: auto;
  position:relative;
.pagination {
  font-size: 14px;
  margin-top:16px;
  text-align: center;
  // position:absolute;
  // bottom:2%;left:36%;
}

}
/deep/ .el-table td {
  font-size:14px ;
}
.top-titles {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  border-left: 6px solid #1890ff;
  padding-left: 16px;
  margin-bottom: 10px;
}
.main-defult {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
}
</style>
