module.exports = async function getToken(driver) {
    await driver.wait(async function () {
        let pageSource = await driver.getPageSource();
        return /"token":"(.*?)"/.test(pageSource);
    }, 60_000);

    let pageSource = await driver.getPageSource();
    let match = pageSource.match(/"token":"(.*?)"/);
    return match
        ? {
              _1: match[1],
              _2: false,
              _3: false,
              _4: false,
              _5: false,
              _6: false,
          }
        : { _1: false, _2: false, _3: false, _4: false, _5: false, _6: false };
};
