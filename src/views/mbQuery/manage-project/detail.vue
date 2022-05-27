<template>
    <el-card class="main-container">
        <h3>管理计划详情</h3>
        <section class="base-info">
            <ul class="clearfix">
                <li><span class="label">企业名称:</span><span class="value">{{ enterpriseName }}</span></li>
                <li><span class="label">年度:</span><span class="value">{{ declareYear }}</span></li>
                <li><span class="label">申报类别:</span><span class="value">{{ manageTypeName }}</span></li>
            </ul>
        </section>
        <section>
            <h4 class="title">备案过程</h4>
            <Table stripe :columns="tableColumns" :data="auditList" max-height="500"></Table>
        </section>
        <section>
            <h4 class="title">管理计划</h4>
            <div class="manage-project-detail-form-list">
                <ul class="tabs">
                    <li class="tab" :class="{act: nowview == val.value}" v-for="(val, key) in tabList" :key="key" @click="clickTab(val.value)">{{val.name}}</li>
                </ul>
                <div class="pane">
                    <Form1 v-if="nowview == 'b1'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form1>
                    <Form2 v-if="nowview == 'b2'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form2>
                    <Form3 v-if="nowview == 'b3'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form3>
                    <Form4 v-if="nowview == 'b4'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form4>
                    <Form5 v-if="nowview == 'b5'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form5>
                    <Form6 v-if="nowview == 'b6'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form6>
                    <Form7 v-if="nowview == 'b7'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form7>
                    <Form8 v-if="nowview == 'b8'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form8>
                    <Form9 v-if="nowview == 'b9'" class="form-wrapper" :declareId="declareId" :isDetail="true"></Form9>
                </div>
            </div>
        </section>
        <div class="footer">
            <Button type="primary" style="width: 100px" @click="handleReturn">返回</Button>
        </div>
    </el-card>
</template>

<script>
import Form1 from './components/form1'
import Form2 from './components/form2'
import Form3 from './components/form3'
import Form4 from './components/form4'
import Form5 from './components/form5'
import Form6 from './components/form6'
import Form7 from './components/form7'
import Form8 from './components/form8'
import Form9 from './components/form9'
// import { findAllDeclareAuditList  } from '@/libs/api'


export default {
    components: {
        Form1,
        Form2,
        Form3,
        Form4,
        Form5,
        Form6,
        Form7,
        Form8,
        Form9
    },
    data() {
        return {
            tabList: [
                {
                    name: '表1 企业基本信息',
                    value: 'b1'
                },
                {
                    name: '表2 产品生产情况',
                    value: 'b2'
                },
                {
                    name: '表3 危险废物产生概况',
                    value: 'b3'
                },
                {
                    name: '表4 危险废物减量化计划和措施',
                    value: 'b4'
                },
                {
                    name: '表5 危险废物转移情况',
                    value: 'b5'
                },
                {
                    name: '表6 危险废物自行利用/处置措施',
                    value: 'b6'
                },
                {
                    name: '表7 危险废物委托利用/处置措施',
                    value: 'b7'
                },
                {
                    name: '表8 环境监测情况',
                    value: 'b8'
                },
                {
                    name: '表9 上年度管理计划回顾',
                    value: 'b9'
                },
            ],
            nowview: 'b1',
            enterpriseName: '',
            declareYear: '',
            manageTypeName: '',
            enterpriseId: '',
            auditList: [],
            tableColumns: [
                {title: '序号', key: 'id', align: 'center', width: 85 },
                {title: '日期', key: 'auditDate'},
                {title: '类型', key: 'auditType'},
                {title: '经办人', key: 'operator'},
                {title: '意见', key: 'auditRemarks'},
            ]
        }
    },
    methods: {
        clickTab(name) {
            this.nowview = name;
            // 更新表单视图
            sessionStorage.setItem('nowview', this.nowview);
        },
        handleReturn() {
            history.go(-1);
        }
    },
    created() {
        // 备案id, 企业名称，年度，申报类别
        let query = this.$route.query;

        this.declareId = Number(query.id);
        this.enterpriseName = query.enterpriseName,
        this.declareYear = query.declareYear,
        this.manageTypeName = query.manageTypeName;
        // 当前表单视图
        this.nowview = sessionStorage.getItem('nowview') || this.nowview;
        // 备案过程
        let id = query.id;
        this.$api.mbQueryApi.managementAudit(id).then(res => {
            if(res) {
                this.auditList = res || [];
            }
        })
    }
}
</script>

<style lang="less" scoped>
.el-card {
    overflow-y: auto;
}
    .wrapper {
        padding: 15px;
    }
    h3 {
        font-family: 'yahei';
        font-weight: 700;
        text-align: center;
        font-size: 18px;
        line-height: 2.5em;
    }
    h4.title {
        font-family: 'yahei';
		font-weight: 700;
        font-size: 15px;
		border-left: 4px solid #2d8cf0;
		padding-left: 7px;
		line-height: 15px;
        margin-bottom: 20px;
    }
    section {
        padding-bottom: 25px;
    }
    .base-info {
        li {
            float: left;
            width: 32%;
            list-style: none;
        }
        .label {
            margin-right: 8px;
        }
    }
    .footer {
        text-align: center;
    }
    .manage-project-detail-form-list {
        .form-wrapper {
            border: 1px solid rgb(220, 222, 226);
            border-top: none;
        }
        .tabs {
            display: flex;
            border-bottom: 1px solid #dcdee2;
            align-items: flex-end;
            .tab {
                color: #515a6e;
                cursor: pointer;
                padding: 5px 10px 4px;
                margin-right: 5px;
                border: 1px solid #dcdee2;
                margin-bottom: -1px;
                border-radius: 5px 5px 0 0;
                background: #f8f8f9;
                font-size: 14px;
                transition: color .3s ease-in-out, background .3s ease-in-out;
                list-style: none;
                &:hover {
                    color: #57a3f3;
                }
                &.act {
                    background: #fff;
                    border-bottom: 1px solid #fff;
                    color: #2d8cf0;
                    padding-bottom: 5px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>