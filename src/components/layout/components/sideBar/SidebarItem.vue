<template>
    <div>
        <template v-if="!item.children">
            <el-menu-item :index="item.id">
                <i :class="item.icon" v-if="item.icon"></i>
                <img :src="item.img" v-else />
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>

        <el-submenu v-else ref="subMenu" :index="item.id" popper-class="layout-sub-menu">
            <template slot="title">
                <i class="el-icon-folder"></i>
                <span v-if="$store.state.log.sideStatus" slot="title">{{ item.title }}</span>
            </template>
            <sidebar-item v-for="child in item.children" :key="child.id" :item="child" />
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.layout-sub-menu {
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
