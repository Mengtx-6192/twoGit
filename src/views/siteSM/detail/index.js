export default {
    path: 'tabs',
    name: 'sitTabs',
    component: () => import(/* webpackChunkName: "siteSM" */ './tabs'),
    meta: {
        pageName: '详情',
        authPass: true
    }
};
