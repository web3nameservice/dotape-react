import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signMessage } from '@wagmi/core'
import { useDisconnect, useSigner, useBalance, useAccount } from 'wagmi'
import { Dialog } from '@headlessui/react'
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { coinsJson } from "../../../1.resources/2.js/0.global/0.smallfunctions/coins";
import { Variables } from "../../../1.resources/2.js/0.global/2.contracts/variables";
import { ethers } from "ethers";
import { getCloudProvider } from "../../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import EthIcon from "../../../1.resources/3.files/images/eth_icon.png";
import ApecoinIcon from "../../../1.resources/3.files/images/apecoin_icon.png";
import WethIcon from "../../../1.resources/3.files/images/weth_icon.png";
import UsdtIcon from "../../../1.resources/3.files/images/usdt_icon.png";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { GlobalParams } from "../../0.wrapper/darkMode";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";

const Register = ({ isOpen, setIsOpen, costEth, cart }) => {
    let { address } = useAccount();
    const { data: balance } = useBalance({ address: address })
    const { data: signer } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const [tokenSelected, setTokenSelected] = useState(0);
    const [tokenCosts, setTokenCosts] = useState([0, 0, 0, 0]);
    const [balances, setBalances] = useState([0, 0, 0, 0]);
    const [balanceChecked, setBalanceChecked] = useState(false);
    const { darkMode } = GlobalParams();

    async function calculateCosts() {
        console.log(cart);
        let [resultUsd, resultApecoin] = await Promise.all([
            Promise.all(
                cart.map(async (item) => {
                    return CloudContracts().apeRegistrarContract.getCostUsd(item.name, item.duration);
                })
            ),
            Promise.all(
                cart.map(async (item) => {
                    return CloudContracts().apeRegistrarContract.getCostApecoin(item.name, item.duration);
                })
            ),
        ])
        resultUsd = resultUsd.reduce((a, b) => a + parseFloat(b.toString()), 0);
        resultApecoin = resultApecoin.reduce((a, b) => a + parseFloat(b.toString()), 0);
        setTokenCosts([parseFloat(costEth), parseFloat(resultApecoin), parseFloat(costEth), parseFloat(resultUsd)]);
        console.log(resultUsd, resultApecoin);
    }

    async function calculateBalances() {
        let balances = await Promise.all([CloudContracts().apecoinContract.balanceOf(address), CloudContracts().wethContract.balanceOf(address), CloudContracts().usdtContract.balanceOf(address)])
        let [apecoinBalance, wethBalance, usdtBalance] = await Promise.all([parseFloat(balances[0].toString()), parseFloat(balances[1].toString()), parseFloat(balances[2].toString())])

        setBalances([parseFloat(balance.value.toString()), apecoinBalance, wethBalance, usdtBalance]);
        setBalanceChecked(true);
    }

    useEffect(() => {
        calculateCosts()
    }, [costEth])

    useEffect(() => {
        if (address != "" && address != undefined && address != null && !balanceChecked) {
            calculateBalances();
        }
    }, [costEth, address])

    function checkBalances() {
        if (tokenSelected == 0) {
            return balance.value >= (costEth);
        } else {
            return balances[tokenSelected] >= tokenCosts[tokenSelected];
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
            return allowance >= tokenCosts[tokenSelected];
        }
    }

    async function approve() {
        setLoading(`Check you wallet to approve ${coins[tokenSelected].name}. This allows our registrar contract to spend and accept your ${coins[tokenSelected].name} tokens.`)
        let tokenAddress = coins[tokenSelected].tokenAddress;
        let tokenContract = new ethers.Contract(tokenAddress, Variables().weweAbi, signer);

        let tx = await tokenContract.approve(Variables().apeRegistrarAddr, ethers.constants.MaxUint256);
        setLoading("Waiting for transaction to confirm...")

        getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
            //wait for 2 seconds
            await new Promise(r => setTimeout(r, 10000));
            setLoading("");
            await register();
        });
    }

    async function register() {
        setLoading("Please wait...")
        try {
            if (checkBalances()) {
                if (await checkApproval()) {
                    console.log(cart);
                    let params = await Promise.all(
                        cart.map((item) => {
                            console.log(item.name, item.duration);
                            return callW3Api("/register/params", { name: item.name, address: address, duration: item.duration, token: tokenSelected == 0 ? "null" : coins[tokenSelected].tokenAddress, primaryName: false });
                        })
                    );
                    let tuples = params.map((item) => { return item.tuple; });

                    const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
                    setLoading("Check your wallet to confirm the registration...");
                    let tx;
                    if (tokenSelected == 0) {
                        let total = tuples.reduce((a, b) => a + parseFloat(b[3]), 0);
                        tx = await registrarContract.register(tuples, { value: total.toString() });
                    } else {
                        console.log("erc20");
                        tx = await registrarContract.registerErc20(tuples, coins[tokenSelected].tokenAddress);
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
                <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto flex justify-center items-center rounded-3xl overflow-y-scroll">
                        <div className={darkMode ? "dark" : ""}>
                            <div className="md:w-[500px] max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 rounded-3xl text-black dark:text-white border-2 dark:border-dark700">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Register</p>
                                    <p className="text-gray-500 dark:text-dark500 mt-2">Register your .ape name</p>
                                </div>


                                <div className="mt-8 pb-4">
                                    {/* <div className="flex justify-between items-center mt-8">
                                    <p className="text-md text-zinc-500 dark:text-zinc-400">Name</p>
                                    <p className="text-md text-zinc-500 dark:text-zinc-400">{name}.ape</p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-md text-zinc-500 dark:text-zinc-400">Duration</p>
                                    <p className="text-md text-zinc-500 dark:text-zinc-400">{duration} years</p>
                                </div> */}
                                    {!success ? (
                                        <div className="">
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500 dark:text-dark500">Action</p>
                                                <div className="bg-gray-100 dark:bg-dark700 rounded-xl px-4 py-3 mt-2">
                                                    <p className="text-sm font-bold text-zinc-500 dark:text-white">Register {cart.length} .ape names</p>
                                                </div>

                                            </div>
                                            <div className="mt-8">
                                                <p className="text-sm text-gray-500 dark:text-dark500">Select token</p>
                                                <DropdownItem name="hello" subheading="Select your token" items={coins} width={"100%"} left={"0%"} selected={tokenSelected} setSelected={setTokenSelected} balances={balances} balanceChecked={balanceChecked} />
                                            </div>
                                            <div>
                                                {/* <div className="flex justify-between items-center mt-8">
                                                    <p className="text-md text-zinc-500 dark:text-dark500">Your balance</p>
                                                    <p className="text-md text-zinc-500 dark:text-dark500">{
                                                        balances[tokenSelected] == 0 ? "-" :
                                                            tokenSelected == 3 ? (balances[tokenSelected] / 1e6).toFixed(2) :
                                                                (balances[tokenSelected] / 1e18).toFixed(4)
                                                    } {coins[tokenSelected].name}</p>
                                                </div> */}
                                                <div className="flex justify-between items-center mt-8">
                                                    <p className="text-md text-main font-bold">You pay</p>
                                                    <p className="text-md text-main font-bold text-end">{costEth == 0 ? "-" :
                                                        tokenSelected == 0 ?
                                                            (((costEth)) / 1e18).toFixed(4) :
                                                            tokenSelected == 3 ?
                                                                (tokenCosts[tokenSelected] / 1e6).toFixed(2) :
                                                                (tokenCosts[tokenSelected] / 1e18).toFixed(4)
                                                    } {coins[tokenSelected].name}<br /><span className="text-xs">{" (plus gas in ETH)"}</span>
                                                    </p>
                                                </div>

                                                {/* <div className="flex justify-between items-center mt-2">
                                            <p className="text-md text-zinc-500 dark:text-zinc-400">Est. gas fees</p>
                                            <p className="text-md text-zinc-500 dark:text-zinc-400">{gasPrimary == 0 ? "-" : primaryName ? (gasPrimary).toFixed(4) : (gasWithoutPrimary).toFixed(4)} ETH</p>
                                        </div> */}

                                                {/* <div className="flex justify-between items-end mt-2">
                                            <p className="text-md font-bold">Estimated Total</p>
                                            <p className="text-xl font-bold">{costEth == 0 ? "-" : primaryName ? ((costEth * duration) + gasPrimary).toFixed(4) : ((costEth * duration) + gasWithoutPrimary).toFixed(4)} ETH</p>
                                        </div> */}

                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {/* <div className="flex items-center justify-center">
                                            <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name + ".ape"} className="w-8/12 rounded-2xl" />
                                        </div> */}
                                            <div className='flex items-center justify-center gap-x-2 mt-8'>
                                                <FontAwesomeIcon icon={['fas', 'fa-check-circle']} className="text-main text-lg" />
                                                <p className='text-lg font-bold text-center text-main'>Transaction successful</p>
                                            </div>
                                            <p className='text-sm text-gray-500 text-center px-4 pt-2'>You have successfully registered .ape names!</p>
                                        </div>
                                    )}

                                </div>




                                <div className="pt-4">
                                    {loading != "" ? (
                                        <div className=" pb-0">
                                            <div className="flex flex-row items-center pb-6 gap-x-2">
                                                <FontAwesomeIcon icon="fas fa-circle-notch" className="text-lg text-main" spin />
                                                <p className="text-main font-bold text-sm">{loading}</p>
                                            </div>
                                        </div>
                                    ) : (null)}


                                    {error != "" ? (
                                        <div className=" pb-0">
                                            <div className="flex flex-row items-center pb-6 gap-x-2">
                                                <FontAwesomeIcon icon="fas fa-circle-info" className="text-lg text-red-500" />
                                                <p className="text-red-500 font-bold text-sm">{error}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="pb-0" />
                                    )
                                    }
                                </div>



                                <div className="pt-0 flex items-center gap-x-2 mt-0 pb-8">
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
                        <div className="px-4 py-3 flex items-center justify-between gap-x-3 cursor-pointer border-b border-b-gray-200 dark:border-dark700 hover:bg-gray-100">
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