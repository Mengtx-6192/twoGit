export default {
    votePlatFormInfo: [
        {
            groupName: '现场测绘信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '现场测绘信息',
                list: [
                    {
                        span: 2,
                        label: '现场测绘信息',
                        type: 'input',
                        placeholder: '自动带入',
                        disabled: true,
                        name: 'nameCn1',
                        rules: [{ required: true, message: '请输入现场测绘信息', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: '点址信息',
            groupKey: 'a2',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '点址信息',
                list: [
                    {
                        span: 2,
                        label: '点址信息',
                        type: 'select',
                        disabled: true,
                        placeholder: '自动带入',
                        name: 'b1',
                        rules: [{ required: true, message: '请输入点址信息', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: '商品布局信息',
            groupKey: 'a3',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '商品布局信息',
                list: [
                    {
                        span: 2,
                        label: '平面布局图',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传平面布局图', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）目标-鲜食',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshFoodTarget',
                        rules: [{ required: true, message: '请输入日商（含税）目标-鲜食', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）目标-咖茶',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'coffeeTeaTarget',
                        rules: [{ required: true, message: '请输入日商（含税）目标-咖茶', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）目标-烘焙',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'bakingTarget',
                        rules: [{ required: true, message: '请输入日商（含税）目标-烘焙', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）目标-生鲜',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshTarget',
                        rules: [{ required: true, message: '请输入日商（含税）目标-生鲜', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）目标-标品',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'standardProductTarget',
                        rules: [{ required: true, message: '请输入日商（含税）目标-标品', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率目标-鲜食',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshFoodProfit',
                        rules: [{ required: true, message: '请输入毛利率目标-鲜食', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率目标-咖茶',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'coffeeTeaProfit',
                        rules: [{ required: true, message: '请输入毛利率目标-咖茶', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率目标-烘焙',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'bakingProfit',
                        rules: [{ required: true, message: '请输入毛利率目标-烘焙', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率目标-生鲜',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshProfit',
                        rules: [{ required: true, message: '请输入毛利率目标-生鲜', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率目标-标品',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'standardProductProfit',
                        rules: [{ required: true, message: '请输入毛利率目标-标品', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）保守-鲜食',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshFoodKeep',
                        rules: [{ required: true, message: '请输入日商（含税）保守-鲜食', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）保守-咖茶',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'coffeeTeaKeep',
                        rules: [{ required: true, message: '请输入日商（含税）保守-咖茶', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）保守-烘焙',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'bakingKeep',
                        rules: [{ required: true, message: '请输入日商（含税）保守-烘焙', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）保守-生鲜',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshKeep',
                        rules: [{ required: true, message: '请输入日商（含税）保守-生鲜', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '日商（含税）保守-标品',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'standardProductKeep',
                        rules: [{ required: true, message: '请输入日商（含税）保守-标品', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率保守-鲜食',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshFoodProfitKeep',
                        rules: [{ required: true, message: '请输入毛利率保守-鲜食', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率保守-咖茶',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'coffeeTeaProfitKeep',
                        rules: [{ required: true, message: '请输入毛利率保守-咖茶', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率保守-烘焙',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'bakingProfitKeep',
                        rules: [{ required: true, message: '请输入毛利率保守-烘焙', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率保守-生鲜',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'freshProfitKeep',
                        rules: [{ required: true, message: '请输入毛利率保守-生鲜', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '毛利率保守-标品',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'standardProductProfitKeep',
                        rules: [{ required: true, message: '请输入毛利率保守-标品', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '其他附件',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'otherFiles'
                    }
                ]
            }
        }
    ],

    voteInvestmentInfo: [
        {
            groupName: '基本信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '基本信息',
                list: [
                    {
                        span: 2,
                        label: '装修费用',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'decorationCost',
                        rules: [{ required: true, message: '请输入装修费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '设备费用',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'equipmentCost',
                        rules: [{ required: true, message: '请输入设备费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '店招费用',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'entertainCost',
                        rules: [{ required: true, message: '请输入店招费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '其他费用',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'otherCost',
                        rules: [{ required: true, message: '请输入其他费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'enclosure'
                    }
                ]
            }
        },
        {
            groupName: '商品布局信息',
            groupKey: 'a2',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '商品布局信息',
                list: [
                    {
                        span: 2,
                        label: '平面布局图',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传平面布局图', trigger: 'change' }]
                    }
                ]
            }
        }
    ],

    votePlanningInfo: [
        {
            groupName: '基本信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '基本信息',
                list: [
                    {
                        span: 2,
                        label: '规划人数',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'planningPopulation',
                        rules: [{ required: true, message: '请输入规划人数', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'enclosure',
                        rules: [{ required: true, message: '请上传附件', trigger: 'change' }]
                    }
                ]
            }
        }
    ],

    voteItPlanInfo: [
        {
            groupName: '基本信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '基本信息',
                list: [
                    {
                        span: 2,
                        label: 'IT设备投资',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'itEquipmentInvestment',
                        rules: [{ required: true, message: '请输入IT设备投资', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'enclosure',
                        rules: [{ required: true, message: '请上传附件', trigger: 'change' }]
                    }
                ]
            }
        }
    ],

    voteFinancialInfo: [
        {
            groupName: '商品布局信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '商品布局信息',
                list: [
                    {
                        span: 2,
                        label: '平面布局图',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传平面布局图', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: '项目投资规划信息',
            groupKey: 'a2',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '项目投资规划信息',
                list: [
                    {
                        span: 2,
                        label: '装修费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'decorationCost',
                        rules: [{ required: true, message: '请输入装修费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '设备费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'equipmentCost',
                        rules: [{ required: true, message: '请输入设备费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '店招费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'entertainCost',
                        rules: [{ required: true, message: '请输入店招费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '其他费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'otherCost',
                        rules: [{ required: true, message: '请输入其他费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'file',
                        placeholder: '请上传',
                        disabled: true,
                        name: 'investmentEnclosure',
                        rules: [{ required: true, message: '请上传附件', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: '运营规划信息',
            groupKey: 'a3',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '运营规划信息',
                list: [
                    {
                        span: 2,
                        label: '规划费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'operationCost',
                        rules: [{ required: true, message: '请输入规划费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'operationEnclosure',
                        rules: [{ required: true, message: '请上传附件', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: 'IT规划信息',
            groupKey: 'a4',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: 'IT规划信息',
                list: [
                    {
                        span: 2,
                        label: '规划费用',
                        type: 'number',
                        disabled: true,
                        placeholder: '请输入',
                        name: 'itCost',
                        rules: [{ required: true, message: '请输入规划费用', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '附件',
                        type: 'itEnclosure',
                        placeholder: '请上传',
                        name: 'itEnclosure	',
                        rules: [{ required: true, message: '请上传附件', trigger: 'change' }]
                    }
                ]
            }
        },
        {
            groupName: '财务信息',
            groupKey: 'a5',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '财务信息',
                list: [
                    {
                        span: 2,
                        label: '总投资',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'totalInvestment',
                        rules: [{ required: true, message: '请输入总投资', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '保本日商',
                        type: 'number',
                        placeholder: '请输入',
                        name: 'japaneseBusinessGuarantee',
                        rules: [{ required: true, message: '请输入保本日商', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '财务测算结果',
                        type: 'file',
                        placeholder: '请上传',
                        name: 'financialCalculationResults',
                        rules: [{ required: true, message: '请上传财务测算结果', trigger: 'change' }]
                    }
                ]
            }
        }
    ],

    effectDesign: [
        {
            groupName: '图纸信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '图纸信息',
                list: [
                    {
                        span: 2,
                        label: '实景效果图',
                        type: 'file',
                        placeholder: '请上传',
                        limit: 2,
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传实景效果图', trigger: 'change' }]
                    },
                    {
                        span: 2,
                        label: '室内效果图',
                        type: 'file',
                        placeholder: '请上传',
                        limit: 2,
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传室内效果图', trigger: 'change' }]
                    }
                ]
            }
        }
    ],

    constructDesign: [
        {
            groupName: '图纸信息',
            groupKey: 'a1',
            baseInfo: {
                labelWidth: 200,
                cols: 4,
                groupName: '图纸信息',
                list: [
                    {
                        span: 2,
                        label: '施工图',
                        type: 'file',
                        placeholder: '请上传',
                        limit: 2,
                        name: 'layoutPlan',
                        rules: [{ required: true, message: '请上传施工图', trigger: 'change' }]
                    }
                ]
            }
        }
    ]
};
