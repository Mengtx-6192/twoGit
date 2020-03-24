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
                        url: '/example/tree.html'
                    },
                    {
                        name: '菜单2',
                        id: '2',
                        icon: 'el-icon-position',
                        children: [
                            {
                                id: '2-1',
                                name: '菜单2-1',
                                img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                                url: '/process/task/noDone.html'
                            },
                            {
                                id: '2-2',
                                name: '菜单2-2',
                                img: 'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/datamodel.png',
                                url: '/process/task/done.html'
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
