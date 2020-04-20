export default {
    path: 'fieldSketch',
    name: 'fieldSketch',
    component: () => import(/* webpackChunkName: "measure" */ './fieldSketch'),
    meta: {
        pageName: '现场测绘提请',
        authPass: true
    }
};
