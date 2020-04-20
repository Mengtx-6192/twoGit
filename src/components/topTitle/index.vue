<template>
    <div class="top-title">
        <div>
            <i :class="icon" style="margin-right: 10px;">{{ prjName }}</i>
        </div>
        <el-row class="top-title-button">
            <el-button
                v-for="(item, i) in btnList"
                :key="i"
                :type="item.type || 'primary'"
                :size="item.size || 'medium'"
                :icon="item.icon"
                v-html="item.name"
                :disabled="disabled || item.disabled"
                @click="clickBtn(item.onClick)"
            ></el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'topTitle',
    props: {
        btnList: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '无'
        },
        icon: {
            type: String,
            default: 'el-icon-location'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            prjName: this.title
        };
    },
    methods: {
        clickBtn(name) {
            this.$emit(name);
        }
    }
};
</script>

<style lang="scss" scoped>
.top-title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
    .top-title-button {
        flex: 1;
        text-align: right;
    }
}
</style>
