export default {
    path: '/example/tree.html',
    name: 'tree',
    component: () => import(/* webpackChunkName: "common" */ './tree'),
    meta: {
        pageName: '树',
        authPass: true
    }
};
