import layout from '@/pages/layout/layout.vue';
import prj from './prj'; // 投决项目管理
import middleground from './middleground'; // 中台
import investment from './investment'; // 项目投资规划
import operate from './operate'; // 运营规划
import IT from './IT'; // IT规划
import finance from './finance'; // 财务预算
import detail from './detail'; // 财务预算

export default {
    path: '/voteM',
    name: 'voteM',
    component: layout,
    children: [prj, middleground, investment, operate, IT, finance, detail]
};
