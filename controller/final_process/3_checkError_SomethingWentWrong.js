module.exports = async function somethingWentWrong(driver, until, By) {
    try {
        await driver.wait(
            until.elementLocated(
                By.xpath('//*[text()="Something went wrong"]')
            ),
            60_000
        );
        console.log("somethingWentWrong");
        return {
            _1: false,
            _2: false,
            _3: true,
            _4: false,
            _5: false,
            _6: false,
        };
    } catch (error) {
        console.log("somethingWentWrong");
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
