const randomInt = require("./randomInt");
const hexString = require("./hexString");

module.exports = function generateMac() {
    const mac = Array.from({ length: 6 }, () => hexString(randomInt(0, 255)));
    return mac.join(":");
};
