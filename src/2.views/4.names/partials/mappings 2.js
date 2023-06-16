import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";
import { coinsJson } from "../../../1.resources/2.js/0.global/0.smallfunctions/coins";
import TxtRecords from "./modal/txtRecords";

const Mappings = ({ tokenId, owner, name }) => {
    let { address } = useAccount();
    const [records, setRecords] = useState([]);
    const [avatar, setAvatar] = useState("");
    const [website, setWebsite] = useState("");
    const [editModal, setEditModal] = useState(false);

    async function init() {
        let keys = Object.keys(coinsJson);
        keys.push("avatar");
        keys.push("website");
        let result = await CloudContracts().apeResolverContract.getTxtRecords(tokenId, keys);

        setRecords(result.slice(0, -2));
        setAvatar(result[result.length - 2]);
        setWebsite(result[result.length - 1]);
    }
    useEffect(() => {
        if (tokenId != null && tokenId != "" && tokenId != "0" && tokenId != 0) {
            init()
        }
    }, [tokenId])

    return (
        <div className="mt-12 border-t-2 border-zinc-200 dark:border-zinc-700">
            <div className="flex justify-end mt-8">
                {address?.toLowerCase() == owner?.toLowerCase() ? (
                    <button className="bg-main text-white rounded-full px-4 py-2 flex items-center gap-x-2" onClick={() => setEditModal(true)}>
                        <p className="text-sm font-semibold">Edit</p>
                    </button>
                ) : (null)}

            </div >
            <div className="mt-0">
                <p className="font-bold">Avatar</p>
                <p className="text-sm mt-2 text-zinc-500 dark:text-dark500">This domain is set to resolve to the following avatar</p>


                <div className="flex items-center justify-start gap-x-2 bg-zinc-100 dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-full px-4 py-2 mt-4">
                    <div className="w-10 h-10 flex justify-center items-center bg-dark500 dark:bg-zinc-600 rounded-full flex-none">
                        <FontAwesomeIcon icon={['fas', 'user']} className="text-white text-sm" />
                    </div>
                    <div className="w-full px-4">
                        <p className="text-sm text-start">{avatar != "" ? avatar : "Avatar not set"}</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <p className="font-bold">Websites</p>
                <p className="text-sm mt-2 text-zinc-500 dark:text-dark500">This domain is set to resolve to the following website</p>


                <div className="flex items-center justify-start gap-x-2 bg-zinc-100 dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-full px-4 py-2 mt-4">
                    <div className="w-10 h-10 flex justify-center items-center bg-dark500 dark:bg-zinc-600 rounded-full flex-none">
                        <FontAwesomeIcon icon={['fas', 'globe']} className="text-white text-sm" />
                    </div>
                    <div className="w-full px-4">
                        <p className="text-sm text-start">{website != "" ? website : "Website not set"}</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <p className="font-bold">Mappings</p>
                <p className="text-sm mt-2 text-zinc-500 dark:text-dark500">This domain is set to resolve to the following addresses</p>

                <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {records.length > 0 ? Object.keys(coinsJson).map((key, index) => (
                        <div key={index} className="flex items-center justify-start gap-x-2 bg-zinc-100 dark:bg-dark800 border-2 dark:border border-zinc-200 dark:border-dark700 rounded-full px-4 py-2">
                            <div className="w-10 h-10 flex justify-center items-center">
                                <img src={coinsJson[key]} className="w-8 h-8 rounded-full" />
                            </div>
                            <div className="w-full">
                                <p className="text-sm text-center">{index == 0 ? (records[index] == "" ? shortenaddress(owner) : shortenaddress(records[index])) : (records[index] == "" ? "Not Set" : shortenaddress(records[index]))}</p>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>

            <TxtRecords isOpen={editModal} setIsOpen={setEditModal} tokenId={tokenId} records={records} avatar={avatar} website={website} owner={owner} name={name} />
        </div >
    );

}

export default Mappings;

