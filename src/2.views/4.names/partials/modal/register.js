import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signMessage } from '@wagmi/core'
import { useDisconnect, useSigner, useBalance, useAccount } from 'wagmi'
import { Dialog } from '@headlessui/react'
import { shortenaddress } from "../../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { coinsJson } from "../../../../1.resources/2.js/0.global/0.smallfunctions/coins";
import { uploadImage } from "./uploadImage";
import { Variables } from "../../../../1.resources/2.js/0.global/2.contracts/variables";
import { ethers } from "ethers";
import { getCloudProvider } from "../../../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import EthIcon from "../../../../1.resources/3.files/images/eth_icon.png";
import ApecoinIcon from "../../../../1.resources/3.files/images/apecoin_icon.png";
import WethIcon from "../../../../1.resources/3.files/images/weth_icon.png";
import UsdtIcon from "../../../../1.resources/3.files/images/usdt_icon.png";
import CloudContracts from "../../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { GlobalParams } from "../../../0.wrapper/darkMode";
import { callW3Api } from "../../../../1.resources/2.js/0.global/3.api/callW3Api";
import { teamAddress } from "../../../../1.resources/2.js/0.global/0.smallfunctions/prepends";

const Register = ({ isOpen, setIsOpen, name, costEth, duration, primaryName }) => {
    let { address } = useAccount();
    const { data: balance } = useBalance({ address: address })
    const { data: signer } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const [tokenSelected, setTokenSelected] = useState(0);
    const [tokenCosts, setTokenCosts] = useState([0, 0, 0, 0]);
    const [costsChecked, setCostsChecked] = useState(false);
    const [balances, setBalances] = useState([0, 0, 0, 0]);
    const [balanceChecked, setBalanceChecked] = useState(false);
    const { darkMode } = GlobalParams();

    async function calculateCosts() {
        let [resultEth, resultUsd, resultApecoin] = await Promise.all([
            CloudContracts().apeRegistrarContract.getCost(name, 1),
            CloudContracts().apeRegistrarContract.getCostUsd(name, 1),
            CloudContracts().apeRegistrarContract.getCostApecoin(name, 1),
        ]);

        setTokenCosts([parseFloat(resultEth.toString()), parseFloat(resultApecoin.toString()), parseFloat(resultEth.toString()), parseFloat(resultUsd.toString())]);
        if (address?.toLowerCase() == teamAddress?.toLowerCase()) {
            setTokenCosts([0, 0, 0, 0]);
        }
        setCostsChecked(true);
    }

    async function calculateBalances() {
        let balances = await Promise.all([CloudContracts().apecoinContract.balanceOf(address), CloudContracts().wethContract.balanceOf(address), CloudContracts().usdtContract.balanceOf(address)])
        let [apecoinBalance, wethBalance, usdtBalance] = await Promise.all([parseFloat(balances[0].toString()), parseFloat(balances[1].toString()), parseFloat(balances[2].toString())])

        setBalances([balance.value, apecoinBalance, wethBalance, usdtBalance]);
        setBalanceChecked(true);
    }

    useEffect(() => {
        if (name.length > 2 && !name.includes(".") && !costsChecked) {
            calculateCosts();
        }
    }, [costEth])

    useEffect(() => {
        if (address != "" && address != undefined && address != null && !balanceChecked) {
            calculateBalances();
        }
    }, [costEth, address])

    function checkBalances() {
        if (tokenSelected == 0) {
            return balance.value >= (costEth * duration);
        } else {
            return balances[tokenSelected] >= tokenCosts[tokenSelected] * duration;
        }
    }

    async function checkApproval() {
        if (tokenSelected == 0) {
            return true;
        } else {
            let tokenAddress = coins[tokenSelected].tokenAddress;
            let tokenContract = new ethers.Contract(tokenAddress, Variables().weweAbi, signer);
            let allowance = await tokenContract.allowance(address, Variables().apeRegistrarAddr);
            allowance = parseFloat(allowance.toString());
            return allowance >= tokenCosts[tokenSelected] * duration;
        }
    }

    async function approve() {
        setLoading(`Check you wallet to approve ${coins[tokenSelected].name}. This allows our registrar contract to spend and accept your ${coins[tokenSelected].name} tokens.`)
        let tokenAddress = coins[tokenSelected].tokenAddress;
        let tokenContract = new ethers.Contract(tokenAddress, Variables().weweAbi, signer);

        let tx = await tokenContract.approve(Variables().apeRegistrarAddr, ethers.constants.MaxUint256);
        setLoading("Waiting for transaction to confirm...")

        getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
            setLoading("");
            await register();
        });
    }

    async function register() {
        setLoading("Please wait...")
        try {
            if (checkBalances()) {
                console.log(await checkApproval());
                if (await checkApproval()) {
                    let params = (await callW3Api("/register/params", { name: name, address: address, duration: duration, token: coins[tokenSelected].tokenAddress, primaryName: primaryName }));

                    const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
                    setLoading("Check your wallet to confirm the registration...");
                    let tx;
                    if (tokenSelected == 0) {
                        tx = await registrarContract.register([params.tuple], { value: params.tuple[3] });
                    } else {
                        console.log("erc20");
                        console.log([params.tuple], params.token);
                        tx = await registrarContract.registerErc20([params.tuple], params.token);
                    }
                    setLoading("Waiting for transaction to confirm...")
                    getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
                        setLoading("")
                        setSuccess(true);
                    });
                } else {
                    await approve();
                }
            } else {
                setLoading("");
                setError("You have insufficient balance");
            }
        } catch (e) {
            setLoading("");
            setError("Something went wrong. Please try again.");
        }
    }

    let coins = [
        { name: "ETH", logo: EthIcon, tokenAddress: "null", decimals: 1e18 },
        { name: "APE", logo: ApecoinIcon, tokenAddress: Variables().apecoinAddr, decimals: 1e18 },
        { name: "WETH", logo: WethIcon, tokenAddress: Variables().wethAddr, decimals: 1e18 },
        { name: "USDT", logo: UsdtIcon, tokenAddress: Variables().usdtAddr, decimals: 1e6 },
    ]

    useEffect(() => {
        setError("");
        setLoading("");
        setSuccess(false);
    }, [isOpen, tokenSelected])

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative"
                style={{ zIndex: 99000000000000000 }}
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto flex justify-center items-center rounded-3xl overflow-y-scroll">
                        <div className={darkMode ? "dark" : ""}>
                            <div className="md:w-[500px] max-h-[90vh] py-10 md:py-6 px-5 md:px-10 md:px-10 bg-white dark:bg-dark800 rounded-3xl text-black dark:text-white border-2 dark:border-dark700">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Register</p>
                                    <p className="text-gray-500 dark:text-dark500 mt-2">Register your .ape name</p>
                                </div>


                                <div className="mt-8 pb-2">
                                    {!success ? (
                                        <div className="">
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500 dark:text-dark500">Action</p>
                                                <div className="bg-gray-100 dark:bg-dark700 rounded-xl px-4 py-3 mt-2">
                                                    <p className="text-sm font-semibold text-zinc-500 dark:text-white">Register {name}.ape for {duration} years</p>
                                                </div>

                                            </div>
                                            <div className="mt-8">
                                                <p className="text-sm text-gray-500 dark:text-dark500">Select token</p>
                                                <DropdownItem name="hello" subheading="Select your token" items={coins} width={"100%"} left={"0%"} selected={tokenSelected} setSelected={setTokenSelected} balances={balances} balanceChecked={balanceChecked} />
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mt-8">
                                                    <p className="text-md text-main font-semibold">You pay</p>
                                                    <p className="text-md text-main font-semibold text-end">{costEth == 0 ? "-" :
                                                        tokenSelected == 0 ?
                                                            (((costEth * duration)) / 1e18).toFixed(4) :
                                                            tokenSelected == 3 ?
                                                                (tokenCosts[tokenSelected] * duration / 1e6).toFixed(2) :
                                                                (tokenCosts[tokenSelected] * duration / 1e18).toFixed(4)
                                                    } {coins[tokenSelected].name}<br /><span className="text-xs font-normal">{" (plus gas fees)"}</span>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-center justify-center">
                                                <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name + ".ape"} className="w-8/12 rounded-2xl" />
                                            </div>
                                            <div className='flex items-center justify-center gap-x-2 mt-8'>
                                                <FontAwesomeIcon icon={['fas', 'fa-check-circle']} className="text-main text-lg" />
                                                <p className='text-lg font-bold text-center text-main'>Transaction successful</p>
                                            </div>
                                            <p className='text-sm text-gray-500 text-center px-4 pt-2'>You have successfully registered {name}.ape for {duration} years!</p>
                                        </div>
                                    )}

                                </div>




                                {loading != "" ? (
                                    <div className="pt-8 pb-0">
                                        <div className="flex flex-row items-center py-0 gap-x-2">
                                            <FontAwesomeIcon icon="fas fa-circle-notch" className="text-lg text-main" spin />
                                            <p className="text-main font-bold text-sm">{loading}</p>
                                        </div>
                                    </div>
                                ) : (null)}

                                {error != "" ? (
                                    <div className="pt-8 pb-0">
                                        <div className="flex flex-row items-center py-0 gap-x-2">
                                            <FontAwesomeIcon icon="fas fa-circle-info" className="text-lg text-amber-500" />
                                            <p className="text-amber-500 font-bold text-sm">{error}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pb-0" />
                                )
                                }



                                <div className="pt-0 flex items-center gap-x-2 mt-6 pb-4 justify-start">
                                    {success ? (null) : (
                                        <div className="rounded-full p-3 bg-main px-4 w-fit cursor-pointer" onClick={() => register()}>
                                            <p className="text-white font-bold text-sm">{success ? "Done" : "Confirm"}</p>
                                        </div>
                                    )}
                                    {success ? (null) : (
                                        <div className="rounded-full p-3 px-4 w-fit cursor-pointer" onClick={() => setIsOpen(false)}>
                                            <p className="text-main font-bold text-sm">Cancel</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog >
        </div >
    );

}

