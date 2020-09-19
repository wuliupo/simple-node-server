const mime = require('./mime');

module.exports.r404 = function(res) {
    res.writeHead(404, { 'Content-Type': mime.html });
    res.end('<h1>404 Not Found!</h1>');
}

module.exports.r500 = function(res) {
    res.writeHead(500, { 'Content-Type': mime.html });
    res.end('<h1>500 Server Error!</h1>');
}

module.exports.r302 = function(res, url) {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
}
