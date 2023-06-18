import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import makeBlockie from "ethereum-blockies-base64";
import { collectionAddress, zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { callW3Api, getDomain } from "../../../1.resources/2.js/0.global/3.api/callW3Api";
import Snackbar from "../../0.global/snackbar/snackbar";
import { Tooltip } from "@material-tailwind/react";
import Transfer from "./modal/transfer";
import { VscVerifiedFilled } from "react-icons/vsc";

const Titles = ({ name, owner, tokenId, isLoading }) => {
    let { address } = useAccount();
    const [domain, setDomain] = useState(shortenaddress(owner != "" ? owner : ""));
    const [metadataSnackbar, setMetadataSnackbar] = useState(false);
    const [transferModal, setTransferModal] = useState(false);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        console.log("owner", owner);
        setDomain(shortenaddress(owner != "" ? owner : ""));
        getDomain(owner).then((result) => {
            if (result != "null") {
                setDomain(result);
            }
        })
    }, [owner])

    async function refreshMetadata() {
        setMetadataSnackbar(true);
        fetch(process.env.REACT_APP_API_URL + "/metadata/db?tokenid=" + tokenId + "&refresh=true");
    }

    async function getProfile(address) {
        let result = await callW3Api("/profile/get", { address: address });
        console.log(result);
        setProfile(result);
    }

    useEffect(() => {
        if (owner != "" && owner != null && owner != "null") {
            getProfile(owner);
        }
    }, [owner])

    return (
        <div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold">DOT APE</p>
                    <p className="text-4xl md:text-6xl font-bold mt-2 truncate">{name}.ape</p>
                    {!isLoading ? (
                        tokenId != 0 ? (
                            <div className="flex items-center gap-x-2 mt-4">
                                <p className="text-sm">Owner: </p>
                                <a href={"/address/" + owner} className="flex items-center gap-x-2 bg-dark800 px-4 py-2 rounded-full border border-dark700">
                                    <img src={makeBlockie(owner != "" ? owner : zeroAddress)} className="w-5 h-5 rounded-full" />
                                    <div className="flex items-center gap-x-1">
                                        <p className="text-main text-sm font-semibold">{domain}</p>
                                        {profile?.verified != null ? (profile?.verified != "null" ? (
                                            <VscVerifiedFilled className={`${profile?.verified == "1" ? "text-amber-400" : "text-main"} text-md`} />
                                        ) : (null)) : (null)}
                                    </div>
                                </a>
                            </div>
                        ) : (null)
                    ) : (null)}
                </div>
                <div className="flex items-center gap-x-2">
                    {/* <Tooltip content={"Transfer"} placement="top" className="bg-dark700 py-2 truncate px-4 rounded-2xl font-semibold" >
                        <div className="w-10 h-10 bg-dark700 rounded-2xl flex justify-center items-center border-0 border-dark700" onClick={() => setTransferModal(true)}>
                            <FontAwesomeIcon icon={['fas', 'fa-paper-plane']} className="text-neutral-400 text-md" />
                        </div>
                    </Tooltip> */}
                    <Tooltip content={"Refresh metadata"} placement="top" className="bg-dark700 py-2 truncate px-4 rounded-2xl font-semibold" >
                        <div className="w-10 h-10 bg-dark700 rounded-2xl flex justify-center items-center border-0 border-dark700" onClick={() => refreshMetadata()}>
                            <FontAwesomeIcon icon={['fas', 'fa-rotate']} className="text-neutral-400 text-md" />
                        </div>
                    </Tooltip>

                </div>
            </div>
            <Snackbar snackbarActive={metadataSnackbar} setSnackbarActive={setMetadataSnackbar} icon={""} message={"We've queued this item for an update! Check back in a minute..."} />
            <Transfer isOpen={transferModal} setIsOpen={setTransferModal} tokenId={tokenId} name={name} />
        </div>
    );

}

export default Titles;

