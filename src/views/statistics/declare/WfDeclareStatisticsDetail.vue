
<template>
    <DeclareStatisticsDetail ></DeclareStatisticsDetail>
</template>

<script>
import DeclareStatisticsDetail from '@/components/Declare-staistics/DeclareStatisticsDetail.vue';
export default {
  name: 'wfDeclareStatisticsDetail',
components: {DeclareStatisticsDetail},
  data() {
      return {
      }
  },
  methods:{
    init(){
      this.$api.statisticsApi.getDeclareDetail();
    }
  }
}
</script>

<style scoped lang="less">
  
  
</style>
