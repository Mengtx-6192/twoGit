import layout from '@/pages/layout/layout.vue';
import apply from './apply';

export default {
    path: '/prjM',
    name: 'prjM',
    component: layout,
    children: [apply]
};
