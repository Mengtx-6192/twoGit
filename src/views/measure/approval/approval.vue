<template>
    <div class="measure-approval-page padding20">
        <topTitle :title="'现场测绘报告审批'"></topTitle>
        <div class="measure-approval-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-approval="approval"></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('measure');
export default {
    name: 'measure-approval',
    components: {
        topTitle,
        filterSection,
        baseTableSection
    },
    data() {
        const { CODE, FILTER } = require('../../options');
        return {
            filterOptions: {
                model: {},
                formList: {
                    ...FILTER
                }
            },
            tableData: {
                btnShow: 'showId',
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
                                onClick: 'on-approval'
                            }
                        ]
                    },
                    ...CODE
                ],
                url: '/rdp-prj/mapping/reportList',
                pageable: true,
                pageableSetting: {
                    root: 'records'
                }
            }
        };
    },
    methods: {
        ...mapMutations(['setMeasureDetailData']),
        async go(bool = false, params) {
            const res = await this.$api.measure.reportDetail({ ...params });
            this.setMeasureDetailData(res);
            this.$router.push({
                path: '/measure/submit/tabs',
                query: {
                    isRead: bool,
                    show: !bool,
                    page: 'approval'
                }
            });
        },
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
        approval({ row }) {
            this.go(true, { id: row.id });
        }
    }
};
</script>

<style scoped lang="scss">
.measure-approval-page {
    .measure-approval-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
