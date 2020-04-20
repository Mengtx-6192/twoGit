export default {
    path: 'investment',
    name: 'investment',
    component: () => import(/* webpackChunkName: "voteM" */ './investment'),
    meta: {
        pageName: '项目投资规划',
        authPass: true
    }
};
