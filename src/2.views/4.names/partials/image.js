import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import EmptyImg from "../../../1.resources/3.files/images/empty_nft.png";
import { callW3Api } from "../../../1.resources/2.js/0.global/3.api/callW3Api";

const Image = ({ name, tokenId }) => {
    let { address } = useAccount();
    let [refresh, setRefresh] = useState(0);
    const [metadata, setMetadata] = useState(null);

    async function init() {
        if (tokenId != 0 && tokenId != null && tokenId != "") {
            let result = await (await fetch(process.env.REACT_APP_API_URL + "/metadata/db?tokenid=" + tokenId)).json();
            setMetadata(result);
        }
        setRefresh(refresh + 1);
    }
    useEffect(() => {
        init();
    }, [tokenId])


    return (
        <div className="" >
            {metadata != null ? (
                <img src={metadata?.image} className="rounded-2xl" />
            ) : name != "" & name != null & name != "null" ? (
                <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name + ".ape"} className="rounded-2xl" />
            ) : (
                <img src={EmptyImg} className="rounded-2xl" />
            )}
        </div>
    );

}

export default Image;

