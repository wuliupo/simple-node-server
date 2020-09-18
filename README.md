# 用 Node.js 写一个 web 服务器

## 主要思路

a. node.js 底层 api：const fs = require('fs');  http://nodejs.cn/api/fs.html 根据请求分两种：文件 + 目录
b. http api: http://nodejs.cn/api/http.html#http_class_http_server

## 功能点

1. 文件内容查看
2. 目录浏览
3. 缓存（文件修改日期等）
4. 前后端分离（API + 页面）
5. 安全策略（磁盘文件权限、网页访问权限）
6. 中文乱码
7. 默认索引（可配置）
8. 服务器端渲染（模块渲染）
9. 性能（文件比较大）
10. 跨域（对外提供 API，jsonp等）
11. 参数配置（cli）
