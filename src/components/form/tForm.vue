<template>
    <div class="form">
        <form-body
            ref="form"
            :rows="rows"
            v-model="watchModel"
            :rules="watchOptions.rules"
            :isRead="isRead"
            @on-change="change"
            :label-width="watchOptions.labelWidth"
        >
        </form-body>
        <form-body
            v-if="exData.length > 0"
            ref="exForm"
            :isRead="isRead"
            :rows="extendRows"
            :model="extendModel"
            :rules="extendRules"
            :label-width="watchOptions.labelWidth"
        >
        </form-body>
    </div>
</template>

<script>
import { DEFAULT_GROUP_KEY } from './staticVariables';
import formBody from './formBody';
export default {
    // provide: {},
    name: 'tForm',
    components: {
        formBody
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        model: {
            type: Object,
            default: function() {
                return {};
            }
        },
        groupKey: {
            type: String,
            default: DEFAULT_GROUP_KEY
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            exData: (this.model && this.model.exData) || [],
            watchOptions: {},
            watchModel: {}
        };
    },
    computed: {
        rows() {
            let all = this.options.list;
            if (!(all && all.length > 0)) {
                return;
            }
            const cols = this.options.cols || 1;
            const cellCols = 24 / cols;
            let res = [];
            let lastCols = 0; // 该变量表示每一行塞进一个表单后的剩余空间, 如果剩余空间不足以塞进下一个表单(input-A),则会另起一行, 将input-A放进去
            all.forEach(it => {
                if (it.usable === false) {
                    return;
                }
                const span = it.span || 1;
                it.realSpan = cellCols * span;

                if (span <= lastCols) {
                    lastCols = lastCols - span;
                    res[res.length - 1].cols.push(it);
                } else {
                    lastCols = cols - span; // 新起一行
                    res.push({
                        cols: [it]
                    });
                }
            });
            return res;
        },
        extendRows() {
            return this.exData.map(it => {
                return {
                    cols: [it]
                };
            });
        },
        extendModel() {
            let model = {};
            this.exData.forEach(it => {
                const key = it.key;
                model[key] = it.value;
            });
            return model;
        },
        extendRules() {
            let rules = {};
            this.exData.forEach(it => {
                const key = it.key;
                if (it.isRequired === 'Y') {
                    rules[key] = { required: true, message: `${it.name}是必填项`, trigger: 'blur' };
                }
            });
            return rules;
        }
    },
    watch: {
        model: {
            handler(val) {
                for (let k in val) {
                    this.setModel(k, val[k]);
                }
            },
            deep: true,
            immediate: true
        },
        options: {
            deep: true,
            immediate: true,
            handler(val) {
                this.watchOptions = val;
            }
        }
    },
    methods: {
        change(value) {
            this.$emit('change', value);
        },
        typeOf(data) {
            return Object.prototype.toString.call(data).slice(8, -1);
        },
        /**
         * 获取表单值
         * @param validate true: 启用校验  false: 不启用校验
         * @returns {Promise<unknown>}
         */
        getModel(validate = true) {
            const groupKey = this.groupKey;
            const form = this.$refs.form;
            const exForm = this.$refs.exForm;
            const baseFormModel = form.getModel();
            let exFormModel = {};
            if (this.model.exData) {
                exFormModel = exForm.getModel();
            }
            this.exData.forEach(it => {
                const key = it.key || it.name;
                if (key in exFormModel) {
                    it.value = exFormModel[key];
                }
            });
            if (this.model.exData) {
                baseFormModel.exData = this.exData;
            }

            const res = groupKey === DEFAULT_GROUP_KEY ? baseFormModel : { [groupKey]: baseFormModel };

            return new Promise((resolve, reject) => {
                if (validate) {
                    Promise.all([
                        form.validate(),
                        () => {
                            if (this.model.exData) {
                                return exForm.validate();
                            } else {
                                Promise.resolve(true);
                            }
                        }
                    ])
                        .then(() => {
                            resolve(res);
                        })
                        .catch(() => {
                            reject('必填项未填写');
                        });
                } else {
                    resolve(res);
                }
            });
        },
        setModel(propName, value) {
            if (propName) {
                this.$set(this.watchModel, propName, value);
            } else {
                this.$set(this, 'watchModel', {});
            }
        },
        copy(data, propertyName) {
            let _this = this;
            const fn = () => {
                const t = _this.typeOf(data);
                let o;
                if (t === 'Array') {
                    o = [];
                } else if (t === 'Object') {
                    o = {};
                } else {
                    return data;
                }
                if (t === 'Array') {
                    for (let i = 0; i < data.length; i++) {
                        o.push(fn(data[i]));
                    }
                } else if (t === 'Object') {
                    for (let i in data) {
                        if (i !== propertyName) {
                            o[i] = fn(data[i]);
                        }
                    }
                }
                return o;
            };
            return fn();
        }
    }
};
</script>

<style lang="scss" scoped></style>
