export default {
    path: 'prjView',
    name: 'prjView',
    component: () => import(/* webpackChunkName: "common" */ './prjView'),
    meta: {
        pageName: '工程项目申请',
        authPass: true
    }
};
