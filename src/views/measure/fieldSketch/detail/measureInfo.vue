<template>
    <div class="measure-info">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('measure');
export default {
    name: 'measureInfo',
    components: {
        iFormGroup
    },
    computed: {
        ...mapGetters(['measureDetail']),
        isRead() {
            return this.$route.query.isRead;
        }
    },
    mounted() {
        this.model = this.measureDetail;
    },
    data() {
        return {
            model: null,
            formGroupOptions: [
                {
                    groupName: '点址信息',
                    groupKey: 'a1',
                    baseInfo: {
                        labelWidth: 140,
                        cols: 4,
                        groupName: '点址信息',
                        list: [
                            {
                                span: 2,
                                label: '点址名称',
                                type: 'input',
                                placeholder: '自动带入',
                                // disabled: true,
                                name: 'siteName',
                                rules: [{ required: true, message: '请输入点址名称', trigger: 'change' }]
                            }
                            // {
                            //     span: 2,
                            //     label: '点址行政区划',
                            //     type: 'input',
                            //     placeholder: '自动带入',
                            //     disabled: true,
                            //     name: 'siteDministrative',
                            //     rules: [{ required: true, message: '请输入点址行政区划', trigger: 'change' }]
                            // },
                            // {
                            //     span: 2,
                            //     label: '点址地址',
                            //     type: 'input',
                            //     placeholder: '自动带入',
                            //     disabled: true,
                            //     name: 'siteAddress',
                            //     rules: [{ required: true, message: '请输入点址地址', trigger: 'change' }]
                            // },
                            // {
                            //     span: 2,
                            //     label: '建筑面积',
                            //     type: 'input',
                            //     placeholder: '自动带入',
                            //     disabled: true,
                            //     name: 'buildArea',
                            //     rules: [{ required: true, message: '请输入建筑面积', trigger: 'change' }]
                            // },
                            // {
                            //     span: 2,
                            //     label: '使用面积',
                            //     type: 'input',
                            //     placeholder: '自动带入',
                            //     disabled: true,
                            //     name: 'useArea',
                            //     rules: [{ required: true, message: '请输入使用面积', trigger: 'change' }]
                            // }
                        ]
                    }
                },
                {
                    groupName: '现场测绘信息',
                    groupKey: 'a2',
                    baseInfo: {
                        labelWidth: 140,
                        cols: 4,
                        groupName: '现场测绘信息',
                        list: [
                            {
                                span: 2,
                                label: '测绘开始日期',
                                type: 'date',
                                placeholder: '请选择',
                                name: 'mappingStartDate',
                                rules: [{ required: true, message: '请选择测绘开始日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '测绘结束日期',
                                type: 'date',
                                placeholder: '请选择',
                                name: 'mappingEndDate',
                                rules: [{ required: true, message: '请选择测绘结束日期', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '测绘说明',
                                type: 'input',
                                placeholder: '请输入',
                                name: 'mappingRemark'
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
        },
        setModel(params) {
            return (this.model = params);
        }
    }
};
</script>

<style scoped lang="scss">
.measure-info {
}
</style>
