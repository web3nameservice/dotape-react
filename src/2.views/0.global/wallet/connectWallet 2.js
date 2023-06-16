import { ConnectButton } from '@rainbow-me/rainbowkit';
import { delay, shortenaddress } from '../../../1.resources/2.js/0.global/0.smallfunctions/global';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useBalance } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDisconnect } from 'wagmi'
import { watchAccount } from '@wagmi/core'
import CloudContracts from '../../../1.resources/2.js/0.global/2.contracts/cloudContracts';
import { getDomain, getWnsDomain } from '../../../1.resources/2.js/0.global/3.api/callW3Api';
import { colors } from '../../../1.resources/1.css/colors';
import LoginModal from './loginSignature';
import { LoginParams } from '../../0.wrapper/login';
import makeBlockie from 'ethereum-blockies-base64';
import { GlobalParams } from '../../0.wrapper/darkMode';
import { zeroAddress } from '../../../1.resources/2.js/0.global/0.smallfunctions/prepends';

export const ConnectWallet = ({ type, format }) => {
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const { address, isConnecting, isDisconnected, isReconnecting } = useAccount()
    const [domain, setDomain] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const { disconnect } = useDisconnect()
    const { setLoginModalOpen } = LoginParams();

    async function init() {
        let result = await getDomain(address);
        console.log(result);
        if (result != "null") {
            setDomain(result);
        }
    }

    async function checkSignature() {
        let signature = localStorage.getItem("accountSignature" + address);
        console.log("signature", signature);
        if (signature == null || signature == "" || signature == undefined || signature == "null") {
            setLoginModalOpen(true);
        }

    }

    useEffect(() => {
        if (address != null && address != "" && address != undefined) {
            init();
            checkSignature();
        }
    }, [address])

    return (
        <div>
            <ConnectButton.Custom >
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        type == "mobile" ? (
                                            <div>
                                                <button onClick={openConnectModal} type="button" className='bg-main text-white rounded-xl text-sm whitespace-nowrap z-0 w-9 h-9 flex items-center justify-center'>
                                                    <FontAwesomeIcon icon={['fas', 'fa-wallet']} style={{ fontSize: "100%" }} className="text-white" />
                                                </button>

                                                {/* <button onClick={openConnectModal} type="button" className='bg-main text-white rounded-full p-3 px-4 text-sm whitespace-nowrap z-0 hidden md:block'>
                                                    Connect Wallet
                                                </button> */}
                                            </div>
                                        ) : (
                                            format == "text" ? (
                                                <button onClick={openConnectModal} type="button" className='bg-transparent rounded-full p-0 px-0 text-sm whitespace-nowrap z-0 flex items-center gap-x-2 font-semibold text-main'>
                                                    <p>Connect Wallet</p>
                                                    <FontAwesomeIcon icon={['fas', 'fa-arrow-right']} style={{ fontSize: "100%" }} className="text-main" />
                                                </button>
                                            ) : (
                                                <button onClick={openConnectModal} type="button" className='bg-main rounded-full p-3 px-4 text-sm whitespace-nowrap z-0 flex items-center gap-x-2 font-semibold text-white'>
                                                    <p>Connect Wallet</p>
                                                    <FontAwesomeIcon icon={['fas', 'fa-arrow-right']} style={{ fontSize: "100%" }} className="text-white" />
                                                </button>
                                            )

                                        )
                                    );
                                } else {
                                    return (
                                        type == "mobile" ? (
                                            <div>
                                                <div className="w-9 h-9 flex justify-center items-center rounded-2xl" onClick={() => setAccountModalOpen(true)}>
                                                    <img src={makeBlockie(address != null ? address : zeroAddress)} className='rounded-xl' />
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: 0 }}>
                                                <button onClick={() => setAccountModalOpen(true)} type="button" className='flex items-center gap-2 font-bold text-sm bg-white dark:bg-dark900 rounded-2xl px-4 md:px-4 py-2 md:py-2 md:border border-gray-200 dark:border-dark800'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <div className="w-9 h-9 flex justify-center items-center rounded-2xl">
                                                            <img src={makeBlockie(address != null ? address : zeroAddress)} className='rounded-xl' />
                                                        </div>
                                                        <div className='text-left'>
                                                            <p className='text-md'>{address != null ? domain == "" ? shortenaddress(address) : domain : ""}</p>
                                                            <p className='text-xs text-main'>Manage</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        )
                                    );
                                }

                                // if (chain.unsupported) {
                                //     return (
                                //         <button onClick={openChainModal} type="button" className='font-bold text-sm bg-[#F3A423] px-[15px] py-[10px] rounded-full'>
                                //             Switch network
                                //         </button>
                                //     );
                                // }


                            })()}
                        </div>
                    );
                }}

            </ConnectButton.Custom >
            <AccountModal accountModalOpen={accountModalOpen} setAccountModalOpen={setAccountModalOpen} domain={domain} />
        </div >
    );
};


