<template>
    <div class="apply-page padding20">
        <topTitle :title="'工程项目审批'"></topTitle>
        <div class="apply-content">
            <filter-section :options="filterOptions" @on-search="search" @on-rest="reset"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-apply="apply"></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('prjM');
export default {
    name: 'apply',
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
                formList: { ...FILTER }
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
                            },
                        ]
                    },
                    ...CODE
                ],
                url: '/rdp-prj/projectInfo/list',
                pageable: true,
                pageableSetting: {
                    root: 'records'
                }
            }
        };
    },
    methods: {
        ...mapMutations(['setPrjDetailData']),
        async go(bool, params) {
            const res = await this.$api.prjM.applyDetail({ ...params });
            this.setPrjDetailData(res);
            this.$router.push({
                path: '/prjM/create',
                query: {
                    isRead: bool,
                    page: 'apply'
                }
            });
        },
        apply({ row }) {
            this.go(true, { prjId: row.id });
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
        reset() {
            this.tableData.params = {};
            this.$refs.table.reload();
        }
    }
};
</script>

<style scoped lang="scss">
.apply-page {
    .apply-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
