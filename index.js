const fs = require('fs');
const path = require('path');
const http = require('http');

const mime = require('./mime');

const baseDir = './dist';

http.createServer((req, res) => {
    const url = req.url.replace(/^\/|\/$/g, '').replace(/\/+/g, '/').replace(/\.+/g, '.');
    let file = path.resolve(__dirname, baseDir, url);
    if (!fs.existsSync(file)) { // 文件不存在时，默认返回根目录
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (fs.statSync(file).isFile()) {    // 请求的是文件
        let suffix = file.replace(/.*\./, '').toLowerCase();
        // 设置请求的返回头 type
        res.setHeader('Content-Type', mime[suffix] || mime.txt);
        // 格式必须为 binary 否则会出错
        const content = fs.readFileSync(file, 'binary');
        res.writeHead(200, 'Ok');
        res.write(content, 'binary'); // 格式必须为 binary，否则会出错
        res.end();
    } else {    // 请求的目录
        res.setHeader('Content-Type', mime.html);
        const folder = url ? `/${url}/` : '/';
        let rst = `<h1>Simple Node Server: ${url}</h1><ol>`;

        // 子目录时，可以返回上一级
        if (url) {
            rst += `<li><a href="${folder}..">..</a></li>`;
        }

        // 遍历所有子目录，并输出出来
        files = fs.readdirSync(file, {});
        rst += files.map(item => `<li><a href="${folder}${item}">${item}</a></li>`).join('');
        rst += '</ol>';
        res.end(rst);
    }
}).listen(8000, function() {
    console.log('Serving on localhost:8000');
});
