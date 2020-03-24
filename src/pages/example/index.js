import layout from './layout';
import child from './child';
import tree from './tree';

export default {
    path: '/example',
    name: 'example',
    component: layout,
    children: [child, tree]
};
