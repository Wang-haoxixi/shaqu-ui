<template>
  <div class="wrap" @click="toList">
    <div ref="charts" class="charts"></div>
    <p >{{chartData.title}}</p>
  </div>
</template>

<script>
export default {
  name: "gauge",
  props: {
    chartData: {
      type: [Object],
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  methods: {
    toList(){
      this.$router.push({
         path: "/list",
        query: { listType: this.chartData.type },
      })
    },
    initChart() {
      let option = {
       
        series: [
          {
            type: "gauge",
            min: 0,
            max: this.chartData.max,
            startAngle: 180,
            endAngle: 0,
            splitNumber: 10,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [
                    this.chartData.data / this.chartData.max,
                    this.chartData.color,
                  ], //根据实际数据动态改变
                  [1, "#DCDDDD"],
                ],
                width: 10, //半径
                shadowColor: "#fff", //默认透明
                shadowBlur: 1,
              },
            },
            pointer: {
              show: false,
            },
            axisLabel: {
              //show:false,
              // 坐标轴小标记
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "transparent", //刻度数字颜色 隐藏
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "transparent", //坐标轴 小刻度线颜色
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "transparent", //分割线
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            data: [{ value: this.chartData.data }],
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
  mounted() {
    let myChart = this.$echarts.init(this.$refs.charts);
    this.myChart = myChart;
  },
};
</script>

<style lang="less" scoped>
.wrap{
  width:100%;
}
.charts {
  height: 120px;
  width: 100%;
}
 p {
      font-size: 18px;
      text-align:center;
    }
</style>