export default {
    path: '/example/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "common" */ './table'),
    meta: {
        pageName: '表格',
        authPass: true
    }
};
