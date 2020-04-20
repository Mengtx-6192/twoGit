<template>
    <div class="site-manage-page padding20">
        <topTitle v-if="!options.noTitle" :title="'点址管理'"></topTitle>
        <div class="site-manage-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <button-list class="site-btn" :btnList="btnList" @btn-event="btnEvents"></button-list>
            <base-table-section
                ref="table"
                :data="tableData"
                @on-check="check"
                @on-edit="edit"
                @on-apply="apply"
                @on-select-change="selectChange"
            ></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
import buttonList from '@/components/buttonList/buttonList';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('siteSM');
export default {
    name: 'site-manage',
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        topTitle,
        filterSection,
        buttonList,
        baseTableSection
    },
    data() {
        return {
            selectList: [],
            btnList: [
                {
                    name: 'gis数据同步',
                    onClick: 'on-gis'
                }
            ],
            filterOptions: {
                model: {},
                formList: {
                    labelWidth: 130,
                    cols: 3,
                    list: [
                        {
                            span: 1,
                            label: '点址名称',
                            type: 'input',
                            placeholder: '请输入',
                            name: 'siteName'
                        },
                        {
                            span: 1,
                            label: '点址来源',
                            type: 'select',
                            placeholder: '请输入',
                            name: 'addressEn'
                        },
                        {
                            span: 1,
                            label: '点址行政区划',
                            type: 'select',
                            placeholder: '请输入',
                            name: 'siteDministrative'
                        }
                    ]
                }
            },
            btnClo: !this.options.show
                ? [
                      {
                          title: '操作',
                          align: 'center',
                          width: 200,
                          fixed: 'left',
                          buttons: [
                              {
                                  name: '查看',
                                  type: 'text',
                                  icon: 'el-icon-view',
                                  onClick: 'on-check'
                              },
                              {
                                  name: '项目立项',
                                  type: 'text',
                                  icon: 'el-icon-view',
                                  onClick: 'on-apply'
                              }
                          ]
                      }
                  ]
                : [],
            tableData: {}
        };
    },
    created() {
        this.tableData = {
            columns: [
                ...this.btnClo,
                {
                    title: '点址编号',
                    key: 'siteNo'
                },
                {
                    title: '点址来源',
                    key: 'addressEn',
                    width: 126
                },
                {
                    title: '点址名称',
                    key: 'siteName'
                },
                {
                    title: '点址行政区划',
                    key: 'siteDministrative	'
                },
                {
                    title: '点址地址',
                    key: 'siteAddress'
                },
                {
                    title: '备注',
                    key: 'remark'
                }
            ],
            selection: this.options.show,
            url: '/rdp-prj/prj/siteMeeting/getSiteMeetingList',
            pageable: true,
            pageableSetting: {
                root: 'records'
            }
        };
    },
    methods: {
        ...mapMutations(['setSiteDetailData']),
        // filter
        search(val) {
            let value = {
                condition: {
                    ...val
                }
            };
            if (!this.tableData.params) {
                this.tableData.params = {};
            }
            Object.assign(this.tableData.params, value);
            this.$refs.table.reload();
        },
        // btn-list
        btnEvents(name) {
            if (name === 'on-gis') {
                this.gis();
            }
        },
        async gis() {
            const res = await this.$api.siteSM.DataGisProSynch();
            await this.$refs.table.reload();
            this.$message.success('数据同步成功！');
        },
        // table
        check({ row }) {
            this.go(true, { siteMeetingId: row.id });
        },
        edit({ row }) {
            this.go(false, { siteMeetingId: row.id });
        },
        apply({ row }) {
            // this.setPrjDetailData({});
            this.$router.push({
                path: '/prjM/create'
            });
        },
        selectChange(val) {
            this.selectList = val;
        },
        async go(bool = false, params) {
            let res = { ...params };
            if (params) {
                res = await this.$api.siteSM.getSiteMeetingById({ ...params });
            }
            this.setSiteDetailData(res);
            this.$router.push({
                path: '/siteSM/create',
                query: {
                    title: '点址详情',
                    isRead: bool,
                    show: !bool
                }
            });
        },
    }
};
</script>

<style scoped lang="scss">
.site-manage-page {
    .site-manage-content {
        padding: 20px;
        background: #fff;
    }
    .site-btn {
        margin: 0 20px 20px;
        text-align: right;
    }
}
</style>
