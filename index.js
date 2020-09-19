const fs = require('fs');
const path = require('path');
const http = require('http');

const config = require('./config');
const { getFile } = require('./util');
const { r302, r404, rFile, rDir } = require('./response');

// 启动 http 服务
http.createServer((req, res) => {
    // 根据请求 url，转换为本地磁盘路径
    const url = getFile(req.url);
    let file = path.resolve(__dirname, config.baseDir, url);

    // 文件不存在
    if (!fs.existsSync(file)) {
        if (config.notFound) {
            // 文件不存在时，默认返回根目录
            r302(res, config.notFound);
        } else {
            r404(res);
        }
        return;
    }

    // 本地已经存在的文件
    if (fs.statSync(file).isFile()) {
        rFile(res, file);
        return;
    }

    // 目录时，查找索引文件是否存在, nginx: index index.html index.php
    if (typeof config.indexFiles === 'string') {
        config.indexFiles = [config.indexFiles];
    }
    const indexExist = config.indexFiles.find(item => item && fs.existsSync(path.join(file, item)));
    if (indexExist) {
        rFile(res, path.join(file, indexExist));
        return;
    }

    // 是否显示目录索引, nginx: autoindex on
    if (!config.listDir) {
        r404(res);
        return;
    }
    // 遍历本地目录并输出
    rDir(res, url, file);

}).listen(config.port, function () {
    console.log(`Serving http://localhost:${config.port}`);
});