export default Register;


const DropdownItem = ({ name, subheading, items, width, left, selected, setSelected, balances, balanceChecked }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown w-full  rounded-xl bg-white dark:bg-dark800 border-2 border-gray-200 dark:border-dark700 mt-2 border-2 dark:border-dark700" >
            <div className="flex items-center justify-between gap-x-3 px-4 py-3" onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center gap-x-3 cursor-pointer' >
                    <img src={items[selected].logo} className='w-6 h-6' />
                    <p className="font-semibold">{items[selected].name}</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <p className="text-sm font-semibold">Balance: {balanceChecked ? (parseFloat(balances[selected].toString()) / items[selected].decimals).toFixed(4) : "-"} {items[selected].name}</p>
                    <FontAwesomeIcon icon={['fas', "fa-angle-down"]} className="text-sm text-dark500" />
                </div>
            </div>
            <div id="" className="border-t border-gray-200 dark:border-dark700" style={{ display: isOpen ? "block" : "none", width: width, left: left }}>
                <p className="text-gray-500 px-4 py-2 text-sm font-semibold border-y border-b-gray-200 dark:border-dark700">{subheading}</p>
                {items.map((item, index) => (
                    <div key={index} onClick={() => { setSelected(index); setIsOpen(!isOpen) }}>
                        <div className="px-4 py-3 flex items-center justify-between gap-x-3 cursor-pointer border-b border-b-gray-200 dark:border-dark700 hover:bg-dark700">
                            <div className="flex items-center gap-x-3">
                                <img src={item.logo} className='w-6 h-6' />
                                <div >
                                    <p className="font-semibold">{item.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-3">

                                {index == selected ? (
                                    <div className="w-5 h-5 bg-main rounded-full flex justify-center items-center">
                                        <FontAwesomeIcon icon={['fas', "fa-check"]} className="text-white text-xs" />
                                    </div>
                                ) : (
                                    <p className="text-sm font-semibold">{balanceChecked ? (parseFloat(balances[index].toString()) / items[index].decimals).toFixed(4) : "-"} {items[index].name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}