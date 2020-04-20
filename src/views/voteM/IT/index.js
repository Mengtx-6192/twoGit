export default {
    path: 'IT',
    name: 'IT',
    component: () => import(/* webpackChunkName: "voteM" */ './IT'),
    meta: {
        pageName: 'IT规划',
        authPass: true
    }
};
