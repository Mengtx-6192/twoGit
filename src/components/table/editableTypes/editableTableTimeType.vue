<template>
    <el-time-select
        v-model="model"
        :type="getConfig('type')"
        :placeholder="getConfig('placeholder')"
        :clearable="getConfig('clearable')"
        :value-format="getConfig('format')"
        size="mini"
        @change="change"
        style="width:100%;"
    ></el-time-select>
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
