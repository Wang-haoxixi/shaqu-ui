<template>
    <DeclareStaisticsList :pageData='dataForm'></DeclareStaisticsList>
</template>

<script>
import DeclareStaisticsList from '@/components/Declare-staistics/DeclareStatisticsList.vue';
export default {
  name: 'hmDeclareStaistics',
components: {DeclareStaisticsList},
  data() {

      return {
        dataForm:{
          typeName:'hmDeclareStaistics',
          detailUrl:'/statistics/declare/hmdeclareStatisticsDetail',
          title:'豁免危废年报'
        }
      }
  },
   methods:{
    init(){
      this.$api.statisticsApi.getHMDeclareList();
    }
  }
}
</script>

<style scoped lang="less">


</style>
