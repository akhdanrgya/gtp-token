module.exports = async function clickEmail(driver, until, By, email) {
    try {
        await driver.wait(
            until.elementLocated(By.xpath('//*[text()="Choose an account"]')),
            60_000
        );
        const lowercaseEmail = email.toLowerCase();
        const xpathExpression = `//*[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')="${lowercaseEmail}"]`;

        const emailElement = await driver.wait(
            until.elementLocated(By.xpath(xpathExpression)),
            60_000
        );

        await emailElement.click();
        console.log("clickEmail");
        return true;
    } catch (error) {
        console.log("clickEmail");
        return false;
    }
};
