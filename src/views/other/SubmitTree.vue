<template>
  <div></div>
</template>

<script>
import routes from "@/router/routeList";
import route_formater from "@/utils/route_formater";
export default {
  name: "submitTree",
  methods: {
    submitRoleTree() {
      const getRouteData = (data) => {
        let data_ = [];
        data.map(function (item) {
          let items = {};
          if (item.children) {
            items.children = getRouteData(item.children);
          }
          items.path = item.path;
          items.name = item.name;
          items.uuid = item.uuid || "";
          items.authority = item.authority || "";
          if (items.uuid) {
            data_.push(items);
          }
        });
        return data_;
      };
      this.$api.systemApi.submitRoleTree(getRouteData(routes));
    },
  },
  mounted() {
    this.submitRoleTree();
    route_formater.getComponentList(routes, this["$api"]).then((res) => {
      console.log(res);
      this.$api.systemApi.submitRoleTree(res);
    });
  },
};
</script>

<style scoped>
</style>
