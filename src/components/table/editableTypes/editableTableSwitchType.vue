<template>
    <el-switch
        v-model="model"
        @change="change"
        ref="switch"
        :active-value="column.activeValue"
        :inactive-value="column.inactiveValue"
    ></el-switch>
</template>
<script>
export default {
    props: ['value', 'row', 'column', 'getConfig'],

    data() {
        return {
            model: this.value
        };
    },

    watch: {
        value() {
            this.model = this.value;
        }
    },

    methods: {
        change() {
            this.$emit('on-change', this.model);
        }
    },

    destroyed() {}
};
</script>
