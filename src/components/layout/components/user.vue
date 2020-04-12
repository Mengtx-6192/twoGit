<template>
    <div class="user">
        <el-dropdown @command="handleCommand">
            <span class="user-name">
                <span class="avatar" v-if="userInfo.avatar">
                    <img :src="userInfo.avatar" />
                </span>
                <i v-else class="el-icon-user"></i>
                {{ userInfo.nick_name }}
            </span>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="d" disabled>修改密码</el-dropdown-item>
                <el-dropdown-item command="d" disabled>个人中心</el-dropdown-item>
                <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {
            userInfo: ''
        };
    },
    created() {
        const userInfo = JSON.parse(localStorage.getItem('accountInfo'));
        if (userInfo) {
            this.userInfo = userInfo;
        }
    },
    methods: {
        handleCommand(e) {
            if (e === 'e') {
                this.$router.push('/login');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.user {
    margin-left: 20px;
    .user-name {
        cursor: default;
        color: #ffffff;
        font-size: 16px;
    }
}
</style>
