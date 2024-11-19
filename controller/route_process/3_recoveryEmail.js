module.exports = async function recoveryMail(driver, until, By, mailRecovery) {
    if (!mailRecovery) {
        return true;
    }
    try {
        await driver.wait(
            until.elementLocated(By.xpath('//*[text()="Verify it’s you"]')),
            60_000
        );

        const confirmRecoveryEmail = await driver.wait(
            until.elementLocated(
                By.xpath('//*[text()="Confirm your recovery email"]')
            ),
            60_000
        );

        await driver.wait(until.elementIsVisible(confirmRecoveryEmail), 60_000);
        await confirmRecoveryEmail.click();

        const emailInput = await driver.wait(
            until.elementLocated(
                By.xpath('//*[@id="knowledge-preregistered-email-response"]')
            ),
            60_000
        );
        await driver.wait(until.elementIsVisible(emailInput), 60_000);
        await emailInput.sendKeys(mailRecovery);

        const nextButton = await driver.wait(
            until.elementLocated(By.xpath('//*[text()="Next"]')),
            60_000
        );
        await driver.wait(until.elementIsVisible(nextButton), 60_000);
        await nextButton.click();
        console.log("recoveryMail");
        return true;
    } catch (error) {
        console.log(error);
        console.log("recoveryMail");
        return false;
    }
};
