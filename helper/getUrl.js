const cheerio = require("cheerio");
const { exec } = require("child_process");

module.exports = async function getUrl(body, userAgent, proxy) {
    const proxyConfig = proxy ? `-x socks5://${proxy} ` : "";
    const commandCURL = `curl -k -X POST ${proxyConfig}https://login.growtopiagame.com/player/login/dashboard \
-H "User-Agent: ${userAgent}" \
-H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" \
--compressed \
--data "${body}"`;

    try {
        const stdout = await new Promise((resolve, reject) => {
            exec(
                commandCURL,
                { encoding: "buffer" },
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(stdout);
                    }
                }
            );
        });

        const decodedOutput = stdout.toString("utf8");
        const $ = cheerio.load(decodedOutput);

        const textContent = $(".container .content .text").text();

        if (textContent) {
            throw { link: null, message: textContent };
        }

        const href = $(
            'a[href^="https://login.growtopiagame.com/google/redirect"]'
        ).attr("href");
        return href
            ? { link: href, message: null }
            : { link: null, message: null };
    } catch (error) {
        return { link: null, message: error.message ? error.message : error };
    }
};
