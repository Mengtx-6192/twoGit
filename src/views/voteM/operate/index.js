export default {
    path: 'operate',
    name: 'operate',
    component: () => import(/* webpackChunkName: "voteM" */ './operate'),
    meta: {
        pageName: '运营规划',
        authPass: true
    }
};
