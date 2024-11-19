module.exports = async function registerNewAccount(driver, until, By) {
    try {
        await driver.wait(
            until.elementLocated(
                By.xpath('//*[text()="Sign in to growtopiagame.com"]')
            ),
            60_000
        );

        const continueButton = await driver.wait(
            until.elementLocated(By.xpath('//*[text()="Continue"]')),
            60_000
        );
        await continueButton.click();
        console.log("registerNewAccount");

        return true;
    } catch (error) {
        console.log("registerNewAccount");
        return false;
    }
};
