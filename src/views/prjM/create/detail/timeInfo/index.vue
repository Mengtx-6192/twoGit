<template>
    <div class="time-info">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('prjM');
export default {
    name: 'timeInfo',
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
            model: null,
            formGroupOptions: [
                {
                    groupName: '工期信息',
                    groupKey: 'b1',
                    baseInfo: {
                        labelWidth: 140,
                        cols: 4,
                        groupName: '工期信息',
                        list: [
                            {
                                span: 2,
                                label: '选址会开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'siteSelectStart',
                                // rules: [{ required: true, message: '请输入选址会开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '选址会结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'siteSelectEnd',
                                // rules: [{ required: true, message: '请输入选址会结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '量场开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'quantityFieldStart',
                                // rules: [{ required: true, message: '请输入量场开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '量场结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'quantityFieldEnd',
                                // rules: [{ required: true, message: '请输入量场结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '投决会开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'castDecisionStart',
                                // rules: [{ required: true, message: '请输入投决会开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '投决会结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'castDecisionEnd',
                                // rules: [{ required: true, message: '请输入投决会结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '工程筹备开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'projectPreparationStart',
                                // rules: [{ required: true, message: '请输入工程筹备开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '工程筹备结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'projectPreparationEnd',
                                // rules: [{ required: true, message: '请输入工程筹备结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '施工开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'constructionStart',
                                // rules: [{ required: true, message: '请输入施工开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '施工结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'constructionEnd',
                                // rules: [{ required: true, message: '请输入施工结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '门店点交开始日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'storePointStart',
                                // rules: [{ required: true, message: '请输入门店点交开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '门店点交结束日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'storePointEnd',
                                // rules: [{ required: true, message: '请输入门店点交结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '预计开业日期',
                                type: 'date',
                                placeholder: '自动带入',
                                name: 'estOpenDate',
                                // rules: [{ required: true, message: '请输入预计开业日期', trigger: 'change' }]
                            }
                        ]
                    }
                }
            ]
        };
    },
    mounted() {
        this.model = this.prjDetail;
    },
    methods: {
        getModel() {
            return this.$refs.forms.getModel();
        }
    }
};
</script>

<style scoped lang="scss"></style>
