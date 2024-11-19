module.exports = async function proxyIssue(driver, until, By) {
    try {
        // Wait for the error message element to be located
        await driver.wait(
            until.elementLocated(
                By.xpath('//*[text()="ERR_NO_SUPPORTED_PROXIES"]')
            ),
            60_000 // Timeout in milliseconds
        );
        // Return object indicating the presence of the error
        return {
            _1: false,
            _2: false,
            _3: false,
            _4: false,
            _5: false,
            _6: true, // Error detected
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error during waiting for proxy error:", error);

        // Return object indicating the error handling scenario
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
