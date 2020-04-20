<template>
    <div class="fieldSketch-page padding20">
        <topTitle :title="'现场测绘提请'"></topTitle>
        <div class="fieldSketch-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section
                ref="table"
                :data="tableData"
                @on-create="create"
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
    name: 'fieldSketch',
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
                btnShow: 'showId',
                columns: [
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        fixed: 'left',
                        buttons: [
                            {
                                name: '创建提请',
                                type: 'text',
                                show: '1',
                                icon: 'el-icon-view',
                                onClick: 'on-create'
                            },
                            {
                                name: '查看提请',
                                type: 'text',
                                show: '2',
                                icon: 'el-icon-edit-outline',
                                onClick: 'on-check'
                            }
                        ]
                    },
                    ...CODE
                ],
                // localData: [
                //     { nameCn: 1, showId: '1' },
                //     { nameCn: 2, showId: '2' }
                // ],
                url: '/rdp-prj/mapping/requestList',
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
        ...mapMutations(['setMeasureDetailData']),
        async go(bool = false, params) {
            const res = await this.$api.measure.requestDetail({ ...params });
            this.setMeasureDetailData(res);
            this.$router.push({
                path: '/measure/fieldSketch/tabs',
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
        create({ row }) {
            this.go(false, { id: row.id });
        },
        check({ row }) {
            this.go(true, { id: row.id });
        }
    }
};
</script>

<style scoped lang="scss">
.fieldSketch-page {
    .fieldSketch-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