export function AccountModal({ accountModalOpen, setAccountModalOpen, domain }) {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({ address: address })
    const { disconnect } = useDisconnect()
    const { darkMode } = GlobalParams();

    function closeModal() {
        setAccountModalOpen(false)
    }

    async function disconnectWallet() {
        localStorage.removeItem("walletConnected");
        sessionStorage.clear();
        disconnect();
        setAccountModalOpen(false);
        window.location = "/search";
    }


    return (
        <>
            <Transition appear show={accountModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden text-left align-middle shadow-xl transition-all" style={{ zIndex: 1000000000000000000000 }}>
                                    <div className={darkMode ? "dark" : ""}>
                                        <div className='bg-white dark:bg-dark800 rounded-2xl p-6 border border-gray-200 dark:border-dark700 text-black dark:text-white'>
                                            <div className='flex justify-end'>
                                                <div className='w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer' onClick={() => setAccountModalOpen(false)}>
                                                    <FontAwesomeIcon icon={['fas', 'fa-xmark']} style={{ fontSize: "100%" }} className="text-gray-600" />
                                                </div>
                                            </div>
                                            <div className='px-4'>
                                                <div className='flex flex-col items-start -mt-4'>
                                                    {/* <img src={UserImg} className='w-[80px] h-[80px] rounded-full' /> */}
                                                    <div className="w-20 h-20 flex justify-center items-center">
                                                        <img src={makeBlockie(address != null ? address : zeroAddress)} className='rounded-2xl' />
                                                    </div>
                                                    <p className='pt-6 font-bold text-4xl'>{address != null ? domain == "" ? shortenaddress(address) : domain : ""}</p>
                                                    <p className='pt-2 text-md text-gray-500 dark:text-dark500'>{"Balance: " + parseFloat(data?.formatted).toFixed(3)} {data?.symbol}</p>

                                                    <div className='mt-8'>
                                                        <div>
                                                            <p className='font-semibold text-lg'>Address</p>
                                                        </div>
                                                        <div>
                                                            <p className='text-md text-gray-500 dark:text-dark500 break-all'>{address}</p>
                                                        </div>
                                                    </div>

                                                    <div className='mt-8'>
                                                        <div>
                                                            <p className='font-semibold text-lg'>Username</p>
                                                        </div>
                                                        <div>
                                                            <p className='text-md text-gray-500 dark:text-dark500'>{domain != "" ? domain : "Not registered"}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='w-full pt-10' >
                                                    {/* <a className='w-full flex justify-center items-center bg-main m-1 py-4 rounded-full cursor-pointer gap-x-3' href='https://domains.w3.one/' target='_blank'>
                                                <FontAwesomeIcon icon={["far", "fa-user"]} style={{ color: '#fff', fontSize: "100%" }} />
                                                <p className='text-md text-white'>Manage username</p>
                                            </a> */}
                                                    <div className='w-full flex justify-center items-center bg-main  m-1 mt-4 py-4 rounded-full cursor-pointer gap-x-2' onClick={() => disconnectWallet()}>
                                                        <FontAwesomeIcon icon={['fas', 'fa-arrow-right-from-bracket']} style={{ fontSize: "100%" }} className='text-white' />
                                                        <p className='text-md text-white'>Disconnect</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}