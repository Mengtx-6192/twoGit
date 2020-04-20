export default {
    path: 'prjClose',
    name: 'prjClose',
    component: () => import(/* webpackChunkName: "common" */ './prjClose'),
    meta: {
        pageName: '工程项目申请',
        authPass: true
    }
};
