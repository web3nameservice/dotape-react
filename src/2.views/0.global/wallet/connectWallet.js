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

export const ConnectWallet = ({ type }) => {
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const { address, isConnecting, isDisconnected, isReconnecting } = useAccount()
    const [domain, setDomain] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const { disconnect } = useDisconnect()
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    async function init() {
        let result = await getDomain(address);
        console.log(result);
        if (result != "null") {
            setDomain(result);
        }
    }

    async function checkSignature() {
        let signature = localStorage.getItem("accountSignature");
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
                                                <button onClick={openConnectModal} type="button" className='bg-main text-white rounded-full p-3 px-4 text-sm whitespace-nowrap z-0 block md:hidden'>
                                                    <FontAwesomeIcon icon={['fas', 'fa-right-to-bracket']} style={{ fontSize: "100%" }} className="text-white" />
                                                </button>

                                                <button onClick={openConnectModal} type="button" className='bg-main text-white rounded-full p-3 px-4 text-sm whitespace-nowrap z-0 hidden md:block'>
                                                    Connect Wallet
                                                </button>
                                            </div>
                                        ) : (
                                            <button onClick={openConnectModal} type="button" className='bg-main text-white rounded-full p-3 px-4 text-sm whitespace-nowrap z-0'>
                                                Connect Wallet
                                            </button>
                                        )
                                    );
                                } else {
                                    return (
                                        <div style={{ display: 'flex', gap: 0 }}>

                                            <button onClick={() => setAccountModalOpen(true)} type="button" className='flex items-center gap-2 font-bold text-sm bg-white/10 rounded-xl px-0 md:px-4 py-0 md:py-2 md:border-2 border-white/10'>
                                                <div className='flex items-center gap-x-2'>
                                                    <div className="bg-gray-400 w-10 h-10 flex justify-center items-center" style={{ borderRadius: "12px" }}>
                                                        <FontAwesomeIcon icon="user-alt" className="text-md text-white" />
                                                    </div>
                                                    <div className='text-left hidden md:block'>
                                                        <p className='text-md'>{address != null ? domain == "" ? shortenaddress(address) : domain : ""}</p>
                                                        <p className='text-xs text-main'>Manage</p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
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

            </ConnectButton.Custom>
            <AccountModal accountModalOpen={accountModalOpen} setAccountModalOpen={setAccountModalOpen} domain={domain} />
            <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
        </div>
    );
};


export function AccountModal({ accountModalOpen, setAccountModalOpen, domain }) {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({ address: address })
    const { disconnect } = useDisconnect()


    function closeModal() {
        setAccountModalOpen(false)
    }

    async function disconnectWallet() {
        localStorage.clear();
        sessionStorage.clear();
        disconnect();
        setAccountModalOpen(false);
        window.location = "/";
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
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-black p-6 text-left align-middle shadow-xl transition-all" style={{ zIndex: 1000000000000000000000 }}>
                                    <div className='flex justify-end'>
                                        <div className='w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer' onClick={() => setAccountModalOpen(false)}>
                                            <FontAwesomeIcon icon={['fas', 'fa-xmark']} style={{ fontSize: "100%" }} className="text-gray-600" />
                                        </div>
                                    </div>
                                    <div className='px-4'>
                                        <div className='flex flex-col items-start -mt-4'>
                                            {/* <img src={UserImg} className='w-[80px] h-[80px] rounded-full' /> */}
                                            <div className="bg-gray-400 w-20 h-20 flex justify-center items-center" style={{ borderRadius: "24px" }}>
                                                <FontAwesomeIcon icon="user-alt" className="text-3xl text-white" />
                                            </div>
                                            <p className='pt-6 font-bold text-4xl'>{address != null ? domain == "" ? shortenaddress(address) : domain : ""}</p>
                                            <p className='pt-2 text-md text-gray-500'>{"Balance: " + parseFloat(data?.formatted).toFixed(3)} {data?.symbol}</p>

                                            <div className='mt-8'>
                                                <div>
                                                    <p className='font-semibold text-lg'>Address</p>
                                                </div>
                                                <div>
                                                    <p className='text-md text-gray-500 break-all'>{address}</p>
                                                </div>
                                            </div>

                                            <div className='mt-8'>
                                                <div>
                                                    <p className='font-semibold text-lg'>Username</p>
                                                </div>
                                                <div>
                                                    <p className='text-md text-gray-500'>{domain != "" ? domain : "Not registered"}</p>
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}