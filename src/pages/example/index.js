import layout from './layout';
import child from './child';
import tree from './tree';
import table from './table';

export default {
    path: '/example',
    name: 'example',
    component: layout,
    children: [child, tree, table]
};
