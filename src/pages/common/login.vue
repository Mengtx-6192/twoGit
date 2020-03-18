<template>
    <div class="login-section" :style="'background:url(' + backgroundImage + ') center 0 no-repeat;background-size: cover;'">
        <div class="content-box" :class="formPlacement">
            <p class="title">Local Data Base</p>
            <div class="login-form">
                <div class="login-item">
                    <input
                        class="input"
                        :class="{ error: userNameError }"
                        autocomplete="off"
                        readonly
                        onfocus="this.removeAttribute('readonly');"
                        :placeholder="'请输入账号'"
                        type="text"
                        v-model="user"
                        @keyup="validUser($event)"
                        @enter="login"
                    />
                </div>
                <div class="login-item">
                    <input
                        type="password"
                        class="input"
                        v-model="password"
                        style="width:100%;"
                        autocomplete="off"
                        readonly
                        onfocus="this.removeAttribute('readonly');"
                        :placeholder="'请输入密码'"
                        :class="{ error: passWordError }"
                        @keyup="validPassword($event)"
                        @enter="login"
                    />
                </div>

                <div class="login-error">
                    <span>{{ errorMessage }}</span>
                </div>
                <div class="login-item">
                    <a href="javascript:void(0)" class="login" @click="login">登录</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '@/services/user/userService';
import { mapActions } from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            autoLogin: true, // 自动登录
            password: '',
            user: '',
            userNameError: false,
            passWordError: false,
            phoneError: '',
            codeError: '',
            showRegister: false,
            phone: '',
            code: '',
            time: '60',
            codeDisabled: false,
            backgroundImage: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/navigator/images/logon_bg.jpg',
            formPlacement: 'center',
            userInfo: {
                min: 2,
                max: 10
            },
            pwdInfo: {
                min: 1,
                max: 10
            },
            errorMessage: ''
        };
    },
    computed: {
        userMin() {
            if (this.userInfo && this.userInfo.min) {
                return this.userInfo.min;
            } else {
                return 1;
            }
        },
        userMax() {
            if (this.userInfo && this.userInfo.max) {
                return this.userInfo.max;
            } else {
                return 50;
            }
        },
        passwordMin() {
            if (this.pwdInfo && this.pwdInfo.min) {
                return this.pwdInfo.min;
            } else {
                return 6;
            }
        },
        passwordMax() {
            if (this.pwdInfo && this.pwdInfo.max) {
                return this.pwdInfo.max;
            } else {
                return 50;
            }
        }
    },
    created() {
        this.userService = new UserService();
        window.localStorage.clear();
    },
    methods: {
        ...mapActions('user', ['setAccountInfo']),
        /* 登录 */
        login() {
            if (this.autoLogin) {
                if (!this.validUserValue()) {
                    return;
                }
                if (!this.validPasswordValue()) {
                    return;
                }
                let user = {
                    user: this.user,
                    password: this.password
                };

                this.userService
                    .login({
                        username: this.user,
                        password: this.password,
                        grant_type: 'password',
                        scope: 'all'
                    })
                    .then(ret => {
                        this.setAccountInfo(ret);
                        this.$router.push({ path: '/test.html' });
                    })
                    .catch(err => {
                        this.$message.error(err.error_description || '接口错误');
                    });
            }
        },
        validUser(e) {
            if (!this.validUserValue()) {
                return;
            }
            if (e.keyCode && e.keyCode === 13) {
                this.login();
            }
        },
        validUserValue() {
            this.userNameError = this.user === '' || this.user.length < this.userMin || this.user.length > this.userMax;
            if (this.user === '') {
                this.errorMessage = '用户名不能为空';
                return false;
            }
            if (this.user.length < this.userMin) {
                this.errorMessage = '用户名不少于' + this.userMin + '位';
                return false;
            }
            if (this.user.length > this.userMax) {
                this.errorMessage = '用户名不超过' + this.userMax + '位';
                return false;
            } else {
                this.errorMessage = '';
                return true;
            }
        },
        validPassword(e) {
            if (!this.validPasswordValue()) {
                return;
            }
            if (e.keyCode && e.keyCode === 13) {
                this.login();
            }
        },
        validPasswordValue() {
            this.passWordError = this.password === '' || this.password.length < this.passwordMin || this.password.length > this.passwordMax;
            if (this.password === '') {
                this.errorMessage = '密码不能为空';
                return false;
            }
            if (this.password.length < this.passwordMin) {
                this.errorMessage = '密码不少于' + this.passwordMin + '位';
                return false;
            }
            if (this.password.length > this.passwordMax) {
                this.errorMessage = '密码不超过' + this.passwordMax + '位';
                return false;
            } else {
                this.errorMessage = '';
                return true;
            }
        }
    }
};
</script>
<style lang="scss">
.login-section {
    position: relative;
    height: 100vh;
    width: 100%;
    min-height: 680px;
    .content-box {
        position: absolute;
        border-radius: 8px;
        z-index: 5;
        background: rgba(255, 255, 255, 0.5);
        padding: 28px 60px 10px;
        min-height: 420px;
        .title {
            font-size: 24px;
            color: #fff;
            line-height: 32px;
        }
        .subhead {
            font-size: 12px;
            color: #fff;
            line-height: 18px;
        }
        .login-form {
            width: 350px;
            padding-top: 35px;
            .input {
                background: #fff;
                height: 44px;
                line-height: 44px;
                border-radius: 22px;
                width: 100%;
                border: 0;
                padding-left: 22px;
                outline: none;
                border: 1px solid #fff;
                box-sizing: border-box;
            }
            .error {
                border: 1px solid red;
            }
            .login-item {
                padding-bottom: 10px;
            }
            .autoLogin {
                height: 22px;
                line-height: 22px;
            }
            .login {
                height: 40px;
                line-height: 40px;
                width: 100%;
                border-radius: 20px;
                display: block;
                text-align: center;
                background: -webkit-linear-gradient(left, #5668ff, #67c8ff); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(right, #67c8ff, #5668ff); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right, #67c8ff, #5668ff); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right, #67c8ff, #5668ff);
                color: #fff;
                margin-top: 20px;
            }
            .login-error {
                color: #ed3f14;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .register-box {
                a {
                    display: block;
                    text-align: center;
                    color: #fff;
                    padding: 25px 0;
                }
            }
        }
    }
    .register-panel {
        padding: 0px 0 10px;
        .register-title {
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            color: #fff;
            line-height: 52px;
            height: 52px;
            padding-left: 20px;
        }
        .register-form {
            padding: 42px 60px 0;
            width: 470px;
        }
        .regist-posi {
            margin-bottom: 10px;
            .send-phone {
                display: inline-block;
            }
            input {
                outline: none;
                border: none;
                width: 100%;
                line-height: 40px;
                height: 40px;
            }
        }
        .send-code {
            width: 106px;
            background: #fff;
            text-align: center;
            border: none;
            color: #004f8c;
            border-radius: 0 22px 22px 0;
            outline: none;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            height: 42px;
        }
        .send-code:before {
            content: '';
            z-index: 5;
            position: absolute;
            top: 50%;
            height: 15px;
            background: #ccc;
            left: 0;
            width: 1px;
            transform: translateY(-50%);
        }
        .register-tip {
            text-align: center;
            color: #fff;
            line-height: 42px;
            a {
                color: #004f8c;
            }
        }
    }
    .center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .right {
        top: 50%;
        right: 15%;
        transform: translateY(-50%);
    }
    .left {
        top: 50%;
        left: 15%;
        transform: translateY(-50%);
    }
}
</style>
