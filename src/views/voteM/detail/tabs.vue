<template>
    <div class="measure-tabs-page padding20">
        <topTitle title="详情" :btnList="btnList" @on-back="back" @on-save="save"></topTitle>
        <div class="measure-tabs">
            <el-tabs v-model="active" type="card">
                <el-tab-pane lazy v-for="(item, i) in tabs" :key="i" :label="item.label" :name="i + ''">
                    <Detail :ref="item.ref" :type="item.key"></Detail>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Detail from './detail';
import topTitle from '@/components/topTitle';
export default {
    name: 'measure-tabs',
    components: {
        Detail,
        topTitle
    },
    data() {
        return {
            active: '0'
        };
    },
    computed: {
        isRead() {
            return this.$route.query.isRead;
        },
        type() {
            return this.$route.query.type;
        },
        tabs() {
            let obj = [
                { ref: 'dRef0', key: 'votePlatFormInfo', label: '商品布局管理' },
                { ref: 'dRef1', key: 'voteInvestmentInfo', label: '项目投资规划' },
                { ref: 'dRef2', key: 'votePlanningInfo', label: '运营规划' },
                { ref: 'dRef3', key: 'voteItPlanInfo', label: 'IT规划' },
                { ref: 'dRef4', key: 'voteFinancialInfo', label: '财务测算' },
                { ref: 'dRef5', key: 'effectDesign', label: '效果图' },
                { ref: 'dRef6', key: 'constructDesign', label: '施工图' },
            ];
            if (this.type) {
                let result = obj.filter(v => v.key === this.type);
                return result;
            }
            return obj;
        },
        btnList() {
            return !this.isRead
                ? [
                      {
                          name: '返回',
                          onClick: 'on-back'
                      },
                      {
                          name: '提交',
                          onClick: 'on-save'
                      }
                  ]
                : [];
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        save() {
            console.log(this.$refs);
            // let result = [];
            // result[0] = this.$refs.DetailRef && this.$refs.DetailRef.getModel();
            // Promise.all(result).then(data => {
            //     let obj = {};
            //     for (let k in data[0]) {
            //         let stash = data[0][k];
            //         Object.assign(obj, stash);
            //     }
            //     // this.$api.prjMService.applyCreate({ ...obj });
            // });
        },
        submit() {}
    }
};
</script>

<style scoped lang="scss">
.measure-tabs-page {
    .measure-tabs {
        padding: 10px;
        background: #fff;
        /deep/ .el-tabs {
            .el-tabs__nav-scroll {
                background: #f2f3fa;
            }
            .el-tabs__item {
                font-family: SourceHanSansCN-Regular;
                background: #b5b8c8;
                color: #fff;
                margin: 0 4px;
                border: none;
                border-radius: 4px 4px 0 0;
            }
            .el-tabs__item:nth-child(1) {
                margin-left: 0;
            }
            .el-tabs__item:last-child {
                margin-right: 0;
            }
            .is-active {
                background: #fff;
                color: #1f2743;
            }
            .el-tabs__content {
                padding: 20px;
            }
        }
    }
}
</style>
