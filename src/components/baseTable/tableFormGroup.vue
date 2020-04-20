<template>
    <div class="table-form-group-section">
        <div v-for="(item, i) in list" :key="i">
            <h4 class="title">{{ item.groupName }}</h4>
            <btn-list v-if="item.buttons" :btnList="item.buttons" @btn-event="btnEvent($event, i)"></btn-list>
            <base-table-section :data="item.table" :disabled="isRead" @on-all="tableEvent"></base-table-section>
        </div>
    </div>
</template>

<script>
import baseTableSection from '@/components/baseTable/baseTableSection';
import BtnList from '@/components/buttonList';
export default {
    components: { baseTableSection, BtnList },
    props: {
        configList: {
            type: Array,
            default: () => []
        },
        model: {
            type: Object,
            default: () => {
                return {};
            }
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: []
        };
    },
    watch: {
        configList: {
            handler(val) {
                this.list = val.filter(v => v);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        tableEvent(name, scope) {
            console.log(name, 'tableEvent');

            this.$emit(name, scope);
        },
        btnEvent(name, i) {
            console.log(name, 'btnEvent');

            this.$emit(name, i);
        }
    }
};
</script>

<style scoped lang="scss">
.table-form-group-section {
    .title {
        margin: 20px 0 0;
        text-align: left;
        padding-left: 20px;
        border-left: 3px solid #3399ff;
    }
    .button-list-section {
        text-align: left;
        margin: 10px;
    }
}
</style>
