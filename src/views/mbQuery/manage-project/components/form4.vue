<template>
    <div class="mp-form4-wrapper">
        <h3 class="component-title">表4 危险废物减量化计划和措施</h3>
        <Form ref="form4" :model="form" :rules="rules">
            <table class="form-table">
                <thead></thead>
                <tbody>
                    <tr class="tabel-list">
                        <th>减少危险废物产生量的计划</th>
                        <td class="table-td">
                            <Table class="project-table" :data="prolist" :columns="columns" stripe></Table>
                            <Page class="pager" size="small" :total="reduceProMap.totalNum" :current="reduceProMap.curPage" show-total @on-change="handlePageNumChange"/>
                        </td>
                    </tr>
                    <tr>
                        <th>减少危险废物危害性的计划</th>
                        <td>
                            <span class="textarea">{{ form.reducePlan }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>减少危险废物产生量和危害性的措施</th>
                        <td>
                            <span class="textarea">{{ form.reduceMethod }}</span>
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
            isEdit: false,
            returnFlag: true,
            prolist: [],
            form: {},
            rules: {
                reducePlan: [{
                    required: true, message: '不能为空！'
                }],
                reduceMethod: [{
                    required: true, message: '不能为空！'
                }]
            },
            baseColumns: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '废物代码',
                    key: 'wasteCode'
                },
                {
                    title: '废物名称',
                    key: 'wasteName'
                },
                {
                    title: '俗称',
                    key: 'wasteSc'
                },
                {
                    title: '本年度计划产生量（吨）',
                    key: 'thisYearCount'
                }
            ],
            modalForm: {},
            modalRules: {
                wasteName: [{
                    required: true, message: '不能为空！'
                }],
                thisYearCount: [{
                    required: true, message: '不能为空！'
                }]
            },
            reduceProMap: {
                totalNum: 0,
                pageSize: 10,
                curPage: 1,
                isEdit: false, // 是否编辑已有计划项
                wasteList: []
            },
            showProEmptyTip: false, // 填报减少危废产量计划为空标志
            showWasteEmptyTip: false, // 可选危废为空标志
            modal_loading: false,
            showModal: false
        }
    },
    computed: {
        // table列配置:详情和编辑，删除
        columns() {
            let baseColumns = this.baseColumns;
            let tempColumns = [];
            if(!this.isDetail) {
                tempColumns = [
                    {
                        title: '修改',
                        slot: 'edit'
                    },
                    {
                        title: '删除',
                        slot: 'delete'
                    }
                ];
            }
            baseColumns = [
                ...baseColumns,
                ...tempColumns
            ];
            return baseColumns;
        }
    },
    methods: {

        // 翻页
        handlePageNumChange(pageNum) {
            this.getProList({
                declareId: this.declareId,
                pageNum,
                pageSize: this.reduceProMap.pageSize
            })
        },

        // 获取表单中分页列表详情
        getProList(params = {}) {
            if(JSON.stringify(params) === '{}') {
                params = {
                    page: 1,
                    size: this.reduceProMap.pageSize
                }
            }

            this.$api.mbQueryApi.managementTable4Waste(this.declareId, params).then(res => {
                if(res) {                    
                    this.prolist = res.list;
                    this.reduceProMap.totalNum = res.total;
                } else {
                    this.prolist = [];
                    this.reduceProMap.totalNum = 0;
                    this.reduceProMap.curPage = 1;
                    // this.reduceProMap.curPage = 12; // test
                }
            })
        },
        // 获取表单详情
        getDetail() {
            // 获取表单详情
            this.$api.mbQueryApi.managementTable4(this.declareId).then(res => {
                if(res) {
                    // 编辑
                    this.isEdit = true;
                    this.form = res;
                }
            }).catch(err => {
                console.log('form4', err);
            }) 
        }
    },
    created() {
        // 获取表单详情
        this.getDetail();
        // 获取表单中分页列表详情
        this.getProList();

    }
}
</script>

<style lang="less" scoped>
    .mp-form4-wrapper {
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
                    min-height: 3.5em;
                    text-align: left;
                }
            }
            td {
                color: #515a6e;
            }
            th {
                width: 250px;
            }
            .table-td {
                min-width: 950px;
            }
            .add-btn-wrap {
                padding-bottom: 5px;
                text-align: right;
            }
            .project-table {
                max-width: 1000px;
                .icon-btn {
                    cursor: pointer;
                }
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
            .tabel-list {
                .tip {
                    color: #f04c1a;
                    font-size: 12px;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .pager {
                    margin-top: 8px;
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
    .mp-form4-wrapper .form-table {
        .ivu-form-item {
            margin-bottom: 0;
        }
        .project-table {
            .icon-btn {
                cursor: pointer;
            }
        }
    }
    .modal-form-add-waste-project {
        .tip {
            color: #f04c1a;
            margin: -13px 0 10px 102px;
        }
    }
</style>