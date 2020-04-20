<template>
    <div class="create-page padding20">
        <topTitle
            :title="title"
            :btnList="btnList"
            @on-back="back"
            @on-refuse="refuse"
            @on-ok="ok"
            @on-save="save"
            @on-submit="submit"
        ></topTitle>
        <div class="create-tabs">
            <el-tabs v-model="active" type="card">
                <el-tab-pane lazy label="基本信息" name="1">
                    <baseInfo ref="baseInfoRef"></baseInfo>
                </el-tab-pane>
                <el-tab-pane lazy label="工期信息" name="2">
                    <timeInfo ref="timeInfoRef"></timeInfo>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog :visible.sync="visible">
            <Approve ref="approveRef"></Approve>
            <div slot="footer" class="dialog-footer">
                <el-button @click="value = false">取 消</el-button>
                <el-button type="primary" @click="approveOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import baseInfo from './detail/baseInfo';
import timeInfo from './detail/timeInfo';
import topTitle from '@/components/topTitle';
import Approve from '@/components/approve';
export default {
    name: 'create',
    components: {
        baseInfo,
        timeInfo,
        Approve,
        topTitle
    },
    computed: {
        isRead() {
            return this.$route.query.isRead;
        },
        page() {
            return this.$route.query.page;
        },
        title() {
            return this.page === 'apply' ? '立项审批' : '立项详情';
        },
        btnList() {
            let list = [
                {
                    name: '返回',
                    onClick: 'on-back'
                }
            ];
            if (this.page === 'apply') {
                list.push(
                    {
                        name: '拒绝',
                        onClick: 'on-refuse'
                    },
                    {
                        name: '通过',
                        onClick: 'on-ok'
                    }
                );
            } else if (this.isRead === undefined) {
                list.push({
                    name: '申请立项',
                    onClick: 'on-save'
                });
            } else if (!this.isRead) {
                list.push({
                    name: '保存',
                    onClick: 'on-save'
                });
            }
            return list;
        }
    },
    data() {
        return {
            active: '1',
            visible: false
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        save() {
            this.$confirm('确认保存吗？', '保存', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let _this = this;
                let result = [];
                result[0] = this.$refs.baseInfoRef && this.$refs.baseInfoRef.getModel();
                result[1] = this.$refs.timeInfoRef && this.$refs.timeInfoRef.getModel();
                Promise.all(result).then(data => {
                    let obj = {};
                    data.forEach(v => {
                        for (let k in v) {
                            Object.assign(obj, v[k]);
                        }
                    });
                    _this.$api.prjM.applyCreate({ ...obj });
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$router.push({
                        path: '/prjM/apply'
                    });
                });
            });
        },
        submit() {},
        async approveOk() {
            const res = await this.$refs.approveRef.getModel();
            console.log(res);
        },
        refuse() {
            this.visible = true;
            // this.$confirm('确认审批拒绝？', '拒绝', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(async () => {
            //     // const res = await this.$api.prjM.refuse();
            //     this.$message({
            //         type: 'success',
            //         message: '拒绝!'
            //     });
            // });
        },
        ok() {
            this.$confirm('确认审批通过？', '通过', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '通过!'
                });
            });
        }
    }
};
</script>

<style scoped lang="scss">
.create-page {
    .create-tabs {
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
