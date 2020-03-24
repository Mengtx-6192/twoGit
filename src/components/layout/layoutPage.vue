<template>
    <div class="layout" :class="{ 'no-header': noHeader }">
        <layout-header :noHeader="noHeader"></layout-header>
        <div class="layout-page">
            <template v-if="menu.menuList.length">
                <div class="layout-menu">
                    <el-menu :default-active="activeName" @select="open" class="el-menu-vertical-demo">
                        <template v-for="item in menu.menuList">
                            <el-submenu :key="item.id" :index="item.id" v-if="item.children">
                                <template slot="title">
                                    <i :class="item.icon" v-if="item.icon"></i>
                                    <img :src="item.img" v-else />
                                    <span>{{ item.name }}</span>
                                </template>
                                <template>
                                    <el-menu-item v-for="child in item.children" :key="child.id" :index="child.id">
                                        <i :class="child.icon" v-if="child.icon"></i>
                                        <img :src="child.img" v-else />
                                        <span>{{ child.name }}</span>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item :index="item.id" v-else :key="item.id">
                                <i :class="item.icon" v-if="item.icon"></i>
                                <img :src="item.img" v-else />
                                <span slot="title">{{ item.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <div class="layout-content" :style="{ padding: `0 ${gap}px ${gap}px ${gap}px` }">
                    <router-view></router-view>
                </div>
            </template>
            <template v-else>
                <router-view></router-view>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layoutPage',
    props: {
        noHeader: Boolean,
        menu: Object,
        gap: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            $menuList: [],
            activeName: this.menu.activeName
        };
    },
    created() {
        this.$menuList = this.deepList(this.menu.menuList);
        this.render(_.get(this.$router, 'history.current'));
    },
    watch: {
        $route(newRoute) {
            this.render(newRoute);
        }
    },
    methods: {
        render(to) {
            let path = to.path;
            let menu = _.find(this.$menuList, menu => menu.url === path);

            if (menu) {
                this.activeName = menu.id;
            }
        },
        open(menuId) {
            let menu = _.find(this.$menuList, menu => menu.id === menuId);

            if (menu) {
                this.$router.push(menu.url);
            }
        },
        deepList(purviews) {
            let purs = [];

            _.each(purviews, pur => {
                let children = pur.children;

                purs.push(pur);
                if (children && children.length) {
                    let subs = this.deepList(children);

                    _.each(subs, s => {
                        s.pMenu = pur;
                    });
                    purs = purs.concat(...subs);
                }
            });
            return purs;
        }
    }
};
</script>

<style lang="scss">
.layout {
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 1fr;
    user-select: none;
    overflow: hidden;
    background: #f5f7f9;
    z-index: 1;

    &.no-header {
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
    }
}

.layout-page {
    overflow: hidden;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: auto;
    grid-template-areas: 'tools' 'breadcrumbs' 'layout-content'; /* stylelint-disable-line */
    display: flex;

    .layout-menu {
        width: 200px;
        height: calc(100vh - 60px);

        > .el-menu {
            border-right: 1px solid #deeaff;
        }

        .el-menu {
            height: 100%;
            background: #f9faff;

            .el-menu-item.is-active {
                border-right: 2px solid #4f53e7;
                background: #f0f3ff;
            }
        }

        .el-menu-item,
        .el-submenu {
            text-align: left;
            img {
                width: 18px;
                height: 18px;
                margin-right: 8px;
            }
        }
    }

    .layout-content {
        overflow: hidden;
        flex: 1;
        background: #fff;
    }
}
</style>
