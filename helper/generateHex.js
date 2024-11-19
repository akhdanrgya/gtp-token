const randomInt = require("./randomInt");

module.exports = function generateRandomHex(length) {
    const hexCharacters = "0123456789ABCDEF";
    return Array.from(
        { length },
        () => hexCharacters[randomInt(0, hexCharacters.length - 1)]
    ).join("");
};
