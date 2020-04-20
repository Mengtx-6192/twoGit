<template>
    <div class="form-body">
        <el-form :model="innerModel" ref="form" :label-width="labelWidth + 'px'">
            <el-row v-for="(row, rowIndex) in list" :key="rowIndex" :gutter="16">
                <el-col :span="item.realSpan" v-for="(item, itemIndex) in row.cols" :key="itemIndex">
                    <el-form-item
                        :label="item.label"
                        :prop="item.name"
                        :rules="isRead ? null : item.rules"
                        style="text-align: left;"
                    >
                        <el-input
                            v-if="item.type === 'input'"
                            :disabled="item.disabled || isRead"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            :placeholder="item.placeholder"
                            clearable
                            v-model="innerModel[item.name]"
                        ></el-input>

                        <el-input
                            v-else-if="item.type === 'textarea' || item.type === 'text'"
                            :disabled="item.disabled || isRead"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            :rows="item.rows"
                            clearable
                            type="textarea"
                            :autosize="item.autosize"
                            :placeholder="item.placeholder"
                            v-model="innerModel[item.name]"
                        ></el-input>

                        <template v-else-if="item.type === 'area'">
                            <area-select
                                v-model="innerModel[item.name]"
                                :disabled="item.disabled || isRead"
                                @change="handleChange($event, item.name, innerModel[item.name])"
                            ></area-select>
                        </template>

                        <el-input-number
                            v-else-if="item.type === 'number'"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            v-model="innerModel[item.name]"
                            :precision="item.precision || 0"
                            :disabled="item.disabled || isRead"
                            :step="1"
                            :controls="false"
                            :max="item.max"
                        ></el-input-number>

                        <el-input-number
                            v-else-if="item.type === 'amount'"
                            :disabled="item.disabled || isRead"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            v-model="innerModel[item.name]"
                            :precision="item.precision || 2"
                            :step="1"
                        ></el-input-number>

                        <el-select
                            v-else-if="item.type === 'select'"
                            :disabled="item.disabled || isRead"
                            :multiple="item.multiple"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            style="width: 100%;"
                            clearable
                            v-model="innerModel[item.name]"
                        >
                            <el-option
                                v-for="(op, opIndex) in item.optionsList"
                                :key="op.id"
                                :label="op.label"
                                :value="op.id"
                            ></el-option>
                        </el-select>

                        <el-date-picker
                            v-else-if="item.type === 'date'"
                            :disabled="item.disabled || isRead"
                            clearable
                            type="date"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            style="width: 100%;"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="innerModel[item.name]"
                        ></el-date-picker>

                        <el-time-select
                            v-else-if="item.type === 'time'"
                            :disabled="item.disabled || isRead"
                            clearable
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            v-model="innerModel[item.name]"
                        ></el-time-select>

                        <el-switch
                            v-else-if="item.type === 'switch'"
                            :disabled="item.disabled || isRead"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            clearable
                            v-model="innerModel[item.name]"
                        ></el-switch>

                        <el-radio-group
                            v-else-if="item.type === 'radio' || item.type === 'btnRadio'"
                            :disabled="item.disabled || isRead"
                            @change="handleChange($event, item.name, innerModel[item.name])"
                            clearable
                            v-model="innerModel[item.name]"
                        >
                            <template v-if="item.type === 'btnRadio'">
                                <el-radio-button v-for="radio in item.optionsList" :key="radio.id" :label="radio.id">{{
                                    radio.label
                                }}</el-radio-button>
                            </template>
                            <template v-else>
                                <el-radio v-for="radio in item.optionsList" :key="radio.id" :label="radio.id">{{
                                    radio.label
                                }}</el-radio>
                            </template>
                        </el-radio-group>

                        <div v-else-if="item.type === 'custom'">
                            <component
                                :is="item.component"
                                @on-change="
                                    val => {
                                        innerModel[item.name] = val;
                                    }
                                "
                            ></component>
                        </div>
                        <div v-else-if="item.type === 'file' || item.type === 'image'">
                            <div
                                style="display: inline-block; margin: 0 8px 8px 0"
                                v-for="(v, i) in uploadFor(item.optionsList)"
                                :key="i"
                            >
                                <upload-section
                                    v-model="innerModel[item.name]"
                                    :limit="item.limit"
                                    :disabled="item.disabled"
                                    @on-change="
                                        val => {
                                            innerModel[item.name] = val;
                                        }
                                    "
                                >
                                    <span slot="word" style="fontSize: 20px;">{{ v }}</span>
                                </upload-section>
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import areaSelect from './inputs/areaSelect';
import uploadSection from './upload';
export default {
    name: 'formBody',
    components: {
        areaSelect,
        uploadSection
    },
    props: {
        rows: {
            type: Array,
            default: () => []
        },
        value: {
            type: Object,
            default: () => {
                return {};
            }
        },
        labelWidth: {
            type: Number,
            default: 100
        },
        rules: {
            type: Object,
            default: () => {
                return {};
            }
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            url: '',
            innerModel: this.value || {}, // 除了扩展属性以外的表单值(通常是前端写死的表单)
            list: []
        };
    },
    computed: {
        uploadFor() {
            return list => {
                if (list && list.length > 0) {
                    return list;
                }
                return [''];
            };
        }
    },
    watch: {
        value: {
            deep: true,
            handler: function(nv) {
                this.innerModel = nv;
            }
        },
        rows: {
            handler(val) {
                this.list = val;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.usable();
    },
    methods: {
        handleRemove() {},
        usable() {
            let model = this.innerModel;
            this.list = this.rows.filter(v => {
                let item = v.cols[0];
                let row = {
                    label: item.label,
                    type: item.type,
                    name: item.name
                };
                return !item.usable || item.usable(row, model);
            });
        },
        getModel() {
            return this.innerModel;
        },
        validate() {
            return this.$refs.form.validate();
        },
        handleChange(e, name, model) {
            this.usable();
            this.$emit('on-change', {
                name,
                value: e,
                model: model
            });
            this.$emit('input', this.innerModel);
        }
    }
};
</script>

<style lang="scss" scoped>
.form-body {
    .el-form-item__label {
        white-space: nowrap;
    }
}
.upload {
    text-align: center;
    font-size: 20px;
    width: 100px;
    border: 1px dashed #d9d9d9;
    position: relative;
    border-radius: 4px;

    .upload-icon {
        font-size: 28px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
}
</style>
