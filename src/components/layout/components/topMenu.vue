<template>
    <div class="top-menu-wrap">
        <hamburger class="hamburger"></hamburger>
        <el-menu
            :default-active="activeTopMenu"
            class="topMenu"
            mode="horizontal"
            @select="handleSelect"
            text-color="#fff"
        >
            <el-menu-item
                v-for="(item, index) in menuList"
                :index="item.id"
                :key="item.id"
                class="top-menu-item"
                v-show="index < hideMenusIndex || hideMenusIndex === -1"
            >
                {{ item.name }}
            </el-menu-item>
        </el-menu>

        <el-dropdown class="more-menu" v-if="hideMenusIndex > -1">
            <span class="el-dropdown-link"> 更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="(hideItem, index) in menuList"
                    :key="hideItem.id"
                    v-show="index >= hideMenusIndex"
                >
                    {{ hideItem.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import hamburger from './hamburger';
import { mapMutations, mapGetters } from 'vuex';
import { globalService } from '@/services/global';
export default {
    name: 'topMenu',
    components: { hamburger },
    data() {
        return {
            activeTopMenu: '0',
            hideMenu: false,
            hideMenusIndex: -1
        };
    },
    computed: {
        ...mapGetters('log', ['menuList', 'currentMenus'])
    },
    destroyed() {
        window.removeEventListener('resize', this.handleToggleMenu);
    },
    created() {
        this.getMenus();
        const currentMenu = this.currentMenus;
        if (currentMenu) {
            this.activeTopMenu = currentMenu.id;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleToggleMenu);
    },
    methods: {
        ...mapMutations('log', ['menuClicked', 'setMenuList']),
        getMenus() {
            globalService.getMenus().then(res => {
                const data = _.get(res, 'data.roleMenuOperateVOList[0]', []);
                const menuList = data && data.menuDTOList;

                if (!menuList.length) {
                    return;
                }

                if (menuList) {
                    this.formatMenuData(menuList);
                    this.setMenuList(menuList);
                }
                if (!this.currentMenus) {
                    // 如果之前未登陆过, 则不会保留上次登陆的菜单, 默认定向到工作台
                    const defaultMenu = menuList[0];

                    this.activeTopMenu = defaultMenu.id;
                    this.menuClicked(defaultMenu.id);
                }

                this.handleToggleMenu();
            });
        },
        handleSelect(key, keyPath) {
            const id = keyPath[0];

            this.menuClicked(id);
            if (this.currentMenus.children) {
                const firstChild = this.currentMenus.children[0];
                if (firstChild) {
                    this.$router.push(firstChild.url);
                }
            } else {
                this.$router.push(this.currentMenus.url);
            }
        },
        handleToggleMenu() {
            this.hideMenusIndex = -1;
            this.$nextTick(() => {
                let $menuItem = document.querySelectorAll('.top-menu-item');
                let menuCopy = _.cloneDeep(this.menuList);

                $menuItem.forEach((item, index) => {
                    if (item.offsetTop > 0 && this.hideMenusIndex === -1) {
                        this.hideMenusIndex = index;
                    }
                });
            });
        },
        formatMenuData(arr) {
            arr.forEach(it => {
                if (it.children && it.children.length && !it.children.uri) {
                    this.formatMenuData(it.children);
                } else {
                    delete it.children;
                }
            });
        }
    }
};
</script>

<style lang="scss">
.top-menu-wrap {
    display: flex;
    .topMenu {
        &.el-menu {
            flex: 1;
            overflow: auto hidden;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            padding-left: 20px;
            border: none;
            background: var(--theme-color);
            overflow: hidden;
            height: 36px;

            li.el-menu-item {
                border: none;
                line-height: 36px;
                height: 36px;
                padding: 0 14px;

                &:hover {
                    background-color: #ffffff38;
                }

                &.is-active {
                    border: none;
                    color: #fff;
                    background: #052A51;
                }
            }
        }

        .el-icon-arrow-down {
            color: #fff;
        }
    }
}

.more-menu {
    height: 36px;
    line-height: 36px;
    background: var(--theme-color) !important;
    color: #fff !important;
    padding: 0 10px;
    width: 60px;
}
</style>
