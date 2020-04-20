const MENU = [
    // {
    //     id: '1',
    //     name: '案例页面',
    //     uri: '/example/tree.html',
    //     icon: '',
    //     type: 0,
    //     children: [
    //         {
    //             name: '树',
    //             id: '1',
    //             icon: 'el-icon-position',
    //             uri: '/example/tree.html'
    //         },
    //         {
    //             name: '表格',
    //             id: '2',
    //             icon: 'el-icon-position',
    //             uri: '/example/table.html'
    //         },
    //         {
    //             name: '菜单3',
    //             id: '3',
    //             icon: 'el-icon-position',
    //             children: [
    //                 {
    //                     id: '3-1',
    //                     name: '菜单3-1',
    //                     img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
    //                     uri: '/process/task/noDone.html'
    //                 },
    //                 {
    //                     id: '3-2',
    //                     name: '菜单3-2',
    //                     img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
    //                     uri: '/process/task/done.html'
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: '0',
    //     name: '工作台',
    //     uri: '/dashboard'
    // },
    {
        id: '3',
        name: '选址会',
        uri: '/siteSM/manage',
        children: [
            // {
            //     id: '3-0',
            //     name: '选址项目管理',
            //     uri: '/siteSM/choose',
            //     icon: 'el-icon-fork-spoon'
            // },
            {
                id: '3-1',
                name: '点址管理',
                uri: '/siteSM/manage',
                icon: 'el-icon-crop'
            }
        ]
    },
    {
        id: '2',
        name: '工程项目管理',
        uri: '/prjM/apply',
        children: [
            {
                id: '2-1',
                name: '工程项目审批',
                uri: '/prjM/apply',
                icon: 'el-icon-coordinate'
            },
            {
                id: '2-2',
                name: '工程项目管理',
                uri: '/prjM/prjView',
                icon: 'el-icon-view'
            }
            // {
            //     id: '2-4',
            //     name: '工程项目更改',
            //     uri: '/prjM/prjClose',
            //     icon: 'el-icon-document-delete'
            // }
        ]
    },
    {
        id: '4',
        name: '投决会',
        uri: '/voteM/middleground',
        children: [
            {
                id: '4-0',
                name: '投决项目管理',
                uri: '/voteM/prj',
                icon: 'el-icon-edit-outline'
            },
            {
                id: '4-1',
                name: '商品布局管理',
                uri: '/voteM/middleground',
                icon: 'el-icon-edit-outline'
            },
            {
                id: '4-2',
                name: '项目投资规划',
                uri: '/voteM/investment',
                icon: 'el-icon-money'
            },
            {
                id: '4-3',
                name: '运营规划',
                uri: '/voteM/operate',
                icon: 'el-icon-printer'
            },
            {
                id: '4-4',
                name: 'IT规划',
                uri: '/voteM/IT',
                icon: 'el-icon-guide'
            },
            {
                id: '4-5',
                name: '财务预算',
                uri: '/voteM/finance',
                icon: 'el-icon-guide'
            }
        ]
    },
    {
        id: '5',
        name: '量场',
        uri: '/measure/fieldSketch',
        children: [
            {
                id: '5-1',
                name: '现场测绘提请',
                uri: '/measure/fieldSketch',
                icon: 'el-icon-help'
            },
            {
                id: '5-2',
                name: '现场测绘报告提交',
                uri: '/measure/submit',
                icon: 'el-icon-s-promotion'
            },
            {
                id: '5-3',
                name: '现场测绘报告审批',
                uri: '/measure/approval',
                icon: 'el-icon-s-promotion'
            }
        ]
    }
    // {
    //     id: '6',
    //     name: '审批管理',
    //     uri: '/approveM',
    //     children: [
    //         {
    //             id: '6-1',
    //             name: '隐蔽验收',
    //             uri: '/quality/ysList/yb',
    //             icon: 'el-icon-info'
    //         },
    //         {
    //             id: '6-2',
    //             name: '竣工验收',
    //             uri: '/quality/ysList/jg',
    //             icon: 'el-icon-finished'
    //         },
    //         {
    //             id: '6-3',
    //             name: '开业验收',
    //             uri: '/quality/ysList/ky',
    //             icon: 'el-icon-s-claim'
    //         }
    //     ]
    // }
];
export { MENU };
