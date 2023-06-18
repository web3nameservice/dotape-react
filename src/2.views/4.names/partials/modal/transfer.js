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

const Transfer = ({ isOpen, setIsOpen, tokenId, name }) => {
    const { data: signer, isError, isLoading } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const { darkMode, toggleDarkMode } = GlobalParams();


    async function save() {
        // try {
        //     setLoading("Please wait...")
        //     let params = (await callW3Api("/register/extendParams", { tokenId: tokenId, duration: duration }));
        //     const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);

        //     setLoading("Confirm the tx in your wallet...")
        //     console.log(params.tuple[2]);
        //     const tx = await registrarContract.extend([params.tuple], { value: params.tuple[2] });

        //     setLoading("Waiting for tx to confirm...")
        //     getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
        //         setLoading("")
        //         setSuccess(true);
        //     });
        // } catch (e) {
        //     setLoading("")
        //     setError("Something went wrong. Please try again later.")
        // }
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

                            <div className="md:w-[550px] max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 border border-dark700 rounded-3xl text-white dark:text-white">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Transfer</p>
                                    <p className="text-gray-500 mt-2 dark:text-zinc-400">Tranfer {name}.ape to another address</p>
                                </div>

                                <div className="mt-8 pb-4">
                                    <div className="px-20 rounded-2xl">
                                        <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name + ".ape"} className="w-full rounded-2xl" />
                                    </div>

                                    <div className="mt-8">
                                        <p className="text-sm font-semibold text-dark500">Transfer {name}.ape to</p>
                                        <input type="text" placeholder="Enter address (or .ape, .eth, .web3 username)" className="w-full mt-2 rounded-2xl border-2 border-zinc-200 dark:border-dark700 px-4 py-3 text-sm dark:bg-dark800 outline-none placeholder:text-dark500" />
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

export default Transfer;
