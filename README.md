# 用 Node.js 写一个 web 服务器

## 主要思路

a. node.js 底层 api：const fs = require('fs');  http://nodejs.cn/api/fs.html 根据请求分两种：文件 + 目录
b. http api: http://nodejs.cn/api/http.html#http_class_http_server

## [配置项](./config.js)

## 功能点

1. [x] 文件内容查看
1. [x] 目录浏览
1. [ ] 缓存（文件修改日期等）
1. [ ] 前后端分离（API + 页面）
1. [ ] 安全策略（磁盘文件权限、网页访问权限）
1. [x] 中文乱码
1. [x] 默认索引（可配置）
1. [ ] 服务器端渲染（模块渲染）
1. [ ] 性能（文件比较大）
1. [ ] 跨域（对外提供 API，jsonp等）
1. [ ] 参数配置（cli）
1. [ ] 本地调试
1. [ ] 访问日志
1. [ ] 代理第三方服务 proxy
