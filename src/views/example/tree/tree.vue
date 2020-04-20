<template>
    <div class="tree-page">
        <tree-modal
            :treeTitleObj="treeTitleObj"
            :treeObj="treeObj"
            @node-click="nodeClick"
            @click-tree-btns="onClickTreeBtn"
        ></tree-modal>
        <div class="cont">
            <null-section></null-section>
        </div>
    </div>
</template>

<script>
import eventBus from '@/assets/utils/eventBus';
export default {
    name: 'treePage',
    data() {
        return {
            curNode: '',
            treeTitleObj: {
                title: '树标题',
                popType: 'el-icon-circle-plus',
                button: [
                    {
                        name: '新建文件夹',
                        onClick: 'addFolder',
                        params: '新建文件夹'
                    }
                ]
            },
            treeObj: {
                defaultProps: {
                    label: 'label'
                },
                treeData: [
                    {
                        label: '一级 1',
                        treeNodeType: 1,
                        children: [
                            {
                                label: '二级 1-1',
                                treeNodeType: 1,
                                children: [
                                    {
                                        label: '三级 1-1-1',
                                        treeNodeType: 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '一级 2',
                        treeNodeType: 1,
                        children: [
                            {
                                label: '二级 2-1',
                                treeNodeType: 1,
                                children: [
                                    {
                                        label: '三级 2-1-1',
                                        treeNodeType: 2
                                    }
                                ]
                            },
                            {
                                label: '二级 2-2',
                                treeNodeType: 1,
                                children: [
                                    {
                                        label: '三级 2-2-1',
                                        treeNodeType: 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '一级 3',
                        treeNodeType: 1,
                        children: [
                            {
                                label: '二级 3-1',
                                treeNodeType: 1,
                                children: [
                                    {
                                        label: '三级 3-1-1',
                                        treeNodeType: 2
                                    }
                                ]
                            },
                            {
                                label: '二级 3-2',
                                treeNodeType: 1,
                                children: [
                                    {
                                        label: '三级 3-2-1',
                                        treeNodeType: 2
                                    }
                                ]
                            }
                        ]
                    }
                ],
                height: 'calc(100vh - 162px)',
                search: true,
                expandAll: false,
                showCheckbox: false,
                expandKeys: [],
                selectedNode: '',
                menuList: [
                    {
                        title: '新建',
                        event: 'add'
                    },
                    {
                        title: '编辑',
                        event: 'edit'
                    },
                    {
                        title: '删除',
                        event: 'delete'
                    }
                ],
                rightRender: (data, node, store) => {
                    return (
                        data.treeNodeType === 2 && (
                            <i class="el-icon-close" vOn:click_capture_stop={() => this.deleteModel(data)}></i>
                        )
                    );
                }
            }
        };
    },
    methods: {
        nodeClick() {
            console.log('todo click node');
        },
        // 模型树右侧按钮点击操作
        onClickTreeBtn({ title, node }) {
            this.curNode = node || {};
            this[title](node);
        },
        add() {
            console.log('todo click add');
        },
        edit() {
            console.log('todo click edit');
        },
        delete() {
            console.log('todo click delete');
        },
        deleteModel() {
            console.log('todo click delete');
        },
        initEvent() {
            eventBus.$on('addModel', this.addModel);
            eventBus.$on('showFolder', () => {
                this.curModel = null;
                this.addFolder();
            });
        }
    }
};
</script>

<style lang="scss">
.tree-page {
    display: flex;

    .cont {
        width: 100%;
        display: flex;
    }
}
</style>
