function deepFind(arr, activeId) {
    let res = null;
    if (arr.length === 0) {
        return false;
    }
    function find(list, id) {
        list.forEach(it => {
            if (it.id === id) {
                res = it;
                return false;
            } else if (it.children && it.children.length) {
                find(it.children, id);
            }
        });
    }
    find(arr, activeId);
    return res;
}

const state = {
    guid: null,
    menuList: [],
    activeMenu: '0',
    activeSubMenu: '0',
    sideStatus: true // true 展开 false: 关闭
};

const getters = {
    currentMenus: state => {
        return deepFind(state.menuList, state.activeMenu);
    },
    menuList(state) {
        return state.menuList;
    },
    activeMenu(state) {
        return state.activeMenu;
    },
    activeSubMenu(state) {
        return state.activeSubMenu;
    }
};

const mutations = {
    // 点击顶部菜单按钮
    menuClicked(state, menuId) {
        state.activeMenu = menuId;
    },
    // 切换左侧菜单展示形式
    toggleSideBar(state) {
        state.sideStatus = !state.sideStatus;
    },
    // 清空state
    clearMenuState(state) {
        state.activeMenu = '0';
    },
    setMenuList(state, list) {
        state.menuList = list;
    },
    setActiveSubMenu(state, id) {
        state.activeSubMenu = id;
    }
};
export default {
    namespaced: true, // 创建log的命名空间
    state,
    getters,
    mutations
};
