<template>
    <div class="button-list-section" :style="style">
        <template v-for="(item, i) in btnList">
            <el-button
                v-if="setShow(item)"
                :key="i"
                :type="item.type || 'primary'"
                :size="item.size || 'medium'"
                :icon="item.icon"
                v-html="item.name"
                :disabled="disabled || item.disabled"
                @click="clickBtn(item.onClick)"
            ></el-button>
        </template>
    </div>
</template>

<script>
/**
 *  btnList: {
 *    属性参照element
 *  }
 *
 *  event： 事件名来自与 传入的参数名onClick
 */
export default {
    name: 'buttonList',
    props: {
        show: {
            type: String,
            default: ''
        },
        btnList: {
            type: Array,
            default: () => []
        },
        align: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        setShow() {
            return item => {
                if (!this.show || !item.show) {
                    return true;
                }
                return item.show === this.show;
            };
        },
        style() {
            if (!this.align) {
                return;
            }
            return {
                textAlign: this.align
            };
        }
    },
    methods: {
        clickBtn(name) {
            this.$emit('btn-event', name);
            this.$emit('btn-all', name);
        }
    }
};
</script>

<style scoped>
.button-list-section {
    text-align: left;
}
</style>
