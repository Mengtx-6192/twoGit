export default {
    path: 'approval',
    name: 'approval',
    component: () => import(/* webpackChunkName: "measure" */ './approval'),
    meta: {
        pageName: '现场测绘报告提交',
        authPass: true
    }
};
