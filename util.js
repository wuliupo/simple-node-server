module.exports.getFile = function (url) {
    return decodeURIComponent(url)
        .replace(/^\/|\/$/g, '')
        .replace(/\/+/g, '/')
        .replace(/\.+/g, '.');
};

module.exports.getMime = function (url) {
    return url.replace(/.*\./, '').toLowerCase();
};
