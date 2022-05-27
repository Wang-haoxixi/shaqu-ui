<template>
    <div class="mp-form9-wrapper">
        <h3 class="component-title">表9 上年度管理计划回顾</h3>
        <Form ref="form9" :model="form">
            <table class="form-table">
                <tr>
                    <th class="left-title">检查、监测和公开</th>
                    <td :colspan="2">
                        <span class="textarea">{{ form.check }}</span>
                    </td>
                </tr>
                <tr>
                    <th class="left-title">危险废物比较分析</th>
                    <td :colspan="2">
                        <span class="textarea">{{ form.waste }}</span>
                    </td>
                </tr>
                <tbody class="table-body1">
                    <tr>
                        <th rowspan="16" class="left-title">管理制度执行情况</th>
                        <th colspan="2">危险废物经营许可证制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 是否将危险废物委托给有资质单位收集，贮存，利用，处置： </td>
                        <td class="choose-item">
                            <span>{{ form.otherHaveNumber }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="register-item">2. 是否与有资质单位签订危险废物利用处置合同/协议： </td>
                        <td class="choose-item">
                            <span>{{ form.otherHaveAgreement }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="register-item">3. 是否对危险废物许可证进行审批确认： </td>
                        <td class="choose-item">
                            <span>{{ form.agreementCheck }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">危险废物转移审批制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 转移危险废物是否经过环保部门批准： </td>
                        <td class="choose-item">
                            <span>{{ form.wasteHaveCheck }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">危险废物转移联单制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 是否按照规定填写危险废物转移联单： </td>
                        <td class="choose-item">
                            <span>{{ form.writeWasteDuplicate }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">危险废物识别标志制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 危险废物收集、贮存、处置设施现场是否设置危险废物识别标志： </td>
                        <td class="choose-item">
                            <span>{{ form.wasteSign }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="register-item">2. 危险废物的容器和包装物是否设置危险废物标签： </td>
                        <td class="choose-item">
                            <span>{{ form.wasteLable }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">危险废物建立台账登记制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 是否按照国家规定建立危险废物台账： </td>
                        <td class="choose-item">
                            <span>{{ form.haveAccount }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">建设项目固废污染防治设施环境影响评价及验收制度</th>
                    </tr>
                    <tr>
                        <td class="register-item">1. 危险废物收集、贮存、处置等污染防治设施是否通过环评审批： </td>
                        <td class="choose-item">
                            <span>{{ form.passAudition }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="register-item">2.上述危险废物相关污染防治设施是否与主体工程同时环保验收： </td>
                        <td class="choose-item">
                            <span>{{ form.passCheck }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        isDetail: {
            type: Boolean,
            default: false
        },
        declareId: {
            type: Number
        },
        enterpriseId: {
            type: Number
        }
    },
    data() {
        return {
            id: null,
            returnFlag: true,
            isEdit: false,
            form: {},
        }
    },
    methods: {
        // 获取表单详情
        getDetail() {
            this.$api.mbQueryApi.managementTable9(this.declareId).then(res => {
                if(res) {
                    let data = res;
                    this.id = data.id;
                    this.form = data;
                }
            }).catch(err => {
                console.log('form9', err);
            })
        }
    },
    created() {
        // 获取表单详情
        this.getDetail();
    }
}
</script>

<style lang="less" scoped>
    .mp-form9-wrapper {
        padding: 12px 24px;
        overflow-y: auto;
        .component-title {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .form-table {
            margin: 0 auto 30px;
            td,th {
                border: 1px solid;
                padding: 10px;
                vertical-align: middle;
                text-align: center;
                .textarea {
                    display: block;
                    width: 50em;
                    min-height: 3.5em;
                    text-align: left;
                }
            }
            td {
                color: #515a6e;
            }
            .left-title {
                min-width: 8em;
            }
            .table-body1 {
                .register-item {
                    text-align: left;
                }
                .choose-item {
                    min-width: 8em;
                }
            }

        }
        .component-footer {
            text-align: center;
            .save-btn {
                margin-right: 15px;
            }
            .tip {
                color: #999;
                font-size: 13px;
                margin-top: 5px;
            }
        }
    }
</style>

<style lang="less">
    .mp-form9-wrapper .form-table {
        .ivu-form-item {
            margin-bottom: 0;
        }
    }
</style>