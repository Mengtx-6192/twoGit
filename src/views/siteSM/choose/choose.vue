<template>
    <div class="choose-page padding20">
        <topTitle :title="'选址项目管理'"></topTitle>
        <div class="choose-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-check="check"></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
// import manageSection from '@/pages/siteSM/manage/manage';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('siteSM');
export default {
    name: 'choose',
    components: {
        topTitle,
        filterSection,
        baseTableSection
        // manageSection
    },
    data() {
        const { CODE, FILTER } = require('../../options');
        return {
            visible: false,
            config: {
                noTitle: true,
                show: 1
            },
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
                                name: '查看',
                                type: 'text',
                                icon: 'el-icon-view',
                                onClick: 'on-check'
                            }
                        ]
                    },
                    ...CODE
                ],
                url: '/rdp-prj/prj/siteMeeting/getProjectSiteList',
                pageable: true,
                pageableSetting: {
                    root: 'records'
                }
            }
        };
    },
    methods: {
        ...mapMutations(['setSiteDetailData']),
        async go(bool, params) {
            const res = await this.$api.siteSM.getSiteMeetingById({ ...params });
            this.setSiteDetailData(res);
            this.$router.push({
                path: '/siteSM/tabs',
                query: {
                    isRead: bool
                }
            });
        },
        check({ row }) {
            this.go(true, { siteMeetingId: row.siteMeetingId });
        },
        edit({ row }) {
            this.go(false, { siteMeetingId: row.siteMeetingId });
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
        }
    }
};
</script>

<style scoped lang="scss">
.choose-page {
    .choose-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
