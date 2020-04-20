<template>
    <div class="site-tabs-page padding20">
        <topTitle :title="'立项申请'" :btnList="btnList" @on-back="back" @on-save="save" @on-submit="submit"></topTitle>
        <div class="site-tabs">
            <el-tabs v-model="active" type="card">
                <el-tab-pane lazy label="点址信息" name="1">
                    <siteInfo ref="siteInfoRef"></siteInfo>
                </el-tab-pane>
                <el-tab-pane lazy label="项目信息" name="2">
                    <baseInfo ref="baseInfoRef"></baseInfo>
                </el-tab-pane>
                <el-tab-pane lazy label="提报历史" name="3">
                    <!-- <baseInfo ref="baseInfoRef"></baseInfo> -->
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import siteInfo from './siteInfo/siteInfo';
import baseInfo from '../../prjM/create/detail/baseInfo';
import topTitle from '@/components/topTitle';
export default {
    name: 'site-tabs',
    components: {
        siteInfo,
        baseInfo,
        topTitle
    },
    data() {
        return {
            active: '1',
            btnList: [
                {
                    name: '返回',
                    onClick: 'on-back'
                },
                {
                    name: '暂存',
                    onClick: 'on-save'
                },
                {
                    name: '提交选址申请',
                    onClick: 'on-submit'
                }
            ]
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        save() {
            let result = [];
            result[0] = this.$refs.siteInfoRef && this.$refs.siteInfoRef.getModel();
            result[1] = this.$refs.baseInfoRef && this.$refs.baseInfoRef.getModel();
            Promise.all(result).then(data => {
                let obj = {};
                data.forEach(v => {
                    Object.assign(obj, v);
                });
                // this.$api.prjMService.applyCreate({ ...obj });
            });
        },
        submit() {}
    }
};
</script>

<style scoped lang="scss">
.site-tabs-page {
    .site-tabs-tabs {
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
