/**
 * 应用开关，配置项
 */
module.exports = {
    baseDir: process.env.baseDir || './dist', // 静态资源目录
    defaultMime: 'application/octet-stream', // 默认类型，文件下载的数据流
    port: 8000,
    indexFiles: ['index.html'], // 默认目录下的首页
    listDir: true, // 是否显示目录索引
    notFound: '/', // 出错时，返回首页。或者 404 提示
}
