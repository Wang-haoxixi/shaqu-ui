<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">{{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "Breadcrumb",
        data() {
            return {
                breadCrumbList: this.$store.state.breadCrumbList
            }
        },
        watch: {
            $route: function () {
                this.breadCrumbList = [];
                this.$route.matched.forEach(item => {
                    this.breadCrumbList.push({path: item.path, name: item.name});
                });
                this.$store.commit('saveBreadCrumbList', this.breadCrumbList);
            }
        }
    }
</script>

<style scoped>

</style>
