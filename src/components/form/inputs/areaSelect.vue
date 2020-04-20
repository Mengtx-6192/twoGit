<template>
    <div class="area-select">
        <template v-if="show">
            <el-select
                v-model="res.province"
                filterable
                clearable
                class="select"
                key="pro"
                :disabled="disabled"
                @change="change($event, 1)"
                placeholder="选择省份"
            >
                <el-option v-for="item in provinceList" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
            </el-select>
            <el-select
                v-model="res.city"
                filterable
                clearable
                :disabled="disabled"
                key="city"
                class="select"
                @change="change($event, 2)"
                no-data-text="请先选择省份"
                placeholder="选择城市"
            >
                <el-option v-for="item in cityList" :key="item.id" :label="item.title" :value="item.id"> </el-option>
            </el-select>
            <el-select
                v-model="res.area"
                filterable
                clearable
                :disabled="disabled"
                key="area"
                class="select"
                @change="change($event, 3)"
                no-data-text="请先选择城市"
                placeholder="选择区县"
            >
                <el-option v-for="item in areaList" :key="item.id" :label="item.title" :value="item.id"> </el-option>
            </el-select>
        </template>

        <div v-else class="loading-mask">
            <tempalte v-if="isError"> <i class="el-icon-warning"></i> <span>发生了错误, 请联系管理员</span> </tempalte>
            <template v-else> <i class="el-icon-loading"></i><span>正在加载省市区数据,请稍后...</span> </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'areaSelect',
    props: ['value', 'disabled'],
    data() {
        return {
            isError: false,
            show: false,
            provinceList: [],
            cityList: [],
            areaList: [],
            res: this.value || {
                province: '',
                city: '',
                area: ''
            }
        };
    },
    created() {
        if (window.$areaCodes) {
            this.setProvinceList();
        } else if (localStorage.getItem('$areaCodes')) {
            window.$areaCodes = JSON.parse(localStorage.getItem('$areaCodes'));
            this.setProvinceList();
        } else {
            this.$api.global
                .areaCode()
                .then(res => {
                    const codes = res[0].children;
                    localStorage.setItem('$areaCodes', JSON.stringify(codes));
                    window.$areaCodes = codes;
                    this.setProvinceList();
                })
                .catch(e => {
                    this.isError = true;
                    this.$message.error('无法加载省市区数据,请联系管理员');
                });
        }
    },
    watch: {
        res: {
            deep: true,
            handler(nv, ov) {
                this.$emit('input', nv);
            }
        }
    },
    methods: {
        setProvinceList() {
            this.show = true;
            this.codes = window.$areaCodes;
            this.provinceList = this.codes.map(it => {
                return {
                    title: it.title,
                    id: it.id
                };
            });
            this.assign();
        },
        change(code, level) {
            if (level === 1) {
                if (code) {
                    this.cityList = this.codes.find(it => it.id === code).children;
                } else {
                    this.cityList = [];
                    this.res.city = '';
                }
            }

            if (level === 2) {
                if (code) {
                    this.areaList = this.cityList.find(it => it.id === code).children;
                } else {
                    this.areaList = [];
                    this.res.area = '';
                }
            }
        },
        assign() {
            const cityId = this.value && this.value.city + '';
            if (cityId) {
                let hitNode = null,
                    parent = null;
                for (let i = 0; i < this.codes.length; i++) {
                    const provinceItem = this.codes[i];
                    if (provinceItem.children) {
                        for (let j = 0; j < provinceItem.children.length; j++) {
                            const cityItem = provinceItem.children[j];
                            if (cityItem.id === cityId) {
                                hitNode = cityItem;
                                break;
                            }
                        }
                    }
                    if (hitNode) {
                        parent = provinceItem;
                        break;
                    }
                }
                if (hitNode) {
                    this.res.province = hitNode.parentId;
                    this.cityList = parent.children;
                    this.areaList = hitNode.children;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.area-select {
    min-height: 40px;
    /*display: flex;*/
    .select + .select {
        margin-left: 10px;
    }
    .loading-mask {
        padding-left: 30px;
        .el-icon-loading,
        .el-icon-warning {
            margin-right: 10px;
        }
    }
}
</style>
