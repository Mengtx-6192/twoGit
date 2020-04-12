// 写死的菜单
const menu = [
    {
        id: '0',
        title: '案例',
        page: '/example/tree',
        type: 0,
        children: [
            {
                title: '树',
                id: '1',
                icon: 'el-icon-position',
                url: '/example/tree'
            },
            {
                title: '表格',
                id: '2',
                icon: 'el-icon-position',
                url: '/example/table'
            },
            {
                title: '菜单3',
                id: '3',
                icon: 'el-icon-position',
                children: [
                    {
                        id: '3-1',
                        title: '菜单3-1',
                        img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                        url: '/process/task/noDone'
                    },
                    {
                        id: '3-2',
                        title: '菜单3-2',
                        img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                        url: '/process/task/done'
                    }
                ]
            }
        ]
    }
];
export { menu };
