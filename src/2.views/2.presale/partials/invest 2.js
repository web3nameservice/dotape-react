import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDisconnect } from 'wagmi'
import { colors } from '../../../1.resources/1.css/colors'
import { tokenomics } from '../../0.global/tokenomics'
import { formatinusd } from '../../../1.resources/2.js/0.global/0.smallfunctions/currencyConversion'
import CloudContracts from '../../../1.resources/2.js/0.global/2.contracts/cloudContracts'
import { ethers } from 'ethers'
import { Variables } from '../../../1.resources/2.js/0.global/2.contracts/variables'
import { useAccount, useConnect, useSigner } from 'wagmi'
import { getCloudProvider } from '../../../1.resources/2.js/0.global/2.contracts/cloudProvider'
import EthIcon from '../../../1.resources/3.files/images/eth_icon.png';
import ApecoinIcon from '../../../1.resources/3.files/images/apecoin_icon.png';

let presaleAddress = "0xaC8A1B5F9a3dc19C4Ef46ECA61E5FA58507b42d1";
const Invest = ({ modalOpen, setModalOpen }) => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer } = useSigner()
    const { data } = useBalance({ address: address })
    const [input, setInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingMsg, setLoadingMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [tokenSelected, setTokenSelected] = useState(0);
    const [apecoinBalance, setApecoinBalance] = useState(0);

    function closeModal() {
        setModalOpen(false)
    }

    function changeInput(e) {
        setErrorMsg("");
        setLoadingMsg("");
        //check if value is not negative
        if (e.target.value < 0) {
            setInput("");
        } else {
            setInput(e.target.value)
        }
    }

    async function invest() {
        let balance = tokenSelected == 0 ? data?.formatted : apecoinBalance;
        if (input > balance || input == "" || isNaN(input)) {
            if (input == "" || isNaN(input)) {
                setErrorMsg("Please enter a valid amount");
            } else if (input > balance) {
                setErrorMsg("Entered amount is greater than your balance.");
            }
        } else {
            try {
                setLoadingMsg("Confirm the transaction in your wallet...");
                let tx;
                if (tokenSelected == 0) {
                    tx = await signer.sendTransaction({
                        to: presaleAddress,
                        value: ethers.utils.parseEther(input)
                    });
                } else {
                    let contract = new ethers.Contract(Variables().apecoinAddr, Variables().weweAbi, signer);
                    tx = await contract.transfer(presaleAddress, ethers.utils.parseEther(input));
                }
                setLoadingMsg("Waiting for transaction to confirm...");
                getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
                    setSuccess(true);
                    setLoadingMsg("");
                });

            } catch (e) {
                console.log();
                setLoadingMsg("")
                if (e.message.includes("insufficient funds")) {
                    setErrorMsg("Insufficient funds.")
                } else {
                    setErrorMsg("Something went wrong.")
                }
            }
        }
    }

    async function checkBalance() {
        let result = await CloudContracts("eth", "main", "full").apecoinContract.balanceOf(address);
        console.log(result.toString());
        setApecoinBalance(parseFloat(result.toString()) / 1e18);
    }

    useEffect(() => {
        if (address != "" && address != null && address != undefined) {
            checkBalance();
        }
    }, [address])

    let coins = [
        { name: "ETH", logo: EthIcon },
        { name: "Apecoin", logo: ApecoinIcon },
    ]

    return (
        <>
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
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

                                    <div className='px-4'>
                                        <div className='flex flex-col items-start -mt-4 pb-8'>
                                            <div className='flex justify-between items-center w-full pt-6 border-b-2 border-neutral-200 pb-4'>
                                                <div>
                                                    <p className='text-2xl font-bold'>.APE Presale</p>
                                                    <p className='text-sm text-gray-500'>Participate in .APE presale</p>
                                                </div>
                                                <div className='flex justify-end'>
                                                    <div className='w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer' onClick={() => setModalOpen(false)}>
                                                        <FontAwesomeIcon icon={['fas', 'fa-xmark']} className="text-gray-600" style={{ fontSize: "80%" }} />
                                                    </div>
                                                </div>

                                            </div>
                                            {!success ? (
                                                <div className='w-full'>

                                                    <div className='mt-4'>
                                                        <p className='text-sm text-gray-500'>Select token</p>
                                                        <DropdownItem name="hello" subheading="Select your token" items={coins} width={"100%"} left={"0%"} selected={tokenSelected} setSelected={setTokenSelected} />

                                                    </div>
                                                    <div className='mt-4'>
                                                        <p className='text-sm text-gray-500'>Amount</p>
                                                        {/* <input className='w-full bg-[#F5F5F5] rounded-full px-4 py-2 mt-2' placeholder='0.00 ETH' /> */}
                                                        <div className='flex items-center bg-gray-100 rounded-xl border-2 border-gray-200 mt-2'>
                                                            <input id="input" className='w-full bg-transparent px-4 py-2 outline-none font-bold' placeholder='0.00' type='number' value={input} onChange={changeInput} onKeyDown={(e) => e.key == "Enter" ? invest() : null} />

                                                            <div className='px-4'>
                                                                <p className='font-bold'>{tokenSelected == 0 ? "ETH" : "APE"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex justify-between items-center mt-8'>
                                                        <p className='text-sm text-gray-500'>Your balance</p>
                                                        <p className='text-sm text-gray-500'>{tokenSelected == 0 ? parseFloat(data?.formatted).toFixed(3) + " ETH" : apecoinBalance.toFixed(2) + " APE"} </p>
                                                    </div>

                                                    <div className='flex justify-between items-center mt-4'>
                                                        <p className='text-sm text-main font-bold'>Credits</p>
                                                        <p className='text-sm text-main font-bold'>{isNaN(parseFloat(input)) ? "0.00" : parseFloat(input)} {tokenSelected == 0 ? "ETH" : "APE"}</p>
                                                    </div>

                                                </div>
                                            ) : (
                                                <div className='w-full'>
                                                    {/* <div className='px-8 py-6'>

                                                        <div className='flex justify-end items-center gap-x-2 mb-2 cursor-pointer' onClick={() => downloadImage(process.env.REACT_APP_API_URL + `/metadata/images/tokenid=${nftTokenId}`)}>
                                                            <p className='text-main text-sm'>Save image</p>
                                                            {savingLoading ? (
                                                                <FontAwesomeIcon icon={['fas', 'fa-circle-notch']} className="text-main" spin />
                                                            ) : (
                                                                <FontAwesomeIcon icon={['fas', 'fa-chevron-right']} className="text-main text-xs text-right" />
                                                            )}
                                                        </div>
                                                        <img src={process.env.REACT_APP_API_URL + `/metadata/images/tokenid=${nftTokenId}?600`} className='w-full rounded-lg' />

                                                    </div> */}

                                                    <div className='pt-8'>
                                                        <div className='flex items-center justify-center gap-x-2'>
                                                            <FontAwesomeIcon icon={['fas', 'fa-check-circle']} className="text-main text-lg" />
                                                            <p className='text-lg font-bold text-center text-main'>Transaction successful</p>
                                                        </div>
                                                        <p className='text-sm text-gray-500 text-center px-4 pt-2'>You have successfully participated in .APE presale and have received {isNaN(parseFloat(input)) ? "0.00" : parseFloat(input)} {tokenSelected == 0 ? "ETH" : "APE"} in credits!</p>
                                                    </div>

                                                </div>
                                            )}
                                        </div>

                                        <div className='w-full ' >
                                            <div className='flex justify-center items-center gap-x-2 pb-4' style={{ display: loadingMsg == "" ? "none" : "flex" }}>
                                                <FontAwesomeIcon icon={['fas', 'fa-circle-notch']} className="text-main" spin />
                                                <p className='text-sm text-main font-bold'>{loadingMsg}</p>
                                            </div>
                                            <div className='flex justify-center items-center gap-x-2 pb-4' style={{ display: errorMsg == "" ? "none" : "flex" }}>
                                                <FontAwesomeIcon icon={['fas', 'fa-info-circle']} className="text-amber-500" />
                                                <p className='text-sm text-amber-500 font-bold'>{errorMsg}</p>
                                            </div>
                                        </div>
                                        <div className='w-full' >
                                            {success ? (
                                                <div className='w-full flex justify-center items-center bg-main m-1 py-4 rounded-full cursor-pointer gap-x-3' onClick={() => window.location.reload()}>
                                                    <p className='text-md text-white'>Done</p>
                                                </div>
                                            ) : (
                                                <div className='w-full flex justify-center items-center bg-main m-1 py-4 rounded-full cursor-pointer gap-x-3' onClick={() => invest()}>
                                                    <p className='text-md text-white'>Confirm</p>
                                                    <FontAwesomeIcon icon={['fas', 'fa-arrow-right']} className="" style={{ color: '#fff', fontSize: "100%" }} />
                                                </div>
                                            )}

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

export default Invest;


const DropdownItem = ({ name, subheading, items, width, left, selected, setSelected }) => {

    return (
        <div className="dropdown w-full px-4 py-2 rounded-xl bg-white border-2 border-gray-200 mt-2" >
            <div className="flex items-center justify-between gap-x-3">
                <div className='flex items-center gap-x-3 cursor-pointer' >
                    <img src={items[selected].logo} className='w-6 h-6' />
                    <p className="font-semibold">{items[selected].name}</p>
                </div>
                <FontAwesomeIcon icon={['fas', "fa-angle-down"]} style={{ fontSize: "80%" }} />
            </div>
            <div id="" className="dropdown-content shadowDiv" style={{ width: width, left: left }}>
                <p className="text-gray-500 px-4 py-2 text-sm font-semibold border-b border-b-gray-200">{subheading}</p>
                {items.map((item, index) => (
                    <div key={index} onClick={() => setSelected(index)}>
                        <div className="px-4 py-3 flex items-center gap-x-3 cursor-pointer border-b border-b-gray-200 hover:bg-gray-100">
                            <img src={item.logo} className='w-6 h-6' />
                            <div >
                                <p className="font-semibold">{item.name}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}