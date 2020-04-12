export default {
    path: '/example/tree',
    name: 'tree',
    component: () => import(/* webpackChunkName: "common" */ './tree'),
    meta: {
        pageName: '树',
        authPass: true
    }
};
