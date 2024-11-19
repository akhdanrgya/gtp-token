const generateName = require("../../helper/generateName");

module.exports = async function createNewName(driver, until, By) {
    try {
        await driver.wait(
            until.elementLocated(
                By.xpath('//*[text()="Choose your name in Growtopia"]')
            ),
            60_000
        );

        const nameInput = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="login-name"]')),
            60_000
        );

        const randomName = generateName();
        await nameInput.sendKeys(randomName);

        const getGrowNameButton = await driver.wait(
            until.elementLocated(
                By.xpath('//input[@type="submit" and @value="Get Grow Name"]')
            ),
            60_000
        );
        await getGrowNameButton.click();

        console.log("createNewName");
        return true;
    } catch (error) {
        console.log("createNewName");
        return false;
    }
};
