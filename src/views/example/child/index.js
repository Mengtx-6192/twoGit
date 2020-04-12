export default {
    path: '/example/child',
    name: 'child',
    component: () => import(/* webpackChunkName: "common" */ './child'),
    meta: {
        pageName: '子页面',
        authPass: true
    }
};
