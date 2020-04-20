export default {
    path: 'create',
    name: 'create',
    component: () => import(/* webpackChunkName: "prjM" */ './create'),
    meta: {
        pageName: '立项申请',
        authPass: true
    }
};
