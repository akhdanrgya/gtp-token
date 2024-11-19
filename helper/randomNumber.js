const randomInt = require("./randomInt");

module.exports = function generateRandomNumber(length) {
    const firstDigit = randomInt(1, 9);
    const otherDigits = Array.from({ length: length - 1 }, () =>
        randomInt(0, 9)
    );
    return [firstDigit, ...otherDigits].join("");
};
