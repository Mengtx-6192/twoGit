<template>
    <div class="base-info">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('prjM');
export default {
    name: 'baseInfo',
    components: {
        iFormGroup
    },
    computed: {
        ...mapGetters(['prjDetail']),
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
                                optionsList: window.$codeCollection && window.$codeCollection['YK001']
                                // disabled: true
                            },
                            {
                                span: 2,
                                label: '项目编号',
                                type: 'input',
                                placeholder: '自动生成',
                                // disabled: true,
                                name: 'projectNo',
                                // rules: [{ required: true, message: '请输入项目编号', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '项目类型',
                                type: 'btnRadio',
                                optionsList: window.$codeCollection && window.$codeCollection['YK002'],
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
                                optionsList: window.$codeCollection && window.$codeCollection['R005'],
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
        this.model = this.prjDetail;
    }
};
</script>

<style scoped lang="scss"></style>
