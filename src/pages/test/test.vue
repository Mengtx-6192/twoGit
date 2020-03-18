<template>
    <div class="test">
        <span>Test</span>
        <test-cpt></test-cpt>
        <span @click="jumpChild">点我进入Test嵌套路由</span>
    </div>
</template>

<script>
export default {
    name: 'test',
    methods: {
        jumpChild() {
            this.$router.push({
                path: '/testNest/child.html'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.test {
    width: 100px;
    height: 100%;
    text-align: center;
    margin: 0 auto;
    font-size: 18px;
    width: 100%;
    font-weight: bold;
    margin-top: 200px;
}
</style>
