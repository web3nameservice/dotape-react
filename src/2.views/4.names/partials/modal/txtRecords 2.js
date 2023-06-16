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

const TxtRecords = ({ isOpen, setIsOpen, tokenId, records, avatar, website, owner, name }) => {
    const { data: signer, isError, isLoading } = useSigner()
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const { disconnect } = useDisconnect()
    const [editJson, setEditJson] = useState([{}]);
    const [hash, setHash] = useState("");
    const [hashLoading, setHashLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { darkMode, toggleDarkMode } = GlobalParams();

    async function changeValue(value, name) {
        let newJson = editJson[0];
        newJson[name] = value;
        setEditJson([newJson]);
        console.log(newJson);
    }

    async function init() {
        let keys = Object.keys(coinsJson);
        let newJson = {}
        records.map((record, index) => {
            if (index == 0 && record == "") {
                record = owner;
            }
            newJson[keys[index]] = record;
        });
        newJson["avatar"] = avatar;
        setHash(avatar);
        newJson["website"] = website;
        setEditJson([newJson]);
        console.log(newJson);
    }

    useEffect(() => {
        if (tokenId != null && tokenId != "" && tokenId != "0" && tokenId != 0) {
            init()
        }
    }, [isOpen])

    async function uploadAvatar(e) {
        if (e.target.files[0]) {
            setHashLoading(true);
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", async function (e) {
                var base64 = e.target.result;
                let hash = await uploadImage(base64, editJson, setEditJson, setHash, setHashLoading);
            });
        }
    }

    useEffect(() => {
        changeValue(hash, "avatar");
    }, [hash])

    async function save() {
        let labels = Object.keys(editJson[0]);
        let values = Object.values(editJson[0]);
        let records = labels.map((label, index) => {
            return [labels[index], values[index]]
        })
        console.log(records);

        setLoading("Please wait...")
        const registrarContract = new ethers.Contract(Variables().apeRegistrarAddr, Variables().apeRegistrarAbi, signer);
        setLoading("Confirm the tx in your wallet...")
        const tx = await registrarContract.setTxtRecords(tokenId, records);
        setLoading("Waiting for tx to confirm...")
        getCloudProvider("eth", process.env.REACT_APP_NETWORK, "full").waitForTransaction(tx.hash, 1, 300000).then(async (receipt) => {
            setLoading("")
            setSuccess(true);
        });
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
                    <Dialog.Panel className="mx-auto flex justify-center items-center rounded-3xl ">
                        <div className={darkMode ? "dark" : ""}>
                            <div className="md:w-[767px] max-h-[90vh] py-10 md:py-4 px-10 md:px-10  bg-white dark:bg-dark800 rounded-3xl text-black dark:text-white border-2 dark:border-dark700 overflow-y-scroll">


                                <div className="mt-4">
                                    <p className="text-3xl font-bold">Set Txt Records</p>
                                    <p className="text-gray-500 mt-2">These records are used to store data on the blockchain.</p>
                                </div>

                                <div className="mt-8">
                                    <div>
                                        <p className="font-bold">Avatar</p>
                                        <div className="mt-4 flex items-center gap-x-8">
                                            <div>
                                                {hash == "" ? (
                                                    <div className="flex items-center justify-center w-40 h-40 rounded-2xl bg-zinc-500" onClick={() => document.getElementById("fileUpload").click()} >
                                                        {hashLoading ? (
                                                            <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-white text-3xl" spin />
                                                        ) : (
                                                            <FontAwesomeIcon icon={['fas', 'plus']} className="text-white text-3xl" />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <img src={process.env.REACT_APP_API_URL + "/metadata/generateimageavatar=" + name + ".ape&" + hash} className="w-40 h-40 rounded-2xl" onLoad={() => setHashLoading(false)} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">Avatar URL</p>
                                                <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">{hash == "" ? "No avatar set" : hash}</p>
                                                <div className="mt-4 flex gap-x-6">
                                                    {hash == "" ? (
                                                        <p onClick={() => document.getElementById("fileUpload").click()} className="text-sm font-bold text-main">Upload</p>
                                                    ) : (
                                                        <p onClick={() => setHash("")} className="text-sm font-bold text-main">Remove</p>
                                                    )}
                                                </div>
                                                <div style={{ opacity: 0 }}>
                                                    <input id="fileUpload" type="file" name="myImage" onChange={(e) => uploadAvatar(e)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 ">
                                    <p className="font-bold">Websites</p>
                                    <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">This domain is set to resolve to the following website</p>


                                    <div className="flex items-center justify-start gap-x-2 bg-zinc-100 dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-full px-4 py-2 mt-4">
                                        <div className="w-10 h-10 flex justify-center items-center bg-zinc-500 rounded-full">
                                            <FontAwesomeIcon icon={['fas', 'globe']} className="text-white text-sm" />
                                        </div>
                                        <div className="w-full px-4">
                                            <input type="text" className="w-full text-sm text-start bg-transparent outline-none" value={editJson[0]["website"] != "" ? editJson[0]["website"] : ""} placeholder="Enter your website URL here..." onChange={(e) => changeValue(e.target.value, "website")} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pb-4">
                                    <p className="font-bold">Mappings</p>
                                    <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">This domain is set to resolve to the following addresses</p>

                                    <div className="mt-4 grid grid-cols-1 gap-y-4">
                                        {records.length > 0 ? Object.keys(coinsJson).map((key, index) => (
                                            <div key={index} className="flex items-center justify-start gap-x-2 bg-zinc-100 dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-full px-4 py-2">
                                                <div className="w-10 h-10 flex justify-center items-center">
                                                    <img src={coinsJson[key]} className="w-8 h-8 rounded-full" />
                                                </div>
                                                <div className="w-full px-4">
                                                    <input type="text" className="w-full text-sm text-start bg-transparent outline-none" value={editJson[0][key] != "" ? editJson[0][key] : ""} placeholder="Enter your address here..." onChange={(e) => changeValue(e.target.value, key)} />
                                                </div>
                                            </div>
                                        )) : null}
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

export default TxtRecords;
