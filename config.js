module.exports = {
    baseDir: process.env.baseDir || './dist',
    defaultMime: 'application/octet-stream',
    port: 8000,
    index: '',
    notFound: '/', // 出错时，返回首页。或者 404 提示
}
