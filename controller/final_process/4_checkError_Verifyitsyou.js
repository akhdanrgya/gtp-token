module.exports = async function verifyItsYou(driver, until, By) {
    const verificationXpath =
        '//*[contains(text(), "We noticed unusual activity in your Google Account. To keep your account safe, you were signed out. To continue, you’ll need to verify it’s you.")]';

    try {
        // Wait for the element to be located within 60 seconds
        await driver.wait(
            until.elementLocated(By.xpath(verificationXpath)),
            60000
        );
        return {
            _1: false,
            _2: false,
            _3: false,
            _4: true,
            _5: false,
            _6: false,
        };
    } catch (error) {
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
