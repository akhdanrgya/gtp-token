const inputEmail = require("./1_inputEmail");
const inputPassword = require("./2_inputPassword");
const recoveryEmail = require("./3_recoveryEmail");
const clickEmail = require("./4_clickEmail");
const registerNewAccount = require("./5_registerNewAccount");
const createNewName = require("./6_createNewName");
const accGsuite = require("./7_acc_gsuite");

module.exports = async function final_process(
    driver,
    until,
    By,
    email,
    password,
    mailRecovery
) {
    try {
        const [
            inputEmail_response,
            inputPassword_response,
            recoveryEmail_response,
            clickEmail_response,
            registerNewAccount_response,
            createNewName_response,
            accGsuite_response,
        ] = await Promise.all([
            inputEmail(driver, until, By, email),
            inputPassword(driver, until, By, password),
            recoveryEmail(driver, until, By, mailRecovery),
            clickEmail(driver, until, By, email),
            registerNewAccount(driver, until, By),
            createNewName(driver, until, By),
            accGsuite(driver, until, By),
        ]);
        return {
            inputEmail_response,
            inputPassword_response,
            recoveryEmail_response,
            clickEmail_response,
            registerNewAccount_response,
            createNewName_response,
            accGsuite_response,
        };
    } catch (error) {
        console.log(error);
    }
};
