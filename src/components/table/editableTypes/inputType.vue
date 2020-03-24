<template>
    <el-input
        size="mini"
        v-model="model"
        @change="change"
        clearable
        :placeholder="getConfig('placeholder')"
        ref="el-input"
    />
</template>
<script>
export default {
    props: ['value', 'row', 'column', 'getConfig'],

    data: function() {
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
    }
};
</script>
