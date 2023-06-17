
export let setupPrepend = `Welcome to W3 Mail!\n\nSign this message to set up your account on the platform.\n\nThis request will not trigger a blockchain transaction from your wallet or cost any gas fees.\n\nParameters: `;
export let privateKeyEncryptPrepend = `W3 Mail\n\nSign this message to encrypt your account.\n\nThis request will not trigger a blockchain transaction from your wallet or cost any gas fees.`;
export let loginPrepend = `Dot Ape\n\nSign this message to login to your account.\n\nThis request will not trigger a blockchain transaction from your wallet or cost any gas fees.`;
export let sendPrepend = "W3 Mail\n\nSign this message to send the email.\n\nThis request will not trigger a blockchain transaction from your wallet or cost any gas fees.\n\nParameters: ";

export let zeroAddress = "0x0000000000000000000000000000000000000000";
export const collectionAddress = "0x3679f68709DDA61c8CBd5FEF301C7C92B90c423d";
export const teamAddress = "0xF27E5e949C7C451576cB79E39854E058f8B3F231";

let admins = ["0xF27E5e949C7C451576cB79E39854E058f8B3F231", "0x924aBbecCcaF0F1c3dEe09495a472f57b1fc1919", "0xAFEA6b17D7ba977497968E49734405bDf003e03E"]
export let adminsLowerCase = admins.map((admin) => { return admin.toLowerCase() });