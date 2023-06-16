import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectWallet } from "../../0.global/wallet/connectWallet";
import { signMessage } from '@wagmi/core'
import { accountPrepend, loginPrepend } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { useDisconnect, useAccount } from 'wagmi'
import { Variables } from "../../../1.resources/2.js/0.global/2.contracts/variables";
import { Dialog } from '@headlessui/react'
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import { GlobalParams } from "../../0.wrapper/darkMode";
import Logo from "../../../1.resources/3.files/logo/logobg.png"
import LogoBlack from "../../../1.resources/3.files/logo/logo_black.png"

const LoginModal = ({ isOpen, setIsOpen, }) => {
    const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { disconnect } = useDisconnect()
    const { darkMode } = GlobalParams();

    let walletFeatures = [
        { title: "How will my signature be used?", subtitle: "This signature identifies who you are and ensures that only you can access your data.", icon: "fas fa-circle-info" }
    ]

    async function sign() {
        setLoading(true);
        try {
            let signature = await signMessage({ message: loginPrepend });
            console.log(signature);
            localStorage.setItem("accountSignature" + address, signature);
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
        <div >
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
                    <Dialog.Panel className="mx-auto flex justify-center items-center rounded-3xl">
                        <div className={darkMode ? "dark" : ""}>
                            <div className="md:max-w-[550px] py-10 md:py-10 px-10 md:px-12 bg-white dark:bg-dark900 rounded-3xl border border-gray-200 dark:border-dark700 text-black dark:text-white">

                                <div className="pb-4">
                                    {darkMode ? (
                                        <img src={Logo} className="w-12 h-12 md:w-14 md:h-14 rounded-lg" />
                                    ) : (
                                        <img src={Logo} className="w-12 h-12 md:w-14 md:h-14 rounded-lg" />
                                    )}
                                </div>
                                <div className="mt-2">
                                    <p className="text-3xl font-bold">Welcome to Dot Ape!</p>
                                    <p className="text-gray-500 dark:text-dark500 mt-4">Sign a message to log into your account.</p>
                                </div>

                                <div className="pt-8 pb-2">
                                    {walletFeatures.map((item, index) => (
                                        <div key={index} className="md:flex flex-row items-center py-4 gap-x-4 bg-gray-200 dark:bg-dark800 rounded-xl px-6">
                                            <div className="flex w-10 h-10 items-center rounded-full">
                                                <FontAwesomeIcon icon={item.icon} className="text-xl text-gray-500 dark:text-dark500" />
                                            </div>
                                            <div>
                                                {/* <p className="text-sm text-main font-semibold">{item.title}</p> */}
                                                <p className="text-gray-500 dark:text-dark500 mt-1 text-sm ">{item.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pb-6">
                                    <p className="text-gray-500 dark:text-dark500 mt-4 text-sm">This request will not trigger any blockchain transaction from your wallet or cost any gas fees.</p>
                                </div>

                                {loading ? (
                                    <div className="pt-0 pb-0">
                                        <div className="flex flex-row items-center py-0 gap-x-2">
                                            <FontAwesomeIcon icon="fas fa-circle-notch" className="text-lg text-main" spin />
                                            <p className="text-main font-bold text-sm">Waiting for signature</p>
                                        </div>
                                    </div>
                                ) : (error ? (
                                    <div className="pt-0 pb-0">
                                        <div className="flex flex-row items-center py-0 gap-x-2">
                                            <FontAwesomeIcon icon="fas fa-circle-info" className="text-lg text-red-500" />
                                            <p className="text-red-500 font-bold text-sm">Something went wrong</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pb-0" />
                                )
                                )}



                                <div className="pt-0 flex items-center gap-x-2 mt-4">
                                    <div className="rounded-full p-3 bg-main px-4 w-fit cursor-pointer" onClick={() => sign()}>
                                        <p className="text-white font-bold text-sm">Sign message</p>
                                    </div>
                                    <div className="rounded-full p-3 px-4 w-fit cursor-pointer" onClick={() => disconnectWallet()}>
                                        <p className="text-main font-bold text-sm">Cancel</p>
                                    </div>
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
