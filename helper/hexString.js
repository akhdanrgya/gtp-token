module.exports = function hexString(value) {
    return value.toString(16).padStart(2, "0").toUpperCase();
};
