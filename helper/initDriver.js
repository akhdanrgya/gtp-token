const { Builder, Capabilities } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const fs = require("fs");
module.exports = async function initializeDriver(
    directoryEdge,
    directoryData,
    directoryCache,
    proxy,
    userAgent
) {
    try {
        if (!fs.existsSync(directoryData)) {
            fs.mkdirSync(directoryData, { recursive: true });
        }
        if (!fs.existsSync(directoryCache)) {
            fs.mkdirSync(directoryCache, { recursive: true });
        }

        let options = new edge.Options().addArguments(
            "--disable-blink-features=AutomationControlled",
            "--disable-infobars",
            "--disable-dev-shm-usage",
            "--no-sandbox",
            `--user-data-dir=${directoryData}`,
            `--disk-cache-dir=${directoryCache}`,
            "--log-level=3",
            "--disable-images",
            "--disable-css",
            "--disable-notifications",
            "--disable-popup-blocking",
            "--disable-features",
            "--disable-media-router",
            "--disable-hang-monitor",
            "--disable-extensions",
            "--disable-plugins",
            "--disable-features=IsolateOrigins,site-per-process,DevToolsExperimentalUI,msEdgeDevTools,VizDisplayCompositor",
            "--disable-software-rasterizer",
            "--disable-client-side-phishing-detection",
            "--disable-default-apps",
            "--disable-translate",
            "--disable-web-security",
            "--disable-devtools",
            "--no-default-browser-check",
            "--silent",
            "profile-directory=Default",
            "--start-maximized",
            `--user-agent=${userAgent}`,
            "--lang=en-US",
            "--remote-debugging-port=0",
            "--disable-auto-maximize-for-tests",
            "--disable-component-update",
            "--disable-component-extensions-with-background-pages",
            "--disable-lazy-loading",
            "--disable-nacl",
            "--disable-print-preview",
            "--disable-prompt-on-repost",
            "--disable-stack-profiler",
            "--no-experiments",
            "--no-service-autorun",
            "--disable-background-networking",
            "--disable-crashpad-for-testing",
            "--ignore-ssl-errors=yes",
            "--ignore-certificate-errors",
            "--disable-sync"
            // "--headless"
        );
        options.setUserPreferences({
            "intl.accept_languages": "en,en_US",
        });
        if (proxy) options.addArguments(`--proxy-server=socks5://${proxy}`);

        options.excludeSwitches(
            "enable-logging",
            "enable-automation",
            "load-extension",
            "en-us"
        );

        let capabilities = Capabilities.edge().set("ms:edgeOptions", options);

        return (driver = await new Builder()
            .forBrowser("MicrosoftEdge")
            .withCapabilities(capabilities)
            .setEdgeOptions(options)
            .setEdgeService(new edge.ServiceBuilder(directoryEdge))
            .build());
    } catch (error) {
        throw error;
    }
};
