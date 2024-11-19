module.exports = function getRandomName() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    let name = "";
    for (let i = 0; i < length; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
};
