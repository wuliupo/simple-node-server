const fs = require('fs');
const path = require('path');
const http = require('http');

const mime = require('./mime');
const config = require('./config');
const { getFile, getMime } = require('./util');
const { r302, r404, r500 } = require('./response');

http.createServer((req, res) => {
    const url = getFile(req.url);
    let file = path.resolve(__dirname, config.baseDir, url);
    if (!fs.existsSync(file)) {
        if (config.notFound) {
            // 文件不存在时，默认返回根目录
            r302(res, config.notFound);
        } else {
            r404(res);
        }
    } else if (fs.statSync(file).isFile()) {
        // 设置请求的返回头 type
        res.setHeader('Content-Type', mime[getMime(url)] || config.defaultMime);
        res.setTimeout(5000);
        // 建立流对象，读文件
        fs.createReadStream(file).on('error', function () {
            r500(res);
        }).pipe(res);
    } else {
        // 请求的目录
        res.setHeader('Content-Type', mime.html);
        const folder = url ? `/${url}/` : '/';
        const title = `Simple Node Server: ${url}`;
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
        files = fs.readdirSync(file, {});
        rst += files.map((item) => `<li><a href="${folder}${item}">${item}</a></li>`).join('\n');
        rst += '\n</ol>';
        res.end(rst);
    }
}).listen(config.port, function () {
    console.log(`Serving http://localhost:${config.port}`);
});
