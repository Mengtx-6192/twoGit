<template>
    <div class="tree-modal">
        <tree-title :treeTitleObj="treeTitleObj" v-if="treeTitleObj.title"></tree-title>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="small"
            class="filter-tree"
            v-if="treeObj.search"
        ></el-input>
        <el-scrollbar class="tree-layout" :style="{ height: treeObj.height }">
            <el-tree
                ref="elTree"
                :data="treeObj.treeData"
                node-key="id"
                check-strictly
                :highlight-current="treeObj.highlightCurrent || true"
                :show-checkbox="treeObj.showCheckbox"
                :default-expand-all="treeObj.expandAll"
                :default-expanded-keys="expandKeys"
                :current-node-key="selectedNode"
                :expand-on-click-node="false"
                :props="treeObj.defaultProps"
                :render-content="renderContent"
                :filter-node-method="filterNode"
                @current-change="handlerCurrentChange"
                @node-click="nodeClick"
            >
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: 'treeModal',
    props: {
        treeTitleObj: Object,
        treeObj: Object
    },
    data() {
        return {
            filterText: '',
            curNode: null,
            selectedNode: this.treeObj.selectedNode,
            expandKeys: this.treeObj.expandKeys,
            renderContent: (h, { node, data, store }) => {
                return (
                    <span class="custom-tree-node" on-click={() => this.beforeClick(data, node)}>
                        <span class="tree-node-title" on-mouseenter={e => this.mouseEnterNodeTitle(e, data)}>
                            <i on-class={data.treeNodeType === 1 ? 'tree-icon tree-folder' : 'tree-icon tree-child'} />
                            {data.showTitleTip ? (
                                <el-tooltip
                                    content={node.label}
                                    placement="bottom-start"
                                    popper-class="tree-title-tooltip"
                                >
                                    <div class="name-layout">
                                        <span class="tree-name">{node.label}</span>
                                    </div>
                                </el-tooltip>
                            ) : (
                                <div class="name-layout">
                                    <span class="tree-name">{node.label}</span>
                                </div>
                            )}
                        </span>
                        <span class="right-menu">
                            {data.treeNodeType === 1 && this.treeObj.menuList.length && (
                                <el-dropdown trigger="click" on-command={title => this.onClickTreeBtn(title, data)}>
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-more"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        {this.treeObj.menuList.map((item, index) => {
                                            return (
                                                <el-dropdown-item command={item.event}>{item.title}</el-dropdown-item>
                                            );
                                        })}
                                    </el-dropdown-menu>
                                </el-dropdown>
                            )}

                            {this.treeObj.rightRender && this.treeObj.rightRender(data, node, store)}
                        </span>
                    </span>
                );
            }
        };
    },
    watch: {
        treeObj: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.$refs.elTree.setCurrentKey(this.treeObj.selectedNode);
                });
                this.expandKeys = this.treeObj.expandKeys;
            }
        },
        filterText(val) {
            this.$refs.elTree.filter(val);
        }
    },
    methods: {
        onClickTreeBtn(title, node) {
            this.$emit('click-tree-btns', { title, node });
        },
        filterNode(value, data) {
            if (!value) {
                return true;
            }
            return (
                data[_.get(this.treeObj, 'defaultProps.label', 'label')].toUpperCase().indexOf(value.toUpperCase()) !==
                -1
            );
        },
        nodeClick(data, node, event) {
            if (this.treeObj.folderNotClick && data.treeNodeType === 1) {
                return;
            }
            this.$emit('node-click', data);
        },

        // 配置文件夹节点不可以点， 阻止点击效果
        handlerCurrentChange(data, node) {
            if (this.treeObj.folderNotClick && data.treeNodeType === 1) {
                node.isCurrent = false;
                this.$nextTick(() => {
                    this.$refs.elTree.setCurrentKey(this.curNode.id);
                });
                return;
            }
        },
        // 在点击节点选中之前，先获取当前的选中节点
        beforeClick() {
            this.curNode = this.$refs.elTree.getCurrentNode();
        },

        // 鼠标悬浮在树节点标题上
        mouseEnterNodeTitle({ target }, data) {
            target.children.forEach(item => {
                if (item.className === 'name-layout') {
                    item.children.forEach(child => {
                        if (child.className === 'tree-name') {
                            let status = child.offsetWidth > item.clientWidth;

                            if (status) {
                                Vue.set(data, 'showTitleTip', status);
                            }
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.tree-modal {
    width: 240px;
    border-right: 1px solid #deeaff;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>

<style lang="scss">
.tree-modal {
    .custom-tree-node {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        width: 100%;
        box-sizing: border-box;
        flex: 1;
        overflow: hidden;
        text-align: left;

        .name-layout {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .el-tree-node__content {
        height: 35px;

        &:hover {
            .right-menu {
                visibility: visible;
            }
        }
    }

    .el-dropdown-menu__item {
        font-size: 12px;
        line-height: 30px;
    }

    .right-menu {
        visibility: hidden;
        display: flex;
        color: #fff;
        justify-content: center;
        align-items: center;
    }

    .filter-tree {
        margin: 0 0 10px;
    }

    .tree-node-title {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
    }

    .tree-name {
        vertical-align: middle;
    }

    .tree-layout {
        height: 100%;

        .el-scrollbar__wrap {
            overflow-x: hidden;
        }

        .el-scrollbar__bar.is-horizontal {
            display: none;
        }
    }

    .el-tree > .el-tree-node {
        min-width: 100%;
    }
}

.tree-title-tooltip {
    opacity: 0.8 !important;
    max-width: 700px;
    line-height: 24px;
}
</style>
