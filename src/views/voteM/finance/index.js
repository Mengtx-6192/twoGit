export default {
    path: 'finance',
    name: 'finance',
    component: () => import(/* webpackChunkName: "common" */ './finance'),
    meta: {
        pageName: '财务决算',
        authPass: true
    }
};
