<template>
    <layout-page :menu="menu" :gap="'0'"></layout-page>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('user');
export default {
    name: 'layout',
    computed: {
        ...mapGetters(['childrenMenu']),
        menu() {
            return {
                menuList: this.childrenMenu,
                activeName: '1'
            };
        }
    }
};
</script>
