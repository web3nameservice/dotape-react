var namehash = require('eth-ens-namehash')
const punycode = require('punycode/');

export function shortenaddress(xstr) {
    const myArr = xstr.toString().substring(0, 6);
    const myArrlast = xstr.toString().substring(38, 42);
    const final = myArr + "..." + myArrlast
    return final
}

export const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

export function normalize(stringToTrim) {
    var normalized = namehash.normalize(stringToTrim)

    return normalized
};

export function toUnicode(string) {
    return punycode.toUnicode(string);
}

export function toASCII(string) {
    return punycode.toASCII(string);
}