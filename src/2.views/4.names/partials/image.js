import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccount } from "wagmi";
import EmptyImg from "../../../1.resources/3.files/images/empty_nft.png";

const Image = ({ name, tokenId }) => {
    let { address } = useAccount();
    let [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log("tokenId", tokenId);
        setRefresh(refresh + 1);
    }, [tokenId])

    useEffect(() => {
        console.log("refresh", refresh);
    }, [refresh])


    return (
        <div className="" >
            {tokenId != 0 && tokenId != null && tokenId != "" ? (
                <img src={process.env.REACT_APP_API_URL + "/metadata/images?tokenid=" + tokenId} className="rounded-2xl" />
            ) : name != "" & name != null & name != "null" ? (
                <img src={process.env.REACT_APP_API_URL + "/metadata/generateimage=" + name + ".ape"} className="rounded-2xl" />
            ) : (
                <img src={EmptyImg} className="rounded-2xl" />
            )}
        </div>
    );

}

export default Image;

