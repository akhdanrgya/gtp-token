module.exports = async function oopsToooManyPeaople(driver, until, By) {
    try {
        await driver.wait(
            until.elementLocated(
                By.xpath(
                    '//*[text()="Oops, too many people trying to login at once. Please try again in 30 sec."]'
                )
            ),
            60_000
        );
        console.log("oopsToooManyPeaople");
        return {
            _1: false,
            _2: false,
            _3: false,
            _4: false,
            _5: true,
            _6: false,
        };
    } catch (error) {
        console.log("oopsToooManyPeaople");
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
