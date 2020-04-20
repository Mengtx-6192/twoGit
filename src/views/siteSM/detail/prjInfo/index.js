export default {
    path: 'choose',
    name: 'choose',
    component: () => import(/* webpackChunkName: "siteSM" */ './choose'),
    meta: {
        pageName: '点址管理',
        authPass: true
    }
};
