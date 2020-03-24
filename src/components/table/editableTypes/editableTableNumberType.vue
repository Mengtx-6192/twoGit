<template>
    <el-input-number
        :max="getConfig('max')"
        :min="getConfig('min')"
        v-model="model"
        @change="change"
        style="width:100%"
        size="mini"
    ></el-input-number>
</template>
<script>
export default {
    props: ['value', 'row', 'column', 'getConfig'],

    data: function() {
        return {
            model: this.value === undefined ? null : this.value
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
