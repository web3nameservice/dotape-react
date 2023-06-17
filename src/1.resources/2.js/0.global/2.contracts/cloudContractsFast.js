const { ethers } = require("ethers");
const { getCloudProvider, getCloudProviderFast } = require("./cloudProvider");
const { Variables } = require("./variables");


const CloudContracts = () => {
    let provider = getCloudProviderFast();

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
    let apecoinContract = new ethers.Contract(Variables().apecoinAddr, (Variables()).weweAbi, provider);
    let usdtContract = new ethers.Contract(Variables().usdtAddr, (Variables()).weweAbi, provider);
    let apeRegistrarContract = new ethers.Contract(Variables().apeRegistrarAddr, (Variables()).apeRegistrarAbi, provider);
    let apeErc721Contract = new ethers.Contract(Variables().apeErc721Addr, (Variables()).apeErc721Abi, provider);
    let apeRegistryContract = new ethers.Contract(Variables().apeRegistryAddr, (Variables()).apeRegistryAbi, provider);
    let apeResolverContract = new ethers.Contract(Variables().apeResolverAddr, (Variables()).apeResolverAbi, provider);
    return {
        wnsRegistryContract, wnsRegistrarContract, wnsResolverContract, wnsErc721Contract, wnsMembershipContract, wethContract, wewePresaleRegistrarContract, wewePresaleNftContract, weweStakingContract, weweContract, apecoinContract,
        apeRegistrarContract, apeErc721Contract, apeRegistryContract, apeResolverContract, usdtContract
    };
}

module.exports = CloudContracts;