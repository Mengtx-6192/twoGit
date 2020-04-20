export default {
    path: 'create',
    name: 'siteInfo',
    component: () => import(/* webpackChunkName: "siteSM" */ './siteInfo'),
    meta: {
        pageName: '点址信息',
        authPass: true
    }
};
