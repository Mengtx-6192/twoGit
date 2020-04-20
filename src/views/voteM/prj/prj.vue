<template>
    <div class="vote-prj-page padding20">
        <topTitle :title="'投决项目管理'"></topTitle>
        <div class="vote-prj-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-check="check"></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('voteM');
export default {
    name: 'vote-prj',
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
                formList: FILTER
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
                                name: '查看',
                                type: 'text',
                                icon: 'el-icon-view',
                                onClick: 'on-check'
                            }
                        ]
                    },
                    ...CODE
                ],
                url: '/rdp-prj/prj/voteMeeting/getVoteMeetingList',
                pageable: true,
                pageableSetting: {
                    root: 'records'
                }
                // params: {
                //     condition: {
                //         prjStatus: '1'
                //     }
                // }
            }
        };
    },
    methods: {
        ...mapMutations(['setVoteDetailData']),
        async go(bool = false, row) {
            let params = {
                condition: {
                    platformId: row.platformId,
                    investmentId: row.investmentId,
                    planId: row.planId,
                    itPlanId: row.itPlanId,
                    finId: row.finId
                }
            };
            const res = await this.$api.voteM.getVoteMeetingInfo({ ...params });
            this.setVoteDetailData(res);
            this.$router.push({
                path: '/voteM/detail',
                query: {
                    isRead: bool,
                    show: !bool
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
        check({ row }) {
            this.go(false, row);
        }
    }
};
</script>

<style scoped lang="scss">
.vote-prj-page {
    .vote-prj-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
