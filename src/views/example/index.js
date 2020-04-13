import child from './child';
import tree from './tree';
import table from './table';
import layout from '@/components/layout/layout.vue';

export default {
    path: '/example',
    name: 'example',
    component: layout,
    children: [child, tree, table]
};
