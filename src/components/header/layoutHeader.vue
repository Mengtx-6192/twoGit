<template>
    <div class="layout-header" v-if="!noHeader">
        <div class="layout-logo">Base <b>FE</b></div>
        <el-menu
            mode="horizontal"
            background-color="#2A3039"
            active-text-color="#fff"
            :default-active="activeIndex"
            @select="navigte"
            class="header-menu"
        >
            <el-menu-item v-for="item in menuList" :key="item.id" :index="item.id">
                <img :src="item.icon" class="menu-icon" />
                {{ item.title }}
            </el-menu-item>
        </el-menu>

        <div class="user">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span class="user-name">{{ userInfo.name }}</span>
                    <img :src="userInfo.avator" alt="" />
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" v-if="userInfo.list">
                    <el-dropdown-item
                        v-for="item in userInfo.list"
                        :key="item.name"
                        :name="item.name"
                        :divided="item.divided"
                        :disabled="item.disabled"
                        :selected="item.selected"
                    >
                        <span @click="!item.disabled && handleClick(item.onClick, item.name)">{{ item.title }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'layoutHeader',
    props: {
        noHeader: Boolean
    },
    data() {
        return {
            menuList: [
                {
                    id: '1',
                    title: '案例页面',
                    page: '/example/tree.html',
                    icon: '',
                    type: 0
                }
            ],
            activeIndex: '1',
            userInfo: {
                name: '',
                avator:
                    'https:\u002F\u002Frongzer-oss.oss-cn-hangzhou.aliyuncs.com\u002Ffe-components\u002Fresources\u002Fuser.png',
                list: [
                    {
                        name: '1',
                        title: '退出登录',
                        onClick: 'onLogoutClick'
                    }
                ]
            }
        };
    },
    watch: {
        accountInfo: {
            deep: true,
            handler() {
                this.getUser();
            }
        }
    },
    computed: {
        ...mapGetters('user', {
            accountInfo: 'accountInfo'
        })
    },
    mounted() {
        let { path } = this.$route;
        let curMenu = _.filter(this.menuList, { page: path });

        if (!_.isEmpty(curMenu)) {
            this.activeIndex = curMenu[0].id;
        }

        this.getUser();
    },
    methods: {
        ...mapActions('user', ['clearAccountInfo']),
        // 设置用户名称
        getUser() {
            if (!_.isEmpty(this.accountInfo)) {
                this.userInfo.name = this.accountInfo.account || '';
            }
        },
        // 导航菜单路由跳转
        navigte(index) {
            let item = _.find(this.menuList, { id: index });

            if (index) {
                this.$router.push({
                    path: item.page,
                    query: {
                        type: item.type
                    }
                });
            }
        },
        // 右侧下拉菜单点击事件
        handleClick(eventName, name) {
            this[eventName]();
        },
        // 退出登录
        onLogoutClick() {
            this.clearAccountInfo();

            this.$router.push({ path: '/login.html' });
        }
    }
};
</script>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 5px solid #4f53e7 !important;
}

.layout-header {
    display: flex;
    justify-content: space-between;
    background: #2a3039;

    .el-dropdown-link {
        color: #fff;

        .user-name {
            margin-right: 10px;
        }
    }

    .layout-logo {
        min-width: 200px;
        font-size: 30px;
        float: left;
        color: #fff;
        padding-left: 20px;
        line-height: 60px;

        b {
            color: #4e65e9;
        }
    }

    .menu-icon {
        border-style: none;
        width: 16px;
        height: 16px;
        vertical-align: text-top;
    }

    .header-menu {
        flex: 1;
        border-bottom: none !important;
        margin-left: 20px;
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        color: #fff;
    }

    .user {
        height: 60px;
        line-height: 60px;
        text-align: right;
        padding-right: 12px;
        font-size: 12px;

        img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }
    }
}
</style>
