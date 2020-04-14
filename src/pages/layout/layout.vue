<template>
    <div class="app-main">
        <header class="top">
            <div class="logo"><img :src="logoSmall" v-if="logoSmall" />{{ titie }}</div>
            <top-menu class="menus"></top-menu>
            <div class="functions-user">
                <choose-color class="drop-color"></choose-color>
                <el-dropdown class="drop-lang" @command="changeLang">
                    <span class="el-dropdown-link">
                        {{ $t('common.home') }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh">简体中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-tooltip class="screen-full" effect="light" content="全屏" placement="bottom-end">
                    <screen-full></screen-full>
                </el-tooltip>
                <message></message>
                <user></user>
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
import chooseColor from './components/chooseColor';
import pagesTab from './components/pagesTab';
import { globalService } from '@/services/global';
import message from './components/message';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
    name: 'layoutPage',
    components: { screenFull, user, topMenu, sideBar, chooseColor, pagesTab, message },
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

        if ($codeCollection && $detailMap) {
            window.$codeCollection = $codeCollection;
            window.$detailMap = $detailMap;
        } else {
            this.getAllCode();
        }

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
        },
        getAllCode() {
            globalService.codeList().then(res => {
                const { $codeCollection, $detailMap } = this.formatData(res.data);
                localStorage.setItem('$codeCollection', JSON.stringify($codeCollection));
                localStorage.setItem('$detailMap', JSON.stringify($detailMap));
                window.$codeCollection = $codeCollection;
                window.$detailMap = $detailMap;
            });
        },
        formatData(arr) {
            const res = [];
            let obj = {};
            let detailMap = {};

            function recursion(arr) {
                arr.forEach(it => {
                    const code = it.dictKey;
                    detailMap[code] = it.dictValue;
                    if (it.children) {
                        res.push(it);
                        recursion(it.children);
                    }
                });
            }

            recursion(arr);
            res.forEach(v => {
                const key = v.dictKey;
                obj[key] = v.children.map(it => {
                    const code = it.dictKey;
                    detailMap[code] = it.dictValue;
                    return {
                        label: it.dictValue,
                        id: it.dictKey
                    };
                });
            });
            return {
                $codeCollection: obj,
                $detailMap: detailMap
            };
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
        .logo {
            padding: 0 30px;
            background-color: var(--theme-color);
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
            background-color: var(--theme-color);
            line-height: 35px;
            border-left: 1px solid #052a51;
            padding-left: 10px;
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
        .screen-full {
            cursor: pointer;
        }
    }

    .main {
        overflow: hidden;
        flex: 1;
        .right-panel {
            background-color: #fff;
            height: calc(100vh - 36px);
            .router {
                background: #f2f3fa;
                padding: 20px;
                position: relative;
                height: calc(100% - 40px);
                overflow: hidden scroll;
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
