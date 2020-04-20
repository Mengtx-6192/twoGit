export default {
    path: '/prjM/apply',
    name: 'apply',
    component: () => import(/* webpackChunkName: "common" */ './apply'),
    meta: {
        pageName: '工程项目申请',
        authPass: true
    }
};
