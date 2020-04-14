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
import { mapState, mapGetters } from 'vuex';
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
        ...mapGetters('log', ['currentMenus']),
        ...mapState('log', ['sideStatus', 'menuList']),
        style() {
            const width = this.sideStatus ? '180px' : '64px';
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
        setActive() {
            if (this.currentMenus.children && this.currentMenus.children.length) {
                this.activeMenu = this.currentMenus.children[0].id;
            }
        },
        handleSelect(index, indexPath) {
            const target = this.currentMenus.children.find(it => it.id === indexPath[0]);
            if (target) {
                if (indexPath.length === 1) {
                    this.$router.push(target.url);
                } else {
                    const son = target.children.find(it => it.id === indexPath[1]);
                    this.$router.push(son.url);
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
    height: calc(100vh - 46px);
    width: 180px;
    float: left;
    box-shadow: 2px 0px 7px 0px rgba(48, 48, 82, 0.1);
    /deep/.el-menu-item {
        padding-left: 12px;
    }

    .el-menu-item,
    .el-submenu {
        img {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
    }
}
</style>
