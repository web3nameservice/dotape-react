const { ethers } = require("ethers");

export function getCloudProvider() {
    let providerUrl = "https://rpc.ankr.com/eth/c3073884e0602ab1bd642b9cbdce025e0afb67f15a94a661ca001a393869bd86";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    return provider
}

export function getCloudProviderFast() {
    let providerUrl = "https://rpc.ankr.com/eth/c3073884e0602ab1bd642b9cbdce025e0afb67f15a94a661ca001a393869bd86";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    return provider
}
