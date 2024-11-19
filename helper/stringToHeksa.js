module.exports = function stringToHeksaNumber(str) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(4, "0");
    }
    return parseInt(hex, 16);
};
