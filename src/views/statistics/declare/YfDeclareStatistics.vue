<template>
    <DeclareStaisticsList :pageData='dataForm'></DeclareStaisticsList>
</template>

<script>
import DeclareStaisticsList from '@/components/Declare-staistics/DeclareStatisticsList.vue';
export default {
  name: 'yfDeclareStaistics',
components: {DeclareStaisticsList},
  data() {

      return {
        dataForm:{
          typeName:'yfDeclareStaistics',
          detailUrl:'/statistics/declare/yfdeclareStatisticsDetail',
          title:'医废产生年报'
        }
      }
  },
   methods:{
    init(){
      this.$api.statisticsApi.getYFDeclareList();
    }
  }
}
</script>

<style scoped lang="less">


</style>
