const getToken = require("./1_getToken");
const checkCaptcha = require("./2_checkCaptcha");
const checkErrorSomethingWentWrong = require("./3_checkError_SomethingWentWrong");
const checkErrorVerifyItsYou = require("./4_checkError_Verifyitsyou");
const oopsToooManyPeaople = require("./5_oops_too_many_peoplepl");
const proxyIssue = require("./6_proxy_issue");
const route_process = require("../route_process/0_main");
const isSessionValid = async (driver) => {
    try {
        await driver.getSession();
        return true;
    } catch {
        return false;
    }
};

module.exports = async function final_process(
    driver,
    until,
    By,
    email,
    password,
    mailRecovery
) {
    console.log("Starting final_process");
    try {
        if (!(await isSessionValid(driver))) {
            throw new Error("Session is invalid or has been closed.");
        }

        console.log("Driver session ID:", (await driver.getSession()).getId());

        const token = await Promise.race([
            getToken(driver),
            checkCaptcha(driver, until, By),
            checkErrorSomethingWentWrong(driver, until, By),
            checkErrorVerifyItsYou(driver, until, By),
            oopsToooManyPeaople(driver, until, By),
            proxyIssue(driver, until, By),
            route_process(driver, until, By, email, password, mailRecovery),
        ]);

        return token;
    } catch (error) {
        console.error("Error in final_process:", error.message);
        console.error("Stack trace:", error.stack);
        throw error;
    }
};
