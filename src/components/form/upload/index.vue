<template>
    <div class="custom-upload-section">
        <el-upload
            :class="{ hide: uploadHide }"
            action="https://jsonplaceholder.typicode.com/posts/"
            :disabled="disabled"
            :limit="limit > 0 ? limit : 1"
            :multiple="multiple"
            :data="params"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
        >
            <div>
                <i class="el-icon-plus"></i>
                <slot name="word"></slot>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        params: {
            type: Object,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number
        }
    },
    data() {
        return {
            img: '',
            val: '',
            uploadHide: false,
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        handleSuccess(response, file, fileList) {
            if (fileList.length >= (this.limit || 0)) {
                this.uploadHide = true;
            }
            // this.value = file.url;
            this.$emit('on-change', file.url);
        },
        handleRemove(file, fileList) {
            this.uploadHide = false;
            this.$emit('on-change', '');
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>
<style scoped lang="scss">
.custom-upload-section {
    /deep/ .el-upload,
    /deep/ .el-upload-list li {
        line-height: 100px;
        width: 100px;
        height: 100px;
    }
    /deep/ .el-icon-check {
        position: absolute;
        left: 15px;
    }
    .hide {
        /deep/ .el-upload--picture-card {
            display: none;
        }
    }
}
</style>
