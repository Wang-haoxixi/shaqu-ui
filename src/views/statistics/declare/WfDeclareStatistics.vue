<template>
    <DeclareStaisticsList :pageData='dataForm'></DeclareStaisticsList>
</template>

<script>
import DeclareStaisticsList from '@/components/Declare-staistics/DeclareStatisticsList.vue';
export default {
  name: 'wfDeclareStaistics',
components: {DeclareStaisticsList},
  data() {

      return {
        dataForm:{
          typeName:'wfDeclareStaistics',
          detailUrl:'/statistics/declare/wfdeclareStatisticsDetail',
          title:'危废产生年报'
        }
      }
  },
   methods:{
    init(){
      this.$api.statisticsApi.getDeclareList();
    }
  }
}
</script>

<style scoped lang="less">


</style>
