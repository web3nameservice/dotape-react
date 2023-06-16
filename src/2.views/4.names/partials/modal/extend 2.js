import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signMessage } from '@wagmi/core'
import { useDisconnect, useSigner } from 'wagmi'
import { Dialog } from '@headlessui/react'
import { shortenaddress } from "../../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { coinsJson } from "../../../../1.resources/2.js/0.global/0.smallfunctions/coins";
import { uploadImage } from "./uploadImage";
import { Variables } from "../../../../1.resources/2.js/0.global/2.contracts/variables";
import { ethers } from "ethers";
import { getCloudProvider } from "../../../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { GlobalParams } from "../../../0.wrapper/darkMode";
import CloudContracts from "../../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { callW3Api } from "../../../../1.resources/2.js/0.global/3.api/callW3Api";

const Extend = ({ isOpen, setIsOpen, tokenId, name }) => {
    const { data: signer, isError, isLoading } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const [duration, setDuration] = useState(1);
    const { darkMode, toggleDarkMode } = GlobalParams();
    const [costEth, setCostEth] = useState(0);

    function changeDuration(param) {
        if (param == "plus") {
            setDuration(duration + 1);
        } else {
            if (duration > 1) {
                setDuration(duration - 1);
            }
        }
    }


    async function init() {
        let cost = await CloudContracts().apeRegistrarContract.getCost(name, 1);
        setCostEth(parseFloat(cost.toString()));
    }

    useEffect(() => {
        if (tokenId != null && tokenId != "" && tokenId != "0" && tokenId != 0) {
            init()
        }
    }, [])


    async function save() {
        try {
            setLoading("Please wait...")
            let params = (await callW3Api("/register/extendParams", { tokenId: tokenId, duration: duration }));
            const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);

            setLoading("Confirm the tx in your wallet...")
            console.log(params.tuple[2]);
            const tx = await registrarContract.extend([params.tuple], { value: params.tuple[2] });

            setLoading("Waiting for tx to confirm...")
            getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
                setLoading("")
                setSuccess(true);
            });
        } catch (e) {
            setLoading("")
            setError("Something went wrong. Please try again later.")
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

                            <div className="md:w-md max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 border border-dark700 rounded-3xl text-white dark:text-white">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Extend Registration</p>
                                    <p className="text-gray-500 mt-2 dark:text-zinc-400">Extend the registration of your .ape name</p>
                                </div>

                                <div className="mt-8 pb-4">
                                    <div className="border-2 border-zinc-300 dark:border-zinc-600 px-2 py-2 rounded-full mt-8">
                                        <div className="w-full flex justify-between items-center">
                                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${duration > 1 ? "bg-main" : "bg-zinc-400 dark:bg-zinc-600"}`} onClick={() => changeDuration("minus")}>
                                                <FontAwesomeIcon icon={['fas', 'minus']} className="text-white text-sm" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold">{duration} year</p>
                                            </div>
                                            <div className="w-10 h-10 flex items-center justify-center bg-main rounded-full" onClick={() => changeDuration("plus")}>
                                                <FontAwesomeIcon icon={['fas', 'plus']} className="text-white text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-x-2">
                                        <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-zinc-500 dark:text-zinc-400 text-sm" />
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Extending for multiple years will save money on gas fees.</p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mt-8">
                                            <p className="text-md text-zinc-500 dark:text-zinc-400">Price</p>
                                            <p className="text-md text-zinc-500 dark:text-zinc-400">{((costEth * duration) / 1e18).toFixed(4)} ETH</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <p className="text-md text-main font-bold">You pay</p>
                                            <div>
                                                <p className="text-xl text-main font-bold text-end">{((costEth * duration) / 1e18).toFixed(4)} ETH</p>
                                                <p className="text-sm text-main text-end">(and gas fees)</p>
                                            </div>
                                        </div>

                                    </div>
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

                                    {success ? (
                                        <div className=" pb-0">
                                            <div className="flex flex-row items-center pb-6 gap-x-2">
                                                <FontAwesomeIcon icon="fas fa-check-circle" className="text-lg text-main" />
                                                <p className="text-main font-bold text-sm">Transaction successful</p>
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
                                    <div className="rounded-full p-3 bg-main px-4 w-fit cursor-pointer" onClick={() => success ? window.location.reload() : save()}>
                                        <p className="text-white font-bold text-sm">{success ? "Done" : "Confirm"}</p>
                                    </div>
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

export default Extend;
