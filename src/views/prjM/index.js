import layout from '@/pages/layout/layout.vue';
import apply from './apply';
import create from './create';
import prjView from './prjView';
import prjClose from './prjClose';

export default {
    path: '/prjM',
    name: 'prjM',
    component: layout,
    children: [apply, create, prjView, prjClose]
};
