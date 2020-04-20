import layout from '@/pages/layout/layout.vue';
import fieldSketch from './fieldSketch';
import submit from './submit';
import approval from './approval';
import detail1 from './fieldSketch/detail';
import detail2 from './submit/detail';

export default {
    path: '/measure',
    name: 'measure',
    component: layout,
    children: [fieldSketch, submit, approval, detail1, detail2]
};
