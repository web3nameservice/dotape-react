import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import { shortenaddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/global";
import makeBlockie from "ethereum-blockies-base64";
import { zeroAddress } from "../../../1.resources/2.js/0.global/0.smallfunctions/prepends";
import { getDomain } from "../../../1.resources/2.js/0.global/3.api/callW3Api";

const Titles = ({ name, owner, tokenId, isLoading }) => {
    let { address } = useAccount();
    const [domain, setDomain] = useState(shortenaddress(owner != "" ? owner : ""));

    useEffect(() => {
        console.log("owner", owner);
        setDomain(shortenaddress(owner != "" ? owner : ""));
        getDomain(owner).then((result) => {
            if (result != "null") {
                setDomain(result);
            }
        })
    }, [owner])


    return (
        <div className="">
            <div>
                <p className="font-semibold">DOT APE</p>
                <p className="text-6xl font-bold mt-2">{name}.ape</p>
                {!isLoading ? (
                    tokenId != 0 ? (
                        <div className="flex items-center gap-x-2 mt-4">
                            <p className="text-sm">Owner: </p>
                            <a href={"/address/" + owner} className="flex items-center gap-x-2 bg-dark800 px-4 py-2 rounded-full border border-dark700">
                                <img src={makeBlockie(owner != "" ? owner : zeroAddress)} className="w-5 h-5 rounded-full" />
                                <p className="text-main text-sm">{domain}</p>
                                {/* <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-main text-sm" /> */}
                            </a>
                        </div>
                    ) : (null)
                ) : (null)}
            </div>

        </div>
    );

}

export default Titles;

