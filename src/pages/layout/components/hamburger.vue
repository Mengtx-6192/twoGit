<template>
    <div class="hamburger-wrap" v-if="currentMenus.children" @click="toggleSideBar">
        <i v-if="sideStatus" class="hamburger el-icon-s-fold"></i>
        <i v-else class="hamburger el-icon-s-unfold"></i>
    </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
export default {
    name: 'hamburger',
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('log', ['sideStatus']),
        ...mapGetters('log', ['currentMenus'])
    },
    created() {},
    methods: {
        ...mapMutations('log', ['toggleSideBar'])
    }
};
</script>

<style lang="scss" scoped>
.hamburger-wrap {
    text-align: center;
    background-color: var(--theme-color);

    .hamburger {
        color: #fff;
        font-size: 24px;
        margin: 6px 0 0 20px;
        cursor: pointer;
    }
}
</style>
