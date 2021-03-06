const fs = require('fs');
const mime = require('./mime');
const { getMime } = require('./util');
const config = require('./config');

/**
 * 服务器错误
 * @param {*} res
 */
function r500(res) {
    res.writeHead(500, { 'Content-Type': mime.html });
    res.end('<h1>500 Server Error!</h1>');
}

/**
 * 资源不存在
 * @param {*} res
 */
module.exports.r404 = function (res) {
    res.writeHead(404, { 'Content-Type': mime.html });
    res.end('<h1>404 Not Found!</h1>');
};

module.exports.r500 = r500;

/**
 * 页面重定向
 * @param {*} res
 * @param {*} url
 */
module.exports.r302 = function (res, url) {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
};

/**
 * 返回文件内容
 * @param {*} res
 * @param {*} file
 */
module.exports.rFile = function (res, file) {
    // 设置请求的返回头 type
    res.setHeader('Content-Type', mime[getMime(file)] || config.defaultMime || mime.unknown);
    res.setTimeout(5000);
    // 建立流对象，读文件
    fs.createReadStream(file)
        .on('error', function () {
            r500(res);
        })
        .pipe(res);
};

/**
 * 遍历目录并输出
 * @param {*} res
 * @param {*} url
 * @param {*} file
 */
module.exports.rDir = function (res, url, file) {
    // 请求的目录
    res.setHeader('Content-Type', mime.html);
    const folder = url ? `/${url}/` : '/';
    const title = `Simple Node Server: ${folder}`;
    let rst = `<!doctype html>
<html lang="zh-CN">
    <head>
    <meta charset="utf-8"/>
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <ol>`;
    // 子目录时，可以返回上一级
    if (url) {
        rst += `<li><a href="${folder}..">..</a></li>`;
    }
    // 遍历所有子目录，并输出出来
    rst += fs
        .readdirSync(file, {})
        .map((item) => `<li><a href="${folder}${item}">${item}</a></li>`)
        .join('\n');
    rst += '\n</ol>';
    res.end(rst);
};
