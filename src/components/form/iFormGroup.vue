<template>
    <div class="i-form-group">
        <template v-for="config in configList">
            <h4 class="title">{{ config.groupName }}</h4>
            <t-form
                :ref="config.groupKey || DEFAULT_GROUP_KEY"
                :options="config.baseInfo"
                :key="config.groupKey"
                :groupKey="config.groupKey"
                :model="models[config.groupKey || DEFAULT_GROUP_KEY]"
                :isRead="isRead"
                @change="
                    val => {
                        $emit('change', val);
                    }
                "
            >
            </t-form>
        </template>
    </div>
</template>

<script>
import { DEFAULT_GROUP_KEY } from './staticVariables';

export default {
    name: 'iFormGroup',
    props: {
        configList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        model: {
            type: Object
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            DEFAULT_GROUP_KEY: DEFAULT_GROUP_KEY,
            models: {}
        };
    },
    watch: {
        model: {
            handler(val) {
                if (!val) {
                    return;
                }
                let result = {};
                this.configList.map(v => {
                    const key = v.groupKey || DEFAULT_GROUP_KEY;
                    Object.assign(result, {
                        [key]: val
                    });
                });
                this.models = result;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        getModel(validate) {
            return new Promise((resolve, reject) => {
                Promise.all(
                    this.configList.map(it => {
                        const refName = it.groupKey || DEFAULT_GROUP_KEY;
                        return this.$refs[refName][0].getModel(validate);
                    })
                )
                    .then(models => {
                        let res = {};
                        models.forEach(it => {
                            Object.assign(res, it);
                        });
                        resolve(res);
                    })
                    .catch(e => {
                        reject();
                    });
            });
        },
        getValue() {
            // if (groupKey && groupKey !== DEFAULT_GROUP_KEY) {
            //     return this.model[groupKey]
            // } else {
            //     const res = {}
            //     for(let k in this.model) {
            //         // 剔除其他表单组model
            //         if (this.isGroup(k)) {
            //             res[k] = this.model[k]
            //         }
            //     }
            //     return res
            // }
            let res = {};
            for (let k in this.model) {
                // 剔除其他表单组model
                if (this.isGroup(k)) {
                    res[k] = this.model[k];
                } else {
                    if (typeof res[DEFAULT_GROUP_KEY] === 'object') {
                        res[DEFAULT_GROUP_KEY][k] = this.model[k];
                    } else {
                        res[DEFAULT_GROUP_KEY] = {};
                        res[DEFAULT_GROUP_KEY][k] = this.model[k];
                    }
                }
            }
            return res;
        },
        isGroup(key) {
            const groupKeys = this.configList.map(it => it.groupKey);
            return groupKeys.includes(key);
        },
        setModel(propName, value, groupKey = DEFAULT_GROUP_KEY) {
            this.$refs[groupKey][0].setModel(propName, value);
        }
    }
};
</script>

<style lang="scss" scoped>
.i-form-group {
    .title {
        margin: 20px;
        text-align: left;
        padding-left: 20px;
        border-left: 3px solid #3399ff;
    }
}
</style>
