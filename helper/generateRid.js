const randomInt = require("./randomInt");
const hexString = require("./hexString");

module.exports = function generateRid() {
    return Array.from({ length: 16 }, () => hexString(randomInt(0, 255))).join(
        ""
    );
};
