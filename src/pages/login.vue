<template>
    <div class="login-container" :style="{ 'background-image': `url(${this.loginBg})` }">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="logo-icon">
                <img :src="logo" />
            </div>
            <div class="title-container">
                <h3 class="title">{{ title }}</h3>
            </div>

            <el-form-item prop="username">
                <img src="@/assets/images/user.png" class="icon" />
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <img src="@/assets/images/pwd.png" class="icon" />
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <i :class="passwordType === 'password' ? 'icon-rz-eye' : 'icon-rz-eye-open'"></i>
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin"
                >登录
            </el-button>

            <div class="forget-pwd">忘记密码</div>
        </el-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 2) {
                callback(new Error('密码错误'));
            } else {
                callback();
            }
        };
        return {
            logo: Vue.$config.logo,
            loginBg: Vue.$config.loginBg,
            title: Vue.$config.projectName,
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        };
    },
    created() {
        window.localStorage.clear();
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
    },
    computed: {
        ...mapGetters('log', ['currentMenus'])
    },
    methods: {
        ...mapActions('user', ['setAccountInfo']),
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            const vm = this;
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    const params = {
                        ...this.loginForm,
                        grant_type: 'password',
                        scope: 'all'
                    };
                    vm.$api.userService
                        .login(params)
                        .then(ret => {
                            this.loading = false;
                            this.setAccountInfo(ret);
                            let path = Vue.$config.home;
                            if (vm.currentMenus) {
                                if (vm.currentMenus.uri) {
                                    path = vm.currentMenus.uri;
                                } else {
                                    path = vm.currentMenus.children[0].uri;
                                }
                            }
                            vm.$router.push({ path: path });
                        })
                        .catch(err => {
                            this.$message.warning(err.error_description || '登录超时,请检查您的网络或联系管理员!');
                            this.loading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        }
    }
};
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: #fff)) {
    .login-container .el-input input {
        color: #fff;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 40px;
        width: 80%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #1f2743;
            height: 40px;
            caret-color: #1f2743;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #f2f3fa inset !important;
                -webkit-text-fill-color: #1f2743 !important;
            }
        }
    }

    .el-form-item__content {
        display: flex;
    }

    .el-form-item--small .el-form-item__error {
        padding-top: 3px;
        padding-left: 16px;
    }

    .el-form-item {
        width: 280px;
        height: 40px;
        background: rgba(242, 243, 250, 1);
        border-radius: 20px;

        .icon {
            width: 18px;
            height: 18px;
            display: inline-block;
            margin: 11px 0 11px 19px;
        }
    }
}
</style>

<style lang="scss" scoped>
.login-container {
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: 0;
    background-size: 100%;

    .login-form {
        position: relative;
        width: 380px;
        max-width: 100%;
        margin: 204px auto 0;
        height: 381px;
        background: #fff;
        box-shadow: 0px 2px 7px 0px rgba(85, 154, 248, 0.16);
        border-radius: 10px;
        padding: 0 50px;
        box-sizing: border-box;

        .logo-icon {
            width: 120px;
            height: 120px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            left: 130px;
            top: -60px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 2px 7px 0px rgba(85, 154, 248, 0.36);

            img {
                width: 84px;
                height: 84px;
            }
        }
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .title-container {
        position: relative;
        padding: 75px 0 16px;

        .title {
            font-size: 24px;
            color: #1f2743;
            text-align: center;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 36px;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    .login-btn {
        width: 280px;
        height: 40px;
        background: rgba(19, 100, 182, 1);
        border-radius: 20px;
        font-size: 14px;
        margin-top: 2px;
    }

    .forget-pwd {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #1364b6;
        padding-top: 15px;
        text-align: right;
    }
}
</style>
