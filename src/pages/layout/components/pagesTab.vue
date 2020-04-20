<template>
    <div class="pageTabs">
        <el-tabs v-model="activeTabId" type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in menuTemplate" :name="item.module" :label="item.label" :key="index">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'pageTabs',
    data() {
        return {
            menuTemplate: [],
            prjId: '',
            nodeId: '',
            activeTabId: ''
        };
    },
    created() {
        this.init();
    },
    computed: {},
    methods: {
        handleClick(e) {
            const hitNode = this.menuTemplate.find(it => it.module === e.name);
            this.$router.push({
                path: hitNode.url,
                query: this.$route.query
            });
        },
        init() {
            this.prjId = this.$route.query.prjId;
            this.nodeId = this.$route.query.nodeId;
            this.$api.global
                .getTemplate({
                    prjId: this.prjId
                })
                .then(res => {
                    this.menuTemplate = res.menuTemplate;
                    const hitNode = this.menuTemplate.find(it => it.module === this.nodeId);
                    if (hitNode) {
                        this.activeTabId = hitNode.module;
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.pageTabs {
    background: #fff;

    /deep/ .el-tabs--border-card {
        border-bottom: none;

        & > .el-tabs__content {
            padding: 0;
        }
    }
}
</style>
