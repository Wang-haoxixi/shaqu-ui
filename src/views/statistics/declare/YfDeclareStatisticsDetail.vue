
<template>
    <DeclareStatisticsDetail ></DeclareStatisticsDetail>
</template>

<script>
import DeclareStatisticsDetail from '@/components/Declare-staistics/DeclareStatisticsDetail.vue';
export default {
  name: 'yfDeclareStatisticsDetail',
components: {DeclareStatisticsDetail},
  data() {
      return {
      }
  },
  methods:{
    init(){
      this.$api.statisticsApi.getYFDeclareDetail();
    }
  }
}
</script>

<style scoped lang="less">
  
  
</style>
