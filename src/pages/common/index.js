const router = [
    {
        path: '/login.html',
        name: 'login',
        component: () => import(/* webpackChunkName: "common" */ './login'),
        meta: {
            authPass: true
        }
    },
    {
        path: '/',
        redirect: '/dataModel/index.html'
    },
    {
        path: '/401.html',
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
        path: '/500.html',
        name: 'error.500',
        component: () => import(/* webpackChunkName: "common" */ './error'),
        meta: {
            authPass: true
        }
    }
];

export default router;
