import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectWallet } from "../../0.global/wallet/connectWallet";
import { signMessage } from '@wagmi/core'
import { accountPrepend, loginPrepend } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { useDisconnect } from 'wagmi'
import { Variables } from "../../../1.resources/2.js/0.global/2.contracts/variables";
import { Dialog } from '@headlessui/react'
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";

const LoginModal = ({ isOpen, setIsOpen, }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { disconnect } = useDisconnect()

    let walletFeatures = [
        { title: "What will my signature be used for?", subtitle: "This signature identifies who you are and ensures that only you can access your data.", icon: "fas fa-circle-info" }
    ]

    async function sign() {
        setLoading(true);
        try {
            let signature = await signMessage({ message: loginPrepend });
            console.log(signature);
            localStorage.setItem("accountSignature", signature);
            setLoading(false);
            setIsOpen(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    async function disconnectWallet() {
        localStorage.clear();
        sessionStorage.clear();
        disconnect();
        setIsOpen(false);
        window.location = "/";
    }
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => { }}
                className="relative"
                style={{ zIndex: 99000000000000000 }}
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto bg-white flex justify-center items-center rounded-3xl">

                        <div className="md:w-[767px] py-10 md:py-20 px-10 md:px-20 bg-white rounded-3xl border border-gray-200">

                            {/* <div className="pb-4">
                                <WnsLogo />
                            </div> */}
                            <div className="mt-4">
                                <p className="text-3xl font-bold">Welcome to Dot Ape!</p>
                                <p className="text-gray-500 mt-4">Sign a message to sign into your account.</p>
                            </div>

                            <div className="pt-8 pb-2">
                                {walletFeatures.map((item, index) => (
                                    <div key={index} className="md:flex flex-row items-center py-6 gap-x-2 bg-gray-200 rounded-3xl px-8">
                                        <div className="flex w-10 h-10 items-center rounded-full">
                                            <FontAwesomeIcon icon={item.icon} className="text-xl text-black" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{item.title}</p>
                                            <p className="text-gray-500 mt-1 text-sm">{item.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <p className="text-gray-500 mt-4 text-sm">This request will not trigger any blockchain transaction from your wallet or cost any gas fees.</p>
                            </div>

                            {loading ? (
                                <div className="pt-8 pb-0">
                                    <div className="flex flex-row items-center py-6 gap-x-2">
                                        <FontAwesomeIcon icon="fas fa-circle-notch" className="text-lg text-main" spin />
                                        <p className="text-main font-bold text-sm">Waiting for signature</p>
                                    </div>
                                </div>
                            ) : (error ? (
                                <div className="pt-8 pb-0">
                                    <div className="flex flex-row items-center py-6 gap-x-2">
                                        <FontAwesomeIcon icon="fas fa-circle-info" className="text-lg text-red-500" />
                                        <p className="text-red-500 font-bold text-sm">Something went wrong</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="pb-8" />
                            )
                            )}



                            <div className="pt-0 flex items-center gap-x-2 mt-6">
                                <div className="rounded-full p-3 bg-main px-4 w-fit cursor-pointer" onClick={() => sign()}>
                                    <p className="text-white font-bold text-sm">Sign message</p>
                                </div>
                                <div className="rounded-full p-3 px-4 w-fit cursor-pointer" onClick={() => disconnectWallet()}>
                                    <p className="text-main font-bold text-sm">Cancel</p>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );

}

export default LoginModal;
