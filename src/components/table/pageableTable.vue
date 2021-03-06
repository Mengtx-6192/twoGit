<template>
    <div class="table-section">
        <el-table
            ref="table"
            :data="tableData"
            :height="height"
            :max-height="maxHeight"
            :stripe="stripe"
            :border="border"
            :size="size"
            :fit="fit"
            :show-header="showHeader"
            :highlight-current-row="highlightCurrentRow"
            :current-row-key="currentRowKey"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :cell-class-name="cellClassName"
            :cell-style="cellStyle"
            :header-row-class-name="headerRowClassName"
            :header-row-style="headerRowStyle"
            :header-cell-class-name="headerCellClassName"
            :header-cell-style="headerCellStyle"
            :row-key="rowKey"
            :empty-text="emptyText"
            :default-expand-all="defaultExpandAll"
            :expand-row-keys="expandRowKeys"
            :default-sort="defaultSort"
            :tooltip-effect="tooltipEffect"
            :show-summary="showSummary"
            :sum-text="sumText"
            :summary-method="summaryMethod"
            :span-method="spanMethod"
            :select-on-indeterminate="selectOnIndeterminate"
            :indent="indent"
            :lazy="lazy"
            :load="load"
            :tree-props="treeProps"
            @select="select"
            @select-all="onSelectAll"
            @selection-change="onSelectionChange"
            @cell-mouse-enter="cellMouseEnter"
            @cell-mouse-leave="cellMouseLeave"
            @cell-click="cellClick"
            @cell-dblclick="cellDblclick"
            @row-click="rowClick"
            @row-contextmenu="rowContextmenu"
            @row-dblclick="rowDblclick"
            @header-click="headerClick"
            @header-contextmenu="headerContextmenu"
            @sort-change="sortChange"
            @filter-change="filterChange"
            @current-change="currentChange"
            @header-dragend="headerDragend"
            @expand-change="expandChange"
        >
            <!-- slot 添加自定义配置项 -->
            <template v-for="(item, index) in innerColumns">
                <slot v-if="item.slot" :name="item.slot"></slot>
                <el-table-column v-else-if="item.type === 'expand'" type="expand" :key="index" :width="item.width">
                    <!-- <cell :item="item" :index="index"></cell> -->
                    <template slot-scope="scope">
                        <template v-if="!item.render">
                            <template v-if="item.formatter">
                                <span v-html="item.formatter(scope.row, item)"></span>
                            </template>
                            <template v-else>
                                <span>{{ scope.row[item.key] }}</span>
                            </template>
                        </template>
                        <template v-else>
                            <expand-dom
                                :column="item"
                                :row="scope.row"
                                :rowIndex="scope.$index"
                                :render="item.render"
                                :index="index"
                            ></expand-dom>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else-if="item.type === 'selection'"
                    type="selection"
                    :selectable="selectable"
                    :disabled="item.disabled"
                    width="55"
                    :key="index"
                ></el-table-column>
                <el-table-column
                    v-else-if="item.type === 'index'"
                    type="index"
                    style="width: 55px;"
                    :key="index"
                ></el-table-column>
                <table-column v-else :key="index" :item="item" :index="index"></table-column>
            </template>
        </el-table>

        <el-pagination
            v-if="pageable && pageVisible"
            :total="totalCount"
            :page-size="innerPageSize"
            background
            layout="prev, pager, next, total, sizes"
            @size-change="pageSizeChange"
            @prev-click="changePage"
            @next-click="changePage"
            :page-sizes="pageSizeOpts"
            :current-page.sync="innerPageNumber"
            style="margin-top: 8px;"
            @current-change="changePage"
            :style="{ 'text-align': pagePlacement }"
        >
        </el-pagination>
        <el-dialog
            v-model="customColumnVisible"
            title="自定义列"
            class-name="table-section-custom-column"
            width="650px"
            @on-ok="customColumnOk"
        >
            <div class="custom-column-item-wrap" v-if="customColumnVisible">
                <div v-for="(item, index) in customColumns" :key="index" class="custom-column-item">
                    <el-checkbox v-model="item.defaultVisible" :disabled="item.alwaysVisible" :name="item.key">
                        {{ item.title }}</el-checkbox
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
/** *
     * @options
     *
     * columns: 表格的列
     * url：请求数据url
     * pageSize： 每页大小 默认值： 10
     * params：请求参数
     * pageSizeOpts: 分页大小下拉选项 默认值 [10, 20 , 50]
     * pageableSetting：接口返回结果结构配置
     * manualLoad: 是否默认初始化时不调用请求，需要请求数据时使用reload手动刷新数据（多用于初始化阶段请求参数params未准备好的情况
     *
     * @example
     *
     * <pageable-table :columns="columns"
     :url="$service.api.getAllOperateLog">
     </pageable-table>
     */
