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
                            :show="show(scope)"
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
 *    btnShow: String, // 有时候表格上的按钮根据某个属性来变化，这时可以传入该字段，例如： status === 1，显示'查看',2时显示'新建'，就可以btnShow: 'status'
 *    method: String,  // 默认'post'
 *    url: String,
 *    height: String
 *    selection: Boolean, // 多选框
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
 *    'changeBean', 如果表格中某列需要转换码值，将columns对应参数加上code，例如 { key:'x', title: 'x', code: window.xx[] }
 *    'reload', 外面通过ref获取,用来刷新表格
 *    'getModel', 外面通过ref获取,用来获取表格数据,一般值使用url内部调用,且外部也需要使用返回值的情况
 *  }
 *
 */
import BtnList from '@/components/buttonList/buttonList';
import API from '@/services/service';
export default {
    name: 'baseTableSection',
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
        show() {
            return ({ $index }) => {
                if (!(this.tableData && this.tableData.length > 0 && this.data.btnShow)) {
                    return '';
                }
                return this.tableData[$index][this.data.btnShow];
            };
        },
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
                let method = this.getData('method') || 'post';
                return API[method](this.getData('url'), Object.assign(params, params1));
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
            let result = this.pageRoot ? res[this.pageRoot] : res || [];
            this.tableData = this.changeBean(result);
        },
        changeBean(data) {
            this.columns.forEach(v => {
                if (!v.code) {
                    return;
                }
                data.forEach(d => {
                    if (!d[v.key]) {
                        return;
                    }
                    let index = v.code.findIndex(k => k.id === d[v.key]);
                    if (index === -1) {
                        return;
                    }
                    d[v.key] = v.code[index].label;
                });
            });
            return data;
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
