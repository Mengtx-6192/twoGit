<template>
    <div class="editable-table-item" :class="{ 'el-table-form-item__error': errorMessage }">
        <template v-if="!isReadOnly()">
            <div class="error" v-if="errorMessage">
                <el-tooltip effect="light" :content="errorMessage" popper-class="table-error-tip">
                    <component
                        :is="column.editorInnerComponent"
                        @on-change="change"
                        v-model="value"
                        :column="column"
                        :row="row"
                        :getConfig="getConfig"
                        ref="formItem"
                    ></component>
                </el-tooltip>
            </div>
            <div class="editable-form-item" v-else>
                <component
                    :is="column.editorInnerComponent"
                    @on-change="change"
                    v-model="value"
                    :column="column"
                    :row="row"
                    :getConfig="getConfig"
                    ref="formItem"
                ></component>
            </div>
        </template>
        <template v-else>
            <div class="readonly-value">{{ getReadOnlyValue() }}</div>
        </template>
    </div>
</template>
<script>
import AsyncValidator from 'async-validator';
export default {
    props: ['row', 'column'],

    data: function() {
        return {
            errorMessage: '',
            value: this.row[this.column.key]
        };
    },

    created() {
        this.$set(this.row, this.column.key, this.row[this.column.key]);
    },

    mounted() {
        if (!this.isReadOnly()) {
            this.validate();
        }
    },

    watch: {
        row: {
            handler(newVal) {
                // Vue.set(this.row, this.column.key, this.row[this.column.key])
                this.value = newVal[this.column.key];
                this.validate();
            },
            deep: true
        }
    },

    methods: {
        getReadOnlyValue() {
            let readonlyRender = this.getConfig('readonlyRender');
            if (readonlyRender) {
                return readonlyRender({ row: this.row, column: this.column, value: this.value });
            } else {
                return this.value;
            }
        },
        isReadOnly() {
            return this.getConfig('readonly');
        },
        change(value, extend) {
            this.value = value;
            this.$emit('on-change', this.value, extend);
            this.validate();
        },

        validate() {
            let validatorRule = this.getConfig('validator');

            if (!validatorRule) {
                return;
            }
            const validator = new AsyncValidator({ [this.column.key]: validatorRule });

            let row = _.cloneDeep(this.row);

            validator.validate({ [this.column.key]: this.value }, row, errors => {
                _.each(errors, it => {
                    this.errorMessage = it.message;
                });

                if (!errors || errors.length === 0) {
                    this.errorMessage = '';
                }
            });
        },

        getConfig(key) {
            if (this.row[this.column.key + '_' + key] !== undefined) {
                return this.row[this.column.key + '_' + key];
            } else {
                return this.column[key];
            }
        }
    }
};
</script>
<style lang="scss">
.editable-table-item {
    padding: 1px;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    > div {
        width: 100%;
    }

    .editable-form-item {
        width: 100%;
        z-index: 1;
    }

    .error {
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        margin-left: -2px;
        margin-top: 0px;
        top: -1px;
    }
}
</style>
<style>
.table-error-tip.el-tooltip__popper[x-placement^='bottom'] .popper__arrow,
.table-error-tip.el-tooltip__popper[x-placement^='bottom'] .popper__arrow::after {
    border-bottom-color: #ff9900 !important;
}
.table-error-tip.el-tooltip__popper[x-placement^='left'] .popper__arrow,
.table-error-tip.el-tooltip__popper[x-placement^='left'] .popper__arrow::after {
    border-left-color: #ff9900 !important;
}
.table-error-tip.el-tooltip__popper[x-placement^='right'] .popper__arrow,
.table-error-tip.el-tooltip__popper[x-placement^='right'] .popper__arrow::after {
    border-right-color: #ff9900 !important;
}
.table-error-tip.el-tooltip__popper[x-placement^='top'] .popper__arrow,
.table-error-tip.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
    border-top-color: #ff9900 !important;
}
.table-error-tip.el-tooltip__popper.is-light {
    border: #ff9900;
    background: #ff9900;
    color: #fff;
}
.el-table-form-item__error .el-input__inner {
    border: 1px solid #ed4014 !important;
}
</style>
