<template>
    <div class="mp-form8-wrapper">
        <h3 class="component-title">表8 环境监测情况</h3>
        <Form ref="form8" :model="form" :rules="rules">
            <table class="form-table">
                <thead></thead>
                <tbody>
                    <tr>
                        <th rowspan="4" class="table-title">
                            危险废物利用/处置设施运行过程相关参数的监测
                        </th>
                        <td>
                            <span class="textarea">{{ form.equipmentSituation }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="textarea">{{ form.pollutionSituation }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="textarea">{{ form.ownSituation }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="textarea">{{ form.otherSituation }}</span>
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
            isEdit: false,
            returnFlag: true,
            form: {
                equipmentSituation: '',
                pollutionSituation: '',
                ownSituation: '',
                otherSituation: ''    
            },
            rules: {
                equipmentSituation: [{
                    required: true, message: '不能为空！'
                }],
                pollutionSituation: [{
                    required: true, message: '不能为空！'
                }],
                ownSituation: [{
                    required: true, message: '不能为空！'
                }],
                otherSituation: [{
                    required: true, message: '不能为空！'
                }]
            } //根据form数据结构产生rules,如果不是单一数据结构要用computed的方法写复杂的rules
        }
    },
    methods: {
        // 获取表单详情
        getDetail() {
            let params = {
                declareId: this.declareId
            }
            this.$api.mbQueryApi.managementTable8(this.declareId).then(res => {
                if(res) {
                    // 编辑
                    this.form = res;
                    this.id = res.id;
                }
            }).catch(err => {
                console.log('form8', err);
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
    .mp-form8-wrapper {
        padding: 12px 24px;
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
            .table-title {
                width: 16em;
                min-width: 10em;
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
    .mp-form8-wrapper .form-table {
        .ivu-form-item {
            margin-bottom: 0;
        }
    }
</style>