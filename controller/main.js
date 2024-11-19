const final_process = require("./final_process/0_main");
const initDriver = require("../helper/initDriver");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
const sanitizeDirectoryName = require("../helper/sanitizeDirectoryName");
const { until, By } = require("selenium-webdriver");
const setProxy = require("../helper/createSocksLocal");
const validateProxyFormat = require("../helper/validateProxyFormat");
const randomString = require("../helper/randomString");
const randomNumber = require("../helper/randomNumber");
const generateRid = require("../helper/generateRid");
const generateMac = require("../helper/generateMac");
const generateHex = require("../helper/generateHex");
const fetchMeta = require("../helper/fetchMeta");
const percentEncoding = require("../helper/percentEncoding");
const getUrl = require("../helper/getUrl");
const stringToHeksa = require("../helper/stringToHeksa");

module.exports = async function (req, res) {
    const { email, password, mailRecovery, proxy, Mac, version } = req.body;

    const directoryEdge = path.join(__dirname, "..", "driver", os.platform());
    const salt = stringToHeksa(email);
    const directoryData = path.join(
        __dirname,
        "..",
        "storage",
        "data",
        `${sanitizeDirectoryName(
            crypto
                .createHash("md5")
                .update(
                    `${os.platform()}_${sanitizeDirectoryName(
                        email + "_" + password
                    )}` + salt
                )
                .digest("hex")
                .substring(0, 12)
        )}`
    );
    const directoryCache = path.join(
        __dirname,
        "..",
        "storage",
        "cache",
        `${sanitizeDirectoryName(
            crypto
                .createHash("md5")
                .update(
                    `${os.platform()}_${sanitizeDirectoryName(
                        email + "_" + password
                    )}` + salt
                )
                .digest("hex")
                .substring(0, 12)
        )}`
    );
    const userAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0";

    let driver;
    let server;
    let localPort;
    try {
        if ((!email, !password, !version)) {
            throw { message: "invalid format body" };
        }
        if (!validateProxyFormat(proxy)) {
            throw { message: "proxy only support IP:PORT:USER:NAME" };
        }
        const proxyResult = await setProxy(proxy ? proxy : null);
        server = proxyResult.server;
        localPort = proxyResult.localPort;

        const randomName = randomString(8);
        const hash2 = randomNumber(9);
        const meta = await fetchMeta(
            version,
            localPort ? `127.0.0.1:${localPort}` : null
        );
        const rid = generateRid();
        const hash = randomNumber(10);
        const mac = Mac ? Mac : generateMac();
        const wk = generateHex(32);

        if (!meta) throw { message: "http block/proxy error" };
        const bodyDataGetUrl = percentEncoding(
            randomName,
            version,
            hash2,
            meta,
            rid,
            hash,
            mac,
            wk
        );
        const urlGrowtopia = await getUrl(
            bodyDataGetUrl,
            userAgent,
            localPort ? `127.0.0.1:${localPort}` : null
        );

        driver = await initDriver(
            directoryEdge,
            directoryData,
            directoryCache,
            localPort ? `127.0.0.1:${localPort}` : null,
            userAgent
        );
        await driver.get(urlGrowtopia.link);

        const data = await final_process(
            driver,
            until,
            By,
            email,
            password,
            mailRecovery
        );
        if (data._1) {
            return res.json({
                token: data._1,
            });
        } else if (data._2) {
            throw { message: "captcha" };
        } else if (data._3) {
            throw { message: "samting error" };
        } else if (data._4) {
            throw { message: "disabel account" };
        } else if (data._5) {
            throw { message: "tomany ppl" };
        } else if (data._6) {
            throw { message: "proxy issue" };
        }
        throw { message: "unknow error" };
    } catch (error) {
        console.log(error);
        res.status(400).json({
            token: null,
            message: error.message ? error.message : error,
        });
    } finally {
        if (server) {
            await server.close(() => {});
        }
        if (driver) {
            await driver.quit();
        }
    }
};
