<template>
    <div class="base-table-section">
        <div class="base-table" v-if="data.hasOwnProperty('columns')">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                :max-height="data.height"
                @select-all="onSelectAll"
                @select="onSelectChange"
            >
                <el-table-column v-if="data.selection" type="selection" width="55"></el-table-column>
                <el-table-column
                    v-for="(item, i) in columns"
                    :key="i"
                    :prop="item.key"
                    :label="item.title"
                    :width="item.width"
                >
                    <template slot-scope="scope">
                        <!-- btn-event可以分别导出时间。btn-all导出一个集合，需要在引入的地方区分事件 -->
                        <BtnList
                            v-if="item.buttons"
                            type="text"
                            align="center"
                            :btnList="item.buttons"
                            @btn-event="btn($event, scope)"
                            @btn-all="
                                name => {
                                    $emit('on-all', name, scope);
                                }
                            "
                        ></BtnList>
                        <!-- <el-tag v-else-if="item.tags" :type="scope.column.property" :color="scope.column.property" >{{scope.row[scope.column.property]}}</el-tag> -->
                        <div v-else>{{ scope.row[scope.column.property] }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="base-pagination" v-if="data.pageable">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageConfig.pageSizes"
                :page-size="pageConfig.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageConfig.total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
/**
 *  data: {
 *    method: String,  // 默认'get'
 *    height: String
 *    selection: Boolean, // 多选框
 *    url: String,
 *    pageable: Boolean, //是否分页
 *    pageableSetting: {
 *      root: String, // 接受数据返回的层级，例如：'data>result'
 *      total: String // 条数
 *      pageSizeName: 'pageSize', // 配置每页条数
 *      pageNumberName: 'pageNo' // 配置页数
 *    }
 *    pageSizes: Array<Number> // 每页展示的条数
 *    columns: Array<{ title: String, key: String, fixed: Boolean }>
 *    extendColumns: {
 *      // title表头，key表头的字段名称，value从数据中哪个字段取值
 *      exData: Array<{ title: String, key: String, value: String }>
 *    }
 *    rows: Array
 *  }
 *
 *  event: {
 *    'on-select-all', 全选，返回数组
 *    'on-select-change', 单选，返回已选择项的数组集合
 *    'reload', 外面通过ref获取,用来刷新表格
 *    'getModel', 外面通过ref获取,用来获取表格数据,一般值使用url内部调用,且外部也需要使用返回值的情况
 *  }
 *
 */
import BtnList from '../buttonList';
import http from '@/api/http';
export default {
    name: 'baset-table',
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: { BtnList },
    computed: {
        getData() {
            return (params, res) => {
                if (!params) {
                    return;
                }
                let arr = params.split('>');
                let data = res || this.data;
                arr.forEach(v => {
                    if (data) {
                        data = data[v];
                    }
                });
                return data;
            };
        },
        pageConfig() {
            return {
                result: this.getData('result') || 'rows',
                pageSizes: this.getData('pageSizes') || [10, 20, 50],
                size: 10,
                num: 1,
                total: 0
            };
        },
        pageRoot() {
            return this.getData('pageableSetting>root');
        },
        getRows() {
            return num => {
                if (!this.getData('url')) {
                    let rows = this.pageRoot ? this.data[this.pageConfig.result] : this.data.localData || [];
                    if (!rows) {
                        return [];
                    }
                    return rows.slice((num - 1) * this.pageConfig.size, num * this.pageConfig.size);
                }
                let pageSize = this.getData('pageableSetting>pageSizeName') || '_pageSize';
                let pageNo = this.getData('pageableSetting>pageNumberName') || '_pageNo';
                let params = this.getData('params') || {};
                let params1 = this.getData('pageable')
                    ? {
                          [pageNo]: this.pageConfig.num || 1,
                          [pageSize]: this.pageConfig.size || 10
                      }
                    : {};
                let method = this.getData('method') || 'get';
                return http[method](this.getData('url'), Object.assign(params, params1));
            };
        }
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            columns: JSON.parse(JSON.stringify(this.data.columns || {}))
        };
    },
    watch: {
        'data.localData': {
            handler(val) {
                if (!val) {
                    return;
                }
                this.tableData = val;
            },
            deep: true
        },
        'data.columns': {
            handler(val) {
                if (!val) {
                    return;
                }
                this.columns = val;
            },
            deep: true
        }
    },
    created() {
        if (JSON.stringify(this.data) === '{}') {
            return;
        }
        this.tableApi();
    },
    methods: {
        async tableApi(num = 1) {
            const res = await this.getRows(num);
            let total = this.getData('pageableSetting>total') || 'total';
            this.pageConfig.total = res[total];
            this.tableData = this.pageRoot ? res[this.pageRoot] : res || [];
            if (!(this.tableData && this.tableData.length > 0)) {
                return;
            }
            this.getExtendColumns(this.tableData[0]);
        },
        getExtendColumns(data) {
            let _this = this;
            let exCol = { ...this.data.extendColumns };
            // 1. 判断是否存在 需要扩展表头
            if (!exCol || JSON.stringify(exCol) === '{}') {
                return;
            }
            // 2. 循环出存在几个扩展表头
            for (let k in exCol) {
                let list = data[k];
                let value = exCol[k][0];
                // 3. 根据每个扩展表头的字段判断是否有数据
                if (list && list.length > 0) {
                    list.forEach((v, i) => {
                        _this.columns.push({ title: v[value.title], key: v[value.key] });
                    });
                }
                _this.setExtendColumnsData(k, value.key, value.value);
            }
        },
        // 将扩展表头字段对应的值，拿出来
        setExtendColumnsData(k, key, val) {
            this.tableData.forEach(v => {
                if (!v[k]) {
                    return;
                }
                v[k].forEach((d, i) => {
                    v[d[key]] = d[key];
                    // todo... d[key]应该为d[value]，因为现在的d[value]没有值
                });
            });
        },
        /** * 表格组件事件 * **/
        btn(name, $scope) {
            this.$emit('on-all', name);
            this.$emit(name, $scope);
        },
        onSelectAll(val) {
            // 全选
            this.$emit('on-select-all', val);
        },
        onSelectChange(val) {
            // 单选
            this.$emit('on-select-change', val);
        },
        /** *******************************E_N_D*********************************** **/
        /** * 分页组件事件 * **/
        handleSizeChange(val) {
            this.pageConfig.size = val;
            this.tableApi(this.pageConfig.num);
        },
        handleCurrentChange(val) {
            this.pageConfig.num = val;
            this.tableApi(val);
        },
        reload(num = 1) {
            return this.tableApi(num);
        },
        getModel() {
            return this.tableData;
        }
        /** *******************************E_N_D*********************************** **/
    }
};
</script>

<style lang="scss" scoped>
.base-table-section {
    overflow: hidden;
    .base-pagination {
        float: right;
        padding: 20px 20px 0;
    }
}
</style>
