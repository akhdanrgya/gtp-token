module.exports = function createUrl(params) {
    const newUrl = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${
        params.client_id
    }&redirect_uri=${encodeURIComponent(
        params.redirect_uri
    )}&scope=${encodeURIComponent(params.scope)}&response_type=${
        params.response_type
    }&state=${
        params.state
    }&prompt=select_account&service=lso&o2v=1&ddm=0&flowName=GeneralOAuthFlow`;
    return newUrl;
};
