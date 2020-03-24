/**
 * totalRoot default = datas>totalSize
 * pageSizeRoot default = datas>pageSize
 * pageNumberRoot default = datas>pageNumber
 * root default = datas>rows
 */

import Vue from 'vue';

var defaultConfig = {
    totalRoot: 'result>totalSize',
    pageSizeName: '_pageSize',
    pageNumberName: '_pageNo',
    root: 'result>result'
};

function adapter(options) {
    options = _.assign({}, defaultConfig, options);
    this.load = (pageSize, pageNumber, params, pageable, headers) => {
        var config = {};

        if (pageable) {
            config[options.pageSizeName] = pageSize;
            config[options.pageNumberName] = pageNumber;
        }

        headers = _.assign(headers, {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        });

        let def = null;

        let method = options.method ? options.method : 'get';
        let reqParams = '';
        if (method === 'get') {
            reqParams = convertToGetParams(options.url, _.assign(config, params));
        } else {
            reqParams = convertParams(params, headers);
        }

        if (method === 'get') {
            def = fetch(options.url, {
                method: options.method,
                body: reqParams,
                // params: _.assign(config, params),
                headers: headers
            }).then(function(res) {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return Promise.reject(res.json());
                }
            });
        } else {
            def = fetch(options.url, {
                method: options.method,
                body: JSON.stringify(_.assign(config, params)),
                // params: _.assign(config, params),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    ...headers
                }
            }).then(function(res) {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return Promise.reject(res.json());
                }
            });
        }

        return def.then(res => {
            var result = {
                total:
                    options.totalRoot.indexOf('>') !== -1
                        ? pickData(res, options.totalRoot)
                        : _.get(res, options.totalRoot),
                list:
                    (options.root.indexOf('>') !== -1
                        ? pickData(res, options.root)
                        : _.get(res, options.root)) || [],
                pageSize: pageSize,
                pageNumber: pageNumber,
                original: res
            };

            return result;
        });
    };
}

function pickData(data, root) {
    return _.get(data, root.replace(/>/g, '.'));
    /* var tempValue = data
    var rootArray = root.split('>')
    rootArray.forEach(function (item) {
        if (!tempValue || tempValue[item] === undefined) {
            return false
        }
        tempValue = tempValue[item]
    })
    return tempValue */
}

function convertToGetParams(url, data) {
    if (typeof data === 'undefined' || data == null || typeof data !== 'object') {
        return url;
    }
    url += url.indexOf('?') != -1 ? '' : '?';
    for (var k in data) {
        url +=
            (url.indexOf('=') != -1 ? '&' : '') +
            k +
            '=' +
            (data[k] === undefined || data[k] === null ? '' : encodeURIComponent(data[k]));
    }
    return url;
}

function convertParams(json, headers) {
    if (headers['Content-Type'] && headers['Content-Type'].indexOf('x-www-form-urlencoded') >= 0) {
        return Object.keys(json)
            .map(function(k) {
                return (
                    encodeURIComponent(k) +
                    '=' +
                    encodeURIComponent(
                        typeof json[k] === 'object' ? JSON.stringify(json[k]) : json[k]
                    )
                );
            })
            .join('&');
    } else {
        return JSON.stringify(json);
    }
}

export default adapter;
