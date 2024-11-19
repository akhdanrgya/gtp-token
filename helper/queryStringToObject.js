module.exports = function queryStringToObject(url) {
    const queryString = url.split("?")[1];
    if (!queryString) return {};

    const params = new URLSearchParams(queryString);
    const obj = {};

    params.forEach((value, key) => {
        obj[key] = value;
    });

    return obj;
};
