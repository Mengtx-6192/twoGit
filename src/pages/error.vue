<template>
    <div>
        <div class="err err-401" v-if="errType === 'error.401'">没权限</div>
        <div class="err err-404" v-if="errType === 'error.404'">404</div>
        <div class="err err-500" v-if="errType === 'error.500'">服务器错误</div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.errType = this.$router.history.current.name;
    },
    data() {
        return {
            errType: '500'
        };
    }
};
</script>

<style lang="scss" scoped>
.err {
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
