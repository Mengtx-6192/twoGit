<template>
    <div class="operate-page padding20">
        <topTitle :title="'运营规划'"></topTitle>
        <div class="operate-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-check="check" @on-edit="edit"></base-table-section>
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
    name: 'operate',
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
                            },
                            {
                                name: '编辑运营规划',
                                type: 'text',
                                icon: 'el-icon-view',
                                onClick: 'on-edit'
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
            }
        };
    },
    methods: {
        ...mapMutations(['setVoteDetailData']),
        async go(bool = false, row) {
            let params = {
                condition: {
                    planId: row.planId
                }
            };
            const res = await this.$api.voteM.getVoteMeetingInfo({ ...params });
            this.setVoteDetailData(res);
            this.$router.push({
                path: '/voteM/detail',
                query: {
                    type: 'votePlanningInfo',
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
            this.go(true, row);
        },
        edit({ row }) {
            this.go(false, row);
        }
    }
};
</script>

<style scoped lang="scss">
.operate-page {
    .operate-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
