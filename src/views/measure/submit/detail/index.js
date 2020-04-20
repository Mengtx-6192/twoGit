export default {
    path: 'submit/tabs',
    name: 'measure',
    component: () => import(/* webpackChunkName: "measure" */ './tabs'),
    meta: {
        pageName: '详情',
        authPass: true
    }
};
