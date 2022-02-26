const crypto = require("crypto-js");

const salt = "9hPhEOGD01O2SCsev";

const toUtf8 = function (text) {
  return unescape(encodeURIComponent(text));
};

const fromUtf8 = function (text) {
  return decodeURIComponent(escape(text));
};

const hasher = {
  encode: function (text) {
    return crypto.AES.encrypt(btoa(toUtf8(text)), salt).toString();
  },
  decode: function (base64) {
    return fromUtf8(
      atob(crypto.AES.decrypt(base64, salt).toString(crypto.enc.Utf8))
    );
  },
};

module.exports = hasher;
