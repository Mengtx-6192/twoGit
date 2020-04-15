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
