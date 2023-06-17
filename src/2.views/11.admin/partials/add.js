import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDisconnect, useSigner, useAccount } from 'wagmi'
import { Dialog } from '@headlessui/react'
import { GlobalParams } from "../../0.wrapper/darkMode";
import { teamAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";

const AddReserve = ({ isOpen, setIsOpen }) => {
    const { address } = useAccount();
    const { data: signer, isError, isLoading } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [success, setSuccess] = useState(false);
    const { darkMode, toggleDarkMode } = GlobalParams();
    const [costEth, setCostEth] = useState(0);
    const [newName, setNewName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [duration, setDuration] = useState(1);
    const [addToTeam, setAddToTeam] = useState(false);

    function changeDuration(param) {
        setError("");
        if (param == "plus") {
            setDuration(duration + 1);
        } else {
            if (duration > 1) {
                setDuration(duration - 1);
            }
        }
    }

    async function changeNewName(e) {
        setError("");
        let value = e.target.value;

        if (!e.target.value.includes(".") && !e.target.value.includes(" ")) {
            setNewName(value.toLowerCase());
        }
    }

    async function changeNewAddress(e) {
        setError("");
        let value = e.target.value;
        setNewAddress(value);
    }


    async function save() {
        let name = newName;
        let saveAddress = addToTeam ? teamAddress : (newAddress);

        console.log(name, saveAddress, duration);
        try {
            setLoading("Please wait...")
            let value = (await callW3Api("/admin/add/reserve", { name: name, address: saveAddress, duration: duration, signature: localStorage.getItem("accountSignature" + address) }));
            console.log(value)
            if (value == "ok") {
                setLoading("")
                setSuccess(true);
            } else if (value == "name-exists") {
                setLoading("")
                setError("Name already exists")
            } else {
                setLoading("")
                setError("Something went wrong. Please try again later.")
            }
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

                            <div className="md:w-[550px] max-h-[90vh] py-10 md:py-6 px-10 md:px-10 bg-white dark:bg-dark800 border border-dark700 rounded-3xl text-white dark:text-white">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Add reserve</p>
                                    <p className="text-gray-500 mt-2 dark:text-zinc-400">Add name to reserve</p>
                                </div>

                                <div className="mt-8 pb-6">
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10">
                                        <div>
                                            <p className="text-sm font-semibold">Duration</p>
                                            <div className="border-2 border-zinc-300 dark:border-zinc-600 px-2 py-2 rounded-full mt-2">
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
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Name</p>
                                            <input type="text" className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-md w-full text-start rounded-xl py-3 px-4 mt-2 placeholder:text-dark500 outline-none" placeholder="Enter name here..." value={newName} onChange={changeNewName} />
                                        </div>

                                        <div style={{ display: addToTeam ? "none" : "block" }}>
                                            <p className="text-sm font-semibold">Address</p>
                                            <input type="text" className="bg-zinc-100 dark:bg-dark800 border-2 border-zinc-200 dark:border-dark700 text-black dark:text-white text-md w-full text-start rounded-xl py-3 px-4 mt-2 placeholder:text-dark500 outline-none" placeholder="Enter address here..." value={newAddress} onChange={changeNewAddress} />
                                        </div>

                                    </div>

                                    <div className="mt-10 flex items-center gap-x-2 rounded-2xl px-4 py-3 w-full justify-between bg-dark700" onClick={() => setAddToTeam(!addToTeam)}>
                                        <p className="text-sm font-semibold mt-0 text-dark500">Add to team</p>

                                        {addToTeam ? (
                                            <div className="w-10 bg-main rounded-full flex justify-end px-1 py-1" >
                                                <FontAwesomeIcon icon="circle" className="text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-10 bg-dark500 rounded-full flex justify-start px-1 py-1" >
                                                <FontAwesomeIcon icon="circle" className="text-white" />
                                            </div>
                                        )}
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
                                                <p className="text-main font-bold text-sm">Successful added</p>
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

export default AddReserve;
