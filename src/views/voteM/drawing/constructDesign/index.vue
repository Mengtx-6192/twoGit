<template>
    <div class="construct-design">
        <topTitle :title="'商品布局管理'"></topTitle>
        <div class="middleground-content">
            <filter-section :options="filterOptions" @on-search="search"></filter-section>
            <base-table-section ref="table" :data="tableData" @on-check="check" @on-edit="edit"></base-table-section>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>
