module.exports = async function checkCaptcha(driver, until, By) {
    try {
        await driver.wait(
            until.ableToSwitchToFrame(By.xpath('//iframe[@title="reCAPTCHA"]')),
            60_000
        );
        console.log("checkCaptcha");
        return {
            _1: false,
            _2: true,
            _3: false,
            _4: false,
            _5: false,
            _6: false,
        };
    } catch (error) {
        console.log("checkCaptcha");
        return {
            _1: false,
            _2: false,
            _3: false,
            _4: false,
            _5: false,
            _6: false,
        };
    }
};
