export default {
    path: 'detail',
    name: 'voteMdetail',
    component: () => import(/* webpackChunkName: "common" */ './tabs'),
    meta: {
        pageName: '投决会详情',
        authPass: true
    }
};
