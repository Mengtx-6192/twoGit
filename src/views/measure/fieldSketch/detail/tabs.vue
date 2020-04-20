<template>
    <div class="measure-tabs-page padding20">
        <topTitle title="现场测绘提请" :btnList="btnList" @on-back="back" @on-save="save"></topTitle>
        <div class="measure-tabs">
            <el-tabs v-model="active" type="card">
                <el-tab-pane lazy label="提请基本信息" name="1">
                    <measureInfo ref="measureInfoRef"></measureInfo>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import measureInfo from './measureInfo';
import topTitle from '@/components/topTitle';
export default {
    name: 'measure-tabs',
    components: {
        measureInfo,
        topTitle
    },
    data() {
        return {
            active: '1'
        };
    },
    computed: {
        isRead() {
            return this.$route.query.isRead;
        },
        btnList() {
            return !this.isRead
                ? [
                      {
                          name: '返回',
                          onClick: 'on-back'
                      },
                      {
                          name: '完成',
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
            let result = [];
            result[0] = this.$refs.measureInfoRef && this.$refs.measureInfoRef.getModel();
            Promise.all(result).then(data => {
                let obj = {};
                for (let k in data[0]) {
                    let stash = data[0][k];
                    Object.assign(obj, stash);
                }
                // this.$api.prjMService.applyCreate({ ...obj });
            });
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
