module.exports = function validateProxyFormat(proxy) {
    const regex = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}:[a-zA-Z0-9]+:[a-zA-Z0-9]+$/;
    return regex.test(proxy);
};
