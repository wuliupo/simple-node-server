module.exports = {
    baseDir: process.env.baseDir || './dist',
    defaultMime: 'application/octet-stream',
    port: 8000,
    indexFiles: ['index.html'],
    notFound: '/', // 出错时，返回首页。或者 404 提示
}
