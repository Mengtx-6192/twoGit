export default {
    path: '/testNest/child.html',
    name: 'child',
    component: () => import(/* webpackChunkName: "common" */ './child'),
    meta: {
        pageName: '子页面',
        authPass: true
    }
};
