<template>
  <div class="main-container">
    <el-card class="main-container video-container">
      <div class="video-header" slot="header">
        <h3 class="top-titles">现场实时监控</h3>
      </div>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="实时视频" name="pre"> </el-tab-pane>
        <!-- <el-tab-pane label="历史视频" name="his"> </el-tab-pane> -->
        <el-tab-pane label="摄像头管理" name="cam"> </el-tab-pane>
      </el-tabs>
      <template v-if="activeName === 'cam'">
        <p class="notice">
          点击监控点地址可跳转登录摄像头进行摄像头管理，登录名：admin
          密码：1q2w3e4r
        </p>
        <el-table :data="entCamerasList" style="width: 100%">
          <el-table-column type="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="enterprise.name" label="企业名称"> </el-table-column>
          <el-table-column prop="name" label="监控点名称"> </el-table-column>
          <el-table-column
            prop="adminUrl"
            label="监控管理地址"
            min-width="220"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <a :href="`http://${scope.row.adminUrl}`" target="_blank">
                {{ scope.row.adminUrl }}
              </a>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="video-content" v-else>
        <div class="video-content-left">
          <el-select
            v-model="currentEnterpriseType"
            @change="loadData"
            placeholder="请选择"
          >
            <el-option label="所有企业" value="所有企业"> </el-option>
            <el-option
              v-for="item in enterpriseType"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <div class="ent-list">
            <el-scrollbar style="height: 100%">
              <ul v-if="enterpriseListData.length">
                <li
                  :class="{ active: currentEnterprise === item.name }"
                  v-for="(item, index) in enterpriseListData"
                  v-bind:key="index"
                  @click="getEntVideo(item)"
                >
                  {{ item.name }}
                </li>
              </ul>
              <p v-else>暂无{{ currentEnterpriseType }}类型的企业</p>
            </el-scrollbar>
            

            <!-- :picker-options="pickerOptions" -->
            <!-- value-format="yyyy-MM-dd'T'HH:mm:ss'+08:00'" -->
          </div>
        </div>
        <div class="video-content-right">
          <div class="wrap">
            <p>
              <span
                :class="
                  activeIndex === index ? 'video-name active' : 'video-name'
                "
                v-for="(item, index) in cameraData"
                :key="index"
                @click="getPlayUrl(index)"
              >
                监控点位#0{{ index+1 }}
              </span>
            </p>
            <div v-show="activeName === 'his'" style="margin-top: 20px">
              <el-date-picker
                v-model="hisTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="getDate"
              >
              </el-date-picker>
              <!-- <p> -->
                <el-button type="primary" style="margin-left:20px" @click="playHisVideo">
                  查看历史视频
                </el-button>
              <!-- </p> -->
            </div>
            <!-- <div class="video-des">描述：{{ item.des }}</div> -->
            <video
              ref="myVideo"
              id="myVideo"
              class="video-js vjs-default-skin video-wrap"
              controls
              preload="auto"
              muted
              autoplay
            >
              <!-- <source :src="prePlayUrl" type="application/x-mpegURL" /> -->
              <!-- <source src="https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8" type="application/x-mpegURL" /> -->
            </video>
            <div class="video-opt">
              <el-button
                type="danger"
                @click="captureImg"
                icon="el-icon-warning-outline"
              >
                手动报警</el-button
              >
            </div>
          </div>

          <div style="width: 0px; height: 0px; overflow: hidden">
            <canvas ref="canvas" width="400" height="300"></canvas>
          </div>
        </div>
      </div>
      <el-dialog
        title="企业监控报警"
        :visible.sync="showModel"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="formData" label-width="100px" label-position="right">
          <el-form-item label="异常截图：">
            <img :src="imgSrc" style="height: 200px" />
          </el-form-item>
          <el-form-item required label="描述：">
            <el-input type="textarea" v-model="formData.msg"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="subAlarm">提 交</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import videojs from "video.js";
