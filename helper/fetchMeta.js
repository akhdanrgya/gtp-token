const { exec } = require("child_process");

module.exports = async function fetchMeta(version, proxy) {
    let commandCURL = "";
    let proxyConfig = proxy ? `-x socks5://${proxy} ` : "";

    commandCURL = `curl ${proxyConfig}"https://www.growtopia2.com/growtopia/server_data.php" -H "User-Agent: UbiServices_SDK_2019.Release.27_PC64_unicode_static" -H "Content-Type: application/x-www-form-urlencoded" --data "version=${version}&protocol=191&platform=0"`;

    try {
        const stdout = await new Promise((resolve, reject) => {
            exec(commandCURL, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
        const match = stdout.match(/^meta\|(.+)$/m);
        return match ? match[1] : null;
    } catch (error) {
        return null;
    }
};
