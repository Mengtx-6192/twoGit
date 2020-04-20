const CODE = [
    {
        title: '审批状态',
        align: 'center',
        key: 'approvalStatus',
        width: 200
    },
    {
        title: '审批结果',
        align: 'center',
        key: 'effectStatus',
        code: window.$codeCollection && window.$codeCollection['YK013'],
        width: 200
    },
    {
        title: '项目编号',
        align: 'center',
        key: 'projectNo',
        width: 200
    },
    {
        title: '项目类型',
        align: 'center',
        code: window.$codeCollection && window.$codeCollection['YK002'],
        key: 'type',
        width: 200
    },
    {
        title: '项目名称',
        key: 'nameCn',
        width: 200
    },
    {
        title: '项目地址',
        key: 'addressCn',
        width: 200
    },
    // {
    //     title: '子公司',
    //     align: 'center',
    //     key: 'companyId',
    //     width: 200
    // },
    // {
    //     title: '品牌',
    //     align: 'center',
    //     key: 'storeBrand',
    //     width: 200
    // },
    {
        title: '经营类型',
        align: 'center',
        key: 'managementType',
        code: window.$codeCollection && window.$codeCollection['YK003'],
        width: 200
    },
    // {
    //     title: '餐厅装修面积(㎡)',
    //     align: 'center',
    //     key: 'areaDecoration',
    //     width: 200
    // },
    {
        title: '预计开业日期',
        align: 'center',
        key: 'estOpenDate',
        width: 200
    },
    {
        title: '立项申请时间',
        align: 'center',
        key: 'createTime',
        width: 200
    }
    // {
    //     title: '工程进度',
    //     align: 'center',
    //     key: 'createTime',
    //     width: 200
    // }
    // {
    //     title: '工程经理',
    //     align: 'center',
    //     key: 'prjUser.name',
    //     width: 200
    // }
];

const FILTER = {
    labelWidth: 130,
    cols: 3,
    list: [
        {
            span: 1,
            label: '项目名称',
            type: 'input',
            placeholder: '请输入',
            name: 'nameCn'
        },
        {
            span: 1,
            label: '项目类型',
            type: 'select',
            placeholder: '请选择',
            optionsList: window.$codeCollection && window.$codeCollection['YK002'],
            name: 'type'
        },
        // {
        //     span: 1,
        //     label: '品牌',
        //     type: 'select',
        //     placeholder: '请选择',
        //     name: 'storeBrand'
        // },
        {
            span: 1,
            label: '项目地址',
            type: 'input',
            placeholder: '请输入',
            name: 'addressCn'
        },
        {
            span: 1,
            label: '经营类型',
            type: 'select',
            placeholder: '请选择',
            optionsList: window.$codeCollection && window.$codeCollection['YK003'],
            name: 'managementType'
        }
        // {
        //     span: 1,
        //     label: '子公司',
        //     type: 'select',
        //     placeholder: '请选择',
        //     name: 'companyId'
        // }
    ]
};

export { CODE, FILTER };
