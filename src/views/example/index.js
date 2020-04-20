import layout from '@/pages/layout/layout.vue';
import child from './child';
import tree from './tree';
import table from './table';

export default {
    path: '/example',
    name: 'example',
    component: layout,
    children: [child, tree, table]
};