import DataAdapter from './dataAdapter';
import tableColumn from './tableColumn';
import expandDom from './expandDom';

export default {
    props: {
        columns: {
            type: Array
        },

        url: {
            type: String
        },

        pageSizeOpts: {
            type: Array,
            default: function() {
                return [10, 20, 50];
            }
        },

        pageSize: {
            type: Number,
            default: 10
        },

        params: {
            type: Object,
            default: function() {
                return {};
            }
        },

        height: {
            type: [Number, String]
            // default: 'auto'
        },

        pageableSetting: {
            type: Object,
            default: function() {
                return {};
            }
        },

        pagePlacement: {
            type: String,
            default: 'right'
        },

        manualLoad: {
            type: Boolean,
            default: false
        },
        needCustomColumn: {
            type: Boolean,
            default: false
        },
        pageable: {
            type: Boolean,
            default: true
        },
        graphqlModelConfig: {
            type: Object
        },
        localData: {
            type: Array
        },
        border: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'small'
        },
        pageVisible: {
            type: Boolean,
            default: true
        },
        pageNumber: {
            type: Number,
            default: 1
        },
        selectionCache: {
            type: Boolean,
            default: false
        },
        uniqueId: {
            type: String
        },
        selection: {
            type: Boolean
        },
        methodType: {
            type: String
        },
        maxHeight: {
            type: [String, Number]
        },
        fit: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        currentRowKey: {
            type: [String, Number]
        },
        rowClassName: {
            type: [Function, String]
        },
        rowStyle: {
            type: [Function, Object]
        },
        cellClassName: {
            type: [Function, String]
        },
        cellStyle: {
            type: [Function, Object]
        },
        headerRowClassName: {
            type: [Function, String]
        },
        headerRowStyle: {
            type: [Function, Object]
        },
        headerCellClassName: {
            type: [Function, String]
        },
        headerCellStyle: {
            type: [Function, Object]
        },
        rowKey: {
            type: [Function, String]
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        expandRowKeys: {
            type: Array
        },
        defaultSort: {
            type: Object
        },
        tooltipEffect: {
            type: String
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        sumText: {
            type: String,
            default: '合计'
        },
        summaryMethod: {
            type: Function
        },
        spanMethod: {
            type: Function
        },
        selectOnIndeterminate: {
            type: Boolean,
            default: true
        },
        indent: {
            type: Number,
            default: 16
        },
        lazy: {
            type: Boolean
        },
        load: {
            type: Function
        },
        treeProps: {
            type: Object
        },
        headers: {
            type: Object
        },
        total: {
            type: Number
        }
    },

    components: {
        // elTable: Table,
        // elTableColumn: TableColumn,
        tableColumn,
        expandDom
    },

    computed: {
        dataAdapter() {
            let defaultRoot = this.pageable ? 'result>result' : 'result';
            return new DataAdapter({
                graphqlModelConfig: this.graphqlModelConfig,
                mock: this.mock,
                url: this.mock ? '/mock/' + this.url : this.url,
                method: this.methodType,
                totalRoot: this.pageableSetting.totalRoot || 'result>totalSize',
                pageSizeRoot: this.pageableSetting.pageSizeRoot || 'result>_pageSize',
                pageNumberRoot: this.pageableSetting.pageNumberRoot || 'result>_pageNo',
                root: this.pageableSetting.root || defaultRoot,
                pageSizeName: this.pageableSetting.pageSizeName || '_pageSize',
                pageNumberName: this.pageableSetting.pageNumberName || '_pageNo'
            });
        },

        innerColumns() {
            if (this.needCustomColumn) {
                return _.filter(this.columns, it => {
                    return it.defaultVisible && !(it.visible === false);
                });
            } else {
                return _.filter(this.columns, it => !(it.visible === false));
            }
        }
    },

    data: function() {
        return {
            customColumnVisible: false,
            innerNoDataText: '',
            totalCount: this.total || 0,
            innerPageSize: this.pageSize,
            innerPageNumber: this.pageNumber,
            tableData: this.localData || [],
            selectionData: [],
            customColumns: [],
            isDestroyed: false
        };
    },

    mounted() {
        this.$emit('on-table-mounted');
        if (!this.manualLoad && !this.localData) {
            this._reload();
        }
    },

    created() {
        if (this.localData) {
            this.selectionData = _.filter(this.tableData, it => {
                return it._checked;
            });
        }
    },

    watch: {
        localData: {
            handler() {
                _.each(this.localData, it => {
                    if (!it.__uniqId) {
                        it.__uniqId = _.uniqueId();
                        it._rowKey = '_row_uniq_' + it.__uniqId;
                    }
                });
                this.tableData = this.localData;
                this.selectionData = _.filter(this.tableData, it => {
                    return it._checked;
                });
            },
            deep: true
        },
        pageSize() {
            this.innerPageSize = this.pageSize;
        },
        innerPageSize() {
            this.innerPageNumber = 1;
            this.selectionData = [];
            if (this.url) {
                this._reload(this._lastParams);
            }
            this.$emit('on-page-size-change', this.innerPageSize);
        },
        pageNumber() {
            this.innerPageNumber = this.pageNumber;
        },
        total() {
            this.totalCount = this.total;
        }
    },

    methods: {
        selectable(row, index) {
            return row.selectable !== false ? true : false;
        },
        getCustomCellInstance(columnName, rowIndex, columnIndex) {
            let refs = this.$refs.table.$children[columnIndex].$refs;
            if (refs) {
                let instance = null;
                if (refs[columnName + '' + rowIndex]) {
                    instance = refs[columnName + '' + rowIndex];
                }

                return instance;
            }
        },
        getTableData() {
            return this.tableData;
        },
        selectAll(status) {
            this.$refs.table.selectAll(status);
        },
        getSelected() {
            return this.selectionData;
        },
        disableAll(status) {
            this.tableData.forEach(element => {
                element._disabled = status;
            });
        },
        check(items, prop) {
            this.tableData.forEach(it => {
                this.$set(it, '_checked', false);
                let target = _.find(items, item => item[prop] === it[prop]) || false;
                it._checked = !!target;
            });
        },
        selectAndDisableAll(status) {
            if (status) {
                this.$emit('on-cancel-select-all');
            }
            this.tableData.forEach(element => {
                element._checked = status;
                element._disabled = status;
            });
        },
        onSelectionChange(selection) {
            if (!this.selectionCache) {
                this.selectionData = selection;
            } else {
                let otherPageSelected = _.filter(this.selectionData, it => {
                    return !_.find(this.tableData, it2 => {
                        return it[this.uniqueId] === it2[this.uniqueId];
                    });
                });
                this.selectionData = otherPageSelected.concat(selection);
            }

            this.$emit('on-selection-change', selection);
        },
        onSelectAll(selections) {
            if (!this.selectionCache) {
                this.selectionData = selections;
            } else {
                let otherPageSelected = _.filter(this.selectionData, it => {
                    return !_.find(this.tableData, it2 => {
                        return it[this.uniqueId] === it2[this.uniqueId];
                    });
                });
                this.selectionData = otherPageSelected.concat(selections);
            }
            this.$emit('on-select-all', selections);
        },
        select(selection, row) {
            this.$emit('on-select', selection, row);
        },
        cellMouseEnter(row, column, cell, event) {
            this.$emit('cell-mouse-enter', row, column, cell, event);
        },
        cellMouseLeave(row, column, cell, event) {
            this.$emit('cell-mouse-leave', row, column, cell, event);
        },
        cellClick(row, column, cell, event) {
            this.$emit('cell-click', row, column, cell, event);
        },
        cellDblclick(row, column, cell, event) {
            this.$emit('cell-dblclick', row, column, cell, event);
        },
        rowContextmenu(row, column, event) {
            this.$emit('row-contextmenu', row, column, event);
        },
        rowDblclick(row, column, event) {
            this.$emit('row-dblclick', row, column, event);
        },
        headerClick(column, event) {
            this.$emit('header-click', column, event);
        },
        headerContextmenu(column, event) {
            this.$emit('header-contextmenu', column, event);
        },
        filterChange(filters) {
            this.$emit('filter-change', filters);
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$emit('current-change', currentRow, oldCurrentRow);
        },
        headerDragend(newWidth, oldWidth, column, event) {
            this.$emit('header-dragend', newWidth, oldWidth, column, event);
        },
        expandChange(row, expanded) {
            this.$emit('expand-change', row, expanded);
        },
        _reload(p) {
            let params = _.assign({}, this.params, p);

            this.innerNoDataText = '<span>数据加载中...</span>';
            this.tableData = [];
            return this.dataAdapter
                .load(this.innerPageSize, this.innerPageNumber, params, this.pageable, this.headers)
                .then(res => {
                    this.totalCount = res.total || 0;

                    if (!this.selectionCache) {
                        this.selectionData = [];
                    }

                    if (res.list.length === 0) {
                        this.innerNoDataText = this.emptyText;
                    }

                    this.$nextTick(() => {
                        this.tableData = res.list.map(item => {
                            if (this.selectionCache && this.uniqueId) {
                                item._checked = !!_.find(
                                    this.selectionData,
                                    it => it[this.uniqueId] === item[this.uniqueId]
                                );
                            } else {
                                item._disabled = false;
                                item._checked = false;
                            }

                            if (!item.__uniqId) {
                                item.__uniqId = _.uniqueId();
                                item._rowKey = '_row_uniq_' + item.__uniqId;
                            }

                            return item;
                        });
                        this.$emit('on-after-ajax', {
                            total: this.totalCount,
                            list: res.list,
                            searchParams: params,
                            pageSize: this.innerPageSize,
                            pageNumber: this.innerPageNumber,
                            original: res.original
                        });
                        setTimeout(() => {
                            if (this.isDestroyed) {
                                return;
                            }
                            let e = document.createEvent('MouseEvents');
                            e.initEvent('scroll', true, true); // 这里的click可以换成你想触发的行为
                            this.$el.querySelector('.el-table__body').dispatchEvent(e);
                            const checkedList = _.filter(res.list, it => {
                                return it._checked;
                            });
                            // 用户在on-after-ajax事件中手动添加默认选中时，将选中项加入selectionData
                            if (this.selection && this.uniqueId) {
                                _.each(checkedList, it2 => {
                                    const finded = _.find(this.selectionData, it => {
                                        return it[this.uniqueId] === it2[this.uniqueId];
                                    });
                                    if (!finded) {
                                        this.selectionData.push(it2);
                                    }
                                });
                            }
                        }, 20);
                    });
                })
                .catch(() => {
                    this.innerNoDataText = '<span class="c-font-error">接口错误，请刷新重试或联系管理员</span>';
                });
        },

        reload(params) {
            if (params) {
                this._lastParams = params;
            }
            this.$nextTick(() => {
                this._reload(params || this._lastParams);
            });
        },

        reloadFirstPage(params) {
            this.selectionData = [];
            this.innerPageNumber = 1;
            this.reload(params);
        },

        pageSizeChange(pageSize) {
            this.innerPageSize = pageSize;
        },

        changePage(pageNumber) {
            this.innerPageNumber = pageNumber;
            if (!this.selectionCache) {
                this.selectionData = [];
            }
            if (this.url) {
                this._reload(this._lastParams);
            }
            this.$emit('on-change-page', pageNumber);
        },

        rowClick(row, column, event) {
            this.$emit('on-row-click', row, column, event);
        },

        showCustomColumnModal() {
            let columns = _.cloneDeep(this.columns);
            columns = _.filter(columns, it => {
                return it.type !== 'selection' && !it.buttons;
            });

            this.customColumns = columns;
            this.customColumnVisible = true;
        },

        getOriginTable() {
            return this.$refs.table;
        },

        customColumnOk() {
            _.each(this.customColumns, it => {
                let column = _.find(this.columns, it2 => {
                    return it2._uuid === it._uuid;
                });

                column.defaultVisible = it.defaultVisible;
            });
        },

        sortChange(column, prop, order) {
            this.$emit('on-sort-change', column, prop, order);
        }
    },

    destroyed() {
        this.isDestroyed = true;
    }
};
</script>
<style lang="scss">
.table-section-custom-column {
    .custom-column-item-wrap {
        padding-bottom: 24px;
    }
    .custom-column-item {
        display: inline-block;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 8px;
    }
}

.table-section {
    .table-row-selected {
        > td {
            background: #f8f8f9;
        }
    }
}
</style>
