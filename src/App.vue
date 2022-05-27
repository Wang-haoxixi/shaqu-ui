<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "app",
    };
</script>

<style>
    html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: #f0f2f5;
        font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    #app {
        height: 100%;
    }

    .el-dialog__header {
        border-bottom: 1px solid #DCDFE6;
    }


    .el-dialog__footer {
        border-top: 1px solid #DCDFE6;
    }




    /*!*美化滚动条*!*/
    /*::-webkit-scrollbar {*/
    /*    width: 6px;*/
    /*    height: 6px;*/
    /*}*/

    /*::-webkit-scrollbar-track {*/
    /*    width: 6px;*/
    /*    background: rgba(16, 31, 28, 0.1);*/
    /*    -webkit-border-radius: 2em;*/
    /*    -moz-border-radius: 2em;*/
    /*    border-radius: 2em;*/
    /*}*/

    /*::-webkit-scrollbar-thumb {*/
    /*    background-color: rgba(16, 31, 28, 0.5);*/
    /*    background-clip: padding-box;*/
    /*    min-height: 28px;*/
    /*    -webkit-border-radius: 2em;*/
    /*    -moz-border-radius: 2em;*/
    /*    border-radius: 2em;*/
    /*}*/

    /*::-webkit-scrollbar-thumb:hover {*/
    /*    background-color: rgba(16, 31, 28, 1);*/
    /*}*/
</style>
