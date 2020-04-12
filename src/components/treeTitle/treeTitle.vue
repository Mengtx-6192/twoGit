<template>
    <div class="tree-title">
        <div class="tree-title-text">
            {{ treeTitleObj.title }}
        </div>

        <div v-if="treeTitleObj.iconList" class="icons">
            <template v-for="(icon, index) in treeTitleObj.iconList">
                <el-tooltip class="item" :content="icon.tip" :key="index" placement="bottom-end">
                    <i :class="icon.type" :style="{ color: icon.color }" @click="clickIcon(icon)" />
                </el-tooltip>
            </template>
        </div>

        <div v-else class="pop">
            <el-popover
                v-if="treeTitleObj.button"
                placement="right-start"
                transfer
                trigger="hover"
                v-model="visible"
                popper-class="tree-title-pop"
            >
                <ul>
                    <li v-for="item in treeTitleObj.button" :key="item.name" class="tree-title-list">
                        <div @click="click(item)" class="button">{{ item.name }}</div>
                    </li>
                </ul>
                <i slot="reference" :class="treeTitleObj.popType ? treeTitleObj.popType : 'el-icon-more'"></i>
            </el-popover>
        </div>
    </div>
</template>
<script>
import eventBus from '@/assets/utils/eventBus';
export default {
    name: 'treeTitle',
    props: {
        treeTitleObj: Object
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        click(item) {
            this.visible = false;

            eventBus.$emit(item.onClick, item.params);
        },
        clickIcon(item) {
            eventBus.$emit(item.onClick, item.params);
        }
    }
};
</script>
<style lang="scss">
.tree-title {
    width: 240px;
    box-sizing: border-box;
    padding: 20px 0px;
    padding-left: 24px;
    display: flex;
    justify-content: space-between;
    .tree-title-text {
        font-size: 16px;
    }
    .ivu-poptip {
        margin-right: 24px;
        .ivu-poptip-rel .ivu-icon {
            color: #2d97fb;
            font-size: 20px;
        }
    }
    .pop {
        cursor: pointer;

        i {
            font-size: 20px;
            color: #2d97fb;
            margin-right: 24px;
        }
    }
    .icons {
        cursor: pointer;
        margin-right: 20px;
    }
}
.tree-title-pop {
    .ivu-poptip-arrow {
        display: none;
    }
    .tree-title-list {
        width: 200px;
        text-decoration: none;
        list-style: none;
    }
    .tree-title-list .button {
        padding-left: 8px;
        padding-right: 8px;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        display: block;
        outline: 0;
        border: 0;
        position: relative;
        .right-arrow {
            position: absolute;
            right: 0;
        }

        .sub-menu {
            position: absolute;
            box-shadow: 2px 2px 2px #cccccc;
            background: #f8f8f9;
            width: 202px;
            border: 1px solid #dcdee2;
        }
    }
    .tree-title-list .button i {
        padding: 0 10px 0 10px;
    }
    .tree-title-list .button:hover {
        background: #e8eaec;
    }
}
</style>
