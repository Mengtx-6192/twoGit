# base-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

├── public
├── src
├    ├── assets ---静态资源
├    ├    ├── css
├    ├    ├── js
├    ├    ├── images
├    ├    ├── utils --- config.js 全局配置文件
├    ├──  componpents ---全局通用组件 （业务内部组件放在views 业务代码components内）
├    ├──  pages ---框架页面
├    ├── views ---业务页面
├    ├── service —服务端接口定义
├    ├── plugins --- vue第三方插件
├    ├── router — 路由
├    ├── store — vuex定义
└─ └── utils —基础工具

---2020-4-16 todo by wsl--
1、修改 页面布局右边主题的背景色，改成全局设置，不需要在单个页面设置白色
2、获取code 编码 统一放在router => index.js router.beforeEach 里面统一处理 ，去除原先 layout 里面的数据获取
3、菜单获取的后端数据接口调整
4、主题色修改成设定色
5、中英文替换图表


---2020-4-17 todo by wsl--
1、表格样式调整