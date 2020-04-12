<template>
    <layout-page :menu="menu" :gap="0"></layout-page>
</template>

<script>
export default {
    name: 'layout',
    data() {
        return {
            menu: {
                menuList: [
                    {
                        name: '树',
                        id: '1',
                        icon: 'el-icon-position',
                        url: '/example/tree'
                    },
                    {
                        name: '表格',
                        id: '2',
                        icon: 'el-icon-position',
                        url: '/example/table'
                    },
                    {
                        name: '菜单3',
                        id: '3',
                        icon: 'el-icon-position',
                        children: [
                            {
                                id: '3-1',
                                name: '菜单3-1',
                                img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                                url: '/process/task/noDone'
                            },
                            {
                                id: '3-2',
                                name: '菜单3-2',
                                img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                                url: '/process/task/done'
                            }
                        ]
                    }
                ],
                activeName: '1'
            }
        };
    }
};
</script>
