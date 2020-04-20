<template>
    <div id="app">
        <router-view />
    </div>
</template>
<style lang="scss">
#app {
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

a {
    color: var(--theme-color);
    background: 0 0;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: var(--theme-color);

        &.router-link-exact-active {
            color: var(--theme-color);
        }
    }
}

.el-menu {
    border-right: none !important;
}

.el-tree--highlight-current .el-tree-node .el-tree-node__content:hover {
    background-color: var(--theme-color) !important;
    color: #fff;
    opacity: 0.6;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: var(--theme-color) !important;
    color: #fff !important;
    opacity: 1;
}

.el-link--primary {
    color: var(--theme-active-color) !important;
}
</style>
