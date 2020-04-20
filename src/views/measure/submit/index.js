export default {
    path: 'submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "measure" */ './submit'),
    meta: {
        pageName: '现场测绘报告提交',
        authPass: true
    }
};
