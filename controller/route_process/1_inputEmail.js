module.exports = async function inputEmail(driver, until, By, email) {
    try {
        await driver.wait(
            until.elementLocated(By.xpath('//*[text()="Sign in"]')),
            60_000
        );
        await driver
            .wait(
                until.elementLocated(By.xpath('//*[@id="identifierId"]')),
                60_000
            )
            .sendKeys(email);
        await driver
            .wait(
                until.elementLocated(
                    By.xpath('//*[@id="identifierNext"]/div/button/span')
                ),
                60_000
            )
            .click();

        console.log("inputEmail");
        return true;
    } catch (error) {
        console.log("inputEmail");
        return false;
    }
};
