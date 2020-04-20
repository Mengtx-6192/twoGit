<template>
    <div class="submit-tabs-page padding20">
        <topTitle
            title="现场测绘报告提交"
            :btnList="btnList"
            @on-back="back"
            @on-save="save"
            @on-refuse="refuse"
            @on-ok="ok"
        ></topTitle>
        <div class="submit-tabs">
            <el-tabs v-model="active" type="card">
                <el-tab-pane lazy label="测绘报告信息" name="1">
                    <submitInfo ref="submitInfoRef"></submitInfo>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import submitInfo from './submitInfo';
import topTitle from '@/components/topTitle';
export default {
    name: 'submit-tabs',
    components: {
        submitInfo,
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
        page() {
            return this.$route.query.page;
        },
        btnList() {
            if (this.page) {
                return [
                    {
                        name: '拒绝',
                        onClick: 'on-refuse'
                    },
                    {
                        name: '通过',
                        onClick: 'on-ok'
                    }
                ];
            } else {
                return !this.isRead
                    ? [
                          {
                              name: '返回',
                              onClick: 'on-back'
                          },
                          //   {
                          //       name: '暂存',
                          //       onClick: 'on-save'
                          //   },
                          {
                              name: '提交测绘报告',
                              onClick: 'on-submit'
                          }
                      ]
                    : [];
            }
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        save() {
            this.public();
        },
        submit() {
            this.public('submitMappingReport');
        },
        public(name) {
            let result = [];
            result[0] = this.$refs.submitInfoRef && this.$refs.submitInfoRef.getModel();
            Promise.all(result).then(data => {
                let obj = {};
                for (let k in data[0]) {
                    let stash = data[0][k];
                    Object.assign(obj, stash);
                }
                this.$api.measure[name]({ ...obj });
            });
        },
        refuse() {
            this.$confirm('确认审批拒绝？', '拒绝', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$api.measure.refuseMappingReport();
                this.$message({
                    type: 'success',
                    message: '拒绝!'
                });
                this.$router.go(-1);
            });
        },
        ok() {
            this.$confirm('确认审批通过？', '通过', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // const res = await this.$api.measure.approvalMappingReport();
                this.$message({
                    type: 'success',
                    message: '通过!'
                });
                this.$router.go(-1);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.submit-tabs-page {
    .submit-tabs {
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
