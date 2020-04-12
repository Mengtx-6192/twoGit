const router = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "common" */ './login'),
        meta: {
            authPass: true
        }
    },
    {
        path: '/',
        redirect: '/example/tree'
    },
    {
        path: '/401',
        name: 'error.401',
        component: () => import(/* webpackChunkName: "common" */ './error'),
        meta: {
            authPass: true
        }
    },
    {
        path: '*',
        name: 'error.404',
        component: () => import(/* webpackChunkName: "common" */ './error'),
        meta: {
            authPass: true
        }
    },
    {
        path: '/500',
        name: 'error.500',
        component: () => import(/* webpackChunkName: "common" */ './error'),
        meta: {
            authPass: true
        }
    }
];

export default router;
