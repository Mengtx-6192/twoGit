export default {
    path: 'middleground',
    name: 'middleground',
    component: () => import(/* webpackChunkName: "voteM" */ './middleground'),
    meta: {
        pageName: '商品布局管理',
        authPass: true
    }
};
