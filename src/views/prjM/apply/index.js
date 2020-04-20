export default {
    path: 'apply',
    name: 'apply',
    component: () => import(/* webpackChunkName: "prjM" */ './apply'),
    meta: {
        pageName: '工程项目申请',
        authPass: true
    }
};
