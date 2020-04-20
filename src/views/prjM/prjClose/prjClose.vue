<template>
    <div class="prjClose-page padding20">
        <topTitle :title="'工程项目更改'" :btnList="btnList" @on-rest="rest" @on-close="close"></topTitle>
        <div class="prjClose-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-check="check"></base-table-section>
        </div>
    </div>
</template>

<script>
import topTitle from '@/components/topTitle';
import filterSection from '@/components/filter/filter';
import baseTableSection from '@/components/baseTable/baseTableSection';
export default {
    name: 'prjClose',
    components: {
        topTitle,
        filterSection,
        baseTableSection
    },
    data() {
        return {
            btnList: [
                {
                    name: '暂停/重启',
                    onClick: 'on-rest'
                },
                {
                    name: '关闭',
                    onClick: 'on-close'
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
                            label: '项目地址_中文',
                            type: 'input',
                            placeholder: '请输入',
                            name: 'addressCn'
                        }
                    ]
                }
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
                    {
                        title: '项目地址_中文',
                        key: 'addressCn'
                    },
                    {
                        title: '项目地址_英文',
                        key: 'addressEn',
                        width: 126
                    },
                    {
                        title: '其他面积描述',
                        key: 'areaOtherDesc'
                    }
                ],
                url: '/rdp-prj/projectInfo/manageList',
                pageable: true,
                pageableSetting: {
                    root: 'records'
                }
            }
        };
    },
    methods: {
        check() {
            this.$router.push({
                path: '/prjM/create'
            });
        },
        search(val) {
            console.log('search', val);
            this.tableData.params = { ...val };
            this.$refs.table.reload();
        },
        rest() {},
        close() {}
    }
};
</script>

<style scoped lang="scss">
.prjClose-page {
    .prjClose-content {
        padding: 20px;
        background: #fff;
    }
}
</style>
