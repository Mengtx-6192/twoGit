<template>
    <div class="site-info-page padding20">
        <topTitle
            v-if="$route.query.title"
            :title="$route.query.title"
            :btnList="btnList"
            @on-back="back"
            @on-save="save"
        ></topTitle>
        <div class="site-info-page-content">
            <tForm ref="forms" :model="data" :isRead="!!isRead" :options="formList"> </tForm>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import tForm from '@/components/form/tForm';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('siteSM');
export default {
    name: 'siteInfo',
    components: {
        tForm,
        topTitle
    },
    computed: {
        ...mapGetters(['siteDetail']),
        isRead() {
            return this.$route.query.isRead;
        },
        isShow() {
            return this.$route.query.show;
        },
        btnList() {
            return this.isShow
                ? [
                      {
                          name: '返回',
                          onClick: 'on-back'
                      },
                      {
                          name: '保存',
                          onClick: 'on-save'
                      }
                  ]
                : [];
        }
    },
    data() {
        return {
            model: {},
            data: {},
            formList: {
                labelWidth: 180,
                cols: 4,
                list: [
                    {
                        span: 2,
                        label: '点址编号',
                        disabled: true,
                        type: 'input',
                        placeholder: '自动生成',
                        name: 'siteNo',
                        rules: [{ required: true, message: '请输入点址编号', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '点址名称',
                        type: 'input',
                        placeholder: '请输入',
                        name: 'siteName',
                        rules: [{ required: true, message: '请输入点址名称', trigger: 'change' }]
                    },
                    // {
                    //     span: 2,
                    //     label: '点址坐标',
                    //     type: 'input',
                    //     placeholder: '请输入',
                    //     name: 'siteCoordinate',
                    //     rules: [{ required: true, message: '请输入点址名称', trigger: 'change' }]
                    // },
                    // {
                    //     span: 2,
                    //     label: '点址行政区划',
                    //     type: 'area',
                    //     placeholder: '选择',
                    //     name: 'siteDministrative',
                    //     rules: [{ required: true, message: '选择点址点址行政区划', trigger: 'change' }]
                    // },
                    {
                        span: 2,
                        label: '点址地址',
                        type: 'input',
                        placeholder: '请输入',
                        name: 'siteAddress',
                        rules: [{ required: true, message: '请输入点址名称', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '位置类型',
                        type: 'select',
                        placeholder: '请选择',
                        name: 'positionType',
                        // optionsList: window.$codeCollection['YK005'],
                        optionsList: [
                            { id: '1', label: '沿街商铺' },
                            { id: '2', label: '路口包角位' },
                            { id: '3', label: '路口第一间' },
                            { id: '4', label: '社区门口' },
                            { id: '5', label: '学校门口' },
                            { id: '6', label: '地铁口' },
                            { id: '7', label: '医院门口' },
                            { id: '8', label: '商场内' },
                            { id: '9', label: '商务楼内' },
                            { id: '10', label: '其他' }
                        ],
                        rules: [{ required: true, message: '请选择位置类型', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '物业条件',
                        type: 'select',
                        placeholder: '请选择',
                        // optionsList: window.$codeCollection['YK006'],
                        optionsList: [
                            { id: '1', label: '居民楼底层' },
                            { id: '2', label: '商务楼底商' },
                            { id: '3', label: '商场商铺' },
                            { id: '4', label: '独栋建筑' },
                            { id: '5', label: '公共设施内' },
                            { id: '6', label: '其他' }
                        ],
                        name: 'propertyConditions',
                        rules: [{ required: true, message: '请选择物业条件', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '商铺现状',
                        type: 'select',
                        placeholder: '请输入',
                        // optionsList: window.$codeCollection['YK007'],
                        optionsList: [
                            { id: '1', label: '新物业' },
                            { id: '2', label: '空关' },
                            { id: '3', label: '营业中' },
                            { id: '4', label: '其他' }
                        ],
                        name: 'shopStatus',
                        rules: [{ required: true, message: '请选择商铺现状', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '主商圈',
                        type: 'select',
                        placeholder: '请输入',
                        // optionsList: window.$codeCollection['YK008'],
                        optionsList: [
                            { id: '1', label: '社区型' },
                            { id: '2', label: '商务型' },
                            { id: '3', label: '流量型' },
                            { id: '4', label: '其他' }
                        ],
                        name: 'mainTradeArea',
                        rules: [{ required: true, message: '请选择主商圈', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '次商圈',
                        type: 'select',
                        placeholder: '请输入',
                        // optionsList: window.$codeCollection['YK008'],
                        optionsList: [
                            { id: '1', label: '社区型' },
                            { id: '2', label: '商务型' },
                            { id: '3', label: '流量型' },
                            { id: '4', label: '其他' },
                            { id: '5', label: '无' }
                        ],
                        name: 'secondaryTradeArea',
                        rules: [{ required: true, message: '请选择次商圈', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '建筑面积',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'buildArea',
                        rules: [{ required: true, message: '请输入建筑面积', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '使用面积',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'useArea',
                        rules: [{ required: true, message: '请输入使用面积', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '月租金',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'monthlyRent',
                        rules: [{ required: true, message: '请输入月租金', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '租金递增情况',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'rentIncrease',
                        rules: [{ required: true, message: '请输入租金递增情况', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '租赁年限',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'leaseTerm',
                        rules: [{ required: true, message: '请输入租赁年限', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '物业费',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'propertyFee',
                        rules: [{ required: true, message: '请输入物业费', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '是否有餐饮条件',
                        type: 'select',
                        placeholder: '请选择',
                        // optionsList: window.$codeCollection['YK004'],
                        optionsList: [
                            { id: '1', label: '是' },
                            { id: '2', label: '否' },
                            { id: '3', label: '不详' }
                        ],
                        name: 'isCateringConditions',
                        rules: [{ required: true, message: '请选择是否有餐饮条件', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '是否有排烟条件',
                        type: 'select',
                        placeholder: '请选择',
                        // optionsList: window.$codeCollection['YK004'],
                        optionsList: [
                            { id: '1', label: '是' },
                            { id: '2', label: '否' },
                            { id: '3', label: '不详' }
                        ],
                        name: 'isSmokeExhaust',
                        rules: [{ required: true, message: '请选择是否有排烟条件', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '上下水',
                        type: 'select',
                        placeholder: '请选择',
                        // optionsList: window.$codeCollection['YK004'],
                        optionsList: [
                            { id: '1', label: '是' },
                            { id: '2', label: '否' },
                            { id: '3', label: '不详' }
                        ],
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
                        type: 'input',
                        placeholder: '请选择',
                        // optionsList: window.$codeCollection['YK004'],
                        optionsList: [
                            { id: '1', label: '是' },
                            { id: '2', label: '否' },
                            { id: '3', label: '不详' }
                        ],
                        name: 'isCapacityIncrease',
                        rules: [{ required: true, message: '请选择电量是否可增容', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '可触达固定客群数量',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'fixedCustomers',
                        rules: [{ required: true, message: '请输入可触达固定客群数量', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '客流采点时间',
                        type: 'date',
                        placeholder: '请选择',
                        name: 'passengerMiningTime',
                        rules: [{ required: true, message: '请选择客流采点时间', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '采点客流量',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'passengerMiningFlow',
                        rules: [{ required: true, message: '请输入采点客流量', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '采点当日天气',
                        type: 'textarea',
                        placeholder: '请输入',
                        name: 'passengerMiningWeather',
                        rules: [{ required: true, message: '请输入采点当日天气', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '竞争对手情况',
                        type: 'textarea',
                        placeholder: '请输入',
                        name: 'competitors',
                        rules: [{ required: true, message: '请输入竞争对手情况', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '业主信息',
                        type: 'textarea',
                        placeholder: '请输入',
                        name: 'ownerInformation'
                    },
                    {
                        span: 2,
                        label: '业主联系方式',
                        type: 'textarea',
                        placeholder: '请输入',
                        name: 'ownerPhone'
                    }
                    // {
                    //     span: 1,
                    //     label: '门店照片-正面近景',
                    //     type: 'file',
                    //     placeholder: '请上传',
                    //     name: 'fontNearImage',
                    //     rules: [{ required: true, message: '请上传门店照片', trigger: 'change' }]
                    // },
                    // {
                    //     span: 1,
                    //     label: '门店照片-正面远景',
                    //     type: 'file',
                    //     placeholder: '请上传',
                    //     name: 'fontFarImage',
                    //     rules: [{ required: true, message: '请上传门店照片', trigger: 'change' }]
                    // },
                    // {
                    //     span: 1,
                    //     label: '门店照片-店铺左侧',
                    //     type: 'file',
                    //     placeholder: '请上传',
                    //     name: 'leftImage',
                    //     rules: [{ required: true, message: '请上传门店照片', trigger: 'change' }]
                    // },
                    // {
                    //     span: 1,
                    //     label: '门店照片-店铺右侧',
                    //     type: 'file',
                    //     placeholder: '请上传',
                    //     name: 'rightImage',
                    //     rules: [{ required: true, message: '请上传门店照片', trigger: 'change' }]
                    // }
                    // {
                    //     span: 2,
                    //     label: '视频',
                    //     type: 'input',
                    //     placeholder: '请上传',
                    //     name: 'video',
                    //     rules: [{ required: true, message: '请上传视频', trigger: 'change' }]
                    // },
                ]
            }
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        async save() {
            const res = await this.$refs.forms.getModel();
            console.log(res);
            delete res.prjId;
            await this.$api.siteSM.saveOrUpdateSiteMeeting({ ...res });
            this.$router.go(-1);
        },
        getModel() {
            return this.$refs.forms.getModel();
        }
    },
    mounted() {
        this.data = this.siteDetail;
        // console.log(this.siteDetail, this.model);
        // this.$refs.forms.setModel('siteNo', 2);
    }
};
</script>

<style scoped lang="scss">
.site-info-page {
    .site-info-page-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