import { entType } from "@/utils/statisticObj";
import "videojs-contrib-hls";
import { conds } from "@/utils/tools";
import videoApi from "@/api/videoApi";
import moment from "moment";
export default {
  data() {
    return {
      pickerOptions: {
        //当前日期只后不可选
        disabledDate(date) {
          let zero = new Date().setHours(0, 0, 0, 0);
          if (date.getTime() > zero) {
            return true;
          }
          return false;
        },
      },
      formInline: {},
      activeName: "pre",
      enterpriseListData: [],
      enterpriseType: entType,
      currentEnterpriseType: "所有企业",
      currentEnterprise: "重庆岭欧环保科技有限公司",
      conditoions: "",
      formData: {
        msg: "",
      },
      nowPlayer: {}, //保存video实例
      cameraData: [], //视频信息
      videoId: "", //报警摄像头id
      imgSrc: "",
      showModel: false,
      canvas: null,
      context: null,
      prePlayUrl: "",
      activeIndex: 0,
      hisTime: null,
      beginTime: "",
      endTime: "",
      entCamerasList:[],
    };
  },
  computed: {
    // enterpriseListData: function () {
    //   let self = this;
    //   if (self.currentEnterpriseType === "所有企业") {
    //     return self.enterpriseList;
    //   } else {
    //     return self.enterpriseList.filter(function (item) {
    //       return self.currentEnterpriseType === item.type;
    //     });
    //   }
    // },
  },
  methods: {
    loadData() {
      this.destoryVideo(); //销毁video实例；
      let type =
        this.currentEnterpriseType === "所有企业"
          ? ""
          : this.currentEnterpriseType;
      this.conditoions = conds.asConditionString(
        JSON.stringify(conds.eq("jlpIndustry", type))
      );
      
      this.$api.monitor
        .getVideoList({
          size: 99,
          condition: this.conditoions,
        })
        .then((res) => {
          this.enterpriseListData = res.content;
          if (res.content.length > 0) {
            this.getEntVideo(res.content[0]);
          }
        });
    },
    playHisVideo() { 
        //播放历史视频
      if(moment(this.hisTime[1]).diff(moment(this.hisTime[0]), 'days')>=3){
        this.$message.error('日期范围不能大于三天！');
        return ;
      }
      
        let self = this;
      let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        protocol:'rtmp',
        cameraIndexCode: this.cameraData[this.activeIndex].playUrl,
      };
       this.initVideo('rtmp://58.200.131.2:1935/livetv/cctv1');
      
      // videoApi.getHisURL(data).then((res) => {
      //   let url = res.data.url;
      //   if(res.data.url==null){
      //     this.$message.error('该时间段没有回放资源');
      //     return;
      //   }
      //   this.initVideo(url);
      // });
    },
    getDate() {
      this.beginTime = moment(this.hisTime[0]).format(
        "YYYY-MM-DDTHH:mm:ss.000+08:00"
      );
      this.endTime = moment(this.hisTime[1]).format(
        "YYYY-MM-DDTHH:mm:ss.000+08:00"
      );
    },
    getEntVideo(data) {
      this.currentEnterprise = data.name;
      this.$api.monitor.getEntVideo(data.id).then((res) => {
        this.cameraData = res;
        if(this.activeName==='pre') this.getPlayUrl(0);
      });
    },
    //获取实时播放视频链接
    getPlayUrl(index) {
      this.activeIndex = index;
      let self= this;
      let data = {};
      data.cameraIndexCode = this.cameraData[index].playUrl;
      data.protocol = "hls";
      videoApi.getURL(data).then((res) => {
        let url = res.data.url;
        this.initVideo(url);
      });
    },
    handleClose() {
      this.showModel = false;
      this.formData = {
        msg: "",
      };
      this.imgSrc = "";
    },
    subAlarm() {
      if (!this.formData.msg.trim().length) {
        this.$message.error("描述内容不能为空！");
        return false;
      } else {
        let data = {};
        data.videoId = this.videoId;
        data.content = this.formData.msg;
        data.base64String = this.imgSrc;

        this.$api.monitor.subAlarm(data).then(() => {
          this.showModel = false;
          this.formData.msg = "";
          this.$message.succcess("提交成功！");
        });
      }
    },
    captureImg() {
      this.showModel = true;
      this.context.drawImage(this.$refs.myVideo, 0, 0, 400, 300);
      let base64 = this.canvas.toDataURL("image/jpeg");
      this.imgSrc = base64;
      this.videoId = this.cameraData[this.activeIndex].id;
    },
    initCapture() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");
    },

    destoryVideo() {
      if (this.nowPlayer) this.nowPlayer = {};
    },
    initVideo(url) {
      this.nowPlayer = videojs(
        "myVideo",
        {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
          muted: true,
        },
      );
      this.nowPlayer.src({
        src: url,
        // type: "application/x-mpegURL",
      });
    },
    getCamListData(){
      this.$api.monitor.getCamList().then(res=>{
        this.entCamerasList=res;
      })
    },
    changeTab(){
     if(this.activeName==='pre'){
       this.loadData();
     }
    }
  },
  created() {
    this.activeName="pre";
    this.loadData();
    this.getCamListData();
  },
  mounted() {
    this.initCapture();
  },
  beforeDestroy() {
    this.destoryVideo();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  /deep/ .el-table  {
  font-size:14px ;
}
  height: calc(100vh - 105px);
  overflow-y: auto;
  background: #fff;
  .video-container {
    .video-header {
      display: flex;
      align-items: center;
      h3 {
        margin-right: 32px;
      }
    }
    .radio-block {
      margin: 24px 0;
      .myRadio {
        margin-bottom: 4px;
      }
    }
    /deep/ .el-switch__label {
      font-weight: 600;
    }
    .notice {
      color: #666;
      margin: 10px;
    }
    .video-content {
      display: flex;
      .video-content-left {
        min-width: 300px;
        display: flex;
        flex-direction: column;
        .ent-list {
          flex: 1;
          margin-top: 15px;
          max-height: calc(100vh - 350px);
          border: 1px solid #dcdfe6;
          ul {
            padding: 20px;
            li {
              max-width: 240px;
              margin-bottom: 20px;
              cursor: pointer;

              &.active {
                color: #2d8cf0;
              }
            }
          }
          /deep/ .el-scrollbar__wrap {
            overflow-x: auto;
          }
          p {
            padding: 15px 24px;
            line-height: 24px;
            color: gray;
          }
        }
      }
      .video-content-right {
        flex: 1;
        .wrap {
          width: 100%;
          height: auto;
          margin: 0 auto;
          text-align: center;
          p {
            padding: 10px auto;
            height: 30px;
            .video-name {
              font-weight: bold;
              font-size: 16px;

              cursor: pointer;
              padding: 10px;
            }
            .active {
              color: #28f;
            }
          }

          .video-des {
            text-align: center;
            margin: 14px 0;
            color: #555;
          }
          .video-wrap {
            width: 800px;
            height: 500px;
            margin:20px auto;
          }
        }
        .video-opt {
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
