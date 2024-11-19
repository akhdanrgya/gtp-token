module.exports = async function accGsuite(driver, until, By) {
    try {
        const clickButton = await driver.wait(
            until.elementLocated(
                By.xpath('//input[@type="submit" and @value="I understand"]')
            ),
            60_000
        );

        await clickButton.click();

        console.log("createNewName");
        return true;
    } catch (error) {
        console.log("createNewName");
        return false;
    }
};
