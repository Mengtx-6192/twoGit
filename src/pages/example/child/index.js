export default {
    path: '/example/child.html',
    name: 'child',
    component: () => import(/* webpackChunkName: "common" */ './child'),
    meta: {
        pageName: '子页面',
        authPass: true
    }
};
