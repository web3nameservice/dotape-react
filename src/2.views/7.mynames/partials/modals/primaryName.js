import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signMessage } from '@wagmi/core'
import { useDisconnect, useSigner, useAccount } from 'wagmi'
import { Dialog } from '@headlessui/react'
import { shortenaddress } from "../../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { coinsJson } from "../../../../1.resources/2.js/0.global/0.smallfunctions/coins";
import { Variables } from "../../../../1.resources/2.js/0.global/2.contracts/variables";
import { ethers } from "ethers";
import { getCloudProvider } from "../../../../1.resources/2.js/0.global/2.contracts/cloudProvider";
import { GlobalParams } from "../../../0.wrapper/darkMode";
import CloudContracts from "../../../../1.resources/2.js/0.global/2.contracts/cloudContracts";

const PrimaryName = ({ isOpen, setIsOpen, names }) => {
    const { address } = useAccount();
    const { data: signer, isError, isLoading } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const { darkMode } = GlobalParams();
    const [currentName, setCurrentName] = useState("");
    const [selectedName, setSelectedName] = useState(null);


    async function init() {
        let primary = await CloudContracts().apeResolverContract.resolveAddress(address);
        setCurrentName(primary);
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (names.length > 0) {
            setSelectedName(0);
        }
    }, [names])


    async function save() {
        try {
            setLoading("Please wait...")
            const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
            setLoading("Confirm the tx in your wallet...")
            const tx = await registrarContract.setPrimary(names[selectedName]?.tokenId);
            setLoading("Waiting for tx to confirm...")
            getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
                setLoading("")
                setSuccess(true);
            });
        } catch (e) {
            setLoading("")
            setError("Something went wrong. Try again.");
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

                            <div className="md:w-[500px] max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 border border-dark700 rounded-3xl text-white dark:text-white">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold ">Primary Name</p>
                                    <p className="text-gray-500 dark:text-dark500 mt-2">Update your primary name</p>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center gap-x-2 justify-between">
                                        <p className="text-md font-normal text-dark500">Current</p>
                                        <p className="text-md font-bold">{currentName != "" ? currentName : "Not set"}</p>
                                    </div>
                                </div>

                                <div className="mt-8 w-full pb-4">
                                    <p className="text-md font-normal text-dark500">{names.length > 0 ? "Select new primary name" : "You do not have any names in your account"}</p>
                                    {names.length > 0 ? (
                                        <DropdownItem items={names} width="w-full" left="0" selected={selectedName} setSelected={setSelectedName} />
                                    ) : (null)}
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
                                                <p className="text-main font-bold text-sm">Primary name succesfully updated</p>
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
                                        <p className="text-white font-semibold text-sm">{success ? "Done" : "Confirm"}</p>
                                    </div>
                                    {success ? (null) : (
                                        <div className="rounded-full p-3 px-4 w-fit cursor-pointer" onClick={() => setIsOpen(false)}>
                                            <p className="text-main font-semibold text-sm">Cancel</p>
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

export default PrimaryName;


const DropdownItem = ({ items, width, left, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown w-full  rounded-xl bg-white dark:bg-dark800 border-2 border-gray-200 dark:border-dark700 mt-2 border-2 dark:border-dark700" >
            <div className="flex items-center justify-between gap-x-3 px-4 py-3" onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center gap-x-3 cursor-pointer' >
                    {/* <img src={items[selected].logo} className='w-6 h-6' /> */}
                    <p className="font-semibold">{items[selected]?.name}</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <FontAwesomeIcon icon={['fas', "fa-angle-down"]} className="text-sm text-dark500" />
                </div>
            </div>
            <div id="" className="border-t border-gray-200 dark:border-dark700 max-h-[200px] overflow-y-scroll" style={{ display: isOpen ? "block" : "none", width: width, left: left }}>
                <p className="text-gray-500 px-4 py-2 text-sm font-semibold border-y border-b-gray-200 dark:border-dark700">Select primary name</p>
                {items.map((item, index) => (
                    <div key={index} onClick={() => { setSelected(index); setIsOpen(!isOpen) }}>
                        <div className="px-4 py-3 flex items-center justify-between gap-x-3 cursor-pointer border-b border-b-gray-200 dark:border-dark700 hover:bg-gray-100">
                            <div className="flex items-center gap-x-3">
                                {/* <img src={item.logo} className='w-6 h-6' /> */}
                                <div >
                                    <p className="font-semibold">{item.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-3">

                                {index == selected ? (
                                    <div className="w-5 h-5 bg-main rounded-full flex justify-center items-center">
                                        <FontAwesomeIcon icon={['fas', "fa-check"]} className="text-white text-xs" />
                                    </div>
                                ) : (null)}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}