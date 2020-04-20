<template>
    <div class="null-section">
        <div class="null">
            <img src="https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/storeGo/img/null.png" />
            <div class="tip-text">
                <span>{{ title }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'nullSection',
    props: {
        title: {
            type: String,
            default: '暂无数据'
        }
    }
};
</script>
<style lang="scss">
.null-section {
    width: 100%;

    .null {
        margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -70px;
        left: 50%;
        margin-left: -70px;
        width: 170px;
        text-align: center;

        img {
            width: 120px;
            height: 120px;
        }
    }
    .tip-text {
        color: #ced1df;
    }
}
</style>
