<template>
  <div class="wrap">
    <div ref="mychart" class="charts"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    let myChart = this.$echarts.init(this.$refs.mychart);
    this.myChart = myChart;
  },
  methods: {
    initChart() {
      let option = {
        // tooltip: {
        //   trigger: "item",
        // },
        legend: {
          y: "center",
          left: "60%",
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"],
            center: ["25%", "53%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "40",
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 333,
                name: "精细化联单",
                itemStyle: { color: "#00c8ca" },
              },
              { value: 735, name: "普通联单", itemStyle: { color: "#2288ff" } },
            ],
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
  created() {
    //   this.initChart()
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  .charts {
    width: 60%;
    height: 70%;
  }
}
</style>