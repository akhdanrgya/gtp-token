module.exports = function sanitizeDirectoryName(name) {
    return name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "_");
};
