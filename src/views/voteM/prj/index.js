export default {
    path: 'prj',
    name: 'prj',
    component: () => import(/* webpackChunkName: "voteM" */ './prj'),
    meta: {
        pageName: '投决项目管理',
        authPass: true
    }
};
