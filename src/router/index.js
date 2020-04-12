import Router from 'vue-router';
import pages from '@/pages';
import views from '@/views';
import store from '../store/index';

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};

const loadRoutes = (rous, paths, children) => {
    if (_.has(rous, 'path')) {
        let ps = _.flattenDeep(paths).filter(p => p);

        if (_.last(ps) === rous.name) {
            ps.splice(ps.length - 1, 1);
        }
        if (!children) {
            let filePs = ps.join('/');

            if (rous.path) {
                rous.path = (filePs ? '/' : '') + filePs + (rous.path[0] === '/' ? '' : '/') + rous.path;
            } else {
                rous.path = filePs;
            }
        }
        rous.name = _.concat(ps, [rous.name]).join('.');

        if (rous.children) {
            _.each(rous.children, child => {
                loadRoutes(child, [paths, child.name], true);
            });
            return [rous];
        }
        return [rous];
    }

    if (rous.length) {
        return _.map(rous, r => {
            return loadRoutes(r, [paths]);
        });
    } else {
        return _.map(rous, (rou, k) => {
            return loadRoutes(rou, [paths, k]);
        });
    }
};

export function createRouter() {
    let routes = _.flattenDeep(loadRoutes(views));

    routes = routes.concat(pages);

    const router = new Router({
        mode: 'history',
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        }
    });

    // 路由权限控制
    router.beforeEach((to, from, next) => {
        const { meta } = to;

        const isLogin = store.state.user.isLogin || false;

        if (meta.authPass !== false && !isLogin && to.name !== 'login') {
            return next('/login');
        }
        next();
    });

    return router;
}
