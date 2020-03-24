<template>
    <el-date-picker
        v-model="model"
        :type="getConfig('type')"
        :placeholder="getConfig('placeholder')"
        :clearable="getConfig('clearable')"
        :format="getConfig('format')"
        transfer
        @change="change"
        size="mini"
        style="width:100%;"
    ></el-date-picker>
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
