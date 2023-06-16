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

const PresaleRegister = ({ isOpen, setIsOpen, name, costEth, duration, primaryName, creditsLeft }) => {
    let { address } = useAccount();
    const { data: balance } = useBalance({ address: address })
    const { data: signer } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const { darkMode } = GlobalParams();
    const [useCredits, setUseCredits] = useState(true);

    function checkBalances(cost) {
        return balance.value >= cost;
    }

    async function register() {
        setLoading("Please wait...")
        try {
            let params = (await callW3Api("/register/presaleParams", { name: name, address: address, duration: duration, primaryName: primaryName }));
            if (checkBalances(params.tuple[3])) {
                const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
                setLoading("Check your wallet to confirm the registration...");
                let tx = await registrarContract.register([params.tuple], { value: params.tuple[3] });
                setLoading("Waiting for transaction to confirm...")
                getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
                    setLoading("")
                    setSuccess(true);
                });
            } else {
                setLoading("");
                setError("You have insufficient balance");
            }
        } catch (e) {
            setLoading("");
            setError("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        setError("");
        setLoading("");
        setSuccess(false);
    }, [isOpen])

    function getCreditsUsed() {
        if (useCredits) {
            if ((costEth * duration) < creditsLeft) {
                return (costEth * duration);
            } else {
                return (creditsLeft);
            }
        } else {
            return 0;
        }
    }

    function getEtherUsed() {
        if (useCredits) {
            if (getCreditsUsed() >= (costEth * duration)) {
                return 0;
            } else {
                return ((costEth * duration)) - getCreditsUsed();
            }
        } else {
            return (costEth * duration);
        }
    }

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
                            <div className="md:w-[500px] max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 rounded-3xl text-black dark:text-white border-2 dark:border-dark700">


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
                                            <div>
                                                {creditsLeft > 0 ? (
                                                    <div className="flex items-center justify-between mt-8 px-4 py-3 rounded-xl border-2 dark:border-dark700" onClick={() => { }}>
                                                        <p className="text-md text-zinc-500 dark:text-dark500">Use credits</p>
                                                        <div className="flex items-center gap-x-4">
                                                            <p className="text-md text-zinc-500 dark:text-white font-semibold">{(creditsLeft / 1e18).toFixed(4) + " ETH"}</p>
                                                            <div >
                                                                {useCredits ? (
                                                                    <div className="w-10 bg-main rounded-full flex justify-end px-1 py-1" >
                                                                        <FontAwesomeIcon icon="circle" className="text-white" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-10 bg-dark700 rounded-full flex justify-start px-1 py-1" >
                                                                        <FontAwesomeIcon icon="circle" className="text-white" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (null)}
                                                <div className="flex justify-between items-center mt-8">
                                                    <p className="text-md text-main font-semibold">You pay</p>
                                                    <div>
                                                        <p className="text-md text-main font-semibold text-end mt-1">
                                                            {costEth == 0 ? "-" : (getCreditsUsed() / 1e18).toFixed(4)} ETH in credits
                                                        </p>

                                                        {getEtherUsed() == 0 ? (
                                                            null
                                                        ) : (
                                                            <p className="text-sm text-main font-semibold text-end">{"(and " + (getEtherUsed() / 1e18).toFixed(4) + " ETH)"}</p>
                                                        )}
                                                    </div>
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

export default PresaleRegister;

