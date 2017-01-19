## mutu-cli's vue.js project structure

1.项目简介

* 包管理工具： yarn/npm
* 打包工具： webpack、babel
* 基础框架： vue
* 路由管理工具： vue-router
* 状态管理工具： vuex
* 其他开发工具： G2, vscode

2.安装所需依赖

```
$ yarn
```

3.运行开发环境

* 基于node的本地开发服务
* api接口均由node配置middleware使用线上接口

```
$ yarn run release
$ yarn start
```

4.项目结构

App

* assets        开发相关
    * components    定义可复用组件
    * container     定义容器组件，直接连接store状态树
    * resources     所需图片、字体等资源
    * router        路由结构
    * store         状态树，按模块归类action、mutation、module
    * style         样式相关
    * utils         工具函数
    * app.js        承载页启动js文件
* constants     定义常量
* dist          webpack编译后文件
* node_modules  项目所需依赖
* server        node服务启动文件
* template      承载页模板
* package.json
* webpack.base.config.js    基础配置，使用webpack-merge合并到开发/生产配置
* webpack.config.js         开发配置
* webpack.release.config.js 生产配置

5.开发思路

* 数据状态由状态管理工具管理
	* action提交原始数据
	* mutation修改数据状态并修改状态树
	* 封装request action执行异步操作并监控状态
	* [vuex文档](http://vuex.vuejs.org/zh-cn/)
* 视图状态由容器组件内部管理
	* 单页应用
	* 页面切换通过vue-router api控制
	* 通过node redirect实现html5 history模式
	* 项目路由结构
	* [vue-router文档](https://router.vuejs.org/zh-cn/)

6.其它

* 使用vue jsx语法需安装babel-plugin-transform-vue-jsx
* 与react jsx有一些小小的不同
* babel配置

```babel
	{
	    "presets": ["es2015", "stage-2"],
	    "comments": false,
	    "plugins": ["transform-vue-jsx"],
	}
```

* [https://github.com/vuejs/babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)
