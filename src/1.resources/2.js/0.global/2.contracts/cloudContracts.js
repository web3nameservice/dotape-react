const { ethers } = require("ethers");
const { getCloudProvider } = require("./cloudProvider");
const { Variables } = require("./variables");


const CloudContracts = (network, chain, type) => {
    let provider = getCloudProvider(network, chain, type);

    let wnsRegistryContract = new ethers.Contract((Variables()).wnsRegistryAddr, (Variables()).wnsRegistryAbi, provider);
    let wnsRegistrarContract = new ethers.Contract((Variables()).wnsRegistrarAddr, (Variables()).wnsRegistrarAbi, provider);
    let wnsResolverContract = new ethers.Contract((Variables()).wnsResolverAddr, (Variables()).wnsResolverAbi, provider);
    let wnsErc721Contract = new ethers.Contract((Variables()).wnsErc721Addr, (Variables()).wnsErc721Abi, provider);
    let wnsMembershipContract = new ethers.Contract((Variables()).wnsMembershipAddr, (Variables()).wnsMembershipAbi, provider);
    let wethContract = new ethers.Contract((Variables()).wethAddr, (Variables()).wethAbi, provider);
    let wewePresaleRegistrarContract = new ethers.Contract((Variables()).wewePresaleRegistrarAddr, (Variables()).wewePresaleRegistrarAbi, provider);
    let wewePresaleNftContract = new ethers.Contract((Variables()).wewePresaleNftAddr, (Variables()).wewePresaleNftAbi, provider);
    let weweStakingContract = new ethers.Contract((Variables()).weweStakingAddr, (Variables()).weweStakingAbi, provider);
    let weweContract = new ethers.Contract(Variables().weweAddr, (Variables()).weweAbi, provider);

    return { wnsRegistryContract, wnsRegistrarContract, wnsResolverContract, wnsErc721Contract, wnsMembershipContract, wethContract, wewePresaleRegistrarContract, wewePresaleNftContract, weweStakingContract, weweContract };
}

module.exports = CloudContracts;