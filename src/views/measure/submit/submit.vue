<template>
    <div class="fieldSketch-submit-page padding20">
        <topTitle :title="'现场测绘报告'"></topTitle>
        <div class="fieldSketch-submit-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section
                ref="table"
                :data="tableData"
                @on-back="back"
                @on-submit="submit"
                @on-reset="reset"
                @on-check="check"
            ></base-table-section>
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
    name: 'fieldSketch-submit',
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
                                name: '查看',
                                type: 'text',
                                icon: 'el-icon-view',
                                onClick: 'on-check'
                            },
                            {
                                name: '重报',
                                type: 'text',
                                show: '1',
                                icon: 'el-icon-edit-outline',
                                onClick: 'on-reset'
                            },
                            {
                                name: '提报',
                                type: 'text',
                                show: '2',
                                icon: 'el-icon-edit-outline',
                                onClick: 'on-submit'
                            },
                            // {
                            //     name: '撤回',
                            //     type: 'text',
                            //     show: '2',
                            //     icon: 'el-icon-edit-outline',
                            //     onClick: 'on-back'
                            // }
                        ]
                    },
                    ...CODE
                ],
                // localData: [
                //     { nameCn: 1, showId: '1' },
                //     { nameCn: 2, showId: '2' }
                // ]
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
        reset() {
            // this.go();
        },
        back() {
            this.$router.go(-1);
        },
        submit({ row }) {
            this.go(false, { id: row.id });
        },
        check({ row }) {
            this.go(true, { id: row.id });
        }
    }
};
</script>

<style scoped lang="scss">
.fieldSketch-submit-page {
    .fieldSketch-submit-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
