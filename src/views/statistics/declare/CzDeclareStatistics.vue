<template>
    <DeclareStaisticsList :pageData='dataForm'></DeclareStaisticsList>
</template>

<script>
import DeclareStaisticsList from '@/components/Declare-staistics/DeclareStatisticsList.vue';
export default {
  name: 'czDeclareStaistics',
components: {DeclareStaisticsList},
  data() {

      return {
        dataForm:{
          typeName:'czDeclareStaistics',
          detailUrl:'/statistics/declare/czdeclareStatisticsDetail',
          title:'危废经营年报'
        }
      }
  },
  methods:{
    init(){
      this.$api.statisticsApi.getJYDeclareList();
    }
  }
}
</script>

<style scoped lang="less">


</style>
