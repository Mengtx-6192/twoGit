<template>
    <div class="voteM-detail-info padding20">
        <i-form-group ref="forms" :model="model" :isRead="!!isRead" :configList="formGroupOptions"> </i-form-group>
    </div>
</template>

<script>
import iFormGroup from '@/components/form/iFormGroup';
import options from './options';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('voteM');
export default {
    name: 'voteMInfo',
    components: {
        iFormGroup
    },
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters(['voteDetail']),
        isRead() {
            return this.$route.query.isRead;
        },
        formGroupOptions() {
            return options[this.type];
        }
    },
    data() {
        return {
            model: {}
        };
    },
    mounted() {
        this.model = this.voteDetail[this.type];
    },
    methods: {
        getModel() {
            return this.$refs.forms.getModel();
        },
        setModel(params) {
            return (this.model = params);
        }
    }
};
</script>

<style scoped lang="scss">
.voteM-detail-info {
}
</style>
