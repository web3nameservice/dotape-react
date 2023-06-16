const { ethers } = require("ethers");

export function getCloudProvider() {
    let providerUrl = "https://nd-844-046-177.p2pify.com/5a763b2a0277ff74aa59bad0f0d9a950";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    return provider
}

