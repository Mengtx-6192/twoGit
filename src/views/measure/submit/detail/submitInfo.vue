<template>
    <div class="submit-info">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('measure');
export default {
    name: 'submitInfo',
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
                    groupName: '物业条件',
                    groupKey: 'a1',
                    baseInfo: {
                        labelWidth: 185,
                        cols: 4,
                        groupName: '物业条件',
                        list: [
                            {
                                span: 2,
                                label: '门前台阶数量',
                                type: 'number',
                                placeholder: '请输入',
                                name: 'stepsNumber',
                                rules: [{ required: true, message: '请输入门前台阶数量', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '是否有花坛/阻隔带',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isBarrierBelt',
                                rules: [{ required: true, message: '请选择是否有花坛/阻隔带', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '是否有餐饮条件',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isCateringConditions',
                                rules: [{ required: true, message: '请选择是否有餐饮条件', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '是否有排烟条件',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isEjectSmoke',
                                rules: [{ required: true, message: '请选择是否有排烟条件', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '上下水',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'plumbing',
                                rules: [{ required: true, message: '请选择上下水', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '电量',
                                type: 'number',
                                placeholder: '请输入',
                                name: 'electricQuantity',
                                rules: [{ required: true, message: '请输入电量', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '电量是否可增容',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isCapacityIncrease',
                                rules: [{ required: true, message: '请选择电量是否可增容', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '物业是否完成消防验收',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isFireControl',
                                rules: [{ required: true, message: '请选择物业是否完成消防验收', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '物业是否需要办理进场手续',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isEntryFormalities',
                                rules: [
                                    { required: true, message: '请选择物业是否需要办理进场手续', trigger: 'change' }
                                ]
                            },
                            {
                                span: 2,
                                label: '收房时是否完成拆除清场',
                                type: 'select',
                                placeholder: '请选择',
                                optionsList: window.$codeCollection && window.$codeCollection['YK004'],
                                name: 'isDismantlingClearance	',
                                rules: [{ required: true, message: '请选择收房时是否完成拆除清场', trigger: 'change' }]
                            }
                        ]
                    }
                },
                {
                    groupName: '现场测绘信息',
                    groupKey: 'a2',
                    baseInfo: {
                        labelWidth: 185,
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
                                type: 'textarea',
                                placeholder: '请输入',
                                name: 'mappingRemark',
                                rules: [{ required: true, message: '请输入测绘说明', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '现场照片',
                                type: 'file',
                                placeholder: '请上传',
                                name: 'scenePhotos',
                                rules: [{ required: true, message: '请上传现场照片', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '现场测绘图纸',
                                type: 'file',
                                placeholder: '请上传',
                                name: 'siteMappingDrawing',
                                rules: [{ required: true, message: '请上传现场测绘图纸', trigger: 'change' }]
                            },
                            {
                                span: 2,
                                label: '装修面积',
                                type: 'number',
                                placeholder: '请输入',
                                name: 'decorationArea'
                            },
                            {
                                span: 2,
                                label: '踏勘设计公司',
                                type: 'select',
                                placeholder: '请选择',
                                name: 'surveyDesignCompany	'
                            },
                            {
                                span: 2,
                                label: '装修厂商',
                                type: 'select',
                                placeholder: '请选择',
                                name: 'decorationManufacturer'
                            },
                            {
                                span: 2,
                                label: '其他说明',
                                type: 'textarea',
                                placeholder: '请输入',
                                name: 'effectStatus'
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
.submit-info {
}
</style>
