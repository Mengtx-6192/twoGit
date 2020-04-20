<template>
    <div class="approve-modal">
        <h4 class="title">审批信息</h4>
        <t-form class="form" ref="form" :options="formList" :model="options.model"></t-form>
        <h4 class="title">审批历史</h4>
        <baseTableSection class="table" :data="tableData"></baseTableSection>
    </div>
</template>

<script>
import baseTableSection from './../baseTable/baseTableSection';
export default {
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        baseTableSection
    },
    data() {
        return {
            model: null,
            formList: {
                labelWidth: 120,
                cols: 2,
                list: [
                    {
                        span: 2,
                        label: '点址编号:',
                        type: 'radio',
                        name: 'siteNo',
                        optionsList: [
                            { id: '1', label: '通过' },
                            { id: '2', label: '拒绝' }
                        ],
                        rules: [{ required: true, message: '请输入点址编号', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '意见:',
                        type: 'textarea',
                        placeholder: '请输入',
                        name: 'siteName',
                        rules: [{ required: true, message: '请输入点址名称', trigger: 'change' }]
                    }
                ]
            },
            tableData: {
                columns: [
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        fixed: 'left',
                        buttons: [
                            {
                                name: '审批',
                                type: 'text',
                                icon: 'el-icon-view',
                                onClick: 'on-apply'
                            }
                        ]
                    },
                    {
                        title: '名称',
                        key: 'name'
                    }
                ],
                localData: [{ name: '1111' }]
                // url: '/rdp-prj/projectInfo/list',
                // pageable: true,
                // pageableSetting: {
                //     root: 'records'
                // }
            }
        };
    },
    methods: {
        getModel() {
            return this.$refs.form.getModel();
        }
    }
};
</script>

<style lang="scss" scoped>
.approve-modal {
    .title {
        margin: 20px;
        text-align: left;
        padding-left: 20px;
        border-left: 3px solid #3399ff;
    }
    .table {
        padding: 0 25px;
    }
}
</style>
