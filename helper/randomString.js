const randomInt = require("./randomInt");

module.exports = function generateRandomString(length) {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    return Array.from(
        { length },
        () => characters[randomInt(0, characters.length - 1)]
    ).join("");
};
