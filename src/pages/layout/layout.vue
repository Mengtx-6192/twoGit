<template>
    <div class="app-main">
        <header class="top">
            <div class="logo"><img :src="logoSmall" v-if="logoSmall" />{{ titie }}</div>
            <top-menu class="menus"></top-menu>
            <div class="functions-user">
                <el-dropdown class="drop-lang" @command="changeLang" trigger="click">
                    <span class="el-dropdown-link">
                        <el-tooltip content="中英文" placement="bottom" effect="light">
                            <i class="icon-rz-en" />
                        </el-tooltip>
                        <!-- {{ $t('common.home') }}<i class="el-icon-arrow-down el-icon--right"></i> -->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh">简体中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <choose-theme />
                <screen-full />
                <message />
                <user />
            </div>
        </header>

        <div class="main">
            <sideBar></sideBar>

            <div class="right-panel">
                <div class="router">
                    <pages-tab v-if="showPageTab" :urlQuery="urlQuery"></pages-tab>
                    <transition name="fade-transform" mode="out-in">
                        <router-view :key="$route.name" />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topMenu from './components/topMenu';
import tagsView from './components/tagsView';
import user from './components/user';
import screenFull from './components/screenful';
import sideBar from './components/sideBar/sideBar';
import pagesTab from './components/pagesTab';
import chooseTheme from './components/chooseTheme';
import message from './components/message';
import { globalService } from '@/services/global';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
    name: 'layoutPage',
    components: { screenFull, user, topMenu, sideBar, pagesTab, message, chooseTheme },
    data() {
        return {
            titie: Vue.$config.projectName,
            logoSmall: Vue.$config.logoSmall,
            urlQuery: {},
            showPageTab: false
        };
    },
    created() {
        const $codeCollection = JSON.parse(localStorage.getItem('$codeCollection'));
        const $detailMap = JSON.parse(localStorage.getItem('$detailMap'));
        let socket = new SockJS('/api/rdp-message/stomp-websocket');
        let stompClient = Stomp.over(socket);
        let headers = {
            'r-auth': localStorage.getItem('r-auth')
        };

        this.watchUrlCallback();

        stompClient.connect(headers, frame => {
            stompClient.subscribe('/topic/sendTopic', message => {
                this.$message.info('收到新消息了');
            });
        });
    },
    watch: {
        $route(nv, ov) {
            this.watchUrlCallback(nv);
        }
    },
    methods: {
        watchUrlCallback() {
            let route = this.$route;
            if (route.path.startsWith('/flowTask')) {
                this.showPageTab = true;
            } else {
                this.showPageTab = false;
            }
        },
        async changeLang(val) {
            this.$i18n.locale = val;
            const res1 = await globalService.i18nList({ i18n: val });
            console.log('i18n', res1);
            const res = await globalService.i18nMessage({ i18n_message: val });
            console.log('i18n_message', res);
        }
    }
};
</script>

<style lang="scss" scoped>
.app-main {
    background-color: #f2f3fa;
    height: 100%;
    display: flex;
    flex-direction: column;

    header.top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--nav-color);
        .logo {
            padding: 0 30px;
            color: #fff;
            line-height: 36px;
            height: 100%;
            font-size: 16px;

            img {
                width: 18px;
                height: 18px;
            }
        }
        .functions-user {
            padding-right: 30px;
            display: flex;
            justify-content: flex-end;
            height: 100%;
            line-height: 35px;
            border-left: 1px solid var(--nav-active-color);
            padding-left: 10px;
            align-items: center;
        }
        .drop-color {
            line-height: 34px;
            margin-right: 10px;
            cursor: pointer;
        }
        .drop-lang {
            margin-right: 10px;
            color: #fff;
            cursor: pointer;
        }
        .menus {
            flex: 1;
        }
    }

    .main {
        overflow: hidden;
        flex: 1;
        display: flex;
        position: relative;
        padding-right: 20px;
        .right-panel {
            background-color: #f2f3fa;
            height: calc(100vh - 36px);
            flex: 1;
            overflow-x: hidden; // 解决 el-table 遇到flex 不继承父级width
            .router {
                background: #fff;
                margin: 20px;
                position: relative;
                height: calc(100% - 40px);
                overflow: hidden scroll;
                box-sizing: border-box;
                .router-view-page {
                    min-height: calc(100% - 20px);
                    background-color: #fff;
                    border-radius: 6px;
                    padding: 10px;
                    box-shadow: 0px 2px 6px rgba(38, 46, 56, 0.1);
                }
            }
        }
    }
}
</style>
