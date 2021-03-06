'use strict';
const pxutil = require('../pxutil');
const Payload = require('../pxpayload');

class TokenV3 extends Payload {
    constructor(ctx, config, token) {
        super();
        let [hash, ...cookie] = token.split(':');
        cookie = cookie.join(':');
        this.pxCookie = cookie;
        this.cookieHash = hash;
        this.pxConfig = config;
        this.pxContext = ctx;
        this.cookieSecret = config.COOKIE_SECRET_KEY;
    }

    getScore() {
        return this.decodedCookie.s;
    }

    getHmac() {
        return this.cookieHash;
    }

    isCookieFormatValid(cookie) {
        return cookie !== '' && pxutil.verifyDefined(cookie.t, cookie.s, cookie.u, cookie.v, cookie.a);
    }

    getBlockAction() {
        return this.decodedCookie.a;
    }

    isSecure() {
        return this.isHmacValid(this.pxCookie, this.getHmac());
    }
}

module.exports = TokenV3;