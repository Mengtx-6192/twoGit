<template>
    <el-select
        v-model="model"
        style="width:100%"
        size="mini"
        :filterable="getConfig('filterable')"
        :clearable="getConfig('clearable')"
        :placeholder="getConfig('placeholder')"
        @change="change"
    >
        <el-option
            v-for="item in getConfig('optionsList')"
            :value="item.value"
            :key="item.value"
            :label="item.label"
        ></el-option>
    </el-select>
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
