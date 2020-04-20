<template>
    <div class="prj-info">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('siteSM');
export default {
    name: 'prjInfo',
    components: {
        iFormGroup
    },
    computed: {
        ...mapGetters(['siteDetail']),
        isRead() {
            return this.$route.query.isRead;
        }
    },
    data() {
        return {
            model: {},
            formGroupOptions: [
                {
                    groupName: '基础信息',
                    groupKey: 'a1',
                    baseInfo: {
                        labelWidth: 140,
                        cols: 4,
                        groupName: '基础信息',
                        list: [
                            {
                                span: 2,
                                label: '项目状态',
                                type: 'select',
                                placeholder: '请选择',
                                name: 'status',
                                // optionsList: window.$codeCollection['R111'],
                                optionsList: [
                                    { id: 1, label: '正常' },
                                    { id: 2, label: '暂停' },
                                    { id: 3, label: '完成' },
                                    { id: 4, label: '关闭' }
                                ],
                                disabled: true
                            },
                            {
                                span: 2,
                                label: '项目编号',
                                type: 'input',
                                placeholder: '自动生成',
                                disabled: true,
                                name: 'projectNo',
                                rules: [{ required: true, message: '请输入项目编号', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '项目类型',
                                type: 'btnRadio',
                                // optionsList: window.$codeCollection['YK002'],
                                optionsList: [
                                    { id: 1, label: '纯新开' },
                                    { id: 2, label: '迁址新开' },
                                    { id: 3, label: '原址整改' }
                                ],
                                name: 'type',
                                rules: [{ required: true, message: '请选择项目类型', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '项目名称',
                                type: 'input',
                                placeholder: '请输入',
                                name: 'nameCn',
                                rules: [{ required: true, message: '请输入项目名称', trigger: 'change' }]
                            },
                            // {
                            //     span: 2,
                            //     label: '行政城市',
                            //     type: 'input',
                            //     name: 'nameCn2',
                            //     rules: [{ required: true, message: '请输入项目名称', trigger: 'change' }]
                            // },
                            {
                                span: 2,
                                label: '详细地址',
                                type: 'input',
                                placeholder: '请输入',
                                name: 'addressCn',
                                rules: [{ required: true, message: '请输入详细地址', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '经营类型',
                                type: 'btnRadio',
                                // optionsList: window.$codeCollection['YK003'],
                                optionsList: [
                                    { id: 1, label: '直营店' },
                                    { id: 2, label: '加盟' },
                                    { id: 3, label: '合作加盟' },
                                    { id: 4, label: '特许加盟	' }
                                ],
                                name: 'managementType',
                                rules: [{ required: true, message: '请选择经营类型', trigger: 'change' }]
                            }
                        ]
                    }
                }
            ]
        };
    },
    methods: {
        getModel() {
            return this.$refs.forms.getModel();
        }
    },
    mounted() {
        this.model = this.siteDetail;
        console.log((this.model.projectNo = 1111));
        console.log((this.model.status = 2));
    }
};
</script>

<style scoped lang="scss"></style>
