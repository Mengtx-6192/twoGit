import layout from '@/pages/layout/layout.vue';
import manage from './manage';
import choose from './choose';
import tabs from './detail';
import create from './detail/siteInfo';

export default {
    path: '/siteSM',
    name: 'siteSM',
    component: layout,
    children: [manage, choose, tabs, create]
};
