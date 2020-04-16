// 获取所有码值
import { globalService } from '@/services/global';
const CODES = '$codeCollection';
const DETAIL_CODES = '$detailMap';
function set(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}
function get(key) {
    return JSON.parse(localStorage.getItem(key));
}
function getAllCode() {
    debugger
    return globalService
        .codeList()
        .then(res => {
            const { $codeCollection, $detailMap } = formatData(res.data);
            set(CODES, $codeCollection);
            set(DETAIL_CODES, $detailMap);
            window.$codeCollection = $codeCollection;
            window.$detailMap = $detailMap;
        })
        .catch(e => {});
}
function formatData(arr) {
    const res = [];
    const obj = {};
    const detailMap = {};

    function recursion(arr) {
        arr.forEach(it => {
            const code = it.dictKey;
            detailMap[code] = it.dictValue;
            if (it.children) {
                res.push(it);
                recursion(it.children);
            }
        });
    }

    recursion(arr);
    res.forEach(v => {
        const key = v.dictKey;
        obj[key] = v.children.map(it => {
            const code = it.dictKey;
            detailMap[code] = it.dictValue;
            return {
                label: it.dictValue,
                id: it.dictKey
            };
        });
    });
    return {
        $codeCollection: obj,
        $detailMap: detailMap
    };
}

export function checkCodes(callback) {
    if (window.$codeCollection && window.$detailMap) {
        callback();
    } else {
        const $codeCollection = get(CODES);
        const $detailMap = get(DETAIL_CODES);
        if ($codeCollection && $detailMap) {
            window.$codeCollection = $codeCollection;
            window.$detailMap = $detailMap;
            callback();
        } else {
            getAllCode().then(callback);
        }
    }
}
