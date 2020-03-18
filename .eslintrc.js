module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/prettier'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        '_': true
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4, // tab缩进大小,默认为4
                useTabs: false, // 使用tab缩进，默认false
                semi: true, // 使用分号, 默认true
                singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
                trailingComma: 'none', // 行尾逗号,默认none,可选 none|es5|all
                bracketSpacing: true, // 对象中的空格 默认true
                printWidth: 120,
                arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
                jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
            }
        ],
        'no-sparse-arrays': 2,// 禁止稀疏数组， [1,,2]
        'no-unreachable': 2,// 不能有无法执行的代码
        'no-var': 0,// 禁用var，用let和const代替
        'default-case': 2,// switch语句最后必须有default
        'eqeqeq': 2, // 必须使用全等
        'spaced-comment': 2, // 注释风格要不要有空格什么的
        'no-unused-vars': [0, {'vars': 'all', 'args': 'after-used'}], // 不能有声明后未被使用的变量或参数
        'curly': [2, 'all'], // 必须使用 if(){} 中的{}
        'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
        'no-extra-parens': 0,// 禁止非必要的括号
        'no-extra-semi': 2,// 禁止多余的冒号
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
        'no-irregular-whitespace': 2,// 不能有不规则的空格
        'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
        'space-infix-ops': 2 // 中缀操作符周围要不要有空格
    }
};
