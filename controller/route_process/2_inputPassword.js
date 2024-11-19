module.exports = async function inputPassword(driver, until, By, password) {
    let passwordInput;
    try {
        await driver.wait(
            until.elementLocated(
                By.xpath('//input[@aria-label="Enter your password"]')
            ),
            60_000
        );
        while (true) {
            passwordInput = await driver.wait(
                until.elementLocated(
                    By.xpath('//*[@id="password"]/div[1]/div/div[1]/input')
                ),
                60_000
            );
            await passwordInput.sendKeys(password);
            let value = await passwordInput.getAttribute("value");
            if (value === password) {
                break;
            }
        }
        await driver
            .wait(
                until.elementLocated(
                    By.xpath('//*[@id="passwordNext"]/div/button/span')
                ),
                60_000
            )
            .click();
        console.log("inputPassword");
        return true;
    } catch (error) {
        console.log("inputPassword");
        return false;
    }
};
