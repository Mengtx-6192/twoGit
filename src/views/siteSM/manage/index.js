export default {
    path: 'manage',
    name: 'manage',
    component: () => import(/* webpackChunkName: "manage" */ './manage'),
    meta: {
        pageName: '选址项目管理',
        authPass: true
    }
};
