const { ethers } = require("ethers");

export function getCloudProvider(network, chain, type) {
    // let url;
    // if (network == "eth") {
    //     if (chain == "main") {
    //         if (type == "full") {
    //             url = process.env.REACT_APP_CHAINSTACK_ETHEREUM_MAINNET_FULL_ARRAY;
    //         } else if (chain == "archive") {
    //             url = process.env.REACT_APP_CHAINSTACK_ETHEREUM_MAINNET_ARCHIVE_ARRAY;
    //         }
    //     } else if (chain == "test") {
    //         if (type == "full") {
    //             url = process.env.REACT_APP_CHAINSTACK_ETHEREUM_GOERLI_FULL_ARRAY;
    //         } else if (chain == "archive") {
    //             url = process.env.REACT_APP_CHAINSTACK_ETHEREUM_GOERLI_FULL_ARRAY;
    //         }
    //     }
    // } else if (network == "pol") {
    //     if (chain == "main") {
    //         if (type == "full") {
    //             url = process.env.REACT_APP_CHAINSTACK_POLYGON_MAINNET_FULL_ARRAY;
    //         } else if (chain == "archive") {
    //             url = process.env.REACT_APP_CHAINSTACK_POLYGON_MAINNET_FULL_ARRAY;
    //         }
    //     } else if (chain == "test") {
    //         if (type == "full") {
    //             url = process.env.REACT_APP_CHAINSTACK_POLYGON_MUMBAI_FULL_ARRAY;
    //         } else if (chain == "archive") {
    //             url = process.env.REACT_APP_CHAINSTACK_POLYGON_MUMBAI_FULL_ARRAY;
    //         }
    //     }
    // }
    // let providerArray = JSON.parse(url).links;
    // const random = Math.floor(Math.random() * providerArray.length);
    let providerUrl = "https://rpc.ankr.com/eth/c3073884e0602ab1bd642b9cbdce025e0afb67f15a94a661ca001a393869bd86";
    //let provider = new Web3.providers.HttpProvider(providerUrl);
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    return provider
}

