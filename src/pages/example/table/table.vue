<template>
    <div class="table-page">
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <b>可编辑表格</b>
            </div>
            <custom-table ref="table" :options="tableOptions" @on-edit-change="editChange"></custom-table>
        </el-card>
    </div>
</template>

<script>
import eventBus from '@/assets/utils/eventBus';

export default {
    name: 'tablePage',
    data() {
        return {
            tableOptions: {
                pageable: false,
                localData: [
                    {
                        name: '张三',
                        sex: '1',
                        on: true,
                        birth: '2018-01-21',
                        address: {
                            add: '南京s可是发动机来说绿色减肥路上的空间离开手机发呆了市',
                            add_editableConfig: {
                                placeholder: 'xxx',
                                validator: [
                                    function(rule, value, callback, obj, row) {
                                        callback();
                                    }
                                ]
                            }
                        },
                        rs: {
                            value: '2',
                            valueDisplay: '张三'
                        }
                    }
                ],
                border: true,
                selection: true,
                columns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        editType: 'select',
                        optionsList: [
                            {
                                key: '1',
                                value: '男'
                            },
                            {
                                key: '2',
                                value: '女'
                            }
                        ],
                        validator: [
                            {
                                required: true,
                                message: '性别不能为空'
                            }
                        ],
                        readonlyRender: function(_ref) {
                            var row = _ref.row,
                                column = _ref.column,
                                value = _ref.value;

                            if (value === '1') {
                                return '男';
                            }
                            if (value === '2') {
                                return '女';
                            }
                        }
                    },
                    {
                        title: '地址',
                        key: 'address.add',
                        editType: 'input',
                        placeholder: '请输入地址',
                        editingIcon: true,
                        readonlyRender: function(_ref2) {
                            var row = _ref2.row,
                                column = _ref2.column,
                                value = _ref2.value;

                            return value ? value : '--';
                        },
                        validator: [
                            {
                                required: true,
                                message: '地址不能为空'
                            },
                            function(rule, value, callback, obj, row) {
                                callback();
                            }
                        ]
                    },
                    {
                        title: '是否启用',
                        key: 'on',
                        editType: 'switch',
                        readonlyRender: function(_ref3) {
                            var row = _ref3.row,
                                column = _ref3.column,
                                value = _ref3.value;

                            return value ? '启用' : '关闭';
                        }
                    },
                    {
                        title: '出生日期',
                        key: 'birth',
                        editType: 'date',
                        placeholder: '请选择出生日期',
                        format: 'yyyy\u002FMM\u002Fdd',
                        outputFormat: 'yyyy-MM-dd',
                        options: {
                            disabledDate: function(date) {
                                var disabledDay = date.getDate();
                                return disabledDay === 15;
                            }
                        },
                        readonlyRender: function(_ref4) {
                            var row = _ref4.row,
                                column = _ref4.column,
                                value = _ref4.value;

                            if (value instanceof Date) {
                                return value.toISOString();
                            }
                        }
                    },
                    {
                        title: '时间',
                        key: 'time',
                        editType: 'time',
                        placeholder: '请选择时间',
                        format: 'HH:mm:ss'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        editType: 'number'
                    },
                    {
                        title: '操作',
                        buttons: [
                            {
                                name: '编辑',
                                onClick: 'on-edit'
                            },
                            {
                                name: '删除',
                                onClick: 'on-del'
                            }
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        editChange() {}
    }
};
</script>

<style lang="scss">
.table-page {
    padding: 20px;

    .el-card__header {
        font-size: 16px;
        text-align: left;
    }
}
</style>
