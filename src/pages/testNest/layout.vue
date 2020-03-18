<template>
    <div>
        <header>页面头部</header>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test'
};
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    background: #ccc;
}
</style>
