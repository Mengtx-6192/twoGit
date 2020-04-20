<template>
    <div class="scrollbar-wrapper" :style="style" v-show="currentMenus.children">
        <el-menu
            @select="handleSelect"
            :default-active="activeMenu"
            :collapse="!sideStatus"
            :collapse-transition="false"
            mode="vertical"
        >
            <sidebar-item v-for="route in currentMenus.children" :key="route.id" :item="route" />
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
    components: { SidebarItem },
    data() {
        return {
            activeMenu: '',
            isCollapse: false
        };
    },
    computed: {
        ...mapGetters('log', ['currentMenus', 'activeSubMenu']),
        ...mapState('log', ['sideStatus', 'menuList']),
        style() {
            const width = this.sideStatus ? '170px' : '64px';
            return {
                width
            };
        }
    },
    watch: {
        currentMenus: {
            deep: true,
            handler(nv, ov) {
                this.setActive();
            }
        }
    },
    created() {},
    methods: {
        ...mapMutations('log', ['setActiveSubMenu']),
        filterDefaultSubMenu(list) {
            if (list.children && list.children.length) {
                this.filterDefaultSubMenu(list.children[0]);
            } else {
                this.activeMenu = list.id;
                this.setActiveSubMenu(this.activeMenu);
            }
        },
        setActive() {
            if (this.activeSubMenu !== '0') {
                this.activeMenu = this.activeSubMenu;
            } else if (this.currentMenus.children && this.currentMenus.children.length) {
                this.filterDefaultSubMenu(this.currentMenus);
            }
        },
        handleSelect(index, indexPath) {
            const target = this.currentMenus.children.find(it => it.id === indexPath[0]);
            if (target) {
                if (indexPath.length === 1) {
                    this.$router.push(target.uri);
                    this.setActiveSubMenu(target.id);
                } else {
                    const son = target.children.find(it => it.id === indexPath[1]);
                    this.$router.push(son.uri);
                    this.setActiveSubMenu(son.id);
                }
            }
        }
    }
};
</script>

<style lang="scss">
.scrollbar-wrapper {
    overflow: hidden auto;
    transition: width 0.2s;
    height: calc(100vh - 36px);
    width: 170px;
    float: left;
    background: #fff;
    box-shadow: 2px 0px 7px 0px rgba(48, 48, 82, 0.1);
    /deep/.el-menu-item {
        padding-left: 12px;
    }

    .el-menu-item,
    .el-submenu {
        min-width: auto !important;
        img {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
    }
}
</style>
