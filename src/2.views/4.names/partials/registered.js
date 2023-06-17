import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import CloudContracts from "../../../1.resources/2.js/0.global/2.contracts/cloudContracts";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import { timeToString } from "../../../1.resources/2.js/0.global/0.smallfunctions/time";
import Extend from "./modal/extend";

const collectionAddress = "0x3679f68709DDA61c8CBd5FEF301C7C92B90c423d";

const Registered = ({ tokenId, owner, setOwner, name }) => {
    let { address } = useAccount();
    let [expiration, setExpiration] = useState("");
    let [extendModal, setExtendModal] = useState(false);

    async function init() {
        let [owner_, expiration_] = await Promise.all(
            [
                CloudContracts().apeErc721Contract.ownerOf(tokenId),
                CloudContracts().apeRegistryContract.getExpiration(tokenId)
            ]
        )
        setOwner(owner_)
        setExpiration(parseFloat(expiration_.toString()));
    }
    useEffect(() => {
        if (tokenId != null && tokenId != "" && tokenId != "0" && tokenId != 0) {
            init()
        }
    }, [tokenId])

    return (
        <div className="my-8">
            <div className="border-2 dark:border border-zinc-200 dark:border-dark700 bg-zinc-100 dark:bg-dark800 rounded-2xl px-8 py-8">
                <p className="text-md font-semibold">At a glance</p>
                <div className="flex items-center gap-x-1 mt-2">
                    <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-zinc-500 dark:text-dark500 text-sm" />
                    <p className="text-sm text-zinc-500 dark:text-dark500">This domain is registered, but not listed</p>
                </div>
                <div className="grid grid-cols-2 gap-y-10 mt-6">
                    <div className="">
                        <p className="text-sm font-normal text-dark500">Listing</p>
                        <p className="text-lg font-semibold mt-2">Not listed</p>
                    </div>
                    <div>
                        <p className="text-sm font-normal text-dark500">Expiration</p>
                        <p className="text-lg font-semibold mt-2">{timeToString(expiration * 1000)}</p>
                    </div>
                </div>
                {owner?.toLowerCase() == address?.toLowerCase() ? (
                    <button className="bg-main text-white rounded-full px-4 py-3 mt-8 flex items-center gap-x-1 w-fit" onClick={() => setExtendModal(true)}>
                        <p className="text-sm font-semibold">Extend</p>
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                    </button>
                ) : (
                    <a className="bg-main text-white rounded-full px-5 py-3 mt-8 flex items-center gap-x-2 w-fit" href={"https://opensea.io/assets/ethereum/" + collectionAddress + "/" + tokenId} target="_blank">
                        <p className="text-sm font-semibold">View on Opensea</p>
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-white text-sm" />
                    </a>)}

                <Extend tokenId={tokenId} isOpen={extendModal} setIsOpen={setExtendModal} name={name} />
            </div>
        </div>
    );

}

export default Registered;

