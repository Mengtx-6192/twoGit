<template>
    <div class="filter-section">
        <el-collapse accordion @change="collapseChange">
            <el-collapse-item>
                <template slot="title">{{ title }}</template>
                <div class="filter-form">
                    <t-form ref="form" :options="formOptions" :model="options.model" @change="change"></t-form>
                </div>
                <div class="filter-btn">
                    <btn-list-section :btnList="btnList" @btn-event="btnEvent"></btn-list-section>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import btnListSection from '@/components/buttonList/buttonList';
export default {
    name: 'filterSection',
    components: { btnListSection },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            title: '展开搜索功能',
            formOptions: {},
            btnList: [
                {
                    name: '搜索',
                    type: 'primary',
                    onClick: 'on-search'
                },
                {
                    name: '重置',
                    onClick: 'on-rest'
                }
            ]
        };
    },
    async created() {
        let list = this.options.formList.list;
        this.formOptions = this.options.formList;
    },
    methods: {
        collapseChange() {
            let flag = this.title.indexOf('展开');
            if (flag !== -1) {
                this.title = '收起搜索功能';
            } else {
                this.title = '展开搜索功能';
            }
        },
        change() {},
        /** * btn-list事件 * **/
        btnEvent(name) {
            if (name === 'on-search') {
                this.search();
            } else if (name === 'on-rest') {
                this.rest();
            }
        },
        async search() {
            let model = await this.$refs.form.getModel();
            let result = {};
            for (let k in model) {
                let val = model[k];
                if (!val && val !== 0) {
                    continue;
                }
                result[k] = val;
            }
            this.$emit('on-search', result);
        },
        rest() {
            this.$refs.form.setModel();
            this.$emit('on-rest');
        }
        /** ********************************************* */
    }
};
</script>

<style scoped lang="scss">
.filter-section {
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
    .filter-form {
        /deep/ .el-form-item {
            margin-bottom: 10px;
        }
    }
    .filter-btn {
        text-align: center;
        margin: 15px 20px 11px;
    }
    /deep/ .el-collapse {
        .el-collapse-item__header {
            font-size: 16px;
            color: #4ca3a6;
            padding: 0 10px;
        }
        .el-collapse-item__content {
            padding: 0;
        }
    }
}
</style>
