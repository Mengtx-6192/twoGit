export default {
    path: '/test.html',
    name: 'test',
    component: () => import(/* webpackChunkName: "common" */ './test'),
    meta: {
        pageName: '测试页面',
        authPass: false
    }
};
