<template>
    <lit-section
        :section-url="remoteSelectUrl"
        :lit-options="selectOptions"
        :lit-events="selectEvents"
    />
</template>
<script>
export default {
    props: ['value', 'row', 'column', 'getConfig'],

    data: function() {
        let value, valueDisplay;
        if (typeof this.row[this.column.key] === 'object') {
            value = this.row[this.column.key].value;
            valueDisplay = this.row[this.column.key].valueDisplay;
        } else {
            value = this.row[this.column.key];
            valueDisplay = undefined;
        }
        return {
            model: this.value,
            remoteSelectUrl:
                'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/fe-components/comp_c1d6f6d6c8b84e29919ec6617f1cbd56/__comp_55cf760159274b62ba432869b522e22d/d195d19f-d2a9-4d88-82da-751d0341b2b1.js',
            selectOptions: {
                value: value,
                valueDisplay: valueDisplay,
                placeholder: this.getConfig('placeholder'),
                remoteMethod: query => {
                    return this.column.remoteMethod(query, this.row);
                }
            },
            selectEvents: {
                'on-change': (value, extend) => {
                    this.$emit('on-change', value, extend);
                }
            }
        };
    },

    watch: {
        value() {
            this.model = this.value;
        }
    }
};
</script>
