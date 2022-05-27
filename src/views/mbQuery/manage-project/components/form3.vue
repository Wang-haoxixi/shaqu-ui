<template>
    <div class="mp-form3-wrapper">
        <h3 class="component-title">表3 危险废物产生概况</h3>
        <Form ref="form3" :model="itemList[0]">
            <table class="form-table">
                <thead>
                    <tr>
                        <th class="vertical-align index">序号</th>
                        <th>废物名称</th>
                        <th>废物代码</th>
                        <th>废物类别</th>
                        <th>俗称</th>
                        <th>有害物质名称</th>
                        <th style="width:125px">物理性状</th>
                        <th style="width:125px">危险特性</th>
                        <th>本年度计划产生量（吨）</th>
                        <th>上年度实际产生量（吨）</th>
                        <th>来源及产生工序</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in itemList" :key="index">
                        <th class="index">{{ index + 1 }}</th>
                        <td>
                            <span>{{ itemList[index].wasteName }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].wasteCode }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].wasteType }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].wasteSc }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].dangerousName }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].typeStr }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].dangerous }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].thisYearNum }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].lastYearNum }}</span>
                        </td>
                        <td>
                            <span>{{ itemList[index].source }}</span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="8" class="total-count">合计：</th>
                        <td>{{ thisYearCount }}</td>
                        <td>{{ lastYearCount }}</td>
                        <td>---</td>
                    </tr>
                </tfoot>
            </table>
        </Form>
    </div>
</template>

<script>
// import { queryPatyDictionary, findBaseWaste, manageSurveyAdd, manageSurveyDetail, manageSurveyUpdate, manageSurveyDelete } from '@/libs/api'
// import { filterEmptyQuery } from '@/libs/tools'
import debounce from 'lodash/debounce'

export default {
    props: {
        isDetail: {
            type: Boolean,
            default: false
        },
        declareId: {
            type: Number
        }
    },
    data() {
        return {
            id: null, // 表id
            returnFlag: true,
            initItemList: [{thisYearNum: 0, lastYearNum: 0}],
            itemList: [{thisYearNum: 0, lastYearNum: 0}],
            formConditionMap: {
                initWasteCodeList: [],
                wasteCodeLists: [],
                typeList: []
            },
            isEdit: false,
            showErrorTip: false
        }
    },
    computed: {
        thisYearCount() {
            let totalCount;
            let { itemList } = this;
            totalCount = itemList.reduce((total, item) => {
                let curNum = item.thisYearNum && Number(item.thisYearNum) || 0;
                let res;

                total = Number(total);
                res = total + curNum;
                return res.toFixed(6);
            }, 0);
            return totalCount || 0;
        },
        lastYearCount() {
            let totalCount;
            let { itemList } = this;
            totalCount = itemList.reduce((total, item) => {
                let curNum = item.lastYearNum && Number(item.lastYearNum) || 0;
                let res;
                
                total = Number(total);                
                res = total + curNum;
                return res.toFixed(6);
            }, 0);
            return totalCount || 0;
        }
    },
    methods: {
        // 获取表单详情
        getDetail() {
            let declareId = this.declareId;
            this.$api.mbQueryApi.managementTable3(declareId).then(res => {
                if(res) {
                    // 编辑
                    this.isEdit = true;
                    let data = res;
                    this.itemList = data.jsonStr;
                    this.id = data.id;
                    this.itemList.forEach((item, index) => {
                        // 把thisYearNum和lastYearNum类型Number化
                        item.thisYearNum = Number(item.thisYearNum) || 0;
                        item.lastYearNum = Number(item.lastYearNum) || 0;
                    })
                }
            }).catch(err => {
                console.log('form3', err);
            })
        }
    },
    created() {
        this.getDetail();

    }
}
</script>

<style lang="less">
    .mp-form3-wrapper {       
        padding: 12px 24px;
        .component-title {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .form-table {
            margin: 0 auto 25px;
            .ivu-form-item {
                margin-bottom: 0;
            }
            .ivu-input-type textarea {
                min-width: 100px;
            }
            td,th {
                border: 1px solid;
                padding: 10px;
                vertical-align: middle;
                text-align: center;
                &:not(.index) {
                    min-width: 100px;
                }
                .select {
                    text-align: left;
                }
                &.vertical-align {
                    width: 1.5em;
                }
                &.total-count {
                    text-align: right;
                }
            }
            td {
                color: #515a6e;
            }
            .input-number {
                width: 140px;
            }
            .add-btn {
                margin-left: 10px;
                margin-top: 20px;
                font-size: 18px;
                color: #888;
                cursor: pointer;
            }
        }
        .error-tip {
            opacity: 0;
            height: 0;
            color: #f04c1a;
            font-size: 13px;
            transition: opacity 0.25s;
            &.active {
                opacity: 1;
                height: 1em;
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