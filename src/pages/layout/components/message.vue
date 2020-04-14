<template>
    <div class="message">
        <el-popover
            placement="bottom"
            width="280"
            trigger="click"
            @after-enter="stretch = true"
            popper-class="message-layout"
        >
            <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="stretch">
                <el-tab-pane :label="item.label" :name="item.value" v-for="item in tabs" :key="item.value">
                    <ul class="cont-list">
                        <li class="list-item" v-for="(child, index) in item.list" :key="index">
                            <el-link type="primary" class="title" :href="child.url" v-if="child.url" :underline="false">
                                {{ child.title }}
                            </el-link>
                            <p v-else class="title">{{ child.title }}</p>
                            <p class="create-time">{{ child.createTime }}</p>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
            <el-badge class="item" :value="9" :max="10" slot="reference">
                <i class="icon-rz-message" />
            </el-badge>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: 'message',
    data() {
        return {
            activeName: 'notice',
            tabs: [
                {
                    label: '通知',
                    value: 'notice',
                    list: [
                        {
                            title: '江北新区店工程立项审核通过',
                            createTime: '2020-4-2',
                            url: '1111'
                        },
                        {
                            title: '江北新区店工程立项申请',
                            createTime: '2020-4-2',
                            url: ''
                        }
                    ]
                },
                {
                    label: '消息',
                    value: 'message',
                    list: []
                },
                {
                    label: '待办',
                    value: 'task',
                    list: []
                }
            ],
            stretch: false
        };
    },
    methods: {
        handleClick() {}
    }
};
</script>

<style lang="scss">
.message {
    margin: 0 10px;

    .el-badge__content {
        background: #1989fa;
        height: 14px;
        line-height: 14px;
        transform: scale(0.9) !important;
        right: -12px !important;
        top: 5px !important;
        border: none !important;
    }
}

.message-layout {
    .cont-list {
        height: 221px;
        overflow: auto;
    }
    .list-item {
        height: 73px;
        border-bottom: 1px solid #f2f3fa;

        &:last-child {
            border-bottom: none;
        }

        p {
            margin: 0;
        }

        .el-tabs__header {
            margin: 0;
        }

        .title {
            font-size: 14px;
            height: 48px;
            line-height: 48px;
        }

        .create-time {
            color: #b5b8c8;
            font-size: 12px;
        }
    }
}
</style>

<style lang="scss">
.message {
    cursor: pointer;
    .icon-rz-message {
        color: #fff;
    }
}
</style>
