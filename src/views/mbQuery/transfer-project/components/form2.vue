<template>
  <div class="form2-wrapper infolist">
    <div>
      <h3>
        原辅材料及消耗量
      </h3>
      <Table :columns="yfcl" :data="yfclData" border></Table>
      <div class="page">
        <Page
          :current="yfclInfo.pageNum"
          :total="yfclInfo.total"
          @on-change="changePage($event,'yfcl')"
        ></Page>
      </div>
    </div>
    <div>
      <h3>
        生产设备及数量
      </h3>
      <Table :columns="scsb" :data="scsbData" border></Table>
      <div class="page">
        <Page
          :current="scsbInfo.pageNum"
          :total="scsbInfo.total"
          @on-change="changePage($event,'scsb')"
        ></Page>
      </div>
    </div>
    <div>
      <h3>
        产品及数量
      </h3>
      <Table :columns="cp" :data="cpData" border></Table>
      <div class="page">
        <Page :current="cpInfo.pageNum" :total="cpInfo.total" @on-change="changePage($event,'cp')"></Page>
      </div>
    </div>
    <div>
      <h3>
        生成工艺流程图及工艺说明
      </h3>
      <Table :columns="scgy" :data="scgyData" border></Table>
      <div class="page">
        <Page
          :current="scgyInfo.pageNum"
          :total="scgyInfo.total"
          @on-change="changePage($event,'scgy')"
        ></Page>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    declareId: {
      type: Number
    }
  },
  data() {
    return {
      // uploadUrl: uploadUrl,
      deviceList: [],
      edit: false,
      yfcl: [
        {
          title: "序号",
          type: "index",
          width: "80"
        },
        {
          title: "原辅材料名称",
          key: "materialName",
          render: (h, params) => {
              return h("p", params.row.materialName);
          }
        },
        {
          title: "上年度消耗量(吨/年)",
          key: "lastYearCount",
          render: (h, params) => {
           
              return h("p", params.row.lastYearCount);
            
          }
        },
        {
          title: "本年度计划消耗量(吨/年)",
          key: "thisYearPlanCount",
          render: (h, params) => {
            
              return h("p", params.row.thisYearPlanCount);
            
          }
        }
      ],
      yfclData: [],
      yfclInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      scsb: [
        {
          title: "序号",
          type: "index",
          width: "80"
        },
        {
          title: "设备名称",
          key: "deviceName",
          render: (h, params) => {
            
              return h("p", params.row.deviceName);
            
          }
        },
        {
          title: "上年度数量(台)",
          key: "lastYearCount",
          render: (h, params) => {
            
              return h("p", params.row.lastYearCount);
            
          }
        },
        {
          title: "本年度数量(台)",
          key: "thisYearCount",
          render: (h, params) => {
            
              return h("p", params.row.thisYearCount);
            
          }
        }
      ],
      scsbData: [],
      scsbInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      cp: [
        {
          title: "序号",
          type: "index",
          width: "80"
        },
        {
          title: "产品名称",
          key: "productName",
          render: (h, params) => {
            
              return h("p", params.row.productName);
            
          }
        },
        {
          title: "上年度产量(吨/年)",
          key: "lastYearCount",
          render: (h, params) => {
            
              return h("p", params.row.lastYearCount);
            
          }
        },
        {
          title: "本年度计划产量(吨/年)",
          key: "thisYearCount",
          render: (h, params) => {
           
              return h("p", params.row.thisYearCount);
            
          }
        }
      ],
      cpData: [],
      cpInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      scgy: [
        {
          title: "序号",
          type: "index",
          width: "80"
        },
        {
          title: "工艺名称",
          key: "technologyName",
          render: (h, params) => {
           
              return h("p", params.row.technologyName);
            
          }
        },
        {
          title: "描述",
          key: "description",
          render: (h, params) => {
            
              return h("p", params.row.description);
            
          }
        },
        {
          title: "流程图",
          key: "imageName",
          width: 200,
          render: (h, params) => {
            
              return h(
                "a",
                {
                  attrs: {
                    href: ''
                      // downloadUrl + "?fileName=" + params.row.technologyImgUrl
                  }
                },
                params.row.imageName
              );
            
          }
        }
      ],
      scgyData: [],
      scgyInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    };
  },
  methods: {
    changePage(key, type) {
      console.log(key);
      switch (type) {
        case "yfcl":
          this.yfclInfo.pageNum = key;
          this.yfclList();
          break;
        case "scsb":
          this.scsbInfo.pageNum = key;
          this.scsbList();
          break;
        case "cp":
          this.cpInfo.pageNum = key;
          this.cpList();
          break;
        case "scgy":
          this.scgyInfo.pageNum = key;
          this.scgyList();
          break;
      }
    },
    getAllList() {
      this.yfclList();
      this.scsbList();
      this.cpList();
      this.scgyList();
    },
    yfclList() {
      this.$api.mbQueryApi.managementTable2Product(
        this.declareId,
        {
          page: this.yfclInfo.pageNum,
          size: this.yfclInfo.pageSize
        }
      ).then(res => {
        this.yfclData = res.list;
        this.yfclInfo.total = res.total;
      });
    },
    scsbList() {
      this.$api.mbQueryApi.managementTable2Equipment(
        this.declareId,
        {
          page: this.scsbInfo.pageNum,
          size: this.scsbInfo.pageSize
        }
      ).then(res => {
        this.scsbData = res.list;
        this.scsbInfo.total = res.total;
      });
    },
    cpList() {
      this.$api.mbQueryApi.managementTable2Product(
        this.declareId,
        {
          page: this.cpInfo.pageNum,
          size: this.cpInfo.pageSize
        }
      ).then(res => {
        this.cpData = res.list;
        this.cpInfo.total = res.total;
      });
    },
    scgyList() {
      this.$api.mbQueryApi.managementTable2Technology(
        this.declareId,
        {
          page: this.scgyInfo.pageNum,
          size: this.scgyInfo.pageSize
        }
      ).then(res => {
        this.scgyData = res.list;
        this.scgyInfo.total = res.total;
      });
    }
  },
  created() {
    this.getAllList();
  }
};
</script>

<style lang="less" scoped>
.form2-wrapper {
  padding: 20px;
  min-height: 320px;
  h3 {
    font-size: 16px;
    font-weight: bold;
  }
  &.infolist {
    & > div {
      // margin-top: 20px;
      h3 {
        // margin: 10px 0;
        font-weight: 100;
        border-bottom: 2px solid #2d8cf0;
        padding: 20px 0 10px;
        display: flex;
        justify-content: space-between;
      }
      .page {
        text-align: right;
        margin-top: 10px;
      }
    }
  }
  .hideT {
    display: none;
  }
  .showT {
    display: table-cell;
  }
}
</style>
