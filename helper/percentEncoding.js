module.exports = function percentEncode(
    randomName,
    version,
    hash2,
    meta,
    rid,
    hash,
    mac,
    wk
) {
    try {
        const inputString = `tankIDName|
tankIDPass|
requestedName|${randomName}
f|0
protocol|208
game_version|${version}
fz|47142936
lmode|0
cbits|0
player_age|24
GDPR|1
category|wotd_world
totalPlaytime|0
klv|84f72934dea733ae248ee48834e81cde745037122c3ddbc719e6957ff300fd75
hash2|-${hash2}
meta|${meta}
fhash|-716928004
rid|${rid}
platformID|0,1,1
deviceVersion|0
country|id}
hash|-${hash}
mac|${mac}
wk|${wk}
zf|-821693372`.trim();
        let encodedString = "";
        const specialCharacters = {
            " ": "",
            "!": "%21",
            '"': "%22",
            "#": "%23",
            $: "%24",
            "%": "%25",
            "&": "%26",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "*": "%2A",
            "+": "%2B",
            ",": "%2C",
            "-": "%2D",
            ".": "%2E",
            "/": "%2F",
            ":": "%3A",
            ";": "%3B",
            "<": "%3C",
            "=": "%3D",
            ">": "%3E",
            "?": "%3F",
            "@": "%40",
            "[": "%5B",
            "\\": "%5C",
            "]": "%5D",
            "^": "%5E",
            _: "%5F",
            "`": "%60",
            "{": "%7B",
            "|": "%7C",
            "}": "%7D",
            "~": "%7E",
            "\n": "%0A",
        };
        for (const char of inputString) {
            if (specialCharacters[char]) {
                encodedString += specialCharacters[char];
            } else {
                encodedString += char;
            }
        }
        return encodedString;
    } catch (error) {
        return null;
    }
};
